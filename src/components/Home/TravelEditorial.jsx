import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Compass, MapPin, Plane } from "lucide-react";
import { Link } from "react-router-dom";
import "./travel-editorial.css";

function Reveal({ children, className = "", delay = 0, direction }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: direction ? 0 : 22, x: direction === "left" ? -30 : direction === "right" ? 30 : 0 }}
    whileInView={{ opacity: 1, y: 0, x: 0 }} viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : delay, ease: [0.2, 0.7, 0.2, 1] }}>{children}</motion.div>;
}

const collage = "/images/model2-packages-collage.png";

export function PackageHero() {
  return <div className="fl-package-composition">
    <div className="fl-package-hero">
      <Reveal className="fl-package-hero__copy" direction="left">
        <p className="fl-travel-eyebrow">DOMESTIC &amp; INTERNATIONAL HOLIDAYS</p>
        <h1>Across India.<br />Around the world.<br /><em>Your kind of escape.</em></h1>
        <p>Explore domestic and international holiday packages, from India’s mountains and royal cities to tropical islands and European adventures.</p>
        <span className="fl-package-hero__note">Find your destination. Make it your own.</span>
      </Reveal>
      <Reveal className="fl-package-hero__art" direction="right" delay={0.1}>
        <div className="fl-package-hero__image"><img src={collage} alt="A travel collage of Indian landmarks, Alpine mountains, Paris and tropical islands" fetchPriority="high" /></div>
        <span className="fl-package-hero__location"><MapPin size={13} /> India &amp; beyond</span>
        <div className="fl-travel-pass">
          <div className="fl-travel-pass__top"><span>YOUR NEXT ADVENTURE</span><Plane size={17} /></div>
          <div className="fl-travel-pass__photos">
            <figure><img src={collage} alt="Indian palaces and the Taj Mahal" /><figcaption>INDIA</figcaption></figure>
            <figure><img src="/images/delhi-srinagar.webp" alt="A mountain landscape" /><figcaption>THE WORLD</figcaption></figure>
            <span aria-hidden="true"><Plane size={14} /></span>
          </div>
          <strong>Near or far.<br /><em>Go somewhere new.</em></strong>
          <div className="fl-travel-pass__bottom"><span>DOMESTIC + INTERNATIONAL</span><Compass size={22} /></div>
        </div>
      </Reveal>
    </div>
    <div className="fl-package-promises">
      {[
        [Compass, "Travel your way", "Explore flight, hotel and holiday package options."],
        [Plane, "Make it personal", "Ask about a customized trip shaped around your plans."],
        [Check, "Know your package", "Review itinerary details, inclusions and exclusions."],
      ].map(([Icon, title, text], index) => <Reveal key={title} delay={index * 0.1}>
        <Icon size={24} aria-hidden="true" /><div><strong>{title}</strong><p>{text}</p></div>
      </Reveal>)}
    </div>
  </div>;
}

export function TravelSteps() {
  return <section className="fl-travel-composition fl-travel-steps" data-fl-theme="model2" aria-labelledby="fl-travel-steps-title">
    <div className="fl-travel-steps__grid">
      <Reveal><p className="fl-travel-eyebrow">LESS PLANNING. MORE LIVING.</p><h2 id="fl-travel-steps-title">From “what if”<br />to <em>“we’re here.”</em></h2></Reveal>
      {[
        ["01", "Find your kind of somewhere", "Explore flights, hotels and holiday packages for your next journey."],
        ["02", "Make it your own", "Choose your travel dates and preferences, or ask us about a custom trip."],
        ["03", "Go make memories", "Review your travel details, confirm your choices, and get ready to go."],
      ].map(([number, title, text], index) => <Reveal className="fl-travel-step" key={number} delay={index * 0.12}>
        <span>{number}<ArrowUpRight size={20} aria-hidden="true" /></span><h3>{title}</h3><p>{text}</p>
      </Reveal>)}
    </div>
  </section>;
}

const MotionLink = motion.create(Link);

export function EscapePlanner({ onEnquire }) {
  const reduced = useReducedMotion();
  return <section className="fl-travel-composition fl-escape-planner" data-fl-theme="model2" aria-label="Plan your holiday">
    <div className="fl-escape-planner__banner">
      <Reveal className="fl-escape-planner__copy" direction="left">
        <p className="fl-travel-eyebrow">YOUR HOLIDAY. YOUR WAY.</p>
        <h2>Dreaming of a trip?<br /><em>Let’s make a plan.</em></h2>
        <p>Exclusive deals, seamless bookings, and unforgettable travel experiences. Tell us about the journey you have in mind.</p>
        <div className="fl-planner-postcards">
          {[
            ["Kashmir", "/images/delhi-srinagar.webp", "Mountain moments"],
            ["Dubai", "/images/delhi-dubai.webp", "A little city adventure"],
            ["Maldives", "/images/model2-island.avif", "A little ocean time"],
          ].map(([place, image, caption], index) => <MotionLink key={place} to={`/packages?destination=${encodeURIComponent(place)}`} style={{ "--fl-postcard": index }}
            initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : index * 0.12 }}>
            <img src={image} alt={place} loading="lazy" /><span><MapPin size={10} />{place}</span><small>{caption}</small>
          </MotionLink>)}
        </div>
        <ul>{["Flight, hotel and holiday package options", "A custom travel request shaped around your plans", "Help choosing your next destination"].map(text => <li key={text}><Check size={15} aria-hidden="true" />{text}</li>)}</ul>
      </Reveal>
      <Reveal className="fl-planner-panel" direction="right" delay={0.15}>
        <p className="fl-travel-eyebrow">A GREAT TRIP STARTS HERE</p>
        <span className="fl-planner-panel__icon"><Compass size={24} /></span>
        <h3>Craft Your Perfect Journey With Us</h3>
        <p>Start with your wish list. Add your destination, dates and requirements in our custom travel request.</p>
        <ol><li><span>01</span>Your travel plans</li><li><span>02</span>Your contact details</li><li><span>03</span>Connect with FlyingLyte on WhatsApp</li></ol>
        <button type="button" onClick={onEnquire}>Start Your Journey <ArrowUpRight size={19} /></button>
        <small>No booking or payment is made by opening the enquiry.</small>
      </Reveal>
    </div>
  </section>;
}
