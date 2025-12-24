"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from 'lucide-react'
import { BlogSlider } from "@/components/blog-slider"
import { downloadManual } from "@/lib/manual-download"

type Section = "concept" | "demo" | "sound" | "control" | "manual" | "specs"

const navigationItems = [
  { id: "concept" as Section, label: "コンセプト" },
  { id: "demo" as Section, label: "デモムービー" },
  { id: "sound" as Section, label: "サンプルサウンド" },
  { id: "control" as Section, label: "コントロール" },
  { id: "manual" as Section, label: "取扱説明書", isDownload: true },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function BritishInvasionPage() {
  const [activeSection, setActiveSection] = useState<Section>("concept")
  const [headerHeight, setHeaderHeight] = useState(72)

  const scrollToSection = (sectionId: Section) => {
    if (sectionId === "manual") {
      downloadManual("hotone", "british-invasion")
      return
    }

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
          src="/images/brands/hotone/BRITISH_INVASION/hero.jpg"
          alt="BRITISH INVASION"
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
                <p className="text-2xl font-bold text-gray-900">BRITISH INVASION</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">5W ギターアンプ・ヘッド</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-hotone">¥18,150</p>
                <p className="text-xs text-gray-500">前後（税込）</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">6959473901014</p>
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
              item.id === "manual" ? (
                <a
                  key={item.id}
                  href="#"
                  download
                  className="relative px-4 py-2 text-base font-medium transition-colors duration-200 whitespace-nowrap text-gray-500 hover:text-gray-700"
                >
                  <span className="flex items-center gap-2">
                    {item.label}
                  </span>
                </a>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id as Section)}
                  className={`relative px-4 py-2 text-base font-medium transition-colors duration-200 whitespace-nowrap ${
                    activeSection === item.id ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.label}
                  </span>
                  {activeSection === item.id && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-200 hotone-nav-indicator"
                    />
                  )}
                </button>
              )
            ))}
          </div>
        </div>
      </nav>

      {/* Concept Section */}
      <section id="concept" className="py-20 scroll-mt-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              ビンテージ VOX AC30のサウンドを元にした
            </h2>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              5W アナログ・ギターアンプ
            </h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Image */}
            <div>
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src="/images/brands/hotone/BRITISH_INVASION/intro.jpg"
                  alt="BRITISH INVASION"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>

              {/* 関連情報 */}
              <div className="mt-8 pt-6 border-t border-gray-300">
                <h4 className="text-sm font-bold text-gray-900 mb-4">関連情報</h4>
                <div className="space-y-2">
                  <a href="/brands/hotone/products/spc-cable" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span>SPC スピーカー・ケーブル 製品情報</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Description */}
            <div className="space-y-6">
              <p className="text-sm text-gray-500 uppercase tracking-wider">hotone BRITISH INVASION</p>
              <p className="text-gray-700 leading-relaxed">
                BRITISH INVASIONは、5W／クラスABのギター用ヘッドアンプです。低いゲイン設定でビンテージVOX AC30のサウンドが再現できるように設計しています。
              </p>
              <p className="text-gray-700 leading-relaxed">
                本機からスピーカーへの出力は4Ω～16Ωに自動対応します。自宅用の小型キャビネットだけでなく、スタジオで4 x 12&quot;の大型キャビネットに接続して迫力のサウンドを楽しむこともできます。
              </p>
              <p className="text-gray-700 leading-relaxed">
                本機は、エフェクト・ループ、ライン／ヘッドフォン出力、音楽プレイヤーと接続できるAUXインプットを備えています。練習やホーム・レコーディングにも最適なツールです。
              </p>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">440g、128（W）x 75（D）x 59.5mm（H）の軽量＆コンパクト設計</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">ハイクオリティートーンを再生する、ボリューム、ゲインの各コントロール。</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">トーンシェーピング用3バンドEQ。</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">外部エフェクターを接続できるエフェクト・ループ。</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">4～16Ωのキャビネットに自動的に対応するパワーアンプ設計。</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">練習やレコーディングに便利なヘッドフォン／ライン出力を搭載。</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">音楽プレイヤーが接続可能なAux In端子。</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Movie Section */}
      <section id="demo" className="py-20 scroll-mt-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">デモムービー</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/6pcBGH8ZDs4"
                  title="BRITISH INVASION Demo 1"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/gk9aoTFUFbo"
                  title="BRITISH INVASION Demo 2"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Sound Section */}
      <section id="sound" className="py-16 scroll-mt-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">サンプルサウンド</h2>
            <div className="flex justify-center mt-4">
              <div className="w-16 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl shadow-md p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-lg">🎵</span>
                <p className="font-medium text-gray-900 text-sm">BRITISH INVASION Overview Demo</p>
              </div>
              <audio controls className="w-full h-10">
                <source src="/images/brands/hotone/BRITISH_INVASION/sound_01.mp3" type="audio/mpeg" />
              </audio>
            </div>
          </div>
        </div>
      </section>

      {/* Control Section */}
      <section id="control" className="py-20 scroll-mt-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">コントロール</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8">
              <div className="space-y-8">
                <div>
                  <Image
                    src="/images/brands/hotone/BRITISH_INVASION/control_01.png"
                    alt="BRITISH INVASION Top Panel"
                    width={1000}
                    height={400}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="border-t border-gray-200 pt-8">
                  <Image
                    src="/images/brands/hotone/BRITISH_INVASION/control_02.png"
                    alt="BRITISH INVASION Back Panel"
                    width={1000}
                    height={400}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manual Section - Hidden, triggers download */}
      <div id="manual" className="hidden"></div>

      {/* Specs Section */}
      <section id="specs" className="py-20 scroll-mt-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h3 className="text-base font-bold text-gray-900 mb-4">
                入出力、その他
              </h3>
              <div className="space-y-0">
                <div className="py-3 border-b border-gray-200">
                  <p className="text-gray-700 text-sm">電源：専用DC18Vパワーサプライ（付属）</p>
                </div>
                <div className="py-3 border-b border-gray-200">
                  <p className="text-gray-700 text-sm">サイズ：128（W） x 75（D） x 59.5mm（H）</p>
                </div>
                <div className="py-3 border-b border-gray-200">
                  <p className="text-gray-700 text-sm">重量：440g</p>
                </div>
              </div>
              <div className="mt-6 space-y-1">
                <p className="text-gray-500 text-xs">※製品の仕様及びデザインは改良のため予告なく変更することがあります。</p>
                <p className="text-gray-500 text-xs">※本製品以外の製品名および会社名は、各社の商号、登録商標または商標です。本文中で使用している名称は、音色の傾向をお伝えする目的で使用しております。</p>
              </div>
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

