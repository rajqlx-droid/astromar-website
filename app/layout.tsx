import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "next-themes";
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.astromarfreezone.com'),
  title: "Astromar Logistics – FTWZ India",
  description: "India's leading Free Trade Warehousing Zone provider offering duty-free storage, customs clearance, and integrated logistics solutions.",
  keywords: 'FTWZ India, Free Trade Warehousing Zone, duty free warehouse, customs clearance, logistics India',
  openGraph: {
    title: "Astromar Logistics – FTWZ India",
    description: "India's leading Free Trade Warehousing Zone provider offering duty-free storage, customs clearance, and integrated logistics solutions.",
    url: 'https://www.astromarfreezone.com',
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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body className="bg-background text-foreground overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} forcedTheme="light">
          <Header />
          {children}
          <GoogleAnalytics gaId="G-VLJPPE08DX" />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
