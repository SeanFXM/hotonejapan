"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from 'lucide-react'
import { BlogSlider } from "@/components/blog-slider"
import { downloadManual } from "@/lib/manual-download"

type Section = "concept" | "demo" | "features" | "control" | "manual" | "specs"

const navigationItems = [
  { id: "concept" as Section, label: "コンセプト" },
  { id: "demo" as Section, label: "デモムービー" },
  { id: "features" as Section, label: "主な機能" },
  { id: "control" as Section, label: "コントロール" },
  { id: "manual" as Section, label: "取扱説明書", isDownload: true },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function PatchKommanderPage() {
  const [activeSection, setActiveSection] = useState<Section>("concept")
  const [headerHeight, setHeaderHeight] = useState(72)

  const scrollToSection = (sectionId: Section) => {
    if (sectionId === "manual") {
      downloadManual("hotone", "patch-kommander-ls-10")
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
          src="/images/brands/hotone/PATCH_KOMMANDER_LS-10/hero.jpg"
          alt="PATCH KOMMANDER LS-10"
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
                <p className="text-2xl font-bold text-gray-900">PATCH KOMMANDER LS-10</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">オーディオ・ループ・スイッチャー</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-hotone">¥23,100</p>
                <p className="text-xs text-gray-500">前後（税込）</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">6959473908020</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              4ch プログラマブル・ループ・スイッチャー
            </h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Image */}
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/images/brands/hotone/PATCH_KOMMANDER_LS-10/intro.jpg"
                alt="PATCH KOMMANDER LS-10"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>

            {/* Right Column - Description */}
            <div className="space-y-6">
              <p className="text-sm text-gray-500 uppercase tracking-wider">hotone binary amp</p>
              <p className="text-gray-700 leading-relaxed">
                小型のペダルボードでも収まる403mm（D） x 56mm（W） x 48mm（H）のサイズに、4系統の独立リレー・ループ、Mute/Tuner機能、アンプ・チャンネル・スイッチングを搭載しました。シンプルな操作で、直接ループ・アクセス（ダイレクト・モード）と12種のループon/offプリセットへのアクセス（プリセット・モード）を可能にしました。
              </p>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">コンパクトサイズで軽量（535g）の堅牢なアルミボディー</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">4系統の独立リレー・ループ（トゥルーバイパス）</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">オン/オフ外部スイッチ付き高品位バッファーアンプ搭載</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Mute/Tuner機能付きチューナー出力</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">アンプ・チャンネルスイッチング用のSW A/B搭載（ダイレクトモードのみ）</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div className="text-gray-700">
                    <span className="font-medium">２種のスイッチング・モードを搭載</span>
                    <div className="mt-2 ml-2 text-sm space-y-1">
                      <p><span className="font-medium">Direct mode（ダイレクトモード）</span>：ループのダイレクト・アクセス（ループOn/Off）</p>
                      <p><span className="font-medium">Preset mode（プリセットモード）</span>：3バンク4プリセットの12 x プログラムのリコール可能</p>
                      <p>DIRECT & PRESETボタン（LED点灯）で両モードは即座に切り替えられます。</p>
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">低スイッチングノイズ</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">一般的なエフェクター電源の9VDCを採用（センターマイナス）</span>
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

          <div className="max-w-4xl mx-auto">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/Yui3GchSCCQ"
                title="PATCH KOMMANDER LS-10 Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 scroll-mt-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 - シンプルなプリセット方法 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="relative bg-gray-700 px-4 py-3">
                  <h3 className="text-base font-bold text-white">シンプルなプリセット方法</h3>
                  <span className="absolute top-2 right-4 text-4xl font-bold text-gray-500/50">01</span>
                </div>
                <div className="p-4">
                  <Image
                    src="/images/brands/hotone/PATCH_KOMMANDER_LS-10/function_01.jpg"
                    alt="シンプルなプリセット方法"
                    width={400}
                    height={200}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <div className="text-gray-700 text-sm space-y-3">
                    <p>各ループのon/off ステータスが、プリセットとしてセーブ＆リコールできます。本機は12 presets（4 presets x 3 banks）のセーブ＆リコールが可能です。</p>
                    <p><span className="font-medium">プリセット・モード：</span> 1-4 のフットスイッチを押し、ループのon/off を決めます。BANK（SW A/B）でバンクを選択します。スイッチが点滅している時は、プリセットが選択されていないことを示します。使用するプリセットナンバーを選べば完了です。</p>
                    <p><span className="font-medium">プリセットのプログラム方法：</span>プリセットを選択し、L1-L4でループのon/off を決めます。これで自動的にメモリーにセーブされます。</p>
                  </div>
                </div>
              </div>

              {/* Card 2 - SW A/B */}
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="relative bg-gray-700 px-4 py-3">
                  <h3 className="text-base font-bold text-white">SW A/B</h3>
                  <span className="absolute top-2 right-4 text-4xl font-bold text-gray-500/50">02</span>
                </div>
                <div className="p-4">
                  <Image
                    src="/images/brands/hotone/PATCH_KOMMANDER_LS-10/function_02.jpg"
                    alt="SW A/B"
                    width={400}
                    height={200}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <div className="text-gray-700 text-sm space-y-3">
                    <p>アンプヘッドのA/Bチャンネルを切り替える機能です。図のような1/4" (6.35mm) TRS のケーブルをアンプのチャンネル・スイッチング・ジャックに接続してください。</p>
                  </div>
                </div>
              </div>

              {/* Card 3 - バッファー・スイッチ */}
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="relative bg-gray-700 px-4 py-3">
                  <h3 className="text-base font-bold text-white">バッファー・スイッチ</h3>
                  <span className="absolute top-2 right-4 text-4xl font-bold text-gray-500/50">03</span>
                </div>
                <div className="p-4">
                  <Image
                    src="/images/brands/hotone/PATCH_KOMMANDER_LS-10/function_03.jpg"
                    alt="バッファー・スイッチ"
                    width={400}
                    height={200}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <div className="text-gray-700 text-sm space-y-3">
                    <p>長いケーブルの使用で高域の劣化がきになる場合は、バッファーをONにしてください。ギターからの信号をエフェクターに直接そのまま接続したい場合は、バッファーをOFFにしてください。</p>
                  </div>
                </div>
              </div>
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
                    src="/images/brands/hotone/PATCH_KOMMANDER_LS-10/control_01.png"
                    alt="PATCH KOMMANDER LS-10 Top Panel"
                    width={1000}
                    height={400}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="border-t border-gray-200 pt-8">
                  <Image
                    src="/images/brands/hotone/PATCH_KOMMANDER_LS-10/control_02.png"
                    alt="PATCH KOMMANDER LS-10 Back Panel"
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
                  <p className="text-gray-700 text-sm">プリセット数：12（4 presets × 3 banks）</p>
                </div>
                <div className="py-3 border-b border-gray-200">
                  <p className="text-gray-700 text-sm">ループ数：4（アイソレーテッド・ループ）</p>
                </div>
                <div className="py-3 border-b border-gray-200">
                  <p className="text-gray-700 text-sm">バイパスモード：リレー・トゥルーバイパス（またはアナログ・バッファード・バイパス）</p>
                </div>
                <div className="py-3 border-b border-gray-200">
                  <p className="text-gray-700 text-sm">入力インピーダンス：1MΩ</p>
                </div>
                <div className="py-3 border-b border-gray-200">
                  <p className="text-gray-700 text-sm">出力インピーダンス：100Ω</p>
                </div>
                <div className="py-3 border-b border-gray-200">
                  <p className="text-gray-700 text-sm">電源：9VDC</p>
                </div>
                <div className="py-3 border-b border-gray-200">
                  <p className="text-gray-700 text-sm">消費電流：150mA</p>
                </div>
                <div className="py-3 border-b border-gray-200">
                  <p className="text-gray-700 text-sm">サイズ：403mm（D） × 56mm（W） × 48mm（H）</p>
                </div>
                <div className="py-3 border-b border-gray-200">
                  <p className="text-gray-700 text-sm">重量：535g</p>
                </div>
              </div>
              <p className="text-gray-500 text-xs mt-6">※製品の仕様及びデザインは改良のため予告なく変更することがあります。</p>
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

