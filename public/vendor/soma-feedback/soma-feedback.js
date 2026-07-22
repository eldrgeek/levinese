/*!
 * soma-feedback.js — SOMA App Standard §8
 * v3 — 2026-07-05: single Submit, clarity/clarify loop, build-by-intent
 * server classification, and silent Google One Tap admin-token detection.
 * v3.1 — 2026-07-05: also send window.__somaAdminToken (Yeshie-injected,
 * no-login admin identity) as adminToken alongside googleIdToken.
 *
 * A single embeddable, framework-free feedback widget: a bottom-left tab
 * opens a compact panel where a participant can say what should change.
 * The server may ask clarifying questions; the widget resends the full
 * conversation each turn because the backend is stateless.
 *
 * Zero dependencies. Copy this file + soma-feedback.css into any static
 * site, then add:
 *
 *   <link rel="stylesheet" href="/vendor/soma-feedback/soma-feedback.css">
 *   <script src="/vendor/soma-feedback/soma-feedback.js"
 *           data-site="my-site-name"
 *           data-endpoint="https://vpsmikewolf.duckdns.org/feedback-svc/feedback"
 *           defer></script>
 *
 * Config via data-* attributes on the script tag:
 *   data-endpoint          optional; defaults to the SOMA VPS feedback svc.
 *   data-site              optional; short app/site identifier.
 *   data-label             optional; tab label, default "Feedback".
 *   data-area              optional; coarse origin label.
 *   data-google-client-id  optional; Google Identity Services client ID.
 *
 * Optional page-level global:
 *   window.somaFeedbackIdentity — function returning { name, email } or a
 *   Promise of it. Values populate blank fields when the panel opens, but
 *   never overwrite fields a user has actively edited this session.
 */
