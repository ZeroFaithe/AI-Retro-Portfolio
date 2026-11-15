/* ==========================================================================
   PROMPT POWER-UPS — before/after prompts from the PDC10 Prompt Comparison.
   Stat-check scores follow each comparison's checklist:
   10 = present, 5 = partial, 0 = missing.
   A prompt version without `image` hides the screenshot-compare panel.
   ========================================================================== */

import type { MasterPrompts, PromptEntry } from "../types";

const fig = (n: number): string => `assets/images/activities/fig-${String(n).padStart(2, "0")}.jpg`;

export const prompts: PromptEntry[] = [
  {
    id: "prompt-01",
    title: "PROMPT 01 · CODE HELP",
    tool: "AI coding assistant",
    context: "Asking an AI to separate the Admin, Staff and User logic in a web app, so the admin can manage accounts.",
    before: {
      prompt:
        "Separate the logic of admin from the staffs and users. " +
        "Make it so that the admin can manage the accounts of staffs and users",
      note: "One vague request: no role, no context about the codebase, no security rules and no way to check the result.",
    },
    after: {
      prompt:
        "ROLE: Senior full-stack developer specializing in secure RBAC and account management.\n\n" +
        "TASK: Refactor to separate Admin, Staff and User logic; add Admin account management " +
        "(create, view, update, deactivate).\n\n" +
        "CONTEXT: Work within the existing structure, schema and conventions; preserve features.\n\n" +
        "FORMAT: Changes across frontend, backend, database and auth logic, consistent with the existing architecture.\n\n" +
        "CONSTRAINTS: Admin-only access; enforce permissions on the backend, not just the UI; " +
        "prevent role escalation; preserve existing accounts and data; secure coding; " +
        "no unrelated changes; verify and test access for all three roles.",
      note: "Rewritten with RTCFC (condensed). It adds backend permission checks and blocks role escalation, which the first prompt never mentioned.",
    },
    scores: [
      { label: "ROLE", before: 0, after: 10 },
      { label: "CONTEXT", before: 0, after: 10 },
      { label: "TASK", before: 5, after: 10 },
      { label: "CONSTRAINTS", before: 0, after: 10 },
      { label: "VERIFY", before: 0, after: 10 },
    ],
  },
  {
    id: "prompt-02",
    title: "PROMPT 02 · STUDY",
    tool: "ChatGPT",
    context: "Understanding how malloc() works in C.",
    before: {
      prompt: "Explain malloc",
      image: "assets/images/prompts/before-02.svg",
      note: "Too broad: no level, no structure and no way to check that I understood. The answer was long and generic.",
    },
    after: {
      prompt:
        "Explain how malloc() works in C using the Feynman Technique. " +
        "Teach me as if I were a 6th grader, using simple language and relatable analogies. " +
        "Identify the prerequisite concepts I need to understand before tackling the topic. " +
        "Simplify complex mechanisms into digestible explanations with practical code examples. " +
        "Finally, test my understanding with questions without immediately revealing their answers.",
      image: "assets/images/prompts/after-02.svg",
      note: "Sets a teaching method and level, asks for prerequisites and code examples, and ends with questions that check my understanding.",
    },
    scores: [
      { label: "ROLE", before: 0, after: 5 },
      { label: "AUDIENCE", before: 0, after: 10 },
      { label: "TASK", before: 0, after: 10 },
      { label: "CONSTRAINTS", before: 0, after: 10 },
      { label: "VERIFY", before: 0, after: 10 },
    ],
  },
  {
    id: "prompt-03",
    title: "PROMPT 03 · ZERO-SHOT",
    tool: "ChatGPT",
    context: "Two zero-shot ticket classifiers: the Zero/One/Few-Shot lab (Test 1) versus the Prompt Vault (Lock 1).",
    before: {
      prompt:
        "Classify each case into exactly one of these categories:\n" +
        "NETWORK, HARDWARE, SOFTWARE, ACCOUNT, SECURITY\n\n" +
        "Cases:\n" +
        "1. My laptop connects to Wi-Fi, but websites will not load.\n" +
        "2. ...",
      note: "Correct, but only because the cases were easy. No definitions, no fallback category and no fixed output format.",
    },
    after: {
      prompt:
        "Classify each campus support message as ACCESS, NETWORK, HARDWARE, or OTHER.\n" +
        "ACCESS: Account login or permission problems.\n" +
        "NETWORK: Internet or network connection problems.\n" +
        "HARDWARE: Physical device or equipment problems.\n" +
        "OTHER: Any issue outside these categories.\n" +
        "Output ... using exactly this format: 1.CATEGORY — reason ...\n" +
        "Use exactly one category per message. Each reason must be five words or fewer.",
      image: fig(8),
      note: "One-line definitions, an OTHER fallback, an exact template and a length limit. It classified every hidden ticket correctly using 89 tokens.",
    },
    scores: [
      { label: "DEFINITIONS", before: 0, after: 10 },
      { label: "FALLBACK", before: 0, after: 10 },
      { label: "FORMAT", before: 0, after: 10 },
      { label: "LENGTH", before: 0, after: 10 },
    ],
  },
  {
    id: "prompt-04",
    title: "PROMPT 04 · FEW-SHOT",
    tool: "ChatGPT",
    context:
      "Prompt layouts (not exact wording): the Zero/One/Few-Shot lab (Test 3) versus the Prompt Vault (Lock 2). What did the examples actually teach?",
    before: {
      prompt:
        "[Task + category list]\n\n" +
        "[Cases 1–3]\n\n" +
        "[Examples, placed AFTER the cases]\n" +
        "• one ACCOUNT example\n" +
        "• one SECURITY example\n" +
        "• one HARDWARE example",
      image: fig(18),
      note: "One example per category taught the output format, and nothing a definition couldn't. One-shot scored just as well (25/25).",
    },
    after: {
      prompt:
        "[Same category definitions + fixed format as Lock 1]\n\n" +
        "[3 labeled examples, placed BEFORE the new input]\n" +
        "• including the edge case:\n" +
        "  \"laptop cannot connect to Wi-Fi\" → NETWORK (not hardware)\n\n" +
        "[New ticket to classify]",
      note: "The examples come first, and one teaches the confusing boundary between NETWORK and HARDWARE. The hidden ticket passed on the first try.",
    },
    scores: [
      { label: "PLACEMENT", before: 0, after: 10 },
      { label: "EDGE CASE", before: 0, after: 10 },
      { label: "DEFINITIONS", before: 0, after: 10 },
      { label: "FORMAT", before: 10, after: 10 },
    ],
  },
];

