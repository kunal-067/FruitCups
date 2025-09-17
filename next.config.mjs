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
    domains: [
      'upload.wikimedia.org', // allow Wikimedia images
      'images.pexels.com',   // <-- add this
      'images.unsplash.com',  // optional if using Unsplash
      'cdn.pixabay.com'       // optional if using Pixabay
    ],
  },
}


export default nextConfig;
