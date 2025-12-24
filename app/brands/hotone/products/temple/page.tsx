"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Download, ChevronDown, ChevronUp } from 'lucide-react'
import { BlogSlider } from "@/components/blog-slider"
import { downloadManual } from "@/lib/manual-download"

type Section = "concept" | "lineup" | "comparison" | "demo" | "samples" | "usage" | "features" | "controls" | "block-diagram" | "connections" | "operation" | "software" | "faq" | "manual" | "specs"

const navigationItems = [
  { id: "concept" as Section, label: "コンセプト" },
  { id: "lineup" as Section, label: "ラインナップ" },
  { id: "comparison" as Section, label: "比較表" },
  { id: "demo" as Section, label: "デモムービー" },
  { id: "samples" as Section, label: "デモサウンド" },
  { id: "usage" as Section, label: "使用例" },
  { id: "features" as Section, label: "主な機能" },
  { id: "controls" as Section, label: "コントロール" },
  { id: "block-diagram" as Section, label: "ブロック図" },
  { id: "connections" as Section, label: "一般的な接続例" },
  { id: "operation" as Section, label: "オペレーション" },
  { id: "software" as Section, label: "ソフトウェア" },
  { id: "faq" as Section, label: "よくある質問" },
  { id: "manual" as "manual", label: "取扱説明書", isDownload: true },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function TemplePage() {
  const [activeSection, setActiveSection] = useState<Section>("concept")
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
    downloadManual("hotone", "temple")
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
          src="/images/brands/hotone/temple/hero.jpg"
          alt="Temple"
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
                <p className="text-2xl font-bold text-gray-900">TEMPLE</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">コンボリューション・リバーブペダル</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-hotone">
                  ¥50,000
                </p>
                <p className="text-xs text-gray-500">（税込）</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">6959473910054</p>
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

      {/* Intro Section - Top Part with Video */}
      <section className="py-20 scroll-mt-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              想像と現実のリバーブが出会う、無限のサウンドレンジ
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
                  src="https://www.youtube.com/embed/3NK_FhZNvJY"
                  title="Hotone Verbera Introduction"
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
                    <span className="text-gray-900">クイックスタートガイド</span>
                  </button>
                  <button
                    onClick={handleManualDownload}
                    className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200"
                  >
                    <div className="w-2 h-2 rounded-full hotone-dot" />
                    <span className="text-gray-900">日本語ユーザーマニュアル</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Product Description and Features */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">コンボリューション演算がもたらすアンビエント</h3>

                <div className="prose max-w-none mb-8">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    満員のスタジアムに響き渡るサウンドを想像したことはありますか？　あるいは、NASAの宇宙船格納庫の金属壁に反響するサウンドを想像したことはありますか？　もしあなたのギターが宇宙のホワイトホールに落ちたら…あるいは、何世紀も前に建てられた大聖堂のアーチ型天井を漂い彷徨っているとしたら？
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    VERBERAの世界へようこそ。それは想像力が現実となる場所…
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    これは、DAWで馴染みのあるコンボリューション・プラグインではありません。VERBERAは、超低レイテンシー、驚異的な微調整機能、そして無限の音域を誇るスタンドアロンのハードウェア・コンボリューション・リバーブ・ペダルです。象徴的な空間やビンテージ・ハードウェアの再現や、かつて聴いたことのない別世界のリバーブエフェクトを提供してくれます。VERBERAは、ミュージシャンやエンジニアにとって、ライブとスタジオの両方のセットアップで新たな最強のツールになることを我々は確信しています。
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">
                      リアルなステレオ空間を実現する高精度コンボリューションリバーブ。世界中のユニークな空間のIRとオリジナルIRを収録
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">入力選択モードを備えたステレオ入出力</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">
                      デュアルリバーブ：IRコンボリューションリバーブと追加のアルゴリズミックリバーブを柔軟に組み合わせることが可能
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">最長20秒のリバーブテイルと低レイテンシーのリバーブエフェクトに対応</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">IRエンベロープのリアルタイム調整、IRのシームレスな読み込みと切り替え</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Attack、Tone、Modの各パラメーターを搭載し、リバーブトーンを自在にコントロール
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">グローバルTrailスイッチに対応</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">EXPまたはMIDI外部コントロールで追加パラメーターをコントロール</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">リバーブクローン機能で、独自のIRを作成可能</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">高性能AD/DA、32ビット/192kHzサンプリング</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">アナログ・ドライスルー回路設計</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">
                      デュアル・フットスイッチ・モードは、リアルタイム・フリーズをサポートし、無限のリバーブ・テイルを実現
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">
                      高解像度LCDスクリーンでシームレスかつ素早い操作を実現
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">
                      USB経由でコンピューターに接続し、無料のPC/MACソフトウェアを使用してファームウェアのアップグレード、プリセット、IR管理が可能
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">Type-C USBはPD電源供給に対応</p>
                  </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* Product Concept Section - Full Width Dark Background */}
      <section id="concept" className="py-16 scroll-mt-24 bg-concept-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">製品コンセプト</h3>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="space-y-20 max-w-7xl mx-auto">
            {/* 1. Iconic Spaces and Classic Gear that Resonate When Heard */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative w-full aspect-[16/10]">
                  <Image
                    src="/images/brands/hotone/temple/concept_01.jpg"
                    alt="Iconic Spaces and Classic Gear that Resonate When Heard"
                    fill
                    className="rounded-xl shadow-2xl object-cover"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h4 className="text-2xl font-bold text-white mb-6">
                  踏み込むと…そこに広がる象徴的な空間とクラシックギア
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  VERBERAには、世界トップクラスのインパルスレスポンス（IR）が120種類収録されています。シンフォニーホール、ヨーロッパの大聖堂、さらには航空宇宙施設といった伝説的な空間から、息を呑むほどのディテールまで克明に収録されています。さらに、スプリングリバーブやプレートリバーブ等のスタジオ機材をモデルにしたIRも収録されています。壮大なサウンドから細部まで読み取られたサウンドまで、モダンからレトロサウンドまで、VERBERAはあらゆる音響環境を足元から創ります。
                </p>
              </div>
            </div>

            {/* 2. Reverberation Beyond Time and Space */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h4 className="text-2xl font-bold text-white mb-6">異次元のリバーブ</h4>
                <p className="text-gray-300 leading-relaxed">
                  VERBERAはリアリズムに止まりません。革新を追求します。緻密に収録されたIRに加え、Hotoneが厳選したオリジナルIRライブラリも搭載されています。それらすべてが想像力の限界を広げてくれます。SF風のシンセ・アトモスフィア、タイムワーピング・ディレイ・トレイル、宇宙の「ホワイトホール」から引き出されたような揺らめくテクスチャなど、様々な表現をお届けします。これらは、ありきたりなリバーブとは一線を画し、あなたの新たな傑作を生み出すための、あなたの創造性を刺激するツールです。
                </p>
              </div>
              <div>
                <div className="relative w-full aspect-[16/10]">
                  <Image
                    src="/images/brands/hotone/temple/concept_02.jpg"
                    alt="Reverberation Beyond Time and Space"
                    fill
                    className="rounded-xl shadow-2xl object-cover"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>

            {/* 3. Deep, Magical, and Sound-Design-Driven Dual Reverb Engine */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative w-full aspect-[16/10]">
                  <Image
                    src="/images/brands/hotone/temple/concept_03.jpg"
                    alt="Deep, Magical, and Sound-Design-Driven Dual Reverb Engine"
                    fill
                    className="rounded-xl shadow-2xl object-cover"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h4 className="text-2xl font-bold text-white mb-6">
                  深く異次元的なサウンドデザインを実現するデュアルリバーブエンジン
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  VERBERAの心臓部はデュアルエンジン設計です。片方はIRコンボリューションエンジンで、現実空間や機材の繊細な反射音を捉えます。もう片方は、精密に調整されたアルゴリズムリバーブ「XR」で、超現実的で高次元的なアンビエンスをサウンドに提供します。 それらを重ねて、かたちを整え、そしてXRリバーブをワンタップでフリーズさせれば、無限に変化するテクスチャとアンビエントパッドを作成できます。
                </p>
              </div>
            </div>

            {/* 4. Seamless Transition to Cutting-Edge Convolution Technology */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h4 className="text-2xl font-bold text-white mb-6">
                  最先端のコンボリューションテクノロジーによるシームレスな切り替え
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  Hotone独自の低レイテンシー・コンボリューションエンジンを搭載したVERBERAは、スタジオグレードのリバーブテール（ステレオで最大10秒、モノラルで最大20秒）を、ビートを見逃さず再現してくれます。IRを即座に切り替え、オーディオドロップアウトは一切発生しません。これは、従来の限界をはるかに超えた次世代のパフォーマンスです。
                </p>
              </div>
              <div>
                <div className="relative w-full aspect-[16/10]">
                  <Image
                    src="/images/brands/hotone/temple/concept_04.jpg"
                    alt="Seamless Transition to Cutting-Edge Convolution Technology"
                    fill
                    className="rounded-xl shadow-2xl object-cover"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>

            {/* 5. Studio Power Meets Stage Simplicity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative w-full aspect-[16/10]">
                  <Image
                    src="/images/brands/hotone/temple/concept_05.jpg"
                    alt="Studio Power Meets Stage Simplicity"
                    fill
                    className="rounded-xl shadow-2xl object-cover"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h4 className="text-2xl font-bold text-white mb-6">スタジオパワーとステージのシンプルさを両立</h4>
                <p className="text-gray-300 leading-relaxed">
                  32ビット/192kHzプロセッシング、リアルタイムIRスカルプティング、そして完全アナログのドライスルー回路を搭載したVERBERAは、楽器のあらゆるニュアンスを捉え、それを精密に形作ります。トーン、アタック、プリディレイ、モジュレーション、エンベロープ設定を瞬時に調整し、あなただけのリバーブトーンを作り出せます。
                </p>
              </div>
            </div>

            {/* 6. IR Cloning: Capture Any Reverb, Anywhere */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h4 className="text-2xl font-bold text-white mb-6">
                  IRクローニング：あらゆるリバーブを、どこででもキャプチャー
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  VERBERAは、お気に入りのペダルやエフェクトのサウンドを、本体内でカスタムIRとしてクローン化できます。最大1024個のIRが保存できるため、サウンドパレットを自在にコントロールしたい人にとって、無限のインスピレーションの源となります。
                </p>
              </div>
              <div>
                <div className="relative w-full aspect-[16/10]">
                  <Image
                    src="/images/brands/hotone/temple/concept_06.jpg"
                    alt="IR Cloning: Capture Any Reverb, Anywhere"
                    fill
                    className="rounded-xl shadow-2xl object-cover"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>

            {/* 7. Parameter-First Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative w-full aspect-[16/10]">
                  <Image
                    src="/images/brands/hotone/temple/concept_07.jpg"
                    alt="Parameter-First Interface"
                    fill
                    className="rounded-xl shadow-2xl object-cover"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h4 className="text-2xl font-bold text-white mb-6">パフォーマー優先のインターフェース</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-300 text-sm">
                      プリセットを即座に保存・名前変更も可能
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-300 text-sm">
                      暗いステージ上でもエフェクトの状態が一目でわかる2色LEDリング
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-300 text-sm">
                      名前、テールの長さ、スムースネスなど、IRエフェクトをワンタッチでソート（合計6種類のソートモード）
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-300 text-sm">
                      デュアルフットスイッチモード：プリセットモードとコントロールモードで、柔軟なリアルタイム操作が可能
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-300 text-sm">
                      MIDI + EXPペダルによる外部コントロールの完全サポート
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lineup Section */}
      <section id="lineup" className="py-20 scroll-mt-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">製品ラインナップ</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full bg-accent-lime" />
            </div>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* SPC-3 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="bg-gray-300 px-6 py-3">
                  <h3 className="text-xl font-bold text-gray-900">SPC-3</h3>
                </div>
                <div className="p-6">
                  <div className="bg-white flex items-center justify-center mb-6">
                    <Image
                      src="/images/brands/hotone/temple/lineup_01.jpg"
                      alt="SPC-3"
                      width={400}
                      height={400}
                      className="object-contain"
                    />
                  </div>
                  <div className="space-y-2 text-gray-800">
                    <p><span className="font-medium">プラグ：</span>1/4インチ・フォーン</p>
                    <p><span className="font-medium">長さ：</span>3m</p>
                    <p><span className="font-medium">価格：</span>オープンプライス</p>
                    <p><span className="font-medium">参考価格：</span>¥3,850（税別）</p>
                    <p><span className="font-medium">JAN：</span>6959473950135</p>
                  </div>
                </div>
              </div>

              {/* SPC-5 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="bg-gray-300 px-6 py-3">
                  <h3 className="text-xl font-bold text-gray-900">SPC-5</h3>
                </div>
                <div className="p-6">
                  <div className="bg-white flex items-center justify-center mb-6">
                    <Image
                      src="/images/brands/hotone/temple/lineup_02.jpg"
                      alt="SPC-5"
                      width={400}
                      height={400}
                      className="object-contain"
                    />
                  </div>
                  <div className="space-y-2 text-gray-800">
                    <p><span className="font-medium">プラグ：</span>1/4インチ・フォーン</p>
                    <p><span className="font-medium">長さ：</span>5m</p>
                    <p><span className="font-medium">価格：</span>オープンプライス</p>
                    <p><span className="font-medium">参考価格：</span>¥4,950（税別）</p>
                    <p><span className="font-medium">JAN：</span>6959473950142</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section id="comparison" className="py-20 scroll-mt-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">比較表</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center">
              <Image
                src="/images/brands/hotone/temple/compare_01.png"
                alt="製品比較表"
                width={1200}
                height={800}
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Placeholder sections for other content */}
      <div className="bg-gray-50">
        {/* Demo Movie Section */}
        <section id="demo" className="py-20 scroll-mt-24 bg-gray-100">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">デモムービー</h2>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 rounded-full hotone-bar" />
              </div>
            </div>
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black rounded-2xl overflow-hidden aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/3NK_FhZNvJY"
                    title="Verbera Demo Video 1"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="bg-black rounded-2xl overflow-hidden aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/2-n7ZHCzsew"
                    title="Verbera Demo Video 2"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="bg-black rounded-2xl overflow-hidden aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/gorEE3dYHcc"
                    title="Verbera Demo Video 3"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="bg-black rounded-2xl overflow-hidden aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/50v1lwkYoN8"
                    title="Verbera Demo Video 4"
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

        {/* Sample Sound Section */}
        <section id="samples" className="py-20 scroll-mt-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">サンプルサウンド</h2>
              <p className="text-gray-600 text-lg">18のプリセットサウンドを試聴</p>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 rounded-full hotone-bar" />
              </div>
            </div>
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* 1. Verbera-E Guitar (Preset: 001) */}
                <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#FF6600]/30">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF6600]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-hotone">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-base leading-tight">Verbera</h3>
                          <p className="text-gray-500 text-xs">E Guitar</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded-lg bg-hotone text-white">
                        001
                      </span>
                    </div>
                    <audio controls className="w-full h-10 rounded-lg">
                      <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1_Verbera-E%20Guitar.1751246978190-f8kyT9Y867ATtxfy6QE1ypgoIZgwWN.wav" type="audio/wav" />
                    </audio>
                  </div>
                </div>

                {/* 2. Disco Elysium-E Guitar (Preset: 028) */}
                <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#FF6600]/30">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF6600]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-hotone">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-base leading-tight">Disco Elysium</h3>
                          <p className="text-gray-500 text-xs">E Guitar</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded-lg bg-hotone text-white">
                        028
                      </span>
                    </div>
                    <audio controls className="w-full h-10 rounded-lg">
                      <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2_Disco%20Elysium-E%20Guitar.1751247165986-9ny2fEQiZ7WMiUcgCxM54CepyP2L0m.wav" type="audio/wav" />
                    </audio>
                  </div>
                </div>

                {/* 3. Dome Center-E Guitar (Preset: 068) */}
                <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#FF6600]/30">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF6600]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-hotone">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-base leading-tight">Dome Center</h3>
                          <p className="text-gray-500 text-xs">E Guitar</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded-lg bg-hotone text-white">
                        068
                      </span>
                    </div>
                    <audio controls className="w-full h-10 rounded-lg">
                      <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3_Dome%20Center-E%20Guitar.1751247290359-GTHLSRV2qtXimxezgznbRRhvmFFx0Q.wav" type="audio/wav" />
                    </audio>
                  </div>
                </div>

                {/* 4-18: Apply same pattern to remaining cards */}
                <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#FF6600]/30">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF6600]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-hotone">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-base leading-tight">Divine Church</h3>
                          <p className="text-gray-500 text-xs">E Guitar</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded-lg bg-hotone text-white">
                        088
                      </span>
                    </div>
                    <audio controls className="w-full h-10 rounded-lg">
                      <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4_Divine%20Church-E%20Guitar.1751247457621-nCIL7Q2CqQBQ1YDDeDT87NVmbNeTYz.wav" type="audio/wav" />
                    </audio>
                  </div>
                </div>

                <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#FF6600]/30">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF6600]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-hotone">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-base leading-tight">Old Church</h3>
                          <p className="text-gray-500 text-xs">E Guitar</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded-lg bg-hotone text-white">
                        071
                      </span>
                    </div>
                    <audio controls className="w-full h-10 rounded-lg">
                      <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5_Old%20Church-E%20Guitar.1751247517123-JceVKLiOFgjiL1DF2dp9lG6V4YN0ag.wav" type="audio/wav" />
                    </audio>
                  </div>
                </div>

                <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#FF6600]/30">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF6600]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-hotone">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-base leading-tight">Oil Can</h3>
                          <p className="text-gray-500 text-xs">E Guitar</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded-lg bg-hotone text-white">
                        034
                      </span>
                    </div>
                    <audio controls className="w-full h-10 rounded-lg">
                      <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6_Oil%20Can-E%20Guitar.1751247626659-fRpR2BckHmJplSPRIEoku9yR0ZZzB6.wav" type="audio/wav" />
                    </audio>
                  </div>
                </div>

                <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#FF6600]/30">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF6600]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-hotone">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-base leading-tight">Pulp Fiction</h3>
                          <p className="text-gray-500 text-xs">E Guitar</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded-lg bg-hotone text-white">
                        012
                      </span>
                    </div>
                    <audio controls className="w-full h-10 rounded-lg">
                      <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7_Pulp%20Fiction-E%20Guitar.1751247706089-PmbVtT41q9H9IYcPIeQQ61K2SFlIS9.wav" type="audio/wav" />
                    </audio>
                  </div>
                </div>

                <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#FF6600]/30">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF6600]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-hotone">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-base leading-tight">Flap Wings</h3>
                          <p className="text-gray-500 text-xs">E Guitar</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded-lg bg-hotone text-white">
                        062
                      </span>
                    </div>
                    <audio controls className="w-full h-10 rounded-lg">
                      <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8_Flap%20Wings-E%20Guitar.1751247788853-8OJulZ7sfsumu477z2JgIMbcLVa4j4.wav" type="audio/wav" />
                    </audio>
                  </div>
                </div>

                <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#FF6600]/30">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF6600]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-hotone">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-base leading-tight">Neural Drifter</h3>
                          <p className="text-gray-500 text-xs">E Guitar</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded-lg bg-hotone text-white">
                        056
                      </span>
                    </div>
                    <audio controls className="w-full h-10 rounded-lg">
                      <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9_Neural%20Drifter-E%20Guitar.1751247859545-ih1Xn8TODrs1xgO0dKMBiRBYZLLx88.wav" type="audio/wav" />
                    </audio>
                  </div>
                </div>

                <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#FF6600]/30">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF6600]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-hotone">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-base leading-tight">To The Moon</h3>
                          <p className="text-gray-500 text-xs">E Guitar</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded-lg bg-hotone text-white">
                        039
                      </span>
                    </div>
                    <audio controls className="w-full h-10 rounded-lg">
                      <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10_To%20The%20Moon-E%20Guitar.1751248030028-YuGG5Otrk3U1q0kq8MwN6FBGZzgELm.wav" type="audio/wav" />
                    </audio>
                  </div>
                </div>

                <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#FF6600]/30">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF6600]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-hotone">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-base leading-tight">Cocteau Vibe</h3>
                          <p className="text-gray-500 text-xs">E Guitar</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded-lg bg-hotone text-white">
                        059
                      </span>
                    </div>
                    <audio controls className="w-full h-10 rounded-lg">
                      <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/11_Cocteau%20Vibe-E%20Guitar.1751248111251-rCbFayCJytA0WQSFeoBN97dQA80Y66.wav" type="audio/wav" />
                    </audio>
                  </div>
                </div>

                <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#FF6600]/30">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF6600]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-hotone">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-base leading-tight">Motion Picture</h3>
                          <p className="text-gray-500 text-xs">E Guitar</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded-lg bg-hotone text-white">
                        074
                      </span>
                    </div>
                    <audio controls className="w-full h-10 rounded-lg">
                      <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12_Motion%20Picture-E%20Guitar.1751248151677-WAc1TReWrws1VoTTrvMtwTb0khjVj4.wav" type="audio/wav" />
                    </audio>
                  </div>
                </div>

                <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#FF6600]/30">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF6600]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-hotone">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-base leading-tight">Short+Long</h3>
                          <p className="text-gray-500 text-xs">E Guitar</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded-lg bg-hotone text-white">
                        069
                      </span>
                    </div>
                    <audio controls className="w-full h-10 rounded-lg">
                      <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/13_Short%2BLong-E%20Guitar.1751248336445-kRALOceUgqVKrlS9lYZypBMlcwGRDJ.wav" type="audio/wav" />
                    </audio>
                  </div>
                </div>

                <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#FF6600]/30">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF6600]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-hotone">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-base leading-tight">Blossom</h3>
                          <p className="text-gray-500 text-xs">AC Guitar</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded-lg bg-hotone text-white">
                        075
                      </span>
                    </div>
                    <audio controls className="w-full h-10 rounded-lg">
                      <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/14_Blossom-AC%20Guitar.1751248631163-tZhlCHhbmn7wLmGlIY6gOhdUIBQm1j.wav" type="audio/wav" />
                    </audio>
                  </div>
                </div>

                <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#FF6600]/30">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF6600]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-hotone">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-base leading-tight">Cold Room</h3>
                          <p className="text-gray-500 text-xs">AC Guitar</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded-lg bg-hotone text-white">
                        044
                      </span>
                    </div>
                    <audio controls className="w-full h-10 rounded-lg">
                      <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/15_Cold%20Room-AC%20Guitar.1751249494970-8tAAmt9oRuLxfG7I06Nx714wQ58UIU.wav" type="audio/wav" />
                    </audio>
                  </div>
                </div>

                <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#FF6600]/30">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF6600]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-hotone">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-base leading-tight">Blade Runner</h3>
                          <p className="text-gray-500 text-xs">Bass</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded-lg bg-hotone text-white">
                        049
                      </span>
                    </div>
                    <audio controls className="w-full h-10 rounded-lg">
                      <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/16_Blade%20Runner-Bass.1751250302264-Cz5mNSkK0q1PrY2qxwJ5C3jIOeTEx6.wav" type="audio/wav" />
                    </audio>
                  </div>
                </div>

                <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#FF6600]/30">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF6600]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-hotone">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-base leading-tight">Synth Haze</h3>
                          <p className="text-gray-500 text-xs">Synth</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded-lg bg-hotone text-white">
                        055
                      </span>
                    </div>
                    <audio controls className="w-full h-10 rounded-lg">
                      <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/17_Synth%20Haze-Synth.1751250451452-uLS0d7A1GOx4ls2yRAmPBciETeSnzd.wav" type="audio/wav" />
                    </audio>
                  </div>
                </div>

                <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#FF6600]/30">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF6600]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-hotone">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-base leading-tight">Retro Wave</h3>
                          <p className="text-gray-500 text-xs">Synth</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded-lg bg-hotone text-white">
                        010
                      </span>
                    </div>
                    <audio controls className="w-full h-10 rounded-lg">
                      <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/18_Retro%20Wave-Synth.1751250636005-cex11HFdq8LXY3KXP79Jdeg9hjCddb.wav" type="audio/wav" />
                    </audio>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Examples Section */}
        <section id="usage" className="py-20 scroll-mt-24 bg-gray-100">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">使用例</h2>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 rounded-full hotone-bar" />
              </div>
            </div>
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 01 - Amperoとの使用例 */}
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <div className="bg-gray-300 px-6 py-3 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">Amperoとの使用例</h3>
                    <span className="text-2xl font-bold text-gray-400">01</span>
                  </div>
                  <div className="p-4">
                    <Image
                      src="/images/brands/hotone/temple/example_01.gif"
                      alt="Amperoとの使用例"
                      width={600}
                      height={400}
                      className="w-full rounded"
                      unoptimized
                    />
                  </div>
                </div>

                {/* 02 - Ampero Pressとの使用例 */}
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <div className="bg-gray-300 px-6 py-3 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">Ampero Pressとの使用例</h3>
                    <span className="text-2xl font-bold text-gray-400">02</span>
                  </div>
                  <div className="p-4">
                    <Image
                      src="/images/brands/hotone/temple/example_02.gif"
                      alt="Ampero Pressとの使用例"
                      width={600}
                      height={400}
                      className="w-full rounded"
                      unoptimized
                    />
                  </div>
                </div>

                {/* 03 - Ampero Switchとの使用例 */}
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <div className="bg-gray-300 px-6 py-3 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">Ampero Switchとの使用例</h3>
                    <span className="text-2xl font-bold text-gray-400">03</span>
                  </div>
                  <div className="p-4">
                    <Image
                      src="/images/brands/hotone/temple/example_03.gif"
                      alt="Ampero Switchとの使用例"
                      width={600}
                      height={400}
                      className="w-full rounded"
                      unoptimized
                    />
                  </div>
                </div>

                {/* 04 - VStomp Ampアプリとの使用例 */}
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <div className="bg-gray-300 px-6 py-3 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">VStomp Ampアプリとの使用例</h3>
                    <span className="text-2xl font-bold text-gray-400">04</span>
                  </div>
                  <div className="p-4">
                    <Image
                      src="/images/brands/hotone/temple/example_04.gif"
                      alt="VStomp Ampアプリとの使用例"
                      width={600}
                      height={400}
                      className="w-full rounded"
                      unoptimized
                    />
                  </div>
                </div>

                {/* 05 - drum machine との使用例 */}
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <div className="bg-gray-300 px-6 py-3 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">drum machine との使用例</h3>
                    <span className="text-2xl font-bold text-gray-400">05</span>
                  </div>
                  <div className="p-4">
                    <Image
                      src="/images/brands/hotone/temple/example_05.gif"
                      alt="drum machine との使用例"
                      width={600}
                      height={400}
                      className="w-full rounded"
                      unoptimized
                    />
                  </div>
                </div>

                {/* 06 - MIDI機能のあるエフェクターとの使用例 */}
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <div className="bg-gray-300 px-6 py-3 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">MIDI機能のあるエフェクターとの使用例</h3>
                    <span className="text-2xl font-bold text-gray-400">06</span>
                  </div>
                  <div className="p-4">
                    <Image
                      src="/images/brands/hotone/temple/example_06.gif"
                      alt="MIDI機能のあるエフェクターとの使用例"
                      width={600}
                      height={400}
                      className="w-full rounded"
                      unoptimized
                    />
                  </div>
                </div>

                {/* 07 - シンセサイザーとの使用例 */}
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <div className="bg-gray-300 px-6 py-3 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">シンセサイザーとの使用例</h3>
                    <span className="text-2xl font-bold text-gray-400">07</span>
                  </div>
                  <div className="p-4">
                    <Image
                      src="/images/brands/hotone/temple/example_07.gif"
                      alt="シンセサイザーとの使用例"
                      width={600}
                      height={400}
                      className="w-full rounded"
                      unoptimized
                    />
                  </div>
                </div>

                {/* 08 - DAWのリモートコントロール（プレイ/ストップ） */}
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <div className="bg-gray-300 px-6 py-3 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">DAWのリモートコントロール（プレイ/ストップ）</h3>
                    <span className="text-2xl font-bold text-gray-400">08</span>
                  </div>
                  <div className="p-4">
                    <Image
                      src="/images/brands/hotone/temple/example_08.gif"
                      alt="DAWのリモートコントロール（プレイ/ストップ）"
                      width={600}
                      height={400}
                      className="w-full rounded"
                      unoptimized
                    />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-8 text-center">
                ※注：サイト中のHOTONE以外の製品は、アプリケーション説明のリファレンスとして使用しています。
              </p>
            </div>
          </div>
        </section>

        {/* Main Features Section */}
        <section id="features" className="py-20 scroll-mt-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">主な機能</h2>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 rounded-full hotone-bar" />
              </div>
            </div>
            <div className="max-w-7xl mx-auto">
              {/* 4つの機能カード */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {/* 01 - デュアル エフェクト チェーン */}
                <div className="bg-white rounded-lg overflow-hidden">
                  <div className="bg-gray-300 px-6 py-3 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">デュアル エフェクト チェーン</h3>
                    <span className="text-2xl font-bold text-gray-400">01</span>
                  </div>
                  <div className="p-4">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full rounded pointer-events-none"
                    >
                      <source src="/images/brands/hotone/temple/function_01.mp4" type="video/mp4" />
                    </video>
                    <p className="text-gray-700 text-sm mt-4 leading-relaxed">
                      シリーズ/パラレル＆外部とのステレオFXループなど、自由にカスタマイズできるルーティングと同時使用可能な12エフェクトモジュールを搭載しました。2系統のオーディオ入力に対応できるデュアル エフェクト チェーンは、ギター＆ベースの同時プレイも可能です。
                    </p>
                  </div>
                </div>

                {/* 02 - 60秒ステレオルーパー */}
                <div className="bg-white rounded-lg overflow-hidden">
                  <div className="bg-gray-300 px-6 py-3 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">60秒ステレオルーパー</h3>
                    <span className="text-2xl font-bold text-gray-400">02</span>
                  </div>
                  <div className="p-4">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full rounded pointer-events-none"
                    >
                      <source src="/images/brands/hotone/temple/function_02.mp4" type="video/mp4" />
                    </video>
                    <p className="text-gray-700 text-sm mt-4 leading-relaxed">
                      Ampero II Stompは、最長60秒録音可能なステレオ レコーディング ルーパー機能を備えています。このルーパーにはundo/redo、1/2 speed、reverse record/playなどの重要な機能もフル装備しています。ライブ再生時には、ルーパーソースをドライまたはウェットのどちらでも信号再生が可能です。
                    </p>
                  </div>
                </div>

                {/* 03 - タッチ＆ゴーのスムーズナビゲーション */}
                <div className="bg-white rounded-lg overflow-hidden">
                  <div className="bg-gray-300 px-6 py-3 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">タッチ＆ゴーのスムーズナビゲーション</h3>
                    <span className="text-2xl font-bold text-gray-400">03</span>
                  </div>
                  <div className="p-4">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full rounded pointer-events-none"
                    >
                      <source src="/images/brands/hotone/temple/function_03.mp4" type="video/mp4" />
                    </video>
                    <p className="text-gray-700 text-sm mt-4 leading-relaxed">
                      Ampero II Stompは、「使いやすさとスピード」を重視したナビゲーションによるユーザーインターフェースを再構築しました。ルーティング、スイッチングやレベルの各設定、スタイルによりカテゴリー分けされたアンプやエフェクターの選択が、新しいタッチスクリーンから軽快に行えます。
                    </p>
                  </div>
                </div>

                {/* 04 - 豊富なI/O */}
                <div className="bg-white rounded-lg overflow-hidden">
                  <div className="bg-gray-300 px-6 py-3 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">豊富なI/O</h3>
                    <span className="text-2xl font-bold text-gray-400">04</span>
                  </div>
                  <div className="p-4">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full rounded pointer-events-none"
                    >
                      <source src="/images/brands/hotone/temple/function_04.mp4" type="video/mp4" />
                    </video>
                    <p className="text-gray-700 text-sm mt-4 leading-relaxed">
                      インストルメント/ペダル/アンプ/インターフェース…どんなアプリケーション時の接続にも対応する入出力を装備しました。それらの入出力はワイド信号レベルレンジを備えたステレオ入出力です。また、外部からのコントロールはEXP/CTRLとMIDI In/Outで、パラメーターやパッチの切り替え、モジュラーのon/off等のコントロールもリアルタイムに操作できます。
                    </p>
                  </div>
                </div>
              </div>

              {/* 機能リスト */}
              <div className="bg-gray-100 rounded-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                  {/* 左列 */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <p className="text-gray-800 text-sm">豊富な入出力でペダルボード上のエフェクターとのインターフェースも万全</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <p className="text-gray-800 text-sm">4インチ 800 x 480カラーダイナミックタッチスクリーンを採用</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <p className="text-gray-800 text-sm">カスタマイズ可能なメインディスプレイモード</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <p className="text-gray-800 text-sm">400+の豊富なエフェクトライブラリー</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <p className="text-gray-800 text-sm">undo/redo 機能も備えた60秒ステレオルーパー</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <p className="text-gray-800 text-sm">エフェクトチェーン内でのエフェクトモジュールの選択が自由に行えます</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <p className="text-gray-800 text-sm">50 xローダースロットを備えたIRローダー（3rd party IR付き：20 x classic Celestion®）</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <p className="text-gray-800 text-sm">トゥルーステレオプロセッシング</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <p className="text-gray-800 text-sm">8-in & 8-out USBオーディオインターフェースとしても使用可能</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <p className="text-gray-800 text-sm">リアンプ機能搭載</p>
                    </div>
                  </div>

                  {/* 右列 */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <p className="text-gray-800 text-sm">MIDI I/Oジャック＆EXP/CTRLジャックとの接続による高度な外部コントロール</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <p className="text-gray-800 text-sm">モバイルデバイス感覚で使えるユーザーインターフェースを実現</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <p className="text-gray-800 text-sm">シリーズ/パラレルの複雑な接続まで可能なデュアルエフェクトチェーン</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <p className="text-gray-800 text-sm">アコースティック用エフェクト＆プリセット</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <p className="text-gray-800 text-sm">最大12エフェクトモジュールの同時使用が可能</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <p className="text-gray-800 text-sm">ステレオI/O＆ステレオエフェクトループがルーティングや音作りの可能性を広げます</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <p className="text-gray-800 text-sm">2048 IRサンプリングポイントを採用</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <p className="text-gray-800 text-sm">アサイン可能な、マルチカラーへイローLED付き3フットスイッチ</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <p className="text-gray-800 text-sm">インプットモードが入力により変更＆設定できます</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <p className="text-gray-800 text-sm">9-18V DCの電源供給が可能</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Controls Section */}
        <section id="controls" className="py-20 scroll-mt-24 bg-gray-100">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">コントロール</h2>
              <div className="flex justify-center">
                <div className="w-20 h-1 rounded bg-accent-green" />
              </div>
            </div>

            <div className="max-w-7xl mx-auto space-y-16">
              <div className="flex justify-center mb-16">
                <div className="relative w-full max-w-2xl">
                  <Image
                    src="/images/brands/hotone/temple/control_01.png"
                    alt="Controls - Front"
                    width={800}
                    height={900}
                    className="rounded-lg w-full"
                    priority
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* DECAY */}
                  <div>
                    <div className="inline-block bg-gray-300 px-4 py-2 rounded-full mb-3">
                      <span className="flex items-center gap-2 text-sm font-medium text-gray-800">
                        <span className="text-lg">◉</span> DECAY
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-700">
                      <p><strong>ALT-IR：</strong>コンボリューションリバーブ（IR）のディケイを調整します。</p>
                      <p><strong>ALT-XR：</strong>エクストラリバーブ（XR）のディケイを調整します。</p>
                    </div>
                  </div>

                  {/* ATK/PRE-DL */}
                  <div>
                    <div className="inline-block bg-gray-300 px-4 py-2 rounded-full mb-3">
                      <span className="flex items-center gap-2 text-sm font-medium text-gray-800">
                        <span className="text-lg">◉</span> ATK/PRE-DL
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-700">
                      <p><strong>ALT-IR：</strong>コンボリューションリバーブ（IR）のアタックを調整します。</p>
                      <p><strong>ALT-GLOBAL：</strong>ウェット信号全体のプリディレイを調整します。</p>
                    </div>
                  </div>

                  {/* TONE/MOD */}
                  <div>
                    <div className="inline-block bg-gray-300 px-4 py-2 rounded-full mb-3">
                      <span className="flex items-center gap-2 text-sm font-medium text-gray-800">
                        <span className="text-lg">◉</span> TONE/MOD
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-700">
                      <p><strong>ALT-GLOBAL：</strong>ウェット信号のブライトネスを調整します。</p>
                      <p><strong>ALT-GLOBAL：</strong>ウェット信号のMOD デプスを調整します。</p>
                    </div>
                  </div>

                  {/* PRESET */}
                  <div>
                    <div className="inline-block bg-gray-300 px-4 py-2 rounded-full mb-3">
                      <span className="flex items-center gap-2 text-sm font-medium text-gray-800">
                        <span className="text-lg">◉</span> PRESET
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-700">
                      <p><strong>回転：</strong>保存されているプリセットを切り替えます。</p>
                      <p><strong>押す：</strong>現在のプリセットを指定のプリセット場所に保存/ 名前変更します。</p>
                      <p><strong>長押し：</strong>プリセットを現在の場所に直接保存します。</p>
                    </div>
                  </div>

                  {/* MIX */}
                  <div>
                    <div className="inline-block bg-gray-300 px-4 py-2 rounded-full mb-3">
                      <span className="flex items-center gap-2 text-sm font-medium text-gray-800">
                        <span className="text-lg">◉</span> MIX
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-700">
                      <p><strong>ALT + IR：</strong>コンボリューションリバーブのドライ/ ウェットミックスを調整します。</p>
                      <p><strong>ALT + XR：</strong>エクストラリバーブ（XR）のドライ/ ウェットミックスを調整します。</p>
                    </div>
                  </div>

                  {/* IR */}
                  <div>
                    <div className="inline-block bg-gray-300 px-4 py-2 rounded-full mb-3">
                      <span className="flex items-center gap-2 text-sm font-medium text-gray-800">
                        <span className="text-lg">◉</span> IR
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-700">
                      <p><strong>回転：</strong>保存されているIR を切り替えます。</p>
                      <p><strong>押す：</strong>すべてのIR を異なるルールに従って順番に並べ替えます。</p>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* ALT/MENU */}
                  <div>
                    <div className="inline-block bg-gray-300 px-4 py-2 rounded-full mb-3">
                      <span className="flex items-center gap-2 text-sm font-medium text-gray-800">
                        <span className="text-lg">●</span> ALT/MENU
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-700">
                      <p><strong>押す：</strong>ノブの2 つの異なる機能を切り替えます。各ノブには以下の機能があります。</p>
                      <p><strong>ALT + IR：</strong>IR パラメータを調整します。</p>
                      <p><strong>ALT + XR：</strong>リバーブの追加パラメータを調整します。</p>
                      <p><strong>ALT + GLOBAL：</strong>ウェット信号全体のパラメータを調整します。</p>
                      <p><strong>長押し：</strong>MENU インターフェースに入ります。</p>
                    </div>
                  </div>

                  {/* CLONE */}
                  <div>
                    <div className="inline-block bg-gray-300 px-4 py-2 rounded-full mb-3">
                      <span className="flex items-center gap-2 text-sm font-medium text-gray-800">
                        <span className="text-lg">●</span> CLONE
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-700">
                      <p><strong>長押し：</strong>IR クローニングプロセスに入ります。</p>
                    </div>
                  </div>

                  {/* ALT/MENU + CLONE */}
                  <div>
                    <div className="inline-block bg-gray-300 px-4 py-2 rounded-full mb-3">
                      <span className="flex items-center gap-2 text-sm font-medium text-gray-800">
                        <span className="text-lg">● ●</span> ALT/MENU + CLONE
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-700">
                      <p>現プリセットのEXP 設定インターフェースに入ります。</p>
                    </div>
                  </div>

                  {/* ACTIVE & FREEZE */}
                  <div>
                    <div className="inline-block bg-gray-300 px-4 py-2 rounded-full mb-3">
                      <span className="flex items-center gap-2 text-sm font-medium text-gray-800">
                        <span className="text-lg">◀ ▶</span> ACTIVE & FREEZE
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-700">
                      <p><strong>ストンプモードの切り替え：</strong>コントロールモード/ プリセットモード</p>
                      <p className="font-semibold mt-3">コントロールモード：</p>
                      <p><strong>ACTIVE：</strong>リバーブのオン/ オフを切り替えます。</p>
                      <p><strong>FREEZE：</strong>リバーブフリーズ機能をオン/ オフにします。</p>
                      <p className="font-semibold mt-3">プリセットモード：</p>
                      <p><strong>ACTIVE：</strong>前のプリセットに切り替えます。</p>
                      <p><strong>FREEZE：</strong>次のプリセットに切り替えます。</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-20">
                <div className="flex justify-center mb-12">
                  <div className="relative w-full max-w-2xl">
                    <Image
                      src="/images/brands/hotone/temple/control_02.png"
                      alt="Verbera Back Panel"
                      width={1400}
                      height={800}
                      className="rounded-lg shadow-lg w-full"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  {/* IN */}
                  <div>
                    <div className="inline-block bg-gray-300 px-4 py-2 rounded-full mb-3">
                      <span className="text-sm font-semibold text-gray-800">◉ IN</span>
                    </div>
                    <div className="text-sm text-gray-700 space-y-1">
                      <p>MENU で入力モードを選択します：モノラル / ステレオ / オート</p>
                      <p>モノ入力の場合：モノラル楽器を接続する場合は、1/4インチTSケーブルを使用してください。</p>
                      <p>ステレオ入力の場合：ステレオ機器を接続する場合は、1/4インチTRSケーブルまたはY字ケーブルを使用してください。</p>
                    </div>
                  </div>

                  {/* MIDI THRU */}
                  <div>
                    <div className="inline-block bg-gray-300 px-4 py-2 rounded-full mb-3">
                      <span className="text-sm font-semibold text-gray-800">◉ MIDI THRU</span>
                    </div>
                    <div className="text-sm text-gray-700">
                      <p>1/8インチTRSケーブルを介してMIDIメッセージを転送するための標準MIDIスルーインターフェースです。</p>
                    </div>
                  </div>

                  {/* MIDI IN/EXP */}
                  <div>
                    <div className="inline-block bg-gray-300 px-4 py-2 rounded-full mb-3">
                      <span className="text-sm font-semibold text-gray-800">◉ MIDI IN/EXP</span>
                    </div>
                    <div className="text-sm text-gray-700">
                      <p>MENUでコントロールモードをEXP/MIDIに設定します。1/8インチTRSケーブルを使用して、MIDI機器またはエクスプレッションペダルを接続します。</p>
                    </div>
                  </div>

                  {/* OUT L/STEREO & R */}
                  <div>
                    <div className="inline-block bg-gray-300 px-4 py-2 rounded-full mb-3">
                      <span className="text-sm font-semibold text-gray-800">◉ OUT L/STEREO & R</span>
                    </div>
                    <div className="text-sm text-gray-700 space-y-1">
                      <p>モノ出力の場合：OUT L/STEREOチャンネルをモノラル入力機器に接続する場合は、1/4インチTSケーブルを使用してください。</p>
                      <p>ステレオ出力の場合：</p>
                      <p>1. OUT L/STEREO チャンネルをTRS入力を備えたステレオ機器に接続する場合は、1/4インチTRSケーブルを使用してください。</p>
                      <p>2. 1/4インチTSケーブル2本を使用して、OUT L/STEREOチャンネルとOUT RチャンネルをデュアルTS入力を備えたステレオ機器に接続します。</p>
                    </div>
                  </div>

                  {/* POWER */}
                  <div>
                    <div className="inline-block bg-gray-300 px-4 py-2 rounded-full mb-3">
                      <span className="text-sm font-semibold text-gray-800">◉ POWER</span>
                    </div>
                    <div className="text-sm text-gray-700">
                      <p>9V DC センターマイナスのアダプターを使用してください。アダプターは1000mA以上の電流容量が必要です。プラグは標準サイズの5.5mm x 2.1mmです。</p>
                    </div>
                  </div>

                  {/* USB */}
                  <div>
                    <div className="inline-block bg-gray-300 px-4 py-2 rounded-full mb-3">
                      <span className="text-sm font-semibold text-gray-800">◉ USB</span>
                    </div>
                    <div className="text-sm text-gray-700">
                      <p>USB 2.0 Type-C ジャックは、IR コントロールとプリセット管理用の専用ソフトウェアへの接続に使用します。USB PDプロトコルによる電源供給に対応しています。</p>
                    </div>
                  </div>
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
                <div className="w-24 h-1 rounded-full hotone-bar" />
              </div>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-center">
                <Image
                  src="/images/brands/hotone/temple/block_01.jpg"
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
                <div className="w-20 h-1 rounded bg-accent-green" />
              </div>
            </div>

            <div className="max-w-7xl mx-auto space-y-16">
              {/* 他のペダルと組み合わせて使用する場合 */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  他のペダルと組み合わせて使用する場合
                </h3>
                  <div className="flex justify-center">
                    <Image
                    src="/images/brands/hotone/temple/connection_01.png"
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
                  他のデバイスのエフェクトループで使用する場合
                </h3>
                  <div className="flex justify-center">
                    <Image
                    src="/images/brands/hotone/temple/connection_02.png"
                      alt="他のデバイスのエフェクトループで使用する場合"
                      width={1600}
                      height={800}
                    className="w-full max-w-3xl"
                    />
                  </div>
              </div>
            </div>
          </div>
        </section>

        {/* Operation Section */}
        <section id="operation" className="py-20 scroll-mt-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">オペレーション</h2>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 rounded-full hotone-bar" />
              </div>
            </div>
            <div className="max-w-4xl mx-auto space-y-12">
              {/* 第一部分 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="flex justify-center">
                  <Image
                    src="/images/brands/hotone/temple/operation_01.png"
                    alt="XTOMP Operation"
                    width={400}
                    height={300}
                    className="w-full max-w-sm"
                  />
                </div>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed text-sm">
                    XTOMPは、プレイしたことのない新たなアルゴリズムをローディングする場合、アルゴリズムのソフトの重さ（複雑さ）にもよりますが、約１分ほどの時間がかかります。しかし、プレイしたことのあるアルゴリズムのローディングは数秒で完了します。ですから、ライブの曲間にアルゴリズムを乗せ変えたい場合は、リハーサルを行っておけば、即座にアルゴリズムを入れ替えてその役割を変えられるわけです。
                  </p>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    例：ライブ中に、オーバードライブの『Zen Garden』→『Big Pie』ファズに変える。以前に、アルゴリズム『Big Pie』をプレイしたことがあれば、数秒で『Zen Garden』→『Big Pie』の変更が完了します。
                  </p>
                </div>
              </div>

              <hr className="border-gray-200" />

              {/* 第二部分 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="flex justify-center">
                  <Image
                    src="/images/brands/hotone/temple/operation_02.jpg"
                    alt="XTOMP App"
                    width={300}
                    height={500}
                    className="w-full max-w-xs rounded-lg shadow-lg"
                  />
                </div>
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    XTOMP本体に全エミュレーションを一度に読み込ませる便利な方法
                  </h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><span className="text-hotone font-bold">❶</span> XTOMPの電源をONにします。</p>
                    <p><span className="text-hotone font-bold">❷</span> コンピューター、またはスマートフォンでXTOMPアプリ（ソフトウェア）を起動します。</p>
                    <p><span className="text-hotone font-bold">❸</span> コンピューターの場合はXTOMPをUSB接続し、スマートフォンの場合はBluetoothで接続します。</p>
                    <p><span className="text-hotone font-bold">❹</span> 接続確立のメッセージが出たら、「Library」をクリックします。</p>
                    <p><span className="text-hotone font-bold">❺</span> 「One-Click-Load（Win）」または「ダウンロード」マーク（Mac）をクリックします。</p>
                    <p><span className="text-hotone font-bold">❻</span> 「All」をクリックします。</p>
                    <p><span className="text-hotone font-bold">❼</span> 「Load」をクリックすると、XTOMPにロードが開始されます。</p>
                  </div>

                  <hr className="border-gray-200" />

                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">ご注意</h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p><span className="text-yellow-600">⚠</span> ロード中は、XTOMPのLEDが順番に点灯します。</p>
                      <p><span className="text-yellow-600">⚠</span> XTOMPのLEDが点滅を始めたら、それはファームウェアのバージョンが低い事をお知らせしています。ファームウェアをアップデートしてから改めてお試しください。</p>
                      <p><span className="text-yellow-600">⚠</span> 一度ロードした内容でも、ファームウェア／エミュレーションのバージョンが変わると、再ロードが必要になる場合があります。</p>
                      <p><span className="text-yellow-600">⚠</span> ロードに失敗したエフェクトに関するメッセージが表示された場合、そのエフェクトは手動で再ロードしてください。</p>
                      <p><span className="text-yellow-600">⚠</span> XTOMPおよびXTOMP miniは、一度に159個のエフェクトまでしかロードできません。159個以上選択された場合、若い番号が、160個目に上書きされます。</p>
                    </div>
                  </div>

                  <hr className="border-gray-200" />

                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Bluetoothプロファイルについてのご注意</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      本製品のBluetoothプロファイルはATTを使用しています。ご使用のスマートフォンやタブレットが、ATTに対応しているかは取扱説明書またはメーカー公開情報をご参照ください。
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      ※ 2018年夏時点で富士通製Arrowsシリーズ（F-シリーズ）に非対応製品がある事が確認されております。最新の使用状況に関しては、ご使用のArrowsシリーズの取扱説明書をご確認ください。
                    </p>
                  </div>
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
                <div className="w-24 h-1 rounded-full hotone-bar" />
              </div>
            </div>

            {/* 上部：左图片 + 右说明 */}
            <div className="max-w-5xl mx-auto mb-12">
              <div className="bg-gray-100 rounded-xl p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <Image
                      src="/images/brands/hotone/temple/software_1.jpg"
                      alt="Neon Collector Software"
                      width={500}
                      height={350}
                      className="w-full rounded-lg"
                    />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900">Neon Collectorソフトウェア</h3>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      インスタントにフルコントロール、手間いらずの優れものコンパニオンアプリNeon Collectorを使えば、IRとプリセットの管理が簡単にできます。ユーザー.wavファイルのインポート、ライブラリーの整理、ファームウェアの最新化など、クリエイター向けに設計された洗練されたインターフェースで、あらゆる操作が可能です。
                    </p>
                    <p className="text-gray-700 text-sm">
                      下記より、ダウンロードするコンピューターに合わせたソフトウェアをダウンロードをしてください。
                    </p>
                    <div className="flex gap-4 pt-2">
                      <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                        </svg>
                        macOS
                      </a>
                      <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 5.5L10.5 4.5V11.5H3V5.5ZM3 12.5H10.5V19.5L3 18.5V12.5ZM11.5 4.3L21 3V11.5H11.5V4.3ZM11.5 12.5H21V21L11.5 19.7V12.5Z"/>
                        </svg>
                        Windows
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="max-w-5xl mx-auto border-gray-300 mb-12" />

            {/* 下拉窗口 */}
            <div className="max-w-5xl mx-auto space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Ververa Firmware 1.1.0 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <button
                  onClick={() => toggleSoftware("firmware")}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                        <Download className="w-5 h-5 text-white" />
                  </div>
                      <div className="text-left">
                        <span className="font-semibold text-gray-900 block">Ververa Firmware 1.1.0</span>
                        <span className="text-xs text-red-500 font-bold">New!</span>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.firmware ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.firmware && (
                    <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                        <Image
                        src="/images/brands/hotone/temple/software_02.png"
                        alt="Firmware"
                          width={300}
                          height={200}
                        className="rounded-lg mb-4"
                        />
                      <p className="text-gray-500 text-sm">ダウンロードリンク準備中...</p>
                      </div>
                  )}
                </div>

                {/* Neon Collector ソフトウェア V1.1.0 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                  <button
                    onClick={() => toggleSoftware("neonCollector")}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-gray-900 block">Neon Collector V1.1.0</span>
                        <span className="text-xs text-red-500 font-bold">New!</span>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.neonCollector ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedSoftware.neonCollector && (
                    <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                      <p className="text-gray-500 text-sm">ダウンロードリンク準備中...</p>
                    </div>
                  )}
                </div>
              </div>

              {/* 最新ファームウェア */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <button
                  onClick={() => toggleSoftware("firmwareOld")}
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl flex items-center justify-center">
                      <Download className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-semibold text-gray-900">Verbera Firmware V1.0.6</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.firmwareOld ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.firmwareOld && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                    <p className="text-gray-500 text-sm">ダウンロードリンク準備中...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 scroll-mt-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">よくある質問</h2>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 rounded-full hotone-bar" />
              </div>
            </div>
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* FAQ 1 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                  <button
                    onClick={() => toggleFaq("faq1")}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">Q</span>
                      </div>
                      <span className="font-medium text-gray-800 text-left text-sm">MIDIコントロールで発生するレイテンシーについて</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${expandedFaq.faq1 ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFaq.faq1 && (
                    <div className="px-5 py-4 bg-blue-50 border-t border-blue-100">
                      <p className="text-gray-600 text-sm">回答内容準備中...</p>
                    </div>
                  )}
                </div>

                {/* FAQ 2 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                  <button
                    onClick={() => toggleFaq("faq2")}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">Q</span>
                      </div>
                      <span className="font-medium text-gray-800 text-left text-sm">Ampero Controlのスイッチ動作について</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${expandedFaq.faq2 ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFaq.faq2 && (
                    <div className="px-5 py-4 bg-blue-50 border-t border-blue-100">
                      <p className="text-gray-600 text-sm">回答内容準備中...</p>
                  </div>
                )}
              </div>

                {/* FAQ 3 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <button
                    onClick={() => toggleFaq("faq3")}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">Q</span>
                  </div>
                      <span className="font-medium text-gray-800 text-left text-sm">Ampero Controlアプリに出てくる「Template/テンプレート」とは何ですか？</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${expandedFaq.faq3 ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFaq.faq3 && (
                    <div className="px-5 py-4 bg-blue-50 border-t border-blue-100">
                      <p className="text-gray-600 text-sm">回答内容準備中...</p>
                    </div>
                  )}
                </div>

                {/* FAQ 4 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                  <button
                    onClick={() => toggleFaq("faq4")}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">Q</span>
                      </div>
                      <span className="font-medium text-gray-800 text-left text-sm">スマホのアプリと毎回接続する必要がありますか？</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${expandedFaq.faq4 ? 'rotate-180' : ''}`} />
                </button>
                  {expandedFaq.faq4 && (
                    <div className="px-5 py-4 bg-blue-50 border-t border-blue-100">
                      <p className="text-gray-600 text-sm">回答内容準備中...</p>
                    </div>
                  )}
                </div>

                {/* FAQ 5 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                  <button
                    onClick={() => toggleFaq("faq5")}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">Q</span>
                      </div>
                      <span className="font-medium text-gray-800 text-left text-sm">アプリ中のTest（テスト）とは何ですか？</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${expandedFaq.faq5 ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFaq.faq5 && (
                    <div className="px-5 py-4 bg-blue-50 border-t border-blue-100">
                      <p className="text-gray-600 text-sm">回答内容準備中...</p>
                  </div>
                )}
              </div>

                {/* FAQ 6 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <button
                    onClick={() => toggleFaq("faq6")}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">Q</span>
                      </div>
                      <span className="font-medium text-gray-800 text-left text-sm">MIDI INの使い方について教えてください。</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${expandedFaq.faq6 ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFaq.faq6 && (
                    <div className="px-5 py-4 bg-blue-50 border-t border-blue-100">
                      <p className="text-gray-600 text-sm">回答内容準備中...</p>
                    </div>
                  )}
                </div>

                {/* FAQ 7 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                  <button
                    onClick={() => toggleFaq("faq7")}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">Q</span>
                      </div>
                      <span className="font-medium text-gray-800 text-left text-sm">USBまたはBluetoothを介してAmpero ControlにMIDIメッセージを送信できますか?</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${expandedFaq.faq7 ? 'rotate-180' : ''}`} />
                </button>
                  {expandedFaq.faq7 && (
                    <div className="px-5 py-4 bg-blue-50 border-t border-blue-100">
                      <p className="text-gray-600 text-sm">回答内容準備中...</p>
                    </div>
                  )}
                </div>

                {/* FAQ 8 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                  <button
                    onClick={() => toggleFaq("faq8")}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">Q</span>
                      </div>
                      <span className="font-medium text-gray-800 text-left text-sm">Bluetooth MIDIをモバイルデバイスで使用する場合</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${expandedFaq.faq8 ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFaq.faq8 && (
                    <div className="px-5 py-4 bg-blue-50 border-t border-blue-100">
                      <p className="text-gray-600 text-sm">回答内容準備中...</p>
                  </div>
                )}
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
                <div className="w-24 h-1 rounded-full hotone-bar" />
              </div>
            </div>
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
                {/* Left Column - 入出力 */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-3">
                    入出力
                  </h3>
                  <div className="space-y-4">
                    <div className="flex flex-col border-b border-gray-200 pb-3">
                      <span className="text-gray-600 text-sm mb-1">入力ジャック</span>
                      <span className="text-gray-900 font-medium">1×6.35mm (1/4") TRS Jack</span>
                    </div>
                    <div className="flex flex-col border-b border-gray-200 pb-3">
                      <span className="text-gray-600 text-sm mb-1">出力ジャック</span>
                      <span className="text-gray-900 font-medium">2×6.35mm (1/4") TRS Jack</span>
                    </div>
                    <div className="flex flex-col border-b border-gray-200 pb-3">
                      <span className="text-gray-600 text-sm mb-1">MIDI/EXPジャック</span>
                      <span className="text-gray-900 font-medium">2×3.5mm (1/8") TRS Jack</span>
                    </div>
                    <div className="flex flex-col border-b border-gray-200 pb-3">
                      <span className="text-gray-600 text-sm mb-1">USB ジャック</span>
                      <span className="text-gray-900 font-medium">USB 2.0 Type-C</span>
                    </div>
                    <div className="flex flex-col border-b border-gray-200 pb-3">
                      <span className="text-gray-600 text-sm mb-1">入力インピーダンス</span>
                      <span className="text-gray-900 font-medium">1 Meg Ohm</span>
                    </div>
                    <div className="flex flex-col border-b border-gray-200 pb-3">
                      <span className="text-gray-600 text-sm mb-1">出力インピーダンス</span>
                      <span className="text-gray-900 font-medium">1K Ohm</span>
                    </div>
                    <div className="flex flex-col pb-3">
                      <span className="text-gray-600 text-sm mb-1">バイパス</span>
                      <span className="text-gray-900 font-medium">アナログ ドライ スルー + バッファー</span>
                    </div>
                  </div>
                </div>

                {/* Right Column - デジタル・セクション and その他 */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-3">
                    デジタル・セクション
                  </h3>
                  <div className="space-y-4 mb-12">
                    <div className="flex flex-col border-b border-gray-200 pb-3">
                      <span className="text-gray-600 text-sm mb-1">A/D&D/A変換</span>
                      <span className="text-gray-900 font-medium">32-bit, 192kHz</span>
                    </div>
                    <div className="flex flex-col border-b border-gray-200 pb-3">
                      <span className="text-gray-600 text-sm mb-1">DSP</span>
                      <span className="text-gray-900 font-medium">32-bit 浮遊演算方式</span>
                    </div>
                    <div className="flex flex-col border-b border-gray-200 pb-3">
                      <span className="text-gray-600 text-sm mb-1">SNR</span>
                      <span className="text-gray-900 font-medium">115dB</span>
                    </div>
                    <div className="flex flex-col border-b border-gray-200 pb-3">
                      <span className="text-gray-600 text-sm mb-1">周波数特性</span>
                      <span className="text-gray-900 font-medium">±0.1dB, 20Hz~20kHz</span>
                    </div>
                    <div className="flex flex-col pb-3">
                      <span className="text-gray-600 text-sm mb-1">最大入力レベル</span>
                      <span className="text-gray-900 font-medium">+13dBu</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-3">
                    その他
                  </h3>
                  <div className="space-y-4">
                    <div className="flex flex-col border-b border-gray-200 pb-3">
                      <span className="text-gray-600 text-sm mb-1">電源</span>
                      <span className="text-gray-900 font-medium">9V DC 1A センターマイナス</span>
                    </div>
                    <div className="flex flex-col border-b border-gray-200 pb-3">
                      <span className="text-gray-600 text-sm mb-1">サイズ</span>
                      <span className="text-gray-900 font-medium">125.5mm（W）x 84mm（D）x 62.5mm（H）</span>
                    </div>
                    <div className="flex flex-col pb-3">
                      <span className="text-gray-600 text-sm mb-1">重量</span>
                      <span className="text-gray-900 font-medium">485g</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Warranty Section - REMOVED */}
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
