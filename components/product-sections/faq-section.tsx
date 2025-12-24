"use client"

import { useState } from "react"
import Image from "next/image"
import { FAQModule } from "@/types/product-config"
import { RichTextRenderer } from "@/components/admin/product-editor/rich-text-renderer"

interface FAQSectionProps {
  config: FAQModule
}

export function FAQSection({ config }: FAQSectionProps) {
  const [expandedFaq, setExpandedFaq] = useState<{ [key: string]: boolean }>({})

  if (!config.enabled || !config.items || config.items.length === 0) {
    return null
  }

  const toggleFaq = (key: string) => {
    setExpandedFaq((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  // 将FAQ项分成两列
  const midPoint = Math.ceil(config.items.length / 2)
  const leftColumn = config.items.slice(0, midPoint)
  const rightColumn = config.items.slice(midPoint)

  return (
    <section id="faq" className="py-20 scroll-mt-24 bg-gray-200">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">よくある質問</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              {leftColumn.map((item, index) => {
                const key = `faq-${index}`
                const isExpanded = expandedFaq[key]

                return (
                  <div key={index} className="bg-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleFaq(key)}
                      className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-400 transition-colors rounded-lg"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {item.number}
                        </span>
                        <div className="flex-1 text-left">
                          <RichTextRenderer
                            content={item.question}
                            className="font-medium text-gray-900"
                          />
                        </div>
                      </div>
                      <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">
                        {isExpanded ? '−' : '+'}
                      </span>
                    </button>
                    {isExpanded && (
                      <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4">
                        <div className="space-y-4">
                          <RichTextRenderer
                            content={item.answer}
                            className="text-gray-700 leading-relaxed"
                          />
                        </div>
                        {item.images && item.images.length > 0 && (
                          <div className="space-y-4">
                            {item.images.map((image, imgIndex) => (
                              <div key={imgIndex} className="flex justify-center">
                                <Image
                                  src={image}
                                  alt={`FAQ ${item.number} Image ${imgIndex + 1}`}
                                  width={800}
                                  height={500}
                                  className="rounded-lg w-full h-auto"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {rightColumn.map((item, index) => {
                const key = `faq-${midPoint + index}`
                const isExpanded = expandedFaq[key]

                return (
                  <div key={index} className="bg-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleFaq(key)}
                      className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-400 transition-colors rounded-lg"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {item.number}
                        </span>
                        <div className="flex-1 text-left">
                          <RichTextRenderer
                            content={item.question}
                            className="font-medium text-gray-900"
                          />
                        </div>
                      </div>
                      <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">
                        {isExpanded ? '−' : '+'}
                      </span>
                    </button>
                    {isExpanded && (
                      <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4">
                        <div className="space-y-4">
                          <RichTextRenderer
                            content={item.answer}
                            className="text-gray-700 leading-relaxed"
                          />
                        </div>
                        {item.images && item.images.length > 0 && (
                          <div className="space-y-4">
                            {item.images.map((image, imgIndex) => (
                              <div key={imgIndex} className="flex justify-center">
                                <Image
                                  src={image}
                                  alt={`FAQ ${item.number} Image ${imgIndex + 1}`}
                                  width={800}
                                  height={500}
                                  className="rounded-lg w-full h-auto"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

