import { NextResponse } from "next/server"
import * as fs from "fs"
import * as path from "path"

interface BrandInfo {
  name: string
  productCount: number
  newSystemCount: number
  oldSystemCount: number
}

export async function GET() {
  try {
    const brands: BrandInfo[] = []

    const brandsDir = path.join(process.cwd(), "app", "brands")
    if (!fs.existsSync(brandsDir)) {
      return NextResponse.json({ brands: [] })
    }

    const brandDirs = fs.readdirSync(brandsDir).filter((item) => {
      const itemPath = path.join(brandsDir, item)
      return fs.statSync(itemPath).isDirectory()
    })

    // 从品牌页面读取产品列表的函数（复用products route的逻辑）
    const getProductsFromBrandPage = (brand: string): number => {
      const brandPagePath = path.join(brandsDir, brand, "page.tsx")
      if (!fs.existsSync(brandPagePath)) {
        return 0
      }

      try {
        const content = fs.readFileSync(brandPagePath, "utf-8")
        const productsMatch = content.match(/const\s+products[^=]*=\s*\[([\s\S]*?)\]/)
        if (!productsMatch) {
          return 0
        }

        const productsContent = productsMatch[1]
        const productPattern = /\{\s*id:\s*(["']?)([^"',\s}]+)\1[\s\S]*?name:\s*["']([^"']+)["']([\s\S]*?)\}/g
        let count = 0
        let match

        while ((match = productPattern.exec(productsContent)) !== null) {
          count++
        }

        // 也检查discontinuedProducts
        const discontinuedMatch = content.match(/const\s+discontinuedProducts[^=]*=\s*\[([\s\S]*?)\]/)
        if (discontinuedMatch) {
          const discontinuedContent = discontinuedMatch[1]
          while ((match = productPattern.exec(discontinuedContent)) !== null) {
            count++
          }
        }

        return count
      } catch (error) {
        console.error(`Error counting products from ${brandPagePath}:`, error)
        return 0
      }
    }

    for (const brandName of brandDirs) {
      const productsDir = path.join(brandsDir, brandName, "products")
      const hasProductsDir = fs.existsSync(productsDir)

      let productDirs: string[] = []
      let newSystemCount = 0
      let oldSystemCount = 0

      if (hasProductsDir) {
        productDirs = fs.readdirSync(productsDir).filter((item) => {
          const itemPath = path.join(productsDir, item)
          return fs.statSync(itemPath).isDirectory()
        })

        for (const slug of productDirs) {
          const pagePath = path.join(productsDir, slug, "page.tsx")
          const configPath = path.join(productsDir, slug, "product.config.json")

          if (fs.existsSync(pagePath)) {
            if (fs.existsSync(configPath)) {
              newSystemCount++
            } else {
              oldSystemCount++
            }
          }
        }
      }

      // 从品牌页面读取产品总数（包括未制作详情页的）
      const totalProductsFromPage = getProductsFromBrandPage(brandName)
      const totalProductCount = Math.max(productDirs.length, totalProductsFromPage)

      // 即使没有products文件夹，如果品牌页面有产品定义，也要显示
      if (totalProductCount > 0 || hasProductsDir) {
        brands.push({
          name: brandName,
          productCount: totalProductCount,
          newSystemCount,
          oldSystemCount,
        })
      }
    }

    // 按产品数量排序（产品多的在前）
    brands.sort((a, b) => b.productCount - a.productCount)

    return NextResponse.json({ brands })
  } catch (error) {
    console.error("Error loading brands with products:", error)
    return NextResponse.json(
      { error: "Failed to load brands" },
      { status: 500 }
    )
  }
}

