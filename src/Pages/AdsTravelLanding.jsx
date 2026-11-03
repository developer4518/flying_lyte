
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    Check,
    CheckCircle2,
    MapPin,
    PhoneCall,
    ShieldCheck,
    Users,
} from "lucide-react";

// Existing FlyingLyte API
const API_URL =
    import.meta.env.VITE_ADS_LEAD_API_URL ||
    "https://api.flyinglyte.com/api/package/packages/chatbot/lead/";

const STEPS = ["month", "travellers", "city", "contact"];

const INITIAL_DATA = {
    month: "",
    travellers: "",
    city: "",
    name: "",
    phone: "",
    email: "",
};

const TRAVELLERS = [
    { value: "Solo", label: "Solo" },
    { value: "Couple", label: "Couple" },
    { value: "Triple", label: "Triple" },
    { value: "Four+", label: "Four+" },
];

// Only 10-digit Indian mobile numbers.
// The country code is not part of the input.
function indianPhone(value) {
    return /^[6-9][0-9]{9}$/.test(value) ? value : "";
}

// Remove letters, spaces, symbols and excess digits.
function sanitizePhone(value) {
    let digits = String(value).replace(/\D/g, "");

    // Support pasting +91 followed by 10 digits.
    if (
        digits.length === 12 &&
        digits.startsWith("91") &&
        /^[6-9]\d{9}$/.test(digits.slice(2))
    ) {
        digits = digits.slice(2);
    }

    return digits.slice(0, 10);
}

// Reusable selection button
function Choice({ label, selected, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={selected}
            className={`
        flex min-h-[54px] w-full min-w-0
        items-center justify-between gap-2
        rounded-xl border px-3 py-3
        text-left text-xs font-medium
        transition-all duration-200
        min-[400px]:px-4 min-[400px]:text-sm
        ${selected
                    ? "border-[#C5A16B] bg-[#FFF8EB] text-[#183D59]"
                    : "border-[#E1E7EA] bg-white text-[#425F70] hover:border-[#C5A16B] hover:bg-[#FFFCF7]"
                }
      `}
        >
            <span className="min-w-0 break-words">{label}</span>

            <span
                className={`
          flex h-5 w-5 shrink-0 items-center
          justify-center rounded-full border-2
          ${selected
                        ? "border-[#C5A16B] bg-[#C5A16B]"
                        : "border-[#9BAAB4]"
                    }
        `}
            >
                {selected && (
                    <Check size={13} className="text-white" />
                )}
            </span>
        </button>
    );
}

