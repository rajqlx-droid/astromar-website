"use client"
import { useEffect } from "react";

const GA_ID = "G-VLJPPE08DX";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    __gaLoaded?: boolean;
  }
}

// Loads gtag after hydration (no head preload), so it doesn't compete with the hero image.
const GoogleAnalytics = () => {
  useEffect(() => {
    if (window.__gaLoaded) return;
    window.__gaLoaded = true;

    window.dataLayer = window.dataLayer || [];
    // gtag must push the `arguments` object, not an array
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);
  }, []);

  return null;
};

export default GoogleAnalytics;
