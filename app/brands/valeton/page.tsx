"use client"

import { useState } from "react"
import { BlogSlider } from "@/components/blog-slider"

type Tab = "新着順" | "お知らせ" | "サポート情報"
type Category =
  | "新着順"
  | "歪み系エフェクター"
  | "空間系エフェクター"
  | "マルチ・エフェクター"
  | "ルーパー"
  | "アンプ"
  | "アクセサリ"
  | "生産完了品"

const tabs: Tab[] = ["新着順", "お知らせ", "サポート情報"]

const news = [
  "Valeton：新型マルチエフェクター「GP-200」が登場 - 高品質なサウンドと直感的な操作性を実現",
  "Valeton：コンパクトなペダルボード用マルチエフェクター「GP-100」の新色が登場",
  "Valeton：アナログ回路を採用したオーバードライブペダル「Coral Mod」が発売",
  "Valeton：ステレオディレイペダル「Dapper Echo」の新バージョンが登場",
  "Valeton：ミニサイズのリバーブペダル「Ocean Verb」が発売開始",
]

const categories: Category[] = [
  "新着順",
  "歪み系エフェクター",
  "空間系エフェクター",
  "マルチ・エフェクター",
  "ルーパー",
  "アンプ",
  "アクセサリ",
  "生産完了品",
]

