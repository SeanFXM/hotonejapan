"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { BlogSlider } from "@/components/blog-slider"

type Section = "concept" | "movie" | "sound" | "control" | "specs"

const navigationItems = [
  { id: "concept" as Section, label: "コンセプト" },
  { id: "movie" as Section, label: "デモムービー" },
  { id: "sound" as Section, label: "サンプルサウンド" },
  { id: "control" as Section, label: "コントロール" },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function VowPressPage() {
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
          src="/images/brands/hotone/VOW_PRESS/hero.jpg"
          alt="VOW PRESS"
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
                <p className="text-2xl font-bold text-gray-900">VOW PRESS</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">ワウ＆ボリュームペダル</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-hotone">¥12,100</p>
                <p className="text-xs text-gray-500">前後（税込）</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">6959473904046</p>
              </div>

              <div className="pt-2">
                <p className="text-base font-bold text-gray-900">生産完了品</p>
              </div>
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
                onClick={() => scrollToSection(item.id)}
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
            ))}
          </div>
        </div>
      </nav>

      {/* Concept Section */}
      <section id="concept" className="py-20 scroll-mt-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              ワウ＆ボリューム・ペダルを瞬時に切り替えられます
            </h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Image */}
            <div>
              <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-200 p-8">
                <Image
                  src="/images/brands/hotone/VOW_PRESS/intro.jpg"
                  alt="VOW PRESS"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
              <div className="mt-8 pt-6 border-t border-gray-300">
                <h4 className="text-sm font-bold text-gray-900 mb-3">関連情報</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>◆ SOUL PRESS 製品情報</li>
                  <li>◆ BASS PRESS 製品情報</li>
                </ul>
              </div>
            </div>

            {/* Right Column - Description */}
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                VOW PRESS は、コンパクトなボディサイス＆使い勝手はそのままに、ワウとボリュームを瞬時に切り替えられる V/W モードを搭載しました。ワウは、SOUL PRESSを少し抑えたジェントルなビンテージサウンドに仕上がっています。ペダルボード内でスペース確保が悩ましい足踏みペダル。VOW PRESS がボリュームとワウの2台分のスペースを1台で解決します。
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>トゥルー・バイパス仕様</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>340g、62.5（W）× 138（D）× 51mm（H）の軽量＆コンパクト設計</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>ボリューム / ワウ / V/W の３モードの選択が可能</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Crybaby サウンドを再現するワウペダル・モード</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>ボリューム・ペダルは、音質に影響を与えないバッファード・アクティブ方式</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>ボトムレンジの調整が可能（ボリューム・モードのみ）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>亜鉛ダイキャスト製シャーシ</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>センターマイナス9V DC、9V乾電池、20mA駆動</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Movie Section */}
      <section id="movie" className="py-20 scroll-mt-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">デモムービー</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/sK0boT0U29k"
                title="VOW PRESS Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full aspect-video"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sample Sound Section */}
      <section id="sound" className="py-20 scroll-mt-24 bg-gray-200">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">サンプルサウンド</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">♫</span>
                  <span className="text-base font-bold text-gray-900">VOW PRESS Overview Demo</span>
                </div>
                <audio controls className="w-full">
                  <source src="/images/brands/hotone/VOW_PRESS/sound_01.mp3" type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Control Section */}
      <section id="control" className="py-20 scroll-mt-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">コントロール</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="max-w-5xl mx-auto space-y-12">
            {/* First Control Image with Description */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="flex justify-center">
                <Image
                  src="/images/brands/hotone/VOW_PRESS/control_01.png"
                  alt="Control 1"
                  width={400}
                  height={300}
                  className="w-full max-w-md h-auto"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <h4 className="inline-flex items-center gap-1 text-sm font-bold text-gray-900 bg-gray-200 px-2 py-1 rounded mb-2">
                      <span>⚡</span> INPUT
                    </h4>
                    <p className="text-sm text-gray-700">
                      ギターを接続する1/4"モノラル・フォーン端子です。（ハイ・インピーダンス）
                    </p>
                  </div>
                  <div>
                    <h4 className="inline-flex items-center gap-1 text-sm font-bold text-gray-900 bg-gray-200 px-2 py-1 rounded mb-2">
                      <span>⚡</span> OUTPUT
                    </h4>
                    <p className="text-sm text-gray-700">
                      オーディオ出力1/4"モノラル・フォーン端子です。（ロー・インピーダンス）
                    </p>
                  </div>
                  <div>
                    <h4 className="inline-flex items-center gap-1 text-sm font-bold text-gray-900 bg-gray-200 px-2 py-1 rounded mb-2">
                      <span>⚡</span> POWER
                    </h4>
                    <p className="text-sm text-gray-700">
                      本機は、9VDC 電源アダプター専用です。プラグはセンター・マイナスの5.5 x 2.1mm をご使用ください。
                    </p>
                  </div>
                </div>
                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <h4 className="inline-flex items-center gap-1 text-sm font-bold text-gray-900 bg-gray-200 px-2 py-1 rounded mb-2">
                      <span>⚙</span> MODE
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li><span className="font-medium">≡ VOL</span><br />ボリューム・ペダルモード</li>
                      <li><span className="font-medium">≡ WAH</span><br />ワウ・ペダルモード</li>
                      <li><span className="font-medium">≡ V/W</span><br />ボリューム / ワウ切り替えモード</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="inline-flex items-center gap-1 text-sm font-bold text-gray-900 bg-gray-200 px-2 py-1 rounded mb-2">
                      <span>◉</span> BOTTOM VALUE
                    </h4>
                    <p className="text-sm text-gray-700">
                      ボリューム・ペダルの可変幅を設定します。範囲は、0％～100％…50％～100％の間で設定可能です。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-gray-300" />

            {/* Second Control Image */}
            <div className="flex justify-center">
              <Image
                src="/images/brands/hotone/VOW_PRESS/control_02.png"
                alt="Control 2"
                width={500}
                height={400}
                className="w-full max-w-lg h-auto"
              />
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
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h3 className="text-base font-bold text-gray-900 mb-4 border-b border-gray-900 pb-2">
                入出力、その他
              </h3>
              <div className="space-y-0">
                <div className="py-3 border-b border-gray-200">
                  <p className="text-gray-700 text-sm">入力インピーダンス：1MΩ</p>
                </div>
                <div className="py-3 border-b border-gray-200">
                  <p className="text-gray-700 text-sm">出力インピーダンス：100kΩ</p>
                </div>
                <div className="py-3 border-b border-gray-200">
                  <p className="text-gray-700 text-sm">電源：DC9Vパワーサプライ（センターマイナス）</p>
                </div>
                <div className="py-3 border-b border-gray-200">
                  <p className="text-gray-700 text-sm">サイズ：62.5mm (W) × 138mm (D) × 51mm (H)</p>
                </div>
                <div className="py-3 border-b border-gray-200">
                  <p className="text-gray-700 text-sm">重量：340g</p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-500 space-y-1">
                <p>※製品の仕様及びデザインは改良のため予告なく変更することがあります。</p>
                <p>※本製品以外の製品名および会社名は、各社の商号、登録商標または商標です。本文中で使用している名称は、音色の傾向をお伝えする目的で使用しております。</p>
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

