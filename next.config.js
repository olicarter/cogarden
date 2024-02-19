const supabaseUrl = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL)

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: supabaseUrl.protocol.slice(0, -1), // Remove trailing colon
        hostname: supabaseUrl.hostname,
        pathname: '/storage/v1/object/public/images/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
