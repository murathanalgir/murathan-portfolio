/* eslint-disable @typescript-eslint/no-require-imports */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
})

/** @type {import('next').NextConfig} */
module.exports = withMDX({
  // MDX & TSX/TS uzantılarını Next.js’in işlemesi için
  pageExtensions: ['tsx', 'ts', 'md', 'mdx'],
  experimental: { mdxRs: true }
})
/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['i.scdn.co'], // Spotify kapak URL’lerinin geldiği host
  },
}
/** @type {import('next').NextConfig} */
module.exports = {
  async redirects() {
    return [
      {
        source: '/test',      // kullanıcı tarayıcıda bu yolu açtığında…
        destination: 'https://open.spotify.com/intl-tr/track/3b6DyYG5UWO1Tmq2Plx3e7?si=c72371ea48814d16',  // buraya yönlensin
        permanent: false,          // kalıcı mı? (SEO için 308) geçici ise false (307)
      },
    ]
  },
}
export default nextConfig;
