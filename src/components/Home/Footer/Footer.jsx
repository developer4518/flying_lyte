import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { footerLinks } from "./footerLinks";

import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const paymentMethods = [
    { name: "Google Pay", image: "/images/payments/gpay.jpeg" },
    { name: "Maestro", image: "/images/payments/maestro.jpeg" },
    { name: "Mastercard", image: "/images/payments/mastercard.jpeg" },
    { name: "Online Shopping", image: "/images/payments/onlineshoping.jpeg" },
    { name: "PayPal", image: "/images/payments/paypal.jpeg" },
    { name: "Visa", image: "/images/payments/visa.jpeg" },
  ];

  return (
    <footer className="fl-footer" data-fl-theme="model2">
      <div className="fl-footer__wrap">
        {/* Top Section */}
        <div className="fl-footer__top">
          {/* Brand */}
          <div className="fl-footer__brand">
            <img
               src="/images/flying_logo.png"
               alt="FlyingLyte Logo"
               className="fl-footer__logo cursor-pointer"
               onClick={() => navigate("/")}
             loading="lazy" />

            <p className="fl-footer__description">
              FlyingLyte helps you book flights, hotels, and holiday packages at
              the best prices with a fast and secure experience.
            </p>

            {/* Contact */}
            <div className="fl-footer__contacts">
              {/* Address */}
              <div className="fl-footer__address">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>
                  316, Gagan Vihar,Nearest Metro : Preet Vihar
                  Delhi-110051
                </span>
              </div>

              {/* Email */}
              <a
                href="mailto:info@flyinglyte.com"
                className="fl-footer__contact-link transition"
              >
                <Mail size={16} /> info@flyinglyte.com
              </a>

              {/* Phone Call */}
              <a
                href="tel:+919667455591"
                className="fl-footer__contact-link transition"
              >
                <Phone size={16} /> +91 9667455591
              </a>

              {/* WhatsApp Chat */}
              <a
                href="https://wa.me/919667455591"
                target="_blank"
                rel="noopener noreferrer"
                className="fl-footer__contact-link transition"
              >
                <Phone size={16} /> Chat on WhatsApp
              </a>


              {/* GST Number */}
              <div className="fl-footer__gst">
                <span className="fl-footer__gst-label">GSTIN:</span>
                <span>07AALFF0579Q1ZP</span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="fl-footer__column">
              <h3 className="fl-footer__heading">
                {section}
              </h3>

              <ul className="fl-footer__links">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="fl-footer__nav-link transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>


        {/* We Accept */}
        <div className="fl-footer__payments">
          <span className="fl-footer__payment-label">
            WE ACCEPT:
          </span>

          {paymentMethods.map((payment) => (
            <div
              key={payment.name}
              className="fl-footer__payment"
            >
              <img
                src={payment.image}
                alt={payment.name}
                className="fl-footer__payment-image"
               loading="lazy" />
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="fl-footer__divider">
          {/* Bottom Bar */}
          <div className="fl-footer__bottom">
            <p className="fl-footer__copyright">
              © 2024 FlyingLyte. All rights reserved.
            </p>

            {/* Payment + Social Icons */}
            <div className="fl-footer__social-wrap">

              {/* We Accept */}
              {/* <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
                <span className="text-sm font-semibold text-white mr-1">
                  WE ACCEPT:
                </span>

                {paymentMethods.map((payment) => (
                  <div
                    key={payment.name}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden"
                  >
                    <img
                      src={payment.image}
                      alt={payment.name}
                      className="w-full h-full object-contain p-1"
                     loading="lazy" />
                  </div>
                ))}
              </div> */}

              {/* Social Icons */}
              <div className="fl-footer__socials">
                <a
                  href="https://www.facebook.com/Flying-Lyte/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="fl-footer__social-link transition"
                >
                  <Facebook size={18} />
                </a>

                <a
                  href="https://www.instagram.com/flying_lyte/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="fl-footer__social-link transition"
                >
                  <Instagram size={18} />
                </a>

                <a
                  href="https://x.com/flyinglyte"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="fl-footer__social-link transition"
                >
                  <Twitter size={18} />
                </a>
              </div>

            </div>
          </div>

          <div className="fl-footer__credit">
            <p>
              Designed & Developed By
              <a
                href="https://www.infrivasolutions.com"
                target="_blank"
                rel="noopener noreferrer"
                className="fl-footer__credit-link transition"
              >
                Infriva Solutions
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
