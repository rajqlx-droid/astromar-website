/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'eenumepuujkrnartejsh.supabase.co',
      },
    ],
  },
}

export default nextConfig
