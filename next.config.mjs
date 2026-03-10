/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === "production" ? "/bdecomet" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/bdecomet/" : "",
  typescript: {
    ignoreBuildErrors: true,
  }
}

export default nextConfig
