"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Download, ChevronDown, ChevronUp } from 'lucide-react'
import { BlogSlider } from "@/components/blog-slider"
import { downloadManual } from "@/lib/manual-download"

type Section = "concept" | "demo" | "function" | "control" | "bundle" | "faq" | "manual" | "specs"

const navigationItems = [
  { id: "concept" as Section, label: "コンセプト" },
  { id: "demo" as Section, label: "デモムービー" },
  { id: "function" as Section, label: "主な性能" },
  { id: "control" as Section, label: "コントロール" },
  { id: "bundle" as Section, label: "バンドルソフト" },
  { id: "faq" as Section, label: "よくある質問" },
  { id: "manual" as "manual", label: "取扱説明書", isDownload: true },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function EvoSP8Page() {
  const [activeSection, setActiveSection] = useState<Section>("concept")
  const [headerHeight, setHeaderHeight] = useState(72)
  const [expandedFaq, setExpandedFaq] = useState<{ [key: string]: boolean }>({})

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
    downloadManual("audient", "evosp8")
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
          src="/images/brands/audient/evo SP8/hero.jpg"
          alt="evo SP8"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        <div className="relative container mx-auto px-6 h-full flex items-center justify-end">
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-white/30 w-96">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 tracking-wider">AUDIENT</h1>
            </div>

            <div className="space-y-4 text-gray-900">
              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">製品名：</p>
                <p className="text-2xl font-bold text-gray-900">evo SP8</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">8ch マイクプリアンプ</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-gray-900">
                  ¥77,000
                </p>
                <p className="text-xs text-gray-500">前後（税込）</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">5060374260528</p>
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
          <div className="flex items-center justify-center gap-8 overflow-x-auto py-4">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.isDownload) {
                    handleManualDownload()
                  } else {
                    scrollToSection(item.id as Section)
                  }
                }}
                className={`flex-shrink-0 px-4 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? "text-purple-600 border-b-2 border-purple-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">8 Channel Smart Preamp</h2>
              <h3 className="text-2xl font-bold text-gray-700 mb-6">with AD/DA</h3>
              <div className="flex justify-center mt-8">
                <div className="w-24 h-1 rounded-full bg-purple-600" />
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
                    src="https://www.youtube.com/embed/RGDEI9652qM"
                    title="AUDIENT evo SP8 - The Features"
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
                    <a href="#" className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200 block">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-900">evoシリーズ 特設サイト</span>
                    </a>
                    <a href="#" className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200 block">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-900">役に立つオーディオ・インターフェイス講座 ~ Part.1~ 「evoって?」</span>
                    </a>
                    <a href="#" className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200 block">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-900">AUDIENT : サポート窓口</span>
                    </a>
                    <a href="#" className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200 block">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-900">AUDIENT : ユーザー登録</span>
                    </a>
                    <a href="#" className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200 block">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm6 6H7v2h6v-2z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-900">ARC フリー・バンドル・ソフトウェア&プラグイン</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column - Product Description and Features */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">究極のスタジオ・プリアンプ・エクスパンダーが登場しました。</h3>

                  <div className="prose max-w-none mb-6">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      evo SP8は、既存のオーディオ・インターフェイスを拡張する最適なパートナーです。高性能AD/DAコンバーター、多彩なI/O接続、Smartgain機能による自動入力レベル調整機能を備えたインテリジェントなevoプリアンプを８基搭載し、スタジオに必要なあらゆる機能を向上させます。2つのJFETインストルメント入力に加え、新しく画期的なMotion UIコントロール・システムによって、卓越したオーディオ・パフォーマンスをお届けします。evo SP8は、世界で一番賢いマイクプリアンプです。
                    </p>
                  </div>

                  {/* Feature List */}
                  <div className="space-y-2 mb-4">
                    {[
                      "8 x EVOマイクプリアンプ",
                      "2 x JFET インストルメント入力",
                      "8 x ライン出力",
                      "2 x デジタルI/O",
                      "クラス最高峰のAD／DAコンバーター",
                      "マルチチャンネル対応スマートゲイン機能",
                      "EVO Motion UI/EVOモーションユーザーインターフェイス",
                      "高解像度LCDスクリーン",
                      "コントロールホイール",
                      "ウルトラクリアなメータリング",
                      "入出力コントロール",
                      "チャンネルステータス表示",
                      "オプションのラック耳",
                      "ワードクロック入力",
                      "24bit / 96kHz",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-gray-700 text-sm">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Concept Section - Dark Background */}
      <section id="concept" className="scroll-mt-24 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Title */}
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">製品コンセプト</h3>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full bg-purple-600" />
            </div>
          </div>

          {/* Section 1: オーディオ・インターフェイスのパーフェクト・パートナー - Left Image, Right Text */}
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Product Image */}
              <div className="flex justify-center">
                <Image
                  src="/images/brands/audient/evo SP8/concept_01.png"
                  alt="オーディオ・インターフェイスのパーフェクト・パートナー"
                  width={600}
                  height={600}
                  className="w-full h-auto rounded-xl"
                />
              </div>
              
              {/* Right: Text Content */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2">evo マイクプリアンプ</h4>
                  <h5 className="text-xl font-bold text-white mb-4">オーディオ・インターフェイスの<br />パーフェクト・パートナー</h5>
                  <p className="text-gray-400 leading-relaxed">
                    大規模なセッションには、より多くのチャンネルが必要です。ADATを介して既存のオーディオ・インターフェイスを拡張する手法は、スタジオをスケールアップする最も費用対効果的なお勧めソリューションです。EVO SP8は、8つのマイク&ライン入力、8つのライン出力を備え、2 系統のADAT接続が可能です。ドラムのレコーディングやフルバンドの演奏など、複数のマイクセッションも気軽に取り組める強力なパートナーです。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: スタジオ・クオリティーのレコーディングを EVOマイクプリアンプ - Left Text, Right Image */}
          <div className="mb-20 border-t border-gray-700 pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
              {/* Left: Text Content */}
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">スタジオ・クオリティーのレコーディングを</h4>
                <h5 className="text-xl font-bold text-white mb-6">EVOマイクプリアンプ</h5>
                <p className="text-gray-400 leading-relaxed">
                  EVO SP8こそ、スタジオに必要不可欠なプリアンプです。素晴らしいサウンドの8つのEVOマイクプリアンプが、オーディオパフォーマンスを向上させてくれます。コンソール大国で25年以上に及ぶ確かな技術力に裏打ちされたアナログマイクプリアンプは、この上なくクリーンで正確な音像を捉え、原音に忠実なオーディオをお届けします。
                </p>
              </div>
              
              {/* Right: Product Image */}
              <div className="flex justify-center">
                <Image
                  src="/images/brands/audient/evo SP8/concept_02.svg"
                  alt="スタジオ・クオリティーのレコーディングを EVOマイクプリアンプ"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </div>
            
            {/* Smart Analog Mic Preamp Section */}
            <div className="mt-12">
              <h4 className="text-2xl font-bold text-white mb-4 text-center">スマートなアナログ・マイクプリアンプ</h4>
              <p className="text-gray-400 leading-relaxed max-w-4xl mx-auto mb-8 text-center">
                パワフルな EVO プリアンプテクノロジーで、スタジオ仕様をモダンにアップデートしませんか？　精度の高いデジタルコントロールを備え、スタジオグレードのソニック性能を届けてくれるEVOアナログマイクプリアンプは、わずかな狂いもなくピンポイントにゲイン設定も完了してくれます。
              </p>
              
              {/* Statistics Boxes - 3 boxes in a row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="mb-4">
                    <Image
                      src="/images/brands/audient/evo SP8/concept_03.gif"
                      alt="58dBを誇るマイクゲイン"
                      width={300}
                      height={200}
                      className="w-full h-auto mx-auto"
                      style={{ backgroundColor: '#1a1a1a' }}
                    />
                  </div>
                  <p className="text-white text-sm mb-1">58dBを誇るマイクゲイン</p>
                  <p className="text-gray-400 text-xs">コンデンサーマイクへの十分な電源供給性能</p>
                </div>
                <div className="text-center">
                  <div className="mb-4">
                    <Image
                      src="/images/brands/audient/evo SP8/concept_04.gif"
                      alt="余裕のヘッドルーム"
                      width={300}
                      height={200}
                      className="w-full h-auto mx-auto"
                      style={{ backgroundColor: '#1a1a1a' }}
                    />
                  </div>
                  <p className="text-white text-sm mb-1">余裕のヘッドルーム</p>
                  <p className="text-gray-400 text-xs">バランス仕様の信号経路</p>
                </div>
                <div className="text-center">
                  <div className="mb-4">
                    <Image
                      src="/images/brands/audient/evo SP8/concept_05.gif"
                      alt="優れたEIN仕様"
                      width={300}
                      height={200}
                      className="w-full h-auto mx-auto"
                      style={{ backgroundColor: '#1a1a1a' }}
                    />
                  </div>
                  <p className="text-white text-sm mb-1">優れたEIN仕様</p>
                  <p className="text-gray-400 text-xs">超低歪み、低ノイズ信号</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: 高品位コンバーターによる高音質オーディオ */}
          <div className="mb-20 border-t border-gray-700 pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <Image
                  src="/images/brands/audient/evo SP8/concept_06.png"
                  alt="高度なコンバーターテクノロジー"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-xl"
                />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">高品位コンバーターによる高音質オーディオ</h4>
                <h5 className="text-xl font-bold text-white mb-6">高度なコンバーターテクノロジー</h5>
                <p className="text-gray-400 leading-relaxed">
                  スタジオではサウンドが全てです。EVO SP8の高性能32ビットAD/DAコンバーターにより、録音時でも、ミキシング時のモニタリングでも、常にオーディオを非常に正確に聴くことができます。高性能で高解像度のコンバーターが優れたオーディオを届けてくれるので、録音やミックス作業において、正確な判断を自信を持って行えます。
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: 画期的なMotion UI */}
          <div className="mb-20 border-t border-gray-700 pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left: Video */}
              <div>
                <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg mb-4">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/VXt-41qKTY4"
                    title="EVO SP8 Motion UI"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* Right: Motion UI Features */}
              <div className="space-y-8">
                {/* Motion UI Overview */}
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src="/images/brands/audient/evo SP8/concept_07.png"
                      alt="Motion UI"
                      width={80}
                      height={80}
                      className="w-20 h-20 object-contain"
                    />
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-1">画期的なMotion UI</h4>
                      <h5 className="text-xl font-bold text-white">パワフルで新しい制御システム</h5>
                    </div>
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    新たなモーションユーザーインターフェイスにより、EVO SP8のハードウェア機能を素早く直感的に操作できます。クリアで高解像度のフルカラースクリーンに必要な情報をタイムリーに表示します。ストレスなく作業に集中できる、使い勝手が非常に良いスマートプリアンプになりました。
                  </p>
                </div>

                {/* LCDスクリーン */}
                <div className="border-t border-gray-700 pt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Image
                      src="/images/brands/audient/evo SP8/concept_08.gif"
                      alt="LCDスクリーン"
                      width={100}
                      height={100}
                      className="w-24 h-24 object-contain flex-shrink-0"
                      style={{ backgroundColor: '#1a1a1a' }}
                    />
                    <div className="flex-1">
                      <h5 className="text-lg font-bold text-white mb-2">LCDスクリーン</h5>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        全ての設定や調整、ボタン操作は見やすいカラーディスプレイ上にリアルタイムで表示されます。気づいたその場で手軽に変更が加えられ、コンピューターの画面を確認することなくEVO SP8 をコントロールできます。さらに IPS テクノロジーにより、どの角度から見ても画面が見やすく、さまざまな設定が快適に行えます。
                      </p>
                    </div>
                  </div>
                </div>

                {/* チャンネルステータス */}
                <div className="border-t border-gray-700 pt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Image
                      src="/images/brands/audient/evo SP8/concept_09.gif"
                      alt="チャンネルステータス"
                      width={100}
                      height={100}
                      className="w-24 h-24 object-contain flex-shrink-0"
                      style={{ backgroundColor: '#1a1a1a' }}
                    />
                    <div className="flex-1">
                      <h5 className="text-lg font-bold text-white mb-2">チャンネルステータス</h5>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        入力ボタンを押せば、チャンネル名、レベル、アクティブな機能といった情報全てが表示されます。
                      </p>
                    </div>
                  </div>
                </div>

                {/* メータリング */}
                <div className="border-t border-gray-700 pt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Image
                      src="/images/brands/audient/evo SP8/concept_10.gif"
                      alt="メータリング"
                      width={100}
                      height={100}
                      className="w-24 h-24 object-contain flex-shrink-0"
                      style={{ backgroundColor: '#1a1a1a' }}
                    />
                    <div className="flex-1">
                      <h5 className="text-lg font-bold text-white mb-2">メータリング</h5>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        出入力、全チャンネルをフルカラーで表示できます。レベルが一目で確認でき、レベルチェックの精度が向上します。
                      </p>
                    </div>
                  </div>
                </div>

                {/* コントロール・ホイール */}
                <div className="border-t border-gray-700 pt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Image
                      src="/images/brands/audient/evo SP8/concept_11.gif"
                      alt="コントロール・ホイール"
                      width={100}
                      height={100}
                      className="w-24 h-24 object-contain flex-shrink-0"
                      style={{ backgroundColor: '#1a1a1a' }}
                    />
                    <div className="flex-1">
                      <h5 className="text-lg font-bold text-white mb-2">コントロール・ホイール</h5>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        EVO SP8のハードウェア機能全ての一元操作を可能にしました。それは、途切れなくスムーズなレコーディング・セッションを実行できる無限のパワーとシンプルな操作性を兼ね備えています。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: 画期的な一括ゲイン調整 Smartgain */}
          <div className="mb-20 border-t border-gray-700 pt-20">
            {/* Top Section: Video and Text */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
              {/* Left: Video */}
              <div>
                <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg mb-4">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/AlS7F9qB5hA"
                    title="Smartgain - 画期的な一括ゲイン調整"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <p className="text-gray-400 text-sm text-center">設定から自動翻訳で日本語を選択してご覧ください。</p>
              </div>

              {/* Right: Text Content */}
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">画期的な一括ゲイン調整</h4>
                <h5 className="text-xl font-bold text-white mb-6">Smartgain</h5>
                <p className="text-gray-400 leading-relaxed mb-8">
                  ドラムや大規模なセッションのレコーディング時間を大幅に削減します。Smartgainボタンを押すだけで、8つのチャンネルすべてのゲインを一度に自動で設定してくれます。独自のSmartgainアルゴリズムを搭載したこの機能は、高度なピーク分析を自動的に開始、最適なレベルに調整します。調整を瞬時に完了！わずか20秒以内で最適なレベルにセットします。節約された時間をよりクリエイティブな作業に充てることができます。
                </p>

                {/* Three Features */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h6 className="text-white font-bold mb-1">一度に全8チャンネルを調整</h6>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h6 className="text-white font-bold mb-1">時間を大幅に節約</h6>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h6 className="text-white font-bold mb-1">クリッピングを回避します</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section: Image and Text */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-t border-gray-700 pt-16">
              {/* Left: Image */}
              <div className="flex justify-center">
                <Image
                  src="/images/brands/audient/evo SP8/concept_12.jpg"
                  alt="あなたのパーソナルアシスタント"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-xl"
                />
              </div>

              {/* Right: Text Content */}
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">あなたのパーソナルアシスタント</h4>
                <h5 className="text-xl font-bold text-white mb-6">面倒な作業もこの１台で解決</h5>
                <p className="text-gray-400 leading-relaxed">
                  録音とレベル確認、音量調整…それらをひたすら繰り返す必要はもうありません。Smartgainがその時間を節約し、レコーディングをもっとスムーズにしてくれます。マイクをセットアップし、Smartgainを押して演奏を開始する。ただそれだけでEVO SP8が自動で最適なレベルに調整します。
                </p>
              </div>
            </div>
          </div>

          {/* Section 6: EVO 拡張システム */}
          <div className="mb-20 border-t border-gray-700 pt-20">
            <div className="text-center mb-12">
              <h4 className="text-2xl font-bold text-white mb-4">EVO 拡張システム</h4>
              <p className="text-gray-400 leading-relaxed max-w-4xl mx-auto mb-8">
                2台のEVO SP8をEVO 16オーディオインターフェイスと組み合わせれば、24チャンネルの Smartgain対応マイクプリアンプを備えた、より効率的なスタジオセットアップが完成します。一度に24チャンネルまで使用可能です。このEVO拡張システムならライバルの遥か先を進めます。
              </p>
              
              {/* Product Stack Image */}
              <div className="flex justify-center mb-12">
                <Image
                  src="/images/brands/audient/evo SP8/concept_13.png"
                  alt="EVO 拡張システム"
                  width={800}
                  height={600}
                  className="w-full max-w-4xl h-auto rounded-xl"
                />
              </div>
            </div>

            {/* Three Feature Panels */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="mb-4">
                  <Image
                    src="/images/brands/audient/evo SP8/concept_14.jpg"
                    alt="一度に24チャンネルの調整可能なSmartgain"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-xl mx-auto"
                  />
                </div>
                <p className="text-white font-medium">一度に24チャンネルの調整可能なSmartgain</p>
              </div>
              <div className="text-center">
                <div className="mb-4">
                  <Image
                    src="/images/brands/audient/evo SP8/concept_15.jpg"
                    alt="バンド全体のサウンドチェックが20秒以内で完了可能"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-xl mx-auto"
                  />
                </div>
                <p className="text-white font-medium">バンド全体のサウンドチェックが20秒以内で完了可能。</p>
              </div>
              <div className="text-center">
                <div className="mb-4">
                  <Image
                    src="/images/brands/audient/evo SP8/concept_16.jpg"
                    alt="あなたの創造性は一切邪魔されません"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-xl mx-auto"
                  />
                </div>
                <p className="text-white font-medium">あなたの創造性は一切邪魔されません。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Movie Section */}
      <section id="demo" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">デモムービー</h2>
          
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Video 1 */}
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/VXt-41qKTY4"
                  title="EVO SP8 Demo 1"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              {/* Video 2 */}
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/VMj0Ot1mPKI"
                  title="EVO SP8 Demo 2"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              {/* Video 3 */}
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/yCo22QxhwF4"
                  title="EVO SP8 Demo 3"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              {/* Video 4 */}
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/RGDEI9652qM"
                  title="EVO SP8 Demo 4"
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

      {/* Function Section - 主な性能 */}
      <section id="function" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">主な性能</h2>
            
            {/* Section 1: クラシックトーン、モダンサウンド */}
            <div className="mb-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center">
                  <Image
                    src="/images/brands/audient/evo SP8/function_01.png"
                    alt="クラシックトーン、モダンサウンド"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">クラシックトーン、モダンサウンド</h3>
                  <h4 className="text-xl font-bold text-gray-700 mb-6">2 × インストルメント入力</h4>
                  <p className="text-gray-700 leading-relaxed">
                    モンスター級のギターサウンドを引き出すには適切な回路が必要です。そのタスクに応えるクラシックな真空管アンプの入力段を再現した、倍音豊かなJFET入力回路を用意しました。ギターシミュレーターに頼らなくても理想的なサウンドを提供してくれます。
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2: スリックなルックス */}
            <div className="mb-20 border-t border-gray-300 pt-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center">
                  <Image
                    src="/images/brands/audient/evo SP8/function_02.png"
                    alt="スリックなルックス"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">スリックなルックス</h3>
                  <p className="text-gray-700 leading-relaxed">
                    EVO SP8 は、デスクトップ上でもラック内でもすっきりと収まるようにスマートに設計しました。輝度の高いバックライトLEDは暗いスタジオ内でも高い視認性を確保し、スチール製のボディは長期間の過酷な使用にも高い耐久性を発揮します。
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3: 平置きでもラック設置でも ポータブル */}
            <div className="mb-20 border-t border-gray-300 pt-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center">
                  <Image
                    src="/images/brands/audient/evo SP8/function_03.png"
                    alt="平置きでもラック設置でも ポータブル"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">平置きでもラック設置でも</h3>
                  <h4 className="text-xl font-bold text-gray-700 mb-6">ポータブル</h4>
                  <p className="text-gray-700 leading-relaxed">
                    充実の機能を備えながらコンパクトなEVO SP8は 14インチ（35cm）強のサイズ。ラックマウントしてスタジオに常設しておくことはもちろん、下部に滑り止めのゴム足を備えており、デスクトップパソコンやノートパソコンの下に置いて使用することも可能です。
                  </p>
                </div>
              </div>
            </div>

            {/* Section 4: ラックマウントにも対応 */}
            <div className="mb-20 border-t border-gray-300 pt-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center">
                  <Image
                    src="/images/brands/audient/evo SP8/function_04.jpg"
                    alt="ラックマウントにも対応"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">ラックマウントにも対応</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    取り外し可能なラックイヤーは、別売オプションにてご購入いただけます。
                  </p>
                  <p className="text-gray-700 font-medium mb-4">
                    型番：SP8-rack　税込市場参考価格：￥3,300
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    また、EVO SP8のパッケージにはリサイクル材を活用しています。
                    AUDIENT社では、ラックマウント・パーツのオプション化とあわせて、無駄な資源の使用や輸送による二酸化炭素の排出を抑える取り組みを行っています。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Control Section */}
      <section id="control" className="py-20 scroll-mt-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">コントロール</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full bg-purple-600" />
            </div>
          </div>

          <div className="max-w-5xl mx-auto space-y-12">
            {/* First Control Image */}
            <div className="flex justify-center">
              <div className="w-full max-w-4xl rounded-xl overflow-hidden bg-gray-100">
                <Image
                  src="/images/brands/audient/evo SP8/control_01.jpg"
                  alt="Control 1"
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-xl"
                  style={{ mixBlendMode: 'multiply' }}
                />
              </div>
            </div>

            {/* Second Control Image */}
            <div className="flex justify-center">
              <div className="w-full max-w-4xl rounded-xl overflow-hidden bg-gray-100">
                <Image
                  src="/images/brands/audient/evo SP8/control_02.jpg"
                  alt="Control 2"
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-xl"
                  style={{ mixBlendMode: 'multiply' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bundle Software Section - 完全复制 ORIA 的 */}
      <section id="bundle" className="py-20 bg-[#1a1a1a]">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-white mb-2">ARC</h2>
            <h3 className="text-3xl font-bold text-white mb-4">フリー・ソフトウェア・バンドル</h3>
            <div className="flex justify-center mb-8">
              <div className="w-24 h-1 rounded-full bg-purple-600" />
            </div>
            <p className="text-gray-300 max-w-4xl mx-auto mb-2">
              Audientの対象製品をお使いのユーザーの方々は、下記のDAW & プラグイン・ソフトをフリー・ダウンロードしていただけます。
            </p>
            <p className="text-gray-400 text-sm">
              ※ フリー・ダウンロードしていただけるソフトウェアは、期間により変更されることがございます。予めご了承ください。
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            {/* Row 1: 3 products */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Softube Flow */}
              <div className="bg-[#f0f0f0] rounded-xl p-6">
                <div className="mb-4">
                  <Image src="/images/brands/audient/Oria/handlesoft_01.svg" alt="Softube" width={120} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/Oria/handlesoft_02.webp" alt="Softube Flow" width={300} height={180} className="w-full h-auto rounded-lg" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">Softube Flow® Mastering Suite- <span className="text-red-500">New!</span> -</h4>
                <p className="text-sm text-gray-600 mb-3">Mastering Suite</p>
                <p className="text-sm text-gray-700 mb-3">
                  Softube と提携して、音楽プロデューサーの時間と命を救う究極のツールである Flow® Mastering Suite の 1 か月間の無料トライアルを独占的にご提供します。
                </p>
                <p className="text-xs text-gray-500">
                  ARCに登録すると、１か月間の無料トライアルを独占的にご提供します。（*2025年10月8日まで）
                </p>
              </div>

              {/* GForce AXXESS */}
              <div className="bg-[#f0f0f0] rounded-xl p-6">
                <div className="mb-4">
                  <Image src="/images/brands/audient/Oria/handlesoft_03.svg" alt="GForce" width={120} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/Oria/handlesoft_04.webp" alt="GForce AXXESS" width={300} height={180} className="w-full h-auto rounded-lg" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">GForce AXXESS- <span className="text-red-500">New!</span> -</h4>
                <p className="text-sm text-gray-600 mb-3">Fat, Gnarly, Flexible, Poly Synth Plugin</p>
                <p className="text-sm text-gray-700 mb-3">
                  GForce AXXESSは、強力で使いやすい新しいシンセで、いくつかの優れた機能を備えています。パワフルなベース、高揚するリード、崇高なパッドをお楽しみください。
                </p>
                <p className="text-xs text-gray-500">
                  ARCに登録すると、独占無料永久ライセンスがご利用いただけます。（*2025年7月17日まで）
                </p>
              </div>

              {/* Strymon BigSky */}
              <div className="bg-[#f0f0f0] rounded-xl p-6">
                <div className="mb-4">
                  <Image src="/images/brands/audient/Oria/handlesoft_05.png" alt="Strymon" width={120} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/Oria/handlesoft_06.png" alt="BigSky" width={300} height={180} className="w-full h-auto rounded-lg" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">BigSky Plug-in</h4>
                <p className="text-sm text-gray-600 mb-3">Multidimensional Reverb Plugin from strymon®</p>
                <p className="text-sm text-gray-700 mb-3">
                  12のカスタムチューニングされた高解像度リバーブアルゴリズムを含む、Strymon BigSkyプラグインで、これまで想像したこともなかったリバーブサウンドを体験できます。
                </p>
                <p className="text-xs text-gray-500 mb-2">
                  ARCに登録すると、120日間の無料トライアルをお試しいただけます。（*2024年9月12日まで）
                </p>
                <a href="#" className="text-sm text-red-500 hover:underline">● 詳細はAUDIENT ARC BigSkyをご覧ください。</a>
              </div>
            </div>

            {/* Row 2: 3 products */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Cubase */}
              <div className="bg-[#f0f0f0] rounded-xl p-6">
                <div className="mb-4">
                  <Image src="/images/brands/audient/Oria/handlesoft_07.png" alt="Steinberg" width={120} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/Oria/handlesoft_08.png" alt="Cubase" width={300} height={180} className="w-full h-auto rounded-lg" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">Cubase™ & Cubasis™ LE 3</h4>
                <p className="text-sm text-gray-600 mb-3">Music creation software from Steinberg®</p>
                <p className="text-sm text-gray-700 mb-3">
                  Steinbergの大人気DAWソフトウェア。macOS、Windows、iOSでお使い頂けます。
                </p>
                <p className="text-xs text-gray-500">
                  ※ 現在、Cubasis LE3の対応機種は、evo4、iD4、iD4mkⅡの３機種です。これら以外の機種につきましては、今後のアップデートをお待ちください。
                </p>
              </div>

              {/* Retrologue */}
              <div className="bg-[#f0f0f0] rounded-xl p-6">
                <div className="mb-4">
                  <Image src="/images/brands/audient/Oria/handlesoft_09.png" alt="Steinberg" width={120} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/Oria/handlesoft_10.jpg" alt="Retrologue" width={300} height={180} className="w-full h-auto rounded-lg" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">Retrologue 2</h4>
                <p className="text-sm text-gray-600 mb-3">Classic analogue synth from Steinberg®</p>
                <p className="text-sm text-gray-700">
                  Steinbergのクラシック・アナログ（ヴァーチャル）・シンセサイザー
                </p>
              </div>

              {/* M-Tron Pro LE */}
              <div className="bg-[#f0f0f0] rounded-xl p-6">
                <div className="mb-4">
                  <Image src="/images/brands/audient/Oria/handlesoft_11.png" alt="GForce" width={120} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/Oria/handlesoft_12.png" alt="M-Tron Pro LE" width={300} height={180} className="w-full h-auto rounded-lg" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">M-Tron Pro LE</h4>
                <p className="text-sm text-gray-600 mb-3">Digital emulation of the classic Mellotron®</p>
                <p className="text-sm text-gray-700">
                  The Beatles、Yes、Led ZeppelinやThe Moody Bluesが使用した1960年代のMellotron®のエミュレーション・ソフトウェア。Audientユーザーはフルバージョンへのアップグレードが、通常の50% offで行えます。
                </p>
              </div>
            </div>

            {/* Row 3: 3 products */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Torpedo Wall of Sound */}
              <div className="bg-[#f0f0f0] rounded-xl p-6">
                <div className="mb-4">
                  <Image src="/images/brands/audient/Oria/handlesoft_13.png" alt="Two Notes" width={120} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/Oria/handlesoft_14.png" alt="Torpedo" width={300} height={180} className="w-full h-auto rounded-lg" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">Torpedo Wall of Sound™</h4>
                <p className="text-sm text-gray-600 mb-3">Highly realistic cab simulation from Two Notes®</p>
                <p className="text-sm text-gray-700">
                  キャビネット・シミュレーター・ソフトウェア。MesaBoogie、Fender、Ampegを含んだ８種類のキャビネット・シミュレーター。
                </p>
              </div>

              {/* Subito Piano */}
              <div className="bg-[#f0f0f0] rounded-xl p-6">
                <div className="mb-4">
                  <Image src="/images/brands/audient/Oria/handlesoft_15.svg" alt="Subito Piano" width={120} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/Oria/handlesoft_16.svg" alt="Subito Piano" width={300} height={180} className="w-full h-auto rounded-lg" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">Subito Piano</h4>
                <p className="text-sm text-gray-600 mb-3">Your tracks through a real grand piano</p>
                <p className="text-sm text-gray-700">
                  MIDIトラックをグランドピアノでの演奏に変更してくれます。
                </p>
              </div>

              {/* Waldorf Edition */}
              <div className="bg-[#f0f0f0] rounded-xl p-6">
                <div className="mb-4">
                  <Image src="/images/brands/audient/Oria/handlesoft_17.png" alt="Waldorf" width={120} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/Oria/handlesoft_18.png" alt="Waldorf Edition" width={300} height={180} className="w-full h-auto rounded-lg" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">Waldorf Edition 2 LE™</h4>
                <p className="text-sm text-gray-600 mb-3">Software emulations of classic Waldorf®</p>
                <p className="text-sm text-gray-700">
                  synth PPG Wave 2™、drum module Attack™、filter D-pole™のWaldorf®プロダクトをお使い頂けます。
                </p>
              </div>
            </div>

            {/* Row 4: 2 products */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Produce Like A Pro */}
              <div className="bg-[#f0f0f0] rounded-xl p-6">
                <div className="mb-4">
                  <Image src="/images/brands/audient/Oria/handlesoft_19.png" alt="Produce Like A Pro" width={150} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/Oria/handlesoft_20.png" alt="Produce Like A Pro" width={300} height={180} className="w-full h-auto rounded-lg" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">Produce Like A Pro™</h4>
                <p className="text-sm text-gray-600 mb-3">3 free online courses plus 10% off your next course</p>
                <p className="text-sm text-gray-700">
                  レコーディングやミキシングのオンライン講座（英語）です。
                </p>
              </div>

              {/* Loopcloud */}
              <div className="bg-[#f0f0f0] rounded-xl p-6">
                <div className="mb-4">
                  <Image src="/images/brands/audient/Oria/handlesoft_21.png" alt="Loopcloud" width={150} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/Oria/handlesoft_22.png" alt="Loopcloud" width={300} height={180} className="w-full h-auto rounded-lg" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">2GB of free samples</h4>
                <p className="text-sm text-gray-600 mb-3">Access the world&apos;s biggest library of samples</p>
                <p className="text-sm text-gray-700">
                  drum loops、synth loops、vocal loopsのパッケージがお使い頂けます。
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <a href="#" className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full transition-colors">
                ● ARCのご利用方法について、詳しくはこちらをご覧ください
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 scroll-mt-24 bg-gray-200">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">よくある質問</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column */}
              <div className="space-y-4">
                {/* FAQ Item 1 */}
                <div className="bg-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq1")}
                    className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-400 transition-colors rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">③</span>
                      <span className="font-medium text-gray-900 text-left">SP8にUSB ポートがあるのはなぜですか？</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq1 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq1 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4">
                      <p className="text-gray-700 leading-relaxed">
                        このポートでは、USBオーディオインターフェイスのようなデバイスを使用したり、EVO ミキサーにアクセスしたりすることはできません。EVO SP8のUSB ポートは、ソフトウェアによる最新の機能と改善を更新するためにのみ使用します。SP8で EVOミキサーを使用するには、SP8を EVO 拡張システムの中心として機能するEVO 16との接続が必要です。
                      </p>
                    </div>
                  )}
                </div>

                {/* FAQ Item 2 */}
                <div className="bg-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq2")}
                    className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-400 transition-colors rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">③</span>
                      <span className="font-medium text-gray-900 text-left">SP8 のファームウェアを更新する必要はありますか？</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq2 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq2 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4">
                      <p className="text-gray-700 leading-relaxed">
                        SP8の背面には、「For Updates Only」というラベルの付いたUSBポートがあります。このポートは、ユニットのファームウェアを更新するために使用します。後の互換性や新機能の追加があった場合に、ここに接続してアップデートを行います。
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        現時点（Jan, 2023）では、利用可能なファームウェアの更新はありません。
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* FAQ Item 3 */}
                <div className="bg-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq3")}
                    className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-400 transition-colors rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">③</span>
                      <span className="font-medium text-gray-900 text-left">なぜ88.2と96kHzのサンプリングレートでは、オプトケーブルが2本必要なのですか？</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq3 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq3 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4">
                      <p className="text-gray-700 leading-relaxed">
                        サンプリングレートが88.2kHz/96kHzの時は、大きなデータ量を転送するため大きな帯域幅が必要になります。そのために、Toslink（オプト）ケーブルを2本使用します。これは ADAT SMUXとして知られています。
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        サンプルレートが2倍になり、1秒間に送信されるデータ量が2倍になります。すべてのデータを送信できるようにチャネル数を半分にする必要があり、これにより、オプトケーブルあたりのチャネル数が4チャネルに制限されます。 8つのチャネルすべてのデータ転送には、2つのオプトポートが必要になります。
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        88.2kHz/96kHzでの使用には、EVO 16やiD44 など、少なくとも2つのオプト入力または出力を備えたホストインターフェイスが必要になるのでご注意してください。
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs Section */}
      <section id="specs" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">製品仕様</h2>
            <div className="bg-white rounded-xl p-8">
              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* マイク・プリアンプ */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">マイク・プリアンプ</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>マイクゲインレンジ：58dB</p>
                      <p>ライン入力ゲイン：58dB w/-10dB Pad</p>
                      <p>ファンタム電源：48v +/-4v @ 10mA/Channel</p>
                      <p>マイク入力EIN：&lt;-127.5dBu</p>
                      <p>CMRR：&gt;80dB @ 1kHz</p>
                      <p>最大入力レベル：+16dBu</p>
                      <p>入力インピーダンス（Mic）：&gt;3kΩバランス</p>
                      <p>入力インピーダンス（Line）：&gt;10kΩバランス</p>
                      <p>周波数特性：+/-0.5dB 10Hz 〜 40kHz</p>
                      <p>チャンネル間クロストーク：&lt;-105dBu @ 1kHz &lt;-103dBu @ 10kHz</p>
                      <p>THD+N @ 0dBu（1kHz）：&lt;0.0015%</p>
                      <p>SNR：100dB</p>
                      <p>XLR：Pin 2（Hot）、Pin3（Cold）＆ Pin1（Shield）</p>
                      <p>1/4インチ・ジャック：TIP（Hot）、RING（Cold）& SLEEVE（Shield）</p>
                    </div>
                  </div>

                  {/* D.I */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">D.I</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>D.Iゲイン：58dB</p>
                      <p>最大入力レベル：+10dBu</p>
                      <p>入力インピーダンス：500k Unbalanced</p>
                      <p>周波数特性：+/-0.5dB 10Hz 〜 50kHz</p>
                      <p>THD+N @ 0dBu（1kHz）：&lt;0.1%</p>
                      <p>SNR：100dB</p>
                      <p>1/4インチ・ジャック：TIP（Hot） & SLEEVE（Shield）</p>
                    </div>
                  </div>

                  {/* ADC コンバーター */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">ADC コンバーター</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>デジタルリファレンスレベル：0dBFS = +10.5dBu</p>
                      <p>周波数特性：+/-0.5dB 10Hz 〜 Fs/2</p>
                      <p>クロストーク：&lt;-125dBu @ 1kHz &amp; 10kHz</p>
                      <p>THD+N @ -1dBFS (1kHz)：&lt;0.001%</p>
                      <p>ダイナミックレンジ：112.5dB A-weighted</p>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* ライン出力 */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">ライン出力</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>最大出力レベル：12dBu</p>
                      <p>デジタルリファレンスレベル：0dBFS = +12dBu</p>
                      <p>出力インピーダンス：&lt;50Ω</p>
                      <p>周波数特性：+/-0.5dB 10Hz 〜 Fs/2</p>
                      <p>クロストーク：-110dBu@1kHz</p>
                      <p>THD+N @ -1dBFS (1kHz)：&lt;0.006％</p>
                      <p>ダイナミックレンジ：117dB</p>
                      <p>1/4インチ・ジャック：TIP（Hot）、RING（Cold）& SLEEVE（Shield）</p>
                    </div>
                  </div>

                  {/* サイズ */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">サイズ</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>W355mm x D255mm x H53mm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

