/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'your-strapi-domain.com',
        port: '',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      // Turkish URL rewrites for SEO
      {
        source: '/ara',
        destination: '/search',
      },
      {
        source: '/kategori/:slug',
        destination: '/category/:slug',
      },
      {
        source: '/ilan/:city/:slug',
        destination: '/business/:city/:slug',
      },
      {
        source: '/giris',
        destination: '/auth/login',
      },
      {
        source: '/kayit',
        destination: '/auth/register',
      },
      {
        source: '/isletme/:path*',
        destination: '/dashboard/:path*',
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig