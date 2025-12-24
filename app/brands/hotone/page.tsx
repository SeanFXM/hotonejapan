"use client"

import { useState } from "react"
import { BlogSlider } from "@/components/blog-slider"

type Tab = "新着順" | "お知らせ" | "サポート情報"
type Category = "新着順" | "エフェクター" | "マルチ・エフェクター" | "小型アンプ" | "アクセサリー" | "生産完了品"

const tabs: Tab[] = ["新着順", "お知らせ", "サポート情報"]

const news = [
  "HOTONE：どこでも練習&録音を可能にする、超小型モデリングアンプ「PULZE MINI」が登場",
  "HOTONE：最新のIRとアルゴリズムで空想のアンビエントを生むデュアルリバーブ「VERBERA」が登場",
  "HOTONE：PULZEのポテンシャルを最大限に引き出す、ワイヤレスMIDIコントローラー「PULZE CONTROL」が登場",
  "HOTONE：プロフェッショナル向けマルチエフェクター「AMPERO II STAGE」の新ファームウェアをリリース",
  "HOTONE：超小型ながら本格的なサウンドを実現する「SKYLINE」シリーズに新モデルが追加",
]

const categories: Category[] = [
  "新着順",
  "エフェクター",
  "マルチ・エフェクター",
  "小型アンプ",
  "アクセサリー",
  "生産完了品",
]