const products = [
  // 2025年最新产品
  {
    id: 1,
    name: "GP-5",
    description: "マルチエフェクター",
    image: "/images/brands/valeton/products/GP-5.png",
    category: "マルチ・エフェクター",
  },
  {
    id: 4,
    name: "VFR-110",
    description: "フロアモニタースピーカー",
    image: "/images/brands/valeton/products/VFR-110.png",
    category: "アンプ",
  },

  {
    id: 3,
    name: "GP-200X",
    description: "マルチエフェクター",
    image: "/images/brands/valeton/products/GP-200x.png",
    category: "マルチ・エフェクター",
  },

  {
    id: 2,
    name: "VLP-400",
    description: "マルチトラックサンプラー",
    image: "/images/brands/valeton/products/VLP-400.png",
    category: "ルーパー",
  },

  {
    id: 5,
    name: "VLP-200",
    description: "マルチ・トラック・サンプラー",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2HYZmet8J4iEWAqb0Wk9ekOBfAK1dW.png",
    category: "ルーパー",
  },
  {
    id: 34,
    name: "VPS-6",
    description: "完全隔離型パワーサプライ",
    image: "/images/brands/valeton/products/VPS-6.png",
    category: "アクセサリ",
  },

  // 2023年产品
  {
    id: 8,
    name: "GP-200JR",
    description: "マルチエフェクター",
    image: "/images/brands/valeton/products/GP-200JR.png",
    category: "マルチ・エフェクター",
  },
  // 2022年产品
  {
    id: 9,
    name: "GP-200R",
    description: "マルチエフェクター",
    image: "/images/brands/valeton/products/GP-200R.png",
    category: "マルチ・エフェクター",
  },
  {
    id: 10,
    name: "GP-200",
    description: "マルチエフェクター",
    image: "/images/brands/valeton/products/GP-200.png",
    category: "マルチ・エフェクター",
  },
  {
    id: 23,
    name: "GP-200JR Bag",
    description: "GP-200JR専用キャリングバッグ",
    image: "/images/brands/valeton/products/GP-200JR bag.png",
    category: "アクセサリ",
  },
  {
    id: 24,
    name: "GP-200 Bag",
    description: "GP-200専用キャリングバッグ",
    image: "/images/brands/valeton/products/GP-200 bag.png",
    category: "アクセサリ",
  },
  {
    id: 6,
    name: "Rushead Max (Guitar)",
    description: "ギター用ヘッドホンアンプ",
    image: "/images/brands/valeton/products/rushead max.png",
    category: "アンプ",
  },
  {
    id: 7,
    name: "Rushead Max Bass",
    description: "ベース用ヘッドホンアンプ",
    image: "/images/brands/valeton/products/rusheadmax bass .png",
    category: "アンプ",
  },
  // 2020-2021年产品
  {
    id: 11,
    name: "Coral Mod II",
    description: "モジュレーション",
    image: "/images/brands/valeton/products/Coralmodll.png",
    category: "空間系エフェクター",
  },
  {
    id: 12,
    name: "Coral Verb II",
    description: "リバーブ",
    image: "/images/brands/valeton/products/coralverbll.png",
    category: "空間系エフェクター",
  },
  {
    id: 13,
    name: "Dapper Indie",
    description: "マルチエフェクトストリップ",
    image: "/images/brands/valeton/products/indie drive.png",
    category: "マルチ・エフェクター",
  },
  {
    id: 14,
    name: "Dapper Bass",
    description: "ベースプリアンプ",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jpe6i8RPf2Vj6DHHNvRMstwyUW1los.png",
    category: "マルチ・エフェクター",
  },
  // 2018-2020年产品 (Dapper Mini系列)
  {
    id: 15,
    name: "Dapper Bass Mini",
    description: "ベース用マルチ",
    image: "/images/brands/valeton/products/BASS mini.png",
    category: "マルチ・エフェクター",
  },
  {
    id: 16,
    name: "Dapper Acoustic Mini",
    description: "アコースティック用マルチ",
    image: "/images/brands/valeton/products/ACOUSTIC mini.png",
    category: "マルチ・エフェクター",
  },
  {
    id: 17,
    name: "Dapper Dark Mini",
    description: "ディストーション",
    image: "/images/brands/valeton/products/DARK.png",
    category: "歪み系エフェクター",
  },
  {
    id: 18,
    name: "Dapper Mini",
    description: "ミニマルチエフェクター",
    image: "/images/brands/valeton/products/Dapper mini.png",
    category: "マルチ・エフェクター",
  },
  // 配件产品 (Accessories)
  {
    id: 19,
    name: "Surge EP-2",
    description: "エクスプレッションペダル",
    image: "/images/brands/valeton/products/EP-2.png",
    category: "アクセサリ",
  },
  {
    id: 20,
    name: "Surge EP-1",
    description: "エクスプレッションペダル",
    image: "/images/brands/valeton/products/EP-1.png",
    category: "アクセサリ",
  },
  {
    id: 21,
    name: "VFC-1",
    description: "スイッチキャップ",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VPC-3-V2xRLmPBGZTfeaV4syqFyTQOSxF5ZR.png",
    category: "アクセサリ",
  },
  {
    id: 22,
    name: "Keyholder",
    description: "GP-5キーホルダー",
    image: "/images/brands/valeton/products/keyholder.png",
    category: "アクセサリ",
  },

  {
    id: 25,
    name: "VPC-3",
    description: "パッチケーブル 3本セット",
    image: "/images/brands/valeton/products/VPC-3.png",
    category: "アクセサリ",
  },
  {
    id: 26,
    name: "VPC-1",
    description: "パッチケーブル",
    image: "/images/brands/valeton/products/VPC-1.png",
    category: "アクセサリ",
  },
  {
    id: 27,
    name: "VGC-5R1",
    description: "プレミアム楽器ケーブル 5m (レッド)",
    image: "/images/brands/valeton/products/VGC-5R1.png",
    category: "アクセサリ",
  },
  {
    id: 28,
    name: "VGC-5B1",
    description: "プレミアム楽器ケーブル 5m (ブラック)",
    image: "/images/brands/valeton/products/VGC-5b1.png",
    category: "アクセサリ",
  },
  {
    id: 29,
    name: "VGC-3R1",
    description: "プレミアム楽器ケーブル 3m (レッド)",
    image: "/images/brands/valeton/products/VGC-3R1.png",
    category: "アクセサリ",
  },
  {
    id: 30,
    name: "VGC-3B1",
    description: "プレミアム楽器ケーブル 3m (ブラック)",
    image: "/images/brands/valeton/products/VGC-3b1.png",
    category: "アクセサリ",
  },
  {
    id: 31,
    name: "PSW-1",
    description: "9V DC電源アダプター",
    image: "/images/brands/valeton/products/PSW-1.png",
    category: "アクセサリ",
  },
  {
    id: 32,
    name: "PCA-10",
    description: "10プラグDCパワーケーブル",
    image: "/images/brands/valeton/products/PCA-10.png",
    category: "アクセサリ",
  },
  {
    id: 33,
    name: "PCA-5",
    description: "5プラグDCパワーケーブル",
    image: "/images/brands/valeton/products/PCA-5.png",
    category: "アクセサリ",
  },

  // 生产完了品 (Discontinued Products) - 按时间从新到旧排序
  {
    id: 35,
    name: "GP-100VT",
    description: "マルチエフェクター",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mG0JCjCu5CcXe2rJoNnxkYlq4woblD.png",
    category: "生産完了品",
  },
  {
    id: 36,
    name: "GP-100",
    description: "マルチエフェクター",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mG0JCjCu5CcXe2rJoNnxkYlq4woblD.png",
    category: "生産完了品",
  },
  {
    id: 37,
    name: "Dapper MDR",
    description: "オクターブベースアンプ",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OurmCCHg1YKxPyrk6xrvkbAHixqdgR.png",
    category: "生産完了品",
  },
  {
    id: 38,
    name: "Rushead Bass",
    description: "ポケットベースアンプ",
    image: "/images/brands/valeton/products/rushead bass.png",
    category: "生産完了品",
  },
  {
    id: 39,
    name: "CORAL MDR",
    description: "空間系エフェクター",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BTyMprGDPdwTbleMLZE5Qe3ItIxjXD.png",
    category: "生産完了品",
  },
  {
    id: 40,
    name: "CORAL CAB",
    description: "キャビネット・シミュレーター",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Z83F25mtkxyMzgzTdZe6AM8nQO4YrJ.png",
    category: "生産完了品",
  },
  {
    id: 41,
    name: "CORAL AMP",
    description: "アンプ・シミュレーター",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-saoGoZQ5zpGT91fH3goW5Fkx6pLTkD.png",
    category: "生産完了品",
  },
  {
    id: 42,
    name: "ASPHALT TAR-20B",
    description: "20Wベースアンプヘッド",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-yi9EemdUDELbJ54pPvcAYnoAqFKpy6.png",
    category: "生産完了品",
  },
  {
    id: 43,
    name: "ASPHALT TAR-20G",
    description: "20Wギターアンプヘッド",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dyv48eflZBLqtTB8YGakCqNhYiOsqF.png",
    category: "生産完了品",
  },
]

