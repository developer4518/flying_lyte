import { ArrowUpRight, Quote, Star } from "lucide-react";

export default function TestimonialCard({ testimonial, compact = false }) {
  const initials = testimonial.name.replace(/[^\p{L}\p{N}\s]/gu, "")
    .trim().split(/\s+/).slice(0, 2).map(word => word[0]).join("").toUpperCase();

  return (
    <article className={`fl-traveler-reviews__card${compact ? " fl-traveler-reviews__card--compact" : ""}`}>
      <div className="fl-traveler-reviews__card-top">
        <span className="fl-traveler-reviews__avatar" aria-hidden="true">{initials}</span>
        <Quote size={24} strokeWidth={1.3} aria-hidden="true" />
      </div>
      <div className="fl-traveler-reviews__stars" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: testimonial.rating }, (_, index) => <Star key={index} size={15} fill="currentColor" strokeWidth={0} aria-hidden="true" />)}
      </div>
      {testimonial.feedback ? (
        <blockquote className="fl-traveler-reviews__quote">{testimonial.feedback}</blockquote>
      ) : (
        <p className="fl-traveler-reviews__rating-only">5-star rating</p>
      )}
      {testimonial.excerpt && <span className="fl-traveler-reviews__excerpt">Review excerpt</span>}
      <footer className="fl-traveler-reviews__author">
        <p>{testimonial.name}</p>
        <span>{testimonial.feedback ? "Traveler review" : "Rating only"}</span>
      </footer>
      {compact && <span className="fl-traveler-reviews__read-label">Read review <ArrowUpRight size={12} aria-hidden="true" /></span>}
    </article>
  );
}
