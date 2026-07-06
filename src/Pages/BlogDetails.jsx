import React from "react";
import { Link, useParams } from "react-router-dom";
import { blogs } from "../data/blogs";

const parseBlogDescription = (description = "") => {
  const lines = description
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const intro = [];
  const sections = [];
  let conclusion = null;
  let currentSection = null;

  lines.forEach((line) => {
    const numberedMatch = line.match(/^(\d+)\.\s+(.*)/);

    if (numberedMatch) {
      if (currentSection) sections.push(currentSection);

      currentSection = {
        number: numberedMatch[1],
        title: numberedMatch[2],
        content: [],
      };

      return;
    }

    if (line.toLowerCase() === "conclusion") {
      if (currentSection) {
        sections.push(currentSection);
        currentSection = null;
      }

      conclusion = {
        title: "Conclusion",
        content: [],
      };

      return;
    }

    if (conclusion) {
      conclusion.content.push(line);
    } else if (currentSection) {
      currentSection.content.push(line);
    } else {
      intro.push(line);
    }
  });

  if (currentSection) sections.push(currentSection);

  return { intro, sections, conclusion };
};

const BlogDetails = () => {
  const { slug } = useParams();

  const blog = blogs.find((item) => item.slug === slug);

  if (!blog) {
    return (
      <main className="min-h-screen bg-(--bg-main) text-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-heading text-4xl text-(--gold-main) mb-4">
            Blog Not Found
          </h1>

          <Link
            to="/blogs"
            className="font-body text-(--gold-soft) hover:text-(--color-start)"
          >
            Back to Blogs
          </Link>
        </div>
      </main>
    );
  }

  const { intro, sections, conclusion } = parseBlogDescription(
    blog.description,
  );

  return (
    <main className="min-h-screen bg-(--bg-main) text-white">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(248,222,130,0.12),transparent_35%)]" />

        <div className="relative max-w-5xl mx-auto px-4">
          <Link
            to="/blogs"
            className="font-body text-(--gold-soft) hover:text-(--color-start)"
          >
            ← Back to Blogs
          </Link>

          <div className="mt-8">
            <p className="font-body text-sm md:text-base tracking-[0.2em] uppercase text-(--gold-soft) mb-4">
              {blog.date} • {blog.author} • {blog.category}
            </p>

            <h1 className="font-heading text-4xl md:text-7xl text-(--gold-main) leading-tight">
              {blog.title}
            </h1>

            <p className="mt-6 max-w-3xl font-body text-xl leading-8 text-(--text-muted)">
              {blog.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Full Clear Blog Image */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-3xl overflow-hidden border border-(--border-soft) bg-black/30 shadow-[0_30px_80px_rgba(0,0,0,0.45)] p-2 md:p-3">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-auto max-h-[780px] object-contain rounded-2xl"
          />
        </div>
      </section>

      {/* Attractive Description Section */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <article className="relative overflow-hidden bg-(--bg-card) border border-(--border-soft) rounded-3xl p-6 md:p-10 shadow-[0_24px_70px_rgba(0,0,0,0.32)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(248,222,130,0.14),transparent_65%)]" />

          <div className="relative">
            <div className="mb-10">
              <p className="font-body text-sm tracking-[0.25em] uppercase text-(--gold-soft) mb-3">
                Travel Guide
              </p>

              <h2 className="font-heading text-3xl md:text-5xl text-(--gold-main) leading-tight">
                About This Experience
              </h2>
            </div>

            {intro.length > 0 && (
              <div className="space-y-5 mb-10">
                {intro.map((paragraph, index) => (
                  <p
                    key={index}
                    className="font-body text-lg md:text-xl leading-9 text-(--text-main)"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {sections.length > 0 && (
              <div className="grid gap-5">
                {sections.map((section) => (
                  <div
                    key={section.number}
                    className="group rounded-3xl border border-(--border-soft) bg-white/[0.04] hover:bg-white/[0.07] transition p-5 md:p-7"
                  >
                    <div className="flex gap-4 items-start">
                      <div className="shrink-0 w-12 h-12 rounded-2xl bg-linear-to-r from-start to-end text-black font-heading text-xl flex items-center justify-center shadow-lg">
                        {section.number}
                      </div>

                      <div>
                        <h3 className="font-heading text-2xl md:text-3xl text-(--gold-main) leading-tight">
                          {section.title}
                        </h3>

                        <div className="mt-3 space-y-3">
                          {section.content.map((paragraph, index) => (
                            <p
                              key={index}
                              className="font-body text-base md:text-lg leading-8 text-(--text-muted)"
                            >
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {conclusion && (
              <div className="mt-10 rounded-3xl border border-(--gold-soft)/30 bg-[linear-gradient(135deg,rgba(248,222,130,0.12),rgba(255,255,255,0.04))] p-6 md:p-8">
                <h3 className="font-heading text-3xl md:text-4xl text-(--gold-main) mb-4">
                  {conclusion.title}
                </h3>

                <div className="space-y-4">
                  {conclusion.content.map((paragraph, index) => (
                    <p
                      key={index}
                      className="font-body text-lg md:text-xl leading-9 text-(--text-main)"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-20">
        <Link
          to="/blogs"
          className="inline-flex items-center justify-center rounded-full px-8 py-3 font-body text-lg text-black bg-linear-to-r from-start to-end hover:scale-105 transition"
        >
          View More Blogs
        </Link>
      </section>
    </main>
  );
};

export default BlogDetails;
