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

export default function Efx10dPage() {
  const [activeSection, setActiveSection] = useState<Section>("intro")
  const [headerHeight, setHeaderHeight] = useState(72)
  const [expandedSoftware, setExpandedSoftware] = useState<{
    firmware: boolean
    neonCollector: boolean
    firmwareOld: boolean
  }>({
    firmware: false,
    neonCollector: false,
    firmwareOld: false,
  })

  const [expandedFaq, setExpandedFaq] = useState<{ [key: string]: boolean }>({})

  const toggleSoftware = (key: "firmware" | "neonCollector" | "firmwareOld") => {
    setExpandedSoftware((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const toggleFaq = (key: string) => {
    setExpandedFaq((prev) => ({
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
    downloadManual("musicomlab", "efx-10d")
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
          src="/images/brands/musicomlab/EFX-10D/hero.jpg"
          alt="EFX-10D"
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
                <p className="text-2xl font-bold text-gray-900">EFX-10D</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">ループ・スイッチャー</p>
                <p className="text-base text-gray-900">MIDI コントローラー</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-gray-900">
                  ¥99,000
                </p>
                <p className="text-xs text-gray-500">前後（税込）</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">8809425666448</p>
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

      {/* Intro Section - Top Part with Video */}
      <section id="intro" className="py-20 scroll-mt-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              究極のオールインワン・スイッチングシステム
            </h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full bg-blue-600" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Video and Related Info */}
            <div className="space-y-6">
              {/* Intro Image */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/brands/musicomlab/EFX-10D/intro.jpg"
                  alt="EFX-10D Introduction"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Column - Product Description and Features */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">EFX-10D</h3>

                <div className="prose max-w-none mb-8">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    EFX-10Dは、コンパクトな筐体にプロフェッショナル・プレイヤーが必要なオーディオ・スイッチング＆MIDI機能を備えたスイッチング・システムです。
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    完全にプログラムが可能な10系統のオーディオ・ループ、4つの機能スイッチ、およびMIDIフットコントローラー機能を備えています。EFX-10Dは強力なMIDI機能を備えているため、ラックやマルチ＆ペダルタイプのリグでも使用できます。
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    Windows、Mac両OS用のエディターソフトウェアが用意されており、プリセット毎のMIDI設定（CC、PC＆エクスプレッション）、複雑なプログラミングもMIDIインターフェースからPCで簡単に行えます。さらに、保存したファイルはアップ＆ダウンロードが可能です。
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
                    <p className="text-gray-700 text-sm">10系統のモノラル・オーディオループ</p>
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
                    <p className="text-gray-700 text-sm">２つのモノラル・ループを１つのステレオ・ループとしても使用可能</p>
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
                    <p className="text-gray-700 text-sm">各プリセット毎にプログラム可能なループ順序</p>
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
                    <p className="text-gray-700 text-sm">最大２つのループをプリセット間のキャリーオーバーに割り当て可能</p>
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
                    <p className="text-gray-700 text-sm">２つの入力のうちの１つは、TRSジャックで各IAスイッチによる入力バッファーの有効 / 無効を選択可能</p>
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
                    <p className="text-gray-700 text-sm">出力L/RはTRSジャックが使用可能</p>
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
                    <p className="text-gray-700 text-sm">最大800のプリセット（200バンク x 4プリセット）と１つのグローバル・プリセットの作成が可能</p>
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
                    <p className="text-gray-700 text-sm">最大800ソングまで作成可能</p>
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
                    <p className="text-gray-700 text-sm">800ソングを120ソングの64セットに編成可能</p>
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
                    <p className="text-gray-700 text-sm">PCまたはMACへのUSB接続</p>
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
                    <p className="text-gray-700 text-sm">プリセット、ソング、セット、スイッチを簡単にコピー可</p>
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
                    <p className="text-gray-700 text-sm">プリセット / 曲のタイトルやステータスを表示できるLCDディスプレイ採用</p>
                  </div>
                    </div>
                  </div>
                    </div>
            </div>
        </div>
      </section>

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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* 左侧图片 */}
              <div className="order-2 lg:order-1">
                  <Image
                      src="/images/brands/musicomlab/EFX-10D/function_01.png"
                      alt="ソングモード"
                      width={800}
                      height={450}
                      className="w-full rounded-lg"
                  />
                </div>
                  {/* 右侧文字 */}
              <div className="order-1 lg:order-2">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      各プリセットを楽曲単位で登録できる「ソングモード」
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      EFX-10Dには、通常の800プリセット（4 x 200 BANK）を使用する楽曲単位で呼び出せる「ソングモード」が備わっています。例えば、図のように「ソングA」を作成して、４つのフットスイッチに任意のプリセットを割り当てることができます。同じように「ソングB」を作成して別のプリセットを割り当てます。こうして、楽曲ごとに使用するプリセットを４つのフットスイッチに次々と呼び出していくことが可能です。ソング名は任意の文字列で登録でき、最大800ソングまで作成することができます。
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
                      src="/images/brands/musicomlab/EFX-10D/function_02.svg"
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
                      作成した「ソング」は、その日のセットリストに合わせて呼び出し順を変更することができます。「セットモード」を利用すれば、日々変わるセットリストによって、複雑にBANK間を行ったり来たりする面倒や誤操作の心配から解放されます。また、いくつものバンドやプロジェクトを掛け持ちしているミュージシャンにとっても心強い機能となるでしょう。セットリストには最大120ソングを登録することが可能で、セットリストは最大64個まで作成することができます。
                    </p>
                </div>
              </div>
            </div>

              {/* 3. スピルオーバー機能 */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  ディレイ音などを残す、スピルオーバー機能
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  「スピルオーバー機能」とは、ディレイやリバーブなどの残響音を含んだプリセットから次のプリセットに切り替えるとき、残響音が終わるまでの間、前プリセットの音を残す機能です。例えば、ヴィンテージ物のアナログ・ディレイなど、エフェクター側でスピルオーバーの設定ができない場合に重宝します。この「スピルオーバー機能」は、EFX-10Dに内蔵された高音質ミキサーによって制御されますので、プリセットごとに「使用 / 非使用」を設定して記憶させることができます。
                </p>
            </div>

              {/* 4. MIDI信号送信 */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  あらゆるMIDI信号を送信可能
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  MIDI PC#（プログラムチェンジ）やCC#（コントロール）の送信、接続したエクスプレッション・ペダルでのCC#のリアルタイム操作、そしてBPMの設定が行えます。MIDI端子もINとOUT / THRUを備えていますので、あらゆる接続に対応します。
                </p>
                <p className="text-gray-700 leading-relaxed">
                  プリセットが変更されると、16個のMIDI（PC、CC、ノートなど）メッセージを送信します。ページに割り当てられたスイッチが押されたときに８つのMIDI（PC、CC、Note など）メッセージを送信します。
                </p>
            </div>

              {/* 5. MIDIタイムクロック機能 */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  MIDIタイムクロック機能
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  MIDIタイムクロックを送信して、ファンクション・スイッチと同期します。MIDI互換ペダルと外部タップ入力ジャックを備えたペダルの両方のタップテンポBPMは、各バンクプリセットとソング・プリセットに保存可能です。
                    </p>
                  </div>

              {/* 6. 入出力バッファー */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  入出力バッファー
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  EFX-10Dは、入力段に設けられた「入力用バッファー」と出力段に設けられた「出力バッファー」の、合計２基の高音質バッファーが備わっています。また、２つの入力のうちの１つは、TRSジャックで各IAスイッチによる入力バッファーの有効 / 無効を選択することができます。
                </p>
                </div>

              {/* 7. TRSジャック */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  TRSジャック対応
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  出力L/R、ループ5/6、ループ7/8、ループ9/10は、TRSジャックが使用可能です。
                </p>
                </div>

              {/* 8. XPDLジャック */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  XPDLジャック
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  XPDLジャックには、１台のEXPペダル、または２つのフットスイッチを接続可能です。
                </p>
                </div>

              {/* 9. ファンクション・スイッチ */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  ファンクション・スイッチ
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  ２つのTRSジャックを介した４つのファンクション・スイッチが利用可能です。ユーザーの使用目的に合わせてスイッチを割り当てが可能です。
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
                    src="/images/brands/musicomlab/EFX-10D/panel.png"
                    alt="EFX-10D 入出力パネル"
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
                  src="/images/brands/musicomlab/EFX-10D/block.png"
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
            </div>

            <div className="max-w-7xl mx-auto space-y-16">
              {/* 他のペダルと組み合わせて使用する場合 */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                7ループの接続例
                </h3>
                  <div className="flex justify-center">
                    <Image
                    src="/images/brands/musicomlab/EFX-10D/connect_01.png"
                      alt="他のペダルと組み合わせて使用する場合"
                      width={1600}
                      height={800}
                    className="w-full max-w-3xl"
                    />
                </div>
              </div>

              {/* 他のデバイスのエフェクトループで使用する場合 */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                10ループの接続例


                </h3>
                  <div className="flex justify-center">
                    <Image
                    src="/images/brands/musicomlab/EFX-10D/connect_02.png"
                      alt="他のデバイスのエフェクトループで使用する場合"
                      width={1600}
                      height={800}
                    className="w-full max-w-3xl"
                    />
                  </div>
              </div>

              {/* 接続例 3 */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                3台のステレオFXとの接続例
                </h3>
                  <div className="flex justify-center">
                    <Image
                    src="/images/brands/musicomlab/EFX-10D/connect_03.png"
                      alt="接続例 3"
                      width={1600}
                      height={800}
                    className="w-full max-w-3xl"
                    />
                  </div>
              </div>

              {/* 接続例 4 */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                4コネクション方式のモノ接続例
                </h3>
                  <div className="flex justify-center">
                    <Image
                    src="/images/brands/musicomlab/EFX-10D/connect_04.png"
                      alt="接続例 4"
                      width={1600}
                      height={800}
                    className="w-full max-w-3xl"
                    />
                  </div>
              </div>

              {/* 接続例 5 */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                ウェット / ドライ
                </h3>
                  <div className="flex justify-center">
                    <Image
                    src="/images/brands/musicomlab/EFX-10D/connect_05.png"
                      alt="接続例 5"
                      width={1600}
                      height={800}
                    className="w-full max-w-3xl"
                    />
                  </div>
              </div>

              {/* 接続例 6 */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                ウェット / ドライ / ウェット
                </h3>
                  <div className="flex justify-center">
                    <Image
                    src="/images/brands/musicomlab/EFX-10D/connect_06.png"
                      alt="接続例 6"
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
                      src="/images/brands/musicomlab/EFX-10D/software_01.jpg"
                      alt="EFX-10D EDITOR"
                      width={500}
                      height={350}
                      className="w-full rounded-lg"
                    />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900">EFX-10D EDITOR（Mac / Win）</h3>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      EFX-10D EDITORソフトウェアを使用すると、コンピューターの画面上からEFX-10Dのセッティングを変更できます。送信するMIDI情報や、変更したいプリセット／ソングをリスト上で管理できるのが特徴です。ファームウェアのアップデートも、このソフトウェア上から行います。
                    </p>
                    <p className="text-gray-700 text-sm">
                      「EFX-10D EDITOR」は下記のリンクからダウンロードすることができます。最新版はメーカーサイトよりダウンロードしてください。
                    </p>
                    <div className="space-y-3 pt-2">
                      <a href="#" className="inline-flex items-center gap-3 px-6 py-3 bg-[#FF6600] hover:bg-[#FF7700] text-white font-medium rounded-lg transition-colors w-full justify-center">
                        <Download className="w-5 h-5" />
                        <span>EFX-10D EDITOR V1.02（for Windows, 17-05-2024）</span>
                      </a>
                      <a href="#" className="inline-flex items-center gap-3 px-6 py-3 bg-[#FF6600] hover:bg-[#FF7700] text-white font-medium rounded-lg transition-colors w-full justify-center">
                        <Download className="w-5 h-5" />
                        <span>EFX-10D EDITOR V1.02（for macOS, 17-05-2024）</span>
                      </a>
                    </div>
                    <p className="text-gray-600 text-sm mt-4">
                      ※ ダウンロードが始まらない場合は、下記のメーカー製品ページよりダウンロードください。
                      <br />
                      <a href="http://www.musicomlab.com/efx-10d.htm" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        http://www.musicomlab.com/efx-10d.htm
                      </a>
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 mt-4">
                      <h4 className="font-bold text-gray-900 mb-3">ソフトウェアの動作環境</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>Windows EDITOR：Windows 10 以上（Windows 7 以上でも動作します。）</li>
                        <li>MAC EDITOR：macOS Catalina Version 10.15 以上</li>
                      </ul>
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
                  EFX-10Dでは、現在バージョン1.01（2024年5月）がご利用いただけます。EFX-10D EDITORをご利用の場合は、下記のアップデート方法をご覧の上、ご利用ください。
                </p>

                <div className="mb-6">
                  <a
                    href="#"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-[#FF6600] hover:bg-[#FF7700] text-white font-medium rounded-lg transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    <span>EFX-10D Firmware V1.01（16-05-2024）</span>
                  </a>
                </div>

                <p className="text-gray-600 text-sm mb-6">
                  ※ ダウンロードが始まらない場合は、下記のメーカー製品ページよりダウンロードください。
                  <br />
                  <a href="http://www.musicomlab.com/efx-10d.htm" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    http://www.musicomlab.com/efx-10d.htm
                  </a>
                </p>

                {/* ファームウェアのアップデート方法 */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-bold text-gray-900 mb-4">ファームウェアのアップデート方法</h4>
                  <ol className="space-y-3 text-sm text-gray-700 list-decimal list-inside">
                    <li>最新ファームウェアのファイル（Zip）をダウンロードし、コンピューター上に解凍します。</li>
                    <li>コンピューターとEFX-10DとをUSBケーブルで接続します。</li>
                    <li>本体のBANK▼とBANK▲を押しながら、EFXの電源をオンにします。</li>
                    <li>エディターのFile &gt; Update Firmwareをクリック。</li>
                    <li>ダウンロードしたファームウェアのファイル「EFX_10D_vxxx_app.syx」をロードします。</li>
                    <li>ファームウェアのアップデート画面が出たら「UPDATE」をクリック。</li>
                    <li>画面上のバーが進み、EFX本体のLEDがカラフルに点滅を繰り返します。（※アップデートには数分を要します）</li>
                    <li>アップデートが完了するとEFXが自動的に再起動します。</li>
                  </ol>
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
                      <span className="text-gray-600 text-sm mb-1">バッファー・入力インピーダンス</span>
                      <span className="text-gray-900 font-medium">1MΩ</span>
                    </div>
                    <div className="flex flex-col border-b border-gray-200 pb-3">
                      <span className="text-gray-600 text-sm mb-1">バッファー・出力インピーダンス</span>
                      <span className="text-gray-900 font-medium">100Ω</span>
                    </div>
                    <div className="flex flex-col border-b border-gray-200 pb-3">
                      <span className="text-gray-600 text-sm mb-1">ノーマル・オーディオ信号レベル</span>
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
                      <span className="text-gray-900 font-medium">250mA</span>
                    </div>
                    <div className="flex flex-col border-b border-gray-200 pb-3">
                      <span className="text-gray-600 text-sm mb-1">サイズ</span>
                      <span className="text-gray-900 font-medium">263mm（W） x 110mm（D） x 68mm（H）</span>
                    </div>
                    <div className="flex flex-col pb-3">
                      <span className="text-gray-600 text-sm mb-1">重量</span>
                      <span className="text-gray-900 font-medium">1.0kg</span>
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
