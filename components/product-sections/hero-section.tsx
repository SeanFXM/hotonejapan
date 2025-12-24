"use client"

import Image from "next/image"
import { HeroConfig } from "@/types/product-config"

interface HeroSectionProps {
  config: HeroConfig
  brandName: string
}

export function HeroSection({ config, brandName }: HeroSectionProps) {
  if (!config.heroImage) return null

  // 检查是否是base64 data URL
  const isBase64 = config.heroImage.startsWith("data:")
  
  // 规范化图片路径：确保相对路径以 / 开头
  const normalizeImagePath = (path: string): string => {
    if (isBase64 || path.startsWith("http") || path.startsWith("/")) {
      return path
    }
    // 如果是相对路径但没有前导斜杠，添加它
    if (path.startsWith("images/")) {
      return `/${path}`
    }
    return `/images/${path}`
  }

  const imageSrc = isBase64 ? config.heroImage : normalizeImagePath(config.heroImage)

  return (
    <section className="relative w-full h-[600px] overflow-hidden bg-gray-100">
      {isBase64 ? (
        <img
          src={imageSrc}
          alt={brandName}
          className="w-full h-full object-cover"
          style={{ position: "absolute", inset: 0 }}
        />
      ) : (
        <Image
          src={imageSrc}
          alt={brandName}
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

      {config.floatingInfo.enabled && (
        <div className="relative container mx-auto px-6 h-full flex items-center justify-end">
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-white/30 w-96">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 tracking-wider">{brandName.toUpperCase()}</h1>
            </div>

            <div className="space-y-4 text-gray-900">
              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">製品名：</p>
                <p className="text-2xl font-bold text-gray-900">{config.floatingInfo.productName}</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">{config.floatingInfo.category}</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">{config.floatingInfo.price}</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-gray-900">
                  {config.floatingInfo.referencePrice}
                </p>
                <p className="text-xs text-gray-500">前後（税込）</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">{config.floatingInfo.jan}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

