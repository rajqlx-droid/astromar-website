"use client"
import { useState } from "react";
import { Send } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useToast } from "@/hooks/use-toast";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast({ title: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      toast({ title: "Subscribed!", description: "You'll receive our latest insights." });
      setEmail("");
    } catch {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
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
              className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          <p className="text-gray-400 text-xs mt-4">No spam. Unsubscribe anytime.</p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default NewsletterSignup;

