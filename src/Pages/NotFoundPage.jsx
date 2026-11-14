import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return <section className="fl-public-not-found">
    <div><p className="fl-public-eyebrow">A little detour</p><h1 className="fl-booking-title">404 - Page Not Found</h1><p>Let’s get you back to your next journey.</p><Link className="fl-booking-button fl-booking-primary" to="/">Back to Home ↗</Link></div>
    <img src="/images/model2-coast.avif" alt="A peaceful coastline" />
  </section>;
}
