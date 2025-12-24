"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Download, ChevronDown } from 'lucide-react'
import { BlogSlider } from "@/components/blog-slider"
import { downloadManual } from "@/lib/manual-download"

type Section = "demo" | "controls" | "software" | "manual" | "specs"

const navigationItems = [
  { id: "demo" as Section, label: "デモムービー" },
  { id: "controls" as Section, label: "コントロール" },
  { id: "software" as Section, label: "ソフトウエア" },
  { id: "manual" as "manual", label: "取扱説明書", isDownload: true },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function OmniIRPage() {
  const [activeSection, setActiveSection] = useState<Section>("demo")
  const [headerHeight, setHeaderHeight] = useState(72)
  const [expandedSoftware, setExpandedSoftware] = useState<{
    firmware: boolean
  }>({
    firmware: false,
  })

  const toggleSoftware = (key: "firmware") => {
    setExpandedSoftware((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

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
    downloadManual("hotone", "omni-ir")
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
          src="/images/brands/hotone/OMNI_IR/hero.jpg"
          alt="OMNI IR"
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
                <p className="text-2xl font-bold text-gray-900">OMNI IR</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">キャビネット・シミュレーター</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-hotone">
                  ¥24,200
                </p>
                <p className="text-xs text-gray-500">前後（税込）</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">6959473909065</p>
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              IRベースの高品位キャビネット・シミュレーター
            </h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Video and Related Info */}
            <div className="space-y-6">
              {/* YouTube Video */}
              <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/639phiv4IX8"
                  title="Hotone Omni IR - Introduction"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              {/* Related Information */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <h3 className="font-bold text-gray-900 text-lg mb-4">関連情報</h3>
                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200">
                    <div className="w-2 h-2 rounded-full hotone-dot" />
                    <span className="text-gray-900">参考資料：IRローダーペダルの基本性能比較表</span>
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200">
                    <div className="w-2 h-2 rounded-full hotone-dot" />
                    <span className="text-gray-900">OMNI AC 製品情報</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Product Description and Features */}
            <div className="space-y-6">
              <div>
                <div className="prose max-w-none mb-8">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Omni IRは、IRベース（Impulse Response /インパルス・レスポンス）のキャビネット・シミュレーターです。高品位のサウンドをお届けできる24bit / 48kHzのデジタルスペックに、内部のアナログ回路は9V入力電源を昇圧し、+8dBuを超える入力信号に対応する高いヘッドルームを実現しました。
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-4">
                    有機ELスクリーンは、小型ながらエディティング、プログラムリコール、フットスイッチ機能の設定が非常に見やすく、スピーディーな操作が実行できます。PC接続によるエディティングにも対応しています。
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    充実した入出力とミニサイズ、レコーディングにもライブセットアップにも対応します。
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">コンパクトサイズのIRローダー・ペダル</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">高速演算性能を誇るDSPプラットフォーム+24-bit A/D/Aコンバーターを採用</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">アナログ電源回路に入力電源9VDCより高い電圧を採用し、+8.2dBu最大入力レベルの高いダイナミクスを実現</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">40種の高品位IRギター/ベースキャビネット</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">4-band EQ、±最大12dBを搭載</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">サードパーティーIRファイルのロードが可能</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">USBジャック：ファームウェア・アップデート、エディティング・ソフト（フリー）に使用</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">Aux In、ヘッドフォン出力を装備</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">40プリセットロケーション</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">有機ELディスプレイを採用</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">アサイン可能なフットスイッチ</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">9V DC アダプター付属</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Wrapper */}
      <div>
        {/* Demo Movie Section */}
        <section id="demo" className="py-20 scroll-mt-24 bg-gray-100">
          <div className="container mx-auto px-6">
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
                  src="https://www.youtube.com/embed/wefflTXW8OI"
                  title="OMNI IR Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Controls Section */}
        <section id="controls" className="py-20 scroll-mt-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">コントロール</h2>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 rounded-full hotone-bar" />
              </div>
            </div>

            <div className="max-w-4xl mx-auto space-y-12">
              <div className="flex justify-center">
                <Image
                  src="/images/brands/hotone/OMNI_IR/control_01.png"
                  alt="OMNI IR Top Panel"
                  width={800}
                  height={400}
                  className="rounded-lg w-full"
                />
              </div>

              <div className="flex justify-center">
                <Image
                  src="/images/brands/hotone/OMNI_IR/control_02.png"
                  alt="OMNI IR Back Panel"
                  width={800}
                  height={400}
                  className="rounded-lg w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Software Section */}
        <section id="software" className="py-20 scroll-mt-24 bg-gray-100">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">ソフトウエア</h2>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 rounded-full hotone-bar" />
              </div>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="bg-gray-200 rounded-2xl p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  {/* Left - Software Screenshot */}
                  <div>
                    <Image
                      src="/images/brands/hotone/OMNI_IR/software_01.jpg"
                      alt="OMNI Editor"
                      width={600}
                      height={400}
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>

                  {/* Right - Download Info */}
                  <div className="space-y-8">
                    {/* OMNI EDITOR SETUP */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">OMNI EDITOR SETUP（Mac / Win）</h3>
                      <p className="text-gray-700 text-sm mb-4">
                        「OMNI EDITOR SETUP」は下記のリンクからダウンロードすることができます。最新版はメーカーサイトよりダウンロードしてください。
                      </p>
                      <a
                        href="https://www.hotoneaudio.com/support/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
                      >
                        <Download className="w-5 h-5" />
                        ダウンロードページ
                      </a>
                    </div>

                    <div className="border-t border-gray-300" />

                    {/* Firmware Update */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">ファームウェア・アップデート</h3>
                      <p className="text-gray-700 text-sm mb-4">
                        ダウンロードはこちらのページから「Omni IR」をご覧ください
                      </p>
                      <a
                        href="https://www.hotoneaudio.com/support/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
                      >
                        <Download className="w-5 h-5" />
                        ダウンロードページ
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specs Section */}
        <section id="specs" className="py-20 scroll-mt-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">製品仕様</h2>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 rounded-full hotone-bar" />
              </div>
            </div>
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8">
                  {/* Left Column - INPUT / OUTPUT セクション */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-6">
                      INPUT / OUTPUT セクション
                    </h3>
                    <div className="space-y-3">
                      <p className="text-gray-700 text-sm">入力：1/4インチ・モノラル・フォーン端子</p>
                      <p className="text-gray-700 text-sm">入力インピーダンス：1M Ohms</p>
                      <p className="text-gray-700 text-sm">最大入力レベル：+8.2dBu</p>
                      <p className="text-gray-700 text-sm">出力：1/4インチ・モノラル・フォーン端子（アンバランス）</p>
                      <p className="text-gray-700 text-sm">THRU 出力：1/4インチ・モノラル・フォーン端子（アンバランス）</p>
                      <p className="text-gray-700 text-sm">出力：XLR端子（バランス）</p>
                      <p className="text-gray-700 text-sm">出力インピーダンス：100 Ohms</p>
                      <p className="text-gray-700 text-sm">最大出力レベル（アンバランス）：+8.2dBu @Bypass、+17dBu @EFX</p>
                      <p className="text-gray-700 text-sm">最大出力レベル（XLR）：+16.4dBu @Bypass、+34dBu @EFX</p>
                      <p className="text-gray-700 text-sm">AUX入力：1/8インチ・ステレオ・フォーン端子</p>
                      <p className="text-gray-700 text-sm">ヘッドホン出力：1/8インチ・ステレオ・フォーン端子</p>
                      <p className="text-gray-700 text-sm">USB端子</p>
                    </div>
                  </div>

                  {/* Right Column - その他 */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-6">
                      その他
                    </h3>
                    <div className="space-y-3">
                      <p className="text-gray-700 text-sm">電源：9V DC センターマイナス</p>
                      <p className="text-gray-700 text-sm">消費電流：最大200mA</p>
                      <p className="text-gray-700 text-sm">サイズ：101mm（D）x 58mm（W）x 47mm（H）</p>
                      <p className="text-gray-700 text-sm">重量：224g</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

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

