"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Plus, Trash2, Upload, Eye, Edit } from "lucide-react"
import { BlogConfig, BlogPostConfig } from "@/types/blog-config"
import { ContentEditor } from "@/components/content-editor"

export default function BlogConfigPage() {
  const router = useRouter()
  const [config, setConfig] = useState<BlogConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPostConfig | null>(null)

  useEffect(() => {
    loadConfig()
  }, [])

  const loadConfig = async () => {
    try {
      const response = await fetch("/api/admin/blog/config")
      if (response.ok) {
        const data = await response.json()
        setConfig(data.config || { posts: [], updatedAt: new Date().toISOString() })
      } else {
        setConfig({ posts: [], updatedAt: new Date().toISOString() })
      }
    } catch (error) {
      console.error("加载配置失败:", error)
      setConfig({ posts: [], updatedAt: new Date().toISOString() })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!config) return

    setSaving(true)
    try {
      const response = await fetch("/api/admin/blog/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config }),
      })

      if (response.ok) {
        alert("保存成功！")
        await loadConfig()
        setEditingPost(null)
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

  const addPost = () => {
    if (!config) return

    const newPost: BlogPostConfig = {
      id: config.posts.length > 0 ? Math.max(...config.posts.map((p) => p.id)) + 1 : 1001,
      title: "",
      excerpt: "",
      image: "",
      date: new Date().toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" }),
      dateSort: new Date().toISOString().split("T")[0],
      categories: [],
      content: "",
      tags: [],
      createdAt: new Date().toISOString(),
    }

    setEditingPost(newPost)
  }

  const editPost = (post: BlogPostConfig) => {
    setEditingPost({ ...post })
  }

  const deletePost = (id: number) => {
    if (!config) return
    if (!confirm("确定要删除这篇文章吗？")) return

    setConfig({
      ...config,
      posts: config.posts.filter((p) => p.id !== id),
    })
  }

  const savePost = () => {
    if (!config || !editingPost) return

    const existingIndex = config.posts.findIndex((p) => p.id === editingPost.id)
    const updatedPost = {
      ...editingPost,
      updatedAt: new Date().toISOString(),
    }

    if (existingIndex >= 0) {
      // 更新现有文章
      const newPosts = [...config.posts]
      newPosts[existingIndex] = updatedPost
      setConfig({ ...config, posts: newPosts })
    } else {
      // 添加新文章
      setConfig({
        ...config,
        posts: [updatedPost, ...config.posts].sort((a, b) => new Date(b.dateSort).getTime() - new Date(a.dateSort).getTime()),
      })
    }

    setEditingPost(null)
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

  if (editingPost) {
    return (
      <BlogPostEditor
        post={editingPost}
        onSave={savePost}
        onCancel={() => setEditingPost(null)}
        onUpdate={(updates) => setEditingPost({ ...editingPost, ...updates })}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/admin")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            返回
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">博客管理</h1>
              <p className="mt-2 text-gray-600">创建和管理博客文章</p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="/blog"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                <Eye className="w-5 h-5" />
                预览博客
              </a>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                {saving ? "保存中..." : (
                  <>
                    <Save className="w-5 h-5" />
                    保存所有
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Posts List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">博客文章列表</h2>
            <button
              onClick={addPost}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              新建文章
            </button>
          </div>

          <div className="divide-y divide-gray-200">
            {config.posts.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500">
                <p>还没有文章，点击"新建文章"开始创建</p>
              </div>
            ) : (
              config.posts.map((post) => (
                <div key={post.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {post.image ? (
                          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">无图片</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{post.title || "未命名文章"}</h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{post.excerpt || "无摘要"}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                          <span>ID: {post.id}</span>
                          <span>{post.date}</span>
                          <span>{post.categories.length} 个分类</span>
                          <span>{post.tags.length} 个标签</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={`/blog/${post.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm px-3 py-1.5 rounded hover:bg-blue-50"
                      >
                        预览
                      </a>
                      <button
                        onClick={() => editPost(post)}
                        className="flex items-center gap-1 text-gray-700 hover:text-gray-900 px-3 py-1.5 rounded hover:bg-gray-100"
                      >
                        <Edit className="w-4 h-4" />
                        编辑
                      </button>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="text-red-600 hover:text-red-700 px-3 py-1.5 rounded hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// 博客文章编辑器组件
function BlogPostEditor({
  post,
  onSave,
  onCancel,
  onUpdate,
}: {
  post: BlogPostConfig
  onSave: () => void
  onCancel: () => void
  onUpdate: (updates: Partial<BlogPostConfig>) => void
}) {
  const [interviewItems, setInterviewItems] = useState(post.interview || [])
  const [categories, setCategories] = useState(post.categories.join(", "))
  const [tags, setTags] = useState(post.tags.join(", "))

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      onUpdate({ image: result })
    }
    reader.readAsDataURL(file)
  }

  const addInterviewItem = () => {
    const newItems = [...interviewItems, { question: "", answer: "" }]
    setInterviewItems(newItems)
    onUpdate({ interview: newItems })
  }

  const updateInterviewItem = (index: number, field: "question" | "answer", value: string) => {
    const newItems = [...interviewItems]
    newItems[index] = { ...newItems[index], [field]: value }
    setInterviewItems(newItems)
    onUpdate({ interview: newItems })
  }

  const removeInterviewItem = (index: number) => {
    const newItems = interviewItems.filter((_, i) => i !== index)
    setInterviewItems(newItems)
    onUpdate({ interview: newItems })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {post.id ? `编辑文章 #${post.id}` : "新建文章"}
            </h2>
            <div className="flex items-center gap-3">
              <button
                onClick={onCancel}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                取消
              </button>
              <button
                onClick={onSave}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                保存
              </button>
            </div>
          </div>

          {/* 基本信息 */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">文章ID</label>
              <input
                type="number"
                value={post.id}
                onChange={(e) => onUpdate({ id: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">日期（显示）</label>
              <input
                type="text"
                value={post.date}
                onChange={(e) => onUpdate({ date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="2025年1月21日"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">日期（排序）</label>
              <input
                type="date"
                value={post.dateSort}
                onChange={(e) => onUpdate({ dateSort: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">分类（逗号分隔）</label>
              <input
                type="text"
                value={categories}
                onChange={(e) => {
                  setCategories(e.target.value)
                  onUpdate({ categories: e.target.value.split(",").map((c) => c.trim()).filter(Boolean) })
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="HOTONE, エフェクター"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">标签（逗号分隔）</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => {
                  setTags(e.target.value)
                  onUpdate({ tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="HOTONE, Ampero Mini, レビュー"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">YouTube视频ID（可选）</label>
              <input
                type="text"
                value={post.youtubeId || ""}
                onChange={(e) => onUpdate({ youtubeId: e.target.value || undefined })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Ejt9CWyKm30"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">标题</label>
            <input
              type="text"
              value={post.title}
              onChange={(e) => onUpdate({ title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">摘要</label>
            <textarea
              value={post.excerpt}
              onChange={(e) => onUpdate({ excerpt: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">封面图片</label>
            <div className="flex items-center gap-4">
              <input
                type="text"
                value={post.image}
                onChange={(e) => onUpdate({ image: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="/images/..."
              />
              <label className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700">
                <Upload className="w-4 h-4 inline mr-2" />
                上传
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            {post.image && (
              <div className="mt-2">
                <img src={post.image} alt="预览" className="max-w-xs max-h-32 object-contain border border-gray-200 rounded" />
              </div>
            )}
          </div>

          <div>
            <ContentEditor
              value={post.content}
              onChange={(content) => onUpdate({ content })}
              placeholder="支持特殊标记：&#10;[IMAGE:/path/to/image.jpg] - 插入图片&#10;[LINK:https://example.com] - 插入链接&#10;[链接文字]$$URL$$ - 行内链接"
              rows={15}
            />
          </div>

          {/* 访谈内容 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">访谈内容（可选）</label>
              <button
                onClick={addInterviewItem}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                + 添加问答
              </button>
            </div>
            <div className="space-y-4">
              {interviewItems.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">问答 #{index + 1}</span>
                    <button
                      onClick={() => removeInterviewItem(index)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      删除
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">问题</label>
                      <input
                        type="text"
                        value={item.question}
                        onChange={(e) => updateInterviewItem(index, "question", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">回答</label>
                      <textarea
                        value={item.answer}
                        onChange={(e) => updateInterviewItem(index, "answer", e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="支持 [IMAGE:路径] 和 [LINK:URL] 标记"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

