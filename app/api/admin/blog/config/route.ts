import { NextResponse } from "next/server"
import * as fs from "fs"
import * as path from "path"
import { BlogConfig } from "@/types/blog-config"

const CONFIG_PATH = path.join(process.cwd(), "app", "blog.config.json")
const MEDIA_DIR = path.join(process.cwd(), "public", "images", "blog", "media")

export async function GET() {
  try {
    if (!fs.existsSync(CONFIG_PATH)) {
      return NextResponse.json({
        config: {
          posts: [],
          updatedAt: new Date().toISOString(),
        },
      })
    }

    const configContent = fs.readFileSync(CONFIG_PATH, "utf-8")
    const config = JSON.parse(configContent) as BlogConfig

    return NextResponse.json({ config })
  } catch (error: any) {
    console.error("Error loading blog config:", error)
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

    // 处理上传的图片
    await processMediaFiles(config)

    // 按日期排序
    config.posts.sort((a, b) => new Date(b.dateSort).getTime() - new Date(a.dateSort).getTime())

    // 保存配置
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), "utf-8")

    return NextResponse.json({
      success: true,
      message: "配置保存成功",
    })
  } catch (error: any) {
    console.error("Error saving blog config:", error)
    return NextResponse.json(
      { error: error.message || "保存失败" },
      { status: 500 }
    )
  }
}

async function processMediaFiles(config: BlogConfig) {
  if (!fs.existsSync(MEDIA_DIR)) {
    fs.mkdirSync(MEDIA_DIR, { recursive: true })
  }

  config.posts.forEach((post) => {
    // 处理封面图片
    if (post.image && post.image.startsWith("data:")) {
      const matches = post.image.match(/^data:image\/(\w+);base64,(.+)$/)
      if (matches) {
        const ext = matches[1]
        const base64Data = matches[2]
        const buffer = Buffer.from(base64Data, "base64")
        const filename = `blog_${post.id}_${Date.now()}.${ext}`
        fs.writeFileSync(path.join(MEDIA_DIR, filename), buffer)
        post.image = `/images/blog/media/${filename}`
      }
    }

    // 处理内容中的图片标记 [IMAGE:data:...]
    if (post.content) {
      const imageRegex = /\[IMAGE:(data:image\/[^)]+)\]/g
      let match
      while ((match = imageRegex.exec(post.content)) !== null) {
        const dataUrl = match[1]
        const imageMatches = dataUrl.match(/^data:image\/(\w+);base64,(.+)$/)
        if (imageMatches) {
          const ext = imageMatches[1]
          const base64Data = imageMatches[2]
          const buffer = Buffer.from(base64Data, "base64")
          const filename = `blog_${post.id}_content_${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`
          fs.writeFileSync(path.join(MEDIA_DIR, filename), buffer)
          post.content = post.content.replace(match[0], `[IMAGE:/images/blog/media/${filename}]`)
        }
      }
    }

    // 处理访谈内容中的图片
    if (post.interview) {
      post.interview.forEach((qa) => {
        if (qa.answer) {
          const imageRegex = /\[IMAGE:(data:image\/[^)]+)\]/g
          let match
          while ((match = imageRegex.exec(qa.answer)) !== null) {
            const dataUrl = match[1]
            const imageMatches = dataUrl.match(/^data:image\/(\w+);base64,(.+)$/)
            if (imageMatches) {
              const ext = imageMatches[1]
              const base64Data = imageMatches[2]
              const buffer = Buffer.from(base64Data, "base64")
              const filename = `blog_${post.id}_interview_${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`
              fs.writeFileSync(path.join(MEDIA_DIR, filename), buffer)
              qa.answer = qa.answer.replace(match[0], `[IMAGE:/images/blog/media/${filename}]`)
            }
          }
        }
      })
    }
  })
}

