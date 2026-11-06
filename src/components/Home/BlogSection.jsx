import React from "react";
import { Link } from "react-router-dom";
import { blogs } from "../../data/blogs";

import { getBlogImage, handleBlogImageError } from "../common/blogImages";
import MobileCardDeck from "../common/MobileCardDeck";


const BlogSection = () => {
  const latestBlogs = [...blogs].slice(-3).reverse();

  return (
    <section className="fl-blog" data-fl-theme="model2">
      <div className="fl-blog__ambient" />

      <div className="fl-blog__wrap">
        <div className="fl-blog__heading">
          <p className="fl-blog__eyebrow">
            FlyingLyte Blogs
          </p>

          <h2 className="fl-blog__title">
            Latest Travel & Festival Guides
          </h2>

          <p className="fl-blog__intro">
            Read festival updates, hotel booking guides, travel tips and
            destination ideas for your next journey.
          </p>
        </div>

        <p className="fl-mobile-swipe-hint">Swipe to explore <span aria-hidden="true">&rarr;</span></p>
        <MobileCardDeck className="fl-blog__grid" label="blog">
          {latestBlogs.map((blog) => (
            <article
              key={blog.id}
              className="fl-blog__card group overflow-hidden transition-all duration-300 hover:-translate-y-2"
            >
              <div className="fl-blog__media">
                <img
                  src={getBlogImage(blog)}
                  alt={blog.title}
                  loading="lazy"
                  onError={handleBlogImageError}
                  className="fl-blog__image transition-transform duration-700 group-hover:scale-110"
                />

                <div className="fl-blog__overlay" />

                <span className="fl-blog__category">
                  {blog.category}
                </span>
              </div>

              <div className="fl-blog__body">
                <p className="fl-blog__meta">
                  {blog.date} • {blog.author}
                </p>

                <h3 className="fl-blog__card-title transition">
                  {blog.title}
                </h3>

                <p className="fl-blog__description">
                  {blog.shortDescription}
                </p>

                <Link
                  to={`/blogs/${blog.slug}`}
                  className="fl-blog__read-more transition"
                >
                  Read More
                  <span className="transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </MobileCardDeck>

        <div className="fl-blog__footer">
          <Link
            to="/blogs"
            className="fl-blog__view-all transition hover:scale-105"
          >
            View All Blogs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
