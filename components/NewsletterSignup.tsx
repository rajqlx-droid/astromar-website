"use client"
import { useState } from "react";
import { Send } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubscribed(true);
        setEmail("");
      } else {
        setError(data.error || "Subscription failed. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <ScrollReveal>
          <Send className="w-8 h-8 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl sm:text-2xl font-bold text-[#0a1628] mb-2">
            Stay Ahead in Logistics
          </h3>
          <p className="text-gray-600 text-sm mb-6">
            Get expert insights on FTWZ, freight, and trade compliance delivered to your inbox.
          </p>
          {subscribed ? (
            <div className="bg-white border border-green-200 rounded-lg p-6 max-w-md mx-auto">
              <div className="text-3xl mb-2">✓</div>
              <p className="text-[#0a1628] font-bold">Subscribed!</p>
              <p className="text-gray-600 text-sm mt-1">You&apos;ll receive our latest insights.</p>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  maxLength={255}
                  className="flex-1 px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
              {error && (
                <p className="text-red-600 text-sm mt-3">{error}</p>
              )}
              <p className="text-gray-400 text-xs mt-4">No spam. Unsubscribe anytime.</p>
            </>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
};

export default NewsletterSignup;
