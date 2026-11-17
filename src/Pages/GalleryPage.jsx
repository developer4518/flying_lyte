import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { motion as Motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Camera, Film, Play, X } from "lucide-react";
import SEO from "../components/SEO";
import { galleryMedia } from "../data/galleryMedia";
import "./GalleryPage.css";

const photoCount = galleryMedia.filter(item => item.type === "photo").length;
const filmCount = galleryMedia.length - photoCount;
const filters = [["all", "All moments", galleryMedia.length], ["photo", "Photos", photoCount], ["video", "Films", filmCount]];
const heroMain = galleryMedia.find(item => item.id === "photo-07");
const heroPortrait = galleryMedia.find(item => item.id === "photo-08");
const heroTrail = galleryMedia.find(item => item.id === "photo-15");
const subscribeVisibility = listener => {
  document.addEventListener("visibilitychange", listener);
  return () => document.removeEventListener("visibilitychange", listener);
};
const pageVisible = () => !document.hidden;
const motionQuery = "(prefers-reduced-motion: reduce)";
const getReducedMotion = () => window.matchMedia(motionQuery).matches;
const subscribeReducedMotion = listener => {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
};

function tilt(event, reduced) {
  if (reduced || event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (min-width: 768px)").matches) return;
  const box = event.currentTarget.getBoundingClientRect();
  const x = Math.max(-1, Math.min(1, (event.clientX - box.left) / box.width * 2 - 1));
  const y = Math.max(-1, Math.min(1, (event.clientY - box.top) / box.height * 2 - 1));
  event.currentTarget.style.setProperty("--tilt-x", `${-y * 4}deg`);
  event.currentTarget.style.setProperty("--tilt-y", `${x * 4}deg`);
}
function resetTilt(event) {
  event.currentTarget.style.removeProperty("--tilt-x");
  event.currentTarget.style.removeProperty("--tilt-y");
}

function InlineFilm({ item, paused, reduced }) {
  const player = useRef(null);
  const inView = useInView(player, { amount: 0.2 });
  const visible = useSyncExternalStore(subscribeVisibility, pageVisible, () => true);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const active = inView && visible && !paused && !reduced && !failed;
  useEffect(() => {
    const video = player.current;
    if (active) {
      // Attach local media only when needed; retain it for a smooth return visit.
      if (!video.getAttribute("src")) video.setAttribute("src", item.src);
      video.play().catch(() => { /* Browser autoplay restrictions leave the poster available. */ });
    } else video.pause();
    return () => video.pause();
  }, [active, item.src]);

  return <>
    <img className="fl-gallery__film-poster" src={item.poster} width="640" height={Math.round(640 * item.height / item.width)} alt="" loading="lazy" />
    <video ref={player} className="fl-gallery__inline-film" muted loop playsInline preload="none" poster={item.poster} tabIndex={-1} aria-hidden="true" data-failed={failed}
      onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => { setFailed(true); setPlaying(false); }} />
    {!playing && <span className="fl-gallery__play"><Play size={24} fill="currentColor" aria-hidden="true" /></span>}
    <span className="fl-gallery__film-status" data-playing={playing}><i aria-hidden="true" />{playing ? "Playing preview" : "Travel film"}</span>
  </>;
}
const durationLabel = seconds => {
  const rounded = Math.round(seconds);
  return Math.floor(rounded / 60) + ":" + String(rounded % 60).padStart(2, "0");
};

function FullMedia({ item }) {
  const player = useRef(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const video = player.current;
    return () => video?.pause();
  }, []);
  if (failed) return <div className="fl-gallery__media-error" role="status"><Camera size={28} aria-hidden="true" /><p>This moment could not be loaded. You can try opening the original file below.</p></div>;
  if (item.type === "video") return <video ref={player} className="fl-gallery__full-media" controls playsInline preload="metadata" poster={item.poster} aria-label={item.alt} onError={() => setFailed(true)}>
    <source src={item.src} type="video/mp4" />Your browser cannot play this film. Use the original file link below.
  </video>;
  return <img className="fl-gallery__full-media" src={item.src} width={item.width} height={item.height} alt={item.alt} onError={() => setFailed(true)} />;
}

