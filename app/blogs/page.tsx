import BlogClient from "./blog-client";

export const metadata = {
  alternates: { canonical: "/blogs" },
  title: 'Logistics & FTWZ Blog | Astromar Insights',
  description: 'Expert articles on FTWZ, customs duty, freight rates, import-export regulations and supply chain management in India.',
};

const blogsBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Astromar", "item": "https://www.astromarfreezone.com/" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.astromarfreezone.com/blogs" }
  ]
};

export default function BlogPage() {
  return (
    <>
      <BlogClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogsBreadcrumbSchema) }} />
    </>
  );
}
