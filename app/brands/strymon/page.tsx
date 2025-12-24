"use client"

import { useState } from "react"
import { BlogSlider } from "@/components/blog-slider"

type Tab = "新着順" | "お知らせ" | "サポート情報"
type Category =
  | "新着順"
  | "ドライブ系"
  | "モジュレーション系"
  | "ディレイ系"
  | "リバーブ系"
  | "アクセサリー"
  | "生産完了品"

const tabs: Tab[] = ["新着順", "お知らせ", "サポート情報"]

const news = [
  "strymon：Karplus-Strongシンセシスを採用したユーロラック・ボイス・モジュール「SuperKar+」が登場",
  "strymon：XLRはもちろん「Mic / Line」のレベル切り替えができるステレオプレ・アクティブ・ステレオ・DI「PCH」が登場",
  "strymon：チューブプリの音がそのまま使えるクラシックな60年代のテープエコーサウンド「EC-1」が登場",
  "strymon：リバーブの2倍同時使用、10秒までのR/Tキャパビリティ、すべてが刷新されたリバーブ「BigSky MX」が登場",
  "strymon：60年代のあのビンテージ・バイブのサウンドをモダンに蘇らせた「ULTRAVIOLET」が登場",
]

const categories: Category[] = [
  "新着順",
  "ドライブ系",
  "モジュレーション系",
  "ディレイ系",
  "リバーブ系",
  "アクセサリー",
  "生産完了品",
]

