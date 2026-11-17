import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play, X } from "lucide-react";
import { testimonials } from "../components/Testimonials/testimonials";
import TestimonialCard from "../components/Testimonials/TestimonialCard";
import "../components/Testimonials/Testimonials.css";

const STEP_MS = 5000;
const REVOLUTION_MS = STEP_MS * testimonials.length;

export default function TestimonialsSection() {
  const section = useRef(null);
  const ring = useRef(null);
  const spin = useRef(null);
  const step = useRef(null);
  const stepTarget = useRef(0);
  const fallbackTime = useRef(0);
  const pauseState = useRef(true);
  const dialog = useRef(null);
  const returnFocus = useRef(null);
  const headingId = useId();
  const dialogId = useId();
  const inView = useInView(section, { amount: 0.15 });
  const reducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [selected, setSelected] = useState(null);
  const paused = !!(hovered || focused || userPaused || !inView || !pageVisible || reducedMotion || selected);

  useLayoutEffect(() => {
    const element = ring.current;
    if (!element?.animate) return;
    const orbit = element.animate([{ transform: "rotateY(0deg)" }, { transform: "rotateY(-360deg)" }], {
      duration: REVOLUTION_MS, iterations: Infinity, easing: "linear", fill: "both",
    });
    orbit.pause();
    spin.current = orbit;
    return () => {
      step.current?.cancel();
      step.current = null;
      orbit.cancel();
      spin.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    pauseState.current = paused;
    const movement = step.current || spin.current;
    if (!movement) return;
    if (paused) movement.pause();
    else movement.play();
  }, [paused]);

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  const move = useCallback(direction => {
    const orbit = spin.current;
    if (step.current) {
      step.current.cancel();
      step.current = null;
      fallbackTime.current = stepTarget.current;
      if (orbit) orbit.currentTime = stepTarget.current;
    }
    let from = Number(orbit?.currentTime) || fallbackTime.current;
    let to = (Math.round(from / STEP_MS) + direction) * STEP_MS;
    if (to < 0) { from += REVOLUTION_MS; to += REVOLUTION_MS; }
    const normalized = ((to % REVOLUTION_MS) + REVOLUTION_MS) % REVOLUTION_MS;
    const finish = () => {
      fallbackTime.current = normalized;
      if (orbit) orbit.currentTime = normalized;
      else if (ring.current) ring.current.style.transform = `rotateY(-${normalized / REVOLUTION_MS * 360}deg)`;
    };
    if (!orbit || reducedMotion) { finish(); return; }
    orbit.pause();
    orbit.currentTime = from;
    stepTarget.current = normalized;
    const movement = ring.current.animate([
      { transform: `rotateY(-${from / REVOLUTION_MS * 360}deg)` },
      { transform: `rotateY(-${to / REVOLUTION_MS * 360}deg)` },
    ], { duration: 800, easing: "cubic-bezier(.22,1,.36,1)", fill: "forwards" });
    step.current = movement;
    movement.finished.then(() => {
      if (step.current !== movement) return;
      finish();
      step.current = null;
      movement.cancel();
      if (!pauseState.current) orbit.play();
    }).catch(() => {});
  }, [reducedMotion]);

  const openReview = (review, trigger) => {
    returnFocus.current = trigger;
    setSelected(review);
  };

  useEffect(() => {
    const element = dialog.current;
    if (!selected || !element) return;
    const previousOverflow = document.body.style.overflow;
    const previousPriority = document.body.style.getPropertyPriority("overflow");
    const trigger = returnFocus.current;
    element.showModal();
    document.body.style.setProperty("overflow", "hidden");
    return () => {
      if (element.open) element.close();
      if (previousOverflow) document.body.style.setProperty("overflow", previousOverflow, previousPriority);
      else document.body.style.removeProperty("overflow");
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [selected]);

  return (
    <section ref={section} className="fl-editorial fl-testimonials fl-traveler-reviews" data-fl-theme="model2"
      aria-labelledby={headingId} aria-roledescription="carousel"
      onPointerEnter={event => { if (event.pointerType !== "touch") setHovered(true); }}
      onPointerLeave={event => { if (event.pointerType !== "touch") setHovered(false); }}
      onFocusCapture={event => setFocused(event.target.matches(":focus-visible"))}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <div className="fl-traveler-reviews__wrap">
        <header className="fl-traveler-reviews__heading">
          <div><p className="fl-traveler-reviews__eyebrow">TRAVELER EXPERIENCES</p><h2 id={headingId}>What Our Travelers Say</h2></div>
          <div className="fl-traveler-reviews__controls" aria-label="Review controls">
            <button type="button" onClick={() => move(-1)} aria-label="Previous reviews"><ArrowLeft size={18} aria-hidden="true" /></button>
            <button type="button" onClick={() => setUserPaused(value => !value)} aria-pressed={userPaused} disabled={!!reducedMotion}
              aria-label={reducedMotion ? "Automatic rotation off for reduced motion" : userPaused ? "Resume automatic review rotation" : "Pause automatic review rotation"}>
              {userPaused || reducedMotion ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
            </button>
            <button type="button" onClick={() => move(1)} aria-label="Next reviews"><ArrowRight size={18} aria-hidden="true" /></button>
          </div>
        </header>
        <div className="fl-traveler-reviews__stage">
          <div className="fl-traveler-reviews__scene">
            <div className="fl-traveler-reviews__rig">
              <div ref={ring} className="fl-traveler-reviews__ring" aria-live="off">
                {testimonials.map((review, index) => (
                  <div key={review.id} className="fl-traveler-reviews__orbit-slot" data-review-id={review.id}
                    onClick={event => openReview(review, event.currentTarget.querySelector("button"))}
                    style={{ "--review-angle": `${index * 360 / testimonials.length}deg` }}>
                    <div className="fl-traveler-reviews__face" aria-hidden="true"><TestimonialCard testimonial={review} compact /></div>
                    <div className="fl-traveler-reviews__face fl-traveler-reviews__face--back" aria-hidden="true"><TestimonialCard testimonial={review} compact /></div>
                    <button type="button" className="fl-traveler-reviews__open-card" tabIndex={-1} aria-haspopup="dialog"
                      aria-label={`Read review by ${review.name}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="fl-traveler-reviews__bottom">
          <p>Select a card to read the review.</p>
          <div className="fl-traveler-reviews__reading-controls">
            <button type="button" onClick={event => {
              const time = step.current ? stepTarget.current : Number(spin.current?.currentTime) || fallbackTime.current;
              openReview(testimonials[Math.round(time / STEP_MS) % testimonials.length], event.currentTarget);
            }}>Read front review <ArrowUpRight size={15} aria-hidden="true" /></button>
            <select aria-label="Choose any traveler review" defaultValue="" onChange={event => {
              const review = testimonials.find(item => item.id === event.currentTarget.value);
              if (review) openReview(review, event.currentTarget);
              event.currentTarget.value = "";
            }}><option value="" disabled>All {testimonials.length} reviews</option>{testimonials.map(review => <option key={review.id} value={review.id}>{review.name}</option>)}</select>
          </div>
        </div>
      </div>
      <dialog ref={dialog} className="fl-traveler-reviews__dialog" aria-labelledby={dialogId} aria-modal="true"
        onCancel={event => { event.preventDefault(); setSelected(null); }}
        onClick={event => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) setSelected(null);
        }}>
        {selected && <>
          <header className="fl-traveler-reviews__dialog-heading"><h2 id={dialogId}>Review by {selected.name}</h2><button type="button" autoFocus aria-label="Close review" onClick={() => setSelected(null)}><X size={20} aria-hidden="true" /></button></header>
          <TestimonialCard testimonial={selected} />
        </>}
      </dialog>
    </section>
  );
}
