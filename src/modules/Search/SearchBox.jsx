import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Tabs from "./Tabs";
import HotelsForm from "./HotelsForm";
//import FlightsForm from "./FlightsForm";
import { Plane, Sparkles, ArrowRight } from "lucide-react";

const SearchBox = () => {
  const [activeTab, setActiveTab] = useState("flights");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") return;

    const requestedTab = location.state?.searchTab;

    if (requestedTab === "hotels") {
      setActiveTab("hotels");
      return;
    }

    if (requestedTab === "flights") {
      setActiveTab("flights");
      return;
    }

    setActiveTab("flights");
  }, [location.pathname, location.state?.searchTab]);

  const handleTabChange = (tabId) => {
    if (tabId === "packages") {
      navigate("/packages");
      return;
    }

    setActiveTab(tabId);

    navigate("/", {
      state: {
        searchTab: tabId,
      },
      replace: true,
    });
  };


  const ComingSoonCard = () => {
  return (
    <div className="relative flex min-h-[230px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#E6B35C]/30 bg-[#07111c]/20 p-5 text-center shadow-[0_18px_55px_rgba(0,0,0,0.4)] backdrop-blur-[2px] sm:min-h-[260px] sm:p-6">
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#E6B35C]/10 blur-3xl" />

      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E6B35C]/30 bg-[#E6B35C]/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E6B35C] sm:text-xs">
        <Sparkles size={13} />
        Premium Feature
      </div>

      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-r from-start to-end text-black shadow-[0_10px_30px_rgba(230,179,92,0.25)] sm:h-14 sm:w-14">
        <Plane size={25} />
      </div>

      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#E6B35C]">
        Flights Booking
      </p>

      <h3 className="mt-2 text-2xl font-bold text-[#F2D17B] sm:text-3xl">
        Coming Soon
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-white/60">
        We are preparing a smoother premium flight booking experience.
      </p>

      <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-start to-end px-4 py-2 text-xs font-semibold text-black">
        Launching Shortly
        <ArrowRight size={14} />
      </div>
    </div>
  );
};

  const renderForm = () => {
    switch (activeTab) {
      case "flights":
        return <ComingSoonCard />;

      case "hotels":
        return <HotelsForm />;

      default:
        return <FlightsForm />;
    }
  };

  const formBackground =
    activeTab === "hotels"
      ? "/images/hotel-journey-background.png"
      : "/images/flight-clouds-background.png";

  return (
    <div className="relative z-30 mx-auto w-full max-w-5xl">
      {/* TOP LEFT GOLD GLOW */}
      <div className="pointer-events-none absolute -left-2 -top-2 z-20 h-16 w-16 rounded-full bg-[#F7D77D]/15 blur-2xl sm:h-24 sm:w-24" />

      {/* TOP CENTER GOLD SHINE */}
      <div className="pointer-events-none absolute left-1/2 top-0 z-20 h-px w-28 -translate-x-1/2 bg-linear-to-r from-transparent via-[#FFE08A] to-transparent shadow-[0_0_18px_rgba(255,224,138,0.95)] sm:w-40" />

      {/* BOTTOM CENTER GOLD SHINE */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 z-20 h-px w-32 -translate-x-1/2 bg-linear-to-r from-transparent via-[#E6B35C] to-transparent opacity-80 shadow-[0_0_16px_rgba(230,179,92,0.8)] sm:w-48" />

      {/* BOTTOM RIGHT GOLD GLOW */}
      <div className="pointer-events-none absolute -bottom-2 -right-2 z-20 h-16 w-16 rounded-full bg-[#F7D77D]/15 blur-2xl sm:h-24 sm:w-24" />

      {/* OUTER GOLD GLOW */}
      <div className="pointer-events-none absolute -inset-px rounded-[22px] bg-linear-to-r from-[#E6B35C]/30 via-[#F7CF75]/10 to-[#E6B35C]/30 opacity-60 blur-md sm:rounded-[30px]" />

      {/* MAIN SEARCH BOX */}
      <div className="relative overflow-visible rounded-[22px] border border-[#E6B35C]/40 bg-[#07111c]/90 px-2.5 py-2.5 shadow-[0_28px_80px_rgba(0,0,0,0.55),0_0_28px_rgba(230,179,92,0.08)] backdrop-blur-xl sm:rounded-[30px] sm:px-4 sm:py-3 md:px-5 md:py-3.5">
        {/* SOFT DECORATIVE GLOW */}
        <div className="pointer-events-none absolute right-0 -top-16 h-40 w-40 rounded-full bg-[#E6B35C]/8 blur-3xl sm:-right-20 sm:-top-20 sm:h-56 sm:w-56" />

        {/* HEADING */}
        <div className="relative mb-2 text-center md:mb-3">
          <h2 className="text-xl font-semibold tracking-wide text-[#F2D17B] sm:text-2xl md:text-3xl">
            Plan Your Journey
          </h2>

          <div className="mt-2 flex items-center justify-center gap-2.5 sm:gap-3">
            <span className="h-px w-12 bg-linear-to-r from-transparent to-[#E6B35C]/70 sm:w-16" />

            <span className="grid h-6 w-6 place-items-center rounded-full border border-[#E6B35C]/40 text-xs text-[#E6B35C] sm:h-7 sm:w-7 sm:text-sm">
              ◉
            </span>

            <span className="h-px w-12 bg-linear-to-l from-transparent to-[#E6B35C]/70 sm:w-16" />
          </div>
        </div>

        {/* TABS */}
        <div className="relative">
          <Tabs activeTab={activeTab} setActiveTab={handleTabChange} />
        </div>

        {/* FORM IMAGE PANEL */}
        <div className="relative mt-2 overflow-visible rounded-2xl border border-[#E6B35C]/35 bg-[#07111c] bg-no-repeat bg-[length:100%_auto] bg-[position:center_top] shadow-[0_18px_55px_rgba(0,0,0,0.4)] md:rounded-3xl md:bg-cover md:bg-center" style={{ backgroundImage: `url("${formBackground}")` }}>
          {/* LIGHT DARK OVERLAY */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[#07111c]/25 md:rounded-3xl md:bg-[#07111c]/10" />

          {/* READABILITY GRADIENT */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-b from-transparent via-[#07111c]/10 to-[#07111c]/70 md:bg-linear-to-r md:from-[#07111c]/25 md:via-[#07111c]/10 md:to-transparent md:rounded-3xl" />

          {/* EXISTING FORM */}
          <div className="relative z-10 p-1 sm:p-2">
            {renderForm()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;