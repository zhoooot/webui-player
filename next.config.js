/** @type {import('next').NextConfig} */
//  const nextBuildId = require('next-build-id')
require('dotenv').config()

const nextConfig = {
  reactStrictMode: false,
  // generateBuildId: () => nextBuildId({ dir: __dirname }),
  env: {
    GAMEINFO_URL: process.env.GAMEINFO_URL,
  }
}

module.exports = nextConfig
