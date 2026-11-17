import { useId, useLayoutEffect, useSyncExternalStore } from "react";
import { useLocation } from "react-router-dom";
import { resolveSeasonalCampaign, seasonalConfig } from "./seasonalConfig";
import "./SeasonalWelcome.css";

function SantaSleigh() {
  const id = useId();
  return <svg className="fl-seasonal__sleigh" viewBox="0 0 700 220" width="700" height="220" focusable="false" aria-hidden="true">
    <defs><g id={id + "-deer"} fill="currentColor">
      <path d="M25 107q16-22 43-15l18 9 14-34 10-10 11 4-4 10-13 4-9 38-21 8-33-3-20 17-23 15-4-5 25-26Z" />
      <path d="m38 117 16 19 27 6-1 6-32-5-21-19m53-11 20 14 21-6 2 6-25 9-23-12M26 105 8 91l-3 4 14 20M107 63l-4-23-8-11 4-3 10 12 3 21m-6-15-13 1-6-9 4-2 5 6 11-2m3 0 10-12-1-9 4-1 3 11-12 15" />
    </g></defs>
    <g fill="none" stroke="currentColor" strokeWidth="1.1" opacity=".65"><path d="M180 139Q350 149 471 84M175 145Q363 166 582 63" /></g>
    <g fill="currentColor">
      <path d="M50 127q13 16 35 12h82q22-4 31-30l10 4q-2 47-43 55H81q-32-4-39-38Z" />
      <path d="M64 173h116q29-1 34-26l7 2q-6 33-39 33H66q-27 0-33-16l6-3q6 10 25 10Z" />
      <path d="M80 161v15h7v-15m76-1v16h7v-18M99 123q-5-24 5-38l20-3q23 11 22 41l19 7-3 9-32-8-11-20-4 25H93Z" />
      <circle cx="119" cy="68" r="13" /><path d="m107 57 3-13q9-12 27-5l11 9-20-2-9 15Zm21 13 12 4-12 4-7 9-5-13Z" />
      <circle cx="150" cy="49" r="4" /><path d="M72 101h19v29H67v-21Zm-11 11h14v20H55v-14Z" />
    </g>
    <use href={"#" + id + "-deer"} transform="translate(365 -4) rotate(-8 80 100)" />
    <use href={"#" + id + "-deer"} transform="translate(495 -25) rotate(-8 80 100)" />
    <path d="M6 194q78 18 182-5" fill="none" stroke="currentColor" strokeWidth="1" opacity=".3" />
  </svg>;
}

