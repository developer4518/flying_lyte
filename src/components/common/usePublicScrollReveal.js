import { useEffect } from "react";

// Presentation only. Supplier, account, booking and payment routes are excluded.
const PUBLIC_PATH = /^\/(?:about|contact|hotels|blogs(?:\/[^/]+)?|packages(?:\/[^/]+)?|terms|privacy-policy|refund-policy|cancellation)?\/?$/;
const CONTENT = 'h1, h2, h3, p, li, figure, img[alt]:not([alt=""])';
const EXCLUDED = 'form, nav, dialog, [role="dialog"], [aria-live], [aria-hidden="true"], [hidden], [inert], .sr-only, #home-search, .fl-search-panel, .fl-card-deck, .fl-traveler-reviews__stage, .fl-hero__title, [data-fl-scroll-reveal="off"]';

export default function usePublicScrollReveal(pathname, mask) {
  useEffect(() => {
    if (!PUBLIC_PATH.test(pathname) || !window.IntersectionObserver || !Element.prototype.animate) return;
    // The existing route DOM stays intact; never wrap or remount page children.
    const page = mask.current?.nextElementSibling;
    if (!page) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observed = new Set();
    const inside = new Set();
    const animations = new Map();
    let printing = false;

    const cancel = element => {
      animations.get(element)?.cancel();
      animations.delete(element);
    };
    const cancelAll = () => {
      for (const element of animations.keys()) cancel(element);
    };
    const safe = element => {
      if (element.closest(EXCLUDED) || element.querySelector('form, dialog, input, select, textarea, [role="dialog"]')) return false;
      // Do not compete with Framer Motion or change fixed/sticky containing blocks.
      for (let node = element; node && page.contains(node); node = node.parentElement) {
        if (node.style.transform || node.style.opacity || node.style.translate) return false;
        const style = getComputedStyle(node);
        if (style.position === "fixed" || style.position === "sticky") return false;
      }
      return true;
    };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const element = entry.target;
        if (!entry.isIntersecting) {
          inside.delete(element);
          cancel(element);
          continue;
        }
        if (inside.has(element)) continue;
        inside.add(element);
        const bounds = entry.boundingClientRect;
        if (reduced.matches || printing || document.hidden || !safe(element) ||
            bounds.height > window.innerHeight * 0.8 || element.contains(document.activeElement)) continue;
        // Enter from below on the way down; from above when revisiting on the way up.
        const offset = bounds.top < 0 ? -18 : 18;
        const animation = element.animate([
          { opacity: 0.35, translate: `0 ${offset}px` },
          { opacity: 1, translate: "0 0" },
        ], { duration: 540, easing: "cubic-bezier(.22,1,.36,1)" });
        animation.id = "fl-public-scroll-reveal";
        animations.set(element, animation);
        animation.finished.catch(() => {}).finally(() => {
          if (animations.get(element) === animation) cancel(element);
        });
      }
    }, { threshold: 0.05 });

    const scan = () => {
      // Release removed cards/articles when a collection or pagination changes.
      for (const element of observed) {
        if (page.contains(element)) continue;
        observer.unobserve(element);
        observed.delete(element);
        inside.delete(element);
        cancel(element);
      }
      for (const element of page.querySelectorAll(CONTENT)) {
        if (observed.has(element) || !safe(element)) continue;
        // Animate leaves, not whole articles or nested lists containing more copy.
        if (element.matches("li, figure") && element.querySelector(CONTENT)) continue;
        observed.add(element);
        observer.observe(element);
      }
    };
    const focus = event => {
      for (const element of animations.keys()) {
        if (element.contains(event.target)) cancel(element);
      }
    };
    const preference = () => {
      if (reduced.matches) { observer.disconnect(); inside.clear(); cancelAll(); }
      else {
        scan();
        for (const element of observed) observer.observe(element);
      }
    };
    const beforePrint = () => { printing = true; cancelAll(); };
    const afterPrint = () => { printing = false; };
    const mutation = new MutationObserver(() => {
      if (!reduced.matches) scan();
    });
    // Child-list changes only: no scroll handler, polling or animation-style observer.
    if (!reduced.matches) scan();
    mutation.observe(page, { childList: true, subtree: true });
    reduced.addEventListener("change", preference);
    page.addEventListener("focusin", focus);
    window.addEventListener("beforeprint", beforePrint);
    window.addEventListener("afterprint", afterPrint);
    return () => {
      observer.disconnect();
      mutation.disconnect();
      cancelAll();
      reduced.removeEventListener("change", preference);
      page.removeEventListener("focusin", focus);
      window.removeEventListener("beforeprint", beforePrint);
      window.removeEventListener("afterprint", afterPrint);
    };
  }, [pathname, mask]);
}
