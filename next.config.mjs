/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'api-adrify.onrender.com'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',  // ou votre domaine d'API
        port: '5000',          // votre port d'API
        pathname: '/uploads/**',
      },
      // Ajoutez d'autres patterns si nécessaire pour la production
      {
        protocol: 'https',
        hostname: 'api-adrify.onrender.com',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
