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
    <section className="py-20 bg-brand-navy">
      <div className="container px-4 max-w-2xl text-center">
        <ScrollReveal>
          <Send className="w-8 h-8 text-primary mx-auto mb-4" />
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Stay Ahead in Logistics
          </h3>
          <p className="text-white/60 text-sm mb-6">
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
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          <p className="text-white/30 text-xs mt-4">No spam. Unsubscribe anytime.</p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default NewsletterSignup;

