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

export default function Id24Page() {
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
    downloadManual("audient", "id24")
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
          src="/images/brands/audient/id24/hero.jpg"
          alt="iD24"
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
                <p className="text-2xl font-bold text-gray-900">iD24</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">10in / 14out USB オーディオ・インターフェイス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-gray-900">
                  ¥63,250
                </p>
                <p className="text-xs text-gray-500">前後（税込）</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">5060374260511</p>
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
                    title="AUDIENT iD24 - The Features"
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

          {/* Section 1: Top Section - Left Image, Right Text */}
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Product Image */}
              <div className="flex justify-center">
                <Image
                  src="/images/brands/audient/id24/concept_01.png"
                  alt="iD24 製品コンセプト"
                  width={600}
                  height={600}
                  className="w-full h-auto rounded-xl"
                />
              </div>
              
              {/* Right: Text Content */}
              <div className="space-y-12">
                {/* Part 1: あなたにふさわしいプロフェッショナル・サウンド */}
                <div>
                  <h4 className="text-2xl font-bold text-white mb-4">あなたにふさわしいプロフェッショナル・サウンド</h4>
                  <h5 className="text-xl font-bold text-white mb-4">Audientコンソール・マイクプリアンプ</h5>
                  <p className="text-gray-400 leading-relaxed">
                    iDシリーズ、すべてのインターフェイスには、Audient Console Mic Preamp が搭載されています。そのマイクプリには、有名なレコーディング・コンソールASP8024-HEと同じディスクリート回路を採用しました。iD24の2機のAudient Consoleマイク・プリアンプは、クラシックなアナログの暖かみを保ちつつ、超低ノイズと低歪みを実現し、正確かつ原音に忠実なクリーンサウンドを届けてくれます。
                  </p>
                </div>

                {/* Part 2: すべては細部に宿る */}
                <div>
                  <h4 className="text-2xl font-bold text-white mb-4">すべては細部に宿る</h4>
                  <h5 className="text-xl font-bold text-white mb-4">クラス最高峰のコンバーター</h5>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    クラスをリードするコンバーターの採用により、あらゆるニュアンスを細部に渡り聴き取ることが可能になりました。32ビットDACコンバーター・テクノロジーと126dBのダイナミック・レンジは、微妙なディテールやサウンドの問題点を特定し、より良いミックスの決定を可能にしてくれます。再生を押したその瞬間から、驚くべき明瞭さを体験してください。
                  </p>
                  
                  {/* Statistics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
                      <p className="text-2xl font-bold text-green-700 mb-2">126 dB</p>
                      <p className="text-gray-700 font-medium text-sm">Dynamic Range / DAC</p>
                    </div>
                    <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
                      <p className="text-2xl font-bold text-green-700 mb-2">122 dB</p>
                      <p className="text-gray-700 font-medium text-sm">Dynamic Range / ADC</p>
                    </div>
                    <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
                      <p className="text-2xl font-bold text-green-700 mb-2">58dB</p>
                      <p className="text-gray-700 font-medium text-sm">Gain Range</p>
                    </div>
                    <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
                      <p className="text-2xl font-bold text-green-700 mb-2">0.0015%</p>
                      <p className="text-gray-700 font-medium text-sm">THD+N</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: MicPre サウンドの違いを聴き比べてみてください */}
          <div className="mb-20 border-t border-gray-700 pt-20">
            <div className="text-center mb-8">
              <h4 className="text-2xl font-bold text-white mb-2">iD24 性能</h4>
              <p className="text-gray-400 text-sm mb-4">より高音質な「4K」でご覧ください。Youtubeの自動翻訳機能がご利用いただけます。</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg w-full max-w-2xl">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/drdyFNdVx3w"
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

          {/* Section 5: 拡張そして、勝利 */}
          <div className="mb-20 border-t border-gray-700 pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <Image
                  src="/images/brands/audient/id24/concept_04.png"
                  alt="デジタル入出力"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-xl"
                />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">拡張そして、勝利</h4>
                <h5 className="text-xl font-bold text-white mb-6">デジタル入出力</h5>
                <p className="text-gray-400 leading-relaxed">
                  ドラムやライブバンドのレコーディングなど、より大きなセッションに取り組む場合は、iD24のオプティカル入出力接続を使用して対応できます。iD24は、ADATとSPDIFの両方をサポートしていますから、最大8チャンネルのマイクプリアンプを追加してI/Oを増設できます。
                </p>
              </div>
            </div>
          </div>

          {/* Section 6: ハードウェア統合 */}
          <div className="mb-20 border-t border-gray-700 pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <Image
                  src="/images/brands/audient/id24/concept_05.svg"
                  alt="バランスインサート"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-xl"
                />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">ハードウェア統合</h4>
                <h5 className="text-xl font-bold text-white mb-6">バランスインサート</h5>
                <p className="text-gray-400 leading-relaxed mb-6">
                  お気に入りのアウトボードFXをAD変換前のインサートに挿入して、最高のシグナルチェーンでレコーディングを開始できます。また、インサートリターンはA/D コンバーターへの直接入力を可能にします。可能な限りクリーンな信号経路として、プリントバックやアウトボードのラインレベルソースが入力できます。
                </p>
                <div className="text-center">
                  <p className="text-gray-400 text-sm mb-2">iD24 性能</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 7: テーラーメード */}
          <div className="mb-20 border-t border-gray-700 pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <Image
                  src="/images/brands/audient/id24/concept_06.png"
                  alt="ユーザー設定が可能なモニターコントロール"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-xl"
                />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">テーラーメード</h4>
                <h5 className="text-xl font-bold text-white mb-6">ユーザー設定が可能なモニターコントロール</h5>
                <p className="text-gray-400 leading-relaxed">
                  ３つのプログラム可能なファンクションボタンでワークフローが効率的にスピードアップできます。Speaker Select、Talkback、Polarity Invert、Mono Sum などの高度なモニタリング機能を任意の Fボタンに割り当てて、セッションをすばやくコントロールできます。
                </p>
              </div>
            </div>
          </div>

          {/* Section 8: 外部ハードウェアも接続可能 */}
          <div className="mb-20 border-t border-gray-700 pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <Image
                  src="/images/brands/audient/id24/concept_07.jpg"
                  alt="2系統のバランスインサート"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-xl"
                />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">外部ハードウェアも接続可能</h4>
                <h5 className="text-xl font-bold text-white mb-6">2系統のバランスインサート</h5>
                <p className="text-gray-400 leading-relaxed">
                  お気に入りのシグナルプロセッサーを接続して、理想的なシグナルチェーンを作ることができます。クリーンな信号経路を備えたADコンバーター用のライン入力として２つのリターン入力を使用できるため、外部機器からの信号をこの１台でコントロールすることができます。
                </p>
               
              </div>
            </div>
          </div>

          {/* Section 9: オーディオ・ループバック */}
          <div className="mb-20 border-t border-gray-700 pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <Image
                  src="/images/brands/audient/id24/concept_09.svg"
                  alt="オーディオ・ループバック"
                  width={600}
                  height={500}
                  className="w-full h-auto rounded-xl"
                />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">オーディオ・ループバック</h4>
                <h5 className="text-xl font-bold text-white mb-6">無限の可能性をサポート</h5>
                <p className="text-gray-400 leading-relaxed mb-6">
                  オーディオ・ループバック機能を備えたiD24は、多目的パワーハウスへと変身を遂げました。オーディオ・ループバックを使用すると、コンピューター上の複数のアプリケーションからの再生、また同時にマイクとして使用できるため、ストリーミング・ソフトウェアに送信する準備が整ったカスタム・オーディオ・フィードを作成できます。コンテンツ・クリエーター、ポッドキャスター、ストリーマーに最適です。
                </p>
                <p className="text-gray-400 leading-relaxed mb-6">
                  iD24のループバック機能は、ソフトウェア・ミキサーを介して制御され、さまざまな実用的シナリオに合わせて６つの異なるオプションからループバック・ソースが選択できます。無限の可能性とスピーディーなワークフローをお届けします。
                </p>
                <div className="text-center">
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
                  src="https://www.youtube.com/embed/drdyFNdVx3w"
                  title="AUDIENT iD24 - The Features"
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
                  src="https://www.youtube.com/embed/euNX_kbvDEc"
                  title="AUDIENT iD24 - Demo"
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
              {/* 1. スピーカー出力 */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <Image
                    src="/images/brands/audient/id24/function_01.jpg"
                    alt="スピーカー出力"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">①</span>
                  <h3 className="text-xl font-bold text-gray-900">スピーカー出力</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  iD24は、４つのライン出力を備えており、２セットのスピーカーシステムをセットアップして、ミックスを確認することができます。また、追加のライン出力を外部ヘッドフォンアンプへ信号を送り、アーティストのモニターソースとして再生することも可能です。
                </p>
              </div>

              {/* 2. ヘッドフォン出力 */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <Image
                    src="/images/brands/audient/id24/function_02.jpg"
                    alt="ヘッドフォン出力"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">②</span>
                  <h3 className="text-xl font-bold text-gray-900">ヘッドフォン出力</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  本機は、600Ωのモニターヘッドフォンもドライブできる十分なパワーを誇るヘッドフォンアンプを２機搭載しています。それらは1/4インチジャックとミニジャックに独立しており、アーティストと同時にモニタリングが可能になり、シームレスに共同作業を行うことができます。
                </p>
              </div>

              {/* 3. ADAT/SPDIFで広がる拡張性 */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <Image
                    src="/images/brands/audient/id24/function_03.jpg"
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
                <p className="text-gray-700 leading-relaxed">
                  iD24は、ADATとSPDIF両方のデジタル入力を備えています。それらのデジタル入力からマイクプリを追加し、8マイクchの拡張入力を加えたより大きな録音セッションが可能です。
                </p>
              </div>

              {/* 4. JFET クラスA/ディスクリート設計の楽器用入力 */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <Image
                    src="/images/brands/audient/id24/function_04.jpg"
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
                <p className="text-gray-700 leading-relaxed">
                  入力端子は、JFETを使用したクラス A /ディスクリート・ デザインの楽器用入力です。クラシックな真空管アンプの入力部分をベースにデザインされたこのD.I入力は、リッチなハーモニクスを含んだサウンドを実現します。また、D.I入力はマイク・プリアンプ入力と独立したチャンネルなので、例えば歌いながらギターを弾き、同時に録音する事も可能です。
                </p>
              </div>

              {/* 5. 超ロー・レイテンシーを実現したモニターミックス */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <Image
                    src="/images/brands/audient/id24/function_05.jpg"
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
                <p className="text-gray-700 leading-relaxed">
                  iD24のMonitor Mixなら超ローレイテンシーでの録音が可能です。入力とコンピュータオーディオの最適なバランスで、遅れを感じることなくスムーズなレコーディングが実現できます。
                </p>
              </div>

              {/* 6. トークバック機能 */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <Image
                    src="/images/brands/audient/id24/function_06.jpg"
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
                <p className="text-gray-700 leading-relaxed">
                  イノベーションとコミュニケーションの出会い。
                  iD24のトークバック・テクノロジーは、内蔵マイクやUSBマイクなどのコンピューターに接続された任意のオーディオソースをトークバック音源として使用できます。貴重なマイクプリアンプ入力を犠牲にすることはありません。
                </p>
              </div>

              {/* 7. バーチャル・スクロール・ホイール */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <Image
                    src="/images/brands/audient/id24/function_07.jpg"
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
                <p className="text-gray-700 leading-relaxed">
                  iD24のボリュームノブは、バーチャル・スクロール・ホイールとして互換性のあるさまざまなオンスクリーン・パラメータを制御に使用できます。設定をすばやくダイヤルインや、フェーダーの調整が可能。また画面を見つめるのに何時間も費やすことなく、オートメーションを書き込んだりすることもできます。
                </p>
              </div>

              {/* 8. 高い堅牢性、頑丈なフルメタル・ボディを採用 */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <Image
                    src="/images/brands/audient/id24/function_08.jpg"
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
                <p className="text-gray-700 leading-relaxed">
                  金属製のスモーク・グレーのシャーシと、削り出されたハンドメードのアルミニウム・ノブ、さらに高品質のコンポーネントの選択により作り上げられたiD24は、自宅のデスクトップでも、摩耗や損傷に晒される旅先でも、それらの条件に耐えられるように設計されています。
                </p>
              </div>

              {/* 9. フリー・バンドル・ソフトウェア＆プラグイン */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <Image
                    src="/images/brands/audient/id24/function_09.jpg"
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
                <p className="text-gray-700 leading-relaxed">
                  業界をリードするプラグインやバーチャル・インストゥルメントに加えて、Cubase LE などのクリエイティブ・ソフトウェアの無料スイートをバンドルしました。箱を開けて、すぐにレコーディングを開始できます。
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
                    src="/images/brands/audient/id24/software_01.mp4"
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
                <p className="text-sm text-gray-500 mb-4">※ 日本語の自動翻訳機能がご利用頂けます。</p>
                <p className="text-lg font-bold text-gray-900 mb-4">超低レイテンシーを体験してみよう。ソフトウェア・ミキサー・アプリ</p>
                <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg mb-4">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/DGhMzqxZNBU"
                    title="iD24 Software Overview"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* Right: Description and Download */}
              <div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  iD Software Mixerは、ハードウェアとソフトウェアをタイトに結びつけ、低レイテンシーのダイレクト・モニタリングを簡単にセットアップできます。最大２つのステレオ・アーティスト・キューミックスや、チャンネルに名前を付けてのカスタマイジング、レイアウトプリセットの保存、ファンクション・ボタンの割り当てなど、高度なルーティングをすばやくセットアップすることができます。
                </p>
                <p className="text-gray-700 mb-6">
                  iD Mixer Appは、Audient WEBサイトからダウンロードして頂けます。
                </p>
                <a
                  href="https://audient.com/products/audio-interfaces/id24/downloads/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  ダウンロードはこちら
                </a>
              </div>
            </div>

            {/* Input Channels Section */}
            <div className="mb-16 border-t border-gray-300 pt-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="flex justify-center">
                  <Image
                    src="/images/brands/audient/id24/software_02.png"
                    alt="Input Channels / 入力チャンネル"
                    width={300}
                    height={200}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Input Channels/入力チャンネル</h3>
                  <p className="text-gray-700 leading-relaxed">
                    入力タイプの選択、ミキサーの入力チャンネルのような、フェーズ、パン、ステレオグルーピング、ブースト、ミュート、ソロ機能に加え、フェーダーとメーターを備えています。
                  </p>
                </div>
              </div>
            </div>

            {/* Master Section */}
            <div className="mb-16 border-t border-gray-300 pt-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="flex justify-center">
                  <Image
                    src="/images/brands/audient/id24/software_03.png"
                    alt="Master Section / マスターセクション"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Master Section/マスターセクション</h3>
                  <p className="text-gray-700 leading-relaxed">
                    コンソールのマスターセクションと同様、各ミックス機能を司るセクションです。ミックスの選択、Cueミックス名、ミックスソロ、ミックスレベル、ミックスメーター、クロノメーター、チャンネルビューのミックスに有益な機能を備えています。
                  </p>
                </div>
              </div>
            </div>

            {/* Monitor Controls Section */}
            <div className="mb-16 border-t border-gray-300 pt-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="flex justify-center">
                  <Image
                    src="/images/brands/audient/id24/software_04.png"
                    alt="Monitor Controls / コントロール"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Monitor Controls/コントロール</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    モニターコントロール機能は、マスターセクションにある6種類のボタンからアクセスできます。以下6種類の機能です。TB （トークバック）、ø （位相反転）、Mono（モノ）、Alt（オルタネート）、Dim（ディム）、Monitor and Headphone Mute（モニター＆ヘッドフォンミュート）
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    さらに、システムパネルから、入力デジタルフォーマット、クロック、出力ルーティング等も選択＆設定可能です。また、ミキサープリセットのセーブ＆ロードも行えます。
                  </p>
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
                    src="/images/brands/audient/id24/software_05.jpg"
                    alt="最新ファームウェア"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <div>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    iDシリーズの最新のiDドライバーVersion4.4.0がリリースされました。
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    WindowsではARM64に対応、MacではOS 15 Sequoiaに対応済みとなりました。
                  </p>
                  <p className="text-gray-700 mb-6">
                    iD Driverは、Audient WEBサイトからダウンロードして頂けます。
                  </p>
                  <a
                    href="https://audient.com/products/audio-interfaces/id24/downloads/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
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
                      <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">③</span>
                      <span className="font-medium text-gray-900 text-left">ヘッドフォン出力のアサインの仕方を教えてください。</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq1 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq1 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4">
                      <div className="space-y-4">
                        <p className="text-gray-900 font-bold text-lg">iD24</p>
                        <p className="text-gray-700 leading-relaxed">
                          iD24には、さまざまな出力に割り当てできる2つのヘッドフォン出力があります。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          この仕様は、アーティストのミックスや、複数種のヘッドフォンでミックスをチェックする場合などに使えます。特定のセットアップに関する詳細については、iD24 ユーザーガイドを参照してください。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          ヘッドフォンポートを別の出力に割り当てるには、まずiD ミキサーを開きます。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          ここで、["View"表示] &gt; ["Show System Panel"システム パネルの表示] に移動します。
                        </p>
                      </div>
                      <div className="flex justify-center">
                        <Image
                          src="/images/brands/audient/id24/Q&A_01.jpg"
                          alt="iD Mixer View Menu"
                          width={800}
                          height={500}
                          className="rounded-lg w-full h-auto"
                        />
                      </div>
                      <div className="space-y-4">
                        <p className="text-gray-900 font-bold text-lg">iD24</p>
                        <p className="text-gray-700 leading-relaxed">
                          次のスクリーンショット：ルーティングマトリックスを開いて、必要に応じてヘッドフォンを割り当てることができます。
                        </p>
                      </div>
                      <div className="flex justify-center">
                        <Image
                          src="/images/brands/audient/id24/Q&A_02.png"
                          alt="Routing Matrix"
                          width={800}
                          height={500}
                          className="rounded-lg w-full h-auto"
                        />
                      </div>
                      <div className="flex justify-center">
                        <Image
                          src="/images/brands/audient/id24/Q&A_03.png"
                          alt="Headphone Assignment"
                          width={800}
                          height={500}
                          className="rounded-lg w-full h-auto"
                        />
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
                      <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">③</span>
                      <span className="font-medium text-gray-900 text-left">異なるヘッドフォンミックスの作り方を教えてください。</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq2 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq2 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4">
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          例えば、アーティストミックスを作るために、iD24のパワフルなルーティングオプションから、メインスピーカー出力に別のヘッドフォンミックスが作成できます。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          iD24で別のヘッドフォンミックスを作成するには、まずヘッドフォンジャックをキューミックスの1つに割り当てる必要があります。この実行には、iDミキサーを開き、[View 表示] →[Show System Panelシステム パネルを表示] に移動してシステムパネルウィンドウを表示します。
                        </p>
                      </div>
                      <div className="space-y-4">
                        <p className="text-gray-900 font-bold text-lg">iD24</p>
                        <div className="flex justify-center">
                          <Image
                            src="/images/brands/audient/id24/Q&A_06.png"
                            alt="iD Mixer View Menu"
                            width={800}
                            height={500}
                            className="rounded-lg w-full h-auto"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <p className="text-gray-900 font-bold text-lg">iD24</p>
                        <p className="text-gray-700 leading-relaxed">
                          次に、スクリーンショットのようにルーティング マトリックスでこれらを選択して、ヘッドフォン出力をCUE AまたはCUE Bに割り当てます。
                        </p>
                        <div className="flex justify-center">
                          <Image
                            src="/images/brands/audient/id24/Q&A_07.png"
                            alt="Routing Matrix"
                            width={800}
                            height={500}
                            className="rounded-lg w-full h-auto"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <p className="text-gray-900 font-bold text-lg">iD24</p>
                        <p className="text-gray-700 leading-relaxed">
                          これを割り当てたら、ミックスを作ります。これを行うには、メインミキサーウィンドウのCUE Aをクリックします。ウィンドウの色が変わり、別のミックスを表示していることがわかります。
                        </p>
                        <div className="flex justify-center">
                          <Image
                            src="/images/brands/audient/id24/Q&A_08.png"
                            alt="CUE A Mix"
                            width={800}
                            height={500}
                            className="rounded-lg w-full h-auto"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          ここでフェーダーを調整し、必要に応じたミックスを作りヘッドフォンアウトに出力します。マスターとは別にヘッドフォン専用のボリュームコントロールが使用できるため、アーティスト ミックスとして最適です。
                        </p>
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
                      <span className="font-medium text-gray-900 text-left">ARCの登録方法</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq3 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq3 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4">
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          ARCへの登録はすばやく簡単にできます。優れたソフトウェアとサービスにアクセスでき、iD24で創造性を発揮するのに役立ちます。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          登録プロセスについては、以下のビデオをご覧ください。
                        </p>
                      </div>
                      <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
                        <iframe
                          width="100%"
                          height="100%"
                          src="https://www.youtube.com/embed/R3hNTB2btAo"
                          title="ARCの登録方法"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
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
                      <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">③</span>
                      <span className="font-medium text-gray-900 text-left">iD24 トークバックのセットアップ</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq4 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq4 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4">
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          iD24は、プリアンプの1つ、または外部USBマイクをトークバックマイクに設定して、アーティストと話すことができます。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          使用するトークバックマイクをセットアップするには、まず iDミキサーアプリで View [表示] → Show System Panel [システム パネルを表示] に移動してシステムパネルを開きます。
                        </p>
                      </div>
                      <div className="space-y-4">
                        <p className="text-gray-900 font-bold text-lg">iD24</p>
                        <div className="flex justify-center">
                          <Image
                            src="/images/brands/audient/id24/Q&A_13.png"
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
                        <p className="text-gray-900 font-bold text-lg">iD24</p>
                        <div className="flex justify-center">
                          <Image
                            src="/images/brands/audient/id24/Q&A_14.png"
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
                      <div className="flex justify-center">
                        <Image
                          src="/images/brands/audient/id24/Q&A_16.jpg"
                          alt="iD24 デジタルセットアップ"
                          width={800}
                          height={500}
                          className="rounded-lg w-full h-auto"
                        />
                      </div>
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          外部デジタル機を iD24に接続する場合、すべてのデバイスが互いに正しく同期して動作していることを確認することが重要です。
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
                        <h4 className="text-gray-900 font-bold text-lg">iD24をマスタークロックにする</h4>
                        <p className="text-gray-700 leading-relaxed">
                          iD24をマスタークロックに設定すると、チェーン内の他のデバイスは、オプティカルポートまたはBNC ワードクロック出力のいずれかからクロックを供給できます。 1つのデバイスだけにクロッキングする場合は、光ポート経由のクロッキングが最も簡単なオプションです。TOSlinkケーブルを iD24のオプティカル出力と他のデジタル機のオプティカル入力に接続するだけで完了できます。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          次に、他のデバイスをクロックスレーブ機に設定します。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          複数のデバイスを使用している場合は、BNCワードクロック出力を使用し、Tコネクターでデバイスをデイジーチェーン接続することをお勧めします。チェーンの最後のデバイスは、クロック信号の反射を止めるために75オームのBNCコネクターでターミネートすることが重要です。これは、どのデバイスでも切り替え可能なオプションです。
                        </p>
                        <div className="flex justify-center">
                          <Image
                            src="/images/brands/audient/id24/Q&A_17.png"
                            alt="iD24 clocked via the Optical Port"
                            width={800}
                            height={500}
                            className="rounded-lg w-full h-auto"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-gray-900 font-bold text-lg">iD24をスレーブにする</h4>
                        <p className="text-gray-700 leading-relaxed">
                          iD24は、外部マスタークロックのスレーブとして機能することもできます。 iD24は、オプティカル入力で外部クロック信号のみを受け入れることができます。BNCコネクターはクロック出力のみです。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          この場合、デバイスのオプティカル出力を iD24のオプティカル入力に接続するだけです。次に、iD ミキサーアプリで、クロックソースとして使用するオプティカル入力を選択します。また、外部デバイスの仕様により、入力をADAT または S/PDIFに設定する必要があります。
                        </p>
                        <div className="flex justify-center">
                          <Image
                            src="/images/brands/audient/id24/Q&A_18.png"
                            alt="iD24 with Single BNC Connection"
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
                        <p className="text-gray-900 font-bold text-lg">iD24</p>
                        <p className="text-gray-700 leading-relaxed">
                          他のマイクプリアンプ、またはあなたが使用中の機材の出力を入力チャンネル１または２のインサートリターンに接続するだけで、iD24のマイクプリを簡単にバイパスできます。これは、マイクプリとライン入力段をバイパスして、ADCへの非常にクリーンなラインとして使えます。
                        </p>
                      </div>
                      <div className="flex justify-center">
                        <Image
                          src="/images/brands/audient/id24/Q&A_04.jpg"
                          alt="iD24 プリアンプバイパス"
                          width={800}
                          height={500}
                          className="rounded-lg w-full h-auto"
                        />
                      </div>
                      <div className="flex justify-center">
                        <Image
                          src="/images/brands/audient/id24/Q&A_05.png"
                          alt="インサートリターン接続"
                          width={800}
                          height={500}
                          className="rounded-lg w-full h-auto"
                        />
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
                      <span className="font-medium text-gray-900 text-left">リアンプの方法</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq7 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq7 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4">
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          ギタートラックを録音したが、トーンがいまいち合っていない。そんな経験ありませんか？
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          事前に録音されたテイクを再録音のためにアンプに戻すリアンピングは、トーン修正における究極の柔軟性が実現できます。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          リアンプは一般的にギターやベースで使用されます。このセットアップではギタープレーヤーが参照します。同じようなセットアップを使用してオーディオを送信し、独自のサウンドを作成することもできます。
                        </p>
                      </div>
                      <div className="flex justify-center">
                        <Image
                          src="/images/brands/audient/id24/Q&A_09.jpg"
                          alt="リアンプセットアップ"
                          width={800}
                          height={500}
                          className="rounded-lg w-full h-auto"
                        />
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-gray-900 font-bold text-lg">ハードウェアセットアップ</h4>
                        <div className="space-y-4">
                          <p className="text-gray-900 font-bold text-lg">iD24</p>
                          <p className="text-gray-700 leading-relaxed">
                            最初に、録音用にDIをセットアップします。これを行うには、iD24の前面にある DI入力にギターを接続します。このセットアップ方法でXLRプリアンプがバイパスされ、ゲインコントロールにはDIが使用されます。
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            ここで、リアンプボックスと出力3または4に接続します (これはモノラルセンドのみなので、このシナリオではどちらでもかまいません)。ここでは、重要なのはギターを直接アンプ入力へ接続するのと同じ信号レベルに下げるリアンプボックス機能です。
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            次に、ギターを弾いてレベルを設定する必要があります。録音時より少し強く弾いて設定すると、入力がクリップされることはありません。より正確なレベル設定には、iDミキサーのメーターを使用して行いましょう。
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            次に、アンプをインターフェイスに接続し直す必要があります。図のようにマイクを使用している場合は、これをインターフェイス入力2などの未使用のプリアンプに接続します。これが、コンピューターへ録音し直すリアンプ信号になります。デジタルアンプモデラーを使用している場合は、XLR/TRSケーブルを未使用の入力に接続するだけです。
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            ここで、録音ソフトウェアからインターフェイスのハードウェア出力にオーディオを出力するようにiD24をセットアップします。
                          </p>
                        </div>
                        <div className="flex justify-center">
                          <Image
                            src="/images/brands/audient/id24/Q&A_10.png"
                            alt="ハードウェアセットアップ図"
                            width={800}
                            height={500}
                            className="rounded-lg w-full h-auto"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-gray-900 font-bold text-lg">リアンプボックスの役割</h4>
                        <p className="text-gray-700 leading-relaxed">
                          DI経由でギターを録音すると、信号はマイクプリアンプに適したものに変更されます。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          DI ボックスは、信号をアンバランス＆ハイインピーダンスの信号から、バランス＆ローインピーダンス信号に変換します。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          リアンプボックスはこの逆に動作します。リアンプボックスを使用して、接続しているアンプの入力ゲインステージが正しく動作するように、アンバランス＆ハイインピーダンス信号を出力します。
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-gray-900 font-bold text-lg">iD Mixerセットアップ</h4>
                        <p className="text-gray-700 leading-relaxed">
                          まず、iD ミキサーを開き、コントロール パネルに移動します。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          View表示 &gt; Show System Panelシステム パネルを表示
                        </p>
                        <div className="space-y-4">
                          <p className="text-gray-900 font-bold text-lg">iD24</p>
                          <div className="flex justify-center">
                            <Image
                              src="/images/brands/audient/id24/Q&A_11.png"
                              alt="iD Mixer System Panel"
                              width={800}
                              height={500}
                              className="rounded-lg w-full h-auto"
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <p className="text-gray-900 font-bold text-lg">iD24</p>
                          <p className="text-gray-700 leading-relaxed">
                            ここで、出力3+4をDAWスルーに割り当てます。これは、DAWで3+4へ出力するように設定された信号は、すべて出力に直接送られることを意味します。
                          </p>
                          <div className="flex justify-center">
                            <Image
                              src="/images/brands/audient/id24/Q&A_12.png"
                              alt="Routing Matrix"
                              width={800}
                              height={500}
                              className="rounded-lg w-full h-auto"
                            />
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          これでハードウェアは完了です。次に、選択したDAWに移動して、このセットアップを取得する必要があります。
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-gray-900 font-bold text-lg">DAWセットアップ</h4>
                        <p className="text-gray-700 leading-relaxed">
                          最初に入力1 DI 経由でギタートラックを録音します。素晴らしい音で録れてはいませんからアンプに戻します。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          次に、このトラックのハードウェア出力を出力3+4に送ります。これはさまざまな異なる方法で行われるため、関連するDAWについては方法を確認してください。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          再生時にこの出力を設定すると、オーディオはiD24の出力3+4に直接出力され、ミキサーとボリュームコントロールがバイパスされます。アンプがすでに接続されている場合は、音量が非常に大きくなる可能性があることに注意してください。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          最後に、アンプの出力を録音するための新しい録音チャンネルが必要です。入力2を使用した場合は、入力2に割り当てられた新しいチャンネルを作成してリターン用にします。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          これですべてのセットアップが完了し、リアンプする準備が整いました。DAW から送信される出力3と4の信号は何でも、再録音のためにアンプに直接入力されます。必要に応じてペダルを使用することもできます。
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-gray-900 font-bold text-lg">追記</h4>
                        <p className="text-gray-700 leading-relaxed">
                          このセットアップでは、DI とアンプ信号を同時に録音できるため、これをライブレコーディングに使用できます。さらにトーンを変更する必要がある場合は、リアンプオプションが使用できます。
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          なぜリアンプを使用する必要があるかを詳しく知りたい場合は、こちらのSONOビデオをご覧ください。
                        </p>
                        <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
                          <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/to-pp7CmU8w"
                            title="リアンプの方法 - SONOビデオ"
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

                {/* FAQ Item 9 */}
                <div className="bg-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq9")}
                    className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-400 transition-colors rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">③</span>
                      <span className="font-medium text-gray-900 text-left">ADATセットアップ</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq9 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq9 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4">
                      <div className="flex justify-center">
                        <Image
                          src="/images/brands/audient/id24/Q&A_15.jpg"
                          alt="iD24 ADAT Setup"
                          width={800}
                          height={500}
                          className="rounded-lg w-full h-auto"
                        />
                      </div>
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          iD24はオプティカル入出力を備えています。これらは、オプティカルステレオS/PDIF、また iDミキサーアプリを使用しての8チャンネルADATに設定できます。すべてのI/Oは最大 96kHzで動作しますが、ADATは88.2kHz以上のサンプルレートで4 チャンネルに減ります。
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
                  {/* マイク・プリアンプ */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">マイク・プリアンプ</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>マイク・ゲイン：0 ～ 58 dB</p>
                      <p>最大入力レベル：+12dBu</p>
                      <p>クロストーク：&lt;-100dBu @ 1kHz &amp; 10kHz</p>
                      <p>THD+N @ 0dBu（1kHz）：0.0015%（-96dBu）</p>
                      <p>マイク EIN（等価入力雑音）： &lt;-13dBu（A-Weighted CMRR: &gt;75dB@1kHz）</p>
                      <p>SN 比：97.5dB（Unweighted, 100dB A-Weighted）</p>
                      <p>周波数特性：+/-0.5dB 10Hz to 40kHz</p>
                      <p>入力インピーダンス（Mic）：&gt;3k Ω バランス</p>
                      <p>入力インピーダンス（Line）：&gt;10k Ωバランス</p>
                      <p>PAD：-10dB</p>
                      <p>HPF カットオフ周波数：100Hz</p>
                      <p>ファンタム電源：48v +/-4v @ 10mA</p>
                      <p>XLR：ピン2（ホット）、ピン3（コールド）、ピン1（シールド）</p>
                      <p>1/4インチ・ジャック：チップ（ホット）、リング（コールド）、スリーブ（シールド）</p>
                    </div>
                  </div>

                  {/* ライン入力 */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">ライン入力</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>ライン・ゲイン：-10 ～ +48 dB</p>
                      <p>最大入力レベル：+22dBu</p>
                      <p>THD+N @ 0dBu（1kHz）：0.0013%（-97dBu）</p>
                    </div>
                  </div>

                  {/* D.I（楽器入力） */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">D.I（楽器入力）</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>D.I ゲイン：0 ～ 58dB</p>
                      <p>最大入力レベル：+12dBu</p>
                      <p>THD+N @ 0dBu（1kHz）：0.0075%, -82dB</p>
                      <p>SN 比：95dB</p>
                      <p>周波数特性：10Hz ～ 40kHz（+/-0.5dB）</p>
                      <p>入力インピーダンス：500kΩ アンバランス</p>
                      <p>1/4インチ・ジャック：チップ（ホット）、スリーブ（シールド）</p>
                    </div>
                  </div>

                  {/* ADC コンバーター */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">ADC コンバーター</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>最大入力レベル：12.5dBu = 0dBFS</p>
                      <p>クロストーク：-135dBu @ 1kHz、-125dBu @ 10kHz</p>
                      <p>周波数特性：+/- 0.2dB 0.5dB 10Hz to Fs/2 (Nyquist)</p>
                      <p>THD+N @ -1dBFS（1kHz）：0.0004%（-108dB）</p>
                      <p>ダイナミックレンジ：122dB（A-weighted）</p>
                      <p>入力インピーダンス：&gt;10kΩ</p>
                      <p>1/4インチ・ジャック：チップ（ホット）、リング（コールド） 、スリーブ（シールド）</p>
                    </div>
                  </div>

                  {/* DAC コンバーター */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">DAC コンバーター</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>最大入力レベル：12dBu = 0dBFS</p>
                      <p>THD+N @ -1dBFS（1kHz）：0.0003%（-110dB）</p>
                      <p>ダイナミックレンジ：126.5dB（A-weighted）</p>
                      <p>クロストーク：-130dBu @ 1kHz、-115dBu @ 10kHz</p>
                      <p>周波数特性：+/- 0.1dB 10Hz to Fs/2 (Nyquist)</p>
                      <p>入力インピーダンス：&lt;100Ω</p>
                      <p>1/4インチ・ジャック：チップ（ホット）、リング（コールド） 、スリーブ（シールド）</p>
                    </div>
                  </div>

                  {/* ヘッドホン出力 */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">ヘッドホン出力</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>最大出力レベル：18.5dBu = 0dBFS</p>
                      <p>THD+N @ -1dBFS （1kHz）：0.0006% （-104dB）</p>
                      <p>ダイナミックレンジ：124dB（A-weighted）</p>
                      <p>クロストーク：-117dB @ 1kHz、-101dB @ 10kHz</p>
                      <p>周波数特性：+/-0.2dB 10Hz to Fs/2（Nyquist）</p>
                      <p>出力インピーダンス：&lt;50Ω アンバランス</p>
                      <p>MAX LEVEL INTO 30R：2.63V Peak, 1.87V RMS, 232mW</p>
                      <p>MAX LEVEL INTO 60R：4.28V Peak, 3.03V RMS, 295mW</p>
                      <p>MAX LEVEL INTO 600R：7.91V Peak, 5.6V RMS, 104mW</p>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* USB2.0 HIGH SPEED */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">USB2.0 HIGH SPEED</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>入力チャンネル数：10（アナログ x 2、デジタル x 8）</p>
                      <p>出力チャンネル数：14（アナログ x 6、 デジタル x 8）</p>
                      <p>コネクター：USB Type-C</p>
                      <p>付属ケーブル：1m USB 2.0 Type-C to Type-C</p>
                    </div>
                  </div>

                  {/* DIGITAL i/o */}
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">DIGITAL i/o</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>ADAT 8 チャンネル使用可能：44.1kHz ～ 48kHz 時</p>
                      <p>ADAT 4 チャンネス使用可能：88.2kHz ～ 96kHZ 時（SMUX）</p>
                      <p>STEREO S/PDIF：44.1 ～ 96kHz（ステレオ）</p>
                      <p>WORD CLOCK OUTPUT：44.1kHz to 96kHz</p>
                    </div>
                  </div>

                  {/* DSPミキサーのレイテンシー */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">DSPミキサーのレイテンシー（IN→OUT）</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>44.1kHz：0.344ms</p>
                      <p>48.0kHz：0.312ms to 96kHz（SMUX）</p>
                      <p>88.2kHz：0.188ms</p>
                      <p>96.0kHz：0.177ms</p>
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

