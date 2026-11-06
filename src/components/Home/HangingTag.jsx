import { useEffect, useRef, useState } from "react";

export default function HangingTag() {
  const tag = useRef(null);
  const [arrived, setArrived] = useState(false);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) { setArrived(true); return; }
    // Observe the photograph, not the moving sign. Reset only on a full exit,
    // so entering from either scroll direction replays without threshold flicker.
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) setArrived(false);
        else if (entry.intersectionRatio >= 0.4) setArrived(true);
      }
    }, { threshold: [0, 0.4] });
    observer.observe(tag.current.parentElement);
    return () => observer.disconnect();
  }, []);

  return <div ref={tag} className="fl-hanging-tag" data-arrived={arrived}>
    <svg className="fl-hanging-tag__cord" viewBox="0 0 300 52" preserveAspectRatio="none" aria-hidden="true">
      <path d="M20 51 150 6 280 51" fill="none" stroke="#d1b892" strokeWidth="2" />
      <circle cx="150" cy="6" r="4" fill="#c39c6c" stroke="#795c3f" strokeWidth="0.7" />
    </svg>
    <p>Collect moments.<br /><em>Not just miles.</em></p>
    <span>THE FLYINGLYTE WAY</span>
  </div>;
}
