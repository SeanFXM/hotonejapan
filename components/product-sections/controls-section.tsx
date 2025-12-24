"use client"

import Image from "next/image"
import { ControlsModule } from "@/types/product-config"

interface ControlsSectionProps {
  config: ControlsModule
}

export function ControlsSection({ config }: ControlsSectionProps) {
  if (!config.enabled || !config.images || config.images.length === 0) {
    return null
  }

  return (
    <section id="controls" className="py-20 scroll-mt-24 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">コントロール</h2>
          <div className="flex justify-center mt-6">
            <div className="w-24 h-1 rounded-full bg-purple-600" />
          </div>
        </div>

        <div className="max-w-5xl mx-auto space-y-12">
          {config.images.map((image, index) => (
            <div key={index} className="flex justify-center">
              <div className="w-full max-w-4xl rounded-xl overflow-hidden bg-gray-100">
                <Image
                  src={image}
                  alt={`Control ${index + 1}`}
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-xl"
                  style={{ mixBlendMode: 'multiply' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

