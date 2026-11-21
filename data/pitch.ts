// Content for the private /pitch section.
// To add something new: drop the file into public/pitch/... and add one entry below.

export type PitchDeck = {
  slug: string;
  title: string;
  description: string;
  /** Self-contained slide page in public/pitch/decks/ */
  file: string;
  /** If set, clicking the card asks which version to open */
  models?: { key: string; label: string; full: string }[];
};

export type PitchVideo = {
  title: string;
  description: string;
  src: string;
  poster: string;
  duration: string;
};

export type PitchDocument = {
  title: string;
  description: string;
  href: string;
  type: string;
};

export const pitchDecks: PitchDeck[] = [
  {
    slug: "smi-bmi",
    title: "SMI and BMI models",
    description:
      "How the goods move, the paperwork we file, and where stock can go. Choose SMI or BMI when you open it.",
    file: "/pitch/decks/smi-bmi.html",
    models: [
      { key: "smi", label: "SMI", full: "Supplier-Managed Inventory" },
      { key: "bmi", label: "BMI", full: "Buyer-Managed Inventory" },
    ],
  },
];

export const pitchVideos: PitchVideo[] = [
  {
    title: "FTWZ explained",
    description:
      "Silent explainer with keyword captions: FTWZ as an SEZ, deemed foreign territory, duty and the DTA.",
    src: "/pitch/videos/ftwz-explainer.mp4",
    poster: "/pitch/videos/ftwz-explainer.jpg",
    duration: "1:27",
  },
];

// Reserved for sample trade documents (BL, BoE and similar). Not shown in the menu yet.
export const pitchDocuments: PitchDocument[] = [];
