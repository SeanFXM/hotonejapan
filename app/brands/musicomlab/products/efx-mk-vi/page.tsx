"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Download, ChevronDown, ChevronUp } from 'lucide-react'
import { BlogSlider } from "@/components/blog-slider"
import { downloadManual } from "@/lib/manual-download"

type Section = "intro" | "features" | "panel" | "block-diagram" | "connections" | "software" | "manual" | "specs"

const navigationItems = [
  { id: "intro" as Section, label: "コンセプト" },
  { id: "features" as Section, label: "主な機能" },
  { id: "panel" as Section, label: "入出力パネル" },
  { id: "block-diagram" as Section, label: "ブロック図" },
  { id: "connections" as Section, label: "一般的な接続例" },
  { id: "software" as Section, label: "ソフトウエア" },
  { id: "manual" as "manual", label: "取扱説明書", isDownload: true },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function EfxMkViPage() {
  const [activeSection, setActiveSection] = useState<Section>("intro")
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
    downloadManual("musicomlab", "efx-mk-vi")
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
          src="/images/brands/musicomlab/EFX-MK-VI/hero.jpg"
          alt="EFX MK-VI"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        <div className="relative container mx-auto px-6 h-full flex items-center justify-end">
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-white/30 w-96">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 tracking-wider">MUSICOMLAB</h1>
            </div>

            <div className="space-y-4 text-gray-900">
              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">製品名：</p>
                <p className="text-2xl font-bold text-gray-900">EFX MK-VI</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">オーディオ・スイッチャー</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-gray-900">
                  オープンプライス
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Button
                className="w-full text-white text-base py-6 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
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
                    className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-200 bg-blue-600"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Intro Section */}
      <section id="intro" className="py-20 scroll-mt-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              プロ仕様をさらに極めたオーディオ・コントローラー
            </h2>
            <p className="text-lg text-gray-600 mb-4">musicomlab efx mk-v</p>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full bg-blue-600" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Product Image */}
            <div className="space-y-6">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/brands/musicomlab/EFX-MK-VI/intro.jpg"
                  alt="EFX MK-VI Introduction"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Column - Product Description and Features */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">EFX MK-VI</h3>

                <div className="prose max-w-none mb-8">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    大規模会場でのライブからスタジオレコーディングまで、あらゆるプロフェッショナルの現場に応えるスイッチング＆MIDI機能を搭載したEFX MK-Vが、さらなる進化を遂げてそのプロ仕様を極め、新生『EFX-VI』として登場しました。
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    オーディオループ、Vol.コントローラー、外部フットスイッチ機能、プリセット、ソング、セットを追加＆一新！　充実のMIDI機能を兼ね備え、USB MIDIにも対応しました。
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">11モノループ＆1モノセンド/ステレオリターンループのトータル12オーディオループを備えています。</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">プリセット毎にループの接続順序が設定できます。（ループ1＆２は固定）</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">入力バッファー、出力バッファー、Loop 6バッファーの3つのバッファーを備えています。各バッファーのオン/オフはIAスイッチまたはプリセットでの設定が可能です。</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">2 xインターナルVol.コントローラー。このボリュームはプリセット切り替え時の音のキャリーオーバーにも使用します。ボリューム設定値はプリセット毎にセーブ可能です。</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">2 x TRSジャックを使用した4 xスイッチング機能も備えています。アンプ等の外部スイッチングが可能です。</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">900プリセット (180バンク x 5プリセット) ＆1グローバルプリセット</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">900のソング設定が可能です。</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">900ソングは64セットx 120ソングにも設定できます。</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">ユーザー仕様にアサイン可能なスイッチ</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">切り替え時のポップノイズを低下するクリック-レス機能を備えています。</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">ハムノイズや位相の問題を回避するISOアウトを装備しています。（トランスアイソレーション）</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">プリセット毎に16 x MIDI （PC、CC、Note等）メッセージの送信が設定可能です。スイッチがPageにアサインされている場合は、8 x MIDI （PC、CC、Note等）メッセージを送信します。</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">MIDIタイムクロックの送信、機能スイッチと同期できます。 MIDI機能を備えたエフェクターと同じように、外部TAPジャックを備えたエフェクターとのタイム同期が可能です。BPMはバンクプリセットとソングプリセットに保存できます。</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">2フットスイッチがXPDLジャックに接続できます。</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">PCまたはMacへのUSB接続が可能です。</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">プリセット、ソング、セット、スイッチのコピーが簡単にできます。</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">グラフィックLCDディスプレイでプリセットやソングタイトルが表示できます。</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">信頼の堅牢性を誇るフットスイッチを採用。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 scroll-mt-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">主な機能</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full bg-blue-600" />
            </div>
          </div>
          <div className="max-w-7xl mx-auto space-y-12">
            {/* 1. ソング */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* 左侧图片 */}
                <div className="order-2 lg:order-1">
                  <Image
                    src="/images/brands/musicomlab/EFX-MK-VI/function_01.svg"
                    alt="ソング"
                    width={800}
                    height={450}
                    className="w-full rounded-lg"
                  />
                </div>
                {/* 右侧文字 */}
                <div className="order-1 lg:order-2">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    各プリセットを楽曲単位で登録できる「ソング」
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    バンクに収納した900のプリセットを自在に「ソング」に整理し、セットに組み込んで使用します。例えば、「ソングA」を作成して、フットスイッチに任意のプリセットを割り当てる、といった使い方が出来ます。同じように「ソングB」を作成して別のプリセットも割り当てられます。作成した「ソング」は、その日のセットリストに合わせて呼び出し、順を変更することができます。
                  </p>
                </div>
              </div>
            </div>

            {/* 2. セットモード */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* 左侧图片 */}
                <div className="order-2 lg:order-1">
                  <Image
                    src="/images/brands/musicomlab/EFX-MK-VI/function_02.svg"
                    alt="セットモード"
                    width={800}
                    height={450}
                    className="w-full rounded-lg"
                  />
                </div>
                {/* 右侧文字 */}
                <div className="order-1 lg:order-2">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    各ソングをセットリスト順に並び替える「セットモード」
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    「セットモード」を利用すれば、日々変わるセットリストによって、煩瑣なBANK間の行き来や誤操作から解放されます。作成した900ソングを利用して、64セット×120ソングに設定できます。EFX-VIは、いくつものバンドやプロジェクトに携わるプレーヤーの心強い味方です。
                  </p>
                </div>
              </div>
            </div>

            {/* 3. 充実のフレキシブルなルーティング */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                充実のフレキシブルなルーティング
              </h3>
              <p className="text-gray-700 leading-relaxed">
                バッファー位置の設定。ルーティングの音量調整。エフェクター接続順の変更、MIDI制御＆スピルオーバー設定等が、プリセット毎に自由自在です。ペダルボード用に厳選したお気に入りのエフェクターを200％使いこなすことができます。デジタルマルチのプリセットにある「このエフェクターは使いたくない…」という時でも、ご自身のペダルで音色を仕上げることができます。さらに、MusicomLAB Parallelizerをエフェクトミックスに追加して、MIDI制御すれば、さらに奥深いサウンドメイクも可能です。
              </p>
            </div>

            {/* 4. プリセット毎にループ接続順の入れ替えが可能 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                プリセット毎にループ接続順の入れ替えが可能
              </h3>
              <p className="text-gray-700 leading-relaxed">
                本機は単純なループon/offするスイッチャーではありません。ループナンバーの順序に関係なく、自由自在に接続順の異なるプリセットを組むことができる、柔軟なコントローラーです。例えば、ループ「３〜」にワウペダルを接続して、プリセットごとに歪み系エフェクターの前後を入れ替えることが可能です。（※ ループ「１・２」は入れ替えはできません。）
              </p>
            </div>

            {/* 5. プリセット毎に設定できるバッファーアンプ */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                プリセット毎に設定できるバッファーアンプ
              </h3>
              <p className="text-gray-700 leading-relaxed">
                本機は、ループ1、２の前後で移動可能な「入力バッファー」（ループ1、２にファズペダルが入る際にはループ後にバッファーを入れます。）、さらに出力段に設けられたステレオ＆on/off対応の「出力バッファー」の高音質バッファーを備えています。
              </p>
            </div>

            {/* 6. スピルオーバー機能 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                スピルオーバー機能
              </h3>
              <p className="text-gray-700 leading-relaxed">
                「スピルオーバー機能」（MusicomLABではキャリーオーバーと呼んでいます。）とは、ディレイやリバーブなどの残響音を含んだプリセットから次のプリセットに切り替えるとき、残響音が終わるまでの間、前プリセットの音を残す機能です。例えば、ビンテージ物のアナログ・ディレイなど、エフェクター側で設定ができない場合に重宝します。この「スピルオーバー機能」は、アサインできる内蔵Vol.コントローラーによって制御し、プリセットごとに設定して記憶させることができます。
              </p>
            </div>

            {/* 7. 2xプリセットボリューム機能 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                2xプリセットボリューム機能
              </h3>
              <p className="text-gray-700 leading-relaxed">
                2 x ボリュームバリュー（Vol. A & Vol. B）をプリセット毎にインサートポジションのレベルも保存できます。ステレオアウトで使用する際に、左右の音量を必要に応じて微調整することも可能です。
              </p>
            </div>

            {/* 8. あらゆるMIDI信号が送信可能 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                あらゆるMIDI信号が送信可能
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                MIDI PC#（プログラムチェンジ）やCC#（コントロール）の送信、接続したエクスプレッション・ペダルでのCC#のリアルタイム操作、さらにBPM設定も可能です。MIDI端子もINとOUT/THRUを備えていますので、あらゆる接続に対応します。VIはUSB端子も備え、PC/MacとのMIDI送受信が可能になりました。
              </p>
            </div>

            {/* 9. 信号スプリット */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                信号スプリット
              </h3>
              <p className="text-gray-700 leading-relaxed">
                信号経路からオーディオ信号を枝分かれさせる機能も追加されました。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Panel Section */}
      <section id="panel" className="py-20 scroll-mt-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">入出力パネル</h2>
            <div className="flex justify-center">
              <div className="w-20 h-1 rounded bg-blue-600" />
            </div>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center">
              <div className="relative w-full max-w-4xl">
                <Image
                  src="/images/brands/musicomlab/EFX-MK-VI/panel.png"
                  alt="EFX MK-VI 入出力パネル"
                  width={1200}
                  height={800}
                  className="rounded-lg w-full"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block Diagram Section */}
      <section id="block-diagram" className="py-20 scroll-mt-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">ブロック図</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full bg-blue-600" />
            </div>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center">
              <Image
                src="/images/brands/musicomlab/EFX-MK-VI/block.png"
                alt="ブロック図"
                width={600}
                height={400}
                className="rounded-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Connections Section */}
      <section id="connections" className="py-20 scroll-mt-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">一般的な接続例</h2>
            <div className="flex justify-center">
              <div className="w-20 h-1 rounded bg-blue-600" />
            </div>
            <p className="text-gray-700 mt-4 max-w-3xl mx-auto">
              EFX MK-VIは、移動可能なバッファーやモノラルIN / ステレオOUTを組み合わせて、複雑なルーティングが設定できます。
            </p>
          </div>

          <div className="max-w-7xl mx-auto space-y-16">
            {/* ベーシックなモノラル接続 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">ベーシックなモノラル接続</h3>
              <div className="flex justify-center">
                <Image
                  src="/images/brands/musicomlab/EFX-MK-VI/connect_01.svg"
                  alt="ベーシックなモノラル接続"
                  width={1600}
                  height={800}
                  className="w-full max-w-3xl"
                />
              </div>
            </div>

            {/* 2ステレオFX使用のステレオ接続例 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">2ステレオFX使用のステレオ接続例</h3>
              <div className="flex justify-center">
                <Image
                  src="/images/brands/musicomlab/EFX-MK-VI/connect_02.svg"
                  alt="2ステレオFX使用のステレオ接続例"
                  width={1600}
                  height={800}
                  className="w-full max-w-3xl"
                />
              </div>
            </div>

            {/* 4CMのモノラル接続例 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">4CMのモノラル接続例</h3>
              <div className="flex justify-center">
                <Image
                  src="/images/brands/musicomlab/EFX-MK-VI/connect_03.svg"
                  alt="4CMのモノラル接続例"
                  width={1600}
                  height={800}
                  className="w-full max-w-3xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Software Section */}
      <section id="software" className="py-20 scroll-mt-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">ソフトウェア・ダウンロード</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full bg-blue-600" />
            </div>
          </div>

          {/* 上部：左图片 + 右说明 */}
          <div className="max-w-7xl mx-auto mb-12">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <Image
                    src="/images/brands/musicomlab/EFX-MK-VI/software_01.png"
                    alt="EFX MK-VI EDITOR"
                    width={500}
                    height={350}
                    className="w-full rounded-lg"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900">EFX MK-VI EDITOR（Mac / Win）</h3>
                  <p className="text-gray-600 text-sm">※ 画面は「EFX MK-V EDITOR」です。</p>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    EFX MK-VI EDITORソフトウェアを使用すると、コンピューターの画面上でEFX MK-VIのセッティングを変更できます。送信するMIDI情報や、変更したいプリセット／ソングをリスト上で管理できるのが特徴です。ファームウェアのアップデートも、このソフトウェア上から行います。
                  </p>
                  <p className="text-gray-700 text-sm">
                    「EFX MK-VI EDITOR」は下記のリンクからダウンロードすることができます。最新版はメーカーサイトよりダウンロードしてください。
                  </p>
                  <div className="space-y-3 pt-2">
                    <a href="#" className="inline-flex items-center gap-3 px-6 py-3 bg-[#FF6600] hover:bg-[#FF7700] text-white font-medium rounded-lg transition-colors w-full justify-center">
                      <Download className="w-5 h-5" />
                      <span>EFX MK-VI Editor v2.01（Windows, 13-MAR-2022）</span>
                    </a>
                    <a href="#" className="inline-flex items-center gap-3 px-6 py-3 bg-[#FF6600] hover:bg-[#FF7700] text-white font-medium rounded-lg transition-colors w-full justify-center">
                      <Download className="w-5 h-5" />
                      <span>EFX MK-VI Editor v2.01（macOS, 13-MAR-2022）</span>
                    </a>
                  </div>
                  <p className="text-gray-600 text-sm mt-4">
                    ※ ダウンロードが始まらない場合は、下記のメーカー製品ページよりダウンロードください。
                    <br />
                    <a href="http://www.musicomlab.com/efx-mkvi.htm" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      http://www.musicomlab.com/efx-mkvi.htm
                    </a>
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 mt-4">
                    <h4 className="font-bold text-gray-900 mb-3">ソフトウェアの動作環境</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>Windows EDITOR：Windows 11（Windows 7 以上でも動作します。）</li>
                      <li>MAC EDITOR：macOS Big Sur / Monterey</li>
                    </ul>
                    <p className="text-sm text-gray-700 mt-3">
                      ※ EFX MK-VI Editorの使用には、EFX MK-VI firmware（V2.01以降）が必要です。ファームウェアをV2.01以降にアップデートしてからお使いください。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ファームウェアのアップデート */}
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">ファームウェアのアップデート</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                USBポートから直接PC/Macに接続して、ファームウェアをアップデートすることができます。
              </p>

              <div className="mb-6">
                <a
                  href="#"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-[#FF6600] hover:bg-[#FF7700] text-white font-medium rounded-lg transition-colors"
                >
                  <Download className="w-5 h-5" />
                  <span>EFX MK-VI Firmware v2.04</span>
                </a>
              </div>

              <p className="text-gray-600 text-sm mb-6">
                ※ ダウンロードが始まらない場合は、下記のメーカー製品ページよりダウンロードください。
                <br />
                <a href="http://www.musicomlab.com/efx-mkvi.htm" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  http://www.musicomlab.com/efx-mkvi.htm
                </a>
              </p>

              {/* 全ファームウェアのアップデート・ノート */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-4">【 全ファームウェアのアップデート・ノート 】</h4>
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold mb-2">v2.03（13-MAR-2022）</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>バンクスイッチング時にページナンバーがLCDに表示されるようになりました。</li>
                      <li>ページ変更時に起きるエラーを解決しました。</li>
                      <li>MIDI SysEx、SysRTメッセージのエラーを解決しました。</li>
                      <li>'Clickless'のエラーを解決しました。</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">v2.02（25-FEB-2022）</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>'Hold' スイッチのエラーを解決しました。</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">v2.01（16-FEB-2022）</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>電源投入時のUSB接続の問題点を解決しました。</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">v2.00（07-FEB-2022）</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>エディターソフトとの通信機能を改良しました。</li>
                      <li>SETUP内のメニュー名を変更しました。</li>
                      <li>Setup -&gt; Switch -&gt; MIDI -&gt; 'Stop' がSysRTに追加されました。</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">v1.01（02-NOV-2021）</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>MIDI OUT/THRUの問題点を解決しました。</li>
                    </ul>
                  </div>
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
              <div className="w-24 h-1 rounded-full bg-blue-600" />
            </div>
          </div>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
              {/* Left Column - INPUT / OUTPUT セクション */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-3">
                  INPUT / OUTPUT セクション
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-col border-b border-gray-200 pb-3">
                    <span className="text-gray-600 text-sm mb-1">バッファー・インピーダンス</span>
                    <span className="text-gray-900 font-medium">1MΩ</span>
                  </div>
                  <div className="flex flex-col border-b border-gray-200 pb-3">
                    <span className="text-gray-600 text-sm mb-1">バッファー・出力インピーダンス</span>
                    <span className="text-gray-900 font-medium">100Ω</span>
                  </div>
                  <div className="flex flex-col border-b border-gray-200 pb-3">
                    <span className="text-gray-600 text-sm mb-1">ボリュームコントロール入力インピーダンス</span>
                    <span className="text-gray-900 font-medium">1 MΩ/44kΩ</span>
                  </div>
                  <div className="flex flex-col border-b border-gray-200 pb-3">
                    <span className="text-gray-600 text-sm mb-1">ボリュームコントロール出力インピーダンス</span>
                    <span className="text-gray-900 font-medium">100Ω</span>
                  </div>
                  <div className="flex flex-col border-b border-gray-200 pb-3">
                    <span className="text-gray-600 text-sm mb-1">ノーマルオーディオ信号レベル</span>
                    <span className="text-gray-900 font-medium">-10dBu</span>
                  </div>
                  <div className="flex flex-col pb-3">
                    <span className="text-gray-600 text-sm mb-1">最大オーディオ信号レベル</span>
                    <span className="text-gray-900 font-medium">+18dBu</span>
                  </div>
                </div>
              </div>

              {/* Right Column - 電源、サイズ */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-3">
                  電源、サイズ
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-col border-b border-gray-200 pb-3">
                    <span className="text-gray-600 text-sm mb-1">電源</span>
                    <span className="text-gray-900 font-medium">9VDC・・・DC9Vセンターマイナス、電源は別売（メーカー純正品はありませんので、「strymon Ojai R30」等をご使用ください）</span>
                  </div>
                  <div className="flex flex-col border-b border-gray-200 pb-3">
                    <span className="text-gray-600 text-sm mb-1">消費電流</span>
                    <span className="text-gray-900 font-medium">最大250mA</span>
                  </div>
                  <div className="flex flex-col border-b border-gray-200 pb-3">
                    <span className="text-gray-600 text-sm mb-1">サイズ</span>
                    <span className="text-gray-900 font-medium">388mm（W） x 110mm（D） x 68mm（H）</span>
                  </div>
                  <div className="flex flex-col pb-3">
                    <span className="text-gray-600 text-sm mb-1">重量</span>
                    <span className="text-gray-900 font-medium">1,400g</span>
                  </div>
                </div>
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
          href="/brands/musicomlab"
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

