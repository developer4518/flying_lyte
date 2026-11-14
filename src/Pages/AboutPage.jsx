import { Link } from "react-router-dom";
import { motion as Motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown, ArrowUpRight, Calendar, Check, Compass, Globe, Heart,
  Hotel, Layers3, MessageCircle, Package, Plane, Sparkles,
} from "lucide-react";
import SEO from "../components/SEO";
import "./AboutPage.css";

const services = [
  { title: "Flight Search", text: "Compare flights from leading global airlines and find an option that fits your plans.", to: "/flights", image: "/images/model2-flight.avif", Icon: Plane },
  { title: "Hotel Stays", text: "Discover places to stay, from a quick city break to a well-earned escape.", to: "/hotels", image: "/images/model2-hotel.avif", Icon: Hotel },
  { title: "Holiday Packages", text: "Bring your destination, stays and experiences together in one thoughtful itinerary.", to: "/packages", image: "/images/model2-home.avif", Icon: Package },
  { title: "Customized Travel Planning", text: "Share your destination, dates and requirements with our travel experts.", to: "/contact", image: "/images/model2-coast.avif", Icon: Compass },
  { title: "Exclusive Travel Deals", text: "Explore available travel deals and discover more possibilities for your next trip.", to: "/packages", image: "/images/model2-island.avif", Icon: Globe },
  { title: "Manage Bookings", text: "Keep your booking details and itineraries together, ready when you need them.", to: "/bookings", image: "/images/about_vision.jpg", Icon: Calendar },
];

const approach = [
  { title: "Start with your kind of journey.", text: "A quiet getaway, a family holiday or a business trip. Begin with what matters to you." },
  { title: "Bring the details together.", text: "Explore travel options, review your plans and make room for the experiences you want." },
  { title: "Keep support within reach.", text: "Have a question along the way? Speak with our team about your travel requirements." },
];

const values = [
  { Icon: Layers3, title: "Connected planning", text: "Flights, hotels and holiday packages in one place, so the bigger picture is easier to see." },
  { Icon: Compass, title: "Thoughtful choices", text: "Explore options around your destination, dates and preferences, with the journey at the heart of the plan." },
  { Icon: Heart, title: "A human touch", text: "Travel is personal. Our team is here to listen, answer questions and help you plan your next step." },
];

const pageLinks = [
  ["01", "Our story", "our-story"],
  ["02", "Our approach", "our-approach"],
  ["03", "What we do", "our-services"],
  ["04", "Why FlyingLyte", "why-flyinglyte"],
];

