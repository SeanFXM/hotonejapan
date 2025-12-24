"use client"

import { DemoModule } from "@/types/product-config"

interface DemoSectionProps {
  config: DemoModule
}

export function DemoSection({ config }: DemoSectionProps) {
  if (!config.enabled || !config.videos || config.videos.length === 0) {
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

  const columns = config.columns || 2
  const gridClass = columns === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

  return (
    <section id="demo" className="py-20 scroll-mt-24 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">デモムービー</h2>
          <div className="flex justify-center mt-6">
            <div className="w-24 h-1 rounded-full hotone-bar" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className={`grid ${gridClass} gap-6`}>
            {config.videos.map((video, index) => (
              <div key={index} className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src={getEmbedUrl(video)}
                  title={`Demo Video ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

