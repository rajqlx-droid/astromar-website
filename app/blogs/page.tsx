import BlogClient from "./blog-client";

export const metadata = {
  alternates: { canonical: "/blogs" },
  title: 'Logistics & FTWZ Blog | Astromar Insights',
  description: 'Expert articles on FTWZ, customs duty, freight rates, import-export regulations and supply chain management in India.',
};

export default function BlogPage() {
  return <BlogClient />;
}
