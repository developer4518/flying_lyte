import { ShieldCheck, Headset, Wallet, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Wallet,
    title: "Best Price Guarantee",
    desc: "Unbeatable prices on flights, hotels, and holiday packages.",
  },
  {
    icon: BadgeCheck,
    title: "Trusted Partners",
    desc: "Verified airlines and hotels for a safe travel experience.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    desc: "Travel experts available anytime to assist you.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    desc: "Industry-grade security for all your transactions.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="fl-wcu" data-fl-theme="model2">
      {/* Gold ambient glow */}
      <div className="fl-wcu__ambient" />

      <div className="fl-wcu__wrap">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="fl-wcu__heading"
        >
          <h2 className="fl-wcu__title">
            Why Choose Us
          </h2>
          <p className="fl-wcu__subtitle">
            Travel crafted with trust, comfort and premium service
          </p>
        </motion.div>

        {/* Cards */}
        <div className="fl-wcu__features">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.97 }}
                className="fl-wcu__feature cursor-pointer group"
              >
                <div
                  className="fl-wcu__icon group-hover:scale-110 transition"
                >
                  <Icon className="fl-wcu__symbol" />
                </div>

                <h3 className="fl-wcu__feature-title">
                  {item.title}
                </h3>

                <p className="fl-wcu__description">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
