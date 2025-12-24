"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { ProductPage } from "@/components/product-page"
import { ProductConfig } from "@/types/product-config"
import { BlogSlider } from "@/components/blog-slider"

function PreviewContent() {
  const searchParams = useSearchParams()
  const dataParam = searchParams.get("data")

  if (!dataParam) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">没有预览数据</p>
      </div>
    )
  }

  try {
    // 尝试解码URL参数
    let decodedData: string
    try {
      decodedData = decodeURIComponent(dataParam)
    } catch (e) {
      // 如果解码失败，直接使用原始数据
      decodedData = dataParam
    }

    // 解析JSON
    let config: ProductConfig
    try {
      config = JSON.parse(decodedData) as ProductConfig
    } catch (e) {
      console.error("JSON解析错误:", e)
      console.error("原始数据:", decodedData.substring(0, 200))
      throw new Error(`JSON解析失败: ${e instanceof Error ? e.message : String(e)}`)
    }

    // 验证必需字段
    if (!config.product) {
      throw new Error("缺少product字段")
    }
    if (!config.product.brand) {
      throw new Error("缺少product.brand字段")
    }
    if (!config.product.slug) {
      throw new Error("缺少product.slug字段")
    }

    // 确保navigation存在
    if (!config.navigation) {
      config.navigation = []
    }

    // 确保modules存在
    if (!config.modules) {
      config.modules = {}
    }

    return (
      <div className="min-h-screen bg-white">
        <ProductPage config={config} />
        {/* Blog Slider */}
        <BlogSlider />
      </div>
    )
  } catch (error) {
    console.error("预览数据解析失败:", error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl">
          <h2 className="text-xl font-bold text-red-600 mb-4">预览数据解析失败</h2>
          <p className="text-gray-700 mb-2">
            {error instanceof Error ? error.message : String(error)}
          </p>
          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-gray-500">查看详细信息</summary>
            <pre className="mt-2 text-xs bg-gray-100 p-4 rounded overflow-auto max-h-64">
              {error instanceof Error ? error.stack : String(error)}
            </pre>
          </details>
        </div>
      </div>
    )
  }
}

export default function PreviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">加载中...</div>
      </div>
    }>
      <PreviewContent />
    </Suspense>
  )
}

