// Suggested keywords for the admin tracker pages (/admin/gsc and /admin/serpapi).
// Edit this list freely. `label` is the wording shown in the dropdown;
// `value` is the normalised form (trimmed, single spaces, lowercase) used to match saved keywords.
// Picking one only fills the keyword box. It never starts a check.

export interface TrackerKeyword {
  label: string;
  value: string;
}

export const TRACKER_KEYWORDS: TrackerKeyword[] = [
  { label: "FTWZ in Vizag", value: "ftwz in vizag" },
  { label: "Free Trade Warehouse Zone in Mumbai", value: "free trade warehouse zone in mumbai" },
  { label: "FTWZ in Mumbai", value: "ftwz in mumbai" },
  { label: "Chennai Free Trade Zone", value: "chennai free trade zone" },
  { label: "Free Trade Warehouse in Chennai", value: "free trade warehouse in chennai" },
  { label: "FTWZ in Delhi", value: "ftwz in delhi" },
  { label: "FTWZ in Bangalore", value: "ftwz in bangalore" },
  { label: "FTWZ in Dahej", value: "ftwz in dahej" },
  { label: "FTWZ Mundra", value: "ftwz mundra" },
  { label: "FTWZ in Kochi", value: "ftwz in kochi" },
  { label: "Free Trade Zone in India", value: "free trade zone in india" },
  { label: "Bonded Storage in India", value: "bonded storage in india" },
  { label: "Free Trade Warehousing Zone Solutions", value: "free trade warehousing zone solutions" },
  { label: "FTWZ in India", value: "ftwz in india" },
];
