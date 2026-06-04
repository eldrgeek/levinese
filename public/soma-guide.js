/* SOMA Guide Widget — portable floating assistant
 *
 * No site-specific logic here. All persona, voice agent, site map,
 * and walkthrough scripts live in the per-site config object:
 *   window.SomaGuideConfig = { persona, voiceAgentId, siteMap, walkthroughs }
 *
 * Step schema (each entry in walkthroughs[].steps or substeps[]):
 *   { id, label, target, narration, instruction, page, demo, requires, substeps[] }
 *   - page:     navigate to this filename before animating (e.g. 'members.html')
 *   - demo:     'click' | 'hover' | 'openDropdown' | falsy
 *   - requires: { dropdown: '<css-selector>' } — open this dropdown before animating
 *   - substeps: array of child steps (one level deep); parent narrates first,
 *               then substeps play in sequence
 *
 * Integration: include css/soma-guide.css, then the per-site config script,
 * then this script (type="module" or plain — both work).
 */
(function (global) {
  'use strict';

  /* ── Constants ──────────────────────────────────────────────────────────── */
  const ELEVENLABS_ESM   = 'https://esm.sh/@elevenlabs/client@latest';
  const READY_GATE_MS    = 2500;   /* max wait for target to appear */
  const READY_GATE_TICK  = 80;     /* poll interval */
  const CURSOR_LEAD_IN   = 1200;   /* ms after audio starts → cursor appears */
  const TTS_MS_PER_CHAR  = 85;     /* generous estimate; used for fallback timer */
  const TTS_FLOOR_MS     = 6000;   /* minimum fallback when TTS enabled */
  const TTS_BUFFER_MS    = 3500;   /* extra buffer added to known audio duration */

  /* ── SomaGuide class ────────────────────────────────────────────────────── */
  function SomaGuide(cfg) {
    this.cfg = cfg;
    this.ConvClass = null;
    this.conversation = null;
    this._convConnected = false;
    this._convBuffer = null;
    this.mode = 'minimized';
    this.wt = null;          /* { id, stepIndex, subStepIndex } — subStepIndex=-1 means at parent */
    this.pendingResume = null;

    /* Auto-advance state */
    this._autoPlay    = true;
    this._autoStopped = false;
    this._autoTimer   = null;

    /* Demo cursor state */
    this._demoCursor        = null;
    this._demoCursorTimer   = null;
    this._cursorLeadTimer   = null;  /* delay cursor until mid-utterance */
    this._pendingCursorTarget = null; /* target element captured before audio starts */
    this._pendingCursorDemo   = null; /* demo action captured before audio starts */

    /* Dropdown state managed by engine */
    this._openDropdownContainer = null;
    this._openDropdownToggle    = null;

    /* TTS pre-fetch cache: { url, blobUrl } | null */
    this._ttsPrefetchCache = null;
    this._ttsPrefetchUrl   = null;

    var lsBase = 'soma-guide:' + (cfg.persona.id || cfg.persona.name);
    this._lsGet = function (k) { try { return localStorage.getItem(lsBase + ':' + k); } catch(e) { return null; } };
    this._lsSet = function (k, v) { try { localStorage.setItem(lsBase + ':' + k, v); } catch(e) {} };

    var ssBase = 'soma-guide-xp:' + (cfg.persona.id || cfg.persona.name);
    this._ssGet = function (k) { try { return sessionStorage.getItem(ssBase + ':' + k); } catch(e) { return null; } };
    this._ssSet = function (k, v) { try { sessionStorage.setItem(ssBase + ':' + k, v); } catch(e) {} };
    this._ssDel = function (k) { try { sessionStorage.removeItem(ssBase + ':' + k); } catch(e) {} };

    this.introduced = this._lsGet('introduced') === '1';
    this._ttsMuted  = this._lsGet('tts-muted')  === '1';
    this._ttsAudio  = null;

    this._build();
    this._enableDrag();
    this._bindEvents();

    var self = this;
    if (typeof document !== 'undefined' && document.readyState !== 'loading') {
      self._onReady();
    } else if (typeof document !== 'undefined') {
      document.addEventListener('DOMContentLoaded', function () { self._onReady(); });
    }
  }

  /* Overridable navigation hook — tests replace this to intercept. */
  SomaGuide.prototype._navigate = function (page) {
    if (typeof location !== 'undefined') location.href = page;
  };

  SomaGuide.prototype._onReady = function () {
    var self = this;

    var xpId      = this._ssGet('wt-id');
    var xpStep    = this._ssGet('wt-step');
    var xpSubStep = this._ssGet('wt-substep');
    if (xpId) {
      this._ssDel('wt-id');
      this._ssDel('wt-step');
      this._ssDel('wt-substep');
      var subSt = (xpSubStep !== null && xpSubStep !== '') ? parseInt(xpSubStep, 10) : -1;
      setTimeout(function () {
        self._wtStart(xpId, parseInt(xpStep, 10) || 0, subSt);
      }, 100);
      return;
    }

    var prId      = this._ssGet('resume-id');
    var prStep    = this._ssGet('resume-step');
    var prSubStep = this._ssGet('resume-substep');
    if (prId) {
      var subR = (prSubStep !== null && prSubStep !== '') ? parseInt(prSubStep, 10) : -1;
      this.pendingResume = { id: prId, stepIndex: parseInt(prStep, 10) || 0, subStepIndex: subR };
    }

    if (!this.introduced) {
      setTimeout(function () { self._openIdle(true); }, 500);
    }
  };

  /* ── Build DOM ── */
  SomaGuide.prototype._build = function () {
    var name   = this.cfg.persona.name;
    var avatar = this.cfg.persona.avatar || '💬';

    var el = document.createElement('div');
    el.id = 'soma-guide';
    el.className = 'sg sg--min';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', name + ' Assistant');

    el.innerHTML = [
      '<button class="sg-fab" aria-label="Ask ' + name + '">',
      '  <span class="sg-fab-avatar">' + avatar + '</span>',
      '  <span class="sg-fab-name">Ask ' + name + '</span>',
      '</button>',
      '<div class="sg-panel" aria-hidden="true">',
      '  <div class="sg-header">',
      '    <div class="sg-persona">',
      '      <span class="sg-persona-avatar">' + avatar + '</span>',
      '      <span class="sg-persona-name">' + name + '</span>',
      '    </div>',
      '    <div class="sg-header-btns">',
      '      <button class="sg-btn-text" title="Text chat" aria-label="Text mode">💬</button>',
      '      <button class="sg-btn-voice" title="Voice" aria-label="Voice mode">🎙</button>',
      '      <button class="sg-btn-min" title="Minimize" aria-label="Minimize">−</button>',
      '      <button class="sg-btn-close" title="Close" aria-label="Close">×</button>',
      '    </div>',
      '  </div>',
      '  <div class="sg-body">',
      '    <div class="sg-idle-ui">',
      '      <p class="sg-greeting"></p>',
      '      <div class="sg-topic-list"></div>',
      '    </div>',
      '    <div class="sg-voice-ui" hidden>',
      '      <div class="sg-orb"></div>',
      '      <p class="sg-voice-status">Tap to speak</p>',
      '      <p class="sg-voice-transcript"></p>',
      '    </div>',
      '    <div class="sg-text-ui" hidden>',
      '      <div class="sg-messages" role="log" aria-live="polite"></div>',
      '      <div class="sg-input-bar">',
      '        <input class="sg-input" type="text" placeholder="Ask me anything…" aria-label="Message">',
      '        <button class="sg-send" aria-label="Send">↑</button>',
      '      </div>',
      '    </div>',
      '    <div class="sg-wt-ui" hidden>',
      '      <p class="sg-wt-narration"></p>',
      '      <p class="sg-wt-instruction"></p>',
      '      <div class="sg-wt-nav"></div>',
      '      <div class="sg-tts-bar">',
      '        <button class="sg-btn-mute sg-btn-icon" title="Mute narration" aria-label="Mute narration">🔊</button>',
      '        <button class="sg-btn-replay sg-btn-icon" title="Replay narration" aria-label="Replay narration">↺</button>',
      '      </div>',
      '    </div>',
      '  </div>',
      '  <div class="sg-wt-bar" hidden>',
      '    <button class="sg-wt-menu" title="Back to walkthrough menu">← Menu</button>',
      '    <button class="sg-wt-exit" title="Pause tour and save your progress">⏸ Pause</button>',
      '    <span class="sg-wt-prog"></span>',
      '    <button class="sg-wt-playpause sg-btn-icon" title="Pause auto-play" aria-label="Pause auto-play">⏸</button>',
      '    <button class="sg-wt-next">Next →</button>',
      '  </div>',
      '  <div class="sg-resume-bar" hidden>',
      '    <p>Pick up where you left off?</p>',
      '    <div class="sg-resume-steps"></div>',
      '    <div class="sg-resume-btns">',
      '      <button class="sg-wt-resume">▶ Resume</button>',
      '      <button class="sg-wt-restart">↺ Start over</button>',
      '      <button class="sg-wt-home">← Menu</button>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('');

    document.body.appendChild(el);
    this.el = el;
    this._$ = function (sel) { return el.querySelector(sel); };
  };

  /* ── Drag ── */
  SomaGuide.prototype._enableDrag = function () {
    var self   = this;
    var header = this._$('.sg-header');
    var dragging = false, ox = 0, oy = 0;

    function onDown(cx, cy) {
      dragging = true;
      var r = self.el.getBoundingClientRect();
      ox = cx - r.left;
      oy = cy - r.top;
    }
    function onMove(cx, cy) {
      if (!dragging) return;
      self.el.style.left   = (cx - ox) + 'px';
      self.el.style.top    = (cy - oy) + 'px';
      self.el.style.right  = 'auto';
      self.el.style.bottom = 'auto';
    }
    function onUp() { dragging = false; }

    header.addEventListener('mousedown', function (e) {
      if (e.target.closest('button')) return;
      onDown(e.clientX, e.clientY);
      e.preventDefault();
    });
    document.addEventListener('mousemove', function (e) { onMove(e.clientX, e.clientY); });
    document.addEventListener('mouseup', onUp);

    header.addEventListener('touchstart', function (e) {
      if (e.target.closest('button')) return;
      var t = e.touches[0];
      onDown(t.clientX, t.clientY);
    }, { passive: true });
    document.addEventListener('touchmove', function (e) {
      if (!dragging) return;
      var t = e.touches[0];
      onMove(t.clientX, t.clientY);
    }, { passive: true });
    document.addEventListener('touchend', onUp);
  };

  /* ── Bind events ── */
  SomaGuide.prototype._bindEvents = function () {
    var self = this;

    this._$('.sg-fab').addEventListener('click', function () { self._openIdle(false); });
    this._$('.sg-btn-min').addEventListener('click', function () { self._minimize(); });
    this._$('.sg-btn-close').addEventListener('click', function () { self._minimize(); });
    this._$('.sg-btn-text').addEventListener('click', function () { self._openText(); });
    this._$('.sg-btn-voice').addEventListener('click', function () { self._openVoice(); });

    this._$('.sg-wt-menu').addEventListener('click', function () { self._wtGoToNeutral(); });
    this._$('.sg-wt-next').addEventListener('click', function () { self._wtNext(); });
    this._$('.sg-wt-exit').addEventListener('click', function () { self._wtExit(); });
    this._$('.sg-wt-playpause').addEventListener('click', function () { self._wtAutoPlayToggle(); });
    this._$('.sg-wt-resume').addEventListener('click', function () {
      if (self.pendingResume) {
        var si = self.pendingResume.subStepIndex != null ? self.pendingResume.subStepIndex : -1;
        self._wtStart(self.pendingResume.id, self.pendingResume.stepIndex, si);
      }
    });
    this._$('.sg-wt-restart').addEventListener('click', function () {
      if (self.pendingResume) self._wtStart(self.pendingResume.id, 0, -1);
    });
    this._$('.sg-wt-home').addEventListener('click', function () { self._wtGoToNeutral(); });
    this._$('.sg-btn-mute').addEventListener('click', function () { self._ttsMuteToggle(); });
    this._$('.sg-btn-replay').addEventListener('click', function () { self._ttsReplay(); });
    this._updateMuteBtn();
    if (!this.cfg.ttsProxyUrl) {
      var ttsBar = this._$('.sg-tts-bar');
      if (ttsBar) ttsBar.hidden = true;
    }

    var input = this._$('.sg-input');
    this._$('.sg-send').addEventListener('click', function () { self._sendText(input.value); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); self._sendText(input.value); }
    });

    this._renderTopicList();
  };

  SomaGuide.prototype._renderTopicList = function () {
    var self = this;
    var list = this._$('.sg-topic-list');
    var wts  = this.cfg.walkthroughs || [];
    list.innerHTML = wts.map(function (w) {
      return '<button class="sg-topic-btn" data-wt="' + w.id + '">▶ ' + w.label + '</button>';
    }).join('');
    list.querySelectorAll('.sg-topic-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { self._wtStart(btn.getAttribute('data-wt'), 0, -1); });
    });
  };

  /* ── Mode transitions ────────────────────────────────────────────────────── */

  SomaGuide.prototype._minimize = function () {
    this._ttsStop();
    this._stopConversation();
    this._autoClear();
    this._demoStop();
    this._wtCloseDropdowns();
    if (this.mode === 'walkthrough' && this.wt) {
      var si = this.wt.subStepIndex != null ? this.wt.subStepIndex : -1;
      this.pendingResume = { id: this.wt.id, stepIndex: this.wt.stepIndex, subStepIndex: si };
      this._ssSet('resume-id',      this.wt.id);
      this._ssSet('resume-step',    String(this.wt.stepIndex));
      this._ssSet('resume-substep', String(si));
      this.wt = null;
    }
    this._clearHighlight();
    this.mode = 'minimized';
    this.el.className = 'sg sg--min';
    this._$('.sg-panel').setAttribute('aria-hidden', 'true');
  };

  SomaGuide.prototype._openIdle = function (isFirst) {
    this._setMode('idle');
    var greeting = isFirst ? this.cfg.persona.greeting : this.cfg.persona.shortGreeting;
    this._$('.sg-greeting').textContent = greeting || '';

    /* Hide the topic-list (walkthrough chooser) while paused mid-tour so it
     * doesn't appear alongside the resume navigator as a second list. */
    var topicList = this._$('.sg-topic-list');
    if (topicList) topicList.hidden = !!this.pendingResume;

    var resumeBar = this._$('.sg-resume-bar');
    if (this.pendingResume) {
      this._renderResumeNav();
      resumeBar.hidden = false;
    } else {
      resumeBar.hidden = true;
    }

    if (isFirst) {
      this._lsSet('introduced', '1');
      this.introduced = true;
    }
  };

  SomaGuide.prototype._openText = function () {
    var self = this;
    this._setMode('text');
    this._$('.sg-input').focus();
    if (this.cfg.voiceAgentId) {
      this._startConversation(true).catch(function (e) {
        console.warn('[SomaGuide] text session pre-start error', e);
      });
    }
  };

  SomaGuide.prototype._openVoice = function () {
    var self = this;
    this._setMode('voice');
    this._$('.sg-voice-status').textContent = 'Connecting…';
    this._startConversation(false).then(function () {
      self._$('.sg-voice-status').textContent = 'Listening…';
    }).catch(function (e) {
      console.warn('[SomaGuide] voice error', e);
      self._$('.sg-voice-status').textContent = 'Mic unavailable — try text chat instead.';
    });
  };

  SomaGuide.prototype._setMode = function (mode) {
    this._ttsStop();
    this._stopConversation();
    this._autoClear();
    this._demoStop();
    this._wtCloseDropdowns();
    this.mode = mode;
    this.el.className = 'sg sg--' + mode;
    this._$('.sg-panel').removeAttribute('aria-hidden');

    this._$('.sg-idle-ui').hidden        = mode !== 'idle';
    this._$('.sg-voice-ui').hidden       = mode !== 'voice';
    this._$('.sg-text-ui').hidden        = mode !== 'text';
    this._$('.sg-wt-ui').hidden          = mode !== 'walkthrough';
    this._$('.sg-wt-bar').hidden         = mode !== 'walkthrough';
    this._$('.sg-resume-bar').hidden     = true;
  };

  /* ── Walkthrough — state helpers ─────────────────────────────────────────── */

  SomaGuide.prototype._wtById = function (id) {
    return (this.cfg.walkthroughs || []).filter(function (w) { return w.id === id; })[0] || null;
  };

  /* Resolve the current step object (parent or substep) from wt state. */
  SomaGuide.prototype._wtCurrentStep = function () {
    if (!this.wt) return null;
    var wt = this._wtById(this.wt.id);
    if (!wt) return null;
    var step = wt.steps[this.wt.stepIndex];
    if (!step) return null;
    var si = this.wt.subStepIndex;
    if (si != null && si >= 0 && step.substeps && step.substeps[si]) {
      return step.substeps[si];
    }
    return step;
  };

  /* Total flat step count: parent + all substeps, for every top-level step. */
  SomaGuide.prototype._wtFlatCount = function (wt) {
    return (wt.steps || []).reduce(function (n, s) {
      return n + 1 + (s.substeps ? s.substeps.length : 0);
    }, 0);
  };

  /* Flat 0-based index of current position in the full sequence. */
  SomaGuide.prototype._wtFlatIndex = function (wt, stepIndex, subStepIndex) {
    var n = 0;
    for (var i = 0; i < stepIndex; i++) {
      n += 1 + ((wt.steps[i].substeps || []).length);
    }
    if (subStepIndex != null && subStepIndex >= 0) n += 1 + subStepIndex;
    return n;
  };

  /* ── Walkthrough — lifecycle ─────────────────────────────────────────────── */

  SomaGuide.prototype._wtStart = function (id, stepIndex, subStepIndex) {
    var wt = this._wtById(id);
    if (!wt) return;
    this._clearHighlight();
    this.wt = {
      id: id,
      stepIndex: typeof stepIndex === 'number' ? stepIndex : 0,
      subStepIndex: (subStepIndex != null && typeof subStepIndex === 'number') ? subStepIndex : -1
    };
    this._autoPlay    = true;
    this._autoStopped = false;
    this.pendingResume = null;
    this._ssDel('resume-id');
    this._ssDel('resume-step');
    this._ssDel('resume-substep');
    this._ttsPrefetchCache = null;
    this._ttsPrefetchUrl   = null;
    this._setMode('walkthrough');
    this._updateAutoPlayBtn();
    this._renderWtStep();
  };

  SomaGuide.prototype._renderWtStep = function () {
    if (!this.wt) return;
    var self = this;
    var wt   = this._wtById(this.wt.id);
    if (!wt) return;

    var step = this._wtCurrentStep();
    if (!step) return;

    /* ── 1. Page navigation (synchronous) ── */
    if (step.page && typeof location !== 'undefined') {
      /* Resolve to root-absolute and strip .html for comparison + navigation.
       * Stripping .html supports clean-URL servers (Netlify pretty URLs, etc.) where
       * /members/greg-foster serves the file but /members/greg-foster.html 404s.
       * Comparing full paths (not just pop()) prevents doubling on subpages. */
      var absPage   = step.page.charAt(0) === '/' ? step.page : ('/' + step.page);
      var navTarget = absPage.replace(/\.html$/, '');
      var curNorm   = location.pathname.replace(/\.html$/, '');
      if (curNorm !== navTarget) {
        this._ssSet('wt-id',      this.wt.id);
        this._ssSet('wt-step',    String(this.wt.stepIndex));
        this._ssSet('wt-substep', String(this.wt.subStepIndex != null ? this.wt.subStepIndex : -1));
        this._navigate(navTarget);
        return;
      }
    }

    /* ── 2. Update narration / instruction text (synchronous — tests check here) ── */
    this._$('.sg-wt-narration').textContent  = step.narration || '';
    this._$('.sg-wt-instruction').textContent = step.instruction || '';

    var flatIdx   = this._wtFlatIndex(wt, this.wt.stepIndex, this.wt.subStepIndex);
    var flatTotal = this._wtFlatCount(wt);
    var isLast    = flatIdx >= flatTotal - 1;
    this._$('.sg-wt-prog').textContent = 'Step ' + (flatIdx + 1) + ' of ' + flatTotal;
    this._$('.sg-wt-next').textContent = isLast ? 'Finish ✓' : 'Next →';

    /* ── 2b. Navigator (synchronous) ── */
    this._renderWtNav();

    /* ── 3. Sync cleanup ── */
    this._autoClear();
    this._demoStop();
    this._clearHighlight();
    this._wtCloseDropdowns();

    /* ── 4. Satisfy preconditions then highlight + narrate ── */
    this._wtSatisfyPreconditions(step, function () {
      if (!self.wt) return; /* tour exited during async gate */

      var targetEl = null;
      if (step.target) {
        targetEl = document.querySelector(step.target);
        if (targetEl) {
          var dispVal = (typeof window !== 'undefined' && window.getComputedStyle)
            ? window.getComputedStyle(targetEl).display : '';
          if (dispVal === 'inline') targetEl.dataset.sgWasInline = '1';
          targetEl.classList.add('sg-highlight');
          if (typeof targetEl.scrollIntoView === 'function') {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }
      }

      /* Store cursor target/action so the lead-in timer can be armed once audio
       * actually starts playing (in _ttsPlayBlob play().then() / no-TTS fallback).
       * This ensures the 1200ms lead-in is relative to audio start, not ready-gate. */
      self._pendingCursorTarget = targetEl || null;
      self._pendingCursorDemo   = step.demo || null;

      /* Auto-advance: fires ONLY via audio ended event (or muted fallback timer) */
      var onEnded = null;
      if (self._autoPlay && !self._autoStopped) {
        onEnded = function () {
          if (self._autoPlay && !self._autoStopped && self.wt) {
            self._wtNext();
          }
        };
      }

      self._ttsSpeak(step.narration || '', onEnded);
    });
  };

  SomaGuide.prototype._wtNext = function () {
    if (!this.wt) return;
    var wt = this._wtById(this.wt.id);
    if (!wt) return;
    this._autoClear();
    this._demoStop();
    this._wtCloseDropdowns();

    var stepIdx  = this.wt.stepIndex;
    var subIdx   = this.wt.subStepIndex != null ? this.wt.subStepIndex : -1;
    var topStep  = wt.steps[stepIdx];
    var substeps = (topStep && topStep.substeps) ? topStep.substeps : [];

    if (subIdx === -1) {
      /* At parent: descend to first substep if any, else advance to next top-level */
      if (substeps.length > 0) {
        this.wt.subStepIndex = 0;
        this._renderWtStep();
      } else {
        this._wtAdvanceTopLevel(wt, stepIdx);
      }
    } else {
      /* At a substep: move to next substep or next top-level */
      if (subIdx + 1 < substeps.length) {
        this.wt.subStepIndex = subIdx + 1;
        this._renderWtStep();
      } else {
        this._wtAdvanceTopLevel(wt, stepIdx);
      }
    }
  };

  SomaGuide.prototype._wtAdvanceTopLevel = function (wt, stepIdx) {
    if (stepIdx >= wt.steps.length - 1) {
      this._wtFinish();
    } else {
      this.wt.stepIndex    = stepIdx + 1;
      this.wt.subStepIndex = -1;
      this._renderWtStep();
    }
  };

  SomaGuide.prototype._wtFinish = function () {
    this._clearHighlight();
    this._autoClear();
    this._demoStop();
    this._wtCloseDropdowns();
    this._ssDel('wt-id');
    this._ssDel('wt-step');
    this._ssDel('wt-substep');
    this._ssDel('resume-id');
    this._ssDel('resume-step');
    this._ssDel('resume-substep');
    var done = this.cfg.persona.walkthroughDone || 'All done! Ask me anything.';
    this.wt = null;
    this.pendingResume = null;
    this._openIdle(false);
    this._$('.sg-greeting').textContent = done;
  };

  SomaGuide.prototype._wtExit = function () {
    this._autoClear();
    this._demoStop();
    this._wtCloseDropdowns();
    if (this.wt) {
      var si = this.wt.subStepIndex != null ? this.wt.subStepIndex : -1;
      this.pendingResume = { id: this.wt.id, stepIndex: this.wt.stepIndex, subStepIndex: si };
      this._ssSet('resume-id',      this.wt.id);
      this._ssSet('resume-step',    String(this.wt.stepIndex));
      this._ssSet('resume-substep', String(si));
    }
    this._clearHighlight();
    this.wt = null;
    this._openIdle(false);
  };

  /* ── Precondition satisfaction ──────────────────────────────────────────── */

  /* Open a dropdown container generically via CSS class (not a real click).
   * `selector` should match the dropdown's wrapper element. */
  SomaGuide.prototype._wtOpenDropdown = function (selector) {
    if (!selector || typeof document === 'undefined') return;
    var container = document.querySelector(selector);
    if (!container) return;
    container.classList.add('sg-demo-open');
    this._openDropdownContainer = container;
    var toggle = container.querySelector('[aria-expanded]');
    if (!toggle && container.matches && container.matches('[aria-expanded]')) toggle = container;
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'true');
      this._openDropdownToggle = toggle;
    }
  };

  /* Close any dropdown the engine opened, restoring aria state. */
  SomaGuide.prototype._wtCloseDropdowns = function () {
    if (this._openDropdownContainer) {
      this._openDropdownContainer.classList.remove('sg-demo-open');
      this._openDropdownContainer = null;
    }
    if (this._openDropdownToggle) {
      this._openDropdownToggle.setAttribute('aria-expanded', 'false');
      this._openDropdownToggle = null;
    }
  };

  /* Poll until `selector` resolves to a visible element (or timeout fires). */
  SomaGuide.prototype._wtReadyGate = function (selector, timeoutMs, onFound, onTimeout) {
    var start = Date.now();
    function check() {
      var el = typeof document !== 'undefined' ? document.querySelector(selector) : null;
      if (el) {
        var cs = (typeof window !== 'undefined' && window.getComputedStyle)
          ? window.getComputedStyle(el) : null;
        var vis = !cs || (cs.display !== 'none' && cs.visibility !== 'hidden');
        if (vis) { onFound(); return; }
      }
      if (Date.now() - start >= timeoutMs) { onTimeout(); return; }
      setTimeout(check, READY_GATE_TICK);
    }
    check();
  };

  /* Satisfy dropdown-open and target-visible preconditions, then call onReady.
   * Page navigation is handled upstream in _renderWtStep (synchronous path). */
  SomaGuide.prototype._wtSatisfyPreconditions = function (step, onReady) {
    if (step.requires && step.requires.dropdown) {
      this._wtOpenDropdown(step.requires.dropdown);
    }
    if (step.target && typeof document !== 'undefined') {
      this._wtReadyGate(step.target, READY_GATE_MS, onReady, function () {
        console.warn('[SomaGuide] target not found within timeout: ' + step.target + ' — proceeding');
        onReady();
      });
    } else {
      onReady();
    }
  };

  /* ── Auto-advance helpers ─────────────────────────────────────────────────── */

  SomaGuide.prototype._autoClear = function () {
    if (this._autoTimer) {
      clearTimeout(this._autoTimer);
      this._autoTimer = null;
    }
  };

  SomaGuide.prototype._wtAutoPlayToggle = function () {
    var self = this;
    this._autoStopped = !this._autoStopped;
    this._updateAutoPlayBtn();
    if (this._autoStopped) {
      this._autoClear();
      this._ttsStop();
    } else {
      if (self.wt) self._renderWtStep();
    }
  };

  SomaGuide.prototype._updateAutoPlayBtn = function () {
    var btn = this._$('.sg-wt-playpause');
    if (!btn) return;
    if (this._autoStopped) {
      btn.textContent = '▶';
      btn.setAttribute('title', 'Resume auto-play');
      btn.setAttribute('aria-label', 'Resume auto-play');
    } else {
      btn.textContent = '⏸';
      btn.setAttribute('title', 'Pause auto-play');
      btn.setAttribute('aria-label', 'Pause auto-play');
    }
  };

  /* ── Demo cursor ──────────────────────────────────────────────────────────── */

  SomaGuide.prototype._demoBuild = function () {
    if (this._demoCursor || typeof document === 'undefined') return;
    var el = document.createElement('div');
    el.className = 'sg-demo-cursor';
    el.innerHTML = '<svg width="20" height="24" viewBox="0 0 20 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2 2L2 20L7 15L11 23L14 22L10 14L18 14Z" fill="#c9a84c" stroke="#060e18" stroke-width="1.5" stroke-linejoin="round"/></svg>';
    document.body.appendChild(el);
    this._demoCursor = el;
  };

  SomaGuide.prototype._demoStop = function () {
    this._pendingCursorTarget = null;
    this._pendingCursorDemo   = null;
    if (this._cursorLeadTimer) {
      clearTimeout(this._cursorLeadTimer);
      this._cursorLeadTimer = null;
    }
    if (this._demoCursorTimer) {
      clearTimeout(this._demoCursorTimer);
      this._demoCursorTimer = null;
    }
    if (this._demoCursor) {
      this._demoCursor.classList.remove('sg-demo-cursor--visible');
    }
  };

  SomaGuide.prototype._demoMoveTo = function (target, action) {
    var self = this;
    if (!target || typeof document === 'undefined') return;
    this._demoBuild();
    var cursor = this._demoCursor;
    if (!cursor) return;

    var rect = target.getBoundingClientRect();
    var destX = Math.round(rect.left + rect.width * 0.5 - 10);
    var destY = Math.round(rect.top - 8);

    if (!cursor.classList.contains('sg-demo-cursor--visible')) {
      cursor.style.transition = 'none';
      var wx = (typeof window !== 'undefined' ? window.innerWidth  : 800) - 80;
      var wy = (typeof window !== 'undefined' ? window.innerHeight : 600) - 120;
      cursor.style.left = wx + 'px';
      cursor.style.top  = wy + 'px';
      cursor.classList.add('sg-demo-cursor--visible');
      cursor.getBoundingClientRect(); /* force reflow */
      cursor.style.transition = '';
    }

    cursor.style.left = destX + 'px';
    cursor.style.top  = destY + 'px';

    if (this._demoCursorTimer) clearTimeout(this._demoCursorTimer);
    this._demoCursorTimer = setTimeout(function () {
      self._demoCursorTimer = null;
      self._demoDoAction(target, action);
    }, 800);
  };

  SomaGuide.prototype._demoDoAction = function (target, action) {
    if (action === 'openDropdown') {
      /* Dropdown already open via precondition; ripple shows where to click */
      this._demoRipple();
    } else if (action === 'click') {
      this._demoRipple();
    }
    /* 'hover' — cursor presence at target is the visual */
  };

  SomaGuide.prototype._demoRipple = function () {
    if (!this._demoCursor || typeof document === 'undefined') return;
    var rect = this._demoCursor.getBoundingClientRect();
    var ripple = document.createElement('div');
    ripple.className = 'sg-demo-ripple';
    ripple.style.left = (rect.left - 6) + 'px';
    ripple.style.top  = (rect.top  - 6) + 'px';
    document.body.appendChild(ripple);
    setTimeout(function () {
      if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
    }, 700);
  };

  /* ── Resume / navigator ──────────────────────────────────────────────────── */

  /* Render the structured navigator tree in the resume bar (paused state).
   * Uses the same sg-wt-nav-step / sg-wt-nav-group / sg-wt-nav-substeps structure
   * as _renderWtNav so the paused view is identical to the active-walkthrough navigator. */
  SomaGuide.prototype._renderResumeNav = function () {
    var self = this;
    var bar  = this._$('.sg-resume-steps');
    var wt   = this._wtById(this.pendingResume && this.pendingResume.id);
    if (!wt) { bar.innerHTML = ''; return; }

    var curStepIdx = this.pendingResume.stepIndex;
    var curSubIdx  = this.pendingResume.subStepIndex != null ? this.pendingResume.subStepIndex : -1;
    var html = [];
    var flatN = 0;

    wt.steps.forEach(function (s, i) {
      var isParentCurrent = (i === curStepIdx && curSubIdx === -1);
      var label = s.label || (s.narration ? s.narration.slice(0, 40) + '…' : ('Step ' + (i + 1)));
      var hasSubsteps = s.substeps && s.substeps.length > 0;

      if (hasSubsteps) html.push('<div class="sg-wt-nav-group">');
      html.push(
        '<button class="sg-wt-nav-step' + (isParentCurrent ? ' sg-wt-nav-step--current' : '') +
        '" data-si="' + i + '" data-sub="-1">' + (flatN + 1) + '. ' + label + '</button>'
      );
      flatN++;
      if (hasSubsteps) {
        html.push('<div class="sg-wt-nav-substeps">');
        s.substeps.forEach(function (sub, j) {
          var isSubCurrent = (i === curStepIdx && j === curSubIdx);
          var subLabel = sub.label || (sub.narration ? sub.narration.slice(0, 35) + '…' : ('Sub-step ' + (j + 1)));
          html.push(
            '<button class="sg-wt-nav-step sg-wt-nav-step--sub' + (isSubCurrent ? ' sg-wt-nav-step--current' : '') +
            '" data-si="' + i + '" data-sub="' + j + '">' + (flatN + 1) + '. ' + subLabel + '</button>'
          );
          flatN++;
        });
        html.push('</div></div>');
      }
    });

    bar.innerHTML = html.join('');
    bar.querySelectorAll('.sg-wt-nav-step').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var si  = parseInt(btn.getAttribute('data-si'),  10);
        var sub = parseInt(btn.getAttribute('data-sub'), 10);
        self._wtStart(self.pendingResume.id, si, sub);
      });
    });
  };

  /* Return to the neutral idle state, discarding any in-progress tour resume. */
  SomaGuide.prototype._wtGoToNeutral = function () {
    this._autoClear();
    this._ttsStop();
    this._demoStop();
    this._clearHighlight();
    this._wtCloseDropdowns();
    this.wt = null;
    this.pendingResume = null;
    this._ssDel('resume-id');
    this._ssDel('resume-step');
    this._ssDel('resume-substep');
    this._openIdle(false);
  };

  /* Render the step-tree navigator inside the active walkthrough panel.
   * Highlights the current step; clicking any step jumps there (satisfying its preconditions).
   * Steps with substeps are wrapped in sg-wt-nav-group; substeps go in sg-wt-nav-substeps
   * for visual nesting. All buttons (including the parent/first step) are clickable. */
  SomaGuide.prototype._renderWtNav = function () {
    var self   = this;
    var navDiv = this._$('.sg-wt-nav');
    if (!navDiv || !this.wt) { if (navDiv) navDiv.innerHTML = ''; return; }
    var wt = this._wtById(this.wt.id);
    if (!wt) { navDiv.innerHTML = ''; return; }

    var curStepIdx = this.wt.stepIndex;
    var curSubIdx  = this.wt.subStepIndex != null ? this.wt.subStepIndex : -1;
    var html = [];
    var flatN = 0;

    wt.steps.forEach(function (s, i) {
      var isParentCurrent = (i === curStepIdx && curSubIdx === -1);
      var label = s.label || (s.narration ? s.narration.slice(0, 40) + '…' : ('Step ' + (i + 1)));
      var hasSubsteps = s.substeps && s.substeps.length > 0;

      if (hasSubsteps) html.push('<div class="sg-wt-nav-group">');
      html.push(
        '<button class="sg-wt-nav-step' + (isParentCurrent ? ' sg-wt-nav-step--current' : '') +
        '" data-si="' + i + '" data-sub="-1">' + (flatN + 1) + '. ' + label + '</button>'
      );
      flatN++;
      if (hasSubsteps) {
        html.push('<div class="sg-wt-nav-substeps">');
        s.substeps.forEach(function (sub, j) {
          var isSubCurrent = (i === curStepIdx && j === curSubIdx);
          var subLabel = sub.label || (sub.narration ? sub.narration.slice(0, 35) + '…' : ('Sub-step ' + (j + 1)));
          html.push(
            '<button class="sg-wt-nav-step sg-wt-nav-step--sub' + (isSubCurrent ? ' sg-wt-nav-step--current' : '') +
            '" data-si="' + i + '" data-sub="' + j + '">' + (flatN + 1) + '. ' + subLabel + '</button>'
          );
          flatN++;
        });
        html.push('</div></div>');
      }
    });

    navDiv.innerHTML = html.join('');
    navDiv.querySelectorAll('.sg-wt-nav-step').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (!self.wt) return;
        var si  = parseInt(btn.getAttribute('data-si'),  10);
        var sub = parseInt(btn.getAttribute('data-sub'), 10);
        self._wtStart(self.wt.id, si, sub);
      });
    });
  };

  SomaGuide.prototype._clearHighlight = function () {
    document.querySelectorAll('.sg-highlight').forEach(function (el) {
      el.classList.remove('sg-highlight');
      if (el.dataset.sgWasInline) delete el.dataset.sgWasInline;
    });
  };

  /* ── ElevenLabs voice / text ──────────────────────────────────────────────── */

  SomaGuide.prototype._loadConvClass = function () {
    var self = this;
    if (self.ConvClass) return Promise.resolve(self.ConvClass);
    var esmUrl = self.cfg.voiceAgentEsmUrl || ELEVENLABS_ESM;
    var imp = (typeof global.__importStub === 'function')
      ? global.__importStub
      : function (u) { return import(u); };
    return imp(esmUrl).then(function (mod) {
      self.ConvClass = mod.Conversation;
      return self.ConvClass;
    });
  };

  SomaGuide.prototype._startConversation = function (textOnly) {
    var self = this;
    var agentId = this.cfg.voiceAgentId;
    if (!agentId) return Promise.reject(new Error('No voiceAgentId configured'));

    self._convConnected = false;
    self._convBuffer = null;

    return this._loadConvClass().then(function (Conversation) {
      return Conversation.startSession({
        agentId: agentId,
        textOnly: textOnly === true ? true : undefined,
        onConnect: function () {
          self._convConnected = true;
          if (self._convBuffer) {
            var buffered = self._convBuffer;
            self._convBuffer = null;
            try {
              if (self.conversation && typeof self.conversation.sendUserMessage === 'function') {
                self.conversation.sendUserMessage(buffered);
              }
            } catch (e) { console.warn('[SomaGuide] buffered send error', e); }
          }
        },
        onMessage: function (data) {
          if (data && data.source === 'ai') self._onAgentMessage(data.message || data.text || '');
        },
        onError: function (msg) { console.warn('[SomaGuide]', msg); },
        onModeChange: function (data) {
          if (self.mode !== 'voice') return;
          var speaking = data && data.mode === 'speaking';
          var orb = self._$('.sg-orb');
          if (orb) orb.classList.toggle('sg-orb--speaking', speaking);
          var status = self._$('.sg-voice-status');
          if (status) status.textContent = speaking ? 'Speaking…' : 'Listening…';
        },
        onDisconnect: function () {
          if (self.mode === 'voice') {
            var status = self._$('.sg-voice-status');
            if (status) status.textContent = 'Disconnected.';
          }
        }
      });
    }).then(function (conv) {
      self.conversation = conv;
      return conv;
    });
  };

  SomaGuide.prototype._stopConversation = function () {
    this._convConnected = false;
    this._convBuffer = null;
    if (this.conversation) {
      try { this.conversation.endSession(); } catch (e) {}
      this.conversation = null;
    }
  };

  SomaGuide.prototype._onAgentMessage = function (text) {
    if (this.mode === 'text') {
      this._appendMessage('agent', text);
    } else if (this.mode === 'voice') {
      var t = this._$('.sg-voice-transcript');
      if (t) t.textContent = text;
    }
  };

  SomaGuide.prototype._sendText = function (text) {
    if (typeof text !== 'string') return;
    text = text.trim();
    if (!text) return;

    var input = this._$('.sg-input');
    if (input) input.value = '';

    this._appendMessage('user', text);

    var match = this._matchWalkthrough(text);
    if (match) {
      this._wtStart(match.id, 0, -1);
      return;
    }

    var self = this;
    var send = function () {
      if (self.conversation) {
        if (self._convConnected) {
          return Promise.resolve(self.conversation.sendUserMessage(text));
        }
        self._convBuffer = text;
        return Promise.resolve();
      }
      return self._startConversation(true).then(function (conv) {
        if (self._convConnected) {
          return conv.sendUserMessage(text);
        }
        self._convBuffer = text;
      });
    };

    send().catch(function (e) {
      console.warn('[SomaGuide] send error', e);
      self._appendMessage('agent', 'Sorry, I had trouble connecting — please try again.');
    });
  };

  SomaGuide.prototype._matchWalkthrough = function (text) {
    var lower = text.toLowerCase();
    return (this.cfg.walkthroughs || []).filter(function (wt) {
      return (wt.keywords || []).some(function (kw) { return lower.indexOf(kw) !== -1; });
    })[0] || null;
  };

  SomaGuide.prototype._appendMessage = function (role, text) {
    var msgs = this._$('.sg-messages');
    if (!msgs) return;
    var div = document.createElement('div');
    div.className = 'sg-msg sg-msg--' + role;
    div.textContent = text;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  };

  /* ── TTS narration ──────────────────────────────────────────────────────────── */

  SomaGuide.prototype._ttsEnabled = function () {
    return !!(this.cfg.ttsProxyUrl && this.cfg.voiceAgentId) && !this._ttsMuted;
  };

  /* Stable djb2-xor hash of voiceAgentId + '|' + narration → 8-char hex string.
   * MUST match the identical function in scripts/gen-tour-audio.mjs. */
  SomaGuide.prototype._tourAudioHash = function (agentId, narration) {
    var s = (agentId || '') + '|' + (narration || '');
    var h = 0;
    for (var i = 0; i < s.length; i++) {
      h = (((h << 5) + h) ^ s.charCodeAt(i)) | 0;
    }
    return ('0000000' + (h >>> 0).toString(16)).slice(-8);
  };

  SomaGuide.prototype._ttsStop = function () {
    if (this._ttsAudio) {
      this._ttsAudio.pause();
      this._ttsAudio.src = '';
      this._ttsAudio = null;
    }
  };

  /* _ttsSpeak(text, onEnded?)
   *
   * onEnded: called when audio finishes (or fallback fires when muted/unavailable).
   *          Never called before audio actually ends; fallback is computed to be
   *          generous enough to never truncate real narration.
   *
   * Playback order:
   *  1. Pre-generated static clip at /audio/tour/<hash>.mp3 (instant CDN hit).
   *  2. Prefetch cache for live TTS (populated by _ttsPrefetchNext).
   *  3. Live TTS fetch from the proxy.
   *
   * Robust timing:
   *  - Muted/no TTS: fallback = max(TTS_FLOOR_MS, chars * TTS_MS_PER_CHAR).
   *  - TTS enabled: pre-play fallback = chars * TTS_MS_PER_CHAR + TTS_BUFFER_MS.
   *    Replaced with duration-based timer once loadedmetadata fires.
   *    Cancelled entirely when 'ended' fires naturally.
   */
  SomaGuide.prototype._ttsSpeak = function (text, onEnded) {
    var self = this;
    this._ttsStop();

    var fallbackMs = Math.max(TTS_FLOOR_MS, (text || '').length * TTS_MS_PER_CHAR);

    if (!this._ttsEnabled() || !text) {
      if (onEnded) self._autoTimer = setTimeout(onEnded, fallbackMs);
      /* Arm cursor lead-in for the muted / no-TTS path */
      if (self._pendingCursorTarget && self._pendingCursorDemo) {
        var pt0 = self._pendingCursorTarget;
        var pd0 = self._pendingCursorDemo;
        var li0 = (self.cfg.cursorLeadIn !== undefined) ? self.cfg.cursorLeadIn : CURSOR_LEAD_IN;
        if (self._cursorLeadTimer) clearTimeout(self._cursorLeadTimer);
        self._cursorLeadTimer = setTimeout(function () {
          self._cursorLeadTimer = null;
          self._demoMoveTo(pt0, pd0);
        }, li0);
      }
      return;
    }

    var liveUrl = this.cfg.ttsProxyUrl +
      '?action=tts' +
      '&text=' + encodeURIComponent(text) +
      '&agent_id=' + encodeURIComponent(this.cfg.voiceAgentId);

    /* Snapshot prefetch cache before _ttsPrefetchNext may clear it. */
    var cached = (self._ttsPrefetchCache && self._ttsPrefetchCache.url === liveUrl)
      ? self._ttsPrefetchCache : null;

    /* Kick off next-step live-TTS prefetch in parallel for use as fallback. */
    this._ttsPrefetchNext();

    var staticUrl = '/audio/tour/' + this._tourAudioHash(this.cfg.voiceAgentId, text) + '.mp3';
    var fetchFn   = (typeof global !== 'undefined' && global.fetch) || fetch;

    function playBlob(blob) {
      if (!blob || !self._ttsEnabled()) {
        if (onEnded) self._autoTimer = setTimeout(onEnded, fallbackMs);
        return;
      }
      var objUrl = (typeof URL !== 'undefined' && URL.createObjectURL)
        ? URL.createObjectURL(blob) : null;
      if (!objUrl) {
        if (onEnded) self._autoTimer = setTimeout(onEnded, fallbackMs);
        return;
      }
      self._ttsPlayBlob(objUrl, fallbackMs, onEnded);
    }

    /* Try pre-generated static clip first; fall through to live TTS on miss. */
    fetchFn(staticUrl).then(function (r) {
      if (r.ok) return r.blob().then(playBlob);

      /* Static miss — use prefetch cache if available, else fetch live TTS. */
      if (cached) {
        self._ttsPrefetchCache = null;
        self._ttsPrefetchUrl   = null;
        self._ttsPlayBlob(cached.blobUrl, fallbackMs, onEnded);
        return;
      }
      return fetchFn(liveUrl).then(function (r2) {
        return r2.ok ? r2.blob() : null;
      }).then(playBlob);
    }).catch(function (e) {
      console.warn('[SomaGuide] TTS error', e);
      if (onEnded) self._autoTimer = setTimeout(onEnded, fallbackMs);
    });
  };

  /* Attach an Audio element and manage timing via ended + loadedmetadata. */
  SomaGuide.prototype._ttsPlayBlob = function (objUrl, fallbackMs, onEnded) {
    var self  = this;
    var audio = new Audio(objUrl);
    self._ttsAudio = audio;

    if (onEnded) {
      /* Pre-play fallback — replaced when metadata arrives */
      self._autoTimer = setTimeout(onEnded, fallbackMs + TTS_BUFFER_MS);

      audio.addEventListener('loadedmetadata', function () {
        if (self._ttsAudio !== audio) return;
        clearTimeout(self._autoTimer);
        var durationMs = Math.ceil(audio.duration * 1000);
        self._autoTimer = setTimeout(onEnded, durationMs + TTS_BUFFER_MS);
      }, { once: true });

      audio.addEventListener('ended', function () {
        if (self._ttsAudio !== audio) return;
        clearTimeout(self._autoTimer);
        self._autoTimer = null;
        onEnded();
      }, { once: true });
    }

    audio.play().then(function () {
      /* Arm cursor lead-in now that audio has actually started playing */
      var pt = self._pendingCursorTarget;
      var pd = self._pendingCursorDemo;
      if (pt && pd) {
        var li = (self.cfg.cursorLeadIn !== undefined) ? self.cfg.cursorLeadIn : CURSOR_LEAD_IN;
        if (self._cursorLeadTimer) clearTimeout(self._cursorLeadTimer);
        self._cursorLeadTimer = setTimeout(function () {
          self._cursorLeadTimer = null;
          self._demoMoveTo(pt, pd);
        }, li);
      }
      self._ttsPrefetchNext();
    }).catch(function () {
      /* Autoplay blocked — fall back to timer, no cursor */
      if (onEnded) {
        clearTimeout(self._autoTimer);
        self._autoTimer = setTimeout(onEnded, fallbackMs);
      }
    });
  };

  /* Pre-fetch the next step's audio blob in the background during current playback. */
  SomaGuide.prototype._ttsPrefetchNext = function () {
    var self = this;
    if (!this._ttsEnabled() || !this.wt) return;
    var wt = this._wtById(this.wt.id);
    if (!wt) return;

    var stepIdx  = this.wt.stepIndex;
    var subIdx   = this.wt.subStepIndex != null ? this.wt.subStepIndex : -1;
    var topStep  = wt.steps[stepIdx];
    var substeps = (topStep && topStep.substeps) ? topStep.substeps : [];
    var nextStep = null;

    if (subIdx === -1 && substeps.length > 0) {
      nextStep = substeps[0];
    } else if (subIdx >= 0 && subIdx + 1 < substeps.length) {
      nextStep = substeps[subIdx + 1];
    } else if (stepIdx + 1 < wt.steps.length) {
      nextStep = wt.steps[stepIdx + 1];
    }

    if (!nextStep || !nextStep.narration || nextStep.page) return; /* skip if navigates */

    var url = this.cfg.ttsProxyUrl +
      '?action=tts' +
      '&text=' + encodeURIComponent(nextStep.narration) +
      '&agent_id=' + encodeURIComponent(this.cfg.voiceAgentId);

    if (self._ttsPrefetchUrl === url) return;           /* in-flight dedup */
    if (self._ttsPrefetchCache && self._ttsPrefetchCache.url === url) return; /* already cached */
    self._ttsPrefetchUrl = url;
    self._ttsPrefetchCache = null;

    var fetchFn = (typeof global !== 'undefined' && global.fetch) || fetch;
    fetchFn(url).then(function (r) {
      if (!r.ok) return null;
      return r.blob();
    }).then(function (blob) {
      if (!blob || self._ttsPrefetchUrl !== url) return;
      var objUrl = (typeof URL !== 'undefined' && URL.createObjectURL)
        ? URL.createObjectURL(blob) : null;
      if (objUrl) self._ttsPrefetchCache = { url: url, blobUrl: objUrl };
      self._ttsPrefetchUrl = null;
    }).catch(function () {
      if (self._ttsPrefetchUrl === url) self._ttsPrefetchUrl = null;
    });
  };

  SomaGuide.prototype._ttsMuteToggle = function () {
    this._ttsMuted = !this._ttsMuted;
    this._lsSet('tts-muted', this._ttsMuted ? '1' : '0');
    this._updateMuteBtn();
    if (this._ttsMuted) {
      this._ttsStop();
    } else if (this.mode === 'walkthrough' && this.wt) {
      var step = this._wtCurrentStep();
      if (step) this._ttsSpeak(step.narration || '');
    }
  };

  SomaGuide.prototype._ttsReplay = function () {
    if (!this.wt) return;
    var step = this._wtCurrentStep();
    if (step) this._ttsSpeak(step.narration || '');
  };

  SomaGuide.prototype._updateMuteBtn = function () {
    var btn = this._$('.sg-btn-mute');
    if (!btn) return;
    btn.textContent = this._ttsMuted ? '🔇' : '🔊';
    btn.setAttribute('title',      this._ttsMuted ? 'Unmute narration' : 'Mute narration');
    btn.setAttribute('aria-label', this._ttsMuted ? 'Unmute narration' : 'Mute narration');
  };

  /* ── Dev: verify a config's selectors and narration ─────────────────────── */
  SomaGuide.verify = function (config) {
    var issues = [];
    if (typeof document === 'undefined') {
      return [{ message: 'verify() requires a DOM environment' }];
    }
    function checkStep(wtId, stepPath, step) {
      if (!step.narration) {
        issues.push({ walkthrough: wtId, step: stepPath, issue: 'empty narration' });
      }
      if (step.target) {
        var el = document.querySelector(step.target);
        if (!el) issues.push({ walkthrough: wtId, step: stepPath, issue: 'target not found: ' + step.target });
      }
      if (step.requires && step.requires.dropdown) {
        var dp = document.querySelector(step.requires.dropdown);
        if (!dp) issues.push({ walkthrough: wtId, step: stepPath, issue: 'requires.dropdown not found: ' + step.requires.dropdown });
      }
    }
    (config.walkthroughs || []).forEach(function (wt) {
      (wt.steps || []).forEach(function (step, i) {
        checkStep(wt.id, i, step);
        (step.substeps || []).forEach(function (sub, j) {
          checkStep(wt.id, i + '.' + j, sub);
        });
      });
    });
    return issues;
  };

  /* ── Public API ── */
  SomaGuide.prototype.open    = function () { this._openIdle(false); };
  SomaGuide.prototype.minimize = function () { this._minimize(); };
  SomaGuide.prototype.startWalkthrough = function (id, step) { this._wtStart(id, step || 0, -1); };

  /* ── Auto-init ── */
  global.SomaGuide = SomaGuide;

  if (typeof document !== 'undefined') {
    var init = function () {
      var cfg = global.SomaGuideConfig;
      if (cfg && !global.somaGuide) {
        global.somaGuide = new SomaGuide(cfg);
      }
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }

}(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this));
