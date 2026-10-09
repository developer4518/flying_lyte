
import React, { useEffect, useState } from "react";


import TripEnquiryPopup from "../components/common/TripEnquiryPopup";

import HeroSection from "../components/Home/HeroSection";
//import PopularDestinations from "../components/Destination/PopularDestination";
import WhyChooseUs from "./WhyChooseUs";
import TestimonialsSection from "./TestimonialsSection";
import CTASection from "../components/Home/CTASection";
import AboutUs from "../components/Home/AboutUs";
import PackageSection from "../modules/packages/PackageSection";
import BlogSection from "../components/Home/BlogSection";

const Home = () => {
  const [showTripPopup, setShowTripPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTripPopup(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-(--bg-main)">

      {/* <PopularDestinations /> */}
      <HeroSection />
      <PackageSection limit={4} />
      <CTASection />
      <AboutUs />
      <BlogSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <TripEnquiryPopup
        isOpen={showTripPopup}
        onClose={() => setShowTripPopup(false)}
      />
    </div>
  );
};

export default Home;