const announcements = [
  "Valeton：製品保証期間延長のお知らせ - すべての製品の保証期間を2年に延長しました",
  "Valeton：公式オンラインストアオープンのお知らせ - 直販サイトでお得にお買い求めいただけます",
  "Valeton：年末年始休業のお知らせ - 12月29日から1月4日まで休業させていただきます",
  "Valeton：新製品体験会開催のお知らせ - 最新のマルチエフェクターを実際にお試しいただけます",
  "Valeton：ファームウェアアップデート配信開始 - GP-200の新機能が追加されました",
]

const supportInfo = [
  "Valeton：製品マニュアルのダウンロードページを更新しました - 日本語版マニュアルをご確認ください",
  "Valeton：よくある質問（FAQ）ページを追加しました - 製品の使用方法やトラブルシューティングをご覧いただけます",
  "Valeton：修理・保証サービスについて - 製品の修理や保証に関する情報を掲載しています",
  "Valeton：ファームウェアアップデート方法のご案内 - 製品のファームウェアを最新版に更新する手順を解説しています",
  "Valeton：お問い合わせ窓口のご案内 - 製品に関するご質問は専用フォームからお問い合わせください",
]

const getOrderedProducts = (category: Category) => {
  if (category === "新着順") {
    return products.filter((p) => p.category !== "生産完了品")
  }

  return products.filter((p) => p.category === category)
}

