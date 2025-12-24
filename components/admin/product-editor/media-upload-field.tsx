"use client"

import { Upload } from "lucide-react"
import { MediaItem } from "@/types/product-config"

interface MediaUploadFieldProps {
  label: string
  value: MediaItem | string
  onChange: (value: MediaItem | string) => void
  accept?: string
  showTransparentOption?: boolean
  showAnimatedGifOption?: boolean
}

// 检测是否为YouTube URL
const isYouTubeUrl = (url: string): boolean => {
  return (
    url.includes("youtube.com") ||
    url.includes("youtu.be") ||
    url.includes("youtube.com/embed")
  )
}

// 转换YouTube URL为embed格式
const getEmbedUrl = (url: string): string => {
  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1].split("?")[0]
    return `https://www.youtube.com/embed/${videoId}`
  }
  if (url.includes("youtube.com/watch?v=")) {
    const videoId = url.split("v=")[1].split("&")[0]
    return `https://www.youtube.com/embed/${videoId}`
  }
  if (url.includes("youtube.com/embed/")) {
    return url
  }
  return url
}

export function MediaUploadField({
  label,
  value,
  onChange,
  accept = "image/*,video/*",
  showTransparentOption = false,
  showAnimatedGifOption = false,
}: MediaUploadFieldProps) {
  const isMediaItem = typeof value === "object" && value !== null && "type" in value
  const mediaItem = isMediaItem ? (value as MediaItem) : null
  const simpleValue = !isMediaItem ? (value as string) : ""

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      if (file.type.startsWith("image/")) {
        if (showTransparentOption || showAnimatedGifOption) {
          onChange({
            type: "image",
            src: result,
            transparentBackground: showTransparentOption ? false : undefined,
            asAnimatedGif: false,
          })
        } else {
          onChange(result)
        }
      } else if (file.type.startsWith("video/")) {
        if (showAnimatedGifOption) {
          onChange({
            type: "video",
            src: result,
            asAnimatedGif: true,
          })
        } else {
          onChange({
            type: "video",
            src: result,
          })
        }
      }
    }
    reader.readAsDataURL(file)
  }

  // 处理粘贴事件
  const handlePaste = async (e: React.ClipboardEvent<HTMLInputElement>) => {
    try {
      const clipboardData = e.clipboardData
      
      // 优先检查是否有图片文件
      const items = Array.from(clipboardData.items)
      const imageItem = items.find(item => item.type.startsWith("image/"))
      
      if (imageItem) {
        // 如果是图片，阻止默认行为并处理图片
        e.preventDefault()
        const file = imageItem.getAsFile()
        if (file) {
          const reader = new FileReader()
          reader.onload = (event) => {
            const result = event.target?.result as string
            if (showTransparentOption || showAnimatedGifOption) {
              onChange({
                type: "image",
                src: result,
                transparentBackground: showTransparentOption ? false : undefined,
                asAnimatedGif: false,
              })
            } else {
              onChange(result)
            }
          }
          reader.onerror = () => {
            console.error("读取图片文件失败")
          }
          reader.readAsDataURL(file)
          return
        }
      }
      
      // 如果是文本，不阻止默认行为，让浏览器正常粘贴
      // onChange事件会自动触发并处理粘贴的文本
      // 这样不会影响正常的输入和删除操作
    } catch (error) {
      console.error("粘贴处理失败:", error)
      // 如果出错，允许默认粘贴行为
    }
  }

  // 处理URL输入变化，自动检测YouTube链接和图片
  // 注意：在输入过程中不自动修改值，避免影响正常输入和删除
  const handleUrlChange = (url: string) => {
    // 如果输入为空，直接更新
    if (!url || url.trim() === "") {
      if (isMediaItem) {
        onChange({ ...mediaItem!, src: "" })
      } else {
        onChange("")
      }
      return
    }

    // YouTube URL - 立即转换
    if (isYouTubeUrl(url)) {
      onChange({
        type: "video",
        src: url,
        asAnimatedGif: showAnimatedGifOption ? false : undefined,
      })
      return
    }

    // base64数据 - 立即转换
    if (url.startsWith("data:")) {
      if (url.startsWith("data:image/")) {
        if (showTransparentOption || showAnimatedGifOption) {
          onChange({
            type: "image",
            src: url,
            transparentBackground: showTransparentOption ? false : undefined,
            asAnimatedGif: false,
          })
        } else {
          onChange(url)
        }
      } else if (url.startsWith("data:video/")) {
        onChange({
          type: "video",
          src: url,
          asAnimatedGif: showAnimatedGifOption ? true : false,
        })
      } else {
        if (isMediaItem) {
          onChange({ ...mediaItem!, src: url })
        } else {
          onChange(url)
        }
      }
      return
    }

    // 对于普通文本输入，直接更新值，不自动修改
    // 这样可以保证正常的输入和删除操作
    if (isMediaItem) {
      // 如果已经是MediaItem，更新src（保持类型）
      onChange({ ...mediaItem!, src: url })
    } else {
      // 作为简单字符串处理，不自动添加前缀或转换
      onChange(url)
    }
  }

  // 处理失去焦点事件，此时可以进行路径规范化
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const url = e.target.value.trim()
    if (!url) return

    // 清理路径：移除 public/ 前缀和重复的 /images/
    let cleanedUrl = url
    
    // 移除 public/ 前缀（如果存在）
    if (cleanedUrl.includes("/public/")) {
      cleanedUrl = cleanedUrl.replace(/\/public\//g, "/")
    }
    
    // 移除重复的 /images/images/
    cleanedUrl = cleanedUrl.replace(/\/images\/images\//g, "/images/")
    
    // 如果路径已经以 /images/ 开头，不再添加
    if (cleanedUrl.startsWith("/images/")) {
      // 路径已经正确，直接使用
      const isImageUrl = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(cleanedUrl)
      if (isImageUrl && (showTransparentOption || showAnimatedGifOption) && !isMediaItem) {
        onChange({
          type: "image",
          src: cleanedUrl,
          transparentBackground: showTransparentOption ? false : undefined,
        })
      } else if (cleanedUrl !== url) {
        // 如果路径被清理过，更新它
        if (isMediaItem) {
          onChange({ ...mediaItem!, src: cleanedUrl })
        } else {
          onChange(cleanedUrl)
        }
      }
      return
    }

    // 只在失去焦点时进行路径规范化（对于不以 / 开头的路径）
    if (!cleanedUrl.startsWith("http") && !cleanedUrl.startsWith("/") && !cleanedUrl.startsWith("data:")) {
      const normalizedUrl = cleanedUrl.startsWith("images/") ? `/${cleanedUrl}` : `/images/${cleanedUrl}`
      const isImageUrl = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(normalizedUrl)
      
      if (isImageUrl && (showTransparentOption || showAnimatedGifOption)) {
        onChange({
          type: "image",
          src: normalizedUrl,
          transparentBackground: showTransparentOption ? false : undefined,
        })
      } else if (isMediaItem) {
        onChange({ ...mediaItem!, src: normalizedUrl })
      } else {
        onChange(normalizedUrl)
      }
    } else if (cleanedUrl !== url) {
      // 如果路径被清理过，更新它
      const isImageUrl = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(cleanedUrl)
      if (isImageUrl && (showTransparentOption || showAnimatedGifOption) && !isMediaItem) {
        onChange({
          type: "image",
          src: cleanedUrl,
          transparentBackground: showTransparentOption ? false : undefined,
        })
      } else if (isMediaItem) {
        onChange({ ...mediaItem!, src: cleanedUrl })
      } else {
        onChange(cleanedUrl)
      }
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center gap-4">
        <input
          type="text"
          value={isMediaItem ? mediaItem?.src || "" : simpleValue}
          onChange={(e) => {
            handleUrlChange(e.target.value)
          }}
          onBlur={handleBlur}
          onPaste={handlePaste}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="/images/... 或 YouTube URL（支持粘贴）"
        />
        <label className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700">
          <Upload className="w-4 h-4 inline mr-2" />
          上传
          <input
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>
      {showTransparentOption && isMediaItem && mediaItem?.type === "image" && (
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={mediaItem.transparentBackground || false}
            onChange={(e) =>
              onChange({ ...mediaItem, transparentBackground: e.target.checked })
            }
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <span>背景透明（和模版背景一致）</span>
        </label>
      )}
      {showAnimatedGifOption && isMediaItem && (
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={mediaItem.asAnimatedGif || false}
            onChange={(e) => {
              if (mediaItem?.type === "video") {
                onChange({ ...mediaItem, asAnimatedGif: e.target.checked })
              } else if (e.target.checked) {
                // 如果勾选，需要转换为视频类型
                alert("请先上传视频文件")
              }
            }}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <span>把视频当作动图使用（自动循环播放，无法暂停）</span>
        </label>
      )}
      {isMediaItem && mediaItem?.src && (
        <div className="mt-2">
          {mediaItem.type === "image" ? (
            <img
              src={mediaItem.src}
              alt="预览"
              className="max-w-xs max-h-32 object-contain border border-gray-200 rounded"
            />
          ) : isYouTubeUrl(mediaItem.src) ? (
            <div className="max-w-xs border border-gray-200 rounded overflow-hidden">
              <iframe
                width="100%"
                height="180"
                src={getEmbedUrl(mediaItem.src)}
                title="YouTube video preview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full"
              />
            </div>
          ) : (
            <video
              src={mediaItem.src}
              className="max-w-xs max-h-32 border border-gray-200 rounded"
              controls
            />
          )}
        </div>
      )}
      {!isMediaItem && simpleValue && (
        <div className="mt-2">
          {isYouTubeUrl(simpleValue) ? (
            <div className="max-w-xs border border-gray-200 rounded overflow-hidden">
              <iframe
                width="100%"
                height="180"
                src={getEmbedUrl(simpleValue)}
                title="YouTube video preview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full"
              />
            </div>
          ) : (
            <img
              src={simpleValue}
              alt="预览"
              className="max-w-xs max-h-32 object-contain border border-gray-200 rounded"
              onError={(e) => {
                e.currentTarget.style.display = "none"
              }}
            />
          )}
        </div>
      )}
    </div>
  )
}

