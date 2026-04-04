import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Astromar Free Zone - FTWZ India",
  description: "Free Trade Warehousing Zone Provider",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <header className="bg-blue-900 text-white py-4 px-6 sticky top-0 shadow-md z-50">
          <nav className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Astromar Free Zone</h1>
            <ul className="hidden md:flex gap-8 text-sm">
              <li><a href="/" className="hover:text-blue-200">Home</a></li>
              <li><a href="#services" className="hover:text-blue-200">Services</a></li>
              <li><a href="/contact" className="hover:text-blue-200">Contact</a></li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="bg-blue-900 text-white py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div><h3 className="font-bold">Services</h3><a href="#services" className="text-blue-200">Our Services</a></div>
              <div><h3 className="font-bold">Company</h3><a href="/about" className="text-blue-200">About</a></div>
              <div><h3 className="font-bold">Contact</h3><a href="/contact" className="text-blue-200">Reach Out</a></div>
            </div>
            <p className="text-center text-blue-200">&copy; 2024 Astromar</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
