import { useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";

const storageKey = "flyinglyte:color-mode:v1";

export default function ColorModeButton() {
  const [mode, setMode] = useState(() => {
    try { return localStorage.getItem(storageKey) === "dark" ? "dark" : "light"; }
    catch { return "light"; }
  });
  const currentMode = useRef(mode);
  const activeTransition = useRef(null);

  useLayoutEffect(() => () => {
    activeTransition.current?.skipTransition();
    activeTransition.current = null;
    document.documentElement.removeAttribute("data-fl-theme-transition");
  }, []);

  const switchMode = (event) => {
    const next = currentMode.current === "dark" ? "light" : "dark";
    currentMode.current = next;
    activeTransition.current?.skipTransition();
    const root = document.documentElement;
    const update = () => flushSync(() => setMode(next));
    if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce), print").matches ||
        /(?:^\/plan-your-trip\/?$|payment|payu)/i.test(window.location.pathname) || document.visibilityState !== "visible") {
      activeTransition.current = null;
      root.removeAttribute("data-fl-theme-transition");
      update();
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    root.setAttribute("data-fl-theme-transition", "circle");
    try {
      const transition = document.startViewTransition(update);
      activeTransition.current = transition;
      transition.ready.then(() => {
        if (activeTransition.current !== transition) return;
        const animation = root.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 750, easing: "cubic-bezier(.2,.7,.2,1)", pseudoElement: "::view-transition-new(root)", fill: "both" });
        animation.finished.catch(() => {}).finally(() => animation.cancel());
      }).catch(() => { /* Skipped transitions still apply the selected theme. */ });
      transition.finished.catch(() => {}).finally(() => {
        if (activeTransition.current === transition) {
          activeTransition.current = null;
          root.removeAttribute("data-fl-theme-transition");
        }
      });
    } catch {
      activeTransition.current = null;
      root.removeAttribute("data-fl-theme-transition");
      update();
    }
  };

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-fl-color-mode", mode);
    try { localStorage.setItem(storageKey, mode); } catch { /* Storage may be unavailable. */ }
    // Navbar unmounts on the ads route, which keeps its original appearance.
    return () => document.documentElement.removeAttribute("data-fl-color-mode");
  }, [mode]);

  const label = mode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
  return <button type="button" className="fl-nav__color-mode" onClick={switchMode} aria-label={label} title={label} aria-pressed={mode === "dark"}>{mode === "dark" ? <Sun size={18} /> : <Moon size={18} />}</button>;
}