function ChristmasScene() {
  const id = useId();
  const boughs = [[240,80,.27],[240,127,.36],[240,180,.46],[240,239,.57],[240,304,.69],[240,376,.81],[240,450,.93],[240,525,1.05]];
  const ornaments = [[235,135,6],[265,182,8],[212,226,9],[283,268,7],[179,290,9],[239,324,10],[309,351,11],[188,384,7],[139,422,10],[257,430,12],[334,457,8],[203,479,11],[118,522,9],[291,531,13],[371,549,8],[206,571,10]];
  return <>
    <div className="fl-seasonal__halo" />
    <svg className="fl-seasonal__tree fl-seasonal__visual" viewBox="0 0 480 680" width="480" height="680" focusable="false" aria-hidden="true">
      <defs>
        <linearGradient id={id + "-tree"} x1="0" x2="1"><stop stopColor="var(--sw-tree-shadow)" /><stop offset=".38" stopColor="var(--sw-tree)" /><stop offset=".55" stopColor="var(--sw-tree-light)" /><stop offset=".72" stopColor="var(--sw-tree)" /><stop offset="1" stopColor="var(--sw-tree-shadow)" /></linearGradient>
        <radialGradient id={id + "-gold"} cx=".3" cy=".22"><stop stopColor="#fff9e5" /><stop offset=".3" stopColor="#f2d89d" /><stop offset=".7" stopColor="#c39c52" /><stop offset="1" stopColor="#796034" /></radialGradient>
        <radialGradient id={id + "-silver"} cx=".3" cy=".2"><stop stopColor="#ffffff" /><stop offset=".6" stopColor="#d8dcd3" /><stop offset="1" stopColor="#8a9a94" /></radialGradient>
        <linearGradient id={id + "-trunk"}><stop stopColor="#483c2b" /><stop offset=".5" stopColor="#96784b" /><stop offset="1" stopColor="#55402a" /></linearGradient>
        <g id={id + "-bough"}>
          <path d="M0-83q-30 47-66 76l12-2-42 37 13-3-43 33 13-1-44 31 19-2-50 30q33 3 61-9l-8 8 53-11-7 8 63-12-5 8 45-10 13 6 13-6 45 10-5-8 63 12-7-8 53 11-8-8q28 12 61 9l-50-30 19 2-44-31 13 1-43-33 13 3-42-37 12 2Q30-36 0-83Z" fill={"url(#" + id + "-tree)"} />
          <g fill="none" stroke="var(--sw-tree-edge)" strokeWidth=".9" opacity=".58"><path d="M0-60v164M0-26-42 18m42-1 44 31M0 20-75 69m75-24 92 41M0 68-119 101m119-7 126 18M-42 18l-14-1m13 0 1-14M44 48l15-1m-16 0-1-13M-75 69l-18 1m19-2-2-16M92 86l19-1m-20 0 1-16M-118 101l-18 1m19-1-2-14" /></g>
        </g>
      </defs>
      <ellipse cx="240" cy="647" rx="191" ry="18" fill="var(--sw-shadow)" />
      <path d="M224 550h32v88h-32Z" fill={"url(#" + id + "-trunk)"} />
      {[...boughs].reverse().map(([x,y,scale]) => <use key={y} href={"#" + id + "-bough"} transform={"translate(" + x + " " + y + ") scale(" + scale + ")"} />)}
      <g fill="none" stroke="var(--sw-gold)" strokeWidth="1.8" opacity=".72"><path d="M220 150q18 20 46 19M196 242q45 28 96 12M173 338q63 28 144 14M144 442q92 38 205 13M110 547q128 45 260 15" /></g>
      <g fill={"url(#" + id + "-gold)"}>{ornaments.map(([cx,cy,r],index) => <g key={cy}><path d={"M" + cx + " " + (cy-r-9) + "v9"} stroke="var(--sw-gold)" strokeWidth=".65" /><circle cx={cx} cy={cy} r={r} fill={"url(#" + id + (index%3===0 ? "-silver)" : "-gold)")} /></g>)}</g>
      <g className="fl-seasonal__tree-lights" fill="#ffe8ae">{[[228,180],[247,233],[199,328],[273,372],[164,467],[315,493],[235,550],[348,563]].map(([cx,cy]) => <circle key={cy} cx={cx} cy={cy} r="2.5" />)}</g>
      <path className="fl-seasonal__star" d="m240 24 8 20 22 2-17 14 5 22-18-12-18 12 5-22-17-14 22-2Z" fill={"url(#" + id + "-gold)"} />
      <g className="fl-seasonal__gift"><path d="m294 621 36-15 40 15-38 17Z" fill="#ecd6a6" /><path d="m294 621 38 17v35l-38-17Z" fill="#9e7d45" /><path d="m332 638 38-17v36l-38 16Z" fill="#cfab64" /><path d="m310 614 39 16v35m4-52-39 17v35" fill="none" stroke="#f5e4be" strokeWidth="5" /></g>
    </svg>
    <SantaSleigh />
  </>;
}