(function () {
  'use strict';

  if (typeof document === 'undefined' || typeof window === 'undefined') return;

  var DEFAULT_ENDPOINT = 'https://vpsmikewolf.duckdns.org/feedback-svc/feedback';
  var DEFAULT_GOOGLE_CLIENT_ID = '1072944905499-vm2v2i5dvn0a0d2o4ca36i1vge8cvbn0.apps.googleusercontent.com';

  function currentScript() {
    if (document.currentScript) return document.currentScript;
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length - 1; i >= 0; i--) {
      if (/soma-feedback\.js/.test(scripts[i].src)) return scripts[i];
    }
    return null;
  }

  var script = currentScript();
  var endpoint = (script && script.getAttribute('data-endpoint')) || DEFAULT_ENDPOINT;
  var site = (script && script.getAttribute('data-site')) || document.title || 'unknown-site';
  var label = (script && script.getAttribute('data-label')) || 'Feedback';
  var scriptArea = (script && script.getAttribute('data-area')) || '';
  var googleClientId = (script && script.getAttribute('data-google-client-id')) || DEFAULT_GOOGLE_CLIENT_ID;

  function el(tag, attrs, children) {
    var e = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'text') e.textContent = attrs[k];
        else e.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) { e.appendChild(c); });
    return e;
  }

  function loadRemembered(field) {
    try { return window.localStorage.getItem('soma-feedback:' + field) || ''; }
    catch (_) { return ''; }
  }
  function remember(field, value) {
    try { window.localStorage.setItem('soma-feedback:' + field, value); }
    catch (_) { /* localStorage may be unavailable; non-fatal. */ }
  }

  function resolveIdentity(cb) {
    var hook = window.somaFeedbackIdentity;
    if (typeof hook !== 'function') { cb(null); return; }
    try {
      var result = hook();
      if (result && typeof result.then === 'function') {
        result.then(function (v) { cb(v || null); }, function () { cb(null); });
      } else {
        cb(result || null);
      }
    } catch (err) {
      console.warn('[soma-feedback] somaFeedbackIdentity threw, ignoring:', err);
      cb(null);
    }
  }

  var mount = el('div', { class: 'soma-feedback-root' });

  var tab = el('button', {
    class: 'soma-feedback-tab',
    type: 'button',
    'aria-expanded': 'false',
    'aria-label': label + ' — under construction, tell us what to change',
  }, [document.createTextNode('Feedback')]);

  var panel = el('div', { class: 'soma-feedback-panel', hidden: 'hidden' });

  var heading = el('div', { class: 'soma-feedback-heading' }, [
    el('strong', { text: label }),
    el('span', { class: 'soma-feedback-microcopy', text: 'Under construction — tell us what to change.' }),
  ]);
  var closeBtn = el('button', { class: 'soma-feedback-close', type: 'button', 'aria-label': 'Close' }, [document.createTextNode('×')]);
  heading.appendChild(closeBtn);

  var textarea = el('textarea', {
    class: 'soma-feedback-textarea',
    placeholder: 'What should we change? Be as specific as you can.',
    rows: '5',
  });

  var nameInput = el('input', { class: 'soma-feedback-input', type: 'text', placeholder: 'Your name', value: loadRemembered('name') });
  var emailInput = el('input', { class: 'soma-feedback-input', type: 'email', placeholder: 'Your email (optional)', value: loadRemembered('email') });
  var honeypot = el('input', { class: 'soma-feedback-hp', type: 'text', name: 'website', tabindex: '-1', autocomplete: 'off' });

  var submitBtn = el('button', { class: 'soma-feedback-submit', type: 'button' }, [document.createTextNode('Submit')]);
  var actions = el('div', { class: 'soma-feedback-actions' }, [submitBtn]);
  var statusLine = el('div', { class: 'soma-feedback-status', 'aria-live': 'polite' });

  var thread = el('div', { class: 'soma-feedback-thread', hidden: 'hidden', 'aria-live': 'polite' });
  var clarifyReply = el('textarea', {
    class: 'soma-feedback-clarify-input',
    placeholder: 'Reply with the missing detail.',
    rows: '3',
  });
  var clarifySend = el('button', { class: 'soma-feedback-clarify-send', type: 'button' }, [document.createTextNode('Send')]);
  var clarifyControls = el('div', { class: 'soma-feedback-clarify-controls', hidden: 'hidden' }, [clarifyReply, clarifySend]);

  var retryBtn = el('button', { class: 'soma-feedback-retry', type: 'button', hidden: 'hidden' }, [document.createTextNode('Retry')]);

  var footer = el('div', { class: 'soma-feedback-footer' }, [
    el('span', { class: 'soma-feedback-footer-text', text: 'Build requests are detected by intent.' }),
  ]);
  var adminLink = el('button', {
    class: 'soma-feedback-admin-link',
    type: 'button',
    'aria-label': 'Sign in as an admin with Google',
  }, [document.createTextNode('admin')]);
  footer.appendChild(adminLink);

  panel.appendChild(heading);
  panel.appendChild(textarea);
  panel.appendChild(nameInput);
  panel.appendChild(emailInput);
  panel.appendChild(honeypot);
  panel.appendChild(actions);
  panel.appendChild(statusLine);
  panel.appendChild(thread);
  panel.appendChild(clarifyControls);
  panel.appendChild(retryBtn);
  panel.appendChild(footer);
  mount.appendChild(panel);
  mount.appendChild(tab);

  function ready() {
    document.body.appendChild(mount);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
  } else {
    ready();
  }

  var nameTouched = false;
  var emailTouched = false;
  var requestInFlight = false;
  var phase = 'idle';
  var conversation = [];
  var pendingQuestion = '';
  var currentRetry = null;
  var googleIdToken = '';
  var gisLoading = false;
  var gisLoaded = false;
  var gisInitialized = false;
  var silentGoogleAttempted = false;
  var lastElementHint = '';
  var lastArea = '';

  function closestArea(node) {
    while (node && node !== document) {
      if (node.getAttribute && node.getAttribute('data-area')) return node.getAttribute('data-area');
      node = node.parentElement;
    }
    return '';
  }

  function currentArea() {
    return scriptArea ||
      (script && closestArea(script)) ||
      lastArea ||
      closestArea(document.activeElement) ||
      (document.body && document.body.getAttribute('data-area')) ||
      '';
  }

  function describeElement(node) {
    if (!node || node === document.body || node === document.documentElement) return '';
    var tag = node.tagName ? node.tagName.toLowerCase() : '';
    var text = (node.textContent || '').trim().slice(0, 80);
    var id = node.id ? '#' + node.id : '';
    var cls = node.className && typeof node.className === 'string'
      ? '.' + node.className.trim().split(/\s+/).slice(0, 2).join('.')
      : '';
    return [tag + id + cls, text].filter(Boolean).join(' — ');
  }

  function captureOrigin(target) {
    lastArea = closestArea(target) || lastArea;
    lastElementHint = describeElement(target) || lastElementHint;
  }

  document.addEventListener('contextmenu', function (e) { captureOrigin(e.target); }, true);
  document.addEventListener('click', function (e) {
    if (!mount.contains(e.target)) captureOrigin(e.target);
  }, true);
  document.addEventListener('focusin', function (e) {
    if (!mount.contains(e.target)) lastArea = closestArea(e.target) || lastArea;
  }, true);
  document.addEventListener('mouseup', function () {
    var sel = window.getSelection && window.getSelection();
    if (sel && String(sel).trim().length > 0) {
      lastElementHint = 'selected text: "' + String(sel).trim().slice(0, 120) + '"';
      lastArea = closestArea(sel.anchorNode && sel.anchorNode.parentElement) || lastArea;
    }
  });

  function applyIdentity(identity) {
    if (!identity) return;
    if (identity.name && !nameTouched && !nameInput.value.trim()) nameInput.value = identity.name;
    if (identity.email && !emailTouched && !emailInput.value.trim()) emailInput.value = identity.email;
  }

  nameInput.addEventListener('input', function () { nameTouched = true; });
  emailInput.addEventListener('input', function () { emailTouched = true; });

  function setStatus(msg, kind) {
    statusLine.textContent = msg || '';
    statusLine.className = 'soma-feedback-status' + (kind ? ' soma-feedback-status--' + kind : '');
  }

  function setTabResult(kind) {
    tab.classList.remove('soma-feedback-tab--result-success', 'soma-feedback-tab--result-error');
    if (kind) tab.classList.add('soma-feedback-tab--result-' + kind);
  }
  function clearTabResult() { setTabResult(null); }

  function focusableInPanel() {
    var candidates = panel.querySelectorAll(
      'button:not([disabled]):not([tabindex="-1"]), ' +
      'input:not([disabled]):not([tabindex="-1"]), ' +
      'textarea:not([disabled]):not([tabindex="-1"]), ' +
      '[tabindex]:not([tabindex="-1"])'
    );
    return Array.prototype.filter.call(candidates, function (node) {
      return !node.hidden && node.offsetParent !== null;
    });
  }

  function trapTabKey(e) {
    if (e.key !== 'Tab' || panel.hidden) return;
    var items = focusableInPanel();
    if (!items.length) return;
    var first = items[0];
    var last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function resetFlow(preserveText) {
    phase = 'idle';
    conversation = [];
    pendingQuestion = '';
    currentRetry = null;
    thread.hidden = true;
    clarifyControls.hidden = true;
    clarifyReply.value = '';
    retryBtn.hidden = true;
    if (!preserveText) textarea.value = '';
    updateControls();
  }

  function updateControls() {
    var lockedForClarify = !thread.hidden && phase !== 'idle';
    var locked = requestInFlight || lockedForClarify || phase === 'accepted';
    textarea.disabled = locked;
    nameInput.disabled = locked;
    emailInput.disabled = locked;
    submitBtn.disabled = requestInFlight || phase === 'accepted' || !thread.hidden;
    retryBtn.disabled = requestInFlight;
    clarifyReply.disabled = requestInFlight || phase !== 'clarify' || !pendingQuestion;
    clarifySend.disabled = requestInFlight || phase !== 'clarify' || !pendingQuestion;
  }

  function openPanel() {
    if (phase === 'accepted') resetFlow(false);
    panel.hidden = false;
    tab.setAttribute('aria-expanded', 'true');
    clearTabResult();
    resolveIdentity(applyIdentity);
    attemptSilentGoogleCredential();
    updateControls();
    if (phase === 'clarify') clarifyReply.focus();
    else textarea.focus();
  }

  function closePanel(force) {
    if (panel.hidden) return;
    if (requestInFlight && !force) return;
    var focusWasInPanel = panel.contains(document.activeElement);
    if (phase === 'clarify' || phase === 'error') resetFlow(true);
    panel.hidden = true;
    tab.setAttribute('aria-expanded', 'false');
    if (focusWasInPanel) tab.focus();
  }

  tab.addEventListener('click', function () {
    if (panel.hidden) openPanel(); else closePanel();
  });
  closeBtn.addEventListener('click', function () { closePanel(); });
  panel.addEventListener('keydown', trapTabKey);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !panel.hidden) closePanel();
  });

  function stampTime(ts) {
    var stamp = ts ? new Date(ts) : new Date();
    if (Number.isNaN(stamp.getTime())) stamp = new Date();
    return String(stamp.getHours()).padStart(2, '0') + ':' + String(stamp.getMinutes()).padStart(2, '0');
  }

  function makePayload() {
    var payload = {
      site: site,
      page: document.title || '',
      url: window.location.href,
      area: currentArea(),
      text: textarea.value.trim(),
      name: nameInput.value.trim() || 'anonymous',
      email: emailInput.value.trim(),
      elementHint: lastElementHint,
      hp: honeypot.value,
      conversation: conversation.slice(),
    };
    if (googleIdToken) payload.googleIdToken = googleIdToken;
    // Yeshie admin identity: no-login path. If the Yeshie extension has
    // injected window.__somaAdminToken (see yeshie/packages/extension
    // content script), send it as adminToken. The VPS feedback-svc
    // compares it (constant-time) against SOMA_ADMIN_TOKEN and, on match,
    // sets isAdmin=true — additive to the Google-token path, not a
    // replacement. Only meaningful in Mike's own Chrome; harmless no-op
    // (undefined, omitted) everywhere else.
    if (window.__somaAdminToken) payload.adminToken = window.__somaAdminToken;
    return payload;
  }

  function renderThread() {
    thread.textContent = '';
    var visibleTurns = 0;
    conversation.forEach(function (turn, index) {
      if (index === 0 && turn.role === 'user') return;
      visibleTurns += 1;
      thread.appendChild(el('div', {
        class: 'soma-feedback-bubble soma-feedback-bubble--' + turn.role,
        text: turn.content,
      }));
    });
    if (pendingQuestion) {
      thread.appendChild(el('div', {
        class: 'soma-feedback-bubble soma-feedback-bubble--assistant',
        text: pendingQuestion,
      }));
    }
    thread.hidden = visibleTurns === 0 && !pendingQuestion;
  }

  function handleClarify(question) {
    phase = 'clarify';
    pendingQuestion = String(question || 'What detail would help us file this correctly?');
    setStatus('One quick clarification needed.');
    retryBtn.hidden = true;
    clarifyControls.hidden = false;
    clarifyReply.value = '';
    renderThread();
    updateControls();
    clarifyReply.focus();
  }

  function handleAccepted(data) {
    var build = !!(data && data.build);
    phase = 'accepted';
    retryBtn.hidden = true;
    thread.hidden = true;
    clarifyControls.hidden = true;
    setStatus(
      build
        ? 'Accepted ✓ — queued to build (' + stampTime(data && data.filedAt) + ')'
        : 'Filed ✓ — the team has it (' + stampTime(data && data.filedAt) + ')',
      'success'
    );
    setTabResult('success');
    textarea.value = '';
    lastElementHint = '';
    updateControls();
  }

  function postCurrent() {
    requestInFlight = true;
    phase = 'processing';
    retryBtn.hidden = true;
    setStatus('Processing…');
    updateControls();

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(makePayload()),
    })
      .then(function (resp) {
        if (!resp.ok) throw new Error('status ' + resp.status);
        return resp.json();
      })
      .then(function (data) {
        if (data && data.status === 'clarify') {
          handleClarify(data.question);
          return;
        }
        if (data && data.status === 'accepted') {
          handleAccepted(data);
          return;
        }
        throw new Error('unexpected response');
      })
      .catch(function (err) {
        console.error('[soma-feedback] submit failed:', err);
        phase = thread.hidden ? 'error' : 'clarify';
        setStatus('Could not send just now — your text is still here.', 'error');
        setTabResult('error');
        retryBtn.hidden = false;
        updateControls();
      })
      .then(function () {
        requestInFlight = false;
        updateControls();
      });
  }

  function beginSubmit() {
    var text = textarea.value.trim();
    if (!text) {
      setStatus('Type something first.', 'error');
      textarea.focus();
      return;
    }
    remember('name', nameInput.value.trim());
    remember('email', emailInput.value.trim());
    conversation = [{ role: 'user', content: text }];
    pendingQuestion = '';
    currentRetry = postCurrent;
    renderThread();
    postCurrent();
  }

  function sendClarification() {
    if (!pendingQuestion) return;
    var reply = clarifyReply.value.trim();
    if (!reply) {
      clarifyReply.focus();
      return;
    }
    conversation.push({ role: 'assistant', content: pendingQuestion });
    conversation.push({ role: 'user', content: reply });
    pendingQuestion = '';
    currentRetry = postCurrent;
    renderThread();
    postCurrent();
  }

  submitBtn.addEventListener('click', beginSubmit);
  clarifySend.addEventListener('click', sendClarification);
  clarifyReply.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') sendClarification();
  });
  retryBtn.addEventListener('click', function () {
    if (currentRetry) currentRetry();
  });
  textarea.addEventListener('input', function () {
    if (phase === 'idle' || phase === 'error') {
      retryBtn.hidden = true;
      setStatus('');
    }
  });

  function markGoogleSignedIn() {
    adminLink.textContent = 'admin ✓';
    adminLink.setAttribute('aria-label', 'Admin Google identity captured');
  }

  function initializeGis(cb) {
    if (!googleClientId) { if (cb) cb(false); return; }
    if (gisInitialized) { if (cb) cb(true); return; }
    if (window.google && window.google.accounts && window.google.accounts.id) {
      try {
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: function (response) {
            if (response && response.credential) {
              googleIdToken = response.credential;
              markGoogleSignedIn();
            }
          },
          auto_select: true,
          itp_support: true,
          cancel_on_tap_outside: true,
        });
        gisInitialized = true;
        if (cb) cb(true);
      } catch (err) {
        console.warn('[soma-feedback] Google Identity initialization failed:', err);
        if (cb) cb(false);
      }
      return;
    }

    if (gisLoading) {
      window.setTimeout(function () { initializeGis(cb); }, 120);
      return;
    }
    gisLoading = true;
    var s = document.createElement('script');
    s.src = 'https://accounts.google.com/gsi/client';
    s.async = true;
    s.defer = true;
    s.onload = function () {
      gisLoaded = true;
      gisLoading = false;
      initializeGis(cb);
    };
    s.onerror = function () {
      gisLoading = false;
      if (cb) cb(false);
    };
    document.head.appendChild(s);
  }

  function promptGoogle(silent) {
    initializeGis(function (ok) {
      if (!ok || !window.google || !window.google.accounts || !window.google.accounts.id) return;
      try {
        window.google.accounts.id.prompt(function (notification) {
          if (!silent) return;
          try {
            if (notification && notification.isDisplayed && notification.isDisplayed()) {
              window.google.accounts.id.cancel();
            }
          } catch (_) {
            /* Moment notifications vary by browser; token callback is authoritative. */
          }
        });
      } catch (err) {
        console.warn('[soma-feedback] Google One Tap prompt failed:', err);
      }
    });
  }

  function attemptSilentGoogleCredential() {
    if (silentGoogleAttempted || googleIdToken || !googleClientId) return;
    silentGoogleAttempted = true;
    promptGoogle(true);
  }

  adminLink.addEventListener('click', function () {
    promptGoogle(false);
  });
}());
