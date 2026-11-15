/* PARTY — the AI tools I adventure with. */

import { esc, linkAttrs } from "../core/dom";
import type { AiTool } from "../types";
import { img } from "./ui";

export function renderParty(root: HTMLElement, tools: AiTool[]): void {
  root.innerHTML = `<ul class="party">${tools
    .map(
      (t, i) => `
      <li class="member window" data-reveal style="--member:${esc(t.color)};--d:${i * 100}ms">
        <div class="member__head">
          <div class="member__icon">${img(t.icon, `${t.name} icon`, "member__img")}</div>
          <div>
            <p class="member__slot">P${i + 2}</p>
            <h3 class="member__name">${esc(t.name)}</h3>
            <p class="member__role">${esc(t.role)} · ${esc(t.maker)}</p>
          </div>
        </div>
        <p class="member__desc">${esc(t.description)}</p>
        <p class="member__label">SPECIAL MOVES</p>
        <ul class="member__moves">${t.usedFor.map((u) => `<li>${esc(u)}</li>`).join("")}</ul>
        ${t.url ? `<a class="btn btn--small" href="${esc(t.url)}"${linkAttrs(t.url)}>VISIT <span aria-hidden="true">▶</span></a>` : ""}
      </li>`,
    )
    .join("")}</ul>`;
}