const products = [
  // 新着順 products (0-30)
  {
    id: 0,
    name: "TEMPLE",
    description: "テンプレート製品",
    image: "/images/brands/hotone/products/temple-placeholder.png",
    category: "エフェクター",
    link: "/brands/hotone/products/temple",
    hidden: true,
  },
  {
    id: 1,
    name: "PULZE MINI",
    description: "超小型モデリングアンプ",
    image: "/images/brands/hotone/products/pulzemini_s.jpg",
    category: "小型アンプ",
    link: "/brands/hotone/products/pulze-mini",
  },
  {
    id: 2,
    name: "VERBERA",
    description: "コンボリューション・リバーブ",
    image: "/images/brands/hotone/products/verbera_s.jpg",
    category: "エフェクター",
    link: "/brands/hotone/products/verbera",
  },
  {
    id: 3,
    name: "PULZE CONTROL",
    description: "ワイヤレスMIDIコントローラー",
    image: "/images/brands/hotone/products/pulzecontrol_s.jpg",
    category: "アクセサリー",
    link: "/brands/hotone/products/pulze-control",
  },
  {
    id: 4,
    name: "AMPERO II",
    description: "アンプモデラー&エフェクター",
    image: "/images/brands/hotone/products/ampero2_s.jpg",
    category: "マルチ・エフェクター",
    link: "/brands/hotone/products/ampero-ii",
  },
  {
    id: 5,
    name: "WONG PRESS II",
    description: "ワウ&ボリューム・ペダル",
    image: "/images/brands/hotone/products/wongpress_s.jpg",
    category: "エフェクター",
    link: "/brands/hotone/products/wong-press-ii",
  },
  {
    id: 6,
    name: "AMPERO SWITCH+",
    description: "デュアル・フットスイッチ",
    image: "/images/brands/hotone/products/amperoswitchplus_s.jpg",
    category: "アクセサリー",
    link: "/brands/hotone/products/ampero-switch-plus",
  },
  {
    id: 7,
    name: "TUNER PRESS",
    description: "多機能チューナーペダル",
    image: "/images/brands/hotone/products/tunerpress_s.jpg",
    category: "アクセサリー",
    link: "/brands/hotone/products/tuner-press",
  },
  {
    id: 8,
    name: "AMPERO II STAGE",
    description: "アンプモデラー&エフェクター",
    image: "/images/brands/hotone/products/ampero2stage_s.jpg",
    category: "マルチ・エフェクター",
    link: "/brands/hotone/products/ampero-ii-stage",
  },
  {
    id: 9,
    name: "AMPERO II Press",
    description: "EXP&ボリューム・ペダル",
    image: "/images/brands/hotone/products/ampero2press_s.jpg",
    category: "アクセサリー",
    link: "/brands/hotone/products/ampero-ii-press",
  },
  {
    id: 10,
    name: "PULZE Eclipse",
    description: "Bluetooth モデリングアンプ",
    image: "/images/brands/hotone/products/pulze_eclipse_s.jpg",
    category: "小型アンプ",
    link: "/brands/hotone/products/pulze-eclipse",
  },
  {
    id: 11,
    name: "PULZE Luna",
    description: "Bluetooth モデリングアンプ",
    image: "/images/brands/hotone/products/pulze_luna_s.jpg",
    category: "小型アンプ",
    link: "/brands/hotone/products/pulze-luna",
  },
  {
    id: 12,
    name: "AMPERO Mini",
    description: "アンプモデラー&エフェクター",
    image: "/images/brands/hotone/products/amperomini_s.jpg",
    category: "マルチ・エフェクター",
    link: "/brands/hotone/products/ampero-mini",
  },
  {
    id: 13,
    name: "AMPERO II STOMP",
    description: "アンプモデラー&エフェクター",
    image: "/images/brands/hotone/products/ampero2stomp_s.jpg",
    category: "マルチ・エフェクター",
    link: "/brands/hotone/products/ampero-ii-stomp",
  },
  {
    id: 14,
    name: "AMPERO Control",
    description: "Bluetooth MIDIコントローラー",
    image: "/images/brands/hotone/products/amperocontrol_s.jpg",
    category: "アクセサリー",
    link: "/brands/hotone/products/ampero-control",
  },
  {
    id: 15,
    name: "SOUL PRESS II",
    description: "ワウ&ボリューム・ペダル",
    image: "/images/brands/hotone/products/soulpress2_s.jpg",
    category: "エフェクター",
    link: "/brands/hotone/products/soulpress-ii",
  },
  {
    id: 16,
    name: "AMPERO Press 25k",
    description: "EXP&ボリューム・ペダル",
    image: "/images/brands/hotone/products/amperopress25k_s.jpg",
    category: "アクセサリー",
    link: "/brands/hotone/products/ampero-press-25k",
  },
  {
    id: 17,
    name: "AMPERO Press",
    description: "EXP&ボリューム・ペダル",
    image: "/images/brands/hotone/products/amperopress_s.jpg",
    category: "アクセサリー",
    link: "/brands/hotone/products/ampero-press",
  },
  {
    id: 18,
    name: "AMPERO ONE",
    description: "マルチ・エフェクター",
    image: "/images/brands/hotone/products/amperoone_s.jpg",
    category: "マルチ・エフェクター",
    link: "/brands/hotone/products/ampero-one",
  },
  {
    id: 19,
    name: "AMPERO",
    description: "マルチ・エフェクター",
    image: "/images/brands/hotone/products/ampero_s.jpg",
    category: "マルチ・エフェクター",
    link: "/brands/hotone/products/ampero",
  },
  {
    id: 20,
    name: "OMNI IR",
    description: "キャビネット・シミュレーター",
    image: "/images/brands/hotone/products/omniir_s.jpg",
    category: "エフェクター",
    link: "/brands/hotone/products/omni-ir",
  },
  {
    id: 21,
    name: "OMNI AC",
    description: "アコースティック・シミュレーター",
    image: "/images/brands/hotone/products/omniac_s.jpg",
    category: "エフェクター",
    link: "/brands/hotone/products/omni-ac",
  },
  {
    id: 22,
    name: "BINARY AMP",
    description: "アンプ・シミュレーター",
    image: "/images/brands/hotone/products/binaryamp_s.jpg",
    category: "エフェクター",
    link: "/brands/hotone/products/binary-amp",
  },
  {
    id: 23,
    name: "BINARY IR CAB",
    description: "キャビネット・シミュレーター",
    image: "/images/brands/hotone/products/binarycab_s.jpg",
    category: "エフェクター",
    link: "/brands/hotone/products/binary-ir-cab",
  },
  {
    id: 24,
    name: "BINARY MOD",
    description: "モジュレーション・エフェクター",
    image: "/images/brands/hotone/products/binarymod_s.jpg",
    category: "エフェクター",
    link: "/brands/hotone/products/binary-mod",
  },
  {
    id: 25,
    name: "BINARY EKO",
    description: "ディレイ・エフェクター",
    image: "/images/brands/hotone/products/binaryeko_s.jpg",
    category: "エフェクター",
    link: "/brands/hotone/products/binary-eko",
  },
  {
    id: 26,
    name: "SPC CABLE",
    description: "スピーカー・ケーブル",
    image: "/images/brands/hotone/products/spc_s.jpg",
    category: "アクセサリー",
    link: "/brands/hotone/products/spc-cable",
  },
  {
    id: 27,
    name: "PATCH KOMMANDER LS-10",
    description: "ループ・スイッチャー",
    image: "/images/brands/hotone/products/patchkommander_s.jpg",
    category: "アクセサリー",
    link: "/brands/hotone/products/patch-kommander-ls-10",
  },
  {
    id: 28,
    name: "BRITISH INVASION",
    description: "5Wギターアンプ・ヘッド",
    image: "/images/brands/hotone/products/britishinvasion_s.jpg",
    category: "小型アンプ",
    link: "/brands/hotone/products/british-invasion",
  },
  {
    id: 29,
    name: "PURPLE WIND",
    description: "5Wギターアンプ・ヘッド",
    image: "/images/brands/hotone/products/purplewind_s.jpg",
    category: "小型アンプ",
    link: "/brands/hotone/products/purple-wind",
  },
  {
    id: 30,
    name: "MOJO DIAMOND",
    description: "5Wギターアンプ・ヘッド",
    image: "/images/brands/hotone/products/mojo_s.jpg",
    category: "小型アンプ",
    link: "/brands/hotone/products/mojo-diamond",
  },
  {
    id: 31,
    name: "MOJO ATTACK",
    description: "75W ギターアンプ・ヘッド",
    image: "/images/brands/hotone/products/mojoattack_s.jpg",
    category: "生産完了品",
    link: "/brands/hotone/products/mojo-attack",
  },
  {
    id: 32,
    name: "BRITWIND",
    description: "75W ギターアンプ・ヘッド",
    image: "/images/brands/hotone/products/britwind_s.jpg",
    category: "生産完了品",
    link: "/brands/hotone/products/britwind",
  },
  {
    id: 33,
    name: "WALLY+",
    description: "ループ・ステーション",
    image: "/images/brands/hotone/products/wally_plus_s.jpg",
    category: "生産完了品",
    link: "/brands/hotone/products/wally-plus",
  },
  {
    id: 34,
    name: "B STATION",
    description: "ベース・プリアンプ DI",
    image: "/images/brands/hotone/products/bstation_s.jpg",
    category: "生産完了品",
    link: "/brands/hotone/products/b-station",
  },
  {
    id: 35,
    name: "XTOMP mini",
    description: "DSP プロセッサー・ペダル",
    image: "/images/brands/hotone/products/xtompmini_s.jpg",
    category: "生産完了品",
    link: "/brands/hotone/products/xtomp-mini",
  },
  {
    id: 36,
    name: "XTOMP",
    description: "DSP プロセッサー・ペダル",
    image: "/images/brands/hotone/products/xtomp_s.jpg",
    category: "生産完了品",
    link: "/brands/hotone/products/xtomp",
  },
  {
    id: 37,
    name: "SOUL PRESS",
    description: "ワウ&ボリューム・ペダル",
    image: "/images/brands/hotone/products/soulpress_s.jpg",
    category: "生産完了品",
    link: "/brands/hotone/products/soul-press",
  },
  {
    id: 38,
    name: "BASS PRESS",
    description: "ワウ&ボリューム・ペダル",
    image: "/images/brands/hotone/products/basspress_s.jpg",
    category: "生産完了品",
    link: "/brands/hotone/products/bass-press",
  },
  {
    id: 39,
    name: "VOW PRESS",
    description: "ワウ&ボリューム・ペダル",
    image: "/images/brands/hotone/products/vowpress_s.jpg",
    category: "生産完了品",
    link: "/brands/hotone/products/vow-press",
  },
  {
    id: 40,
    name: "HEART ATTACK",
    description: "5W ギターアンプ・ヘッド",
    image: "/images/brands/hotone/products/heartattack_s.jpg",
    category: "生産完了品",
    link: "/brands/hotone/products/heart-attack",
  },
]