const products = [
  {
    id: 3,
    name: "SuperKar+",
    description: "ユーロラック・ボイス・モジュール",
    image: "/images/brands/strymon/products/superkar_s.jpg",
    category: "モジュレーション系",
    link: "/brands/strymon/products/superkar-plus",
  },
  {
    id: 2,
    name: "PCH",
    description: "アクティブDI",
    image: "/images/brands/strymon/products/pch_s.jpg",
    category: "アクセサリー",
    link: "/brands/strymon/products/pch",
  },
  {
    id: 5,
    name: "EC-1",
    description: "dTape エコー",
    image: "/images/brands/strymon/products/ec1_s.jpg",
    category: "ディレイ系",
    link: "/brands/strymon/products/ec-1",
  },
  {
    id: 4,
    name: "BigSky MX",
    description: "リバーブ",
    image: "/images/brands/strymon/products/bigskymx_s.jpg",
    category: "リバーブ系",
  },
  {
    id: 1,
    name: "ULTRAVIOLET",
    description: "ビンテージ・バイブ",
    image: "/images/brands/strymon/products/ultraviolet_s.jpg",
    category: "モジュレーション系",
  },
  {
    id: 6,
    name: "BRIG",
    description: "dBucket ディレイ",
    image: "/images/brands/strymon/products/brig_s.jpg",
    category: "ディレイ系",
  },
  {
    id: 7,
    name: "cloudburst",
    description: "アンビエント・リバーブ",
    image: "/images/brands/strymon/products/cloudburst_s.jpg",
    category: "リバーブ系",
  },
  {
    id: 8,
    name: "blueSky（第2世代）",
    description: "リバーブ",
    image: "/images/brands/strymon/products/bluesky_s.jpg",
    category: "リバーブ系",
  },
  {
    id: 9,
    name: "DIG（第2世代）",
    description: "デジタル・ディレイ",
    image: "/images/brands/strymon/products/dig_s.jpg",
    category: "ディレイ系",
  },
  {
    id: 10,
    name: "DECO（第2世代）",
    description: "テープ・サチュレーション",
    image: "/images/brands/strymon/products/deco_s.jpg",
    category: "ドライブ系",
  },
  {
    id: 11,
    name: "El Capistan（第2世代）",
    description: "dTape エコー",
    image: "/images/brands/strymon/products/elcapistan_s.jpg",
    category: "ディレイ系",
  },
  {
    id: 12,
    name: "FLINT（第2世代）",
    description: "リバーブ&トレモロ",
    image: "/images/brands/strymon/products/flint_s.jpg",
    category: "リバーブ系",
  },
  {
    id: 13,
    name: "Lex（第2世代）",
    description: "ローカリー",
    image: "/images/brands/strymon/products/lex_s.jpg",
    category: "モジュレーション系",
  },
  {
    id: 14,
    name: "STARLAB",
    description: "ユーロラック用シンセシス・リバーブ",
    image: "/images/brands/strymon/products/starlab_s.jpg",
    category: "リバーブ系",
  },
  {
    id: 15,
    name: "ZELZAH",
    description: "フェイザー",
    image: "/images/brands/strymon/products/zelzah_s.jpg",
    category: "モジュレーション系",
  },
  {
    id: 16,
    name: "CONDUIT",
    description: "MIDI インターフェイス",
    image: "/images/brands/strymon/products/conduit_s.jpg",
    category: "アクセサリー",
  },
  {
    id: 17,
    name: "NIGHTSKY",
    description: "シンセシス・リバーブ",
    image: "/images/brands/strymon/products/nightsky_s.jpg",
    category: "リバーブ系",
  },
  {
    id: 18,
    name: "COMPADRE",
    description: "コンプ・ブースター",
    image: "/images/brands/strymon/products/compadre_s.jpg",
    category: "ドライブ系",
  },
  {
    id: 19,
    name: "IRIDIUM",
    description: "AMP & IR CAB エミュレーター",
    image: "/images/brands/strymon/products/iridium_s.jpg",
    category: "ドライブ系",
  },
  {
    id: 20,
    name: "VOLANTE",
    description: "マグネティック・エコー",
    image: "/images/brands/strymon/products/volante_s.jpg",
    category: "ディレイ系",
  },
  {
    id: 21,
    name: "MULTI switch PLUS",
    description: "外部スイッチ・ユニット",
    image: "/images/brands/strymon/products/multiswitchplus_s.jpg",
    category: "アクセサリー",
  },
  {
    id: 22,
    name: "MIDI Cables",
    description: "MIDI/TRS変換ケーブル",
    image: "/images/brands/strymon/products/midicables_s.jpg",
    category: "アクセサリー",
  },
  {
    id: 23,
    name: "MAGNETO",
    description: "ユーロラック用dTape エコー",
    image: "/images/brands/strymon/products/magneto_s.jpg",
    category: "ディレイ系",
  },
  {
    id: 24,
    name: "AA-1",
    description: "ユーロラック用アッテネーター",
    image: "/images/brands/strymon/products/aa1_s.jpg",
    category: "アクセサリー",
  },
  {
    id: 25,
    name: "SUNSET",
    description: "ディストーション",
    image: "/images/brands/strymon/products/sunset_s.jpg",
    category: "ドライブ系",
  },
  {
    id: 26,
    name: "Riverside",
    description: "オーバードライブ",
    image: "/images/brands/strymon/products/riverside_s.jpg",
    category: "ドライブ系",
  },
  {
    id: 27,
    name: "Ojai R30",
    description: "パワーサプライ",
    image: "/images/brands/strymon/products/ojai_r30_s.jpg",
    category: "アクセサリー",
  },
  {
    id: 28,
    name: "Ojai",
    description: "パワーサプライ",
    image: "/images/brands/strymon/products/ojai_s.jpg",
    category: "アクセサリー",
  },
  {
    id: 29,
    name: "BigSky",
    description: "リバーブ",
    image: "/images/brands/strymon/products/bigsky_s.jpg",
    category: "リバーブ系",
  },
  {
    id: 30,
    name: "Mobius",
    description: "モジュレーション",
    image: "/images/brands/strymon/products/mobius_s.jpg",
    category: "モジュレーション系",
  },
  {
    id: 31,
    name: "TIMELINE",
    description: "ディレイ",
    image: "/images/brands/strymon/products/timeline_s.jpg",
    category: "ディレイ系",
  },
  {
    id: 32,
    name: "MINI switch",
    description: "外部スイッチ・ユニット",
    image: "/images/brands/strymon/products/miniswitch_s.jpg",
    category: "アクセサリー",
  },
  {
    id: 33,
    name: "Ola",
    description: "dBucket コーラス",
    image: "/images/brands/strymon/products/ola_s.jpg",
    category: "モジュレーション系",
  },
  {
    id: 35,
    name: "Zuma R300",
    description: "パワーサプライ",
    image: "/images/brands/strymon/products/zuma_r300_s.jpg",
    category: "生産完了品",
  },
  {
    id: 36,
    name: "DIG（第1世代）",
    description: "デジタル・ディレイ",
    image: "/images/brands/strymon/products/dig_s.jpg",
    category: "生産完了品",
  },
  {
    id: 37,
    name: "DECO（第1世代）",
    description: "テープ・サチュレーション",
    image: "/images/brands/strymon/products/deco_s.jpg",
    category: "生産完了品",
  },
  {
    id: 38,
    name: "FLINT（第1世代）",
    description: "リバーブ&トレモロ",
    image: "/images/brands/strymon/products/flint_s.jpg",
    category: "生産完了品",
  },
  {
    id: 39,
    name: "Multi Switch",
    description: "外部スイッチ・ユニット",
    image: "/images/brands/strymon/products/multiswitch_s.jpg",
    category: "生産完了品",
  },
  {
    id: 40,
    name: "Lex（第1世代）",
    description: "ロータリー",
    image: "/images/brands/strymon/products/lex_s.jpg",
    category: "生産完了品",
  },
  {
    id: 41,
    name: "El Capistan（第1世代）",
    description: "dTape エコー",
    image: "/images/brands/strymon/products/elcapistan_s.jpg",
    category: "生産完了品",
  },
  {
    id: 42,
    name: "blueSky（第1世代）",
    description: "リバーブ",
    image: "/images/brands/strymon/products/bluesky_s.jpg",
    category: "生産完了品",
  },
  {
    id: 43,
    name: "Orbit",
    description: "dBucket フランジャー",
    image: "/images/brands/strymon/products/orbit_s.jpg",
    category: "生産完了品",
  },
  {
    id: 44,
    name: "BRIGADIER",
    description: "dBucket ディレイ",
    image: "/images/brands/strymon/products/brigadier_s.jpg",
    category: "生産完了品",
  },
  {
    id: 45,
    name: "OB.1",
    description: "オプチカル・コンプ",
    image: "/images/brands/strymon/products/ob1_s.jpg",
    category: "生産完了品",
  },
  {
    id: 46,
    name: "FAIRFAX",
    description: "アウトプットステージ・ドライブ",
    image: "/images/brands/strymon/products/fairfax_s.jpg",
    category: "ドライブ系",
    link: "/brands/strymon/products/fairfax",
  },
  {
    id: 47,
    name: "OLIVERA",
    description: "ビンテージ・オイル缶エコー",
    image: "/images/brands/strymon/products/olivera_s.jpg",
    category: "ディレイ系",
    link: "/brands/strymon/products/olivera",
  },
]

