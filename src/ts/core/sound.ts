/* 8-bit sound effects generated with the Web Audio API (no audio files). */

import { storageGet, storageSet } from "./dom";

export type BlipKind = "move" | "select" | "back" | "start" | "type" | "coin" | "powerup";

/** [frequency Hz, duration s] notes played in sequence */
const PATTERNS: Record<BlipKind, Array<[number, number]>> = {
  move: [[880, 0.035]],
  select: [[660, 0.05], [990, 0.07]],
  back: [[520, 0.05], [330, 0.08]],
  start: [[523, 0.08], [659, 0.08], [784, 0.08], [1047, 0.18]],
  type: [[1320, 0.012]],
  coin: [[988, 0.06], [1319, 0.22]],
  powerup: [[392, 0.06], [523, 0.06], [659, 0.06], [784, 0.06], [1047, 0.06], [1319, 0.16]],
};

const STORAGE_KEY = "pq-sound";
let ctx: AudioContext | null = null;
let enabled = storageGet(STORAGE_KEY) === "on";
const listeners = new Set<(on: boolean) => void>();

type AudioCtor = typeof AudioContext;

function ensureContext(): AudioContext | null {
  if (!ctx) {
    const Ctor: AudioCtor | undefined =
      window.AudioContext ?? (window as unknown as { webkitAudioContext?: AudioCtor }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function isSoundOn(): boolean {
  return enabled;
}

export function setSound(on: boolean): void {
  enabled = on;
  storageSet(STORAGE_KEY, on ? "on" : "off");
  if (on) ensureContext();
  listeners.forEach((fn) => fn(on));
}

export function onSoundChange(fn: (on: boolean) => void): void {
  listeners.add(fn);
}

export function blip(kind: BlipKind): void {
  if (!enabled) return;
  const ac = ensureContext();
  if (!ac) return;

  let t = ac.currentTime;
  const volume = kind === "type" ? 0.025 : 0.05;

  for (const [freq, dur] of PATTERNS[kind]) {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(gain).connect(ac.destination);
    osc.start(t);
    osc.stop(t + dur + 0.02);
    t += dur;
  }
}
