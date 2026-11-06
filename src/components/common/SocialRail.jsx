import { useEffect, useRef, useState } from "react";
import { ChevronDown, Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";

// Existing production links, also used by Footer. No demo destinations.
const networks = [
  { label: "WhatsApp", href: "https://wa.me/919667455591", Icon: MessageCircle },
  { label: "Instagram", href: "https://www.instagram.com/flying_lyte/", Icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/Flying-Lyte/", Icon: Facebook },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/144040385", Icon: Linkedin },
  { label: "X", href: "https://x.com/flyinglyte", Icon: XIcon },
];
let introducedInDocument = false;

function XIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.835L0 1.154h7.594l5.243 6.932 6.064-6.933Zm-1.29 19.49h2.039L6.487 3.24H4.3l13.31 17.403Z" /></svg>;
}

export default function SocialRail() {
  const { pathname } = useLocation();
  return <AnimatedSocialRail key={pathname} homepage={pathname === "/"} />;
}

function AnimatedSocialRail({ homepage }) {
  const [compact, setCompact] = useState(() => window.matchMedia("(max-width: 760px)").matches);
  const [expanded, setExpanded] = useState(() => (homepage && !introducedInDocument) || !window.matchMedia("(max-width: 760px)").matches);
  const [ready, setReady] = useState(false);
  const [attention, setAttention] = useState(-1);
  const rail = useRef(null);
  const timer = useRef(null);
  const manual = useRef(false);
  const shouldIntroduce = useRef(homepage && !introducedInDocument);
  const interruptSequence = () => {
    window.clearTimeout(timer.current);
    manual.current = true;
    setAttention(-1);
  };

  useEffect(() => {
    const media = window.matchMedia("(max-width: 760px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let nextIndex = 0;
    let started = false;
    const start = () => {
      setReady(true);
      if (!shouldIntroduce.current || motion.matches || nextIndex >= networks.length || manual.current) {
        if (homepage) introducedInDocument = true;
        if (!manual.current) setExpanded(!media.matches);
        return;
      }
      introducedInDocument = true;
      setExpanded(true);
      const spotlight = index => {
        if (manual.current) return;
        if (index === networks.length) {
          setAttention(-1);
          if (media.matches) timer.current = window.setTimeout(() => {
            if (!manual.current && !rail.current?.matches(":focus-within, :hover")) setExpanded(false);
          }, 300);
          return;
        }
        nextIndex = index + 1;
        setAttention(index);
        timer.current = window.setTimeout(() => {
          setAttention(-1);
          timer.current = window.setTimeout(() => spotlight(index + 1), 200);
        }, 750);
      };
      timer.current = window.setTimeout(() => spotlight(nextIndex), 1200);
    };
    // A refresh may also show the existing enquiry overlay. Wait for the page,
    // without dismissing that overlay or changing its submission behavior.
    const pageIsVisible = () => !document.querySelector(".fl-brand-intro") &&
      ![...document.querySelectorAll("main .fixed.inset-0")].some(node =>
        Number(getComputedStyle(node).zIndex) >= 900 && node.getClientRects().length);
    const syncVisibility = () => {
      if (!pageIsVisible()) {
        if (started) {
          window.clearTimeout(timer.current);
          setAttention(-1);
          setReady(false);
          started = false;
        }
        return;
      }
      if (!started) { started = true; start(); }
    };
    const observer = new MutationObserver(syncVisibility);
    observer.observe(rail.current.parentElement, { childList: true, subtree: true });
    syncVisibility();
    const resize = () => {
      const waiting = rail.current?.dataset.ready !== "true";
      if (!waiting) interruptSequence();
      setCompact(media.matches);
      setExpanded(!media.matches || (waiting && shouldIntroduce.current));
    };
    const reduce = () => { if (motion.matches) { interruptSequence(); if (!rail.current?.matches(":focus-within, :hover")) setExpanded(!media.matches); } };
    media.addEventListener("change", resize);
    motion.addEventListener("change", reduce);
    return () => { observer.disconnect(); window.clearTimeout(timer.current); media.removeEventListener("change", resize); motion.removeEventListener("change", reduce); };
  }, []);

  return <aside ref={rail} className="fl-social-rail" data-fl-theme="model2" data-expanded={expanded} data-ready={ready} aria-label="FlyingLyte social links" aria-hidden={!ready} inert={!ready}
    onPointerEnter={interruptSequence} onPointerDown={interruptSequence} onFocus={interruptSequence}
    onKeyDown={event => { if (event.key === "Escape" && compact) { interruptSequence(); setExpanded(false); rail.current.querySelector(".fl-social-toggle")?.focus(); } }}>
    <div className="fl-social-links" id="fl-social-links" inert={compact && !expanded} aria-hidden={compact && !expanded}>
    {networks.map(({ label, href, Icon }, index) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} data-network={label} data-spotlight={attention === index} style={{ "--fl-social-order": index }}><span className="fl-social-icon"><Icon size={18} aria-hidden="true" /></span><span className="fl-social-label" aria-hidden="true">{label}</span></a>)}
    </div>
    <button type="button" className="fl-social-toggle" aria-label={expanded ? "Hide social links" : "Show social links"} aria-expanded={expanded} aria-controls="fl-social-links"
      onClick={() => { interruptSequence(); setExpanded(value => !value); }}><ChevronDown size={18} aria-hidden="true" /></button>
  </aside>;
}
