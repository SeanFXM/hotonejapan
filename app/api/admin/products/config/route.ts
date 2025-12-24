import { NextResponse } from "next/server"
import * as fs from "fs"
import * as path from "path"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const brand = searchParams.get("brand")
    const slug = searchParams.get("slug")

    if (!brand || !slug) {
      return NextResponse.json(
        { error: "品牌和产品标识不能为空" },
        { status: 400 }
      )
    }

    const configPath = path.join(
      process.cwd(),
      "app",
      "brands",
      brand,
      "products",
      slug,
      "product.config.json"
    )

    if (!fs.existsSync(configPath)) {
      return NextResponse.json(
        { error: "配置文件不存在" },
        { status: 404 }
      )
    }

    const configContent = fs.readFileSync(configPath, "utf-8")
    const config = JSON.parse(configContent)

    return NextResponse.json({ config })
  } catch (error) {
    console.error("Error loading config:", error)
    return NextResponse.json(
      { error: "Failed to load config" },
      { status: 500 }
    )
  }
}

