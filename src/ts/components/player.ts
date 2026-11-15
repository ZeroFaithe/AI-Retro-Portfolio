/* STATUS screen — the player card (personal details). */

import { $, esc } from "../core/dom";
import { typeText } from "../core/typewriter";
import type { Player } from "../types";
import { bar, img } from "./ui";

export function renderPlayer(root: HTMLElement, p: Player): { start: () => void } {
  const stats = p.stats
    .map(
      (s) => `<div class="hud-stat">
        <span class="hud-stat__label" style="color:${esc(s.color)}">${esc(s.label)}</span>
        ${bar(s.value, s.color, `${s.name}: ${s.value} of 100`)}
        <span class="hud-stat__name">${esc(s.name)}</span>
      </div>`,
    )
    .join("");

  root.innerHTML = `
    <div class="player">
      <figure class="player__avatar window" data-reveal>
        <div class="player__portrait">${img(p.avatar, `Portrait of ${p.name}`, "player__img")}</div>
        <figcaption class="player__plate">
          <span class="player__lv">LV ${esc(p.level)}</span>
          <span class="player__handle">${esc(p.handle)}</span>
        </figcaption>
      </figure>

      <div class="player__info window" data-reveal>
        <p class="window__label">STATUS</p>
        <h1 class="player__name">${esc(p.name)}</h1>
        <p class="player__title">${esc(p.title)}</p>

        <dl class="player__facts">
          <div><dt>SCHOOL</dt><dd>${esc(p.school)}</dd></div>
          <div><dt>CLASS</dt><dd>${esc(p.program)}</dd></div>
          <div><dt>RANK</dt><dd>${esc(p.yearLevel)}</dd></div>
          <div><dt>MAP</dt><dd>${esc(p.location)}</dd></div>
        </dl>

        <div class="player__stats">${stats}</div>
      </div>

      <div class="player__dialog dialog-box" data-reveal>
        <p class="dialog-box__speaker">${esc(p.handle)}</p>
        <p class="dialog-box__text" id="player-bio" tabindex="0" title="Click to skip"></p>
        <span class="dialog-box__next" aria-hidden="true">▼</span>
      </div>

      <div class="player__actions" data-reveal>
        <a class="btn btn--gold" href="#quests"><span aria-hidden="true">▶</span> VIEW QUESTS</a>
        <a class="btn" href="#powerups">PROMPT POWER-UPS</a>
        <a class="btn btn--ghost" href="#save">CONTACT</a>
      </div>
    </div>`;

  const bioEl = $("#player-bio", root);
  bioEl!.textContent = p.bio;

  return {
    start: () => {
      if (bioEl) typeText(bioEl, p.bio, { speed: 24 });
    },
  };
}
