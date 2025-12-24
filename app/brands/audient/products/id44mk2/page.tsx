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

export default function Id44mk2Page() {
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
    downloadManual("audient", "id44mk2")
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
          src="/images/brands/audient/iD44mkⅡ/hero.jpg"
          alt="iD44mk II"
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
                <p className="text-2xl font-bold text-gray-900">iD44mk II</p>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-2">10in / 14out</h2>
              <h3 className="text-2xl font-bold text-gray-700 mb-6">USB オーディオ・インターフェイス</h3>
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
                    src="https://www.youtube.com/embed/drdyFNdVx3w"
                    title="AUDIENT iD44mk II - The Features"
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Your recordings, made better.</h3>

                  <div className="prose max-w-none mb-6">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      プロデューサーやエンジニアのために作られたオーディオ・インターフェース、iD24の登場です。iD24は、2つのAudientコンソール・マイクプリに加え、高性能コンバーターと直感的なレイアウトを備え、驚異的なオーディオ・パフォーマンスと使いやすさを同時に届けてくれます。プロフェッショナル・コンソールのようなバランス・インサート、ADATの拡張入出力、カスタマイズ可能なモニターコントロールなど、プロが必要とする機能とスタジオクラスのサウンドをこれまで以上に簡単に手に入れることができます。
                    </p>
                  </div>

                  {/* Feature List */}
                  <div className="space-y-2 mb-4">
                    {[
                      "2 x クラスA Audient コンソール・マイク・プリアンプ搭載",
                      "クラス最高峰のAD/DAコンバーター",
                      "1 x ディスクリートJFETインストルメント入力",
                      "メイン＆オルタナティブ・スピーカー出力",
                      "独立したデュアル・ヘッドフォン出力 x 1",
                      "1 x ADAT入出力",
                      "2 x バランスインサート",
                      "超低レイテンシーDSPミキサー",
                      "オーディオ・ループバック機能",
                      "スクロール・コントロール",
                      "3 x ユーザー設定が可能なファンクションキー",
                      "専用の Dim＆Cutコントロール",
                      "+48V、パッド、HPFスイッチ",
                      "24-bit/96kHz",
                      "ワードクロック出力",
                      "オールメタルデザイン",
                      "ARC フリー・バンドル・ソフトウェア＆プラグイン",
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

          {/* Section 1: Top Section - Two Parts */}
          <div className="mb-20 space-y-20">
            {/* Part 1: プロ仕様のサウンドを誰にでも */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Product Image */}
              <div className="flex justify-center">
                <Image
                  src="/images/brands/audient/iD44mkⅡ/concept_01.jpg"
                  alt="Class-A Audientコンソール マイク・プリアンプ"
                  width={600}
                  height={600}
                  className="w-full h-auto rounded-xl"
                />
              </div>
              
              {/* Right: Text Content */}
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">プロ仕様のサウンドを誰にでも</h4>
                <h5 className="text-xl font-bold text-white mb-6">Class-A Audientコンソール マイク・プリアンプ</h5>
                <p className="text-gray-400 leading-relaxed">
                  すべてのiDインターフェイスは、Audient社が誇る名機ASP8024-HEレコーディングコンソールと同じディスクリート回路設計のマイクプリアンプを備えています。ノイズと歪みを極限まで抑え、音にクラシックなアナログサウンドの暖かみをもたらします。それら4つのマイク・プリが、プロフェッショナルスタジオと遜色ないサウンドクオリティをお届けします。
                </p>
              </div>
            </div>

            {/* Part 2: この上なくクリアな音像を正確にキャプチャー */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text Content */}
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">この上なくクリアな音像を正確にキャプチャー</h4>
                <h5 className="text-xl font-bold text-white mb-6">クラス最高品位のコンバーター</h5>
                <p className="text-gray-400 leading-relaxed mb-6">
                  驚異的な126dBものダイナミックレンジを実現した最高品位コンバーターは、原音が持つ自然な響きを損なうことなく、細かなニュアンスや音像まで捉えることができるため、いつものミックス作業の精度がグレードアップします。録音を再生した瞬間に、驚きの明瞭さでネクストレベルのDTMを体験できます。
                </p>
                <p className="text-gray-400 leading-relaxed mb-6">
                  iD44mkⅡのさらに向上したADCパフォーマンスは、ADCのTHD+N値を9dBも大幅に改善し、ノイズや歪みも少なく、ピュアでクリーンなオーディオを提供します。
                </p>
                
              </div>

              {/* Right: Product Image */}
              <div className="flex justify-center">
                <Image
                  src="/images/brands/audient/iD44mkⅡ/concept_02.svg"
                  alt="クラス最高品位のコンバーター"
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

          {/* Section 5: 高い拡張性が広げる音の可能性 */}
          <div className="mb-20 border-t border-gray-700 pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <Image
                  src="/images/brands/audient/iD44mkⅡ/concept_03.jpg"
                  alt="2系統のADAT入出力"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-xl"
                />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">高い拡張性が広げる音の可能性</h4>
                <h5 className="text-xl font-bold text-white mb-6">2系統のADAT入出力</h5>
                <p className="text-gray-400 leading-relaxed">
                  iD44mkⅡなら、あなたのスタジオをもっと複雑で大きなアンサンブルもレコーディングできる環境に再構築することができます。2つのオプティカル入出力を搭載したiD44mkⅡには、豊富な拡張オプションが備わっています。ADATとSPDIFの両方をサポートし、最大16チャンネルのマイクプリアンプを追加してI/Oが強化できます。
                </p>
              </div>
            </div>
          </div>

          {/* Section 6: 外部ハードウェアも接続可能 */}
          <div className="mb-20 border-t border-gray-700 pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left: Image 04 */}
              <div className="flex justify-center">
                <Image
                  src="/images/brands/audient/iD44mkⅡ/concept_04.jpg"
                  alt="2系統のバランスインサート"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-xl"
                />
              </div>
              
              {/* Right: Text and Image 05 */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-2xl font-bold text-white mb-4">外部ハードウェアも接続可能</h4>
                  <h5 className="text-xl font-bold text-white mb-6">2系統のバランスインサート</h5>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    お気に入りのシグナルプロセッサーを接続して、理想的なシグナルチェーンを作ることができます。クリーンな信号経路を備えたADコンバーター用のライン入力として２つのリターン入力を使用できるため、外部機器からの信号をこの１台でコントロールすることができます。
                  </p>
                </div>
                
                {/* Image 05 below text */}
                <div className="flex justify-center">
                  <Image
                    src="/images/brands/audient/iD44mkⅡ/concept_05.svg"
                    alt="バランスインサート詳細"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 7: ループバック機能 */}
          <div className="mb-20 border-t border-gray-700 pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Image 06 */}
              <div className="flex justify-center">
                <Image
                  src="/images/brands/audient/iD44mkⅡ/concept_06.svg"
                  alt="ループバック機能"
                  width={600}
                  height={500}
                  className="w-full h-auto rounded-xl"
                />
              </div>
              
              {/* Right: Text and Image 07 */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-2xl font-bold text-white mb-4">ループバック機能</h4>
                  <h5 className="text-xl font-bold text-white mb-6">無限の可能性をサポート</h5>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    新たに搭載されたループバック機能は、複数のオーディオソースを同時に制御できます。コンピューター上の複数のアプリケーションからの再生とマイク入力信号を同時に録音して、ストリーミングソフトに送信するオーディオをカスタマイズできます。この機能はコンテンツクリエイター、ポッドキャスター、ストリーマーに最適です。
                  </p>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    ループバック機能はソフトウェアミキサー上で操作します。あらゆる実用的なシナリオに合わせて6つの異なるオプションからループバックソースが選択できます。
                  </p>
                </div>
                
                {/* Image 07 below text */}
                <div className="flex justify-center">
                  <Image
                    src="/images/brands/audient/iD44mkⅡ/concept_07.svg"
                    alt="ループバック機能詳細"
                    width={600}
                    height={400}
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
                  src="https://www.youtube.com/embed/hyaA8FbSfdY"
                  title="AUDIENT iD44mk II Demo 1"
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
                  src="https://www.youtube.com/embed/dsFUxHisoaU"
                  title="AUDIENT iD44mk II Demo 2"
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
                  src="https://www.youtube.com/embed/D6vUOqkpTUg"
                  title="AUDIENT iD44mk II Demo 3"
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
                  src="https://www.youtube.com/embed/DGhMzqxZNBU"
                  title="AUDIENT iD44mk II Demo 4"
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
                  src="https://www.youtube.com/embed/ia5cOfym1Z0"
                  title="AUDIENT iD44mk II Demo 5"
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
              {/* 1. 2系統のディスクリートJFET楽器入力 */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <Image
                    src="/images/brands/audient/iD44mkⅡ/function_01.jpg"
                    alt="2系統のディスクリートJFET楽器入力"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">①</span>
                  <h3 className="text-xl font-bold text-gray-900">2系統のディスクリートJFET楽器入力</h3>
                </div>
                <p className="text-gray-500 text-sm mb-2">機能紹介</p>
                <p className="text-gray-700 font-semibold mb-2">プラグインするだけで最適な音色に</p>
                <p className="text-gray-700 leading-relaxed">
                  クラシックな真空管アンプの入力ステージを再現するように設計されたiD44mkⅡは、バランスのとれた豊かなサウンドをもたらす2つのJFETインストゥルメント入力を備えており、アンプシミュレーター無しでもギターやベースが自然で最適な音になるように設計されています。
                </p>
              </div>

              {/* 2. 豊富なスピーカー出力 */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <Image
                    src="/images/brands/audient/iD44mkⅡ/function_02.jpg"
                    alt="豊富なスピーカー出力"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">②</span>
                  <h3 className="text-xl font-bold text-gray-900">豊富なスピーカー出力</h3>
                </div>
                <p className="text-gray-500 text-sm mb-2">機能紹介</p>
                <p className="text-gray-700 font-semibold mb-2">コラボレーションが加速する</p>
                <p className="text-gray-700 leading-relaxed">
                  4系統の出力から2セットのスピーカーを接続してミックスが確認できます。また、オーディオをライン出力から外部のヘッドフォンアンプへ送り、アーティストにモニタリングさせることもできます。
                </p>
              </div>

              {/* 3. ヘッドフォン出力 */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <Image
                    src="/images/brands/audient/iD44mkⅡ/function_03.jpg"
                    alt="ヘッドフォン出力"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">③</span>
                  <h3 className="text-xl font-bold text-gray-900">ヘッドフォン出力</h3>
                </div>
                <p className="text-gray-500 text-sm mb-2">機能紹介</p>
                <p className="text-gray-700 leading-relaxed mb-2">
                  2つの独立ステレオヘッドフォンアンプを使えば、簡単に他のユーザーと録音をコラボレーションできます。双方のお使いになるヘッドフォンを正確に動作させるのに十分な出力を提供します。
                </p>
                <p className="text-gray-700 leading-relaxed">
                  ヘッドフォンアダプターを紛失した場合や、3つ目のヘッドフォンセットが必要な場合には、1/4インチジャックとミニジャックの両方を含むデュアルヘッドフォン出力端子で対応できます。
                </p>
              </div>

              {/* 4. コンソール・スタイルのモニター・コントロール */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <Image
                    src="/images/brands/audient/iD44mkⅡ/function_04.jpg"
                    alt="コンソール・スタイルのモニター・コントロール"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">④</span>
                  <h3 className="text-xl font-bold text-gray-900">コンソール・スタイルのモニター・コントロール</h3>
                </div>
                <p className="text-gray-500 text-sm mb-2">機能紹介</p>
                <p className="text-gray-700 font-semibold mb-2">高度な機能をボタン一つで</p>
                <p className="text-gray-700 leading-relaxed">
                  3つのプログラム可能なファンクションボタンで、さらに作業効率をスピードアップできます。スピーカーセレクト、モノラル、位相切替、Cueミックスのモニターコントロールなどの高度な機能をFボタンに割り当て、レコーディングやミックスの生産性を高めます。
                </p>
              </div>

              {/* 5. 超ロー・レイテンシー */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <Image
                    src="/images/brands/audient/iD44mkⅡ/function_05.jpg"
                    alt="超ロー・レイテンシー"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">⑤</span>
                  <h3 className="text-xl font-bold text-gray-900">超ロー・レイテンシー</h3>
                </div>
                <p className="text-gray-500 text-sm mb-2">機能紹介</p>
                <p className="text-gray-700 font-semibold mb-2">優れたソフトウェアミキサー</p>
                <p className="text-gray-700 leading-relaxed">
                  iDミキサーは、ハードウェアをスタジオコンソールのように操作できるソフトウェアです。超ローレイテンシーでダイレクトモニタリングを手軽に実現し、最大4つのステレオアーティストCueミックスの作成、チャンネルに名前を付けるカスタマイズ、レイアウトプリセットの保存、ハードウェア機能ボタンの割り当て、高度なルーティングなど、スタジオコンソールレベルの設定が簡単です。
                </p>
              </div>

              {/* 6. 手軽なトークバック機能 */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <Image
                    src="/images/brands/audient/iD44mkⅡ/function_06.jpg"
                    alt="手軽なトークバック機能"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">⑥</span>
                  <h3 className="text-xl font-bold text-gray-900">手軽なトークバック機能</h3>
                </div>
                <p className="text-gray-500 text-sm mb-2">機能紹介</p>
                <p className="text-gray-700 font-semibold mb-2">イノベーションがコミュニケーションを変えていく</p>
                <p className="text-gray-700 leading-relaxed">
                  iD44mkⅡ独自のトークバック技術により、コンピューターに接続されているあらゆる（内蔵マイクやUSBマイクなどから）オーディオソースをトークバックマイクとして使用でき、マイクプリアンプを占領することはありません。
                </p>
              </div>

              {/* 7. バーチャル・スクロール・ホイール */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <Image
                    src="/images/brands/audient/iD44mkⅡ/function_07.jpg"
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
                <p className="text-gray-700 font-semibold mb-2">直感的に使えるシンプルな操作性</p>
                <p className="text-gray-700 leading-relaxed">
                  ボリュームノブをバーチャルのスクロールホイールとして使えます。あらゆるパラメーターの制御に使うことができ、ハードウェアのノブの操作と同様に、DAWやプラグインの各パラメーターのコントロールが可能です。各種設定やフェーダー調整、オートメーションに書き込む作業などを直感的に行えます。
                </p>
              </div>

              {/* 8. 高い堅牢性、頑丈なフルメタル・ボディを採用 */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <Image
                    src="/images/brands/audient/iD44mkⅡ/function_08.jpg"
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
                <p className="text-gray-700 font-semibold mb-2">長期間の使用に耐える堅牢性</p>
                <p className="text-gray-700 leading-relaxed">
                  手作業によって仕上げられた美しいノブ類と、選び抜かれたハイグレードな部品、そしてフルメタル仕様の筐体を持つiD44mkⅡは、過酷なプロの現場でも耐えられる堅牢性と上質でスタイリッシュなデザインを兼ね備えています。
                </p>
              </div>

              {/* 9. USB2.0にも対応 */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <Image
                    src="/images/brands/audient/iD44mkⅡ/function_09.jpg"
                    alt="USB2.0にも対応"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">⑨</span>
                  <h3 className="text-xl font-bold text-gray-900">USB2.0にも対応</h3>
                </div>
                <p className="text-gray-500 text-sm mb-2">機能紹介</p>
                <p className="text-gray-700 font-semibold mb-2">汎用性のある接続が可能</p>
                <p className="text-gray-700 leading-relaxed">
                  iD44mkⅡは、標準の USB Type-Aケーブルと USB Type-C ケーブルの両方が付属しており、USB 2.0 以上をサポートする USB 互換のある Mac または PC に接続できます。
                </p>
              </div>

              {/* 10. ARC フリー・バンドル・ソフトウェア＆プラグイン */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <Image
                    src="/images/brands/audient/iD44mkⅡ/function_10.jpg"
                    alt="ARC フリー・バンドル・ソフトウェア＆プラグイン"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">⑩</span>
                  <h3 className="text-xl font-bold text-gray-900">ARC フリー・バンドル・ソフトウェア＆プラグイン</h3>
                </div>
                <p className="text-gray-500 text-sm mb-2">機能紹介</p>
                <p className="text-gray-700 font-semibold mb-2">手にしたその日から使える</p>
                <p className="text-gray-700 leading-relaxed">
                  Cubase LEなど定番のクリエイティブソフトウェアに加え、業界水準クラスのプラグインやバーチャル音源をバンドルしています。iD44mkIIを手に入れたその日からすぐにでもレコーディング作業を開始できるため、アイデアを逃すことなくクリエイティブに没頭できます。
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
                    src="/images/brands/audient/iD44mkⅡ/software_01.mp4"
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
                    title="iD44mk II Software Overview"
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
                  iDミキサー・アプリケーションは、入力チャンネル、マスターセクション、モニターコントロール、３つのセクションから構成されており、iD44mkⅡの各操作がコンピューターから行えます。（※各セクション、各機能の役割は、ユーザーマニュアルをご覧ください。）
                </p>
                <p className="text-gray-700 mb-6">
                  iD Mixer Appは、Audient WEBサイトからダウンロードして頂けます。
                </p>
                <a
                  href="https://audient.com/products/audio-interfaces/id44mk2/downloads/"
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
                    src="/images/brands/audient/iD44mkⅡ/software_02.jpg"
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
                    href="https://audient.com/products/audio-interfaces/id44mk2/downloads/"
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
                      <span className="font-medium text-gray-900 text-left">ヘッドフォン出力のアサインの仕方を教えてください。</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq1 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq1 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4">
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          iD44には、さまざまな出力に割り当てできる2つのヘッドフォン出力があります。
                          この仕様は、アーティストのミックスや、複数種のヘッドフォンでミックスをチェックする場合などに使えます。特定のセットアップに関する詳細については、iD44ユーザーガイドを参照してください。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          ヘッドフォンポートを別の出力に割り当てるには、まずiD ミキサーを開きます。
                          ここで、["View"表示] &gt; ["Show System Panel"システム パネルの表示] に移動します。
                        </p>
                      </div>
                      <div className="space-y-4">
                        <p className="text-gray-900 font-bold text-lg">iD44</p>
                        <div className="flex justify-center">
                          <Image
                            src="/images/brands/audient/iD44mkⅡ/Q&A_01.png"
                            alt="iD Mixer View Menu"
                            width={800}
                            height={500}
                            className="rounded-lg w-full h-auto"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          次のスクリーンショット：ルーティングマトリックスを開いて、必要に応じてヘッドフォンを割り当てることができます。
                        </p>
                        <div className="flex justify-center">
                          <Image
                            src="/images/brands/audient/iD44mkⅡ/Q&A_02.png"
                            alt="Routing Matrix"
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
                      <span className="font-medium text-gray-900 text-left">ループバックをセットアップするにはどうすればよいですか？</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq3 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq3 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4">
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          ループバックは、iD44 MKIではなかった機能（ハードウェアがサポートしていないため、ループバックは使用できませんでした。） iD44 MKIIでのみ使用できます。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          設定方法は、JPユーザーマニュアルの42-43ページの「オーディオループバック」セクションをご覧ください。
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
                      <span className="font-medium text-gray-900 text-left">iDレンジの互換性</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq4 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq4 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4">
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          このセクションでは、ID レンジの互換性について詳しく説明し、互換性のあるシステムと要件を一覧表示します。 これに加えて、各製品の IOS とスタンドアロンの互換性についても説明します。
                        </p>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-gray-900 font-bold text-lg">iD44</h3>
                        <p className="text-gray-700 leading-relaxed">
                          2023年2月の時点では、iD MKI & MKII シリーズ全体が、以下のオペレーティング システムと互換性があります。
                        </p>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-gray-900 font-semibold text-md">macOS</h4>
                        <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
                          <li>macOS 10.13.6 (High Sierra)</li>
                          <li>macOS 10.14.X (Mojave)</li>
                          <li>macOS 10.15.X (Catalina)</li>
                          <li>macOS 11.1.x (Big Sur)</li>
                          <li>macOS 12.3.x (Monterey)</li>
                          <li>macOS 13.x (Ventura)</li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-gray-900 font-semibold text-md">Macの必要スペック</h4>
                        <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
                          <li>Intel CPU or Apple Silicon</li>
                          <li>1GB RAM 以上</li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-gray-900 font-semibold text-md">Windows</h4>
                        <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
                          <li>Windows 10</li>
                          <li>Windows 11</li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-gray-900 font-semibold text-md">PCの必要スペック</h4>
                        <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
                          <li>2006以降に生産されたPCまたはLaptop</li>
                          <li>Intel Core 2 @1.6Ghz, or AMD equivalent</li>
                          <li>1GB RAM 以上</li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          <strong>注意事項：</strong>最適な操作とセキュリティのために、使用しているオペレーティングシステムのバージョンが更新されていることの確認をお勧めします。これに加え、Audientサイトで入手可能な最新ドライバーの使用していることを常に確認してください。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          一部のIDモデルは、レガシードライバーで古いオペレーティングシステムをサポートしています。しかし、iD24 & iD44 MKIIは、Windows 7 & 8、Mac OS 10.10 Yosemite 以前ではサポートされていません。注意してください。
                        </p>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-gray-900 font-bold text-lg">iDスタンドアロン & IOSの互換性</h3>
                        <p className="text-gray-700 leading-relaxed">
                          以下の表は、iDレンジのスタンドアロンと IOS の互換性を示しています。
                        </p>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-center">
                          <Image
                            src="/images/brands/audient/iD44mkⅡ/Q&A_03.png"
                            alt="iD Range Compatibility Table"
                            width={800}
                            height={500}
                            className="rounded-lg w-full h-auto"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-gray-900 font-bold text-lg">iD44</h3>
                        <p className="text-gray-700 leading-relaxed">
                          一部の iOS アプリケーションで基本的な入出力のみ使用できる可能性がありますが、現在の IOSインフラストラクチャーでは利用できるID アプリケーションがないため、正しい動作を保証することはできません。 このため、iOS で使用するための互換性があるデバイスのみを使用することをお勧めします。
                        </p>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-center">
                          <Image
                            src="/images/brands/audient/iD44mkⅡ/Q&A_04.png"
                            alt="iD44 Compatibility"
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
                      <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">③</span>
                      <span className="font-medium text-gray-900 text-left">デジタルセットアップ</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq5 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq5 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4">
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          外部デジタル機を iD44に接続する場合、すべてのデバイスが互いに正しく同期して動作していることを確認することが重要です。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          これを確実にするには、セットアップ内デバイスの1つをマスタークロックとして設定する必要があります。他のデバイスはマスタークロック信号に同期を維持します。チェーン内に存在できるマスタークロックは1つだけです。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          マスタークロック信号は、光ケーブル（クロック信号がデジタル信号データに含まれます。）、または BNCクロックラインケーブルを介して送信されます。クロック信号は、デバイス出力→デバイス入力への接続を介して、一方向にのみ移動することに注意してください。
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-gray-900 font-bold text-lg">マスタークロックの選択</h4>
                        <p className="text-gray-700 leading-relaxed">
                          通常、マスターデバイスの選択は柔軟です。多くの場合、マスターとして設定するのに最適なデバイスは、コンピューターに接続されている（可能な場合）オーディオインターフェイスなどのデバイスです。このように、DAWでプロジェクトを開くと、オーディオインターフェイスがプロジェクトのサンプルレートに一致するように変更されるため、すべてのスレーブデバイスのサンプルレートが変更されます。ただし、これは使用するデバイスによって異なります。
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-gray-900 font-bold text-lg">iD44をマスタークロックにする</h4>
                        <p className="text-gray-700 leading-relaxed">
                          iD44をマスタークロックに設定すると、チェーン内の他のデバイスは、オプティカルポートまたはBNC ワードクロック出力のいずれかからクロックを供給できます。 1つのデバイスだけにクロッキングする場合は、光ポート経由のクロッキングが最も簡単なオプションです。TOSlinkケーブルを iD44のオプティカル出力と他のデジタル機のオプティカル入力に接続するだけで完了できます。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          次に、他のデバイスをクロックスレーブ機に設定します。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          複数のデバイスを使用している場合は、BNCワードクロック出力を使用し、Tコネクターでデバイスをデイジーチェーン接続することをお勧めします。チェーンの最後のデバイスは、クロック信号の反射を止めるために75オームのBNCコネクターでターミネートすることが重要です。これは、どのデバイスでも切り替え可能なオプションです。
                        </p>
                        <div className="flex justify-center">
                          <Image
                            src="/images/brands/audient/iD44mkⅡ/Q&A_09.png"
                            alt="iD44 clocked via the Optical Port"
                            width={800}
                            height={500}
                            className="rounded-lg w-full h-auto"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-gray-900 font-bold text-lg">iD44をスレーブにする</h4>
                        <p className="text-gray-700 leading-relaxed">
                          iD44は、外部マスタークロックのスレーブとして機能することもできます。 iD44は、オプティカル入力で外部クロック信号のみを受け入れることができます。BNCコネクターはクロック出力のみです。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          この場合、デバイスのオプティカル出力を iD44のオプティカル入力に接続するだけです。次に、iD ミキサーアプリで、クロックソースとして使用するオプティカル入力を選択します。また、外部デバイスの仕様により、入力をADAT または S/PDIFに設定する必要があります。
                        </p>
                        <div className="flex justify-center">
                          <Image
                            src="/images/brands/audient/iD44mkⅡ/Q&A_10.png"
                            alt="iD44 with Single BNC Connection"
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
                {/* FAQ Item 6 */}
                <div className="bg-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq6")}
                    className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-400 transition-colors rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">③</span>
                      <span className="font-medium text-gray-900 text-left">プリアンプをバイパスする方法を教えてください。</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq6 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq6 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4">
                      <div className="space-y-4">
                   
                        <p className="text-gray-700 leading-relaxed">
                          他のマイクプリアンプ、またはあなたが使用中の機材の出力を入力チャンネル１または２のインサートリターンに接続するだけで、iD24のマイクプリを簡単にバイパスできます。これは、マイクプリとライン入力段をバイパスして、ADCへの非常にクリーンなラインとして使えます。
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
                      <span className="font-medium text-gray-900 text-left">iD Mixer アプリケーションが表示されないのはなぜでしょうか？                     </span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq7 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq7 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4">
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          最新バージョンまたはドライバーを使用している場合は、ミキサー ソフトウェアを非表示にして、忙しいセッション中に画面スペースを占有しないようにすることができます。 ミキサーウィンドウを元に戻すのは、とても簡単なプロセスです。
                        </p>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-gray-900 font-bold text-lg">macOSの場合</h4>
                        <p className="text-gray-700 leading-relaxed">
                          MacOSでは、iD ミキサーアプリが実行されている場合、画面の右上隅にあるシステムトレイに小さな iDアイコンが表示されます。 これをクリックして、[ミキサーを表示] を選択すると表示されます。
                        </p>
                        <div className="flex justify-center">
                          <Image
                            src="/images/brands/audient/iD44mkⅡ/Q&A_05.png"
                            alt="macOS iD Mixer Menu"
                            width={800}
                            height={500}
                            className="rounded-lg w-full h-auto"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-gray-900 font-bold text-lg">Windowsの場合</h4>
                        <p className="text-gray-700 leading-relaxed">
                          Windows では、iD ミキサーアプリの実行中は、画面の右下隅にあるシステムトレイに小さな iDアイコンが表示されます。 これを右クリックして [ミキサーを表示] を選択すると表示されます。
                        </p>
                        <div className="flex justify-center">
                          <Image
                            src="/images/brands/audient/iD44mkⅡ/Q&A_06.png"
                            alt="Windows iD Mixer Menu"
                            width={800}
                            height={500}
                            className="rounded-lg w-full h-auto"
                          />
                        </div>
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
                      <span className="font-medium text-gray-900 text-left">iD24ファームウェアのアップデート</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq8 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq8 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4">
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          インターフェイスが最新のソフトウェアとファームウェアで動作していることを確認しましょう。インターフェイスが最新のオペレーティングシステムとの互換性があり、最新機能をすべて備えていることの確認が重要です。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          以下のショートビデオは、更新をすばやく確認して最新の状態に保つ方法です。参考にしてください。
                        </p>
                      </div>
                      <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
                        <iframe
                          width="100%"
                          height="100%"
                          src="https://www.youtube.com/embed/VUVQ-5N9Oaw"
                          title="iD24ファームウェアのアップデート"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
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
                      <span className="font-medium text-gray-900 text-left">iD44 トークバックのセットアップ</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq9 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq9 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4">
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          iD44は、プリアンプの1つ、または外部USBマイクをトークバックマイクに設定して、アーティストと話すことができます。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          使用するトークバックマイクをセットアップするには、まず iDミキサーアプリで View [表示] → Show System Panel [システム パネルを表示] に移動してシステムパネルを開きます。
                        </p>
                      </div>
                      <div className="space-y-4">
                        <p className="text-gray-900 font-bold text-lg">iD44</p>
                        <div className="flex justify-center">
                          <Image
                            src="/images/brands/audient/iD44mkⅡ/Q&A_07.png"
                            alt="iD Mixer System Panel"
                            width={800}
                            height={500}
                            className="rounded-lg w-full h-auto"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          システムパネルを開いたら、パネルの右側にあるトークバックタブに移動します。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          ここでは、Internal（内部）およびExternal（外部）オプションが表示されます。Internal（内部）に設定すると、内蔵プリアンプの1つを使用するか、ADAT経由の外部デバイスをトークバックマイクとして使用します。ドロップダウンメニューで使用する入力を選択し、マイクを使用する入力に接続して、ゲインを設定するだけですぐに会話が開始できます。
                        </p>
                      </div>
                      <div className="space-y-4">
                        <p className="text-gray-900 font-bold text-lg">iD44</p>
                        <div className="flex justify-center">
                          <Image
                            src="/images/brands/audient/iD44mkⅡ/Q&A_08.png"
                            alt="Talkback Settings"
                            width={800}
                            height={500}
                            className="rounded-lg w-full h-auto"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          External（外部）に設定すると、インターフェイスはコンピューターの2番目のドライバーを選び、この方法でトークバックが提供されます（例: コンピューターに接続されているUSBマイク）。別のデバイスを使用するには、トークバックにExternal「外部」を選択し、使用するWindowsドライバーを選択してから、ドロップダウンメニューからデバイスを選択します。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          トークバックはさまざまな方法で切り替えることができます。詳細については、Audient iD インターフェイスのマニュアルを参照してください。
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
                      <span className="font-medium text-gray-900 text-left">ADATセットアップ</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq10 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq10 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4">
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          iD44はオプティカル入出力を備えています。これらは、オプティカルステレオS/PDIF、また iDミキサーアプリを使用しての8チャンネルADATに設定できます。すべてのI/Oは最大 96kHzで動作しますが、ADATは88.2kHz以上のサンプルレートで4 チャンネルに減ります。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          S/PDIFモードで実行すると、最大96KHzのサンプルレートでの2チャンネルオーディオデジタル入出力として使用できます。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          ADATモードで動作するオプティカルI/O は、Audient ASP800、evo SP8 などの外部マイクプリアンプを接続しての録音に最適な8つの入出力を提供できます。ADAT出力は、追加8チャンネルDAC出力として、またデジタル入力を備えたヘッドフォン分配システムに接続できます。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          88.2kHzと96kHzのサンプルレートで使用する場合、ADATプロトコルがより高いサンプルレートで動作するため、4チャンネルのデジタル入出力にしかアクセスできないことに注意してください。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          外部機器をADAT接続し場合、クロック設定を変更することが重要です。詳細については、次のデジタルセットアップを参照してください。
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
                  {/* マイク・プリアンプ（ADCシグナルパスを含む） */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">マイク・プリアンプ（ADCシグナルパスを含む）</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>マイクゲインレンジ：0 to 60dB</p>
                      <p>ラインゲインレンジ：-10 to 50dB</p>
                      <p>ファンタム電源： 48v +/-4v @ 10mA/Channel</p>
                      <p>Mic EIN（等価入力雑音）：&lt;-126.0dBu</p>
                      <p>CMRR（同相信号除去比）：&gt;80dB @ 1kHz</p>
                      <p>最大入力レベル： +18dBu（+28dBu w/pad）</p>
                      <p>入力インピーダンス （Mic）: 3kΩ Balanced</p>
                      <p>入力インピーダンス （Line）: 10kΩ Balanced</p>
                      <p>周波数特性：+/-0.5dB 10Hz to 60kHz</p>
                      <p>クロストーク：96dB</p>
                      <p>THD+N @ 0dBu (1kHz)：&lt;0.003%</p>
                      <p>SNR：96dB</p>
                      <p>XLR：Pin 2（Hot）, Pin 3（Cold）&amp; Pin 1（Shield）</p>
                      <p>1/4" Jack：TIP（Hot）&amp; SLEEVE（Shield）</p>
                    </div>
                  </div>

                  {/* D.I /インストゥルメント入力 */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">D.I /インストゥルメント入力</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>D.I GAIN：0 to 60dBb</p>
                      <p>最大入力レベル：+10 Bu</p>
                      <p>入力インピーダンス: 1MΩ アンバランス</p>
                      <p>周波数特性：±0.5 dB 10Hz to 50kHz</p>
                      <p>THD+N @ 0dBu (1kHz)：&lt;0.3%</p>
                      <p>SNR：95dB</p>
                      <p>1/4"ジャック：TIP (Hot) &amp; SLEEVE（Shield）</p>
                    </div>
                  </div>

                  {/* デジタル入力 */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">デジタル入力</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>16-チャンネル ADAT：44.1kHz〜48kHz</p>
                      <p>8-チャンネル ADAT：88.2kHz〜96kHz SMUX</p>
                      <p>STEREO S/PDIF：44.1kHz to 96.0kHz（Stereo）</p>
                    </div>
                  </div>

                  {/* ADコンバーター */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">ADコンバーター（ADC 1&amp;2 / AES-17 に基づきInsert Returnにて測定)</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>最大入力レベル：+18dBu（0 dBFS最大入力）</p>
                      <p>デジタルリファレンスレベル：0 dBFS = +18dBu</p>
                      <p>周波数特性：+/-0.5dB 10Hz to Fs/2</p>
                      <p>クロストーク：-115dBu @ 1kHz &amp; 10kHz</p>
                      <p>THD+N @ -1dBFS0dBu（1kHz）：&lt;0.0003% （-112dB）</p>
                      <p>ダイナミックレンジ：120dB A-weighted</p>
                      <p>1/4" TRS Jack：TIP（Hot）、RING（Cold）&amp;SLEEVE（Shield）</p>
                    </div>
                  </div>

                  {/* DAコンバーター */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">DAコンバーター（DAC 1&amp;2 / AES-17 に基づきLine Outputにて測定)</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>最大入力レベル：+18dBu （0 dBFS最大入力）</p>
                      <p>デジタルリファレンスレベル：0 dBFS = +18dBu</p>
                      <p>出力インピーダンス：&lt;100Ω</p>
                      <p>周波数特性：+/-0.5dB 10Hz to Fs/2</p>
                      <p>クロストーク：-118dBu @ 1kHz &amp; 10kHz</p>
                      <p>THD+N @ -1dBFS0dBu（1kHz）：&lt;0.0006%</p>
                      <p>ダイナミックレンジ：121dB A-weighted</p>
                      <p>1/4" TRS Jack：TIP（Hot）、RING（Cold）&amp; SLEEVE（Shield）</p>
                    </div>
                  </div>

                  {/* ヘッドホン出力 */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">ヘッドホン出力（AES-17に基づきPHONES出力にて測定）</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>最大出力レベル：+14dBu（0 dBFSデジタル最大レベル）</p>
                      <p>デジタルリファレンスレベル：0 dBFS = +14dBu</p>
                      <p>出力インピーダンス：&lt;50Ω unbalanced</p>
                      <p>周波数特性：±0.5dB 10Hz to Fs/2</p>
                      <p>クロストーク：&lt; -110dBu @ 1kHz &amp; 10kHz</p>
                      <p>THD+N @ -1dBFS（1kHz）：&lt;0.0008%（-103dB）</p>
                      <p>ダイナミックレンジ：124dB A-weighted</p>
                      <p>最大入力レベル（30Ω）：+7.5dBu 0.003% THD+N Power、225mW</p>
                      <p>最大入力レベル（60Ω）：10.2dBu 0.002% THD+N Power、210mW</p>
                      <p>最大入力レベル（600Ω）：14.2dBu 0.00057% THD+N Power、54mW</p>
                      <p>Tip（Hot）&amp; Sleeve（Shield）（AES-17 に基づきオプティカル出力にて測定）</p>
                      <p>1/4"ジャック：TIP（Left）、RING（Right）&amp; SLEEVE（Shield）</p>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* USB 2.0 ハイスピード */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">USB 2.0 ハイスピード</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>入力チャンネル 20（4アナログ、16デジタル）</p>
                      <p>出力チャンネル 24（8アナログ、16デジタル）</p>
                      <p>コネクター：USB Type C</p>
                      <p>同梱ケーブル：1.5m USB 2.0 Type-C – USB Type C</p>
                      <p className="mt-2 font-semibold">DSP ミキサーレイテンシー（往復タイム）：</p>
                      <p>　44.1kHz 0.667mS</p>
                      <p>　48.0kHz 0.625mS</p>
                      <p>　88.2kHz 0.354mS</p>
                      <p>　96.0kHz 0.323mS</p>
                    </div>
                  </div>

                  {/* サイズ */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">サイズ</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>276mm（w）x 51mm（h）x 174mm（d）</p>
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

