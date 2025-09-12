/** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // main Unsplash CDN
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com', // sometimes used for premium images
      },
    ],
  },
}


export default nextConfig;
