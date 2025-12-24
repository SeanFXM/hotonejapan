"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Download } from 'lucide-react'
import { BlogSlider } from "@/components/blog-slider"
import { downloadManual } from "@/lib/manual-download"

type Section = "concept" | "compare" | "manual" | "specs"

const navigationItems = [
  { id: "concept" as Section, label: "コンセプト" },
  { id: "compare" as Section, label: "比較表" },
  { id: "manual" as "manual", label: "取扱説明書", isDownload: true },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function AmperoPress25kPage() {
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
    downloadManual("hotone", "ampero-press-25k")
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
          src="/images/brands/hotone/AMPERO_PRESS_25k/hero.jpg"
          alt="AMPERO Press 25k"
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
                <p className="text-2xl font-bold text-gray-900">AMPERO Press 25k</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">EXP＆ボリュームペダル</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-hotone">
                  ¥11,000
                </p>
                <p className="text-xs text-gray-500">前後（税込）</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">6959473907245</p>
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

      {/* Concept Section */}
      <section id="concept" className="py-20 scroll-mt-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Ampero Press 25kΩ Edition
            </h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Product Image and Related Info */}
            <div className="space-y-8">
              <div>
                <Image
                  src="/images/brands/hotone/AMPERO_PRESS_25k/intro_01.gif"
                  alt="AMPERO Press 25k"
                  width={500}
                  height={400}
                  className="w-full max-w-md mx-auto h-auto"
                  unoptimized
                />
              </div>

              <div className="border-t border-gray-200 pt-6">
                <p className="text-sm font-medium text-gray-700 mb-3">関連情報</p>
                <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm">
                  <span className="text-yellow-500">☆</span>
                  <span>AMPERO PRESS（10kΩ）</span>
                </a>
              </div>
            </div>

            {/* Right Column - Description and Features */}
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                AMPERO PRESS 25kは、エクスプレッションのインピーダンスを、strymonやLINE6など、多くのエフェクターが採用する「25kΩ」に合わせた特注モデルです。機能はAMPERO PRESS（10kΩ）と同様に、外部エクスプレション・ペダルとして、多くのコントロール機能を外部からコントロールできるのはもちろん、独立したボリューム・ペダル（パッシブ）としても使用可能です。
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <p className="text-gray-700 text-sm">
                    <strong>INPUT（入力）</strong>：1/4&quot;モノ入力ジャック
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <p className="text-gray-700 text-sm">
                    <strong>EXP OUT（エクスプレッション出力 / 25kΩ）</strong>：エクスプレッション専用の1/4&quot; TRSジャックです。外部機器のEXP INにTRSケーブルで接続します。接続する機器の推奨EXPインピーダンスを確認してください。VolとEXPが同時に使用できます。
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <p className="text-gray-700 text-sm">
                    <strong>OUTPUT（出力）</strong>：1/4&quot;モノ出力
                  </p>
                </div>
              </div>

              {/* Connection Diagram */}
              <div className="mt-8">
                <Image
                  src="/images/brands/hotone/AMPERO_PRESS_25k/intro_02.png"
                  alt="AMPERO Press 25k Connection Diagram"
                  width={600}
                  height={300}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compare Section */}
      <section id="compare" className="py-20 scroll-mt-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">比較表</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>
          <div className="max-w-4xl mx-auto">
            <Image
              src="/images/brands/hotone/AMPERO_PRESS_25k/compare_01.png"
              alt="製品比較表"
              width={1000}
              height={600}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Specs Section */}
      <section id="specs" className="py-20 scroll-mt-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left Column - ポテンショメーター・インピーダンス */}
                <div className="p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                    ポテンショメーター・インピーダンス
                  </h3>
                  <div className="space-y-3">
                    <div className="py-2 border-b border-gray-100">
                      <span className="text-gray-700">VOL ボリューム：100kΩ</span>
                    </div>
                    <div className="py-2 border-b border-gray-100">
                      <span className="text-gray-700">EXP エクスプレッション：25kΩ</span>
                    </div>
                  </div>
                </div>

                {/* Right Column - サイズ・重量 */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                    サイズ・重量
                  </h3>
                  <div className="space-y-3">
                    <div className="py-2 border-b border-gray-100">
                      <span className="text-gray-700">サイズ：81mm（W）x 162mm（D）x 51mm（H）</span>
                    </div>
                    <div className="py-2 border-b border-gray-100">
                      <span className="text-gray-700">重量：430g</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="mt-6">
              <p className="text-gray-600 text-sm">
                ※製品の仕様及びデザインは改良のため予告なく変更することがあります。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Slider */}
      <BlogSlider />

      {/* Back to Products Button */}
      <div className="container mx-auto px-6 py-12 bg-white">
        <a
          href="/brands/hotone"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-colors rounded-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          製品一覧に戻る
        </a>
      </div>
    </div>
  )
}

