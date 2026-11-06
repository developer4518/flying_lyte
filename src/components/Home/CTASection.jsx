import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { EscapePlanner } from "./TravelEditorial";

const CTASection = ({ appearance = "default" }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    date: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const whatsappNumber = "919667455591"; // your whatsapp number

    const text = `
New Custom Travel Request ✈️

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Destination: ${formData.destination}
Travel Date: ${formData.date}

Requirements:
${formData.message}
`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank");
  };

  return (
    <>
      {appearance === "planner" ? <EscapePlanner onEnquire={() => setOpen(true)} /> : <section className="fl-cta" data-fl-theme="model2">
        {/* Gold spotlight */}
        <div className="fl-cta__ambient" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="fl-cta__banner"
        >
          <h2 className="fl-cta__title">
            Craft Your Perfect Journey With Us
          </h2>

          <p className="fl-cta__intro">
            Exclusive deals, seamless bookings, and unforgettable travel
            experiences.
          </p>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ y: -3, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => setOpen(true)}
            className="fl-cta__launch transition"
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </section>}

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fl-cta-modal"
            data-fl-theme="model2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 60 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 60 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="fl-cta-modal__panel"
            >
              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                className="fl-cta-modal__close transition"
              >
                ✕
              </button>

              <h3 className="fl-cta-modal__title">
                Request Custom Package
              </h3>

              <p className="fl-cta-modal__intro">
                Tell us your travel plans and we’ll design the perfect trip for
                you.
              </p>

              <form
                className="fl-cta-modal__form"
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="fl-cta-modal__field fl-cta-modal__field--wide transition"
                />

                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="fl-cta-modal__field transition"
                />

                <input
                  type="tel"
                  name="phone"
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="fl-cta-modal__field transition"
                />

                <input
                  type="text"
                  name="destination"
                  onChange={handleChange}
                  placeholder="Preferred Destination"
                  className="fl-cta-modal__field transition"
                />

                <input
                  type="date"
                  name="date"
                  onChange={handleChange}
                  placeholder="Preferred Date"
                  className="fl-cta-modal__field transition"
                />

                <textarea
                  placeholder="Travel Requirements"
                  name="message"
                  onChange={handleChange}
                  className="fl-cta-modal__field fl-cta-modal__field--wide fl-cta-modal__message transition"
                />

                <motion.button
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ scale: 1.02 }}
                  type="submit"
                  className="fl-cta-modal__submit transition"
                >
                  Submit Request
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CTASection;