export default function AboutPage() {
  const reducedMotion = useReducedMotion();
  const reveal = {
    initial: reducedMotion ? false : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reducedMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <div className="fl-about-page fl-about-pro" data-fl-theme="model2">
      <SEO
        title="About Us - Elevating The Way The World Travels"
        description="Learn more about FlyingLyte, our vision, mission, and how we deliver seamless flight bookings, premium hotel stays, and curated holiday packages."
        canonical="https://www.flyinglyte.com/about"
      />

      <header className="fl-about-pro__hero fl-about-pro__wrap">
        <div className="fl-about-pro__hero-grid">
          <Motion.div {...reveal}>
            <p className="fl-about-pro__eyebrow"><span className="fl-about-pro__dot" /> ABOUT FLYINGLYTE</p>
            <h1 className="fl-about-pro__title">
              <span>Good journeys</span>
              <span>begin with a</span>
              <em>better plan.</em>
            </h1>
          </Motion.div>
          <Motion.div {...reveal} transition={{ ...reveal.transition, delay: reducedMotion ? 0 : 0.1 }} className="fl-about-pro__hero-copy">
            <span className="fl-about-pro__intro-icon" aria-hidden="true"><Compass size={27} strokeWidth={1.4} /></span>
            <p className="fl-about-pro__intro">A little curiosity.<br />{" "}A world of possibility.</p>
            <p>We bring flights, stays and holiday experiences together, helping you spend less time arranging the details and more time looking forward to the journey.</p>
            <div className="fl-about-pro__actions">
              <Link className="fl-about-pro__button fl-about-pro__button--primary" to="/contact">Plan with our team <ArrowUpRight size={17} aria-hidden="true" /></Link>
              <a className="fl-about-pro__quiet-link" href="#our-story">Our story <ArrowDown size={16} aria-hidden="true" /></a>
            </div>
          </Motion.div>
        </div>

        <Motion.div {...reveal} className="fl-about-pro__panorama">
          <Motion.img
            src="/images/about-travel-panorama.jpg"
            alt="Travelers enjoying a sunlit lakeside village and mountain views"
            width="2172"
            height="724"
            decoding="async"
            fetchPriority="high"
            initial={reducedMotion ? false : { scale: 1.035 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reducedMotion ? 0 : 1.3, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="fl-about-pro__photo-note">
            <Compass size={28} strokeWidth={1.5} aria-hidden="true" />
            <span>GO PLACES.<br />FEEL MORE.</span>
          </div>
          <span className="fl-about-pro__photo-caption"><span /> Every journey starts with possibility.</span>
        </Motion.div>

        <nav className="fl-about-pro__chapter-nav" aria-label="Explore the About Us page">
          {pageLinks.map(([number, label, id]) => (
            <a href={`#${id}`} key={id}><span>{number}</span>{label}<ArrowDown size={15} aria-hidden="true" /></a>
          ))}
        </nav>
      </header>

      <section id="our-story" aria-labelledby="about-story-title" className="fl-about-pro__section fl-about-pro__wrap">
        <div className="fl-about-pro__story-grid">
          <Motion.div {...reveal}>
            <p className="fl-about-pro__eyebrow">01 / OUR STORY & MISSION</p>
            <h2 id="about-story-title" className="fl-about-pro__heading">Travel, brought<br /><em>together.</em></h2>
            <div className="fl-about-pro__story-signature"><Compass size={20} aria-hidden="true" /><span>One platform. Your kind of journey.</span></div>
          </Motion.div>
          <Motion.div {...reveal} className="fl-about-pro__story-copy">
            <p className="fl-about-pro__lead">We believe planning a trip should feel like the start of something good.</p>
            <p>FlyingLyte brings flights, hotels and curated holiday packages into one place. Our mission is to make discovering and planning travel more straightforward, so you can explore with clarity and confidence.</p>
            <p>Whether it is a family vacation, a luxury getaway or a quick business trip, we help you bring the pieces together around what matters to you.</p>
            <div className="fl-about-pro__mission-note"><span aria-hidden="true"><Sparkles size={21} /></span><p>Less time planning.<br /><strong>More room for discovery.</strong></p></div>
          </Motion.div>
        </div>
      </section>

      <section id="our-approach" aria-labelledby="about-approach-title" className="fl-about-pro__approach-band">
        <div className="fl-about-pro__wrap fl-about-pro__section fl-about-pro__approach-grid">
          <Motion.div {...reveal} className="fl-about-pro__approach-photo">
            <img src="/images/model2-coast.avif" alt="A winding coastal road beside blue water" loading="lazy" decoding="async" width="800" height="1000" />
            <div className="fl-about-pro__approach-note"><Globe size={21} aria-hidden="true" /><span>A fresh perspective<br /><strong>on every journey.</strong></span></div>
          </Motion.div>
          <div className="fl-about-pro__approach-copy">
            <Motion.div {...reveal}>
              <p className="fl-about-pro__eyebrow">02 / OUR VISION & APPROACH</p>
              <h2 id="about-approach-title" className="fl-about-pro__heading">More possibilities.<br /><em>Less complication.</em></h2>
              <p>Our vision is a more connected travel experience, where smart technology and personal support make the next step feel simpler.</p>
            </Motion.div>
            <ol className="fl-about-pro__steps">
              {approach.map(({ title, text }, index) => (
                <Motion.li key={title} {...reveal}>
                  <span className="fl-about-pro__step-number" aria-hidden="true">0{index + 1}</span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </Motion.li>
              ))}
            </ol>
            <Link to="/contact" className="fl-about-pro__text-link">Talk to our travel experts <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section id="our-services" aria-labelledby="about-services-title" className="fl-about-pro__section fl-about-pro__wrap">
        <Motion.div {...reveal} className="fl-about-pro__section-heading">
          <div><p className="fl-about-pro__eyebrow">03 / WHAT WE DO</p><h2 id="about-services-title" className="fl-about-pro__heading">One place.<br /><em>So many ways to go.</em></h2></div>
          <p>From the first idea to the details of your itinerary, find a starting point that suits your next journey.</p>
        </Motion.div>
        <div className="fl-about-pro__services">
          {services.map((service, index) => (
            <Motion.article key={service.title} {...reveal} transition={{ ...reveal.transition, delay: reducedMotion ? 0 : (index % 3) * 0.07 }}>
              <Link to={service.to} className="fl-about-pro__service">
                <div className="fl-about-pro__service-photo">
                  <img src={service.image} alt="" loading="lazy" decoding="async" width="640" height="420" />
                  <span className="fl-about-pro__service-icon"><service.Icon size={21} strokeWidth={1.5} aria-hidden="true" /></span>
                  <span className="fl-about-pro__service-number" aria-hidden="true">0{index + 1}</span>
                </div>
                <div className="fl-about-pro__service-copy"><h3>{service.title}<ArrowUpRight size={20} aria-hidden="true" /></h3><p>{service.text}</p></div>
              </Link>
            </Motion.article>
          ))}
        </div>
      </section>

      <section id="why-flyinglyte" aria-labelledby="about-values-title" className="fl-about-pro__values-band">
        <div className="fl-about-pro__wrap fl-about-pro__section">
          <Motion.div {...reveal} className="fl-about-pro__section-heading">
            <div><p className="fl-about-pro__eyebrow">04 / WHY FLYINGLYTE</p><h2 id="about-values-title" className="fl-about-pro__heading">A little more care.<br /><em>At every step.</em></h2></div>
            <p>Travel should feel personal. These are the principles that guide the way we bring your plans together.</p>
          </Motion.div>
          <div className="fl-about-pro__values">
            {values.map((value, index) => (
              <Motion.article {...reveal} transition={{ ...reveal.transition, delay: reducedMotion ? 0 : index * 0.07 }} key={value.title}>
                <span className="fl-about-pro__value-icon"><value.Icon size={25} strokeWidth={1.4} aria-hidden="true" /></span>
                <h3>{value.title}</h3><p>{value.text}</p>
                <span className="fl-about-pro__value-mark" aria-hidden="true"><Check size={14} /> THE FLYINGLYTE APPROACH</span>
              </Motion.article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="about-contact-title" className="fl-about-pro__section fl-about-pro__wrap">
        <Motion.div {...reveal} className="fl-about-pro__cta">
          <div className="fl-about-pro__cta-art" aria-hidden="true"><Compass strokeWidth={0.55} /></div>
          <div className="fl-about-pro__cta-copy">
            <p className="fl-about-pro__eyebrow">YOUR NEXT CHAPTER</p>
            <h2 id="about-contact-title" className="fl-about-pro__heading">Where would you<br /><em>like to go next?</em></h2>
            <p>Bring your ideas. We will help you think through the details of your next journey.</p>
            <div className="fl-about-pro__actions">
              <Link to="/contact" className="fl-about-pro__button fl-about-pro__button--peach">Start a conversation <MessageCircle size={17} aria-hidden="true" /></Link>
              <Link to="/packages" className="fl-about-pro__cta-secondary">Explore holiday packages <ArrowUpRight size={17} aria-hidden="true" /></Link>
            </div>
          </div>
        </Motion.div>
      </section>
    </div>
  );
}
