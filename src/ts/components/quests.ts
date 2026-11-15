/* QUEST LOG — PDC10 activities with zone filters and a detail dialog. */

import { $, $$, esc } from "../core/dom";
import { blip } from "../core/sound";
import type { Activity, ActivityTable, Zone } from "../types";
import { img } from "./ui";

export interface QuestLog {
  /** Open the detail dialog for an activity id. */
  open(id: string): void;
}

/** "QUEST 01" … for the official list; supplementary work is a side quest. */
export function questLabel(a: Activity, all: Activity[]): string {
  if (a.side) return "SIDE QUEST";
  const n = all.filter((x) => !x.side).indexOf(a) + 1;
  return `QUEST ${String(n).padStart(2, "0")}`;
}

function cover(a: Activity, all: Activity[]): string {
  if (a.screenshots[0]) return img(a.screenshots[0].src, a.screenshots[0].caption, "quest__img");
  const label = questLabel(a, all);
  return `
    <div class="quest__cover" aria-hidden="true">
      <span class="quest__cover-no">${a.side ? "S" : esc(label.slice(-2))}</span>
      <span class="quest__cover-kind">${esc(a.kind)} · ${a.kind === "LECTURE" ? "WRITTEN WORK" : "NO SCREENSHOTS"}</span>
    </div>`;
}