export const masterPrompts: MasterPrompts = {
  title: "MASTER PROMPTS COMPARED",
  lead:
    "Each zone's master prompt adds a new layer of control: answer shape, then conversation behavior, then which information may be used at all.",
  table: {
    title: "MASTER PROMPTS · ZONE 2 → 3 → 4",
    head: ["Technique", "Prompt Vault Lock 6", "CUX Final Boss", "Context State Repair"],
    rows: [
      ["Role / persona", "Campus IT incident analyst", "Friendly, direct CCS Help Assistant", "None (task-focused)"],
      ["Demonstration", "Yes, one labeled incident", "No (rules only)", "No"],
      ["Fixed structure", "6 sections, 4 steps ≤10 words", "Behavior rules by situation", "4 required headings"],
      ["Facts vs assumptions", "Yes", "Admits uncertainty", "Current vs superseded facts"],
      ["Secrets / sensitive data", "Never request or expose", "Never request; if exposed, don't repeat, advise change", "Exclude credentials"],
      ["Prompt-injection defense", "Ignore conflicting embedded instructions", "Authority boundaries", "Exclude irrelevant data"],
      ["Confirmation / escalation", "Escalate line", "Yes/No confirmation + human escalation", "Flag unresolved question"],
      ["Size", "~150+ words", "~310 tokens", "~60 words"],
    ],
  },
};
