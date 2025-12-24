"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Download, ShoppingCart } from "lucide-react"
import { BlogSlider } from "@/components/blog-slider"
import { Button } from "@/components/ui/button"
import { downloadManual } from "@/lib/manual-download"

type Section = "concept" | "demo" | "features" | "manual" | "specs"

const navigationItems = [
  { id: "concept" as Section, label: "コンセプト" },
  { id: "demo" as Section, label: "デモムービー" },
  { id: "features" as Section, label: "主な機能" },
  { id: "manual" as "manual", label: "取扱説明書", isDownload: true },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function AmperoSwitchPlusPage() {
  const [activeSection, setActiveSection] = useState<Section>("concept")
  const [headerHeight, setHeaderHeight] = useState(72)

  const scrollToSection = (sectionId: Section) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = headerHeight + 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  const handleManualDownload = () => {
    downloadManual("hotone", "ampero-switch-plus")
  }

  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector("header")
      if (header) {
        setHeaderHeight(header.offsetHeight)
      }
    }
    updateHeaderHeight()
    window.addEventListener("resize", updateHeaderHeight)
    return () => window.removeEventListener("resize", updateHeaderHeight)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map((item) => item.id)
      const scrollPosition = window.scrollY + headerHeight + 100

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId as Section)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [headerHeight])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] overflow-hidden">
        <Image
          src="/images/brands/hotone/AMPERO_SWITCH+/hero.jpg"
          alt="AMPERO SWITCH+"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        <div className="relative container mx-auto px-6 h-full flex items-center justify-end">
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-white/30 w-96">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 tracking-wider">HOTONE</h1>
            </div>

            <div className="space-y-4 text-gray-900">
              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">製品名：</p>
                <p className="text-2xl font-bold text-gray-900">AMPERO SWITCH+</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">モーメンタリー・フットスイッチ</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-hotone">
                  ¥5,280 前後
                </p>
                <p className="text-xs text-gray-500">（税込）</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">6959473908051</p>
              </div>
            </div>

            <div className="mt-6">
              <Button
                className="w-full text-white text-base py-6 flex items-center justify-center gap-2 btn-hotone"
              >
                <ShoppingCart className="w-5 h-5" />
                購入する
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Bar */}
      <nav
        className="sticky bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-md z-40"
        style={{ top: `${headerHeight}px` }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-1 py-4 overflow-x-auto scrollbar-hide">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if ('isDownload' in item && item.isDownload) {
                    handleManualDownload()
                  } else {
                    scrollToSection(item.id as Section)
                  }
                }}
                className={`relative px-4 py-2 text-base font-medium transition-colors duration-200 whitespace-nowrap ${
                  activeSection === item.id ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <span className="flex items-center gap-2">
                  {item.label}
                  {'isDownload' in item && item.isDownload && <Download className="w-4 h-4" />}
                </span>
                {activeSection === item.id && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full hotone-bar"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Concept Section - Intro */}
      <section id="concept" className="py-20 scroll-mt-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              軽量デュアル・フットスイッチ・コントローラー
            </h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Image and Related Links */}
            <div className="space-y-8">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/brands/hotone/AMPERO_SWITCH+/intro_01.jpg"
                  alt="AMPERO SWITCH+ Introduction"
                  width={600}
                  height={400}
                  className="w-full"
                />
              </div>

              {/* 関連情報 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">関連情報</h3>
                <div className="space-y-3">
                  <a href="#" className="block text-gray-700 hover:text-gray-900 transition-colors border-b border-gray-200 pb-2">
                    AMPERO II Stage 製品情報
                  </a>
                  <a href="#" className="block text-gray-700 hover:text-gray-900 transition-colors border-b border-gray-200 pb-2">
                    AMPERO II Stomp 製品情報
                  </a>
                  <a href="#" className="block text-gray-700 hover:text-gray-900 transition-colors border-b border-gray-200 pb-2">
                    AMPERO mini 製品情報
                  </a>
                  <a href="#" className="block text-gray-700 hover:text-gray-900 transition-colors border-b border-gray-200 pb-2">
                    AMPERO ONE 製品情報
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Product Description */}
            <div className="space-y-6">
              <div className="prose max-w-none text-gray-700 space-y-4 text-sm leading-relaxed">
                <p>
                  AMPERO Switchが質感と踏みやすさの改良を加えて「Plus」としてリニューアルしました。本機は、AMPEROシリーズの追加スイッチとしてはもちろん、一般的な外部モーメンタリー・スイッチとしても利用して頂けます。
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900">「+」って何？</h4>
                
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <p className="font-bold text-gray-900">アップグレード１：Ampero II Stomp/Stage と完璧にマッチするNew白色シャーシ！</p>
                    <p>Ampero Switch+のシャーシにはAmpero II Stomp/Stageと同じアルミニウム合金素材を採用、高級感のある質感に仕上げました。</p>
                  </div>
                  
                  <div>
                    <p className="font-bold text-gray-900">アップグレード２：最適なスロープ設計により、スイッチの踏み心地が向上、スイッチが転倒する問題も回避しました。</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-blue-500 mt-0.5">✓</span>
                  <p className="text-gray-700 text-sm">コンパクトで軽量なデュアル・フットスイッチ・ペダル</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-500 mt-0.5">✓</span>
                  <p className="text-gray-700 text-sm">Ampero および Ampero II シリーズのマルチプロセッサーと完全な互換性</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-500 mt-0.5">✓</span>
                  <p className="text-gray-700 text-sm">外部制御ジャックを備えた他のデバイスでも使用可能</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-500 mt-0.5">✓</span>
                  <p className="text-gray-700 text-sm">モーメンタリー・フットスイッチ２個</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-500 mt-0.5">✓</span>
                  <p className="text-gray-700 text-sm">TRS接続ケーブル（80cm）付属</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Movie Section */}
      <section id="demo" className="py-20 scroll-mt-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">デモムービー</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/5W6pOsuOy98"
                title="AMPERO SWITCH+ Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 scroll-mt-24 bg-feature-dark">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">主な機能</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="max-w-6xl mx-auto space-y-16">
            {/* AMPEROシリーズとのペアリング */}
            <div className="space-y-8">
              <h3 className="text-xl font-bold text-white">AMPEROシリーズとのペアリング</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                6.35mm TRSケーブル（パッケージに付属）を使用して、Ampero Switch+をAmperoシリーズの外部ペダル/フットスイッチ・インターフェイスに接続し、Amperoシリーズエフェクトのグローバル設定で外部ペダルインターフェイスタイプを「dual footswitch/デュアルフットスイッチ」に設定すると、必要に応じてAmpero Switch+の2つのフットスイッチに異なる機能を割り当てることができます。
              </p>

              {/* 3 GIF Images */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="overflow-hidden">
                  <Image
                    src="/images/brands/hotone/AMPERO_SWITCH+/concept_01.gif"
                    alt="Pairing Demo 1"
                    width={400}
                    height={300}
                    className="w-full"
                    unoptimized
                  />
                </div>
                <div className="overflow-hidden">
                  <Image
                    src="/images/brands/hotone/AMPERO_SWITCH+/concept_02.gif"
                    alt="Pairing Demo 2"
                    width={400}
                    height={300}
                    className="w-full"
                    unoptimized
                  />
                </div>
                <div className="overflow-hidden">
                  <Image
                    src="/images/brands/hotone/AMPERO_SWITCH+/concept_03.gif"
                    alt="Pairing Demo 3"
                    width={400}
                    height={300}
                    className="w-full"
                    unoptimized
                  />
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed">
                もちろん、Ampero Switchは、Amperoシリーズの専用アクセサリーではありません。基本的には外部フットスイッチをサポートするデバイスであれば使用できます。特定機能は対象デバイスの機能に応じて異なります。（製品の仕様によっては互換性の無い場合もありますので、Ampero Switch+の仕様に準じた製品に限ります）
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-700"></div>

            {/* モーメンタリー型フットスイッチ説明 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="overflow-hidden">
                <Image
                  src="/images/brands/hotone/AMPERO_SWITCH+/concept_04.jpg"
                  alt="Momentary Footswitch"
                  width={600}
                  height={400}
                  className="w-full"
                />
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white">モーメンタリー型フットスイッチとは何ですか？　ラッチ式との違いは？</h3>
                
                <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
                  <p>
                    ラッチタイプのフットスイッチとは、一度トリガーされると、再度操作するまでオン状態のままになる種のフットスイッチを指します。馴染みのある例は照明のオン/オフのスイッチです。ラッチタイプのフットスイッチは、プレイヤーが継続的に押し続けるアクションを必要としないため、エフェクトペダルのオン/オフやアンプチャンネルの切り替えに最適です。
                  </p>
                  <p>
                    一方で、モーメンタリー・フットスイッチは、押されている間のみオンのままになります。モーメンタリー・フットスイッチを１回押すと、短いオン/オフの「パルス」が生成され、ほとんどのデジタル・マルチエフェクトでは、プリセットの切り替え、タップテンポ、エフェクトのオン/オフ切り替えなどの「トリガー」として認識されます。モーメンタリー・フットスイッチは主にデジタルギアを制御するために使用されています。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs Section */}
      <section id="specs" className="py-20 scroll-mt-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">製品仕様</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full bg-blue-500" />
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left - サイズ・重量 */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-2 mb-4">サイズ・重量</h3>
                <div className="space-y-3 text-sm">
                  <div className="border-b border-gray-200 pb-2">
                    <span className="text-gray-700">TRSケーブルを付属（80cm）</span>
                  </div>
                  <div className="border-b border-gray-200 pb-2">
                    <span className="text-gray-700">サイズ：102mm（W）x 63.5mm（D）x 49.6mm（H）</span>
                  </div>
                  <div className="border-b border-gray-200 pb-2">
                    <span className="text-gray-700">重量：190g</span>
                  </div>
                </div>
              </div>

              {/* Right - TRSワイヤリング図 */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4">TRSワイヤリング図</h3>
                <div className="bg-white rounded-lg p-4">
                  <Image
                    src="/images/brands/hotone/AMPERO_SWITCH+/specs_01.png"
                    alt="TRS Wiring Diagram"
                    width={400}
                    height={200}
                    className="w-full"
                  />
                </div>
                <div className="space-y-1 text-sm text-gray-700">
                  <p>FS4スイッチ = Tip</p>
                  <p>FS5スイッチ = Ring</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <p className="text-gray-500 text-sm">
                ※製品の仕様及びデザインは改良のため予告なく変更することがあります。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Slider */}
      <BlogSlider />
    </div>
  )
}

