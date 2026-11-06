import { Children, useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MobileCardDeck({ children, as: Container = "div", label, className, ...props }) {
  const cards = Children.toArray(children);
  const [mobile, setMobile] = useState(false);
  const [active, setActive] = useState(0);
  const gesture = useRef(null);
  const suppressClick = useRef(false);
  const count = cards.length;
  const current = active % Math.max(count, 1);
  const advance = step => setActive(value => (value + step + count) % Math.max(count, 1));

  useLayoutEffect(() => {
    const media = window.matchMedia("(max-width:760px)");
    const update = () => setMobile(media.matches);
    update(); media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return <Container {...props} className={`${className} fl-card-deck`} role="region" aria-label={`${label} cards`} tabIndex={0}
    onPointerDown={event => {
      suppressClick.current = false;
      if (mobile && event.isPrimary) gesture.current = { x: event.clientX, y: event.clientY };
    }}
    onPointerUp={event => {
      if (!event.isPrimary || !gesture.current) return;
      const dx = event.clientX - gesture.current.x, dy = event.clientY - gesture.current.y;
      gesture.current = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2) {
        suppressClick.current = true; advance(dx < 0 ? 1 : -1);
      }
    }}
    onPointerCancel={() => { gesture.current = null; }}
    onClickCapture={event => {
      if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; }
    }}
    onKeyDown={event => {
      suppressClick.current = false;
      if (!mobile || event.target !== event.currentTarget) return;
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault(); advance(event.key === "ArrowRight" ? 1 : -1);
      }
    }}>
    {cards.map((card, index) => {
      const offset = (index - current + count) % count;
      const position = offset === 0 ? "front" : offset === 1 ? "right" : offset === count - 1 ? "left" : "hidden";
      return <div key={card.key} className="fl-card-deck__slot" data-position={position}
        inert={mobile && offset !== 0 ? true : undefined} aria-hidden={mobile && offset !== 0 ? true : undefined}>{card}</div>;
    })}
    {count > 1 && <div className="fl-card-deck__controls">
      <button type="button" onClick={() => advance(-1)} aria-label={`Previous ${label}`}><ChevronLeft size={17} /></button>
      <span aria-live="polite" aria-atomic="true">{current + 1} / {count}</span>
      <button type="button" onClick={() => advance(1)} aria-label={`Next ${label}`}><ChevronRight size={17} /></button>
    </div>}
  </Container>;
}
