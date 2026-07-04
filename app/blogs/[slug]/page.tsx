import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blogPosts } from '@/data/blogPosts'

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = blogPosts.find((p) => p.slug === slug && !p.externalUrl)
  if (!article) return { title: 'Article Not Found' }
  return {
    alternates: { canonical: `/blogs/${slug}` },
    title: article.title,
    description: article.metaDescription,
    keywords: article.keywords,
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      images: [{ url: article.heroImage ?? article.thumbnail }],
      type: 'article',
    },
  }
}

export function generateStaticParams() {
  return blogPosts.filter((p) => !p.externalUrl).map((p) => ({ slug: p.slug }))
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params
  const article = blogPosts.find((p) => p.slug === slug && !p.externalUrl)
  if (!article) notFound()

  const candidates = blogPosts.filter((p) => !p.externalUrl && p.slug !== slug)
  const sameCategory = candidates.filter((p) => p.category === article.category)
  const related = [...sameCategory]
  if (related.length < 3) {
    const pickedSlugs = new Set(related.map((p) => p.slug))
    const fillers = candidates.filter((p) => !pickedSlugs.has(p.slug))
    related.push(...fillers)
  }
  const relatedTop = related.slice(0, 3)

  const _articleDate = new Date(article.date);
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.metaDescription,
    image: article.heroImage ?? article.thumbnail,
    datePublished: isNaN(_articleDate.getTime()) ? undefined : _articleDate.toISOString(),
    author: { "@type": "Organization", name: "Astromar Logistics" },
    publisher: {
      "@type": "Organization",
      name: "Astromar Logistics",
      logo: { "@type": "ImageObject", url: "https://www.astromarfreezone.com/logo.png" },
    },
    mainEntityOfPage: `https://www.astromarfreezone.com/blogs/${slug}`,
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      {/* Hero */}
      <section className="relative min-h-[420px] flex items-center">
        <Image src={article.heroImage ?? article.thumbnail} alt={article.imageAlt ?? article.title} fill sizes="100vw" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20">
          <p className="text-xs font-semibold tracking-widest uppercase text-orange-500 mb-3">{article.category}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white max-w-3xl leading-tight mb-4">{article.title}</h1>
          <p className="text-white/70 text-sm">{formatDate(article.date)} &nbsp;·&nbsp; {article.readTime}</p>
        </div>
      </section>

      {/* Article Body */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16 py-16">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-10">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/blogs" className="hover:text-blue-600">Blog</Link>
          <span>/</span>
          <span className="text-gray-800 dark:text-gray-100">{article.category}</span>
        </nav>

        {/* Intro */}
        <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-12 border-l-4 border-orange-500 pl-5">{article.intro}</p>

        {/* Sections */}
        {(article.sections ?? []).map((section, i) => (
          <div key={i} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{section.heading}</h2>
            <div className="text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-line">{section.content}</div>
          </div>
        ))}

        {/* Keywords */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-3">Related Topics</p>
          <div className="flex flex-wrap gap-2">
            {(article.keywords ?? []).map((kw, i) => (
              <span key={i} className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full border border-blue-100">{kw}</span>
            ))}
          </div>
        </div>

        {/* Related Articles */}
        {relatedTop.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-[#1B3A6B] mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedTop.map((a) => (
                <Link key={a.slug} href={`/blogs/${a.slug}`} className="group block rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-40 w-full overflow-hidden bg-gray-100">
                    <Image src={a.heroImage ?? a.thumbnail} alt={a.imageAlt ?? a.title} fill className="object-cover group-hover:scale-105 transition-transform" sizes="(max-width:768px) 100vw, 33vw" />
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#F97316]">{a.category}</span>
                    <h3 className="mt-1 font-bold text-[#1B3A6B] leading-snug group-hover:text-[#F97316] transition-colors">{a.title}</h3>
                    <p className="mt-2 text-xs text-gray-500">{a.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 bg-blue-900 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">Need FTWZ Warehousing or Freight Support?</h3>
          <p className="text-blue-200 mb-6">Talk to our logistics experts — free consultation, no commitment.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact-us" className="bg-orange-500 hover:bg-orange-500 text-white font-semibold px-8 py-3 rounded-xl transition-colors">Request a Consultation</Link>
            <Link href="/freight-intelligence" className="border border-white/40 hover:bg-white/10 text-white font-semibold px-8 py-3 rounded-xl transition-colors">Try Our Free Freight Calculators</Link>
          </div>
        </div>

        {/* Back to blog */}
        <div className="mt-10 text-center">
          <Link href="/blogs" className="text-blue-600 hover:underline text-sm">← Back to all articles</Link>
        </div>
      </section>
    </main>
  )
}
