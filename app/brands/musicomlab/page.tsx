"use client"

import { useState } from "react"
import Link from "next/link"
import { BlogSlider } from "@/components/blog-slider"

type Tab = "新着順" | "お知らせ" | "サポート情報"
type Category = "製品一覧" | "オーディオ・スイッチャー" | "オーディオ・バッファー" | "ステレオ・ミキサー" | "生産完了品"

const tabs: Tab[] = ["新着順", "お知らせ", "サポート情報"]

const news = [
  "MusicomLAB：新製品情報を随時更新中です",
  "MusicomLAB：EFXシリーズの最新ファームウェアが公開されました",
  "MusicomLAB：製品マニュアルのダウンロードページを更新しました",
  "MusicomLAB：エディターソフトウェアの最新版がリリースされました",
  "MusicomLAB：製品デモ動画を公式サイトで公開中です",
]

const categories: Category[] = [
  "製品一覧",
  "オーディオ・スイッチャー",
  "オーディオ・バッファー",
  "ステレオ・ミキサー",
  "生産完了品",
]

const products: Array<{
  id: number
  name: string
  description: string
  image: string
  category: string
  discontinued: boolean
  link?: string
}> = [
  // Current Products
  {
    id: 1,
    name: "EFX-10D",
    description: "オーディオ・スイッチャー",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qGW7kZwly601j709UyXtxeOiMmKxd3.png",
    category: "オーディオ・スイッチャー",
    discontinued: false,
    link: "/brands/musicomlab/products/efx-10d",
  },
  {
    id: 2,
    name: "Parallelizer II",
    description: "ステレオ・ミキサー",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jTOyYlhpfe3PZaZ25xFsFDc18I1AJI.png",
    category: "ステレオ・ミキサー",
    discontinued: false,
    link: "/brands/musicomlab/products/parallelizer-ii",
  },
  {
    id: 3,
    name: "MTX-5",
    description: "MIDIコントローラー",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BavgCNp6iunbYmY0UN8Q5ofGly8gkU.png",
    category: "MIDIコントローラー",
    discontinued: false,
    link: "/brands/musicomlab/products/mtx-5",
  },
  {
    id: 4,
    name: "EFX MK-VI",
    description: "オーディオ・スイッチャー",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UlqaOCUAVZGukeHI847b1RYhY7x2qq.png",
    category: "オーディオ・スイッチャー",
    discontinued: false,
    link: "/brands/musicomlab/products/efx-mk-vi",
  },
  {
    id: 5,
    name: "SYSTEM INTERFACE",
    description: "オーディオ・バッファー",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Xqhnm6fUYQa13qnLh1nHAg93R9MYiR.png",
    category: "オーディオ・バッファー",
    discontinued: false,
    link: "/brands/musicomlab/products/system-interface-si-01",
  },
  // Discontinued Products
  {
    id: 6,
    name: "EFX-ME",
    description: "オーディオ・スイッチャー",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Sbu2as0T7lQr7CpTJCvbwOuutpcohp.png",
    category: "オーディオ・スイッチャー",
    discontinued: true,
  },
  {
    id: 7,
    name: "EFX-LE II",
    description: "オーディオ・スイッチャー",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QNhAMeTuLFLt2mNBauXtTDC2U6Koi3.png",
    category: "オーディオ・スイッチャー",
    discontinued: true,
  },
  {
    id: 8,
    name: "EFX MK-V",
    description: "オーディオ・スイッチャー",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1yzEGvbZpFuLsGywR2Iq30XQqIAvmm.png",
    category: "オーディオ・スイッチャー",
    discontinued: true,
  },
  {
    id: 9,
    name: "Parallelizer",
    description: "ステレオ・ミキサー",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GaHIp1zh1ZuMlLnFFNNc0qBESARDNG.png",
    category: "ステレオ・ミキサー",
    discontinued: true,
  },
  {
    id: 10,
    name: "EFX-LE",
    description: "オーディオ・スイッチャー",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YihGoqZgXcO5Yeczxrx0R0oFixubFF.png",
    category: "オーディオ・スイッチャー",
    discontinued: true,
  },
]