export default function ValetonPage() {
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
            <img src="/valeton-banner-background.jpg" alt="Valeton Products" className="w-full h-full object-cover" />
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
                  src="https://www.youtube.com/embed/t_R4j0kO81E"
                  title="Valeton Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded"
                ></iframe>
              </div>

              {/* Right: Brand Description */}
              <div className="text-white space-y-6 bg-black/30 backdrop-blur-sm p-8 rounded-lg">
                <h1 className="text-5xl font-bold tracking-tight text-shadow">
                  Valeton
                </h1>

                <div
                  className="space-y-4 text-base leading-relaxed text-shadow-sm"
                >
                  <p>高品質なサウンドと手頃な価格を両立した、ギタリストのためのエフェクトブランド</p>

                  <p>
                    Valetonは、プロフェッショナルからビギナーまで、すべてのギタリストに最高のサウンド体験を提供することを目指しています。
                  </p>

                  <p className="font-medium">革新的なテクノロジーと伝統的なサウンドの融合</p>

                  <p>
                    マルチエフェクターからコンパクトペダルまで、幅広いラインナップで、あなたの音楽表現をサポートします。直感的な操作性と高品質なサウンドで、世界中のミュージシャンから支持されています。
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
                <p className="text-xs font-medium mb-0.5 text-gray-400">Valeton</p>
                <p className="text-sm font-bold mb-1 leading-tight">{product.name}</p>
                <p className="text-xs text-gray-400 leading-tight">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Artists Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div className="flex-1">
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Artists</h2>
                <div className="flex justify-center">
                  <div className="h-1 w-24 bg-blue-500 rounded-full"></div>
                </div>
                <p className="text-gray-600 mt-4">世界中のアーティストがValetonを使用しています</p>
              </div>
            </div>

            {/* More Link */}
            <a
              href="/brands/valeton/artists"
              className="group flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 transition-all duration-300 rounded-md font-medium"
            >
              <span className="text-base border-b-2 border-transparent group-hover:border-blue-600 transition-all duration-300">
                もっと見る
              </span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
            {/* Featured Artist - saki */}
            <a href="/brands/valeton/artists/saki" className="group cursor-pointer flex-shrink-0">
              <div className="relative w-[500px] h-[500px] bg-gray-200 rounded-lg overflow-hidden mb-4 shadow-lg">
                <img
                  src="/valeton-saki-main.jpg"
                  alt="saki"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 mb-1">saki</p>
                <p className="text-sm text-blue-600 font-medium mb-1">Guitarist</p>
                <p className="text-sm text-gray-600">Rock / Metal</p>
              </div>
            </a>

            {/* Small Artists Grid - 右近 輝明, 馬場 美夕, LUCILLE ROASCIO, 稲月カノン */}
            <div className="grid grid-cols-2 gap-4">
              <div className="group cursor-pointer">
                <div className="w-[240px] h-[240px] bg-gray-200 rounded-lg overflow-hidden mb-3 shadow-md">
                  <img
                    src="/valeton-ukon-teruaki.jpg"
                    alt="右近 輝明"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900 text-sm">右近 輝明</p>
                  <p className="text-xs text-blue-600 font-medium">Guitarist</p>
                  <p className="text-xs text-gray-600">Rock / Pop</p>
                </div>
              </div>

              <div className="group cursor-pointer">
                <div className="w-[240px] h-[240px] bg-gray-200 rounded-lg overflow-hidden mb-3 shadow-md">
                  <img
                    src="/valeton-baba-miyu.jpg"
                    alt="馬場 美夕"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900 text-sm">馬場 美夕</p>
                  <p className="text-xs text-blue-600 font-medium">Guitarist</p>
                  <p className="text-xs text-gray-600">Pop / Rock</p>
                </div>
              </div>

              {/* LUCILLE ROASCIO */}
              <div className="group cursor-pointer">
                <div className="w-[240px] h-[240px] bg-gray-200 rounded-lg overflow-hidden mb-3 shadow-md">
                  <img
                    src="/valeton-lucille-roascio.jpg"
                    alt="LUCILLE ROASCIO"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900 text-sm">LUCILLE ROASCIO</p>
                  <p className="text-xs text-blue-600 font-medium">Bassist</p>
                  <p className="text-xs text-gray-600">Rock / Alternative</p>
                </div>
              </div>

              {/* 稲月カノン */}
              <div className="group cursor-pointer">
                <div className="w-[240px] h-[240px] bg-gray-200 rounded-lg overflow-hidden mb-3 shadow-md">
                  <img
                    src="/valeton-inazuki-kanon.jpg"
                    alt="稲月カノン"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900 text-sm">稲月カノン</p>
                  <p className="text-xs text-blue-600 font-medium">Guitarist</p>
                  <p className="text-xs text-gray-600">Pop / Rock</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Slider */}
      <BlogSlider />
    </div>
  )
}
