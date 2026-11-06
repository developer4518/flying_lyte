import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plane, Hotel, Package, Compass, Calendar, Globe, ArrowUpRight } from "lucide-react";
import SEO from "../components/SEO";

const services = [
  { title: "Flight Search", text: "Compare flights from leading global airlines", to: "/flights", image: "/images/model2-flight.avif", Icon: Plane },
  { title: "Hotel Stays", text: "Discover hotels across thousands of destinations", to: "/hotels", image: "/images/model2-hotel.avif", Icon: Hotel },
  { title: "Holiday Packages", text: "Explore curated holiday packages", to: "/packages", image: "/images/model2-home.avif", Icon: Package },
  { title: "Customized Travel Planning", text: "Share your destination, travel dates and requirements with our travel experts.", to: "/contact", image: "/images/model2-coast.avif", Icon: Compass },
  { title: "Exclusive Travel Deals", text: "Access exclusive travel deals and limited-time offers", to: "/packages", image: "/images/model2-island.avif", Icon: Globe },
  { title: "Manage Bookings", text: "Manage bookings and itineraries in one place", to: "/bookings", image: "/images/about_vision.jpg", Icon: Calendar },
];
const reveal = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.12 }, transition: { duration: 0.6 } };

export default function AboutPage() {
  return <div className="fl-about-page" data-fl-theme="model2">
    <SEO title="About Us - Elevating The Way The World Travels" description="Learn more about FlyingLyte, our vision, mission, and how we deliver seamless flight bookings, premium hotel stays, and curated holiday packages." canonical="https://www.flyinglyte.com/about" />
    <header className="fl-about-page__hero fl-about-page__wrap">
      <motion.div {...reveal}><p className="fl-about-page__eyebrow">ABOUT FLYINGLYTE</p><h1>Elevating the way<br />the world <em>travels.</em></h1></motion.div>
      <div className="fl-about-page__hero-bottom"><p>At Flyinglyte, we believe travel should be effortless, inspiring, and accessible.</p><span>A little curiosity.<br />A world of possibility. ↗</span></div>
      <div className="fl-about-page__panorama"><img src="/images/about_vision.jpg" alt="FlyingLyte Elevated Travel Experience" fetchPriority="high" /><span><Compass size={28} /> GO PLACES.<br />FEEL MORE.</span></div>
    </header>
    <motion.section {...reveal} className="fl-about-page__story fl-about-page__wrap fl-about-page__section">
      <div><p className="fl-about-page__eyebrow">01 / OUR MISSION</p><h2>About Flyinglyte.<br /><em>Travel, brought together.</em></h2></div>
      <div><p className="fl-about-page__lead">Our mission is to simplify the way people discover and book travel by bringing flights, hotels, and curated experiences together on a single trusted platform.</p><p>Whether you're planning a luxury getaway, a family vacation, or a quick business trip, Flyinglyte is designed to help you explore the world with confidence and convenience.</p></div>
    </motion.section>
    <section className="fl-about-page__soft">
      <motion.div {...reveal} className="fl-about-page__vision fl-about-page__wrap fl-about-page__section">
        <img src="/images/model2-coast.avif" alt="A coastal journey, thoughtfully planned" loading="lazy" />
        <div><p className="fl-about-page__eyebrow">02 / OUR VISION & APPROACH</p><h2>More possibilities.<br /><em>Less complication.</em></h2><p>Our vision is to build a next-generation travel platform that combines smart technology, transparent pricing, and personalized recommendations to create a seamless travel experience.</p><p>We aim to make travel planning simpler while helping travelers unlock more opportunities to explore the world.</p><Link to="/contact" className="fl-about-page__text-link">Talk to our travel experts <ArrowUpRight size={19} /></Link></div>
      </motion.div>
    </section>
    <section className="fl-about-page__wrap fl-about-page__section">
      <motion.div {...reveal} className="fl-about-page__section-heading"><div><p className="fl-about-page__eyebrow">03 / OUR SERVICES</p><h2>One place.<br /><em>So many ways to go.</em></h2></div><p>Flights, hotel reservations, holiday packages and customized travel planning — start with what you need for your next journey.</p></motion.div>
      <div className="fl-about-page__services">{services.map(({ title, text, to, image, Icon }, index) => <motion.article key={title} {...reveal} transition={{ duration: 0.55, delay: index % 3 * 0.08 }}><Link to={to} className="fl-about-page__service"><div className="fl-about-page__service-photo"><img src={image} alt="" loading="lazy" /><span><Icon size={21} /></span></div><h3>{title}<ArrowUpRight size={21} /></h3><p>{text}</p></Link></motion.article>)}</div>
    </section>
    <motion.section {...reveal} className="fl-about-page__wrap fl-about-page__section">
      <p className="fl-about-page__eyebrow">04 / WHY CHOOSE FLYINGLYTE</p><h2>Keep the journey<br /><em>at the heart of the plan.</em></h2>
      <div className="fl-about-page__values"><div><Plane /><h3>Flights booking</h3><p>Search domestic and international flights and compare available options.</p></div><div><Hotel /><h3>Hotel reservations</h3><p>Choose your destination, dates and guests, and review the details of your stay.</p></div><div><Compass /><h3>Travel support</h3><p>Our travel experts are here to help you plan your journey.</p></div></div>
    </motion.section>
    <motion.section {...reveal} className="fl-about-page__wrap fl-about-page__section">
      <div className="fl-about-page__cta"><p className="fl-about-page__eyebrow">YOUR NEXT CHAPTER</p><h2>Craft your perfect<br /><em>journey with us.</em></h2><p>Have questions about flights, hotels, or travel packages?</p><div><Link to="/contact">Start the conversation <ArrowUpRight size={18} /></Link><Link to="/packages">Explore holiday packages <ArrowUpRight size={18} /></Link></div></div>
    </motion.section>
  </div>;
}
