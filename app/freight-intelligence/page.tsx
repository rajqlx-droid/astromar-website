import FreightClient from "./freight-client";

export const metadata = {
  title: 'Freight Intelligence Tools | CBM, Landed Cost, Demurrage | Astromar',
  description: 'Free shipping calculators – CBM calculator, landed cost estimator, air vs sea comparison, demurrage calculator.',
};

export default function FreightIntelligencePage() {
  return <FreightClient />;
}
