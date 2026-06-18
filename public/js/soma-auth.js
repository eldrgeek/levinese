/**
 * SOMA Auth — browser IIFE build
 * Exposes window.SomaAuth. Requires window.supabase (load from CDN first).
 * Config comes from window.SOMA_AUTH_CONFIG (load soma-auth-config.js first).
 *
 * Load order in HTML:
 *   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js"></script>
 *   <script src="/js/soma-auth-config.js"></script>
 *   <script src="/js/soma-auth.js"></script>
 */
(function (global) {
  'use strict';

  var _client = null;
  var _handlers = [];
  var _initialized = false;

  function dispatch(event, session) {
    for (var i = 0; i < _handlers.length; i++) {
      try {
        _handlers[i](event, session);
      } catch (e) {
        console.error('[SomaAuth] handler error:', e);
      }
    }
  }

  var SomaAuth = {
    /**
     * Initialize the Supabase client. Call once per page after registering
     * onAuthStateChange handlers. Reads url/anonKey from SOMA_AUTH_CONFIG if
     * not passed directly.
     */
    init: function (url, anonKey) {
      if (_initialized) return SomaAuth;
      _initialized = true;

      var cfg = global.SOMA_AUTH_CONFIG || {};
      url = url || cfg.url;
      anonKey = anonKey || cfg.anonKey;

      var lib = global.supabase;
      if (!lib || !url || !anonKey) {
        // Graceful degradation: fire INITIAL_SESSION with null so gated pages
        // redirect to login (which shows a graceful error) and public pages
        // just show logged-out state in the nav.
        console.warn('[SomaAuth] Supabase unavailable or config missing — auth disabled');
        setTimeout(function () { dispatch('INITIAL_SESSION', null); }, 0);
        return SomaAuth;
      }

      _client = lib.createClient(url, anonKey);
      // Supabase v2: onAuthStateChange fires INITIAL_SESSION on next tick with
      // the persisted session (or null). All _handlers receive every event.
      _client.auth.onAuthStateChange(dispatch);
      return SomaAuth;
    },

    /**
     * Register a handler for auth state changes.
     * handler(event, session) — event is one of:
     *   'INITIAL_SESSION' | 'SIGNED_IN' | 'SIGNED_OUT' | 'TOKEN_REFRESHED'
     * Must be called BEFORE init() to receive INITIAL_SESSION.
     */
    onAuthStateChange: function (handler) {
      _handlers.push(handler);
      return SomaAuth;
    },

    /**
     * Send a magic-link (OTP) email. Options: { emailRedirectTo: 'https://...' }
     */
    signInWithOtp: function (email, options) {
      if (!_client) return Promise.reject(new Error('[SomaAuth] not initialized'));
      return _client.auth.signInWithOtp({ email: email, options: options || {} });
    },

    signOut: function () {
      if (!_client) return Promise.resolve({ error: null });
      return _client.auth.signOut();
    },

    getSession: function () {
      if (!_client) return Promise.resolve({ data: { session: null }, error: null });
      return _client.auth.getSession();
    },

    getUser: function () {
      if (!_client) return Promise.resolve({ data: { user: null }, error: null });
      return _client.auth.getUser();
    },

    /**
     * Fetch the user's role from the profiles table.
     * Returns 'admin' | 'member' | null. Defaults to 'member' on any error
     * (profiles table not yet created, network error, etc.).
     */
    getRole: function (user) {
      if (!user || !_client) return Promise.resolve(null);
      return _client
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()
        .then(function (result) {
          if (result.error || !result.data) return 'member';
          return result.data.role || 'member';
        })
        .catch(function () { return 'member'; });
    }
  };

  global.SomaAuth = SomaAuth;
})(window);
