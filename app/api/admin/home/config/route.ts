import { NextResponse } from "next/server"
import * as fs from "fs"
import * as path from "path"
import { HomeConfig } from "@/types/home-config"

const CONFIG_PATH = path.join(process.cwd(), "app", "home.config.json")
const MEDIA_DIR = path.join(process.cwd(), "public", "images", "home", "media")

export async function GET() {
  try {
    if (!fs.existsSync(CONFIG_PATH)) {
      return NextResponse.json({
        config: {
          newProducts: { items: [] },
          supportInfo: { items: [] },
          announcements: { items: [] },
          updatedAt: new Date().toISOString(),
        },
      })
    }

    const configContent = fs.readFileSync(CONFIG_PATH, "utf-8")
    const config = JSON.parse(configContent) as HomeConfig

    return NextResponse.json({ config })
  } catch (error: any) {
    console.error("Error loading home config:", error)
    return NextResponse.json(
      { error: error.message || "加载配置失败" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { config } = body

    if (!config) {
      return NextResponse.json(
        { error: "配置数据不能为空" },
        { status: 400 }
      )
    }

    // 处理上传的图片和视频
    await processMediaFiles(config)

    // 保存配置
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), "utf-8")

    return NextResponse.json({
      success: true,
      message: "配置保存成功",
    })
  } catch (error: any) {
    console.error("Error saving home config:", error)
    return NextResponse.json(
      { error: error.message || "保存失败" },
      { status: 500 }
    )
  }
}

async function processMediaFiles(config: HomeConfig) {
  if (!fs.existsSync(MEDIA_DIR)) {
    fs.mkdirSync(MEDIA_DIR, { recursive: true })
  }

  const processItems = (items: any[]) => {
    items.forEach((item) => {
      if (item.image && item.image.startsWith("data:")) {
        const matches = item.image.match(/^data:image\/(\w+);base64,(.+)$/)
        if (matches) {
          const ext = matches[1]
          const base64Data = matches[2]
          const buffer = Buffer.from(base64Data, "base64")
          const filename = `image_${item.id}_${Date.now()}.${ext}`
          fs.writeFileSync(path.join(MEDIA_DIR, filename), buffer)
          item.image = `/images/home/media/${filename}`
        }
      }

      if (item.video && item.video.startsWith("data:")) {
        const matches = item.video.match(/^data:video\/(\w+);base64,(.+)$/)
        if (matches) {
          const ext = matches[1]
          const base64Data = matches[2]
          const buffer = Buffer.from(base64Data, "base64")
          const filename = `video_${item.id}_${Date.now()}.${ext}`
          fs.writeFileSync(path.join(MEDIA_DIR, filename), buffer)
          item.video = `/images/home/media/${filename}`
        }
      }
    })
  }

  processItems(config.newProducts.items)
  processItems(config.supportInfo.items)
  processItems(config.announcements.items)
}

