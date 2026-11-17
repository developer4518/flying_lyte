import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import usePublicScrollReveal from "./usePublicScrollReveal";
import TravelKeywords from "../Home/TravelKeywords";

// Public landing pages only; transaction and search-results routes stay excluded.
const KEYWORD_PAGES = new Set(["/flights", "/hotels", "/about", "/contact", "/blogs"]);

export default function PageMotion({ children }) {
  const { pathname } = useLocation();
  const mask = useRef(null);
  usePublicScrollReveal(pathname, mask);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const previous = root.getAttribute("data-fl-smooth-scroll");
    const excluded = pathname.replace(/\/+$/, "") === "/plan-your-trip" || /payment|payu|prebook|invoice|voucher/i.test(pathname);
    if (!excluded) root.setAttribute("data-fl-smooth-scroll", "true");
    else root.removeAttribute("data-fl-smooth-scroll");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animation;
    let observer;
    const enter = () => {
      if (pathname.replace(/\/+$/, "") === "/plan-your-trip" || reduced.matches || !mask.current?.animate) return;
      // Only editorial/public pages use the softer reveal. Protected journeys
      // retain their existing transition, scroll rules and component identity.
      const editorial = /^\/(?:about|contact|hotels|blogs(?:\/[^/]+)?|packages(?:\/[^/]+)?|terms|privacy-policy|refund-policy|cancellation)?\/?$/.test(pathname);
      // Reveal without transforming/remounting forms or fixed popups.
      animation = mask.current.animate(editorial ? [
        { opacity: 1, clipPath: "inset(0% 0 0 0)" },
        { opacity: 0, clipPath: "inset(100% 0 0 0)" },
      ] : [
        { opacity: 1, clipPath: "inset(0% 0 0 0)" },
        { opacity: 1, clipPath: "inset(100% 0 0 0)" },
      ], {
        duration: editorial ? 480 : 650, easing: "cubic-bezier(.22,.61,.36,1)",
      });
      animation.finished.catch(() => {}).finally(() => animation.cancel());
    };
    if (document.querySelector(".fl-brand-intro")) {
      observer = new MutationObserver(() => {
        if (!document.querySelector(".fl-brand-intro")) { observer.disconnect(); enter(); }
      });
      observer.observe(mask.current.parentElement, { childList: true, subtree: true });
    } else enter();
    const reduce = () => { if (reduced.matches) animation?.cancel(); };
    reduced.addEventListener("change", reduce);
    return () => {
      animation?.cancel();
      observer?.disconnect();
      reduced.removeEventListener("change", reduce);
      if (previous === null) root.removeAttribute("data-fl-smooth-scroll");
      else root.setAttribute("data-fl-smooth-scroll", previous);
    };
  }, [pathname]);

  // No pathname key or page wrapper: route state and DOM identity are preserved.
  return <><div ref={mask} className="fl-page-transition-mask" aria-hidden="true" />{children}{KEYWORD_PAGES.has(pathname.replace(/\/+$/, "")) && <TravelKeywords />}</>;
}
