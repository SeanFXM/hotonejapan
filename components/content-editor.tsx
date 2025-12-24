"use client"

import { useState, useRef, useEffect } from "react"
import { Upload, X, Move, Maximize2, Minimize2 } from "lucide-react"
import Image from "next/image"

interface ImageBlock {
  id: string
  src: string
  width?: number
  height?: number
  position: number // 在内容中的位置（字符索引）
}

interface ContentEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
}

export function ContentEditor({ value, onChange, placeholder, rows = 15 }: ContentEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [images, setImages] = useState<ImageBlock[]>([])
  const [editingImageId, setEditingImageId] = useState<string | null>(null)
  const [draggedImageId, setDraggedImageId] = useState<string | null>(null)
  const [showVisualMode, setShowVisualMode] = useState(false)

  // 解析内容中的图片标记（支持宽度参数）
  useEffect(() => {
    const imageRegex = /\[IMAGE:([^\]]+?)(?:\|width:(\d+))?\]/g
    const foundImages: ImageBlock[] = []
    let match
    let position = 0

    // 重置正则表达式
    imageRegex.lastIndex = 0

    while ((match = imageRegex.exec(value)) !== null) {
      foundImages.push({
        id: `img_${position}`,
        src: match[1],
        width: match[2] ? parseInt(match[2]) : undefined,
        position: match.index,
      })
      position++
    }

    setImages(foundImages)
  }, [value])

  // 处理图片上传
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      const textarea = textareaRef.current
      
      if (textarea) {
        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const textBefore = value.substring(0, start)
        const textAfter = value.substring(end)
        
        const imageMark = `\n\n[IMAGE:${result}]\n\n`
        const newContent = textBefore + imageMark + textAfter
        
        onChange(newContent)
        
        setTimeout(() => {
          const newCursorPos = start + imageMark.length
          textarea.setSelectionRange(newCursorPos, newCursorPos)
          textarea.focus()
        }, 0)
      } else {
        const imageMark = `\n\n[IMAGE:${result}]\n\n`
        onChange(value + imageMark)
      }
    }
    reader.readAsDataURL(file)
  }

  // 删除图片
  const removeImage = (imageId: string) => {
    const image = images.find((img) => img.id === imageId)
    if (!image) return

    const imageRegex = /\[IMAGE:[^\]]+\]/g
    const newContent = value.replace(imageRegex, (match, offset) => {
      if (offset === image.position) {
        return ""
      }
      return match
    }).replace(/\n\n\n+/g, "\n\n") // 清理多余的空行

    onChange(newContent)
  }

  // 更新图片大小
  const updateImageSize = (imageId: string, width: number) => {
    const image = images.find((img) => img.id === imageId)
    if (!image) return

    const imageRegex = /\[IMAGE:([^\]]+?)(?:\|width:(\d+))?\]/g
    const newContent = value.replace(imageRegex, (match, src, existingWidth, offset) => {
      if (offset === image.position) {
        // 在图片标记中添加或更新大小信息
        return `[IMAGE:${src}|width:${width}]`
      }
      return match
    })

    onChange(newContent)
  }

  // 移动图片位置（通过拖拽）
  const moveImageToBlock = (draggedImageId: string, targetBlockIndex: number) => {
    const draggedImage = images.find((img) => img.id === draggedImageId)
    if (!draggedImage) return

    // 先解析当前的内容块，找到目标块
    const blocks = renderVisualBlocks()
    if (targetBlockIndex < 0 || targetBlockIndex >= blocks.length) return

    const targetBlock = blocks[targetBlockIndex]
    
    // 如果拖到的是同一张图片的位置，不执行任何操作
    if (targetBlock.type === "image" && targetBlock.imageId === draggedImageId) {
      return
    }

    // 找到完整的图片标记（包括前后的换行）
    const imageRegex = /\[IMAGE:([^\]]+?)(?:\|width:(\d+))?\]/g
    let imageMark = ""
    let imageMatch: RegExpExecArray | null = null
    
    imageRegex.lastIndex = 0
    while ((imageMatch = imageRegex.exec(value)) !== null) {
      if (imageMatch.index === draggedImage.position) {
        imageMark = imageMatch[0]
        break
      }
    }

    if (!imageMark || !imageMatch) return

    // 找到图片标记前后的完整段落（包括换行）
    const imageStart = imageMatch.index
    const imageEnd = imageMatch.index + imageMatch[0].length
    
    // 找到图片标记所在的段落（前后各一个换行符）
    let paraStart = imageStart
    let paraEnd = imageEnd
    
    // 向前找到段落开始（两个换行符或开头）
    while (paraStart > 0 && value[paraStart - 1] !== '\n') {
      paraStart--
    }
    // 向后找到段落结束（两个换行符或结尾）
    while (paraEnd < value.length && value[paraEnd] !== '\n') {
      paraEnd++
    }
    
    // 移除整个图片段落
    let newContent = value.substring(0, paraStart) + value.substring(paraEnd)
    
    // 清理多余的空行
    newContent = newContent.replace(/\n\n\n+/g, "\n\n")

    // 计算目标插入位置
    let insertPosition = targetBlock.position
    
    // 如果目标块是文本，插入到文本末尾
    if (targetBlock.type === "text") {
      insertPosition = targetBlock.position + targetBlock.content.length
    }
    
    // 调整插入位置（因为我们已经移除了原图片段落）
    const removedLength = paraEnd - paraStart
    if (imageStart < insertPosition) {
      insertPosition -= removedLength
    }
    
    // 确保位置有效
    insertPosition = Math.max(0, Math.min(insertPosition, newContent.length))

    // 在新位置插入图片（前后各加一个换行）
    const textBefore = newContent.substring(0, insertPosition)
    const textAfter = newContent.substring(insertPosition)
    
    // 智能处理换行
    const needsNewlineBefore = textBefore.length > 0 && !textBefore.endsWith("\n\n")
    const needsNewlineAfter = textAfter.length > 0 && !textAfter.startsWith("\n\n")
    
    let finalContent = textBefore
    if (needsNewlineBefore) {
      finalContent += "\n\n"
    }
    finalContent += imageMark
    if (needsNewlineAfter) {
      finalContent += "\n\n"
    }
    finalContent += textAfter

    onChange(finalContent)
  }

  // 切换可视化模式
  const toggleVisualMode = () => {
    setShowVisualMode(!showVisualMode)
  }

  // 可视化编辑模式：显示内容块
  const renderVisualBlocks = () => {
    const blocks: Array<{ type: "text" | "image"; content: string; imageId?: string; position: number }> = []
    let lastIndex = 0

    images.forEach((img) => {
      // 添加图片前的文本
      if (img.position > lastIndex) {
        const text = value.substring(lastIndex, img.position).trim()
        if (text) {
          blocks.push({ type: "text", content: text, position: lastIndex })
        }
      }

      // 添加图片
      const imageMatch = value.substring(img.position).match(/\[IMAGE:([^\]]+)(?:\|width:(\d+))?\]/)
      if (imageMatch) {
        blocks.push({
          type: "image",
          content: imageMatch[1],
          imageId: img.id,
          position: img.position,
        })
        lastIndex = img.position + imageMatch[0].length
      }
    })

    // 添加最后剩余的文本
    if (lastIndex < value.length) {
      const text = value.substring(lastIndex).trim()
      if (text) {
        blocks.push({ type: "text", content: text, position: lastIndex })
      }
    }

    return blocks
  }

  if (showVisualMode) {
    const blocks = renderVisualBlocks()

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">文章内容（可视化模式）</label>
          <div className="flex items-center gap-2">
            <label className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg cursor-pointer hover:bg-blue-700 flex items-center gap-2">
              <Upload className="w-4 h-4" />
              插入图片
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            <button
              onClick={toggleVisualMode}
              className="px-3 py-1.5 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700"
            >
              切换到文本模式
            </button>
          </div>
        </div>

        <div className="border border-gray-300 rounded-lg p-4 min-h-[400px] bg-white space-y-4">
          {blocks.map((block, index) => {
            // 文本块也可以作为拖放目标
            if (block.type === "text") {
              return (
                <div
                  key={`text_${index}`}
                  className="relative group"
                  onDragOver={(e) => {
                    e.preventDefault()
                    e.dataTransfer.dropEffect = "move"
                    e.currentTarget.classList.add("border-2", "border-dashed", "border-blue-400", "bg-blue-50", "rounded-lg", "p-2")
                  }}
                  onDragLeave={(e) => {
                    e.currentTarget.classList.remove("border-2", "border-dashed", "border-blue-400", "bg-blue-50", "rounded-lg", "p-2")
                  }}
                  onDrop={(e) => {
                    e.preventDefault()
                    e.currentTarget.classList.remove("border-2", "border-dashed", "border-blue-400", "bg-blue-50", "rounded-lg", "p-2")
                    if (draggedImageId) {
                      moveImageToBlock(draggedImageId, index)
                    }
                    setDraggedImageId(null)
                  }}
                >
                  <div className="text-gray-700 whitespace-pre-wrap">{block.content}</div>
                </div>
              )
            }

            if (block.type === "image" && block.imageId) {
              const img = images.find((i) => i.id === block.imageId)
              const widthMatch = value.substring(block.position).match(/\[IMAGE:[^\]]+?\|width:(\d+)\]/)
              const currentWidth = img?.width || widthMatch ? parseInt(widthMatch?.[1] || "800") : 800

              return (
                <div
                  key={block.imageId}
                  className="relative group border-2 border-dashed border-blue-300 rounded-lg p-4 bg-gray-50 cursor-move hover:border-blue-500 transition-colors"
                  draggable
                  onDragStart={(e) => {
                    setDraggedImageId(block.imageId!)
                    e.dataTransfer.effectAllowed = "move"
                    e.dataTransfer.setData("text/plain", "")
                  }}
                  onDragOver={(e) => {
                    e.preventDefault()
                    e.dataTransfer.dropEffect = "move"
                    e.currentTarget.classList.add("border-blue-500", "bg-blue-50")
                  }}
                  onDragLeave={(e) => {
                    e.currentTarget.classList.remove("border-blue-500", "bg-blue-50")
                  }}
                  onDrop={(e) => {
                    e.preventDefault()
                    e.currentTarget.classList.remove("border-blue-500", "bg-blue-50")
                    if (draggedImageId && draggedImageId !== block.imageId) {
                      const targetIndex = blocks.findIndex((b) => b.imageId === block.imageId)
                      moveImageToBlock(draggedImageId, targetIndex)
                    }
                    setDraggedImageId(null)
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Move className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-500">图片（可拖动调整位置）</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingImageId(editingImageId === block.imageId ? null : block.imageId)}
                        className="text-blue-600 hover:text-blue-700 text-xs px-2 py-1 rounded hover:bg-blue-50"
                      >
                        {editingImageId === block.imageId ? "完成" : "调整大小"}
                      </button>
                      <button
                        onClick={() => removeImage(block.imageId!)}
                        className="text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-50"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="relative inline-block" style={{ width: editingImageId === block.imageId ? `${currentWidth}px` : "100%", maxWidth: "100%" }}>
                      <img
                        src={block.content}
                        alt="Content image"
                        className="w-full h-auto rounded-lg"
                        style={{ maxWidth: editingImageId === block.imageId ? `${currentWidth}px` : "100%" }}
                      />
                      {editingImageId === block.imageId && (
                        <div className="absolute -bottom-8 left-0 right-0 flex items-center gap-2 bg-white p-2 rounded shadow-lg border">
                          <Minimize2 className="w-4 h-4 text-gray-500" />
                          <input
                            type="range"
                            min="200"
                            max="1200"
                            value={currentWidth}
                            onChange={(e) => updateImageSize(block.imageId!, parseInt(e.target.value))}
                            className="flex-1"
                          />
                          <Maximize2 className="w-4 h-4 text-gray-500" />
                          <span className="text-xs text-gray-600 w-16 text-right">{currentWidth}px</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            } else {
              return (
                <div key={index} className="text-gray-700 whitespace-pre-wrap">
                  {block.content}
                </div>
              )
            }
          })}

          {blocks.length === 0 && (
            <div className="text-center text-gray-400 py-12">
              <p>还没有内容，点击"插入图片"开始添加</p>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-500">
          提示：在可视化模式下，可以拖动图片调整位置，点击"调整大小"可以修改图片宽度
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">文章内容</label>
        <div className="flex items-center gap-2">
          <label className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg cursor-pointer hover:bg-blue-700 flex items-center gap-2">
            <Upload className="w-4 h-4" />
            插入图片
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
          <button
            onClick={toggleVisualMode}
            className={`px-3 py-1.5 text-white text-sm rounded-lg ${
              showVisualMode
                ? "bg-gray-600 hover:bg-gray-700"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {showVisualMode ? "切换到文本模式" : "可视化编辑"}
          </button>
        </div>
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm"
        placeholder={placeholder}
      />
      <div className="flex items-start justify-between mt-1">
        <div className="text-xs text-gray-500 space-y-1">
          <p>• 使用 [IMAGE:路径] 插入图片，使用 [LINK:URL] 插入链接框，使用 [文字]$$URL$$ 插入行内链接</p>
          <p>• 点击"插入图片"按钮可在光标位置插入图片</p>
          <p>• 图片标记可以像普通文本一样：选中后剪切(Ctrl+X)或复制(Ctrl+C)，然后在目标位置粘贴(Ctrl+V)来移动位置</p>
          {images.length > 0 && (
            <p className="text-purple-600">• 点击"可视化编辑"按钮可以拖动图片调整位置和大小</p>
          )}
        </div>
      </div>
    </div>
  )
}

