import { NextResponse } from "next/server"
import * as fs from "fs"
import * as path from "path"
import { BrandConfig } from "@/types/brand-config"

export async function GET(
  request: Request,
  { params }: { params: { brand: string } }
) {
  try {
    const brand = params.brand
    const configPath = path.join(
      process.cwd(),
      "app",
      "brands",
      brand,
      "brand.config.json"
    )

    if (!fs.existsSync(configPath)) {
      // 返回默认配置
      return NextResponse.json({
        config: {
          brand,
          news: { items: [] },
          announcements: { items: [] },
          supportInfo: { items: [] },
          updatedAt: new Date().toISOString(),
        },
      })
    }

    const configContent = fs.readFileSync(configPath, "utf-8")
    const config = JSON.parse(configContent) as BrandConfig

    return NextResponse.json({ config })
  } catch (error: any) {
    console.error("Error loading brand config:", error)
    return NextResponse.json(
      { error: error.message || "加载配置失败" },
      { status: 500 }
    )
  }
}

export async function POST(
  request: Request,
  { params }: { params: { brand: string } }
) {
  try {
    const brand = params.brand
    const body = await request.json()
    const { config } = body

    if (!config) {
      return NextResponse.json(
        { error: "配置数据不能为空" },
        { status: 400 }
      )
    }

    const brandDir = path.join(process.cwd(), "app", "brands", brand)
    if (!fs.existsSync(brandDir)) {
      fs.mkdirSync(brandDir, { recursive: true })
    }

    const configPath = path.join(brandDir, "brand.config.json")

    // 处理上传的图片和视频（base64转存为文件）
    await processMediaFiles(config, brandDir)

    // 保存配置
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8")

    return NextResponse.json({
      success: true,
      message: "配置保存成功",
    })
  } catch (error: any) {
    console.error("Error saving brand config:", error)
    return NextResponse.json(
      { error: error.message || "保存失败" },
      { status: 500 }
    )
  }
}

async function processMediaFiles(config: BrandConfig, brandDir: string) {
  const mediaDir = path.join(brandDir, "media")
  if (!fs.existsSync(mediaDir)) {
    fs.mkdirSync(mediaDir, { recursive: true })
  }

  const processContentItems = (items: any[]) => {
    items.forEach((item) => {
      // 处理图片
      if (item.image && item.image.startsWith("data:")) {
        const matches = item.image.match(/^data:image\/(\w+);base64,(.+)$/)
        if (matches) {
          const ext = matches[1]
          const base64Data = matches[2]
          const buffer = Buffer.from(base64Data, "base64")
          const filename = `image_${item.id}_${Date.now()}.${ext}`
          fs.writeFileSync(path.join(mediaDir, filename), buffer)
          item.image = `/images/brands/${config.brand}/media/${filename}`
        }
      }

      // 处理视频
      if (item.video && item.video.startsWith("data:")) {
        const matches = item.video.match(/^data:video\/(\w+);base64,(.+)$/)
        if (matches) {
          const ext = matches[1]
          const base64Data = matches[2]
          const buffer = Buffer.from(base64Data, "base64")
          const filename = `video_${item.id}_${Date.now()}.${ext}`
          fs.writeFileSync(path.join(mediaDir, filename), buffer)
          item.video = `/images/brands/${config.brand}/media/${filename}`
        }
      }
    })
  }

  // 处理所有标签页的内容
  processContentItems(config.news.items)
  processContentItems(config.announcements.items)
  processContentItems(config.supportInfo.items)

  // 重新保存配置文件（更新路径）
  const configPath = path.join(brandDir, "brand.config.json")
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8")
}

