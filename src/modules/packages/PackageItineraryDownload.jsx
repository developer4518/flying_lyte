import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

export default function PackageItineraryDownload({ pkg }) {
  const [downloading, setDownloading] = useState(false);
  const download = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      const { downloadPackageItinerary } = await import("./packageItineraryPdf");
      await downloadPackageItinerary(pkg);
    } catch {
      toast.error("Unable to download itinerary. Please try again.");
    } finally {
      setDownloading(false);
    }
  };
  return <button type="button" onClick={download} disabled={downloading} aria-busy={downloading}
    className="fl-pkg-secondary fl-pkg-button fl-pkg-download">
    {downloading ? <Loader2 size={17} className="fl-pkg-download__spinner" aria-hidden="true" /> : <Download size={17} aria-hidden="true" />}
    {downloading ? "Preparing PDF…" : "Download Itinerary"}
  </button>;
}
