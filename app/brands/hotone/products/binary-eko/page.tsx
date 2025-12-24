"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Download } from 'lucide-react'
import { BlogSlider } from "@/components/blog-slider"
import { downloadManual } from "@/lib/manual-download"

type Section = "concept" | "demo" | "controls" | "software" | "manual" | "specs"

const navigationItems = [
  { id: "concept" as Section, label: "コンセプト" },
  { id: "demo" as Section, label: "デモムービー" },
  { id: "controls" as Section, label: "コントロール" },
  { id: "software" as Section, label: "ソフトウエア" },
  { id: "manual" as "manual", label: "取扱説明書", isDownload: true },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function BinaryEkoPage() {
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
    downloadManual("hotone", "binary-eko")
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
          src="/images/brands/hotone/BINARY_EKO/hero.jpg"
          alt="BINARY EKO"
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
                <p className="text-2xl font-bold text-gray-900">BINARY EKO</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">ディレイ・エフェクター</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-hotone">
                  ¥19,800
                </p>
                <p className="text-xs text-gray-500">前後（税込）</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">6959473910030</p>
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

      {/* Intro Section - White Background */}
      <section className="py-20 scroll-mt-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              遅れ具合がたまらないエコーボックス
            </h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Image and Related Info */}
            <div className="space-y-6">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/brands/hotone/BINARY_EKO/intro.jpg"
                  alt="Binary Eko"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>

              {/* Related Information */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <h3 className="font-bold text-gray-900 text-lg mb-4">関連情報</h3>
                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200">
                    <div className="w-2 h-2 rounded-full hotone-dot" />
                    <span className="text-gray-900">搭載エフェクトリスト</span>
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200">
                    <div className="w-2 h-2 rounded-full hotone-dot" />
                    <span className="text-gray-900">XTOMP 製品情報</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Product Description and Features */}
            <div className="space-y-6">
              <div>
                <div className="prose max-w-none mb-8">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Binary シリーズは、XTOMPと同様にHOTONE独自のモデリングテクノロジー「CDCM」を採用し、各機種がそれぞれのエフェクトカテゴリーをより深く使用できるように設計され、プリセットの保存やリコールをフルに活用することができます。
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    Binary EKOは、アナログ、テープ、新旧のデジタルディレイを17種類搭載しました。最長4秒のディレイタイムで、アナログやテープディレイでは実現できなかったサウンド。リピート音にLofi、トレモロ、スィープフィルター、リングモジュレーター等の効果が得られるプリセットも搭載しました。また、ステレオイン→ステレオアウトが可能ですから、ピンポンディレイは当たり前の効果でしょう。
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">XTOMPのテクノロジーを採用したファミリーモデル</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">デュアルDSPプラットフォームが導く高いサウンドクォリティー</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">110dB S/N比を実現した24-bit A/D/A変換</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">変更可能な最長ディレイタイム：1000ms〜4000ms</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">タップテンポ機能</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">ステレオ入出力</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">ファームウェアのアップデート、アルゴリズムのロード＆マネージメントが可能なFree PC/Mac ソフトウェア等が可能なUSBポートを装備しました。</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">10 プリセット（2 presets x 5 banks）</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Wrapper */}
      <div>
        {/* Concept Section - Dark Background */}
        <section id="concept" className="py-16 scroll-mt-24 bg-concept-dark">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">製品コンセプト</h3>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 rounded-full hotone-bar" />
              </div>
            </div>

            <div className="space-y-16 max-w-6xl mx-auto">
              {/* First Block - Video + Text */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Left - Video */}
                <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/lpMF52JVOWg"
                    title="Hotone Binary EKO"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>

                {/* Right - Text */}
                <div>
                  <h4 className="text-2xl font-bold text-white mb-6">
                    XTOMPから特化することで、深く、使いやすく
                  </h4>
                  <div className="space-y-4">
                    <p className="text-gray-300 leading-relaxed">
                      XTOMPの完成直後私たちは、プレーヤーがより使いやすく＆便利なツールを開発することに決定しました。あらゆる種類のエフェクターやアンプがロードでき、プレイできるXTOMP。それに対し、プリセットのリコールやより多くのパラメーターの設定可能なエフェクトで再現しようというプロジェクトがBinaryシリーズの開発でした。
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      BinaryシリーズもXTOMP同様、HOTONE独自のモデリングテクノロジーCDCMを採用しています。BinaryはXTOMPやXTOMP miniとは異なり、各機種がそれぞれのエフェクトカテゴリーをより深く使用できるようにデザインされています。各モデルはよりコンベンショナルなエフェクターのように、コンパクトなシャーシに2xフットスイッチ、入出力レベル、白色OLEDディスプレイを備えています。また、各種ともにデジタルマルチエフェクトのように、プリセットの保存やリコールをフルに活用することもできます。
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-700" />

              {/* Second Block - CDCM Description */}
              <div>
                <h4 className="text-xl font-bold text-white mb-6">
                  CDCM：コンプリヘンシブ・ダイナミック・サーキット・モデリング
                </h4>
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed">
                    Binaryシリーズは、カスタムDSPやARMチップによるデュアルDSPプラットフォームを採用することにより、シグナルプロセッシングの処理能力を改善し、さらにリッチでオーガニックなサウンドを実現しています。オーディオ変換は、24-bit A/D/A、44.1kHzサンプリングを使用し110dB S/N比の高い性能をクリアしました。このプラットフォームが、HOTONE独自のモデリングテクノロジーCDCMの迫力あるリアルなサウンドをお届けするプラットフォームです。
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    全モデルは信号のロスを防ぐためバッファードバイパスを採用しています。新たに設計したこのバッファーアンプは原音を損ないません。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Movie Section */}
        <section id="demo" className="py-20 scroll-mt-24 bg-gray-100">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">デモムービー</h2>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 rounded-full hotone-bar" />
              </div>
            </div>

            <div className="max-w-6xl mx-auto space-y-6">
              {/* Top Row - 2 Videos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/lpMF52JVOWg"
                    title="BINARY EKO Demo 1"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/eObgFI1l_Mc"
                    title="BINARY EKO Demo 2"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
              {/* Bottom Row - 3 Videos */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/2eFR28aJVsQ"
                    title="BINARY EKO Demo 3"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/kyw5jup4aBA"
                    title="BINARY EKO Demo 4"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/ywHpfRutBl8"
                    title="BINARY EKO Demo 5"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
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
                  src="/images/brands/hotone/BINARY_EKO/control_01.png"
                  alt="BINARY EKO Top Panel"
                  width={800}
                  height={400}
                  className="rounded-lg w-full"
                />
              </div>

              <div className="flex justify-center">
                <Image
                  src="/images/brands/hotone/BINARY_EKO/control_02.png"
                  alt="BINARY EKO Back Panel"
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
              <div className="bg-gray-100 rounded-xl p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  {/* Left - Software Screenshot */}
                  <div>
                    <Image
                      src="/images/brands/hotone/BINARY_EKO/software_01.jpg"
                      alt="Binary Editor"
                      width={600}
                      height={400}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>

                  {/* Right - Download Info */}
                  <div className="space-y-6">
                    {/* BINARY EDITOR */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">BINARY EDITOR（Mac / Win）</h3>
                      <p className="text-gray-700 text-sm leading-relaxed mb-3">
                        Binaryシリーズは全て機種にUSB端子を備えています。付属のUSBケーブルを使用してコンピューターと接続し、プリセット管理やパラメーター設定がPC (or Mac)上で行えます。エディター・ソフトウェアは、スクリーンショットのように非常にシンプルで、直感的に操作して頂けます。
                      </p>
                      <p className="text-gray-700 text-sm leading-relaxed mb-3">
                        PC上で操作したプリセットはコンピューターに保存できます。それらのプリセットを本体へインポート／エクスポートも可能です。さらに、プリセットのエフェクト（モデル）の説明も表示されますので、エミュレーションのベースになった機種名、各コントロールの詳細が確認できます。
                      </p>
                      <p className="text-gray-700 text-sm leading-relaxed mb-4">
                        「Binary Editor」は下記のリンクからダウンロードすることができます。最新版はメーカーサイトよりダウンロードしてください。
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

                    {/* Firmware Update */}
                    <div className="pt-4 border-t border-gray-300">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">ファームウェア・アップデート</h3>
                      <p className="text-gray-700 text-sm leading-relaxed mb-4">
                        ダウンロードはこちらのページから「Firmware for Binary EKO」をご覧ください
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
            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8">
                  {/* Left Column - INPUT / OUTPUT セクション */}
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-4">
                      INPUT / OUTPUT セクション
                    </h3>
                    <div className="space-y-2">
                      <p className="text-gray-700 text-sm">入力：1/4インチ・モノラル・フォーン端子</p>
                      <p className="text-gray-700 text-sm">入力インピーダンス：1M Ohms</p>
                      <p className="text-gray-700 text-sm">出力：1/4インチ・モノラル・フォーン端子 x2</p>
                      <p className="text-gray-700 text-sm">出力インピーダンス：100 Ohms</p>
                      <p className="text-gray-700 text-sm">エクスプレッション入力</p>
                      <p className="text-gray-700 text-sm">USB端子</p>
                    </div>
                  </div>

                  {/* Right Column - デジタル・セクション & その他 */}
                  <div className="space-y-8">
                    {/* デジタル・セクション */}
                    <div>
                      <h3 className="text-base font-bold text-gray-900 mb-4">
                        デジタル・セクション
                      </h3>
                      <div className="space-y-2">
                        <p className="text-gray-700 text-sm">搭載エフェクト数：17</p>
                        <p className="text-gray-700 text-sm">プリセット数：2 BANK x 5</p>
                        <p className="text-gray-700 text-sm">プロセッシング：24bit / 44.1kHz</p>
                        <p className="text-gray-700 text-sm">オーディオ周波数特性：20Hz〜20kHz</p>
                        <p className="text-gray-700 text-sm">S/N 比：110dB</p>
                      </div>
                    </div>

                    {/* その他 */}
                    <div>
                      <h3 className="text-base font-bold text-gray-900 mb-4">
                        その他
                      </h3>
                      <div className="space-y-2">
                        <p className="text-gray-700 text-sm">電源：9V DC センターマイナス</p>
                        <p className="text-gray-700 text-sm">消費電流：最大200mA</p>
                        <p className="text-gray-700 text-sm">サイズ：121mm（D） x 72mm（W） x 47mm（H）</p>
                        <p className="text-gray-700 text-sm">重量：340g</p>
                      </div>
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

