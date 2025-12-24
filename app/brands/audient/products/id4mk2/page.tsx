"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Download, ChevronDown, ChevronUp } from 'lucide-react'
import { BlogSlider } from "@/components/blog-slider"
import { downloadManual } from "@/lib/manual-download"

type Section = "concept" | "demo" | "function" | "software" | "bundle" | "faq" | "manual" | "specs"

const navigationItems = [
  { id: "concept" as Section, label: "コンセプト" },
  { id: "demo" as Section, label: "デモムービー" },
  { id: "function" as Section, label: "主な性能" },
  { id: "software" as Section, label: "ソフトウエア" },
  { id: "bundle" as Section, label: "バンドルソフト" },
  { id: "faq" as Section, label: "よくある質問" },
  { id: "manual" as "manual", label: "取扱説明書", isDownload: true },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function Id4mk2Page() {
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
    downloadManual("audient", "id4mk2")
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
          src="/images/brands/audient/iD4mkⅡ/hero.jpg"
          alt="iD4mk II"
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
                <p className="text-2xl font-bold text-gray-900">iD4mk II</p>
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
                  ¥36,080
                </p>
                <p className="text-xs text-gray-500">前後（税込）</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">5060374260436</p>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-2">2in / 2out</h2>
              <h3 className="text-2xl font-bold text-gray-700 mb-6">USB オーディオ・インターフェイス</h3>
              <div className="flex justify-center mt-8">
                <div className="w-24 h-1 rounded-full bg-purple-600" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Image and Related Info */}
              <div className="space-y-6">
                {/* Product Image */}
                <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/brands/audient/iD4mkⅡ/intro_01.jpg"
                    alt="iD4mk II"
                    width={800}
                    height={600}
                    className="w-full h-auto"
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
                      <span className="text-gray-900">audient製品 OS対応状況のお知らせ</span>
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
                      <span className="text-gray-900">専用ミキサー・ソフトウェア ＆ 最新ファームウェア</span>
                    </a>
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Your recordings made better.</h3>

                  <div className="prose max-w-none mb-6">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      あなたのレコーディングを次のステージにレベルアップさせるiD4mkⅡは、コンパクトでスタイリッシュな筐体にプロのオーディオ・パフォーマンス技術を凝縮しました。AUDIENTコンソールマイク・プリアンプ、高品質AD/DAコンバーター、デュアル・ヘッドホン出力、JFETインストゥルメント入力を搭載し、スタジオ品質の録音がご自宅で手軽に楽しめます。
                    </p>
                  </div>

                  {/* Feature List */}
                  <div className="space-y-2 mb-4">
                    {[
                      "1 x Audient コンソールマイク・プリアンプ搭載",
                      "高性能AD/DA コンバーター",
                      "1 x JFETインストルメント入力",
                      "2 x ライン出力",
                      "デュアル・ヘッドホン出力",
                      "iDスクロール・コントロール",
                      "スピーカーon/offボタン",
                      "モニターミックス＆パン",
                      "ファンタム電源",
                      "USB 3.0 対応",
                      "Mac M1 & M1 Pro & M1 Max 対応",
                      "iOS対応",
                      "24-bit/96kHz",
                      "全メタルシャーシ",
                      "ARC フリー・バンドル・ソフトウェア＆プラグイン",
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

                  <p className="text-gray-600 text-sm mt-4">
                    ※最新のドライバーをお使いください
                  </p>
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

          {/* Top Section: Video */}
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Video */}
              <div className="flex justify-center">
                <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg w-full max-w-2xl">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/LKmoo4osa0A"
                    title="Audient iD4 MkII Feature Overview"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
              
              {/* Right: Text Content */}
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">プロのサウンドクオリティをその手に</h4>
                <h5 className="text-xl font-bold text-white mb-6">Audientコンソール直系のClass-A マイク・プリアンプ搭載</h5>
                <p className="text-gray-400 leading-relaxed mb-6">
                  iDシリーズは、Audientの定番ともいえるプロスタジオ向けコンソールASP8024 Heritage Editionと同じディスクリート Class-A 回路を採用し、コンパクトなその見た目からは想像もつかないハイクオリティ・サウンドを誇ります。クラシカルなアナログの暖かみを保ちながら、ノイズと歪みを極限まで抑えたiD4のAudient コンソールマイク・プリアンプは、あなたにプロフェッショナルの現場と同等のサウンドを届けてくれます。
                </p>
                <p className="text-gray-400 text-sm mb-4">前往平台观看: YouTube</p>
                <p className="text-gray-500 text-sm">※ 日本語の自動翻訳機能がご利用頂けます。</p>
              </div>
            </div>
          </div>

          

          {/* Section 3: MicPre サウンドの違いを聴き比べてみてください */}
          <div className="mb-20 border-t border-gray-700 pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg w-full max-w-2xl">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/euNX_kbvDEc"
                    title="MicPre: サウンドの違いを聴き比べてみてください"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
              <div>
                <h5 className="text-xl font-bold text-white mb-4">MicPre：サウンドの違いを聴き比べてみてください</h5>
                <p className="text-gray-400 leading-relaxed mb-6">
                  こちらの動画は、Audientのレコーディング・コンソール「ASP8024-HE」から「iD4」までのサウンドを同じ条件下でレコーディングしたサンプルです。
                </p>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Audientでは、フラッグシップのレコーディング・コンソールから、最も小さいオーディオ・インターフェイスまで、同じ回路設計によるマイクプリと高性能なコンバーターで、可能な限り同じパフォーマンスの音質を追求しています。
                </p>
                <p className="text-gray-400 leading-relaxed mb-6">
                  各機種の音の違いがお判りになりますか？
                </p>
                <p className="text-gray-400 text-sm mb-2">前往平台观看: YouTube</p>
                <p className="text-gray-500 text-sm mb-6">より高音質な「4K」でご覧ください。Youtubeの自動翻訳機能がご利用いただけます。</p>
                <a
                  href="#"
                  className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                >
                  Audient マイクプリ・テクノロジー詳細
                </a>
              </div>
            </div>
          </div>

          {/* Section 4: 仮想スクロール・ホイール */}
          <div className="mb-20 border-t border-gray-700 pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text Content */}
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">仮想スクロール・ホイール</h4>
                <h5 className="text-xl font-bold text-white mb-6">Scroll Control モード</h5>
                <p className="text-gray-400 leading-relaxed">
                  iDボタンには「Scroll Control モード」がアサインされています。エンコーダーにスクロール・ホイール機能をアサインし、DAWのオートメーションなど様々な機能へのアクセスが可能になります。
                </p>
              </div>

              {/* Right: Product Image */}
              <div className="flex justify-center">
                <Image
                  src="/images/brands/audient/iD4mkⅡ/concept_02.png"
                  alt="Scroll Control モード"
                  width={600}
                  height={600}
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Section 5: いつでもどこでも始められる */}
          <div className="mb-20 border-t border-gray-700 pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Product Image */}
              <div className="flex justify-center">
                <Image
                  src="/images/brands/audient/iD4mkⅡ/concept_03.png"
                  alt="USB バスパワー"
                  width={600}
                  height={600}
                  className="w-full h-auto rounded-xl"
                />
              </div>

              {/* Right: Text Content */}
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">いつでもどこでも始められる</h4>
                <h5 className="text-xl font-bold text-white mb-6">USB バスパワー</h5>
                <p className="text-gray-400 leading-relaxed">
                  コンピューターのUSBから電源供給可能なバスパワーを採用しました。コンピューターを接続して、何処でもすぐにレコーディングを始められます。
                </p>
              </div>
            </div>
          </div>

          {/* Section 6: どんなマイクにも対応 */}
          <div className="mb-20 border-t border-gray-700 pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Product Image */}
              <div className="flex justify-center">
                <Image
                  src="/images/brands/audient/iD4mkⅡ/concept_04.png"
                  alt="ファンタム電源"
                  width={600}
                  height={600}
                  className="w-full h-auto rounded-xl"
                />
              </div>

              {/* Right: Text Content */}
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">どんなマイクにも対応</h4>
                <h5 className="text-xl font-bold text-white mb-6">ファンタム電源</h5>
                <p className="text-gray-400 leading-relaxed">
                  USBからファンタム電源を供給できるiD4mkIIは、コンデンサーマイクなどを使用する際に必要となる十分なパワーを送ることができます。
                </p>
              </div>
            </div>
          </div>

          {/* Section 7: オーディオ・ループバック機能 */}
          <div className="mb-20 border-t border-gray-700 pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Product Image */}
              <div className="flex justify-center">
                <Image
                  src="/images/brands/audient/iD4mkⅡ/concept_05.jpg"
                  alt="Loopback搭載 iD Mixer"
                  width={600}
                  height={600}
                  className="w-full h-auto rounded-xl"
                />
              </div>

              {/* Right: Text Content */}
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">オーディオ・ループバック機能</h4>
                <h5 className="text-xl font-bold text-white mb-6">Loopback搭載 iD Mixer</h5>
                <p className="text-gray-400 leading-relaxed mb-6">
                  近年ポッドキャストやライブ配信や、ゲーム実況といった需要の高まりから、ループバック機能の重要性はますます高まっています。その機能を備えたAudient iD4mkⅡとiD14mkⅡは、すぐにそうしたコンテンツ制作で活躍できます。
                </p>
                <a
                  href="#"
                  className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                >
                  ループバック機能について詳しく見る
                </a>
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
                  src="https://www.youtube.com/embed/VU8FPvRfyDQ"
                  title="AUDIENT iD4mk II Demo 1"
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
                  src="https://www.youtube.com/embed/LKmoo4osa0A"
                  title="AUDIENT iD4mk II Demo 2"
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
                  src="https://www.youtube.com/embed/nf6H7u2-ct4"
                  title="AUDIENT iD4mk II Demo 3"
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
                  src="https://www.youtube.com/embed/0mp_tXy5XfY"
                  title="AUDIENT iD4mk II Demo 4"
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
            
            {/* Function Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* 1. デュアル・ヘッドフォン出力 */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <Image
                    src="/images/brands/audient/iD4mkⅡ/function_01.jpg"
                    alt="デュアル・ヘッドフォン出力"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">①</span>
                  <h3 className="text-xl font-bold text-gray-900">デュアル・ヘッドフォン出力</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  ステレオ・ミニ・ジャックと標準ジャックに、600Ωのハイ・インピーダンス・ヘッドフォンを駆動することができる、強力なディスクリート高電流型ヘッドフォン・アンプを搭載しています。ヘッドフォンに制約されずに、あらゆるレコーディングにおいて高い音質でのモニタリングが可能です。
                </p>
              </div>

              {/* 2. JFET クラスA/ディスクリート設計の楽器用入力 */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <Image
                    src="/images/brands/audient/iD4mkⅡ/function_02.jpg"
                    alt="JFET クラスA/ディスクリート設計の楽器用入力"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">②</span>
                  <h3 className="text-xl font-bold text-gray-900">JFET クラスA/ディスクリート設計の楽器用入力</h3>
                </div>
              
                <p className="text-gray-700 leading-relaxed">
                  入力端子は、JFETを使用したクラス A /ディスクリート・ デザインの楽器用入力です。クラシックな真空管アンプの入力部分をベースにデザインされたこのD.I入力は、リッチなハーモニクスを含んだサウンドを実現します。また、D.I入力はマイク・プリアンプ入力と独立したチャンネルなので、例えば歌いながらギターを弾き、同時に録音する事も可能です。
                </p>
              </div>

              {/* 3. 超ロー・レイテンシーを実現したモニターミックス */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <video
                    src="/images/brands/audient/iD4mkⅡ/function_03.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto rounded-lg"
                    controls={false}
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">③</span>
                  <h3 className="text-xl font-bold text-gray-900">超ロー・レイテンシーを実現したモニターミックス</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  iD4mkⅡのMonitor Mixなら超ローレイテンシーでの録音が可能です。入力とコンピュータオーディオの最適なバランスで、遅れを感じることなくスムーズなレコーディングが実現できます。他社のモニター・ブレンド（ダイレクト・モニタリング）機能の多くはモノラル仕様です。これではステレオ・イメージを正確に捉えることはできません。iD4mkⅡの『MONITOR MIX』はステレオ仕様。録音しながらステレオ・サウンドでミックスのイメージを掴む事ができます。
                </p>
              </div>

              {/* 4. バーチャル・スクロール・ホイール */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <Image
                    src="/images/brands/audient/iD4mkⅡ/function_04.jpg"
                    alt="バーチャル・スクロール・ホイール"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">④</span>
                  <h3 className="text-xl font-bold text-gray-900">バーチャル・スクロール・ホイール</h3>
                </div>
              
                <p className="text-gray-700 leading-relaxed">
                  エンコーダーにスクロール・ホイール機能をアサインして、DAW のオートメーション等、様々な機能へのアクセスが可能になります。（動作、反応速度は各ソフトウェア・メーカーのスクロール・ホイールへの対応状況により異なります。）
                </p>
              </div>

              {/* 5. 高い堅牢性、頑丈なフルメタル・ボディを採用 */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <Image
                    src="/images/brands/audient/iD4mkⅡ/function_05.jpg"
                    alt="高い堅牢性、頑丈なフルメタル・ボディを採用"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">⑤</span>
                  <h3 className="text-xl font-bold text-gray-900">高い堅牢性、頑丈なフルメタル・ボディを採用</h3>
                </div>
            
                <p className="text-gray-700 leading-relaxed">
                  iD4mkⅡのボディは、コンパクトでスタイリッシュなだけでなく、頑丈なメタル素材を採用しており、そのプロクオリティのサウンドをどこへでも安心して持ち運べます。
                </p>
              </div>

              {/* 6. フリー・バンドル・ソフトウェア＆プラグイン */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <Image
                    src="/images/brands/audient/iD4mkⅡ/function_06.jpg"
                    alt="フリー・バンドル・ソフトウェア＆プラグイン"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">⑥</span>
                  <h3 className="text-xl font-bold text-gray-900">フリー・バンドル・ソフトウェア＆プラグイン</h3>
                </div>
                <p className="text-gray-500 text-sm mb-2">機能紹介</p>
                <p className="text-gray-700 leading-relaxed">
                  Cubase LE や、iOS 用 Cubasis LE などのクリエイティブなソフトウェアの無料でダウンロードできます。世界中で使われている人気のソフトウェアやプラグインを使えば、iDを買ったその日からすぐにレコーディングを楽しめます。
                </p>
              </div>

              {/* 7. iD4mkⅡが誇るバスパワーADI（１） */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">⑦</span>
                  <h3 className="text-xl font-bold text-gray-900">iD4mkⅡが誇るバスパワーADI（１）</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  オーディオ・インターフェースの中には、基準を満たすファンタム電源を供給できないものも多く存在します。その結果、供給した35V程度のファンタム電源がマイクのロードにより15V以下にまで落ちてしまいます。この場合、DIN45596の基準（±4V @ 10mA）を満たしていません。iD4 mkⅡなら低ノイズの48V @ 14mAファンタム電源を安定して供給できます。他のバスパワーADIと比べ、iD4はバスパワー仕様でもプロフェショナル・スペックを提供しています。
                </p>
              </div>

              {/* 8. iD4mkⅡが誇るバスパワーADI（２） */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">⑧</span>
                  <h3 className="text-xl font-bold text-gray-900">iD4mkⅡが誇るバスパワーADI（２）</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  iD4mkⅡ & iD14mkⅡ 両機種とも、正常動作にはUSB3.0スペックの5VDC/900mAが必要です。この電源が供給されると、ファンタム電源もフル+48Vがマイクロフォンに供給され、フルレンジのパフォーマンスが可能になります。ヘッドフォン用DACも最大レベルで動作します。また、USB-C接続から5VDC/1.5Aが供給されると、ハイボルテージ・モードに入ります。両機ともこのモードに入るとアナログ回路電圧が昇圧され、ヘッドフォン出力レベルなどが上がります。
                </p>
              </div>

              {/* 9. 正確に把握できるLEDメーター */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">⑨</span>
                  <h3 className="text-xl font-bold text-gray-900">正確に把握できるLEDメーター</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  ５セグメントのLEDメーターで、他社製品より正確なレベル確認が可能です。MONITOR MIXを左一杯に回すと、２本のLEDメーターは入力１、２がそれぞれの独立したピーク・メーターになります。MONITOR MIXを右に回すと、入力信号とプレイバックを統合したレベルのインジケーターとして動作します。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Software Section */}
      <section id="software" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* iOS 対応 Section */}
            <div className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">iOS 対応</h2>
                <h3 className="text-xl font-bold text-gray-700 mb-6">専用ミキサー・ソフトウェア</h3>
                <div className="flex justify-center mt-6 mb-6">
                  <div className="w-24 h-1 rounded-full bg-purple-600" />
                </div>
              </div>
              <div className="max-w-4xl mx-auto">
                <p className="text-gray-700 leading-relaxed text-center mb-8">
                  WindowsやmacOSだけでなく、iOSデバイスとの互換性も備えており、モバイルレコーディングにも活躍します。
                </p>
                <div className="flex justify-center mb-6">
                  <a
                    href="https://audient.com/products/audio-interfaces/id4mk2/downloads/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    専用ミキサー・ソフトウェア・ダウンロード
                  </a>
                </div>
              </div>
            </div>


            {/* Latest Firmware Section */}
            <div className="border-t border-gray-300 pt-16">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">ファームウェア</h3>
                <h4 className="text-xl font-bold text-gray-700 mb-6">最新ファームウェアのご案内</h4>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="flex justify-center">
                  <Image
                    src="/images/brands/audient/iD4mkⅡ/software_03.jpg"
                    alt="最新ファームウェア"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <div>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    iDシリーズの最新のiDドライバーVersion4.4.0がリリースされました。
                    WindowsではARM64に対応、MacではOS 15 Sequoiaに対応済みとなりました。
                  </p>
                  <p className="text-gray-700 mb-6">
                    iD Driverは、Audient WEBサイトからダウンロードして頂けます。
                  </p>
                  <a
                    href="https://audient.com/products/audio-interfaces/id4mk2/downloads/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    ダウンロードはこちら
                  </a>
                </div>
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
            <div className="max-w-4xl mx-auto">
              {/* FAQ Item: iOS機器に接続する場合 */}
              <div className="bg-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq("faq1")}
                  className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-400 transition-colors rounded-lg"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">?</span>
                    <span className="font-medium text-gray-900 text-left">iOS機器に接続する場合</span>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq1 ? '−' : '+'}</span>
                </button>
                {expandedFaq.faq1 && (
                  <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4">
                    <div className="space-y-4">
                      <p className="text-gray-700 leading-relaxed">
                        Lightning ポートを備えた iPhone または iPad に接続する場合、iD4 MKII / EVO 4 の正しい動作には、カメラ接続キットと電源付き USB ハブでの接続が必要です。
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        USB-C iPad では、iD4 MKII / EVO 4を USB-C 経由で直接接続できます。
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        USB-Cを備えた iPhone とiD4 MKII / EVO 4との直接接続は理論的には可能なはずですが、場合によってはiPhone がiD4 MKII / EVO 4へ正しく電力を供給できない事例が報告されています。その場合、iD4 MKII / EVO 4の接続にはカメラ接続キットと電源付きUSB ハブが必要です。
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        これは、iOS 自体とその電源管理の仕組みに問題があるようです。
                      </p>
                    </div>
                  </div>
                )}
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
                  {/* マイク・プリアンプ */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">マイク・プリアンプ</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>ゲインレンジ：58dB</p>
                      <p>フルスケールレベル：12dBu = 0dBFS</p>
                      <p>MIC 最大入力レベル：12dBu</p>
                      <p>最大入力レベル：21dBu</p>
                      <p>入力インピーダンス（Mic）: 2.8k</p>
                      <p>入力インピーダンス（Line）: &gt;8k</p>
                      <p>THD+N @ 0dBu: 0.00170%</p>
                      <p>THD+N @ 0dBu 最大ゲイン: &lt;0.04%</p>
                      <p>SNR: 101dBu（A-特性負荷）</p>
                      <p>EIN: 129dB（A-特性負荷）</p>
                      <p>CMRR @ 1k: &gt;75dB</p>
                      <p>周波数特性 – 最小ゲイン: ±0.5dB 10Hz to 40kHz</p>
                      <p>XLR COMBI FEMALE: Pin 2（Hot）、Pin 3（Cold） &amp; Pin 1（シールド）</p>
                      <p>1/4"TRS ジャック：チップ（Hot）、リング（Cold）、スリーブ（シールド）</p>
                    </div>
                  </div>

                  {/* D.I /インストゥルメント入力 */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">D.I /インストゥルメント入力</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>ゲインレンジ：40dB</p>
                      <p>フルスケールレベル：12dBu = 0dBFS</p>
                      <p>THD+N @ 0dBu: 0.1%</p>
                      <p>SNR：100dBu（A-特性負荷）</p>
                      <p>周波数特性 – 最小ゲイン: ±0.5dB 10Hz to 20kHz</p>
                      <p>1/4"TS ジャック：チップ（ホット）、スリーブ（シールド）</p>
                    </div>
                  </div>

                  {/* ADコンバーター */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">ADコンバーター</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>THD+N @ -1dBFS：0.001%</p>
                      <p>ダイナミックレンジ：120dB（A-特性負荷）</p>
                      <p>周波数特性：±0.5dB 10Hz to 40kHz</p>
                    </div>
                  </div>

                  {/* ヘッドホン出力 */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">ヘッドホン出力（100k負荷で測定）</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>フルスケールレベル：18dBu = 0dBFS</p>
                      <p>THD+N @ -1dBFS：0.0009%</p>
                      <p>ダイナミックレンジ：125.5dB（A-特性負荷）</p>
                      <p>クロストーク：&gt;116dB</p>
                      <p>周波数特性：±0.1dB 10Hz to 40kHz</p>
                      <p>最大レベル @ 30Ω：2.59V Peak, 1.827V RMS, 223mW</p>
                      <p>最大レベル @ 62Ω：4.18V Peak, 2.95V RMS, 280mW</p>
                      <p>最大レベル @ 600Ω：7.72V Peak, 5.46V RMS, 100mW</p>
                      <p>1/4"TRS ジャック：チップ（L）、リング（R）、スリーブ（シールド）</p>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* ライン出力（DAC） */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">ライン出力（DAC）</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>フルスケールレベル：12dBu = 0dBFS</p>
                      <p>THD+N @ -1dBFS: 0.0006%</p>
                      <p>ダイナミックレンジ：125.5dB（A-特性負荷）</p>
                      <p>クロストーク：&gt;120dB</p>
                      <p>周波数特性：±0.1dB 10Hz to 40kHz</p>
                      <p>1/4"TRS ジャック：チップ（L）、リング（R）、スリーブ（シールド）</p>
                    </div>
                  </div>

                  {/* USB-C ハイスピード（バスパワー） */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">USB-C ハイスピード（バスパワー）</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>最低位スペック：0.9A @ 5V &gt;=USB 3.0 Port</p>
                      <p>最高位スペック：1.5A @ 5V</p>
                      <p>入力チャンネル数：2（2 アナログ）</p>
                      <p>出力チャンネル数：2（2 アナログ）</p>
                      <p className="mt-2 font-semibold">DSP ミキサーレイテンシー：</p>
                      <p>　44.1kHz: 0.65mS</p>
                      <p>　48.0kHz: 0.6mS</p>
                      <p>　88.2kHz: 0.33mS</p>
                      <p>　96.0kHz: 0.31mS</p>
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