/** Pixel results table (also used by the Power-Ups master-prompt table). */
export function table(t: ActivityTable): string {
  const head = t.head.map((h) => `<th scope="col">${esc(h)}</th>`).join("");
  const rows = t.rows
    .map((r) => `<tr${/^(TOTAL|OVERALL)/.test(r[0] ?? "") ? ' class="is-total"' : ""}>${r.map((c, i) => (i === 0 ? `<th scope="row">${esc(c)}</th>` : `<td>${esc(c)}</td>`)).join("")}</tr>`)
    .join("");
  return `
    <div class="qd-table-wrap" tabindex="0" role="region" aria-label="${esc(t.title)}">
      <table class="qd-table">
        <caption>${esc(t.title)}</caption>
        <thead><tr>${head}</tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

function block(label: string, inner: string): string {
  return `<section class="qd-block"><h4 class="window__label">${esc(label)}</h4>${inner}</section>`;
}

function list(items: string[]): string {
  return `<ul class="qd-list">${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
}

function detail(a: Activity, zone: Zone | undefined, all: Activity[], team: string): string {
  const shotStart = all.slice(0, all.indexOf(a)).reduce((n, x) => n + x.screenshots.length, 0);
  const flow = a.flow
    ? block(
        a.flow.title,
        `<ol class="qd-flow">${a.flow.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>`,
      )
    : "";
  const shots = a.screenshots.length
    ? block(
        `SCREENSHOTS · ${a.screenshots.length}`,
        `<div class="qd-shots">${a.screenshots
          .map(
            (s, i) => `
            <figure class="qd-shot">
              <a href="${esc(s.src)}" target="_blank" rel="noopener" aria-label="Open figure ${shotStart + i + 1} full size">
                ${img(s.src, s.caption, "qd-shot__img")}
              </a>
              <figcaption><b>FIG ${shotStart + i + 1}</b> ${esc(s.caption)}</figcaption>
            </figure>`,
          )
          .join("")}</div>`,
      )
    : "";

  return `
    <p class="quest__meta">${esc(zone?.label ?? "")} · ${esc(zone?.name ?? "")} · ${questLabel(a, all)}</p>
    <h3 class="quest-dialog__title" id="quest-dialog-title">${esc(a.title)}</h3>
    ${a.codename ? `<p class="quest__codename">“${esc(a.codename)}”</p>` : ""}

    <dl class="qd-facts">
      <div><dt>TYPE</dt><dd>${esc(a.kind)}</dd></div>
      <div><dt>PARTY</dt><dd>${a.team ? "TEAM" : "SOLO"}</dd></div>
      <div><dt>AI USED</dt><dd>${esc(a.tools)}</dd></div>
      <div><dt>LOOT</dt><dd class="qd-facts__loot">${esc(a.loot)}</dd></div>
    </dl>
    ${a.team ? `<p class="qd-team">★ ${esc(team)}</p>` : ""}

    ${block("BRIEFING", `<p class="quest-dialog__text">${esc(a.overview)}</p>`)}
    ${a.did.length ? block("WHAT I DID", list(a.did)) : ""}
    ${flow}
    ${a.tables.length ? block("RESULTS", a.tables.map(table).join("")) : ""}
    ${a.highlights.length ? block("HIGHLIGHTS", list(a.highlights)) : ""}

    <div class="dialog-box qd-takeaway">
      <p class="dialog-box__speaker">KEY TAKEAWAY</p>
      <p class="dialog-box__text">${esc(a.takeaway)}</p>
      <span class="dialog-box__next" aria-hidden="true">▼</span>
    </div>

    ${block("SKILLS EARNED", `<ul class="tags">${a.skills.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>`)}
    ${shots}`;
}

export function renderQuests(root: HTMLElement, activities: Activity[], zones: Zone[], team: string): QuestLog {
  const zoneOf = (a: Activity): Zone | undefined => zones.find((z) => z.id === a.zone);

  const chips = [{ id: "all", label: "ALL" }, ...zones.map((z) => ({ id: z.id, label: z.label })), { id: "team", label: "TEAM" }]
    .map((f, i) => `<button class="chip" type="button" data-filter="${esc(f.id)}" aria-pressed="${i === 0}">${esc(f.label)}</button>`)
    .join("");

  const cards = activities
    .map((a, i) => {
      const zone = zoneOf(a);
      const extra = a.skills.length > 4 ? `<li>+${a.skills.length - 4}</li>` : "";
      return `
      <li class="quest window" data-reveal data-zone="${esc(a.zone)}" data-team="${a.team}"
          style="--d:${(i % 3) * 80}ms;--zone:${esc(zone?.color ?? "#6fd3ff")}">
        <div class="quest__media">
          ${cover(a, activities)}
          <span class="badge badge--complete">CLEARED</span>
          <span class="quest__zone">${esc(zone?.label ?? "")}</span>
        </div>
        <div class="quest__body">
          <p class="quest__meta">${questLabel(a, activities)} · ${esc(a.kind)} · ${a.team ? "TEAM" : "SOLO"}</p>
          <h3 class="quest__title">${esc(a.title)}</h3>
          ${a.codename ? `<p class="quest__codename">“${esc(a.codename)}”</p>` : ""}
          <p class="quest__summary">${esc(a.summary)}</p>
          <p class="quest__loot"><span>LOOT</span> ${esc(a.loot)}</p>
          <ul class="tags">${a.skills.slice(0, 4).map((t) => `<li>${esc(t)}</li>`).join("")}${extra}</ul>
          <button class="btn btn--small" type="button" data-open="${esc(a.id)}">VIEW QUEST <span aria-hidden="true">▶</span></button>
        </div>
      </li>`;
    })
    .join("");

  root.innerHTML = `
    <div class="quests__bar">
      <div class="chips" role="group" aria-label="Filter quests by zone">${chips}</div>
      <p class="quests__count" aria-live="polite">QUESTS <span id="quest-count">${activities.length}/${activities.length}</span></p>
    </div>
    <ul class="quest-grid">${cards}</ul>`;

  /* ---- filtering ---- */
  const chipEls = $$<HTMLButtonElement>(".chip", root);
  const cardEls = $$<HTMLElement>(".quest", root);
  const count = $("#quest-count", root);

  chipEls.forEach((chip) =>
    chip.addEventListener("click", () => {
      const f = chip.dataset.filter ?? "all";
      chipEls.forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
      let shown = 0;
      cardEls.forEach((card) => {
        const match = f === "all" || (f === "team" ? card.dataset.team === "true" : card.dataset.zone === f);
        card.hidden = !match;
        if (match) shown += 1;
      });
      if (count) count.textContent = `${shown}/${cardEls.length}`;
    }),
  );

  /* ---- detail dialog ---- */
  const dialog = $<HTMLDialogElement>("#quest-dialog");
  const body = $("#quest-dialog-body");

  const open = (id: string): void => {
    const a = activities.find((x) => x.id === id);
    if (!a || !dialog || !body) return;
    body.innerHTML = detail(a, zoneOf(a), activities, team);
    dialog.style.setProperty("--zone", zoneOf(a)?.color ?? "#6fd3ff");
    dialog.showModal();
    dialog.scrollTop = 0;
  };

  $$<HTMLButtonElement>("[data-open]", root).forEach((btn) => btn.addEventListener("click", () => open(btn.dataset.open ?? "")));

  if (dialog) {
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) dialog.close();
    });
    $("[data-close]", dialog)?.addEventListener("click", () => dialog.close());
    dialog.addEventListener("close", () => blip("back"));
  }

  return { open };
}
