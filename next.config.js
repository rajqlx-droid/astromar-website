/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'eenumepuujkrnartejsh.supabase.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async redirects() {
    return [
      { source: '/about', destination: '/about-us', permanent: true },
      { source: '/contact', destination: '/contact-us', permanent: true },
      { source: '/ftwz-services', destination: '/free-trade-zone', permanent: true },
      { source: '/services', destination: '/free-trade-zone-services', permanent: true },
      { source: '/services/coastal-shipping', destination: '/coastal-shipping-free-trade-zone', permanent: true },
      { source: '/services/ocean-freight', destination: '/free-trade-zone-services/ocean-freight', permanent: true },
      { source: '/services/air-freight', destination: '/free-trade-zone-services/air-freight', permanent: true },
      { source: '/services/supply-chain', destination: '/free-trade-zone-services/supply-chain', permanent: true },
      { source: '/services/custom-clearance', destination: '/free-trade-zone-services/custom-clearance', permanent: true },
      { source: '/services/warehousing', destination: '/free-trade-zone-services/warehousing', permanent: true },
      { source: '/services/projects', destination: '/free-trade-zone-services/projects', permanent: true },
    ]
  },
}

export default nextConfig;
