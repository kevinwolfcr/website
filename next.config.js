/** @type {import('next').NextConfig} */
export default {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { remotePatterns: [{ hostname: "**" }] },
  experimental: { serverActions: true },
}
