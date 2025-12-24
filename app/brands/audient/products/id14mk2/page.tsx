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

export default function Id14mk2Page() {
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
    downloadManual("audient", "id14mk2")
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
          src="/images/brands/audient/iD14mkⅡ/hero.jpg"
          alt="iD14mkⅡ"
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
                <p className="text-2xl font-bold text-gray-900">iD14mkⅡ</p>
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
                  ¥52,030
                </p>
                <p className="text-xs text-gray-500">前後（税込）</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">5060374260429</p>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-2">10in / 6out</h2>
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
                    src="/images/brands/audient/iD14mkⅡ/intro_01.jpg"
                    alt="iD14mk II"
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
                      あなたのレコーディングを次のステージへレベルアップさせるiD14mkⅡは、コンパクトでスタイリッシュな筐体にプロのオーディオパフォーマンスの技術を凝縮したオーディオインターフェイスです。AUDIENTコンソールマイク・プリアンプ2基、高品質AD/DAコンバーター、ADATオプティカル入力、デュアルヘッドフォン出力、JFETインストゥルメント入力を搭載し、プロスタジオレベルの録音がご自宅で手軽に楽しめます。
                    </p>
                  </div>

                  {/* Feature List */}
                  <div className="space-y-2 mb-4">
                    {[
                      "2 x Audient コンソール・マイク・プリアンプ搭載",
                      "高性能AD/DA コンバーター",
                      "1 x JFETインストルメント入力",
                      "4 x ライン出力",
                      "デュアルヘッドフォン出力",
                      "拡張用 ADAT 入力",
                      "超ローレイテンシーのソフトウェアミキサー",
                      "進化したモニターコントロール",
                      "iDスクロールコントロール",
                      "ファンタム電源",
                      "USB 3.0対応",
                      "Mac M1 & M1 Pro & M1 Max 対応",
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
                    src="https://www.youtube.com/embed/CNzKMExhhqQ"
                    title="Audient iD14 MkII Feature Overview"
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
                  iDシリーズは、Audientの定番ともいえるプロスタジオ向けコンソールASP8024 Heritage Editionと同じディスクリート Class-A 回路を採用し、コンパクトなその見た目からは想像もつかないハイクオリティ・サウンドを誇ります。クラシカルなアナログの暖かみを保ちながら、ノイズと歪みを極限まで抑えたiD14のAudient コンソールマイク・プリアンプは、あなたにプロフェッショナルの現場と同等のサウンドを届けてくれます。
                </p>
                <p className="text-gray-400 text-sm mb-4">前往平台观看: YouTube</p>
                <p className="text-gray-500 text-sm">※ 日本語の自動翻訳機能がご利用頂けます。</p>
              </div>
            </div>
          </div>

          {/* Section 1: 細部に宿るこだわり */}
          <div className="mb-20 border-t border-gray-700 pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text Content */}
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">細部に宿るこだわり</h4>
                <h5 className="text-xl font-bold text-white mb-6">高性能DA/ADコンバーター</h5>
                <p className="text-gray-400 leading-relaxed mb-6">
                  iD14mkⅡのコンバーターは、ADC：120dB（DAC：125.5dB）という優れたダイナミックレンジを誇り、ミックスをより正確に聴くことができます。細部にわたるニュアンスやオーディオが持つあらゆるサウンドの要素も逃しません。この高い精度により、レコーディング作業がよりスムーズに進められ、プロフェッショナルなミキシングが体験できます。
                </p>
              </div>

              {/* Right: Product Image */}
              <div className="flex justify-center">
                <Image
                  src="/images/brands/audient/iD14mkⅡ/concept_01.svg"
                  alt="高性能DA/ADコンバーター"
                  width={600}
                  height={600}
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Section 4: MicPre サウンドの違いを聴き比べてみてください */}
          <div className="mb-20 border-t border-gray-700 pt-20">
            <div className="text-center mb-8">
  
              <p className="text-gray-400 text-sm mb-4">より高音質な「4K」でご覧ください。Youtubeの自動翻訳機能がご利用いただけます。</p>
            </div>
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
                <a
                  href="#"
                  className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                >
                  Audient マイクプリ・テクノロジー詳細
                </a>
              </div>
            </div>
          </div>

          {/* Section 5: もっとスピーディに */}
          <div className="mb-20 border-t border-gray-700 pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Product Image */}
              <div className="flex justify-center">
                <Image
                  src="/images/brands/audient/iD14mkⅡ/concept_02.png"
                  alt="進化したモニターコントロール"
                  width={600}
                  height={600}
                  className="w-full h-auto rounded-xl"
                />
              </div>
              
              {/* Right: Text Content */}
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">もっとスピーディに</h4>
                <h5 className="text-xl font-bold text-white mb-6">進化したモニターコントロール</h5>
                <p className="text-gray-400 leading-relaxed mb-6">
                  iDボタンがワークフローをスピードアップしてくれます。iDボタンに、DIM、CUT、位相反転、Mono Sum、トークバックまたはCueミックスを割り当れば、特定のモニタリング機能を素早く使えます。
                </p>
                
                {/* Small icon below text */}
                <div className="flex justify-start mt-6">
                  <Image
                    src="/images/brands/audient/iD14mkⅡ/concept_03.svg"
                    alt="モニターコントロール機能"
                    width={300}
                    height={200}
                    className="h-auto opacity-90"
                    style={{ backgroundColor: 'transparent' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 6: いつでもどこでも始められる */}
          <div className="mb-20 border-t border-gray-700 pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Product Image */}
              <div className="flex justify-center">
                <Image
                  src="/images/brands/audient/iD14mkⅡ/concept_04.png"
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

          {/* Section 7: どんなマイクにも対応 */}
          <div className="mb-20 border-t border-gray-700 pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Product Image */}
              <div className="flex justify-center">
                <Image
                  src="/images/brands/audient/iD14mkⅡ/concept_05.png"
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
                  USBからファンタム電源を供給できるiD14mkⅡは、コンデンサーマイクなどを使用する際に必要となる十分なパワーを送ることができます。
                </p>
              </div>
            </div>
          </div>


          {/* Section 9: オーディオ・ループバック機能 */}
          <div className="mb-20 border-t border-gray-700 pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Product Image */}
              <div className="flex justify-center">
                <Image
                  src="/images/brands/audient/iD14mkⅡ/concept_06.jpg"
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
                  src="https://www.youtube.com/embed/Qt_k7SvPvVI"
                  title="AUDIENT iD14mkⅡ Demo 1"
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
                  src="https://www.youtube.com/embed/CNzKMExhhqQ"
                  title="AUDIENT iD14mkⅡ Demo 2"
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
                  src="https://www.youtube.com/embed/w3IJJrK3RD8"
                  title="AUDIENT iD14mkⅡ Demo 3"
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
                  src="https://www.youtube.com/embed/loz5BJVpBII"
                  title="AUDIENT iD14mkⅡ Demo 4"
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
              {/* 1. 作業に没頭できるスピーカー出力 */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <Image
                    src="/images/brands/audient/iD14mkⅡ/function_01.jpg"
                    alt="作業に没頭できるスピーカー出力"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">①</span>
                  <h3 className="text-xl font-bold text-gray-900">作業に没頭できるスピーカー出力</h3>
                </div>
          
                <p className="text-gray-700 leading-relaxed">
                  iD14mkⅡは4つの出力を備え、2セットのスピーカーを接続してミックスを比べることが可能です。また、ライン出力から外部ヘッドフォン・アンプへ信号を分割し、アーティストへのモニター・ミックスとして使用することもできます。
                </p>
              </div>

              {/* 2. デュアル・ヘッドフォン出力 */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <Image
                    src="/images/brands/audient/iD14mkⅡ/function_02.jpg"
                    alt="デュアル・ヘッドフォン出力"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">②</span>
                  <h3 className="text-xl font-bold text-gray-900">デュアル・ヘッドフォン出力</h3>
                </div>
                <p className="text-gray-500 text-sm mb-2">機能紹介</p>
                <p className="text-gray-700 leading-relaxed">
                  ステレオ・ミニ・ジャックと標準ジャックに、600Ωのハイ・インピーダンス・ヘッドフォンを駆動することができる、強力なディスクリート高電流型ヘッドフォン・アンプを搭載しています。ヘッドフォンに制約されずに、あらゆるレコーディングにおいて高い音質でのモニタリングが可能です。
                </p>
              </div>

              {/* 3. ADAT/SPDIFで広がる拡張性 */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <Image
                    src="/images/brands/audient/iD14mkⅡ/function_03.jpg"
                    alt="ADAT/SPDIFで広がる拡張性"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">③</span>
                  <h3 className="text-xl font-bold text-gray-900">ADAT/SPDIFで広がる拡張性</h3>
                </div>
                <p className="text-gray-500 text-sm mb-2">機能紹介</p>
                <p className="text-gray-700 leading-relaxed">
                  iD14mkⅡは、ADATとSPDIF両方のデジタル入力を備えています。それらのデジタル入力からマイクプリを追加し、8マイクchの拡張入力を加えたより大きな録音セッションが可能です。
                </p>
              </div>

              {/* 4. JFET クラスA/ディスクリート設計の楽器用入力 */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <Image
                    src="/images/brands/audient/iD14mkⅡ/function_04.jpg"
                    alt="JFET クラスA/ディスクリート設計の楽器用入力"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">④</span>
                  <h3 className="text-xl font-bold text-gray-900">JFET クラスA/ディスクリート設計の楽器用入力</h3>
                </div>
                <p className="text-gray-500 text-sm mb-2">機能紹介</p>
                <p className="text-gray-700 leading-relaxed">
                  入力端子は、JFETを使用したクラス A /ディスクリート・ デザインの楽器用入力です。クラシックな真空管アンプの入力部分をベースにデザインされたこのD.I入力は、リッチなハーモニクスを含んだサウンドを実現します。また、D.I入力はマイク・プリアンプ入力と独立したチャンネルなので、例えば歌いながらギターを弾き、同時に録音する事も可能です。
                </p>
              </div>

              {/* 5. 超ロー・レイテンシーを実現したモニターミックス */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <Image
                    src="/images/brands/audient/iD14mkⅡ/function_05.jpg"
                    alt="超ロー・レイテンシーを実現したモニターミックス"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">⑤</span>
                  <h3 className="text-xl font-bold text-gray-900">超ロー・レイテンシーを実現したモニターミックス</h3>
                </div>
                <p className="text-gray-500 text-sm mb-2">機能紹介</p>
                <p className="text-gray-700 leading-relaxed">
                  iD14mkⅡのMonitor Mixなら超ローレイテンシーでの録音が可能です。入力とコンピュータオーディオの最適なバランスで、遅れを感じることなくスムーズなレコーディングが実現できます。
                </p>
              </div>

              {/* 6. トークバック機能 */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <Image
                    src="/images/brands/audient/iD14mkⅡ/function_06.jpg"
                    alt="トークバック機能"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">⑥</span>
                  <h3 className="text-xl font-bold text-gray-900">トークバック機能</h3>
                </div>
                <p className="text-gray-500 text-sm mb-2">機能紹介</p>
                <p className="text-gray-700 leading-relaxed">
                  iD14mkⅡ専用のトークバック機能を使えば、コンピューターの内蔵マイクやUSBマイクなどをトークバックマイクとして使用できます。トークバック用に本機のマイクプリを犠牲にする必要がありません。
                </p>
              </div>

              {/* 7. バーチャル・スクロール・ホイール */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <Image
                    src="/images/brands/audient/iD14mkⅡ/function_07.jpg"
                    alt="バーチャル・スクロール・ホイール"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">⑦</span>
                  <h3 className="text-xl font-bold text-gray-900">バーチャル・スクロール・ホイール</h3>
                </div>
                <p className="text-gray-500 text-sm mb-2">機能紹介</p>
                <p className="text-gray-700 leading-relaxed">
                  エンコーダーにスクロール・ホイール機能をアサインして、DAW のオートメーション等、様々な機能へのアクセスが可能になります。（動作、反応速度は各ソフトウェア・メーカーのスクロール・ホイールへの対応状況により異なります。）また、ファンクション（トークバックや位相反転等）のアサインボタンとしても利用できます。
                </p>
              </div>

              {/* 8. 高い堅牢性、頑丈なフルメタル・ボディを採用 */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <Image
                    src="/images/brands/audient/iD14mkⅡ/function_08.jpg"
                    alt="高い堅牢性、頑丈なフルメタル・ボディを採用"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">⑧</span>
                  <h3 className="text-xl font-bold text-gray-900">高い堅牢性、頑丈なフルメタル・ボディを採用</h3>
                </div>
                <p className="text-gray-500 text-sm mb-2">機能紹介</p>
                <p className="text-gray-700 leading-relaxed">
                  iD14mkⅡのボディは、コンパクトでスタイリッシュなだけでなく、頑丈なメタル素材を採用しており、そのプロクオリティのサウンドをどこへでも安心して持ち運べます。
                </p>
              </div>

              {/* 9. フリー・バンドル・ソフトウェア＆プラグイン */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <Image
                    src="/images/brands/audient/iD14mkⅡ/function_09.jpg"
                    alt="フリー・バンドル・ソフトウェア＆プラグイン"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">⑨</span>
                  <h3 className="text-xl font-bold text-gray-900">フリー・バンドル・ソフトウェア＆プラグイン</h3>
                </div>
                <p className="text-gray-500 text-sm mb-2">機能紹介</p>
                <p className="text-gray-700 leading-relaxed">
                  Cubase LE や、iOS 用 Cubasis LE などのクリエイティブなソフトウェアの無料でダウンロードできます。世界中で使われている人気のソフトウェアやプラグインを使えば、iDを買ったその日からすぐにレコーディングを楽しめます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Software Section */}
      <section id="software" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">iD Mixer App</h2>
            <p className="text-xl text-gray-600 mb-4">専用ミキサー・ソフトウェア</p>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full bg-purple-600" />
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Auto-play Video */}
            <div className="text-center mb-12">
              <div className="max-w-5xl mx-auto">
                <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
                  <video
                    src="/images/brands/audient/iD14mkⅡ/software_01.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover pointer-events-none"
                    controls={false}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Section: Video and Description */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
              {/* Left: Video */}
              <div>
                <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg mb-4">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/DGhMzqxZNBU"
                    title="iD14mkⅡ Software Overview"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <p className="text-sm text-gray-600 text-center mb-2">前往平台观看: YouTube</p>
                <p className="text-sm text-gray-500 text-center">※ 日本語の自動翻訳機能がご利用頂けます。</p>
              </div>

              {/* Right: Description and Download */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">超ローレイテンシーを実現するミキサー・アプリ</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  iDミキサー・アプリケーションは、入力チャンネル、マスターセクション、モニターコントロール、３つのセクションから構成されており、iD14mkⅡの各操作がコンピューターから行えます。（※各セクション、各機能の役割は、ユーザーマニュアルをご覧ください。）
                </p>
                <p className="text-gray-700 mb-6">
                  iD Mixer Appは、Audient WEBサイトからダウンロードして頂けます。
                </p>
                <a
                  href="https://audient.com/products/audio-interfaces/id14mk2/downloads/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  <Download className="w-5 h-5" />
                  ダウンロードはこちら
                </a>
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
                    href="https://audient.com/products/audio-interfaces/id14mk2/downloads/"
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
                      <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">①</span>
                      <span className="font-medium text-gray-900 text-left">iD14を接続するとトラックパッドが使えません</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq1 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq1 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4">
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          iD14はスクロールコントロール（Scroll Control）機能があるため、コンピューターがiD14をマウスと間違えて認識する可能性があります。Macでこの問題が起こった際には、システム環境設定{'>'}アクセシビリティ{'>'}マウス/トラックパッドから「マウスまたはワイヤレストラックパッドがあるときは内臓トラックパッドを無視」を選ぶことで解決できます。
                        </p>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-center">
                          <Image
                            src="/images/brands/audient/iD14mkⅡ/Q&A_01.png"
                            alt="macOS Accessibility Settings"
                            width={800}
                            height={500}
                            className="rounded-lg w-full h-auto"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          Windowsの場合は、設定{'>'} デバイス {'>'}タッチパッドへ行き、以下のスクリーンショットで示している通りに解決します。
                        </p>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-center">
                          <Image
                            src="/images/brands/audient/iD14mkⅡ/Q&A_02.png"
                            alt="Windows Touchpad Settings"
                            width={800}
                            height={500}
                            className="rounded-lg w-full h-auto"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          異なるタイプのタッチパッドは、コントロールパネル {'>'} ハードウェアとサウンド {'>'} マウス {'>'} デバイス で以下のスクリーンショットのように解決します。
                        </p>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-center">
                          <Image
                            src="/images/brands/audient/iD14mkⅡ/Q&A_03.png"
                            alt="Windows Control Panel - Hardware and Sound"
                            width={800}
                            height={500}
                            className="rounded-lg w-full h-auto"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-center">
                          <Image
                            src="/images/brands/audient/iD14mkⅡ/Q&A_04.png"
                            alt="Mouse Properties - Synaptics"
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
                      <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">③</span>
                      <span className="font-medium text-gray-900 text-left">なぜiD Mixerアプリが表示されないのですか？</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq3 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq3 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4">
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          非常に稀ではありますが、Windows用のドライバーインストールが途中で止まってしまう症状が報告されています。インストーラーの起動前にiD14がコンピューターに接続されていると、一般的なUSBオーディオドライバーをiD14用にインストールしてしまい、iDインストーラーを正しくインストールできません。
                        </p>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-center">
                          <Image
                            src="/images/brands/audient/iD14mkⅡ/Q&A_06.jpg"
                            alt="Audient USB Audio Driver Installation"
                            width={800}
                            height={500}
                            className="rounded-lg w-full h-auto"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          解決するには、コンピューターを再起動して、iD14をコンピューターに接続せずに、インストールします。これで解決しない場合、管理者としてインストーラーを起動してください。この時、管理者アカウントにログインしていることを確認し、インストーラーファイルを右クリックして「管理者として実行」します。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          それでも解決できない場合は、セーフモードにして他のタスクを止めます。セーフモードについては以下をご参照ください。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          <a
                            href="https://support.microsoft.com/en-gb/help/12376/windows-10-start-your-pc-in-safe-mode"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline"
                          >
                            https://support.microsoft.com/en-gb/help/12376/windows-10-start-your-pc-in-safe-mode
                          </a>
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* FAQ Item 4 */}
                <div className="bg-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq4")}
                    className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-400 transition-colors rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">④</span>
                      <span className="font-medium text-gray-900 text-left">スクロールコントロール（ScrollControl）はどう設定すれば良いですか？</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq4 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq4 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4">
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          iDボタンで、スクリーンショットのようにスクロールコントロールが選択されていることを確認してください。
                        </p>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-center">
                          <Image
                            src="/images/brands/audient/iD14mkⅡ/Q&A_09.png"
                            alt="ScrollControl Settings"
                            width={800}
                            height={500}
                            className="rounded-lg w-full h-auto"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          この設定で、プラグイン、DAWフェーダー、webページ、iTunesライブラリーが操作できます。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          コンピューターによってベロシティコントロールに反応するため、エンコーダーの操作スピードによって、変更値が劇的に変わる場合があります。ゆっくり回すと変更は小さくなります。反応はそれぞれのソフトウェアによっても異なります。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          デモビデオをご覧ください。
                        </p>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-center">
                          <Image
                            src="/images/brands/audient/iD14mkⅡ/Q&A_10.png"
                            alt="ScrollControl Demo"
                            width={800}
                            height={500}
                            className="rounded-lg w-full h-auto"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-center">
                          <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg w-full max-w-2xl">
                            <iframe
                              width="100%"
                              height="100%"
                              src="https://www.youtube.com/embed/YyQnOpUhbKA"
                              title="Audient - ScrollControl"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full"
                            />
                          </div>
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
                      <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">③</span>
                      <span className="font-medium text-gray-900 text-left">iD14のマイクプリをバイパスする方法を教えて下さい。</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq5 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq5 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4">
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          iD14のマイクプリはバイパスできません。iD22にはバランスインサートがありますが、iD14にはありません。もし、iD14に外部マイクプリを使用したければ、ADATまたはS/PDIFのデジタル出力があるマイクプリを使用してください。
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* FAQ Item 6 */}
                <div className="bg-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq6")}
                    className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-400 transition-colors rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">③</span>
                      <span className="font-medium text-gray-900 text-left">Windows：マルチアプリケーションから同時にオーディオが聴けません
                      </span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq6 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq6 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4">
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          ご使用のDAWアプリが、iD14のサンプルレートを固定してしまい、インターフェースから他のソフトでオーディオが出力できなくなることがあります。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          このような場合、お使いの（システムの）入出力とソフトウェアのサンプルレートを統一してください。以下の手順をご確認ください。
                        </p>
                      </div>
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          1. ［コントロールパネル］{'>'}［サウンド］{'>'}［録音］{'>'}［iD14］を右クリック{'>'}［プロパティ］{'>'}［詳細］に入ってください。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          2. ドロップダウンに表示されている Bitの深さ、サンプルレート をメモで控え、［排他モード］ボックスのチェックを全て外してください。
                        </p>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-center">
                          <Image
                            src="/images/brands/audient/iD14mkⅡ/Q&A_05.png"
                            alt="Windows Sound Properties - Recording"
                            width={800}
                            height={500}
                            className="rounded-lg w-full h-auto"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          3. ［コントロールパネル］{'>'}［サウンド］{'>'}［再生］{'>'}［iD14］を右クリック{'>'}［プロパティ］{'>'}［詳細］に入ってください。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          4. ドロップダウンメニューに表示されている Bitの深さ、サンプルレート がステップ2で控えたものと一致しているか確認し、［排他モード］ボックスのチェックを全て外してください。もしドロップダウンに表示されているものが違う場合は同じものを選択してください。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          5. オーディオソフトウェアで使用されるBitの深さ、サンプルレートも同じものかもご確認ください。
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* FAQ Item 7 */}
                <div className="bg-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq7")}
                    className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-400 transition-colors rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">③</span>
                      <span className="font-medium text-gray-900 text-left">外部デジタル機器からの信号に関するトラブルについて                 </span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq7 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq7 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4">
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          外部デジタル機器から信号を受けDAWに入力する際には、以下の点に注意してください。
                        </p>
                      </div>
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          ● 両機器の電源は入っていますか？
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          ● 図のようにクロックソースとそのステータスをチェックしてください。
                        </p>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-center">
                          <Image
                            src="/images/brands/audient/iD14mkⅡ/Q&A_07.png"
                            alt="Clock Source and Status"
                            width={800}
                            height={500}
                            className="rounded-lg w-full h-auto"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          他のデジタル機器とiD14接続して使用する場合は、iD14はスレーブになります。iD14はオプティカル入力からクロックソースを受ける必要があります。この際、Status LEDがグリーンに点灯している時は、接続が正常であることを表しています。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          このLED表示がアンバーの場合は、外部デジタル機器またはオプティカルケーブルに問題があります。 このLEDがレッドの場合は、クロックソースがiD14に届いていないことを示し、外部デジタル機器またはオプティカルケーブルの問題が考えられます。外部マイクプリのデジタルアウトからiD14のデジタルイン接続されているケーブルをチェックしてください。また、外部マイクプリのデジタルアウトのオプティカルポートが赤く光っているかチェックしてください。確認後、接続したケーブルの先端が赤く光っているかもチェックしてください。
                        </p>
                      </div>
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          ● iD14の設定はADATまたはS/PDIFになっていますか？
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          システムパネルで外部機器からのフォーマットを確認してください。（参考図）
                        </p>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-center">
                          <Image
                            src="/images/brands/audient/iD14mkⅡ/Q&A_08.png"
                            alt="Digital Input Format"
                            width={800}
                            height={500}
                            className="rounded-lg w-full h-auto"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          ● 外部機器に信号は入力されていますか？
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          念のために外部機器の動作もチェックしましょう。
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* FAQ Item 8 */}
                <div className="bg-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq8")}
                    className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-400 transition-colors rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">③</span>
                      <span className="font-medium text-gray-900 text-left">サンプルレートを変更するとなぜクリックノイズが発生するのですか？
                      </span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq8 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq8 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4">
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          これは正常な反応です。サンプルレートを変更すると、新たなサンプルレートへDACが再同期するために起こります。クリックノイズはあなたのモニターシステムに障害を与えるほど大きくないはずです。ただし、これを変更する際にはモニタースピーカーをオフにすることをお勧めします。もし、常時使うサンプルレートが決まっているのであれば、デフォルトレートを設定しましょう。
                        </p>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-gray-900 font-bold text-lg">PCの場合：</h4>
                        <p className="text-gray-700 leading-relaxed">
                          iD14がコンピューターのサウンドソースに選ばれていることを確認してください。システムトレイのスピーカーアイコンを右クリックすると、スピーカーのイメージが出てきます。サウンドカードのメニューで"Advanced"で使用中のサンプルレートをデフォルトに設定します。
                        </p>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-gray-900 font-bold text-lg">Macの場合：</h4>
                        <p className="text-gray-700 leading-relaxed">
                          iD14がコンピューターのサウンドソースに選ばれていることを確認して下さい。"Audio MIDI Setup"開き、Show Audio Windowを選んでサンプルレートを確認します。
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* FAQ Item 9 - トークバックセットアップ */}
                <div className="bg-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq9")}
                    className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-400 transition-colors rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">③</span>
                      <span className="font-medium text-gray-900 text-left">USBバスパワーは、どのくらいの電力量が必要ですか？</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq9 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq9 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4">
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          iD4mkⅡ & iD14mkⅡ 両機種とも、正常動作にはUSB3.0スペックの5VDC/900mAが必要です。この電源が供給されると、ファンタム電源もフル+48Vがマイクロフォンに供給され、フルレンジのパフォーマンスが可能になります。ヘッドフォン用DACも最大レベルで動作します。また、USB-C接続から5VDC/1.5Aが供給されると、ハイボルテージ・モードに入ります。両機ともこのモードに入るとアナログ回路電圧が昇圧され、ヘッドフォン出力レベルなどが上が上がります。
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* FAQ Item 10 - ADATセットアップ */}
                <div className="bg-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq10")}
                    className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-400 transition-colors rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">③</span>
                      <span className="font-medium text-gray-900 text-left">Cubasis LE3とiPhone / iPadを組み合わせて使用できますか？</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq10 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq10 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4">
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          現在、iPhone / iPadとCubasis LE3に対応しているのは、evo4、iD4、iD4mkⅡの３機種のみです。
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
                  {/* マイク・プリアンプ */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">マイク・プリアンプ</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>ゲインレンジ： 58dB</p>
                      <p>フルスケールレベル：12dBu = 0dBFS</p>
                      <p>MIC 最大入力レベル：12dBu</p>
                      <p>最大入力レベル： 21dBu</p>
                      <p>入力インピーダンス（Mic）: 2.8k</p>
                      <p>入力インピーダンス（Line）: &gt;8k</p>
                      <p>THD+N @ 0dBu: 0.00170%</p>
                      <p>THD+N @ 0dBu 最大ゲイン: &lt;0.04%</p>
                      <p>SNR : 101dBu （A-特性負荷）</p>
                      <p>EIN : 129dB （A-特性負荷）</p>
                      <p>CMRR @ 1k: &gt;75dB</p>
                      <p>周波数特性 – 最小ゲイン ±0.5dB 10Hz to 40kHz</p>
                      <p>XLR COMBI FEMALE : Pin 2 （Hot）、Pin 3 （Cold） &amp; Pin 1 （シールド）</p>
                      <p>1/4"TRS ジャック：チップ（Hot）、リング（Cold）、スリーブ（シールド）</p>
                    </div>
                  </div>

                  {/* D.I /インストゥルメント入力 */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">D.I /インストゥルメント入力</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>ゲインレンジ： 40dB</p>
                      <p>フルスケールレベル：12dBu = 0dBFS</p>
                      <p>THD+N @ 0dBu: 0.1%</p>
                      <p>SNR：100dBu （A-特性負荷）</p>
                      <p>周波数特性 – 最小ゲイン ±0.5dB 10Hz to 20kHz</p>
                      <p>1/4"TS ジャック：チップ（ホット）、スリーブ（シールド）</p>
                    </div>
                  </div>

                  {/* デジタル入力 */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">デジタル入力</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>8-チャンネル ADAT：44.1kHz〜48kHz</p>
                      <p>4-チャンネル ADAT：88.2kHz〜96kHz SMUX</p>
                      <p>STEREO S/PDIF / TOSLINK: 44.1kHz to 96.0kHz（Stereo）</p>
                    </div>
                  </div>

                  {/* ADコンバーター */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">ADコンバーター</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>THD+N @ -1dBFS：0.001%</p>
                      <p>ダイナミックレンジ：120dB（A-特性負荷）</p>
                      <p>CORR：&gt;80dB</p>
                      <p>周波数特性：±0.5dB 10Hz to 40kHz</p>
                    </div>
                  </div>

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

                  {/* ヘッドホン出力 */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">ヘッドホン出力（100k負荷で測定）</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>フルスケールレベル：18.5dBu = 0dBFS</p>
                      <p>THD+N @ -1dBFS：0.0009%</p>
                      <p>ダイナミックレンジ：125.5dB （A-特性負荷）</p>
                      <p>クロストーク： &gt;116dB</p>
                      <p>周波数特性： ±0.25dB 10Hz to 40kHz</p>
                      <p>最大レベル @ 30Ω：2.59V Peak, 1.827V RMS, 223mW</p>
                      <p>最大レベル @ 62Ω：4.18V Peak, 2.95V RMS, 280mW</p>
                      <p>最大レベル @ 600Ω：7.72V Peak, 5.46V RMS, 100mW</p>
                      <p>1/4"TRS ジャック：チップ（L）、リング（R）、スリーブ（シールド）</p>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* USB-C ハイスピード（バスパワー） */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">USB-C ハイスピード（バスパワー）</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>最低位スペック： 0.9A @ 5V &gt;=USB 3.0 Port</p>
                      <p>最高位スペック： 1.5A @ 5V</p>
                      <p>入力チャンネル数： 2 （2 アナログ）</p>
                      <p>出力チャンネル数：2 （2 アナログ）</p>
                      <p className="mt-2 font-semibold">DSP ミキサーレイテンシー：</p>
                      <p>　44.1kHz 0.65mS</p>
                      <p>　48.0kHz 0.6mS</p>
                      <p>　88.2kHz 0.33mS</p>
                      <p>　96.0kHz 0.31mS</p>
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

