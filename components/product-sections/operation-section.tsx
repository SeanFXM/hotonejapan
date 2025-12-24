"use client"

import Image from "next/image"
import { OperationModule } from "@/types/product-config"
import { RichTextRenderer } from "@/components/admin/product-editor/rich-text-renderer"

interface OperationSectionProps {
  config: OperationModule
}

export function OperationSection({ config }: OperationSectionProps) {
  if (!config.enabled || !config.items || config.items.length === 0) {
    return null
  }

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

  return (
    <section id="operation" className="py-20 scroll-mt-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">オペレーション</h2>
          <div className="flex justify-center mt-6">
            <div className="w-24 h-1 rounded-full hotone-bar" />
          </div>
        </div>
        <div className="max-w-4xl mx-auto space-y-12">
          {config.items.map((item, index) => (
            <div key={index}>
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-start ${
                  index > 0 ? "border-t border-gray-200 pt-12" : ""
                }`}
              >
                {/* Media */}
                <div
                  className={`flex justify-center ${
                    item.imagePosition === "right" ? "md:order-2" : ""
                  }`}
                >
                  {item.media.type === "image" ? (
                    <Image
                      src={item.media.src}
                      alt={item.media.alt || item.title || "Operation"}
                      width={400}
                      height={300}
                      className={`w-full max-w-sm ${
                        item.media.transparentBackground ? "bg-transparent" : ""
                      }`}
                      style={
                        item.media.transparentBackground
                          ? { backgroundColor: "transparent" }
                          : undefined
                      }
                    />
                  ) : item.media.asAnimatedGif ? (
                    <video
                      src={item.media.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full max-w-sm pointer-events-none"
                    />
                  ) : (
                    <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg w-full max-w-2xl">
                      <iframe
                        width="100%"
                        height="100%"
                        src={getEmbedUrl(item.media.src)}
                        title={item.title || "Operation Video"}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  )}
                </div>

                {/* Text Content */}
                <div className={item.imagePosition === "right" ? "md:order-1" : ""}>
                  {item.title && (
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  )}
                  <div className="space-y-4">
                    <RichTextRenderer
                      content={item.content}
                      className="text-gray-700 leading-relaxed text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