function GalleryViewer({ item, index, total, onClose, onStep, returnFocus }) {
  const dialog = useRef(null);
  const titleId = useId();
  useEffect(() => {
    const element = dialog.current;
    const trigger = returnFocus.current;
    const previous = document.body.style.overflow;
    const priority = document.body.style.getPropertyPriority("overflow");
    element.showModal();
    document.body.style.setProperty("overflow", "hidden");
    return () => {
      element.close();
      if (previous) document.body.style.setProperty("overflow", previous, priority);
      else document.body.style.removeProperty("overflow");
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [returnFocus]);

  return <dialog ref={dialog} className="fl-gallery__dialog" aria-labelledby={titleId}
    onCancel={event => { event.preventDefault(); onClose(); }}
    onClick={event => { if (event.target === event.currentTarget) onClose(); }}
    onKeyDown={event => {
      if (event.target.tagName === "VIDEO" || event.altKey || event.metaKey || event.ctrlKey) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        onStep(event.key === "ArrowLeft" ? -1 : 1);
      }
    }}>
    <div className="fl-gallery__viewer">
      <header className="fl-gallery__viewer-heading"><div><p>{item.type === "video" ? "TRAVEL FILM" : "FROM THE ALBUM"}</p><h2 id={titleId}>{item.title}</h2></div><button type="button" className="fl-gallery__icon-button" onClick={onClose} aria-label="Close full-screen viewer" autoFocus><X size={21} aria-hidden="true" /></button></header>
      <div className="fl-gallery__viewer-media"><FullMedia key={item.id} item={item} /></div>
      <footer className="fl-gallery__viewer-footer">
        <a href={item.src} target="_blank" rel="noopener noreferrer">Open original <ArrowUpRight size={14} aria-hidden="true" /></a>
        <div className="fl-gallery__viewer-controls"><button type="button" className="fl-gallery__icon-button" onClick={() => onStep(-1)} disabled={total < 2} aria-label="Previous moment"><ArrowLeft size={18} aria-hidden="true" /></button><span aria-live="polite">{index + 1} / {total}</span><button type="button" className="fl-gallery__icon-button" onClick={() => onStep(1)} disabled={total < 2} aria-label="Next moment"><ArrowRight size={18} aria-hidden="true" /></button></div>
      </footer>
    </div>
  </dialog>;
}

function MomentCard({ item, number, onOpen, reduced, paused }) {
  const [failed, setFailed] = useState(false);
  return <Motion.div className="fl-gallery__card-shell" onPointerMove={event => tilt(event, reduced)} onPointerLeave={resetTilt}
    initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: reduced ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}>
    <button type="button" className={"fl-gallery__card fl-gallery__card--" + item.type}
    aria-label={"View " + (item.type === "video" ? "film: " : "photo: ") + item.alt}
    onClick={event => onOpen(item.id, event.currentTarget)}>
    <div className="fl-gallery__card-media">
      {item.type === "video" ? <InlineFilm item={item} paused={paused} reduced={reduced} /> : failed ? <div className="fl-gallery__thumbnail-error"><Camera size={24} aria-hidden="true" /><span>Open moment</span></div> : <img src={item.src} width={item.width} height={item.height} alt={item.alt} loading="lazy" decoding="async" onError={() => setFailed(true)} />}
      <span className="fl-gallery__card-number">{String(number).padStart(2, "0")}</span>
      {item.type === "video" && <span className="fl-gallery__duration">{durationLabel(item.duration)}</span>}
    </div>
    <div className="fl-gallery__card-caption"><div><small>{item.type === "video" ? "IN MOTION" : "FROM THE JOURNEY"}</small><span>{item.title}</span></div>{item.type === "video" ? <Film size={16} aria-hidden="true" /> : <ArrowUpRight size={16} aria-hidden="true" />}</div>
  </button></Motion.div>;
}