const announcements = [
  "strymon：製品のアダプター同梱廃止のお知らせ - 環境保護の観点から、今後の製品にはアダプターが同梱されません",
  "strymon：公式ウェブサイトリニューアルのお知らせ - より使いやすく、製品情報が充実したサイトになりました",
  "strymon：夏季休業のお知らせ - 8月10日から8月18日まで休業させていただきます",
  "strymon：新製品発表会開催のお知らせ - 2024年秋の新製品を一堂に展示いたします",
  "strymon：ファームウェアアップデート配信開始 - BigSky MXの新機能が追加されました",
]

const supportInfo = [
  "strymon：製品マニュアルのダウンロードページを更新しました - 最新版のマニュアルをご確認ください",
  "strymon：よくある質問（FAQ）ページを追加しました - 製品の使用方法やトラブルシューティングをご覧いただけます",
  "strymon：修理・保証サービスについて - 製品の修理や保証に関する情報を掲載しています",
  "strymon：ファームウェアアップデート方法のご案内 - 製品のファームウェアを最新版に更新する手順を解説しています",
  "strymon：お問い合わせ窓口のご案内 - 製品に関するご質問は専用フォームからお問い合わせください",
]

const getOrderedProducts = (category: Category) => {
  if (category === "新着順") {
    const currentProducts = products.filter((p) => p.category !== "生産完了品")
    // 将最新的产品（FAIRFAX 和 OLIVERA）排在最前面
    const latestProducts = currentProducts.filter((p) => p.id === 46 || p.id === 47)
    const otherProducts = currentProducts.filter((p) => p.id !== 46 && p.id !== 47)
    return [...latestProducts, ...otherProducts]
  }

  const categoryOrder: Record<string, number[]> = {
    ドライブ系: [46, 10, 18, 19, 25, 26],
    モジュレーション系: [3, 1, 12, 13, 15, 30, 33],
    ディレイ系: [47, 5, 6, 9, 11, 20, 23, 31],
    リバーブ系: [4, 7, 8, 12, 14, 17, 29],
    アクセサリー: [2, 16, 21, 22, 24, 27, 28, 32],
    生産完了品: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
  }

  const order = categoryOrder[category] || []
  const filtered = products.filter((p) => order.includes(p.id))

  return filtered.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id))
}

