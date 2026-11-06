import EditorialArtwork from "../components/Home/EditorialArtwork";
import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import FaqSection from "../components/common/FaqSection";
import SEO from "../components/SEO";
import {
    Plane,
    ShieldCheck,
    Headphones,
    BadgeIndianRupee,
    ArrowRight,
    Luggage,
} from "lucide-react";
import FlightsForm from "../modules/Search/FlightsForm";

const FlightsPage = () => {
    const searchRef = useRef(null);
    const reducedMotion = useReducedMotion();

    const recommendedRoutes = [
        {
            from: "Delhi",
            to: "Goa",
            tag: "Beach Escape",
            image: "/images/delhi-goa.webp",
        },
        {
            from: "Delhi",
            to: "Mumbai",
            tag: "City Break",
            image: "/images/delhi-mumbai.webp",
        },
        {
            from: "Delhi",
            to: "Bengaluru",
            tag: "Business & Leisure",
            image: "/images/delhi-bengaluru.webp",
        },
        {
            from: "Delhi",
            to: "Srinagar",
            tag: "Mountain Escape",
            image: "/images/delhi-srinagar.webp",
        },
        {
            from: "Delhi",
            to: "Dubai",
            tag: "International",
            image: "/images/delhi-dubai.webp",
        },
        {
            from: "Delhi",
            to: "Jaipur",
            tag: "Weekend Trip",
            image: "/images/delhi-jaipur.webp",
        },
    ];

    const scrollToSearch = () => {
        searchRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    };

    return (
        <main data-fl-theme="model2" className="fl-inner-page fl-parity-landing fl-flights-page min-h-screen bg-[#0B0F14] text-white">
            <SEO
                title="Book Flights - Domestic & International Flight Deals"
                description="Book domestic and international flights with FlyingLyte. Real-time schedules, exclusive airline offers, and 24/7 travel support."
                canonical="https://www.flyinglyte.com/flights"
            />
            {/* HERO */}
            <section className="fl-inner-hero relative min-h-[700px] w-full sm:min-h-[660px] md:min-h-[620px]">
                {/* CONTENT */}
                <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-32 sm:px-6 md:pt-36 lg:px-8">
                    <div className="fl-parity-hero-grid">
                    {/* HERO TEXT */}
                    <div className="fl-inner-hero__copy mx-auto max-w-3xl text-center">
                        <p className="fl-inner-eyebrow text-[10px] font-semibold uppercase tracking-[0.3em] text-[#E6B35C] sm:text-xs">
                            Flights With FlyingLyte
                        </p>

                        <h1 className="fl-inner-title mt-3 text-4xl font-semibold leading-tight tracking-tight text-[#FFF8E8] sm:text-5xl md:text-6xl">
                            Find the right flight for your{" "}
                            <span className="fl-inner-emphasis bg-linear-to-r from-[#F8D77D] via-[#E6B35C] to-[#C99132] bg-clip-text text-transparent">
                                next journey
                            </span>
                        </h1>

                        <p className="fl-inner-muted mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/65 sm:text-base">
                            Search domestic and international flights, compare available options and continue your booking with FlyingLyte.
                        </p>

                        <div className="mt-5 flex items-center justify-center gap-3">
                            <span className="fl-inner-rule h-px w-16 bg-linear-to-r from-transparent to-[#E6B35C]/70" />
                            <Plane size={18} className="fl-inner-accent text-[#E6B35C]" />
                            <span className="fl-inner-rule h-px w-16 bg-linear-to-l from-transparent to-[#E6B35C]/70" />
                        </div>
                    </div>

                    <EditorialArtwork image="/images/model2-flight.avif" alt="Airplane wing above the clouds" />
                    </div>
                    {/* FLIGHT SEARCH */}
                    <div
                        ref={searchRef}
                        data-fl-theme="model2"
                        data-fl-search-tab="flights"
                        className="fl-inner-search fl-search-panel relative mx-auto mt-9 w-full max-w-6xl overflow-visible rounded-[22px] border border-[#E6B35C]/35 bg-[#07111c] bg-[length:100%_auto] bg-[position:center_top] bg-no-repeat p-2 shadow-[0_30px_90px_rgba(0,0,0,0.55)] sm:rounded-[28px] sm:bg-[length:cover] sm:bg-center sm:p-3"
                        style={{
                            backgroundImage: 'url("/images/flight-clouds-background.png")',
                        }}
                    >
                        {/* dark overlay */}
                        <div className="fl-search-image-cover pointer-events-none absolute inset-0 rounded-[28px] bg-[#07111c]/35" />

                        {/* readability gradient */}
                        <div className="fl-search-image-shade pointer-events-none absolute inset-0 rounded-[28px] bg-linear-to-r from-[#07111c]/55 via-[#07111c]/20 to-[#07111c]/35" />

                        {/* top gold shine */}
                        <div className="fl-search-decor pointer-events-none absolute left-1/2 top-0 h-px w-48 -translate-x-1/2 bg-linear-to-r from-transparent via-[#FFE08A] to-transparent shadow-[0_0_18px_rgba(255,224,138,0.9)]" />

                        <div className="relative z-10 overflow-visible">
                            <FlightsForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* RECOMMENDED ROUTES */}
            <section className="fl-inner-section bg-[#0B0F14] px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="fl-inner-eyebrow text-[10px] font-semibold uppercase tracking-[0.28em] text-[#E6B35C]">
                                Recommended
                            </p>

                            <h2 className="fl-inner-heading mt-2 text-2xl font-semibold text-white sm:text-3xl">
                                Popular flight routes
                            </h2>

                            <p className="fl-inner-muted mt-2 text-sm text-white/50">
                                Explore routes travellers frequently search for.
                            </p>
                        </div>

                        <button type="button" onClick={scrollToSearch} className="fl-inner-link flex items-center gap-2 text-sm font-medium text-[#E6B35C] transition hover:text-[#F8D77D]">
                            Search Flights
                            <ArrowRight size={16} />
                        </button>
                    </div>

                    <motion.div className="fl-flight-route-grid"
                        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}
                        variants={{ hidden: {}, visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.07 } } }}>
                        {recommendedRoutes.map((route) => (
                            <motion.button
                                key={`${route.from}-${route.to}`}
                                type="button"
                                onClick={scrollToSearch}
                                aria-label={`Go to flight search: ${route.from} to ${route.to}`}
                                className="fl-flight-route"
                                variants={{ hidden: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 14 }, visible: { opacity: 1, y: 0, transition: { duration: reducedMotion ? 0 : 0.65, ease: 'easeOut' } } }}>
                                <span className="fl-flight-route__icon"><Plane size={18} aria-hidden="true" /></span>
                                <ArrowRight className="fl-flight-route__arrow" size={16} aria-hidden="true" />
                                <span className="fl-flight-route__body">
                                    <span className="fl-flight-route__from">{route.from} <span aria-hidden="true">&rarr;</span></span>
                                    <strong>{route.to}</strong>
                                    <span className="fl-flight-route__tag">{route.tag}</span>
                                </span>
                            </motion.button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* WHY FLYINGLYTE */}
            <section className="fl-inner-section fl-inner-section--soft border-y border-white/5 bg-[#0E141C] px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto mb-9 max-w-2xl text-center">
                        <p className="fl-inner-eyebrow text-[10px] font-semibold uppercase tracking-[0.28em] text-[#E6B35C]">
                            Why FlyingLyte
                        </p>

                        <h2 className="fl-inner-heading mt-2 text-2xl font-semibold text-white sm:text-3xl">
                            A simpler way to book flights
                        </h2>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                icon: Plane,
                                title: "Easy Flight Search",
                                text: "Search available flights for your route and travel dates.",
                            },
                            {
                                icon: BadgeIndianRupee,
                                title: "Clear Fare Details",
                                text: "Review fare information before continuing your booking.",
                            },
                            {
                                icon: Luggage,
                                title: "Travel Details",
                                text: "Check available baggage and other flight information.",
                            },
                            {
                                icon: Headphones,
                                title: "Travel Support",
                                text: "Get assistance from our travel team whenever needed.",
                            },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <div key={item.title} className="fl-inner-card rounded-2xl border border-white/8 bg-white/[0.025] p-5">
                                    <div className="fl-inner-badge grid h-11 w-11 place-items-center rounded-xl border border-[#E6B35C]/20 bg-[#E6B35C]/10 text-[#E6B35C]">
                                        <Icon size={20} />
                                    </div>

                                    <h3 className="fl-inner-card-title mt-4 font-semibold text-white">{item.title}</h3>

                                    <p className="fl-inner-muted mt-2 text-sm leading-6 text-white/45">{item.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* BOOKING TIPS */}
            <section className="fl-inner-section bg-[#0B0F14] px-4 py-16 sm:px-6 lg:px-8">
                <div className="fl-inner-card mx-auto grid max-w-7xl gap-8 rounded-[28px] border border-[#E6B35C]/15 bg-[#101721] p-6 sm:p-8 lg:grid-cols-2 lg:p-10">
                    <div>
                        <p className="fl-inner-eyebrow text-[10px] font-semibold uppercase tracking-[0.28em] text-[#E6B35C]">
                            Before You Book
                        </p>

                        <h2 className="fl-inner-heading mt-2 text-2xl font-semibold text-white sm:text-3xl">
                            A few things worth checking
                        </h2>

                        <p className="fl-inner-muted mt-3 max-w-xl text-sm leading-6 text-white/50">
                            Flight conditions can vary by airline and fare. Review the important details before confirming your journey.
                        </p>
                    </div>

                    <div className="grid gap-3">
                        {[
                            "Check baggage allowance for your selected fare.",
                            "Review cancellation and rescheduling rules.",
                            "Confirm departure and arrival airport details.",
                            "Verify passenger names before completing the booking.",
                        ].map((tip) => (
                            <div key={tip} className="fl-inner-tip flex items-start gap-3 rounded-xl border border-white/7 bg-white/[0.025] p-4">
                                <ShieldCheck size={18} className="fl-inner-accent mt-0.5 shrink-0 text-[#E6B35C]" />
                                <p className="fl-inner-muted text-sm leading-5 text-white/65">{tip}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            <FaqSection
                endpoint="https://api.flyinglyte.com/api/package/airlines/faqs/"
                title="Flight Frequently Asked Questions"
            />

            {/* CTA */}
            <section className="fl-inner-section bg-[#0B0F14] px-4 pb-20 sm:px-6 lg:px-8">
                <div className="fl-inner-cta mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 rounded-[28px] border border-[#E6B35C]/25 bg-linear-to-r from-[#151B21] via-[#111923] to-[#151B21] p-7 text-center sm:p-9 lg:flex-row lg:text-left">
                    <div>
                        <p className="fl-inner-eyebrow text-xs font-semibold uppercase tracking-[0.25em] text-[#E6B35C]">
                            Ready To Fly?
                        </p>

                        <h2 className="fl-inner-heading mt-2 text-2xl font-semibold text-white">
                            Search your next flight with FlyingLyte
                        </h2>
                    </div>

                    <button type="button" onClick={scrollToSearch} className="fl-inner-button rounded-full bg-linear-to-r from-[#F8DE82] to-[#EAA82A] px-7 py-3 text-sm font-semibold text-black transition hover:brightness-105">
                        Search Flights
                    </button>
                </div>
            </section>
        </main>
    );
};

export default FlightsPage;
