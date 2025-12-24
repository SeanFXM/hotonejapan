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
    // 使用动态导入延迟加载文件系统操作
    const fs = await import('fs')
    const path = await import('path')
    const body = await request.json()
    // 支持两种格式：{ config } 或 { brand, slug, config }
    const config = body.config || body

    if (!config || !config.product) {
      return NextResponse.json(
        { error: "配置数据不完整" },
        { status: 400 }
      )
    }

    const { brand, slug } = config.product

    if (!brand || !slug) {
      return NextResponse.json(
        { error: "品牌和产品标识不能为空" },
        { status: 400 }
      )
    }

    // 创建产品目录
    const productDir = path.join(process.cwd(), "app", "brands", brand, "products", slug)
    if (!fs.existsSync(productDir)) {
      fs.mkdirSync(productDir, { recursive: true })
    }

    // 保存配置文件
    const configPath = path.join(productDir, "product.config.json")
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8")

    // 创建页面文件
    const pagePath = path.join(productDir, "page.tsx")
    const pageContent = `import { ProductPage } from "@/components/product-page"
import { ProductConfig } from "@/types/product-config"
import configData from "./product.config.json"

const config = configData as ProductConfig

export default function ProductDetailPage() {
  return <ProductPage config={config} />
}
`
    fs.writeFileSync(pagePath, pageContent, "utf-8")

    // 处理上传的图片和视频（base64转存为文件）
    await processMediaFiles(config, productDir)

    return NextResponse.json({
      success: true,
      message: "产品页面保存成功",
      path: `/brands/${brand}/products/${slug}`,
    })
  } catch (error: any) {
    console.error("保存产品页面失败:", error)
    return NextResponse.json(
      { error: error.message || "保存失败" },
      { status: 500 }
    )
  }
}

async function processMediaFiles(config: ProductConfig, productDir: string) {
  const fs = await import('fs')
  const path = await import('path')
  const imagesDir = path.join(productDir, "images")
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true })
  }

  // 处理Hero图片
  if (config.product.heroImage && config.product.heroImage.startsWith("data:")) {
    const imageData = config.product.heroImage
    const matches = imageData.match(/^data:image\/(\w+);base64,(.+)$/)
    if (matches) {
      const ext = matches[1]
      const base64Data = matches[2]
      const buffer = Buffer.from(base64Data, "base64")
      const filename = `hero.${ext}`
      fs.writeFileSync(path.join(imagesDir, filename), buffer)
      config.product.heroImage = `/images/brands/${config.product.brand}/products/${config.product.slug}/images/${filename}`
    }
  }

  // 递归处理所有媒体文件
  const processMediaItem = (item: any, prefix: string) => {
    if (typeof item === "object" && item !== null) {
      if (item.type && item.src) {
        // 这是一个MediaItem
        if (item.src.startsWith("data:")) {
          const matches = item.src.match(/^data:(image|video)\/(\w+);base64,(.+)$/)
          if (matches) {
            const mediaType = matches[1]
            const ext = matches[2]
            const base64Data = matches[3]
            const buffer = Buffer.from(base64Data, "base64")
            const filename = `${prefix}_${Date.now()}.${ext}`
            fs.writeFileSync(path.join(imagesDir, filename), buffer)
            item.src = `/images/brands/${config.product.brand}/products/${config.product.slug}/images/${filename}`
          }
        }
      } else {
        // 递归处理对象
        for (const key in item) {
          if (Array.isArray(item[key])) {
            item[key].forEach((subItem: any, index: number) => {
              processMediaItem(subItem, `${prefix}_${key}_${index}`)
            })
          } else {
            processMediaItem(item[key], `${prefix}_${key}`)
          }
        }
      }
    }
  }

  // 处理所有模块中的媒体
  if (config.modules) {
    Object.keys(config.modules).forEach((moduleKey) => {
      const module = (config.modules as any)[moduleKey]
      if (module) {
        processMediaItem(module, moduleKey)
      }
    })
  }

  // 重新保存配置文件（更新路径）
  const configPath = path.join(productDir, "product.config.json")
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8")
}
