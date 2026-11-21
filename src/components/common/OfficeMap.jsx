import { MapPin } from "lucide-react";

const officeMapUrl = "https://www.google.com/maps/place/Flying+Lyte/@28.6453174,77.2875617,17z/data=!3m1!4b1!4m6!3m5!1s0x390cfb3491f57d85:0x73a4721ae647acc2!8m2!3d28.6453174!4d77.2901366!16s%2Fg%2F11n4cqztdf?entry=ttu";
// The CID identifies the exact Flying Lyte listing from the supplied Maps URL.
const officeMapEmbedUrl = "https://www.google.com/maps?cid=8332910670400433346&ll=28.6453174,77.2901366&z=17&hl=en&output=embed";

export default function OfficeMap({ compact = false }) {
  return (
    <div className={`fl-office-map${compact ? " fl-office-map--compact" : ""}`}>
      <div className="fl-office-map__heading">
        <span className="fl-office-map__title"><MapPin size={18} aria-hidden="true" />Flying Lyte office</span>
        <a href={officeMapUrl} target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
      </div>
      <iframe
        src={officeMapEmbedUrl}
        title={`Flying Lyte office location in Delhi${compact ? " — footer" : " — contact page"}`}
        width="600"
        height={compact ? "220" : "280"}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
