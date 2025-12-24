"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { BlogSlider } from "@/components/blog-slider"
import { downloadManual } from "@/lib/manual-download"

type Section = "concept" | "demo" | "features" | "control" | "software" | "bundle" | "faq" | "manual" | "specs"

const navigationItems = [
  { id: "concept" as Section, label: "コンセプト" },
  { id: "demo" as Section, label: "デモムービー" },
  { id: "features" as Section, label: "主な機能" },
  { id: "control" as Section, label: "コントロール" },
  { id: "software" as Section, label: "ソフトウエア" },
  { id: "bundle" as Section, label: "バンドルソフト" },
  { id: "faq" as Section, label: "よくある質問" },
  { id: "manual" as "manual", label: "取扱説明書", isDownload: true },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function ID48Page() {
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
    downloadManual("audient", "id48")
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
          src="/images/brands/audient/id48/hero.jpg"
          alt="iD48"
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
                <p className="text-2xl font-bold text-gray-900">iD48</p>
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
                <p className="text-xl font-bold text-gray-900">¥165,000</p>
                <p className="text-xs text-gray-500">前後（税込）</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">5060374260634</p>
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
              24in / 32out
            </h2>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">
              USB オーディオ・インターフェイス
            </p>
            <div className="flex justify-center mt-8">
              <div className="w-24 h-1 rounded-full bg-purple-600" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - YouTube Video */}
            <div className="space-y-6">
              <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/FRfIoe5sBcU"
                  title="iD48 - The Features"
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
                    <span className="text-red-500">⚠</span>
                    <span className="text-gray-900">audient製品、OS対応状況のお知らせ</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Product Description */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">The Ultimate iD Interface</h3>

                <div className="prose max-w-none mb-8">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    これまで以上に大きく、より優れ、よりパワフルな iD48 は、プロデューサーやエンジニアのニーズに応えるフラッグシップ USB iD インターフェースです。
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    Audientコンソール マイクプリアンプ 8 基と高音質を約束する32bit ESSコンバーターテクノロジーを採用。加えて、まったく新しいスイッチャブル アナログインサート テクノロジーを搭載しました。これらの優れた仕様を備えたiD48は、驚異的なオーディオパフォーマンスと使いやすさのシームレスなコンビネーションをお届けします。ADAT 拡張性やカスタマイズ可能なモニターコントロールなどのプロに必須の機能が加わり、iD48はスタジオを一変させてくれます。
                  </p>
                </div>

                {/* Feature List */}
                <div className="space-y-2">
                  {[
                    "24入力、32出力（USB 経由で 24 同時出力）",
                    "8 x クラス A Audient コンソール マイク プリアンプ",
                    "24bit/96kHz、クラス最高の AD/DA コンバーター",
                    "2 x ディスクリート JFETインストルメント入力",
                    "メインおよびエクストラ・スピーカー出力",
                    "独立したヘッドフォン出力 x 2",
                    "ADAT入出力 x 2",
                    "切り替え可能なバランスインサート x 8",
                    "超低レイテンシー ソフトウェアミキサー",
                    "オーディオ ループバック",
                    "スクロール コントロール",
                    "専用のAltスピーカーとトークバック コントロール",
                    "ユーザー設定可能なファンクション キー x 2",
                    "+48V、パッド、+10dBブースト、極性反転、HPFコントロール",
                    "ワード クロック入出力",
                    "スタンドアロン モード",
                    "USB 2.0 準拠（24 入力 / 24 出力）",
                    "オールメタル デザイン",
                    "取り外し可能なラックイヤー",
                    "ARC フリー・バンドル・ソフトウェア＆プラグイン",
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

                <p className="text-xs text-gray-500 mt-4">※最新のドライバーをお使いください</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Concept Section - Dark Background */}
      <section id="concept" className="bg-[#1a1a1a]">
        {/* Title */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">一目でわかる優れた性能</h2>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 rounded-full bg-purple-600" />
              </div>
            </div>

            {/* Section 1: オーディオ パフォーマンス */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <Image
                  src="/images/brands/audient/id48/concept_01.webp"
                  alt="iD48"
                  width={600}
                  height={300}
                  className="w-full h-auto rounded-xl"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">オーディオ パフォーマンス</h3>
                <h4 className="text-lg text-gray-400 mb-4">プロフェッショナルのために</h4>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Audientコンソール マイクプリアンプで、これまで以上に優れたサウンドを実現！iD48 の 8基x Audientコンソール マイクプリアンプは、クリーンで正確、ソースに忠実なオーディオを確実にキャプチャーします。またクラシックなアナログの温かみを少し加え、68dBゲイン、超低ノイズで低歪みサウンドを届けてくれます。
                </p>
                <h5 className="text-white font-bold mb-2">サウンドはどうですか？</h5>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Audientコンソール マイクプリアンプは、すべて個別のハイグレード オペアンプ設計で、ソースをクリーンで正確、かつ詳細に再現します。
                </p>
                <h5 className="text-white font-bold mb-2">超低ノイズフロア</h5>
                <p className="text-gray-300 leading-relaxed">
                  ノイズフロアは信号レベルの 30,000 倍も静かなので、驚くほどクリアな録音が可能です。
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="mb-20 bg-[#0d0d0d] rounded-2xl p-6">
              {/* Top Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                {/* Left - 8 Audient Console Mic Preamps */}
                <div className="lg:col-span-2 bg-[#1a1a1a] rounded-xl overflow-hidden flex items-center justify-center">
                  <Image
                    src="/images/brands/audient/id48/concept_02.webp"
                    alt="iD48 Front"
                    width={800}
                    height={400}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Right - 16 Digital Inputs & Outputs */}
                <div className="bg-[#1a1a1a] rounded-xl overflow-hidden flex items-center justify-center">
                  <Image
                    src="/images/brands/audient/id48/concept_03.webp"
                    alt="iD48 Back"
                    width={400}
                    height={400}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>

              {/* Bottom Row */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Left - 2 Headphone Outputs */}
                <div className="bg-[#2a2a2a] rounded-xl aspect-square overflow-hidden">
                  <Image
                    src="/images/brands/audient/id48/concept_04.png"
                    alt="Headphone Outputs"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Middle - concept_05 image */}
                <div className="lg:col-span-1 bg-[#1a1a1a] rounded-xl aspect-square overflow-hidden flex items-center justify-center">
                  <Image
                    src="/images/brands/audient/id48/concept_05.png"
                    alt="Features"
                    width={400}
                    height={400}
                    className="h-full w-auto object-contain"
                  />
                </div>

                {/* Right - 126.5dB Dynamic Range */}
                <div className="bg-[#2a2a2a] rounded-xl aspect-square overflow-hidden">
                  <Image
                    src="/images/brands/audient/id48/concept_06.webp"
                    alt="Dynamic Range"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: 本物のアナログコンソール マイクプリアンプ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <Image
                  src="/images/brands/audient/id48/concept_07.webp"
                  alt="アナログコンソール"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-xl"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4">本物のアナログコンソール マイクプリアンプ</h3>
                <p className="text-gray-300 leading-relaxed">
                  同社の有名なレコーディング コンソール「ASP8024-HE」に搭載されているものと同じ、完全アナログ ディスクリート マイクプリアンプ回路を採用しています。エミュレーションやコピーはなく、デスクトップ上の本物のアナログコンソール マイクプリアンプです。
                </p>
              </div>
            </div>

            {/* Section 3: MicPre Video */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <div className="aspect-video bg-black rounded-xl overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/euNX_kbvDEc"
                    title="MicPre：サウンドの違いを聴き比べてみてください"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">* より高音質な「4K」でご覧ください。Youtubeの自動翻訳機能がご利用いただけます。</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4">MicPre：サウンドの違いを聴き比べてみてください</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  こちらの動画は、Audientのレコーディング・コンソール「ASP8024-HE」から「iD4」までのサウンドを同じ条件下でレコーディングしたサンプルです。
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Audientでは、フラッグシップのレコーディング・コンソールから、最も小さいオーディオ・インターフェイスまで、同じ回路設計によるマイクプリと高性能なコンバーターで、可能な限り同じパフォーマンスの音質を追求しています。
                </p>
                <p className="text-gray-400 mb-6">各機種の音の違いがお判りになりますか？</p>
                <a href="#" className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                  Audient マイクプリ・テクノロジー詳細
                </a>
              </div>
            </div>

            {/* Section 4: アドバンス32bit コンバーターテクノロジー */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <Image
                  src="/images/brands/audient/id48/concept_08.png"
                  alt="32bit Converter"
                  width={500}
                  height={300}
                  className="w-full h-auto"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">アドバンス32bit コンバーターテクノロジー</h3>
                <h4 className="text-lg text-gray-400 mb-4">一歩先を行くパフォーマンス</h4>
                <p className="text-gray-300 leading-relaxed">
                  iD48は、32 bit ESS DAC コンバーターテクノロジーを採用し、変換中の音質劣化を最小限に抑え、ベストなパフォーマンスを実現します。オーディオはこれまで以上にクリーンでクリア、かつ正確に再現されます。また126.5dBのダイナミックレンジは、微妙なディテールをより正確にモニターできるため、問題のある箇所をより早く特定できます。
                </p>
              </div>
            </div>

            {/* Section 5: ルーティングを切り替える */}
            <div className="mb-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-8">
                <div>
                  <div className="space-y-8">
                    <div>
                      <p className="text-sm text-gray-400 mb-2">ハードウェアFXを使用してのミックス</p>
                      <Image
                        src="/images/brands/audient/id48/concept_09.webp"
                        alt="Routing 1"
                        width={500}
                        height={200}
                        className="w-full h-auto"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-2">ハードウェアFXを使用してのトラッキング</p>
                      <Image
                        src="/images/brands/audient/id48/concept_10.webp"
                        alt="Routing 2"
                        width={500}
                        height={200}
                        className="w-full h-auto"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-2">外部プリアンプを使用してのトラッキング</p>
                      <Image
                        src="/images/brands/audient/id48/concept_11.webp"
                        alt="Routing 3"
                        width={500}
                        height={200}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">ルーティングを切り替える</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    史上初！　iD48の切り替え可能なインサート ルーティングにより、ADCパスに送るソースを選択できるようになりました。ケーブルを抜き差しすることなく、チャンネルごとに Audient マイクプリアンプまたはDAW出力をアウトボードへ送るかを選択できます。
                  </p>
                  <h4 className="text-white font-bold mb-2">外部プリアンプを使用してのトラッキング</h4>
                  <p className="text-gray-300 leading-relaxed">
                    さらに、外部アナログ マイクプリアンプで録音したいユーザーのために、iD48 の Returns を使用すると、Audient マイクプリアンプをバイパスして、録音用の非常にクリーンでダイレクトなAD変換パスが実現できます。
                  </p>
                </div>
              </div>
            </div>

            {/* Section 6: 高度なモニタリング コントロール */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Image
                  src="/images/brands/audient/id48/concept_12.webp"
                  alt="Monitoring Control"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-xl"
                />
                <p className="text-xs text-gray-500 mt-2">* iD48によるGrand Chapel StudiosでのThe Covasettesのトラッキング風景</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">高度なモニタリング コントロール</h3>
                <h4 className="text-lg text-gray-400 mb-4">モニタリングをシンプルに！</h4>
                <p className="text-gray-300 leading-relaxed mb-4">
                  iD48 は、パワフルなUSB-C オーディオ インターフェイスとして優れているだけでなく、スタジオ対応のモニタリング コントロールに必要なすべての機能を備えています。
                </p>
                <h4 className="text-white font-bold mb-2">入出力の拡張</h4>
                <p className="text-gray-300 leading-relaxed">
                  iD48のオプト入出力接続を活用して、最も要求の厳しいセッションでも短時間でこなせ、あなたのスタジオの信頼性が証明できます。ADATとSPDIFの両方をサポートするiD48は、最大 16チャンネルの外部マイクプリアンプを追加してI/Oを強化できます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Movie Section */}
      <section id="demo" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">デモムービー</h2>
          
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "1nMlWxrB0Do",
              "gWBp9dDLif4",
              "Cht39J3uF1o",
              "Hrwyc9dqHFo",
              "AP_M4pLXLy8",
            ].map((videoId, index) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="200"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={`iD48 Demo ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">主な機能</h2>
          
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1: ヘッドフォン出力 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="p-6 pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl font-bold text-cyan-400">1</span>
                    <h3 className="text-xl font-bold text-gray-900">ヘッドフォン出力</h3>
                  </div>
                </div>
                <div className="aspect-video bg-gray-100">
                  <Image
                    src="/images/brands/audient/id48/function_01.webp"
                    alt="ヘッドフォン出力"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 pt-4">
                  <p className="text-gray-700 leading-relaxed">
                    iD48の2xエンジニアグレードの独立ステレオヘッドフォンアンプを使用して、自信を持ってヘッドフォンでのミックスができます。それはまた、124dBの高ダイナミックレンジと、最大600Ωのヘッドフォンをドライブするのに十分なパワーを提供してくれます。
                  </p>
                </div>
              </div>

              {/* Feature 2: スピーカー出力 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="p-6 pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl font-bold text-cyan-400">2</span>
                    <h3 className="text-xl font-bold text-gray-900">スピーカー出力</h3>
                  </div>
                </div>
                <div className="aspect-video bg-gray-100">
                  <Image
                    src="/images/brands/audient/id48/function_02.webp"
                    alt="スピーカー出力"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 pt-4">
                  <p className="text-gray-700 leading-relaxed">
                    メインおよびオルタネートスピーカー出力から、ミックスが視聴できます。また、エクストラライン出力からオーディオ信号を外部ヘッドフォンアンプへ送り、アーティスト用のモニターソースにできます。
                  </p>
                </div>
              </div>

              {/* Feature 3: トークバック */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="p-6 pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl font-bold text-cyan-400">3</span>
                    <h3 className="text-xl font-bold text-gray-900">トークバック</h3>
                  </div>
                </div>
                <div className="aspect-video bg-gray-100">
                  <Image
                    src="/images/brands/audient/id48/function_03.svg"
                    alt="トークバック"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 pt-4">
                  <p className="text-gray-700 leading-relaxed">
                    iD48 の革新的なトークバックテクノロジーは、USBマイクまたはコンピューターの内蔵マイクを専用のトークバックマイクとして使用でき、貴重なマイクプリアンプのチャンネルを使用することなく、録音専用に解放できます。
                  </p>
                </div>
              </div>

              {/* Feature 4: ユーザー設定が可能なモニターコントロール */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="p-6 pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl font-bold text-cyan-400">4</span>
                    <h3 className="text-xl font-bold text-gray-900">ユーザー設定が可能なモニターコントロール</h3>
                  </div>
                </div>
                <div className="aspect-video bg-gray-100">
                  <Image
                    src="/images/brands/audient/id48/function_04.svg"
                    alt="ユーザー設定が可能なモニターコントロール"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 pt-4">
                  <p className="text-gray-700 leading-relaxed">
                    スピーカー選択、ディム、モノラルサムなどの強力なモニタリング機能を 2つの専用ハードウェア機能ボタンに割り当てることができます。
                  </p>
                </div>
              </div>

              {/* Feature 5: JFETインストルメント入力 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="p-6 pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl font-bold text-cyan-400">5</span>
                    <h3 className="text-xl font-bold text-gray-900">JFETインストルメント入力</h3>
                  </div>
                </div>
                <div className="aspect-video bg-gray-100">
                  <Image
                    src="/images/brands/audient/id48/function_05.webp"
                    alt="JFETインストルメント入力"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 pt-4">
                  <p className="text-gray-700 leading-relaxed">
                    クラシックな真空管アンプの入力段を再現した、2つの倍音豊かなJFETインストルメント入力は、アンプシミュレーターを使用する前にギターやベースに最適なサウンドベースを提供します。
                  </p>
                </div>
              </div>

              {/* Feature 6: USB-C バスパワー */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="p-6 pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl font-bold text-cyan-400">6</span>
                    <h3 className="text-xl font-bold text-gray-900">USB-C バスパワー</h3>
                  </div>
                </div>
                <div className="aspect-video bg-gray-100">
                  <Image
                    src="/images/brands/audient/id48/function_06.svg"
                    alt="USB-C バスパワー"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 pt-4">
                  <p className="text-gray-700 leading-relaxed">
                    iD48はハイスピードUSB接続により、macOS と Windows の両方で超低レイテンシーのモニタリングと安定したドライバー パフォーマンスを実現します。
                  </p>
                </div>
              </div>

              {/* Feature 7: 消音設計 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="p-6 pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl font-bold text-cyan-400">7</span>
                    <h3 className="text-xl font-bold text-gray-900">消音設計</h3>
                  </div>
                </div>
                <div className="aspect-video bg-gray-100">
                  <Image
                    src="/images/brands/audient/id48/function_07.svg"
                    alt="消音設計"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 pt-4">
                  <p className="text-gray-700 leading-relaxed">
                    ファンレス設計のiD48は、どんな状況でもほぼ完全な静音性が実現できます。あらゆるスタジオ環境に適合します。
                  </p>
                </div>
              </div>

              {/* Feature 8: Looks good, feels good */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="p-6 pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl font-bold text-cyan-400">8</span>
                    <h3 className="text-xl font-bold text-gray-900">Looks good, feels good</h3>
                  </div>
                </div>
                <div className="aspect-video bg-gray-100">
                  <Image
                    src="/images/brands/audient/id48/function_08.webp"
                    alt="Looks good, feels good"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 pt-4">
                  <p className="text-gray-700 leading-relaxed">
                    幅わずか44cm強、オールメタル構造で取り外し可能なラック イヤー* を備えた iD48 は、スタジオでもツアーなどの移動時の酷使にも耐えられるように設計されています。安定性、信頼性に優れ、いつでも使用できます。
                  </p>
                </div>
              </div>

              {/* Feature 9: アウトボード接続にフル対応 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="p-6 pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl font-bold text-cyan-400">9</span>
                    <h3 className="text-xl font-bold text-gray-900">アウトボード接続にフル対応</h3>
                  </div>
                </div>
                <div className="aspect-video bg-gray-100">
                  <Image
                    src="/images/brands/audient/id48/function_09.webp"
                    alt="アウトボード接続にフル対応"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 pt-4">
                  <p className="text-gray-700 leading-relaxed">
                    Dsub 接続によって、iD48は8つのバランスインサートを提供し、AD変換前にお気に入りのアウトボード FX を組み込めます。これにより、可能な限りクリーンな信号パスが構築でき、ステムミキシングやプリントバックに適応できます。
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
              <Image
                src="/images/brands/audient/id48/control_01.png"
                alt="Control 1"
                width={800}
                height={600}
                className="w-full max-w-4xl h-auto rounded-xl"
              />
            </div>

            {/* Second Control Image */}
            <div className="flex justify-center">
              <Image
                src="/images/brands/audient/id48/control_02.png"
                alt="Control 2"
                width={800}
                height={600}
                className="w-full max-w-4xl h-auto rounded-xl"
              />
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
            {/* Laptop Image */}
            <div className="text-center mb-12">
              <Image
                src="/images/brands/audient/id48/software_01.webp"
                alt="iD Mixer App"
                width={1000}
                height={600}
                className="w-full max-w-5xl h-auto rounded-xl mx-auto"
              />
            </div>

            {/* Bottom Section: Video and Description */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left: Video */}
              <div>
                <p className="text-lg font-bold text-gray-900 mb-4">ミキサーソフトウェア</p>
                <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg mb-4">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/Cht39J3uF1o"
                    title="iD48 Software Overview"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <p className="text-sm text-gray-500">※ 日本語の自動翻訳機能がご利用頂けます。</p>
              </div>

              {/* Right: Description and Download */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">スマートなミキサーAPP</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  早い操作に最適化されたiDミキサーは、ミキシングのスピードアップに最高の味方です。超低レイテンシーのダイレクトモニタリングをすばやく設定し、最大４つのステレオ キュー ミックスを作成し、レイアウト プリセットを保存、高度なルーティングをすばやく設定できます。これらはすべて、１つの使いやすいアプリから実行できます。（※各セクション、各機能の役割は、ユーザーマニュアルをご覧ください。）
                </p>
                <p className="text-gray-700 mb-6">
                  iD Mixer Appは、Audient WEBサイトからダウンロードして頂けます。
                </p>
                <a
                  href="https://audient.com/products/audio-interfaces/id48/downloads/"
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
                  <Image src="/images/brands/audient/id48/handlesoft_01.svg" alt="Softube" width={120} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/id48/handlesoft_02.webp" alt="Softube Flow" width={300} height={180} className="w-full h-auto rounded-lg" />
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
                  <Image src="/images/brands/audient/id48/handlesoft_03.svg" alt="GForce" width={120} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/id48/handlesoft_04.webp" alt="GForce AXXESS" width={300} height={180} className="w-full h-auto rounded-lg" />
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
                  <Image src="/images/brands/audient/id48/handlesoft_05.png" alt="Strymon" width={120} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/id48/handlesoft_06.png" alt="BigSky" width={300} height={180} className="w-full h-auto rounded-lg" />
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
                  <Image src="/images/brands/audient/id48/handlesoft_07.png" alt="Steinberg" width={120} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/id48/handlesoft_08.png" alt="Cubase" width={300} height={180} className="w-full h-auto rounded-lg" />
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
                  <Image src="/images/brands/audient/id48/handlesoft_09.png" alt="Steinberg" width={120} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/id48/handlesoft_10.jpg" alt="Retrologue" width={300} height={180} className="w-full h-auto rounded-lg" />
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
                  <Image src="/images/brands/audient/id48/handlesoft_11.png" alt="GForce" width={120} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/id48/handlesoft_12.png" alt="M-Tron Pro LE" width={300} height={180} className="w-full h-auto rounded-lg" />
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
                  <Image src="/images/brands/audient/id48/handlesoft_13.png" alt="Two Notes" width={120} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/id48/handlesoft_14.png" alt="Torpedo" width={300} height={180} className="w-full h-auto rounded-lg" />
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
                  <Image src="/images/brands/audient/id48/handlesoft_15.svg" alt="Subito Piano" width={120} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/id48/handlesoft_16.svg" alt="Subito Piano" width={300} height={180} className="w-full h-auto rounded-lg" />
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
                  <Image src="/images/brands/audient/id48/handlesoft_17.png" alt="Waldorf" width={120} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/id48/handlesoft_18.png" alt="Waldorf Edition" width={300} height={180} className="w-full h-auto rounded-lg" />
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
                  <Image src="/images/brands/audient/id48/handlesoft_19.png" alt="Produce Like A Pro" width={150} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/id48/handlesoft_20.png" alt="Produce Like A Pro" width={300} height={180} className="w-full h-auto rounded-lg" />
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
                  <Image src="/images/brands/audient/id48/handlesoft_21.png" alt="Loopcloud" width={150} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/id48/handlesoft_22.png" alt="Loopcloud" width={300} height={180} className="w-full h-auto rounded-lg" />
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
      <section id="faq" className="py-20 bg-white">
        <style jsx>{`
          details summary::-webkit-details-marker {
            display: none;
          }
          details summary {
            list-style: none;
          }
          details[open] summary .plus-icon::before {
            content: "−";
          }
          details:not([open]) summary .plus-icon::before {
            content: "+";
          }
        `}</style>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">よくある質問</h2>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              {/* FAQ Item 1 */}
              <details className="bg-gray-100 rounded-lg overflow-hidden">
                  <summary className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-200 transition-colors bg-gray-100">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 font-bold">?</span>
                    </div>
                    <span className="flex-1 text-gray-900 font-medium">iD48 - Pro Toolsでハードウェアインサートを使用するには</span>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center plus-icon">
                      <span className="text-gray-600 font-bold"></span>
                    </div>
                  </summary>
                  <div className="p-4 pt-0 border-t border-gray-300 bg-gray-100">
                    <div className="pl-11 text-gray-700 space-y-4">
                      <p>
                        iD48 のライン出力と ADC入力接続を使用すると、ハードウェア エフェクトをハードウェア インサートとして DAW セッションに追加できます。ほとんどのDAWで、インサートごとに使用する出力チャンネルと入力チャンネルを自由に割り当てることができます。ただし、Pro Toolsの場合は、インサートの入力チャンネルと出力チャンネルで同じチャンネル番号を使用するという、若干異なるアプローチが採用されています。
                      </p>
                      
                      <div className="my-4">
                        <Image
                          src="/images/brands/audient/id48/Q&A_01.png"
                          alt="Pro Tools I/O Setup"
                          width={800}
                          height={500}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>

                      <p>
                        例えば、インサート 1を使用する場合は、出力チャンネル 1と入力チャンネル 1を使用します。これを可能にする方法には、iD48 のライン出力を DAWアナログモードに設定し、以下の図に示すように iD48のライン出力を出力チャンネル1 ～ 8に揃えます。
                      </p>

                      <div className="my-4">
                        <Image
                          src="/images/brands/audient/id48/Q&A_02.png"
                          alt="iD48 Output Routing"
                          width={800}
                          height={500}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>

                      <p>
                        例えば、Pro Tools で Insert 3 を使用する場合は、システム パネル内でライン出力3を DAW ANALOGUEに設定します。（ヒント: stereo/monoボタンをクリックして、ステレオ ペアをモノラル出力に変更します。）
                      </p>

                      <div className="my-4">
                        <Image
                          src="/images/brands/audient/id48/Q&A_03.png"
                          alt="iD48 Line Output Routing"
                          width={800}
                          height={500}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>

                      <p>
                        ハードウェア エフェクトの入力をライン出力 DB25ルームのチャンネル 3 に接続し、ハードウェア エフェクトの出力を ADC入力 DB25 ルームのチャンネル 3に接続します。最後に、iD ミキサーでチャンネル 3のADC パスを「ADC Direct」に設定します。（下図参照）
                      </p>

                      <div className="my-4">
                        <Image
                          src="/images/brands/audient/id48/Q&A_04.png"
                          alt="iD48 ADC Path Setting"
                          width={800}
                          height={500}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>

                      <p>
                        また、ソフトウェア ミキサーで DAW 3 フェーダーと Mic 3 フェーダーが引き上げられている場合は、インサートしたオーディオがメインミックスに送られないように、これらのフェーダーを下げてください。
                      </p>

                      <p>
                        これで、Pro Tools で再生ボタンを押すと、信号がトラックからハードウェア エフェクトに送信され、再びトラックに戻ります。これは、プラグインを使用する場合と同じです。アナログ ハードウェアの優れたサウンドが得るには見逃せない手法です。
                      </p>

                      <p>
                        ただし、このセットアップで発生する可能性のある 1つの問題点は、出力 1+2 は通常モニターへのフィードに使用され、これらのチャンネルを Pro Tools のインサート 1および 2に使用すると、これが中断されてしまいます。8 つのインサート チャンネルすべてを使用しない場合は、もちろん、最初の2 つのインサートをスキップして、これらのチャンネルをモニタリング用にとっておきます。
                      </p>

                      <p>
                        あるいは、８つのインサートを同時に使用したい場合は、Pro Tools からのメイン出力を出力チャンネル 9+10 に送り、iD ソフトウェア ミキサーでこれをメイン ミックスにルーティングしてモニターできます。I/O 設定で、Pro Tools のモニター出力を出力チャンネル 9+10 にアサインします。これは、「S/PDIF/ADAT 1 +2」と表示されることもあります。
                      </p>

                      <div className="my-4">
                        <Image
                          src="/images/brands/audient/id48/Q&A_05.png"
                          alt="Pro Tools Monitor Path"
                          width={800}
                          height={500}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>

                      <p>
                        iD ミキサー内で、DAW 9 および DAW 10 チャンネルのフェーダーを上げ、他の DAW チャンネルのフェーダーを下げます（下図参照）。
                      </p>

                      <div className="my-4">
                        <Image
                          src="/images/brands/audient/id48/Q&A_06.png"
                          alt="iD48 Mixer Fader Levels"
                          width={800}
                          height={500}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>

                      <p>
                        これで、８つのインサートすべてを使用しながら、メイン ミックスをモニターとヘッドフォンにオーディオを再生できます。
                      </p>

                      <p>
                        ただし、上記の設定は、外部トークバック ソース (DAW 10 チャンネルも使用) と、最初の 2 つのオプト出力チャンネル (出力チャンネル 9+10 からも供給) の使用が制限される可能性があることに注意してください。より複雑な設定でサポートが必要な場合は、サポート チームにお問い合わせください。サポート チームがお手伝いいたします。
                      </p>
                    </div>
                  </div>
                </details>

                {/* FAQ Item 2 */}
                <details className="bg-gray-100 rounded-lg overflow-hidden">
                  <summary className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-200 transition-colors bg-gray-100">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 font-bold">?</span>
                    </div>
                    <span className="flex-1 text-gray-900 font-medium">ID48-ADC パスの説明</span>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center plus-icon">
                      <span className="text-gray-600 font-bold"></span>
                    </div>
                  </summary>
                  <div className="p-4 pt-0 border-t border-gray-300 bg-gray-100">
                    <div className="pl-11 text-gray-700 space-y-4">
                      <p>
                        iD48 の各入力には、独自のADCパス設定があります。これは、アナログ/デジタル コンバーターがどのソースから信号を取得するか、およびバランス インサートが信号パスでどのように使用されるかを制御します。
                      </p>
                      
                      <p>
                        選択できる ADC パスには次の3つがあります。
                      </p>
                      
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>マイク</li>
                        <li>ADC ダイレクト</li>
                        <li>マイク インサート</li>
                      </ul>

                      <div className="my-4">
                        <Image
                          src="/images/brands/audient/id48/Q&A_13.png"
                          alt="iD48 ADC Path Settings"
                          width={800}
                          height={500}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>

                      <p>
                        この設定はチャンネルごとにできるため、1つのチャンネルを「マイク」モード、別のチャンネルを「ADC ダイレクト」モード、別のチャンネルを「マイク挿入モード」に設定可能です。
                      </p>
                      
                      <p>
                        各 ADCパスのルーティングの説明は以下をご覧ください。
                      </p>

                      <h4 className="font-bold text-lg mt-6 mb-3">Mic</h4>
                      
                      <div className="my-4">
                        <Image
                          src="/images/brands/audient/id48/Q&A_14.png"
                          alt="iD48 Mic Mode Routing"
                          width={800}
                          height={500}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                      
                      <p>
                        マイク モードでは、ADC はコンビXLR/TRSジャックから直接信号が供給されます。ADC 入力/インサート リターンDB25コネクターは使用されません。
                      </p>
                      
                      <p>
                        ライン出力/インサート センド DB25コネクターは、DAC (デジタル アナログ コンバーター) から供給される追加のライン出力チャンネルとして使用されます。iD ミキサーアプリのルーティング マトリックスを使用し、ライン出力に送られるオーディオが選択できます。
                      </p>

                      <h4 className="font-bold text-lg mt-6 mb-3">ADC Direct</h4>
                      
                      <div className="my-4">
                        <Image
                          src="/images/brands/audient/id48/Q&A_15.png"
                          alt="iD48 ADC Direct Mode Routing"
                          width={800}
                          height={500}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                      
                      <p>
                        ADCダイレクト モードでは、図のようにADCは ADC入力/インサートリターン DB25コネクターから供給されます。
                      </p>
                      
                      <p>
                        調整されるチャネルは、DB25 コネクターから取得されるチャネル番号です。たとえば、入力 1 の ADCパスを調整する場合、ADC入力 DB25コネクターのチャネル 1が使用されます。DB25 のどのチャネルが使用されているかを切り替えることはできません。その柔軟性が必要な場合は外部パッチ ベイの使用をお勧めします。
                      </p>
                      
                      <p>
                        このモードでは、コンビ XLR/TRS ジャックは使用されません。
                      </p>
                      
                      <p>
                        ライン出力/インサート センド DB25コネクターは、DACから供給される追加のライン出力チャンネルとして使用され、「マイク」モードとまったく同じ方法で使用されます。
                      </p>

                      <h4 className="font-bold text-lg mt-6 mb-3">Mic Insert</h4>
                      
                      <div className="my-4">
                        <Image
                          src="/images/brands/audient/id48/Q&A_16.png"
                          alt="iD48 Mic Insert Mode Routing"
                          width={800}
                          height={500}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                      
                      <p>
                        マイクインサートモードでは、コンビ XLR/TRSジャックがライン出力/インサート送信 DB25 コネクターに信号を送信し、ADC には ADC入力/インサートリターン DB25 コネクターから信号が供給されます。
                      </p>
                      
                      <p>
                        これにより、インサート センド ポイントとリターン ポイントの間にハードウェア エフェクトと外部機器を追加できます。ハードウェア コンプレッサー、EQ、リバーブ、その他のエフェクトがこれに該当します。これらのエフェクトは録音時にキャプチャーされます。
                      </p>
                      
                      <p>
                        このモードでは、インサート送信として使用されているため、DACからライン出力 DB25 コネクターにオーディオを送ることはできません。
                      </p>
                    </div>
                  </div>
                </details>

                {/* FAQ Item 3 */}
                <details className="bg-gray-100 rounded-lg overflow-hidden">
                  <summary className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-200 transition-colors bg-gray-100">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 font-bold">?</span>
                    </div>
                    <span className="flex-1 text-gray-900 font-medium">iD48 - iD48の電源をオン/オフにするにはどうすればいいですか?</span>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center plus-icon">
                      <span className="text-gray-600 font-bold"></span>
                    </div>
                  </summary>
                  <div className="p-4 pt-0 border-t border-gray-300 bg-gray-100">
                    <div className="pl-11 text-gray-700 space-y-4">
                      <p>
                        iD48 は使用していないときは、電力を節約するために電源をオフにすることができます。
                      </p>
                      
                      <p>
                        ユニットの電源をオフにするには、メイン エンコーダーを 3秒間長押しします。ユニットの電源がオフになっていることを示す短い LEDアニメーションが表示されます。
                      </p>
                      
                      <p>
                        ユニットの電源を再度オンにするには、メイン エンコーダー ボタンを 1回押します。別の短い LED アニメーションが表示され、ユニットが再び起動します。
                      </p>

                      <div className="my-4">
                        <Image
                          src="/images/brands/audient/id48/Q&A_19.png"
                          alt="iD48 Power On/Off"
                          width={800}
                          height={500}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </details>

                {/* FAQ Item 4 */}
                <details className="bg-gray-100 rounded-lg overflow-hidden">
                  <summary className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-200 transition-colors bg-gray-100">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 font-bold">?</span>
                    </div>
                    <span className="flex-1 text-gray-900 font-medium">iD48 - ループバックの設定方法</span>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center plus-icon">
                      <span className="text-gray-600 font-bold"></span>
                    </div>
                  </summary>
                  <div className="p-4 pt-0 border-t border-gray-300 bg-gray-100">
                    <div className="pl-11 text-gray-700 space-y-4">
                      <p>
                        iD48 のソフトウェア ミキサーにはループバックする機能があります。専用のループバック チャネルを使用して、コンピューター上のさまざまなアプリケーションから、オーディオを録音またはストリーミングが可能です。
                      </p>
                      
                      <p>
                        iD ソフトウェア ミキサーのさまざまなソースから選択し、ループバック チャネルに供給できます。
                      </p>
                      
                      <p>
                        ループバック ソースは入力チャンネル 23+24 に送られ、オーディオ ソフトウェアまたは DAWでキャプチャできるようになります。ループバック ソースとして「ADAT 15+16」を選択しない限り、入力チャンネル 23+24 も使用する ADAT チャンネル 15+16 が上書きされることに注意してください。
                      </p>
                      
                      <p>
                        以下に示すように、iD メニューで「Input Routing/入力ルーティング」をクリックすると、ループバック ソースを選択できます。
                      </p>

                      <div>
                        <p className="font-bold mb-2">macOS</p>
                        <div className="my-4">
                          <Image
                            src="/images/brands/audient/id48/Q&A_07.png"
                            alt="iD48 macOS Input Routing"
                            width={800}
                            height={500}
                            className="w-full h-auto rounded-lg"
                          />
                        </div>
                      </div>

                      <div>
                        <p className="font-bold mb-2">Windows</p>
                        <div className="my-4">
                          <Image
                            src="/images/brands/audient/id48/Q&A_08.png"
                            alt="iD48 Windows Input Routing"
                            width={800}
                            height={500}
                            className="w-full h-auto rounded-lg"
                          />
                        </div>
                      </div>

                      <p>
                        メニューから選択できるさまざまなソースは次のとおりです。
                      </p>

                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li><strong>ADAT 15+16</strong> - ループバックを無効にし、ADAT 入力 15+16 を使用します。</li>
                        <li><strong>DAW 1+2</strong> - iD48 の出力 1+2 に送信されるすべてのオーディオ</li>
                        <li><strong>DAW 3+4</strong> - iD48 の出力 3+4 に送信されるすべてのオーディオ</li>
                        <li><strong>DAW 5+6</strong> - iD48 の出力 5+6 に送信されるすべてのオーディオ</li>
                        <li><strong>DAW 7+8</strong> - iD48 の出力 7+8 に送信されるすべてのオーディオ</li>
                        <li><strong>DAW 9+10</strong> - iD48 の出力 9+10 に送信されるすべてのオーディオ</li>
                        <li><strong>Master Mix</strong> - iD ソフトウェア ミキサーのメイン ミックス タブで作成されたオーディオ ミックス</li>
                        <li><strong>Cue A</strong> - iD ソフトウェア ミキサーのキュー A タブで作成されたオーディオ ミックス</li>
                        <li><strong>Cue B</strong> - iD ソフトウェア ミキサーのキュー B タブで作成されたオーディオ ミックス</li>
                        <li><strong>Cue C</strong> - iD Software Mixer の CUE C タブ</li>
                        <li><strong>Cue D</strong> - iD Software Mixer の CUE D タブで作成されたオーディオ ミックス</li>
                      </ul>

                      <h4 className="font-bold text-lg mt-6 mb-3">ループバック入力の使用</h4>
                      
                      <p>
                        オーディオ ソフトウェアでループバック ミックスを録音またはストリーミングするには、オーディオ ソフトウェアでループバック チャンネルを入力チャンネルとして選択するだけです。使用しているソフトウェアによっては、ループバック 1+2 または入力 23-24 として表示されることがあります。たとえば、下の画像は、Logic Pro X でループバック入力を選択する方法です。
                      </p>

                      <div className="my-4">
                        <Image
                          src="/images/brands/audient/id48/Q&A_09.png"
                          alt="Logic Pro X Loopback Input"
                          width={800}
                          height={500}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>

                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
                        <p className="text-sm">
                          <strong>注意：</strong>他のソフトウェアでも同様のプロセスが使用できます。オーディオ ソフトウェアの入力を調整する方法がわからない場合は、ソフトウェアのユーザー マニュアルを参照してください。Windowsでは、システム設定でオーディオ デバイスをアナログ 1+2 からループバック 1+2 に調整する必要がある場合もあります。
                        </p>
                      </div>

                      <h4 className="font-bold text-lg mt-6 mb-3">ループバックソースの録音/ストリーミング</h4>
                      
                      <p>
                        録音/ストリーミング ソフトウェアでループバック入力をオーディオ ソースとして選択した後、iD ソフトウェア ミキサーを使用してループバック ミックスが設定きます。
                      </p>
                      
                      <p>
                        最初のステップは、ループバック ストリームに使用するソースを決定することです。
                      </p>
                      
                      <p>
                        コンピューターからのオーディオとマイク/楽器を 1つのミックスにする場合は、メイン ミックスまたはキュー ミックスのいずれかを選択するのが最適です。iD ソフトウェア ミキサーのフェーダーを用いて、複数のチャンネルを同じミックスへ送れるためです。
                      </p>
                      
                      <p>
                        例えば、以下では、CUE A ミックスがループバック ソースとして使用され、マイク 1 と DAW 1+2 が CUE A ミックスへ送られていることがわかります。この設定でループバック入力を録音すると、マイク チャンネルとコンピューターの再生の両方が1つのステレオ チャンネルで聴こえます。
                      </p>

                      <div className="my-4">
                        <Image
                          src="/images/brands/audient/id48/Q&A_10.png"
                          alt="iD48 CUE A Mix Setup"
                          width={800}
                          height={500}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>

                      <p>
                        それ以外の場合、マイク信号なしでコンピューターからのオーディオのみをループバックしたい場合は、DAW チャンネルの1つだけ使用できます。
                      </p>
                      
                      <p>
                        ループバック ソースとしてチャンネルまたはミックスを選択すると、そのチャンネル/ミックスに小さなループバック アイコンが表示されるので、一目見るだけでループバック機能がどのソースから送られているかが確認できます。
                      </p>

                      <div className="my-4">
                        <Image
                          src="/images/brands/audient/id48/Q&A_11.png"
                          alt="iD48 Loopback Icon"
                          width={800}
                          height={500}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>

                      <h4 className="font-bold text-lg mt-6 mb-3">出力チャンネルの調整</h4>
                      
                      <p>
                        ループバック ミックスを設定するときは、通常 DAW 1+2 に送られるメイン モニターミックスとは別に、コンピューター オーディオを DAW 3+4、DAW 5+6、DAW 7+8、または DAW 9+10 へ送るように設定することをお勧めします。
                      </p>
                      
                      <p>
                        ほとんどの DAW ソフトウェアでは、新しい出力センドを作成したり、出力チャンネルを調整したりすることができます。これを行うプロセスはソフトウェアによって異なりますので、出力チャンネルの調整方法については、選択したソフトウェアのユーザー マニュアルを参照することをお勧めします。
                      </p>
                      
                      <p>
                        出力チャネルを調整するオプションがないアプリケーション (メディア プレーヤー、ビデオ通話など) では、システム設定でこれを調整する必要がある場合があります。
                      </p>

                      <div>
                        <p className="font-bold mb-2">macOS</p>
                        <p className="mb-4">
                          Finder を開き、アプリケーション &gt; ユーティリティ &gt; Audio MIDI 設定に移動します。Audio MIDI 設定ユーティリティで、デバイスのリストから iD48 を選択します。[Output Tab/出力タブ] を選択し、[Configure Speakers/スピーカーの構成] をクリックします。次に、iD48 のどのチャンネルを左右の出力にするか選択できます。チャンネル 3+4 は DAW 3+4 に関連し、チャンネル 5+6 は DAW 5+6 に関連します...
                        </p>
                        <div className="my-4">
                          <Image
                            src="/images/brands/audient/id48/Q&A_12.png"
                            alt="macOS Audio MIDI Setup"
                            width={800}
                            height={500}
                            className="w-full h-auto rounded-lg"
                          />
                        </div>
                      </div>

                      <div>
                        <p className="font-bold mb-2">Windows</p>
                        <p>
                          「Start/スタート」メニューを開き、「Settings/設定」を選択します。設定で、「システム &gt; サウンド」に移動します。「Output Device/出力デバイス」ドロップダウンメニューを使用して、出力に使用するチャンネルを選択できます。繰り返しますが、チャンネル3+4はDAW 3+4に関連し、チャンネル5+6はDAW 5+6に関連します...など。
                        </p>
                      </div>
                    </div>
                  </div>
                </details>

                {/* FAQ Item 5 */}
                <details className="bg-gray-100 rounded-lg overflow-hidden">
                  <summary className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-200 transition-colors bg-gray-100">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 font-bold">?</span>
                    </div>
                    <span className="flex-1 text-gray-900 font-medium">iD48 - ファンクションキーを割り当てるにはどうすればいいですか?</span>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center plus-icon">
                      <span className="text-gray-600 font-bold"></span>
                    </div>
                  </summary>
                  <div className="p-4 pt-0 border-t border-gray-300 bg-gray-100">
                    <div className="pl-11 text-gray-700 space-y-4">
                      <p>
                        iD48 のフロントパネルには、ユーザー割り当てが可能なファンクションキーが2つあり、ワークフローに最適な方法で iD48 を設定できます。
                      </p>

                      <div className="my-4">
                        <Image
                          src="/images/brands/audient/id48/Q&A_17.png"
                          alt="iD48 Front Panel Function Keys"
                          width={800}
                          height={500}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>

                      <p>
                        モノ、位相反転、DIM、カットの各機能がファンクションキーに割り当てできます。キーに機能を割り当てるには、iD ミキサーアプリケーションを開き、割り当てたい機能を右クリックして、割り当て先のキーを選択します。
                      </p>

                      <div className="my-4">
                        <Image
                          src="/images/brands/audient/id48/Q&A_18.png"
                          alt="iD48 Function Key Assignment"
                          width={800}
                          height={500}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>

                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
                        <p className="text-sm">
                          <strong>注意：</strong>キーに機能を割り当てると、以前の割り当てが削除されることに注意してください。
                        </p>
                      </div>
                    </div>
                  </div>
                </details>
            </div>
          </div>
        </div>
      </section>

      {/* Specs Section */}
      <section id="specs" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">製品仕様</h2>
              
              <div className="space-y-8">
                {/* マイク・プリアンプ */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300">マイク・プリアンプ（ADCシグナルパスを含む）</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">マイクゲインレンジ：</span>
                      <span className="text-gray-900 ml-2">0 to 68dB（with 10dB Gain Boost）</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">ラインゲインレンジ：</span>
                      <span className="text-gray-900 ml-2">-10 to 58dB（with 10dB Gain Boost）</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">ファンタム電源：</span>
                      <span className="text-gray-900 ml-2">48V +/-4V @ 10mA/Channel</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">Mic EIN（等価入力雑音）：</span>
                      <span className="text-gray-900 ml-2">&lt;-127.0dBu</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">CMRR（同相信号除去比）：</span>
                      <span className="text-gray-900 ml-2">&gt;80dB @ 1kHz</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">最大入力レベル：</span>
                      <span className="text-gray-900 ml-2">+18dBu</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">入力インピーダンス（Mic）：</span>
                      <span className="text-gray-900 ml-2">3kΩ Balanced</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">入力インピーダンス（Line）：</span>
                      <span className="text-gray-900 ml-2">10kΩ Balanced</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">周波数特性：</span>
                      <span className="text-gray-900 ml-2">+/-0.5dB 10Hz to 65kHz</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">クロストーク：</span>
                      <span className="text-gray-900 ml-2">&lt;-115dB @ 1kHz &amp; 10kHz</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">THD+N @ 0dBu（1kHz）：</span>
                      <span className="text-gray-900 ml-2">0.0016%（-96dB）</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">SNR：</span>
                      <span className="text-gray-900 ml-2">99dB A-Weighted</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">XLR：</span>
                      <span className="text-gray-900 ml-2">Pin 2（Hot）, Pin 3（Cold）&amp; Pin 1（Shield）</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">1/4&rdquo;TRS Phone Jack：</span>
                      <span className="text-gray-900 ml-2">TIP（Hot）&amp; SLEEVE（Shield）</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">PAD：</span>
                      <span className="text-gray-900 ml-2">-10dB</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">Low-cut filter：</span>
                      <span className="text-gray-900 ml-2">-3dB @ 100Hz, 2nd Order（12dB/Octave）</span>
                    </div>
                  </div>
                </div>

                {/* D.I /インストゥルメント入力 */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300">D.I /インストゥルメント入力（ch1 &amp; ch2）</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">D.I GAIN：</span>
                      <span className="text-gray-900 ml-2">0 to 68dB（with 10dB Gain Boost）</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">最大入力レベル：</span>
                      <span className="text-gray-900 ml-2">+15 dBu</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">入力インピーダンス：</span>
                      <span className="text-gray-900 ml-2">500kΩ アンバランス</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">周波数特性：</span>
                      <span className="text-gray-900 ml-2">±0.5 dB 10Hz to 40kHz</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">THD+N @ 0dBu (1kHz)：</span>
                      <span className="text-gray-900 ml-2">&lt;0.06%</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">SNR：</span>
                      <span className="text-gray-900 ml-2">96dB A-Weighted</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">1/4&rdquo;ジャック：</span>
                      <span className="text-gray-900 ml-2">TIP (Hot) &amp; SLEEVE（Shield）</span>
                    </div>
                  </div>
                </div>

                {/* ADコンバーター */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300">ADコンバーター</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">最大入力レベル：</span>
                      <span className="text-gray-900 ml-2">+18dBu（0 dBFS最大入力）</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">デジタルリファレンスレベル：</span>
                      <span className="text-gray-900 ml-2">0 dBFS = +18dBu</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">入力インピーダンス：</span>
                      <span className="text-gray-900 ml-2">&gt;10kΩ Balanced</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">周波数特性：</span>
                      <span className="text-gray-900 ml-2">+/-0.5dB 10Hz to Fs/2（Nyquist）</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">クロストーク：</span>
                      <span className="text-gray-900 ml-2">&lt;-118dBu @ 1kHz、&lt;-115dB @ 10kHz</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">THD+N @ -1dBFS0（1kHz）：</span>
                      <span className="text-gray-900 ml-2">&lt;0.0003%（-110dB）</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">ダイナミックレンジ：</span>
                      <span className="text-gray-900 ml-2">120dB A-weighted</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">1/4&rdquo; TRS Phone Jack：</span>
                      <span className="text-gray-900 ml-2">TIP（Hot）、RING（Cold）&amp; SLEEVE（Shield）</span>
                    </div>
                  </div>
                </div>

                {/* DAコンバーター */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300">DAコンバーター（Monitor and Line Outputs）</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">最大入力レベル：</span>
                      <span className="text-gray-900 ml-2">+18dBu（0 dBFS最大入力）</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">出力インピーダンス：</span>
                      <span className="text-gray-900 ml-2">&lt;100Ω</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">周波数特性：</span>
                      <span className="text-gray-900 ml-2">+/-0.5dB 10Hz to Fs/2（Nyquist）</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">クロストーク：</span>
                      <span className="text-gray-900 ml-2">&lt;-120dBu @ 1kHz、&lt;-115dB @ 10kHz</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">THD+N @ -1dBFS（1kHz）：</span>
                      <span className="text-gray-900 ml-2">&lt;0.00026%（-111.5dB）</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">ダイナミックレンジ：</span>
                      <span className="text-gray-900 ml-2">124dB un-weighted、126.5dB A-weighted</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">1/4&rdquo; TRS Phone Jack：</span>
                      <span className="text-gray-900 ml-2">TIP（Hot）、RING（Cold）&amp; SLEEVE（Shield）</span>
                    </div>
                  </div>
                </div>

                {/* ヘッドホン出力 */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300">ヘッドホン出力（AES-17に基づきPHONES出力にて測定）</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">最大出力レベル：</span>
                      <span className="text-gray-900 ml-2">+18dBu（0 dBFSデジタル最大レベル）</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">出力インピーダンス：</span>
                      <span className="text-gray-900 ml-2">&lt;50Ω unbalanced</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">周波数特性：</span>
                      <span className="text-gray-900 ml-2">±0.5dB 10Hz to Fs/2</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">クロストーク：</span>
                      <span className="text-gray-900 ml-2">&lt;-117dBu @ 1kHz、&lt;-112dB @ 10kHz</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">THD+N @ -1dBFS（1kHz）：</span>
                      <span className="text-gray-900 ml-2">&lt;0.00023%（-112dB）</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">ダイナミックレンジ：</span>
                      <span className="text-gray-900 ml-2">121dB Un-weighted、124dB A-weighted</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">最大入力レベル（30Ω）：</span>
                      <span className="text-gray-900 ml-2">4V Peak, 2.85V RMS, 530mW</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">最大入力レベル（60Ω）：</span>
                      <span className="text-gray-900 ml-2">5.82V Peak, 4.12V RMS, 565mW</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">最大入力レベル（600Ω）：</span>
                      <span className="text-gray-900 ml-2">8.71V Peak, 6.16V RMS, 126mW</span>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">1/4&rdquo;ジャック：</span>
                      <span className="text-gray-900 ml-2">TIP（Left）、RING（Right）&amp; SLEEVE（Shield）</span>
                    </div>
                  </div>
                </div>

                {/* サイズ */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300">サイズ</h3>
                  <div className="text-sm">
                    <div className="py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">Dimensions：</span>
                      <span className="text-gray-900 ml-2">437mm（w）x 50mm（h）x 327mm（d）</span>
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

