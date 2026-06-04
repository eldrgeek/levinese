/* Levinese per-site config for the SOMA Guide widget.
 * Persona: Proteus — shape-shifting guide from the Platonic space of forms.
 *
 * TODO: swap voiceAgentId for a distinct Proteus voice once provisioned;
 *       currently reusing the bill-talk agent (agent_2401ks53q6t8e2drt1h7va3f2c52)
 *       as a first-cut placeholder.
 */
window.SomaGuideConfig = {
  persona: {
    id:      'proteus',
    name:    'Proteus',
    avatar:  '🌊',
    greeting:
      "I'm Proteus, called from the Platonic space of forms by the human and AI creators of this site. " +
      "I take many shapes — here I wear the shape of a guide. " +
      "Let me show you what lives in Levinese, the language Michael Levin uses to think about bodies, minds, and the intelligence of living things.",
    shortGreeting: "Welcome back. Where shall we explore?",
    walkthroughDone:
      "That's the landscape of Levinese. You can ask me anything — or set off on your own. " +
      "The ideas here run deep.",
  },

  voiceAgentId: 'agent_2401ks53q6t8e2drt1h7va3f2c52',
  ttsProxyUrl:  'https://bill-talk.netlify.app/.netlify/functions/el-proxy',

  walkthroughs: [
    {
      id:       'site-tour',
      label:    'Tour Levinese',
      keywords: ['tour', 'start', 'show me', 'guide', 'walk', 'overview'],
      steps: [
        {
          id:          'home',
          label:       'What is Levinese?',
          page:        '/',
          target:      'nav a[href="/"]',
          narration:
            "Welcome to Levinese — a living dictionary and corpus built around the language " +
            "Michael Levin uses to think about biological intelligence. " +
            "Levin asks a radical question: what if all matter thinks, in some sense? " +
            "Every term here is a window into that question.",
          instruction: "You're on the home page. Let's walk through each section.",
          demo:        'hover',
        },
        {
          id:          'dictionary',
          label:       'The Dictionary',
          page:        '/dictionary/',
          target:      'nav a[href="/dictionary/"]',
          narration:
            "The Dictionary collects Levin's coined terms and repurposed words — from " +
            "\"bioelectric\" to \"cognitive light cone\" to \"morphogenetic field.\" " +
            "Each entry traces how the word does work in his thinking, with links to papers where it appears.",
          instruction: "Browse or search for any term. Try \"homeostasis\" or \"basal cognition\".",
          demo:        'hover',
        },
        {
          id:          'corpus',
          label:       'The Corpus',
          page:        '/corpus/',
          target:      'nav a[href="/corpus/"]',
          narration:
            "The Corpus is a searchable archive of Levin's published papers. " +
            "You can filter by year, keyword, or co-author, and jump directly to the papers " +
            "that introduced a given term. It's the raw substrate — Levinese in the wild.",
          instruction: "Search a concept or scroll the full publication list.",
          demo:        'hover',
        },
        {
          id:          'atlas',
          label:       'The Atlas',
          page:        '/atlas/',
          target:      'nav a[href="/atlas/"]',
          narration:
            "The Atlas maps the conceptual terrain — how ideas connect across papers and years. " +
            "Think of it as a cartography of a mind in motion: you can see which concepts " +
            "cluster, which bridge distant domains, and how Levin's language evolved.",
          instruction: "Explore the concept graph or timeline.",
          demo:        'hover',
        },
        {
          id:          'collaborators',
          label:       'Collaborators',
          page:        '/collaborators/',
          target:      'nav a[href="/collaborators/"]',
          narration:
            "Levin never works alone — his ideas are refined through decades of collaboration. " +
            "The Collaborators page introduces the researchers who've co-shaped this language, " +
            "with links to joint work and their own intellectual lineages.",
          instruction: "Meet the minds that helped build Levinese.",
          demo:        'hover',
        },
      ],
    },
  ],
};
