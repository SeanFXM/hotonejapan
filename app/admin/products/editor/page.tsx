"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Save, Eye } from "lucide-react"
import { ProductConfig, NavigationItem } from "@/types/product-config"
import { Sidebar } from "@/components/admin/product-editor/sidebar"
import { ProductInfoEditor } from "@/components/admin/product-editor/module-editors/product-info-editor"
import { IntroEditor } from "@/components/admin/product-editor/module-editors/intro-editor"
import { ConceptEditor } from "@/components/admin/product-editor/module-editors/concept-editor"
import { DemoEditor } from "@/components/admin/product-editor/module-editors/demo-editor"
import { FAQEditor } from "@/components/admin/product-editor/module-editors/faq-editor"
import { FunctionEditor } from "@/components/admin/product-editor/module-editors/function-editor"

const moduleDefinitions = [
  { id: "product-info", label: "产品信息", hasConfig: true },
  { id: "intro", label: "イントロ", hasConfig: true },
  { id: "concept", label: "コンセプト", hasConfig: true },
  { id: "lineup", label: "ラインナップ", hasConfig: true },
  { id: "comparison", label: "比較表", hasConfig: true },
  { id: "demo", label: "デモムービー", hasConfig: true },
  { id: "samples", label: "デモサウンド", hasConfig: true },
  { id: "usage", label: "使用例", hasConfig: true },
  { id: "function", label: "主な機能", hasConfig: true },
  { id: "controls", label: "コントロール", hasConfig: true },
  { id: "block-diagram", label: "ブロック図", hasConfig: true },
  { id: "connections", label: "一般的な接続例", hasConfig: true },
  { id: "operation", label: "オペレーション", hasConfig: true },
  { id: "software", label: "ソフトウェア", hasConfig: true },
  { id: "handlesoft", label: "バンドルソフト", hasConfig: true },
  { id: "faq", label: "よくある質問", hasConfig: true },
  { id: "manual", label: "取扱説明書", hasConfig: true },
  { id: "specs", label: "製品仕様", hasConfig: true },
]

