import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Plane, Hotel, Package, Globe, Calendar } from "lucide-react";
import SEO from "../SEO";
import HangingTag from "./HangingTag";

const AboutUs = () => {
  const navigate = useNavigate();
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const features = [
    {
      icon: Plane,
      title: "Flight Search",
      text: "Compare flights from leading global airlines",
      action: "flights",
    },
    {
      icon: Hotel,
      title: "Hotel Stays",
      text: "Discover hotels across thousands of destinations",
      action: "hotels",
    },
    {
      icon: Package,
      title: "Holiday Packages",
      text: "Explore curated holiday packages",
      path: "/packages",
    },
    {
      icon: Globe,
      title: "Exclusive Travel Deals",
      text: "Access exclusive travel deals and limited-time offers",
      path: "/packages",
    },
    {
      icon: Calendar,
      title: "Manage Bookings",
      text: "Manage bookings and itineraries in one place",
      path: "/bookings",
    },
  ];

  const location = useLocation();
  const isAboutPage = location.pathname === "/about";

  return (
    <section className="fl-about" data-fl-theme="model2">
      {isAboutPage && (
        <SEO
          title="About Us - Elevating The Way The World Travels"
          description="Learn more about FlyingLyte, our vision, mission, and how we deliver seamless flight bookings, premium hotel stays, and curated holiday packages."
          canonical="https://www.flyinglyte.com/about"
        />
      )}
      <div className="fl-about__wrap">
        {/* ABOUT */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          className="fl-about__intro"
        >
          <h2 className="fl-about__title">
            About Flyinglyte
          </h2>

          <h3 className="fl-about__tagline">
            Elevating the Way the World Travels
          </h3>

          <p className="fl-about__copy fl-about__copy--lead">
            At Flyinglyte, we believe travel should be effortless, inspiring,
            and accessible. Our mission is to simplify the way people discover
            and book travel by bringing flights, hotels, and curated experiences
            together on a single trusted platform.
          </p>

          <p className="fl-about__copy">
            Whether you're planning a luxury getaway, a family vacation, or a
            quick business trip, Flyinglyte is designed to help you explore the
            world with confidence and convenience.
          </p>
        </motion.div>

        {/* VISION */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          className="fl-about__vision"
        >
          <div className="fl-about__vision-copy">
            <h2 className="fl-about__section-title">
              Our Vision
            </h2>

            <p className="fl-about__copy">
              Our vision is to build a next-generation travel platform that
              combines smart technology, transparent pricing, and personalized
              recommendations to create a seamless travel experience.
            </p>

            <p className="fl-about__copy">
              We aim to make travel planning simpler while helping travelers
              unlock more opportunities to explore the world.
            </p>
          </div>

          <div className="fl-about__image-frame">
          <img
            src="/images/about_vision.jpg"
            alt="FlyingLyte Elevated Travel Experience"
            className="fl-about__image"
            loading="lazy" />
          <HangingTag />
          </div>
        </motion.div>

        {/* WHAT WE OFFER */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="fl-about__offers"
        >
          {/* Background glow */}
          <div className="fl-about__ambient pointer-events-none" />

          {/* Heading */}
          <div className="fl-about__offer-heading">
            <p className="fl-about__eyebrow">
              Travel Made Simple
            </p>

            <h2 className="fl-about__section-title">
              What We Offer
            </h2>

            <p className="fl-about__offer-description">
              Everything you need to search, plan and manage your journey in one place.
            </p>

            <div className="fl-about__rule" />
          </div>

          {/* Cards */}
          <div className="fl-about__grid">
            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.button
                  key={index}
                  type="button"
                  onClick={() => {
                    if (item.action === "flights") {
                      navigate("/", {
                        state: {
                          searchTab: "flights",
                        },
                      });

                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });

                      return;
                    }

                    if (item.action === "hotels") {
                      navigate("/", {
                        state: {
                          searchTab: "hotels",
                        },
                      });

                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });

                      return;
                    }

                    if (item.path) {
                      navigate(item.path);
                    }
                  }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="fl-about__card group relative w-full cursor-pointer overflow-hidden text-left transition-all duration-300"
                >
                  {/* Card glow */}
                  <div className="fl-about__card-glow pointer-events-none transition duration-300" />

                  {/* Icon */}
                  <div className="fl-about__icon relative transition duration-300 group-hover:scale-110">
                    <Icon size={24} strokeWidth={1.8} />
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="fl-about__card-title">
                      {item.title}
                    </h3>

                    <p className="fl-about__card-description">
                      {item.text}
                    </p>

                    <div className="fl-about__explore opacity-70 transition group-hover:opacity-100">
                      Explore
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
