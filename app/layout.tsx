import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://astromarfreezone.com'),
  title: "Astromar Logistics – FTWZ India",
  description: "India's leading Free Trade Warehousing Zone provider offering duty-free storage, customs clearance, and integrated logistics solutions.",
  keywords: 'FTWZ India, Free Trade Warehousing Zone, duty free warehouse, customs clearance, logistics India',
  openGraph: {
    title: "Astromar Logistics – FTWZ India",
    description: "India's leading Free Trade Warehousing Zone provider offering duty-free storage, customs clearance, and integrated logistics solutions.",
    url: 'https://astromarfreezone.com',
    siteName: 'Astromar Logistics',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Astromar Logistics – FTWZ India",
    description: "India's leading Free Trade Warehousing Zone provider offering duty-free storage, customs clearance, and integrated logistics solutions.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
