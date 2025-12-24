/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // 在生产环境排除管理 API 路由，避免打包大文件
  ...(process.env.VERCEL_ENV === 'production' && {
    webpack: (config, { isServer }) => {
      if (isServer) {
        // 排除管理 API 路由
        config.externals = config.externals || []
        config.externals.push({
          'fs': 'commonjs fs',
          'path': 'commonjs path',
        })
      }
      return config
    },
  }),
}

export default nextConfig
