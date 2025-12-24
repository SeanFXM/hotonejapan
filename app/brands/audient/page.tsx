"use client"

import { useState } from "react"
import Link from "next/link"
import { BlogSlider } from "@/components/blog-slider"

type Tab = "新着順" | "お知らせ" | "サポート情報"
type ProductCategory =
  | "新着順"
  | "マイクプリ"
  | "オーディオ・インターフェイス"
  | "モニター・コントロール"
  | "生産完了品"

const tabs: Tab[] = ["新着順", "お知らせ", "サポート情報"]

const productCategories: ProductCategory[] = [
  "新着順",
  "マイクプリ",
  "オーディオ・インターフェイス",
  "モニター・コントロール",
  "生産完了品",
]

interface Product {
  id: string
  name: string
  description: string
  category: string
  image: string
  discontinued?: boolean
  link?: string
}

const products: Product[] = [
  {
    id: "oria-mini",
    name: "ORIA mini",
    description: "ルーム補正システム",
    category: "オーディオ・インターフェイス",
    image: "/images/brands/audient/products/oriamini_s.jpg",
    link: "/brands/audient/products/oria-mini",
  },
  {
    id: "id48",
    name: "iD48",
    description: "オーディオ・インターフェイス",
    category: "オーディオ・インターフェイス",
    image: "/images/brands/audient/products/id48_s.jpg",
    link: "/brands/audient/products/id48",
  },
  {
    id: "oria",
    name: "ORIA",
    description: "オーディオ・インターフェイス",
    category: "オーディオ・インターフェイス",
    image: "/images/brands/audient/products/oria_s.jpg",
    link: "/brands/audient/products/oria",
  },
  {
    id: "id24",
    name: "iD24",
    description: "オーディオ・インターフェイス",
    category: "オーディオ・インターフェイス",
    image: "/images/brands/audient/products/id24_s.jpg",
    link: "/brands/audient/products/id24",
  },
  {
    id: "evo-sp8",
    name: "evo SP8",
    description: "8ch マイクプリ・ADコンバーター",
    category: "マイクプリ",
    image: "/images/brands/audient/products/evosp8_s.jpg",
    link: "/brands/audient/products/evosp8",
  },
  {
    id: "evo-16",
    name: "evo 16",
    description: "オーディオ・インターフェイス",
    category: "オーディオ・インターフェイス",
    image: "/images/brands/audient/products/evo16_s.jpg",
    link: "/brands/audient/products/evo16",
  },
  {
    id: "id44",
    name: "iD44mk II",
    description: "オーディオ・インターフェイス",
    category: "オーディオ・インターフェイス",
    image: "/images/brands/audient/products/id44mk2_s.jpg",
    link: "/brands/audient/products/id44mk2",
  },
  {
    id: "id4mk2",
    name: "iD4mk II",
    description: "オーディオ・インターフェイス",
    category: "オーディオ・インターフェイス",
    image: "/images/brands/audient/products/id4mk2_s.jpg",
    link: "/brands/audient/products/id4mk2",
  },
  {
    id: "id14mk2",
    name: "iD14mk II",
    description: "オーディオ・インターフェイス",
    category: "オーディオ・インターフェイス",
    image: "/images/brands/audient/products/id14mk2_s.jpg",
    link: "/brands/audient/products/id14mk2",
  },
  {
    id: "evo-4",
    name: "evo 4",
    description: "オーディオ・インターフェイス",
    category: "オーディオ・インターフェイス",
    image: "/images/brands/audient/products/evo4_s.jpg",
    link: "/brands/audient/products/evo4",
  },
  {
    id: "evo-8",
    name: "evo 8",
    description: "オーディオ・インターフェイス",
    category: "オーディオ・インターフェイス",
    image: "/images/brands/audient/products/evo8_s.jpg",
    link: "/brands/audient/products/evo8",
  },
  {
    id: "evo-starter-bundle",
    name: "evo スターターバンドル",
    description: "オーディオ・インターフェース・セット",
    category: "オーディオ・インターフェイス",
    image: "/images/brands/audient/products/evo_bundle_s.jpg",
    link: "/brands/audient/products/evostarterbundle",
  },
  {
    id: "nero",
    name: "NERO",
    description: "モニター・コントロール",
    category: "モニター・コントロール",
    image: "/images/brands/audient/products/nero_s.jpg",
    link: "/brands/audient/products/nero",
  },
]

const discontinuedProducts: Product[] = [
  {
    id: "sono",
    name: "Sono",
    description: "オーディオ・インターフェイス",
    category: "オーディオ・インターフェイス",
    image: "/images/brands/audient/products/sono_s.jpg",
    discontinued: true,
  },
  {
    id: "id44-discontinued",
    name: "iD44",
    description: "オーディオ・インターフェイス",
    category: "オーディオ・インターフェイス",
    image: "/images/brands/audient/products/id44_s.jpg",
    discontinued: true,
  },
  {
    id: "id22",
    name: "iD22",
    description: "オーディオ・インターフェイス",
    category: "オーディオ・インターフェイス",
    image: "/images/brands/audient/products/id22_s.jpg",
    discontinued: true,
  },
  {
    id: "asp800",
    name: "asp800",
    description: "マイクプリ・ADコンバーター",
    category: "マイクプリ",
    image: "/images/brands/audient/products/asp800_s.jpg",
    discontinued: true,
  },
  {
    id: "asp880",
    name: "asp880",
    description: "マイクプリ・ADコンバーター",
    category: "マイクプリ",
    image: "/images/brands/audient/products/asp880_s.jpg",
    discontinued: true,
  },
]

