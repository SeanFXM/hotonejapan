"use client"

import { IntroModule } from "@/types/product-config"
import { RichTextRenderer } from "@/components/admin/product-editor/rich-text-renderer"

interface IntroSectionProps {
  config: IntroModule
}

export function IntroSection({ config }: IntroSectionProps) {
  if (!config.enabled || (!config.title && !config.description && !config.video)) {
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {(config.title || config.subtitle) && (
            <div className="text-center mb-12">
              {config.title && (
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{config.title}</h2>
              )}
              {config.subtitle && (
                <h3 className="text-2xl font-bold text-gray-700 mb-6">{config.subtitle}</h3>
              )}
              <div className="flex justify-center mt-8">
                <div className="w-24 h-1 rounded-full bg-purple-600" />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Video/Image and Related Info */}
            <div className="space-y-6">
              {(config.video || config.image || config.media) && (
                <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                  {(() => {
                    // 优先使用media字段
                    const mediaSrc = config.media?.src || config.video || config.image || ""
                    const mediaType = config.media?.type
                    
                    // 检测是否是图片（通过扩展名或base64类型）
                    const isImage = 
                      mediaType === "image" ||
                      mediaSrc.startsWith("data:image/") ||
                      /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(mediaSrc)
                    
                    // 检测是否是YouTube
                    const isYouTube = 
                      mediaSrc.includes("youtube.com") || 
                      mediaSrc.includes("youtu.be")
                    
                    if (isImage) {
                      // 显示图片
                      return (
                        <img
                          src={mediaSrc}
                          alt={config.title || "Product Introduction"}
                          className="w-full h-full object-cover"
                          style={{ position: "absolute", inset: 0 }}
                        />
                      )
                    } else if (isYouTube) {
                      // 显示YouTube视频
                      return (
                        <iframe
                          width="100%"
                          height="100%"
                          src={getEmbedUrl(mediaSrc)}
                          title={`${config.title || "Product"} Introduction`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      )
                    } else {
                      // 显示本地视频
                      return (
                        <video
                          src={mediaSrc}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover pointer-events-none"
                        />
                      )
                    }
                  })()}
                </div>
              )}

              {/* Related Information */}
              {config.relatedLinks && config.relatedLinks.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <h3 className="font-bold text-gray-900 text-lg mb-4">関連情報</h3>
                  <div className="space-y-3">
                    {config.relatedLinks.map((link, index) => {
                      // 根据icon字段渲染对应的图标
                      const renderIcon = () => {
                        if (!link.icon) {
                          // 默认图标（文档）
                          return (
                            <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                          )
                        }

                        switch (link.icon) {
                          case "document":
                            return (
                              <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                              </svg>
                            )
                          case "user-filled":
                            return (
                              <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                            )
                          case "user-outline":
                            return (
                              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            )
                          case "settings":
                            return (
                              <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                              </svg>
                            )
                          case "info":
                            return (
                              <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                              </svg>
                            )
                          case "download":
                            return (
                              <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            )
                          case "link":
                            return (
                              <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                              </svg>
                            )
                          case "arrow":
                            return (
                              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                            )
                          case "dot":
                            return (
                              <div className="w-2 h-2 rounded-full bg-purple-600" />
                            )
                          default:
                            // 默认图标
                            return (
                              <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                              </svg>
                            )
                        }
                      }

                      return (
                        <a
                          key={index}
                          href={link.url}
                          className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200 block"
                        >
                          {renderIcon()}
                          <span className="text-gray-900">{link.text}</span>
                        </a>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Product Description and Features */}
            <div className="space-y-6">
              {config.description && (
                <div>
                  <div className="prose max-w-none mb-6 break-words">
                    <RichTextRenderer
                      content={config.description}
                      className="text-gray-700 leading-relaxed"
                    />
                  </div>

                  {/* Feature List */}
                  {config.features && config.features.length > 0 && (
                    <div className="space-y-2 mb-4">
                      {config.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0 overflow-wrap-anywhere">
                            <RichTextRenderer
                              content={feature}
                              className="text-gray-700 text-sm break-words whitespace-normal"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

