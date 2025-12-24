"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Bold, Type, Palette } from "lucide-react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

type TextSize = "small" | "normal" | "large" | "h1" | "h2" | "h3"

export function RichTextEditor({
  value,
  onChange,
  placeholder = "输入文本...",
  className = "",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const toolbarRef = useRef<HTMLDivElement>(null)
  const [showToolbar, setShowToolbar] = useState(false)
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 })
  const [selectedRange, setSelectedRange] = useState<Range | null>(null)

  // 检测文本选中
  const handleSelectionChange = useCallback(() => {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) {
      setShowToolbar(false)
      return
    }

    const range = selection.getRangeAt(0)
    if (range.collapsed) {
      setShowToolbar(false)
      return
    }

    // 检查选中内容是否在编辑器内
    if (!editorRef.current?.contains(range.commonAncestorContainer)) {
      setShowToolbar(false)
      return
    }

    setSelectedRange(range.cloneRange())
    
    // 计算工具栏位置
    const rect = range.getBoundingClientRect()
    const editorRect = editorRef.current?.getBoundingClientRect()
    if (editorRect) {
      // 移动端适配：确保工具栏不会超出屏幕
      const isMobile = window.innerWidth < 768
      const toolbarHeight = 50
      const toolbarWidth = isMobile ? 200 : 300
      
      let top = rect.top - editorRect.top - toolbarHeight - 10
      let left = rect.left - editorRect.left + rect.width / 2
      
      // 如果工具栏会超出顶部，显示在选中文本下方
      if (top < 0) {
        top = rect.bottom - editorRect.top + 10
      }
      
      // 如果工具栏会超出左侧，调整到左侧边界
      if (left - toolbarWidth / 2 < 0) {
        left = toolbarWidth / 2 + 10
      }
      
      // 如果工具栏会超出右侧，调整到右侧边界
      if (left + toolbarWidth / 2 > editorRect.width) {
        left = editorRect.width - toolbarWidth / 2 - 10
      }
      
      setToolbarPosition({ top, left })
      setShowToolbar(true)
    }
  }, [])

  useEffect(() => {
    document.addEventListener("selectionchange", handleSelectionChange)
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange)
    }
  }, [handleSelectionChange])

  // 点击编辑器外部时隐藏工具栏
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        editorRef.current &&
        !editorRef.current.contains(e.target as Node) &&
        toolbarRef.current &&
        !toolbarRef.current.contains(e.target as Node)
      ) {
        setShowToolbar(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // 应用格式
  const applyFormat = useCallback(
    (format: "bold" | "size" | "color", value?: TextSize | string) => {
      if (!selectedRange) return

      const selection = window.getSelection()
      if (!selection || selection.rangeCount === 0) return

      selection.removeAllRanges()
      selection.addRange(selectedRange)

      try {
        switch (format) {
          case "bold":
            document.execCommand("bold", false)
            break
          case "size":
            if (value) {
              const sizeMap: Record<TextSize, string> = {
                small: "1",
                normal: "3",
                large: "5",
                h1: "6",
                h2: "5",
                h3: "4",
              }
              document.execCommand("fontSize", false, sizeMap[value])
            }
            break
          case "color":
            if (value) {
              document.execCommand("foreColor", false, value)
            }
            break
        }

        // 更新内容
        if (editorRef.current) {
          const html = editorRef.current.innerHTML
          const markdown = convertHtmlToMarkdown(html)
          onChange(markdown)
        }
      } catch (error) {
        console.error("应用格式失败:", error)
      }

      // 重新选中文本
      setTimeout(() => {
        const newSelection = window.getSelection()
        if (newSelection && selectedRange) {
          newSelection.removeAllRanges()
          newSelection.addRange(selectedRange)
        }
      }, 0)
    },
    [selectedRange, onChange]
  )

  // HTML转Markdown + 自定义标记
  const convertHtmlToMarkdown = (html: string): string => {
    let markdown = html

    // 处理粗体
    markdown = markdown.replace(/<strong>(.*?)<\/strong>/gi, "**$1**")
    markdown = markdown.replace(/<b>(.*?)<\/b>/gi, "**$1**")

    // 处理字体大小
    markdown = markdown.replace(/<font size="1">(.*?)<\/font>/gi, "<size:small>$1</size>")
    markdown = markdown.replace(/<font size="3">(.*?)<\/font>/gi, "<size:normal>$1</size>")
    markdown = markdown.replace(/<font size="5">(.*?)<\/font>/gi, "<size:large>$1</size>")
    markdown = markdown.replace(/<font size="6">(.*?)<\/font>/gi, "<size:h1>$1</size>")
    markdown = markdown.replace(/<font size="4">(.*?)<\/font>/gi, "<size:h3>$1</size>")
    markdown = markdown.replace(/<h1>(.*?)<\/h1>/gi, "<size:h1>$1</size>")
    markdown = markdown.replace(/<h2>(.*?)<\/h2>/gi, "<size:h2>$1</size>")
    markdown = markdown.replace(/<h3>(.*?)<\/h3>/gi, "<size:h3>$1</size>")

    // 处理颜色
    markdown = markdown.replace(/<font color="([^"]+)">(.*?)<\/font>/gi, "<color:$1>$2</color>")
    markdown = markdown.replace(/<span style="color:\s*([^;]+)">(.*?)<\/span>/gi, "<color:$1>$2</color>")

    // 清理其他HTML标签
    markdown = markdown.replace(/<br\s*\/?>/gi, "\n")
    markdown = markdown.replace(/<p>(.*?)<\/p>/gi, "$1\n")
    markdown = markdown.replace(/<div>(.*?)<\/div>/gi, "$1\n")

    // 清理多余的换行
    markdown = markdown.replace(/\n{3,}/g, "\n\n")

    return markdown.trim()
  }

  // Markdown + 自定义标记转HTML
  const convertMarkdownToHtml = (markdown: string): string => {
    let html = markdown

    // 处理换行
    html = html.replace(/\n/g, "<br>")

    // 处理粗体
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

    // 处理尺寸
    html = html.replace(/<size:small>(.*?)<\/size>/gi, '<font size="1">$1</font>')
    html = html.replace(/<size:normal>(.*?)<\/size>/gi, '<font size="3">$1</font>')
    html = html.replace(/<size:large>(.*?)<\/size>/gi, '<font size="5">$1</font>')
    html = html.replace(/<size:h1>(.*?)<\/size>/gi, "<h1>$1</h1>")
    html = html.replace(/<size:h2>(.*?)<\/size>/gi, "<h2>$1</h2>")
    html = html.replace(/<size:h3>(.*?)<\/size>/gi, "<h3>$1</h3>")

    // 处理颜色
    html = html.replace(/<color:([^>]+)>(.*?)<\/color>/gi, '<span style="color: $1">$2</span>')

    return html
  }

  // 处理内容变化
  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML
      const markdown = convertHtmlToMarkdown(html)
      onChange(markdown)
    }
  }

  // 初始化编辑器内容
  useEffect(() => {
    if (editorRef.current && value !== undefined) {
      const html = convertMarkdownToHtml(value)
      if (editorRef.current.innerHTML !== html) {
        editorRef.current.innerHTML = html
      }
    }
  }, [value])

  // 颜色选择器
  const [showColorPicker, setShowColorPicker] = useState(false)
  const commonColors = [
    "#000000", "#333333", "#666666", "#999999", "#CCCCCC", "#FFFFFF",
    "#FF0000", "#FF6600", "#FFCC00", "#00FF00", "#00CCFF", "#0066FF",
    "#6600FF", "#FF00FF", "#FF0066",
  ]

  return (
    <div className={`relative ${className}`}>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[120px] w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        style={{
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
        suppressContentEditableWarning
        data-placeholder={placeholder}
      />
      <style jsx>{`
        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
      `}</style>

      {/* 浮动工具栏 */}
      {showToolbar && (
        <div
          ref={toolbarRef}
          className="absolute z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-2 flex items-center gap-1 md:gap-2 flex-wrap"
          style={{
            top: `${toolbarPosition.top}px`,
            left: `${toolbarPosition.left}px`,
            transform: "translateX(-50%)",
            maxWidth: "calc(100% - 20px)",
          }}
          onMouseDown={(e) => e.preventDefault()}
        >
          {/* 粗体 */}
          <button
            type="button"
            onClick={() => applyFormat("bold")}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="粗体"
          >
            <Bold className="w-4 h-4" />
          </button>

          {/* 字体大小 */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowColorPicker(false)}
              className="p-2 hover:bg-gray-100 rounded transition-colors flex items-center gap-1"
              title="字体大小"
            >
              <Type className="w-4 h-4" />
              <span className="text-xs">Size</span>
            </button>
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg min-w-[120px]">
              {(["small", "normal", "large", "h1", "h2", "h3"] as TextSize[]).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => {
                    applyFormat("size", size)
                    setShowColorPicker(false)
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm capitalize"
                >
                  {size === "normal" ? "Normal" : size.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* 颜色 */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="文字颜色"
            >
              <Palette className="w-4 h-4" />
            </button>
            {showColorPicker && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-3">
                <div className="grid grid-cols-5 gap-2 mb-2">
                  {commonColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => {
                        applyFormat("color", color)
                        setShowColorPicker(false)
                      }}
                      className="w-8 h-8 rounded border border-gray-300 hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
                <input
                  type="color"
                  onChange={(e) => {
                    applyFormat("color", e.target.value)
                    setShowColorPicker(false)
                  }}
                  className="w-full h-8 rounded border border-gray-300"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

