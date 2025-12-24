import { NextResponse } from "next/server"
import * as fs from "fs"
import * as path from "path"

interface Product {
  brand: string
  slug: string
  name: string
  configPath?: string
  hasConfig: boolean
  hasPage: boolean
  pagePath: string
  link?: string
  description?: string
  category?: string
  modifiedTime?: number // 文件修改时间（毫秒时间戳）
}

// 从品牌页面读取产品列表
function getProductsFromBrandPage(brand: string): Array<{
  id: string
  name: string
  link?: string
  description?: string
  category?: string
}> {
  const brandPagePath = path.join(process.cwd(), "app", "brands", brand, "page.tsx")
  if (!fs.existsSync(brandPagePath)) {
    return []
  }

  try {
    const content = fs.readFileSync(brandPagePath, "utf-8")
    const products: Array<{
      id: string
      name: string
      link?: string
      description?: string
      category?: string
    }> = []

    // 匹配 products 数组定义（支持 const products = [...] 或 const products: Product[] = [...]）
    const productsMatch = content.match(/const\s+products[^=]*=\s*\[([\s\S]*?)\]/)
    if (!productsMatch) {
      return []
    }

    const productsContent = productsMatch[1]

    // 使用正则表达式提取产品对象
    // 支持两种格式：id: "string" 或 id: number
    // 匹配 { id: "..." 或 id: 123, name: "...", ... } 格式
    const productPattern = /\{\s*id:\s*(["']?)([^"',\s}]+)\1[\s\S]*?name:\s*["']([^"']+)["']([\s\S]*?)\}/g
    let match

    while ((match = productPattern.exec(productsContent)) !== null) {
      const productContent = match[0]
      const id = match[2] // 可能是字符串或数字
      const name = match[3]

      // 提取其他字段
      const linkMatch = productContent.match(/link:\s*["']([^"']+)["']/)
      const descMatch = productContent.match(/description:\s*["']([^"']+)["']/)
      const catMatch = productContent.match(/category:\s*["']([^"']+)["']/)

      products.push({
        id: String(id), // 统一转换为字符串
        name,
        link: linkMatch ? linkMatch[1] : undefined,
        description: descMatch ? descMatch[1] : undefined,
        category: catMatch ? catMatch[1] : undefined,
      })
    }

    // 也检查 discontinuedProducts
    const discontinuedMatch = content.match(/const\s+discontinuedProducts[^=]*=\s*\[([\s\S]*?)\]/)
    if (discontinuedMatch) {
      const discontinuedContent = discontinuedMatch[1]
      while ((match = productPattern.exec(discontinuedContent)) !== null) {
        const productContent = match[0]
        const id = match[1]
        const name = match[2]

        const linkMatch = productContent.match(/link:\s*["']([^"']+)["']/)
        const descMatch = productContent.match(/description:\s*["']([^"']+)["']/)
        const catMatch = productContent.match(/category:\s*["']([^"']+)["']/)

        products.push({
          id,
          name,
          link: linkMatch ? linkMatch[1] : undefined,
          description: descMatch ? descMatch[1] : undefined,
          category: catMatch ? catMatch[1] : undefined,
        })
      }
    }

    return products
  } catch (error) {
    console.error(`Error parsing products from ${brandPagePath}:`, error)
    return []
  }
}

// 从page.tsx文件中提取产品名称
function extractProductName(pagePath: string, slug: string): string {
  try {
    const content = fs.readFileSync(pagePath, "utf-8")

    // 方法1: 从"製品名："后面提取（最准确）
    const productNameMatch = content.match(/製品名[^<]*<[^>]*>([^<]+)<\/p>/i)
    if (productNameMatch) {
      const name = productNameMatch[1].trim()
      if (name && name.length < 50) {
        return name
      }
    }

    // 方法2: 从alt属性提取（Image alt="产品名"）
    const altMatch = content.match(/alt=["']([^"']+)["']/i)
    if (altMatch) {
      const alt = altMatch[1].trim()
      // 排除常见的通用alt文本
      if (alt && !alt.includes("placeholder") && !alt.includes("image") && alt.length < 50) {
        return alt
      }
    }

    // 方法3: 从函数名提取（如 Id24Page -> iD24）
    const functionMatch = content.match(/export\s+default\s+function\s+(\w+)Page/)
    if (functionMatch) {
      const funcName = functionMatch[1]
      // 特殊处理：Id24 -> iD24, Id44 -> iD44
      if (funcName.startsWith("Id")) {
        return "i" + funcName.substring(1)
      }
      // 其他情况保持原样
      return funcName
    }

    // 方法4: 使用slug映射表（针对已知产品）
    const slugMap: Record<string, string> = {
      "id24": "iD24",
      "id44mk2": "iD44mk II",
      "id48": "iD48",
      "evosp8": "evo SP8",
      "evo16": "evo 16",
      "oria": "ORIA",
      "oria-mini": "ORIA Mini",
      "ampero-ii": "Ampero II",
      "ampero-ii-press": "Ampero II Press",
      "ampero-ii-stage": "Ampero II Stage",
      "ampero-ii-stomp": "Ampero II Stomp",
      "temple": "Temple",
      "verbera": "Verbera",
    }

    if (slugMap[slug]) {
      return slugMap[slug]
    }

    // 方法5: 从slug生成（首字母大写）
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  } catch (error) {
    console.error(`Error extracting name from ${pagePath}:`, error)
    return slug
  }
}

// 从link中提取slug
function extractSlugFromLink(link: string): string {
  const match = link.match(/\/products\/([^\/]+)/)
  return match ? match[1] : ""
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const brandFilter = searchParams.get("brand")

    const allProducts: Product[] = []

    const brandsDir = path.join(process.cwd(), "app", "brands")
    if (!fs.existsSync(brandsDir)) {
      return NextResponse.json({ products: [] })
    }

    const brands = fs.readdirSync(brandsDir).filter((item) => {
      const itemPath = path.join(brandsDir, item)
      return fs.statSync(itemPath).isDirectory()
    })

    for (const brand of brands) {
      // 如果指定了品牌过滤，只处理该品牌
      if (brandFilter && brand !== brandFilter) continue

      // 从品牌页面读取所有产品
      const brandProducts = getProductsFromBrandPage(brand)

      // 检查每个产品是否有详情页面
      for (const brandProduct of brandProducts) {
        let slug = brandProduct.id

        // 如果有link，从link中提取slug
        if (brandProduct.link) {
          const extractedSlug = extractSlugFromLink(brandProduct.link)
          if (extractedSlug) {
            slug = extractedSlug
          }
        }

        const pagePath = path.join(process.cwd(), "app", "brands", brand, "products", slug, "page.tsx")
        const configPath = path.join(process.cwd(), "app", "brands", brand, "products", slug, "product.config.json")

        const hasPage = fs.existsSync(pagePath)
        const hasConfig = fs.existsSync(configPath)

        let name = brandProduct.name
        if (hasPage) {
          // 如果有页面，尝试从页面中提取更准确的产品名
          const extractedName = extractProductName(pagePath, slug)
          if (extractedName && extractedName !== slug) {
            name = extractedName
          }
        }

        // 获取修改时间：优先使用配置文件时间，否则使用页面文件时间
        let modifiedTime = 0
        if (hasConfig && fs.existsSync(configPath)) {
          modifiedTime = fs.statSync(configPath).mtimeMs
        } else if (hasPage && fs.existsSync(pagePath)) {
          modifiedTime = fs.statSync(pagePath).mtimeMs
        }

        allProducts.push({
          brand,
          slug,
          name,
          configPath: hasConfig ? `/brands/${brand}/products/${slug}/product.config.json` : undefined,
          hasConfig,
          hasPage,
          pagePath: `/brands/${brand}/products/${slug}`,
          link: brandProduct.link,
          description: brandProduct.description,
          category: brandProduct.category,
          modifiedTime,
        })
      }

      // 也检查文件系统中存在的产品页面（可能品牌页面中没有列出）
      const productsDir = path.join(brandsDir, brand, "products")
      if (fs.existsSync(productsDir)) {
        const productDirs = fs.readdirSync(productsDir).filter((item) => {
          const itemPath = path.join(productsDir, item)
          return fs.statSync(itemPath).isDirectory()
        })

        for (const slug of productDirs) {
          // 检查是否已经在列表中
          const exists = allProducts.some((p) => p.brand === brand && p.slug === slug)
          if (exists) continue

          const pagePath = path.join(productsDir, slug, "page.tsx")
          const configPath = path.join(productsDir, slug, "product.config.json")

          if (fs.existsSync(pagePath)) {
            const hasConfig = fs.existsSync(configPath)
            const name = extractProductName(pagePath, slug)

            // 获取修改时间：优先使用配置文件时间，否则使用页面文件时间
            let modifiedTime = 0
            if (hasConfig && fs.existsSync(configPath)) {
              modifiedTime = fs.statSync(configPath).mtimeMs
            } else if (fs.existsSync(pagePath)) {
              modifiedTime = fs.statSync(pagePath).mtimeMs
            }

            allProducts.push({
              brand,
              slug,
              name,
              configPath: hasConfig ? `/brands/${brand}/products/${slug}/product.config.json` : undefined,
              hasConfig,
              hasPage: true,
              pagePath: `/brands/${brand}/products/${slug}`,
              modifiedTime,
            })
          }
        }
      }
    }

    // 按修改时间从新到旧排序（最新的在前）
    // 如果指定了品牌过滤，只按时间排序；否则先按品牌分组，再按时间排序
    allProducts.sort((a, b) => {
      if (brandFilter) {
        // 只过滤一个品牌时，按时间排序
        const timeA = a.modifiedTime || 0
        const timeB = b.modifiedTime || 0
        return timeB - timeA // 降序：新的在前
      } else {
        // 多个品牌时，先按品牌，再按时间
        if (a.brand !== b.brand) {
          return a.brand.localeCompare(b.brand)
        }
        const timeA = a.modifiedTime || 0
        const timeB = b.modifiedTime || 0
        return timeB - timeA // 降序：新的在前
      }
    })

    return NextResponse.json({ products: allProducts })
  } catch (error) {
    console.error("Error loading products:", error)
    return NextResponse.json(
      { error: "Failed to load products" },
      { status: 500 }
    )
  }
}
