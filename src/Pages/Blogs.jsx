import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SEO from "../components/SEO";
import { blogs } from "../data/blogs";

import { getBlogImage, handleBlogImageError } from "../components/common/blogImages";
import MobileCardDeck from "../components/common/MobileCardDeck";
import { normalizeBlogSearch } from "../components/Blog/blogFormatting";
import { Search, X } from "lucide-react";
import "./Blogs.css";

const latestBlogs = [...blogs].reverse();
const searchIndex = new Map(latestBlogs.map(blog => [blog.slug, normalizeBlogSearch(
  [blog.title, blog.category, blog.shortDescription, blog.description, blog.author].filter(Boolean).join(" "),
)]));

const Blogs = () => {
  // This is the complete local collection; no paginated API response is sliced.
  const [searchParams, setSearchParams] = useSearchParams();
  // Local filtering avoids the app's URL-change scroll reset on every keystroke.
  const [query, setQuery] = useState("");
  const [searchPage, setSearchPage] = useState(1);
  const keywords = normalizeBlogSearch(query).split(" ").filter(Boolean);
  const searching = keywords.length > 0;
  const filteredBlogs = latestBlogs.filter(blog => keywords.every(word => searchIndex.get(blog.slug).includes(word)));
  const [pageSize, setPageSize] = useState(() =>
    window.matchMedia("(max-width: 767px)").matches ? 5 : 10,
  );
  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / pageSize));
  const requestedPage = searching ? searchPage : Number(searchParams.get("page") || 1);
  const currentPage = Math.min(totalPages, Math.max(1,
    Number.isFinite(requestedPage) ? Math.floor(requestedPage) : 1,
  ));
  const visibleBlogs = filteredBlogs.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const changeSearch = value => {
    setQuery(value);
    setSearchPage(1);
  };

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setPageSize(media.matches ? 5 : 10);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (searching) return;
    if (!searchParams.has("page") || searchParams.get("page") === String(currentPage)) return;
    const next = new URLSearchParams(searchParams);
    if (currentPage === 1) next.delete("page");
    else next.set("page", String(currentPage));
    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams, currentPage, searching]);

  const changePage = (page) => {
    if (searching) { setSearchPage(Math.min(totalPages, Math.max(1, page))); return; }
    const next = new URLSearchParams(searchParams);
    if (page === 1) next.delete("page");
    else next.set("page", String(Math.min(totalPages, Math.max(1, page))));
    setSearchParams(next);
  };

  return (
    <main className="fl-blog-shell fl-blog-index fl-booking-ink fl-booking-base min-h-screen bg-[var(--bg-main)] text-white py-24">
      <SEO
        title="Travel Blogs, Guides & Tips"
        description="Read FlyingLyte travel blogs for destination guides, flight booking tips, hotel booking advice, honeymoon packages, group tours, international trips, and travel planning ideas."
        canonical="https://www.flyinglyte.com/blogs"
      />

      <div className="max-w-7xl mx-auto px-4">
        <div className="fl-blog-index__top" data-fl-scroll-reveal="off">
          <section className="fl-blog-index__intro" aria-labelledby="blog-page-title">
            <p className="fl-blog-eyebrow">FLYINGLYTE TRAVEL BLOG</p>
            <h1 id="blog-page-title">Travel Blogs, Guides &amp; Tips</h1>
            <p>Destination guides, travel tips and thoughtful ideas for your next journey. Search a place, experience or keyword to find a guide that fits your plans.</p>
          </section>
          <form className="fl-blog-search" role="search" onSubmit={event => event.preventDefault()}>
            <label htmlFor="blog-keyword">Find your next travel read</label>
            <div className="fl-blog-search__field">
              <Search size={20} aria-hidden="true" />
              <input id="blog-keyword" type="search" value={query} onChange={event => changeSearch(event.target.value)} placeholder="Search destinations, experiences or any keyword…" autoComplete="off" aria-controls="blog-results" />
              {query && <button type="button" onClick={() => changeSearch("")} aria-label="Clear blog search"><X size={18} aria-hidden="true" /></button>}
            </div>
            <p role="status" aria-live="polite">{filteredBlogs.length} {filteredBlogs.length === 1 ? "guide" : "guides"}{keywords.length ? ` matching “${query.trim()}”` : " to inspire your next journey"}</p>
          </form>
        </div>

        <nav
          aria-label="Important travel links"
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <Link
            to="/"
            className="fl-booking-line fl-booking-button rounded-full border border-[var(--border-soft)] px-5 py-2 font-body text-sm text-[var(--gold-soft)] hover:border-[var(--gold-main)] hover:text-[var(--gold-main)] transition"
          >
            Home
          </Link>

          <Link
            to="/flights"
            className="fl-booking-line fl-booking-button rounded-full border border-[var(--border-soft)] px-5 py-2 font-body text-sm text-[var(--gold-soft)] hover:border-[var(--gold-main)] hover:text-[var(--gold-main)] transition"
          >
            Book Flights
          </Link>

          <Link
            to="/hotels"
            className="fl-booking-line fl-booking-button rounded-full border border-[var(--border-soft)] px-5 py-2 font-body text-sm text-[var(--gold-soft)] hover:border-[var(--gold-main)] hover:text-[var(--gold-main)] transition"
          >
            Book Hotels
          </Link>

          <Link
            to="/packages"
            className="fl-booking-line fl-booking-button rounded-full border border-[var(--border-soft)] px-5 py-2 font-body text-sm text-[var(--gold-soft)] hover:border-[var(--gold-main)] hover:text-[var(--gold-main)] transition"
          >
            Tour Packages
          </Link>

          <Link
            to="/contact"
            className="fl-booking-line fl-booking-button rounded-full border border-[var(--border-soft)] px-5 py-2 font-body text-sm text-[var(--gold-soft)] hover:border-[var(--gold-main)] hover:text-[var(--gold-main)] transition"
          >
            Contact FlyingLyte
          </Link>
        </nav>


        <section
          id="blog-results"
          aria-labelledby="latest-travel-blogs"
        >
          <h2 id="latest-travel-blogs" className="fl-booking-heading fl-booking-subtitle sr-only">
            Latest Travel Blogs and Guides
          </h2>

          <MobileCardDeck
            key={`${query}:${currentPage}:${pageSize}`}
            label="blog"
            className="fl-blogs-listing__grid grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
          {visibleBlogs.map((blog) => (
            <article
              key={blog.slug}
              className="fl-booking-surface fl-booking-line group bg-[var(--bg-card)] border border-[var(--border-soft)] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.35)] hover:-translate-y-2 transition-all duration-300"
            >
              <Link to={`/blogs/${blog.slug}`} aria-label={blog.title}>
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={getBlogImage(blog)}
                    onError={handleBlogImageError}
                    alt={blog.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                  {blog.category && (
                    <span className="fl-booking-inset fl-booking-line absolute top-4 left-4 rounded-full bg-black/60 border border-[var(--border-soft)] px-4 py-1 font-body text-sm text-[var(--gold-soft)] backdrop-blur">
                      {blog.category}
                    </span>
                  )}
                </div>
              </Link>

              <div className="p-6">
                <p className="font-body text-sm text-[var(--text-muted)] mb-3">
                  {blog.date} {blog.author ? `• ${blog.author}` : ""}
                </p>

                <h3 className="fl-booking-heading fl-booking-subtitle fl-booking-ink font-heading text-2xl text-white leading-snug mb-4 group-hover:text-[var(--gold-main)] transition">
                  <Link to={`/blogs/${blog.slug}`}>{blog.title}</Link>
                </h3>

                <p className="font-body text-base leading-7 text-[var(--text-muted)] mb-6">
                  {blog.shortDescription ||
                    "Read this FlyingLyte travel guide for useful destination information, travel tips, hotel ideas, flight planning advice, and smart suggestions for your next trip."}
                </p>

                <Link
                  to={`/blogs/${blog.slug}`}
                  className="inline-flex items-center gap-2 font-body text-lg text-[var(--gold-soft)] hover:text-[var(--color-start)] transition"
                >
                  Read Travel Guide
                  <span className="group-hover:translate-x-1 transition">
                    →
                  </span>
                </Link>
              </div>
            </article>
          ))}
          </MobileCardDeck>
          {visibleBlogs.length === 0 && <div className="fl-blog-search__empty"><h3>No matching travel guides</h3><p>Try a destination such as Goa, a travel experience, or a different keyword.</p><button type="button" onClick={() => changeSearch("")}>Show all guides</button></div>}

          {visibleBlogs.length > 0 && <nav className="fl-blog-pagination" aria-label="Blog pagination">
            <p className="fl-blog-pagination__status" role="status" aria-live="polite">
              Page {currentPage} of {totalPages} &middot; {filteredBlogs.length} posts
            </p>
            <div className="fl-blog-pagination__controls">
              <button type="button" onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1} aria-label="Previous blog page">Previous</button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button key={page} type="button" onClick={() => changePage(page)} aria-label={`Go to blog page ${page}`} aria-current={page === currentPage ? "page" : undefined}>{page}</button>
              ))}
              <button type="button" onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages} aria-label="Next blog page">Next</button>
            </div>
          </nav>}
        </section>

        <section className="fl-booking-surface fl-booking-line mt-20 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-soft)] p-8 md:p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
          <p className="font-body text-sm md:text-base tracking-[0.25em] uppercase text-[var(--gold-soft)]">
            Plan Better with FlyingLyte
          </p>

          <h2 className="fl-booking-heading fl-booking-subtitle mt-4 font-heading text-3xl md:text-5xl text-[var(--gold-main)]">
            Book Flights, Hotels and Holiday Packages
          </h2>

          <p className="mt-5 max-w-3xl mx-auto font-body text-base md:text-lg leading-8 text-[var(--text-muted)]">
            FlyingLyte helps travelers plan and book domestic and international
            trips with reliable flight options, comfortable hotels, customized
            holiday packages, group tours, honeymoon packages, and destination
            support. Our blogs are created to make travel planning easier,
            clearer, and more useful before you confirm your booking.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/packages"
              className="fl-booking-ink fl-booking-button fl-booking-secondary rounded-full bg-[var(--gold-main)] px-7 py-3 font-body text-base font-semibold text-black hover:bg-[var(--gold-soft)] transition"
            >
              Explore Packages
            </Link>

            <Link
              to="/contact"
              className="fl-booking-line fl-booking-button rounded-full border border-[var(--border-soft)] px-7 py-3 font-body text-base font-semibold text-[var(--gold-soft)] hover:border-[var(--gold-main)] hover:text-[var(--gold-main)] transition"
            >
              Get Travel Assistance
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Blogs;
