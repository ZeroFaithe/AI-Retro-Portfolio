/* WORLD MAP — the PDC10 course as zones (modules) and stages (activities). */

import { $$, esc } from "../core/dom";
import { blip } from "../core/sound";
import type { Activity, TokenWallet, Zone } from "../types";
import { bar } from "./ui";

export function renderMap(
  root: HTMLElement,
  zones: Zone[],
  activities: Activity[],
  wallets: TokenWallet[],
  growth: string,
  onOpen: (id: string) => void,
): void {
  const shots = activities.reduce((n, a) => n + a.screenshots.length, 0);
  const raids = activities.filter((a) => a.team).length;

  const stats = [
    [`${activities.length}/${activities.length}`, "STAGES CLEARED"],
    [String(zones.length), "ZONES"],
    [String(raids), "TEAM RAIDS"],
    [String(shots), "SCREENSHOTS"],
  ]
    .map(([v, l]) => `<div class="map-stat"><b>${esc(v)}</b><span>${esc(l)}</span></div>`)
    .join("");

  const zoneCards = zones
    .map((z, zi) => {
      const stages = activities.filter((a) => a.zone === z.id);
      let n = 0;
      const items = stages
        .map((a) => {
          const no = a.side ? `${zi + 1}-S` : `${zi + 1}-${(n += 1)}`;
          return `
          <li>
            <button class="stage${a.side ? " stage--side" : ""}" type="button" data-stage="${esc(a.id)}">
              <span class="stage__no">${esc(no)}</span>
              <span class="stage__name">${esc(a.short)}${a.team ? ' <i class="stage__team">TEAM</i>' : ""}${a.side ? ' <i class="stage__team">SIDE</i>' : ""}</span>
              <span class="stage__flag" aria-label="cleared">★</span>
            </button>
          </li>`;
        })
        .join("");
      return `
      <li class="zone window window--dark" data-reveal style="--zone:${esc(z.color)};--d:${zi * 90}ms">
        <div class="zone__head">
          <span class="zone__tag">${esc(z.label)}</span>
          <span class="zone__clear">CLEAR</span>
        </div>
        <h3 class="zone__name">${esc(z.name)}</h3>
        <p class="zone__desc">${esc(z.description)}</p>
        <ol class="zone__stages">${items}</ol>
        <p class="zone__lesson"><span>LESSON</span> ${esc(z.lesson)}</p>
      </li>`;
    })
    .join("");

  const walletRows = wallets
    .map((w) => {
      const pct = Math.round((w.left / w.total) * 100);
      return `
      <div class="wallet">
        <p class="wallet__head"><span>${esc(w.quiz)}</span><b>${w.left.toLocaleString("en-US")} / ${w.total.toLocaleString("en-US")}</b></p>
        ${bar(pct, pct > 60 ? "#8fe04a" : "#ffd23f", `${w.quiz}: ${w.left} of ${w.total} tokens left`)}
        <p class="wallet__note">${esc(w.note)}</p>
      </div>`;
    })
    .join("");

  root.innerHTML = `
    <div class="map-hud" data-reveal>${stats}</div>
    <ol class="map-path">${zoneCards}</ol>
    <div class="map-foot">
      <div class="dialog-box map-growth" data-reveal>
        <p class="dialog-box__speaker">GROWTH LOG · HOW MY PROMPTS LEVELLED UP</p>
        <p class="dialog-box__text">${esc(growth)}</p>
        <span class="dialog-box__next" aria-hidden="true">▼</span>
      </div>
      <div class="window window--green wallets" data-reveal>
        <p class="window__label">TEAM RAID · TOKENS LEFT</p>
        ${walletRows}
      </div>
    </div>`;

  $$<HTMLButtonElement>("[data-stage]", root).forEach((b) =>
    b.addEventListener("click", () => {
      blip("select");
      onOpen(b.dataset.stage ?? "");
    }),
  );
}
