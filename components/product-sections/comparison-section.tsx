"use client"

import Image from "next/image"
import { ComparisonModule } from "@/types/product-config"

interface ComparisonSectionProps {
  config: ComparisonModule
}

export function ComparisonSection({ config }: ComparisonSectionProps) {
  if (!config.enabled || !config.image) {
    return null
  }

  return (
    <section id="comparison" className="py-20 scroll-mt-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">比較表</h2>
          <div className="flex justify-center mt-6">
            <div className="w-24 h-1 rounded-full hotone-bar" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center">
            <Image
              src={config.image}
              alt={config.alt || "製品比較表"}
              width={1200}
              height={800}
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