const announcements = [
  "HOTONE：製品保証期間延長のお知らせ - 対象製品の保証期間を2年に延長いたしました",
  "HOTONE：公式アプリのアップデート配信 - AMPERO II シリーズの新機能に対応しました",
  "HOTONE：夏季休業のお知らせ - 8月13日から8月16日まで休業させていただきます",
  "HOTONE：新製品体験会開催のお知らせ - 全国の楽器店で体験会を実施いたします",
  "HOTONE：ユーザー登録キャンペーン実施中 - 製品登録で限定プリセットをプレゼント",
]

const supportInfo = [
  "HOTONE：製品マニュアルのダウンロードページを更新しました - 日本語版マニュアルをご用意しています",
  "HOTONE：ファームウェアアップデート方法のご案内 - 製品を最新の状態に保つ方法を解説しています",
  "HOTONE：よくある質問（FAQ）を追加しました - 製品の使用方法やトラブルシューティングをご覧いただけます",
  "HOTONE：修理・保証サービスについて - 製品の修理や保証に関する情報を掲載しています",
  "HOTONE：お問い合わせ窓口のご案内 - 製品に関するご質問は専用フォームからお問い合わせください",
]

const getOrderedProducts = (category: Category) => {
  let filtered = products.filter((p) => !(p as any).hidden)
  
  if (category === "新着順") {
    return filtered.filter((p) => p.category !== "生産完了品")
  }

  return filtered.filter((p) => p.category === category)
}

