"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Download } from 'lucide-react'
import { BlogSlider } from "@/components/blog-slider"
import { downloadManual } from "@/lib/manual-download"

type Section = "concept" | "demo" | "manual" | "specs"

const navigationItems = [
  { id: "concept" as Section, label: "コンセプト" },
  { id: "demo" as Section, label: "デモムービー" },
  { id: "manual" as "manual", label: "取扱説明書", isDownload: true },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function AmperoIIPressPage() {
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
      setActiveSection(sectionId)
    }
  }

  const handleManualDownload = () => {
    downloadManual("hotone", "ampero-ii-press")
  }

  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector("header")
      if (header) {
        const height = header.getBoundingClientRect().height
        setHeaderHeight(height)
      }
    }

    updateHeaderHeight()
    window.addEventListener("scroll", updateHeaderHeight)
    window.addEventListener("resize", updateHeaderHeight)

    return () => {
      window.removeEventListener("scroll", updateHeaderHeight)
      window.removeEventListener("resize", updateHeaderHeight)
    }
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
            setActiveSection(sectionId)
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
          src="/images/brands/hotone/ampero_ii_press/hero.jpg"
          alt="AMPERO II PRESS"
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
                <p className="text-2xl font-bold text-gray-900">AMPERO Ⅱ PRESS</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">Passive Switch</p>
                <p className="text-base text-gray-900">EXP Pedal</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-hotone">
                  ¥16,280 <span className="text-sm font-normal">前後（税込）</span>
                </p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">6959473904107</p>
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
          <div className="flex items-center justify-center gap-8 overflow-x-auto py-4 scrollbar-hide">
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
                  {'isDownload' in item && item.isDownload && (
                    <Download className="w-4 h-4" />
                  )}
                </span>
                {activeSection === item.id && !('isDownload' in item) && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-200 hotone-nav-indicator"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Intro Section */}
      <section className="py-20 scroll-mt-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Catering to Musicians&apos; Habits with Easy Pedal State Switching
            </h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Image and Related Info */}
            <div className="space-y-6">
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src="/images/brands/hotone/ampero_ii_press/intro.jpg"
                  alt="AMPERO II PRESS"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>

              {/* Related Info */}
              <div className="space-y-3">
                <h4 className="font-bold text-gray-900 border-b border-gray-300 pb-2">関連情報</h4>
                <a href="/brands/hotone/products/ampero-ii-stomp" className="block text-gray-700 hover:text-orange-500 transition-colors">
                  AMPERO Ⅱ STOMP　製品情報
                </a>
                <a href="/brands/hotone/products/ampero-ii-stage" className="block text-gray-700 hover:text-orange-500 transition-colors">
                  AMPERO Ⅱ STAGE　製品情報
                </a>
              </div>
            </div>

            {/* Right Column - Description */}
            <div className="space-y-6">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  従来の外部エクスプレッションペダルは、エフェクターのパラメーターのみをコントロールするものがほとんどです。そのため、エフェクターの状態や機能を変更するにはエフェクター上のスイッチを使用する必要がありました。Ampero II Pressはフットスイッチを備えており、この問題を完全に解決します。また、フットスイッチ構造も最適化され、優れた触覚のスイッチングが足に伝わります。パッシブ回路で設計されており、信頼性が高く、電源も必要なく便利です。 ステージでもスタジオでも、Ampero II Pressの使用でパフォーマンスに並外れた表現力を加えることができます。
                </p>
              </div>

              {/* Features List */}
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 mt-1">✓</span>
                  <span className="text-gray-700">フットスイッチ付きエクスプレッションペダル</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 mt-1">✓</span>
                  <span className="text-gray-700">独立フットスイッチ＆エクスプレッション出力ジャック</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 mt-1">✓</span>
                  <span className="text-gray-700">パッシブ設計 - 電源不要</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 mt-1">✓</span>
                  <span className="text-gray-700">頑丈なアルミニウム合金ケース</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 mt-1">✓</span>
                  <span className="text-gray-700">高品質ポテンショメータによる正確なレスポンスと長寿命の保証</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 mt-1">✓</span>
                  <span className="text-gray-700">「クリック」フットスイッチと最適化された構造により鋭い物理的フィードバックを実現</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Concept Section */}
      <section id="concept" className="py-20 scroll-mt-24 bg-concept-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">製品コンセプト</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full bg-orange-500" />
            </div>
          </div>

          <div className="space-y-16">
            {/* Concept 1 - 強化されたフットスイッチングの感触 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="rounded-xl overflow-hidden">
                <Image
                  src="/images/brands/hotone/ampero_ii_press/concept_01.jpg"
                  alt="AMPERO II PRESS"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
              <div className="text-gray-300 space-y-8">
                {/* First Topic */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">強化されたフットスイッチングの感触</h3>
                  <p className="leading-relaxed">
                    エフェクターの内蔵フットスイッチは、通常フットスイッチをシミュレートするためにゴム製のパッドを使用するので、安心できるスイッチングの感触が得られません。
                  </p>
                  <p className="leading-relaxed">
                    一方、Ampero II Pressは独自の「クリック」を発するフットスイッチを採用しており、ステージでの演奏中でもペダルスイッチングの感触を確実に感じることができます。
                  </p>
                </div>

                <div className="border-t border-gray-700" />

                {/* Second Topic */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">主要エフェクターとの高い互換性</h3>
                  <p className="leading-relaxed">
                    Ampero II Press＆Ampero II Stageの組み合わせ、その互換性は他を圧倒します。
                  </p>
                  <p className="leading-relaxed">
                    Ampero II Press は、EXP OUT＆FS OUTを介してエフェクトユニットに接続できるため、デュアルEXPインターフェイスを備えたあらゆるエフェクトユニットに適しています。 デュアルEXPインターフェースを備えたさまざまなブランドのエフェクターのコントロールに最適です。
                  </p>
                </div>

                <div className="border-t border-gray-700" />
              </div>
            </div>

            {/* Connection Diagram */}
            <div className="flex justify-center">
              <div className="max-w-2xl w-full">
                <Image
                  src="/images/brands/hotone/ampero_ii_press/concept_01.svg"
                  alt="AMPERO II PRESS Connection"
                  width={600}
                  height={300}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Movie Section */}
      <section id="demo" className="py-20 scroll-mt-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
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
                src="https://www.youtube.com/embed/eF_5qTrwBww"
                title="AMPERO II PRESS Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Specs Section */}
      <section id="specs" className="py-20 scroll-mt-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">製品仕様</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full bg-teal-500" />
            </div>
          </div>

          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Column */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">ポテンショメーター・インピーダンス</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>EXP/エクスプレッション）：1/4&quot;（6.35mm）TRS、10kΩ、リニア</p>
                    <p>FOOTSWITCH/フットスイッチ：1/4&quot;（6.35mm）TRS、モーメンタリー</p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">サイズ・重量</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>サイズ：81mm（W）x 162mm（D）x 51mm（H）</p>
                    <p>重量：455g</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
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

