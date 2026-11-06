import { useMemo } from "react";
import "./fare-rule-details.css";

// Presentation only: retain every airline word and the order it was supplied in.
function arrangeDetails(html) {
  if (typeof DOMParser === "undefined") return null;
  const document = new DOMParser().parseFromString(html, "text/html");
  // Keep the airline's existing rich structure and links intact.
  if (document.body.querySelector("table, ul, ol, p, div, section, h1, h2, h3, h4, pre, a, img")) return null;
  document.body.querySelectorAll("br").forEach(node => node.replaceWith("\n"));
  const blocks = [];
  for (const line of document.body.textContent.split(/\r?\n/).map(value => value.trim()).filter(Boolean)) {
    const field = line.match(/^([A-Za-z][A-Za-z\s]{0,40})(\s*:\s*)(.{1,100})$/);
    if (field) {
      let group = blocks.at(-1);
      if (group?.type !== "fields") { group = { type: "fields", items: [] }; blocks.push(group); }
      group.items.push({ label: field[1].trim(), value: field[3] });
      continue;
    }
    // Insert visual breaks only, never summarise or reinterpret fare conditions.
    const paragraphs = line.split(/(?=\b(?:CHANGES ANY TIME|CANCELLATIONS ANY TIME|NOTE\s*[-–]|CHANGE FEE\s*\/\s*REPRICING CONDITIONS|CANCELLATION\s*\/\s*REFUNDS))|(?=\b\d{1,2}\.[A-Z])/);
    for (const text of paragraphs.filter(value => value.trim())) blocks.push({ type: "text", text });
  }
  return blocks;
}

export default function FareRuleDetails({ html }) {
  const blocks = useMemo(() => arrangeDetails(html), [html]);
  return (
    <div className="fl-fare-details">
      {blocks ? blocks.map((block, index) => block.type === "fields" ? (
        <dl className="fl-fare-details__fields" key={index}>
          {block.items.map((item, fieldIndex) => (
            <div key={fieldIndex}>
              <dt>{item.label}<span className="sr-only">:</span></dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="fl-fare-details__condition" key={index}>{block.text}</p>
      )) : (
        <div className="fl-fare-details__rich" dangerouslySetInnerHTML={{ __html: html }} />
      )}
    </div>
  );
}
