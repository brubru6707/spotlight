/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    domains: ["images.unsplash.com", "b.zmtcdn.com", "placehold.co", "play.google.com"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
