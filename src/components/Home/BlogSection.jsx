import React from "react";
import { Link } from "react-router-dom";
import { blogs } from "../../data/blogs";

const BLOG_IMAGE_PATH = "/images/blogs/";

const getBlogImage = (blog) => {
  const image = String(blog?.image || "").trim();

  if (image) {
    // If image is external URL
    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    // If full public path is already added
    if (image.startsWith("/")) {
      return image;
    }

    // If only image filename is added
    return `${BLOG_IMAGE_PATH}${image}`;
  }

  // Fallback: image name same as blog slug
  return `${BLOG_IMAGE_PATH}${blog.slug}.jpg`;
};

const BlogSection = () => {
  const latestBlogs = [...blogs].slice(-3).reverse();

  return (
    <section className="relative overflow-hidden bg-[var(--bg-main)] py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(248,222,130,0.12),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <p className="font-body text-sm uppercase tracking-[0.3em] text-[var(--gold-soft)] md:text-base">
            FlyingLyte Blogs
          </p>

          <h2 className="mt-4 font-heading text-4xl text-[var(--gold-main)] md:text-6xl">
            Latest Travel & Festival Guides
          </h2>

          <p className="mx-auto mt-5 max-w-2xl font-body text-lg text-[var(--text-muted)]">
            Read festival updates, hotel booking guides, travel tips and
            destination ideas for your next journey.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {latestBlogs.map((blog) => (
            <article
              key={blog.id}
              className="group overflow-hidden rounded-3xl border border-[var(--border-soft)] bg-[var(--bg-card)] shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-60 overflow-hidden bg-black">
                <img
                  src={getBlogImage(blog)}
                  alt={blog.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "/images/Blogs/default-blog.jpg";
                  }}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <span className="absolute left-4 top-4 rounded-full border border-[var(--border-soft)] bg-black/60 px-4 py-1 font-body text-sm text-[var(--gold-soft)] backdrop-blur">
                  {blog.category}
                </span>
              </div>

              <div className="p-6">
                <p className="mb-3 font-body text-sm text-[var(--text-muted)]">
                  {blog.date} • {blog.author}
                </p>

                <h3 className="mb-4 font-heading text-2xl leading-snug text-white transition group-hover:text-[var(--gold-main)]">
                  {blog.title}
                </h3>

                <p className="mb-6 font-body text-base leading-7 text-[var(--text-muted)]">
                  {blog.shortDescription}
                </p>

                <Link
                  to={`/blogs/${blog.slug}`}
                  className="inline-flex items-center gap-2 font-body text-lg text-[var(--gold-soft)] transition hover:text-[var(--color-start)]"
                >
                  Read More
                  <span className="transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/blogs"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[var(--color-start)] to-[var(--color-end)] px-8 py-3 font-body text-lg text-black shadow-[0_10px_30px_rgba(234,168,42,0.25)] transition hover:scale-105"
          >
            View All Blogs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
