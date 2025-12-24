"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Save, Plus, Trash2, Upload, Eye } from "lucide-react"
import { BrandConfig, ContentItem } from "@/types/brand-config"

export default function BrandConfigPage() {
  const params = useParams()
  const router = useRouter()
  const brand = params.brand as string

  const [config, setConfig] = useState<BrandConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<"news" | "announcements" | "supportInfo">("news")

  useEffect(() => {
    loadConfig()
  }, [brand])

  const loadConfig = async () => {
    try {
      const response = await fetch(`/api/admin/brands/${brand}/config`)
      if (response.ok) {
        const data = await response.json()
        setConfig(data.config || createDefaultConfig())
      } else {
        setConfig(createDefaultConfig())
      }
    } catch (error) {
      console.error("加载配置失败:", error)
      setConfig(createDefaultConfig())
    } finally {
      setLoading(false)
    }
  }

  const createDefaultConfig = (): BrandConfig => {
    return {
      brand,
      news: { items: [] },
      announcements: { items: [] },
      supportInfo: { items: [] },
      updatedAt: new Date().toISOString(),
    }
  }

  const handleSave = async () => {
    if (!config) return

    setSaving(true)
    try {
      const response = await fetch(`/api/admin/brands/${brand}/config`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          config: {
            ...config,
            updatedAt: new Date().toISOString(),
          },
        }),
      })

      if (response.ok) {
        alert("保存成功！")
        await loadConfig()
      } else {
        const error = await response.json()
        alert(`保存失败: ${error.message || "未知错误"}`)
      }
    } catch (error) {
      alert(`保存失败: ${error}`)
    } finally {
      setSaving(false)
    }
  }

  const addContentItem = () => {
    if (!config) return

    const newItem: ContentItem = {
      id: Date.now().toString(),
      type: "text",
      title: "",
      content: "",
      createdAt: new Date().toISOString(),
    }

    setConfig({
      ...config,
      [activeTab]: {
        items: [newItem, ...config[activeTab].items], // 最新的在最前面
      },
    })
  }

  const removeContentItem = (id: string) => {
    if (!config) return

    setConfig({
      ...config,
      [activeTab]: {
        items: config[activeTab].items.filter((item) => item.id !== id),
      },
    })
  }

  const updateContentItem = (id: string, updates: Partial<ContentItem>) => {
    if (!config) return

    setConfig({
      ...config,
      [activeTab]: {
        items: config[activeTab].items.map((item) =>
          item.id === id ? { ...item, ...updates, updatedAt: new Date().toISOString() } : item
        ),
      },
    })
  }

  const handleFileUpload = (itemId: string, file: File, type: "image" | "video") => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      if (type === "image") {
        updateContentItem(itemId, { image: result, type: "mixed" })
      } else {
        updateContentItem(itemId, { video: result, type: "mixed" })
      }
    }
    reader.readAsDataURL(file)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">加载中...</div>
      </div>
    )
  }

  if (!config) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600">加载配置失败</div>
      </div>
    )
  }

  const currentItems = config[activeTab].items

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/admin/products")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            返回
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{brand.toUpperCase()} 品牌配置</h1>
              <p className="mt-2 text-gray-600">管理品牌页面的内容</p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`/brands/${brand}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                <Eye className="w-5 h-5" />
                预览
              </a>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                {saving ? "保存中..." : (
                  <>
                    <Save className="w-5 h-5" />
                    保存
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <div className="flex">
              {[
                { id: "news", label: "新着順" },
                { id: "announcements", label: "お知らせ" },
                { id: "supportInfo", label: "サポート情報" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {activeTab === "news" && "新着順"}
                {activeTab === "announcements" && "お知らせ"}
                {activeTab === "supportInfo" && "サポート情報"}
              </h2>
              <button
                onClick={addContentItem}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                添加内容
              </button>
            </div>

            <div className="space-y-6">
              {currentItems.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p>还没有内容，点击"添加内容"开始添加</p>
                </div>
              ) : (
                currentItems.map((item, index) => (
                  <ContentItemEditor
                    key={item.id}
                    item={item}
                    index={index}
                    onUpdate={(updates) => updateContentItem(item.id, updates)}
                    onRemove={() => removeContentItem(item.id)}
                    onFileUpload={(file, type) => handleFileUpload(item.id, file, type)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 内容项编辑器组件
function ContentItemEditor({
  item,
  index,
  onUpdate,
  onRemove,
  onFileUpload,
}: {
  item: ContentItem
  index: number
  onUpdate: (updates: Partial<ContentItem>) => void
  onRemove: () => void
  onFileUpload: (file: File, type: "image" | "video") => void
}) {
  const [expanded, setExpanded] = useState(index === 0) // 默认展开第一个（最新的）

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-600">#{index + 1}</span>
          <span className="text-xs text-gray-500">
            {new Date(item.createdAt).toLocaleString("zh-CN")}
          </span>
          {item.updatedAt && (
            <span className="text-xs text-gray-400">
              (更新于: {new Date(item.updatedAt).toLocaleString("zh-CN")})
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            {expanded ? "收起" : "展开"}
          </button>
          <button
            onClick={onRemove}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="space-y-4">
          {/* 类型选择 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">内容类型</label>
            <select
              value={item.type}
              onChange={(e) => onUpdate({ type: e.target.value as ContentItem["type"] })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="text">纯文字</option>
              <option value="image">图片</option>
              <option value="video">视频</option>
              <option value="mixed">混合（文字+图片/视频）</option>
              <option value="link">纯链接</option>
            </select>
          </div>

          {/* 标题 */}
          {(item.type === "text" || item.type === "mixed" || item.type === "link") && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {item.type === "link" ? "链接文字" : "标题（可选）"}
              </label>
              <input
                type="text"
                value={item.type === "link" ? (item.linkText || "") : (item.title || "")}
                onChange={(e) => {
                  if (item.type === "link") {
                    onUpdate({ linkText: e.target.value })
                  } else {
                    onUpdate({ title: e.target.value })
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder={item.type === "link" ? "输入链接显示文字..." : "输入标题..."}
              />
            </div>
          )}

          {/* 文字内容 */}
          {(item.type === "text" || item.type === "mixed") && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">内容</label>
                <label className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg cursor-pointer hover:bg-blue-700 flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  插入图片
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (!file) return
                      const reader = new FileReader()
                      reader.onload = (event) => {
                        const result = event.target?.result as string
                        // 在内容末尾插入图片（HTML格式）
                        const imageHtml = `<img src="${result}" alt="Image" class="max-w-full h-auto rounded-lg my-4" />`
                        onUpdate({ content: (item.content || "") + "\n\n" + imageHtml + "\n\n" })
                      }
                      reader.readAsDataURL(file)
                    }}
                    className="hidden"
                  />
                </label>
              </div>
              <textarea
                value={item.content || ""}
                onChange={(e) => onUpdate({ content: e.target.value })}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="输入文章内容（支持HTML）..."
              />
            </div>
          )}

          {/* 图片上传 */}
          {(item.type === "image" || item.type === "mixed") && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">图片</label>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={item.image || ""}
                  onChange={(e) => onUpdate({ image: e.target.value })}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="/images/... 或上传图片"
                />
                <label className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700">
                  <Upload className="w-4 h-4 inline mr-2" />
                  上传
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) onFileUpload(file, "image")
                    }}
                    className="hidden"
                  />
                </label>
              </div>
              {item.image && (
                <div className="mt-2">
                  <img
                    src={item.image}
                    alt="预览"
                    className="max-w-xs max-h-32 object-contain border border-gray-200 rounded"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                    }}
                  />
                </div>
              )}
            </div>
          )}

          {/* 视频上传 */}
          {(item.type === "video" || item.type === "mixed") && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">视频</label>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={item.video || ""}
                  onChange={(e) => onUpdate({ video: e.target.value })}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="/videos/... 或 YouTube URL 或上传视频"
                />
                <label className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700">
                  <Upload className="w-4 h-4 inline mr-2" />
                  上传
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) onFileUpload(file, "video")
                    }}
                    className="hidden"
                  />
                </label>
              </div>
              {item.video && (
                <div className="mt-2">
                  {item.video.startsWith("http") || item.video.startsWith("/") ? (
                    <video
                      src={item.video}
                      className="max-w-xs max-h-32 border border-gray-200 rounded"
                      controls
                    />
                  ) : (
                    <video
                      src={item.video}
                      className="max-w-xs max-h-32 border border-gray-200 rounded"
                      controls
                    />
                  )}
                </div>
              )}
            </div>
          )}

          {/* 链接配置 */}
          {item.type === "link" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">链接URL</label>
              <input
                type="text"
                value={item.link || ""}
                onChange={(e) => onUpdate({ link: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="https://... 或 /brands/..."
              />
              {item.link && (
                <div className="mt-2">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    预览链接 →
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

