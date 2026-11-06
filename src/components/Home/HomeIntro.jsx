import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import logo from "/images/flying_logo.png";

const sessionKey = "flyinglyte:home-intro:v1";
let shownInDocument = false;
const shouldShow = () => {
  if (window.location.pathname !== "/" || shownInDocument) return false;
  try { if (sessionStorage.getItem(sessionKey) === "1") return false; } catch { /* In-memory fallback. */ }
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export default function HomeIntro() {
  const [visible, setVisible] = useState(shouldShow);
  const [revealing, setRevealing] = useState(false);
  const root = useRef(null);
  const skip = useRef(null);
  const finish = useCallback(() => setVisible(false), []);

  useLayoutEffect(() => {
    if (window.location.pathname !== "/") return;
    shownInDocument = true;
    try { sessionStorage.setItem(sessionKey, "1"); } catch { /* Session storage is optional. */ }
    if (!visible) return;
    const previousFocus = document.activeElement;
    const page = document.documentElement;
    const previousOverflow = page.style.overflow;
    const previousGutter = page.style.scrollbarGutter;
    const siblings = [...root.current.parentElement.children].filter(node => node !== root.current);
    const previousInert = siblings.map(node => node.inert);
    siblings.forEach(node => { node.inert = true; });
    page.style.scrollbarGutter = "stable";
    page.style.overflow = "hidden";
    skip.current?.focus({ preventScroll: true });
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduce = () => { if (media.matches) finish(); };
    media.addEventListener("change", reduce);
    const revealTimer = window.setTimeout(() => setRevealing(true), 1850);
    const completionTimer = window.setTimeout(finish, 2350);
    const fallbackTimer = window.setTimeout(finish, 3500);
    return () => {
      [revealTimer, completionTimer, fallbackTimer].forEach(timer => window.clearTimeout(timer));
      media.removeEventListener("change", reduce);
      siblings.forEach((node, index) => { node.inert = previousInert[index]; });
      page.style.overflow = previousOverflow;
      page.style.scrollbarGutter = previousGutter;
      if (previousFocus !== document.body && previousFocus?.isConnected) previousFocus.focus?.({ preventScroll: true });
    };
  }, [visible, finish]);

  if (!visible) return null;
  return <div ref={root} className="fl-brand-intro" data-fl-theme="model2" data-fl-revealing={revealing} role="dialog" aria-modal="true" aria-label="Welcome to FlyingLyte"
    onKeyDown={event => {
      if (event.key === "Escape") finish();
      if (event.key === "Tab") { event.preventDefault(); skip.current?.focus(); }
    }}
    onAnimationEnd={event => { if (event.target === event.currentTarget && event.animationName === "fl-intro-exit") finish(); }}>
    <img className="fl-brand-intro__logo" src={logo} alt="FlyingLyte" onError={finish} />
    <div className="fl-brand-intro__word" aria-hidden="true">{"FlyingLyte".split("").map((letter, index) => <span key={index} style={{ "--fl-letter": index }}>{letter}</span>)}<span className="fl-brand-intro__dot">.</span></div>
    <p>GO PLACES. FEEL MORE.</p>
    <button ref={skip} type="button" onClick={finish}>Skip intro <ArrowRight size={15} /></button>
  </div>;
}
