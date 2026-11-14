import { useId } from "react";

// Artwork shared by the landing pages; search stays outside it.
export default function EditorialArtwork({ image, alt, detail = "/images/model2-island.avif" }) {
  const arrowMask = useId();
  return (
    <div className="fl-parity-art">
      <div className="fl-parity-art__main"><img src={image} alt={alt} fetchPriority="high" /></div>
      <div className="fl-parity-art__small"><img src={detail} alt="A little travel inspiration" loading="lazy" /></div>
      <div className="fl-parity-art__caption"><span>FLYINGLYTE · GO A LITTLE FURTHER</span><span>Your next journey ↗</span></div>
      <svg className="fl-parity-art__doodle" viewBox="0 0 160 90" fill="none" aria-hidden="true">
        <defs><mask id={arrowMask} maskUnits="userSpaceOnUse" x="0" y="0" width="160" height="90">
          <path className="fl-parity-art__draw-line" d="M5 60C90 100 147 8 84 10C18 12 87 96 153 34" pathLength="1" stroke="white" strokeWidth="6" strokeDasharray="1" />
          <path className="fl-parity-art__draw-tip" d="m137 34 16-1-3 17" pathLength="1" stroke="white" strokeWidth="6" strokeDasharray="1" />
        </mask></defs>
        <path d="M5 60C90 100 147 8 84 10C18 12 87 96 153 34m-16 0 16-1-3 17" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" mask={`url(#${arrowMask})`} />
      </svg>
    </div>
  );
}
