/* RPG-style dialogue typing. Click the box to skip to the end. */

import { esc, prefersReducedMotion } from "./dom";
import { blip } from "./sound";

export interface TypeOptions {
  /** ms per character */
  speed?: number;
  sound?: boolean;
  onDone?: () => void;
}

const active = new WeakMap<HTMLElement, () => void>();

export function typeText(el: HTMLElement, text: string, options: TypeOptions = {}): () => void {
  const { speed = 22, sound = true, onDone } = options;

  // Cancel any typing already running in this element.
  active.get(el)?.();

  // Screen readers get the full text at once; the animated copy is hidden from them.
  el.innerHTML = `<span class="sr-only">${esc(text)}</span><span class="tw" aria-hidden="true"></span>`;
  const out = el.querySelector<HTMLElement>(".tw");
  if (!out) return () => undefined;

  let i = 0;
  let timer = 0;
  let finished = false;

  const finish = (): void => {
    if (finished) return;
    finished = true;
    window.clearTimeout(timer);
    out.textContent = text;
    el.classList.add("is-done");
    el.removeEventListener("click", finish);
    active.delete(el);
    onDone?.();
  };

  const cancel = (): void => {
    finished = true;
    window.clearTimeout(timer);
    el.removeEventListener("click", finish);
    active.delete(el);
  };

  el.classList.remove("is-done");

  if (prefersReducedMotion() || speed <= 0) {
    finish();
    return cancel;
  }

  const step = (): void => {
    if (finished) return;
    i += 1;
    out.textContent = text.slice(0, i);
    if (sound && i % 3 === 0 && text[i - 1] !== " ") blip("type");
    if (i >= text.length) {
      finish();
      return;
    }
    const ch = text[i - 1];
    const pause = ch === "." || ch === "!" || ch === "?" ? speed * 8 : ch === "," ? speed * 4 : speed;
    timer = window.setTimeout(step, pause);
  };

  el.addEventListener("click", finish);
  active.set(el, cancel);
  timer = window.setTimeout(step, speed);
  return cancel;
}
