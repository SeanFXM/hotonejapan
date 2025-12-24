"use client"

import { useState } from "react"
import { BlogSlider } from "@/components/blog-slider"

type Tab = "新着順" | "お知らせ" | "サポート情報"
type Category = "新着順" | "ケース・バッグ" | "保管システム" | "スタジオ家具"

const tabs: Tab[] = ["新着順", "お知らせ", "サポート情報"]

const news = [
  "Soundmaker：新型ギター保管キャビネットが登場 - 温度・湿度管理機能を搭載",
  "Soundmaker：DTM編曲デスクの新モデルが発売開始",
  "Soundmaker：エルゴノミックチェアW-257が好評発売中",
]

const categories: Category[] = ["新着順", "ケース・バッグ", "保管システム", "スタジオ家具"]

const products = [
  {
    id: 1,
    name: "エフェクターケース",
    description: "コンパクトで持ち運びやすいエフェクター収納ケース",
    image: "/images/brands/soundmaker/products/エフェクターケース .png",
    category: "ケース・バッグ",
  },
  {
    id: 2,
    name: "大容量エレキギターソフトケース",
    description: "大容量で機能的なギター用ソフトケース",
    image: "/images/brands/soundmaker/products/大容量:エレキギターソフトケース.png",
    category: "ケース・バッグ",
  },
  {
    id: 3,
    name: "ギターケース",
    description: "温度・湿度管理機能を備えたプロフェッショナルギター展示・保管キャビネット",
    image: "/images/brands/soundmaker/products/MMF-1.png",
    category: "保管システム",
  },
  {
    id: 4,
    name: "DTM編曲デスク",
    description: "音楽制作に最適化された多機能ワークステーション",
    image: "/images/brands/soundmaker/products/DTM編曲デスク.png",
    category: "スタジオ家具",
  },
  {
    id: 5,
    name: "エルゴノミックチェア W-257",
    description: "長時間の作業に最適な人体工学設計チェア",
    image: "/images/brands/soundmaker/products/エルゴノミックチェア W-257 .png",
    category: "スタジオ家具",
  },
]

const announcements = [
  "Soundmaker：製品保証期間延長のお知らせ - すべての製品の保証期間を2年に延長しました",
  "Soundmaker：公式オンラインストアオープンのお知らせ",
]

const supportInfo = [
  "Soundmaker：製品マニュアルのダウンロードページを更新しました",
  "Soundmaker：よくある質問（FAQ）ページを追加しました",
]

const getOrderedProducts = (category: Category) => {
  if (category === "新着順") {
    return products
  }
  return products.filter((p) => p.category === category)
}

export default function SoundmakerPage() {
  const [activeTab, setActiveTab] = useState<Tab>("新着順")
  const [activeCategory, setActiveCategory] = useState<Category>("新着順")

  const filteredProducts = getOrderedProducts(activeCategory)

  return (
    <div className="min-h-screen bg-white">
      {/* Brand Introduction Banner */}
      <section className="relative w-full">
        <div className="relative h-[400px] w-full overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img src="/soundmaker-banner.jpg" alt="Soundmaker Studio" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          {/* Content */}
          <div className="relative container mx-auto h-full flex items-center px-6 lg:px-12 z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
              {/* Left: YouTube Video */}
              <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl bg-black/30 backdrop-blur-sm p-[10px]">
                <iframe
                  src="https://www.youtube.com/embed/qEDETZdjA_8"
                  title="Soundmaker Brand Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded"
                ></iframe>
              </div>

              {/* Right: Brand Description */}
              <div className="text-white space-y-3 bg-black/30 backdrop-blur-sm p-8 rounded-lg">
                <h1 className="text-2xl font-bold tracking-tight text-shadow">
                  SoundMaker ブランド紹介
                </h1>

                <div className="space-y-2 text-xs leading-relaxed text-shadow-sm">
                  <p>
                    SoundMaker は、<strong>音楽制作環境のデザイン</strong> に特化したブランドです。
                  </p>

                  <p>
                    私たちは、音楽はインスピレーションや技術だけでなく、快適で合理的な制作空間からも生まれると信じています。私たちの使命は、音楽家やクリエイターが{" "}
                    <strong>効率的で、快適かつ専門的な制作環境</strong>{" "}
                    を得られるよう支援することです。そのことで、音楽そのものに集中できる環境を提供します。
                  </p>

                  <p>
                    ホームスタジオからプロフェッショナルな制作環境まで、SoundMaker
                    は常に「インスピレーションを生み出す空間づくり」に力を注いでいます。
                  </p>

                  <div className="pt-1">
                    <p className="font-bold mb-2">私たちのこだわり</p>
                    <ul className="space-y-1 text-xs">
                      <li>
                        • <strong>空間と機能のバランス</strong> —— すべての機材に最適な場所を。
                      </li>
                      <li>
                        • <strong>美学と快適性の融合</strong> —— 実用性だけでなく、創作意欲を刺激するデザインを。
                      </li>
                      <li>
                        • <strong>音楽人のために</strong> ——
                        私たちは自身も音楽愛好者であり、創作時に求められる自由と集中を理解しています。
                      </li>
                    </ul>
                  </div>

                  <div className="pt-1">
                    <p className="font-bold mb-2">ビジョン</p>
                    <p>SoundMaker の願いはシンプルです。音楽制作をもっと純粋に、もっと自由に。</p>
                    <p>そして、どんな場所でも、ミュージシャンにとって理想の「音楽工房」に変えていくことです。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Products Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Products</h2>
          <div className="flex justify-center">
            <div className="h-1 w-24 bg-blue-500 rounded-full"></div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 text-sm font-medium rounded transition-colors ${
                activeCategory === category ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={`${activeCategory}-${product.id}`}
              className="group cursor-pointer animate-fadeIn"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: "both",
              }}
            >
              <div className="bg-gray-100 rounded-lg overflow-hidden mb-3 flex items-center justify-center">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="bg-gray-900 text-white p-3 rounded-lg">
                <p className="text-xs font-medium mb-0.5 text-gray-400">Soundmaker</p>
                <p className="text-sm font-bold mb-1 leading-tight">{product.name}</p>
                <p className="text-xs text-gray-400 leading-tight">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blog Slider */}
      <BlogSlider />
    </div>
  )
}
