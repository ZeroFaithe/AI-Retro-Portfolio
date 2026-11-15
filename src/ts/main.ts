/* ==========================================================================
   Entry point — renders every section from data/content.ts and wires up
   the global effects. Bundled by esbuild into dist/js/main.js.
   ========================================================================== */

import { content } from "./data/content";
import { $ } from "./core/dom";
import { initBoot } from "./core/boot";
import { initNav } from "./core/nav";
import {
  initButtonSounds,
  initCheatCode,
  initReveal,
  initToggles,
  initXpBar,
  initYear,
} from "./core/effects";
import { renderPlayer } from "./components/player";
import { renderQuests } from "./components/quests";
import { renderMap } from "./components/worldmap";
import { renderParty } from "./components/party";
import { renderPowerups } from "./components/powerups";
import { renderContact } from "./components/contact";

function mount<T>(selector: string, render: (el: HTMLElement) => T): T | undefined {
  const el = $(selector);
  return el ? render(el) : undefined;
}

function init(): void {
  document.title = `${content.player.handle} · Portfolio Quest`;

  const player = mount("#player-card", (el) => renderPlayer(el, content.player));
  const log = mount("#quest-log", (el) => renderQuests(el, content.activities, content.zones, content.course.team));
  mount("#world-map", (el) =>
    renderMap(el, content.zones, content.activities, content.wallets, content.course.growth, (id) => log?.open(id)),
  );
  mount("#party-list", (el) => renderParty(el, content.aiTools));
  mount("#powerup-lab", (el) => renderPowerups(el, content.prompts, content.masterPrompts));
  mount("#save-file", (el) => renderContact(el, content.contact));

  const courseName = $("[data-course-name]");
  const courseDesc = $("[data-course-desc]");
  if (courseName) courseName.textContent = content.course.name;
  if (courseDesc) courseDesc.textContent = content.course.description;

  initNav();
  initToggles();
  initXpBar();
  initButtonSounds();
  initCheatCode();
  initYear();

  initBoot(content.player.handle, () => {
    initReveal();
    player?.start();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
