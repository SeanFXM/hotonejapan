"use client"

import Image from "next/image"

const products = [
  {
    id: 1,
    name: "Ampero One",
    category: "マルチエフェクター",
    image: "/products/ampero-white.png",
  },
  {
    id: 2,
    name: "Ampero Control",
    category: "フットコントローラー",
    image: "/products/footswitch-black.png",
  },
  {
    id: 3,
    name: "Ampero II Stomp",
    category: "マルチエフェクター",
    image: "/products/ampero-black.png",
  },
  {
    id: 4,
    name: "Ravo",
    category: "Bluetoothスピーカー",
    image: "/products/speaker-vintage.png",
  },
  {
    id: 5,
    name: "Soul Press II",
    category: "エクスプレッションペダル",
    image: "/products/expression-pedal-black.png",
  },
  {
    id: 6,
    name: "Soul Press",
    category: "ワウペダル",
    image: "/products/wah-pedal-purple.png",
  },
  {
    id: 7,
    name: "Ampero Control",
    category: "フットコントローラー",
    image: "/products/footswitch-black.png",
  },
  {
    id: 8,
    name: "POQ-1",
    category: "オクターバー",
    image: "/products/poq-white.png",
  },
  {
    id: 9,
    name: "Ampero One",
    category: "マルチエフェクター",
    image: "/products/ampero-white.png",
  },
  {
    id: 10,
    name: "Ravo",
    category: "Bluetoothスピーカー",
    image: "/products/speaker-vintage.png",
  },
]

export function ProductsShowcase() {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-gray-900">Products</h2>
          <div className="flex justify-center mb-4">
            <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
          <p className="text-sm md:text-base text-gray-600 tracking-wide">製品ラインナップ</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden bg-gray-50 transition-all duration-300 hover:-translate-y-2 aspect-square shadow-[0_2px_8px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08),0_16px_48px_rgba(0,0,0,0.12)]"
            >
              <div className="absolute inset-0 p-8 flex items-center justify-center">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white font-semibold text-sm mb-1">{product.name}</h3>
                <p className="text-white/80 text-xs">{product.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
