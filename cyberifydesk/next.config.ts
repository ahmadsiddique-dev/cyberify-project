import type { NextConfig } from "next"

// const cwd = process.cwd()
// const rootPath = cwd.includes("\\")
//   ? cwd.substring(0, cwd.lastIndexOf("\\"))
//   : cwd.substring(0, cwd.lastIndexOf("/"))

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // turbopack: {
  //   root: rootPath,
  // },
}

export default nextConfig
