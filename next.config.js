// eslint-disable-next-line import/no-unresolved
import bundleAnalizer from "@next/bundle-analyzer"

const withBundleAnalyzer = bundleAnalizer({
  // eslint-disable-next-line no-undef
  enabled: process.env.ANALYZE === true,
  openAnalyzer: false,
})

/** @type {import('next').NextConfig} */
export default withBundleAnalyzer({
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { remotePatterns: [{ hostname: "**" }] },
  experimental: { serverActions: true },
})
