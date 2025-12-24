"use client"

import { Plus, Trash2 } from "lucide-react"
import { FunctionModule, FunctionItem } from "@/types/product-config"
import { RichTextEditor } from "../rich-text-editor"
import { MediaUploadField } from "../media-upload-field"

interface FunctionEditorProps {
  function: FunctionModule
  onChange: (func: FunctionModule) => void
}

export function FunctionEditor({ function: func, onChange }: FunctionEditorProps) {
  const addItem = () => {
    onChange({
      ...func,
      items: [
        ...(func.items || []),
        {
          number: String((func.items?.length || 0) + 1),
          image: "",
          title: "",
          description: "",
        },
      ],
    })
  }

  const removeItem = (index: number) => {
    onChange({
      ...func,
      items: func.items.filter((_, i) => i !== index),
    })
  }

  const updateItem = (index: number, field: keyof FunctionItem, value: any) => {
    const items = [...(func.items || [])]
    items[index] = {
      ...items[index],
      [field]: value,
    }
    onChange({
      ...func,
      items,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={func.enabled}
            onChange={(e) =>
              onChange({
                ...func,
                enabled: e.target.checked,
              })
            }
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">启用Function模块</span>
        </label>
      </div>

      {func.enabled && (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">功能项列表</h3>
            <button
              type="button"
              onClick={addItem}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              添加功能项
            </button>
          </div>

          <div className="space-y-6">
            {(func.items || []).map((item, index) => (
              <div
                key={index}
                className="p-6 border border-gray-300 rounded-lg bg-gray-50 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center text-sm font-bold">
                      {item.number}
                    </span>
                    <span className="text-sm font-medium text-gray-700">功能项 {index + 1}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      编号
                    </label>
                    <input
                      type="text"
                      value={item.number}
                      onChange={(e) => updateItem(index, "number", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      标题
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => updateItem(index, "title", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    副标题（可选）
                  </label>
                  <input
                    type="text"
                    value={item.subtitle || ""}
                    onChange={(e) => updateItem(index, "subtitle", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <MediaUploadField
                    label="图片"
                    value={item.image}
                    onChange={(value) =>
                      updateItem(index, "image", typeof value === "string" ? value : value.src)
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    描述
                  </label>
                  <RichTextEditor
                    value={item.description}
                    onChange={(value) => updateItem(index, "description", value)}
                    placeholder="输入功能描述..."
                  />
                </div>
              </div>
            ))}

            {(!func.items || func.items.length === 0) && (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500 mb-4">暂无功能项，点击"添加功能项"按钮添加</p>
                <button
                  type="button"
                  onClick={addItem}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  添加第一个功能项
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

