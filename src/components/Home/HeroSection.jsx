import SearchBox from "../../modules/Search/SearchBox";
import EditorialArtwork from "./EditorialArtwork";

const HeroSection = () => (
  <section className="fl-hero fl-parity-home" data-fl-theme="model2">
    <div className="fl-parity-hero-grid">
      <div className="fl-hero__copy">
        <p className="fl-parity-eyebrow">Premium Flights, Hotels & Holiday Tour Packages</p>
          <h1 className="fl-hero__title text-[30px] font-semibold leading-[0.95] tracking-tight sm:text-4xl md:text-5xl lg:text-5xl">
            <span className="fl-hero__lead block text-[#FFF8E8]">Smart Trips.</span>
            <span className="fl-hero__emphasis mt-0.5 block bg-linear-to-r from-[#F8D77D] via-[#E6B35C] to-[#C99132] bg-clip-text text-transparent sm:mt-1">
              Zero hassle.
            </span>
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
