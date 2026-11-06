import React, { useLayoutEffect, Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Home/Navbar";
import Footer from "./components/Home/Footer/Footer";
import WhatsAppFloating from "./components/WhatsAppFloating";
import Chatbot from "./components/chatbot/Chatbot";
import SocialRail from "./components/common/SocialRail";
import BookingFrame from "./components/common/BookingFrame";
import PublicFrame from "./components/common/PublicFrame";
import NotFoundPage from "./Pages/NotFoundPage";
import HomeIntro from "./components/Home/HomeIntro";
import PageMotion from "./components/common/PageMotion";


// Critical / Above-fold Route
import Home from "./Pages/Home";

// Lazy-loaded routes for code-splitting & optimal performance


// Ads Only Landing Page
const AdsTravelLanding = lazy(() =>
  import("./Pages/AdsTravelLanding")
);
const FlightsPage = lazy(() => import("./Pages/FlightsPage"));
const HotelsPage = lazy(() => import("./Pages/HotelsPage"));
const Register = lazy(() => import("./Pages/Register"));
const LoginPage = lazy(() => import("./Pages/LoginPage"));
const ContactPage = lazy(() => import("./Pages/ContactPage"));
const AboutPage = lazy(() => import("./Pages/AboutPage"));
const MyBookings = lazy(() => import("./components/Home/Mybookings"));
const Blogs = lazy(() => import("./Pages/Blogs"));
const BlogDetails = lazy(() => import("./Pages/BlogDetails"));
const TermsConditions = lazy(() => import("./Pages/TermsConditions"));
const PrivacyPolicy = lazy(() => import("./Pages/PrivacyPolicy"));
const RefundPolicy = lazy(() => import("./Pages/RefundPolicy"));
const CancellationPolicyPage = lazy(() => import("./Pages/CancellationPolicyPage"));

// Packages
const PackageSection = lazy(() => import("./modules/packages/PackageSection"));
const PackageDetails = lazy(() => import("./modules/packages/PackageDetail"));
const PackageBookingSuccess = lazy(() => import("./modules/packages/PackageBookingSuccess"));

// Hotels
const HotelResults = lazy(() => import("./modules/hotels/pages/HotelResults"));
const HotelDetails = lazy(() => import("./modules/hotels/pages/HotelDetails"));
const PrebookLoader = lazy(() => import("./modules/hotels/pages/PreBookLoader"));
const HotelBooking = lazy(() => import("./modules/hotels/pages/HotelBooking"));
const HotelReviewBooking = lazy(() => import("./modules/hotels/pages/HotelReviewBooking"));
const PaymentSuccess = lazy(() => import("./modules/hotels/pages/PaymentSuccess"));
const HotelVoucher = lazy(() => import("./modules/hotels/pages/HotelVoucher"));
const HotelInvoice = lazy(() => import("./modules/hotels/pages/HotelInvoice"));
const HotelBookingSuccess = lazy(() => import("./modules/hotels/pages/HotelBookingSuccess"));
const HotelBookingDetails = lazy(() => import("./modules/hotels/pages/HotelBookingDetails"));

// Flights
const FlightsResults = lazy(() => import("./modules/flights/pages/FlightsResults"));
const FareRule = lazy(() => import("./modules/flights/pages/FareRule"));
const FareQuote = lazy(() => import("./modules/flights/pages/FareQuote"));
const SSRPage = lazy(() => import("./modules/flights/pages/SSRPage"));
const FlightAmendment = lazy(() => import("./modules/flights/pages/FlightAmendment"));
const PassengerDetails = lazy(() => import("./modules/flights/pages/PassengerDetails"));
const ReviewBooking = lazy(() => import("./modules/flights/pages/ReviewBooking"));
const BookingSuccess = lazy(() => import("./modules/flights/pages/BookingSuccess"));
const FlightBookingDetails = lazy(() => import("./modules/flights/pages/FlightBookingDetails"));
const FlightPaymentSuccess = lazy(() => import("./modules/flights/pages/FlightPaymentSuccess"));

// Route-chunk fallback; search and transaction loading remain separate.
const PageLoader = () => {
  const { pathname } = useLocation();
  if (pathname.replace(/\/+$/, "") === "/plan-your-trip") return (
  <div className="min-h-[60vh] flex items-center justify-center bg-(--bg-main)">
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 rounded-full border-3 border-white/10 border-t-(--gold-main) animate-spin" />
    </div>
  </div>
  );
  return <div className="fl-page-loader" role="status" aria-live="polite" aria-label="Loading page">
    <img src="/images/flying_logo.png" width="174" height="56" alt="FlyingLyte" />
    <div className="fl-page-loader__track" aria-hidden="true"><span /></div>
    <p>Preparing your next destination…</p>
  </div>;
};

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", "G-PWH1WRN04Q", {
        page_path: pathname + search,
      });
    }
  }, [pathname, search]);

  return null;
};

