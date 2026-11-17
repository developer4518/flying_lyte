// Original client media stays in public/images/galleryimages.
const media = [
  {
    "id": "photo-01",
    "type": "photo",
    "file": "WhatsApp Image 2026-11-14 at 12.31.18 PM.jpeg",
    "title": "A day to remember",
    "alt": "Travel group posing outside an ornate red sandstone gateway.",
    "width": 1600,
    "height": 1200
  },
  {
    "id": "photo-02",
    "type": "photo",
    "file": "WhatsApp Image 2026-11-14 at 12.33.04 PM.jpeg",
    "title": "A moment of reflection",
    "alt": "Visitors seated inside a bright indoor hall.",
    "width": 1600,
    "height": 1200
  },
  {
    "id": "photo-03",
    "type": "photo",
    "file": "WhatsApp Image 2026-11-14 at 12.36.07 PM.jpeg",
    "title": "Better together",
    "alt": "Large travel group posing together in an indoor event hall.",
    "width": 1080,
    "height": 800
  },
  {
    "id": "photo-04",
    "type": "photo",
    "file": "WhatsApp Image 2026-11-14 at 12.36.27 PM (1).jpeg",
    "title": "Good company, great journeys",
    "alt": "Travel group gathered outdoors among trees.",
    "width": 1079,
    "height": 713
  },
  {
    "id": "photo-05",
    "type": "photo",
    "file": "WhatsApp Image 2026-11-14 at 12.36.27 PM.jpeg",
    "title": "New places, familiar smiles",
    "alt": "Travellers posing together on outdoor steps.",
    "width": 1080,
    "height": 959
  },
  {
    "id": "photo-06",
    "type": "photo",
    "file": "WhatsApp Image 2026-11-14 at 12.36.28 PM.jpeg",
    "title": "The start of something good",
    "alt": "Travel group standing together outside a hotel entrance.",
    "width": 1080,
    "height": 796
  },
  {
    "id": "photo-07",
    "type": "photo",
    "file": "WhatsApp Image 2026-11-17 at 12.40.21 PM.jpeg",
    "title": "Life by the water",
    "alt": "Travellers enjoying a covered boat ride with houseboats and mountains in the background.",
    "width": 1280,
    "height": 960
  },
  {
    "id": "photo-08",
    "type": "photo",
    "file": "WhatsApp Image 2026-11-17 at 12.40.22 PM (1).jpeg",
    "title": "A little mountain magic",
    "alt": "Three travellers posing beside a mountain lake.",
    "width": 960,
    "height": 1280
  },
  {
    "id": "photo-09",
    "type": "photo",
    "file": "WhatsApp Image 2026-11-17 at 12.40.22 PM.jpeg",
    "title": "High on new memories",
    "alt": "Travel group gathered on a snowy mountain road.",
    "width": 1280,
    "height": 960
  },
  {
    "id": "photo-10",
    "type": "photo",
    "file": "WhatsApp Image 2026-11-17 at 12.44.09 PM.jpeg",
    "title": "Smiles on the water",
    "alt": "Travellers smiling during a covered boat ride.",
    "width": 1600,
    "height": 900
  },
  {
    "id": "photo-11",
    "type": "photo",
    "file": "WhatsApp Image 2026-11-17 at 12.44.54 PM.jpeg",
    "title": "Taking the scenic route",
    "alt": "Travel vehicles on a winding mountain road.",
    "width": 1280,
    "height": 960
  },
  {
    "id": "photo-12",
    "type": "photo",
    "file": "WhatsApp Image 2026-11-17 at 12.44.55 PM (1).jpeg",
    "title": "An adventure shared",
    "alt": "Travel group wearing life jackets on a covered boat.",
    "width": 1280,
    "height": 960
  },
  {
    "id": "photo-13",
    "type": "photo",
    "file": "WhatsApp Image 2026-11-17 at 12.44.55 PM (2).jpeg",
    "title": "Ready for the next chapter",
    "alt": "Travellers standing beside a minibus.",
    "width": 1280,
    "height": 960
  },
  {
    "id": "photo-14",
    "type": "photo",
    "file": "WhatsApp Image 2026-11-12 at 4.19.38 PM.jpeg",
    "title": "The trail is better together",
    "alt": "Travellers with backpacks gathered beside a rocky mountain trail.",
    "width": 1600,
    "height": 1200
  },
  {
    "id": "photo-15",
    "type": "photo",
    "file": "WhatsApp Image 2026-11-12 at 4.19.40 PM.jpeg",
    "title": "Above the everyday",
    "alt": "Travel group resting on a grassy mountain meadow with rocky peaks and low clouds.",
    "width": 1280,
    "height": 960
  },
  {
    "id": "film-01",
    "type": "video",
    "file": "WhatsApp Video 2026-11-17 at 12.48.02 PM (1).mp4",
    "title": "Along the mountain roads",
    "alt": "Travel vehicles following a winding road through a wooded mountain landscape.",
    "poster": "/images/gallery-previews/journey-film-01.webp",
    "width": 464,
    "height": 832,
    "duration": 21.93
  },
  {
    "id": "film-02",
    "type": "video",
    "file": "WhatsApp Video 2026-11-17 at 12.48.02 PM.mp4",
    "title": "Together on the road",
    "alt": "A convoy of travel vehicles travelling along a broad road.",
    "poster": "/images/gallery-previews/journey-film-02.webp",
    "width": 476,
    "height": 848,
    "duration": 32.810933
  }
];

export const galleryMedia = media.map(item => ({
  ...item,
  src: "/images/galleryimages/" + encodeURIComponent(item.file),
}));
