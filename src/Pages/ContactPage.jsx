import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const ContactPage = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      setLoading(true);
      await axios.post("/api/contact", formData);

      // Google Ads - Contact Conversion
      if (typeof window.gtag === "function") {
        window.gtag("event", "conversion", {
          send_to: "AW-18404161246/IC0qCLXvnegcEN7t5MdE",
        });
      }

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <section className="relative min-h-screen overflow-hidden bg-[#0B0F14] px-4 pb-16 pt-28 text-white sm:px-6 md:pt-32">
    {/* BACKGROUND GLOWS */}
    <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-[#E6B35C]/5 blur-[120px]" />
    <div className="pointer-events-none absolute -left-32 top-1/2 h-80 w-80 rounded-full bg-[#E6B35C]/5 blur-[110px]" />
    <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#E6B35C]/5 blur-[110px]" />

    <div className="relative z-10 mx-auto max-w-6xl">
      {/* HEADER */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#E6B35C] sm:text-xs">
          WE&apos;RE HERE TO HELP
        </p>

        <h1 className="text-4xl font-semibold tracking-tight text-[#FFF8E8] sm:text-5xl md:text-6xl">
          Contact <span className="bg-linear-to-r from-[#F8D77D] via-[#E6B35C] to-[#C99132] bg-clip-text text-transparent">Us</span>
        </h1>

        <div className="mt-4 flex items-center justify-center gap-3">
          <span className="h-px w-14 bg-linear-to-r from-transparent to-[#E6B35C]/70" />
          <span className="h-2.5 w-2.5 rotate-45 border border-[#E6B35C]/70 shadow-[0_0_12px_rgba(230,179,92,0.55)]" />
          <span className="h-px w-14 bg-linear-to-l from-transparent to-[#E6B35C]/70" />
        </div>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/55 sm:text-base">
          Have questions about flights, hotels, or travel packages? Our travel experts are here to help you plan the perfect journey.
        </p>
      </motion.div>

      {/* CONTENT GRID */}
      <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-7">
        {/* FORM CARD */}
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="relative overflow-hidden rounded-[26px] border border-[#E6B35C]/20 bg-[#101721]/85 p-5 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-7 md:p-8">
          {/* GOLD SHINE */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-px w-40 -translate-x-1/2 bg-linear-to-r from-transparent via-[#FFE08A] to-transparent shadow-[0_0_16px_rgba(255,224,138,0.8)]" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#E6B35C]/7 blur-3xl" />

          <div className="relative mb-6">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#E6B35C]">
              GET IN TOUCH
            </p>
            <h3 className="text-2xl font-semibold text-white">Send us a message</h3>
            <p className="mt-1 text-sm text-white/45">Fill in the details and our team will get back to you.</p>
          </div>

          <form className="relative grid gap-4" onSubmit={handleSubmit}>
            {["name", "email", "subject"].map((field) => (
              <input
                key={field}
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="h-14 w-full rounded-2xl border border-white/20 bg-white/[0.08] px-4 text-sm text-white placeholder:text-white/45 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_8px_24px_rgba(0,0,0,0.22)] outline-none transition duration-300 hover:border-white/30 hover:bg-white/[0.10] focus:border-[#E6B35C]/70 focus:bg-white/[0.12] focus:ring-2 focus:ring-[#E6B35C]/15"
              />
            ))}

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              placeholder="Your Message"
              className="min-h-[160px] w-full resize-none rounded-2xl border border-white/20 bg-white/[0.08] px-4 py-4 text-sm text-white placeholder:text-white/45 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_8px_24px_rgba(0,0,0,0.22)] outline-none transition duration-300 hover:border-white/30 hover:bg-white/[0.10] focus:border-[#E6B35C]/70 focus:bg-white/[0.12] focus:ring-2 focus:ring-[#E6B35C]/15"
            />

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="mt-1 flex h-12 w-full items-center justify-center rounded-xl bg-linear-to-r from-[#F8D77D] to-[#EAA82A] px-8 text-sm font-semibold text-black shadow-[0_12px_32px_rgba(234,168,42,0.22)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
            >
              {loading ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>

        {/* CONTACT INFO */}
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="relative overflow-hidden rounded-[26px] border border-[#E6B35C]/20 bg-[#101721]/85 p-5 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-7 md:p-8">
          <div className="pointer-events-none absolute left-1/2 top-0 h-px w-40 -translate-x-1/2 bg-linear-to-r from-transparent via-[#FFE08A] to-transparent shadow-[0_0_16px_rgba(255,224,138,0.8)]" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-[#E6B35C]/7 blur-3xl" />

          <div className="relative">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#E6B35C]">
              CONTACT DETAILS
            </p>
            <h3 className="text-2xl font-semibold text-white">Talk to our travel team</h3>
            <p className="mt-1 text-sm leading-6 text-white/45">
              Reach us directly for bookings, travel assistance or general enquiries.
            </p>
          </div>

          <div className="relative mt-7 space-y-3">
            {/* EMAIL */}
            <motion.a whileHover={{ x: 4 }} href="mailto:info@flyinglyte.com" className="group flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.035] p-4 transition hover:border-[#E6B35C]/30 hover:bg-[#E6B35C]/5">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#E6B35C]/25 bg-[#E6B35C]/10 text-[#E6B35C]">
                <Mail size={20} />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-white/40">Email us</p>
                <p className="truncate text-sm font-medium text-white/90 transition group-hover:text-[#F2D17B]">info@flyinglyte.com</p>
              </div>
            </motion.a>

            {/* PHONE */}
            <motion.a whileHover={{ x: 4 }} href="tel:+919667455591" className="group flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.035] p-4 transition hover:border-[#E6B35C]/30 hover:bg-[#E6B35C]/5">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#E6B35C]/25 bg-[#E6B35C]/10 text-[#E6B35C]">
                <Phone size={20} />
              </div>

              <div>
                <p className="text-xs text-white/40">Call us</p>
                <p className="text-sm font-medium text-white/90 transition group-hover:text-[#F2D17B]">+91 9667455591</p>
              </div>
            </motion.a>

            {/* OFFICE */}
            <motion.div whileHover={{ x: 4 }} className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.035] p-4 transition hover:border-[#E6B35C]/30 hover:bg-[#E6B35C]/5">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#E6B35C]/25 bg-[#E6B35C]/10 text-[#E6B35C]">
                <MapPin size={20} />
              </div>

              <div>
                <p className="text-xs text-white/40">Visit our office</p>
                <p className="text-sm font-medium text-white/90">Gagan Vihar, New Delhi, India</p>
              </div>
            </motion.div>
          </div>

          {/* RESPONSE NOTE */}
          <div className="relative mt-7 rounded-2xl border border-[#E6B35C]/15 bg-[#E6B35C]/5 px-4 py-3">
            <p className="text-xs leading-5 text-white/55">
              <span className="font-semibold text-[#E6B35C]">Quick response:</span>{" "}
              Our team usually responds within 24 hours.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
};

export default ContactPage;
