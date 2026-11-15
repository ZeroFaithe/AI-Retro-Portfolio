/* SAVE FILE — contact links presented as save slots. */

import { esc, linkAttrs } from "../core/dom";
import type { ContactLink } from "../types";

export function renderContact(root: HTMLElement, links: ContactLink[]): void {
  root.innerHTML = `
    <div class="save window" data-reveal>
      <p class="window__label">SELECT A FILE</p>
      <ul class="save__list">
        ${links
          .map(
            (l) => `<li>
              <a class="save__slot" href="${esc(l.href)}"${linkAttrs(l.href)}>
                <span class="save__cursor" aria-hidden="true">▶</span>
                <span class="save__no">${esc(l.slot)}</span>
                <span class="save__label">${esc(l.label)}</span>
                <span class="save__value">${esc(l.value)}</span>
              </a>
            </li>`,
          )
          .join("")}
      </ul>
    </div>`;
}