const news = [
  "audient：EVO SP8 8チャンネル・オーディオインターフェイスが登場 - プロフェッショナルな録音環境を実現",
  "audient：iD14 MkII デスクトップ・オーディオインターフェイスの新バージョンを発表",
  "audient：ASP8024-HE ヘリテージエディション・コンソールの詳細情報を公開",
  "audient：EVO 4 コンパクト・オーディオインターフェイスがホームスタジオに最適",
  "audient：Nero デスクトップ・モニターコントローラーで完璧なモニタリング環境を構築",
]

const announcements = ["audient：製品に関する最新情報をお届けします", "audient：お問い合わせ窓口のご案内"]

const supportInfo = [
  "audient：製品マニュアルのダウンロードページ",
  "audient：よくある質問（FAQ）",
  "audient：修理・保証サービスについて",
]

export default function AudientPage() {
  const [activeTab, setActiveTab] = useState<Tab>("新着順")
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("新着順")

  const filteredProducts = () => {
    if (activeCategory === "新着順") {
      // 新着順只显示在售产品，不包括停产产品
      return products
    } else if (activeCategory === "生産完了品") {
      // 生产完了品只显示停产产品
      return discontinuedProducts
    } else {
      // 其他分类只显示在售产品中符合该分类的产品
      return products.filter((product) => product.category === activeCategory)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Brand Introduction Banner */}
      <section className="relative w-full">
        <div className="relative h-[400px] w-full overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img src="/images/design-mode/image.png" alt="Audient EVO SP8" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          {/* Content */}
          <div className="relative container mx-auto h-full flex items-center px-6 lg:px-12 z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
              <div className="relative h-[320px] rounded-lg overflow-hidden shadow-2xl">
                <img
                  src="/audient-team-photo.png"
                  alt="David Dearden at Audient Studio"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center calc(50% + 50px)" }}
                />
              </div>

              <div className="text-white space-y-4 bg-black/30 backdrop-blur-sm p-8 rounded-lg">
                <h1
                  className="text-[2.43rem] font-bold tracking-tight text-shadow"
                >
                  AUDIENT
                </h1>

                <div
                  className="space-y-3 text-[0.81rem] leading-relaxed text-shadow-sm"
                >
                  <p>
                    Audient（オーディエント）はイギリスで誕生した業務用音響機器ブランドです。ビートルズでお馴染みの「アビーロード・スタジオ」、ビート・タウンゼントの「イールパイ・スタジオ」、フロリダ州の「フルセイル大学」など数多くの有名なスタジオに導入されています。その優れたアナログ・オーディオとデジタル・コンバートの性能は、世界中で認められています。
                  </p>

                  <p>
                    創立者の一人、デイビッド・ディアデンはイギリス国内でスタジオへのコンソール導入に数多く携わっており、ジョージ・ハリスンやリンゴ・スターのホームスタジオへのコンソール導入も彼が担当しました。また、彼はMCI、Soundcraft、Midasでも仕事をしたことがあり、Midasのヒット作「XL200」の設計も手掛けています。
                  </p>

                  <p>
                    オーディエントは、２０年以上もの間、その洗練された技術力と経験で数々のプロの現場をサポートしてきました。私たちが創るのは、オーバースペックで複雑な高級品ではありません。手に取りやすくシンプル、そして確かな品質を備えた製品をあらゆるレベルのクリエイターたちに提供します。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}

      {/* Product Categories Navigation */}
      <div className="border-b border-gray-200 mt-[50px]">
        <div className="container mx-auto px-6">
          <div className="flex justify-center gap-0 overflow-x-auto">
            {productCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-8 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === category ? "bg-purple-600 text-white" : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredProducts().map((product, index) => {
            const content = (
              <>
                <div className="relative bg-gray-200 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="bg-gray-800 text-white p-4 rounded-lg">
                  <p className="text-xs text-gray-400 mb-1">audient</p>
                  <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-300">{product.description}</p>
                </div>
              </>
            )
            
            if (product.link) {
              return (
                <Link
                  key={product.id}
                  href={product.link}
                  className="group cursor-pointer animate-fadeIn block"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: "both",
                  }}
                >
                  {content}
                </Link>
              )
            }
            
            return (
              <div
                key={product.id}
                className="group cursor-pointer animate-fadeIn block"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: "both",
                }}
              >
                {content}
              </div>
            )
          })}
        </div>
      </div>

      {/* Blog Slider */}
      <BlogSlider />
    </div>
  )
}
