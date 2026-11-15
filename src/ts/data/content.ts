/* ==========================================================================
   CONTENT FILE — edit this file to make the portfolio yours.

   Everything marked [PLACEHOLDER] is meant to be replaced.
   Images live in /assets/images — swap a file at the same path, or point
   the path below to a new file. Run `npm run build` after editing.
   ========================================================================== */

import type { PortfolioContent } from "../types";
import { activities, GROWTH, TEAM, wallets, zones } from "./activities";
import { masterPrompts, prompts } from "./prompts";

export const content: PortfolioContent = {
  /* ---------------------------------------------------------------- PLAYER */
  player: {
    name: "NATHANIEL RAE Y. MARQUEZ", // [PLACEHOLDER]
    handle: "ZEROFAITHE", // [PLACEHOLDER] nickname shown on the title screen
    title: "IT Student · Aspiring Developer", // [PLACEHOLDER]
    school: "ANGELES UNIVERSITY FOUNDATION", // [PLACEHOLDER]
    program: "BS Information Technology", // [PLACEHOLDER]
    yearLevel: "3 · A", // [PLACEHOLDER]
    location: "ANGELES CITY, PAMPANGA", // [PLACEHOLDER]
    avatar: "assets/images/profile/avatar-placeholder.svg", // [PLACEHOLDER]
    bio:
      "Hello, traveler! I'm a BSIT student studying programming, networks, cloud, and AI, with a creative streak that comes from music and design. " +
      "I keep learning the fundamentals even when AI can automate them. " +
      "My goal is to be a full stack developer who builds with AI, not one who just relies on it.",
    level: 3, // year level works nicely here
    stats: [
      { label: "HP", name: "Motivation", value: 92, color: "#22b455" },
      { label: "MP", name: "Caffeine", value: 64, color: "#3d8bff" },
      { label: "XP", name: "Next level", value: 72, color: "#ffd23f" },
    ],
  },

  /* ------------------------------------------------------------- AI TOOLS */
  /* To use an official logo, drop the image at the same path (or change `icon`). */
  aiTools: [
    {
      id: "antigravity",
      name: "Antigravity",
      maker: "Google",
      role: "ENGINEER",
      color: "#22b455",
      icon: "assets/images/tools/antigravity.svg",
      description: "Agent-first coding IDE where AI agents plan, write and test code alongside me.",
      usedFor: ["Scaffolding projects", "Refactoring code", "Debugging with agents"],
      url: "https://antigravity.google",
    },
    {
      id: "claude",
      name: "Claude",
      maker: "Anthropic",
      role: "SAGE",
      color: "#ff8a3d",
      icon: "assets/images/tools/claude.svg",
      description: "AI assistant I use for reasoning through problems, writing and coding help.",
      usedFor: ["Explaining concepts", "Code review", "Drafting documentation"],
      url: "https://claude.ai",
    },
    {
      id: "chatgpt",
      name: "ChatGPT",
      maker: "OpenAI",
      role: "BARD",
      color: "#18c3a6",
      icon: "assets/images/tools/chatgpt.svg",
      description: "AI assistant I use for brainstorming and quick question-and-answer sessions.",
      usedFor: ["Brainstorming ideas", "Quick Q&A", "Study reviewers"],
      url: "https://chatgpt.com",
    },
  ],

  /* ------------------------------------------------- PDC10 ACTIVITIES */
  /* Zones (modules), activities and token wallets live in ./activities.ts */
  zones,
  activities,
  wallets,

  /* ------------------------------------------------------ PROMPT POWER-UPS */
  course: {
    name: "PDC10: Conversational AI and Prompt Engineering", // [PLACEHOLDER]
    description:
      "How my prompts levelled up after the course — same goal, better instructions.",
    team: TEAM,
    growth: GROWTH,
  },

  /* Before/after prompts and the master-prompt table live in ./prompts.ts */
  prompts,
  masterPrompts,

  /* -------------------------------------------------------------- CONTACT */
  contact: [
    { slot: "SLOT 1", label: "EMAIL", value: "nathanielraemarquez@gmail.com", href: "mailto:nathanielraemarquez@gmail.com" }, // [PLACEHOLDER]
    { slot: "SLOT 2", label: "GITHUB", value: "https://github.com/ZeroFaithe", href: "https://github.com/ZeroFaithe" }, // [PLACEHOLDER]
    { slot: "SLOT 3", label: "LINKEDIN", value: "https://www.linkedin.com/in/nathaniel-rae-y-marquez-a40b53213/", href: "https://www.linkedin.com/in/nathaniel-rae-y-marquez-a40b53213/" }, // [PLACEHOLDER]
  ],
};