function NewYearScene({ year }) {
  return <>
    <div className="fl-seasonal__halo" />
    <svg className="fl-seasonal__fireworks" viewBox="0 0 1600 900" width="1600" height="900" preserveAspectRatio="xMidYMid slice" focusable="false" aria-hidden="true">
      {[[300,215,1],[1240,180,.8],[1365,585,.55]].map(([x,y,scale],index) => <g key={x} transform={"translate(" + x + " " + y + ") scale(" + scale + ")"} className="fl-seasonal__firework" style={{ "--sw-burst": index }}>
        <g fill="none" stroke="var(--sw-gold)" strokeWidth="1.3" strokeLinecap="round">{Array.from({length:16},(_,angle) => <path key={angle} d="M0-42v-35m0-12v-7" transform={"rotate(" + angle*22.5 + ")"} />)}</g>
        <g fill="var(--sw-silver)"><circle cx="20" cy="-112" r="2" /><circle cx="-91" cy="48" r="2.5" /><circle cx="82" cy="65" r="1.8" /></g>
      </g>)}
    </svg>
    <div className="fl-seasonal__new-year fl-seasonal__visual"><div className="fl-seasonal__year"><span>{year}</span><strong>{year}</strong></div><p>A WORLD OF POSSIBILITIES</p></div>
  </>;
}

function WinterLandscape() {
  return <svg className="fl-seasonal__landscape" viewBox="0 0 1600 300" width="1600" height="300" preserveAspectRatio="none" focusable="false" aria-hidden="true">
    <path d="M0 128Q230 54 465 142T970 113q300-90 630-18v205H0Z" fill="var(--sw-drift-back)" />
    <g fill="var(--sw-pine)" opacity=".6">{[[80,90,1],[145,135,.6],[1450,80,1.2],[1515,115,.85],[1360,145,.5]].map(([x,y,s]) => <path key={x} d="m0-65-18 31h8L-28-2h12l-22 35h76L16-2h12L10-34h8Z" transform={"translate(" + x + " " + y + ") scale(" + s + ")"} />)}</g>
    <path d="M0 209q240-63 510-18t513-13q277-48 577 24v98H0Z" fill="var(--sw-drift-front)" />
  </svg>;
}

// Add future festival renderers here; application routes and workflows stay separate.
const scenes = { christmas: ChristmasScene, newYear: NewYearScene };
const listeners = new Set();
let evaluated = false;
let record = null;
let snapshot = null;
let stopResources = null;
const publish = value => { snapshot = value; listeners.forEach(listener => listener()); };

function developmentPreview() {
  if (!import.meta.env.DEV) return undefined;
  const value = new URLSearchParams(window.location.search).get("seasonalPreview");
  return ["christmas", "newYear", "none"].includes(value) ? value : undefined;
}

function resumeDocumentWelcome() {
  if (!evaluated) {
    evaluated = true;
    // Only a document opened on Home is eligible, never an internal Home visit.
    if (window.location.pathname !== "/") return;
    const campaign = resolveSeasonalCampaign(new Date(), seasonalConfig, developmentPreview());
    if (campaign && Object.prototype.hasOwnProperty.call(scenes, campaign.festival)) record = { ...campaign, startedAt: null, finished: false };
  }
  if (!record || record.finished) return;
  let timer;
  let observer;
  let stopped = false;
  const cleanup = () => {
    stopped = true;
    window.clearTimeout(timer);
    observer?.disconnect();
    document.removeEventListener("visibilitychange", visibility);
    window.removeEventListener("pagehide", finish);
    window.removeEventListener("pageshow", resume);
  };
  const finish = () => {
    record.finished = true;
    cleanup();
    publish(null);
  };
  const visibility = () => { if (document.hidden) finish(); else resume(); };
  const resume = () => { if (record.finished || (record.startedAt !== null && performance.now() - record.startedAt >= record.duration)) finish(); };
  const begin = () => {
    if (stopped || record.finished) return;
    observer?.disconnect();
    if (record.startedAt === null) record.startedAt = performance.now();
    const elapsed = performance.now() - record.startedAt;
    if (elapsed >= record.duration || document.hidden) { finish(); return; }
    publish({ festival: record.festival, year: record.year, duration: record.duration, elapsed, waiting: false });
    timer = window.setTimeout(finish, record.duration - elapsed);
  };
  stopResources = cleanup;
  if (document.hidden) { finish(); return; }
  document.addEventListener("visibilitychange", visibility);
  window.addEventListener("pagehide", finish);
  window.addEventListener("pageshow", resume);
  // Prepare an opaque scene underneath the retained intro before it fades out.
  // Keep its animation clock paused until the legacy intro has fully finished.
  if (record.startedAt === null && document.querySelector(".fl-brand-intro")) {
    publish({ festival: record.festival, year: record.year, duration: record.duration, elapsed: 0, waiting: true });
    observer = new MutationObserver(() => { if (!document.querySelector(".fl-brand-intro")) begin(); });
    observer.observe(document.body, { childList: true, subtree: true });
  } else begin();
}

