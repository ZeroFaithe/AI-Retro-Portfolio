/* Global UI effects: XP scroll bar, CRT + sound toggles, reveal-on-scroll,
   toast messages, button sounds and a small cheat-code easter egg. */

import { $, $$, prefersReducedMotion, storageGet, storageSet } from "./dom";
import { blip, isSoundOn, onSoundChange, setSound } from "./sound";

/* ---------------------------------------------------------------- toast */
let toastTimer = 0;

export function toast(message: string, ms = 2600): void {
  const el = $("#toast");
  if (!el) return;
  el.textContent = message;
  el.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => el.classList.remove("is-visible"), ms);
}

/* ------------------------------------------------------- XP scroll bar */
export function initXpBar(): void {
  const fill = $("#xp-fill");
  if (!fill) return;
  let ticking = false;
  const update = (): void => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    fill.style.transform = `scaleX(${pct})`;
    ticking = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();
}

/* --------------------------------------------------------- toggles */
export function initToggles(): void {
  // CRT scanlines
  const crtKey = "pq-crt";
  const crtButtons = $$<HTMLButtonElement>("[data-toggle='crt']");
  const applyCrt = (on: boolean): void => {
    document.body.classList.toggle("crt-off", !on);
    crtButtons.forEach((b) => {
      b.setAttribute("aria-pressed", String(on));
      b.querySelector(".toggle__state")!.textContent = on ? "ON" : "OFF";
    });
  };
  applyCrt(storageGet(crtKey) !== "off");
  crtButtons.forEach((b) =>
    b.addEventListener("click", () => {
      const on = document.body.classList.contains("crt-off");
      applyCrt(on);
      storageSet(crtKey, on ? "on" : "off");
      blip(on ? "select" : "back");
    }),
  );

  // Sound
  const soundButtons = $$<HTMLButtonElement>("[data-toggle='sound']");
  const applySound = (on: boolean): void => {
    soundButtons.forEach((b) => {
      b.setAttribute("aria-pressed", String(on));
      b.querySelector(".toggle__state")!.textContent = on ? "ON" : "OFF";
    });
  };
  applySound(isSoundOn());
  onSoundChange(applySound);
  soundButtons.forEach((b) =>
    b.addEventListener("click", () => {
      const next = !isSoundOn();
      setSound(next);
      if (next) blip("coin");
    }),
  );
}

/* ------------------------------------------------- reveal on scroll */
export function initReveal(): void {
  const targets = $$("[data-reveal]");
  if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
    targets.forEach((t) => t.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  targets.forEach((t) => io.observe(t));
}

/* ----------------------------------------------------- button sounds */
export function initButtonSounds(): void {
  document.addEventListener("pointerover", (e) => {
    const target = (e.target as Element | null)?.closest(".btn, .chip, .stage, .menu a, .tab");
    const from = (e as PointerEvent).relatedTarget as Element | null;
    if (target && !target.contains(from)) blip("move");
  });
  document.addEventListener("click", (e) => {
    const target = (e.target as Element | null)?.closest(".btn, .chip, .save__slot");
    if (target) blip("select");
  });
}

/* ------------------------------------------------------- cheat code */
const CHEAT = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

export function initCheatCode(): void {
  let pos = 0;
  document.addEventListener("keydown", (e) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    pos = key === CHEAT[pos] ? pos + 1 : key === CHEAT[0] ? 1 : 0;
    if (pos === CHEAT.length) {
      pos = 0;
      blip("powerup");
      toast("CHEAT ACTIVATED · +99 CREATIVITY");
      document.body.classList.add("is-cheat");
      window.setTimeout(() => document.body.classList.remove("is-cheat"), 4000);
    }
  });
}

/* ------------------------------------------------------ footer year */
export function initYear(): void {
  $$("[data-year]").forEach((el) => (el.textContent = String(new Date().getFullYear())));
}