export default function HotonePage() {
  const [activeTab, setActiveTab] = useState<Tab>("新着順")
  const [activeCategory, setActiveCategory] = useState<Category>("新着順")

  const filteredProducts = getOrderedProducts(activeCategory)

  return (
    <div className="min-h-screen bg-white">
      {/* Brand Introduction Banner */}
      <section className="relative w-full">
        <div className="relative h-[400px] w-full overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/design-mode/image.png"
              alt="Hotone Verbera Convolution Reverb"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>

          {/* Content */}
          <div className="relative container mx-auto h-full flex items-center px-6 lg:px-12 z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl bg-black/30 backdrop-blur-sm p-[10px]">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/3NK_FhZNvJY"
                  title="Hotone Product Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded"
                ></iframe>
              </div>

              {/* Right: Brand Description */}
              <div className="text-white space-y-4 bg-black/30 backdrop-blur-sm p-4 md:p-6 rounded-lg">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">HOTONE</h1>

                <h2 className="text-base md:text-lg font-bold leading-relaxed">
                  リアルなサウンドを実現する画期的な「CDCM」モデリングを生み出した新鋭エフェクター・ブランド
                </h2>

                <div className="space-y-3 text-xs md:text-sm leading-relaxed">
                  <p>
                    2001年頃、HOTONE開発チームはクラッシック・ペダルやオールド・アンプをどうやって再現するか、度々ブレイン・ストーミングを繰り返していました。折しも、他社がトーン・モデリングを開発していた時期です。テクニカル・ディスカッションはエスカレートして、より複雑でリアルなモデリングを目指し、CDCMテクノロジーのベースが描き出されていきました。
                  </p>

                  <p>
                    以降、開発チームは「モデリングのベースは、回路がダイナミックに変化した状態でモデリングを行うべき」という結論に達し、それ以降、マルチエフェクター等の開発を経て、よりパワフルなハードウェアをベースにモデリング手法の開発を継続しました。その結果、「スタティック・モデリング」を超え、さらにリアルなモデリング技術「CDCM」が完成しました。
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
            <div className="h-1 w-24 bg-orange-500 rounded-full"></div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 text-sm font-medium transition-colors ${
                activeCategory === category ? "bg-orange-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredProducts.map((product, index) => (
            <a
              key={`${activeCategory}-${product.id}`}
              href={product.link || "#"}
              className={`group ${product.link ? "cursor-pointer" : "cursor-default"} animate-fadeIn`}
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: "both",
              }}
              onClick={(e) => {
                if (!product.link) {
                  e.preventDefault()
                }
              }}
            >
              <div className="bg-gray-100 overflow-hidden mb-3 flex items-center justify-center">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="bg-gray-900 text-white p-3">
                <p className="text-xs font-medium mb-0.5 text-gray-400">HOTONE</p>
                <p className="text-sm font-bold mb-1 leading-tight">{product.name}</p>
                <p className="text-xs text-gray-400 leading-tight">{product.description}</p>
              </div>
            </a>
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
                  <div className="h-1 w-24 bg-orange-500"></div>
                </div>
                <p className="text-gray-600 mt-4">世界中のアーティストがHOTONEを使用しています</p>
              </div>
            </div>

            {/* More Link */}
            <a
              href="/brands/hotone/artists"
              className="group flex items-center gap-2 px-6 py-3 border-2 border-orange-600 text-orange-600 transition-all duration-300 font-medium"
            >
              <span className="text-base border-b-2 border-transparent group-hover:border-orange-600 transition-all duration-300">
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
            {/* Featured Artist - Cory Wong */}
            <a href="/brands/hotone/artists/cory-wong" className="group cursor-pointer flex-shrink-0">
              <div className="relative w-[500px] h-[500px] bg-gray-200 overflow-hidden mb-4 shadow-lg">
                <img
                  src="/hotone-cory-wong-main.png"
                  alt="Cory Wong"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 mb-1">Cory Wong</p>
                <p className="text-sm text-orange-600 font-medium mb-1">Guitarist</p>
                <p className="text-sm text-gray-600">Funk / Jazz</p>
              </div>
            </a>

            {/* Small Artists Grid */}
            <div className="grid grid-cols-2 gap-4">
              <a href="/brands/hotone/artists/kaichi-naito" className="group cursor-pointer">
                <div className="w-[240px] h-[240px] bg-gray-200 overflow-hidden mb-3 shadow-md">
                  <img
                    src="/kaichi-naito-hero.png"
                    alt="Kaichi Naito"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900 text-sm">Kaichi Naito</p>
                  <p className="text-xs text-orange-600 font-medium">Guitarist</p>
                  <p className="text-xs text-gray-600">Kawaii Future Bass</p>
                </div>
              </a>

              <a href="/brands/hotone/artists/kenji-suzuki" className="group cursor-pointer">
                <div className="w-[240px] h-[240px] bg-gray-200 overflow-hidden mb-3 shadow-md">
                  <img
                    src="/kenji-suzuki-hero.png"
                    alt="Kenji Suzuki"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900 text-sm">鈴木健治</p>
                  <p className="text-xs text-orange-600 font-medium">Guitarist / Composer</p>
                  <p className="text-xs text-gray-600">J-Pop / Session</p>
                </div>
              </a>

              <a href="/brands/hotone/artists/masatooon" className="group cursor-pointer">
                <div className="w-[240px] h-[240px] bg-gray-200 overflow-hidden mb-3 shadow-md">
                  <img
                    src="/masatooon-hero-main.png"
                    alt="MASAToooN"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900 text-sm">MASAToooN!</p>
                  <p className="text-xs text-orange-600 font-medium">8string Guitarist</p>
                  <p className="text-xs text-gray-600">Fantasy Journey</p>
                </div>
              </a>

              <a href="/brands/hotone/artists/tano-marciello" className="group cursor-pointer">
                <div className="w-[240px] h-[240px] bg-gray-200 overflow-hidden mb-3 shadow-md">
                  <img
                    src="/tano-marciello-hero.png"
                    alt="Claudio Tano Marciello"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900 text-sm">Claudio "Tano" Marciello</p>
                  <p className="text-xs text-orange-600 font-medium">Guitarist</p>
                  <p className="text-xs text-gray-600">Heavy Metal / Thrash</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Slider */}
      <BlogSlider />
    </div>
  )
}
