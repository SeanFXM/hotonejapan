#!/usr/bin/env node

/**
 * 配置文件验证工具
 * 用法: npx tsx scripts/validate-config.ts <configPath>
 */

import * as fs from "fs"
import * as path from "path"
import { ProductConfig } from "../types/product-config"

function validateConfig(configPath: string): { valid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = []
  const warnings: string[] = []

  // 1. 检查文件是否存在
  if (!fs.existsSync(configPath)) {
    errors.push(`配置文件不存在: ${configPath}`)
    return { valid: false, errors, warnings }
  }

  // 2. 读取和解析JSON
  let config: ProductConfig
  try {
    const content = fs.readFileSync(configPath, "utf-8")
    config = JSON.parse(content)
  } catch (error) {
    errors.push(`JSON解析错误: ${error}`)
    return { valid: false, errors, warnings }
  }

  // 3. 验证必需字段
  if (!config.product) {
    errors.push("缺少 'product' 字段")
  } else {
    if (!config.product.name) errors.push("缺少 'product.name' 字段")
    if (!config.product.slug) errors.push("缺少 'product.slug' 字段")
    if (!config.product.brand) errors.push("缺少 'product.brand' 字段")
    if (!config.product.heroImage) errors.push("缺少 'product.heroImage' 字段")
    if (!config.product.floatingInfo) {
      errors.push("缺少 'product.floatingInfo' 字段")
    } else {
      if (!config.product.floatingInfo.productName) {
        errors.push("缺少 'product.floatingInfo.productName' 字段")
      }
    }
  }

  if (!config.navigation || !Array.isArray(config.navigation)) {
    errors.push("缺少 'navigation' 数组")
  } else if (config.navigation.length === 0) {
    errors.push("'navigation' 数组不能为空")
  }

  if (!config.modules) {
    errors.push("缺少 'modules' 对象")
  }

  // 4. 验证图片路径
  function validateImagePath(imgPath: string, brand: string, slug: string): boolean {
    if (!imgPath.startsWith("/images/brands/")) {
      return false
    }
    const expectedPath = `/images/brands/${brand}/${slug}/`
    if (!imgPath.startsWith(expectedPath)) {
      // handlesoft使用固定路径
      if (imgPath.includes("/Oria/handlesoft_")) {
        return true
      }
      return false
    }
    const publicPath = path.join(process.cwd(), "public", imgPath)
    return fs.existsSync(publicPath)
  }

  // 5. 验证视频URL
  function validateYouTubeUrl(url: string): boolean {
    return (
      url.includes("youtu.be/") ||
      url.includes("youtube.com/watch?v=") ||
      url.includes("youtube.com/embed/")
    )
  }

  // 6. 验证导航项
  if (config.navigation) {
    config.navigation.forEach((item, index) => {
      if (!item.id) {
        errors.push(`navigation[${index}]: 缺少 'id' 字段`)
      }
      if (!item.label) {
        errors.push(`navigation[${index}]: 缺少 'label' 字段`)
      }
      if (item.enabled && config.modules) {
        const moduleKey = item.id === "block-diagram" ? "block-diagram" : item.id
        if (!config.modules[moduleKey as keyof typeof config.modules]) {
          warnings.push(`navigation[${index}]: 启用的模块 '${item.id}' 在 modules 中不存在`)
        }
      }
    })
  }

  // 7. 验证模块配置
  if (config.modules && config.product) {
    Object.entries(config.modules).forEach(([key, module]) => {
      if (!module) return

      if (module.enabled) {
        // 验证concept模块
        if (key === "concept" && "sections" in module) {
          module.sections.forEach((section: any, idx: number) => {
            if (section.media) {
              if (section.media.type === "image") {
                if (!validateImagePath(section.media.src, config.product.brand, config.product.slug)) {
                  warnings.push(`modules.concept.sections[${idx}]: 图片路径不存在`)
                }
              } else if (section.media.type === "video") {
                if (!validateYouTubeUrl(section.media.src)) {
                  warnings.push(`modules.concept.sections[${idx}]: 无效的YouTube URL`)
                }
              }
            }
          })
        }

        // 验证demo模块
        if (key === "demo" && "videos" in module) {
          module.videos.forEach((video: string, idx: number) => {
            if (!validateYouTubeUrl(video)) {
              warnings.push(`modules.demo.videos[${idx}]: 无效的YouTube URL`)
            }
          })
        }

        // 验证software模块
        if (key === "software" && "headerImage" in module && module.headerImage) {
          if (!validateImagePath(module.headerImage, config.product.brand, config.product.slug)) {
            warnings.push(`modules.software.headerImage: 图片路径不存在`)
          }
        }
      }
    })
  }

  // 8. 验证品牌和型号目录
  if (config.product.brand && config.product.slug) {
    const brandDir = path.join(process.cwd(), "app", "brands", config.product.brand)
    if (!fs.existsSync(brandDir)) {
      warnings.push(`品牌目录不存在: ${brandDir}`)
    }

    const productDir = path.join(brandDir, "products", config.product.slug)
    if (!fs.existsSync(productDir)) {
      warnings.push(`产品目录不存在: ${productDir} (将在生成时创建)`)
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  }
}

// 主函数
function main() {
  const configPath = process.argv[2]

  if (!configPath) {
    console.error("❌ 请提供配置文件路径")
    console.log("用法: npx tsx scripts/validate-config.ts <configPath>")
    process.exit(1)
  }

  console.log(`🔍 验证配置文件: ${configPath}\n`)

  const result = validateConfig(configPath)

  if (result.errors.length > 0) {
    console.error("❌ 验证失败，发现以下错误:")
    result.errors.forEach((err) => console.error(`  - ${err}`))
  }

  if (result.warnings.length > 0) {
    console.log("\n⚠️  警告:")
    result.warnings.forEach((warn) => console.log(`  - ${warn}`))
  }

  if (result.valid) {
    console.log("\n✅ 配置文件验证通过!")
    process.exit(0)
  } else {
    console.log("\n❌ 配置文件验证失败")
    process.exit(1)
  }
}

main()

