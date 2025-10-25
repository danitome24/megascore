/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Suppress warnings for optional dependencies that aren't needed in browser
    config.ignoreWarnings = (config.ignoreWarnings || []).concat([
      // Suppress MetaMask SDK warnings about React Native dependencies
      /Can't resolve '@react-native-async-storage\/async-storage'/,
      /Can't resolve 'react-native'/,
      /Can't resolve 'expo-modules-core'/,
      /indexedDB is not defined/,
    ]);

    return config;
  },
}

export default nextConfig
