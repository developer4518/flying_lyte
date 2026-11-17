import { Fragment } from "react";
import { Link } from "react-router-dom";

function InlineText({ text }) {
  const parts = String(text).split(/(\*\*[^*]+\*\*|__[^_]+__|`[^`]+`|\[[^\]]+\]\([^)]+\)|\*[^*]+\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) return <strong key={index}><InlineText text={part.slice(2, -2)} /></strong>;
    if (part.startsWith("__") && part.endsWith("__") && part.length > 4) return <strong key={index}><InlineText text={part.slice(2, -2)} /></strong>;
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) return <code key={index}>{part.slice(1, -1)}</code>;
    if (part.startsWith("*") && !part.startsWith("**") && part.endsWith("*") && part.length > 2) return <em key={index}>{part.slice(1, -1)}</em>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link && /^(https?:\/\/|mailto:|tel:|\/(?!\/)|#)/i.test(link[2].trim())) {
      if (/^\/(?!\/)/.test(link[2].trim())) return <Link key={index} to={link[2].trim()}><InlineText text={link[1]} /></Link>;
      return <a key={index} href={link[2].trim()}><InlineText text={link[1]} /></a>;
    }
    // A few source contact lines have an unmatched bold delimiter.
    return <Fragment key={index}>{part.replace(/\*\*/g, "")}</Fragment>;
  });
}

export default function BlogContent({ blocks }) {
  return blocks.map((block, index) => {
    if (block.type === "heading") {
      const Heading = `h${block.level}`;
      return <Heading key={block.id} id={block.id}><InlineText text={block.text} /></Heading>;
    }
    if (block.type === "list") {
      const List = block.ordered ? "ol" : "ul";
      return <List key={index} start={block.start}>{block.items.map((text, item) => <li key={item}><InlineText text={text} /></li>)}</List>;
    }
    return <p key={index}><InlineText text={block.text} /></p>;
  });
}