function subscribe(listener) {
  listeners.add(listener);
  if (listeners.size === 1) resumeDocumentWelcome();
  return () => {
    listeners.delete(listener);
    if (!listeners.size) {
      stopResources?.();
      stopResources = null;
      snapshot = null;
    }
  };
}
const getSnapshot = () => snapshot;
const getServerSnapshot = () => null;
const complete = () => {
  if (record) record.finished = true;
  stopResources?.();
  publish(null);
};

function SeasonalPlayer() {
  const campaign = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    // Stop pending or playing intros before another route is painted.
    if (pathname !== "/") complete();
  }, [pathname]);
  if (!campaign || pathname !== "/") return null;
  const Scene = scenes[campaign.festival];
  const christmas = campaign.festival === "christmas";
  return <div className="fl-seasonal-welcome" data-festival={campaign.festival} data-phase={campaign.waiting ? "waiting" : "playing"} aria-hidden="true" inert
    style={{ position: "fixed", inset: 0, zIndex: 1000, pointerEvents: "none", overflow: "hidden", "--sw-duration": campaign.duration + "ms", "--sw-delay": -campaign.elapsed + "ms" }}>
    <div className="fl-seasonal__stage" onAnimationEnd={event => { if (event.target === event.currentTarget && ["fl-seasonal-life", "fl-seasonal-still"].includes(event.animationName)) complete(); }}>
      <WinterLandscape />
      <div className="fl-seasonal__stars">{Array.from({ length: 18 }, (_, index) => <i key={index} style={{ "--sw-x": (index * 47 + 3) % 100 + "%", "--sw-y": (index * 23 + 9) % 74 + "%", "--sw-n": index }} />)}</div>
      <div className="fl-seasonal__particles">{Array.from({ length: christmas ? 42 : 32 }, (_, index) => <i key={index} style={{ "--sw-x": (index * 43 + 7) % 100 + "%", "--sw-y": (index * 31) % 100 + "%", "--sw-depth": (index % 3) * 14 + "px", "--sw-n": index }} />)}</div>
      <div className="fl-seasonal__wordmark">FLYINGLYTE<span>GO A LITTLE FURTHER</span></div>
      <Scene year={campaign.year} />
      <div className="fl-seasonal__copy"><p className="fl-seasonal__eyebrow">A LITTLE SEASONAL JOY</p><h2>{christmas ? "Merry" : "Happy"}<strong>{christmas ? "Christmas" : "New Year"}</strong></h2><p className="fl-seasonal__message">{christmas ? "Celebrate the Journey with FlyingLyte" : "New Year. New Destinations. New Memories."}</p></div>
      <p className="fl-seasonal__signature">A season to wonder. A world to discover.</p>
    </div>
  </div>;
}

export default function SeasonalWelcome() {
  // No subscription, timers, observers, storage or DOM mutations when disabled.
  return seasonalConfig.enabled ? <SeasonalPlayer /> : null;
}
