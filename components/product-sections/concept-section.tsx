"use client"

import Image from "next/image"
import { ConceptModule } from "@/types/product-config"
import { RichTextRenderer } from "@/components/admin/product-editor/rich-text-renderer"

interface ConceptSectionProps {
  config: ConceptModule
}

export function ConceptSection({ config }: ConceptSectionProps) {
  if (!config.enabled || !config.sections || config.sections.length === 0) {
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
    <section id="concept" className="scroll-mt-24 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Title */}
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">製品コンセプト</h3>
          <div className="flex justify-center mt-6">
            <div className="w-24 h-1 rounded-full bg-purple-600" />
          </div>
        </div>

        {/* Sections */}
        <div className="mb-20 space-y-20">
          {config.sections.map((section, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index > 0 ? "border-t border-gray-700 pt-20" : ""
              }`}
            >
              {/* Media (Image or Video) */}
              <div
                className={`flex justify-center ${
                  section.imagePosition === "right" ? "lg:order-2" : ""
                }`}
              >
                {section.media.type === "image" ? (
                  <Image
                    src={section.media.src}
                    alt={section.media.alt || section.title || "Concept"}
                    width={600}
                    height={600}
                    className={`w-full h-auto rounded-xl ${
                      section.media.transparentBackground ? "bg-transparent" : ""
                    }`}
                    style={
                      section.media.transparentBackground
                        ? { backgroundColor: "transparent" }
                        : undefined
                    }
                  />
                ) : section.media.asAnimatedGif ? (
                  <video
                    src={section.media.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto rounded-xl pointer-events-none"
                    style={{ maxWidth: "800px" }}
                  />
                ) : (
                  <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg w-full max-w-2xl">
                    <iframe
                      width="100%"
                      height="100%"
                      src={getEmbedUrl(section.media.src)}
                      title={section.title || "Concept Video"}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                )}
              </div>

              {/* Text Content */}
              <div className={section.imagePosition === "right" ? "lg:order-1" : ""}>
                {section.title && (
                  <h4 className="text-2xl font-bold text-white mb-4">{section.title}</h4>
                )}
                {section.subtitle && (
                  <h5 className="text-xl font-bold text-white mb-6">{section.subtitle}</h5>
                )}
                <RichTextRenderer
                  content={section.content}
                  className="text-gray-400 leading-relaxed"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