export default function GalleryPage() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const returnFocus = useRef(null);
  const reduced = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => true);
  const visible = galleryMedia.filter(item => filter === "all" || item.type === filter);
  const selectedIndex = visible.findIndex(item => item.id === selected);
  const open = (id, trigger) => { returnFocus.current = trigger; setSelected(id); };
  const step = direction => setSelected(visible[(selectedIndex + direction + visible.length) % visible.length].id);

  return <main className="fl-gallery" data-fl-scroll-reveal="off">
    <SEO title="Travel Moments — Our Travellers' Gallery" description="Photographs, shared smiles and travel films from journeys with FlyingLyte. Explore our travellers' favourite moments." canonical="https://www.flyinglyte.com/gallery" image={heroMain.src} />
    <div className="fl-gallery__wrap">
      <header className="fl-gallery__hero">
        <Motion.div className="fl-gallery__hero-copy" initial={reduced ? false : { opacity: 0.4, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.7 }}>
          <p className="fl-gallery__eyebrow"><span /> THE FLYINGLYTE TRAVEL ALBUM</p>
          <h1>Every journey.<br /><span>A story to keep.</span></h1>
          <p className="fl-gallery__lead">Big landscapes. Little moments.<br />The people who make it all matter.</p>
          <p>From quiet lakeside mornings to the open road, these are the moments our travellers brought home.</p>
          <div className="fl-gallery__hero-meta"><span><Camera size={15} aria-hidden="true" />{photoCount} photographs</span><span><Film size={15} aria-hidden="true" />{filmCount} travel films</span></div>
          <div className="fl-gallery__hero-actions"><a className="fl-gallery__album-link" href="#moments-album" onClick={() => setFilter("all")}>Explore the album <ArrowDown size={16} aria-hidden="true" /></a><a className="fl-gallery__watch-link" href="#moments-album" onClick={() => setFilter("video")}><Play size={15} aria-hidden="true" />Watch the films</a></div>
        </Motion.div>
        <Motion.div className="fl-gallery__hero-art" aria-hidden="true" initial={reduced ? false : { opacity: 0.4, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.1 }}>
          <div className="fl-gallery__scene" onPointerMove={event => tilt(event, reduced)} onPointerLeave={resetTilt}>
            <div className="fl-gallery__scene-core">
              <figure className="fl-gallery__print fl-gallery__print--lake"><img src={heroMain.src} width={heroMain.width} height={heroMain.height} alt="" fetchPriority="high" /><figcaption>01 / LIFE BY THE WATER</figcaption></figure>
              <figure className="fl-gallery__print fl-gallery__print--portrait"><img src={heroPortrait.src} width={heroPortrait.width} height={heroPortrait.height} alt="" /><figcaption>02 / A LITTLE HIGHER</figcaption></figure>
              <figure className="fl-gallery__print fl-gallery__print--trail"><img src={heroTrail.src} width={heroTrail.width} height={heroTrail.height} alt="" /><figcaption>03 / BETTER TOGETHER</figcaption></figure>
              <span className="fl-gallery__scene-note"><Camera size={18} /><span>Real people.<br /><strong>Remarkable memories.</strong></span></span>
            </div>
          </div>
        </Motion.div>
      </header>

      <section id="moments-album" className="fl-gallery__album" aria-labelledby="moments-album-title">
        <div className="fl-gallery__album-heading"><div><p className="fl-gallery__eyebrow">COLLECTED ALONG THE WAY</p><h2 id="moments-album-title">Small moments. <span>Big stories.</span></h2><p className="fl-gallery__album-intro">A window into the journeys we share.</p></div><p className="fl-gallery__count" role="status" aria-live="polite"><strong>{String(visible.length).padStart(2, "0")}</strong>{filter === "video" ? "travel films" : filter === "photo" ? "photographs" : "moments to explore"}</p></div>
        <div className="fl-gallery__filters" role="group" aria-label="Filter travel moments">{filters.map(([value, label, count]) => <button type="button" key={value} aria-pressed={filter === value} onClick={() => { setFilter(value); setSelected(null); }}>{label}<span>{count}</span></button>)}</div>
        <div key={filter} className="fl-gallery__grid" data-filter={filter}>{visible.map(item => <MomentCard key={item.id} item={item} number={galleryMedia.indexOf(item) + 1} onOpen={open} reduced={reduced} paused={selected !== null} />)}</div>
      </section>

      <section className="fl-gallery__closing" aria-labelledby="gallery-next-journey"><div><p className="fl-gallery__eyebrow">YOUR STORY IS NEXT</p><h2 id="gallery-next-journey">Make room for your next memory.</h2><p>Find a journey that feels like you.</p></div><Link to="/packages">Explore holiday packages <ArrowUpRight size={17} aria-hidden="true" /></Link></section>
    </div>
    {selectedIndex >= 0 && <GalleryViewer item={visible[selectedIndex]} index={selectedIndex} total={visible.length} onClose={() => setSelected(null)} onStep={step} returnFocus={returnFocus} />}
  </main>;
}
