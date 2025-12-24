"use client"

import { Plus, Trash2 } from "lucide-react"
import { FAQModule, FAQItem } from "@/types/product-config"
import { RichTextEditor } from "../rich-text-editor"

interface FAQEditorProps {
  faq: FAQModule
  onChange: (faq: FAQModule) => void
}

export function FAQEditor({ faq, onChange }: FAQEditorProps) {
  const addItem = () => {
    onChange({
      ...faq,
      items: [
        ...(faq.items || []),
        {
          number: String((faq.items?.length || 0) + 1),
          question: "",
          answer: "",
        },
      ],
    })
  }

  const removeItem = (index: number) => {
    onChange({
      ...faq,
      items: faq.items.filter((_, i) => i !== index),
    })
  }

  const updateItem = (index: number, field: keyof FAQItem, value: any) => {
    const items = [...(faq.items || [])]
    items[index] = {
      ...items[index],
      [field]: value,
    }
    onChange({
      ...faq,
      items,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={faq.enabled}
            onChange={(e) =>
              onChange({
                ...faq,
                enabled: e.target.checked,
              })
            }
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">启用FAQ模块</span>
        </label>
      </div>

      {faq.enabled && (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">问题列表</h3>
            <button
              type="button"
              onClick={addItem}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              添加问题
            </button>
          </div>

          <div className="space-y-4">
            {(faq.items || []).map((item, index) => (
              <div
                key={index}
                className="p-6 border border-gray-300 rounded-lg bg-gray-50 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                      {item.number}
                    </span>
                    <span className="text-sm font-medium text-gray-700">问题 {index + 1}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    编号
                  </label>
                  <input
                    type="text"
                    value={item.number}
                    onChange={(e) => updateItem(index, "number", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="例如：Q1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    问题
                  </label>
                  <RichTextEditor
                    value={item.question}
                    onChange={(value) => updateItem(index, "question", value)}
                    placeholder="输入问题..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    答案
                  </label>
                  <RichTextEditor
                    value={item.answer}
                    onChange={(value) => updateItem(index, "answer", value)}
                    placeholder="输入答案..."
                  />
                </div>
              </div>
            ))}

            {(!faq.items || faq.items.length === 0) && (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500 mb-4">暂无问题，点击"添加问题"按钮添加</p>
                <button
                  type="button"
                  onClick={addItem}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  添加第一个问题
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

