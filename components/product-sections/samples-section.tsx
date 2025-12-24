"use client"

import { SamplesModule } from "@/types/product-config"

interface SamplesSectionProps {
  config: SamplesModule
}

export function SamplesSection({ config }: SamplesSectionProps) {
  if (!config.enabled || !config.samples || config.samples.length === 0) {
    return null
  }

  return (
    <section id="samples" className="py-20 scroll-mt-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">サンプルサウンド</h2>
          <div className="flex justify-center mt-6">
            <div className="w-24 h-1 rounded-full hotone-bar" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {config.samples.map((sample, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#FF6600]/30"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF6600]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="p-6 relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-hotone">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-base leading-tight">{sample.name}</h3>
                        {sample.description && (
                          <p className="text-gray-500 text-xs">{sample.description}</p>
                        )}
                      </div>
                    </div>
                    <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded-lg bg-hotone text-white">
                      {sample.preset}
                    </span>
                  </div>
                  <audio controls className="w-full h-10 rounded-lg">
                    <source src={sample.audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

