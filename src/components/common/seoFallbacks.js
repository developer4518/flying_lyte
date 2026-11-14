// React 19 hoists Helmet's route tags without replacing index.html's defaults.
// Only the original fallback nodes are detached; route tags and JSON-LD stay owned
// by their existing components. Routes without an override retain the defaults.
export function reconcileSeoFallbacks() {
  const head = document.head;
  const marked = head.querySelectorAll("[data-fl-seo-fallback]");
  const defaults = marked.length ? marked : head.querySelectorAll(
    'title, meta[name="description"], link[rel="canonical"], meta[property^="og:"], meta[name^="twitter:"]',
  );
  const fallbacks = [...defaults].map(node => {
    node.setAttribute("data-fl-seo-fallback", "");
    let selector = "title";
    if (node.tagName === "META") {
      const attribute = node.hasAttribute("property") ? "property" : "name";
      selector = `meta[${attribute}="${CSS.escape(node.getAttribute(attribute))}"]`;
    } else if (node.tagName === "LINK") {
      selector = 'link[rel="canonical"]';
    }
    return { node, selector };
  });

  const sync = () => {
    fallbacks.forEach(({ node, selector }) => {
      const overridden = [...head.querySelectorAll(selector)].some(tag => tag !== node);
      if (overridden && node.parentNode === head) node.remove();
      else if (!overridden && !node.isConnected) head.appendChild(node);
    });
  };
  const observer = new MutationObserver(sync);
  observer.observe(head, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["name", "property", "rel"],
  });
  sync();

  return () => {
    observer.disconnect();
    fallbacks.forEach(({ node }) => {
      if (!node.isConnected) head.appendChild(node);
    });
  };
}
