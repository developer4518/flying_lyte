import { publicApi } from "./api";

export async function fetchGallery({ signal }) {
  const { data } = await publicApi.get("/api/package/gallery/", {
    signal,
    ...(import.meta.env.DEV ? { baseURL: "" } : {}),
  });

  if (data?.success !== true || !Array.isArray(data.media)) {
    throw new Error("The gallery response could not be loaded.");
  }

  return data.media.flatMap(item => {
    const type = item.media_type === "image" ? "photo" : item.media_type === "video" ? "video" : null;
    if (!type || item.id == null || typeof item.media !== "string" || !item.media.trim()) return [];

    let url;
    try {
      url = new URL(item.media, publicApi.defaults.baseURL || "https://api.flyinglyte.com");
    } catch {
      return [];
    }
    if (!["https:", "http:"].includes(url.protocol)) return [];

    const title = typeof item.description === "string" && item.description.trim()
      ? item.description.trim()
      : type === "video" ? "Travel film" : "Travel photograph";

    return [{ id: `api-gallery-${item.id}`, type, src: url.href, title, alt: title }];
  });
}