export default function StrymonPage() {
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
            <img src="/images/strymon-bigsky-bg.png" alt="Strymon BigSky MX" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          {/* Content */}
          <div className="relative container mx-auto h-full flex items-center px-6 lg:px-12 z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
              {/* Left: Team Photo */}
              <div className="relative h-[320px] rounded-lg overflow-hidden shadow-2xl">
                <img src="/images/strymon-team.png" alt="Strymon Team" className="w-full h-full object-cover" />
              </div>

              {/* Right: Brand Description */}
              <div className="text-white space-y-6 bg-black/30 backdrop-blur-sm p-8 rounded-lg">
                <h1 className="text-5xl font-bold tracking-tight text-shadow">
                  strymon
                </h1>

                <div
                  className="space-y-4 text-base leading-relaxed text-shadow-sm"
                >
                  <p>本物のサウンドと先進のテクノロジーに魅せられた探究心は、新たなステージへ</p>

                  <p>
                    2005年、多くの先進技術と真空管バッファーを搭載して話題を呼んだ「DAMAGE
                    CONTROL」が、遂に新たなるラインナップを発表しました。
                  </p>

                  <p className="font-medium">その名は、ストライモン。</p>

                  <p>
                    ナチュラルリッチで奥行きのある太いサウンド、昔に溢れる小手先だけのサウンドとは一線を画す確かな音質、大幅な小型化と操作方法の改善に成功した「最新鋭機」は、世界中のアーティストから賞賛されています。
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
            product.link ? (
              <a
                key={`${activeCategory}-${product.id}`}
                href={product.link}
                className="group cursor-pointer animate-fadeIn block"
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
                  <p className="text-xs font-medium mb-0.5 text-gray-400">strymon</p>
                  <p className="text-sm font-bold mb-1 leading-tight">{product.name}</p>
                  <p className="text-xs text-gray-400 leading-tight">{product.description}</p>
                </div>
              </a>
            ) : (
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
                  <p className="text-xs font-medium mb-0.5 text-gray-400">strymon</p>
                  <p className="text-sm font-bold mb-1 leading-tight">{product.name}</p>
                  <p className="text-xs text-gray-400 leading-tight">{product.description}</p>
                </div>
              </div>
            )
          ))}
        </div>
      </div>

      {/* Blog Slider */}
      <BlogSlider />
    </div>
  )
}
