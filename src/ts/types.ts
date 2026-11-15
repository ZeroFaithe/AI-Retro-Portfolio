/* ==========================================================================
   Content types — the shape of everything in data/content.ts
   ========================================================================== */

export interface PlayerStat {
  /** Short HUD label, e.g. "HP" */
  label: string;
  /** What the stat stands for, e.g. "Motivation" */
  name: string;
  /** 0–100 */
  value: number;
  /** CSS colour for the bar */
  color: string;
}

export interface Player {
  name: string;
  handle: string;
  title: string;
  school: string;
  program: string;
  yearLevel: string;
  location: string;
  avatar: string;
  bio: string;
  level: number;
  stats: PlayerStat[];
}

export interface AiTool {
  id: string;
  name: string;
  maker: string;
  role: string;
  color: string;
  /** Path to the icon or official logo image */
  icon: string;
  description: string;
  usedFor: string[];
  url?: string;
}

/* ------------------------------------------------------ COURSE ACTIVITIES */

/** A course module, shown as a "zone" on the world map. */
export interface Zone {
  id: string;
  /** Short tag, e.g. "ZONE 1" */
  label: string;
  name: string;
  description: string;
  /** CSS colour for the zone */
  color: string;
  /** One-line lesson learned across the zone */
  lesson: string;
}

export interface ActivityTable {
  title: string;
  head: string[];
  rows: string[][];
}

export interface Screenshot {
  src: string;
  caption: string;
}

export interface Activity {
  id: string;
  /** Zone id this activity belongs to */
  zone: string;
  /** Short name used on the world map */
  short: string;
  title: string;
  /** Game name given to gamified quizzes, e.g. "The Prompt Vault" */
  codename?: string;
  kind: string;
  /** Group activity done with the team */
  team: boolean;
  /** Supplementary activity outside the official list */
  side?: boolean;
  /** AI tools used */
  tools: string;
  /** What was learned, in 3–5 words */
  loot: string;
  summary: string;
  overview: string;
  did: string[];
  /** Optional step-by-step flow shown as connected pixel boxes */
  flow?: { title: string; steps: string[] };
  tables: ActivityTable[];
  highlights: string[];
  takeaway: string;
  skills: string[];
  screenshots: Screenshot[];
}

export interface TokenWallet {
  quiz: string;
  left: number;
  total: number;
  note: string;
}

export interface PromptVersion {
  prompt: string;
  /** Screenshot; leave out to hide the screenshot-compare panel */
  image?: string;
  note: string;
}

export interface PromptScore {
  label: string;
  /** 0–10 */
  before: number;
  /** 0–10 */
  after: number;
}

export interface PromptEntry {
  id: string;
  title: string;
  tool: string;
  context: string;
  before: PromptVersion;
  after: PromptVersion;
  scores: PromptScore[];
}

export interface MasterPrompts {
  title: string;
  lead: string;
  table: ActivityTable;
}

export interface ContactLink {
  slot: string;
  label: string;
  value: string;
  href: string;
}

export interface PortfolioContent {
  player: Player;
  aiTools: AiTool[];
  course: { name: string; description: string; team: string; growth: string };
  zones: Zone[];
  activities: Activity[];
  wallets: TokenWallet[];
  prompts: PromptEntry[];
  masterPrompts: MasterPrompts;
  contact: ContactLink[];
}
