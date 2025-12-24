#!/usr/bin/env node

/**
 * 产品页面生成工具
 * 用法: npx tsx scripts/generate-product-page.ts [--brand <brand>] [--slug <slug>] [--config <configPath>]
 */

import * as fs from "fs"
import * as path from "path"
import { ProductConfig } from "../types/product-config"

// 读取命令行参数
const args = process.argv.slice(2)
let brand: string | null = null
let slug: string | null = null
let configPath: string | null = null

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--brand" && args[i + 1]) {
    brand = args[i + 1]
    i++
  } else if (args[i] === "--slug" && args[i + 1]) {
    slug = args[i + 1]
    i++
  } else if (args[i] === "--config" && args[i + 1]) {
    configPath = args[i + 1]
    i++
  }
}

// 扫描品牌目录
function scanBrands(): string[] {
  const brandsDir = path.join(process.cwd(), "app", "brands")
  if (!fs.existsSync(brandsDir)) {
    return []
  }
  return fs
    .readdirSync(brandsDir)
    .filter((item) => {
      const itemPath = path.join(brandsDir, item)
      return fs.statSync(itemPath).isDirectory()
    })
}

// 扫描产品目录
function scanProducts(brand: string): string[] {
  const productsDir = path.join(process.cwd(), "app", "brands", brand, "products")
  if (!fs.existsSync(productsDir)) {
    return []
  }
  return fs
    .readdirSync(productsDir)
    .filter((item) => {
      const itemPath = path.join(productsDir, item)
      return fs.statSync(itemPath).isDirectory()
    })
}

// 交互式选择
function prompt(question: string): Promise<string> {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    readline.question(question, (answer: string) => {
      readline.close()
      resolve(answer.trim())
    })
  })
}

