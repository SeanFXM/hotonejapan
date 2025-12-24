"use client"

import React from "react"

interface RichTextRendererProps {
  content: string
  className?: string
}

// XSS防护：清理危险的HTML标签和属性
const sanitizeHtml = (html: string): string => {
  // 只允许安全的标签和属性
  const allowedTags = ["strong", "b", "em", "i", "u", "br", "p", "div", "span", "h1", "h2", "h3", "h4", "h5", "h6"]
  const allowedAttributes = ["style", "color", "size"]

  // 移除script、iframe等危险标签
  let sanitized = html
    .replace(/<script[^>]*>.*?<\/script>/gi, "")
    .replace(/<iframe[^>]*>.*?<\/iframe>/gi, "")
    .replace(/on\w+="[^"]*"/gi, "") // 移除事件处理器
    .replace(/javascript:/gi, "") // 移除javascript:协议

  return sanitized
}

export function RichTextRenderer({ content, className = "" }: RichTextRendererProps) {
  if (!content) return null

  // 解析Markdown + 自定义标记
  const parseContent = (text: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = []
    let currentIndex = 0
    let key = 0

    // 正则表达式匹配所有标记
    const tagRegex = /<(size|color):([^>]+)>(.*?)<\/\1>|\*\*(.*?)\*\*/g
    let match

    while ((match = tagRegex.exec(text)) !== null) {
      // 添加标记前的文本
      if (match.index > currentIndex) {
        const beforeText = text.substring(currentIndex, match.index)
        if (beforeText) {
          parts.push(
            <span key={`text-${key++}`}>{beforeText}</span>
          )
        }
      }

      // 处理标记
      if (match[0].startsWith("<size:")) {
        // 尺寸标记
        const size = match[2] as "small" | "normal" | "large" | "h1" | "h2" | "h3"
        const content = match[3]
        const sizeClasses: Record<string, string> = {
          small: "text-sm",
          normal: "text-base",
          large: "text-lg",
          h1: "text-4xl font-bold",
          h2: "text-3xl font-bold",
          h3: "text-2xl font-bold",
        }
        const Tag = size.startsWith("h") ? (size as "h1" | "h2" | "h3") : "span"
        parts.push(
          <Tag key={`size-${key++}`} className={sizeClasses[size] || ""}>
            {parseContent(content)}
          </Tag>
        )
      } else if (match[0].startsWith("<color:")) {
        // 颜色标记
        const color = match[2]
        const content = match[3]
        parts.push(
          <span key={`color-${key++}`} style={{ color }}>
            {parseContent(content)}
          </span>
        )
      } else if (match[0].startsWith("**")) {
        // 粗体标记
        const content = match[4]
        parts.push(
          <strong key={`bold-${key++}`}>{parseContent(content)}</strong>
        )
      }

      currentIndex = match.index + match[0].length
    }

    // 添加剩余的文本
    if (currentIndex < text.length) {
      const remainingText = text.substring(currentIndex)
      if (remainingText) {
        parts.push(
          <span key={`text-${key++}`}>{remainingText}</span>
        )
      }
    }

    // 如果没有匹配到任何标记，直接返回文本
    if (parts.length === 0) {
      return [<span key="plain-text">{text}</span>]
    }

    return parts
  }

  // 处理换行
  const processNewlines = (text: string): React.ReactNode[] => {
    const lines = text.split("\n")
    const result: React.ReactNode[] = []

    lines.forEach((line, index) => {
      if (index > 0) {
        result.push(<br key={`br-${index}`} />)
      }
      result.push(...parseContent(line))
    })

    return result
  }

  // 清理内容
  const sanitizedContent = sanitizeHtml(content)

  return (
    <div className={`rich-text-content break-words overflow-wrap-anywhere whitespace-normal ${className}`} style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}>
      {processNewlines(sanitizedContent)}
    </div>
  )
}

