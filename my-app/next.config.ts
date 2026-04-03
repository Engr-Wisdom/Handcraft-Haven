const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,  // Forces Next.js to use THIS folder as root
  },
}

module.exports = nextConfig