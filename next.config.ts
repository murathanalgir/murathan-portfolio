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
export default nextConfig;
