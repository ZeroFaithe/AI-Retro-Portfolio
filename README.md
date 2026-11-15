# Portfolio Quest — Retro Pixel Portfolio

A handheld-console inspired portfolio built with **HTML, CSS and TypeScript**.
Blue + green palette with gold, orange, pink and teal accents, chunky pixel windows,
an LCD dialogue box, a title screen, CRT scanlines and optional 8-bit sound effects.

All content lives in `src/ts/data/`: profile, AI tools and contact in `content.ts`,
the PDC10 course activities (zones, quests, screenshots) in `activities.ts`,
and the prompt power-ups in `prompts.ts`.
Every section is rendered from these files.

---

## Quick start

The compiled site is already included, so you can simply **open `index.html`** in a browser.

To edit and rebuild:

```bash
npm install        # once — installs TypeScript and esbuild
npm run dev        # live rebuild + local server at http://localhost:8000
npm run build      # type-check, then bundle minified files into dist/
```

> Edit files in `src/`. Never edit `dist/` by hand — it is regenerated on every build.

---

## File structure

```
retro-portfolio/
├── index.html                  # Page shell: title screen, HUD menu, empty section mounts
├── package.json                # Scripts: dev / build / typecheck
├── tsconfig.json               # Strict TypeScript settings
├── README.md
├── .gitignore
│
├── src/                        # ✏️  SOURCE — edit these
│   ├── ts/
│   │   ├── main.ts             # Entry point: renders every section, starts effects
│   │   ├── types.ts            # Interfaces for all content (Player, Project, PromptEntry…)
│   │   ├── data/
│   │   │   ├── content.ts      # ⭐ Profile, AI tools, contact
│   │   │   ├── prompts.ts      # ⭐ Prompt power-ups (before/after) + master-prompt table
│   │   │   └── activities.ts   # ⭐ PDC10 zones (modules), activities, token wallets
│   │   ├── components/         # One file per section
│   │   │   ├── player.ts       #   STATUS     – profile card + typed bio
│   │   │   ├── worldmap.ts     #   MAP        – PDC10 modules as zones + stages
│   │   │   ├── quests.ts       #   QUESTS     – PDC10 activities, zone filters, detail dialog
│   │   │   ├── party.ts        #   PARTY      – AI tools
│   │   │   ├── powerups.ts     #   POWER-UPS  – prompts before vs after
│   │   │   ├── contact.ts      #   SAVE       – contact slots
│   │   │   └── ui.ts           #   Shared snippets (meters, bars, images)
│   │   └── core/               # App-wide behaviour
│   │       ├── boot.ts         #   "PRESS START" title screen
│   │       ├── nav.ts          #   Menu toggle + scroll-spy cursor
│   │       ├── effects.ts      #   XP scroll bar, CRT/sound toggles, reveal, toast, cheat code
│   │       ├── sound.ts        #   8-bit blips via Web Audio (no audio files)
│   │       ├── typewriter.ts   #   RPG dialogue typing
│   │       └── dom.ts          #   DOM, escaping and storage helpers
│   │
│   └── styles/
│       ├── main.css            # Imports everything in order
│       ├── base/               # fonts, variables (palette), reset, typography
│       ├── layout/             # hud, sections (+ hero scene), footer
│       └── components/         # window, buttons, dialog-box, boot, player, inventory,
│                               # worldmap, quests, party, powerups, save, effects
│
├── assets/                     # 🖼️  STATIC FILES — referenced from content.ts
│   ├── fonts/                  # Press Start 2P + VT323 (self-hosted, OFL licensed)
│   ├── icons/favicon.svg
│   └── images/
│       ├── profile/            # avatar-placeholder.svg      → your photo
│       ├── activities/         # fig-01…31.jpg               → PDC10 activity screenshots
│       ├── prompts/            # before-01.svg / after-01.svg → prompt screenshots
│       └── tools/              # antigravity / claude / chatgpt icons
│
└── dist/                       # ⚙️  BUILD OUTPUT — generated, do not edit
    ├── css/main.css
    └── js/main.js
```

This follows the common **src / assets / dist** split: source code you write, static files
you reference, and generated output the browser loads.

---

## Replacing the placeholders

Search `content.ts` for `[PLACEHOLDER]` — every item to replace is marked.

| What | Where |
|---|---|
| Name, nickname, school, program, year, bio | `player` in `content.ts` |
| Profile photo | Put an image in `assets/images/profile/` and update `player.avatar` |
| PDC10 modules and activities | `zones` and `activities` in `activities.ts` |
| Activity screenshots | `assets/images/activities/` — referenced as `fig(n)` in `activities.ts` |
| Course name and description | `course` |
| Prompt before/after text and scores | `prompts` in `prompts.ts` — each entry becomes a tab; leave out `image` to hide the screenshot slider |
| Master-prompt comparison table | `masterPrompts` in `prompts.ts` |
| Prompt screenshots | `assets/images/prompts/` — update `before.image` / `after.image` |
| Contact links | `contact` |

**Images:** any format works (`.png`, `.jpg`, `.webp`, `.svg`). Activity and prompt images
look best at a **16:10** ratio. The avatar is shown square.

**AI tool logos:** the tools use original pixel icons. To show the official logos instead,
download them from each company's brand or press page and either save them over the
files in `assets/images/tools/` or change the `icon` path in `aiTools`.

**Colours** are design tokens in `src/styles/base/variables.css`.

After editing, run `npm run build` (or keep `npm run dev` running).

---

## Features

- Title screen with **PRESS START** (shown once per browser session)
- Sticky HUD menu with a blinking ▶ cursor on the current section; XP bar shows scroll progress
- Player card with HP / MP / XP bars and a typed bio (click the box to skip)
- World map — the four PDC10 modules plus the bonus lab as zones; select a stage to open it
- Quest log — every PDC10 activity with zone/team filters and a detail dialog (results tables, takeaway, screenshots)
- Party members (AI tools) with "special moves"
- Prompt power-up lab: before/after prompts, stat comparison and a drag-to-compare screenshot slider
- CRT scanline and 8-bit sound toggles (preferences are remembered)
- Responsive down to phone width; respects *reduced motion*; keyboard and screen-reader friendly
- Hidden cheat code: ↑ ↑ ↓ ↓ ← → ← → B A

## Deploying

The site is fully static. Upload the whole folder (or just `index.html`, `assets/` and `dist/`)
to GitHub Pages, Netlify, Vercel or any web host.

## Credits

Fonts: *Press Start 2P* by CodeMan38 and *VT323* by Peter Hull — SIL Open Font License 1.1.
