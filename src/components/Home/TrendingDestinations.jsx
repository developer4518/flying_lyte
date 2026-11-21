import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { destinationPackagesUrl, packageDestinations } from "../../data/packageDestinations";

export default function TrendingDestinations({ placement = "home", selected = "" }) {
  const headingId = useId();
  const track = useRef(null);
  const [pagination, setPagination] = useState({ page: 0, pages: 2 });

  useEffect(() => {
    const element = track.current;
    const measure = () => {
      const gap = parseFloat(getComputedStyle(element).columnGap) || 0;
      const step = element.firstElementChild.getBoundingClientRect().width + gap;
      const perPage = Math.max(1, Math.round((element.clientWidth + gap) / step));
      const pages = Math.ceil(packageDestinations.length / perPage);
      const atEnd = element.scrollLeft >= element.scrollWidth - element.clientWidth - 2;
      const page = atEnd ? pages - 1 : Math.min(pages - 1, Math.round(element.scrollLeft / (element.clientWidth + gap)));
      setPagination(previous => previous.page === page && previous.pages === pages ? previous : { page, pages });
    };
    const resize = new ResizeObserver(measure);
    resize.observe(element);
    element.addEventListener("scroll", measure, { passive: true });
    measure();
    return () => { resize.disconnect(); element.removeEventListener("scroll", measure); };
  }, []);

  const goToPage = page => {
    const element = track.current;
    const gap = parseFloat(getComputedStyle(element).columnGap) || 0;
    element.scrollTo({
      left: page * (element.clientWidth + gap),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  return (
    <section className={`fl-destinations fl-destinations--${placement}`} data-fl-theme="model2" data-fl-scroll-reveal="off" aria-labelledby={headingId}>
      <div className="fl-destinations__wrap">
        <div className="fl-destinations__heading">
          <h2 id={headingId}>Trending destinations</h2>
          <Link className="fl-destinations__see-all" to="/packages#package-results">See all packages</Link>
        </div>
        <div ref={track} className="fl-destinations__track" role="list" aria-label="Holiday destinations">
          {packageDestinations.map(destination => (
            <div key={destination.query} className="fl-destinations__item" role="listitem">
              <Link className="fl-destinations__link" to={destinationPackagesUrl(destination.query)}
                aria-label={`Explore ${destination.name} holiday packages`}
                aria-current={selected.toLowerCase() === destination.query.toLowerCase() ? "true" : undefined}>
                <span className="fl-destinations__photo"><img src={destination.image} alt={destination.alt} width="320" height="320" loading="lazy" decoding="async" style={{ objectPosition: destination.position }} /></span>
                <span className="fl-destinations__name">{destination.name}</span>
                <span className="fl-destinations__country">{destination.country}</span>
              </Link>
            </div>
          ))}
        </div>
        <div className="fl-destinations__footer">
          <a className="fl-destinations__credits" href="/images/package-destinations/CREDITS.txt" target="_blank" rel="noopener noreferrer">Photo credits</a>
          <div className="fl-destinations__pagination" aria-label="Destination pages">
            <button type="button" className="fl-destinations__control" disabled={pagination.page === 0} onClick={() => goToPage(pagination.page - 1)} aria-label="Previous destinations"><ChevronLeft size={16} aria-hidden="true" /></button>
            <div className="fl-destinations__dots">{Array.from({ length: pagination.pages }, (_, page) => <button type="button" key={page} aria-label={`Show destination page ${page + 1}`} aria-current={page === pagination.page ? "true" : undefined} onClick={() => goToPage(page)} />)}</div>
            <button type="button" className="fl-destinations__control" disabled={pagination.page === pagination.pages - 1} onClick={() => goToPage(pagination.page + 1)} aria-label="Next destinations"><ChevronRight size={16} aria-hidden="true" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