export default function ProductEditorPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const brand = searchParams.get("brand")
  const slug = searchParams.get("slug")

  const [config, setConfig] = useState<Partial<ProductConfig>>({
    product: {
      name: "",
      slug: "",
      brand: "",
      heroImage: "",
      floatingInfo: {
        enabled: true,
        productName: "",
        category: "",
        price: "",
        referencePrice: "",
        jan: "",
      },
    },
    navigation: [],
    modules: {},
  })

  const [activeModule, setActiveModule] = useState<string | null>("product-info")
  const [enabledModules, setEnabledModules] = useState<Set<string>>(new Set(["product-info"]))
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [brands, setBrands] = useState<string[]>([])

  // 加载品牌列表
  useEffect(() => {
    const loadBrands = async () => {
      try {
        const response = await fetch("/api/admin/brands")
        if (response.ok) {
          const data = await response.json()
          setBrands(data.brands || [])
        }
      } catch (error) {
        console.error("加载品牌失败:", error)
      }
    }
    loadBrands()
  }, [])

  // 确定返回路径
  const getBackPath = () => {
    if (brand) {
      return `/admin/products/brand/${brand}`
    }
    return "/admin/products"
  }

  // 加载配置（编辑模式）
  useEffect(() => {
    if (brand && slug) {
      loadConfig()
    } else {
      // 新建模式，从URL参数填充
      const brandParam = searchParams.get("brand")
      const slugParam = searchParams.get("slug")
      const nameParam = searchParams.get("name")

      if (brandParam) {
        setConfig((prev) => ({
          ...prev,
          product: {
            ...prev.product!,
            brand: brandParam,
            heroImage: `/images/brands/${brandParam}/products/${slugParam || "product-slug"}/hero.jpg`,
          },
        }))
      }
      if (slugParam) {
        setConfig((prev) => ({
          ...prev,
          product: {
            ...prev.product!,
            slug: slugParam,
          },
        }))
      }
      if (nameParam) {
        setConfig((prev) => ({
          ...prev,
          product: {
            ...prev.product!,
            name: decodeURIComponent(nameParam),
          },
        }))
      }
    }
  }, [brand, slug, searchParams])

  const loadConfig = async () => {
    if (!brand || !slug) return

    setLoading(true)
    try {
      const response = await fetch(`/api/admin/products/config?brand=${brand}&slug=${slug}`)
      if (response.ok) {
        const data = await response.json()
        setConfig(data.config)

        // 根据配置更新启用的模块
        const enabled = new Set<string>(["product-info"])
        if (data.config.intro?.enabled) enabled.add("intro")
        Object.keys(data.config.modules || {}).forEach((key) => {
          if (data.config.modules[key]?.enabled) {
            enabled.add(key)
          }
        })
        setEnabledModules(enabled)
      }
    } catch (error) {
      console.error("加载配置失败:", error)
    } finally {
      setLoading(false)
    }
  }

  // 模块切换
  const handleModuleToggle = (moduleId: string) => {
    if (moduleId === "product-info") return // 产品信息不能禁用

    setEnabledModules((prev) => {
      const next = new Set(prev)
      if (next.has(moduleId)) {
        next.delete(moduleId)
        // 更新模块配置
        if (moduleId === "intro") {
          setConfig((prev) => ({
            ...prev,
            intro: prev.intro ? { ...prev.intro, enabled: false } : undefined,
          }))
        } else {
          setConfig((prev) => ({
            ...prev,
            modules: {
              ...prev.modules,
              [moduleId]: prev.modules?.[moduleId as keyof typeof prev.modules]
                ? { ...prev.modules[moduleId as keyof typeof prev.modules]!, enabled: false }
                : undefined,
            },
          }))
        }
      } else {
        next.add(moduleId)
        // 初始化模块配置
        if (moduleId === "intro") {
          setConfig((prev) => ({
            ...prev,
            intro: prev.intro || { enabled: true },
          }))
        } else {
          const moduleMap: Record<string, any> = {
            concept: { enabled: true, sections: [] },
            demo: { enabled: true, videos: [] },
            faq: { enabled: true, items: [] },
            function: { enabled: true, items: [] },
            samples: { enabled: true, samples: [] },
            usage: { enabled: true, examples: [] },
            controls: { enabled: true, images: [] },
            "block-diagram": { enabled: true, image: "" },
            connections: { enabled: true, examples: [] },
            operation: { enabled: true, items: [] },
            software: { enabled: true, items: [] },
            handlesoft: { enabled: true },
            manual: { enabled: true },
            specs: { enabled: true, leftColumn: [], rightColumn: [] },
            lineup: { enabled: true, products: [] },
            comparison: { enabled: true, image: "" },
          }
          setConfig((prev) => ({
            ...prev,
            modules: {
              ...prev.modules,
              [moduleId]: moduleMap[moduleId] || { enabled: true },
            },
          }))
        }
      }
      return next
    })
  }

  const handleModuleSelect = (moduleId: string) => {
    setActiveModule(moduleId)
  }

  // 保存配置
  const handleSave = async () => {
    // 确保product.brand和product.slug已设置
    const finalBrand = config.product?.brand || brand || ""
    const finalSlug = config.product?.slug || slug || ""

    if (!finalBrand || !finalSlug) {
      alert("请先填写产品品牌和标识（Slug）")
      return
    }

    // 根据启用的模块生成navigation数组
    const navigation: NavigationItem[] = []
    moduleDefinitions.forEach((module) => {
      if (module.id === "product-info") return // 产品信息不在导航中
      if (enabledModules.has(module.id)) {
        navigation.push({
          id: module.id,
          label: module.label,
          enabled: true,
          isDownload: module.id === "manual",
        })
      }
    })

    // 确保config结构完整，包括intro模块
    const configToSave: ProductConfig = {
      ...config,
      product: {
        ...config.product!,
        brand: finalBrand,
        slug: finalSlug,
      },
      intro: enabledModules.has("intro") ? (config.intro || { enabled: true }) : undefined,
      navigation,
      modules: config.modules || {},
    } as ProductConfig

    setSaving(true)
    try {
      const response = await fetch("/api/admin/products/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          config: configToSave,
        }),
      })

      if (response.ok) {
        alert("配置保存成功！")
        // 保存成功后，重新加载配置以确保同步
        if (finalBrand && finalSlug) {
          // 如果当前已经在编辑这个产品，直接重新加载配置
          if (brand === finalBrand && slug === finalSlug) {
            // 重新加载配置
            const reloadResponse = await fetch(`/api/admin/products/config?brand=${finalBrand}&slug=${finalSlug}`)
            if (reloadResponse.ok) {
              const reloadData = await reloadResponse.json()
              setConfig(reloadData.config)
              
              // 根据配置更新启用的模块
              const enabled = new Set<string>(["product-info"])
              if (reloadData.config.intro?.enabled) enabled.add("intro")
              Object.keys(reloadData.config.modules || {}).forEach((key) => {
                if (reloadData.config.modules[key]?.enabled) {
                  enabled.add(key)
                }
              })
              setEnabledModules(enabled)
            }
          } else {
            // 否则跳转到新的URL
            router.push(`/admin/products/editor?brand=${finalBrand}&slug=${finalSlug}`)
          }
        } else {
          router.push(getBackPath())
        }
      } else {
        const error = await response.json()
        alert(`保存失败: ${error.message || error.error || "未知错误"}`)
      }
    } catch (error: any) {
      console.error("保存错误:", error)
      alert(`保存失败: ${error.message || error}`)
    } finally {
      setSaving(false)
    }
  }

  // 预览
  const handlePreview = () => {
    // 确保config结构完整，与保存时一致
    const finalBrand = config.product?.brand || brand || ""
    const finalSlug = config.product?.slug || slug || ""
    
    // 根据启用的模块生成navigation数组
    const navigation: NavigationItem[] = []
    moduleDefinitions.forEach((module) => {
      if (module.id === "product-info") return // 产品信息不在导航中
      if (enabledModules.has(module.id)) {
        navigation.push({
          id: module.id,
          label: module.label,
          enabled: true,
          isDownload: module.id === "manual",
        })
      }
    })

    // 确保product对象存在
    if (!config.product) {
      alert("请先填写产品信息")
      return
    }

    const previewConfig: ProductConfig = {
      product: {
        name: config.product.name || "",
        slug: finalSlug || config.product.slug || "",
        brand: finalBrand || config.product.brand || "",
        heroImage: config.product.heroImage || "",
        floatingInfo: config.product.floatingInfo || {
          enabled: false,
          productName: "",
          category: "",
          price: "",
          referencePrice: "",
          jan: "",
        },
      },
      intro: enabledModules.has("intro") ? (config.intro || { enabled: true }) : undefined,
      navigation,
      modules: config.modules || {},
    } as ProductConfig

    try {
      const jsonString = JSON.stringify(previewConfig)
      // 检查数据大小，如果太大可能需要使用其他方式传递
      if (jsonString.length > 200000) {
        console.warn("预览数据较大，可能导致URL过长")
      }
      const previewUrl = `/admin/products/preview?data=${encodeURIComponent(jsonString)}`
      window.open(previewUrl, "_blank")
    } catch (error) {
      console.error("生成预览URL失败:", error)
      alert(`生成预览失败: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">加载中...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push(getBackPath())}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              返回
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {brand && slug ? "编辑产品配置" : "创建新产品页面"}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {config.product?.brand && config.product?.slug
                  ? `${config.product.brand} / ${config.product.slug}`
                  : "填写产品信息以生成页面"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePreview}
              className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
            >
              <Eye className="w-4 h-4" />
              预览
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? "保存中..." : "保存"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          modules={moduleDefinitions}
          enabledModules={enabledModules}
          activeModule={activeModule}
          onModuleToggle={handleModuleToggle}
          onModuleSelect={handleModuleSelect}
        />

        {/* Editor Area */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="max-w-4xl mx-auto p-6">
            {activeModule === "product-info" && config.product && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">产品信息</h2>
                <ProductInfoEditor
                  product={config.product}
                  onChange={(product) =>
                    setConfig((prev) => ({
                      ...prev,
                      product,
                    }))
                  }
                  brands={brands}
                />
              </div>
            )}

            {activeModule === "intro" && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">イントロ模块</h2>
                <IntroEditor
                  intro={config.intro || { enabled: false }}
                  onChange={(intro) =>
                    setConfig((prev) => ({
                      ...prev,
                      intro,
                    }))
                  }
                />
              </div>
            )}

            {activeModule === "concept" && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">コンセプト模块</h2>
                <ConceptEditor
                  concept={config.modules?.concept || { enabled: false, sections: [] }}
                  onChange={(concept) =>
                    setConfig((prev) => ({
                      ...prev,
                      modules: {
                        ...prev.modules,
                        concept,
                      },
                    }))
                  }
                />
              </div>
            )}

            {activeModule === "demo" && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">デモムービー模块</h2>
                <DemoEditor
                  demo={config.modules?.demo || { enabled: false, videos: [] }}
                  onChange={(demo) =>
                    setConfig((prev) => ({
                      ...prev,
                      modules: {
                        ...prev.modules,
                        demo,
                      },
                    }))
                  }
                />
              </div>
            )}

            {activeModule === "faq" && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">よくある質問模块</h2>
                <FAQEditor
                  faq={config.modules?.faq || { enabled: false, items: [] }}
                  onChange={(faq) =>
                    setConfig((prev) => ({
                      ...prev,
                      modules: {
                        ...prev.modules,
                        faq,
                      },
                    }))
                  }
                />
              </div>
            )}

            {activeModule === "function" && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">主な機能模块</h2>
                <FunctionEditor
                  function={config.modules?.function || { enabled: false, items: [] }}
                  onChange={(func) =>
                    setConfig((prev) => ({
                      ...prev,
                      modules: {
                        ...prev.modules,
                        function: func,
                      },
                    }))
                  }
                />
              </div>
            )}

            {!activeModule && (
              <div className="bg-white rounded-lg shadow p-6 text-center py-12">
                <p className="text-gray-600">请从左侧选择一个模块开始编辑</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

