"use client"

import { SpecsModule } from "@/types/product-config"

interface SpecsSectionProps {
  config: SpecsModule
}

export function SpecsSection({ config }: SpecsSectionProps) {
  if (!config.enabled || (!config.leftColumn || config.leftColumn.length === 0) && (!config.rightColumn || config.rightColumn.length === 0)) {
    return null
  }

  return (
    <section id="specs" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">製品仕様</h2>
          <div className="bg-gray-50 rounded-xl p-8">
            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Column */}
              <div className="space-y-6">
                {config.leftColumn.map((group, index) => (
                  <div key={index} className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{group.title}</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      {Object.entries(group.items).map(([key, value]) => (
                        <p key={key}>
                          {key}：{value}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {config.rightColumn.map((group, index) => (
                  <div key={index} className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{group.title}</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      {Object.entries(group.items).map(([key, value]) => (
                        <p key={key}>
                          {key}：{value}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

