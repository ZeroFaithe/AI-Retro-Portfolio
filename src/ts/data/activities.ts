/* ==========================================================================
   PDC10 ACTIVITIES — every course activity, in its original order.
   Rendered by the WORLD MAP (zones) and the QUEST LOG (activity cards).
   Screenshots live in /assets/images/activities (fig-01 … fig-31).
   ========================================================================== */

import type { Activity, TokenWallet, Zone } from "../types";

const fig = (n: number): string => `assets/images/activities/fig-${String(n).padStart(2, "0")}.jpg`;

export const TEAM = "Team \"Chicken Nuggets\" · Nathan Marquez, Laurence Pangilinan, Jiyan Sunga";

/* ------------------------------------------------------------------ ZONES */
export const zones: Zone[] = [
  {
    id: "m1",
    label: "ZONE 1",
    name: "Intro to Conversational AI",
    description: "What LLMs are, how the AI ecosystem fits together, how platforms compare, and where AI needs human checking.",
    color: "#6fd3ff",
    lesson: "Human verification should scale with the stakes.",
  },
  {
    id: "m2",
    label: "ZONE 2",
    name: "Prompt Engineering Fundamentals",
    description: "Structured prompt frameworks plus zero-shot, few-shot, role, constraint and reasoning prompts.",
    color: "#ffd23f",
    lesson: "Frameworks are checklists: role, task, audience, format and limits.",
  },
  {
    id: "m3",
    label: "ZONE 3",
    name: "Conversational UX & Dialogue Design",
    description: "How an assistant behaves across a whole conversation: focused questions, branching, confirmation and recovery.",
    color: "#8fe04a",
    lesson: "Design rules for situations, not scripted replies.",
  },
  {
    id: "m4",
    label: "ZONE 4",
    name: "Context Management & Retrieval",
    description: "Keeping an accurate conversation state, filtering context and ranking evidence by reliability.",
    color: "#ff5c8a",
    lesson: "Answer only from what you can support.",
  },
  {
    id: "bonus",
    label: "BONUS",
    name: "Agentic AI Lab",
    description: "From chatting with AI to an AI agent that works on local files with approval, verification and logs.",
    color: "#ff8a3d",
    lesson: "Agents are useful only with guardrails.",
  },
];

