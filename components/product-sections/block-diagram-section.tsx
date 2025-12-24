"use client"

import Image from "next/image"
import { BlockDiagramModule } from "@/types/product-config"

interface BlockDiagramSectionProps {
  config: BlockDiagramModule
}

export function BlockDiagramSection({ config }: BlockDiagramSectionProps) {
  if (!config.enabled || !config.image) {
    return null
  }

  return (
    <section id="block-diagram" className="py-20 scroll-mt-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">ブロック図</h2>
          <div className="flex justify-center mt-6">
            <div className="w-24 h-1 rounded-full hotone-bar" />
          </div>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center">
            <Image
              src={config.image}
              alt={config.alt || "ブロック図"}
              width={600}
              height={400}
              className="rounded-lg w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