// 验证配置文件
function validateConfig(config: any): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!config.product) {
    errors.push("缺少 'product' 字段")
  } else {
    if (!config.product.name) errors.push("缺少 'product.name' 字段")
    if (!config.product.slug) errors.push("缺少 'product.slug' 字段")
    if (!config.product.brand) errors.push("缺少 'product.brand' 字段")
    if (!config.product.heroImage) errors.push("缺少 'product.heroImage' 字段")
  }

  if (!config.navigation || !Array.isArray(config.navigation)) {
    errors.push("缺少 'navigation' 数组")
  }

  if (!config.modules) {
    errors.push("缺少 'modules' 对象")
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

// 验证图片路径
function validateImagePath(imagePath: string, brand: string, slug: string): boolean {
  if (!imagePath.startsWith("/images/brands/")) {
    return false
  }
  const expectedPath = `/images/brands/${brand}/${slug}/`
  if (!imagePath.startsWith(expectedPath)) {
    return false
  }
  const publicPath = path.join(process.cwd(), "public", imagePath)
  return fs.existsSync(publicPath)
}

// 验证YouTube URL
function validateYouTubeUrl(url: string): boolean {
  return (
    url.includes("youtu.be/") ||
    url.includes("youtube.com/watch?v=") ||
    url.includes("youtube.com/embed/")
  )
}

// 创建目录
function ensureDirectoryExists(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

// 生成页面文件
function generatePage(brand: string, slug: string) {
  const pageDir = path.join(process.cwd(), "app", "brands", brand, "products", slug)
  ensureDirectoryExists(pageDir)

  const pageContent = `"use client"

import { ProductPage } from "@/components/product-page"
import productConfig from "./product.config.json"

export default function ProductPageRoute() {
  return <ProductPage config={productConfig} />
}
`

  const pagePath = path.join(pageDir, "page.tsx")
  fs.writeFileSync(pagePath, pageContent, "utf-8")
  console.log(`✓ 已生成页面文件: ${pagePath}`)
}

// 复制配置文件
function copyConfig(configPath: string, targetDir: string) {
  const targetPath = path.join(targetDir, "product.config.json")
  fs.copyFileSync(configPath, targetPath)
  console.log(`✓ 已复制配置文件: ${targetPath}`)
}

// 主函数
async function main() {
  console.log("🚀 产品页面生成工具\n")

  // 1. 选择品牌
  if (!brand) {
    const brands = scanBrands()
    if (brands.length === 0) {
      console.error("❌ 未找到任何品牌目录")
      process.exit(1)
    }
    console.log("可用品牌:")
    brands.forEach((b, i) => console.log(`  ${i + 1}. ${b}`))
    const brandIndex = await prompt("\n请选择品牌 (输入数字): ")
    brand = brands[parseInt(brandIndex) - 1]
    if (!brand) {
      console.error("❌ 无效的品牌选择")
      process.exit(1)
    }
  }

  // 2. 选择产品
  if (!slug) {
    const products = scanProducts(brand)
    console.log(`\n品牌 "${brand}" 的可用产品:`)
    if (products.length > 0) {
      products.forEach((p, i) => console.log(`  ${i + 1}. ${p}`))
      const productIndex = await prompt("\n请选择产品 (输入数字，或输入新名称创建): ")
      const index = parseInt(productIndex)
      if (!isNaN(index) && index > 0 && index <= products.length) {
        slug = products[index - 1]
      } else {
        slug = productIndex
      }
    } else {
      slug = await prompt("\n请输入新产品名称 (slug): ")
    }
  }

  // 3. 加载配置文件
  if (!configPath) {
    configPath = await prompt("\n请输入配置文件路径 (或按回车使用模板): ")
    if (!configPath) {
      const templatePath = path.join(process.cwd(), "templates", "product.config.json.example")
      if (fs.existsSync(templatePath)) {
        configPath = templatePath
        console.log(`使用模板: ${templatePath}`)
      } else {
        console.error("❌ 未找到配置文件模板")
        process.exit(1)
      }
    }
  }

  if (!fs.existsSync(configPath)) {
    console.error(`❌ 配置文件不存在: ${configPath}`)
    process.exit(1)
  }

  // 4. 读取和验证配置
  const configContent = fs.readFileSync(configPath, "utf-8")
  let config: ProductConfig
  try {
    config = JSON.parse(configContent)
  } catch (error) {
    console.error("❌ 配置文件JSON格式错误:", error)
    process.exit(1)
  }

  const validation = validateConfig(config)
  if (!validation.valid) {
    console.error("❌ 配置文件验证失败:")
    validation.errors.forEach((err) => console.error(`  - ${err}`))
    process.exit(1)
  }

  // 更新配置中的品牌和slug
  config.product.brand = brand
  config.product.slug = slug

  // 5. 验证图片路径
  const warnings: string[] = []
  function checkImagePath(imgPath: string) {
    if (imgPath && !validateImagePath(imgPath, brand!, slug!)) {
      warnings.push(`图片路径不存在: ${imgPath}`)
    }
  }

  if (config.product.heroImage) {
    checkImagePath(config.product.heroImage)
  }

  // 检查所有模块中的图片路径
  Object.values(config.modules).forEach((module) => {
    if (!module || !module.enabled) return

    // 这里可以添加更详细的图片路径检查
    // 由于模块结构复杂，这里只做基本检查
  })

  // 6. 创建目录
  const pageDir = path.join(process.cwd(), "app", "brands", brand, "products", slug)
  const imageDir = path.join(process.cwd(), "public", "images", "brands", brand, slug)
  ensureDirectoryExists(pageDir)
  ensureDirectoryExists(imageDir)
  console.log(`\n✓ 已创建目录: ${pageDir}`)
  console.log(`✓ 已创建目录: ${imageDir}`)

  // 7. 生成页面
  generatePage(brand, slug)

  // 8. 复制配置文件
  const targetConfigPath = path.join(pageDir, "product.config.json")
  fs.writeFileSync(targetConfigPath, JSON.stringify(config, null, 2), "utf-8")
  console.log(`✓ 已保存配置文件: ${targetConfigPath}`)

  // 9. 显示警告
  if (warnings.length > 0) {
    console.log("\n⚠️  警告:")
    warnings.forEach((w) => console.log(`  - ${w}`))
  }

  console.log("\n✅ 页面生成完成!")
  console.log(`\n页面路径: /brands/${brand}/products/${slug}`)
}

main().catch((error) => {
  console.error("❌ 发生错误:", error)
  process.exit(1)
})

