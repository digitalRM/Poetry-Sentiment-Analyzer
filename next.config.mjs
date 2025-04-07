/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // This is necessary because Natural.js depends on Node.js core modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        fs: false,
        child_process: false,
        "webworker-threads": false,
        "pg-native": false,
      };
    }
    return config;
  },
};

export default nextConfig;