const announcements = [
  "MusicomLAB：製品に関する最新情報は随時更新いたします",
  "MusicomLAB：お問い合わせは専用フォームからお願いいたします",
  "MusicomLAB：年末年始の営業日程についてのお知らせ",
  "MusicomLAB：製品保証期間と修理サービスについて",
  "MusicomLAB：正規販売店リストを更新しました",
]

const supportInfo = [
  "MusicomLAB：製品マニュアルのダウンロードページをご確認ください",
  "MusicomLAB：ファーウェアアップデート方法のご案内",
  "MusicomLAB：お問い合わせ窓口のご案内",
  "MusicomLAB：よくある質問（FAQ）ページをご活用ください",
  "MusicomLAB：製品登録とユーザーサポートについて",
]

const getOrderedProducts = (category: Category) => {
  if (category === "製品一覧") {
    // Show only current products (not discontinued)
    return products.filter((p) => !p.discontinued)
  }

  if (category === "生産完了品") {
    // Show only discontinued products
    return products.filter((p) => p.discontinued)
  }

  // For specific categories, show only current products (exclude discontinued)
  return products.filter((p) => p.category === category && !p.discontinued)
}

export default function MusicomlabPage() {
  const [activeTab, setActiveTab] = useState<Tab>("新着順")
  const [activeCategory, setActiveCategory] = useState<Category>("製品一覧")

  const filteredProducts = getOrderedProducts(activeCategory)

  return (
    <div className="min-h-screen bg-white">
      {/* Brand Introduction Banner */}
      <section className="relative w-full">
        <div className="relative h-[400px] w-full overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="/images/design-mode/image.png"
              alt="MusicomLAB Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* Content */}
          <div className="relative container mx-auto h-full flex items-center px-6 lg:px-12 z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
              {/* Left: Product Photo */}
              <div className="relative h-[360px] rounded-lg overflow-hidden shadow-2xl flex items-center justify-center">
                <img
                  src="/musicomlab-efx-mkv.png"
                  alt="MusicomLAB EFX Mk-V"
                  className="w-full h-full object-contain bg-black"
                />
              </div>

              {/* Right: Brand Description */}
              <div className="text-white space-y-6 bg-black/30 backdrop-blur-sm p-8 rounded-lg">
                <h1 className="text-4xl font-bold tracking-tight text-shadow">
                  MusicomLAB
                </h1>

                <h2 className="text-2xl font-bold leading-tight text-shadow-sm">
                  必要な機能を網羅した、究極の高音質スイッチャー
                </h2>

                <div className="space-y-4 text-base leading-relaxed text-shadow-sm">
                  <p>
                    EFXシリーズは、プロフェッショナル・プレイヤーが必要なスイッチング＆MIDI機能を網羅した究極のオーディオ・コントローラーです。
                  </p>

                  <p>
                    Windows、Mac両OS用のエディターソフトウェアが用意されており、プリセット毎のMIDI設定（CC、PC＆エクスプレッション）、ループの入れ替え、ボリュームループ等、複雑なプログラミングもMIDIインターフェースからPCで簡単に行えます。さらに、保存したファイルはアップ＆ダウンロードが可能です。
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
              className={`px-6 py-2 text-sm font-medium rounded transition-colors ${
                activeCategory === category ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredProducts.map((product, index) => (
            <Link
              key={`${activeCategory}-${product.id}`}
              href={product.link || "#"}
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
                <p className="text-xs font-medium mb-0.5 text-gray-400">MusicomLAB</p>
                <p className="text-sm font-bold mb-1 leading-tight">{product.name}</p>
                <p className="text-xs text-gray-400 leading-tight">{product.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Blog Slider */}
      <BlogSlider />
    </div>
  )
}
