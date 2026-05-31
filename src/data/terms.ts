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
}

export const terms: Term[] = [
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
