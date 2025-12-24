"use client"

import { useState } from "react"
import { BlogSlider } from "@/components/blog-slider"

type Tab = "新着順" | "お知らせ" | "サポート情報"
type Category = "新着順" | "リバーブ" | "ディレイ" | "モジュレーション" | "ピッチシフター"

const tabs: Tab[] = ["新着順", "お知らせ", "サポート情報"]

const news = [
  "Klowra：新シリーズ「Artistic Pedal Collection」が登場 - 独創的なデザインと高品質サウンドの融合",
  "Klowra：限定カラーモデルの予約受付開始 - アーティストとのコラボレーションモデル",
  "Klowra：製品レビュー動画公開 - プロミュージシャンによる詳細なサウンドデモ",
  "Klowra：新製品発表会のお知らせ - 最新エフェクターシリーズをご紹介",
  "Klowra：公式SNSアカウント開設 - 最新情報をいち早くお届けします",
]

const categories: Category[] = ["新着順", "リバーブ", "ディレイ", "モジュレーション", "ピッチシフター"]

const products = [
  {
    id: 1,
    name: "Limbo Reverb",
    description: "リバーブ",
    image: "/images/brands/klowra/products/Klowra Limbo Reverb.png",
    category: "リバーブ",
  },
  {
    id: 2,
    name: "Everlast Delay",
    description: "ディレイ",
    image: "/images/brands/klowra/products/Klowra Everlast Delay.png",
    category: "ディレイ",
  },
  {
    id: 3,
    name: "Sprout Modulation",
    description: "モジュレーション",
    image: "/images/brands/klowra/products/Klowra Sprout Modulation.png",
    category: "モジュレーション",
  },
  {
    id: 4,
    name: "Vein Pitch Shifter",
    description: "ピッチシフター",
    image: "/images/brands/klowra/products/Klowra Vein Pitch Shifter.png",
    category: "ピッチシフター",
  },
]

const announcements = [
  "Klowra：製品保証期間延長のお知らせ - すべての製品の保証期間を2年に延長しました",
  "Klowra：公式オンラインストアオープンのお知らせ - 直販サイトでお得にお買い求めいただけます",
  "Klowra：年末年始休業のお知らせ - 12月29日から1月4日まで休業させていただきます",
  "Klowra：新製品体験会開催のお知らせ - 最新のエフェクターを実際にお試しいただけます",
  "Klowra：カスタムオーダー受付開始 - お好みのカラーとデザインでオーダーメイド可能",
]

const supportInfo = [
  "Klowra：製品マニュアルのダウンロードページを更新しました - 日本語版マニュアルをご確認ください",
  "Klowra：よくある質問（FAQ）ページを追加しました - 製品の使用方法やトラブルシューティングをご覧いただけます",
  "Klowra：修理・保証サービスについて - 製品の修理や保証に関する情報を掲載しています",
  "Klowra：お問い合わせ窓口のご案内 - 製品に関するご質問は専用フォームからお問い合わせください",
  "Klowra：アーティストサポートプログラム開始 - プロミュージシャン向けの特別サポートを提供",
]

const getOrderedProducts = (category: Category) => {
  if (category === "新着順") {
    return products
  }

  return products.filter((p) => p.category === category)
}

export default function KlowraPage() {
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
            <img src="/klowra-banner.jpg" alt="Klowra Products" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          <div className="relative container mx-auto h-full flex items-center px-6 lg:px-12 z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
              {/* Left: YouTube Video */}
              <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl bg-black/30 backdrop-blur-sm p-[10px]">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/ZNfHGQwMl2s?start=1"
                  title="Klowra Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded"
                ></iframe>
              </div>

              {/* Right: Brand Description */}
              <div className="text-white space-y-6 bg-black/30 backdrop-blur-sm p-8 rounded-lg">
                <h1 className="text-3xl font-bold tracking-tight text-shadow">
                  Klowra ブランド紹介
                </h1>

                <div className="space-y-4 text-sm leading-relaxed text-shadow-sm">
                  <p>
                    Klowra
                    は、創造性と情熱にあふれた音楽機材ブランドです。まだ若いブランドでありながら、すでに印象的な製品をいくつも生み出してきました。そして今も、未完成の楽曲のように、新たなアイデアやインスピレーションが絶えず育まれています。
                  </p>

                  <p>
                    チームのメンバー自身が演奏家であり、プレイヤーが「音色」と「弾き心地」にこだわる気持ちをよく理解しています。音楽の趣味はそれぞれ異なりますが、音質やプレイアビリティの追求においては常に一致しています。
                  </p>

                  <p>
                    Klowra
                    にとって、エフェクターは単なる金属ケースや基板の組み合わせではなく、創造力を引き出す「インスピレーションのツール」です。地下室でのリハーサル、ベッドルームでの宅録、そしてステージでの演奏に至るまで、音楽家の旅路を共に歩む存在でありたいと考えています。
                  </p>

                  <p className="font-medium">
                    Klowra
                    の目標はシンプルです。音楽制作をより純粋に、より自由に。そして常に、ミュージシャンが自分だけのサウンドを追い求める姿を支えていくこと。
                  </p>
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
                <p className="text-xs font-medium mb-0.5 text-gray-400">Klowra</p>
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
