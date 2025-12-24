import { NextResponse } from "next/server"
import { ProductConfig } from "@/types/product-config"

export async function POST(request: Request) {
  // 在生产环境禁用此功能，避免打包大文件
  if (process.env.VERCEL_ENV === 'production') {
    return NextResponse.json(
      { error: "此功能仅在开发环境可用" },
      { status: 403 }
    )
  }

  try {
    const { config } = await request.json()

    if (!config.product?.brand || !config.product?.slug) {
      return NextResponse.json(
        { error: "品牌和产品标识不能为空" },
        { status: 400 }
      )
    }

    const { brand, slug } = config.product

    // 使用动态导入延迟加载文件系统操作
    const fs = await import('fs')
    const path = await import('path')

    // 创建目录
    const pageDir = path.join(process.cwd(), "app", "brands", brand, "products", slug)
    const imageDir = path.join(process.cwd(), "public", "images", "brands", brand, slug)

    if (!fs.existsSync(pageDir)) {
      fs.mkdirSync(pageDir, { recursive: true })
    }
    if (!fs.existsSync(imageDir)) {
      fs.mkdirSync(imageDir, { recursive: true })
    }

    // 生成页面文件
    const pageContent = `"use client"

import { ProductPage } from "@/components/product-page"
import productConfig from "./product.config.json"

export default function ProductPageRoute() {
  return <ProductPage config={productConfig} />
}
`

    const pagePath = path.join(pageDir, "page.tsx")
    fs.writeFileSync(pagePath, pageContent, "utf-8")

    // 保存配置文件
    const configPath = path.join(pageDir, "product.config.json")
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8")

    return NextResponse.json({
      success: true,
      message: "产品页面生成成功",
      path: `/brands/${brand}/products/${slug}`,
    })
  } catch (error) {
    console.error("Error generating product page:", error)
    return NextResponse.json(
      { error: `生成失败: ${error}` },
      { status: 500 }
    )
  }
}

