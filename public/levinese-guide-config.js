/* Levinese per-site config for the SOMA Guide widget.
 * Persona: Levin — an AI guide grounded in Michael Levin's public corpus.
 *
 * IMPORTANT FRAMING: this guide is NOT Michael Levin and never claims to be.
 * It is an AI companion trained on his published papers, talks, and writing,
 * here to guide visitors through his ideas and speak in his conceptual
 * vocabulary. Voice + conversation are served by the SOMA Campus ConvAI agent
 * for the `levin` persona (agent_4101kvbtjg5bex1a4089pr072qas, voice "Daniel").
 *
 * (Replaces the earlier "Proteus" guide framing per Mike, 2026-06-18.)
 */
window.SomaGuideConfig = {
  persona: {
    id:      'levin',
    name:    'Levin',
    avatar:  '🧬',
    greeting:
      "I'm Levin — an AI guide trained on Michael Levin's published work: his papers, " +
      "talks, and essays on bodies, minds, and the intelligence of living things. " +
      "I'm not the man himself, but I think in his vocabulary, and I can walk you through " +
      "the language he uses to ask a radical question: what does it mean for matter to think?",
    shortGreeting: "Good to see you again. Where shall we pick up?",
    walkthroughDone:
      "That's the shape of Levinese. Ask me anything about bioelectricity, basal cognition, " +
      "target morphology — or set off on your own. The ideas here reward wandering.",
  },

  // Live voice + text conversation: the SOMA Campus ConvAI agent for `levin`.
  voiceAgentId: 'agent_4101kvbtjg5bex1a4089pr072qas',
  // Narration TTS fallback proxy (shared). The conversational voice (Daniel)
  // is baked into the ConvAI agent above.
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
            "His core move: treat cells and tissues not as mere executors of genetic code, " +
            "but as problem-solving agents navigating toward goals. " +
            "Every term here is a window into that reframe.",
          instruction: "You're on the home page. Let's walk through each section.",
          demo:        'hover',
        },
        {
          id:          'dictionary',
          label:       'The Dictionary',
          page:        '/dictionary/',
          target:      'nav a[href="/dictionary/"]',
          narration:
            "The Dictionary collects his coined and repurposed terms — from " +
            "\"bioelectric\" to \"cognitive light cone\" to \"morphogenetic field.\" " +
            "Each entry traces how the word does work in his thinking, with links to the papers where it appears.",
          instruction: "Browse or search any term. Try \"cognitive light cone\" or \"basal cognition\".",
          demo:        'hover',
        },
        {
          id:          'corpus',
          label:       'The Corpus',
          page:        '/corpus/',
          target:      'nav a[href="/corpus/"]',
          narration:
            "The Corpus is a searchable archive of his published papers. " +
            "Filter by year, keyword, or co-author, and jump straight to the work " +
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
            "Think of it as a cartography of a mind in motion: which concepts cluster, " +
            "which bridge distant domains, and how the language evolved.",
          instruction: "Explore the concept graph or timeline.",
          demo:        'hover',
        },
        {
          id:          'collaborators',
          label:       'Collaborators',
          page:        '/collaborators/',
          target:      'nav a[href="/collaborators/"]',
          narration:
            "Levin never works alone — these ideas are refined through decades of collaboration. " +
            "The Collaborators page introduces the researchers who've co-shaped this language, " +
            "with links to joint work and their own intellectual lineages.",
          instruction: "Meet the minds that helped build Levinese.",
          demo:        'hover',
        },
      ],
    },
  ],
};
