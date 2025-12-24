"use client"

import Image from "next/image"
import { BrandConfig, ContentItem } from "@/types/brand-config"

interface BrandTabsContentProps {
  config: BrandConfig
  activeTab: "新着順" | "お知らせ" | "サポート情報"
}

export function BrandTabsContent({ config, activeTab }: BrandTabsContentProps) {
  // 转换YouTube URL为embed格式
  const getEmbedUrl = (url: string) => {
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1].split("?")[0]
      return `https://www.youtube.com/embed/${videoId}`
    }
    if (url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("v=")[1].split("&")[0]
      return `https://www.youtube.com/embed/${videoId}`
    }
    return url
  }

  const renderContentItem = (item: ContentItem, index: number) => {
    return (
      <div key={item.id} className="py-4 border-b border-gray-700 last:border-0">
        {item.type === "text" && (
          <div>
            {item.title && (
              <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
            )}
            {item.content && (
              <div
                className="text-sm leading-relaxed text-gray-300"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            )}
          </div>
        )}

        {item.type === "image" && item.image && (
          <div>
            {item.title && (
              <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
            )}
            <Image
              src={item.image}
              alt={item.title || "Image"}
              width={800}
              height={600}
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}

        {item.type === "video" && item.video && (
          <div>
            {item.title && (
              <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
            )}
            {item.video.startsWith("http") && (item.video.includes("youtube.com") || item.video.includes("youtu.be")) ? (
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={getEmbedUrl(item.video)}
                  title={item.title || "Video"}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            ) : (
              <video
                src={item.video}
                controls
                className="w-full rounded-lg"
              />
            )}
          </div>
        )}

        {item.type === "mixed" && (
          <div className="space-y-4">
            {item.title && (
              <h4 className="text-lg font-semibold text-white">{item.title}</h4>
            )}
            {item.content && (
              <div
                className="text-sm leading-relaxed text-gray-300"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            )}
            {item.image && (
              <Image
                src={item.image}
                alt={item.title || "Image"}
                width={800}
                height={600}
                className="w-full h-auto rounded-lg"
              />
            )}
            {item.video && (
              item.video.startsWith("http") && (item.video.includes("youtube.com") || item.video.includes("youtu.be")) ? (
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={getEmbedUrl(item.video)}
                    title={item.title || "Video"}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              ) : (
                <video
                  src={item.video}
                  controls
                  className="w-full rounded-lg"
                />
              )
            )}
          </div>
        )}

        {item.type === "link" && item.link && (
          <div>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-lg font-semibold flex items-center gap-2"
            >
              {item.linkText || item.link}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            {item.content && (
              <div
                className="text-sm leading-relaxed text-gray-300 mt-2"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            )}
          </div>
        )}

        <div className="text-xs text-gray-500 mt-2">
          {new Date(item.createdAt).toLocaleString("ja-JP")}
        </div>
      </div>
    )
  }

  const getTabContent = () => {
    switch (activeTab) {
      case "新着順":
        return config.news.items
      case "お知らせ":
        return config.announcements.items
      case "サポート情報":
        return config.supportInfo.items
      default:
        return []
    }
  }

  const items = getTabContent()

  if (items.length === 0) {
    return (
      <div className="bg-gray-900 text-white p-8 rounded-lg">
        <p className="text-center text-gray-400">暂无内容</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 text-white p-8 rounded-lg space-y-4">
      {items.map((item, index) => renderContentItem(item, index))}
    </div>
  )
}

