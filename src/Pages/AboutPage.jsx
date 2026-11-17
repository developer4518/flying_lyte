import { Link } from "react-router-dom";
import { motion as Motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown, ArrowUpRight, Calendar, Check, Compass, Globe,
  HeartHandshake, Hotel, Layers3, MessageCircle, Package, Plane,
} from "lucide-react";
import SEO from "../components/SEO";
import TestimonialsSection from "./TestimonialsSection";
import "./AboutPage.css";

const services = [
  { title: "Flight Search", text: "Compare flights from leading global airlines and find an option that fits your plans.", to: "/flights", Icon: Plane },
  { title: "Hotel Stays", text: "Discover places to stay, from a quick city break to a well-earned escape.", to: "/hotels", Icon: Hotel },
  { title: "Holiday Packages", text: "Bring your destination, stays and experiences together in one thoughtful itinerary.", to: "/packages", Icon: Package },
  { title: "Customized Travel Planning", text: "Share your destination, dates and requirements with our travel experts.", to: "/contact", Icon: Compass },
  { title: "Exclusive Travel Deals", text: "Explore available travel deals and discover more possibilities for your next trip.", to: "/packages", Icon: Globe },
  { title: "Manage Bookings", text: "Keep your booking details and itineraries together, ready when you need them.", to: "/bookings", Icon: Calendar },
];

const steps = [
  { title: "Tell us what matters.", text: "Start with your destination, dates and the kind of journey you have in mind." },
  { title: "Explore the details.", text: "Consider your travel options, review the information and choose what suits your plans." },
  { title: "Bring it all together.", text: "Keep your itinerary close and reach out to our team when you need help with a travel question." },
];

const values = [
  { Icon: Layers3, title: "A connected experience", text: "Flights, stays and holidays in one place, making the bigger picture easier to plan." },
  { Icon: Compass, title: "Room for your preferences", text: "A family escape, a city break or a business trip. Your priorities shape the journey." },
  { Icon: HeartHandshake, title: "People you can speak to", text: "Questions deserve a conversation. Our team is here to listen and help you consider your next step." },
];

const chapters = [
  ["01", "Our story", "our-story"],
  ["02", "What we do", "our-services"],
  ["03", "Our approach", "our-approach"],
  ["04", "Our values", "why-flyinglyte"],
];

