require('dotenv').config()

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['image.tmdb.org'],
  },
  env: {
    KEY_MOVIE_DB: process.env.KEY_MOVIE_TMDB,
    KEY_STREAMS: process.env.KEY_MOVIE_STREAMS,
  },
}

module.exports = nextConfig
