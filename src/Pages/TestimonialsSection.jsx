import React from "react";
import { testimonials } from "../components/Testimonials/testimonials";
import { motion } from "framer-motion";
import TestimonialCard from "../components/Testimonials/TestimonialCard";

const TestimonialsSection = () => {
  return (
    <section className="fl-editorial fl-testimonials relative py-24 bg-(--bg-main) overflow-hidden" data-fl-theme="model2">
      {/* Subtle glow */}
      <div className="fl-editorial__decor absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,168,42,0.08),transparent_65%)]" />

      <div className="fl-editorial__wrap relative max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="
            fl-editorial__heading fl-editorial__title
            text-center
            font-(--font-heading)
            text-3xl sm:text-4xl
            text-(--gold-main)
            mb-16
          "
        >
          What Our Travelers Say
        </motion.h2>

        <motion.div
          className="fl-editorial__grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              className="fl-editorial__item"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <TestimonialCard testimonial={t} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
