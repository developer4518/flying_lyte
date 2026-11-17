// Support the two formats used by the local collection, without injecting HTML.
export function parseBlogContent(description = "") {
  const lines = String(description).replace(/\r\n?/g, "\n").split("\n");
  const markdown = lines.some(line => /^#{1,6}\s+/.test(line.trim()));
  const blocks = [];
  let paragraph = [];
  let list = null;
  const flush = () => {
    if (paragraph.length) blocks.push({ type: "paragraph", text: paragraph.join(" ") });
    if (list) blocks.push(list);
    paragraph = [];
    list = null;
  };
  const heading = (text, level) => {
    flush();
    const slug = text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "");
    blocks.push({ type: "heading", text, level, id: `guide-${blocks.length}-${slug}` });
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { flush(); continue; }
    const title = line.match(/^(#{1,6})\s+(.+?)(?:\s+#+)?$/);
    if (title) { heading(title[2], Math.max(2, Math.min(4, title[1].length))); continue; }
    const numbered = line.match(/^(\d+)[.)]\s+(.+)/);
    if (!markdown && numbered) { heading(`${numbered[1]}. ${numbered[2]}`, 2); continue; }
    if (!markdown && /^conclusion\s*:?$/i.test(line)) { heading(line, 2); continue; }
    const bullet = line.match(/^[-*+]\s+(.+)/);
    if (bullet || numbered) {
      const ordered = !!numbered;
      if (!list || list.ordered !== ordered) {
        flush();
        list = { type: "list", ordered, start: numbered ? Number(numbered[1]) : undefined, items: [] };
      }
      list.items.push(bullet ? bullet[1] : numbered[2]);
    } else {
      if (list) flush();
      paragraph.push(line);
    }
  }
  flush();
  return blocks;
}

export function plainBlogText(text = "") {
  return String(text).replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[*#`_]/g, "");
}

export function normalizeBlogSearch(text = "") {
  return plainBlogText(text).normalize("NFKC").toLowerCase().replace(/\s+/g, " ").trim();
}
