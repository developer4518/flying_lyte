import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowUpRight, BookOpen, ChevronDown } from "lucide-react";
import { blogs } from "../data/blogs";
import { getBlogImage, handleBlogImageError } from "../components/common/blogImages";
import { parseBlogContent, plainBlogText } from "../components/Blog/blogFormatting";
import BlogContent from "../components/Blog/BlogContent";
import "./Blogs.css";

const SITE_URL = "https://www.flyinglyte.com";

function GuideContents({ headings }) {
  return <nav aria-label="Blog table of contents"><ol>{headings.map(heading => <li key={heading.id}><a href={"#" + heading.id}>{plainBlogText(heading.text)}</a></li>)}</ol></nav>;
}

export default function BlogDetails() {
  const { slug } = useParams();
  const blog = blogs.find(item => item.slug === slug);
  if (!blog) return (
    <main className="fl-blog-shell fl-blog-detail"><div className="fl-blog-wrap fl-blog-missing">
      <Helmet><title>Blog Not Found | FlyingLyte</title><meta name="description" content="The travel blog you are looking for could not be found. Explore more travel guides and destination tips on FlyingLyte." /></Helmet>
      <p className="fl-blog-eyebrow">FLYINGLYTE JOURNAL</p><h1>Blog not found</h1>
      <p>The blog you are trying to open may have been moved or removed.</p>
      <Link className="fl-blog-button" to="/blogs"><ArrowLeft size={16} aria-hidden="true" /> Back to Blogs</Link>
    </div></main>
  );
  const blocks = parseBlogContent(blog.description);
  const headings = blocks.filter(block => block.type === "heading" && block.level === 2);
  const blogUrl = `${SITE_URL}/blogs/${blog.slug}`;
  const blogImage = getBlogImage(blog);
  const metaDescription =
    blog.shortDescription ||
    `Read ${blog.title} on FlyingLyte. Explore travel tips, destination guides, hotel booking advice, flight updates, and useful trip planning information.`;

  const relatedBlogs = blogs.filter(item => item.slug !== blog.slug)
    .reverse().sort((a, b) => Number(b.category === blog.category) - Number(a.category === blog.category)).slice(0, 3);
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: metaDescription,
    image: blogImage.startsWith("http") ? blogImage : `${SITE_URL}${blogImage}`,
    author: {
      "@type": "Organization",
      name: blog.author || "FlyingLyte Team",
    },
    publisher: {
      "@type": "Organization",
      name: "FlyingLyte",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/flying_logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": blogUrl,
    },
    datePublished: blog.date || undefined,
  };

  return (
    <main className="fl-blog-shell fl-blog-detail">
      <Helmet>
        <title>{`${blog.title} | FlyingLyte Travel Blog`}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={blogUrl} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${blog.title} | FlyingLyte`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={blogUrl} />
        <meta
          property="og:image"
          content={
            blogImage.startsWith("http") ? blogImage : `${SITE_URL}${blogImage}`
          }
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${blog.title} | FlyingLyte`} />
        <meta name="twitter:description" content={metaDescription} />
        <meta
          name="twitter:image"
          content={
            blogImage.startsWith("http") ? blogImage : `${SITE_URL}${blogImage}`
          }
        />

        <script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
      </Helmet>
      <div className="fl-blog-wrap">
        <nav className="fl-blog-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link><span aria-hidden="true">/</span><Link to="/blogs">Blogs</Link><span aria-hidden="true">/</span><span aria-current="page">{blog.category || blog.title}</span>
        </nav>
        <header className="fl-blog-detail__hero">
          <div className="fl-blog-detail__intro">
            <p className="fl-blog-eyebrow">{blog.category || "TRAVEL GUIDE"}</p>
            <h1>{blog.title}</h1>
            <p className="fl-blog-detail__summary">{plainBlogText(metaDescription)}</p>
            <div className="fl-blog-detail__meta"><span>{blog.date}</span><span>{blog.author || "FlyingLyte Team"}</span></div>
            <div className="fl-blog-actions">
              <Link className="fl-blog-button" to="/blogs"><ArrowLeft size={15} aria-hidden="true" /> All travel guides</Link>
              <Link className="fl-blog-text-link" to="/packages">Explore packages <ArrowUpRight size={15} aria-hidden="true" /></Link>
            </div>
          </div>
          <figure className="fl-blog-detail__image">
            <img src={blogImage} alt={blog.title} onError={handleBlogImageError} fetchPriority="high" decoding="async" />
            <figcaption><BookOpen size={14} aria-hidden="true" /><span>{blog.category || "FlyingLyte travel guide"}</span></figcaption>
          </figure>
        </header>
        <div className={"fl-blog-reader" + (headings.length ? "" : " fl-blog-reader--full")}>
          {headings.length > 0 && <aside className="fl-blog-toc">
            <div className="fl-blog-toc__desktop"><p className="fl-blog-eyebrow">IN THIS GUIDE</p><GuideContents headings={headings} /><Link className="fl-blog-text-link" to="/contact">Get travel help <ArrowUpRight size={14} aria-hidden="true" /></Link></div>
            <details className="fl-blog-toc__mobile"><summary>In this guide <span>{headings.length} sections <ChevronDown size={15} aria-hidden="true" /></span></summary><GuideContents headings={headings} /></details>
          </aside>}
          <article className="fl-blog-prose" aria-label={blog.title}><BlogContent blocks={blocks} /></article>
        </div>
        <section className="fl-blog-trip" aria-labelledby="blog-trip-heading">
          <div><p className="fl-blog-eyebrow">MAKE IT YOUR JOURNEY</p><h2 id="blog-trip-heading">Plan your trip with FlyingLyte</h2><p>Explore travel options and speak to our team about your next journey.</p></div>
          <div className="fl-blog-actions"><Link className="fl-blog-button fl-blog-button--primary" to="/packages">Tour packages <ArrowUpRight size={15} aria-hidden="true" /></Link><Link className="fl-blog-button" to="/contact">Get travel help</Link><Link className="fl-blog-text-link" to="/hotels">Book hotels</Link><Link className="fl-blog-text-link" to="/flights">Book flights</Link></div>
        </section>
        {relatedBlogs.length > 0 && <section className="fl-blog-related" aria-labelledby="related-blog-heading">
          <div className="fl-blog-related__heading"><div><p className="fl-blog-eyebrow">KEEP EXPLORING</p><h2 id="related-blog-heading">More travel ideas</h2></div><Link className="fl-blog-text-link" to="/blogs">View all guides <ArrowUpRight size={15} aria-hidden="true" /></Link></div>
          <div className="fl-blog-related__grid">{relatedBlogs.map(item => <article key={item.slug}>
            <Link to={"/blogs/" + item.slug} tabIndex={-1} aria-hidden="true"><img src={getBlogImage(item)} alt="" onError={handleBlogImageError} loading="lazy" /></Link>
            <div><p>{item.category || item.date}</p><h3><Link to={"/blogs/" + item.slug}>{item.title}</Link></h3><Link className="fl-blog-text-link" to={"/blogs/" + item.slug}>Read guide <ArrowUpRight size={14} aria-hidden="true" /></Link></div>
          </article>)}</div>
        </section>}
      </div>
    </main>
  );
}
