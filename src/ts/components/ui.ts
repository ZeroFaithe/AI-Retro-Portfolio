/* Reusable markup snippets shared across components. */

import { esc } from "../core/dom";

/** Continuous HUD bar (0–100). */
export function bar(value: number, color: string, label: string): string {
  const v = Math.max(0, Math.min(100, value));
  return `<div class="bar" role="meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${v}" aria-label="${esc(label)}">
    <span class="bar__fill" style="--v:${v}%;--c:${esc(color)}"></span>
  </div>`;
}

/** Image with a graceful fallback if the file is missing. */
export function img(src: string, alt: string, cls = ""): string {
  return `<img class="${esc(cls)}" src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async" onerror="this.classList.add('is-missing')">`;
}
