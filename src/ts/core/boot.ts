/* Title screen: "PRESS START" overlay shown once per browser session. */

import { $, prefersReducedMotion, storageGet, storageSet } from "./dom";
import { blip } from "./sound";

const SEEN_KEY = "pq-booted";

export function initBoot(handle: string, onStart: () => void): void {
  const boot = $("#boot");
  if (!boot) {
    onStart();
    return;
  }

  const handleEl = $("[data-boot-handle]", boot);
  if (handleEl) handleEl.textContent = handle;

  if (storageGet(SEEN_KEY, true) === "1") {
    boot.remove();
    onStart();
    return;
  }

  document.body.classList.add("is-booting");
  const startButton = $<HTMLButtonElement>("#press-start", boot);
  let started = false;

  const start = (): void => {
    if (started) return;
    started = true;
    blip("start");
    storageSet(SEEN_KEY, "1", true);
    document.removeEventListener("keydown", onKey);
    boot.classList.add("boot--exit");
    window.setTimeout(
      () => {
        boot.remove();
        document.body.classList.remove("is-booting");
        onStart();
      },
      prefersReducedMotion() ? 0 : 650,
    );
  };

  const onKey = (e: KeyboardEvent): void => {
    if (e.key === "Enter" || e.key === "Escape") {
      e.preventDefault();
      start();
    }
  };

  startButton?.addEventListener("click", start);
  document.addEventListener("keydown", onKey);
  startButton?.focus({ preventScroll: true });
}
