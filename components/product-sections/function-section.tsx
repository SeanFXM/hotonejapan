"use client"

import Image from "next/image"
import { FunctionModule } from "@/types/product-config"
import { RichTextRenderer } from "@/components/admin/product-editor/rich-text-renderer"

interface FunctionSectionProps {
  config: FunctionModule
}

export function FunctionSection({ config }: FunctionSectionProps) {
  if (!config.enabled || !config.items || config.items.length === 0) {
    return null
  }

  return (
    <section id="function" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">主な性能</h2>

          {/* Function Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {config.items.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <Image
                    src={item.image}
                    alt={item.alt || item.title}
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">
                    {item.number}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                </div>
                {item.subtitle && (
                  <p className="text-gray-500 text-sm mb-2">{item.subtitle}</p>
                )}
                <RichTextRenderer
                  content={item.description}
                  className="text-gray-700 leading-relaxed"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

