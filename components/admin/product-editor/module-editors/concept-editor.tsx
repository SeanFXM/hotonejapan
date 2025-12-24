"use client"

import { Plus, Trash2, GripVertical } from "lucide-react"
import { ConceptModule, ConceptSection, MediaItem } from "@/types/product-config"
import { RichTextEditor } from "../rich-text-editor"
import { MediaUploadField } from "../media-upload-field"
import { LinkButtonEditor } from "../link-button-editor"

interface ConceptEditorProps {
  concept: ConceptModule
  onChange: (concept: ConceptModule) => void
}

export function ConceptEditor({ concept, onChange }: ConceptEditorProps) {
  const addSection = () => {
    onChange({
      ...concept,
      sections: [
        ...(concept.sections || []),
        {
          media: {
            type: "image",
            src: "",
          },
          imagePosition: "left",
          content: "",
        },
      ],
    })
  }

  const removeSection = (index: number) => {
    onChange({
      ...concept,
      sections: concept.sections.filter((_, i) => i !== index),
    })
  }

  const updateSection = (index: number, field: keyof ConceptSection, value: any) => {
    const sections = [...(concept.sections || [])]
    sections[index] = {
      ...sections[index],
      [field]: value,
    }
    onChange({
      ...concept,
      sections,
    })
  }

  const updateSectionMedia = (index: number, media: MediaItem | string) => {
    const sections = [...(concept.sections || [])]
    if (typeof media === "object") {
      sections[index] = {
        ...sections[index],
        media,
      }
    } else {
      sections[index] = {
        ...sections[index],
        media: {
          type: "image",
          src: media,
        },
      }
    }
    onChange({
      ...concept,
      sections,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={concept.enabled}
            onChange={(e) =>
              onChange({
                ...concept,
                enabled: e.target.checked,
              })
            }
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">启用Concept模块</span>
        </label>
      </div>

      {concept.enabled && (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Sections</h3>
            <button
              type="button"
              onClick={addSection}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              添加Section
            </button>
          </div>

          <div className="space-y-6">
            {(concept.sections || []).map((section, index) => (
              <div
                key={index}
                className="p-6 border border-gray-300 rounded-lg bg-gray-50 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">
                      Section {index + 1}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSection(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      标题
                    </label>
                    <input
                      type="text"
                      value={section.title || ""}
                      onChange={(e) => updateSection(index, "title", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      副标题
                    </label>
                    <input
                      type="text"
                      value={section.subtitle || ""}
                      onChange={(e) => updateSection(index, "subtitle", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    媒体（图片或视频）
                  </label>
                  <MediaUploadField
                    label=""
                    value={section.media}
                    onChange={(value) => updateSectionMedia(index, value)}
                    showTransparentOption={true}
                    showAnimatedGifOption={true}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    媒体位置
                  </label>
                  <select
                    value={section.imagePosition}
                    onChange={(e) =>
                      updateSection(index, "imagePosition", e.target.value as "left" | "right")
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="left">左侧</option>
                    <option value="right">右侧</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    内容文本
                  </label>
                  <RichTextEditor
                    value={section.content}
                    onChange={(value) => updateSection(index, "content", value)}
                    placeholder="输入内容..."
                  />
                </div>
              </div>
            ))}

            {(!concept.sections || concept.sections.length === 0) && (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500 mb-4">暂无Section，点击"添加Section"按钮添加</p>
                <button
                  type="button"
                  onClick={addSection}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  添加第一个Section
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

