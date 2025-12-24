"use client"

import { useState, useEffect } from "react"
import { ProductConfig } from "@/types/product-config"
import { HeroSection } from "./product-sections/hero-section"
import { IntroSection } from "./product-sections/intro-section"
import { ConceptSection } from "./product-sections/concept-section"
import { LineupSection } from "./product-sections/lineup-section"
import { ComparisonSection } from "./product-sections/comparison-section"
import { DemoSection } from "./product-sections/demo-section"
import { SamplesSection } from "./product-sections/samples-section"
import { UsageSection } from "./product-sections/usage-section"
import { FunctionSection } from "./product-sections/function-section"
import { ControlsSection } from "./product-sections/controls-section"
import { BlockDiagramSection } from "./product-sections/block-diagram-section"
import { ConnectionsSection } from "./product-sections/connections-section"
import { OperationSection } from "./product-sections/operation-section"
import { SoftwareSection } from "./product-sections/software-section"
import { HandlesoftSection } from "./product-sections/handlesoft-section"
import { FAQSection } from "./product-sections/faq-section"
import { SpecsSection } from "./product-sections/specs-section"
import { Download } from "lucide-react"

interface ProductPageProps {
  config: ProductConfig
}

export function ProductPage({ config }: ProductPageProps) {
  const [activeSection, setActiveSection] = useState<string>("")
  const [headerHeight, setHeaderHeight] = useState(72)

  // 获取所有启用的导航项（不包括intro和manual）
  const enabledNavigationItems = config.navigation.filter(
    (item) => item.enabled && item.id !== "intro" && item.id !== "manual"
  )

  // 处理manual下载
  const handleManualDownload = () => {
    const manualModule = config.modules.manual
    if (manualModule?.enabled && manualModule.downloadUrl) {
      window.open(manualModule.downloadUrl, "_blank")
    }
  }

  // 滚动到指定section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = headerHeight + 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  // 监听滚动，更新活动section
  useEffect(() => {
    const handleScroll = () => {
      const sections = enabledNavigationItems.map((item) => item.id)
      const scrollPosition = window.scrollY + headerHeight + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section) {
          const sectionTop = section.offsetTop
          if (scrollPosition >= sectionTop) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [enabledNavigationItems, headerHeight])

  // 获取header高度
  useEffect(() => {
    const header = document.querySelector("header")
    if (header) {
      setHeaderHeight(header.offsetHeight)
    }
  }, [])

  // 构建Hero配置
  const heroConfig = {
    heroImage: config.product.heroImage,
    floatingInfo: config.product.floatingInfo,
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection config={heroConfig} brandName={config.product.brand.toUpperCase()} />

      {/* Navigation Bar */}
      <nav
        className="sticky bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-md z-40"
        style={{ top: `${headerHeight}px` }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-8 overflow-x-auto py-4">
            {config.navigation.map((item) => {
              // manual只显示下载按钮
              if (item.id === "manual" && item.isDownload) {
                return (
                  <button
                    key={item.id}
                    onClick={handleManualDownload}
                    className="flex-shrink-0 px-4 py-2 text-sm font-medium transition-colors text-gray-600 hover:text-gray-900 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    {item.label}
                  </button>
                )
              }

              // 其他导航项
              if (item.enabled && item.id !== "intro") {
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex-shrink-0 px-4 py-2 text-sm font-medium transition-colors ${
                      activeSection === item.id
                        ? "text-purple-600 border-b-2 border-purple-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {item.label}
                  </button>
                )
              }

              return null
            })}
          </div>
        </div>
      </nav>

      {/* Intro Section (在导航栏之后，无导航栏项) */}
      {config.intro && <IntroSection config={config.intro} />}

      {/* Modules - 只渲染启用的模块 */}
      {config.modules.concept?.enabled && <ConceptSection config={config.modules.concept} />}
      {config.modules.lineup?.enabled && <LineupSection config={config.modules.lineup} />}
      {config.modules.comparison?.enabled && <ComparisonSection config={config.modules.comparison} />}
      {config.modules.demo?.enabled && <DemoSection config={config.modules.demo} />}
      {config.modules.samples?.enabled && <SamplesSection config={config.modules.samples} />}
      {config.modules.usage?.enabled && <UsageSection config={config.modules.usage} />}
      {config.modules.function?.enabled && <FunctionSection config={config.modules.function} />}
      {config.modules.controls?.enabled && <ControlsSection config={config.modules.controls} />}
      {config.modules["block-diagram"]?.enabled && (
        <BlockDiagramSection config={config.modules["block-diagram"]} />
      )}
      {config.modules.connections?.enabled && <ConnectionsSection config={config.modules.connections} />}
      {config.modules.operation?.enabled && <OperationSection config={config.modules.operation} />}
      {config.modules.software?.enabled && <SoftwareSection config={config.modules.software} />}
      {config.modules.handlesoft?.enabled && <HandlesoftSection config={config.modules.handlesoft} />}
      {config.modules.faq?.enabled && <FAQSection config={config.modules.faq} />}
      {/* manual不渲染section内容 */}
      {config.modules.specs?.enabled && <SpecsSection config={config.modules.specs} />}
    </div>
  )
}

