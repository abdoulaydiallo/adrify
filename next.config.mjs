/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',  // ou votre domaine d'API
        port: '8000',          // votre port d'API
        pathname: '/uploads/**',
      },
      // Ajoutez d'autres patterns si nécessaire pour la production
      {
        protocol: 'https',
        hostname: 'api-adrify.onrender.com',
        pathname: '/uploads/**',
      },
      // Ajout de Cloudinary
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Autoriser les images de Cloudinary
        pathname: '/**', // Autoriser toutes les images
      },
    ],
  },
};

export default nextConfig;