export default function AdsTravelLanding() {
    const [data, setData] = useState(INITIAL_DATA);
    const [step, setStep] = useState(0);
    const [agreed, setAgreed] = useState(false);
    const [sending, setSending] = useState(false);
    const [finished, setFinished] = useState(false);
    const [error, setError] = useState("");
    const [logoMissing, setLogoMissing] = useState(false);
    const [phoneTouched, setPhoneTouched] = useState(false);

    const currentField = STEPS[step];
    const isLast = step === STEPS.length - 1;
    const isOptional = step === 0 || step === 1;

    // Upcoming six travel months
    const months = useMemo(() => {
        return Array.from({ length: 6 }, (_, i) => {
            const date = new Date();
            date.setDate(1);
            date.setMonth(date.getMonth() + i);

            return date.toLocaleDateString("en-IN", {
                month: "long",
                year: "numeric",
            });
        });
    }, []);

    // Page title and search engine indexing
    useEffect(() => {
        const previousTitle = document.title;

        document.title =
            "Plan Your Trip | FlyingLyte Travel";

        let robots = document.querySelector(
            'meta[name="robots"]'
        );

        const created = !robots;

        if (!robots) {
            robots = document.createElement("meta");
            robots.name = "robots";
            document.head.appendChild(robots);
        }

        const previousContent = robots.content;

        robots.content = "noindex, follow";

        return () => {
            document.title = previousTitle;

            if (created) {
                robots.remove();
            } else {
                robots.content = previousContent;
            }
        };
    }, []);

    // Update form state
    function updateField(key, value) {
        setData((previous) => ({
            ...previous,
            [key]: value,
        }));

        setError("");
    }

    // Phone input handler
    function handlePhoneChange(event) {
        const cleanPhone = sanitizePhone(
            event.target.value
        );

        updateField("phone", cleanPhone);
    }

    function nextStep() {
        if (!isLast) {
            setError("");
            setStep((previous) => previous + 1);
        }
    }

    function choose(value) {
        updateField(currentField, value);
        nextStep();
    }

    function skipStep() {
        if (!isOptional) return;

        updateField(currentField, "");
        nextStep();
    }

    function previousStep() {
        if (step > 0) {
            setError("");
            setStep((previous) => previous - 1);
        }
    }

    // Form validation
    function validate() {
        // Step 1 and Step 2 are optional.

        // Step 3: Departure city
        if (step === 2) {
            if (data.city.trim().length < 2) {
                return "Please enter your departure city.";
            }
        }

        // Step 4: Contact information
        if (step === 3) {
            if (data.name.trim().length < 2) {
                return "Please enter your full name.";
            }

            if (!indianPhone(data.phone)) {
                return "Please enter a valid 10-digit Indian mobile number.";
            }

            const validEmail =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                    data.email.trim()
                );

            if (!validEmail) {
                return "Please enter a valid email address.";
            }

            if (!agreed) {
                return "Please accept the Privacy Policy to continue.";
            }
        }

        return "";
    }

    // Submit lead to existing backend
    async function handleSubmit(event) {
        event.preventDefault();

        if (sending) return;

        const validationError = validate();

        if (validationError) {
            setError(validationError);
            return;
        }

        if (!isLast) {
            nextStep();
            return;
        }

        // Campaign attribution
        const params = new URLSearchParams(
            window.location.search
        );

        const trackingKeys = [
            "utm_source",
            "utm_medium",
            "utm_campaign",
            "utm_content",
            "utm_term",
            "fbclid",
            "gclid",
        ];

        const tracking = trackingKeys
            .filter((key) => params.get(key))
            .map(
                (key) =>
                    `${key}: ${params.get(key).slice(0, 120)}`
            );

        const message = [
            "Source: FlyingLyte Ads Landing Page",
            `Travel month: ${data.month || "Not provided"}`,
            `Travellers: ${data.travellers || "Not provided"}`,
            `Departure city: ${data.city.trim()}`,
            `Email: ${data.email.trim()}`,
            "Privacy consent: Accepted",
            "Permission to contact: Yes",
            ...tracking,
        ].join("\n");

        setSending(true);
        setError("");

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name.trim(),
                    phone: indianPhone(data.phone),
                    destination: "General Travel Enquiry",
                    message,
                }),
            });

            const result = await response
                .json()
                .catch(() => null);

            if (
                !response.ok ||
                result?.success === false
            ) {
                throw new Error("Lead submission failed");
            }

            setFinished(true);

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
        } catch {
            setError(
                "Unable to submit your enquiry. Please try again."
            );
        } finally {
            setSending(false);
        }
    }

    // Shared input styling
    const inputClass = `
    w-full min-w-0 rounded-xl
    border border-[#DFE6EA]
    bg-white px-4 py-3.5
    text-base text-[#183449]
    outline-none transition
    placeholder:text-[#A0ADB6]
    focus:border-[#C4A06A]
    focus:ring-2 focus:ring-[#C4A06A]/15
  `;

    // Step-by-step questions
    function question() {
        switch (step) {
            // STEP 1: Travel month (Optional)
            case 0:
                return (
                    <>
                        <div className="mb-3 flex items-center gap-2 text-[#BE9451]">
                            <CalendarDays size={19} />

                            <span className="text-xs font-bold uppercase tracking-widest">
                                Travel Dates
                            </span>
                        </div>

                        <div className="flex items-start justify-between gap-3">
                            <h2 className="min-w-0 text-xl font-bold leading-tight text-[#16374F] sm:text-2xl">
                                When are you planning to go?
                            </h2>

                            <span className="shrink-0 rounded-full bg-[#FFF3DD] px-2.5 py-1 text-[11px] font-semibold text-[#A47B37]">
                                Optional
                            </span>
                        </div>

                        <p className="mt-3 text-sm leading-6 text-[#748693]">
                            Select your preferred travel month.
                        </p>

                        <div className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-3">
                            {months.map((month) => (
                                <Choice
                                    key={month}
                                    label={month}
                                    selected={data.month === month}
                                    onClick={() => choose(month)}
                                />
                            ))}
                        </div>

                        <div className="mt-3">
                            <Choice
                                label="My dates are flexible"
                                selected={data.month === "Flexible"}
                                onClick={() => choose("Flexible")}
                            />
                        </div>
                    </>
                );

            // STEP 2: Travellers (Optional)
            case 1:
                return (
                    <>
                        <div className="mb-3 flex items-center gap-2 text-[#BE9451]">
                            <Users size={19} />

                            <span className="text-xs font-bold uppercase tracking-widest">
                                Travellers
                            </span>
                        </div>

                        <div className="flex items-start justify-between gap-3">
                            <h2 className="min-w-0 text-xl font-bold leading-tight text-[#16374F] sm:text-2xl">
                                How many people are travelling?
                            </h2>

                            <span className="shrink-0 rounded-full bg-[#FFF3DD] px-2.5 py-1 text-[11px] font-semibold text-[#A47B37]">
                                Optional
                            </span>
                        </div>

                        <p className="mt-3 text-sm leading-6 text-[#748693]">
                            Select the number of travellers or skip.
                        </p>

                        <div className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-3">
                            {TRAVELLERS.map((item) => (
                                <Choice
                                    key={item.value}
                                    label={item.label}
                                    selected={
                                        data.travellers === item.value
                                    }
                                    onClick={() => choose(item.value)}
                                />
                            ))}
                        </div>
                    </>
                );

            // STEP 3: Departure city
            case 2:
                return (
                    <>
                        <div className="mb-3 flex items-center gap-2 text-[#BE9451]">
                            <MapPin size={19} />

                            <span className="text-xs font-bold uppercase tracking-widest">
                                Departure City
                            </span>
                        </div>

                        <h2 className="text-xl font-bold text-[#16374F] sm:text-2xl">
                            Departure from?
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-[#748693]">
                            Which city will you be travelling from?
                        </p>

                        <label
                            htmlFor="ads-city"
                            className="mb-2 mt-6 block text-sm font-semibold text-[#324C5D]"
                        >
                            Departure City *
                        </label>

                        <input
                            id="ads-city"
                            type="text"
                            autoComplete="address-level2"
                            value={data.city}
                            onChange={(e) =>
                                updateField("city", e.target.value)
                            }
                            placeholder="Delhi, Mumbai, Bengaluru..."
                            maxLength={80}
                            className={inputClass}
                        />
                    </>
                );

            // STEP 4: Contact information
            case 3:
                return (
                    <>
                        <div className="mb-3 flex items-center gap-2 text-[#BE9451]">
                            <ShieldCheck size={19} />

                            <span className="text-xs font-bold uppercase tracking-widest">
                                Final Step
                            </span>
                        </div>

                        <h2 className="text-xl font-bold text-[#16374F] sm:text-2xl">
                            Contact Information
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-[#748693]">
                            Share your details so our travel expert
                            can contact you regarding your trip.
                        </p>

                        <div className="mt-6 space-y-5">
                            {/* Full Name */}
                            <div>
                                <label
                                    htmlFor="ads-name"
                                    className="mb-2 block text-sm font-semibold text-[#324C5D]"
                                >
                                    Full Name *
                                </label>

                                <input
                                    id="ads-name"
                                    type="text"
                                    autoComplete="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        updateField("name", e.target.value)
                                    }
                                    maxLength={100}
                                    placeholder="Enter your full name"
                                    className={inputClass}
                                />
                            </div>

                            {/* Mobile Number */}
                            <div>
                                <label
                                    htmlFor="ads-phone"
                                    className="mb-2 block text-sm font-semibold text-[#324C5D]"
                                >
                                    Phone Number *
                                </label>

                                <div
                                    className="
                    flex w-full min-w-0 overflow-hidden
                    rounded-xl border border-[#DFE6EA]
                    bg-white transition
                    focus-within:border-[#C4A06A]
                    focus-within:ring-2
                    focus-within:ring-[#C4A06A]/15
                  "
                                >
                                    <span
                                        className="
                      flex shrink-0 items-center
                      border-r border-[#DFE6EA]
                      bg-[#F6F8F9] px-3
                      text-sm font-semibold text-[#183D59]
                      sm:px-4
                    "
                                    >
                                        +91
                                    </span>

                                    <input
                                        id="ads-phone"
                                        type="tel"
                                        inputMode="numeric"
                                        autoComplete="tel-national"
                                        value={data.phone}
                                        onChange={handlePhoneChange}
                                        onBlur={() => setPhoneTouched(true)}
                                        placeholder="10-digit mobile number"
                                        pattern="[6-9][0-9]{9}"
                                        aria-describedby="ads-phone-help"
                                        aria-invalid={
                                            phoneTouched &&
                                            data.phone.length > 0 &&
                                            !indianPhone(data.phone)
                                        }
                                        className="
                      w-full min-w-0 flex-1
                      bg-white px-3 py-3.5
                      text-base text-[#183449]
                      outline-none
                      placeholder:text-[#A0ADB6]
                      sm:px-4
                    "
                                    />
                                </div>

                                <p
                                    id="ads-phone-help"
                                    className="mt-2 text-xs leading-5 text-[#8395A0]"
                                >
                                    Enter exactly 10 digits without country code.
                                </p>

                                {phoneTouched &&
                                    data.phone.length > 0 &&
                                    !indianPhone(data.phone) && (
                                        <p
                                            role="alert"
                                            className="mt-2 text-xs font-medium text-red-600"
                                        >
                                            Enter a valid 10-digit number starting with 6, 7, 8 or 9.
                                        </p>
                                    )}

                                {indianPhone(data.phone) && (
                                    <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-green-700">
                                        <CheckCircle2 size={14} />
                                        Valid mobile number
                                    </p>
                                )}
                            </div>

                            {/* Email Address */}
                            <div>
                                <label
                                    htmlFor="ads-email"
                                    className="mb-2 block text-sm font-semibold text-[#324C5D]"
                                >
                                    Email Address *
                                </label>

                                <input
                                    id="ads-email"
                                    type="email"
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        updateField("email", e.target.value)
                                    }
                                    maxLength={254}
                                    placeholder="Enter your email address"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Privacy Policy */}
                        <div className="mt-6 rounded-xl border border-[#ECE6DC] bg-[#FAF8F4] p-4">
                            <div className="flex items-center gap-2">
                                <ShieldCheck
                                    size={18}
                                    className="text-[#B78C42]"
                                />

                                <span className="text-sm font-semibold text-[#183D59]">
                                    Privacy & Consent
                                </span>
                            </div>

                            <p className="mt-2 text-xs leading-6 text-[#687E8B]">
                                FlyingLyte uses your details to respond
                                to your travel enquiry and prepare
                                relevant travel recommendations.
                            </p>

                            <a
                                href="/privacy-policy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 inline-block text-xs font-semibold text-[#A47B37] underline underline-offset-4"
                            >
                                View FlyingLyte's Privacy Policy
                            </a>
                        </div>

                        <label className="mt-5 flex cursor-pointer items-start gap-3">
                            <input
                                type="checkbox"
                                checked={agreed}
                                onChange={(e) => {
                                    setAgreed(e.target.checked);
                                    setError("");
                                }}
                                className="mt-1 h-4 w-4 shrink-0 accent-[#183D59]"
                            />

                            <span className="text-xs leading-6 text-[#526C7A]">
                                I have read the Privacy Policy and
                                agree to FlyingLyte contacting me
                                regarding my travel enquiry.
                            </span>
                        </label>
                    </>
                );

            default:
                return null;
        }
    }

    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-[#FAF9F6] font-sans text-[#183449]">
            {/* Header */}
            <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-8 sm:py-5">
                {!logoMissing ? (
                    <img
                        src="/flyinglyte-logo.png"
                        alt="FlyingLyte Travel"
                        onError={() => setLogoMissing(true)}
                        className="h-10 max-w-36 shrink-0 object-contain object-left sm:h-12 sm:max-w-44"
                    />
                ) : (
                    <span className="text-base font-extrabold text-[#183D59] sm:text-xl">
                        FLYINGLYTE
                        <span className="text-[#C9A35F]">
                            .
                        </span>
                    </span>
                )}

                <a
                    href="tel:+919667455591"
                    aria-label="Call FlyingLyte Now"
                    className="
            inline-flex min-h-[42px] shrink-0
            items-center justify-center gap-2
            rounded-full bg-[#183D59]
            px-3 py-2.5 text-xs font-semibold
            text-white shadow-md transition
            hover:bg-[#C9A35F]
            hover:text-[#183D59]
            sm:px-6 sm:py-3 sm:text-sm
          "
                >
                    <PhoneCall size={16} />
                    Call Now
                </a>
            </header>

            {/* Main */}
            <main
                className="
          mx-auto grid w-full max-w-6xl min-w-0
          grid-cols-1 items-start gap-5
          px-3 pb-12 pt-3
          min-[380px]:px-4
          sm:gap-7 sm:px-8
          lg:grid-cols-2 lg:items-center
          lg:gap-12 lg:py-12
        "
            >
                {/* Desktop Introduction */}
                <section className="hidden min-w-0 lg:block">
                    <span className="inline-flex items-center rounded-full bg-[#FFF2DE] px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#A47B37]">
                        Plan your next holiday
                    </span>

                    <h1 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight text-[#153750] xl:text-5xl">
                        Let's plan your
                        <br />
                        <span className="text-[#BE9451]">
                            perfect escape.
                        </span>
                    </h1>

                    <p className="mt-5 max-w-md text-base leading-8 text-[#68808F]">
                        Share a few details about your travel plans.
                        Our team will help you explore your next
                        memorable journey.
                    </p>

                    <div className="relative mt-8 overflow-hidden rounded-3xl bg-[#183D59] p-7 text-white shadow-lg xl:p-9">
                        <div className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-[#C9A35F]/20 blur-3xl" />

                        <CalendarDays
                            size={36}
                            className="relative text-[#E6C48F]"
                        />

                        <h3 className="relative mt-6 text-2xl font-bold">
                            Travel your way.
                        </h3>

                        <p className="relative mt-3 max-w-sm text-sm leading-7 text-white/80">
                            Personalised holiday planning with
                            FlyingLyte Travel.
                        </p>

                        <div className="relative mt-7 flex flex-wrap gap-2">
                            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium">
                                Custom Trips
                            </span>

                            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium">
                                Travel Planning
                            </span>
                        </div>
                    </div>
                </section>

                {/* Mobile Heading */}
                <div className="min-w-0 lg:hidden">
                    <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#B58D4C]">
                        Your journey starts here
                    </p>

                    <h1 className="text-2xl font-extrabold leading-tight text-[#16374F] sm:text-3xl">
                        Let's plan your perfect trip.
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-[#748693]">
                        Four quick steps to get started.
                    </p>
                </div>

                {/* Main Form Card */}
                <section
                    aria-label="Trip enquiry"
                    className="
            w-full min-w-0 overflow-hidden
            rounded-2xl border border-[#E7EAEC]
            bg-white p-4
            shadow-[0_20px_60px_rgba(16,52,74,0.08)]
            sm:rounded-3xl sm:p-7
            xl:p-8
          "
                >
                    {finished ? (
                        // Thank You Screen
                        <div
                            role="status"
                            className="flex min-h-[320px] flex-col items-center justify-center py-8 text-center"
                        >
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#EAF7EE]">
                                <CheckCircle2
                                    size={48}
                                    className="text-[#39865B]"
                                />
                            </div>

                            <h2 className="mt-6 text-2xl font-bold text-[#16374F]">
                                Thank you,{" "}
                                {data.name.trim().split(/\s+/)[0]}!
                            </h2>

                            <p className="mt-3 max-w-sm text-sm leading-7 text-[#6C8190]">
                                Your travel enquiry has been submitted.
                                The FlyingLyte team can contact you
                                regarding your trip.
                            </p>

                            <a
                                href="/privacy-policy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#DCE4E8] bg-white px-6 py-3 text-sm font-semibold text-[#183D59] transition hover:border-[#C9A35F] hover:bg-[#FFF9ED]"
                            >
                                <ShieldCheck size={16} />
                                Privacy Policy
                            </a>
                        </div>
                    ) : (
                        <>
                            {/* Step Counter */}
                            <div className="mb-5 flex items-center justify-between gap-3">
                                <span className="min-w-0 text-[11px] font-extrabold uppercase tracking-wider text-[#A37A38] sm:text-xs sm:tracking-widest">
                                    Plan your perfect trip
                                </span>

                                <span className="shrink-0 rounded-full bg-[#F4F7F8] px-3 py-1.5 text-xs font-bold text-[#59717F]">
                                    {step + 1} of {STEPS.length}
                                </span>
                            </div>

                            {/* Progress Bar */}
                            <div
                                role="progressbar"
                                aria-label="Form progress"
                                aria-valuenow={step + 1}
                                aria-valuemin={1}
                                aria-valuemax={STEPS.length}
                                className="mb-7 h-1.5 overflow-hidden rounded-full bg-[#EEF1F2]"
                            >
                                <motion.div
                                    className="h-full rounded-full bg-[#C9A35F]"
                                    initial={false}
                                    animate={{
                                        width: `${((step + 1) / STEPS.length) * 100
                                            }%`,
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        ease: "easeOut",
                                    }}
                                />
                            </div>

                            <form onSubmit={handleSubmit} noValidate>
                                {/* Current Question */}
                                <div className="min-h-[240px] min-w-0">
                                    <AnimatePresence
                                        mode="wait"
                                        initial={false}
                                    >
                                        <motion.div
                                            key={step}
                                            initial={{
                                                opacity: 0,
                                                y: 12,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: -8,
                                            }}
                                            transition={{
                                                duration: 0.2,
                                            }}
                                        >
                                            {question()}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Validation Error */}
                                {error && (
                                    <p
                                        role="alert"
                                        className="mb-4 rounded-xl bg-[#FFF0ED] p-3 text-sm text-[#A5392D]"
                                    >
                                        {error}
                                    </p>
                                )}

                                {/* Navigation */}
                                <div className="mt-7 flex min-w-0 gap-2 border-t border-[#EBEFF1] pt-5 sm:gap-3">
                                    {step > 0 && (
                                        <button
                                            type="button"
                                            onClick={previousStep}
                                            disabled={sending}
                                            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-[#DFE6EA] px-3 py-3 text-sm font-semibold text-[#183D59] transition hover:bg-[#F6F8F9] disabled:opacity-60 sm:gap-2 sm:px-4"
                                        >
                                            <ArrowLeft size={17} />
                                            Back
                                        </button>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={sending}
                                        className="flex min-h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-[#183D59] px-3 py-3 text-sm font-bold text-white transition hover:bg-[#102E45] disabled:cursor-not-allowed disabled:opacity-60 sm:px-4"
                                    >
                                        {sending
                                            ? "Submitting..."
                                            : isLast
                                                ? "Submit Enquiry"
                                                : "Continue"}

                                        {!sending && (
                                            <ArrowRight
                                                size={17}
                                                className="shrink-0"
                                            />
                                        )}
                                    </button>
                                </div>

                                {/* Optional Steps */}
                                {isOptional && (
                                    <button
                                        type="button"
                                        onClick={skipStep}
                                        className="mt-3 min-h-12 w-full rounded-xl border border-[#E4E9ED] bg-[#F8F9FA] px-4 py-3 text-sm font-semibold text-[#647B89] transition hover:bg-[#EEF2F4]"
                                    >
                                        Skip for now
                                    </button>
                                )}
                            </form>

                            <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-[11px] text-[#91A0A9]">
                                <ShieldCheck
                                    size={13}
                                    className="shrink-0"
                                />
                                No payment required to enquire.
                            </p>
                        </>
                    )}
                </section>
            </main>

            {/* Footer */}
            <footer className="mx-auto w-full max-w-6xl border-t border-[#E5E9EB] px-4 py-6 text-center text-xs leading-6 text-[#8FA0AA] sm:px-8">
                © {new Date().getFullYear()} FlyingLyte Travel.
                All rights reserved.
            </footer>
        </div>
    );
}
