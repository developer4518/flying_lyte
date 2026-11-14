// Vector text avoids html2canvas's CSS colour parsing and keeps every page searchable.
const ink = [36, 62, 53], green = [41, 76, 62], peach = [232, 141, 115];
const cream = [248, 247, 242], muted = [89, 104, 95];

function plainText(value) {
  const text = String(value ?? "");
  const document = new DOMParser().parseFromString(text, "text/html");
  document.body.querySelectorAll("script, style").forEach(node => node.remove());
  document.body.querySelectorAll("br").forEach(node => node.replaceWith("\n"));
  document.body.querySelectorAll("p, div, li, h1, h2, h3, h4, tr").forEach(node => node.append("\n"));
  return document.body.textContent.replace(/₹/g, "INR ").replace(/[–—]/g, "-").replace(/[‘’]/g, "'").replace(/[“”]/g, '"').trim();
}

async function picture(url) {
  if (!url) return null;
  // Some supplier images do not permit canvas export; the text PDF still downloads.
  return new Promise(resolve => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    const timer = setTimeout(() => resolve(null), 5000);
    image.onload = () => {
      clearTimeout(timer);
      try {
        const canvas = document.createElement("canvas");
        canvas.width = 1200; canvas.height = 500;
        const scale = Math.max(canvas.width / image.width, canvas.height / image.height);
        canvas.getContext("2d").drawImage(image, (canvas.width - image.width * scale) / 2, (canvas.height - image.height * scale) / 2, image.width * scale, image.height * scale);
        resolve(canvas.toDataURL("image/jpeg", .88));
      } catch { resolve(null); }
    };
    image.onerror = () => { clearTimeout(timer); resolve(null); };
    image.src = url;
  });
}

export async function downloadPackageItinerary(pkg) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait", compress: false });
  const title = plainText(pkg.tour_name || pkg.title || "Holiday Package");
  doc.setProperties({ title: `${title} - FlyingLyte Itinerary`, author: "FlyingLyte", subject: "Package details and itinerary" });
  const margin = 18, width = 174, bottom = 273;
  let y;
  const page = () => {
    doc.setFillColor(...cream); doc.rect(0, 0, 210, 297, "F");
    doc.setFillColor(...green); doc.rect(0, 0, 210, 22, "F");
    doc.setFont("helvetica", "bold"); doc.setFontSize(15); doc.setTextColor(255, 254, 250);
    doc.text("FLYINGLYTE", margin, 14);
    doc.setFont("helvetica", "normal"); doc.setFontSize(8); doc.text("YOUR TRAVEL ITINERARY", 192, 14, { align: "right" });
    y = 34;
  };
  const room = height => { if (y + height > bottom) { doc.addPage(); page(); } };
  const write = (value, { size = 10.5, bold = false, color = ink, gap = 4 } = {}) => {
    doc.setFont("helvetica", bold ? "bold" : "normal"); doc.setFontSize(size);
    const lines = doc.splitTextToSize(plainText(value), width);
    const step = size * .49;
    for (const line of lines) {
      room(step);
      // A new page resets the header font and colour.
      doc.setFont("helvetica", bold ? "bold" : "normal"); doc.setFontSize(size); doc.setTextColor(...color);
      doc.text(line, margin, y); y += step;
    }
    y += gap;
  };
  const section = label => {
    // Keep the section heading with its first content lines at page boundaries.
    room(40); y += 5;
    doc.setDrawColor(...peach); doc.setLineWidth(1); doc.line(margin, y, margin + 13, y); y += 9;
    write(label, { size: 16, bold: true, gap: 5 });
  };
  const available = value => value != null && String(value).trim() && String(value).trim().toLowerCase() !== "n.a.";
  page();
  const cover = await picture(pkg.images?.[0]?.image);
  if (cover) { doc.addImage(cover, "JPEG", margin, y, width, 72.5); y += 84; }
  write(title, { size: 24, bold: true, gap: 6 });
  write(pkg.Country_City_Multicity || "Destination not provided", { size: 12, color: muted });
  write(`${pkg.days ?? "Not provided"} Days / ${pkg.Number_of_nights ?? "Not provided"} Nights`, { bold: true });
  if (available(pkg.price)) write(`Starting from INR ${Number(pkg.price).toLocaleString("en-IN")} per person`, { size: 14, bold: true });
  if (available(pkg.description)) { section("Your journey"); write(pkg.description); }
  section("Day-wise itinerary");
  if (available(pkg.Itinery)) {
    // Use raw itinerary text, retaining details even when the on-page parser cannot identify days.
    const days = plainText(pkg.Itinery).split(/(?=Day\s*\d+\s*:)/gi).filter(text => text.trim());
    for (const day of days) {
      const [heading, ...details] = day.trim().split(/\r?\n/);
      room(18); write(heading, { size: 12, bold: true, gap: 3 });
      if (details.length) write(details.join("\n"), { gap: 7 });
    }
  } else write("The supplier has not provided a day-wise itinerary.", { color: muted });
  for (const [label, value] of [["Package inclusions", pkg.Inclusion], ["Package exclusions", pkg.Exclusion]]) {
    section(label);
    write(available(value) ? plainText(value).replace(/;/g, "\n") : "Not provided by the supplier.");
  }
  if (pkg.faqs?.length) {
    section("Frequently asked questions");
    for (const faq of pkg.faqs) {
      room(18); write(faq.question, { bold: true, gap: 2 }); write(faq.answer, { color: muted, gap: 7 });
    }
  }
  const count = doc.getNumberOfPages();
  for (let i = 1; i <= count; i++) {
    doc.setPage(i); doc.setDrawColor(222, 223, 213); doc.setLineWidth(.3); doc.line(margin, 282, 192, 282);
    doc.setFont("helvetica", "normal"); doc.setFontSize(8); doc.setTextColor(...muted);
    doc.text("flyinglyte.com  |  +91 9667455591", margin, 289);
    doc.text(`${i} / ${count}`, 192, 289, { align: "right" });
  }
  const filename = (pkg.slug || title).replace(/[^a-z0-9-]+/gi, "-").replace(/^-|-$/g, "").slice(0, 100) || "holiday-package";
  doc.save(`FlyingLyte-${filename}-itinerary.pdf`);
}