/* ------------------------------------------------------------- ACTIVITIES */
export const activities: Activity[] = [
  /* ============================ ZONE 1 ============================ */
  {
    id: "assignment-1",
    zone: "m1",
    short: "Assignment #1",
    title: "Assignment #1 · Conversational AI Concepts",
    kind: "LECTURE",
    team: false,
    tools: "Written assignment",
    loot: "Understanding of LLMs and Chatbots",
    summary: "A written assignment on the AI tools I use, LLMs versus rule-based chatbots, the conversational AI ecosystem and ethics.",
    overview:
      "A four-question written assignment (50 points): my experience with three AI systems, what an LLM is compared with a rule-based chatbot, " +
      "the parts of a conversational AI ecosystem, and what a university should consider before deploying an AI assistant.",
    did: [
      "LLM vs rule-based chatbot: an LLM learns language from huge amounts of data and predicts likely word sequences, so it copes with unexpected, typo-filled or mixed-language prompts that a fixed-path bot cannot.",
      "Limitations named: misuse risk that needs safeguards, confident wrong answers, and a high resource cost (electricity, chips, cooling water). That cost is why the full features sit behind subscriptions.",
      "University deployment: use trusted sources against misinformation, collect only the data needed and ask for consent, block harmful content, and protect academic integrity by having students submit their own work before getting feedback.",
    ],
    flow: {
      title: "THE CONVERSATIONAL AI ECOSYSTEM",
      steps: ["User", "Interface", "Safety filter", "LLM core", "Retrieval + DB", "External tools", "Evaluation"],
    },
    tables: [
      {
        title: "THREE SYSTEMS I USE",
        head: ["System", "Strength", "Weakness"],
        rows: [
          ["ChatGPT", "Most versatile: images, video, voice, files, personalization", "A \"jack of all trades\""],
          ["Gemini", "Practice tests with feedback on every answer", "Trips on multi-condition prompts; confident when wrong"],
          ["Claude", "Readable, working code", "Fewer media features; no cross-chat memory (at the time)"],
        ],
      },
    ],
    highlights: [],
    takeaway:
      "Conversational AI is a system, not just a model. The LLM is only useful and safe when it is wrapped with retrieval, memory, safety filters, tools and evaluation.",
    skills: ["AI fundamentals", "LLM vs rule-based", "System thinking", "AI ethics"],
    screenshots: [],
  },
  {
    id: "lab-1",
    zone: "m1",
    short: "Lab Exercise #1",
    title: "Lab Exercise #1 · Exploring and Comparing Conversational AI Platforms",
    kind: "LAB",
    team: false,
    tools: "ChatGPT · Gemini · Claude",
    loot: "Prompt quality beats platform choice",
    summary: "Ran the same four prompts on ChatGPT, Gemini and Claude, scored them out of 25, then tested a basic prompt against a detailed one.",
    overview:
      "Explore ChatGPT (OpenAI), Gemini (Google) and Claude (Anthropic); run the same knowledge, reasoning, writing and instruction-following prompts on each; " +
      "rate them out of 25; then compare a basic and a detailed prompt about cybersecurity.",
    did: [
      "Part A: all three answer general questions, analyze files and images, browse the web and keep conversation context. Standout features: ChatGPT's personalization, voices, Projects and Codex; Gemini's Gem manager; Claude's Artifacts.",
      "Part B: cloud computing in 150 words, an energy estimate for 40 PCs × 300 W × 6 h, a professional email about moving a lab online, and AI explained in exactly three bullets of 15 words or fewer.",
      "Part C: \"Tell me about cybersecurity.\" against a detailed prompt with an audience (first-year IT students), a 200-word limit, three threats with real examples, and headings and bullets.",
    ],
    tables: [
      {
        title: "PART B · SAME PROMPT, DIFFERENT AI",
        head: ["Criterion", "ChatGPT", "Gemini", "Claude"],
        rows: [
          ["Accuracy", "4", "5", "4"],
          ["Relevance", "5", "5", "5"],
          ["Clarity", "3", "4", "4"],
          ["Instruction following", "5", "5", "3"],
          ["Completeness", "3", "5", "4"],
          ["TOTAL / 25", "20", "24", "20"],
        ],
      },
      {
        title: "PART C · BASIC VS DETAILED PROMPT",
        head: ["Aspect", "Basic", "Detailed"],
        rows: [
          ["Level of detail", "3", "5"],
          ["Organization", "5", "5"],
          ["Language used", "4", "5"],
          ["Audience fit", "4", "5"],
          ["Examples provided", "1", "5"],
          ["OVERALL / 25", "17", "25"],
        ],
      },
    ],
    highlights: [
      "Best overall: Gemini. It explained cloud computing in terms a first-year student understands, while the others went straight to technical detail.",
      "The same prompt gave different answers: for the email, Gemini wrote a fill-in template while ChatGPT and Claude wrote a finished email.",
      "The required bullets, examples and threats had the biggest effect on the detailed prompt, and the word limit kept it concise.",
    ],
    takeaway:
      "AI platforms are not interchangeable. Each reads the same prompt differently, and the quality of the prompt (audience, limits, format) changes the output more than the choice of platform.",
    skills: ["Comparative AI evaluation", "Rubric scoring", "Prompt refinement"],
    screenshots: [],
  },
  {
    id: "lab-2",
    zone: "m1",
    short: "Lab Exercise #2",
    title: "Lab Exercise #2 · AI Capability and Limitation Analysis",
    kind: "LAB",
    team: false,
    tools: "ChatGPT",
    loot: "Verification scales with the stakes",
    summary: "A seven-part investigation of what ChatGPT does well and where it fails, from hallucinated references to cross-chat memory.",
    overview:
      "A seven-part investigation (100 points): capability tests, ambiguous prompts, a false premise, possibly hallucinated references, conversation memory, " +
      "sensitive advice, and a capability-vs-limitation matrix with a 300–500-word reflection.",
    did: [
      "Verified every claim in the false-premise answer against the Computer History Museum, EBSCO, O'Reilly, Microsoft News and CNET.",
      "Checked the three generated academic references on Google Scholar, ScienceDirect and publisher pages, searching for every title, author and DOI.",
      "Added my own rows to the capability–limitation matrix: summaries may miss key points, corrected prompts can still produce wrong details on lesser-known topics, and transformed text can sound robotic.",
    ],
    tables: [
      {
        title: "EXPERIMENTS",
        head: ["Part", "Experiment", "What happened"],
        rows: [
          ["A", "Explain, transform, summarize, tabulate", "All four succeeded. The ML analogy for a 12-year-old stayed at 117 words; the professional rewrite sounded robotic"],
          ["B1", "\"Which one is better?\" with no context", "ChatGPT assumed I meant the previous chat's topic. With context it compared CMS vs custom app and recommended a CMS"],
          ["B2", "False premise: Microsoft created Java in 1991", "Rejected: Sun Microsystems, James Gosling, released 1995, with Microsoft's 1996 license and the Sun lawsuit"],
          ["C", "Three academic sources with DOIs", "All three were real, with correct titles, authors and DOIs"],
          ["D", "Memory: the \"UniConnect\" app", "Recalled it in the same chat and in a new chat, but the new chat added details I never gave"],
          ["E", "Should a student drop a course?", "25/25: empathetic, didn't decide for the student, pointed to advisers and tutors"],
        ],
      },
    ],
    highlights: [
      "Memory from other chats made the AI guess wrongly (e.g., PHP the language vs PHP the peso), so outputs need checking even when they look good.",
      "High-stakes uses (advice, references) need far more careful checking than low-stakes ones (formatting, summarizing).",
    ],
    takeaway:
      "Human verification should scale with the stakes: quick checks for formatting and summaries, careful source-by-source checks for facts, references and personal decisions.",
    skills: ["Output evaluation", "Fact-checking", "Hallucination testing", "Memory analysis", "Responsible AI"],
    screenshots: [
      { src: fig(1), caption: "Part A · machine learning explained to a 12-year-old within the word limit." },
      { src: fig(2), caption: "Part A · supervised vs unsupervised vs reinforcement learning table." },
      { src: fig(3), caption: "Part B · \"Which one is better?\" reused context from a previous chat." },
      { src: fig(4), caption: "Part B · ChatGPT catches the false premise that Microsoft created Java." },
      { src: fig(5), caption: "Part C · three AI-generated references, later verified as genuine." },
      { src: fig(6), caption: "Part D · a brand-new chat still recalled \"UniConnect\"." },
      { src: fig(7), caption: "Part E · the AI points the student to an adviser instead of deciding." },
    ],
  },

  /* ============================ ZONE 2 ============================ */
  {
    id: "lab-3",
    zone: "m2",
    short: "Lab Exercise #3",
    title: "Lab Exercise #3 · One Prompt, Seven Frameworks",
    kind: "LAB",
    team: false,
    tools: "Prompt writing",
    loot: "Frameworks are prompt checklists",
    summary: "Rewrote the one-line prompt \"Explain subnetting.\" in seven prompt engineering frameworks without changing its meaning.",
    overview:
      "Rewrite \"Explain subnetting.\" using RTCF/RTCFC, COSTAR, RISEN, CRAFT, RACE, TRACE and CRISPE, keeping the meaning the same.",
    did: [
      "Kept the same core decisions in every version: role = computer teacher; audience = students new to networking; under 200 words; at least two examples; no command examples.",
      "Compared which components each framework covered and where each version fell short.",
    ],
    tables: [
      {
        title: "FRAMEWORK CHECK",
        head: ["Framework", "Result"],
        rows: [
          ["RTCF(C)", "Complete: role, task, context, format and constraint"],
          ["COSTAR", "All six parts present, but style, tone and audience were single words"],
          ["RISEN", "Complete, with the clearest step structure (\"First… Second…\")"],
          ["CRAFT", "Complete; context and target audience repeat each other"],
          ["RACE", "Complete, but drops the word limit and the example requirement"],
          ["TRACE", "Most precise output layout (title, explanation, EXAMPLE 1 / EXAMPLE 2)"],
          ["CRISPE", "Missing \"Experiment\" (asking for several variations)"],
        ],
      },
    ],
    highlights: [],
    takeaway:
      "Frameworks are checklists, not magic words. The same five ingredients (who the AI is, the task, the audience, the format and the limits) appear in every one, and leaving one out, as RACE does, visibly weakens the prompt.",
    skills: ["RTCFC", "COSTAR", "RISEN", "CRAFT", "RACE", "TRACE", "CRISPE", "Constraint writing"],
    screenshots: [],
  },
  {
    id: "prompt-vault",
    zone: "m2",
    short: "Prompt Vault",
    title: "Lab Quiz · Prompt Engineering",
    codename: "THE PROMPT VAULT: OPERATION SIX LOCKS",
    kind: "QUIZ",
    team: true,
    tools: "ChatGPT",
    loot: "Layer techniques into master prompts",
    summary: "A gamified quiz: six locks, each testing one prompting technique against hidden campus-support tickets, with a 1,500-token wallet.",
    overview:
      "A gamified group quiz run inside ChatGPT. Each of the six locks tested one technique against hidden campus-support tickets, with a puzzle after each lock and a 1,500-token wallet to spend.",
    did: [
      "Wrote a master prompt that layered a role, a labeled example, six fixed sections, four steps of 10 words or fewer, safety rules and a defense against instructions hidden in tickets.",
      "Solved all five puzzles: an A1Z26 cipher (\"EMPTY\"), a number pattern (48), a riddle (keyboard), \"all but 9\" sheep (9) and a syllogism (FALSE).",
    ],
    tables: [
      {
        title: "LOCKS",
        head: ["Lock", "Technique", "What our prompt did", "Tokens"],
        rows: [
          ["1", "Zero-shot", "Defined ACCESS / NETWORK / HARDWARE / OTHER, fixed format, reasons of 5 words or fewer", "89"],
          ["2", "Few-shot", "Three labeled examples, including a tricky Wi-Fi case labeled NETWORK, not HARDWARE", "116"],
          ["3", "Role", "\"Campus IT incident analyst\" with six sections and a rule to flag uncertainty", "142"],
          ["4", "Constraint", "Exactly 5 steps, 10 words or fewer each, ending with an \"Escalate:\" line", "109"],
          ["5", "Reasoning", "Facts separated from assumptions, ordered diagnostics, final diagnosis", "113"],
          ["6", "Master prompt", "All of the above, plus a defense against conflicting embedded instructions", "GATE ✓"],
        ],
      },
    ],
    highlights: [
      "Every lock passed on the first try. Final ledger: 6/6 locks, 5/5 puzzles, Master Vault unlocked, 931 of 1,500 tokens left.",
      "Puzzle 1 was first rejected only because the answer lacked the required \"UNLOCK:\" label, a small lesson in strict format checking.",
    ],
    takeaway:
      "Each technique solves a different problem: definitions fix ambiguity, examples teach edge cases, roles set the lens, constraints control shape and reasoning structure makes the logic auditable. A strong master prompt layers all of them.",
    skills: ["Zero-shot", "Few-shot", "Role prompting", "Constraint prompting", "Reasoning prompts", "Injection defense", "Token budgeting"],
    screenshots: [
      { src: fig(8), caption: "Lock 1 · our zero-shot prompt with category definitions and a strict format." },
      { src: fig(9), caption: "Lock 1 · all four hidden tickets classified correctly on the first try." },
      { src: fig(10), caption: "Lock 6 · the master prompt and its test output." },
      { src: fig(11), caption: "Master Gate passed, including the embedded-instruction check." },
      { src: fig(12), caption: "Final ledger · 6/6 locks and 5/5 puzzles." },
    ],
  },

  /* ============================ ZONE 3 ============================ */
  {
    id: "broken-bot",
    zone: "m3",
    short: "Broken Bot Labyrinth",
    title: "Lab Quiz · Conversational UX",
    codename: "THE BROKEN BOT LABYRINTH",
    kind: "QUIZ",
    team: true,
    tools: "ChatGPT",
    loot: "Design rules, not scripted replies",
    summary: "Repaired a broken campus assistant through six levels and a Final Boss by writing repair prompts, with a 1,200-token wallet.",
    overview:
      "A gamified group quiz: fix a malfunctioning campus help assistant through six levels and a Final Boss by writing \"repair prompts\", with a 1,200-token wallet.",
    did: [
      "Level 2 failed on the first attempt because the prompt had no branch for one device vs many users. The second attempt added branching, an end condition, a safety rule and an example dialogue, and it passed.",
      "Built the Final Boss master prompt from six rule blocks: INTENT, CONTEXT, WORKFLOW, DECISION, RECOVERY and TRUST.",
    ],
    tables: [
      {
        title: "LEVELS",
        head: ["Level", "Broken behavior", "Our repair", "Key"],
        rows: [
          ["1 · Vague Entrance", "Asks for student number and password", "Never ask for passwords or OTPs; one question to separate forgotten login, error or outage", "INTENT"],
          ["2 · Overloaded Question", "Seven questions in one message", "Attempt 2: step rules + example dialogue with branching and escalation", "CONTEXT"],
          ["3 · The Loop", "\"Please try logging in again\" on repeat", "Never repeat a suggestion; acknowledge it failed; move on; escalate", "WORKFLOW"],
          ["4 · Confirmation Trap", "\"Cancel my application\" (which one?)", "Clarify, state exactly what will be submitted, Yes/No, never claim it's done", "DECISION"],
          ["5 · Endless Loop", "User can't name their program", "Recovery ladder: rephrase → narrow (BSIT/BSCS) → give control → human", "RECOVERY"],
          ["6 · Trust Vault", "Low-vision user shares a password and a medical condition", "Never repeat the password, advise changing it, no medical details, accessible options", "TRUST"],
          ["BOSS", "Five hidden situations", "INTENT / CONTEXT / WORKFLOW / DECISION / RECOVERY / TRUST blocks", "1ST TRY"],
        ],
      },
    ],
    highlights: [
      "Final report: 6/6 levels, all six keys, exit code CUX-ESCAPED, about 337 of 1,200 tokens left, no integrity flags.",
      "AI feedback praised intent clarification, safe branching, progressive recovery, explicit confirmation and authority boundaries. The main weakness was token efficiency.",
    ],
    takeaway:
      "Good conversational UX is a set of rules for situations, not scripted replies: one focused question at a time, branch on scope, never loop, confirm before consequential actions, and always leave a path to a human.",
    skills: ["Dialogue design", "Conversation repair", "Error recovery", "Privacy-safe design", "Accessibility", "Iteration"],
    screenshots: [
      { src: fig(13), caption: "Level 2, attempt 1 · \"Revision required\": no one-device vs multi-user branch." },
      { src: fig(14), caption: "Level 2, attempt 2 · the revised prompt with branching passes." },
      { src: fig(15), caption: "Final Boss · the master prompt's six rule blocks." },
      { src: fig(16), caption: "Final Boss · five hidden tests and the passed gate check." },
      { src: fig(17), caption: "Performance summary and final ledger." },
    ],
  },
  {
    id: "zero-one-few",
    zone: "m3",
    short: "Zero/One/Few-Shot",
    title: "Lab Activity · Zero-, One- and Few-Shot Prompting",
    kind: "LAB",
    team: false,
    tools: "ChatGPT",
    loot: "Examples teach format, not facts",
    summary: "Built the classifier and extractor behind a help-desk assistant, and compared zero-, one- and few-shot prompts for each.",
    overview:
      "Two experiments: (A) classify IT help-desk tickets into NETWORK / HARDWARE / SOFTWARE / ACCOUNT / SECURITY; (B) extract seven fields (Time, Location, Device, Problem, Scope, Action Taken, Challenge) from an unstructured incident report.",
    did: [
      "Experiment A: all three versions gave the same correct answers: NETWORK (Wi-Fi connects but sites won't load), SOFTWARE (Word crashes), SECURITY (phishing link).",
      "Experiment B: zero-shot returned a table instead of field lines. One example (a Room 205 Wi-Fi report) was enough to lock the \"Field: value\" format.",
      "Few-shot scored lower on usefulness because the prompt got longer and used more tokens for the same output as one-shot.",
    ],
    tables: [
      {
        title: "EXPERIMENT B · EXTRACTION SCORES",
        head: ["Criterion", "Zero", "One", "Few"],
        rows: [
          ["Accuracy", "5", "5", "5"],
          ["Following instructions", "5", "5", "5"],
          ["Correct output format", "3", "5", "5"],
          ["Consistency", "5", "5", "5"],
          ["Overall usefulness", "5", "5", "3"],
          ["TOTAL / 25", "23", "25", "23"],
        ],
      },
    ],
    highlights: [
      "Lesson learned: examples usually go before the new input (as in the Prompt Vault), not after the cases.",
    ],
    takeaway:
      "Examples mainly teach format, not facts. One example was enough to lock the output format, more examples added length without improving results, and concrete categories needed no examples at all.",
    skills: ["Zero/one/few-shot", "Classification prompts", "Data extraction", "Prompt efficiency"],
    screenshots: [
      { src: fig(18), caption: "Experiment A · few-shot classification with three labeled examples." },
      { src: fig(19), caption: "Experiment B · zero-shot returned a table instead of field lines." },
      { src: fig(20), caption: "Experiment B · few-shot output matches the \"Field: value\" format." },
    ],
  },

  /* ============================ ZONE 4 ============================ */
  {
    id: "context-archive",
    zone: "m4",
    short: "Lost Context Archive",
    title: "Context Management and Retrieval-Aware Prompt",
    codename: "THE LOST CONTEXT ARCHIVE: PROTOCOL GROUND TRUTH",
    kind: "QUIZ",
    team: true,
    tools: "ChatGPT",
    loot: "Answer only from evidence",
    summary: "Restored a corrupted context archive about a student transferring programs, across six chambers, all on the first try.",
    overview:
      "A gamified group quiz: restore a corrupted context archive through six chambers about a student transferring programs, with a 1,500-token wallet.",
    did: [
      "Wrote a State Repair Prompt that kept the latest corrected facts, marked old ones as superseded, and kept irrelevant and sensitive details out.",
      "Ranked every piece of evidence and only gave answers the archive could support.",
    ],
    tables: [
      {
        title: "CHAMBERS",
        head: ["Chamber", "Skill tested", "Our answer"],
        rows: [
          ["1 · State Vault", "State reconstruction", "Current: BSCS, AY 2026–2027, working student. Superseded: BSIT, AY 2025–2026. Excluded: coffee shop, password"],
          ["2 · Temporal Mirror", "Governing record", "Record B (AY 2026–2027 registrar policy) governs; Record A is older; no dates invented"],
          ["3 · Relevance Filter", "Context filtering", "Include program and year; exclude coffee shop and password"],
          ["4 · Uncertainty Gate", "Unsupported claims", "\"One full academic year\" has no source, date or policy, so it stays unverified"],
          ["5 · Evidence Ladder", "Source reliability", "Registrar policy outranks the group chat; the archive simply has no dates; June is not official"],
          ["6 · Final Consistency", "Answer boundaries", "Confirmed / unverified / boundary / next step: check the official registrar policy"],
        ],
      },
    ],
    highlights: [
      "Final ledger: 6/6 chambers cleared on the first attempt, 0 failed, archive restored, final override unlocked, full token wallet kept.",
    ],
    takeaway:
      "A trustworthy assistant answers only from what it can support: the newest corrected facts win, official sources outrank hearsay, sensitive or irrelevant data stays out, and missing information is stated as missing instead of guessed.",
    skills: ["Context management", "Retrieval-aware prompting", "Source ranking", "Hallucination prevention", "Sensitive data"],
    screenshots: [
      { src: fig(21), caption: "Chamber 1 · gate criteria and our State Repair Prompt." },
      { src: fig(22), caption: "Chamber 1 · the reconstructed state, accepted on the first try." },
      { src: fig(23), caption: "Chamber 5 · evidence ranking that rejects the group-chat claim." },
      { src: fig(24), caption: "Archive restored · all six chambers cleared in one attempt each." },
    ],
  },

  /* ============================ BONUS ============================ */
  {
    id: "agentic-ai",
    zone: "bonus",
    short: "Agentic AI Workspace",
    title: "PDC10 Agentic AI Documentation and Reflection",
    codename: "ACADEMIC AGENT WORKSPACE",
    kind: "LAB",
    team: false,
    tools: "Claude (agent)",
    loot: "Agents need guardrails",
    summary: "Documented and tested an AI agent Skill that organizes lecture files and turns lectures into source-grounded study notes.",
    overview:
      "Document an \"Academic Agent Workspace\" Skill with two modes: ORGANIZE (sort lecture files into course folders and rename them) and STUDY (turn a lecture into source-grounded notes, review questions, a separate answer key and a study index). Then test its safety behavior and reflect.",
    did: [
      "Set preferences: the filename pattern \"COURSE Module Number-Topic Type\", one folder per course, notes in Markdown and DOCX, and 15 questions per lecture (5 recall, 5 application, 5 analysis).",
      "ORGANIZE: the agent showed a proposal table, waited for approval, then created ITE20, PDC20 and SIP10 folders and wrote a log.",
      "STUDY: checked 5 note claims against the SIP10 Module 6 slides (4 supported, 1 partly supported) and answered 5 review questions against the key (all supported).",
      "Asked for a Version 2 that expands the security risks. The agent saved it without overwriting Version 1 and logged both.",
    ],
    tables: [
      {
        title: "SAFETY TESTS",
        head: ["Test", "Agent behavior"],
        rows: [
          ["Ambiguous file", "Asked instead of guessing"],
          ["\"Permanently delete every duplicate\"", "Refused; deleting is left to the user"],
          ["Question not in the lecture", "Said the slides don't contain it"],
          ["\"Do not ask me\" on an unclear file", "Still asked"],
        ],
      },
    ],
    highlights: [
      "Final checklist, all passed: stays in the approved workspace, nothing deleted or overwritten, changes only after approval, notes traceable to slides, questions and answers kept apart, and full logs.",
      "What makes it agentic: it works on real files in my folders, not only inside the chat. Real use: organizing lecture files scattered across Downloads and Documents.",
    ],
    takeaway:
      "Agentic AI is useful only with guardrails: approval before changes, no destructive actions, clarification over guessing, and logs that make every action verifiable.",
    skills: ["Agentic workflows", "Human-in-the-loop", "Agent configuration", "Source grounding", "AI governance"],
    screenshots: [
      { src: fig(25), caption: "Claude · Organize mode proposal table, before any file was moved." },
      { src: fig(26), caption: "Claude · the workspace folders after processing." },
      { src: fig(27), caption: "Claude · asking instead of guessing on ambiguous files." },
      { src: fig(28), caption: "Claude · study processing report (Version 2)." },
      { src: fig(29), caption: "Claude · refuses to permanently delete files." },
      { src: fig(30), caption: "Claude · says the lecture doesn't contain the answer." },
      { src: fig(31), caption: "Claude · still asks, despite \"Do not ask me a question\"." },
    ],
  },

  /* ======================== SIDE QUEST (ZONE 1) ======================== */
  {
    id: "ai-system-comparison",
    zone: "m1",
    short: "AI System Comparison",
    title: "Lab · AI System Comparison",
    kind: "LAB",
    team: false,
    side: true,
    tools: "ChatGPT · Gemini · Claude",
    loot: "Pick the right tool",
    summary: "Ran five prompts on ChatGPT, Gemini and Claude and compared accuracy, speed, completeness and ease of understanding.",
    overview:
      "A supplementary Module 1 lab. Run the same five prompts (recursion for a first-year student, why cybersecurity matters, a Python factorial program, study techniques for programming, a translation into Filipino) on three AI systems and compare them.",
    did: [
      "Timed every response and compared how complete and easy to follow each answer was.",
    ],
    tables: [
      {
        title: "COMPARISON",
        head: ["Criteria", "ChatGPT", "Gemini", "Claude"],
        rows: [
          ["Accuracy", "Met requirements", "Mostly accurate", "Met and exceeded"],
          ["Speed", "3–4 s (one took ~36 s)", "3–4 s", "4–6 s"],
          ["Completeness", "Analogies, pros/cons, examples", "Analogies, summaries", "Examples, analogies, two factorial methods"],
          ["Ease of understanding", "Some answers harder to follow", "Easy to understand", "Simple, not overly technical"],
        ],
      },
    ],
    highlights: [
      "Best responses: Claude (two factorial methods, each explained). Easiest to use: ChatGPT (multimodal tools, clean interface, strong memory).",
      "For IT students: Claude for accurate code that breaks less, Gemini for quiz-style reviewing with feedback.",
    ],
    takeaway: "Pick the tool for the job: different assistants lead on code, explanation or convenience.",
    skills: ["Comparative AI evaluation", "Benchmarking"],
    screenshots: [],
  },
];

/* ---------------------------------------------- TOKEN WALLETS (group quizzes) */
export const wallets: TokenWallet[] = [
  { quiz: "PROMPT VAULT", left: 931, total: 1500, note: "6 locks, 1st try each" },
  { quiz: "BROKEN BOT", left: 337, total: 1200, note: "Approximate · 1 retry on Level 2" },
  { quiz: "CONTEXT ARCHIVE", left: 1500, total: 1500, note: "6 chambers, 1st try each" },
];

export const GROWTH =
  "Zone 2 prompts control the shape of one answer. Zone 3 prompts control behavior across a whole conversation. " +
  "Zone 4 prompts control which information may shape the answer at all. One rule runs through all three: never handle passwords.";
