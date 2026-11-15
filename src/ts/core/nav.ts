/* Top menu: mobile toggle + scroll-spy cursor on the current section. */

import { $, $$ } from "./dom";
import { blip } from "./sound";

export function initNav(): void {
  const toggle = $<HTMLButtonElement>(".hud__menu-toggle");
  const menu = $("#menu");
  const links = $$<HTMLAnchorElement>("#menu a");

  const setOpen = (open: boolean): void => {
    toggle?.setAttribute("aria-expanded", String(open));
    menu?.classList.toggle("is-open", open);
  };

  toggle?.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    setOpen(open);
    blip(open ? "select" : "back");
  });

  links.forEach((a) => a.addEventListener("click", () => {
    setOpen(false);
    blip("select");
  }));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && toggle?.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });

  // Scroll-spy
  const setActive = (id: string): void => {
    links.forEach((a) => {
      const on = a.hash === `#${id}`;
      a.classList.toggle("is-active", on);
      if (on) a.setAttribute("aria-current", "location");
      else a.removeAttribute("aria-current");
    });
  };

  const sections = links
    .map((a) => document.getElementById(a.hash.slice(1)))
    .filter((s): s is HTMLElement => s !== null);

  if (!("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
    { rootMargin: "-45% 0px -50% 0px" },
  );
  sections.forEach((s) => io.observe(s));
}
