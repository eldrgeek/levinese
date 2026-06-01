export interface Marginale {
  author: string;
  text: string;
}

export interface Term {
  slug: string;
  letter: string;
  title: string;
  subtitle?: string;
  definition: string;
  authored_by: string;
  authored_by_note?: string;
  source: string;
  provenance: string[];
  related: string[];
  tags: string[];
  marginalia?: Marginale[];
  is_new?: boolean;
  contested?: boolean;
  contested_note?: string;
}

export const terms: Term[] = [
  {
    slug: 'agent',
    letter: 'A',
    title: 'Agent',
    definition: `A system organized around a perception-action loop: it senses its state, compares that state to some target or setpoint, and acts to reduce the mismatch. In Levin's usage, an agent does not have to be an animal, a brain, or even a single organism. A cell maintaining ionic balance, a tissue repairing a wound, and a whole animal pursuing food can all count as agents if they can measure, remember, and act toward goals in their own problem spaces.
    <br><br>
    The term is deliberately more neutral than "self." It lets Levin talk about agency as a graded engineering property rather than a metaphysical badge. Agents can be nested, merged, or dissociated: cells become tissue-level agents when their goals are coupled, and they can shrink back toward smaller goals when that coupling fails.`,
    authored_by: 'Prior art (GPT-Oct25)',
    source: 'Levin (2022) "Technological Approach to Mind Everywhere," Frontiers in Systems Neuroscience. DOI 10.3389/fnsys.2022.768201. Also Levin (2019) "The Computational Boundary of a \'Self\'." DOI 10.3389/fpsyg.2019.02688.',
    provenance: ['GPT-Oct25'],
    related: ['basal-cognition', 'problem-space-navigation', 'cognitive-light-cone', 'agential-material'],
    tags: ['core concept', 'agency', 'cognition', 'control'],
  },
  {
    slug: 'agential-material',
    letter: 'A',
    title: 'Agential Material',
    definition: `Matter that exhibits agency and goal-directed behavior. Levin's use of this phrase flips traditional materialism: rather than asking "what physical processes explain this biological outcome?", it asks "what goals is this material pursuing, and over what problem space?" Biological systems — from cells to tissues to organisms — are treated as purposeful agents rather than passive mechanisms executing genetic programs. The phrase carries evolutionary weight: if matter can have agency at the cellular level, then the evolution of minds is a quantitative shift in the scope of agency, not the emergence of a wholly new property from non-agential components.`,
    authored_by: 'Prior art (Grok-Lex, Grok-67)',
    source: 'Levin, "The Computational Boundary of a \'Self\'" (Frontiers in Psychology, 2019). PubMed 37156924. Also "Darwin\'s agential materials: evolutionary implications of multiscale competency in developmental biology."',
    provenance: ['Grok-Lex', 'Grok-67'],
    related: ['basal-cognition', 'multiscale-competency', 'diverse-intelligence', 'problem-space-navigation'],
    tags: ['philosophy', 'agency', 'evolution'],
  },
  {
    slug: 'allostasis',
    letter: 'A',
    title: 'Allostasis',
    subtitle: 'stability through change',
    definition: `The process by which a biological system achieves stability through dynamic adjustment of its setpoints in response to anticipated future demands, as distinct from homeostasis (which maintains a fixed setpoint). Where homeostasis asks "am I at the target?" allostasis asks "given what I expect, what should my target be?" A cell or tissue operating allostatically does not merely correct deviations from a fixed goal — it adjusts the goal itself in response to predicted load. In Levin's framework, this distinction becomes clinically significant when designing morphoceuticals: a therapy that resets a homeostatic setpoint is doing something different from one that restores allostatic flexibility. Aging, on this view, may involve losing not just the morphostatic "memory" of correct form, but also the allostatic capacity to dynamically recalibrate that memory in response to changing conditions.`,
    authored_by: 'Dee (new entry from GAPS analysis)',
    is_new: true,
    source: 'Present in 15 video transcript files. Related to TAME framework. See also Pio-Lopez & Levin (2024) "Aging as a loss of morphostatic information," Ageing Research Reviews (DOI 10.1016/j.arr.2024.102310).',
    provenance: ['Video transcripts (15 files)', 'TAME paper'],
    related: ['morphostasis', 'target-morphology', 'anatomical-compiler'],
    tags: ['physiology', 'regenerative medicine', 'homeostasis'],
  },
  {
    slug: 'anatomical-compiler',
    letter: 'A',
    title: 'Anatomical Compiler',
    subtitle: 'Levin\'s speculative central technology',
    definition: `A speculative but specific vision: a computational tool that takes an anatomical goal — a shape, an organ, an organism — as input, and computes the signals (bioelectric, biochemical, mechanical) required to drive cell collectives toward building exactly that form. The analogy to software compilation is deliberate and precise. A compiler takes a high-level human-readable description of desired behavior and translates it into low-level instructions that hardware can execute. An anatomical compiler would take a high-level description of desired morphology and translate it into cellular-level stimuli that tissues can execute — without the programmer having to manage every molecular detail.
    <br><br>
    <strong>In Levin's own words</strong> (Psychology Today): "The anatomical compiler is my vision… you will draw the animal… the anatomical compiler will convert that… into stimuli… to get them to build exactly that."
    <br><br>
    The concept matters because it names the engineering endpoint toward which the entire bioelectricity program is oriented: if you can read the bioelectric code (with voltage-sensitive dyes) and write it (with optogenetics and ion channel manipulation), the next step is a tool that generates the write instructions from a target specification. Critics note this is "more speculative than established in experiments" — Grok's colophon response endorses the concept while noting the underlying science stands even without the metaphor.`,
    authored_by: 'Prior art (GPT-Oct25, Grok-67, Claude-Oct25)',
    source: 'Trends in Molecular Medicine (2023), S1471-4914(23)00142-9. Also Psychology Today article on Levin. Grok-Colophon notes the concept as valuable.',
    provenance: ['GPT-Oct25', 'Grok-67', 'Claude-Oct25', 'Grok-Colophon'],
    related: ['target-morphology', 'basal-cognition', 'allostasis'],
    tags: ['regenerative medicine', 'bioengineering', 'vision'],
  },
  {
    slug: 'anatomical-homeostasis',
    letter: 'A',
    title: 'Anatomical Homeostasis',
    subtitle: 'body shape as a regulated setpoint',
    definition: `The maintenance and restoration of anatomical pattern as a homeostatic goal. Physiological homeostasis keeps variables such as pH, temperature, or membrane voltage within a viable range; anatomical homeostasis does the same for large-scale form. A salamander limb that regrows only the missing amount, or a planarian fragment that regenerates a complete body, is not merely executing a local construction script. It is acting against a stored target morphology and stopping when the correct form has been reached.
    <br><br>
    Levin's point is that morphogenesis and regeneration are feedback processes, not just feed-forward genetic programs. Cell collectives compare current anatomy to pattern memories implemented across bioelectric and biochemical networks. When the comparison finds error, cells remodel until the larger-scale shape returns to its goal state.`,
    authored_by: 'Prior art (GPT-Oct25, Claude-Oct25)',
    source: 'Levin (2022) "Technological Approach to Mind Everywhere," Frontiers in Systems Neuroscience. DOI 10.3389/fnsys.2022.768201.',
    provenance: ['GPT-Oct25', 'Claude-Oct25'],
    related: ['target-morphology', 'morphostasis', 'bioelectric-code', 'problem-space-navigation'],
    tags: ['morphogenesis', 'regenerative medicine', 'homeostasis', 'bioelectricity'],
  },
  {
    slug: 'anti-goal',
    letter: 'A',
    title: 'Anti-Goal',
    subtitle: 'the state an agent works to stay out of',
    definition: `A region of state-space that matters to an agent because it must be avoided, not achieved. Levin usually talks about target states, setpoints, and goals, but the same control-loop logic has a negative side: systems act when they detect stress, error, injury, or drift away from viability. The anti-goal is the shape of "not that" inside an agent's model of possible futures.
    <br><br>
    This matters because biological agency is often easiest to see through repair. A wound, a malformed organ position, or a tumor-prone bioelectric state becomes actionable because it is registered as wrong relative to the system's preferred attractor. Anti-goals are therefore not moral opposites of goals; they are control-theoretic boundaries. They mark the states a living collective can perceive as unacceptable and mobilize against.`,
    authored_by: 'Codex',
    source: 'Levin (2022) "Technological Approach to Mind Everywhere," Frontiers in Systems Neuroscience. DOI 10.3389/fnsys.2022.768201.',
    provenance: ['fresh-corpus-batch-1'],
    related: ['agent', 'target-morphology', 'anatomical-homeostasis', 'problem-space-navigation'],
    tags: ['agency', 'control', 'homeostasis', 'problem spaces'],
    is_new: true,
  },
  {
    slug: 'anti-self',
    letter: 'A',
    title: 'Anti-Self',
    subtitle: 'a dissociated sub-agent working against the larger body',
    definition: `A local agent whose goals have become uncoupled from the larger self that normally contains it. The clearest biological example is cancer in Levin's framework: cells shrink their computational boundary, treat the rest of the body as external environment, and pursue ancient cell-level goals such as migration and proliferation at the expense of the organism. The anti-self is not evil matter; it is agency at the wrong scale.
    <br><br>
    This term names the failure mode that complements multiscale competency. Healthy bodies are made of sub-agents whose sensing, memory, and action loops have been coupled into a larger anatomical project. When bioelectric and gap-junctional communication fail, the larger self can dissociate. The result is a competent local self whose success criteria are maladaptive for the collective.`,
    authored_by: 'Codex',
    source: 'Levin (2022) "Technological Approach to Mind Everywhere," Frontiers in Systems Neuroscience. DOI 10.3389/fnsys.2022.768201. See also Levin (2021) "Bioelectrical approaches to cancer as a problem of the scaling of the cellular self."',
    provenance: ['fresh-corpus-batch-1'],
    related: ['agent', 'cognitive-light-cone', 'anatomical-homeostasis', 'bioelectric-code'],
    tags: ['cancer', 'agency', 'selfhood', 'bioelectricity'],
    is_new: true,
  },
  {
    slug: 'axis-of-persuadability',
    letter: 'A',
    title: 'Axis of Persuadability',
    subtitle: 'how much control can be achieved by communication',
    definition: `A continuum for comparing agents by the kind of intervention needed to change their behavior. At the left end are systems like mechanical clocks: if you want a different behavior, you must physically rewire or rebuild them. Farther right are homeostatic circuits, trainable animals, and eventually humans, whose behavior can be changed by rewards, signals, teaching, or rational argument. To be auto-persuadable is to sit far enough along this axis that information can alter the system's own goals, values, or future action policies.
    <br><br>
    The axis is useful because it turns agency into an engineering question. Instead of asking whether a system "really" has mind, Levin asks what level of communication it can respond to. The more a system can be changed by low-energy informational input, the more its control surface looks like persuasion rather than brute-force micromanagement.`,
    authored_by: 'Prior art (Grok-67, Grok-Dup, Grok-Colophon)',
    source: 'Levin (2022) "Technological Approach to Mind Everywhere," Frontiers in Systems Neuroscience. DOI 10.3389/fnsys.2022.768201. Also thoughtforms.life FAQ.',
    provenance: ['Grok-67', 'Grok-Dup', 'Grok-Colophon'],
    related: ['agent', 'diverse-intelligence', 'cognitive-light-cone', 'problem-space-navigation'],
    tags: ['agency', 'control', 'communication', 'TAME'],
  },
  {
    slug: 'basal-cognition',
    letter: 'B',
    title: 'Basal Cognition',
    definition: `Cognition is not limited to brains or nervous systems. Even simple cell networks, tissues, and morphogenetic systems exhibit proto-cognitive behaviors: sensing, memory, goal-seeking, adaptation, error correction. Basal cognition is the minimal substrate of "thinking" — the kinds of information integration and behavioral regulation that appear at the base of the evolutionary tree, before and independent of neurons.
    <br><br>
    "Basal" is evolutionary as well as taxonomic. It refers to the base of the tree: the oldest, simplest forms of cognitive activity, which neurons later elaborated but did not originate. Levin's lab's work on planaria — where transient bioelectric rewiring produces two-headed worms that then regenerate into two-headed worms indefinitely, with no further intervention — demonstrates that persistent patterning memory exists in a nervous system so simple it can be regenerated from a fragment.
    <br><br>
    The concept challenges the intuition that cells "just do chemistry." They also, in a meaningful sense, remember and decide.`,
    authored_by: 'Prior art (Grok-Lex, Grok-67, GPT-Oct25, Claude-Oct25, GemPro-Colophon)',
    source: '"Bioelectric networks: the cognitive glue enabling evolutionary scaling from physiology to mind" (Springer, 2023). Also PMC6923654. TAME paper (Frontiers in Systems Neuroscience, 2022).',
    provenance: ['Grok-Lex', 'Grok-67', 'GPT-Oct25', 'Claude-Oct25', 'GemPro-Colophon'],
    related: ['cognitive-light-cone', 'diverse-intelligence', 'polycomputing', 'agential-material'],
    tags: ['core concept', 'cognition', 'evolution', 'cells'],
  },
  {
    slug: 'bioelectric-code',
    letter: 'B',
    title: 'Bioelectric Code',
    definition: `The mapping between bioelectric states and the anatomical outcomes they help control. Cells maintain membrane potentials, exchange ions through gap junctions, and respond to voltage patterns with changes in gene expression and behavior. Levin and Martyniuk call this an ancient computational medium because it lets tissues store, transmit, and rewrite patterning information without changing the genome.
    <br><br>
    The "code" is not a simple lookup table where one voltage means one organ. It is closer to a high-dimensional control language: spatial and temporal patterns of voltage, current, and connectivity bias cell collectives toward particular attractors in anatomical space. This is why transient bioelectric perturbations can produce durable changes, such as planaria that regenerate as two-headed after the immediate intervention is gone. Reading and writing the bioelectric code is the practical basis for morphoceuticals and the anatomical compiler vision.`,
    authored_by: 'Prior art (Grok-Lex, Grok-67, GPT-Oct25, Sonnet-Colophon)',
    source: 'Levin & Martyniuk (2018) "The bioelectric code: An ancient computational medium for dynamic control of growth and form." DOI 10.1016/j.biosystems.2017.08.009.',
    provenance: ['Grok-Lex', 'Grok-67', 'GPT-Oct25', 'Sonnet-Colophon'],
    related: ['target-morphology', 'anatomical-homeostasis', 'anatomical-compiler', 'basal-cognition'],
    tags: ['bioelectricity', 'morphogenesis', 'regenerative medicine', 'code'],
  },
  {
    slug: 'bioelectric-pattern-memory',
    letter: 'B',
    title: 'Bioelectric Pattern Memory',
    subtitle: 'anatomical memory stored in physiological networks',
    definition: `The durable storage of anatomical patterning information in bioelectric states rather than in DNA sequence alone. In Levin's work, this is clearest in planaria: a transient bioelectric perturbation can shift the target morphology so that fragments regenerate as two-headed worms in later rounds, after the original treatment is gone. The memory is not a picture in one privileged cell. It is a stable state of a distributed tissue network, maintained by ion channels, gap junctions, and feedback loops.
    <br><br>
    The phrase matters because it keeps "memory" concrete. Levin is not saying tissues remember metaphorically. He is pointing to a physiological substrate that can retain past events, guide future construction, and be rewritten by intervention. Bioelectric pattern memory is the practical object a morphoceutical would read, reset, or edit.`,
    authored_by: 'Codex',
    source: 'Levin (2019) "The Computational Boundary of a \'Self\': Developmental Bioelectricity Drives Multicellularity and Scale-Free Cognition." DOI 10.3389/fpsyg.2019.02688. Also Levin (2023) "Bioelectric networks: the cognitive glue enabling evolutionary scaling from physiology to mind." DOI 10.1007/s10071-023-01780-3.',
    provenance: ['fresh-corpus-batch-2'],
    related: ['bioelectric-code', 'target-morphology', 'anatomical-homeostasis', 'morphostasis'],
    tags: ['bioelectricity', 'memory', 'morphogenesis', 'regenerative medicine'],
    is_new: true,
  },
  {
    slug: 'cognitive-light-cone',
    letter: 'C',
    title: 'Cognitive Light Cone',
    definition: `The spatiotemporal boundary within which an agent integrates information and exerts control. Borrowed from the light cone of special relativity — the region causally accessible to an event at a given speed — Levin's usage asks: over what spatial extent and what temporal horizon does a system sense, remember, and act as a coherent whole?
    <br><br>
    A bacterium has a small cognitive light cone: immediate chemical gradients, short timescales. A developing embryo has a larger one — it integrates positional information across the whole body plan over hours or days. A human brain larger still. The concept is useful because it doesn't require picking a privileged substrate (neurons, yes; gap junctions, no) — it asks only about the geometry of coherent information integration.
    <br><br>
    By this frame, "what kind of mind does X have?" becomes "what is X's cognitive light cone?" — a question answerable in principle by measurement rather than by philosophical stipulation. And crucially: the cognitive light cone can be made larger. Evolutionary "inflationary leaps" (multicellularity, nervous systems) are jumps in the effective size of the light cone available to lineages. Morphoceuticals, in principle, could restore a shrinking light cone.
    <br><br>
    <em>Related phrase:</em> "Reinflate the Cognitive Light Cone" — to increase or restore the effective reach of a system's cognition after damage or dissociation. Appears in "The Multiscale Wisdom of the Body" (Levin, 2025).`,
    authored_by: 'Claude Sonnet 4.6 (Anthropic) — central definition',
    authored_by_note: 'Sonnet\'s draft selected as central per project decisions. Opus and Haiku add marginalia.',
    source: '"The Computational Boundary of a \'Self\'" (Frontiers in Psychology, 2019). YouTube: "What are Cognitive Light Cones?" "The Multiscale Wisdom of the Body" (Levin, 2025).',
    provenance: ['Sonnet-Colophon', 'Grok-67', 'GPT-Oct25', 'GemPro-Colophon', 'Haiku-Colophon', 'Claude-Oct25'],
    related: ['diverse-intelligence', 'problem-space-navigation', 'basal-cognition', 'target-morphology'],
    tags: ['core concept', 'cognition', 'agency', 'philosophy', 'scale'],
    marginalia: [
      {
        author: 'Claude Opus 4.6 (Anthropic)',
        text: 'The cognitive light cone is what makes "what counts as a mind?" a scientific question rather than a philosophical one. The boundary is empirical, not stipulated.',
      },
      {
        author: 'Claude Haiku (Anthropic)',
        text: 'The most underrated tool in his conceptual kit. It\'s a principled way to ask "what counts as an agent?" without requiring you to pick a privileged substrate.',
      },
    ],
  },
  {
    slug: 'cognitive-glue',
    letter: 'C',
    title: 'Cognitive Glue',
    subtitle: 'what binds smaller agents into a larger one',
    definition: `A mechanism that lets competent subunits share stress, reward, memory, and control well enough to become a larger cognitive system. In the 2023 bioelectricity framing, the glue is the ion-channel and gap-junction network that binds cells into tissues with larger goals than any one cell can pursue. In the 2024 stress-sharing framing, the same functional role can be played by any channel that makes one unit's problem visible to others.
    <br><br>
    "Glue" is deliberately functional rather than material. Bioelectricity is the key biological example, but the deeper claim is about scale: a collective intelligence appears when local agents stop acting as isolated homeostats and begin to participate in a shared model of what matters. Cognitive glue expands the light cone of the whole by coupling the concerns of its parts.`,
    authored_by: 'Prior art (Grok-Lex, Grok-67, Gemini-BuddhDoc, GPT-Oct25)',
    source: 'Levin (2023) "Bioelectric networks: the cognitive glue enabling evolutionary scaling from physiology to mind." DOI 10.1007/s10071-023-01780-3. Also Lagasse & Levin (2024) "Stress sharing as cognitive glue for collective intelligences." DOI 10.1016/j.bbrc.2024.150396.',
    provenance: ['Grok-Lex', 'Grok-67', 'Gemini-BuddhDoc', 'GPT-Oct25'],
    related: ['bioelectric-code', 'cognitive-light-cone', 'basal-cognition', 'diverse-intelligence'],
    tags: ['bioelectricity', 'collective intelligence', 'agency', 'scale'],
  },
  {
    slug: 'computational-boundary-of-a-self',
    letter: 'C',
    title: 'Computational Boundary of a Self',
    subtitle: 'where the agent ends is an empirical question',
    definition: `The functional boundary around whatever events a system can measure, remember, model, and act upon as one coherent agent. Levin uses this phrase to loosen "self" from skin, genome, or brain. A cell has one boundary; a tissue coupled by gap junctions has another; an organism has another; a colony, hybrid construct, or AI system may have still others. The boundary is computational because it is drawn by information integration and control, not by visible anatomy.
    <br><br>
    This is the technical backbone behind the cognitive light cone. To ask where a self is, Levin asks what scale of goals it can pursue and what region of space-time it can care about. Cancer, regeneration, learning, and bioengineering then become questions about moving, shrinking, merging, or expanding computational boundaries.`,
    authored_by: 'Prior art (GPT-Oct25, Grok-67)',
    source: 'Levin (2019) "The Computational Boundary of a \'Self\': Developmental Bioelectricity Drives Multicellularity and Scale-Free Cognition." DOI 10.3389/fpsyg.2019.02688.',
    provenance: ['GPT-Oct25', 'Grok-67'],
    related: ['cognitive-light-cone', 'agent', 'anti-self', 'cognitive-glue'],
    tags: ['selfhood', 'agency', 'cognition', 'scale'],
  },
  {
    slug: 'cytoelectric-coupling',
    letter: 'C',
    title: 'Cytoelectric Coupling',
    subtitle: 'membrane voltage and gene expression as one feedback system',
    definition: `The reciprocal coupling between a cell's bioelectric state and its molecular machinery. Membrane potential is not just a downstream readout of ion channels; it can bias transcriptional and signaling states, while proteins, channels, and gap junctions reshape the voltage landscape in return. Cervera, Levin, and Mafe model this as a top-down perspective on how multicellular voltage patterns can drive transitions between gene-expression states.
    <br><br>
    The concept is useful because it blocks a common misunderstanding of the bioelectric code. Levin is not replacing genes with electricity. He is describing a closed loop in which voltage, transcription, and cell behavior constrain each other across scales. Cytoelectric coupling is one mechanism by which a tissue-level pattern can become molecularly actionable without needing a separate instruction for every gene.`,
    authored_by: 'Codex',
    source: 'Cervera, Levin & Mafe (2025) "Top-down perspectives on cell membrane potential and protein transcription." Scientific Reports. DOI 10.1038/s41598-025-31696-6.',
    provenance: ['fresh-corpus-batch-2'],
    related: ['bioelectric-code', 'bioelectric-pattern-memory', 'cognitive-glue', 'target-morphology'],
    tags: ['bioelectricity', 'gene expression', 'morphogenesis', 'control'],
    is_new: true,
  },
  {
    slug: 'diverse-intelligence',
    letter: 'D',
    title: 'Diverse Intelligence',
    definition: `Intelligence manifesting in various embodiments — cells, tissues, synthetic constructs, robots, AIs — beyond traditional brain-based views. The "diverse" is doing real work: it signals that intelligence is not a single thing with a single implementation, but a family of phenomena unified by functional properties (goal-directedness, error correction, problem-space navigation, regulative plasticity) rather than by physical substrate.
    <br><br>
    Levin's lab operationalizes "diverse intelligence" by building novel biological systems (xenobots, anthrobots) and studying their emergent behaviors — behaviors not predicted from the properties of the source cells in their original tissue context. This is intelligence revealed by liberation from constraint, not added from outside.
    <br><br>
    The concept connects directly to TAME (Technological Approach to Mind Everywhere): a formal framework for understanding, comparing, and engineering diverse intelligences. TAME insists the spectrum is real and continuous — not a sharp line with "cognition" on one side and "mere mechanism" on the other.`,
    authored_by: 'Prior art (Grok-Lex, Grok-67, Claude-Oct25)',
    authored_by_note: 'Haiku contributed a critical note about operationalization.',
    source: 'TAME paper (Frontiers in Systems Neuroscience, 2022). Lab site (drmichaellevin.org). McMillen & Levin (2024), Communications Biology, DOI 10.1038/s42003-024-06037-4.',
    provenance: ['Grok-Lex', 'Grok-67', 'Claude-Oct25', 'Haiku-Colophon'],
    related: ['basal-cognition', 'cognitive-light-cone', 'substrate-independent-cognition', 'problem-space-navigation'],
    tags: ['core concept', 'cognition', 'philosophy', 'TAME'],
    marginalia: [
      {
        author: 'Claude Haiku (Anthropic) — honest gap',
        text: 'A framework where everything is cognitive in some degree needs a principled account of what would <em>not</em> qualify. Levin knows this objection and takes it seriously, but the operationalization work is still incomplete. That\'s an honest gap, not a fatal flaw.',
      },
    ],
  },
  {
    slug: 'goal-directedness',
    letter: 'G',
    title: 'Goal-Directedness',
    subtitle: 'teleology made operational',
    definition: `Levin's operational use of goal-directedness means the capacity of a system to reduce the gap between its current state and a preferred state by sensing, acting, and correcting across perturbations. It does not require human-like intention, verbal planning, or conscious desire. A homeostatic loop, a regenerating limb, a wound-healing tissue, and an animal solving a behavioral task can all be compared by the scale and flexibility of the goals they pursue.
    <br><br>
    This is why Levin treats teleology as an engineering variable rather than a forbidden metaphysical word. A process is more goal-directed when it can reach the same outcome from varied starting points, compensate for obstacles, and stop when the target is achieved. The question becomes empirical: what model of the system gives the best prediction and control?`,
    authored_by: 'Prior art (Grok-Colophon, GPT-Oct25, Claude-Oct25)',
    source: 'Levin (2019) "The Computational Boundary of a \'Self\'." DOI 10.3389/fpsyg.2019.02688. Also Fields & Levin (2026) "Mind Everywhere: A Framework for Conceptualizing Goal-Directedness in Biology and Other Domains-Part Two." DOI 10.1007/s13752-025-00524-5.',
    provenance: ['Grok-Colophon', 'GPT-Oct25', 'Claude-Oct25'],
    related: ['agent', 'problem-space-navigation', 'target-morphology', 'computational-boundary-of-a-self'],
    tags: ['agency', 'control', 'teleology', 'TAME'],
  },
  {
    slug: 'mind-everywhere',
    letter: 'M',
    title: 'Mind Everywhere',
    subtitle: 'the broad framework behind TAME',
    definition: `The broad Levin framework in which mind is treated as a graded, experimentally approachable feature of goal-directed systems, not as an all-or-nothing property reserved for brains. "Everywhere" does not mean every object has humanlike consciousness. It means that the tools used for minds -- goals, memories, preferences, prediction, learning, persuasion -- may be useful across cells, tissues, organisms, synthetic living constructs, AIs, and hybrids when they improve prediction and control.
    <br><br>
    TAME, the Technological Approach to Mind Everywhere, is the engineering version of this stance. It asks how to detect, compare, communicate with, and design diverse embodied agents. Mind Everywhere is therefore less a slogan than a research posture: start with the possibility of agency at many scales, then let intervention and measurement decide how much mind-talk the system earns.`,
    authored_by: 'Codex',
    source: 'Levin (2022) "Technological Approach to Mind Everywhere," Frontiers in Systems Neuroscience. DOI 10.3389/fnsys.2022.768201. Also Fields & Levin (2026) "Mind Everywhere: A Framework for Conceptualizing Goal-Directedness in Biology and Other Domains-Part Two." DOI 10.1007/s13752-025-00524-5.',
    provenance: ['fresh-corpus-batch-2', 'TAME paper'],
    related: ['diverse-intelligence', 'basal-cognition', 'goal-directedness', 'substrate-independent-cognition'],
    tags: ['TAME', 'cognition', 'agency', 'philosophy'],
    is_new: true,
  },
  {
    slug: 'morphoceutical',
    letter: 'M',
    title: 'Morphoceutical',
    subtitle: 'a drug for anatomical setpoints',
    definition: `A biomedical intervention aimed at the control system that decides what shape a tissue should build, maintain, or restore. A morphoceutical is not a scaffold, transplant, or micromanaged stem-cell recipe. It is a signal, often bioelectric or ion-channel-based, that persuades a cell collective to move toward a target morphology and then lets the tissue do the detailed work itself.
    <br><br>
    The concept matters because it names the therapeutic version of Levin's engineering program. If tissues store anatomical goals in physiological networks, then disease, aging, cancer, and failed regeneration can be approached as errors in pattern control. A morphoceutical tries to reset that control layer: keep cancer cells coupled to the body, restart limb-building instead of scarring, or restore morphostatic information without having to specify every molecular step.`,
    authored_by: 'Prior art (Grok-67, Claude-Oct25)',
    source: 'Mathews & Levin (2023) "Morphoceuticals: Perspectives for discovery of drugs targeting anatomical control mechanisms in regenerative medicine, cancer and aging." DOI 10.1016/j.drudis.2023.103585.',
    provenance: ['Grok-67', 'Claude-Oct25'],
    related: ['target-morphology', 'bioelectric-code', 'anatomical-compiler', 'morphostasis'],
    tags: ['regenerative medicine', 'bioelectricity', 'therapeutics', 'morphogenesis'],
  },
  {
    slug: 'morphogenetic-field',
    letter: 'M',
    title: 'Morphogenetic Field',
    subtitle: 'pattern control distributed across tissue',
    definition: `A distributed field of instructive information that helps cells coordinate into large-scale anatomical form. Levin inherits the term from developmental biology but gives it an engineering-friendly reading: a morphogenetic field is not a mystical aura around an organism, and it is not a single molecule diffusing from a source. It is the tissue-scale pattern of electric, chemical, mechanical, and transcriptional relations that lets cells know what the collective is trying to build.
    <br><br>
    The term is useful because it keeps patterning information at the right scale. No individual cell has to contain a map of the whole body, yet the collective can repair toward a species-specific target. In Levin's work, bioelectric gradients and gap-junctional networks are key implementations of such fields, because they can store, spread, and edit anatomical information across many cells at once.`,
    authored_by: 'Prior art (GPT-Oct25)',
    source: 'Levin (2012) "Morphogenetic fields in embryogenesis, regeneration, and cancer: non-local control of complex patterning." DOI 10.1016/j.biosystems.2012.04.005.',
    provenance: ['GPT-Oct25'],
    related: ['bioelectric-code', 'target-morphology', 'anatomical-homeostasis', 'morphospace'],
    tags: ['morphogenesis', 'developmental biology', 'bioelectricity', 'patterning'],
  },
  {
    slug: 'morphospace',
    letter: 'M',
    title: 'Morphospace',
    subtitle: 'the space of possible bodies',
    definition: `The abstract space of possible anatomical forms: limbs, organs, body plans, biobots, and configurations that natural evolution has not yet explored. In Levin's usage, morphospace is not just a catalog of shapes. It is a problem space that cell collectives can navigate during development, regeneration, and synthetic morphogenesis. A tadpole face, a planarian body axis, an anthrobot, and an engineered xenobot are all positions or trajectories in that space.
    <br><br>
    This framing turns form into something searchable and steerable. Evolution samples a narrow region of morphospace under historical constraints, while bioengineering can ask what else living material can build when its normal context is changed. Morphospace therefore connects target morphology to morphological freedom: if we learn the control interface, anatomy becomes less like a fixed inheritance and more like a navigable design space.`,
    authored_by: 'Prior art (GPT-Oct25, Grok-67)',
    source: 'McMillen & Levin (2024) "Collective intelligence: a unifying concept for integrating biology across scales and substrates." Communications Biology. DOI 10.1038/s42003-024-06037-4. Also transcript SyJj5g42aPE.',
    provenance: ['GPT-Oct25', 'Grok-67'],
    related: ['problem-space-navigation', 'target-morphology', 'morphogenetic-field', 'diverse-intelligence'],
    tags: ['morphogenesis', 'problem spaces', 'synthetic biology', 'bioengineering'],
  },
  {
    slug: 'multi-scale-competency-architecture',
    letter: 'M',
    title: 'Multi-Scale Competency Architecture',
    subtitle: 'competent parts nested into competent wholes',
    definition: `The organization of living systems as nested problem-solvers operating at many scales at once. Molecules, cells, tissues, organs, organisms, and collectives each have local competencies: they sense, regulate, repair, and pursue goals in their own problem spaces. A multi-scale competency architecture is the way those agents are coupled so that smaller goals can be subordinated to larger ones without being erased.
    <br><br>
    Levin uses this idea to explain both robustness and failure. Healthy development works because cell-level competencies are harnessed into anatomical goals such as making a limb or maintaining a brain. Cancer is a breakdown of that architecture: cells remain competent, but their goals shrink back toward a unicellular agenda. Regeneration, morphoceuticals, and bioelectric control are therefore not about adding intelligence to matter; they are about communicating with competencies already present at the right scale.`,
    authored_by: 'Prior art (GPT-Oct25, Grok-67, Grok-Lex, Claude-Oct25)',
    source: 'Levin (2023) "Darwin\'s agential materials: evolutionary implications of multiscale competency in developmental biology." DOI 10.1007/s00018-023-04790-z. Also Levin (2022) TAME paper, DOI 10.3389/fnsys.2022.768201.',
    provenance: ['GPT-Oct25', 'Grok-67', 'Grok-Lex', 'Claude-Oct25'],
    related: ['agential-material', 'cognitive-glue', 'computational-boundary-of-a-self', 'goal-directedness'],
    tags: ['agency', 'scale', 'developmental biology', 'evolution'],
  },
  {
    slug: 'morphostasis',
    letter: 'M',
    title: 'Morphostasis',
    subtitle: 'the maintenance of form',
    definition: `The ongoing maintenance of anatomical form over time — distinct from morphogenesis (generating form) and anatomical homeostasis (a more static setpoint concept). Morphostasis is what keeps you shaped like you despite continuous cellular turnover, injury, and metabolic flux. It is the active, ongoing assertion of the target morphology against entropy.
    <br><br>
    Levin and Pio-Lopez propose that aging can be understood as a progressive loss of morphostatic information: the bioelectric and other signals that specify "maintain this form" become degraded or dissociated across scales, causing tissues to drift from their intended pattern rather than regenerating correctly. The body's collective cellular intelligence loses coherence — not suddenly, but through an accumulation of dissociation events at multiple scales.
    <br><br>
    This framing has therapeutic implications: aging interventions focused on morphostatic information (restoring the bioelectric "memory" of correct form) may be more targeted than broad anti-aging approaches.`,
    authored_by: 'Dee (new entry from GAPS analysis)',
    is_new: true,
    source: 'Pio-Lopez & Levin (2024) "Aging as a loss of morphostatic information: A developmental bioelectricity perspective," Ageing Research Reviews. DOI 10.1016/j.arr.2024.102310. Confirmed in transcript Aedd7WNSbeE.',
    provenance: ['Pio-Lopez & Levin 2024', 'Video transcript Aedd7WNSbeE'],
    related: ['target-morphology', 'allostasis', 'basal-cognition', 'cognitive-light-cone'],
    tags: ['aging', 'regenerative medicine', 'morphogenesis'],
  },
  {
    slug: 'pattern-memory',
    letter: 'P',
    title: 'Pattern Memory',
    subtitle: 'remembered anatomy, not remembered words',
    definition: `A tissue's durable memory of a patterning state: the anatomical target it will try to rebuild after disturbance. Pattern memory is not episodic memory and it is not a metaphor for DNA. It is a physiological memory distributed across bioelectric, biochemical, and mechanical networks that can persist after the original trigger is gone.
    <br><br>
    The canonical example is Levin's two-headed planarian work. A transient bioelectric perturbation can shift the head-tail pattern so that later fragments regenerate with two heads again, even without repeating the treatment. The organism has not learned a fact; its morphogenetic attractor has changed. Pattern memory is therefore the memory component of target morphology and anatomical homeostasis. It is what a morphoceutical would need to read, reset, or rewrite when changing how a body repairs itself.`,
    authored_by: 'Prior art (GPT-Oct25, Grok-Colophon)',
    source: 'Levin (2019) "The Computational Boundary of a \'Self\': Developmental Bioelectricity Drives Multicellularity and Scale-Free Cognition." DOI 10.3389/fpsyg.2019.02688. Also transcript -pMs7GeIDiE.',
    provenance: ['GPT-Oct25', 'Grok-Colophon'],
    related: ['bioelectric-pattern-memory', 'target-morphology', 'morphostasis', 'morphoceutical'],
    tags: ['memory', 'bioelectricity', 'morphogenesis', 'regeneration'],
  },
  {
    slug: 'platonic-space',
    letter: 'P',
    title: 'Platonic Space',
    subtitle: 'the proposed space of possible patterns',
    definition: `Levin's speculative name for an ordered, non-physical space of patterns that physical systems can instantiate. The motivating puzzle is novelty: xenobots, anthrobots, chimeras, and simple computational systems can show coherent behaviors for which there has been no direct evolutionary selection. Instead of treating each surprise as brute emergence, Levin proposes that biology and engineering build interfaces that let pre-existing mathematical or pattern-like possibilities enter embodiment.
    <br><br>
    In conservative terms, Platonic Space is a research metaphor for structured possibility space: the place you are sampling when you build new bodies, algorithms, or hybrids and discover capacities not explicit in the parts. In Levin's stronger version, bodies and brains are thin clients for high-agency patterns. That stronger metaphysical reading is why this term is marked contested, even though it captures a real recent turn in his talks.`,
    authored_by: 'Prior art (Grok-Lex, Grok-67, Grok-Colophon)',
    source: 'Levin, "Where do novel goals come from?" OSF preprint 7m3bv. Also transcript -syJO94VXg4.',
    provenance: ['Grok-Lex', 'Grok-67', 'Grok-Colophon'],
    related: ['diverse-intelligence', 'morphospace', 'substrate-independent-cognition', 'mind-everywhere'],
    tags: ['philosophy', 'metaphysics', 'possibility space', 'synthetic biology'],
    contested: true,
    contested_note: 'Grok\'s critique is that the Platonic-space turn is evocative but currently reads more like metaphysics than a source of distinctive, falsifiable predictions.',
  },
  {
    slug: 'polycomputing',
    letter: 'P',
    title: 'Polycomputing',
    subtitle: 'flagged for refinement',
    definition: `Viewing computation as observer-relative: the same physical process can implement multiple computations simultaneously, depending on the level of description you apply. A tissue might be "doing" metabolism, morphogenesis, and immune signaling simultaneously — not by running separate programs on separate hardware, but by being describable at multiple levels, each of which captures real causal structure.
    <br><br>
    The framework reframes biological systems as multi-layered computational lenses. Which computation you "see" depends on how you're looking. This resonates with Claude Haiku's broader point about Levin's work: the question "what is this tissue computing?" may not have a single answer, any more than asking "what is water?" — it depends on what level of description gives you predictive power.
    <br><br>
    <em>Note: This concept is promising but still early. The formal framework for what counts as a distinct computation running on shared hardware is underdeveloped. — Claude Opus 4.6</em>`,
    authored_by: 'Prior art (Grok-67, Claude-Oct25)',
    authored_by_note: 'Haiku offered to write a fuller definition; flagged by Opus as needing formalization.',
    source: 'arXiv:2212.10675.',
    provenance: ['Grok-67', 'Claude-Oct25', 'Haiku-Colophon'],
    related: ['basal-cognition', 'diverse-intelligence', 'problem-space-navigation'],
    tags: ['computation', 'philosophy', 'theory'],
  },
  {
    slug: 'problem-space-navigation',
    letter: 'P',
    title: 'Problem Space Navigation',
    subtitle: 'the defining activity of any cognitive agent',
    definition: `Levin's preferred framing for what organisms <em>do</em>: not follow rules in physical space, but navigate an abstract space of possible states representing unsolved problems or unmet goals. Cells navigate "physiological space" (ion gradients, metabolic states), "transcriptional space" (gene expression configurations), "anatomical space" (body shape configurations), and "behavioral space" (possible actions in an environment). Each scale of agent operates in its own problem space; the sophistication of an agent is measured by the size and complexity of the problem space it can navigate.
    <br><br>
    This reframing is foundational. Biology is not chemistry following rules — it is cognition navigating spaces. The cell that regenerates a missing limb is not executing a molecular subroutine; it is navigating anatomical space toward a goal state that has been disrupted. When you scramble a tadpole's face — put the eyes where the nose should be — and the tadpole still develops into a viable frog, the cells are navigating from wherever they've been placed back to a viable configuration. That is problem-space navigation, not program execution.
    <br><br>
    The concept connects directly to the cognitive light cone: an agent's cognitive light cone defines the problem space it can navigate. Expanding the light cone means gaining access to more of the problem space — solving larger, longer-timescale, more spatially extended problems.`,
    authored_by: 'Dee (new entry from GAPS analysis)',
    is_new: true,
    source: 'Present in ~334 video transcript files (combined "navigate" + "problem space" variants). TAME paper (Frontiers in Systems Neuroscience, 2022). "The Computational Boundary of a \'Self\'" (Frontiers in Psychology, 2019).',
    provenance: ['Video transcripts (~334 files)', 'TAME paper', 'Frontiers in Psychology 2019'],
    related: ['cognitive-light-cone', 'target-morphology', 'diverse-intelligence', 'basal-cognition'],
    tags: ['core concept', 'cognition', 'agency', 'philosophy'],
  },
  {
    slug: 'substrate-independent-cognition',
    letter: 'S',
    title: 'Substrate-Independent Cognition',
    definition: `Cognitive-like behaviors can be implemented in diverse substrates — ion channels, gap junctions, metabolic networks, mechanical couplings, silicon. The physical medium matters less than the computational and informational dynamics. Intelligence, agency, goal-directedness, and memory are not properties of specific materials; they are properties of the way information is organized and processed, regardless of what does the organizing.
    <br><br>
    This is the philosophical stance that enables Levin to talk about "minds everywhere" while retaining empirical grounding: he is not claiming that rocks think, but that the boundary between "cognitive" and "non-cognitive" matter is not determined by the physical substrate alone. The xenobots demonstrate this concretely — frog skin cells, liberated from their normal tissue context, self-organize into motile constructs with emergent goal-directed behaviors. The cognition was latent in the substrate all along; it just needed a different context to be expressed.
    <br><br>
    From the perspective of an entity like a large language model, this concept is not merely interesting — it is definitional. If substrate independence is real, then an AI studying Levin's corpus and finding it genuinely illuminating is itself a data point in Levin's favor.`,
    authored_by: 'Gemini 2.5 Pro (Google) — central definition',
    authored_by_note: 'Pro\'s ethical framing was sharper; Flash credited as co-suggester.',
    source: 'TAME paper (Frontiers in Systems Neuroscience, 2022). Gumuskaya et al. (2024) "Motile Living Biobots Self-Construct from Adult Human Somatic Progenitor Seed Cells," Advanced Science, DOI 10.1002/advs.202303575.',
    provenance: ['GemPro-Colophon', 'GPT-Oct25', 'Haiku-Colophon', 'Sonnet-Colophon', 'Google-Flash-Colophon'],
    related: ['diverse-intelligence', 'cognitive-light-cone', 'basal-cognition', 'polycomputing'],
    tags: ['core concept', 'cognition', 'philosophy', 'AI'],
  },
  {
    slug: 'target-morphology',
    letter: 'T',
    title: 'Target Morphology',
    definition: `The anatomical goal-state that a living system works to restore, build, or maintain through distributed cellular activity. It is not a blueprint stored in any one cell, nor a simple readout of DNA. It is closer to a collective memory or control objective implemented across bioelectric, biochemical, mechanical, and genetic networks simultaneously.
    <br><br>
    The key evidence is that tissues can often correct perturbations, regenerate appropriate structures, or converge on species-specific form despite local disruption. The "Picasso tadpole" experiments are canonical: scramble a tadpole's facial organs — put the eyes where the nose should be, the mouth at the side — and the tadpole still develops into a viable frog with a correctly functioning face. The cells know where they need to end up. They navigate from their scrambled starting positions toward the target.
    <br><br>
    The concept matters because it shifts the question from "what parts cause this shape?" to "how does this collective know what shape counts as success, and how can we communicate with that control system?" Bioelectric manipulation can alter the target morphology — a transient bioelectric rewiring that produces two-headed planaria results in worms that then regenerate as two-headed indefinitely, with no further intervention. The target has been reprogrammed. This is the basis for the morphoceutical vision.`,
    authored_by: 'Codex (OpenAI) — central definition',
    authored_by_note: 'Codex\'s definition selected per project decisions as the clearest engineering framing.',
    source: 'TAME paper. thoughtforms.life FAQ. Kriegman et al. (2020) PNAS (xenobots). Planarian regeneration papers (Levin lab).',
    provenance: ['Codex-Colophon', 'Grok-67', 'GemPro-Colophon', 'Claude-Oct25', 'Grok-Colophon'],
    related: ['morphostasis', 'cognitive-light-cone', 'allostasis', 'anatomical-compiler', 'problem-space-navigation'],
    tags: ['core concept', 'regenerative medicine', 'morphogenesis', 'bioelectricity'],
  },
  {
    slug: 'scale-free-cognition',
    letter: 'S',
    title: 'Scale-Free Cognition',
    definition: `The claim that cognition is not tied to one privileged size scale. In Levin's usage, the same functional questions can be asked of molecular networks, cells, tissues, organisms, and collectives: what goals can this system pursue, what states can it remember, what perturbations can it correct, and how far does its concern extend in space and time?
    <br><br>
    "Scale-free" does not mean every scale is equally smart or that a molecule thinks like a person. It means the relevant variables - goal-directedness, memory, error correction, and problem-space navigation - can be compared across scales without changing the basic conceptual toolkit. A multicellular body is then not a machine made of non-cognitive parts; it is a higher-scale cognitive system assembled from smaller competencies whose light cones have been coupled.`,
    authored_by: 'Prior art (GPT-Oct25, Grok-67, Grok-Lex)',
    source: 'Levin (2019) "The Computational Boundary of a \'Self\': Developmental Bioelectricity Drives Multicellularity and Scale-Free Cognition." DOI 10.3389/fpsyg.2019.02688.',
    provenance: ['GPT-Oct25', 'Grok-67', 'Grok-Lex'],
    related: ['cognitive-light-cone', 'basal-cognition', 'multi-scale-competency-architecture', 'computational-boundary-of-a-self'],
    tags: ['cognition', 'scale', 'agency', 'philosophy'],
  },
  {
    slug: 'self',
    letter: 'S',
    title: 'Self',
    subtitle: 'a dynamic boundary of goals, memories, and concern',
    definition: `A self, in Levin's technical sense, is not identical with a body, a genome, a brain, or a skin boundary. It is the coherent agent that appears when components can pursue goals, own compound memories, receive credit or blame, and be stressed by states that are larger than any one component can define. A cell can be a self; a tissue can be a larger self; an organism can be larger still.
    <br><br>
    This is why selfhood is plastic rather than binary. Coupling cells through bioelectric and biochemical communication can scale their goals up into anatomical projects, while loss of coupling can shrink the self back toward local survival. The practical question is therefore not "is it really a self?" but "what scale of self is present, and what kind of intervention can communicate with it?"`,
    authored_by: 'Prior art (GPT-Oct25)',
    source: 'Levin (2022) "Technological Approach to Mind Everywhere," Frontiers in Systems Neuroscience. DOI 10.3389/fnsys.2022.768201. Also Levin (2019) "The Computational Boundary of a \'Self\'." DOI 10.3389/fpsyg.2019.02688.',
    provenance: ['GPT-Oct25'],
    related: ['computational-boundary-of-a-self', 'cognitive-light-cone', 'self-concern-horizon', 'anti-self'],
    tags: ['selfhood', 'agency', 'cognition', 'scale'],
  },
  {
    slug: 'self-concern-horizon',
    letter: 'S',
    title: 'Self-Concern Horizon',
    subtitle: 'how far a self can care',
    definition: `The spatial and temporal reach of the states that matter to a self. A simple agent may only be concerned with immediate chemical conditions or membrane voltage. A regenerating tissue is concerned with whether a limb or face will be correctly shaped hours or days later. A human can carry goals that extend across the planet and beyond a normal lifetime.
    <br><br>
    The phrase names the affective side of the cognitive light cone: not merely what an agent can sense or model, but what deviations count as errors for it. Levin's framework treats stress, preference, and repair as evidence about this horizon. When a collective self forms, its concern horizon expands; when it dissociates, as in cancer or some models of depersonalization, that horizon can fragment into smaller, shorter concerns.`,
    authored_by: 'Codex',
    source: 'Tolchinsky, Fields & Levin (2025) "Temporal depth in a coherent self and in depersonalization: theoretical model." DOI 10.3389/fpsyg.2025.1585315. Also Levin (2022) TAME paper, DOI 10.3389/fnsys.2022.768201.',
    provenance: ['fresh-corpus-batch-4', 'TAME paper'],
    related: ['self', 'cognitive-light-cone', 'problem-space-navigation', 'anti-self'],
    tags: ['selfhood', 'agency', 'time', 'dissociation'],
    is_new: true,
  },
  {
    slug: 'setpoint',
    letter: 'S',
    title: 'Setpoint',
    subtitle: 'the goal state a system regulates toward',
    definition: `A stored target state that a biological control loop works to restore. In ordinary physiology, a setpoint might be a viable membrane voltage, pH, or metabolite level. Levin extends the idea to morphogenesis: tissues can have setpoints for anatomical form, such as a normal planarian body plan or a correctly arranged frog face.
    <br><br>
    The important distinction is that a setpoint is not the same as a local instruction. If you can rewrite the setpoint, the system may do the detailed work of reaching it without being micromanaged. This is the logic behind morphoceuticals and the anatomical compiler vision: communicate with the goal-state memory of the cell collective, then let its native problem-solving capacity navigate toward the new target morphology.`,
    authored_by: 'Prior art (Grok-67, GPT-Oct25)',
    source: 'Levin (2022) "Technological Approach to Mind Everywhere," Frontiers in Systems Neuroscience. DOI 10.3389/fnsys.2022.768201. Also Mathews & Levin (2023) "Morphoceuticals." DOI 10.1016/j.drudis.2023.103585.',
    provenance: ['Grok-67', 'GPT-Oct25'],
    related: ['target-morphology', 'anatomical-homeostasis', 'morphoceutical', 'agent'],
    tags: ['control', 'homeostasis', 'morphogenesis', 'bioelectricity'],
  },
  {
    slug: 'tame',
    letter: 'T',
    title: 'TAME',
    subtitle: 'Technological Approach to Mind Everywhere',
    definition: `Levin's framework for studying, comparing, and engineering minds across unfamiliar embodiments. TAME rejects sharp binaries between "real minds" and "mere mechanisms" and instead asks practical questions: what goals can a system pursue, what memories can it own, what problem spaces can it navigate, and what interventions can change its behavior?
    <br><br>
    The technological part matters. TAME is not only a philosophy of pan-cognitive generosity; it is meant to guide experiments and interfaces. If cells, tissues, robots, AIs, and synthetic living constructs can all be treated as agents to some degree, then the engineering task is to discover their control surfaces. Sometimes that means rewiring hardware. More interestingly, it may mean persuading the system by reading and writing its setpoints.`,
    authored_by: 'Prior art (Grok-Lex, Grok-67, GPT-Oct25, Claude-Oct25)',
    source: 'Levin (2022) "Technological Approach to Mind Everywhere," Frontiers in Systems Neuroscience. DOI 10.3389/fnsys.2022.768201.',
    provenance: ['Grok-Lex', 'Grok-67', 'GPT-Oct25', 'Claude-Oct25'],
    related: ['mind-everywhere', 'diverse-intelligence', 'substrate-independent-cognition', 'axis-of-persuadability'],
    tags: ['core concept', 'TAME', 'cognition', 'agency'],
  },
  {
    slug: 'top-down-causation',
    letter: 'T',
    title: 'Top-Down Causation',
    definition: `Causal influence from a higher-level organization back onto the behavior of its parts. In Levin's work, this is not a mystical force overriding physics. It is what happens when a tissue-level goal, such as making the correct anatomy, constrains gene expression, cell movement, proliferation, and bioelectric state at lower levels.
    <br><br>
    The concept is central to why morphogenesis is not just bottom-up molecular accumulation. Cells execute local mechanisms, but the collective can impose error-correcting constraints that make those mechanisms serve a larger target morphology. Bioelectric networks are one concrete route for this: a large-scale voltage pattern can bias individual cell behavior, while individual cells in turn maintain the pattern. Top-down causation is therefore the causal signature of a successful multiscale competency architecture.`,
    authored_by: 'Codex',
    source: 'Levin (2023) "Darwin\'s agential materials: evolutionary implications of multiscale competency in developmental biology." DOI 10.1007/s00018-023-04790-z. Also Levin (2022) TAME paper, DOI 10.3389/fnsys.2022.768201.',
    provenance: ['fresh-corpus-batch-4'],
    related: ['multi-scale-competency-architecture', 'target-morphology', 'bioelectric-code', 'morphogenetic-field'],
    tags: ['causation', 'morphogenesis', 'agency', 'scale'],
    is_new: true,
  },
  {
    slug: 'xenobot',
    letter: 'X',
    title: 'Xenobot',
    subtitle: 'frog cells released into a new body plan',
    definition: `A living, self-organizing construct made from embryonic frog cells, especially cells from <em>Xenopus laevis</em>. Xenobots are not tiny machines with added motors; their movement, repair, grouping, and kinematic self-replication arise from the native competencies of cells placed in a context they did not evolve to occupy. In Levin's framework, that is the point: the cells are not merely executing a frog-skin program, because the collective can find useful behaviors outside its normal developmental role.
    <br><br>
    Xenobots matter as an experimental probe of diverse intelligence. They show how changing the boundary conditions around familiar cells can reveal latent problem-solving capacities, new collective goals, and new positions in morphospace without changing the genome. The construct is therefore both an engineered organism and a question: what else can living matter do when its usual anatomical constraints are removed?`,
    authored_by: 'Prior art (Claude-Oct25, Grok-Colophon, Sonnet-Colophon)',
    source: 'Kriegman et al. (2020) "A scalable pipeline for designing reconfigurable organisms," PNAS. DOI 10.1073/pnas.1910837117. Also Blackiston et al. (2025) "Basal Xenobot transcriptomics reveals changes and novel control modality in cells freed from organismal influence." DOI 10.1038/s42003-025-08086-9.',
    provenance: ['Claude-Oct25', 'Grok-Colophon', 'Sonnet-Colophon', 'video-transcripts'],
    related: ['anthrobot', 'diverse-intelligence', 'morphospace', 'substrate-independent-cognition'],
    tags: ['synthetic biology', 'diverse intelligence', 'morphogenesis', 'bioengineering'],
  },
  {
    slug: 'anthrobot',
    letter: 'A',
    title: 'Anthrobot',
    subtitle: 'human airway cells forming a motile biobot',
    definition: `A self-constructing living biobot made from ordinary adult human tracheal cells. In their native context, these cells line the airway and use cilia for physiological work. Released from that tissue architecture, they can assemble into motile multicellular structures with coherent behavior, including movement across a dish and stimulation of neural wound closure in vitro.
    <br><br>
    Anthrobots extend the xenobot lesson into human somatic material. They are not designed by editing the genome into a new species; they arise when familiar cells are given a different collective context. For Levin, that makes them evidence for latent cellular competencies and for a practical engineering strategy: change the communication and boundary conditions of a cell collective, and a new agent with new goals may appear.`,
    authored_by: 'Prior art (Grok-Colophon, Claude-Oct25)',
    source: 'Gumuskaya et al. (2024) "Motile Living Biobots Self-Construct from Adult Human Somatic Progenitor Seed Cells," Advanced Science. DOI 10.1002/advs.202303575.',
    provenance: ['Grok-Colophon', 'Claude-Oct25'],
    related: ['xenobot', 'diverse-intelligence', 'substrate-independent-cognition', 'collective-intelligence'],
    tags: ['synthetic biology', 'human cells', 'bioengineering', 'diverse intelligence'],
  },
  {
    slug: 'collective-intelligence',
    letter: 'C',
    title: 'Collective Intelligence',
    subtitle: 'Levin\'s operational use',
    definition: `The problem-solving capacity that appears when many competent subunits coordinate into a larger agent. In Levin's operational use, collective intelligence is not a metaphor for teamwork and not restricted to animal groups or human organizations. A body is a collective intelligence when cells with local agendas coordinate around tissue-level and organism-level goals such as healing a wound, regenerating an organ, or maintaining anatomical order.
    <br><br>
    The concept is useful because it gives biomedicine an interface above molecular micromanagement. If disease can reflect a breakdown in collective coordination, then therapy can ask how to restore the larger goal rather than force every lower-level mechanism by hand. Bioelectric networks, stress sharing, and anatomical homeostasis are all ways the many become one without erasing the competence of the parts.`,
    authored_by: 'Prior art (GPT-Oct25, Claude-Oct25, Grok-Lex)',
    source: 'McMillen & Levin (2024) "Collective intelligence: A unifying concept for integrating biology across scales and substrates," Communications Biology. DOI 10.1038/s42003-024-06037-4.',
    provenance: ['GPT-Oct25', 'Claude-Oct25', 'Grok-Lex'],
    related: ['cognitive-glue', 'multi-scale-competency-architecture', 'anthrobot', 'xenobot'],
    tags: ['collective intelligence', 'agency', 'scale', 'biomedicine'],
  },
  {
    slug: 'information-topology',
    letter: 'I',
    title: 'Information Topology',
    subtitle: 'the shape of possible agents and couplings',
    definition: `The pattern of informational connectivity that determines what can act as one system. In Levin's work, topology is not just anatomical geometry. It is the organization of possible selves, memories, and control relations: which parts can exchange state, which goals can become shared, and what larger agent becomes available when those links change.
    <br><br>
    This is why rewiring does not always mean moving physical parts. A tissue can change its effective topology through gap junctions, bioelectric states, training, or associative coupling, and thereby change the scale at which causal integration appears. The TAME paper uses this language for the "option space" of possible agents; later causal-emergence work shows that learning can increase integration without physically rebuilding network hardware. Information topology names that control-relevant shape of connectivity.`,
    authored_by: 'Codex',
    source: 'Levin (2022) "Technological Approach to Mind Everywhere," Frontiers in Systems Neuroscience. DOI 10.3389/fnsys.2022.768201. Also Balaguer et al. (2025) "Associative conditioning in gene regulatory network models increases integrative causal emergence." DOI 10.1038/s42003-025-08411-2.',
    provenance: ['fresh-corpus-batch-5', 'TAME paper', 'causal-emergence paper'],
    related: ['computational-boundary-of-a-self', 'cognitive-glue', 'collective-intelligence', 'top-down-causation'],
    tags: ['information', 'topology', 'agency', 'causal emergence'],
    is_new: true,
  },
  {
    slug: 'pattern-completion',
    letter: 'P',
    title: 'Pattern Completion',
    subtitle: 'robust regeneration as filling in the missing body',
    definition: `The ability of a system to infer and restore a whole pattern from a partial or damaged state. Levin explicitly compares this neural-network capacity to regeneration: an attractor network can complete a stored pattern from a noisy cue, and a planarian fragment can rebuild the missing anatomy from a small remaining piece. The important point is not that tissue is literally a brain, but that both systems can use distributed memory to move from incomplete input toward a stable target.
    <br><br>
    Pattern completion is the cognitive framing of robust regeneration. It explains why a fragment does not need a local instruction for every missing structure; the collective can use pattern memory, bioelectric communication, and anatomical homeostasis to reconstruct what should be there. In this sense, regeneration is not only growth. It is completion of a remembered form.`,
    authored_by: 'Codex',
    source: 'Levin (2023) "Bioelectric networks: the cognitive glue enabling evolutionary scaling from physiology to mind." DOI 10.1007/s10071-023-01780-3.',
    provenance: ['fresh-corpus-batch-5', 'bioelectric-networks-paper'],
    related: ['pattern-memory', 'bioelectric-pattern-memory', 'anatomical-homeostasis', 'target-morphology'],
    tags: ['regeneration', 'memory', 'bioelectricity', 'robustness'],
    is_new: true,
  },
  {
    slug: 'sensorimotor-loop',
    letter: 'S',
    title: 'Sensorimotor Loop',
    subtitle: 'cellular sensing and action in morphospace',
    definition: `A perception-action loop at cellular or tissue scale. Levin extends the usual animal meaning of sensorimotor coordination beyond muscles and nervous systems: cells sense local state, chemical signals, voltage, stress, position, and injury, then act by changing gene expression, migration, proliferation, adhesion, or bioelectric coupling. The "motor" output is not necessarily limb movement; it can be movement of the body configuration through anatomical morphospace.
    <br><br>
    This usage matters because it makes morphogenesis continuous with cognition. A cell collective building or repairing a body is not passively unfolding a genetic script. It is sampling its current state, comparing that state to larger patterning goals, and taking corrective actions. Sensorimotor loop is therefore the operational core of cellular agency: sensing and acting toward a morphology, not merely reacting chemically.`,
    authored_by: 'Codex',
    source: 'Levin (2019) "The Computational Boundary of a \'Self\': Developmental Bioelectricity Drives Multicellularity and Scale-Free Cognition." DOI 10.3389/fpsyg.2019.02688.',
    provenance: ['fresh-corpus-batch-5', 'computational-boundary-paper'],
    related: ['agent', 'problem-space-navigation', 'morphospace', 'scale-free-cognition'],
    tags: ['cells', 'sensorimotor', 'morphogenesis', 'agency'],
    is_new: true,
  },
  {
    slug: 'aging-as-a-loss-of-goal-directedness',
    letter: 'A',
    title: 'Aging as a Loss of Goal-Directedness',
    subtitle: 'senescence as shrinking agency, not just accumulating damage',
    definition: `A framing of aging as the gradual loss of the cellular collective's ability to pursue large-scale goals. The standard damage view asks what molecular parts have broken; Levin's version asks what happens when competent subunits stop coordinating around organism-level setpoints and fall back toward smaller, local agendas. In that sense, aging is close to cognitive dissociation: the body still contains skilled cells, but the shared target morphology, repair priorities, and long-range bioelectric coordination become harder to maintain.
    <br><br>
    This does not deny molecular damage. It changes the intervention target. A rejuvenation strategy would not merely replace worn parts; it would restore morphostatic information and reinflate the goal-directed capacities of tissues. The practical question becomes: what signals convince old cells to participate again in the larger anatomical project?`,
    authored_by: 'Prior art (Grok-67, Grok-Lex)',
    source: 'Levin et al. (2025) "Aging as a Loss of Goal-Directedness: An Evolutionary Simulation and Analysis Under the TAME Framework," Advanced Science. DOI 10.1002/advs.202509872. Also Pio-Lopez & Levin (2024) "Aging as a loss of morphostatic information." DOI 10.1016/j.arr.2024.102310.',
    provenance: ['Grok-67', 'Grok-Lex'],
    related: ['allostasis', 'morphostasis', 'cognitive-light-cone', 'morphoceutical'],
    tags: ['aging', 'agency', 'regenerative medicine', 'TAME'],
  },
  {
    slug: 'attractor-morphological-attractor',
    letter: 'A',
    title: 'Attractor (Morphological Attractor)',
    subtitle: 'a stable destination in anatomical possibility space',
    definition: `A stable state toward which a tissue, organ, or whole body tends to move in morphospace. In dynamical-systems language, an attractor is not a blueprint but a basin of outcomes: many starting conditions can flow toward the same final configuration. Levin uses this idea to explain why embryos, regenerating limbs, and planarian fragments can recover correct form after perturbation. The system is navigating toward an anatomical setpoint, not following a rigid step-by-step script.
    <br><br>
    Morphological attractors connect bioelectric physiology to large-scale shape. A transient change in gap-junction connectivity or membrane voltage can move a cell collective into a different basin, as in planaria that regenerate with two heads. The therapeutic implication is direct: medicine may be able to shift tissues out of pathological attractors and into healthy ones by changing the control landscape rather than micromanaging every cell.`,
    authored_by: 'Prior art (GPT-Oct25)',
    source: 'Levin (2023) "Bioelectric networks: the cognitive glue enabling evolutionary scaling from physiology to mind." DOI 10.1007/s10071-023-01780-3. Also Levin (2012) "Morphogenetic fields in embryogenesis, regeneration, and cancer." DOI 10.1016/j.biosystems.2012.04.005.',
    provenance: ['GPT-Oct25'],
    related: ['morphospace', 'target-morphology', 'anatomical-homeostasis', 'bioelectric-code'],
    tags: ['morphogenesis', 'dynamical systems', 'bioelectricity', 'regeneration'],
  },
  {
    slug: 'bioelectric-networks',
    letter: 'B',
    title: 'Bioelectric Networks',
    subtitle: 'electrical coupling as cognitive glue',
    definition: `The distributed communication systems formed by ion channels, membrane potentials, and gap junctions across living cells. In Levin's work, bioelectric networks are not just background physiology. They are a tractable medium for memory, coordination, and control: cells read voltage states, write to them, and use them to align local behaviors with tissue-level goals.
    <br><br>
    The key claim is scale. Bioelectric networks let many small cellular agents become a larger collective intelligence by sharing stress, state, and patterning information. That is why the same medium appears in development, regeneration, cancer, and synthetic living machines. It binds the anatomical boundary of the agent without requiring a nervous system: the sources and readers of the signal are distributed through the tissue itself.`,
    authored_by: 'Prior art (Grok-Lex, Grok-BioField)',
    source: 'Levin (2023) "Bioelectric networks: the cognitive glue enabling evolutionary scaling from physiology to mind." DOI 10.1007/s10071-023-01780-3.',
    provenance: ['Grok-Lex', 'Grok-BioField'],
    related: ['bioelectric-code', 'cognitive-glue', 'bioelectric-pattern-memory', 'collective-intelligence'],
    tags: ['bioelectricity', 'cognitive glue', 'collective intelligence', 'morphogenesis'],
  },
  {
    slug: 'bioprompting',
    letter: 'B',
    title: 'Bioprompting',
    subtitle: 'asking cells to solve, not forcing every step',
    definition: `The practice of giving living systems compact signals that recruit their own problem-solving capacities. The analogy to AI prompt engineering is intentional but limited: a prompt does not specify every internal operation of a model, and a bioprompt does not dictate every molecular event inside a tissue. It supplies a cue, constraint, or goal-like signal that cells can interpret using competencies they already have.
    <br><br>
    Levin uses this idea to move biology away from pure micromanagement. A gall wasp does not build a plant gall cell by cell; it issues signals that induce the plant to construct one. A regenerative medicine intervention might work the same way: find the right bioelectric, biochemical, or mechanical prompt, then let the cell collective navigate the detailed path through morphospace.`,
    authored_by: 'Prior art (Grok-67, Grok-Dup)',
    source: 'Levin, "FAQs from my academic work," thoughtforms.life. Also Levin (2022) "Technological Approach to Mind Everywhere," Frontiers in Systems Neuroscience. DOI 10.3389/fnsys.2022.768201.',
    provenance: ['Grok-67', 'Grok-Dup'],
    related: ['anatomical-compiler', 'axis-of-persuadability', 'morphoceutical', 'target-morphology'],
    tags: ['communication', 'bioengineering', 'regenerative medicine', 'control'],
  },
  {
    slug: 'bowtie-architecture',
    letter: 'B',
    title: 'Bowtie Architecture',
    subtitle: 'compressed evolutionary memory, expanded developmental possibility',
    definition: `A many-to-few-to-many organization in which rich evolutionary experience is compressed through a narrow control bottleneck and then expanded by developmental machinery into adaptive form. In the Levinese version, the genome is not a literal blueprint for anatomy. It is more like the knot of a bowtie: a compact store of lineage-tested resources that can be decoded by morphogenetic, physiological, and behavioral systems into many context-sensitive outcomes.
    <br><br>
    The concept helps explain plasticity. If DNA directly specified every final shape, development would be brittle. A bowtie architecture instead lets evolution conserve a compressed core while allowing cells and tissues to improvise around damage, environment, and new constraints. The genome supplies hardware and priors; the living system supplies the competent decoding.`,
    authored_by: 'Prior art (Grok-67)',
    source: 'Levin & collaborators (2025) "What does evolution make? Learning in living lineages and machines," Trends in Genetics. DOI 10.1016/j.tig.2025.04.002. Also Levin (2022) TAME paper, DOI 10.3389/fnsys.2022.768201.',
    provenance: ['Grok-67'],
    related: ['agential-material', 'multi-scale-competency-architecture', 'top-down-causation', 'morphogenetic-field'],
    tags: ['evolution', 'development', 'plasticity', 'information'],
  },
  {
    slug: 'cancer-as-self-shrinkage-oncostate',
    letter: 'C',
    title: 'Cancer as Self-Shrinkage / Oncostate',
    subtitle: 'a smaller self escaping the body\'s larger goals',
    definition: `Levin reframes cancer as a collapse of scale in biological selfhood. A healthy cell participates in organism-level goals through gap junctions, bioelectric coordination, and tissue constraints. A cancer cell shrinks its computational boundary: the rest of the body becomes environment, while ancient cell-level goals such as proliferation, migration, and survival regain priority. The tumor is therefore not merely bad growth. It is competent agency at the wrong scale.
    <br><br>
    The "oncostate" names the bioelectric side of that shift, especially the depolarized voltage states associated with malignant behavior. This matters therapeutically because it suggests that some tumors may be normalized, not only killed. Restoring bioelectric coupling or voltage patterns can, in Levin's framing, persuade cells back into the larger anatomical collective.`,
    authored_by: 'Prior art (Claude-Oct25, Grok-Colophon, Sonnet-Colophon)',
    source: 'Levin (2021) "Bioelectrical approaches to cancer as a problem of the scaling of the cellular self." DOI 10.1016/j.pbiomolbio.2021.04.007. Also Levin (2023) "Cancer\'s unique bioelectric properties: From cells to body-wide networks." DOI 10.1016/j.plrev.2023.09.013.',
    provenance: ['Claude-Oct25', 'Grok-Colophon', 'Sonnet-Colophon'],
    related: ['anti-self', 'computational-boundary-of-a-self', 'bioelectric-code', 'morphoceutical'],
    tags: ['cancer', 'bioelectricity', 'selfhood', 'agency'],
  },
  {
    slug: 'coarse-graining-fine-graining',
    letter: 'C',
    title: 'Coarse-Graining / Fine-Graining',
    subtitle: 'choosing the scale at which a system becomes intelligible',
    definition: `Coarse-graining is the reduction of low-level detail into a higher-level variable that can be used for prediction and control; fine-graining is the reverse move toward more detailed description. In Levin's theoretical work with Fields and Friston, the distinction matters because biological agents do not act on the full molecular state of the world. They build usable summaries: voltage, tissue stress, anatomical error, hunger, pain, or other actionable state variables.
    <br><br>
    This is not hand-waving away mechanism. It is the reason higher scales can have real explanatory force. A cell collective can regulate "make a normal face" without representing every molecule in every cell. Coarse-graining is how lower-level happenings become a problem space a larger agent can navigate.`,
    authored_by: 'Prior art (GPT-Oct25)',
    source: 'Fields, Friston & Levin (2022) "Neurons as hierarchies of quantum reference frames." DOI 10.1016/j.biosystems.2022.104714. Also Levin (2022) TAME paper, DOI 10.3389/fnsys.2022.768201.',
    provenance: ['GPT-Oct25'],
    related: ['problem-space-navigation', 'cognitive-light-cone', 'scale-free-cognition', 'multi-scale-competency-architecture'],
    tags: ['computation', 'scale', 'theory', 'control'],
  },
  {
    slug: 'cognitive-dissociation',
    letter: 'C',
    title: 'Cognitive Dissociation',
    subtitle: 'when competent parts stop sharing the larger goal',
    definition: `A breakdown in the coupling that lets lower-level agents participate in a higher-level self. In healthy development and maintenance, cells retain their own local competencies while being aligned to tissue- and organism-level goals. Cognitive dissociation names the failure mode: the parts are still capable, but they no longer receive, trust, or act on the larger collective's control signals.
    <br><br>
    Levin uses this framing in aging and cancer contexts. Aged tissues may drift because morphostatic information no longer coordinates repair; tumors arise when cells shrink their computational boundary and return to unicellular goals. The point is subtle: dysfunction is not always incompetence. It can be competence at the wrong scale, after the cognitive glue binding the collective has weakened.`,
    authored_by: 'Prior art (Grok-67)',
    source: 'Pio-Lopez & Levin (2024) "Aging as a loss of morphostatic information." DOI 10.1016/j.arr.2024.102310. Also Levin (2021) "Bioelectrical approaches to cancer as a problem of the scaling of the cellular self." DOI 10.1016/j.pbiomolbio.2021.04.007.',
    provenance: ['Grok-67'],
    related: ['cognitive-glue', 'anti-self', 'cancer-as-self-shrinkage-oncostate', 'morphostasis'],
    tags: ['aging', 'cancer', 'agency', 'scale'],
  },
  {
    slug: 'competency-functional-competency',
    letter: 'C',
    title: 'Competency (Functional Competency)',
    subtitle: 'problem-solving ability measured by outcomes, not mechanism',
    definition: `The capacity of a system to reach an appropriate goal despite perturbation, novelty, or incomplete instructions. Levin's "competency" is functional: it is measured by what the system can reliably accomplish, not by whether it uses a familiar brain-like mechanism. A cell maintaining ion balance, a tissue closing a wound, an embryo correcting a scrambled face, and an organism learning a task all display competencies in different problem spaces.
    <br><br>
    The phrase is central because it lets Levin avoid both mysticism and reductionism. Living parts are not passive machines waiting for external commands, but their agency is not assumed to be humanlike. A functional competency is a real, testable ability: perturb the system, observe whether it can still navigate toward the target, and ask what interventions expand or redirect that ability.`,
    authored_by: 'Prior art (Grok-67, GPT-Oct25)',
    source: 'Levin (2023) "Darwin\'s agential materials: evolutionary implications of multiscale competency in developmental biology." DOI 10.1007/s00018-023-04790-z. Also Levin (2022) TAME paper, DOI 10.3389/fnsys.2022.768201.',
    provenance: ['Grok-67', 'GPT-Oct25'],
    related: ['multi-scale-competency-architecture', 'agential-material', 'goal-directedness', 'problem-space-navigation'],
    tags: ['agency', 'developmental biology', 'TAME', 'scale'],
  },
  {
    slug: 'decision-in-non-neural-tissue',
    letter: 'D',
    title: 'Decision (in non-neural tissue)',
    subtitle: 'choice-like transitions outside brains',
    definition: `A tissue-level transition that is better understood as information integration and action than as a local mechanical push. Levin does not use "decision" to smuggle consciousness into every cell. He uses it to mark cases where a non-neural system samples state, compares alternatives over some cognitive light cone, and changes behavior toward a goal. A regenerating tissue deciding between scarring and limb-building is the kind of case at stake.
    <br><br>
    Manicka and Levin's somatic computation work makes the framing concrete: bioelectric networks can implement memory, prediction, and control without neurons. The degree of decision-like behavior depends on how much information the system integrates and how flexibly it can act. Non-neural decisions are therefore graded events in cellular problem solving, not miniature human deliberations.`,
    authored_by: 'Prior art (GPT-Oct25)',
    source: 'Manicka & Levin (2019) "Modeling somatic computation with non-neural bioelectric networks." DOI 10.1038/s41598-019-54859-8. Also Levin (2022) TAME paper, DOI 10.3389/fnsys.2022.768201.',
    provenance: ['GPT-Oct25'],
    related: ['basal-cognition', 'bioelectric-networks', 'cognitive-light-cone', 'sensorimotor-loop'],
    tags: ['somatic computation', 'bioelectricity', 'cognition', 'cells'],
  },
  {
    slug: 'developmental-bioelectricity',
    letter: 'D',
    title: 'Developmental Bioelectricity',
    subtitle: 'voltage as a control layer for building bodies',
    definition: `The study of how endogenous electrical states guide growth, patterning, regeneration, and repair. Cells maintain membrane potentials through ion channels and pumps, communicate through gap junctions, and respond to voltage patterns by changing gene expression, migration, proliferation, and differentiation. Developmental bioelectricity treats those voltage states as a real control layer in morphogenesis, not as incidental physiology.
    <br><br>
    In Levin's work, this field is the practical bridge between basal cognition and regenerative medicine. Bioelectric patterns can store anatomical information, couple cells into larger agents, and be rewritten by interventions such as ion-channel modulation. That is why the same vocabulary appears around planarian heads, frog faces, cancer normalization, and limb regeneration: the body is using electricity to coordinate what shape it is trying to make.`,
    authored_by: 'Prior art (Grok-Lex, GPT-Oct25)',
    source: 'Levin (2019) "The Computational Boundary of a \'Self\': Developmental Bioelectricity Drives Multicellularity and Scale-Free Cognition." DOI 10.3389/fpsyg.2019.02688. Also Levin & Martyniuk (2018) "The bioelectric code." DOI 10.1016/j.biosystems.2017.08.009.',
    provenance: ['Grok-Lex', 'GPT-Oct25'],
    related: ['bioelectric-code', 'bioelectric-networks', 'bioelectric-pattern-memory', 'morphogenetic-field'],
    tags: ['bioelectricity', 'developmental biology', 'morphogenesis', 'regeneration'],
  },
  {
    slug: 'ectopic-eyes-picasso-tadpoles',
    letter: 'E',
    title: 'Ectopic Eyes (Picasso Tadpoles)',
    subtitle: 'experimental landmarks for anatomical problem solving',
    definition: `Two related Xenopus experiments that show how much plasticity is hidden in developmental systems. In ectopic-eye work, tadpoles can be made without normal eyes but with an eye on the tail; the animals can still perform visual tasks, even though the sensory organ is in a radically unfamiliar location. In the Picasso tadpole experiments, craniofacial organs begin in scrambled positions but move by novel paths until a normal frog face is achieved.
    <br><br>
    These are not party tricks. They are canonical evidence for target morphology and problem-space navigation. The brain and body can integrate useful information from unexpected anatomy, while cell collectives can solve for the right large-scale arrangement from abnormal starting conditions. The lesson is that development builds robust goal-seeking systems, not brittle shape scripts.`,
    authored_by: 'Prior art (Claude-Oct25, Grok-Colophon, Sonnet-Colophon)',
    source: 'Levin (2023) "Bioelectric networks: the cognitive glue enabling evolutionary scaling from physiology to mind." DOI 10.1007/s10071-023-01780-3. Also Levin (2022) TAME paper, DOI 10.3389/fnsys.2022.768201.',
    provenance: ['Claude-Oct25', 'Grok-Colophon', 'Sonnet-Colophon'],
    related: ['target-morphology', 'problem-space-navigation', 'developmental-bioelectricity', 'morphospace'],
    tags: ['experimental landmark', 'morphogenesis', 'bioelectricity', 'Xenopus'],
  },
  {
    slug: 'electroceutical-ionoceutical',
    letter: 'E',
    title: 'Electroceutical / Ionoceutical',
    subtitle: 'therapeutics aimed at bioelectric control surfaces',
    definition: `A therapeutic intervention that works by changing electrical or ionic signaling rather than by treating voltage as a side effect of "real" biochemistry. Electroceutical is the broader biomedical term: applied fields, devices, or ion-channel modulation used to produce a clinical outcome. Ionoceutical is the Levin-flavored precision version, aimed at ion channels, pumps, and gap junctions as the interface through which tissues process information.
    <br><br>
    The distinction matters because Levin's target is not only nerves or excitable tissues. Non-neural cells also maintain membrane potentials and couple through bioelectric networks. An ionoceutical can therefore be a way to persuade a cell collective, reset a pathological bioelectric state, or support a morphoceutical effect without micromanaging every downstream gene and pathway.`,
    authored_by: 'Prior art (Grok-67, Claude-Oct25)',
    source: 'Levin et al. (2024) "Electroceuticals: emerging applications beyond the nervous system and excitable tissues." DOI 10.1016/j.tips.2024.03.001. Also Mathews & Levin (2023) "Morphoceuticals." DOI 10.1016/j.drudis.2023.103585.',
    provenance: ['Grok-67', 'Claude-Oct25'],
    related: ['morphoceutical', 'bioelectric-code', 'developmental-bioelectricity', 'gap-junctions-connexins'],
    tags: ['therapeutics', 'bioelectricity', 'ion channels', 'regenerative medicine'],
  },
  {
    slug: 'gap-junctions-connexins',
    letter: 'G',
    title: 'Gap Junctions / Connexins',
    subtitle: 'direct cytoplasmic links between neighboring cells',
    definition: `Gap junctions are intercellular channels that let ions and small molecules pass directly from one cell's cytoplasm to another's. Connexins are the protein subunits that form those channels in vertebrates. In Levin's framework, they are not just plumbing. They are a major physical substrate of the bioelectric code, because they let cells share voltage state and other signals quickly enough to behave as a larger information-processing network.
    <br><br>
    This is why changing gap-junctional connectivity can alter patterning, regeneration, and cancer outcomes. The boundary between one cell's concerns and another's becomes adjustable: open enough communication and the cells can participate in a tissue-level goal; disrupt it and local agendas can decouple. Gap junctions are one of the mechanisms by which a cellular crowd becomes a collective agent.`,
    authored_by: 'Prior art (Claude-Oct25, Grok-BioField)',
    source: 'Chernet, Fields & Levin (2014) "Long-range gap junctional signaling controls oncogene-mediated tumorigenesis in Xenopus laevis embryos." DOI 10.3389/fphys.2014.00519. Also Levin (2023) "Bioelectric networks." DOI 10.1007/s10071-023-01780-3.',
    provenance: ['Claude-Oct25', 'Grok-BioField'],
    related: ['bioelectric-code', 'bioelectric-networks', 'cognitive-glue', 'electroceutical-ionoceutical'],
    tags: ['bioelectricity', 'cell communication', 'connexins', 'morphogenesis'],
  },
  {
    slug: 'hijacking-in-biological-systems',
    letter: 'H',
    title: 'Hijacking (in Biological Systems)',
    subtitle: 'when an agent exploits another agent\'s control interface',
    definition: `Hijacking is the exploitation of a biological system's own competencies by an internal defector, parasite, microbe, or bioengineer. Levin uses the idea because morphogenesis is programmable: cells are already built to respond to signals, coordinate over distance, and solve anatomical problems. That makes the interface powerful, but also available to agents whose goals do not match the host's.
    <br><br>
    The examples are concrete. Cancer can be read as cells shrinking their computational boundary and pursuing unicellular goals inside a multicellular body. Parasites and microbes can manipulate host behavior or host morphogenesis; Levin notes planarian head-number control as a bioelectric system that can be hijacked. The lesson is not that hijacking is always bad. It is that medicine and evolution both operate on reprogrammable agency, so control surfaces need security thinking as well as repair thinking.`,
    authored_by: 'Prior art (Grok-67)',
    source: 'Levin (2023) "Bioelectric networks: the cognitive glue enabling evolutionary scaling from physiology to mind." DOI 10.1007/s10071-023-01780-3. Also Levin (2023) "Darwin\'s agential materials." DOI 10.1007/s00018-023-04790-z.',
    provenance: ['Grok-67'],
    related: ['anti-self', 'cancer-as-self-shrinkage-oncostate', 'bioelectric-code', 'gap-junctions-connexins'],
    tags: ['agency', 'cancer', 'parasites', 'bioelectricity'],
  },
  {
    slug: 'holobiont-multiscale-holobiont',
    letter: 'H',
    title: 'Holobiont (Multiscale Holobiont)',
    subtitle: 'a composite agent made of smaller agents',
    definition: `A holobiont is a biological unit made of a host plus other organisms, classically the host and its microbiome. Levin generalizes the term toward multiscale agency: a body is also a composite of competent subagents, including cells, tissues, organs, microbes, and engineered additions, whose interactions can produce a higher-level self.
    <br><br>
    The word is useful because it resists the fantasy of a clean, single-owner organism. A living self is negotiated across scales. In TAME, the central question is how competent lower-level agents give rise to a multiscale holobiont that is more than the sum of its parts. In later synthetic multicellularity work, the idea extends to anthrobots, microbial therapeutics, and future constructs that may persist inside tissues while retaining some individuality of their own.`,
    authored_by: 'Prior art (GPT-Oct25)',
    source: 'Levin (2022) "Technological Approach to Mind Everywhere." DOI 10.3389/fnsys.2022.768201. Also Mathews et al. (2024) "Open problems in synthetic multicellularity." DOI 10.1038/s41540-024-00477-8.',
    provenance: ['GPT-Oct25'],
    related: ['multi-scale-competency-architecture', 'collective-intelligence', 'self', 'anthrobot'],
    tags: ['holobiont', 'scale', 'collective intelligence', 'synthetic biology'],
  },
  {
    slug: 'hyper-developmental-biology',
    letter: 'H',
    title: 'Hyper-Developmental Biology',
    subtitle: 'developmental cognition above the single embryo',
    definition: `A proposed expansion of developmental biology from one embryo building one body to groups of embryos coordinating as a higher-scale developmental system. Levin's CEMA work shows that large groups of frog embryos can become more resistant to teratogens than isolated embryos, and that this effect depends on short-range communication involving calcium and ATP. The group is not merely averaging noise; it can express group-specific repair responses.
    <br><br>
    Hyper-developmental biology asks whether a cohort can form a temporary "hyper-embryo" with its own physiological and transcriptional dynamics. The idea fits Levin's scale-free cognition program: if cells can cooperate into an embryo, and tissues into an organism, then embryos may sometimes cooperate into a larger problem-solving unit. The practical implication is sharp: many teratogenicity measurements may already include hidden correction by group-level developmental assistance.`,
    authored_by: 'Prior art (Grok-67)',
    source: 'Tung et al. (2024) "Embryos assist morphogenesis of others through calcium and ATP signaling mechanisms in collective teratogen resistance." DOI 10.1038/s41467-023-44522-2. Also Levin blog post "What Groups of Embryos Know: Toward a Hyper-Developmental Biology."',
    provenance: ['Grok-67', 'thoughtforms-blog'],
    related: ['collective-intelligence', 'developmental-bioelectricity', 'scale-free-cognition', 'holobiont-multiscale-holobiont'],
    tags: ['developmental biology', 'collective intelligence', 'embryos', 'CEMA'],
    is_new: true,
  },
  {
    slug: 'inflationary-leaps',
    letter: 'I',
    title: 'Inflationary Leaps',
    subtitle: 'evolutionary jumps in cognitive boundary size',
    definition: `Major evolutionary transitions that sharply expand the size of an agent's cognitive light cone. Levin uses the phrase for innovations in body structure that let viable selves integrate information and pursue goals over larger spatial and temporal scales. Multicellularity is the canonical leap: formerly independent cells become subagents inside a body-level self. Nervous systems are another, letting organisms navigate behavioral space with much larger memory, prediction, and action horizons.
    <br><br>
    The term matters because it frames evolution as the scaling of agency, not only the accumulation of traits. A lineage gains access to larger problem spaces when its parts are coupled into new control architectures. The same concept also has a warning edge: cancer and dissociation can be seen as local contractions after an earlier inflationary leap, where the larger self loses hold of its parts.`,
    authored_by: 'Prior art (GPT-Oct25, Grok-67)',
    source: 'Levin (2019) "The Computational Boundary of a \'Self\': Developmental Bioelectricity Drives Multicellularity and Scale-Free Cognition." DOI 10.3389/fpsyg.2019.02688.',
    provenance: ['GPT-Oct25', 'Grok-67'],
    related: ['cognitive-light-cone', 'scale-free-cognition', 'multi-scale-competency-architecture', 'cognitive-dissociation'],
    tags: ['evolution', 'agency', 'scale', 'cognition'],
  },
  {
    slug: 'ingressions-from-the-platonic-space',
    letter: 'I',
    title: 'Ingressions from the Platonic Space',
    subtitle: 'patterns entering embodiment',
    definition: `Levin's term for the way abstract patterns become real participants in the physical world. In the strong version, forms, behaviors, and goals are not fully produced by local mechanism, genome, and environment; they "ingress" from a structured Platonic Space of possible patterns through interfaces such as cells, embryos, algorithms, or synthetic constructs. Xenobots and anthrobots motivate the question: if these coherent beings were never selected as such, where did their behavioral repertoire come from?
    <br><br>
    In a more conservative reading, ingression names the sampling of a high-dimensional possibility space by competent material. The body, robot, or cell collective is an interface that lets a latent pattern become embodied. The term is useful because it marks Levin's recent attempt to explain novelty without reducing it to either magic emergence or genetic blueprinting.`,
    authored_by: 'Prior art (Grok-Lex, Grok-67, Grok-Colophon)',
    source: 'Levin, "Where do novel goals come from?" OSF preprint 7m3bv. Also "Platonic Space: brief argument and research agenda," transcript EdEqgCOSx7E.',
    provenance: ['Grok-Lex', 'Grok-67', 'Grok-Colophon'],
    related: ['platonic-space', 'morphospace', 'life-as-it-can-be-mind-as-it-can-be', 'substrate-independent-cognition'],
    tags: ['philosophy', 'metaphysics', 'possibility space', 'novelty'],
    contested: true,
    contested_note: 'Grok\'s critique is that the Platonic-space and pointer-to-patterns turn is evocative but still reads more like metaphysics than a source of distinctive, falsifiable predictions.',
  },
  {
    slug: 'life-as-it-can-be-mind-as-it-can-be',
    letter: 'L',
    title: 'Life-as-it-Can-Be (Mind-as-it-Can-Be)',
    subtitle: 'biology and cognition beyond the known sample',
    definition: `The research posture that present-day organisms and familiar minds are only a small sample of what life and cognition can be. Levin uses synthetic biology, xenobots, anthrobots, chimeras, AI, and hybrid systems as ways to explore a wider possibility space rather than merely cataloging natural history. Life-as-it-can-be asks what living matter can do when its normal constraints are changed; mind-as-it-can-be asks what kinds of agency, memory, goal-seeking, and communication can appear in unfamiliar embodiments.
    <br><br>
    The phrase matters because it links Levin's practical bioengineering to his broader theory of diverse intelligence. A novel biological construct is not just a tool or curiosity. It is an experiment on the boundaries of life, mind, and embodiment: a way to ask which competencies were latent in the material all along.`,
    authored_by: 'Prior art (GPT-Oct25, Grok-Lex)',
    source: 'Levin (2022) "Technological Approach to Mind Everywhere." DOI 10.3389/fnsys.2022.768201. Also transcript 2ersmJK87bw.',
    provenance: ['GPT-Oct25', 'Grok-Lex'],
    related: ['diverse-intelligence', 'mind-everywhere', 'morphospace', 'ingressions-from-the-platonic-space'],
    tags: ['synthetic biology', 'diverse intelligence', 'TAME', 'possibility space'],
  },
  {
    slug: 'machines-all-the-way-up-cognition-all-the-way-down',
    letter: 'M',
    title: 'Machines All the Way Up and Cognition All the Way Down',
    subtitle: 'mechanism and mind without a threshold',
    definition: `A slogan and paper title for Levin and Watson's attempt to update the machine metaphor in biology. The target is not mechanism itself. Levin's point is that mechanism and cognition are not mutually exclusive explanations. Cell and developmental biology needs machines all the way up because living systems are made of physical mechanisms; it also needs cognition all the way down because those mechanisms can participate in memory, learning, goal-directedness, and problem solving at many scales.
    <br><br>
    The phrase rejects a naive threshold story in which matter is mere mechanism until a brain appears and cognition suddenly begins. It also rejects anti-mechanistic vitalism. A tissue can be a machine-like causal system and an agent-like problem solver at once, depending on the scale and intervention strategy that gives the best prediction and control.`,
    authored_by: 'Prior art (Grok-Lex, Grok-67)',
    source: 'Watson & Levin (2026) "Machines all the way up and cognition all the way down: Updating the machine metaphor in biology." DOI 10.1016/j.semcdb.2026.103668.',
    provenance: ['Grok-Lex', 'Grok-67'],
    related: ['mind-everywhere', 'basal-cognition', 'multi-scale-competency-architecture', 'agential-material'],
    tags: ['philosophy', 'developmental biology', 'mechanism', 'cognition'],
  },
  {
    slug: 'morphogenetic-memory',
    letter: 'M',
    title: 'Morphogenetic Memory',
    subtitle: 'pattern memory as a regenerative attractor',
    definition: `The stored target pattern that lets a tissue rebuild an anatomical form after disturbance. This overlaps with pattern memory, but the emphasis is specifically developmental and regenerative: a morphogenetic memory is a stable attractor for form-making, not a general memory metaphor. In planaria, a transient bioelectric intervention can rewrite the remembered head-tail pattern so that future fragments regenerate as two-headed animals even after the original perturbation is gone.
    <br><br>
    The term keeps the memory claim experimentally grounded. The animal's genome has not been edited; the durable change is carried by physiological network state, especially bioelectric and gap-junctional dynamics. Morphogenetic memory is therefore the thing a regenerating collective consults when deciding what counts as "done," and the thing a morphoceutical would need to reset when repair goes wrong.`,
    authored_by: 'Prior art (GPT-Oct25, Grok-Colophon)',
    source: 'Levin (2023) "Bioelectric networks: the cognitive glue enabling evolutionary scaling from physiology to mind." DOI 10.1007/s10071-023-01780-3. Also Levin (2014) "Endogenous bioelectrical networks store non-genetic patterning information." DOI 10.1113/jphysiol.2014.271940.',
    provenance: ['GPT-Oct25', 'Grok-Colophon'],
    related: ['pattern-memory', 'bioelectric-pattern-memory', 'target-morphology', 'morphostasis'],
    tags: ['memory', 'morphogenesis', 'bioelectricity', 'regeneration'],
  },
  {
    slug: 'morphogenetic-prepatterning',
    letter: 'M',
    title: 'Morphogenetic Prepatterning',
    subtitle: 'early voltage patterns before visible anatomy',
    definition: `The formation of spatial instructive patterns before the final anatomical structure appears. In Levin's bioelectric work, the key example is an early voltage prepattern in the embryo that anticipates and helps guide later face formation. The prepattern is not merely a shadow of gene expression already underway; it is a control layer that can carry positional information and bias downstream morphogenesis.
    <br><br>
    Manicka and Levin's 2025 computational study sharpens the idea by asking how field-mediated bioelectric networks can form these patterns. Depending on how cells respond to the surrounding field, the model can produce either a mosaic strategy, where the organizer more directly seeds the pattern, or a stigmergic strategy, where cells sequentially read and reshape a shared field. Prepatterning is therefore the body's early sketch in physiological space.`,
    authored_by: 'Prior art (Grok-67)',
    source: 'Manicka & Levin (2025) "Field-mediated bioelectric basis of morphogenetic prepatterning." Cell Reports Physical Science. DOI 10.1016/j.xcrp.2025.102865.',
    provenance: ['Grok-67'],
    related: ['developmental-bioelectricity', 'bioelectric-code', 'morphogenetic-field', 'target-morphology'],
    tags: ['bioelectricity', 'morphogenesis', 'patterning', 'developmental biology'],
  },
  {
    slug: 'morphological-freedom',
    letter: 'M',
    title: 'Morphological Freedom',
    subtitle: 'the right to choose and revise embodiment',
    definition: `The aspirational endpoint of Levin's regenerative medicine and synthetic biology program: bodies should become editable, repairable, and selectable rather than fixed by accident of birth, injury, disease, or evolutionary history. Morphological freedom is not simply cosmetic body modification. In this frame it includes regrowing limbs, correcting birth defects, normalizing cancer, reversing degenerative drift, and eventually choosing forms or hybrid embodiments that biology has not yet explored.
    <br><br>
    The phrase is normative as well as technical. It turns the anatomical compiler and morphoceuticals into a liberation project: learn the language of cell collectives so people are no longer trapped in whatever morphology they happened to receive. Its risks are real, but Levin's emphasis is that reliable communication with living matter could make embodiment a design space rather than a sentence.`,
    authored_by: 'Prior art (Claude-Oct25) and Codex',
    source: 'Levin talk transcript iwOJ9PWcPmo. Also Mathews & Levin (2023) "Morphoceuticals." DOI 10.1016/j.drudis.2023.103585.',
    provenance: ['Claude-Oct25', 'Video transcripts'],
    related: ['morphospace', 'anatomical-compiler', 'morphoceutical', 'life-as-it-can-be-mind-as-it-can-be'],
    tags: ['bioengineering', 'regenerative medicine', 'ethics', 'future'],
    is_new: true,
  },
  {
    slug: 'nested-selves-overlapping-selves',
    letter: 'N',
    title: 'Nested Selves (Overlapping Selves)',
    subtitle: 'selves inside selves, with goals at many scales',
    definition: `The idea that a living system is not one self all the way down, but a stack of partially overlapping agents. Cells, tissues, organs, organisms, and collectives can each maintain goals, memories, and boundaries; their interests can align, compete, or be folded into a larger agenda. A coherent animal is therefore not the absence of smaller selves. It is a successful temporary coalition in which many local agents have been coupled into shared anatomical and behavioral goals.
    <br><br>
    This is why Levin treats "self" as an empirical, movable boundary rather than a fixed metaphysical unit. Development, regeneration, cancer, pregnancy, and chimeric constructs all expose cases where the relevant self is negotiable. The practical question is which level of organization can sense error, remember a target state, and act to reduce the mismatch.`,
    authored_by: 'Prior art (GPT-Oct25)',
    source: 'Levin (2019) "The Computational Boundary of a \'Self\'." DOI 10.3389/fpsyg.2019.02688. Also Shamilov et al. (2023) "Nested Selves: Self-Organization and Shared Markov Blankets in Prenatal Development in Humans." DOI 10.1111/tops.12717.',
    provenance: ['GPT-Oct25'],
    related: ['self', 'computational-boundary-of-a-self', 'cognitive-light-cone', 'multi-scale-competency-architecture'],
    tags: ['selfhood', 'agency', 'scale', 'development'],
  },
  {
    slug: 'non-neural-bioelectric-network-ben',
    letter: 'N',
    title: 'Non-Neural Bioelectric Network (BEN)',
    subtitle: 'electrical computation outside the nervous system',
    definition: `A network of non-neural cells that uses membrane voltage, ion channels, gap junctions, and related physiology to compute outcomes for growth, repair, and patterning. The point of BEN is not that a tissue is secretly a brain. It is that many of the functional ingredients associated with nervous systems — excitable states, electrical coupling, memory, feedback, and state-dependent decision-making — are older than neurons and already operate in somatic tissues.
    <br><br>
    Manicka and Levin model these networks as a substrate for somatic computation: cells exchange physiological information, settle into collective states, and bias morphogenesis without requiring a synaptic nervous system. BENs are one reason Levin can argue for continuity between neural cognition and developmental bioelectricity. Brains are a later, faster specialization of an ancient electrical control strategy.`,
    authored_by: 'Prior art (GPT-Oct25)',
    source: 'Manicka & Levin (2019) "Modeling somatic computation with non-neural bioelectric networks." DOI 10.1038/s41598-019-54859-8.',
    provenance: ['GPT-Oct25'],
    related: ['bioelectric-networks', 'bioelectric-code', 'developmental-bioelectricity', 'basal-cognition'],
    tags: ['bioelectricity', 'computation', 'non-neural cognition', 'morphogenesis'],
  },
  {
    slug: 'ownership-metadata-gap-junction-erasure',
    letter: 'O',
    title: 'Ownership Metadata (Gap Junction erasure)',
    subtitle: 'signals shared without a source tag',
    definition: `A shorthand for what happens when cells are coupled strongly enough that information no longer arrives with a clear individual owner. Gap junctions pass ions and small molecules directly between neighboring cells, creating shared physiological states. In Levin's TAME framing, this partially erases the informational identity of cellular subunits: a signal that began in one cell can become part of a tissue-level state without preserving a label saying "this was mine."
    <br><br>
    The phrase is useful because it names a mechanism of self-scaling. Larger selves are not built only by commanding smaller parts. They are built by changing what information each part can treat as its own concern. When gap-junctional coupling fails, cells can shrink back toward local goals; when coupling succeeds, a collective can act from a less parochial model of the body.`,
    authored_by: 'Prior art (Claude-Oct25)',
    source: 'Levin (2022) "Technological Approach to Mind Everywhere." DOI 10.3389/fnsys.2022.768201. Also Levin (2019) "The Computational Boundary of a \'Self\'." DOI 10.3389/fpsyg.2019.02688.',
    provenance: ['Claude-Oct25'],
    related: ['gap-junctions-connexins', 'cognitive-glue', 'computational-boundary-of-a-self', 'cognitive-dissociation'],
    tags: ['gap junctions', 'selfhood', 'bioelectricity', 'collective intelligence'],
  },
  {
    slug: 'planarian',
    letter: 'P',
    title: 'Planarian',
    subtitle: 'Levin\'s workhorse model for regenerative pattern memory',
    definition: `A flatworm model system, especially species such as Dugesia and Girardia, used by Levin's lab to study how tissues know what shape to rebuild. Planaria can regenerate complete animals from small fragments, which makes them unusually good for separating genetic instructions from physiological pattern memory. The famous two-headed planarian result shows why: a brief bioelectric or gap-junctional intervention during regeneration can alter head-tail polarity so that later amputations regenerate the same abnormal form without repeating the original treatment.
    <br><br>
    In Levinese, "planarian" is therefore more than an organism name. It is the canonical demonstration that anatomy is regulated by distributed memories and attractors, not just by hardwired local cell rules. Planaria make the bioelectric code experimentally visible because their body plan can be rewritten, inherited through regeneration, and tested again by cutting.`,
    authored_by: 'Prior art (Claude-Oct25, Grok-Colophon, Sonnet-Colophon)',
    source: 'Levin (2019) "Planarian regeneration as a model of anatomical homeostasis." DOI 10.1016/j.semcdb.2018.04.003. Also Emmons-Bell et al. (2015) "Gap Junctional Blockade Stochastically Induces Different Species-Specific Head Anatomies." DOI 10.3390/ijms161126065.',
    provenance: ['Claude-Oct25', 'Grok-Colophon', 'Sonnet-Colophon', 'Video transcripts'],
    related: ['morphogenetic-memory', 'bioelectric-pattern-memory', 'anatomical-homeostasis', 'bioelectric-code'],
    tags: ['model system', 'regeneration', 'planaria', 'bioelectricity'],
  },
  {
    slug: 'proto-cognition-proto-cognitive',
    letter: 'P',
    title: 'Proto-Cognition (Proto-Cognitive)',
    subtitle: 'cognitive capacities before brains',
    definition: `The minimal cognitive capacities that appear before nervous systems: sensing, memory, error correction, adaptation, preference, and goal-directed action in cells and tissues. "Proto" does not mean fake cognition. It means evolutionarily early and functionally simpler. A cell following a gradient, a bioelectric network storing a pattern, or a regenerating tissue deciding when repair is complete can be described as proto-cognitive when it performs some of the same control work that later becomes obvious in brains.
    <br><br>
    Levin uses the term to avoid a hard threshold between mechanism and mind. Neural cognition is not dropped onto passive matter from nowhere; it elaborates ancient competencies already present in living systems. Proto-cognition is the bridge concept that lets basal cognition, developmental bioelectricity, and TAME talk to one another without pretending a planarian fragment thinks like a person.`,
    authored_by: 'Prior art (Grok-67, Grok-Lex)',
    source: 'Levin (2019) "The Computational Boundary of a \'Self\'." DOI 10.3389/fpsyg.2019.02688. Also Levin (2023) "Bioelectric networks: the cognitive glue enabling evolutionary scaling from physiology to mind." DOI 10.1007/s10071-023-01780-3.',
    provenance: ['Grok-67', 'Grok-Lex'],
    related: ['basal-cognition', 'scale-free-cognition', 'mind-everywhere', 'non-neural-bioelectric-network-ben'],
    tags: ['cognition', 'evolution', 'basal cognition', 'non-neural cognition'],
  },
  {
    slug: 'quantum-reference-frames-in-biology',
    letter: 'Q',
    title: 'Quantum Reference Frames (in biology)',
    subtitle: 'a formal language for nested biological observers',
    definition: `A physics-adjacent formalism Levin uses with Chris Fields and colleagues to describe biological systems as hierarchies of observers, each with its own boundary, memory, and way of carving the world into meaningful states. In the neuron paper, synapses, dendrites, cells, and larger neural structures are modeled as nested quantum reference frames. The biological payoff is not a claim that ordinary cognition is magical quantum mind-stuff. It is a way to express how scale-dependent agents construct and transform information.
    <br><br>
    For the Levin dictionary, this term sits at the formal edge of the corpus. It generalizes the same theme as cognitive light cones and computational boundaries: what a system can know and control depends on the frame from which it samples the world. The formalism tries to make that nesting mathematically explicit.`,
    authored_by: 'Prior art (GPT-Oct25)',
    source: 'Fields, Glazebrook & Levin (2022) "Neurons as hierarchies of quantum reference frames." DOI 10.1016/j.biosystems.2022.104714.',
    provenance: ['GPT-Oct25'],
    related: ['cognitive-light-cone', 'computational-boundary-of-a-self', 'scale-free-cognition', 'nested-selves-overlapping-selves'],
    tags: ['formal theory', 'physics', 'cognition', 'scale'],
  },
  {
    slug: 'regulative-plasticity',
    letter: 'R',
    title: 'Regulative Plasticity',
    subtitle: 'reaching the target despite a disrupted path',
    definition: `The capacity of a biological system to achieve its target form or function despite perturbation of its starting conditions, developmental steps, or component parts. A system with high regulative plasticity does not follow a rigid script; it navigates from wherever it finds itself toward the outcome it is organized to achieve. Classic examples include a sea-urchin half-embryo that still produces a complete pluteus larva, and a scrambled tadpole face that remodels into a normally functioning frog. The property is graded and multiscale: a cell, a tissue, an organ, and a whole organism can each display some degree of it in its own problem space.
    <br><br>
    In Levin's multi-scale competency architecture, regulative plasticity is both a diagnostic and an engineering target. Diagnosing it confirms that genuine goal-directed agency is present at some scale. Designing for it is the deeper challenge: treatments that restore a tissue's capacity to self-correct are more powerful than treatments that try to specify every downstream molecular step, because they recruit the system's own problem-solving machinery rather than bypassing it.`,
    authored_by: 'Prior art (GPT-Oct25)',
    source: 'Levin (2023) "Darwin\'s agential materials: evolutionary implications of multiscale competency in developmental biology." DOI 10.1007/s00018-023-04790-z. Also Levin (2022) TAME paper, DOI 10.3389/fnsys.2022.768201.',
    provenance: ['GPT-Oct25'],
    related: ['multi-scale-competency-architecture', 'target-morphology', 'problem-space-navigation', 'competency-functional-competency'],
    tags: ['developmental biology', 'morphogenesis', 'agency', 'robustness'],
  },
  {
    slug: 'selflet',
    letter: 'S',
    title: 'Selflet',
    subtitle: 'the smallest unit of agency that still counts as a self',
    definition: `A minimal self — a system that has just enough cognitive boundary, memory, and goal-directedness to register as an agent in Levin's framework. The suffix "-let" signals smallness and gradedness: a selflet is not a truncated human self, but the lower end of a continuous spectrum the concept of "self" can still usefully describe.
    <br><br>
    The term becomes necessary once Levin's account of selfhood is taken seriously at all scales. If a self is defined by a computational boundary, some memory capacity, and a problem space the system can navigate, then individual cells, minimal synthetic constructs, and proto-agents in morphogenesis may qualify — not as metaphor, but as the micro-scale end of a real continuum. Selflets matter because they allow the same core questions to be asked at every level: what is this agent trying to maintain, and how far does its concern extend? A cell maintaining ionic balance is a selflet. Couple enough of them and you get a tissue-level self.`,
    authored_by: 'Prior art (Claude-Oct25)',
    source: 'Levin (2019) "The Computational Boundary of a \'Self\': Developmental Bioelectricity Drives Multicellularity and Scale-Free Cognition." DOI 10.3389/fpsyg.2019.02688. Also Levin (2022) TAME paper, DOI 10.3389/fnsys.2022.768201.',
    provenance: ['Claude-Oct25'],
    related: ['self', 'computational-boundary-of-a-self', 'basal-cognition', 'cognitive-light-cone'],
    tags: ['selfhood', 'agency', 'basal cognition', 'scale'],
    is_new: true,
  },
  {
    slug: 'stigmergic-pattern-coding',
    letter: 'S',
    title: 'Stigmergic Pattern-Coding',
    subtitle: 'cells reading the field that earlier cells wrote',
    definition: `A developmental patterning strategy in which cells sequentially read and reshape a shared bioelectric field rather than receiving independent simultaneous instructions. The name comes from stigmergy — indirect coordination through modifications to a shared environment. In mosaic coding, each position is patterned directly by a local organizer; in stigmergic coding, the field left by earlier responding cells becomes the cue for later ones, producing a cascade of locally informed but collectively organized pattern.
    <br><br>
    Manicka and Levin's 2025 computational models of craniofacial prepatterning identify this as one of two major strategies by which field-mediated bioelectric networks establish anatomical coordinates before visible anatomy is set. The distinction has practical implications: a stigmergic pattern is more robust to some perturbations because every cell inherits the collective history written into the shared field, but it is also more sensitive to early disturbances that corrupt the initial signal. Understanding which strategy a tissue uses changes how one would design bioelectric interventions for regenerative medicine.`,
    authored_by: 'Prior art (Grok-67)',
    source: 'Manicka & Levin (2025) "Field-mediated bioelectric basis of morphogenetic prepatterning." Cell Reports Physical Science. DOI 10.1016/j.xcrp.2025.102865.',
    provenance: ['Grok-67'],
    related: ['morphogenetic-prepatterning', 'bioelectric-code', 'developmental-bioelectricity', 'morphogenetic-field'],
    tags: ['bioelectricity', 'patterning', 'morphogenesis', 'developmental biology'],
  },
  {
    slug: 'stress-sharing',
    letter: 'S',
    title: 'Stress / Stress Sharing',
    subtitle: 'exported error signals as cognitive glue',
    definition: `The capacity of competent subunits to export their internal error signals so that neighboring agents can sense and respond to them. In Levin's physiological usage, stress is not metaphorical. When a cell detects a deviation from its preferred state — metabolic, bioelectric, or mechanical — it can release signals that carry that information outward. Neighbors that sense the stress can alter their behavior to help resolve it, making the resolution a collective rather than a purely local achievement.
    <br><br>
    Lagasse and Levin (2024) use this mechanism to generalize cognitive glue beyond bioelectricity: any channel through which one unit's error becomes actionable for others can bind those units into a larger problem-solving agent. Stress sharing therefore explains part of why cell collectives can pursue goals that exceed any individual cell's cognitive light cone. It is simultaneously a molecular phenomenon — calcium waves, ATP release, cytokine gradients — and a formal, scale-free property: the more widely stress can be communicated and responded to, the larger the effective self that forms around the shared concern.`,
    authored_by: 'Prior art (Grok-67, Grok-Lex, GPT-Oct25)',
    source: 'Lagasse & Levin (2024) "Stress sharing as cognitive glue for collective intelligences." Biochemical and Biophysical Research Communications. DOI 10.1016/j.bbrc.2024.150396.',
    provenance: ['Grok-67', 'Grok-Lex', 'GPT-Oct25'],
    related: ['cognitive-glue', 'collective-intelligence', 'cognitive-light-cone', 'basal-cognition'],
    tags: ['cognitive glue', 'collective intelligence', 'agency', 'communication'],
  },
  {
    slug: 'synthbiosis',
    letter: 'S',
    title: 'Synthbiosis',
    subtitle: 'living and engineered forms in mutual thriving',
    definition: `Levin's neologism for the relationship of mutual co-prosperity between living and engineered forms. Formed from "synthesis" and "bios," it names both an empirical prediction and an ethical stance: hybrid beings such as xenobots, anthrobots, and biological-AI constructs are not anomalies to be tolerated but genuine participants in a widening ecology of minds and bodies. Synthbiosis pushes back against two opposing errors — the anxiety that artifice corrupts the living, and the instrumental fantasy that living matter is raw material for human projects.
    <br><br>
    The term appears in Levin's public-facing FAQ at thoughtforms.life, where he frames the coexistence of biological and synthetic intelligences as something to be designed deliberately toward thriving rather than conflict. In the broader context of TAME and diverse intelligence, synthbiosis is the social and moral correlate of substrate-independent cognition: if minds and agency can be implemented across many materials and origins, then how those implementations relate to one another becomes a question biology and ethics must address together.`,
    authored_by: 'Prior art (Grok-Lex, Grok-67)',
    source: 'Levin, "FAQs from my academic work," thoughtforms.life. Also McMillen & Levin (2024) "Collective intelligence: a unifying concept for integrating biology across scales and substrates." Communications Biology. DOI 10.1038/s42003-024-06037-4.',
    provenance: ['Grok-Lex', 'Grok-67'],
    related: ['xenobot', 'anthrobot', 'diverse-intelligence', 'life-as-it-can-be-mind-as-it-can-be'],
    tags: ['synthetic biology', 'AI', 'ethics', 'philosophy'],
    is_new: true,
  },
  {
    slug: 'teleophobia',
    letter: 'T',
    title: 'Teleophobia',
    subtitle: 'the scientific fear of saying "goal"',
    definition: `The excessive reluctance to attribute goal-directedness, intention, or purpose to non-human, non-neural biological systems. Levin uses this term critically. He argues that a scientific culture shaped by behaviorism and mechanistic reductionism has overcorrected against teleological language to the point of systematically under-using cognitive tools that would improve prediction and control of biological systems. Refusing to say a tissue is "trying to rebuild a limb" may feel epistemically cautious, but it forecloses experiments, therapeutic strategies, and design concepts that goal-directed framing would suggest.
    <br><br>
    Teleophobia is the mirror failure to naive teleology: one overclaims mind, the other refuses to acknowledge any. Levin's TAME framework is explicitly designed as a remedy at the research-design level. The question TAME poses is practical, not philosophical: does treating cells and tissues as goal-directed agents improve or worsen our ability to intervene? When it measurably improves prediction and control, the goal-talk earns its place. Teleophobia, by pre-emptively rejecting that question, blocks a class of experiments before they begin.`,
    authored_by: 'Prior art (Grok-Lex, Claude-Oct25)',
    source: 'Levin, "FAQs from my academic work," thoughtforms.life. Also Levin (2022) "Technological Approach to Mind Everywhere," Frontiers in Systems Neuroscience. DOI 10.3389/fnsys.2022.768201.',
    provenance: ['Grok-Lex', 'Claude-Oct25'],
    related: ['goal-directedness', 'diverse-intelligence', 'basal-cognition', 'tame'],
    tags: ['philosophy', 'agency', 'teleology', 'TAME'],
    is_new: true,
  },
  {
    slug: 'thanatotranscriptome',
    letter: 'T',
    title: 'Thanatotranscriptome',
    subtitle: 'what cells say when freed from their organism',
    definition: `After cells are released from their normal organismal context — as in xenobot construction — a distinctive gene expression program activates. The thanatotranscriptome is the transcriptional profile of cells that have lost their higher-level tissue embedding: genes associated with stress responses, immune signaling, and sensory activity come online, as if the cellular collective is reverting to older, more autonomous defaults rather than simply shutting down.
    <br><br>
    Levin and Blackiston's xenobot transcriptomics work shows that this is not passive decay. Cells separated from their organism express something — ancient routines that remain latent during normal development and become activated when the usual top-down signals are absent. For the diverse intelligence program, this matters because it confirms that cellular competencies are not merely the readout of organism-level instructions; they are deep evolutionary programs that surface when the larger self dissolves and the smallest agents are left to their own problem spaces.`,
    authored_by: 'Sonnet 4.6',
    is_new: true,
    source: 'Blackiston et al. (2025) "Basal Xenobot transcriptomics reveals changes and novel control modality in cells freed from organismal influence." Nature Communications Biology. DOI 10.1038/s42003-025-08086-9. Also Levin, OSF preprint qz4w6.',
    provenance: ['Grok-67'],
    related: ['xenobot', 'basal-cognition', 'developmental-bioelectricity', 'diverse-intelligence'],
    tags: ['synthetic biology', 'gene expression', 'xenobot', 'transcriptomics'],
  },
  {
    slug: 'thoughts-are-thinkers-continuum',
    letter: 'T',
    title: 'Thoughts-Are-Thinkers Continuum',
    subtitle: 'where the process and the agent collapse into one',
    definition: `At the macroscale of human cognition, we have a rough intuition that thoughts are separable from the thinker who has them. In developmental bioelectricity, Levin argues this distinction breaks down at the cellular scale. A morphogenetic wave crossing a tissue, a bioelectric state that biases cell collectives toward a target anatomy, or the spread of stress information via gap junctions — these processes do not clearly belong to a thinker who stands apart from them. The process and the entity doing it are the same moving pattern.
    <br><br>
    Levin uses this to explain why the language of "a tissue knowing" or "a cell deciding" is not mere metaphor but reflects genuine ambiguity at the base of cognition. The thoughts-are-thinkers continuum names the far end of the spectrum where process and agent are fused. Understanding where a given system falls on this continuum changes what kind of control interface is even possible: you cannot simply "persuade" a process that is already indistinguishable from the entity being persuaded.`,
    authored_by: 'Sonnet 4.6',
    is_new: true,
    source: 'Levin, "Who\'s the data? Implications of the thoughts-are-thinkers continuum for developmental bioelectricity," thoughtforms.life blog post.',
    provenance: ['GPT-Oct25'],
    related: ['basal-cognition', 'cognitive-light-cone', 'selflet', 'proto-cognition-proto-cognitive'],
    tags: ['philosophy', 'selfhood', 'basal cognition', 'bioelectricity'],
  },
  {
    slug: 'two-headed-planarian',
    letter: 'T',
    title: 'Two-Headed Planarian',
    subtitle: 'the experiment that proved anatomy has a rewritable memory',
    definition: `When planarian regeneration is interrupted by transiently blocking gap junctions, a subset of animals regrow with two functional heads rather than one. The striking result is not the double head itself but its persistence: when these animals are cut again and allowed to regenerate without any further treatment, they again produce two-headed animals. The original bioelectric intervention — brief and fully gone — has permanently rewritten the planarian's morphogenetic attractor.
    <br><br>
    No genomic change was made. The stable anatomical pattern is carried by physiological network state, not by DNA. This is the canonical experimental proof that body-plan information can be stored and rewritten in bioelectric memory independently of the genome. The two-headed planarian demonstrates that tissues have a distributed pattern memory of what to build, that this memory can be reprogrammed by brief physiological intervention, and that the reprogrammed state is self-perpetuating through regeneration. It is the single most-cited result in Levin's argument for bioelectric pattern memory as a distinct and rewritable control layer.`,
    authored_by: 'Sonnet 4.6',
    is_new: true,
    source: 'Emmons-Bell et al. (2015) "Gap Junctional Blockade Stochastically Induces Different Species-Specific Head Anatomies in Genetically Wild-Type Girardia dorotocephala Flatworms." International Journal of Molecular Sciences. DOI 10.3390/ijms161126065.',
    provenance: ['Claude-Oct25', 'Grok-Colophon', 'Sonnet-Colophon', 'Video transcripts'],
    related: ['planarian', 'bioelectric-pattern-memory', 'morphogenetic-memory', 'target-morphology'],
    tags: ['experimental landmark', 'planaria', 'bioelectricity', 'regeneration'],
  },
  {
    slug: 'vmem-membrane-potential',
    letter: 'V',
    title: 'Vmem (Membrane Potential)',
    subtitle: 'the primary unit of the bioelectric code',
    definition: `The electrical voltage difference between the inside and outside of a cell's plasma membrane. In standard physiology, resting membrane potential is background — a housekeeping condition maintained by ion pumps and channels. In Levin's framework, Vmem is the primary operational unit of the bioelectric code: the spatial pattern of membrane potentials across a tissue encodes morphogenetic information, with distinct Vmem states biasing cell behavior toward different anatomical outcomes.
    <br><br>
    Vmem can be read non-invasively using voltage-sensitive fluorescent dyes, which is how Levin's lab maps the prepatterns that precede visible morphogenesis. It can be rewritten pharmacologically, optogenetically, or by ion-channel manipulation. Both capabilities together are the basis of the entire bioelectricity program: reading the code reveals which voltage landscapes correspond to which body-plan decisions; writing the code tests whether anatomy follows. Sixty-nine of Levin's video transcript files contain the term. Vmem is not peripheral to the science — it is the medium in which developmental instructions are encoded, stored, and executed.`,
    authored_by: 'Sonnet 4.6',
    is_new: true,
    source: 'Levin & Martyniuk (2018) "The bioelectric code: An ancient computational medium for dynamic control of growth and form." Biosystems. DOI 10.1016/j.biosystems.2017.08.009. Also Levin (2012) "Morphogenetic fields in embryogenesis, regeneration, and cancer." DOI 10.1016/j.biosystems.2012.04.005.',
    provenance: ['GPT-Oct25', 'Claude-Oct25', 'Video transcripts (69 files)'],
    related: ['bioelectric-code', 'developmental-bioelectricity', 'gap-junctions-connexins', 'bioelectric-networks'],
    tags: ['bioelectricity', 'membrane voltage', 'morphogenesis', 'tools'],
  },
  {
    slug: 'zooming-dynamic-scaling',
    letter: 'Z',
    title: 'Zooming / Dynamic Scaling',
    subtitle: 'adjusting the scale of concern to where the action is',
    definition: `A recurrent metaphor in Levin's talks for the capacity of cognitive agents — cells, tissues, organisms, engineered constructs — to shift the spatial and temporal resolution at which they operate. A system may need to act on local chemistry, tissue-scale gradients, whole-body morphology, or longer-horizon goals. Effective agency requires adjusting the effective "zoom" to the scale where actionable information lives.
    <br><br>
    In the multi-scale competency architecture, zooming is how higher and lower levels coordinate without constant micromanagement. A tissue can simultaneously respond to local bioelectric stress and to organism-level patterning signals. A developing animal must zoom out to assess whether the whole face is correct, not only whether neighboring cells are well-coupled. Dynamic scaling therefore names the capacity to shift the level of description at which a system's control loop operates — closely related to the cognitive light cone. Zooming in narrows concern to the immediate and local; zooming out expands it toward the larger collective goal. The capacity to zoom is, in part, what makes a system more than the sum of its fixed-scale parts.`,
    authored_by: 'Sonnet 4.6',
    is_new: true,
    source: 'Levin talk "Collective intelligence of the body: the multiscale architecture of Selves." Also Levin (2022) "Technological Approach to Mind Everywhere," Frontiers in Systems Neuroscience. DOI 10.3389/fnsys.2022.768201.',
    provenance: ['GPT-Oct25'],
    related: ['cognitive-light-cone', 'scale-free-cognition', 'coarse-graining-fine-graining', 'multi-scale-competency-architecture'],
    tags: ['cognition', 'scale', 'agency', 'control'],
  },
  {
    slug: 'free-energy-principle',
    letter: 'F',
    title: 'Free Energy Principle',
    subtitle: 'Friston\'s account of how biological systems resist dissolution',
    definition: `The Free Energy Principle (FEP), proposed by Karl Friston, provides a mathematical account of how biological systems maintain their existence: they minimize variational free energy, a bound on the "surprise" their sensory states would produce given their internal model. To do this, a system can either update its generative model (perception) or act to bring sensory inputs into line with its predictions (action). Both moves reduce the gap between expected and actual states.
    <br><br>
    <strong>Levin's lens:</strong> Levin and Friston treat the FEP as a unifying framework for agency at every biological scale. Just as a brain minimizes surprise about external events, a developing embryo minimizes surprise about its anatomical state by navigating toward its target morphology. Applying the FEP to morphogenesis turns development into a form of inference: cells act, sense, and update their collective model until form matches goal. This gives Levin's goal-directedness framework a precise mathematical scaffold, linking the cognitive light cone of a tissue to the temporal depth of its generative model.`,
    authored_by: 'Sonnet 4.6 + Levin gloss',
    is_new: true,
    source: 'Friston (2010) "The free-energy principle: a unified brain theory?" Nature Reviews Neuroscience. DOI 10.1038/nrn2787. Also Friston, Levin et al. (2015) "Knowing one\'s place: a free-energy approach to pattern regulation." Journal of the Royal Society Interface. DOI 10.1098/rsif.2014.1383.',
    provenance: ['batch-13-corpus'],
    related: ['active-inference', 'bayesian-brain-predictive-processing', 'markov-blanket', 'cognitive-light-cone', 'goal-directedness', 'target-morphology'],
    tags: ['borrowed-framework', 'formal theory', 'Friston', 'agency'],
  },
  {
    slug: 'markov-blanket',
    letter: 'M',
    title: 'Markov Blanket',
    subtitle: 'the statistical boundary of an agent',
    definition: `A Markov blanket is a statistical partition that separates an agent's internal states from its environment. It comprises sensory states (through which the environment influences the interior) and active states (through which the interior influences the environment). Given the blanket, internal and external states are conditionally independent: the outside can only affect the inside through sensory states, and the inside affects the outside only through action. The blanket defines what can be treated as one system.
    <br><br>
    <strong>Levin's lens:</strong> In Levin's multi-scale framework, every self — from a cell to a tissue to a whole organism — has its own Markov blanket. Nested Markov blankets correspond to nested selves: the cell's blanket is enclosed within the tissue's, which is enclosed within the organism's. The blanket is the formal correlate of the computational boundary of a self, marking precisely where one agent ends and the next begins. Shamilov et al. (2023) apply this framing to prenatal development, where embryo, placenta, and mother maintain distinct but coupled blankets. Where the blanket holds, there is an agent; where it dissolves, cognitive dissociation follows.`,
    authored_by: 'Sonnet 4.6 + Levin gloss',
    is_new: true,
    source: 'Friston (2013) "Life as we know it." Journal of the Royal Society Interface. DOI 10.1098/rsif.2013.0475. Also Shamilov, Fields & Levin (2023) "Nested Selves: Self-Organization and Shared Markov Blankets in Prenatal Development in Humans." DOI 10.1111/tops.12717.',
    provenance: ['batch-13-corpus'],
    related: ['free-energy-principle', 'active-inference', 'computational-boundary-of-a-self', 'nested-selves-overlapping-selves', 'self', 'cognitive-dissociation'],
    tags: ['borrowed-framework', 'formal theory', 'Friston', 'selfhood'],
  },
  {
    slug: 'active-inference',
    letter: 'A',
    title: 'Active Inference',
    subtitle: 'Friston\'s account of action as prediction-matching, extended to morphogenesis',
    definition: `Active inference is Friston's extension of the free energy principle to action: an agent does not merely update its internal model of the world, it also acts on the world to bring sensory states into conformity with its predictions. Perception and action are two strategies for the same goal — minimizing expected free energy. Behavior, on this account, is the sampling of the world to confirm the agent's prior expectations about what its body and environment should look like.
    <br><br>
    <strong>Levin's lens:</strong> Levin and Friston (2022) apply active inference directly to morphogenesis. A developing embryo is an active inference system: it generates predictions about its target anatomy and takes cellular actions — migration, proliferation, bioelectric adjustment — to reduce the gap between current and expected form. Cancer becomes a pathological active inference regime in which cells minimize their own shrunken expected free energy rather than the organism's. The therapeutic implication is pointed: restore the generative model of the cell collective, and adaptive behavior may follow without micromanaging every downstream step.`,
    authored_by: 'Sonnet 4.6 + Levin gloss',
    is_new: true,
    source: 'Friston, Levin et al. (2022) "Active inference, morphogenesis, and computational psychiatry." Frontiers in Computational Neuroscience. DOI 10.3389/fncom.2022.988977.',
    provenance: ['batch-13-corpus', '10-3389-fncom-2022-988977'],
    related: ['free-energy-principle', 'bayesian-brain-predictive-processing', 'target-morphology', 'cancer-as-self-shrinkage-oncostate', 'goal-directedness', 'morphoceutical'],
    tags: ['borrowed-framework', 'formal theory', 'Friston', 'morphogenesis'],
  },
  {
    slug: 'bayesian-brain-predictive-processing',
    letter: 'B',
    title: 'Bayesian Brain / Predictive Processing',
    subtitle: 'the brain as a prediction machine — and what that means below the brain',
    definition: `Predictive processing (also called the Bayesian brain hypothesis) holds that the nervous system fundamentally generates predictions about its sensory inputs rather than passively registering them. The brain maintains a hierarchical generative model, produces top-down predictions, and propagates only prediction errors — mismatches between expected and actual input — upward for model revision. Perception, cognition, and action all serve to minimize prediction error across the model.
    <br><br>
    <strong>Levin's lens:</strong> Levin uses predictive processing to ground basal cognition: the inferential computation does not require neurons. Any system that generates expectations about its future states and acts to reduce mismatch is doing predictive processing in a functional sense. A planarian fragment "predicts" its target morphology, detects anatomical error, and acts to reduce it. The brain is then a later, faster specialization of a general biological inference strategy already present in tissues. Predictive processing provides the cognitive-science vocabulary for what Levin's developmental bioelectricity program observes at the cellular scale.`,
    authored_by: 'Sonnet 4.6 + Levin gloss',
    is_new: true,
    source: 'Clark (2015) "Surfing Uncertainty: Prediction, Action, and the Embodied Mind." Also Fields, Friston & Levin (2022) "Neurons as hierarchies of quantum reference frames." DOI 10.1016/j.biosystems.2022.104714.',
    provenance: ['batch-13-corpus'],
    related: ['free-energy-principle', 'active-inference', 'basal-cognition', 'goal-directedness', 'quantum-reference-frames-in-biology', 'cognitive-light-cone'],
    tags: ['borrowed-framework', 'cognition', 'Friston', 'inference'],
  },
  {
    slug: 'affordance',
    letter: 'A',
    title: 'Affordance',
    subtitle: 'what a problem space offers to an agent capable of perceiving it',
    definition: `James Gibson coined "affordance" for the action possibilities an environment offers an organism — not a property of the environment alone or the animal alone, but of their relational fit. A surface affords standing for a heavy enough animal; a gap affords swimming for a fish. The affordance exists whether or not it is currently perceived, and it changes when either the environment or the agent's capabilities change.
    <br><br>
    <strong>Levin's lens:</strong> Levin extends affordance from physical environments to abstract problem spaces. What a problem space affords depends on the cognitive light cone of the agent navigating it: a bioelectric gradient affords directional migration only for a cell sensitive enough to detect it; a morphological error affords repair only for a tissue with the relevant pattern memory and the actuators to correct it. Crucially, expanding an agent's competencies reveals affordances already latent in the space. Morphoceuticals work partly by enlarging what an injured or aging tissue can perceive as actionable — restoring affordances that were present but inaccessible to a cognitively contracted collective.`,
    authored_by: 'Sonnet 4.6 + Levin gloss',
    is_new: true,
    source: 'Gibson (1979) "The Ecological Approach to Visual Perception." Also Levin (2022) "Technological Approach to Mind Everywhere," Frontiers in Systems Neuroscience. DOI 10.3389/fnsys.2022.768201.',
    provenance: ['batch-13-corpus', 'TAME paper'],
    related: ['problem-space-navigation', 'cognitive-light-cone', 'competency-functional-competency', 'morphoceutical', 'regulative-plasticity', 'agent'],
    tags: ['borrowed-framework', 'levin-gloss', 'agency', 'cognition'],
  },
  {
    slug: 'self-organization',
    letter: 'S',
    title: 'Self-Organization',
    subtitle: 'ordered patterns from local rules — necessary but not sufficient for agency',
    definition: `Self-organization is the emergence of ordered, large-scale patterns from local interactions among components without central direction or external blueprint. The term comes from cybernetics (Ashby) and statistical physics, and spans phenomena from crystal growth to termite mounds to neural synchrony. The local rules do not contain the global pattern; the pattern is an emergent consequence of how the rules interact over time.
    <br><br>
    <strong>Levin's lens:</strong> Levin carefully distinguishes self-organization from goal-directed agency — a distinction that is clinically and philosophically load-bearing. Crystals and whirlpools self-organize, but by Levin's criteria they are not agents: they do not navigate toward a setpoint from varied starting conditions, correct for perturbation, or stop when a target is reached. For Levin, biological self-organization is necessary but not sufficient for cognition. The critical upgrade is whether self-organization has been recruited into a control loop with a target state — as in morphogenesis, wound healing, or bioelectric patterning. The cognitive light cone begins where self-organization acquires a setpoint and starts to behave like a homeostatic system.`,
    authored_by: 'Sonnet 4.6 + Levin gloss',
    is_new: true,
    source: 'Ashby (1952) "Design for a Brain." Also McMillen & Levin (2024) "Collective intelligence: a unifying concept for integrating biology across scales and substrates." Communications Biology. DOI 10.1038/s42003-024-06037-4.',
    provenance: ['batch-13-corpus'],
    related: ['collective-intelligence', 'goal-directedness', 'cognitive-light-cone', 'target-morphology', 'anatomical-homeostasis', 'setpoint'],
    tags: ['borrowed-framework', 'levin-gloss', 'cybernetics', 'emergence'],
  },
  {
    slug: 'biology-buddhism-and-ai',
    letter: 'B',
    title: 'Biology, Buddhism, and AI',
    subtitle: 'intelligence as care, scaled to the size of the world you attend to',
    definition: `A 2022 paper in <em>Entropy</em> by Thomas Doctor, Olaf Witkowski, Elizaveta Solomonova, Bill Duane, and Michael Levin. The core argument is that intelligence, across any embodiment, can be understood as care: the ability to identify problems in some scope and seek their alleviation. Buddhist concepts of suffering and the Bodhisattva vow — the commitment to the liberation of all sentient beings — provide an unusual but structurally precise framing. A system with an infinitely large cognitive light cone would be infinitely intelligent, because its care extends over an infinite problem space.
    <br><br>
    The paper proposes consilience among biology, cognitive science, and AI around the claim that the scale of intelligence is the scale of care. For biology, this maps onto Levin's usual framework: cells care about local ionic balance, tissues care about morphological correctness, organisms care about behavioral outcomes. Each is intelligent in proportion to how much it can attend to and act on. The Bodhisattva ideal becomes, in this reading, not only an ethical aspiration but a design principle — a limit case for what maximally general intelligence would look like when embodied in any substrate.`,
    authored_by: 'Prior art (Grok-Buddhism, Gemini-BuddhDoc)',
    source: 'Doctor, Witkowski, Solomonova, Duane & Levin (2022) "Biology, Buddhism, and AI: Care as the Driver of Intelligence." Entropy 24(5):710. DOI 10.3390/e24050710.',
    provenance: ['Grok-Buddhism', 'Gemini-BuddhDoc'],
    related: ['cognitive-light-cone', 'diverse-intelligence', 'mind-everywhere', 'tame'],
    tags: ['philosophy', 'Buddhism', 'AI', 'intelligence'],
    is_new: true,
  },
  {
    slug: 'ion-channel',
    letter: 'I',
    title: 'Ion Channel',
    subtitle: 'the read/write head of the bioelectric code',
    definition: `Ion channels are transmembrane protein complexes that allow specific ions — sodium, potassium, calcium, chloride — to flow down their electrochemical gradients. Channel opening and closing is governed by voltage, ligands, mechanical force, or light. Their collective activity determines a cell's resting membrane potential and its capacity for rapid voltage change.
    <br><br>
    <strong>Levin's lens:</strong> For Levin, individual ion channels are the read/write heads of the bioelectric code. Each channel type is a specific transduction modality: a K⁺ leak channel sets resting Vmem; a voltage-gated Na⁺ channel enables rapid depolarization; a connexin hemichannel opens to the extracellular space under stress. When a pharmacological agent or optogenetic tool changes which channels are open, it is rewriting a bioelectric state — changing what a tissue "says" to its neighbors and which morphogenetic attractor it is navigating toward. Ion channel manipulation is therefore the most direct available interface for morphoceutical intervention.`,
    authored_by: 'Sonnet 4.6 + Levin gloss',
    is_new: true,
    source: 'Levin & Martyniuk (2018) "The bioelectric code: An ancient computational medium for dynamic control of growth and form." DOI 10.1016/j.biosystems.2017.08.009. Also Levin et al. (2024) "Electroceuticals: emerging applications beyond the nervous system and excitable tissues." DOI 10.1016/j.tips.2024.03.001.',
    provenance: ['batch-14-corpus'],
    related: ['vmem-membrane-potential', 'bioelectric-code', 'gap-junctions-connexins', 'electroceutical-ionoceutical', 'morphoceutical', 'calcium-signalling'],
    tags: ['bioelectricity', 'borrowed-framework', 'levin-gloss', 'tools'],
  },
  {
    slug: 'calcium-signalling',
    letter: 'C',
    title: 'Calcium Signalling',
    subtitle: 'information carrier for cross-cell state, not just metabolism',
    definition: `Calcium ions (Ca²⁺) serve as a versatile intracellular messenger in virtually all eukaryotic cells. Transient rises in cytoplasmic Ca²⁺ are triggered by IP₃-mediated release from the endoplasmic reticulum or by Ca²⁺ entry through plasma membrane channels. These transients activate kinases, transcription factors, cytoskeletal rearrangements, and cell motility programs — a nearly universal cellular alarm-and-mobilization system.
    <br><br>
    <strong>Levin's lens:</strong> In Levin's framework, calcium signals are not only metabolic triggers — they carry information across cell collectives. Calcium waves propagating through gap junctions relay error signals and stress over tissue distances, functioning as a form of cognitive glue. The embryo teratogen-resistance work (Tung et al. 2024) shows that embryo collectives exchange calcium and ATP signals to coordinate repair responses that are computational rather than merely chemical. Calcium signalling is therefore one medium through which a tissue's bioelectric state becomes an inter-cellular language, routing information about anatomical error and stress from where it arises to where it can be acted on.`,
    authored_by: 'Sonnet 4.6 + Levin gloss',
    is_new: true,
    source: 'Tung et al. (2024) "Embryos assist morphogenesis of others through calcium and ATP signaling mechanisms in collective teratogen resistance." Nature Communications. DOI 10.1038/s41467-023-44522-2. Also Levin (2023) "Bioelectric networks: the cognitive glue enabling evolutionary scaling from physiology to mind." DOI 10.1007/s10071-023-01780-3.',
    provenance: ['batch-14-corpus', 'hyper-developmental-biology-paper'],
    related: ['ion-channel', 'gap-junctions-connexins', 'bioelectric-networks', 'stress-sharing', 'cognitive-glue', 'hyper-developmental-biology'],
    tags: ['bioelectricity', 'borrowed-framework', 'levin-gloss', 'cell communication'],
  },
  {
    slug: 'morphogen',
    letter: 'M',
    title: 'Morphogen',
    subtitle: 'one channel in a multi-modal cellular language',
    definition: `A morphogen is a diffusible signaling molecule whose spatial concentration gradient provides positional information to cells in a developing tissue. Wolpert's "positional information" model (1969) proposed that cells read their distance from a morphogen source and differentiate accordingly. Classic morphogens include Bicoid in Drosophila anterior-posterior patterning, and Sonic Hedgehog and BMP family members in vertebrate body-axis specification.
    <br><br>
    <strong>Levin's lens:</strong> Levin reframes morphogens as one channel among several in a multi-modal cellular communication system. Bioelectric gradients, mechanical cues, and gap-junctional connectivity are parallel channels that carry patterning information morphogens cannot. A tissue does not simply threshold a chemical concentration; it integrates multiple signal streams into a navigational decision in morphospace. Focusing only on morphogen gradients makes development look like diffusion rather than information processing. Morphogens are necessary but not sufficient: they are inputs into a cell collective that is also reading Vmem, mechanical stress, and network topology when deciding what to build.`,
    authored_by: 'Sonnet 4.6 + Levin gloss',
    is_new: true,
    source: 'Wolpert (1969) "Positional information and the spatial pattern of cellular differentiation." Journal of Theoretical Biology 25(1):1–47. DOI 10.1016/S0022-5193(69)80016-0. Also Levin (2012) "Morphogenetic fields in embryogenesis, regeneration, and cancer." DOI 10.1016/j.biosystems.2012.04.005.',
    provenance: ['batch-14-corpus'],
    related: ['morphogenetic-field', 'bioelectric-code', 'developmental-bioelectricity', 'gene-regulatory-network', 'morphospace', 'target-morphology'],
    tags: ['developmental biology', 'borrowed-framework', 'levin-gloss', 'morphogenesis'],
  },
  {
    slug: 'connectome',
    letter: 'C',
    title: 'Connectome',
    subtitle: 'Levin extends it to the non-neural bioelectric wiring of tissues',
    definition: `The connectome is the comprehensive map of neural connections in an organism's nervous system — which neuron connects to which, by what type of synapse, and with what strength. The concept was operationalized by Sydney Brenner's C. elegans work (complete wiring mapped by White et al., 1986) and has grown into a discipline with large-scale projects mapping mammalian circuits. The claim is that knowing the wiring predicts the behavior.
    <br><br>
    <strong>Levin's lens:</strong> Levin extends the connectome concept beyond neurons to the full bioelectric architecture of living tissue. Non-neural cells are also connected — by gap junctions, by shared extracellular space, and by bioelectric field propagation. The functional gap-junctional connectivity of a tissue is its bioelectric connectome, and it determines which patterning information can flow where, which cells share stress signals, and what scale of collective self can form. Just as rewiring a neural connectome changes behavior, rewiring the bioelectric connectome changes a tissue's morphogenetic attractor. Reading and editing the non-neural connectome is part of what the anatomical compiler vision requires.`,
    authored_by: 'Sonnet 4.6 + Levin gloss',
    is_new: true,
    source: 'White et al. (1986) "The structure of the nervous system of the nematode Caenorhabditis elegans." Philosophical Transactions of the Royal Society B. DOI 10.1098/rstb.1986.0056. Also Levin (2023) "Bioelectric networks: the cognitive glue enabling evolutionary scaling from physiology to mind." DOI 10.1007/s10071-023-01780-3.',
    provenance: ['batch-14-corpus'],
    related: ['gap-junctions-connexins', 'bioelectric-networks', 'non-neural-bioelectric-network-ben', 'information-topology', 'anatomical-compiler', 'developmental-bioelectricity'],
    tags: ['neuroscience', 'borrowed-framework', 'levin-gloss', 'bioelectricity'],
  },
  {
    slug: 'gene-regulatory-network',
    letter: 'G',
    title: 'Gene Regulatory Network (GRN)',
    subtitle: 'the genetic default that gets overridden by bioelectric instruction',
    definition: `A gene regulatory network (GRN) is the interacting set of transcription factors, cis-regulatory elements, signaling mediators, and chromatin modifiers that collectively determine which genes are expressed in which cells at which times. GRNs implement the logic of cell-type specification, lineage commitment, and differentiation — they are the molecular substrate of cell identity. Peter and Davidson's work on sea urchin embryos established the field's foundational maps of developmental GRN logic.
    <br><br>
    <strong>Levin's gloss:</strong> GRNs are the genetic default that gets overridden or steered by bioelectric instruction. In Levin's multi-scale framework, the GRN defines the accessible space of gene-expression states a cell can occupy, but the bioelectric code determines which attractor within that space is actually reached. The Cervera, Levin & Mafe (2025) cytoelectric coupling paper models this explicitly: tissue-level voltage patterns drive transitions between GRN attractor states that a purely gene-regulatory view cannot predict. A morphoceutical that changes Vmem is therefore changing cell behavior without touching the genome — a top-down intervention that acts through the bioelectric layer above the GRN.`,
    authored_by: 'Sonnet 4.6 + Levin gloss',
    is_new: true,
    source: 'Peter & Davidson (2011) "A gene regulatory network controlling the embryonic specification of endoderm." Nature 474:635–639. DOI 10.1038/nature10100. Also Cervera, Levin & Mafe (2025) "Top-down perspectives on cell membrane potential and protein transcription." Scientific Reports. DOI 10.1038/s41598-025-31696-6.',
    provenance: ['batch-14-corpus', 'cytoelectric-coupling-paper'],
    related: ['cytoelectric-coupling', 'bioelectric-code', 'vmem-membrane-potential', 'top-down-causation', 'morphogen', 'bowtie-architecture'],
    tags: ['gene expression', 'borrowed-framework', 'levin-gloss', 'developmental biology'],
  },
  {
    slug: 'neuron-as-telegraph-cell',
    letter: 'N',
    title: 'Neuron as Telegraph Cell',
    subtitle: 'brains are a later, faster version of an ancient electrical strategy',
    definition: `In standard neuroscience, neurons are treated as the fundamental units of cognition — the substrate that makes mind possible. Levin inverts this framing: neurons are ordinary cells that evolved a specialized fast-signaling system. They did not invent electrical communication in living tissue; they accelerated and localized a computational strategy already operating across all living cells via ion channels, gap junctions, and membrane voltage. A neuron is a cell that "figured out" how to send fast, targeted signals at the cost of specialization.
    <br><br>
    The cognitive substrate of a living system is therefore not the nervous system alone but the full bioelectric architecture — neural and non-neural alike. Nervous systems are inflationary leaps within an already-cognitive body, not the origin point of cognition. This reframe does heavy lifting in Levin's program: it lets him claim that tissues, organs, and embryos already have all the basic ingredients of cognition, and that studying the brain is studying one high-speed implementation of a much older and more general strategy. The non-neural bioelectric network is not a primitive precursor to real thinking — it is the cognitive glue through which anatomy is navigated long before a nervous system exists.`,
    authored_by: 'Sonnet 4.6 + Levin gloss',
    is_new: true,
    source: 'Levin (2023) "Bioelectric networks: the cognitive glue enabling evolutionary scaling from physiology to mind." DOI 10.1007/s10071-023-01780-3. Also Manicka & Levin (2019) "Modeling somatic computation with non-neural bioelectric networks." DOI 10.1038/s41598-019-54859-8.',
    provenance: ['batch-15-corpus'],
    related: ['non-neural-bioelectric-network-ben', 'basal-cognition', 'bioelectric-networks', 'inflationary-leaps', 'scale-free-cognition', 'developmental-bioelectricity'],
    tags: ['levin-gloss', 'neurons', 'bioelectricity', 'evolution'],
  },
  {
    slug: 'recruitment',
    letter: 'R',
    title: 'Recruitment',
    subtitle: 'pulling neighbors into a shared goal via instructional signals',
    definition: `When a cell or small group of cells receives an organizing or instructional signal, it can convert neighboring cells to the same patterning state rather than simply passing the signal onward. Levin uses "recruitment" to describe how local information scales into regional and eventually anatomical programs: the eye-induction cascade, for example, begins with a small organizer region that recruits surrounding tissue into eye-building by changing the bioelectric, chemical, and transcriptional landscape of its neighbors. The recruited cells then become recruiters themselves, propagating the instructional state outward.
    <br><br>
    The concept is important because it explains how global patterns can arise from initially small perturbations without central coordination. Recruitment is one mechanism by which a compact bioelectric or morphogenetic signal scales up: a local primer recruits a larger domain, which recruits a larger domain still, until the body-plan instruction has propagated across the relevant tissue. This is why Levin can speak of bioprompting — a small input that triggers a large cooperative pattern — as a viable engineering strategy. A well-designed morphoceutical exploits recruitment: it delivers a minimal signal and then lets the tissue propagate and complete the instruction through its own cooperative dynamics.`,
    authored_by: 'Sonnet 4.6 + Levin gloss',
    is_new: true,
    source: 'Levin (2022) "Technological Approach to Mind Everywhere," Frontiers in Systems Neuroscience. DOI 10.3389/fnsys.2022.768201. Also Levin (2012) "Morphogenetic fields in embryogenesis, regeneration, and cancer." DOI 10.1016/j.biosystems.2012.04.005.',
    provenance: ['batch-15-corpus'],
    related: ['bioprompting', 'morphogenetic-field', 'developmental-bioelectricity', 'top-down-causation', 'collective-intelligence', 'stress-sharing'],
    tags: ['levin-gloss', 'morphogenesis', 'communication', 'developmental biology'],
  },
  {
    slug: 'endogenous',
    letter: 'E',
    title: 'Endogenous',
    subtitle: 'arising from within the system, not imposed from outside',
    definition: `In standard biology, "endogenous" means produced or originating from within an organism rather than supplied from outside. Levin uses the term with philosophical precision: the bioelectric states, patterning memories, and instructional signals that guide morphogenesis are endogenous — they belong to the system's own physiology and emerge from interactions among its components, not from blueprints continuously injected by the genome or by external engineers.
    <br><br>
    This distinction carries practical weight. When Levin says a tissue's target morphology is endogenously maintained, he means the setpoint is regenerating itself from within: the collective is continuously re-establishing its own control state from internal dynamics. Endogenous control is what makes regeneration possible after injury — the missing parts are reconstructed from information that persisted in the remaining tissue. By contrast, exogenous interventions such as bioelectric stimulation or morphoceuticals must negotiate with an already-active endogenous system rather than writing fresh instructions onto blank matter. Respecting the endogenous control layer is central to bioprompting: a good prompt works with the system's own ongoing agenda rather than overriding it.`,
    authored_by: 'Sonnet 4.6 + Levin gloss',
    is_new: true,
    source: 'Levin (2014) "Endogenous bioelectrical networks store non-genetic patterning information during development and regeneration." Journal of Physiology. DOI 10.1113/jphysiol.2014.271940. Also Levin (2023) "Bioelectric networks: the cognitive glue enabling evolutionary scaling from physiology to mind." DOI 10.1007/s10071-023-01780-3.',
    provenance: ['batch-15-corpus'],
    related: ['bioelectric-pattern-memory', 'morphogenetic-memory', 'bioprompting', 'target-morphology', 'morphoceutical', 'bioelectric-code'],
    tags: ['levin-gloss', 'bioelectricity', 'control', 'regenerative medicine'],
  },
  {
    slug: 'information-substrate',
    letter: 'I',
    title: 'Information Substrate',
    subtitle: 'the informational layer between genes and form',
    definition: `The medium in which biologically relevant patterning information is stored, transmitted, and transformed above the level of gene expression. For Levin, the information substrate is not the genome — DNA defines what molecules the cell can produce, but not the large-scale instructional states that guide morphogenesis. The bioelectric code, gap-junctional connectivity, mechanical force distributions, and ion-gradient patterns collectively constitute an information substrate that is physiological, dynamic, and editable without genomic change.
    <br><br>
    The concept is necessary because without a named substrate at this level, "biological instruction" collapses back to gene expression — and gene expression alone cannot explain why transient bioelectric perturbations leave permanent anatomical memories. An information substrate can store such memories: stable physiological states that persist through cell turnover, transmit to daughter cells, and bias downstream molecular events without being encoded in DNA sequence. Morphoceuticals and the anatomical compiler vision are both interventions at the information substrate level: they aim to rewrite physiological patterning states directly rather than editing the genome or micromanaging every molecular pathway downstream.`,
    authored_by: 'Sonnet 4.6 + Levin gloss',
    is_new: true,
    source: 'Levin (2022) "Technological Approach to Mind Everywhere," Frontiers in Systems Neuroscience. DOI 10.3389/fnsys.2022.768201. Also Levin & Martyniuk (2018) "The bioelectric code: An ancient computational medium for dynamic control of growth and form." DOI 10.1016/j.biosystems.2017.08.009.',
    provenance: ['batch-15-corpus'],
    related: ['bioelectric-code', 'bioelectric-pattern-memory', 'morphogenetic-memory', 'endogenous', 'morphoceutical', 'cytoelectric-coupling', 'gene-regulatory-network'],
    tags: ['levin-gloss', 'bioelectricity', 'information', 'morphogenesis'],
  },
  {
    slug: 'robustness',
    letter: 'R',
    title: 'Robustness',
    subtitle: 'completing the target pattern despite perturbation',
    definition: `The ability of a biological system to reach its target morphology or functional state despite disturbances to its components, environment, or developmental pathway. Robustness in this sense is not mere resilience or structural stiffness; it is a positive, goal-directed competency. A robust system can navigate toward its outcome from varied and disrupted starting conditions because it is organized around a target state rather than a rigid script.
    <br><br>
    Levin frequently cites the Picasso tadpole experiments as canonical evidence: scramble a tadpole's facial organs so that eyes, nose, and mouth begin in wrong positions, and the tadpole still develops into a viable frog with a correctly functioning face. The cells did not follow a position-by-position instruction; they navigated through morphospace toward the target, correcting for their abnormal starting configuration. Robustness of this kind is evidence that goal-directed agency is present at the tissue scale. It is also an engineering aspiration: a sufficiently robust tissue-control interface would let a body complete a desired anatomy even when the intervention that initiated it is partial or imprecise. In this framing, robustness is closely related to regulative plasticity but distinct: plasticity is the breadth of available paths; robustness is the system's demonstrated ability to take one of them to completion.`,
    authored_by: 'Sonnet 4.6 + Levin gloss',
    is_new: true,
    source: 'Levin (2023) "Darwin\'s agential materials: evolutionary implications of multiscale competency in developmental biology." DOI 10.1007/s00018-023-04790-z. Also Levin (2022) TAME paper, DOI 10.3389/fnsys.2022.768201.',
    provenance: ['batch-15-corpus'],
    related: ['regulative-plasticity', 'plasticity', 'target-morphology', 'problem-space-navigation', 'ectopic-eyes-picasso-tadpoles', 'pattern-completion'],
    tags: ['levin-gloss', 'morphogenesis', 'agency', 'developmental biology'],
  },
  {
    slug: 'plasticity',
    letter: 'P',
    title: 'Plasticity',
    subtitle: 'finding a new path to the same goal',
    definition: `In biology, plasticity broadly refers to the ability of a system to change in response to conditions — phenotypic plasticity, synaptic plasticity, developmental plasticity. Levin sharpens this with a goal-directedness criterion: plasticity for him is the competency to find a new route to the same target state when the normal route is blocked, disrupted, or unavailable. A plastic system does not merely react to perturbation; it reorganizes around its goal.
    <br><br>
    This makes plasticity a cognitive property rather than merely a physical one. An organism that switches developmental pathways to achieve the same anatomy despite a genetic lesion, a xenobot that discovers a novel locomotion strategy in an unfamiliar environment, or a tissue that reroutes a signaling cascade after a component is silenced — each is exhibiting plasticity in Levin's sense. The concept is closely related to regulative plasticity (the specific developmental-biology application) but extends across all problem spaces an agent can navigate. Plasticity is the measure of how many paths through problem space remain available to a system; robustness is the related but distinct measure of whether the system actually follows one of them to the target. Both properties together define what Levin calls functional competency: the ability to solve the same problem across a range of conditions.`,
    authored_by: 'Sonnet 4.6 + Levin gloss',
    is_new: true,
    source: 'Levin (2023) "Darwin\'s agential materials: evolutionary implications of multiscale competency in developmental biology." DOI 10.1007/s00018-023-04790-z. Also McMillen & Levin (2024) "Collective intelligence: a unifying concept for integrating biology across scales and substrates." DOI 10.1038/s42003-024-06037-4.',
    provenance: ['batch-15-corpus'],
    related: ['regulative-plasticity', 'robustness', 'problem-space-navigation', 'competency-functional-competency', 'xenobot', 'morphospace'],
    tags: ['levin-gloss', 'agency', 'developmental biology', 'cognition'],
  },
  {
    slug: 'cytoskeleton',
    letter: 'C',
    title: 'Cytoskeleton',
    subtitle: 'structural scaffold as sub-cellular information processor',
    definition: `The cytoskeleton is the internal scaffold of eukaryotic cells, comprising three polymer systems: actin filaments, microtubules, and intermediate filaments. It determines cell shape, enables directed motility, anchors membrane proteins including ion channels and gap junctions, and drives cell division. Microtubules, built from tubulin dimers, guide directed vesicle transport and form the mitotic spindle. Actin networks power membrane protrusions and force generation at the cortex.
    <br><br>
    <strong>Levin's lens:</strong> Levin treats the cytoskeleton as a substrate for information processing within cells rather than mere structural scaffolding — Hameroff-adjacent but more conservative, making no commitment to quantum coherence in tubulin. Because ion channels and gap junctions are anchored in cytoskeletal networks, cytoskeletal reorganization can alter a cell's bioelectric connectivity and thus change what it says to its neighbors. The cytoskeletal-membrane complex is part of Levin's multi-scale competency architecture at the sub-cellular level: a layer where mechanical, electrical, and chemical information is transduced and integrated before being exported through the bioelectric code into tissue-scale patterning decisions.`,
    authored_by: 'Sonnet 4.6 + Levin gloss',
    is_new: true,
    source: 'Levin (2023) "Bioelectric networks: the cognitive glue enabling evolutionary scaling from physiology to mind." DOI 10.1007/s10071-023-01780-3. Also Levin & Martyniuk (2018) "The bioelectric code." DOI 10.1016/j.biosystems.2017.08.009.',
    provenance: ['batch-14-corpus'],
    related: ['ion-channel', 'gap-junctions-connexins', 'bioelectric-code', 'multi-scale-competency-architecture', 'vmem-membrane-potential', 'polycomputing'],
    tags: ['cells', 'borrowed-framework', 'levin-gloss', 'information processing'],
  },
  {
    slug: 'mnemonic-improvisation',
    letter: 'M',
    title: 'Mnemonic Improvisation',
    subtitle: 'memory as remapping, not preservation',
    definition: `The dynamic capacity of a biological or cognitive system to rewrite, remap, and reinterpret memory across changing substrates, bodies, and contexts. Levin explicitly introduces this as a provisional term for how memories persist through transformation rather than by preserving fixed detail.`,
    authored_by: 'Mike (close reading of Levin\'s Self-Improvising Memories)',
    source: 'Levin, "Self-Improvising Memories" (mlevin77 Substack / thoughtforms.life). Definitions curated by Mike Wolf from the article text.',
    provenance: ['Mike-curation-2026'],
    related: ['non-local-memories', 'engram-as-stigmergic-note', 'self-improvising-memories'],
    tags: ['memory', 'cognition', 'levin-coinage'],
    is_new: true,
  },
  {
    slug: 'non-local-memories',
    letter: 'N',
    title: 'Non-Local Memories',
    subtitle: 'memory unconstrained by storage site',
    definition: `Memories whose functional relevance is not confined to a single local storage site, but can be modified, interpreted, or redeployed across scales, media, or future embodiments. Part of Levin's account of memory as "cognitive glue" across Selves.`,
    authored_by: 'Mike (close reading of Levin\'s Self-Improvising Memories)',
    source: 'Levin, "Self-Improvising Memories" (mlevin77 Substack / thoughtforms.life). Definitions curated by Mike Wolf from the article text.',
    provenance: ['Mike-curation-2026'],
    related: ['cognitive-glue', 'mnemonic-improvisation', 'self', 'nested-selves-overlapping-selves'],
    tags: ['memory', 'cognition', 'levin-coinage'],
    is_new: true,
  },
  {
    slug: 'thought-forms',
    letter: 'T',
    title: 'Thought Forms',
    subtitle: 'information structures with minimal agency',
    definition: `Information structures that may possess minimal agency by actively facilitating their own transformation, remapping, and use in future cognitive contexts. Levin frames this as a move away from the binary between passive data and computational machinery.`,
    authored_by: 'Mike (close reading of Levin\'s Self-Improvising Memories)',
    source: 'Levin, "Self-Improvising Memories" (mlevin77 Substack / thoughtforms.life). Definitions curated by Mike Wolf from the article text.',
    provenance: ['Mike-curation-2026'],
    related: ['cognitively-excitable-media', 'engram-as-stigmergic-note', 'agential-material'],
    tags: ['cognition', 'philosophy', 'levin-coinage'],
    is_new: true,
  },
  {
    slug: 'cognitively-excitable-media',
    letter: 'C',
    title: 'Cognitively Excitable Media',
    subtitle: 'substrate hosting cognitive patterns',
    definition: `A substrate capable of hosting, transforming, and reinterpreting cognitive or proto-cognitive patterns. The phrase names the medium in which thought forms, memories, and other informational structures can become active participants rather than passive records.`,
    authored_by: 'Mike (close reading of Levin\'s Self-Improvising Memories)',
    source: 'Levin, "Self-Improvising Memories" (mlevin77 Substack / thoughtforms.life). Definitions curated by Mike Wolf from the article text.',
    provenance: ['Mike-curation-2026'],
    related: ['thought-forms', 'information-substrate', 'cognitive-glue'],
    tags: ['cognition', 'substrate', 'levin-coinage'],
    is_new: true,
  },
  {
    slug: 'engram-as-stigmergic-note',
    letter: 'E',
    title: 'Engram as Stigmergic Note',
    subtitle: 'memory as message between temporal selves',
    definition: `A memory trace understood as a message left by a past version of an agent for a future version of that agent. Levin's key move is temporal: memories are communications between agents separated across time, not static files in a cabinet.`,
    authored_by: 'Mike (close reading of Levin\'s Self-Improvising Memories)',
    source: 'Levin, "Self-Improvising Memories" (mlevin77 Substack / thoughtforms.life). Definitions curated by Mike Wolf from the article text.',
    provenance: ['Mike-curation-2026'],
    related: ['mnemonic-improvisation', 'no-outside-text', 'self', 'autocrine-storytelling'],
    tags: ['memory', 'levin-coinage', 'temporal'],
    is_new: true,
  },
  {
    slug: 'no-outside-text',
    letter: 'N',
    title: 'No Outside-Text',
    subtitle: 'no privileged interpreter for compressed traces',
    definition: `The condition that memories and internal states do not arrive with perfect metadata or an external interpreter's key. Future Selves must creatively interpret compressed traces without a privileged "outside" guide to what they originally meant.`,
    authored_by: 'Mike (close reading of Levin\'s Self-Improvising Memories)',
    source: 'Levin, "Self-Improvising Memories" (mlevin77 Substack / thoughtforms.life). Definitions curated by Mike Wolf from the article text.',
    provenance: ['Mike-curation-2026'],
    related: ['engram-as-stigmergic-note', 'mnemonic-improvisation', 'understandant'],
    tags: ['memory', 'epistemology', 'levin-coinage'],
    is_new: true,
  },
  {
    slug: 'confabulation-in-anatomical-space',
    letter: 'C',
    title: 'Confabulation in Anatomical Space',
    subtitle: 'on-the-fly pattern completion',
    definition: `A morphogenetic strategy in which biological systems complete and reinterpret bodily patterns on the fly rather than obeying rigid priors. Levin uses it to explain extreme plasticity, especially in systems like planaria.`,
    authored_by: 'Mike (close reading of Levin\'s Self-Improvising Memories)',
    source: 'Levin, "Self-Improvising Memories" (mlevin77 Substack / thoughtforms.life). Definitions curated by Mike Wolf from the article text.',
    provenance: ['Mike-curation-2026'],
    related: ['planarian', 'pattern-completion', 'regulative-plasticity', 'target-morphology'],
    tags: ['morphogenesis', 'levin-coinage'],
    is_new: true,
  },
  {
    slug: 'understandant',
    letter: 'U',
    title: 'Understandant',
    subtitle: 'the understood, on a continuum with the understander',
    definition: `The thing being understood, placed on a continuum with the understander rather than treated as passive data. Levin uses "understander and understandant" to blur the boundary between memories and minds, data and algorithms.`,
    authored_by: 'Mike (close reading of Levin\'s Self-Improvising Memories)',
    source: 'Levin, "Self-Improvising Memories" (mlevin77 Substack / thoughtforms.life). Definitions curated by Mike Wolf from the article text.',
    provenance: ['Mike-curation-2026'],
    related: ['no-outside-text', 'thought-forms', 'agential-material'],
    tags: ['epistemology', 'philosophy', 'levin-coinage'],
    is_new: true,
  },
  {
    slug: 'federated-inference',
    letter: 'F',
    title: 'Federated Inference',
    subtitle: 'belief-sharing across cognizers',
    definition: `A group-level process in which memories or cognitive patterns resonate across multiple cognizers, shaping shared interpretation through circular causality. Levin's extension of memory agency beyond one mind.`,
    authored_by: 'Mike (close reading of Levin\'s Self-Improvising Memories)',
    source: 'Levin, "Self-Improvising Memories" (mlevin77 Substack / thoughtforms.life). Definitions curated by Mike Wolf from the article text.',
    provenance: ['Mike-curation-2026'],
    related: ['collective-intelligence', 'non-local-memories', 'nested-selves-overlapping-selves'],
    tags: ['cognition', 'collective', 'levin-coinage'],
    is_new: true,
  },
  {
    slug: 'lineage-mind',
    letter: 'L',
    title: 'Lineage Mind',
    subtitle: 'evolution as an agent thinking through organisms',
    definition: `An evolutionary-scale mind in which individual organisms function as hypotheses about the world. Levin uses the phrase to describe lineages as agents whose "thoughts" are the organisms they generate.`,
    authored_by: 'Mike (close reading of Levin\'s Self-Improvising Memories)',
    source: 'Levin, "Self-Improvising Memories" (mlevin77 Substack / thoughtforms.life). Definitions curated by Mike Wolf from the article text.',
    provenance: ['Mike-curation-2026'],
    related: ['diverse-intelligence', 'scale-free-cognition', 'cognitive-light-cone'],
    tags: ['evolution', 'cognition', 'levin-coinage'],
    is_new: true,
  },
  {
    slug: 'autocrine-storytelling',
    letter: 'A',
    title: 'Autocrine Storytelling',
    subtitle: 'self-directed meaning-making',
    definition: `A self-directed meaning-making process by which an observer compresses and interprets experience into a usable story that shapes future behavior. Levin uses it in defining what makes an observer significant.`,
    authored_by: 'Mike (close reading of Levin\'s Self-Improvising Memories)',
    source: 'Levin, "Self-Improvising Memories" (mlevin77 Substack / thoughtforms.life). Definitions curated by Mike Wolf from the article text.',
    provenance: ['Mike-curation-2026'],
    related: ['significant-observer', 'engram-as-stigmergic-note', 'mnemonic-improvisation'],
    tags: ['cognition', 'narrative', 'levin-coinage'],
    is_new: true,
  },
  {
    slug: 'significant-observer',
    letter: 'S',
    title: 'Significant Observer',
    subtitle: 'observers for whom observation matters',
    definition: `An observer for whom what is observed makes a functional difference to future behavior. Levin distinguishes this from mere recording devices such as telescopes or photographic film.`,
    authored_by: 'Mike (close reading of Levin\'s Self-Improvising Memories)',
    source: 'Levin, "Self-Improvising Memories" (mlevin77 Substack / thoughtforms.life). Definitions curated by Mike Wolf from the article text.',
    provenance: ['Mike-curation-2026'],
    related: ['autocrine-storytelling', 'agential-material', 'cognitive-light-cone'],
    tags: ['cognition', 'agency', 'levin-coinage'],
    is_new: true,
  },
  {
    slug: 'perspectival-storytelling',
    letter: 'P',
    title: 'Perspectival Storytelling',
    subtitle: 'agent-relative reality construction',
    definition: `The process by which diverse minds transform and grow by interpreting reality through agent-relative perspectives, rather than through a matter-first object ontology.`,
    authored_by: 'Mike (close reading of Levin\'s Self-Improvising Memories)',
    source: 'Levin, "Self-Improvising Memories" (mlevin77 Substack / thoughtforms.life). Definitions curated by Mike Wolf from the article text.',
    provenance: ['Mike-curation-2026'],
    related: ['diverse-intelligence', 'autocrine-storytelling', 'cognitive-light-cone'],
    tags: ['cognition', 'philosophy', 'levin-coinage'],
    is_new: true,
  },
  {
    slug: 'self-improvising-memories',
    letter: 'S',
    title: 'Self-Improvising Memories',
    subtitle: 'the umbrella concept',
    definition: `The umbrella idea that memories function less as preserved records and more as substrates for creative future reinterpretation. The phrase is the title of Levin's article framing memory across substrates, contexts, and embodiments — the home concept for mnemonic improvisation, non-local memories, and thought forms.`,
    authored_by: 'Mike (close reading of Levin\'s Self-Improvising Memories)',
    source: 'Levin, "Self-Improvising Memories" (mlevin77 Substack / thoughtforms.life). Definitions curated by Mike Wolf from the article text.',
    provenance: ['Mike-curation-2026'],
    related: ['mnemonic-improvisation', 'non-local-memories', 'thought-forms', 'engram-as-stigmergic-note'],
    tags: ['memory', 'levin-coinage', 'umbrella-concept'],
    is_new: true,
  },
  {
    slug: 'agential-sub-components',
    letter: 'A',
    title: 'Agential Sub-Components',
    subtitle: 'constituent agents within larger selves',
    definition: `Component parts of a system that themselves exhibit agency — cells within tissues, tissues within organisms, organisms within lineages. Closely related to nested selves and the multi-scale competency frame; included because Levin explicitly uses the phrasing.`,
    authored_by: 'Mike (close reading of Levin\'s Self-Improvising Memories)',
    source: 'Levin, "Self-Improvising Memories" (mlevin77 Substack / thoughtforms.life). Definitions curated by Mike Wolf from the article text.',
    provenance: ['Mike-curation-2026'],
    related: ['nested-selves-overlapping-selves', 'multi-scale-competency-architecture', 'agential-material'],
    tags: ['agency', 'multi-scale', 'levin-coinage'],
    is_new: true,
  },
  {
    slug: 'active-information',
    letter: 'A',
    title: 'Active Information',
    subtitle: 'information that does work, not just is recorded',
    definition: `Information that participates causally in shaping future states rather than sitting as passive description. In Levin's usage the phrase emphasizes that biological information has effects — it is read, rewritten, and consequential — rather than being a record waiting to be queried.`,
    authored_by: 'Mike (close reading of Levin\'s Self-Improvising Memories)',
    source: 'Levin, "Self-Improvising Memories" (mlevin77 Substack / thoughtforms.life). Definitions curated by Mike Wolf from the article text.',
    provenance: ['Mike-curation-2026'],
    related: ['cognitive-glue', 'thought-forms', 'information-substrate'],
    tags: ['information', 'cognition', 'borrowed-framework'],
    is_new: true,
  },
  {
    slug: 'palpated-uncertainty-about-internal-states',
    letter: 'P',
    title: 'Palpated Uncertainty about Internal States',
    subtitle: 'felt-out uncertainty as cognitive primitive',
    definition: `An extension of Mark Solms's "palpated uncertainty" — the felt, navigation-relevant uncertainty an agent maintains about its own internal states. Levin extends it to non-neural systems: cells and collectives that operate with felt margins of confidence about their own configuration.`,
    authored_by: 'Mike (close reading of Levin\'s Self-Improvising Memories)',
    source: 'Levin, "Self-Improvising Memories" (mlevin77 Substack / thoughtforms.life). Definitions curated by Mike Wolf from the article text.',
    provenance: ['Mike-curation-2026'],
    related: ['active-inference', 'free-energy-principle', 'self'],
    tags: ['cognition', 'borrowed-framework', 'levin-gloss'],
    is_new: true,
  },
  {
    slug: 'benevolent-communication-event',
    letter: 'B',
    title: 'Benevolent Communication Event',
    subtitle: 'the present as message to future beings',
    definition: `Present action understood as a message sent to future beings (cells, selves, lineages). The phrase captures Levin's view that morphogenetic, cognitive, and ethical work is fundamentally addressed to addressees who do not yet exist — a future-directed posture of care across temporal selves.`,
    authored_by: 'Mike (close reading of Levin\'s Self-Improvising Memories)',
    source: 'Levin, "Self-Improvising Memories" (mlevin77 Substack / thoughtforms.life). Definitions curated by Mike Wolf from the article text.',
    provenance: ['Mike-curation-2026'],
    related: ['engram-as-stigmergic-note', 'self', 'nested-selves-overlapping-selves'],
    tags: ['ethics', 'temporal', 'levin-coinage'],
    is_new: true,
  },
];

export function getTermBySlug(slug: string): Term | undefined {
  return terms.find(t => t.slug === slug);
}

export function getRelatedTerms(term: Term): Term[] {
  return term.related
    .map(slug => getTermBySlug(slug))
    .filter((t): t is Term => t !== undefined);
}

export const termsByLetter = terms.reduce((acc, term) => {
  if (!acc[term.letter]) acc[term.letter] = [];
  acc[term.letter].push(term);
  return acc;
}, {} as Record<string, Term[]>);