const App = () => {
  const { pathname } = useLocation();

  const isAdsLanding =
    pathname.replace(/\/+$/, "") === "/plan-your-trip";

  return (
    <main>
      {pathname === "/" && <HomeIntro />}
      {!isAdsLanding && <Navbar />}
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <PageMotion>
        <Routes>
          <Route
            path="/plan-your-trip"
            element={<AdsTravelLanding />}
          />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<PublicFrame kind="auth"><Register /></PublicFrame>} />
          <Route path="/login" element={<PublicFrame kind="auth"><LoginPage /></PublicFrame>} />
          <Route path="/bookings" element={<PublicFrame kind="account"><MyBookings /></PublicFrame>} />
          <Route path="/about" element={<PublicFrame kind="about"><AboutPage /></PublicFrame>} />
          <Route path="/contact" element={<PublicFrame kind="contact"><ContactPage /></PublicFrame>} />
          <Route path="/blogs" element={<PublicFrame kind="journal"><Blogs /></PublicFrame>} />
          <Route path="/blogs/:slug" element={<PublicFrame kind="story"><BlogDetails /></PublicFrame>} />
          <Route path="/terms" element={<PublicFrame kind="legal"><TermsConditions /></PublicFrame>} />
          <Route path="/privacy-policy" element={<PublicFrame kind="legal"><PrivacyPolicy /></PublicFrame>} />
          <Route path="/refund-policy" element={<PublicFrame kind="legal"><RefundPolicy /></PublicFrame>} />
          <Route path="/cancellation" element={<PublicFrame kind="legal"><CancellationPolicyPage /></PublicFrame>} />

          {/* Flights */}
          <Route path="/flights" element={<FlightsPage />} />
          <Route path="/flights/results" element={<FlightsResults />} />
          <Route path="/fare-rule" element={<FareRule />} />
          <Route path="/fare-quote" element={<BookingFrame kind="flight"><FareQuote /></BookingFrame>} />
          <Route path="/ssr" element={<BookingFrame kind="flight"><SSRPage /></BookingFrame>} />
          <Route
            path="/flight-amendment/:bookingId"
            element={<BookingFrame kind="flight"><FlightAmendment /></BookingFrame>}
          />
          <Route path="/passenger-details" element={<BookingFrame kind="flight"><PassengerDetails /></BookingFrame>} />
          <Route path="/review-booking" element={<BookingFrame kind="flight"><ReviewBooking /></BookingFrame>} />
          <Route path="/booking-success" element={<BookingFrame kind="flight"><BookingSuccess /></BookingFrame>} />
          <Route
            path="/flight-booking-details/:id"
            element={<BookingFrame kind="flight"><FlightBookingDetails /></BookingFrame>}
          />
          <Route
            path="/flight-payment-success"
            element={<BookingFrame kind="flight"><FlightPaymentSuccess /></BookingFrame>}
          />

          {/* Hotels */}
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/hotels/results" element={<HotelResults />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/prebook" element={<BookingFrame kind="hotel"><PrebookLoader /></BookingFrame>} />
          <Route path="/hotel-booking" element={<BookingFrame kind="hotel"><HotelBooking /></BookingFrame>} />
          <Route path="/hotel-review-booking" element={<BookingFrame kind="hotel"><HotelReviewBooking /></BookingFrame>} />
          <Route path="/payment-success" element={<BookingFrame kind="hotel"><PaymentSuccess /></BookingFrame>} />
          <Route path="/booking-details/:bookingId" element={<BookingFrame kind="hotel"><HotelVoucher /></BookingFrame>} />
          <Route path="/hotel-invoice/:bookingId" element={<BookingFrame kind="hotel"><HotelInvoice /></BookingFrame>} />
          <Route
            path="/hotel-booking-success"
            element={<BookingFrame kind="hotel"><HotelBookingSuccess /></BookingFrame>}
          />
          <Route
            path="/hotel-booking-details/:bookingId"
            element={<BookingFrame kind="hotel"><HotelBookingDetails /></BookingFrame>}
          />

          {/* Packages */}
          <Route path="/packages" element={<PackageSection limit={8} appearance="page-model2" />} />
          <Route path="/packages/:slug" element={<PackageDetails />} />
          <Route
            path="/package_booking_success/:bookingId"
            element={<PackageBookingSuccess />}
          />

          {/* 404 Page */}
          <Route
            path="*"
            element={<PublicFrame kind="missing"><NotFoundPage /></PublicFrame>}
          />
        </Routes>
        </PageMotion>
      </Suspense>

      {!isAdsLanding && (
        <>
          <SocialRail />
          <WhatsAppFloating />
          <Chatbot />
          <Footer />
        </>
      )}
    </main>
  );
};

export default App;
