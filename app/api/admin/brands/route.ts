import { NextResponse } from "next/server"
import * as fs from "fs"
import * as path from "path"

export async function GET() {
  try {
    const brandsDir = path.join(process.cwd(), "app", "brands")
    if (!fs.existsSync(brandsDir)) {
      return NextResponse.json({ brands: [] })
    }

    const brands = fs
      .readdirSync(brandsDir)
      .filter((item) => {
        const itemPath = path.join(brandsDir, item)
        return fs.statSync(itemPath).isDirectory()
      })

    return NextResponse.json({ brands })
  } catch (error) {
    console.error("Error loading brands:", error)
    return NextResponse.json(
      { error: "Failed to load brands" },
      { status: 500 }
    )
  }
}

