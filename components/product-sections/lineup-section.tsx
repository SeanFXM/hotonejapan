"use client"

import Image from "next/image"
import { LineupModule } from "@/types/product-config"

interface LineupSectionProps {
  config: LineupModule
}

export function LineupSection({ config }: LineupSectionProps) {
  if (!config.enabled || !config.products || config.products.length === 0) {
    return null
  }

  return (
    <section id="lineup" className="py-20 scroll-mt-24 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">製品ラインナップ</h2>
          <div className="flex justify-center mt-6">
            <div className="w-24 h-1 rounded-full bg-accent-lime" />
          </div>
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {config.products.map((product, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="bg-gray-300 px-6 py-3">
                  <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                </div>
                <div className="p-6">
                  <div className="bg-white flex items-center justify-center mb-6">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="object-contain"
                    />
                  </div>
                  <div className="space-y-2 text-gray-800">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <p key={key}>
                        <span className="font-medium">{key}：</span>
                        {value}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

