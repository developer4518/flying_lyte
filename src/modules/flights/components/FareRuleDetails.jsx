import { useMemo } from "react";
import "./fare-rule-details.css";

// These are boundaries already present in supplier text, not inferred fare rules.
const SECTION_TITLE = "(?:[A-Z]{2}\\.\\s*(?:ADVANCE RES\\/TKT|PENALTIES|ELIGIBILITY|DAY\\/TIME|SEASONALITY|FLIGHT APPLICATION|MINIMUM STAY|MAXIMUM STAY|STOPOVERS|TRANSFERS|COMBINABILITY|SALES RESTRICTIONS|TRAVEL RESTRICTIONS)|CHANGE FEE\\s*\\/\\s*REPRICING CONDITIONS|CANCELLATION\\s*\\/\\s*REFUNDS|CANCELLATIONS? ANY TIME|CHANGES ANY TIME)";
const SECTION_START = new RegExp("^" + SECTION_TITLE + ":?", "i");
const POLICY_BREAKS = new RegExp(
  "\\b" + SECTION_TITLE + "|\\b(?:NOTE|WARNING|IMPORTANT)\\s*[-–—:]|(?:^|\\s)\\d+\\.(?=\\s*[A-Z])|(?:^|\\s)[-_=]{4,}(?=\\s|$)",
  "gi",
);

function readableLabel(label) {
  return label
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, letter => letter.toUpperCase())
    .replace(/\bId\b/g, "ID");
}

function paragraphs(text) {
  // Break sentences visually, preserving wording, amounts and their sequence.
  return text
    .replace(/\bBASE FARE(?=FROM\/TO\b)/gi, "$& ")
    .replace(/([.!?]) (?=[A-Z])/g, "$1\n")
    .split(/\n+/)
    .map(value => value.trim())
    .filter(Boolean);
}

function policyBlocks(line) {
  const starts = [0];
  for (const match of line.matchAll(POLICY_BREAKS)) {
    if (match.index > 0) starts.push(match.index);
    if (/^\s*[-_=]{4,}$/.test(match[0])) starts.push(match.index + match[0].length);
  }
  const positions = [...new Set(starts)];
  return positions.map((start, index) => {
    const text = line.slice(start, positions[index + 1]).trim();
    if (!text) return null;
    if (/^[-_=]{4,}$/.test(text)) return { type: "divider" };

    const heading = text.match(SECTION_START);
    if (heading) {
      return {
        type: "section",
        heading: heading[0].replace(/^([A-Z]{2}\.)\s*/i, "$1 "),
        paragraphs: paragraphs(text.slice(heading[0].length).trim()),
      };
    }

    const note = text.match(/^(?:NOTE|WARNING|IMPORTANT)\s*[-–—:]/i);
    if (note) {
      return {
        type: "note",
        label: note[0],
        paragraphs: paragraphs(text.slice(note[0].length).trim()),
      };
    }

    const point = text.match(/^(\d+\.)\s*/);
    if (point) {
      return {
        type: "point",
        marker: point[1],
        paragraphs: paragraphs(text.slice(point[0].length).trim()),
      };
    }

    return { type: "text", paragraphs: paragraphs(text) };
  }).filter(Boolean);
}

// Presentation only: retain airline wording and order, with no length cutoff.
function arrangeDetails(html) {
  if (typeof DOMParser === "undefined") return null;
  const document = new DOMParser().parseFromString(String(html ?? ""), "text/html");

  // Rich supplier content keeps its tables, lists, emphasis and links.
  if (document.body.querySelector("table, ul, ol, p, div, section, h1, h2, h3, h4, h5, h6, pre, a, img, dl, blockquote")) return null;

  document.body.querySelectorAll("br").forEach(node => node.replaceWith("\n"));
  const lines = document.body.textContent
    .replace(/\u00a0/g, " ")
    .split(/\r\n?|\n/)
    .map(value => value.replace(/[^\S\r\n]+/g, " ").trim())
    .filter(Boolean);
  const blocks = [];

  for (const line of lines) {
    const field = line.match(/^([A-Za-z][A-Za-z0-9 _/-]{0,64}?)\s*:\s*(.+)$/);
    if (field && !/^(?:NOTE|WARNING|IMPORTANT)$/i.test(field[1].trim()) && !SECTION_START.test(field[1].trim())) {
      let group = blocks.at(-1);
      if (group?.type !== "fields") {
        group = { type: "fields", items: [] };
        blocks.push(group);
      }
      group.items.push({ label: field[1].trim(), value: field[2] });
    } else {
      blocks.push(...policyBlocks(line));
    }
  }
  return blocks;
}

function PolicyParagraphs({ items }) {
  return items.map((text, index) => <p key={index}>{text}</p>);
}

export default function FareRuleDetails({ html }) {
  const blocks = useMemo(() => arrangeDetails(html), [html]);
  return (
    <div className="fl-fare-details">
      {blocks ? blocks.map((block, index) => {
        if (block.type === "fields") {
          return (
            <dl className="fl-fare-details__fields" key={index}>
              {block.items.map((item, fieldIndex) => (
                <div key={fieldIndex}>
                  <dt title={item.label}>{readableLabel(item.label)}<span className="sr-only">:</span></dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          );
        }
        if (block.type === "divider") return <hr className="fl-fare-details__divider" key={index} />;
        if (block.type === "section") {
          return (
            <section className="fl-fare-details__section" key={index}>
              <h4>{block.heading}</h4>
              <div className="fl-fare-details__body"><PolicyParagraphs items={block.paragraphs} /></div>
            </section>
          );
        }
        if (block.type === "note") {
          return (
            <div className="fl-fare-details__note" key={index}>
              <span className="fl-fare-details__note-label">{block.label}</span>
              {block.paragraphs.length > 0 && <div className="fl-fare-details__body"><PolicyParagraphs items={block.paragraphs} /></div>}
            </div>
          );
        }
        if (block.type === "point") {
          return (
            <div className="fl-fare-details__point" key={index}>
              <span className="fl-fare-details__point-marker">{block.marker}</span>
              <div className="fl-fare-details__body"><PolicyParagraphs items={block.paragraphs} /></div>
            </div>
          );
        }
        return <div className="fl-fare-details__condition fl-fare-details__body" key={index}><PolicyParagraphs items={block.paragraphs} /></div>;
      }) : (
        <div className="fl-fare-details__rich" role="region" aria-label="Full airline fare conditions" tabIndex={0} dangerouslySetInnerHTML={{ __html: html }} />
      )}
    </div>
  );
}
