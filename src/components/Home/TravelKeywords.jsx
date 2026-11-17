import { useRef } from "react";
import { useInView } from "framer-motion";
import "./travel-keywords.css";

// Keep the supplied phrases visible as editorial content, with no booking actions.
const keywords = [
  "best travel company",
  "booking packages",
  "travel company",
  "flight hotel packages",
  "flight hotel",
  "package holiday",
  "book flight and hotel together",
  "best online travel agency",
  "cheap hotel and flight packages",
  "international travel agency",
  "cheap hotel and flights",
  "hotel flight deals",
  "multi city flight and hotel packages",
  "flights packages",
  "airfare and hotel",
  "international travel agent near me",
  "travel services company",
  "best vacation packages websites",
  "private travel agent",
  "cheap hotel flights",
  "corporate trips",
  "best website to book travel packages",
  "booking vacation sites",
  "best hoilday packages",
  "hoilday packages deal",
];
const rows = [keywords.slice(0, 13), keywords.slice(13)];

export default function TravelKeywords() {
  const section = useRef(null);
  const visible = useInView(section, { amount: 0.1 });

  return (
    <section ref={section} className="fl-travel-keywords" data-fl-theme="model2" data-fl-scroll-reveal="off" data-running={visible} aria-labelledby="travel-keywords-title">
      <div className="fl-travel-keywords__heading">
        <div><p>MORE WAYS TO GET AWAY</p><h2 id="travel-keywords-title">Travel ideas for your next journey</h2></div>
      </div>
      <div className="fl-travel-keywords__rows">
        {rows.map((row, index) => <div className="fl-travel-keywords__viewport" key={index}>
          <div className={"fl-travel-keywords__track" + (index ? " fl-travel-keywords__track--reverse" : "")}>
            <ul className="fl-travel-keywords__group" aria-label={"Travel ideas, row " + (index + 1)}>{row.map(keyword => <li key={keyword}>{keyword}</li>)}</ul>
            {/* Visual copy closes the loop; assistive technology reads each phrase once. */}
            <ul className="fl-travel-keywords__group fl-travel-keywords__copy" aria-hidden="true">{row.map(keyword => <li key={keyword}>{keyword}</li>)}</ul>
          </div>
        </div>)}
      </div>
    </section>
  );
}
