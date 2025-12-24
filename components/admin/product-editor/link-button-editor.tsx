"use client"

import { Plus, Trash2, ExternalLink } from "lucide-react"
import { RelatedLink } from "@/types/product-config"

interface LinkButtonEditorProps {
  links: RelatedLink[]
  onChange: (links: RelatedLink[]) => void
  label?: string
}

// 图标定义，包含SVG路径
const iconDefinitions = [
  {
    name: "文档",
    value: "document",
    svg: (
      <path
        fillRule="evenodd"
        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
        clipRule="evenodd"
      />
    ),
  },
  {
    name: "用户（填充）",
    value: "user-filled",
    svg: (
      <>
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        />
      </>
    ),
  },
  {
    name: "用户（轮廓）",
    value: "user-outline",
    svg: (
      <path
        fillRule="evenodd"
        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
        clipRule="evenodd"
      />
    ),
  },
  {
    name: "设置",
    value: "settings",
    svg: (
      <path
        fillRule="evenodd"
        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
        clipRule="evenodd"
      />
    ),
  },
  {
    name: "信息",
    value: "info",
    svg: (
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      />
    ),
  },
  {
    name: "下载",
    value: "download",
    svg: (
      <path
        fillRule="evenodd"
        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    ),
  },
  {
    name: "链接",
    value: "link",
    svg: (
      <path
        fillRule="evenodd"
        d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
        clipRule="evenodd"
      />
    ),
  },
  {
    name: "箭头",
    value: "arrow",
    svg: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7l5 5m0 0l-5 5m5-5H6"
      />
    ),
  },
  {
    name: "小圆点",
    value: "dot",
    svg: <circle cx="10" cy="10" r="2" />,
  },
]

export function LinkButtonEditor({
  links = [],
  onChange,
  label = "相关链接",
}: LinkButtonEditorProps) {
  const addLink = () => {
    onChange([
      ...links,
      {
        text: "",
        url: "",
        icon: "",
      },
    ])
  }

  const removeLink = (index: number) => {
    onChange(links.filter((_, i) => i !== index))
  }

  const updateLink = (index: number, field: keyof RelatedLink, value: string) => {
    const updated = [...links]
    updated[index] = {
      ...updated[index],
      [field]: value,
    }
    onChange(updated)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <button
          type="button"
          onClick={addLink}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          添加链接
        </button>
      </div>

      <div className="space-y-3">
        {links.map((link, index) => (
          <div
            key={index}
            className="p-4 border border-gray-300 rounded-lg bg-gray-50 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">链接 {index + 1}</span>
              <button
                type="button"
                onClick={() => removeLink(index)}
                className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                链接文本
              </label>
              <input
                type="text"
                value={link.text}
                onChange={(e) => updateLink(index, "text", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="例如：用户手册"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                URL
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={link.url}
                  onChange={(e) => updateLink(index, "url", e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="https://example.com 或 #section-id"
                />
                {link.url && (
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="在新窗口打开"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">
                图标（可选）
              </label>
              <div className="grid grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => updateLink(index, "icon", "")}
                  className={`p-3 border-2 rounded-lg transition-all ${
                    !link.icon
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  title="无图标"
                >
                  <div className="w-5 h-5 mx-auto text-gray-400">—</div>
                </button>
                {iconDefinitions.map((iconDef) => (
                  <button
                    key={iconDef.value}
                    type="button"
                    onClick={() => updateLink(index, "icon", iconDef.value)}
                    className={`p-3 border-2 rounded-lg transition-all ${
                      link.icon === iconDef.value
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    title={iconDef.name}
                  >
                    <svg
                      className="w-5 h-5 mx-auto text-purple-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      {iconDef.svg}
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}

        {links.length === 0 && (
          <div className="text-center py-8 text-gray-500 text-sm border-2 border-dashed border-gray-300 rounded-lg">
            暂无链接，点击"添加链接"按钮添加
          </div>
        )}
      </div>
    </div>
  )
}

