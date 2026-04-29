"use client"
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollReveal from "@/components/ScrollReveal";
import NewsletterSignup from "@/components/NewsletterSignup";
import { blogPosts, categoryColors } from "@/data/blogPosts";

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

const ALL_CATEGORY = "All";

const Blog = () => {
  const categories = useMemo(() => {
    const cats = Array.from(new Set(blogPosts.map((p) => p.category)));
    return [ALL_CATEGORY, ...cats];
  }, []);

  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);

  const filteredPosts = useMemo(
    () => (activeCategory === ALL_CATEGORY ? blogPosts : blogPosts.filter((p) => p.category === activeCategory)),
    [activeCategory]
  );

  const [heroPost, ...otherFeatured] = filteredPosts.filter((p) => p.featured);
  const rest = filteredPosts.filter((p) => !p.featured);
  const hasFeatured = !!heroPost;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead />
      <Header />

      {/* Hero */}
      <section className="relative bg-brand-navy py-20 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200"
          alt="Logistics blog and insights"
          fill
          className="absolute inset-0 object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="w-full px-6 md:px-12 lg:px-16 relative z-10">
          <ScrollReveal>
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-orange-500 mb-4 block">
              RESOURCES & INSIGHTS
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-extrabold text-white mb-5 leading-tight">
              Logistics Blog
            </h1>
            <p className="text-white/80 max-w-lg mb-8 text-base sm:text-lg">
              Expert guides and practical tools for importers, exporters, and logistics professionals.
            </p>
            <div className="flex flex-wrap gap-3">
              {["✦ 50+ Articles", "✦ FTWZ & Trade Topics", "✦ Updated Weekly"].map((pill) => (
                <span key={pill} className="bg-white/10 border border-white/20 text-white rounded-full px-4 py-1 text-sm">
                  {pill}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="bg-background border-b border-border sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide -mx-1 px-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hero Post + Side Cards */}
      {hasFeatured && (
        <section className="py-14 bg-background">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid lg:grid-cols-5 gap-6">
              {/* Large hero card with thumbnail */}
              <ScrollReveal className="lg:col-span-3">
                <Link href={`/blog/${heroPost.slug}`} className="block group h-full">
                  <article className="bg-card border border-border rounded-2xl overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative h-48 sm:h-64 overflow-hidden">
                      <img
                        src={heroPost.thumbnail}
                        alt={heroPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <span className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[heroPost.category] || "bg-muted text-muted-foreground"}`}>
                        {heroPost.category}
                      </span>
                    </div>
                    <div className="p-8 sm:p-10 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {formatDate(heroPost.date)}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {heroPost.readTime}
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-snug">
                        {heroPost.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed flex-1 mb-6 text-sm sm:text-base">
                        {heroPost.excerpt}
                      </p>
                      <span className="text-sm font-semibold text-primary flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                        Read full article <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </article>
                </Link>
              </ScrollReveal>

              {/* Side featured cards with thumbnails */}
              {otherFeatured.length > 0 && (
                <div className="lg:col-span-2 flex flex-col gap-6">
                  {otherFeatured.map((post, i) => (
                    <ScrollReveal key={post.slug} delay={i * 0.1} className="flex-1">
                      <Link href={`/blog/${post.slug}`} className="block group h-full">
                        <article className="bg-card border border-border rounded-2xl overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
                          <div className="relative h-32 overflow-hidden">
                            <img
                              src={post.thumbnail}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                            <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[post.category] || "bg-muted text-muted-foreground"}`}>
                              {post.category}
                            </span>
                          </div>
                          <div className="p-5 flex flex-col flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {post.readTime}
                              </span>
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                              {post.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-3 line-clamp-2">
                              {post.excerpt}
                            </p>
                            <span className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                              Read article <ArrowRight className="w-4 h-4" />
                            </span>
                          </div>
                        </article>
                      </Link>
                    </ScrollReveal>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* All / Filtered Posts Grid */}
      {rest.length > 0 && (
        <section className={`bg-gray-50 ${hasFeatured ? "pb-14 pt-14" : "py-14"}`}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-10">
                <h2 className="text-xl font-bold text-foreground">
                  {activeCategory === ALL_CATEGORY ? "All Articles" : activeCategory}
                </h2>
                <div className="flex-1 h-px bg-border" />
              </div>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post, i) => (
                <ScrollReveal key={post.slug} delay={i * 0.08}>
                  <Link href={`/blog/${post.slug}`} className="block group h-full">
                    <article className="bg-card border border-border rounded-2xl overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[post.category] || "bg-muted text-muted-foreground"}`}>
                          {post.category}
                        </span>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {formatDate(post.date)}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {post.readTime}
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {!hasFeatured && rest.length === 0 && (
        <section className="py-14">
          <div className="max-w-2xl mx-auto text-center px-6">
            <p className="text-muted-foreground text-lg">No articles found in this category.</p>
          </div>
        </section>
      )}

      <NewsletterSignup />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Blog;
