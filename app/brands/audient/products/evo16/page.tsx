"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Download, ChevronDown, ChevronUp } from 'lucide-react'
import { BlogSlider } from "@/components/blog-slider"
import { downloadManual } from "@/lib/manual-download"

type Section = "concept" | "demo" | "function" | "control" | "software" | "bundle" | "manual" | "specs"

const navigationItems = [
  { id: "concept" as Section, label: "コンセプト" },
  { id: "demo" as Section, label: "デモムービー" },
  { id: "function" as Section, label: "主な性能" },
  { id: "control" as Section, label: "コントロール" },
  { id: "software" as Section, label: "ソフトウェア" },
  { id: "bundle" as Section, label: "バンドルソフト" },
  { id: "manual" as "manual", label: "取扱説明書", isDownload: true },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function Evo16Page() {
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
    downloadManual("audient", "evo16")
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
          src="/images/brands/audient/evo 16/hero.jpg"
          alt="evo 16"
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
                <p className="text-2xl font-bold text-gray-900">evo 16</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">オーディオ・インターフェイス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-gray-900">
                  ¥89,650
                </p>
                <p className="text-xs text-gray-500">前後（税込）</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">5060374260443</p>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-2">24 in / 24 out</h2>
              <h3 className="text-2xl font-bold text-gray-700 mb-6">オーディオ・インターフェイス</h3>
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
                    src="https://www.youtube.com/embed/t6zHNa3GJjs"
                    title="AUDIENT evo 16 - The Features"
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
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-900">audient製品 OS対応状況のお知らせ</span>
                    </a>
                    <a href="#" className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200 block">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-900">evoシリーズ 特設サイト</span>
                    </a>
                    <a href="#" className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200 block">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                      </svg>
                      <span className="text-gray-900">役に立つオーディオ・インターフェイス講座 ~ Part.1~ 「evoって?」</span>
                    </a>
                    <a href="#" className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200 block">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                      </svg>
                      <span className="text-gray-900">役に立つオーディオ・インターフェイス講座 ~ Part.2~ 「iPhoneと evo Starter Bundle で音の良い配信動画を作ってみよう!」</span>
                    </a>
                    <a href="#" className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200 block">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      <span className="text-gray-900">AUDIENT: サポート窓口</span>
                    </a>
                    <a href="#" className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200 block">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                      </svg>
                      <span className="text-gray-900">AUDIENT:ユーザー登録</span>
                    </a>
                    <a href="#" className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200 block">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-900">専用ミキサー・ソフトウェア & 最新ファームウェア</span>
                    </a>
                    <a href="#" className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200 block">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                      </svg>
                      <span className="text-gray-900">ARC フリー・バンドル・ソフトウェア&プラグイン</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column - Product Description and Features */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">これがマルチチャンネルの新定番。<br />レコーディングをもっと簡単に</h3>

                  <div className="prose max-w-none mb-6">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      様々なアワードを受賞しているEVOプリアンプと高品位コンバーターがどんな音源でも高音質に再現します。最適レコーディングレベルを自動で調整するスマートゲイン機能、画期的なモーションUI、大規模な同時録音も可能にする豊富なI/Oなど、を搭載。EVO 16はよりスムーズなレコーディングのために細部までこだわり抜いた、マルチチャンネル・オーディオインターフェイスの新定番です。
                    </p>
                    
                    {/* Image after description */}
                    <div className="my-6">
                      <Image
                        src="/images/brands/audient/evo 16/intro_01.svg"
                        alt="EVO 16"
                        width={600}
                        height={400}
                        className="w-full h-auto rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Feature List */}
                  <div className="space-y-2 mb-4">
                    {[
                      "8 x EVOマイクプリアンプ",
                      "2 x JFET 楽器入力",
                      "2 x 独立ヘッドフォンアンプ",
                      "8 x ライン出力",
                      "2 x デジタルI/O",
                      "マルチチャンネル対応スマートゲイン機能",
                      "EVO Motion UI コントロール",
                      "設定可能なファンクションボタン",
                      "超ローレイテンシーを実現する独自ソフトウェア",
                      "モニターコントロール",
                      "ループバック機能",
                      "ワードクロック出力",
                      "スタンドアロンモード",
                      "USB2.0（USB-C接続）",
                      "24bit / 96kHz",
                      "Mac M1 & M1 Pro & M1 Max 対応",
                      "mac OS 13.X（Ventura）、windows 11に対応",
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
                  src="/images/brands/audient/evo 16/concept_01.jpg"
                  alt="オーディオ・インターフェイスのパーフェクト・パートナー"
                  width={600}
                  height={600}
                  className="w-full h-auto rounded-xl"
                />
              </div>
              
              {/* Right: Text Content */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2">EVOマイクプリアンプ</h4>
                  <h5 className="text-xl font-bold text-white mb-4">スタジオクオリティのレコーディングを手軽に</h5>
                  <p className="text-gray-400 leading-relaxed">
                    搭載された8つのEVOマイクプリアンプがあなたのオーディオパフォーマンスの向上をお約束します。コンソール大国のUKで、25年以上に及ぶ確かな技術力に裏打ちされた品質を誇るアナログマイクプリアンプは、この上なくクリーンで正確な音像を捉え、原音に忠実なオーディオをお届けできます。
                  </p>
                </div>
              </div>
            </div>
            
            {/* Bottom Image */}
            <div className="mt-12 flex justify-center">
              <Image
                src="/images/brands/audient/evo 16/concept_02.svg"
                alt="EVO マイクプリアンプ"
                width={800}
                height={500}
                className="w-full max-w-4xl h-auto rounded-xl"
              />
            </div>
          </div>

          {/* Section 2: スタジオ・クオリティーのレコーディングを EVOマイクプリアンプ - Left Text, Right Image */}
          <div className="mb-20 border-t border-gray-700 pt-20">
           
            
            {/* Smart Analog Mic Preamp Section */}
            <div className="mt-12">
              <h4 className="text-2xl font-bold text-white mb-4 text-center">アナログマイクプリをスマートに使いこなす</h4>
              <p className="text-gray-400 leading-relaxed max-w-4xl mx-auto mb-8 text-center">
                EVOのプリアンプはアナログ設計の利点だけではなく、デジタルコントロールの精緻に制御された正確性を兼ね備え、ほんのわずかな狂いもないピンポイントな正確さでゲインも設定します。
              </p>
              
              {/* Three Images - Horizontal Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <Image
                      src="/images/brands/audient/evo 16/concept_03.gif"
                      alt="Outputs Display"
                      width={400}
                      height={300}
                      className="w-full h-auto object-contain"
                      style={{ backgroundColor: '#1a1a1a', maxHeight: '300px' }}
                    />
                  </div>
                  <p className="text-white text-sm">ディスプレイ上でリアルタイムに表示</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <Image
                      src="/images/brands/audient/evo 16/concept_04.gif"
                      alt="Input Gain Control"
                      width={400}
                      height={300}
                      className="w-full h-auto object-contain"
                      style={{ backgroundColor: '#1a1a1a', maxHeight: '300px' }}
                    />
                  </div>
                  <p className="text-white text-sm">ステレオペアのレベルを完全同期</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <Image
                      src="/images/brands/audient/evo 16/concept_05.gif"
                      alt="Mixing Console Software"
                      width={400}
                      height={300}
                      className="w-full h-auto object-contain"
                      style={{ backgroundColor: '#1a1a1a', maxHeight: '300px' }}
                    />
                  </div>
                  <p className="text-white text-sm">ソフトウェアで簡単コントロール</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: 高品位コンバーターによる高音質オーディオ */}
          <div className="mb-20 border-t border-gray-700 pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <Image
                  src="/images/brands/audient/evo 16/concept_06.png"
                  alt="最先端のコンバーターテクノロジー"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-xl"
                />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">最先端のコンバーターテクノロジー</h4>
                <h5 className="text-xl font-bold text-white mb-6">これまでのクリアを凌駕するクリアなサウンド</h5>
                <p className="text-gray-400 leading-relaxed mb-4">
                  121dBのダイナミックレンジ！そのクリアな音は圧倒的！！
                </p>
                <p className="text-gray-400 leading-relaxed">
                  高性能コンバーターテクノロジーが、微細な息遣いまで正確にお届けします。録音やミックス作業にも自信を持ってクリエイティブな判断をさせてくれます。
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
                    src="https://www.youtube.com/embed/DUd0NZQRzoo"
                    title="EVO 16 Motion UI"
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
                      src="/images/brands/audient/evo 16/concept_07.png"
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
                    モーションUIは、オーディオインターフェイスとインタラクティブなコラボレーションを実現した次世代のユーザーインターフェイスです。高解像度で見やすいフルカラーLCDスクリーンが、状況に応じて必要な情報をインテリジェントに表示してくれます。クリエイターは自分の作業に没頭できます。詳しくは動画をご覧ください。
                  </p>
                </div>

                {/* LCDスクリーン */}
                <div className="border-t border-gray-700 pt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Image
                      src="/images/brands/audient/evo 16/concept_08.gif"
                      alt="LCDスクリーン"
                      width={100}
                      height={100}
                      className="w-24 h-24 object-contain flex-shrink-0"
                      style={{ backgroundColor: '#1a1a1a' }}
                    />
                    <div className="flex-1">
                      <h5 className="text-lg font-bold text-white mb-2">LCDスクリーン</h5>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        全ての設定や調整、ボタン操作は見やすいカラーディスプレイ上にリアルタイムで表示されます。240x240サイズのバックライト付LCDスクリーンがハードウェアの機能もスマートにナビゲートし、直感的に操作できます。コンピューターの画面を確認すること無く、これ１台でコントロールが完結します。
                      </p>
                    </div>
                  </div>
                </div>

                {/* チャンネルステータス */}
                <div className="border-t border-gray-700 pt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Image
                      src="/images/brands/audient/evo 16/concept_09.gif"
                      alt="チャンネルステータス"
                      width={100}
                      height={100}
                      className="w-24 h-24 object-contain flex-shrink-0"
                      style={{ backgroundColor: '#1a1a1a' }}
                    />
                    <div className="flex-1">
                      <h5 className="text-lg font-bold text-white mb-2">チャンネルステータス</h5>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        入力または出力ボタンを押せば、チャンネル名、レベル、アクティブな機能といった情報全てが表示されます。
                      </p>
                    </div>
                  </div>
                </div>

                {/* メータリング */}
                <div className="border-t border-gray-700 pt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Image
                      src="/images/brands/audient/evo 16/concept_10.gif"
                      alt="メータリング"
                      width={100}
                      height={100}
                      className="w-24 h-24 object-contain flex-shrink-0"
                      style={{ backgroundColor: '#1a1a1a' }}
                    />
                    <div className="flex-1">
                      <h5 className="text-lg font-bold text-white mb-2">メータリング</h5>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        出入力、全てのチャンネルをフルカラー表示でき、レベルが一目で確認できるため、レベルチェックの精度が向上します。
                      </p>
                    </div>
                  </div>
                </div>

                {/* ノブ１つでコントロール */}
                <div className="border-t border-gray-700 pt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Image
                      src="/images/brands/audient/evo 16/concept_11.gif"
                      alt="ノブ１つでコントロール"
                      width={100}
                      height={100}
                      className="w-24 h-24 object-contain flex-shrink-0"
                      style={{ backgroundColor: '#1a1a1a' }}
                    />
                    <div className="flex-1">
                      <h5 className="text-lg font-bold text-white mb-2">ノブ１つでコントロール</h5>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        レコーディングの作業効率を高めるワンノブコントロールが、設定したいハードウェアの機能をすぐに呼び出します。シンプルな操作性で幅広いセッティングを１つのノブで実行できます。
                      </p>
                    </div>
                  </div>
                </div>

                {/* ファンクションボタン */}
                <div className="border-t border-gray-700 pt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Image
                      src="/images/brands/audient/evo 16/concept_12.gif"
                      alt="ファンクションボタン"
                      width={100}
                      height={100}
                      className="w-24 h-24 object-contain flex-shrink-0"
                      style={{ backgroundColor: '#1a1a1a' }}
                    />
                    <div className="flex-1">
                      <h5 className="text-lg font-bold text-white mb-2">ファンクションボタン</h5>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        カスタマイズできるFボタンで、モニターに必要なコントロールを割り当てることができます。Fボタンを使って、自分好みのワークフローを構築しましょう。
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
                <h4 className="text-2xl font-bold text-white mb-4">スマートゲイン機能</h4>
                <h5 className="text-xl font-bold text-white mb-6">ボタン一つで完璧なゲイン調整</h5>
                <p className="text-gray-400 leading-relaxed mb-8">
                  スマートゲイン機能を使えば、ドラムや複数のプレイヤーの演奏を簡単に最適音量レベルで録音できます。ボタン一つで８チャンネルすべてのゲインを一度に自動コントロール。独自に開発された超高速アルゴリズムが瞬時に音量のピークを割り出し、ゲインを自動分析・調整し、音割れや音痩せの無い、最も理想的な音量にセットします。ゲイン設定は約20秒以内で完了！作業効率を落とすこともミュージシャンを待たせることももうありません。詳しくは動画をご覧ください。
                </p>


                <p className="text-gray-400 leading-relaxed mb-6">
                  ムダな時間は節約してクリエイティブなレコーディング作業に充てましょう。
                </p>

                {/* Four Features with Icons */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white text-sm">ゲインを正しく＆早く設定できます。</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white text-sm">オーバーロードや歪みを避けられます。</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white text-sm">レコーディングを順調に進められます。</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white text-sm">一人でレコーディング作業が進められます。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Section: EVO16はあなたのパーソナルアシスタント */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-t border-gray-700 pt-16 mb-16">
              {/* Left: Image */}
              <div className="flex justify-center">
                <Image
                  src="/images/brands/audient/evo 16/concept_13.jpg"
                  alt="EVO16はあなたのパーソナルアシスタント"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-xl"
                />
              </div>

              {/* Right: Text Content */}
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">EVO16はあなたのパーソナルアシスタント</h4>
                <h5 className="text-xl font-bold text-white mb-6">面倒な作業もこの１台で</h5>
                <p className="text-gray-400 leading-relaxed">
                  録音、レベル調整、確認の繰り返しに追われていませんか？アーティストがレコーディングエンジニアも担当するのは大変です。慣れない作業をEVO 16に任せれば、最高のパフォーマンスだけに集中できます。
                </p>
              </div>
            </div>

            {/* Bottom Section: ムダのないスマートな外観 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-t border-gray-700 pt-16">
              {/* Left: Images */}
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Image
                    src="/images/brands/audient/evo 16/concept_14.jpg"
                    alt="EVO 16 Product"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>

              {/* Right: Text Content */}
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">ムダのないスマートな外観</h4>
                <h5 className="text-xl font-bold text-white mb-6">これまでのインターフェイスデザインを覆すミニマルデザイン</h5>
                <p className="text-gray-400 leading-relaxed mb-6">
                  マルチチャンネルでありながら、デスクトップ上でもラック上でもすっきりとおさまるスマート設計。輝度の高いバックライトLEDは暗いスタジオ内でも高い視認性を確保し、スチール製のボディは長期間の過酷な使用でも高い耐久性を発揮します。
                </p>
                
                {/* Image below text */}
                <div className="flex justify-center">
                  <Image
                    src="/images/brands/audient/evo 16/concept_15.jpg"
                    alt="EVO 16 Detail"
                    width={675}
                    height={450}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
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
                  src="https://www.youtube.com/embed/t6zHNa3GJjs"
                  title="EVO 16 Demo 1"
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
                  src="https://www.youtube.com/embed/DUd0NZQRzoo"
                  title="EVO 16 Demo 2"
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
                  src="https://www.youtube.com/embed/G4bI6EP5C38"
                  title="EVO 16 Demo 3"
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
                  src="https://www.youtube.com/embed/v_dyNvLl7eg"
                  title="EVO 16 Demo 4"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              {/* Video 5 */}
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/LVJcqwGUEBA"
                  title="EVO 16 Demo 5"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              {/* Video 6 */}
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/AlS7F9qB5hA"
                  title="EVO 16 Demo 6"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              {/* Video 7 */}
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/6XVM0DCYiYg"
                  title="EVO 16 Demo 7"
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
            
            {/* Section 1: ライン出力 */}
            <div className="mb-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center">
                  <Image
                    src="/images/brands/audient/evo 16/function_01.png"
                    alt="ライン出力"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">ライン出力</h3>
                  <h4 className="text-xl font-bold text-gray-700 mb-6">使い方はあなた次第</h4>
                  <p className="text-gray-700 leading-relaxed">
                    8つのライン出力を搭載し、複数のスピーカーセットでミックスのモニタリングが可能です。また、コンプレッサーやエフェクターなどの外部デバイスへの接続や、外部ヘッドフォンアンプに接続して、アーティスト用のcueミックスやモニターシステムも構築できます。
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2: ヘッドフォン出力 */}
            <div className="mb-20 border-t border-gray-300 pt-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center">
                  <Image
                    src="/images/brands/audient/evo 16/function_02.png"
                    alt="ヘッドフォン出力"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">ヘッドフォン出力</h3>
                  <h4 className="text-xl font-bold text-gray-700 mb-6">２系統の独立ヘッドフォン端子</h4>
                  <p className="text-gray-700 leading-relaxed">
                    搭載された２系統の専用ヘッドフォンアンプが、最も神経を使うモニタリング作業をサポートします。600Ωのヘッドフォンまでドライブできるため、十分な音量と明瞭なサウンドでディテールの確認作業もはかどります。
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3: ２系統の楽器入力 */}
            <div className="mb-20 border-t border-gray-300 pt-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center">
                  <Image
                    src="/images/brands/audient/evo 16/function_03.png"
                    alt="２系統の楽器入力"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">２系統の楽器入力</h3>
                  <h4 className="text-xl font-bold text-gray-700 mb-6">クラシックなトーンからモダンなサウンドまで</h4>
                  <p className="text-gray-700 leading-relaxed">
                    ギターを最高の音で録りたい？　それなら適切な仕様が必要です。ベースやギターなどの録音に最適なJFET入力回路は、クラシックな真空管アンプの入力段を再現します。ギターシミュレーターに頼る前に最適な楽器入力を体験してください。
                  </p>
                </div>
              </div>
            </div>

            {/* Section 4: デジタルI/O */}
            <div className="mb-20 border-t border-gray-300 pt-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center">
                  <Image
                    src="/images/brands/audient/evo 16/function_04.jpg"
                    alt="デジタルI/O"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">デジタルI/O</h3>
                  <h4 className="text-xl font-bold text-gray-700 mb-6">可能性を広げる拡張性</h4>
                  <p className="text-gray-700 leading-relaxed">
                    豊富なI/Oにより大規模なレコーディングにも余裕で対応します。ドラム録音やフルバンドのライブ配信でも、必要な多チャンネルI/Oをオプティカル入出力でカバーします。ADAT、SPDIFの両方をサポートし、最大16チャンネルのマイクプリアンプを追加でき、豊富なオプションがあなたのスタジオの対応レンジを広げます。外部のマイクプリアンプと組み合わせれば理想のスタジオの完成です。
                  </p>
                </div>
              </div>
            </div>

            {/* Section 5: 高度なモニターコントロール */}
            <div className="mb-20 border-t border-gray-300 pt-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center">
                  <Image
                    src="/images/brands/audient/evo 16/function_05.jpg"
                    alt="高度なモニターコントロール"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">高度なモニターコントロール</h3>
                  <h4 className="text-xl font-bold text-gray-700 mb-6">妥協のないカスタマイズを実現</h4>
                  <p className="text-gray-700 leading-relaxed">
                    EVO 16はモニタリングも妥協しません。ALTモニター機能で２セットのスピーカーを切り替えたり、Monoミックスを確認したり、トークバック機能でアーティストと円滑なコミュニケーションを取ったりと、モニタリングで必要になるあらゆる機能にフロントパネルから迅速にアクセスできます。ハードウェアのFボタンがシームレスな作業をフルにバックアップします。
                  </p>
                </div>
              </div>
            </div>

            {/* Section 6: トークバック機能 */}
            <div className="mb-20 border-t border-gray-300 pt-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center">
                  <Image
                    src="/images/brands/audient/evo 16/function_06.jpg"
                    alt="トークバック機能"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">トークバック機能</h3>
                  <h4 className="text-xl font-bold text-gray-700 mb-6">コミュニケーションが成功のカギ</h4>
                  <p className="text-gray-700 leading-relaxed">
                    専用のトークバック技術により、コンピューターに接続されている内蔵マイクやUSBマイクなどのオーディオソースをトークバック用マイクとして使用できます。マイクプリアンプを占領することはありません。
                  </p>
                </div>
              </div>
            </div>

            {/* Section 7: ループバック機能 */}
            <div className="mb-20 border-t border-gray-300 pt-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center">
                  <Image
                    src="/images/brands/audient/evo 16/function_07.png"
                    alt="ループバック機能"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">すべてのコンテンツクリエイターへ、ループバック機能</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    スタジオでの作業は時間が勝負。信頼できるドライバー性能、ハイスピードUSB接続、超ローレイテンシーのモニタリングを実現したEVO 16が、クリエイティビティをストレスフリーでサポートします。
                  </p>
                  <div className="space-y-2 text-gray-700">
                 
                    <p>コンピューターのオーディオを録音する</p>
             
                    <p>ゲーム実況を録音する</p>
               
                    <p>オンライン会議を記録する</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 8: 高速USB */}
            <div className="mb-20 border-t border-gray-300 pt-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center">
                  <Image
                    src="/images/brands/audient/evo 16/function_08.jpg"
                    alt="高速USB"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">高速USB</h3>
                  <h4 className="text-xl font-bold text-gray-700 mb-6">スピードと信頼の両立</h4>
                  <p className="text-gray-700 leading-relaxed">
                    スタジオでの作業は時間が勝負。信頼できるドライバー性能、ハイスピードUSB接続、超ローレイテンシーのモニタリングを実現したEVO 16が、クリエイティビティをストレスフリーでサポートします。
                  </p>
                </div>
              </div>
            </div>

            {/* Section 9: ポータブル */}
            <div className="mb-20 border-t border-gray-300 pt-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center">
                  <Image
                    src="/images/brands/audient/evo 16/function_09.png"
                    alt="ポータブル"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">ポータブル</h3>
                  <h4 className="text-xl font-bold text-gray-700 mb-6">平置きでもラック設置でも</h4>
                  <p className="text-gray-700 leading-relaxed">
                    充実の機能を備えながらコンパクトなEVO 16は 14インチ（35cm）強のサイズ。ラックマウントしてスタジオに常設しておくことはもちろん、下部に滑り止めのゴム足を備えており、デスクトップパソコンやノートパソコンの下に置いて使用することも可能です。
                  </p>
                </div>
              </div>
            </div>

            {/* Section 10: ラックマウントにも対応 */}
            <div className="mb-20 border-t border-gray-300 pt-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center">
                  <Image
                    src="/images/brands/audient/evo 16/function_10.jpg"
                    alt="ラックマウントにも対応"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">ラックマウントにも対応</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    取り外し可能なラックイヤーは、別売オプションにてご購入いただけます。
                  </p>
                  <p className="text-gray-700 font-medium mb-4">
                    型番：SP8-rack　税込市場参考価格：￥3,300
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    また、EVO 16のパッケージにはリサイクル材を活用しています。
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
                  src="/images/brands/audient/evo 16/control_01.jpg"
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
                  src="/images/brands/audient/evo 16/control_02.jpg"
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

      {/* Software Section */}
      <section id="software" className="py-20 scroll-mt-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {/* Title */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">専用ミキサー・ソフトウェア</h2>
              <div className="flex justify-center mb-6">
                <div className="w-24 h-1 rounded-full bg-purple-600" />
              </div>
            </div>

            {/* evo16 mixer Image */}
            <div className="mb-12 flex justify-center">
              <Image
                src="/images/brands/audient/evo 16/software_01.png"
                alt="evo16 mixer"
                width={1200}
                height={600}
                className="w-full h-auto rounded-xl"
              />
            </div>

            {/* Auto Translation Note */}
            <div className="text-center mb-12">
              <p className="text-sm text-gray-600">※ 日本語の自動翻訳機能がご利用頂けます。</p>
            </div>

            {/* Main Content - Two Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
              {/* Left Column - Video */}
              <div>
                <div className="aspect-video rounded-lg overflow-hidden shadow-lg mb-4">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/G4bI6EP5C38"
                    title="EVO Mixer Software Overview"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <p className="text-sm text-gray-600 text-center">前往平台观看: YouTube</p>
              </div>

              {/* Right Column - Description */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">専用ミキサーアプリ</h3>
                <h4 className="text-xl font-bold text-gray-700 mb-6">パワフルなコントロールツール</h4>
                <p className="text-gray-700 leading-relaxed mb-6">
                  専用アプリEVO Mixerを使えば、各種設定や入出力のルーティング、超ローレイテンシーモニタリング、アーティスト用のモニターヘッドフォンのミックスなど本格的なエンジニア作業も驚くほど簡単にできます。
                </p>
                
                {/* OS Compatibility */}
                <div className="mb-6">
                  <p className="text-gray-700 font-medium">MacOSおよびWindows OS対応</p>
                </div>
              </div>
            </div>

            {/* Download Section */}
            <div className="bg-gray-50 rounded-xl p-8 mb-8">
              <p className="text-gray-700 mb-4">
                ソフトウェアは、Audient WEBサイトからダウンロードして頂けます。
              </p>
              <a
                href="https://audient.com/products/audio-interfaces/evo-16/downloads/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
              >
                <Download className="w-5 h-5" />
                Audient ダウンロード・ページ
              </a>
            </div>

            {/* Firmware Section */}
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">ファームウェア</h3>
              <h4 className="text-lg font-bold text-gray-800 mb-4">最新ファームウェアのご案内</h4>
              <p className="text-gray-700 leading-relaxed mb-4">
                EVOシリーズの最新ドライバーVersion4.4.0がリリースされました。
                WindowsではARM64に対応、MacではOS 15 Sequoiaに対応済みとなりました。
              </p>
              <p className="text-gray-700 mb-4">
                EVO Driverは、Audient WEBサイトからダウンロードして頂けます。
              </p>
              <a
                href="https://audient.com/products/audio-interfaces/evo-16/downloads/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
              >
                <Download className="w-5 h-5" />
                ダウンロードはこちら
              </a>
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

      {/* Specs Section */}
      <section id="specs" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">製品仕様</h2>
            <div className="bg-white rounded-xl p-8">
              {/* 対応OS、最小システム要件 */}
              <div className="border-b border-gray-300 pb-6 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">対応OS、最小システム要件</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold mb-1">Mac：</p>
                    <p>macOS 10.7.5 (Lion)またはそれ以降、Intel CPU、1GB RAMメモリ以上</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Windows：</p>
                    <p>Windows 7またはそれ以降（32bit または 64bit）、Intel Core 2 @1.6Ghzまたは同等のAMD製CPU、1GB RAMメモリ以上</p>
                  </div>
                  <p className="text-gray-600 italic">※最新のドライバーをお使いください</p>
                </div>
              </div>

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
                      <p>CMRR：&gt;80dB @ 1kHz</p>
                      <p>最大入力レベル：+16dBu</p>
                      <p>入力インピーダンス（Mic）：&gt;3kΩバランス</p>
                      <p>入力インピーダンス（Line）：&gt;10kΩバランス</p>
                      <p>周波数特性：+/-0.5dB 10Hz 〜 40kHz</p>
                      <p>チャンネル間クロストーク：&lt;-105dBu @ 1kHz &lt;-103dBu @ 10kHz</p>
                      <p>THD+N @ 0dBu（1kHz）：&lt;0.0015%</p>
                      <p>SNR：100dB</p>
                      <p>マイク入力EIN：&lt;-127.5dBu</p>
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
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Empty space for alignment */}
                </div>
              </div>

              {/* Full Width Sections */}
              <div className="space-y-6 mt-6">
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

                {/* DAC コンバーター */}
                <div className="border-b border-gray-300 pb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">DAC コンバーター</h3>
                  <div className="space-y-1.5 text-sm text-gray-700">
                    <p>最大出力レベル：+12dBu</p>
                    <p>デジタルリファレンスレベル：0dBFS = +12dBu</p>
                    <p>出力インピーダンス：&lt;50Ω Balanced</p>
                    <p>周波数特性：+/-0.5dB 10Hz 〜 Fs/2</p>
                    <p>クロストーク：&lt;-110dBu @ 1kHz</p>
                    <p>THD+N @ -1dBFS (1kHz)：&lt;0.001%</p>
                    <p>ダイナミックレンジ：121dB A-weighted</p>
                    <p>1/4インチ・ジャック：TIP（Hot）、RING（Cold）& SLEEVE（Shield）</p>
                  </div>
                </div>

                {/* ヘッドホン出力 */}
                <div className="border-b border-gray-300 pb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">ヘッドホン出力</h3>
                  <div className="space-y-1.5 text-sm text-gray-700">
                    <p>最大出力レベル：11.25dBu</p>
                    <p>出力インピーダンス：&lt;50Ω</p>
                    <p>周波数特性：+/-0.5dB 10Hz 〜 Fs/2</p>
                    <p>クロストーク：-108dBu@1kHz</p>
                    <p>THD+N @ -1dBFS (1kHz)：&lt;0.001％</p>
                    <p>ダイナミックレンジ：118dB</p>
                    <p>最大レベル / 30ohms：+8.5 dBu, 0.00094% THD+N, 1.66Vpk Power: 86mW</p>
                    <p>最大レベル / 60ohms: 10 dBu, 0.00079% THD+N, 2.55Vpk Power: 104mW</p>
                    <p>最大レベル / 600ohms:11.2 dBu, 0.00057%THD+N, 3.83Vpk Power: 24mW</p>
                    <p>1/4インチ・ジャック：TIP（Left）、RING（Right）& SLEEVE（Shield）</p>
                  </div>
                </div>

                {/* Footer Note */}
                <div className="pt-4">
                  <p className="text-sm text-gray-600 italic">
                    ※ レイテンシーのパフォーマンスは、バッファーサイズ、CPUの負荷、OSによって異なります。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

