import { useEffect, useState } from "react";
import { AnimatePresence, motion as Motion, useReducedMotion } from "framer-motion";
import SearchBox from "../../modules/Search/SearchBox";
import EditorialArtwork from "./EditorialArtwork";

const travelPhrases = [
  { text: "To Explore", light: "#294c3e", dark: "#bcd7b0" },
  { text: "To Discover", light: "#215f75", dark: "#91cee0" },
  { text: "To Escape", light: "#8a4b35", dark: "#efb49a" },
  { text: "To Wander", light: "#725b91", dark: "#ccb7ec" },
  { text: "To Unwind", light: "#6f6334", dark: "#e2c48b" },
  { text: "To Connect", light: "#35645e", dark: "#a3d8cd" },
];

// Keep the rotating copy independent of the live search form's render cycle.
function RotatingTravelLine() {
  const [activePhrase, setActivePhrase] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActivePhrase(index => (index + 1) % travelPhrases.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  const phrase = travelPhrases[activePhrase];
  return (
    <span className="fl-hero__emphasis fl-hero__rotator mt-0.5 sm:mt-1" aria-hidden="true">
      <AnimatePresence initial={false} mode="wait">
        <Motion.span
          key={phrase.text}
          className="fl-hero__phrase"
          style={{ "--fl-phrase-light": phrase.light, "--fl-phrase-dark": phrase.dark }}
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reducedMotion ? 0 : -10, transition: { duration: reducedMotion ? 0 : 0.16 } }}
          transition={{ duration: reducedMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          {phrase.text}
        </Motion.span>
      </AnimatePresence>
    </span>
  );
}

const HeroSection = () => (
  <section className="fl-hero fl-parity-home" data-fl-theme="model2">
    <div className="fl-parity-hero-grid">
      <div className="fl-hero__copy">
        <p className="fl-parity-eyebrow">Premium Flights, Hotels & Holiday Tour Packages</p>
          <h1 className="fl-hero__title text-[30px] font-semibold leading-[0.95] tracking-tight sm:text-4xl md:text-5xl lg:text-5xl">
            <span className="fl-hero__lead block text-[#FFF8E8]">A Higher Way</span>{" "}
            <RotatingTravelLine />
            <span className="sr-only">To Explore</span>
            <span className="sr-only"> - Premium Flights, Hotels & Holiday Tour Packages</span>
          </h1>
          <p className="fl-parity-intro">Some trips fill your camera roll. The best ones fill your soul. Let’s find the one that feels like you.</p>

          {/* DIVIDER */}
          <div className="fl-hero__divider mt-2 flex items-center justify-center gap-2.5 sm:gap-4">
            <span className="fl-hero__rule--start h-px w-10 bg-linear-to-r from-transparent to-[#E6B35C]/70 sm:w-16" />

            <span aria-hidden="true" className="fl-hero__symbol text-base text-[#E6B35C] sm:text-xl">
              ✈
            </span>

            <span className="fl-hero__rule--end h-px w-10 bg-linear-to-l from-transparent to-[#E6B35C]/70 sm:w-16" />
          </div>
          <p className="fl-hero__note">*100% Cash Booking Available</p>
        <a className="fl-parity-action" href="#home-search">Find your next journey <span aria-hidden="true">↗</span></a>
      </div>
      <EditorialArtwork image="/images/model2-home.avif" detail="/images/model2-coast.avif" alt="Sunlit white architecture beside the blue sea in Santorini" />
    </div>
    <div id="home-search" className="fl-parity-search"><SearchBox appearance="home-model2" /></div>
  </section>
);
export default HeroSection;
