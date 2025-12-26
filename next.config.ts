// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js', // Treats the imported SVG as a JS/TS module (React component)
      },
    },
  },
  // If you still use the webpack() function for other configurations (e.g. for the build command which might still use webpack), 
  // you may need to include a similar configuration there, but Turbopack uses its own configuration.
};

module.exports = nextConfig;
