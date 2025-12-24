"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Download, ChevronDown, ChevronUp } from 'lucide-react'
import { BlogSlider } from "@/components/blog-slider"
import { downloadManual } from "@/lib/manual-download"

type Section = "concept" | "demo" | "control" | "bundle" | "faq" | "manual" | "specs"

const navigationItems = [
  { id: "concept" as Section, label: "コンセプト" },
  { id: "demo" as Section, label: "デモムービー" },
  { id: "control" as Section, label: "コントロール" },
  { id: "bundle" as Section, label: "バンドルソフト" },
  { id: "faq" as Section, label: "よくある質問" },
  { id: "manual" as "manual", label: "取扱説明書", isDownload: true },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function NeroPage() {
  const [activeSection, setActiveSection] = useState<Section>("concept")
  const [headerHeight, setHeaderHeight] = useState(72)
  const [expandedFaq, setExpandedFaq] = useState<{ [key: string]: boolean }>({})
  const [expandedSoftware, setExpandedSoftware] = useState<{ [key: string]: boolean }>({})

  const toggleFaq = (key: string) => {
    setExpandedFaq((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const toggleSoftware = (key: string) => {
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
    downloadManual("audient", "nero")
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
          src="/images/brands/audient/nero/hero.jpg"
          alt="NERO"
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
                <p className="text-2xl font-bold text-gray-900">NERO</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">デスクトップ・モニター・コントローラー</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-gray-900">
                  ¥113,300
                </p>
                <p className="text-xs text-gray-500">前後（税込）</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">5060374260450</p>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-2">デスクトップ・モニター・コントローラー</h2>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">audient nero</h3>
              <h4 className="text-xl font-bold text-gray-600 mb-6">The Art of Control</h4>
              <div className="flex justify-center mt-8">
                <div className="w-24 h-1 rounded-full bg-gradient-to-r from-purple-600 to-orange-500" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Image and Related Info */}
              <div className="space-y-6">
                {/* Product Image */}
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/brands/audient/nero/intro_01.jpg"
                    alt="AUDIENT NERO"
                    width={800}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Related Information */}
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <h3 className="font-bold text-gray-900 text-lg mb-4">関連情報</h3>
                  <div className="space-y-3">
                    <a href="#" className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200 block">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm6 6H7v2h6v-2z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-900">ARC フリー・バンドル・ソフトウェア＆プラグイン</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column - Product Description and Features */}
              <div className="space-y-6">
                <div>
                  <div className="prose max-w-none mb-6">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      大型アナログコンソールをメイン卓として構築されたレコーディングスタジオでは、その卓のコントロール部にスタジオモニタリング機能の中枢が置かれていました。オーディオインターフェースをI/OにしたDAWスタイルのスタジオでは、そのモニタリングコントロール機能はアクセスが限定されがちです。そこでAudientは、20年以上に及ぶ大型アナログコンソールデザインのノウハウを生かし、スタジオモニタリングのソルーションとしてNERO MONITOR CONTROLLERを誕生させました。その仕様はモニタリングに必要な充実したI/O、コンソールスタイルのモニターコントロール、信号レベルのマッチングが凝縮されています。もちろん入力された音源を忠実に再現できます。
                    </p>
                  </div>

                  {/* Feature List */}
                  <div className="space-y-2 mb-4">
                    {[
                      "4系統ステレオアナログソース",
                      "2系統ラインレベル入力",
                      "1系統Cue ミックス専用入力",
                      "1系統Aux入力 (RCA 又は Mini Jack)",
                      "オプティカル＆同軸S/PDIF入力",
                      "3系統ステレオスピーカー出力",
                      "1系統指定可能なサブ出力",
                      "4系統ヘッドフォン出力（ルーティング可）",
                      "スマートタッチポイント（カスタマイズ可）",
                      "トークバック入力",
                      "内蔵マイクロフォン",
                      "外部トークバック入力",
                      "Dim、Cut、モノ＆極性モニターコントロール",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
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

          {/* Section 1: Top Section - Video and Three Parts */}
          <div className="mb-20 space-y-20">
            {/* Video Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left: Video */}
              <div className="flex justify-center">
                <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg w-full max-w-2xl">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/crSlh6c0H3A"
                    title="Audient Nero - Desktop Monitor Controller Feature Overview"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* Right: Three Text Sections */}
              <div className="space-y-12">
                {/* Part 1: コンソール・スタイルのモニター・コントロール */}
                <div>
                  <h4 className="text-2xl font-bold text-white mb-4">コンソール・スタイルのモニター・コントロール</h4>
                  <p className="text-gray-400 leading-relaxed">
                    Neroは、20年以上に及ぶAudientの大型レコーディング・コンソールや、デスクトップ・モニター・コントローラー・デザインの経験を生かして制作されました。David Dearden（Audientアナログ・コンソール・デザイナー）がデザインしたアナログ回路を採用し、オーディオ信号の忠実再生も実現しています。
                  </p>
                </div>

                {/* Part 2: 高精度ステレオ・マッチ・ボリューム・コントロール */}
                <div>
                  <h4 className="text-2xl font-bold text-white mb-4">高精度ステレオ・マッチ・ボリューム・コントロール</h4>
                  <p className="text-gray-400 leading-relaxed">
                    NEROは独自のステレオ・マッチング・アッテネーション・テクノロジーにより、高精度にLR信号のボリュームを揃えます。他のモニター・コントローラーとは異なり、この機能がモニターの左右ボリューム差（L/R差）を防ぎ、正確なステレオイメージとミックス精度を実現します。
                  </p>
                </div>

                {/* Part 3: アサイン可能なサブウーハー */}
                <div>
                  <h4 className="text-2xl font-bold text-white mb-4">アサイン可能なサブウーハー</h4>
                  <p className="text-gray-400 leading-relaxed">
                    サブウーハーはどのモニタースピーカーセットとも自在に接続が可能です。サブオン/オフもモニターセッティングのプリセットを変更することなく実行できます。
                  </p>
                </div>
              </div>
            </div>

            {/* Images Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: concept_01 */}
              <div className="flex justify-center">
                <Image
                  src="/images/brands/audient/nero/concept_01.jpg"
                  alt="NERO Monitor Controller"
                  width={600}
                  height={600}
                  className="w-full h-auto rounded-xl"
                />
              </div>

              {/* Right: concept_02 */}
              <div className="flex justify-center">
                <Image
                  src="/images/brands/audient/nero/concept_02.svg"
                  alt="NERO Features"
                  width={600}
                  height={600}
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </div>
          </div>


          {/* Section 5: 入力パネル */}
          <div className="mb-20 border-t border-gray-700 pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Image */}
              <div className="flex justify-center">
                <Image
                  src="/images/brands/audient/nero/concept_03.png"
                  alt="入力パネル"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-xl"
                />
              </div>
              {/* Right: Text Content */}
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">入力パネル</h4>
                <p className="text-gray-400 leading-relaxed mb-6">
                  スタジオのセットアップが大型になると、モニターソース選択やCue、スピーカーやヘッドフォンのフィード等のコントロールが難しくなります。このNEROがそれらの機能を集約し、簡単に操作できるように解決してくれます。
                </p>
                
                {/* Feature List */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-white font-medium mb-1">2 x ステレオ入力</p>
                      <p className="text-gray-400 text-sm">オーディオ・インターフェースを接続します</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-white font-medium mb-1">専用Cueミックス入力</p>
                      <p className="text-gray-400 text-sm">プレーヤーに、快適でクリアーなモニターソースを提供できます</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-white font-medium mb-1">ミニジャック入力</p>
                      <p className="text-gray-400 text-sm">外部オーディオソース入力</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-white font-medium mb-1">RCA入力</p>
                      <p className="text-gray-400 text-sm">メディアプレーヤーからの入力</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 6: 入力パネル - Image 04 */}
          <div className="mb-20 border-t border-gray-700 pt-20">
            <div className="flex justify-center">
              <Image
                src="/images/brands/audient/nero/concept_04.png"
                alt="入力パネル詳細"
                width={800}
                height={400}
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>

          {/* Section 7: 出力パネル */}
          <div className="mb-20 border-t border-gray-700 pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Image */}
              <div className="flex justify-center">
                <Image
                  src="/images/brands/audient/nero/concept_05.png"
                  alt="出力パネル"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-xl"
                />
              </div>
              {/* Right: Text Content */}
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">出力パネル</h4>
                <p className="text-gray-400 leading-relaxed mb-6">
                  ミックスのモニタリングが、独立したボリューム設定で３セットのスピーカーまで可能です。サブウーハーはそれらのどのモニターパスにも接続できます。さらに、本機のヘッドフォンモニター出力には、1 xモニターグレードと3 xフォールドバックグレードの4系統があり、それぞれにヘッドフォンアンプを備えています。このプロ仕様の装備がクリスタルクリアなヘッドフォンモニタリングをセッション時にも可能にします。
                </p>
                
                {/* Feature List */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-white font-medium mb-1">メインステレオ出力</p>
                      <p className="text-gray-400 text-sm">メインモニターを接続します</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-white font-medium mb-1">2 x Alt スピーカー出力</p>
                      <p className="text-gray-400 text-sm">他のリファレンススピーカーを接続します</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-white font-medium mb-1">サブウーハー出力</p>
                      <p className="text-gray-400 text-sm">サブウーハーの接続が指定できます</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-white font-medium mb-1">4 x ヘッドフォン出力</p>
                      <p className="text-gray-400 text-sm">トークバック：プレーヤーと録音時のコミュニケーションが取れます</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 8: 出力パネル - Image 06 */}
          <div className="mb-20 border-t border-gray-700 pt-20">
            <div className="flex justify-center">
              <Image
                src="/images/brands/audient/nero/concept_06.png"
                alt="出力パネル詳細"
                width={1200}
                height={600}
                className="w-full h-auto rounded-xl"
              />
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
                  src="https://www.youtube.com/embed/crSlh6c0H3A"
                  title="AUDIENT NERO Demo 1"
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
                  src="https://www.youtube.com/embed/8L8-VDJtvc0"
                  title="AUDIENT NERO Demo 2"
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
                  src="https://www.youtube.com/embed/xuaOtjw2Bek"
                  title="AUDIENT NERO Demo 3"
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
                  src="https://www.youtube.com/embed/t9VLrfIwGt0"
                  title="AUDIENT NERO Demo 4"
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

      {/* Control Section - コントロール */}
      <section id="control" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">コントロール</h2>
              <h3 className="text-2xl font-bold text-gray-700 mb-6">モニターリングを集中コントロール</h3>
              <div className="flex justify-center mt-8">
                <div className="w-24 h-1 rounded-full bg-gradient-to-r from-green-500 to-blue-500" />
              </div>
            </div>

            {/* Main Image */}
            <div className="mb-12 flex justify-center">
              <Image
                src="/images/brands/audient/nero/control_01.png"
                alt="NERO Control"
                width={1200}
                height={600}
                className="w-full h-auto rounded-xl"
              />
            </div>

            {/* Smart Touchpoint Section */}
            <div className="mb-16 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">スマート・タッチポイント</h3>
              <p className="text-gray-700 leading-relaxed mb-6 max-w-3xl mx-auto">
                スマートタッチポイント機能で、あなたのワークフローがシンプルにカスタマイズできます。モニタリングの組み合わせやルーティングは、スマートタッチポイントを長押ししてセットアップモードに入り、ルーティング先を選択した後、再度押すだけで保存できます。
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* TALKBACK */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-3">TALKBACK</h4>
                <p className="text-gray-700 leading-relaxed">
                  トークバックマイクの信号をどのヘッドフォンモニターにもアサインでき、プレーヤーとのコミュニケーションが簡単に行えます。
                </p>
              </div>

              {/* SUB */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-3">SUB</h4>
                <p className="text-gray-700 leading-relaxed">
                  サブウーハーはどのステレオモニター出力（またはすべての）にもアサインでき、接続を変更することなくサブのオン/オフも可能です。
                </p>
              </div>

              {/* ALT 1 */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-3">ALT 1</h4>
                <p className="text-gray-700 leading-relaxed">
                  いずれか2つのスピーカーボタンを長押してセッティングの保存が完了できます。
                </p>
              </div>

              {/* MONO */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-3">MONO</h4>
                <p className="text-gray-700 leading-relaxed">
                  どの出力も簡単にモノリファレンス信号に変更できます。
                </p>
              </div>

              {/* SRC */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-3">SRC</h4>
                <p className="text-gray-700 leading-relaxed">
                  ヘッドフォンミックス信号は、どの入力信号にもSRCボタンで簡単にアサインできます。
                </p>
              </div>
            </div>

            {/* Control 02 Image */}
            <div className="mt-12 flex justify-center">
              <Image
                src="/images/brands/audient/nero/control_02.png"
                alt="NERO Control Details"
                width={1200}
                height={600}
                className="w-full h-auto rounded-xl"
              />
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
                      <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">?</span>
                      <span className="font-medium text-gray-900 text-left">NEROのボリュームコントロールは、デジタルですか？　アナログですか？</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq1 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq1 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4">
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          NEROは独自のステレオマッチング アッテネーションテクノロジーにより、高精度にLR信号のボリュームを揃えます。他のモニターコントローラーとは異なり、この機能がモニターのL/Rボリューム差を防ぎ、低いモニターレベルでも正確なステレオイメージとミックス精度を実現します。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          NEROの信号経路は全てアナログです。これは、いたずらに信号をAD/DA変換し、ノイズや歪みを増やさないためです。また、アナログ・ポテンショメーターを使用していません。それは、ぱらつきによるL/Rのレベル差が発生するため、ボリュームのバランスに影響を与えるからです。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          我々は、マイクロプロセッサーで正確な抵抗値を設定するデジタルコントロールによるボリューム制御を採用し、厳格なステレオバランスを実現しました。この方式により、L/Rチャンネルの厳格なアッテネーションを提供できます。
                        </p>
                      </div>
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
                      <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">?</span>
                      <span className="font-medium text-gray-900 text-left">サブウーハー出力はどうやってメイン出力に接続すればよい？</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq2 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq2 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4">
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          サブウーハーとモニタースピーカーのセットをリンクできます。そのモニタースピーカーセットを選択すると、サブウーハー出力も接続されます。この設定は、アサインしたいスピーカーボタンを長押しし、Sub(サブウーハー)ボタンを押せば完了です。この状態でもSub(サブウーハー)のみのオン/オフも可能です。スピーカーセットにサブウーハーのリンクがアサインされていれば、ボタン一つでその設定がリコールできます。
                        </p>
                        <div className="flex justify-center">
                          <Image
                            src="/images/brands/audient/nero/Q&A_02.gif"
                            alt="サブウーハー出力の接続方法"
                            width={800}
                            height={500}
                            className="rounded-lg w-full h-auto"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* FAQ Item 3 */}
                <div className="bg-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq3")}
                    className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-400 transition-colors rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">?</span>
                      <span className="font-medium text-gray-900 text-left">ヘッドフォン出力にトークバックをアサインするには</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq3 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq3 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4">
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          トークバックは、演奏するプレーヤーとダイレクトなコミュニケーションを可能にし、彼らのベストなパフォーマンスを引き出してくれます。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          トークバックをヘッドフォン出力にアサインするには、ヘッドフォン出力のSRCボタンを押します。次にトークバックボタンを押すと、トークバックボタンが点灯します。再度SRCボタンを押すと、この設定が保存されます。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          トークバックのオン/オフは、トークバックボタンで行います。素早く押すとラッチ機能でオン/オフします。長押しではモーメンタリー機能になり、押しながら短い時間話す場合に使います。
                        </p>
                        <div className="flex justify-center">
                          <Image
                            src="/images/brands/audient/nero/Q&A_04.gif"
                            alt="ヘッドフォン出力にトークバックをアサインする方法"
                            width={800}
                            height={500}
                            className="rounded-lg w-full h-auto"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* FAQ Item 4 */}
                <div className="bg-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq4")}
                    className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-400 transition-colors rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">?</span>
                      <span className="font-medium text-gray-900 text-left">ルーティング設定は保存できるのでしょうか？</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq4 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq4 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4">
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          ルーティング設定を保存できます。スタジオへ戻った時には、いつでもトラッキングやミックス作業にそのまま戻ることができます。ルーティング設定の保存は、MainとAlt 1ボタンを同時に長押しすれば完了します。
                        </p>
                        <div className="flex justify-center">
                          <Image
                            src="/images/brands/audient/nero/Q&A_01.gif"
                            alt="ルーティング設定の保存方法"
                            width={800}
                            height={500}
                            className="rounded-lg w-full h-auto"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* FAQ Item 5 */}
                <div className="bg-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq5")}
                    className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-400 transition-colors rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">?</span>
                      <span className="font-medium text-gray-900 text-left">モノ出力チェックの方法</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq5 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq5 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4">
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          モノラルのモニタリング用にスピーカーを接続していれば、モノ出力チェックが瞬時に行えます。 その方法は非常に簡単で、モノラルスピーカーが接続されているスピーカーボタンを長押しした後、Monoボタンを押すだけです。 これで、このスピーカー出力を選択した際には、自動的にモノ出力モードに入ります。
                        </p>
                        <div className="flex justify-center">
                          <Image
                            src="/images/brands/audient/nero/Q&A_03.gif"
                            alt="モノ出力チェックの方法"
                            width={800}
                            height={500}
                            className="rounded-lg w-full h-auto"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* FAQ Item 6 */}
                <div className="bg-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq6")}
                    className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-400 transition-colors rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">?</span>
                      <span className="font-medium text-gray-900 text-left">NEROはドライバーやファームウェアを必要としますか？</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq6 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq6 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4">
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          NEROは、スタンドアローン機としてオペレートします。ソフトのドライバーやファームウェアのインストールは必要ありません。お持ちのソース・モニターやヘッドフォンを接続すれるだけで、簡単にお使いいただけます。
                        </p>
                      </div>
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
            <div className="bg-gray-50 rounded-xl p-8">
              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* バランス・ライン入力 */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">バランス・ライン入力</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>公称入力レベル：+4dBu</p>
                      <p>最大入力レベル：+18dBu</p>
                      <p>CMRR: &gt; 50dB</p>
                    </div>
                  </div>

                  {/* アンバランスAUX入力 */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">アンバランスAUX入力</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>公称入力レベル：-10dBV</p>
                      <p>最大入力レベル（トリム最小）：+27dBu</p>
                      <p>トリム幅：±12dB</p>
                    </div>
                  </div>

                  {/* デジタル入力 */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">デジタル入力</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>入力：TOSLINK、Coaxial</p>
                      <p>フォーマット：S/PDIF</p>
                      <p>サンプルレート：44.1kHz - 192kHz</p>
                      <p>ビット：最大24bit</p>
                    </div>
                  </div>

                  {/* トークバック入力 */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">トークバック入力</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>最大入力レベル：2dBu</p>
                      <p>ゲイン：4 - 44dB</p>
                      <p>ファンタム電源：+48V</p>
                    </div>
                  </div>

                  {/* ヘッドホン出力 */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">ヘッドホン出力</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>最小ロード：12.8Ohms</p>
                      <p>THD+N @ 0dBu (output level)：0.009% 30Ohm</p>
                      <p>0.009% 60Ohm</p>
                      <p>0.008% 600Ohm</p>
                      <p>出力ピーク：90mW 30Ohm</p>
                      <p>56mW 60Ohm</p>
                      <p>7.35mW 600Ohm</p>
                      <p>クロストーク: &gt; 62dB</p>
                      <p>最小ボリューム時のアッテネーション：&gt; 96dB</p>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* DAC */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">DAC</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>THD+N：&lt; 0.0017%</p>
                      <p>ダイナミックレンジ：113dB</p>
                      <p>周波数特性：20Hz - 22kHz ±0.5dB</p>
                    </div>
                  </div>

                  {/* 電源、サイズ・重量 */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">電源、サイズ・重量</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>12VDC / 2A（センタープラス）</p>
                      <p>寸法(mm)： 255W x 155D x 75H</p>
                      <p>重量：2kg</p>
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

