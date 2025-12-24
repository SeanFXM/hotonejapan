"use client"

import { useState } from "react"
import Image from "next/image"
import { SoftwareModule } from "@/types/product-config"

interface SoftwareSectionProps {
  config: SoftwareModule
}

export function SoftwareSection({ config }: SoftwareSectionProps) {
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({})

  if (!config.enabled || !config.items || config.items.length === 0) {
    return null
  }

  const toggleItem = (key: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <section id="software" className="py-20 scroll-mt-24 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">ソフトウェア・ダウンロード</h2>
          <div className="flex justify-center mt-6">
            <div className="w-24 h-1 rounded-full bg-blue-500" />
          </div>
        </div>

        {config.headerImage && (
          <div className="max-w-6xl mx-auto mb-16">
            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <div className="aspect-[16/7] rounded-xl overflow-hidden relative">
                <Image
                  src={config.headerImage}
                  alt="Software Interface"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto space-y-4">
          {config.items.map((item, index) => {
            const itemKey = `software-${index}`
            const isExpanded = expandedItems[itemKey]

            return (
              <details
                key={index}
                className="group bg-gray-200 rounded-xl overflow-hidden"
                open={isExpanded}
                onToggle={() => toggleItem(itemKey)}
              >
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-300 transition-colors">
                  <div className="flex items-center gap-4">
                    {item.icon && (
                      <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )}
                    <div className="flex items-center gap-3">
                      <span className="text-base font-medium text-gray-900">{item.title}</span>
                      {item.isNew && (
                        <span className="px-2 py-0.5 bg-red-600 text-white text-xs font-bold rounded">
                          New!
                        </span>
                      )}
                    </div>
                  </div>
                  <svg
                    className="w-6 h-6 text-gray-700 transition-transform group-open:rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 pt-4 bg-white space-y-6">
                  {item.image && (
                    <div className="w-full rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={1200}
                        height={600}
                        className="w-full h-auto"
                      />
                    </div>
                  )}

                  {item.content && (
                    <p className="text-gray-700 text-sm mb-6">{item.content}</p>
                  )}

                  {item.features && item.features.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-gray-900">【 新機能 】</h3>
                      <div className="space-y-3">
                        {item.features.map((feature, idx) => (
                          <div key={idx} className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-700 text-white text-xs flex items-center justify-center font-medium">
                              {idx + 1}
                            </span>
                            <p className="text-gray-800 text-sm leading-relaxed">{feature}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {item.improvements && item.improvements.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-gray-900">【 改善点 】</h3>
                      <div className="space-y-3">
                        {item.improvements.map((improvement, idx) => (
                          <div key={idx} className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-700 text-white text-xs flex items-center justify-center font-medium">
                              {idx + 1}
                            </span>
                            <p className="text-gray-800 text-sm leading-relaxed">{improvement}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {item.downloadUrl && (
                    <button
                      onClick={() => window.open(item.downloadUrl, '_blank')}
                      className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-8 py-3 rounded-lg transition-colors text-base"
                    >
                      {item.downloadText || "ダウンロード"}
                    </button>
                  )}

                  {item.notice && (
                    <p className="text-gray-600 text-sm">{item.notice}</p>
                  )}

                  {item.linkText && item.linkUrl && (
                    <a
                      href={item.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-red-500 hover:underline"
                    >
                      {item.linkText}
                    </a>
                  )}
                </div>
              </details>
            )
          })}
        </div>
      </div>
    </section>
  )
}

