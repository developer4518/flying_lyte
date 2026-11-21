const photos = "/images/package-destinations/";
const existingPhotos = "/images/hotel-destinations/";

// Queries use the package API's existing destination search.
export const packageDestinations = [
  { name: "Paris", query: "Paris", country: "France", image: photos + "paris.jpg", alt: "The Eiffel Tower in Paris against a clear blue sky", position: "50% 0%" },
  { name: "Singapore", query: "Singapore", country: "Singapore", image: photos + "singapore.jpg", alt: "Singapore's illuminated Marina Bay skyline" },
  { name: "Rome", query: "Rome", country: "Italy", image: photos + "rome.jpg", alt: "The Colosseum in Rome" },
  { name: "Bangkok", query: "Bangkok", country: "Thailand", image: photos + "bangkok.jpg", alt: "Wat Arun temple grounds in Bangkok" },
  { name: "Bali", query: "Bali", country: "Indonesia", image: photos + "bali.jpg", alt: "Ulun Danu Bratan temple beside the lake in Bali", position: "35% 45%" },
  { name: "Phuket", query: "Phuket", country: "Thailand", image: photos + "phuket.jpg", alt: "Wat Chalong temple in Phuket" },
  { name: "Tokyo", query: "Tokyo", country: "Japan", image: photos + "tokyo.jpg", alt: "Tokyo Tower and the city skyline at night" },
  { name: "Kashmir", query: "Kashmir", country: "India", image: existingPhotos + "kashmir-houseboats.webp", alt: "Houseboats on Dal Lake in Kashmir" },
  { name: "Kerala", query: "Munnar", country: "India", image: photos + "kerala.jpg", alt: "Munnar's green tea plantations in Kerala" },
  { name: "Dubai", query: "Dubai", country: "UAE", image: existingPhotos + "dubai-skyline-resort.webp", alt: "Dubai's skyline beside the water" },
  { name: "Vietnam", query: "Vietnam", country: "Vietnam", image: photos + "vietnam.jpg", alt: "Limestone islands rising from Ha Long Bay in Vietnam" },
  { name: "Goa", query: "Goa", country: "India", image: existingPhotos + "goa-beach-resort.webp", alt: "Goa's palm-lined coast and beach" },
  { name: "Manali", query: "Manali", country: "India", image: existingPhotos + "manali-mountain-resort.webp", alt: "Mountain scenery and a riverside stay in Manali" },
  { name: "Jaipur", query: "Jaipur", country: "India", image: existingPhotos + "jaipur-palace-hotel.webp", alt: "Rambagh Palace and gardens in Jaipur" },
];

export const destinationPackagesUrl = query =>
  `/packages?${new URLSearchParams({ destination: query })}#package-results`;
