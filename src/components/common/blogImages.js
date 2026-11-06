export const BLOG_IMAGE_FALLBACK = "/images/package-placeholder.jpg";

// Blog records currently reference public assets; preserve complete URLs verbatim.
export function getBlogImage(blog) {
  const image = typeof blog?.image === "string" ? blog.image.trim() : "";
  if (!image) return BLOG_IMAGE_FALLBACK;
  if (/^https?:\/\//i.test(image) || image.startsWith("/")) return image;
  return `/images/blogs/${image}`;
}

export function handleBlogImageError(event) {
  const image = event.currentTarget;
  const fallback = new URL(BLOG_IMAGE_FALLBACK, image.ownerDocument.baseURI).href;
  // Do not retry a failed fallback indefinitely.
  if (image.src !== fallback) image.src = BLOG_IMAGE_FALLBACK;
}
