import { useState } from "react";
import Tabs from "./Tabs";
import HotelsForm from "./HotelsForm";
import { useNavigate } from "react-router-dom";
import { Plane, Hotel, Sparkles, ArrowRight } from "lucide-react";

const SearchBox = () => {
  const [activeTab, setActiveTab] = useState("flights");
  const navigate = useNavigate();

  const handleTabChange = (tabId) => {
    if (tabId === "packages") {
      navigate("/packages");
      return;
    }

    setActiveTab(tabId);
  };

  const ComingSoonCard = ({ type }) => {
    const isFlight = type === "flights";

    return (
      <div
        className="
          relative overflow-hidden
          min-h-47.5
          rounded-2xl
          border
          p-4 md:p-6
          flex flex-col items-center justify-center
          text-center
          shadow-[0_18px_55px_rgba(0,0,0,0.45)]
        "
        style={{
          background:
            "linear-gradient(135deg, rgba(18,24,33,0.95), rgba(31,38,52,0.9))",
          borderColor: "rgba(234, 168, 42, 0.22)",
        }}
      >
        <div
          className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl opacity-20"
          style={{
            background:
              "radial-gradient(circle, var(--color-start), transparent 70%)",
          }}
        />

        <div
          className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full blur-3xl opacity-15"
          style={{
            background:
              "radial-gradient(circle, var(--color-end), transparent 70%)",
          }}
        />

        <div
          className="
            relative z-10
            inline-flex items-center gap-2
            px-3 py-1.5
            rounded-full
            border
            text-[10px] md:text-xs
            uppercase tracking-[0.2em]
            mb-3
          "
          style={{
            color: "var(--gold-main)",
            borderColor: "rgba(234, 168, 42, 0.35)",
            background: "rgba(234, 168, 42, 0.08)",
          }}
        >
          <Sparkles size={13} />
          Premium Feature
        </div>

        <div
          className="
            relative z-10
            w-12 h-12 md:w-14 md:h-14
            rounded-2xl
            flex items-center justify-center
            mb-3
            shadow-[0_14px_35px_rgba(234,168,42,0.18)]
          "
          style={{
            background:
              "linear-gradient(135deg, var(--color-start), var(--color-end))",
            color: "#000",
          }}
        >
          {isFlight ? <Plane size={26} /> : <Hotel size={26} />}
        </div>

        <p
          className="relative z-10 text-xs md:text-sm uppercase tracking-[0.25em]"
          style={{ color: "var(--gold-soft)" }}
        >
          {isFlight ? "Flights Booking" : "Hotel Booking"}
        </p>

        <h3
          className="
            relative z-10
            mt-2
            text-2xl md:text-4xl
            font-bold
            leading-tight
          "
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--gold-main)",
          }}
        >
          Coming Soon
        </h3>

        <p
          className="
            relative z-10
            mt-2
            max-w-md
            text-xs md:text-sm
            leading-relaxed
          "
          style={{ color: "var(--text-muted)" }}
        >
          We are preparing a smoother premium{" "}
          {isFlight ? "flight booking" : "hotel booking"} experience.
        </p>

        <div
          className="
            relative z-10
            mt-4
            inline-flex items-center gap-2
            px-4 py-2
            rounded-full
            text-xs font-semibold
            cursor-not-allowed
            opacity-80
          "
          style={{
            background:
              "linear-gradient(90deg, var(--color-start), var(--color-end))",
            color: "#000",
          }}
        >
          Launching Shortly
          <ArrowRight size={14} />
        </div>
      </div>
    );
  };

  const renderForm = () => {
    switch (activeTab) {
      case "flights":
        return <ComingSoonCard type="flights" />;

      case "hotels":
        return <ComingSoonCard type="Hotels" />;

      default:
        return <ComingSoonCard type="flights" />;
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto group">
      <div
        className="absolute -inset-px rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-500"
        style={{
          background:
            "linear-gradient(90deg, var(--color-start), var(--color-end))",
        }}
      />

      <div
        className="
          relative
          rounded-3xl
          p-4 md:p-8
          border
          backdrop-blur-2xl
          shadow-[0_20px_80px_rgba(0,0,0,0.6)]
          transition-all duration-500
          hover:-translate-y-1
        "
        style={{
          background: "rgba(18, 24, 33, 0.85)",
          borderColor: "var(--border-soft)",
          color: "var(--text-main)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-36 h-32 rounded-full opacity-10 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, var(--color-start), transparent 70%)",
          }}
        />

        <div className="mb-3">
          <h2
            className="text-2xl md:text-3xl tracking-wide"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--gold-main)",
            }}
          >
            Plan Your Journey
          </h2>
        </div>

        <Tabs activeTab={activeTab} setActiveTab={handleTabChange} />

        <div className="mt-8 transition-all duration-500">{renderForm()}</div>
      </div>
    </div>
  );
};

export default SearchBox;
