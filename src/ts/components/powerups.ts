/* POWER-UP LAB — AI prompts before vs after the course. */

import { $, $$, esc, prefersReducedMotion } from "../core/dom";
import { blip } from "../core/sound";
import { typeText } from "../core/typewriter";
import type { MasterPrompts, PromptEntry } from "../types";
import { table } from "./quests";
import { img } from "./ui";

export function renderPowerups(root: HTMLElement, entries: PromptEntry[], masters?: MasterPrompts): void {
  if (!entries.length) {
    root.innerHTML = `<p class="empty">No prompts yet — add some in data/content.ts.</p>`;
    return;
  }

  const tabs = entries
    .map(
      (e, i) => `<button class="tab" type="button" role="tab" id="tab-${esc(e.id)}"
        aria-selected="${i === 0}" aria-controls="pu-panel" tabindex="${i === 0 ? 0 : -1}"
        data-entry="${esc(e.id)}">${esc(e.title)}</button>`,
    )
    .join("");

  root.innerHTML = `
    <div class="tabs" role="tablist" aria-label="Prompt examples">${tabs}</div>

    <div class="pu" id="pu-panel" role="tabpanel">
      <p class="pu__context dialog-box dialog-box--slim"><span class="dialog-box__speaker" data-pu="tool"></span>
        <span data-pu="context"></span></p>

      <div class="pu__arena">
        <article class="pu-card pu-card--before window window--slate" data-reveal>
          <p class="pu-card__badge">LV 1 · BEFORE</p>
          <pre class="pu-card__prompt" data-pu="before-prompt"></pre>
          <p class="pu-card__note" data-pu="before-note"></p>
        </article>

        <div class="pu__arrow" aria-hidden="true">
          <span>POWER</span><span class="pu__arrow-glyph">▶▶</span><span>UP!</span>
        </div>

        <article class="pu-card pu-card--after window window--green" data-reveal>
          <p class="pu-card__badge">LV MAX · AFTER</p>
          <pre class="pu-card__prompt" data-pu="after-prompt"></pre>
          <p class="pu-card__note" data-pu="after-note"></p>
        </article>
      </div>

      <div class="pu__lower">
        <section class="pu-stats window" aria-labelledby="pu-stats-title" data-reveal>
          <h3 class="window__label" id="pu-stats-title">STAT CHECK</h3>
          <div class="pu-stats__legend"><span class="key key--before">BEFORE</span><span class="key key--after">AFTER</span></div>
          <div data-pu="stats"></div>
          <p class="pu-stats__total" data-pu="total"></p>
        </section>

        <section class="pu-shots window" aria-labelledby="pu-shots-title" data-reveal>
          <h3 class="window__label" id="pu-shots-title">SCREENSHOT COMPARE</h3>
          <div class="compare" style="--pos:50%">
            <div class="compare__layer compare__layer--after" data-pu="after-img"></div>
            <div class="compare__layer compare__layer--before" data-pu="before-img"></div>
            <span class="compare__handle" aria-hidden="true"></span>
            <span class="compare__tag compare__tag--before" aria-hidden="true">BEFORE</span>
            <span class="compare__tag compare__tag--after" aria-hidden="true">AFTER</span>
            <input class="compare__range" type="range" min="0" max="100" value="50"
                   aria-label="Drag to compare before and after screenshots">
          </div>
          <p class="pu-shots__hint">◀ DRAG TO COMPARE ▶</p>
        </section>
      </div>
    </div>
    ${
      masters
        ? `<section class="pu-masters" aria-labelledby="pu-masters-title" data-reveal>
        <h3 class="window__label" id="pu-masters-title">${esc(masters.title)}</h3>
        <p class="pu-masters__lead">${esc(masters.lead)}</p>
        ${table(masters.table)}
      </section>`
        : ""
    }`;

  const q = (key: string): HTMLElement => $(`[data-pu="${key}"]`, root)!;
  const compare = $(".compare", root)!;
  const range = $<HTMLInputElement>(".compare__range", root)!;
  const tabEls = $$<HTMLButtonElement>(".tab", root);
  const panel = $("#pu-panel", root)!;
  const shots = $(".pu-shots", root)!;
  const lower = $(".pu__lower", root)!;

  range.addEventListener("input", () => compare.style.setProperty("--pos", `${range.value}%`));

  const show = (entry: PromptEntry, animate: boolean): void => {
    tabEls.forEach((t) => {
      const on = t.dataset.entry === entry.id;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
    });
    panel.setAttribute("aria-labelledby", `tab-${entry.id}`);

    q("tool").textContent = `TOOL · ${entry.tool.toUpperCase()}`;
    q("context").textContent = entry.context;
    q("before-note").textContent = entry.before.note;
    q("after-note").textContent = entry.after.note;
    q("before-prompt").textContent = entry.before.prompt;
    q("after-prompt").textContent = entry.after.prompt;
    if (animate) typeText(q("after-prompt"), entry.after.prompt, { speed: 8 });

    // The compare slider needs both screenshots; otherwise the stat check takes the full row.
    const hasShots = Boolean(entry.before.image && entry.after.image);
    shots.hidden = !hasShots;
    lower.classList.toggle("pu__lower--solo", !hasShots);
    q("before-img").innerHTML = hasShots ? img(entry.before.image!, `Before: ${entry.title}`, "compare__img") : "";
    q("after-img").innerHTML = hasShots ? img(entry.after.image!, `After: ${entry.title}`, "compare__img") : "";

    const before = entry.scores.reduce((s, x) => s + x.before, 0);
    const after = entry.scores.reduce((s, x) => s + x.after, 0);
    const max = entry.scores.length * 10;

    q("stats").innerHTML = entry.scores
      .map(
        (s) => `<div class="pu-stat">
          <span class="pu-stat__label">${esc(s.label)}</span>
          <span class="pu-stat__bars">
            <span class="pu-stat__bar pu-stat__bar--before" style="--v:${s.before * 10}%" title="Before: ${s.before}/10"></span>
            <span class="pu-stat__bar pu-stat__bar--after" style="--v:${s.after * 10}%" title="After: ${s.after}/10"></span>
          </span>
          <span class="pu-stat__delta">+${s.after - s.before}</span>
        </div>`,
      )
      .join("");

    q("total").innerHTML = `TOTAL POWER <b class="t-before">${before}</b> ▶ <b class="t-after">${after}</b><small>/${max}</small>`;

    if (animate) {
      root.classList.remove("is-evolving");
      void root.offsetWidth; // restart animation
      if (!prefersReducedMotion()) root.classList.add("is-evolving");
      blip("powerup");
    }
  };

  tabEls.forEach((t) =>
    t.addEventListener("click", () => {
      const entry = entries.find((e) => e.id === t.dataset.entry);
      if (entry) show(entry, true);
    }),
  );

  // Arrow keys move between tabs (WAI-ARIA tabs pattern).
  root.querySelector(".tabs")?.addEventListener("keydown", (e) => {
    const ke = e as KeyboardEvent;
    const idx = tabEls.indexOf(document.activeElement as HTMLButtonElement);
    if (idx < 0) return;
    const delta = ke.key === "ArrowRight" ? 1 : ke.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    ke.preventDefault();
    const next = tabEls[(idx + delta + tabEls.length) % tabEls.length];
    next?.focus();
    next?.click();
  });

  show(entries[0]!, false);
}
