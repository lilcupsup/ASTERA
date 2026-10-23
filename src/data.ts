export const destinations = [
  {
    id: "luna",
    name: "Luna",
    resort: "Tranquility Resort",
    type: "Lunar sanctuary",
    image: "IMG-04_luna",
    description: "A world of stillness. A view of everything you call home.",
    detail:
      "Set into the silver highlands of the Moon, Tranquility is an intimate sanctuary of panoramic suites, private lunar walks and unhurried Earthrise rituals.",
    days: 7,
    price: 185000,
    accent: "#c9d4e5",
    facts: ["Earthrise suites", "Guided lunar walks", "7-night expedition"],
  },
  {
    id: "mars",
    name: "Mars",
    resort: "Elysium Resort",
    type: "Canyon retreat",
    image: "IMG-05_mars",
    description: "An extraordinary retreat. A horizon unlike any other.",
    detail:
      "Carved into the shelter of a monumental Martian canyon, Elysium pairs warm stone interiors with private observatories and expeditions across the red planet.",
    days: 21,
    price: 480000,
    accent: "#d4a17c",
    facts: [
      "Canyon residences",
      "Private rover expeditions",
      "21-night expedition",
    ],
  },
  {
    id: "europa",
    name: "Europa",
    resort: "Oceanus Resort",
    type: "Ice-world hideaway",
    image: "IMG-06_europa",
    description:
      "At the edge of the familiar, discover a deeper kind of quiet.",
    detail:
      "A secluded retreat among sculptural ice ridges, beneath the immense presence of Jupiter. Oceanus offers sheltered viewing galleries, thermal rituals and guided ice-field explorations.",
    days: 28,
    price: 720000,
    accent: "#a9c8d5",
    facts: [
      "Jupiter-view suites",
      "Ice-field explorations",
      "28-night expedition",
    ],
  },
  {
    id: "saturn",
    name: "Saturn",
    resort: "The Rings Resort",
    type: "Orbital luxury",
    image: "IMG-03_saturn",
    description: "Wake above the most extraordinary view in the solar system.",
    detail:
      "Suspended above an endless sweep of rings, our signature orbital sanctuary is a celebration of perspective. Private terraces behind panoramic glass, exceptional dining and a personal concierge make every moment your own.",
    days: 35,
    price: 960000,
    accent: "#d6b56e",
    facts: [
      "Panoramic ring-view suites",
      "Private observation salons",
      "35-night expedition",
    ],
  },
  {
    id: "titan",
    name: "Titan",
    resort: "Horizon Resort",
    type: "A world apart",
    image: "IMG-07_titan",
    description: "Beyond the amber veil, a world reserved for the curious.",
    detail:
      "On the shore of a dark, still lake, Horizon is our most secluded outpost. Enclosed amber-view residences and carefully guided expeditions reveal a quietly extraordinary world.",
    days: 40,
    price: 1150000,
    accent: "#d8ae73",
    facts: [
      "Amber-view residences",
      "Lakeside observation gallery",
      "40-night expedition",
    ],
  },
];
export const experiences = [
  {
    name: "Celestial Suites",
    image: "IMG-08_suite",
    text: "Your own private world, with a window onto another.",
  },
  {
    name: "Celestial Dining",
    image: "IMG-09_dining",
    text: "Extraordinary ingredients. An incomparable setting.",
  },
  {
    name: "Observation Lounge",
    image: "IMG-02_lounge",
    text: "Time slows. The universe unfolds.",
  },
  {
    name: "Zero-G Spa",
    image: "IMG-10_spa",
    text: "A new perspective on the art of feeling well.",
  },
  {
    name: "The Atrium",
    image: "IMG-11_atrium",
    text: "A place to gather, between worlds.",
  },
  {
    name: "Private Cabins",
    image: "IMG-12_cabin",
    text: "Thoughtfully private. Effortlessly yours.",
  },
];
export const fleet = [
  {
    name: "ASTERA ONE",
    type: "Interplanetary Flagship",
    guests: 120,
    image: "IMG-01_flagship",
    text: "Our signature expression of travel. Grand panoramic lounges, celestial suites and a remarkable sense of space.",
    specs: ["60 private suites", "Observation deck", "Full wellness sanctuary"],
  },
  {
    name: "CELESTE",
    type: "Luxury Orbital Transport",
    guests: 48,
    image: "IMG-13_celeste",
    text: "An intimate passage to extraordinary places. Designed for short orbital journeys with uncompromising comfort.",
    specs: ["24 private cabins", "Panoramic dining", "Dedicated concierge"],
  },
  {
    name: "AURELIA",
    type: "Private Interplanetary Charter",
    guests: 12,
    image: "IMG-14_aurelia",
    text: "A spacecraft entirely your own. A personal itinerary, a dedicated crew and the freedom to travel on your terms.",
    specs: [
      "6 residential suites",
      "Private dining salon",
      "Bespoke itineraries",
    ],
  },
];
export const crew = [
  {
    name: "Commander Elena Vale",
    role: "ASTERA ONE Captain",
    image: "IMG-15_elena",
    credential: "4 Lunar Expeditions · 2 Mars Expeditions",
    bio: "Elena leads our flagship with quiet precision. Her approach puts thoughtful preparation and the comfort of every guest at the heart of each expedition.",
  },
  {
    name: "Commander James Orion",
    role: "Interplanetary Flight Commander",
    image: "IMG-16_james",
    credential: "12 Years Aerospace Experience",
    bio: "James brings an explorer’s curiosity and a commander’s calm to every journey, working closely with the flight team from departure to arrival.",
  },
  {
    name: "Dr. Maya Chen",
    role: "Chief Flight Physician",
    image: "IMG-17_maya",
    credential: "Space Medicine & Human Performance",
    bio: "Maya oversees the wellbeing of our guests through personalised preparation, attentive onboard care and a considered approach to life between worlds.",
  },
];
export const imageUrl = (name: string, size = 1280) =>
  `/media/images/${name}-${size}.webp`;
