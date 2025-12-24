"use client"

import { Plus, Trash2 } from "lucide-react"
import { IntroModule, MediaItem } from "@/types/product-config"
import { RichTextEditor } from "../rich-text-editor"
import { MediaUploadField } from "../media-upload-field"
import { LinkButtonEditor } from "../link-button-editor"

interface IntroEditorProps {
  intro: IntroModule
  onChange: (intro: IntroModule) => void
}

export function IntroEditor({ intro, onChange }: IntroEditorProps) {
  const updateField = (field: keyof IntroModule, value: any) => {
    onChange({
      ...intro,
      [field]: value,
    })
  }

  const addFeature = () => {
    onChange({
      ...intro,
      features: [...(intro.features || []), ""],
    })
  }

  const updateFeature = (index: number, value: string) => {
    const features = [...(intro.features || [])]
    features[index] = value
    onChange({
      ...intro,
      features,
    })
  }

  const removeFeature = (index: number) => {
    const features = (intro.features || []).filter((_, i) => i !== index)
    onChange({
      ...intro,
      features,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={intro.enabled}
            onChange={(e) => updateField("enabled", e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">启用Intro模块</span>
        </label>
      </div>

      {intro.enabled && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                标题
              </label>
              <input
                type="text"
                value={intro.title || ""}
                onChange={(e) => updateField("title", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="例如：10in / 14out"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                副标题
              </label>
              <input
                type="text"
                value={intro.subtitle || ""}
                onChange={(e) => updateField("subtitle", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="例如：USB オーディオ・インターフェイス"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              左侧媒体（图片或视频）
            </label>
            <MediaUploadField
              label=""
              value={
                // 优先使用media字段，如果没有则使用image或video
                intro.media || intro.image || intro.video || ""
              }
              onChange={(value) => {
                // 简化处理：直接传递值，类似product-info-editor的方式
                if (typeof value === "object" && "type" in value) {
                  // MediaItem对象，直接更新所有相关字段
                  onChange({
                    ...intro,
                    media: value,
                    image: value.type === "image" ? value.src : intro.image,
                    video: value.type === "video" ? value.src : intro.video,
                  })
                } else {
                  // 字符串值，直接更新image字段（保持简单）
                  // MediaUploadField会在失去焦点时自动检测类型
                  onChange({
                    ...intro,
                    image: value,
                    video: undefined,
                    media: undefined,
                  })
                }
              }}
              showAnimatedGifOption={true}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              描述文本
            </label>
            <RichTextEditor
              value={intro.description || ""}
              onChange={(value) => updateField("description", value)}
              placeholder="输入产品描述..."
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">特性列表</label>
              <button
                type="button"
                onClick={addFeature}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                添加特性
              </button>
            </div>
            <div className="space-y-2">
              {(intro.features || []).map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <RichTextEditor
                    value={feature}
                    onChange={(value) => updateFeature(index, value)}
                    placeholder="输入特性..."
                    className="flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {(!intro.features || intro.features.length === 0) && (
                <p className="text-sm text-gray-500 text-center py-4">
                  暂无特性，点击"添加特性"按钮添加
                </p>
              )}
            </div>
          </div>

          <div>
            <LinkButtonEditor
              links={intro.relatedLinks || []}
              onChange={(links) => updateField("relatedLinks", links)}
              label="相关链接（显示在左侧媒体下方）"
            />
          </div>
        </>
      )}
    </div>
  )
}

