"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BlogSlider } from "@/components/blog-slider"

const tabs = [
  { id: "news", label: "新着順" },
  { id: "announcements", label: "お知らせ" },
  { id: "support", label: "サポート情報" },
]

const categories = [
  { id: "all", label: "すべて" },
  { id: "amp", label: "アンプ" },
  { id: "guitar", label: "ギター" },
]

const products = [
  {
    id: 1,
    name: "DAM-10WH",
    category: "amp",
    description: "コンパクトギターアンプ - ホワイト",
    image: "/images/brands/divitone/products/DAM-10WH.png",
  },
  {
    id: 2,
    name: "DAM-10BK",
    category: "amp",
    description: "コンパクトギターアンプ - ブラック",
    image: "/images/brands/divitone/products/DAM-10BK.png",
  },
  {
    id: 7,
    name: "MF-Studio C Nebula Fade",
    category: "guitar",
    description: "プレミアムエレクトリックギター",
    image: "/images/brands/divitone/products/Nebula Fade.png",
  },
  {
    id: 8,
    name: "MF-Studio C Arctic Ore",
    category: "guitar",
    description: "プレミアムエレクトリックギター",
    image: "/images/brands/divitone/products/Arctic Ore.png",
  },
  {
    id: 3,
    name: "MF-Studio C Shell Pink",
    category: "guitar",
    description: "エレクトリックギター",
    image: "/images/brands/divitone/products/Shell Pink.png",
  },
  {
    id: 4,
    name: "MF-Studio C Fluorite Green",
    category: "guitar",
    description: "エレクトリックギター",
    image: "/images/brands/divitone/products/Fluorite Green.png",
  },
  {
    id: 5,
    name: "MF-Studio C Bay Area Blue",
    category: "guitar",
    description: "エレクトリックギター",
    image: "/images/brands/divitone/products/Bay Area Blue.png",
  },
  {
    id: 6,
    name: "MF-Studio C Vinci Grey",
    category: "guitar",
    description: "エレクトリックギター",
    image: "/images/brands/divitone/products/Vinci Grey.png",
  },
  {
    id: 9,
    name: "MF-Studio C Moon White",
    category: "guitar",
    description: "エレクトリックギター",
    image: "/images/brands/divitone/products/Moon White.png",
  },
]

export default function DivitonePage() {
  const [activeTab, setActiveTab] = useState("news")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Video and Brand Introduction */}
      <section className="relative w-full">
        <div className="relative h-[400px] w-full overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img src="/divitone-banner.jpg" alt="Divitone Products" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          {/* Content */}
          <div className="relative container mx-auto h-full flex items-center px-6 lg:px-12 z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
              {/* Left: YouTube Video */}
              <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl bg-black/30 backdrop-blur-sm p-[10px]">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/q09d3qxCA8M"
                  title="Divitone Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded"
                ></iframe>
              </div>

              {/* Right: Brand Description */}
              <div className="text-white space-y-3 bg-black/30 backdrop-blur-sm p-8 rounded-lg">
                <h1 className="text-2xl font-bold tracking-tight text-shadow">
                  Divitone ブランド紹介
                </h1>

                <div className="space-y-2 text-xs leading-relaxed text-shadow-sm">
                  <p>
                    Divitone は、<strong>現代デジタル技術と伝統的なギター工芸</strong>を融合した新興ブランドです。
                    ギタリストにより便利で効率的な一体化体験を提供し、多様な音色と機能を楽器に統合することで、演奏、練習、録音をより簡単にします。
                  </p>

                  <p>
                    Divitone の理念は<strong>音楽創作と演奏のハードルを下げること</strong>です。
                    初心者から中級者まで、Divitone の製品を通じて素早く上達し、さまざまな音色と表現力を探求できます。
                  </p>

                  <p>
                    同時に、Divitone
                    は演奏体験と操作の直感性にも注目し、ミュージシャンが複雑な機器操作ではなく、創作そのものに集中できることを目指しています。
                  </p>

                  <p>
                    若く可能性に満ちたブランドとして、Divitone
                    は新しい方向性を絶えず開拓し、ミュージシャンにとって信頼できるパートナーとなることを目指しています。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Products Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Products</h2>

        {/* Category Filter */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className="min-w-[120px]"
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="bg-gray-100 rounded-lg overflow-hidden mb-3 flex items-center justify-center">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="bg-gray-900 text-white p-4 rounded-lg">
                <p className="text-xs text-gray-400 mb-1">Divitone</p>
                <h3 className="font-bold text-base mb-1">{product.name}</h3>
                <p className="text-xs text-gray-400">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Artists Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Artists</h2>
        <div className="bg-gray-100 rounded-lg p-12 text-center">
          <p className="text-gray-500">アーティスト情報は準備中です</p>
        </div>
      </section>

      {/* Blog Slider */}
      <BlogSlider />
    </div>
  )
}
