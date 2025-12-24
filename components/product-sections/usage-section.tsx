"use client"

import Image from "next/image"
import { UsageModule } from "@/types/product-config"

interface UsageSectionProps {
  config: UsageModule
}

export function UsageSection({ config }: UsageSectionProps) {
  if (!config.enabled || !config.examples || config.examples.length === 0) {
    return null
  }

  return (
    <section id="usage" className="py-20 scroll-mt-24 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">使用例</h2>
          <div className="flex justify-center mt-6">
            <div className="w-24 h-1 rounded-full hotone-bar" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {config.examples.map((example, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="bg-gray-300 px-6 py-3 flex justify-between items-center">
                  <h3 className="font-bold text-gray-900">{example.title}</h3>
                  <span className="text-2xl font-bold text-gray-400">{example.number}</span>
                </div>
                <div className="p-4">
                  <Image
                    src={example.image}
                    alt={example.alt || example.title}
                    width={600}
                    height={400}
                    className="w-full rounded"
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

