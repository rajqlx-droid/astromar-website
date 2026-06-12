/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    remotePatterns: [
      { protocol: 'https', hostname: 'eenumepuujkrnartejsh.supabase.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async redirects() {
    return [
      { source: '/about', destination: '/about-us', permanent: true },
      { source: '/contact', destination: '/contact-us', permanent: true },
      { source: '/blog', destination: '/blogs', permanent: true },
      { source: '/blog/:slug*', destination: '/blogs/:slug*', permanent: true },
      { source: '/ftwz-services', destination: '/free-trade-zone-services', permanent: true },
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
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https://images.unsplash.com https://eenumepuujkrnartejsh.supabase.co; connect-src 'self'; worker-src 'self' blob:; frame-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self';"
          },
        ],
      },
    ]
  },
}

export default nextConfig;
