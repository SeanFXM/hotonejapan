"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Download, ChevronDown, ChevronUp } from 'lucide-react'
import { BlogSlider } from "@/components/blog-slider"
import { downloadManual } from "@/lib/manual-download"

type Section = "intro" | "features" | "panel" | "software" | "manual" | "specs"

const navigationItems = [
  { id: "intro" as Section, label: "コンセプト" },
  { id: "features" as Section, label: "主な機能" },
  { id: "panel" as Section, label: "入出力パネル" },
  { id: "software" as Section, label: "ソフトウエア" },
  { id: "manual" as "manual", label: "取扱説明書", isDownload: true },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function Mtx5Page() {
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
    downloadManual("musicomlab", "mtx-5")
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
          src="/images/brands/musicomlab/MTX-5/hero.jpg"
          alt="MTX-5"
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
                <p className="text-2xl font-bold text-gray-900">MTX-5</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">MIDIコントローラー</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-gray-900">
                  ¥52,800
                </p>
                <p className="text-xs text-gray-500">前後（税込）</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">8809425666134</p>
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
              プロ仕様のMIDIコントローラー
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
                  src="/images/brands/musicomlab/MTX-5/intro.jpg"
                  alt="MTX-5 Introduction"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Column - Product Description and Features */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">MTX-5</h3>

                <div className="prose max-w-none mb-8">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    MTX-5は、ライブツアーやスタジオ・レコーディングをこなすプロフェッショナルのニーズに応えられるように設計された、プロ仕様のMIDIコントローラーです。
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    音色を決めたセッティングのプリセット、曲を演奏する際のプリセット集合体としてのソング、ワンステージをカバーするソングの集合体セットからなる構成は、複数のツアーを抱える敏腕ミュージシャンのニーズにも応えます。それぞれのコントロール階層も深く、MIDI制御を完全に網羅しています。
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    このように煩雑に思えるプログラミングも、本機をコンピューターにUSB接続すれば、専用エディターでシンプルに解決できます。MIDI機器との接続は、1系統のスタンダードMIDIポート、2 x 1/8インチMIDI OUT、USBと充実しており、ライブセットアップと同期型レコーディングの両方に対応できます。
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">871のプリセットメモリーロケーション</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">870のソングが制作可能です。（3プリセットx290バンク＆グローバル・プリセット）</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">最大870ソングを作成</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">56ソングx64セットの870ソングに編成できます。</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">ユーザーの用途に合わせて、スイッチの割り当てが可能です。</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">2つのエクスプレッションペダル、又は4つのフットスイッチ（XPDL1/XPDL2）が接続できます。</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">3つのMIDI OUTコネクター（1x標準MIDIコネクターと2x1/8インチのフォーンコネクター）</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">プリセット毎に16 MIDIメッセージ（PC、CC、Note または SysEx）送信可能</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">各スイッチに12個のMIDIメッセージ （PC、CC、Note または SysEx）アサイン可能</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">MIDIタイムクロック対応</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">80のMIDIシステムエクスクルーシブスロットを設けました。</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">PCまたはMACへのUSB接続によるエディティング</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">多くの情報が表示できるグラフィックLCDを採用</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">プリセット、バンク、ソング、セットが簡単にコピーできます。</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">プリセット、ソング、セット、ページ、スイッチの命名が簡単です。</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">頑丈なフットスイッチを採用</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">9VDC (センターマイナス) 100mA、ファントムまたは USBでの駆動も可能</p>
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
            {/* 1. ソングモード */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                各プリセットを楽曲単位で登録できる「ソング」
              </h3>
              <p className="text-gray-700 leading-relaxed">
                バンクに収納した870のプリセットを自在に「ソング」に整理し、セットに組み込んで使用します。例えば、「ソングA」を作成して、フットスイッチに任意のプリセットを割り当てる、といった使い方が出来ます。同じように「ソングB」を作成して別のプリセットも割り当てられます。作成した「ソング」は、その日のセットリストに合わせて呼び出し、順を変更することができます。
              </p>
            </div>

            {/* 2. セットモード */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                各ソングをセットリスト順に並び替える「セットモード」
              </h3>
              <p className="text-gray-700 leading-relaxed">
                「セットモード」を利用すれば、日々変わるセットリストによって、煩瑣なBANK間の行き来や誤操作から解放されます。作成した870ソングを利用して、64セット×56ソングに設定できます。本機は、いくつものバンドやプロジェクトに携わるプレーヤーの心強い味方です。
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
                  src="/images/brands/musicomlab/MTX-5/panel_01.png"
                  alt="MTX-5 入出力パネル"
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
                    src="/images/brands/musicomlab/MTX-5/software_01.jpg"
                    alt="MTX-5 EDITOR"
                    width={500}
                    height={350}
                    className="w-full rounded-lg"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900">MTX-5 EDITOR（Mac / Win）</h3>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    MTX-5 Editorソフトウェアを使用すると、コンピューターの画面上でPRESET、SONG/SETLIST、SWITCH、GLOBAL、FILE/TRANSFERの詳細なプリセット、ソング、セットなどの設定が簡単に行えます。ファームウェアのアップデートも、このソフトウェア上から行います。
                  </p>
                  <p className="text-gray-700 text-sm">
                    「MTX-5 EDITOR」は下記のリンクからダウンロードすることができます。最新版はメーカーサイトよりダウンロードしてください。
                  </p>
                  <div className="space-y-3 pt-2">
                    <a href="#" className="inline-flex items-center gap-3 px-6 py-3 bg-[#FF6600] hover:bg-[#FF7700] text-white font-medium rounded-lg transition-colors w-full justify-center">
                      <Download className="w-5 h-5" />
                      <span>MTX-5 Editor v2.00 Win</span>
                    </a>
                    <a href="#" className="inline-flex items-center gap-3 px-6 py-3 bg-[#FF6600] hover:bg-[#FF7700] text-white font-medium rounded-lg transition-colors w-full justify-center">
                      <Download className="w-5 h-5" />
                      <span>MTX-5 Editor v2.00 Mac</span>
                    </a>
                  </div>
                  <p className="text-gray-600 text-sm mt-4">
                    ※ ダウンロードが始まらない場合は、下記のメーカー製品ページよりダウンロードください。
                    <br />
                    <a href="http://www.musicomlab.com/mtx-5.htm" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      http://www.musicomlab.com/mtx-5.htm
                    </a>
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 mt-4">
                    <h4 className="font-bold text-gray-900 mb-3">ソフトウェアの動作環境</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>MTX-5 Editor v2.00 Win：Windows 11（Windows 7 以上でも動作します。）</li>
                      <li>MTX-5 Editor v2.00 Mac：macOS Big Sur / Monterey</li>
                    </ul>
                    <p className="text-sm text-gray-700 mt-3">
                      EFX MK-VI Editorの使用には、MTX-5 Firmware v2.00（01-OCT-2022）が必要です。ファームウェアをアップデートしてからお使いください。
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
                  <span>MTX-5 Firmware v2.00</span>
                </a>
              </div>

              <p className="text-gray-600 text-sm mb-6">
                ※ ダウンロードが始まらない場合は、下記のメーカー製品ページよりダウンロードください。
                <br />
                <a href="http://www.musicomlab.com/mtx-5.htm" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  http://www.musicomlab.com/mtx-5.htm
                </a>
              </p>
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
              {/* Right Column - 電源、サイズ */}
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-3">
                  電源、サイズ
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-col border-b border-gray-200 pb-3">
                    <span className="text-gray-600 text-sm mb-1">電源</span>
                    <span className="text-gray-900 font-medium">9VDC・・・DC9Vセンターマイナス（ファントムまたはUSBでの駆動も可能）</span>
                  </div>
                  <div className="flex flex-col border-b border-gray-200 pb-3">
                    <span className="text-gray-600 text-sm mb-1">消費電流</span>
                    <span className="text-gray-900 font-medium">最大100mA</span>
                  </div>
                  <div className="flex flex-col border-b border-gray-200 pb-3">
                    <span className="text-gray-600 text-sm mb-1">サイズ</span>
                    <span className="text-gray-900 font-medium">160mm（W） x 93mm（D） x 63mm（H）</span>
                  </div>
                  <div className="flex flex-col pb-3">
                    <span className="text-gray-600 text-sm mb-1">重量</span>
                    <span className="text-gray-900 font-medium">550g</span>
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

