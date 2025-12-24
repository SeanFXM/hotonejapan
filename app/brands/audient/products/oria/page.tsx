"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Download, ChevronDown, ChevronUp } from 'lucide-react'
import { BlogSlider } from "@/components/blog-slider"
import { downloadManual } from "@/lib/manual-download"

type Section = "concept" | "demo" | "audio" | "software" | "bundle" | "faq" | "manual" | "specs"

const navigationItems = [
  { id: "concept" as Section, label: "コンセプト" },
  { id: "demo" as Section, label: "デモムービー" },
  { id: "audio" as Section, label: "オーディオ性能" },
  { id: "software" as Section, label: "ソフトウエア" },
  { id: "bundle" as Section, label: "バンドルソフト" },
  { id: "faq" as Section, label: "よくある質問" },
  { id: "manual" as "manual", label: "取扱説明書", isDownload: true },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function OriaPage() {
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
    downloadManual("audient", "oria")
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
          src="/images/brands/audient/Oria/hero.jpg"
          alt="ORIA"
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
                <p className="text-2xl font-bold text-gray-900">ORIA</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">イマーシブオーディオ用インターフェイス&モニターコントローラー</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-gray-900">
                  ¥440,000
                </p>
                <p className="text-xs text-gray-500">前後（税込）</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">5060374260535</p>
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
              'isDownload' in item && item.isDownload ? (
                <a
                  key={item.id}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    handleManualDownload()
                  }}
                  className={`relative px-4 py-2 text-base font-medium transition-colors duration-200 whitespace-nowrap ${
                    activeSection === item.id ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 rounded-full" />
                  )}
                </a>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 text-base font-medium transition-colors duration-200 whitespace-nowrap ${
                    activeSection === item.id ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 rounded-full" />
                  )}
                </button>
              )
            ))}
          </div>
        </div>
      </nav>

      {/* Intro Section - White Background */}
      <section className="py-20 scroll-mt-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Main Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              イマーシブオーディオ用インターフェイス
            </h2>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">
              モニターコントローラー
            </p>
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
                  src="https://www.youtube.com/embed/334FLj2mTos"
                  title="AUDIENT ORIA - The Features"
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
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-900">日本語マニュアル (v.1.3)</span>
                  </a>
                  <a href="#" className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200 block">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-900">ORIA Desktop App アップデートv1.2のお知らせ</span>
                  </a>
                  <a href="#" className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200 block">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-900">ORIA iPad リモートアプリの配布を開始しました</span>
                  </a>
                  <a href="#" className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200 block">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-900">ORIA Firmware アップデート v1.1.3のお知らせ</span>
                  </a>
                  <a href="#" className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200 block">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-900">AUDIENT：サポート窓口</span>
                  </a>
                  <a href="#" className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200 block">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-900">AUDIENT：ユーザー登録</span>
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
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Dolby Atmosをもっと身近に</h3>

                <div className="prose max-w-none mb-6">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    イマーシブオーディオに特化して設計されたAudientオーディオインターフェイス＆モニターコントローラー「ORIA（オリア）」をご紹介します。Dolby Atmosなどのイマーシブ オーディオ・ミックスの作成ために設計されたORIAなら、ステレオから9.1.6 chまで、さらにその中間のマルチチャンネル・スピーカーの調整、コントロール、管理が可能です。音楽、映画、テレビ、ゲーム、VRなどあらゆる制作に採用いただけます。
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-4 text-sm font-medium">
                    *2025年1月　オプションの「Dante®カード」の販売を開始致しました。
                  </p>
                </div>

                {/* Feature List */}
                <div className="space-y-2 mb-4">
                  {[
                    "高ダイナミックレンジを誇る高性能AD/DAコンバーター（DAC 126dB / ADC 122dB）",
                    "24bit / 96kHz",
                    "60dBゲインを誇る２基のAUDIENTコンソール・マイクプリアンプ",
                    "ステレオ（2ch）〜 9.1.6chまでのあらゆるスピーカーコントロールに対応",
                    "Dolby Atmosなどのイマーシブ・オーディオ・ミックスを目的とした設計",
                    "16系統のサラウンド用スピーカー出力（LINE、または8ペアAESデジタル出力）",
                    "USB-C オーディオ・インターフェイスとして",
                    "ADAT入力を利用したモニター・コントローラーとして",
                    "ミキシング環境の音響特性を測定＆補正するキャリブレーション機能",
                    "Sonarworks「SoundID Reference」の60日間無料トライアルが付属",
                    "SoundID リファレンス用マイクが付属",
                    "キャリブレーション・プロファイルはプリセットが可能",
                    "デスクトップ、iPad用の専用コントロール・ソフトウェア",
                    "最大16チャンネルのDante入力に対応（*オプション）",
                    "ワードクロック入出力（BNC）搭載",
                    "macOS、Windows両対応",
                    "ワールドクラスの堅牢性と静音性",
                    "ARCソフトウェア・バンドル",
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

                <p className="text-gray-600 text-sm mt-4">
                  ※最新のドライバーをお使いください
                </p>
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

          {/* Section 1: Product Concept Image */}
          <div className="mb-20">
            <div className="flex justify-center">
              <Image
                src="/images/brands/audient/Oria/concept_01.webp"
                alt="ORIA 製品コンセプト"
                width={1200}
                height={600}
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>

          {/* Section 2: まさにパーフェクト・フィット */}
          <div className="mb-20">
            <h4 className="text-2xl font-bold text-white mb-6 text-center">まさにパーフェクト・フィット</h4>
            <p className="text-gray-400 text-center max-w-4xl mx-auto mb-12 leading-relaxed">
              ２つの目的を持って設計されたORIAは、最大9.1.6ch ミキシング・ワークフローに対応する16x出力を提供する強力なUSB-Cオーディオ・インターフェイスとして優れているのはもちろん、既存のスタジオ・セットアップにADAT入力を介したスタンドアローンのモニターコントローラーとして簡単に追加することもできます。ORIAなら必要なアプリケーションに柔軟にフィットします。
            </p>
            
            {/* Connection Examples */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="flex justify-center">
                <Image
                  src="/images/brands/audient/Oria/concept_02.webp"
                  alt="As an Audio Interface & Monitor Controller"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-xl"
                />
              </div>
              <div className="flex justify-center">
                <Image
                  src="/images/brands/audient/Oria/concept_03.webp"
                  alt="As a Standalone Monitor Controller"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Section 3: 高度なスピーカープロセッシング */}
          <div className="mb-20">
            <h4 className="text-2xl font-bold text-white mb-6 text-center">高度なスピーカープロセッシング</h4>
            <p className="text-gray-400 text-center max-w-4xl mx-auto mb-8 leading-relaxed">
              マルチチャンネルスピーカーを正しくセットアップするには、部屋のアコースティックを正確に調整する必要があります。部屋のキャリブレーションは難しく時間のかかるプロセスです。しかし、ORIAさえあればもうそれも必要なくなります。
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
              {/* Left - Video */}
            <div>
              <div className="aspect-video bg-black rounded-xl overflow-hidden">
                <video 
                    src="/images/brands/audient/Oria/concept_04.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover pointer-events-none"
                    controls={false}
                    disablePictureInPicture
                    disableRemotePlayback
                />
              </div>
            </div>

              {/* Right - Text Content */}
            <div>
                <h5 className="text-xl font-bold text-white mb-4">すべてを適切に、そして正確に</h5>
                <p className="text-gray-400 mb-4">測定と補正をスムーズに</p>
              <p className="text-gray-400 leading-relaxed">
                  ORIAの高度なスピーカー・プロセッシングは、ミキシングルームのアコースティック・キャリブレーションと、ステレオからサラウンド、9.1.6のイマーシブセットアップまで、あらゆるモニタリング・フォーマットに合わせたオンボードのキャリブレーション・プロファイル（プリセット）が作成できます。よって、異なるフォーマットでのミックスチェックがより容易になります。
              </p>
            </div>
          </div>

            {/* 4 Processing Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {/* Trim */}
              <div className="bg-[#2a2a2a] rounded-xl p-6 text-center">
                <Image
                  src="/images/brands/audient/Oria/concept_05.webp"
                  alt="Trim"
                  width={200}
                  height={200}
                  className="w-full h-auto mb-4 rounded-lg"
                />
                <h5 className="text-lg font-bold text-white mb-2">Trim</h5>
                <p className="text-gray-400 text-sm">
                  すべてのスピーカーレベルを個別に調整して、バランスの取れた音場を確保します。
                </p>
              </div>

              {/* Speaker Delay */}
              <div className="bg-[#2a2a2a] rounded-xl p-6 text-center">
                <Image
                  src="/images/brands/audient/Oria/concept_06.webp"
                  alt="Speaker Delay"
                  width={200}
                  height={200}
                  className="w-full h-auto mb-4 rounded-lg"
                />
                <h5 className="text-lg font-bold text-white mb-2">Speaker Delay</h5>
                <p className="text-gray-400 text-sm">
                  すべてのスピーカーからの音声が同時にミックスポジションまで届くよう調整します。
                </p>
              </div>

              {/* Bass Management */}
              <div className="bg-[#2a2a2a] rounded-xl p-6 text-center">
                <Image
                  src="/images/brands/audient/Oria/concept_07.webp"
                  alt="Bass Management"
                  width={200}
                  height={200}
                  className="w-full h-auto mb-4 rounded-lg"
                />
                <h5 className="text-lg font-bold text-white mb-2">Bass Management</h5>
                <p className="text-gray-400 text-sm">
                  チャンネル毎に設定可能なクロスオーバーフィルターを備えたベースマネジメント・コントロールにより、ミックス内のすべてのベースとローエンドの周波数を正確に聴くことができます。
                </p>
              </div>

              {/* 8 Band EQ */}
              <div className="bg-[#2a2a2a] rounded-xl p-6 text-center">
                <Image
                  src="/images/brands/audient/Oria/concept_08.webp"
                  alt="8 Band EQ"
                  width={200}
                  height={200}
                  className="w-full h-auto mb-4 rounded-lg"
                />
                <h5 className="text-lg font-bold text-white mb-2">8 Band EQ</h5>
                <p className="text-gray-400 text-sm">
                  不要なルームアコースティックやカラーリングを、フラットで安定したオーディオを提供します。
                </p>
              </div>
                </div>
            </div>
          </div>

        {/* Section 4: ルーム・キャリブレーション */}
        <div className="py-16 border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-6">
            {/* Top Image */}
            <div className="flex justify-center mb-8">
              <Image
                src="/images/brands/audient/Oria/concept_09.webp"
                alt="ルーム・キャリブレーション"
                width={1200}
                height={600}
                className="w-full h-auto rounded-xl max-w-5xl"
              />
          </div>

            <h4 className="text-2xl font-bold text-white mb-6 text-center">ルーム・キャリブレーション</h4>
            <p className="text-gray-400 text-center max-w-4xl mx-auto mb-12 leading-relaxed">
              2つの方法のいずれかでルームキャリブレーションを行います。ひとつは部屋の測定を手動で行い、キャリブレーション設定を直接調整してプロファイルを作成する方法、もうひとつはSoundID Referenceにアップグレードする方法です。
            </p>
            
            {/* Small Images */}
            <div className="flex justify-center gap-4 mb-8">
              <div className="max-w-2xl">
              <Image
                  src="/images/brands/audient/Oria/concept_10.jpg"
                  alt="ルーム・キャリブレーション"
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-xl"
              />
            </div>

              </div>

           
            {/* Sonarworksとの提携 */}
            <div className="mb-12">
              <h5 className="text-xl font-bold text-white mb-4 text-center">Sonarworksとの提携</h5>
              <p className="text-gray-400 text-center max-w-4xl mx-auto mb-8 leading-relaxed">
                ルーム・キャリブレーションのエキスパート企業であるSonarworksと提携し、Sound ID Reference/サウンドIDレファレンスとのシームレスな統合を実現しました。マルチチャンネルのセットアップに必要となる正確な測定およびキャリブレーションが１時間以内に完了します。
              </p>
              <p className="text-gray-400 text-center max-w-4xl mx-auto mb-8 leading-relaxed">
                ORIA には、Sound IDリファレンスマイクとSound ID Reference for Multichannelソフトウェアの60日間無料トライアルが付属しています。さまざまなモニタリング・フォーマットやターゲットモードに合わせたカスタムSound IDプロファイルが作成できます。それらをORIAに読み込んで、常に正確で遅延の少ないイマーシブ・オーディオを再生できます。
              </p>

              <div className="flex justify-center mb-8">
                <a href="#" className="inline-block text-green-400 hover:text-green-300 font-medium underline">
                  詳しく見る
                </a>
                </div>

              {/* YouTube Video */}
              <div className="mb-8">
                <div className="max-w-4xl mx-auto">
                  <div className="aspect-video bg-black rounded-xl overflow-hidden">
                    <iframe
                      src="https://www.youtube.com/embed/J2AF4IzJoQE"
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full"
                    />
                </div>
              </div>
              </div>

              

             

            {/* 4 Steps */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="text-center">
                <div className="mb-4">
                  <Image 
                      src="/images/brands/audient/Oria/concept_11.webp" 
                    alt="Step 1" 
                      width={200} 
                    height={200} 
                      className="w-full h-auto rounded-xl mx-auto"
                  />
                </div>
                <h5 className="text-white font-bold mb-2">1. スピーカーを測定する</h5>
                  <p className="text-gray-400 text-sm">
                    付属のマイクを使用して、ユーザーフレンドリーで自動化されたガイダンスに従い、スタジオスピーカーを測定および調整します。
                  </p>
              </div>

              <div className="text-center">
                <div className="mb-4">
                  <Image 
                      src="/images/brands/audient/Oria/concept_12.webp" 
                    alt="Step 2" 
                      width={200} 
                    height={200} 
                      className="w-full h-auto rounded-xl mx-auto"
                  />
                </div>
                  <h5 className="text-white font-bold mb-2">2. ターゲットモードを選択します</h5>
                  <p className="text-gray-400 text-sm">
                    キャリブレーションプロファイルを選択し、Dolby Atmos Musicカーブまたはフラット周波数レスポンスへの調整、カスタムプロファイルを作成します。
                  </p>
              </div>

              <div className="text-center">
                <div className="mb-4">
                  <Image 
                      src="/images/brands/audient/Oria/concept_13.webp" 
                    alt="Step 3" 
                      width={200} 
                    height={200} 
                      className="w-full h-auto rounded-xl mx-auto"
                  />
                </div>
                  <h5 className="text-white font-bold mb-2">3. プロフィールをエクスポートする</h5>
                  <p className="text-gray-400 text-sm">
                    最大32個の固有プロファイルをORIAの内部メモリに直接エクスポートすれば、設定が自動的に調整されます。
                  </p>
              </div>

              <div className="text-center">
                <div className="mb-4">
                  <Image 
                      src="/images/brands/audient/Oria/concept_14.webp" 
                    alt="Step 4" 
                      width={200} 
                    height={200} 
                      className="w-full h-auto rounded-xl mx-auto"
                  />
                </div>
                  <h5 className="text-white font-bold mb-2">4. ミックスの準備が完了</h5>
                  <p className="text-gray-400 text-sm">
                    どのような形式で作業しても、オーディオは常に同じ再現性でお楽しみ頂けます。
                  </p>
                </div>
              </div>
            </div>
              </div>
            </div>

        {/* Section 6: 最新のCPU */}
        <div className="py-16 border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-6">
            <h4 className="text-2xl font-bold text-white mb-6 text-center">最新のCPU</h4>
            <p className="text-gray-400 text-center max-w-4xl mx-auto leading-relaxed">
              最も優れているのは、キャリブレーションが手動かSoundIDによるものかに関わらず、すべて超高速のオンボードDSPデュアルプロセッサーによって、高度なスピーカープロセッシングが直接実行されている点です。これにより、様々な要求に応えなければならない大規模セッションでも、コンピューターのCPUは余裕で動作し、低レイテンシーのオーディオを提供します。より高いパフォーマンスと生産性をもたらすのです。
            </p>
            <div className="flex justify-center mt-12">
                <Image
                src="/images/brands/audient/Oria/concept_15.jpg"
                alt="最新のCPU"
                  width={800}
                  height={400}
                  className="rounded-xl"
                />
            </div>
              </div>
            </div>

        {/* Section 6: 目を奪われる美しい外観 */}
        <div className="py-16 border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-6">
            <h4 className="text-2xl font-bold text-white mb-6 text-center">目を奪われる美しい外観</h4>
            <p className="text-gray-400 text-center max-w-4xl mx-auto mb-12 leading-relaxed">
              洗練された外観はこれまでの常識を覆します。ORIAのインテリジェントに光るリングLEDボタンとバックライト付きLCDスクリーンが、シックなオールブラック仕上げにハイクラスな佇まいをアドオン。どこにでもある退屈なスタジオ機材とは一線を画した存在感を放ちます。
            </p>
            <div className="flex justify-center">
                <Image
                src="/images/brands/audient/Oria/concept_16.jpg"
                alt="ORIA 美しい外観"
                  width={1000}
                height={600}
                  className="rounded-xl"
                />
            </div>
              </div>
            </div>

        {/* Section 7: ワールドクラスの堅牢性と静音性 */}
        <div className="py-16 border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-6">
            <h4 className="text-2xl font-bold text-white mb-6 text-center">ワールドクラスの堅牢性と静音性</h4>
            <p className="text-gray-400 text-center max-w-4xl mx-auto mb-12 leading-relaxed">
              8mm厚のフェイスプレートを備えた頑丈なスチール設計で作られたORIAは、スタジオでのヘビーユースでも安心です。また、ファンレス設計なので、この上なく静かで、スタジオの頼れるメイン機器として据えることができます。
            </p>
              <div className="flex justify-center">
                <Image
                src="/images/brands/audient/Oria/concept_17.png"
                alt="ORIA 堅牢性"
                width={1000}
                height={600}
                  className="rounded-xl"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Video 1 */}
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                  src="https://www.youtube.com/embed/334FLj2mTos"
                  title="AUDIENT ORIA - The Features"
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
                  src="https://www.youtube.com/embed/BkEmwq0pilA"
                  title="AUDIENT Getting started with ORIA: Quick Start Guide"
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
                  src="https://www.youtube.com/embed/twkokm9DztA"
                  title="AUDIENT Introducing the ORIA iPad Remote"
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
                  src="https://www.youtube.com/embed/Tg4Dl5Q9sfE"
                  title="AUDIENT ORIA iPad Remote - Quick Start"
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
                  src="https://www.youtube.com/embed/H5b4q-gVRJU"
                  title="AUDIENT ORIA iPad Remote - Software Overview"
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

      {/* Audio Performance Section */}
      <section id="audio" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Main Title */}
            <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">オーディオ性能</h2>
            
            {/* Section 1: 優れたオーディオパフォーマンス - 高性能なコンバーター */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-center mb-2 text-gray-900">優れたオーディオパフォーマンス</h3>
              <h4 className="text-xl font-bold text-center mb-6 text-gray-700">高性能なコンバーター</h4>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-8">
                {/* Left - Text Content */}
                <div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    ORIAならミックスにも自信が持てます。搭載された高性能AD/DAコンバーターは、126dBのダイナミックレンジを誇り、ミックス時にこれまで以上に細かなニュアンスまで捉えます。オーディオの原音を忠実にキャプチャーし、わずかなディテールも逃さないため、すぐに問題を特定し、より適切なミックスに仕上げられます。ORIAがもたらす圧倒的にクリアな音像が、あなたのミックスをさらに高いレベルに引き上げてくれます。
                  </p>
                </div>
                
                {/* Right - Product Image */}
              <div className="flex justify-center">
                <Image
                    src="/images/brands/audient/Oria/audio_01.webp"
                    alt="ORIA"
                    width={600}
                    height={400}
                  className="rounded-xl"
                />
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
                  <p className="text-2xl font-bold text-green-700 mb-2">126 dB</p>
                  <p className="text-gray-700 font-medium">Dynamic Range / DAC</p>
                </div>
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
                  <p className="text-2xl font-bold text-green-700 mb-2">122 dB</p>
                  <p className="text-gray-700 font-medium">Dynamic Range / ADC</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-16"></div>

            {/* Section 2: Audient コンソール - マイクプリアンプ */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-center mb-2 text-gray-900">Audient コンソール</h3>
              <h4 className="text-xl font-bold text-center mb-6 text-gray-700">マイクプリアンプ</h4>
              
              <p className="text-gray-700 leading-relaxed mb-8 max-w-4xl mx-auto text-center">
                ORIAに搭載された2機のAudientコンソールのマイクプリアンプは、クラシックなアナログの暖かみあるサウンドに、超低ノイズと低歪みも実現します。60dBのゲインを提供し、マイクやラインはもちろん、ハイインピーダンスの楽器入力にも最適です。オーディオソースを忠実でクリーンに、正確に再生します。
              </p>
              
              {/* Audio 04 Image - Centered */}
              <div className="flex justify-center mb-8">
                  <Image
                  src="/images/brands/audient/Oria/audio_04.jpg"
                  alt="スタジオミキシング"
                  width={600}
                  height={450}
                  className="rounded-xl"
                />
              </div>
              
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-16"></div>

            {/* Section 3: スマートなアナログプリアンプ */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-900">スマートなアナログプリアンプ</h3>
              
              <p className="text-gray-700 leading-relaxed mb-8 max-w-4xl mx-auto text-center">
                Audient史上初めて、Audient Consoleマイクプリアンプがリモートコントロールできるようになりました。ピンポイントで正確なデジタル制御を可能にしながら、オールアナログ設計による利点も活かせるように最適化されています。
              </p>
              
              {/* 3 Feature Icons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="text-center">
                  <div className="flex justify-center mb-4 h-16 items-center">
                  <Image
                      src="/images/brands/audient/Oria/audio_06.png"
                      alt="音声を録音する"
                      width={50}
                      height={50}
                      className="rounded-lg object-contain"
                  />
                </div>
                  <p className="text-gray-700 font-medium">音声を録音する</p>
              </div>
                
                <div className="text-center">
                  <div className="flex justify-center mb-4 h-16 items-center">
                    <Image
                      src="/images/brands/audient/Oria/audio_07.png"
                      alt="リファレンスマイクの接続"
                      width={50}
                      height={50}
                      className="rounded-lg object-contain"
                    />
                  </div>
                  <p className="text-gray-700 font-medium">リファレンスマイクの接続</p>
            </div>

                <div className="text-center">
                  <div className="flex justify-center mb-4 h-16 items-center">
                <Image
                      src="/images/brands/audient/Oria/audio_08.png"
                      alt="ソフトウェアによるコントロール"
                      width={50}
                      height={50}
                      className="rounded-lg object-contain"
                />
              </div>
                  <p className="text-gray-700 font-medium">ソフトウェアによる<br />コントロール</p>
            </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Software Section */}
      <section id="software" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {/* Section 1: 高度なイマーシブ・モニターコントロール */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">高度なイマーシブ・モニターコントロール</h2>
              <h3 className="text-xl font-bold text-center mb-8 text-gray-700">必要な情報を一元管理</h3>
              
              <p className="text-gray-700 text-center max-w-4xl mx-auto mb-8 leading-relaxed">
                ナビゲートもコントロールも簡単です。ORIAは、素晴らしくシンプルなソフトウェアで、ステレオ、サラウンド、またはイマーシブ環境を構築するための強力で新しい方法を提供します。
              </p>
              
              {/* Main Software Interface Image */}
              <div className="flex justify-center mb-12">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-6xl">
                  <Image
                    src="/images/brands/audient/Oria/software_01.webp"
                    alt="ORIA ソフトウェアインターフェイス"
                    width={1200}
                    height={700}
                    className="rounded-lg w-full h-auto"
                  />
                </div>
              </div>
              
              {/* Three Feature Blocks */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-6xl mx-auto">
                {/* プロファイル呼び出しもスピーディ */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">プロファイル呼び出しもスピーディ</h4>
                  <div className="mb-4">
                    <Image
                      src="/images/brands/audient/Oria/software_02.webp"
                      alt="プロファイル呼び出し"
                      width={400}
                      height={250}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    プロファイルを使用すると、スピーカー、リスニングレベル、ターゲットカーブが、9.1.6イマーシブセットアップされたDolby X-Curveにキャリブレートされた状態でニアフィールド用ステレオスピーカーから再生されます。これがORIAならボタンを押すだけで簡単に実現できます。
                  </p>
                </div>

                {/* スピーカーコントロール */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">スピーカーコントロール</h4>
                  <div className="mb-4">
                    <Image
                      src="/images/brands/audient/Oria/software_03.webp"
                      alt="スピーカーコントロール"
                      width={400}
                      height={250}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    カラーコード分けされたスピーカーグループ、個別およびグループのスピーカーミューティングまたはソロの切り替え、グローバルボリューム調整、カット&ディム、ポストプロダクション用のグローバルディレイ（リップシンク）を備えています。これらの機能により、本来のイマーシブモニターコントロールをセッション中も迅速に処理できます。
                  </p>
                </div>

                {/* メータリング */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">メータリング</h4>
                  <div className="mb-4">
                    <Image
                      src="/images/brands/audient/Oria/software_04.webp"
                      alt="メータリング"
                      width={400}
                      height={250}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    ORIAのフロントパネルLCDスクリーン、デスクトップソフトウェア、iPadリモコンなど、複数の方法でメータリングがチェックできます。さらに詳しい情報が必要な場合は、別ウィンドウでのORIAのデスクトップメータリングが可能です。
                  </p>
                </div>
              </div>

              {/* Download Button */}
              <div className="text-center">
                <p className="text-gray-700 mb-4">ソフトウェアは、Audient WEBサイトからダウンロードして頂けます。</p>
                <a
                  href="https://audient.com/products/monitor-controllers/oria/downloads/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                >
                  Audient ダウンロード・ページ
                </a>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-300 my-16"></div>

            {/* Section 2: Dolby Atmos 認定 */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-center mb-4 text-gray-900">Dolby Atmos 認定</h3>
              <div className="flex justify-center mb-6">
                      <Image
                  src="/images/brands/audient/Oria/software_05.jpg"
                  alt="Dolby Atmos"
                  width={300}
                  height={150}
                  className="rounded-lg"
                      />
                    </div>
              <p className="text-gray-700 text-center max-w-4xl mx-auto leading-relaxed mb-4">
                ORIAはDolby Rendererに対応しており、ORIAのユーザーインターフェイスからダウンミックス機能を直接コントロールできます。7.1、5.1、ステレオなどのさまざまなモニタリングレイアウトでミックスを素早くチェックするのに最適です。
              </p>
              <p className="text-gray-600 text-sm text-center">
                *Dolby、Dolby Atmos 及び、ダブルD記号はドルビーラボラトリーズライセンシングコーポレーションの登録商標です。
                    </p>
                  </div>
                  
            {/* Divider */}
            <div className="border-t border-gray-300 my-16"></div>

            {/* Section 3: iPad用アプリでコントロール */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-center mb-2 text-gray-900">iPad用アプリでコントロール</h3>
              <h4 className="text-xl font-bold text-center mb-8 text-gray-700">あらゆる操作をリモートで</h4>
              
              <p className="text-gray-700 text-center max-w-4xl mx-auto mb-8 leading-relaxed">
                使いやすさに重点に置き設計されたユーザーフレンドリーなレイアウトによって、理想的なリスニングポジションからイマーシブ・オーディオミキシング体験を完全に制御し、柔軟に行うことができます。
              </p>
              
              <p className="text-gray-700 text-center max-w-4xl mx-auto mb-8 leading-relaxed">
                ORIAのiPad用コントロールアプリを使えば、1ビートすら逃すことはありません。オーディオの全てを一元管理するORIAの全機能にタッチ操作だけでリモートアクセスできます。レベルの調整、スピーカーの試聴、プロフィールの切り替え、メータリングの監視など、すべてデスクトップ上で直接行えます。簡単で正確なコントロールを可能にしました。
              </p>
              
              {/* Video Thumbnail */}
              <div className="max-w-4xl mx-auto mb-8">
                <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/twkokm9DztA"
                    title="Introducing the ORIA iPad Remote App"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    />
                  </div>
                </div>
              
              {/* App Store Button */}
              <div className="text-center">
                <p className="text-gray-700 mb-4">下のボタンをクリックしてアプリを無料でダウンロードしてください！</p>
                <a
                  href="https://apps.apple.com/app/oria/id1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Image
                    src="/images/brands/audient/Oria/software_06.png"
                    alt="Download on the App Store"
                    width={180}
                    height={60}
                    className="mx-auto"
                  />
                </a>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-300 my-16"></div>

            {/* Section 4: ソフトウェア アップデート v1.2 */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-center mb-2 text-gray-900">
                <span className="text-red-500">- New! -</span> ORIA ソフトウェア アップデート v1.2
              </h3>
              
              <p className="text-gray-700 text-center max-w-4xl mx-auto mb-8 leading-relaxed">
                ORIAは、ElgatoのStream DeckおよびAvidの EUCONプロトコルとの連携をサポートを完了しました。これにより、デスクトップからの効率的なコントロールが可能になり、特にポストプロダクションにおいて、より大規模なAvidベースのスタジオ環境への統合が簡素化されます。
              </p>
              
              <p className="text-gray-700 text-center max-w-4xl mx-auto mb-8 leading-relaxed">
                前回のアップデートに引き続き、コピードキュメント内のORIAの機能リストが更新され、新しいリモート連携が追加されましたのでお知らせいたします。
                <br />
                ※これらの強力な新機能が販売店リストに追加されるよう、販売店の皆様にご協力をお願いいたします。
              </p>
              
              <p className="text-gray-700 text-center max-w-4xl mx-auto mb-8 leading-relaxed">
                ORIA v1.2で、最新のイマーシブオーディオコントロールを体験してください。このアップデートでは、Elgato Stream DeckおよびAvid EUCONプロトコルとのシームレスな統合が導入され、直感的なデスクトップコントロールが可能になります。さらに、構成プロファイルのローカルバックアップ機能が追加され、キャリブレーション作業の安全性も向上しました。
              </p>
              
              <p className="text-gray-700 text-center max-w-4xl mx-auto mb-8 leading-relaxed">
                これらの機能強化の実際の動作と、スタジオセットアップの変革方法については、ビデオをご覧ください。
              </p>
              
              {/* Video */}
              <div className="max-w-4xl mx-auto mb-12">
                <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/hqNmyQW__Kw"
                    title="Introducing ORIA Software Update v1.2"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
          </div>
        </div>
              
              {/* Software Update Section */}
              <div className="max-w-4xl mx-auto">
                <h4 className="text-xl font-bold text-center mb-6 text-gray-900">ソフトウェア・アップデート</h4>
                
                <div className="space-y-4">
                  {/* ORIA Desktop App Changelog V1.2 */}
              <details className="bg-gray-200 rounded-lg overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-300 transition-colors">
                      <span className="flex items-center gap-2 font-medium text-gray-900">
                        ORIA Desktop App Changelog V1.2
                  </span>
                      <span className="text-red-500 font-bold">- New! -</span>
                </summary>
                <div className="p-4 bg-gray-200">
                  <p className="text-gray-700 mb-4">
                        ORIAのドライバーとソフトウェアインストーラー、およびユーザーマニュアルなどのドキュメントは、次のリンクから入手できます。
                  </p>
                  <p className="text-gray-700 mb-4">
                        <a href="https://audient.com/products/monitor-controllers/oria/downloads/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                          https://audient.com/products/monitor-controllers/oria/downloads/
                    </a>
                  </p>
                      <p className="text-gray-700 mb-4">
                        ファームウェアアップデートの詳細な手順ガイドとバージョン1.2に関する追加情報については、下記のリンクからサポートサイトの変更履歴をご覧ください。
                      </p>
                      <p className="text-gray-700">
                        <a href="https://support.audient.com/hc/en-us/articles/26765225701908-ORIA-Desktop-App-Changelog" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                          https://support.audient.com/hc/en-us/articles/26765225701908-ORIA-Desktop-App-Changelog
                        </a>
                  </p>
                </div>
              </details>

                  {/* ORIA Firmware Changelog V1.1.3 */}
              <details className="bg-gray-200 rounded-lg overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-300 transition-colors">
                      <span className="flex items-center gap-2 font-medium text-gray-900">
                        ORIA Firmware Changelog　V1.1.3
                  </span>
                      <span className="text-red-500 font-bold">- New! -</span>
                </summary>
                <div className="p-4 bg-gray-200">
                  <p className="text-gray-700 mb-4">
                        最新のORIAファームウェアv1.1.3がリリースされました。最適なパフォーマンスを確保するため、ORIAをご利用のお客様はmacOSまたはWindowsでAudient DFUアプリをダウンロードし、Audient社のウェブサイトから最新のファームウェアをインストールできます。
                  </p>
                  <p className="text-gray-700 mb-4">
                        <a href="https://audient.com/products/monitor-controllers/oria/downloads/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                          https://audient.com/products/monitor-controllers/oria/downloads/
                    </a>
                  </p>
                      <p className="text-gray-700 mb-4">
                        ファームウェアアップデートの詳細な手順ガイドとバージョン1.1.3に関する追加情報については、下記のリンクからサポートサイトの変更履歴をご覧ください。このニュースを販売店ネットワークにご共有いただければ幸いです。
                      </p>
                      <p className="text-gray-700 mb-6">
                        <a href="https://support.audient.com/hc/en-us/articles/26765190694420-ORIA-Firmware-Changelog" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                          https://support.audient.com/hc/en-us/articles/26765190694420-ORIA-Firmware-Changelog
                        </a>
                      </p>
                      <div className="bg-white rounded-lg p-4">
                        <h5 className="font-bold text-gray-900 mb-3">ORIA DESKTOP APPの最小システム要件</h5>
                        <ul className="text-gray-700 space-y-1 mb-4">
                          <li>• macOS 10.13.6 High Sierra</li>
                          <li>• Windows 10</li>
                        </ul>
                        <h5 className="font-bold text-gray-900 mb-3">SoundIDの最小システム要件</h5>
                        <ul className="text-gray-700 space-y-1">
                          <li>• macOS 11 Big Sur</li>
                          <li>• Windows 10</li>
                        </ul>
                      </div>
                </div>
              </details>
                  
                  {/* ORIA Desktop App Changelog V1.1.0 */}
                  <details className="bg-gray-200 rounded-lg overflow-hidden">
                    <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-300 transition-colors">
                      <span className="flex items-center gap-2 font-medium text-gray-900">
                        ORIA Desktop App Changelog　V1.1.0
                      </span>
                    </summary>
                    <div className="p-4 bg-gray-200">
                      <p className="text-gray-700 mb-4">
                        ORIA のドライバーとソフトウェアのインストーラー、およびユーザー マニュアルなどのドキュメントは、AUDIENT社のリンクから入手して頂けます。
                      </p>
                      <p className="text-gray-700 mb-6">
                        <a href="https://audient.com/products/monitor-controllers/oria/downloads/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                          https://audient.com/products/monitor-controllers/oria/downloads/
                        </a>
                      </p>
                      <div className="bg-white rounded-lg p-4">
                        <h5 className="font-bold text-gray-900 mb-3">ORIA デストップ・アプリ V1.1.0 変更点</h5>
                        <ul className="text-gray-700 space-y-2 list-disc list-inside">
                          <li>ミキサーコントロール（入力マイクゲイン、ファントム、インストゥルメント選択を含む）</li>
                          <li>ミキサーからの追加モニタリング入力ソース （メイン、キュー A、キュー B）</li>
                          <li>独立したEQウィンドウ</li>
                          <li>UIの調整</li>
                          <li>MacOS：CPU使用率の改善</li>
                          <li>パラメトリック EQ バンドの追加と削除（最大 16）</li>
                          <li>EQバンドを周波数順にナビゲートします</li>
                          <li>以前のウィンドウの状態 （開いている状態、位置/サイズ）をリコールできます。</li>
                          <li>基準音量コントロールを追加</li>
                          <li>間違ったヘッドフォンのルーティングが表示される問題を修正</li>
                          <li>Sonarworks サウンド ID リファレンスのインポートの改善</li>
                          <li>メーターウィンドウのフォントスケーリング</li>
                        </ul>
            </div>
                    </div>
                  </details>

                  {/* ORIA Firmware Changelog V1.0.8 */}
              <details className="bg-gray-200 rounded-lg overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-300 transition-colors">
                      <span className="flex items-center gap-2 font-medium text-gray-900">
                        ORIA Firmware Changelog　V1.0.8
                  </span>
                </summary>
                <div className="p-4 bg-gray-200">
                  <p className="text-gray-700 mb-4">
                        ORIA のドライバーとソフトウェアのインストーラー、およびユーザー マニュアルなどのドキュメントは、AUDIENT社のリンクから入手して頂けます。
                      </p>
                      <p className="text-gray-700 mb-6">
                        <a href="https://audient.com/products/monitor-controllers/oria/downloads/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                          https://audient.com/products/monitor-controllers/oria/downloads/
                        </a>
                      </p>
                      <div className="bg-white rounded-lg p-4">
                        <h5 className="font-bold text-gray-900 mb-3">ORIA ファームウェア V1.0.8 変更点</h5>
                        <ul className="text-gray-700 space-y-2 list-disc list-inside">
                          <li>低レイテンシー ソフトウェアミキサーのサポートを追加</li>
                          <li>改善されたチャンネルEQにより、安定性の向上とEQポイントの追加が実施されました。</li>
                          <li>ミキサー入力マイク1&2が、デフォルトで最小音量で中央にパンされるようになりました。</li>
                          <li>ミキサーDAW入力1&2が、デフォルトで0dBのステレオに設定されるようになりました。</li>
                          <li>Sonarworks サウンドIDリファレンスのインポートバグが修正されました。</li>
                        </ul>
                      </div>
                    </div>
                  </details>
                  
                  {/* ORIA ファームウェア・アップデートの方法 */}
                  <details className="bg-gray-200 rounded-lg overflow-hidden">
                    <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-300 transition-colors">
                      <span className="flex items-center gap-2 font-medium text-gray-900">
                        ③ ORIA ファームウェア・アップデートの方法
                      </span>
                    </summary>
                    <div className="p-4 bg-gray-200">
                      <p className="text-gray-700 mb-4">
                        <a href="https://support.audient.com/hc/en-us/articles/35137551927828-How-to-Update-ORIA-s-Firmware" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                          https://support.audient.com/hc/en-us/articles/35137551927828-How-to-Update-ORIA-s-Firmware
                        </a>
                      </p>
                      
                      {/* Main Image */}
                      <div className="mb-6">
                        <Image
                          src="/images/brands/audient/Oria/software_07.jpg"
                          alt="ORIA ファームウェア・アップデート"
                          width={800}
                          height={600}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                      
                      {/* Download Instructions */}
                      <div className="mb-6">
                        <p className="text-gray-700 mb-4">
                          ファームウェアをアップデートするには、Audient DFUアプリが必要です。以下のリンクからダウンロードできます。
                        </p>
                        <div className="flex gap-4 justify-center">
                          <a
                            href="https://audient.com/products/monitor-controllers/oria/downloads/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                          >
                            macOS
                          </a>
                          <a
                            href="https://audient.com/products/monitor-controllers/oria/downloads/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                          >
                            Windows
                          </a>
                        </div>
                      </div>
                      
                      {/* Update Process Instructions */}
                      <div className="mb-6">
                        <p className="text-gray-700 mb-4">
                          ダウンロードしたら、ファイルを解凍し、Audient DFUアプリをダブルクリックして実行してください。アップデートウィンドウが表示されます。
                        </p>
                        <p className="text-gray-700 mb-4">
                          デバイスリストからORIAデバイスをクリックし、アップデート元として 「Audient.comから」が選択されていることを確認して、「アップグレードを開始」をクリックします。
                        </p>
                      </div>
                      
                      {/* Application Screenshot */}
                      <div className="mb-6">
                        <Image
                          src="/images/brands/audient/Oria/software_08.png"
                          alt="Audient Firmware Upgrade アプリケーション"
                          width={800}
                          height={500}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                      
                      {/* Post-Update Instructions */}
                      <div className="mb-6">
                        <p className="text-gray-700 mb-4">
                          ORIAはアップデート中に数回再起動します。プログレスバーが100%に達すると、アップデートが完了したことを示す通知が表示されます。これでORIAコントロールアプリを起動し、新しいファームウェアでORIAを引き続きご利用いただけます。
                        </p>
                        <p className="text-gray-700 mb-4">
                          何らかの理由でORIAのアップデート中に問題が発生した場合は、まずORIAの電源を数秒間オフにしてから再度オンにし、再起動してみてください。Audient DFUアプリを再起動してから、再度アップデートをお試しください。アップデートに関する問題が解決しない場合は、サポートチームにお問い合わせください。サポートチームがサポートいたします。
                        </p>
                      </div>
                      
                      {/* Changelog Link */}
                      <div>
                        <p className="text-gray-700 mb-2">
                          ファームウェアアップデートで変更または追加された内容の詳細については、ファームウェアの変更履歴をご覧ください。
                  </p>
                  <p className="text-gray-700">
                          <a href="https://support.audient.com/hc/en-us/articles/26765190694420-ORIA-Firmware-Changelog" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                            https://support.audient.com/hc/en-us/articles/26765190694420-ORIA-Firmware-Changelog
                    </a>
                  </p>
                      </div>
                </div>
              </details>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bundle Software Section */}
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
      <section id="faq" className="py-20 scroll-mt-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gray-200 rounded-xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                {/* FAQ Item 1 */}
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq1")}
                    className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">③</span>
                      <span className="font-medium text-gray-900 text-left">ORIAを使ってATMOS対応のビデオコンテンツをストリーミングできますか?</span>
                    </div>
                    <span className="text-gray-600 text-xl font-bold flex-shrink-0">{expandedFaq.faq1 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq1 && (
                  <div className="p-4 bg-gray-100 border-t border-gray-300 space-y-4">
                    <p className="text-gray-700">
                      2025年4月時点では、ORIAのようなUSB出力デバイス経由でATMOSコンテンツの再生を直接サポートしているストリーミングアプリケーションはApple TV+のみです。
                    </p>
                    <p className="text-gray-700">
                      現在、macOS用のネイティブNetflixアプリケーションはなく、ほとんどのウェブブラウザもATMOS再生をサポートしていません。
                    </p>
                    <p className="text-gray-700">
                      Windowsでも状況は同様です。VLCメディアプレーヤーなどのアプリでATMOSメディアを再生することはできますが、これらのアプリのほとんどはWindowsの出力デバイスとしか接続できず、ステレオ（2チャンネル）出力としてしか設定できません。
                    </p>
                    <p className="text-gray-700">
                      HDMI出力を使用し、2本のADATケーブルを介してオーディオをORIAにルーティングする場合を除き、マルチチャンネルオーディオを含むビデオファイルをWindowsで適切に再生するには、マルチチャンネルオーディオを含むビデオファイルを読み込み、オーディオチャンネルを適切に直接ルーティングできるDAWを使用する必要があります（これは通常、一般的なメディアストリーミングには適していません）。
                    </p>
                    <p className="text-gray-700 font-medium">
                      AppleTV+アプリでATMOSコンテンツを再生するには、以下の手順に従ってください。
                    </p>
                    
                    {/* Step 1 */}
                    <div className="space-y-2">
                      <p className="text-gray-700 font-medium">１. macOSの出力デバイスとしてORIAが設定されていることを確認します。</p>
                      <div className="flex justify-center">
                        <Image
                          src="/images/brands/audient/Oria/Q&A_01.png"
                          alt="macOS出力デバイス設定"
                          width={800}
                          height={500}
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                    
                    {/* Step 2 */}
                    <div className="space-y-2">
                      <p className="text-gray-700 font-medium">２. 「Audio MIDI Setup /Audio MIDI設定」を開き、ORIAデバイス選択画面で「Configure Speakers/スピーカーの構成」をクリックし、Atmosの設定を「7.1.4」に設定します。</p>
                      <div className="flex justify-center">
                        <Image
                          src="/images/brands/audient/Oria/Q&A_02.png"
                          alt="Audio MIDI Setup スピーカー構成"
                          width={800}
                          height={500}
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                    
                    {/* Step 3 */}
                    <div className="space-y-2">
                      <p className="text-gray-700 font-medium">３. 下記のチャンネル構成がORIAの設定と一致していることを確認し、「Apply/適用」と「Done/完了」をクリックして設定を保存します。</p>
                      <div className="flex justify-center">
                        <Image
                          src="/images/brands/audient/Oria/Q&A_03.png"
                          alt="7.1.4チャンネル構成"
                          width={800}
                          height={500}
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                    
                    {/* Step 4 */}
                    <div className="space-y-2">
                      <p className="text-gray-700 font-medium">４. 再生中にORIAアプリで最初の12チャンネルに信号が表示されることを確認します。</p>
                      <div className="flex justify-center">
                        <Image
                          src="/images/brands/audient/Oria/Q&A_04.png"
                          alt="ORIAアプリ チャンネル表示"
                          width={800}
                          height={500}
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                  )}
                </div>

                {/* FAQ Item 2 */}
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq2")}
                    className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">③</span>
                      <span className="font-medium text-gray-900 text-left">Netflix経由でAtmos/5.1chオーディオ再生を有効にするには! (Windows)</span>
                    </div>
                    <span className="text-gray-600 text-xl font-bold flex-shrink-0">{expandedFaq.faq2 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq2 && (
                  <div className="p-4 bg-gray-100 border-t border-gray-300 space-y-4">
                    {/* Step 1 */}
                    <div className="space-y-2">
                      <p className="text-gray-700">
                        １. Dolby AccessアプリとORIAドライバーをインストールし、ORIAをPCに接続したら、Windowsの出力デバイスとしてORIAを設定します。デバイスのプロパティの「Spatial sound/空間サウンド」セクションで「Dolby Atmos for Headphones」に設定します。
                      </p>
                      <p className="text-gray-700 text-sm">
                        （Windowsでは、HDMI経由でAVレシーバーに接続した場合のみ「Dolby Atmos for Home Theater」オプションが表示され、USBオーディオデバイスでは表示されないと考えられますが、以下の手順に従うと、この問題を回避できます。）
                      </p>
                      <div className="flex justify-center">
                        <Image
                          src="/images/brands/audient/Oria/Q&A_05.png"
                          alt="Windows出力デバイス設定"
                          width={800}
                          height={500}
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                    
                    {/* Step 2 */}
                    <div className="space-y-2">
                      <p className="text-gray-700 font-medium">２. ORIA アプリで入力ソースが USB に設定され、出力が「Surround/サラウンド」に設定されていることを確認してください。</p>
                      <div className="flex justify-center">
                        <Image
                          src="/images/brands/audient/Oria/Q&A_06.png"
                          alt="ORIA アプリ設定"
                          width={800}
                          height={500}
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                    
                    {/* Step 3 */}
                    <div className="space-y-2">
                      <p className="text-gray-700 font-medium">３. Dolby Access アプリを確認すると、Dolby Atmos for Headphones セクションに「Ready to use / Speakers/使用可能/スピーカー (Audient ORIA)」と表示されます。</p>
                      <div className="flex justify-center">
                        <Image
                          src="/images/brands/audient/Oria/Q&A_07.png"
                          alt="Dolby Access アプリ"
                          width={800}
                          height={500}
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                    
                    {/* Step 4 */}
                    <div className="space-y-2">
                      <p className="text-gray-700 font-medium">４. NetflixアプリまたはMicrosoft EdgeでNetflixを開き、説明欄に「Dolby atmos / Spatial Audio」のバッジが表示されているコンテンツを再生します。</p>
                      <div className="flex justify-center">
                        <Image
                          src="/images/brands/audient/Oria/Q&A_08.png"
                          alt="Dolby Atmos バッジ"
                          width={800}
                          height={500}
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                    
                    {/* Step 5 */}
                    <div className="space-y-2">
                      <p className="text-gray-700 font-medium">５. 【オーディオ/字幕オプション】 ボックスをクリックして、5.1 オーディオ トラックが選択されていることを確認します（前の手順を実行した場合は、デフォルトで選択されています）</p>
                      <div className="flex justify-center">
                        <Image
                          src="/images/brands/audient/Oria/Q&A_09.png"
                          alt="Netflix オーディオトラック選択"
                          width={800}
                          height={500}
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                    
                    {/* Step 6 */}
                    <div className="space-y-2">
                      <p className="text-gray-700 font-medium">６. Windowsのサウンド設定を再度開き、下部にある「More sound settings/その他のサウンド設定」をクリックします。</p>
                      <div className="flex justify-center">
                        <Image
                          src="/images/brands/audient/Oria/Q&A_10.png"
                          alt="Windows サウンド設定"
                          width={800}
                          height={500}
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                    
                    {/* Step 7 */}
                    <div className="space-y-2">
                      <p className="text-gray-700 font-medium">７. 「再生」タブの「Speakers | Audient ORIA/スピーカー | Audient ORIA」デバイスで、「Configure/構成」をクリックし、出力を5.1サラウンドに設定します。</p>
                      <div className="flex flex-col items-center gap-4">
                        <Image
                          src="/images/brands/audient/Oria/Q&A_11.png"
                          alt="Windows サウンドコントロールパネル"
                          width={600}
                          height={400}
                          className="rounded-lg w-full max-w-2xl"
                        />
                        <Image
                          src="/images/brands/audient/Oria/Q&A_12.png"
                          alt="5.1サラウンド設定"
                          width={600}
                          height={400}
                          className="rounded-lg w-full max-w-2xl"
                        />
                      </div>
                      <p className="text-gray-700 text-sm">
                        （これにより、スピーカー構成の変更後も Netflix アプリ / MS Edge が 5.1 で再生を継続するようになります。必ずこの順序で実行して下さい。そうしないと、Netflix はデフォルトでステレオ再生のみになります。）
                      </p>
                    </div>
                    
                    {/* Step 8 */}
                    <div className="space-y-2">
                      <p className="text-gray-700 font-medium">８. 最後に、ORIA アプリで確認すると、追加チャンネルでオーディオ信号が表示されるはずです。</p>
                      <div className="flex justify-center">
                        <Image
                          src="/images/brands/audient/Oria/Q&A_13.png"
                          alt="ORIA アプリ チャンネル表示"
                          width={800}
                          height={500}
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                  )}
                </div>

                {/* FAQ Item 3 */}
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq3")}
                    className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">③</span>
                      <span className="font-medium text-gray-900 text-left">ORIA SoundID リファレンス 60日間トライアルの詳細</span>
                    </div>
                    <span className="text-gray-600 text-xl font-bold flex-shrink-0">{expandedFaq.faq3 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq3 && (
                  <div className="p-4 bg-gray-100 border-t border-gray-300 space-y-4">
                    {/* Image */}
                    <div className="flex justify-center">
                      <Image
                        src="/images/brands/audient/Oria/Q&A_14.jpg"
                        alt="ORIA SoundID リファレンス"
                        width={800}
                        height={600}
                        className="rounded-lg"
                      />
                    </div>
                    
                    {/* Text Content */}
                    <div className="space-y-3">
                      <p className="text-gray-700">
                        スピーカーのキャリブレーションを完了し、希望のプロファイルを作成したら、ORIA をモニター コントローラーとして使用し始めることができます。ユニットのフロントパネルにあるコントロールでモニターレベルを簡単に調整し、プロファイルを切り替えることができます。
                      </p>
                      
                      <p className="text-gray-700">
                        可能であれば、ORIA を USB 経由で PC に接続したままにすることをお勧めします。そうすると、ORIA Remote iPad アプリを使用できるようになり、設定後に Dolby ATMOS レンダラーのダウンミックス機能が制御できるようになります。ただし、必要に応じてユニットを USB から取り外し、上記の機能を使かわずに使用することも可能です。
                      </p>
                      
                      <p className="text-gray-700">
                        部屋を簡単にキャリブレートして、セットアップから最適なリスニング体験を得ることができるように、ORIA にはSoundiD Reference 測定マイクと、『Sound ID Reference for Multichannel』アプリ の 60 日間の無料トライアルが付属されています。これらを使用して、ORIA のキャリブレーション プロファイルを作成し、正確な部屋補正を適用できます。
                      </p>
                      
                      <p className="text-gray-700">
                        ただし、60 日間の試用期間が終了すると、SoundID Reference for Multichannel を通じて作成されたキャリブレーション プロファイルは無効になり、ORIA で使用できなくなります。
                      </p>
                      
                      <p className="text-gray-700">
                        これは、SoundID Reference for Multichannel を通じて作成されたプロファイルにのみ影響することに注意してください。手動キャリブレーション プロファイルは影響を受けません。
                      </p>
                      
                      <p className="text-gray-700">
                        60 日間のトライアル期間後もこれらのプロファイルを使用し続けたい場合は、Sonarworks Web サイトから 『SoundID Reference for Multichannel』 のライセンスを購入する必要があります。
                      </p>
                      
                      <p className="text-gray-700">
                        ライセンスを購入したら、キャリブレーション プロファイルを SoundID Reference から ORIA に再インポートして、無効になったプロファイルを置き換えられます。キャリブレーションカーブはSoundID Referenceによって保存されるため、これを行うために別の測定を実行する必要はありません。
                      </p>
                    </div>
                  </div>
                  )}
                </div>

                {/* FAQ Item 4 */}
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq4")}
                    className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">③</span>
                      <span className="font-medium text-gray-900 text-left">ダウンミックスボタンをレンダラーにリンクするには?</span>
                    </div>
                    <span className="text-gray-600 text-xl font-bold flex-shrink-0">{expandedFaq.faq4 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq4 && (
                  <div className="p-4 bg-gray-100 border-t border-gray-300 space-y-4">
                    <p className="text-gray-700">
                      ドルビーとのパートナーシップのおかげで、ORIAでは、ORIAのフロントパネル、コントロールソフトウェア、またはORIA リモート iPad アプリ経由で、ドルビー ATMOS レンダラーのダウンミックス機能を直接コントロールできます。
                    </p>
                    
                    {/* Main Image */}
                    <div className="flex justify-center">
                      <Image
                        src="/images/brands/audient/Oria/Q&A_15.jpg"
                        alt="ORIA ダウンミックス設定"
                        width={800}
                        height={600}
                        className="rounded-lg"
                      />
                    </div>
                    
                    <p className="text-gray-700">
                      この設定には、ORIA コントロールアプリの [System/システム] ボタンをクリックし、[Renderer Target/レンダラー ターゲット] ドロップダウンメニューをクリックします。コンピューター上で実行されている利用可能なレンダラーがすべて表示され、コントロールしたいレンダラーをリストから選択できます。
                    </p>
                    
                    {/* Renderer Target Screenshot */}
                    <div className="flex justify-center">
                      <Image
                        src="/images/brands/audient/Oria/Q&A_16.png"
                        alt="Renderer Target ドロップダウン"
                        width={600}
                        height={200}
                        className="rounded-lg"
                      />
                    </div>
                    
                    <p className="text-gray-700">
                      これで、ORIAのDownmix/ダウンミックスボタンを押して、Dolby ATMOS レンダラーで設定したダウンミックス フォーマットを切り替えることができます。ORIA フロントパネルのDownmix/ダウンミックスボタンを押したままにすることもできます。これにより、ダウンミックス フォーマットのリストが表示され、スクロールして希望のフォーマットが選択できます。
                    </p>
                    
                    <p className="text-gray-700">
                      ORIA ミキサーアプリまたはiPad アプリのレンダラー ステータス コントロールを使用して、ダウンミックス形式を選択することも可能です。
                    </p>
                    
                    {/* Renderer Status Screenshot */}
                    <div className="flex justify-center">
                      <Image
                        src="/images/brands/audient/Oria/Q&A_17.png"
                        alt="Renderer Status"
                        width={600}
                        height={300}
                        className="rounded-lg"
                      />
                    </div>
                    
                    <p className="text-gray-700">
                      ダウンミックスのチェックは、さまざまなリスニング環境でミックスが正しく置き換えられていることを確認するために不可欠ですが、ORIAを使用すると、これがこれまでよりもさらに迅速かつ簡単に行えます。
                    </p>
                  </div>
                  )}
                </div>

                {/* FAQ Item 5 */}
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq5")}
                    className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">③</span>
                      <span className="font-medium text-gray-900 text-left">ビデオ - SoundID リファレンス統合の使用法</span>
                    </div>
                    <span className="text-gray-600 text-xl font-bold flex-shrink-0">{expandedFaq.faq5 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq5 && (
                  <div className="p-4 bg-gray-100 border-t border-gray-300">
                    {/* YouTube Video */}
                    <div className="max-w-4xl mx-auto">
                      <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
                        <iframe
                          width="100%"
                          height="100%"
                          src="https://www.youtube.com/embed/J2AF4IzJoQE"
                          title="ORIA - How to use SoundID Reference Integration"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                  </div>
                  )}
                </div>

                {/* FAQ Item 6 */}
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq6")}
                    className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">③</span>
                      <span className="font-medium text-gray-900 text-left">ビデオ - キャリブレーション機能の使用法</span>
                    </div>
                    <span className="text-gray-600 text-xl font-bold flex-shrink-0">{expandedFaq.faq6 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq6 && (
                  <div className="p-4 bg-gray-100 border-t border-gray-300">
                    {/* YouTube Video */}
                    <div className="max-w-4xl mx-auto">
                      <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
                        <iframe
                          width="100%"
                          height="100%"
                          src="https://www.youtube.com/embed/BkEmwq0pilA"
                          title="Getting started with ORIA: Quick Start Guide"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                  </div>
                  )}
                </div>

                {/* FAQ Item 7 */}
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq7")}
                    className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">③</span>
                      <span className="font-medium text-gray-900 text-left">ORIA をスタンドアロン・モニター・コントローラーとして使用する</span>
                    </div>
                    <span className="text-gray-600 text-xl font-bold flex-shrink-0">{expandedFaq.faq7 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq7 && (
                  <div className="p-4 bg-gray-100 border-t border-gray-300 space-y-4">
                    <p className="text-gray-700">
                      ORIA はコンピューターに直接接続されたオーディオ インターフェイスとして機能しますが、既存のオーディオ インターフェイスをすでにお持ちで、単に強力なイマーシブモニターコントロールが必要な場合は、ORIA をスタンドアロンのモニターコントローラーとして使用することもできます。
                    </p>
                    
                    {/* Image 1 */}
                    <div className="flex justify-center">
                      <Image
                        src="/images/brands/audient/Oria/Q&A_18.jpg"
                        alt="ORIA スタンドアロン・モニター・コントローラー"
                        width={800}
                        height={600}
                        className="rounded-lg"
                      />
                    </div>
                    
                    <p className="text-gray-700">
                      外部オーディオ インターフェイスから ORIA にオーディオを供給するには 2 つの方法があります。オプティカル ADAT ポート経由とオプションの DANTE カード経由です。
                    </p>
                    
                    <p className="text-gray-700">
                      ORIA をセットアップするには、USB 経由でコンピューターに接続し、ORIA コントロール ソフトウェアを開きます。 「Monitor Source/モニターソース」ドロップダウンで、ADAT または DANTE のいずれかを選択してください。これで、16 チャンネルの入力が USB 接続からではなくソースから受け取れるようになります。
                    </p>
                    
                    {/* Image 2 */}
                    <div className="flex justify-center">
                      <Image
                        src="/images/brands/audient/Oria/Q&A_19.png"
                        alt="ORIA コントロールソフトウェア設定"
                        width={800}
                        height={500}
                        className="rounded-lg"
                      />
                    </div>
                    
                    <p className="text-gray-700">
                      ADAT または DANTE 経由で ORIA をリンクし、正確にクロック同期されるようにするには、追加のセットアップが必要です。ヘルプデスクで専用の ADAT および DANTE セットアップ ガイドを見つけることができます。
                    </p>
                    
                    <p className="text-gray-700">
                      「SoundID Reference for Multichannel」を使用するか、選択したソフトウェアを使用して手動でスピーカーのキャリブレーションを設定できるようになりました。スピーカーのキャリブレーションを設定する方法の詳細については、こちらをご覧ください。
                    </p>
                    
                    <p className="text-gray-700">
                      スピーカーのキャリブレーションを完了し、希望のプロファイルを作成したら、ORIA をモニター コントローラーとしての使用が始められます。ユニットのフロントパネルにあるコントロールでモニターレベルを簡単に調整し、プロファイルを切り替えることができます。
                    </p>
                    
                    <p className="text-gray-700">
                      可能であれば、ORIA を USB 経由で PC に接続したままにすることをお勧めします。そうすると、ORIA Remote iPad アプリを使用できるようになり、設定後に Dolby ATMOS レンダラーのダウンミックス機能が制御できるようになります。ただし、必要に応じてユニットを USB から取り外し、上記の機能を使かわずに使用することも可能です。
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
            <div className="bg-gray-50 rounded-xl p-8">
              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* マイクロフォン入力 */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">マイクロフォン入力</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>ゲイン：60dB</p>
                      <p>最大入力レベル：+18dBu</p>
                      <p>クロストーク：&lt;105dB</p>
                      <p>THD+N：&lt;0.0015% / -96dB</p>
                      <p>EIN（等価入力雑音）：&lt;-129.0dBu</p>
                      <p>CMRR（同相信号除去比）：-85dB</p>
                      <p>SNR：100dB</p>
                      <p>周波数特性：+/-0.5dB 20Hz to 40kHz</p>
                      <p>入力インピーダンス: 1.5kΩ Balanced</p>
                    </div>
                  </div>

                  {/* ライン入力 */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">ライン入力</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>ゲイン：-10dB 〜 +50dB</p>
                      <p>最大入力レベル：+18dBu</p>
                      <p>THD+N：&lt;0.0015% / -96dB</p>
                      <p>入力インピーダンス: 4.7kΩ Balanced</p>
                    </div>
                  </div>

                  {/* D.I /インストゥルメント入力 */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">D.I /インストゥルメント入力</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>ゲイン：60dB</p>
                      <p>最大入力レベル：+18dBu</p>
                      <p>THD+N：0.16%</p>
                      <p>SNR：100dB</p>
                      <p>入力インピーダンス: 370kΩ アンバランス</p>
                      <p>周波数特性：±0.5 dB 20Hz to 40kHz</p>
                    </div>
                  </div>

                  {/* ライン出力 */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">ライン出力</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>最大出力レベル：+18dBu</p>
                      <p>THD+N：0.0006% / -105dB</p>
                      <p>ダイナミックレンジ：126.5dB</p>
                      <p>クロストーク：-123dB</p>
                      <p>周波数特性：+/-0.3dB 10Hz to 40kHz</p>
                      <p>出力インピーダンス: &lt;100Ω Balanced</p>
                    </div>
                  </div>

                  {/* ヘッドホン出力 */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">ヘッドホン出力</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>最大出力レベル：+18dBu</p>
                      <p>THD+N：0.0007% / -103dB</p>
                      <p>ダイナミックレンジ：124dB</p>
                      <p>クロストーク：-115dB</p>
                      <p>周波数特性：+/-0.25dB 10Hz to 40kHz</p>
                      <p>出力インピーダンス: &lt;50Ω UnBalanced</p>
                      <p>最大入力レベル（30Ω）：5.47V Peak, 3.87Vrms, 997mW</p>
                      <p>最大入力レベル（60Ω）：7.4V Peak, 5.29Vrms, 912mW</p>
                      <p>最大入力レベル（600Ω）：8.6V Peak, 6.09Vrms, 123mW</p>
                    </div>
                  </div>

                  {/* USB-C */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">USB-C</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>コネクター：USB Type-C</p>
                      <p>同梱ケーブル：Type-C – USB Type C</p>
                      <p>入力チャンネル 34（2アナログ、16デジタル、16 AOIP*）</p>
                      <p>出力チャンネル 38（20ライン、2x ステレオヘッドホン、16x AES）</p>
                      <p className="text-xs text-gray-500 mt-2">*オプション装着時</p>
                    </div>
                  </div>

                  {/* デジタル入力 */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">デジタル入力</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>ADAT 16 Channels：44.1kHz to 48kHz</p>
                      <p>ADAT 8 Channels（SMUX）: 88.2kHz to 96kHz</p>
                    </div>
                  </div>

                  {/* デジタル出力 */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">デジタル出力</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>AES Outputs：16 Audio Channels（8x AES Data Streams）</p>
                    </div>
                  </div>

                  {/* ワードクロック出力 */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">ワードクロック出力</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>Word Clock：44.1kHz to 96kHz</p>
                    </div>
                  </div>

                  {/* DSP レイテンシー */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">DSP レイテンシー</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p className="font-medium">DSP ミキサーレイテンシー（往復タイム）：</p>
                      <p>44.1kHz 6.5mS</p>
                      <p>48.0kHz 6.3mS</p>
                      <p>88.2kHz 5.5mS</p>
                      <p>96.0kHz 5.4mS</p>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* AOIP */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">AOIP（*オプション Dante Expansion カード）</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>AOIP Inputs：16（44.1kHz to 96kHz）</p>
                      <p className="text-xs text-gray-500 mt-2">*オプション装着時</p>
                    </div>
                  </div>

                  {/* パワーサプライ */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">パワーサプライ</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>入力電圧：85 – 264 VAC</p>
                      <p>入力周波数：47 – 63Hz</p>
                    </div>
                  </div>

                  {/* サイズ */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">サイズ</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>483mm（幅）x 325mm（奥行き）x 45mm（高さ）</p>
                      <p className="text-xs text-gray-500 mt-2">*ラック耳、BNC端子、エンコーダー等の突起を含む</p>
                      <p>3.96kg</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Slider */}
      <BlogSlider />
    </div>
  )
}

