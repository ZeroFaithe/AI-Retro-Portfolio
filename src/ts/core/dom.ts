/* Small DOM + storage helpers shared by every component. */

export function $<T extends Element = HTMLElement>(selector: string, root: ParentNode = document): T | null {
  return root.querySelector<T>(selector);
}

export function $$<T extends Element = HTMLElement>(selector: string, root: ParentNode = document): T[] {
  return Array.from(root.querySelectorAll<T>(selector));
}

const ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Escape any value before it goes into an HTML template string. */
export function esc(value: unknown): string {
  return String(value).replace(/[&<>"']/g, (ch) => ESCAPES[ch] ?? ch);
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function storageGet(key: string, session = false): string | null {
  try {
    return (session ? sessionStorage : localStorage).getItem(key);
  } catch {
    return null;
  }
}

export function storageSet(key: string, value: string, session = false): void {
  try {
    (session ? sessionStorage : localStorage).setItem(key, value);
  } catch {
    /* storage unavailable (private mode, file://, etc.) — ignore */
  }
}

/** True for links that should open in a new tab. */
export function isExternal(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export function linkAttrs(href: string): string {
  return isExternal(href) ? ' target="_blank" rel="noopener noreferrer"' : "";
}