function AboutImage({ label, reducedMotion, ...imageProps }) {
  return (
    <div className="fl-about-studio__image-window">
      <Motion.img
        {...imageProps}
        initial={reducedMotion ? false : { scale: 1.065 }}
        whileInView={{ scale: 1 }}
        whileHover={reducedMotion ? undefined : { scale: 1.025 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: reducedMotion ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
      <span className="fl-about-studio__photo-label"><Compass size={13} aria-hidden="true" />{label}</span>
    </div>
  );
}

export default function AboutPage() {
  const reducedMotion = useReducedMotion();
  const reveal = {
    initial: reducedMotion ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: reducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <div className="fl-about-page fl-about-studio" data-fl-theme="model2">
      <SEO
        title="About Us - Elevating The Way The World Travels"
        description="Learn more about FlyingLyte, our vision, mission, and how we bring flight search, hotel stays and holiday planning together."
        canonical="https://www.flyinglyte.com/about"
      />
      <header className="fl-about-studio__hero fl-about-studio__wrap">
        <Motion.div {...reveal} className="fl-about-studio__hero-copy">
          <p className="fl-about-studio__eyebrow"><span /> ABOUT FLYINGLYTE</p>
          <h1 className="fl-about-studio__title">A world to explore.<br /><em>A journey<br />that's yours.</em></h1>
          <p className="fl-about-studio__intro">Thoughtful travel starts with understanding what matters to you.</p>
          <p>We bring flights, stays and holiday experiences together, with space for your preferences and a team you can talk to along the way.</p>
          <div className="fl-about-studio__actions">
            <Link to="/contact" className="fl-about-studio__button">Meet your next journey <ArrowUpRight size={18} aria-hidden="true" /></Link>
            <a href="#our-story" className="fl-about-studio__quiet-link">Discover our story <ArrowDown size={16} aria-hidden="true" /></a>
          </div>
          <div className="fl-about-studio__hero-foot"><Compass size={18} aria-hidden="true" /><span>More curiosity. More possibility.</span></div>
        </Motion.div>
        <Motion.figure {...reveal} className="fl-about-studio__hero-photo">
          <AboutImage label="01 / A FRESH PERSPECTIVE" reducedMotion={reducedMotion} src="/images/about-journey/alpine-perspective.webp" alt="Lauterbrunnen Valley and Alpine peaks viewed from Wengen, Switzerland" width="1600" height="1076" fetchPriority="high" decoding="async" />
          <figcaption><span>THE JOY OF GOING SOMEWHERE NEW</span><span>Wengen, Switzerland <ArrowUpRight size={15} aria-hidden="true" /></span></figcaption>
        </Motion.figure>
      </header>

      <nav className="fl-about-studio__chapters fl-about-studio__wrap" aria-label="Explore the About Us page">
        {chapters.map(([number, label, id]) => <a href={`#${id}`} key={id}><span>{number}</span>{label}<ArrowDown size={15} aria-hidden="true" /></a>)}
      </nav>

      <section id="our-story" aria-labelledby="about-story-title" className="fl-about-studio__section fl-about-studio__wrap">
        <Motion.div {...reveal} className="fl-about-studio__section-head">
          <p className="fl-about-studio__eyebrow">01 / OUR STORY</p>
          <h2 id="about-story-title">Bringing the world<br /><em>a little closer.</em></h2>
          <p>FlyingLyte is built around a simple idea: arranging a journey should leave you looking forward to it.</p>
        </Motion.div>
        <div className="fl-about-studio__story-grid">
          <Motion.figure {...reveal} className="fl-about-studio__story-photo">
            <AboutImage label="02 / CLOSER TO CULTURE" reducedMotion={reducedMotion} src="/images/about-journey/udaipur-lake.webp" alt="Udaipur's lakeside architecture reflected in Lake Pichola in warm afternoon light" width="1200" height="551" loading="lazy" decoding="async" />
            <figcaption><span>Closer to places. Closer to experiences.</span><span>Udaipur, India</span></figcaption>
          </Motion.figure>
          <Motion.div {...reveal} className="fl-about-studio__story-copy">
            <p className="fl-about-studio__lead">One platform.<br />Your kind of journey.</p>
            <p>We bring flight search, hotel stays and curated holiday packages into one place. From a weekend away to a longer escape, we help you consider the details around what matters to you.</p>
            <div className="fl-about-studio__purpose"><span>OUR MISSION</span><p>Make discovering and planning travel more straightforward, with useful information and personal support.</p></div>
            <div className="fl-about-studio__purpose"><span>OUR VISION</span><p>A more connected travel experience, where technology and people help you move from an idea to a considered plan.</p></div>
          </Motion.div>
        </div>
        <Motion.aside {...reveal} className="fl-about-studio__owner" aria-labelledby="about-owner-name">
          <span className="fl-about-studio__owner-monogram" aria-hidden="true">SJ</span>
          <div>
            <p className="fl-about-studio__eyebrow">THE PERSON BEHIND FLYINGLYTE</p>
            <h3 id="about-owner-name">Samaksh Jain</h3>
            <p className="fl-about-studio__owner-role">Owner, FlyingLyte</p>
          </div>
          <div className="fl-about-studio__owner-copy">
            <p>FlyingLyte is owned by Samaksh Jain. Explore our travel services or speak with our team about the journey you have in mind.</p>
            <Link to="/contact" className="fl-about-studio__quiet-link">Connect with our team <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </Motion.aside>
      </section>

      <section id="our-services" aria-labelledby="about-services-title" className="fl-about-studio__services-band">
        <div className="fl-about-studio__section fl-about-studio__wrap">
          <Motion.div {...reveal} className="fl-about-studio__section-head">
            <p className="fl-about-studio__eyebrow">02 / WHAT WE DO</p>
            <h2 id="about-services-title">The details, connected.<br /><em>The possibilities, open.</em></h2>
            <p>Choose a starting point for your next trip. We bring the different parts of travel within reach.</p>
          </Motion.div>
          <div className="fl-about-studio__services">
            {services.map(({ title, text, to, Icon }, index) => (
              <Motion.article {...reveal} key={title}>
                <Link to={to} className="fl-about-studio__service">
                  <div className="fl-about-studio__service-top"><Icon size={26} strokeWidth={1.4} aria-hidden="true" /><span>0{index + 1}</span></div>
                  <h3>{title}</h3><p>{text}</p>
                  <span className="fl-about-studio__service-link">Explore <span className="sr-only">{title}</span><ArrowUpRight size={17} aria-hidden="true" /></span>
                </Link>
              </Motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="our-approach" aria-labelledby="about-approach-title" className="fl-about-studio__approach-band">
        <div className="fl-about-studio__section fl-about-studio__wrap">
          <Motion.div {...reveal} className="fl-about-studio__approach-head">
            <div><p className="fl-about-studio__eyebrow">03 / OUR APPROACH</p><h2 id="about-approach-title">Your plans.<br /><em>Thoughtfully considered.</em></h2></div>
            <p>A clear starting point, time to explore and a human conversation when you need one.</p>
          </Motion.div>
          <ol className="fl-about-studio__steps">
            {steps.map(({ title, text }, index) => <Motion.li {...reveal} key={title}><span className="fl-about-studio__step-number">0{index + 1}</span><h3>{title}</h3><p>{text}</p></Motion.li>)}
          </ol>
          <Link to="/contact" className="fl-about-studio__light-link">Talk through your travel plans <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
      </section>

      <section id="why-flyinglyte" aria-labelledby="about-values-title" className="fl-about-studio__section fl-about-studio__wrap">
        <Motion.div {...reveal} className="fl-about-studio__section-head">
          <p className="fl-about-studio__eyebrow">04 / WHAT MATTERS TO US</p>
          <h2 id="about-values-title">Care in the details.<br /><em>Freedom in the journey.</em></h2>
          <p>These principles guide how we bring travel options and personal support together.</p>
        </Motion.div>
        <div className="fl-about-studio__values">
          {values.map(({ Icon, title, text }) => <Motion.article {...reveal} key={title}><Icon size={27} strokeWidth={1.4} aria-hidden="true" /><h3>{title}</h3><p>{text}</p><span><Check size={14} aria-hidden="true" /> THE FLYINGLYTE APPROACH</span></Motion.article>)}
        </div>
      </section>

      <section aria-labelledby="about-contact-title" className="fl-about-studio__closing fl-about-studio__wrap">
        <Motion.figure {...reveal} className="fl-about-studio__coast-photo">
          <AboutImage label="03 / FOLLOW YOUR CURIOSITY" reducedMotion={reducedMotion} src="/images/about-journey/amalfi-horizon.webp" alt="Atrani's coastal buildings, sailboats and blue sea on Italy's Amalfi Coast" width="1600" height="547" loading="lazy" decoding="async" />
          <figcaption>There is always another perspective to discover.</figcaption>
        </Motion.figure>
        <Motion.div {...reveal} className="fl-about-studio__closing-copy">
          <div><p className="fl-about-studio__eyebrow">YOUR NEXT CHAPTER</p><h2 id="about-contact-title">Where will your<br /><em>curiosity take you?</em></h2></div>
          <div><p>Bring your ideas. We will help you think through the details of your next journey.</p><div className="fl-about-studio__actions"><Link to="/contact" className="fl-about-studio__button">Start a conversation <MessageCircle size={17} aria-hidden="true" /></Link><Link to="/packages" className="fl-about-studio__quiet-link">Explore holidays <ArrowUpRight size={17} aria-hidden="true" /></Link></div></div>
        </Motion.div>
        <p className="fl-about-studio__credits"><a href="/images/about-journey/CREDITS.txt" target="_blank" rel="noopener noreferrer">Photography credits</a></p>
      </section>
      <TestimonialsSection />
    </div>
  );
}
