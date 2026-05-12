import FreightClient from "./freight-client";

export const metadata = {
  title: "Freight Intelligence Tools | Astromar Logistics FTWZ",
  description: "Smart freight calculators — CBM Load Optimizer, Air Volume, Landed Cost, Export Price, Air vs Sea comparison and Demurrage Risk calculator for FTWZ logistics.",
};

export default function FreightIntelligencePage() {
  return <FreightClient />;
}
