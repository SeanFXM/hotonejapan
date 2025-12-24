"use client"

import Image from "next/image"
import { ConnectionsModule } from "@/types/product-config"

interface ConnectionsSectionProps {
  config: ConnectionsModule
}

export function ConnectionsSection({ config }: ConnectionsSectionProps) {
  if (!config.enabled || !config.examples || config.examples.length === 0) {
    return null
  }

  return (
    <section id="connections" className="py-20 scroll-mt-24 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">一般的な接続例</h2>
          <div className="flex justify-center">
            <div className="w-20 h-1 rounded bg-accent-green" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto space-y-16">
          {config.examples.map((example, index) => (
            <div key={index}>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                {example.title}
              </h3>
              <div className="flex justify-center">
                <Image
                  src={example.image}
                  alt={example.alt || example.title}
                  width={1600}
                  height={800}
                  className="w-full max-w-3xl"
                />
              </div>
              {example.description && (
                <p className="text-gray-600 text-center mt-4">{example.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

