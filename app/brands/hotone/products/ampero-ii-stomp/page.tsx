"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Download, ChevronDown, ChevronUp, Plus, HelpCircle, Minus } from 'lucide-react'
import { BlogSlider } from "@/components/blog-slider"
import { downloadManual } from "@/lib/manual-download"

type Section = "concept" | "demo" | "features" | "controls" | "connections" | "software" | "manual" | "faq" | "specs"

const navigationItems = [
  { id: "concept" as Section, label: "コンセプト" },
  { id: "demo" as Section, label: "デモムービー" },
  { id: "features" as Section, label: "主な機能" },
  { id: "controls" as Section, label: "コントロール" },
  { id: "connections" as Section, label: "接続例" },
  { id: "software" as Section, label: "ソフトウェア" },
  { id: "manual" as "manual", label: "取扱説明書", isDownload: true },
  { id: "faq" as Section, label: "よくある質問" },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function AmperoIIStompPage() {
  const [activeSection, setActiveSection] = useState<Section>("concept")
  const [headerHeight, setHeaderHeight] = useState(72)
  const [expandedSoftware, setExpandedSoftware] = useState<{ [key: string]: boolean }>({})
  const [expandedFAQ, setExpandedFAQ] = useState<{ [key: string]: boolean }>({})

  const toggleSoftware = (key: string) => {
    setExpandedSoftware((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const toggleFAQ = (key: string) => {
    setExpandedFAQ((prev) => ({
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
    downloadManual("hotone", "ampero-ii-stomp")
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
          src="/images/brands/hotone/ampero_ii_stomp/hero.jpg"
          alt="AMPERO II STOMP"
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
                <p className="text-2xl font-bold text-gray-900">AMPERO II STOMP</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">アンプモデラー＆エフェクター</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-hotone">
                  ¥86,900 <span className="text-sm font-normal text-gray-600">前後（税込）</span>
                </p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">6959473905081</p>
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

      {/* Intro Section */}
      <section className="py-20 scroll-mt-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              アップグレードでは納まらない飛躍的な進化
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              ジェネレーション"Ⅱ"の力強い幕開けです。
            </h3>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Image and Related Info */}
            <div className="space-y-8">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/brands/hotone/ampero_ii_stomp/intro.jpg"
                  alt="AMPERO II STOMP"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>

              {/* Related Info Links */}
              <div className="space-y-3">
                <h4 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-2">関連情報</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-hotone">📢</span>
                    <a href="#" className="text-gray-700 hover:text-hotone">Ampero IIシリーズに対応の新機能「Sound Clone」が正式リリース</a>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500">📄</span>
                    <a href="#" className="text-gray-700 hover:text-hotone">Ampero II Stomp 日本語ユーザーマニュアル</a>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500">📄</span>
                    <a href="#" className="text-gray-700 hover:text-hotone">Ampero II Stomp エフェクトリスト（日本語版）</a>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500">📄</span>
                    <a href="#" className="text-gray-700 hover:text-hotone">Ampero II Stomp クイックマニュアル</a>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500">📄</span>
                    <a href="#" className="text-gray-700 hover:text-hotone">Ampero II Stomp ドラムリズムリスト</a>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500">📄</span>
                    <a href="#" className="text-gray-700 hover:text-hotone">Ampero II Stomp MIDI コントロール・インフォメーション・リスト</a>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500">🔗</span>
                    <a href="#" className="text-gray-700 hover:text-hotone">AMPERO II Stomp 製品情報</a>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500">🔗</span>
                    <a href="#" className="text-gray-700 hover:text-hotone">USBオーディオ（I/O）のサンプリングレートの切替方法はこちらをご覧ください</a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column - Description */}
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  私たちが培ってきたデジタルテクノロジーが、いま新たなフェーズを迎えます。
                </p>
                <p className="text-gray-600 leading-relaxed">
                  アンペロシリーズの最新鋭機「AmperoⅡStomp」は、世界中に有り触れたアップグレードでは納まらない飛躍的な進化を遂げました。まさに「第二世代」と呼ぶに相応しいマルチストンプ新世代の幕開けです。
                </p>
                <p className="text-gray-600 leading-relaxed">
                  AmperoⅡStompは、ストンプボックスの１つとしてペダルボードに収まるサイズにその高い性能を凝縮しました。エクスプレッションペダルの無いすっきりとした筐体デザインに、豊富なインターフェースを搭載し、エクスプレッション＆MIDIでどんなアプリケーションにも対応できます。コンパクトで高い実用性を誇るAmperoⅡStompなら、どんなツアーにも対応できるシステムを組み上げることができます。
                </p>
                <p className="text-gray-800 leading-relaxed font-bold">
                  大きく飛躍を遂げたサウンドクオリティ
                </p>
                <p className="text-gray-600 leading-relaxed">
                  AmperoⅡStompには、パワフルなtri-core DSPとESS® Sabre® AD/DAコンバーターを採用。最大127dBのダイナミックレンジを誇る24-bitシグナルプロセッシングを武器に独自の「CDCM HD & F.I.R.E.モデリング」にさらに磨きをかけ、遂に、驚異的なサウンドクオリティにまで辿り着きました。
                </p>
                <p className="text-gray-800 leading-relaxed font-bold">
                  よりリアルに進化したIRパフォーマンス
                </p>
                <p className="text-gray-600 leading-relaxed">
                  2048 IRサンプルポイントを採用し、前ジェネレーション（1024サンプルポイント）の精度を上回るスペックに進化しました。キャビネットやスタジオアコースティックのキャプチャー精度が向上し、よりリアルなサウンドをお届けします。さらに、Celestion® Digitalが提供する20 classic Celestion®スピーカーIRも標準装備。ユーザーがロードできるスロットも追加され、IRパフォーマンスを一新しました。
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4 mt-8">
                <h4 className="text-xl font-bold text-gray-900">400＋のアンプ、エフェクト＆キャビネット</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    87種類のアンプモデル
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    68種類のキャビネットモデル
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    スタジオデーターに基づいた精度の高い７種類のマイクプレイスメント
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    ニュープリアンプモデル
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    パワーアンプエミュレーション
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    100+ ペダルモデリング
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    60+ Hotoneオリジナルエフェクト
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    300 プリセット（100 バンク x 3 パッチ）
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    世界中のミュージシャンと音色を共有できる「Sound Clone」に新対応
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Concept Section */}
      <section id="concept" className="py-16 scroll-mt-24 bg-concept-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">製品コンセプト</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="space-y-20">
            {/* Concept 1 - ジェネレーションⅡの力強い幕開け */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
              <div className="lg:col-span-2 rounded-2xl overflow-hidden flex justify-center">
                <video
                  src="/images/brands/hotone/ampero_ii_stomp/concept_01.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto max-w-xs"
                  />
                </div>
              <div className="lg:col-span-3 text-gray-300 space-y-6">
                <h3 className="text-3xl font-bold text-white">模索からの、新たな誕生。</h3>
                <h4 className="text-lg font-bold text-white">ジェネレーションⅡの力強い幕開け</h4>
                <p className="leading-relaxed text-gray-400">
                  Amperoは我々にとってはただのシリーズ名ではありません。良いデジタルエフェクトプロセッサーとは何か？・・・と問い続けてきた結晶とも言えるでしょう。また、クオリティの高いサウンドを楽しんでもらえる良質なペダルを手に届く価格で実現すること、それが重要な課題でもありました。プレーヤーが演奏を楽しめるサウンドを新しいジェネレーションⅡとともにお届けできることが幸せです。
                </p>
              </div>
            </div>

            {/* Concept 2 - CDCM HD + F.I.R.E */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">CDCM HD ＋ F.I.R.E（Field Impulse Response Enhancement）</h3>
              <div className="flex justify-center mb-6">
                  <Image
                  src="/images/brands/hotone/ampero_ii_stomp/concept_02.svg"
                  alt="CDCM HD + F.I.R.E"
                  width={500}
                  height={150}
                  className="h-auto"
                  />
                </div>
                <div className="text-gray-300 space-y-4">
                  <p className="leading-relaxed">
                  これまで、「サウンドが鈍い」「味気ない」「リアルさに欠ける」・・・と一般的に言われ続けてきたデジタルマルチのサウンド。私たちは、本物のアンプから感じるような生々しくリアルな音ができないものかと、開発に情熱を燃やし続けてきました。約10年に渡りリサーチやテストを繰り返し、ホワイトボックスモデリングやブラックボックスモデリングとは異なる、独自のCDCM HD + F.I.R.Eモデリングにたどり着きました。
                </p>
                  <p className="leading-relaxed">
                  オリジナルデバイスのパーツの音、入力信号の変化に追従するサウンドのダイナミックバリエーションを忠実になぞり、リアルトーンのフィーリングを再現することに成功しました。どんなプレーヤーもステージでそのリアルなサウンドに酔いしれることができる、そんなサウンドを実現したのです。
                  </p>
                </div>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-0.5 bg-gray-600" />
              </div>
            </div>

            {/* Concept 3 - Tri-core プラットフォーム */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Tri-core プラットフォーム</h3>
              <h4 className="text-xl text-gray-400">ニュー シグナルプロセッシング ステーション</h4>
              <div className="flex justify-center my-8">
                    <Image
                  src="/images/brands/hotone/ampero_ii_stomp/concept_03.png"
                  alt="Tri-core プラットフォーム"
                      width={600}
                  height={300}
                  className="h-auto"
                    />
                  </div>
              <div className="text-gray-300 space-y-4">
                  <p className="leading-relaxed">
                  デュアルコアDSP ADSP-21573（SHARC）＆ MCU NPX1052からなるtri-core（トライコア）デジタルプラットフォームを採用し、オリジナルAmperoの250％上回る演算力を得ました。音質に影響を与えるコンバーターにも高音質を誇るESS® Sabre®シリーズAD/DAコンバーターを採用。ハードウェアのグレードアップが、さらに磨きをかけた独自のCDCM HD＆F.I.R.Eモデリングソフトウェアを可能にしたのです。2ndジェネレーションに相応しい圧倒的な演算力と音質から、高いミュージカルダイナミクスと突き抜けるサウンドをお届けします。
                </p>
              </div>
            </div>

            {/* Concept 4 - Tone Catch モジュール */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="rounded-2xl overflow-hidden">
                  <Image
                  src="/images/brands/hotone/ampero_ii_stomp/concept_04.png"
                  alt="Tone Catch"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
                <div className="text-gray-300 space-y-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="text-sm text-orange-400 bg-orange-400/20 px-3 py-1 rounded">Firmware 2.1.0 新機能！</span>
                  <h3 className="text-2xl font-bold text-white">Tone Catch モジュールに対応</h3>
                </div>
                  <p className="leading-relaxed">
                  Firmware 2.1.0 アップデートにより、新機能「Tone Catch モジュール」に対応しました。Sound Clone 公式サイトからトーンをダウンロードし、Ampero II Stomp にソフトウェア経由でインポートすることができます。また、Sound Cloneを通じて世界中のユーザーからトーンを共有したり発見したりすることも可能です。
                  </p>
              </div>
            </div>

            {/* Concept 5 - Sound Clone */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="rounded-2xl overflow-hidden">
                  <Image
                  src="/images/brands/hotone/ampero_ii_stomp/concept_05.jpg"
                  alt="Sound Clone"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
                <div className="text-gray-300 space-y-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="text-sm text-orange-400 bg-orange-400/20 px-3 py-1 rounded">Firmware 2.3.1 新機能！</span>
                  <h3 className="text-2xl font-bold text-white">Sound Clone</h3>
                </div>
                  <p className="leading-relaxed">
                  Firmware 2.3.1 アップデートにより、Tone Catchモジュールが新たに「Sound Clone」へと進化しました。Sound Clone 公式サイトからトーンをダウンロードし、Ampero II Stomp にソフトウェア経由でインポートすることができるクローンの数が30へと大幅に増加しました。
                  </p>
                <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors mt-4">
                  <span>🌐</span> Sound Clone　詳しくはこちらをご覧ください
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Movie Section */}
      <section id="demo" className="py-20 scroll-mt-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">デモムービー</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Video 1 */}
              <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/6RhWtJ5n_Pc"
                  title="AMPERO II STOMP Demo 1"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              {/* Video 2 */}
              <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/minuTXDdaTg"
                  title="AMPERO II STOMP Demo 2"
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

      {/* Features Section */}
      <section id="features" className="py-20 scroll-mt-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">主な機能</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature 01 */}
            <div className="bg-gray-100 rounded-2xl overflow-hidden">
              <div className="bg-gray-200 px-6 py-4 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">デュアル エフェクト チェーン</h3>
                <span className="text-5xl font-bold text-gray-300">01</span>
              </div>
              <div className="p-4">
                <video
                  src="/images/brands/hotone/ampero_ii_stomp/function_01.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="px-6 pb-6">
                <p className="text-gray-600 text-sm leading-relaxed">
                  シリーズ/パラレル＆外部とのステレオFXループなど、自由にカスタマイズできるルーティングと同時使用可能な12エフェクトモジュールを搭載しました。2系統のオーディオ入力に対応できるデュアル エフェクト チェーンは、ギター＆ベースの同時プレイも可能です。
                </p>
              </div>
            </div>

            {/* Feature 02 */}
            <div className="bg-gray-100 rounded-2xl overflow-hidden">
              <div className="bg-gray-200 px-6 py-4 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">60秒ステレオルーパー</h3>
                <span className="text-5xl font-bold text-gray-300">02</span>
              </div>
              <div className="p-4">
                <video
                  src="/images/brands/hotone/ampero_ii_stomp/function_02.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="px-6 pb-6">
                <p className="text-gray-600 text-sm leading-relaxed">
                  AmperoⅡStompは、最長60秒録音可能なステレオ レコーディング ルーパー機能を備えています。このルーパーにはundo/redo、1/2 speed、reverse record/playなどの重要な機能もフル装備しています。ライブ再生時には、ルーパーソースをドライまたはウェットのどちらでも信号再生が可能です。
                </p>
              </div>
            </div>

            {/* Feature 03 */}
            <div className="bg-gray-100 rounded-2xl overflow-hidden">
              <div className="bg-gray-200 px-6 py-4 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">タッチ＆ゴーのスムーズナビゲーション</h3>
                <span className="text-5xl font-bold text-gray-300">03</span>
              </div>
              <div className="p-4">
                <video
                  src="/images/brands/hotone/ampero_ii_stomp/function_03.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="px-6 pb-6">
                <p className="text-gray-600 text-sm leading-relaxed">
                  AmperoⅡStompは、『使いやすさとスピード』を重視したナビゲーションによるユーザーインターフェースを再構築しました。ルーティング、スイッチングやレベルの各設定、スタイルによりカテゴリー分けされたアンプやエフェクターの選択が、新しいタッチスクリーンから軽快に行えます。
                </p>
              </div>
            </div>

            {/* Feature 04 */}
            <div className="bg-gray-100 rounded-2xl overflow-hidden">
              <div className="bg-gray-200 px-6 py-4 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">豊富なI/O</h3>
                <span className="text-5xl font-bold text-gray-300">04</span>
              </div>
              <div className="p-4">
                <video
                  src="/images/brands/hotone/ampero_ii_stomp/function_04.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="px-6 pb-6">
                <p className="text-gray-600 text-sm leading-relaxed">
                  インストルメント/ペダル/アンプ/インターフェース…どんなアプリケーション時の接続にも対応する入出力を装備しました。それらの入出力はワイド信号レベルレンジを備えたステレオ入出力です。また、外部からのコントロールはEXP/CTRLとMIDI In/Outで、パラメーターやパッチの切り替え、モジュラーのon/off等のコントロールもリアルタイムに操作できます。
                </p>
              </div>
            </div>
          </div>

          {/* Feature List */}
          <div className="mt-16 bg-gray-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {/* Row 1 */}
              <div className="flex items-start gap-3 text-sm text-gray-700 py-3 border-b border-gray-200">
                <span className="text-green-500 mt-0.5 text-lg">✓</span>
                <span>豊富な入出力でペダルボード上のエフェクターとのインターフェースも万全</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-700 py-3 border-b border-gray-200">
                <span className="text-green-500 mt-0.5 text-lg">✓</span>
                <span>MIDI I/Oジャック＆EXP/CTRLジャックとの接続による高度な外部コントロール</span>
              </div>
              {/* Row 2 */}
              <div className="flex items-start gap-3 text-sm text-gray-700 py-3 border-b border-gray-200">
                <span className="text-green-500 mt-0.5 text-lg">✓</span>
                <span>4インチ 800 x 480カラーダイナミックタッチスクリーンを採用</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-700 py-3 border-b border-gray-200">
                <span className="text-green-500 mt-0.5 text-lg">✓</span>
                <span>モバイルデバイス感覚で使えるユーザーインターフェースを実現</span>
              </div>
              {/* Row 3 */}
              <div className="flex items-start gap-3 text-sm text-gray-700 py-3 border-b border-gray-200">
                <span className="text-green-500 mt-0.5 text-lg">✓</span>
                <span>カスタマイズ可能なメインディスプレイモード</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-700 py-3 border-b border-gray-200">
                <span className="text-green-500 mt-0.5 text-lg">✓</span>
                <span>シリーズ/パラレルの複雑な接続まで可能なデュアルエフェクトチェーン</span>
              </div>
              {/* Row 4 */}
              <div className="flex items-start gap-3 text-sm text-gray-700 py-3 border-b border-gray-200">
                <span className="text-green-500 mt-0.5 text-lg">✓</span>
                <span>400+の豊富なエフェクトライブラリー</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-700 py-3 border-b border-gray-200">
                <span className="text-green-500 mt-0.5 text-lg">✓</span>
                <span>アコースティック用エフェクト＆プリセット</span>
              </div>
              {/* Row 5 */}
              <div className="flex items-start gap-3 text-sm text-gray-700 py-3 border-b border-gray-200">
                <span className="text-green-500 mt-0.5 text-lg">✓</span>
                <span>undo/redo 機能も備えた60秒ステレオルーパー</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-700 py-3 border-b border-gray-200">
                <span className="text-green-500 mt-0.5 text-lg">✓</span>
                <span>最大12エフェクトモジュールの同時使用が可能</span>
              </div>
              {/* Row 6 */}
              <div className="flex items-start gap-3 text-sm text-gray-700 py-3 border-b border-gray-200">
                <span className="text-green-500 mt-0.5 text-lg">✓</span>
                <span>エフェクトチェーン内でのエフェクトモジュールの選択が自由に行えます</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-700 py-3 border-b border-gray-200">
                <span className="text-green-500 mt-0.5 text-lg">✓</span>
                <span>ステレオI/O＆ステレオエフェクトループがルーティングや音作りの可能性を広げます</span>
              </div>
              {/* Row 7 */}
              <div className="flex items-start gap-3 text-sm text-gray-700 py-3 border-b border-gray-200">
                <span className="text-green-500 mt-0.5 text-lg">✓</span>
                <span>50 xローダースロットを備えたIRローダー（3rd party IR付き：20 x classic Celestion®）</span>
            </div>
              <div className="flex items-start gap-3 text-sm text-gray-700 py-3 border-b border-gray-200">
                <span className="text-green-500 mt-0.5 text-lg">✓</span>
                <span>2048 IRサンプリングポイントを採用</span>
              </div>
              {/* Row 8 */}
              <div className="flex items-start gap-3 text-sm text-gray-700 py-3 border-b border-gray-200">
                <span className="text-green-500 mt-0.5 text-lg">✓</span>
                <span>トゥルーステレオプロセッシング</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-700 py-3 border-b border-gray-200">
                <span className="text-green-500 mt-0.5 text-lg">✓</span>
                <span>アサイン可能な、マルチカラーヘイローLED付き3フットスイッチ</span>
              </div>
              {/* Row 9 */}
              <div className="flex items-start gap-3 text-sm text-gray-700 py-3 border-b border-gray-200">
                <span className="text-green-500 mt-0.5 text-lg">✓</span>
                <span>8-in＆8-out USBオーディオインターフェースとしても使用可能</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-700 py-3 border-b border-gray-200">
                <span className="text-green-500 mt-0.5 text-lg">✓</span>
                <span>インプットモードが入力により変更＆設定できます</span>
              </div>
              {/* Row 10 */}
              <div className="flex items-start gap-3 text-sm text-gray-700 py-3">
                <span className="text-green-500 mt-0.5 text-lg">✓</span>
                <span>リアンプ機能搭載</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-700 py-3">
                <span className="text-green-500 mt-0.5 text-lg">✓</span>
                <span>9-18V DCの電源供給が可能</span>
              </div>
              </div>
          </div>
        </div>
      </section>

      {/* Controls Section */}
      <section id="controls" className="py-20 scroll-mt-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">コントロール</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="max-w-5xl mx-auto space-y-12">
            {/* Top View */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/brands/hotone/ampero_ii_stomp/control_01.png"
                alt="Control Top View"
                width={1200}
                height={800}
                className="w-full h-auto"
              />
            </div>

            {/* Back View */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/brands/hotone/ampero_ii_stomp/control_02.png"
                alt="Control Back View"
                width={1200}
                height={800}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Connections Section */}
      <section id="connections" className="py-20 scroll-mt-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">接続例</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-16">
            {/* Connection 1 - アンプ入力への接続 */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">アンプ入力への接続</h3>
              <div className="flex justify-center">
                <Image
                  src="/images/brands/hotone/ampero_ii_stomp/connection_01.gif"
                  alt="アンプ入力への接続"
                  width={600}
                  height={400}
                  className="h-auto"
                  unoptimized
                />
              </div>
              <div className="space-y-2">
    
              <p className="text-gray-600 text-sm leading-relaxed">
                  通常のエフェクターのように、本機の出力をアンプの入力へ接続します。必要に応じて外部コントローラーやエフェクターをRFXループへ接続します。
              </p>
              </div>
            </div>

{/* Connection 2 - アンプのFXリターンまたはパワーアンプの入力へ接続する場合 */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">アンプのFXリターンまたはパワーアンプの入力へ接続する場合</h3>
              <div className="flex justify-center">
                  <Image
                  src="/images/brands/hotone/ampero_ii_stomp/connection_02.gif"
                  alt="アンプのFXリターンまたはパワーアンプの入力へ接続する場合 1"
                  width={600}
                    height={400}
                  className="h-auto"
                    unoptimized
                  />
                </div>
              <div className="flex justify-center">
                  <Image
                  src="/images/brands/hotone/ampero_ii_stomp/connection_03.gif"
                  alt="アンプのFXリターンまたはパワーアンプの入力へ接続する場合 2"
                  width={600}
                    height={400}
                  className="h-auto"
                    unoptimized
                  />
                </div>
              <div className="space-y-2">
              <p className="text-gray-600 text-sm leading-relaxed">
                  パワーアンプ（アンプFXリターン）に接続する場合は、プログラム内のAMP＆CABモジュールは使用しません。音色を変えたい場合はPRE AMPモジュールの使用をお勧めします。
              </p>
              </div>
            </div>

            {/* Connection 3 - 他のエフェクターを使用する例 */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">他のエフェクターを使用する例</h3>
              <div className="flex justify-center">
                <Image
                  src="/images/brands/hotone/ampero_ii_stomp/connection_04.gif"
                  alt="他のエフェクターを使用する例"
                  width={600}
                  height={400}
                  className="h-auto"
                  unoptimized
                />
              </div>
              <div className="space-y-2">
              <p className="text-gray-600 text-sm leading-relaxed">
                  本機をペダルボードに入れて、他のエフェクターと一緒に使うサウンドデザインを考えましょう。バイパスモードやFXループの設定が必要です。
              </p>
              </div>
            </div>

            {/* Connection 4 - ミキサーやオーディオインターフェースなどのフルレンジのオーディオデバイスと接続する場合 */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">ミキサーやオーディオインターフェースなどのフルレンジのオーディオデバイスと接続する場合</h3>
              <div className="flex justify-center">
                <Image
                  src="/images/brands/hotone/ampero_ii_stomp/connection_05.gif"
                  alt="ミキサーやオーディオインターフェースなどのフルレンジのオーディオデバイスと接続する場合"
                  width={600}
                  height={400}
                  className="h-auto"
                  unoptimized
                />
              </div>
              <div className="space-y-2">
              <p className="text-gray-600 text-sm leading-relaxed">
                  家での練習やライブ演奏まで、異なる状況でも、常に素晴らしいトーンをお届けできます。
              </p>
              </div>
            </div>

            {/* Connection 5 - オーディオインターフェースとしての接続例 */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">オーディオインターフェースとしての接続例</h3>
              <div className="flex justify-center">
                <Image
                  src="/images/brands/hotone/ampero_ii_stomp/connection_06.gif"
                  alt="オーディオインターフェースとしての接続例"
                  width={600}
                  height={400}
                  className="h-auto"
                  unoptimized
                />
              </div>
              <div className="space-y-2">
              <p className="text-gray-600 text-sm leading-relaxed">
                  USBポートとコンピューターを接続します。ソフトウェアやドライバーを忘れずに準備してください。これでミニスタジオが完成です。
              </p>
              </div>
            </div>

            {/* Connection 6 - Auxジャックの使用 */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Auxジャックの使用</h3>
              <div className="flex justify-center">
                <Image
                  src="/images/brands/hotone/ampero_ii_stomp/connection_07.gif"
                  alt="Auxジャックの使用"
                  width={600}
                  height={400}
                  className="h-auto"
                  unoptimized
                />
              </div>
              <div className="space-y-2">
              <p className="text-gray-600 text-sm leading-relaxed">
                  Aux入力にモバイルデバイスやミュージックプレーヤーを接続できます。これでバッキングを聴きながらのリハーサルが可能になります。
              </p>
              </div>
            </div>

            {/* Connection 7 - 8-in/8-out オーディオインターフェース */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">8-in/8-out オーディオインターフェース</h3>
              <div className="flex justify-center">
                <Image
                  src="/images/brands/hotone/ampero_ii_stomp/connection_08.gif"
                  alt="8-in/8-out オーディオインターフェース"
                  width={600}
                  height={400}
                  className="h-auto"
                  unoptimized
                />
              </div>
              <div className="space-y-2">
              <p className="text-gray-600 text-sm leading-relaxed">
                  本機は、図のように8-in/8-out USBオーディオインターフェースとして使用できます。「ウェットモニター＆レコードドライ」、「レコードウェット＆ドライ」、リアンプも自由自在です。ホームレコーディングの強力なツールとしてもお使いいただけます。
              </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Software Section */}
      <section id="software" className="py-20 scroll-mt-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">ソフトウェア</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Sub Title */}
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Win/Mac エディティング・ソフトウェア</h3>
            
            {/* Main Image */}
            <div className="flex justify-center mb-8">
              <Image
                src="/images/brands/hotone/ampero_ii_stomp/software_01.jpg"
                alt="Ampero II Stomp Editor"
                width={800}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>

            {/* Intro Text */}
            <p className="text-gray-600 text-center mb-12">
              高機能なAmpero II Stompのエディットをフルサポートできるソフトウェアを用意しました。ルーティング＆モジュール設定や各エフェクトのエディットを迅速にサポートしてくれます。
            </p>

            {/* Downloads Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
              {/* Row 1 Left - AMPERO II STOMP Firmware 2.3.1 & Software 1.3.0 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow self-start">
                <button
                  onClick={() => toggleSoftware("fw231")}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Download className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="text-left">
                      <span className="font-medium text-gray-900 text-sm">AMPERO II STOMP Firmware 2.3.1 & Software 1.3.0</span>
                      <span className="text-xs text-red-500 font-bold ml-2">New!</span>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.fw231 ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.fw231 && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 space-y-6">
                    {/* 固件更新图片 */}
                    <div className="flex justify-center">
                      <Image
                        src="/images/brands/hotone/ampero_ii_stomp/software_02.png"
                        alt="Firmware Updates"
                        width={800}
                        height={500}
                        className="rounded-lg"
                        unoptimized
                      />
                    </div>

                    {/* 新機能 */}
                    <div className="space-y-3">
                      <h4 className="text-base font-bold text-gray-900">【 新機能 】</h4>
                      <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                        <li>Tone CatchをSound Cloneテクノロジーにアップグレード。</li>
                        <li>Sound Clone テクノロジーは NAM（Neural Amp Modeler）ファイルの変換と利用をサポートします。</li>
                        <li>DSP 使用率表示を追加（Stomp Mode/ストンプ モード→FX Chain View/FX チェーン ビュー）</li>
                      </ul>
                    </div>

                    {/* 改善、変更、バグ修正 */}
                    <div className="space-y-3">
                      <h4 className="text-base font-bold text-gray-900">【 改善、変更、バグ修正 】</h4>
                      <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                        <li>Sound Cloneのデータ構造の最適化により、トーンファイルの保存容量が30に増加しました。</li>
                        <li>その他のマイナーな改善とバグ修正。</li>
                      </ul>
                    </div>

                    {/* 重要なお知らせ */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-gray-700">
                        Ampero II STOMP ファームウェアは、Hotone Web サイトからダウンロードして頂けます。問題を回避するために、アップデートする前にパッチをバックアップしてください。
                      </p>
                    </div>

                    {/* 下载按钮 */}
                    <div className="flex justify-center pt-2">
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        <span>ダウンロードはこちら</span>
                      </Button>
                    </div>

                    {/* 软件发布说明 */}
                    <div className="pt-6 border-t border-gray-200 space-y-4">
                      <h4 className="text-base font-bold text-gray-900">Ampero II Stomp ソフトウェアのリリースノート</h4>
                      
                      <div className="space-y-2">
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Version 1.3.0</span>　Released 3/17/2025
                        </p>
                      </div>

                      {/* 重要なお知らせ */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h5 className="text-sm font-bold text-gray-900 mb-2">重要なお知らせ</h5>
                        <p className="text-sm text-gray-700">
                          最新のAmpero II Stomp ファームウェア （V2.3.1）と一緒に使用することをお勧めします。
                        </p>
                      </div>

                      {/* アップデートの内容 */}
                      <div className="space-y-3">
                        <h5 className="text-sm font-bold text-gray-900">アップデートの内容</h5>
                        <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                          <li>Ampero II Stage ファームウェア V1.3.3 のサポートを追加</li>
                          <li>Ampero II ファームウェア V1.2.0 のサポートを追加</li>
                          <li>Ampero II Stomp ファームウェア V2.2.0 のサポートを追加</li>
                          <li>NAM (Neural Amp Modeler) ファイル変換およびインポート機能を追加</li>
                          <li>その他の軽微なバグ修正</li>
                        </ul>
                      </div>

                      {/* 软件下载按钮 */}
                      <div className="flex justify-center pt-2">
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          <span>ダウンロードはこちら</span>
                        </Button>
                      </div>
                    </div>
                      </div>
                )}
                    </div>

              {/* Row 1 Right - Firmware アップデート方法 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow self-start">
                <button
                  onClick={() => toggleSoftware("fwUpdate")}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-gray-600 text-sm">?</span>
                      </div>
                    <span className="font-medium text-gray-900 text-sm">Firmware アップデート方法</span>
                      </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.fwUpdate ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.fwUpdate && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 space-y-6">
                    {/* 标题 */}
                    <h4 className="text-base font-bold text-gray-900">Firmware アップデート方法</h4>

                    {/* 固件更新图示 */}
                    <div className="flex justify-center">
                      <Image
                        src="/images/brands/hotone/ampero_ii_stomp/software_03.png"
                        alt="Firmware アップデート方法"
                        width={800}
                        height={500}
                        className="rounded-lg"
                        unoptimized
                      />
                    </div>

                    {/* 固件更新步骤说明 */}
                    <div className="space-y-4">
                      <ol className="space-y-3 text-sm text-gray-700 list-decimal list-inside">
                        <li>USB接続を維持したままユニットの電源をオフにします。</li>
                        <li>「MODE」、2、3のフットスイッチを同時に押したまま電源を入れます。</li>
                        <li>Ampero II エディター ソフトウェアを起動し、「Firmware Update」ボタンをクリックし、予めダウンロードしたファームウェアファイル(Ampero II Stomp Firmware V.......bin *解凍しない状態)を選択し、「Update now」をクリックします。</li>
                        <li>ファームウェアのアップデートが完了したら再起動をしてください。これで完了です。</li>
                      </ol>
                    </div>
                  </div>
                )}
              </div>

              {/* Row 2 Left - AMPERO II STOMP Firmware 2.1.0 & Software 1.1.2 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow self-start">
                <button
                  onClick={() => toggleSoftware("fw210")}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Download className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="font-medium text-gray-900 text-sm">AMPERO II STOMP Firmware 2.1.0 & Software 1.1.2</span>
                    </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.fw210 ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.fw210 && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 space-y-6">
                    {/* 固件更新图片 */}
                    <div className="flex justify-center">
                      <Image
                        src="/images/brands/hotone/ampero_ii_stomp/software_04.png"
                        alt="AMPERO II STOMP Firmware 2.1.0 & Software 1.1.2"
                        width={800}
                        height={500}
                        className="rounded-lg"
                        unoptimized
                      />
                    </div>

                    {/* 固件发布说明 */}
                    <div className="space-y-4">
                      <h4 className="text-base font-bold text-gray-900">Ampero II Stomp ファームウェアのリリースノート</h4>
                      
                      <div className="space-y-2">
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Version 2.0.0</span>　Released 12/25/2024
                        </p>
                      </div>

                      <p className="text-sm text-gray-700 leading-relaxed">
                        ファームウェア V2.1.0 およびソフトウェア V1.1.2 のアップデートでは、トーンキャッチ効果、フリーズ効果など、魅力的な新機能が満載されました。これらのアップデートは、クリエイティブなオプションを拡張し、全体的なパフォーマンスを向上させるように設計されています。
                      </p>

                      {/* 重要なお知らせ */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h5 className="text-sm font-bold text-gray-900 mb-2">重要なお知らせ</h5>
                        <p className="text-sm text-gray-700">
                          最新の（V1.1.2） Ampero II ソフトウェアを使用することをお勧めします。
                        </p>
                      </div>

                      {/* 新しいエフェクト */}
                      <div className="space-y-3">
                        <h5 className="text-sm font-bold text-gray-900">新しいエフェクト</h5>
                        <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                          <li>Tone Catchエフェクトモジュールが追加されました。 - Hotone コミュニティ（community.hotone.com/tones）からトーンをダウンロードし、ソフトウェア経由で CATCHモジュールにインポートできます。</li>
                          <li>MODモジュールに新しいエフェクトが追加されました。: Freeze - サウンドフリーズ/無限サステインエフェクト</li>
                        </ul>
                      </div>

                      {/* 新機能 */}
                      <div className="space-y-3">
                        <h5 className="text-sm font-bold text-gray-900">新機能</h5>
                        <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                          <li>フットスイッチ使用時のMIDI出力機能を追加</li>
                          <li>グローバル テンポ機能を追加（グローバル→コントロール）</li>
                          <li>シーン名機能を追加</li>
                          <li>シーン2/3のパラメーター値をハイライト表示して参照しやすくしました</li>
                        </ul>
                      </div>

                      {/* バグ修正 */}
                      <div className="space-y-3">
                        <h5 className="text-sm font-bold text-gray-900">バグ修正</h5>
                        <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                          <li>CABモジュールのレイテンシーを大幅に最適化</li>
                          <li>IRモジュールのシステム リソース使用率を削減</li>
                          <li>安定性を高めるためにすべてのノイズ ゲート効果を最適化</li>
                          <li>その他のマイナーな改善とバグ修正</li>
                        </ul>
                      </div>

                      {/* 固件下载按钮 */}
                      <div className="flex justify-center pt-2">
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          <span>ダウンロードはこちら</span>
                        </Button>
                      </div>
                    </div>

                    {/* 软件发布说明 */}
                    <div className="pt-6 border-t border-gray-200 space-y-4">
                      <h4 className="text-base font-bold text-gray-900">Ampero II Stomp ソフトウェアのリリースノート</h4>
                      
                      <div className="space-y-2">
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Version 1.1.2</span>　Released 12/25/2024
                        </p>
                      </div>

                      {/* 重要なお知らせ */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h5 className="text-sm font-bold text-gray-900 mb-2">重要なお知らせ</h5>
                        <p className="text-sm text-gray-700">
                          最新の Ampero II Stomp ファームウェア（V2.1.0）、Ampero II Stage ファームウェア（V1.2.1）、および Ampero II ファームウェア（V1.1.0）と一緒に使用することをお勧めします。
                        </p>
                      </div>

                      {/* アップデートの内容 */}
                      <div className="space-y-3">
                        <h5 className="text-sm font-bold text-gray-900">アップデートの内容</h5>
                        <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                          <li>Ampero II Stompファームウェア V2.1.0のサポートを追加。</li>
                          <li>その他の軽微なバグ修正</li>
                        </ul>
                      </div>

                      {/* 软件下载按钮 */}
                      <div className="flex justify-center pt-2">
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          <span>ダウンロードはこちら</span>
                        </Button>
                      </div>
                    </div>
                      </div>
                )}
                      </div>

              {/* Row 2 Right - AMPERO II STOMP Firmware 2.0.0 & Software 1.0.3 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow self-start">
                <button
                  onClick={() => toggleSoftware("fw200")}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Download className="w-4 h-4 text-gray-600" />
                      </div>
                    <span className="font-medium text-gray-900 text-sm">AMPERO II STOMP Firmware 2.0.0 & Software 1.0.3</span>
                    </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.fw200 ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.fw200 && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 space-y-6">
                    {/* 固件更新图片 */}
                    <div className="flex justify-center">
                      <Image
                        src="/images/brands/hotone/ampero_ii_stomp/software_05.jpg"
                        alt="AMPERO II STOMP Firmware 2.0.0 & Software 1.0.3"
                        width={800}
                        height={500}
                        className="rounded-lg"
                        unoptimized
                      />
                    </div>

                    {/* 固件发布说明 */}
                    <div className="space-y-4">
                      <h4 className="text-base font-bold text-gray-900">Ampero II Stomp ファームウェアのリリースノート</h4>
                      
                      <div className="space-y-2">
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Version 2.0.0</span> Released 4/24/2024
                        </p>
                      </div>

                      <p className="text-sm text-gray-700 leading-relaxed">
                        V2.0.0 ファームウェアアップデートでは、新しいUIとシーン機能などの強力な機能を提供します。アップデートする前に、お知らせをお読みください。
                      </p>

                      {/* 重要なお知らせ */}
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-3">
                        <h5 className="text-sm font-bold text-gray-900">重要なお知らせ</h5>
                        <div className="space-y-2 text-sm text-gray-700">
                          <p>1. アップデート後、すべてのグローバルパラメーター（設定、言語、エフェクトチェーンテンプレート）がデフォルトに復元されます。グローバル設定を手動でバックアップしてください。</p>
                          <p>2. パッチデータ構造が変更されます。アップデート後の初回電源投入時に、パッチデータの変換に数秒かかります。事前にパッチをバックアップしてください。</p>
                          <p>3. V2.0.0 ファームウェアは、Ampero II Editor V1.0.3 でのみ使用できます。ユニットをアップデートするには、Ampero II Stomp Software V1.3.0 を使用することをお勧めします。</p>
                        </div>
                      </div>

                      {/* 新機能 */}
                      <div className="space-y-3">
                        <h5 className="text-sm font-bold text-gray-900">新機能</h5>
                        <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                          <li>完全に新しいUI。</li>
                          <li>シーン機能を追加。</li>
                          <li>CTRL機能をエフェクトスロットのオン/オフ機能に更新。</li>
                          <li>エクスプレッションペダルの状態切り替え機能を追加。</li>
                          <li>ドラムマシン機能を追加。</li>
                          <li>パッチフットスイッチ機能設定を追加（Global &gt; Controls）。</li>
                        </ul>
                      </div>

                      {/* 固件下载按钮 */}
                      <div className="flex justify-center pt-2">
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          <span>ダウンロードはこちら</span>
                        </Button>
                      </div>
                    </div>

                    {/* 软件发布说明 */}
                    <div className="pt-6 border-t border-gray-200 space-y-4">
                      <h4 className="text-base font-bold text-gray-900">Ampero II Stomp ソフトウェアのリリースノート</h4>
                      
                      <div className="space-y-2">
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Version 1.0.3</span> Released 4/10/2024
                        </p>
                      </div>

                      {/* 重要なお知らせ */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h5 className="text-sm font-bold text-gray-900 mb-2">重要なお知らせ</h5>
                        <p className="text-sm text-gray-700">
                          最新の Ampero II Stomp ファームウェア（V2.0.0）および Ampero II Stage ファームウェア（V1.0.4）と一緒に使用することをお勧めします。
                        </p>
                      </div>

                      {/* アップデートの内容 */}
                      <div className="space-y-3">
                        <h5 className="text-sm font-bold text-gray-900">アップデートの内容</h5>
                        <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                          <li>Ampero II Stomp ファームウェア V2.0.0 のサポートを追加。</li>
                          <li>Ampero II Stage と Ampero II Stomp 間でパッチファイルの共有をサポート。</li>
                          <li>その他の軽微なバグ修正</li>
                        </ul>
                      </div>

                      {/* 软件下载按钮 */}
                      <div className="flex justify-center pt-2">
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          <span>ダウンロードはこちら</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
            </div>

              {/* Row 3 Left - AMPERO II STOMP Firmware & Software 1.3.0 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow self-start">
                <button
                  onClick={() => toggleSoftware("fw130")}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Download className="w-4 h-4 text-gray-600" />
                  </div>
                    <span className="font-medium text-gray-900 text-sm">AMPERO II STOMP Firmware & Software 1.3.0</span>
                      </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.fw130 ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.fw130 && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 space-y-6">
                    {/* 顶部说明 */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-gray-700">
                        Ampero II Stomp ファームウェア・バージョン 1.3.0 がダウンロードできるようになりました。最新（V1.3.0）の Ampero II Stomp ソフトウェアを使用することをお勧めします。（2023年12月28日）
                      </p>
                    </div>

                    {/* 固件更新图片 */}
                    <div className="flex justify-center">
                      <Image
                        src="/images/brands/hotone/ampero_ii_stomp/software_06.jpg"
                        alt="AMPERO II STOMP Firmware & Software 1.3.0"
                        width={800}
                        height={500}
                        className="rounded-lg"
                        unoptimized
                      />
                    </div>

                    {/* 固件发布说明 */}
                    <div className="space-y-4">
                      <h4 className="text-base font-bold text-gray-900">Ampero II Stompファームウェアのリリースノート</h4>
                      
                      <div className="space-y-2">
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Version 1.3.0</span>　Released 12/28/2023
                        </p>
                      </div>

                      {/* 注意 */}
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-sm text-gray-700">
                          注意：最新（V1.3.0）のAmpero II Stompソフトウェアと併用することをお勧めします。
                        </p>
                      </div>

                      {/* 追加ニューエフェクト */}
                      <div className="space-y-3">
                        <h5 className="text-sm font-bold text-gray-900">追加ニューエフェクト</h5>
                        <p className="text-sm text-gray-700">
                          HQ という接尾辞が付いているエフェクトは、最新のモデリング・テクノロジーを使用していることを示します。
                        </p>
                        <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                          <li>６つの新しいアンプ/プリアンプ・モデルが AMP/PRE AMP モジュールに追加されました。
                            <ul className="ml-6 mt-2 space-y-1 list-disc list-inside">
                              <li>Petrus Clean/Crunch/Lead HQ – Mesa/Boogie® JP-2C™* アンプヘッドをベースにしています。</li>
                              <li>Soloist 100 Clean/Crunch/Lead HQ – Soldano® SLO100* アンプヘッドをベースにしています。</li>
                            </ul>
                          </li>
                          <li>DRVモジュールに追加された新しいドライブモデル：Noble Drive – Based on Nobels® ODR-1* オーバードライブ ペダルをベースにしています。</li>
                          <li>DLYモジュールに新たなディレイモデルを追加：Digital Delay HQ – 人気の11モードディレイ/リバーブペダルのディレイサウンドをベースにしています。</li>
                          <li>2つの新しいリバーブ モデルが RVB モジュールに追加されました。
                            <ul className="ml-6 mt-2 space-y-1 list-disc list-inside">
                              <li>140 プレート HQ – EMT® 140* プレート リバーブレーターをベースしています。</li>
                              <li>シルバーライニング – 巨大で豊かなリバーブトーンを生み出す特別なリバーブです。</li>
                            </ul>
                          </li>
                        </ul>
                        <p className="text-xs text-gray-500 mt-3">
                          ※ 記載のメーカー名、商品名は各社の商標または登録商標です。商標は、この製品のサウンドキャラクターを識別するためにのみ使用されています。
                        </p>
                      </div>

                      {/* 固件下载按钮 */}
                      <div className="flex justify-center pt-2">
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          <span>ダウンロードはこちら</span>
                        </Button>
                      </div>
                    </div>

                    {/* 软件发布说明 */}
                    <div className="pt-6 border-t border-gray-200 space-y-4">
                      <h4 className="text-base font-bold text-gray-900">Ampero II Stompソフトウェアのリリースノート</h4>
                      
                      <div className="space-y-2">
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Version 1.3.0</span>　Released 12/28/2023
                        </p>
                      </div>

                      {/* 注意 */}
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-sm text-gray-700">
                          注意：最新（V1.3.0）のAmpero II Stompファームウェアと併用することをお勧めします。
                        </p>
                      </div>

                      {/* アップデートの内容 */}
                      <div className="space-y-3">
                        <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                          <li>改善、変更、バグ修正を完了しました。</li>
                          <li>ファームウェアV1.3.0のサポートを追加しました。</li>
                        </ul>
                      </div>

                      {/* 软件下载按钮 */}
                      <div className="flex justify-center pt-2">
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          <span>ダウンロードはこちら</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Row 3 Right - AMPERO II STOMP Firmware & Software 1.2.1 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow self-start">
                <button
                  onClick={() => toggleSoftware("fw121")}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Download className="w-4 h-4 text-gray-600" />
                  </div>
                    <span className="font-medium text-gray-900 text-sm">AMPERO II STOMP Firmware & Software 1.2.1</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.fw121 ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.fw121 && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 space-y-6">
                    {/* 顶部说明 */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-gray-700">
                        Ampero II Stomp ファームウェア・バージョン 1.2.1 がダウンロードできるようになりました。新しい USB オーディオ・ファームウェア（ver.2.01）を使用すると、サンプリング・レートを切り替えて、音質レベルの明瞭度に高めることができます。さらに、新しい DRV および DLY エフェクトも武器に追加されます。（2023年8月30日）
                      </p>
                    </div>

                    {/* 固件更新图片 */}
                    <div className="flex justify-center">
                      <Image
                        src="/images/brands/hotone/ampero_ii_stomp/software_07.jpg"
                        alt="AMPERO II STOMP Firmware & Software 1.2.1"
                        width={800}
                        height={500}
                        className="rounded-lg"
                        unoptimized
                      />
                    </div>

                    {/* 固件发布说明 */}
                    <div className="space-y-4">
                      <h4 className="text-base font-bold text-gray-900">Ampero II Stompファームウェアのリリースノート</h4>
                      
                      <div className="space-y-2">
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Version 1.2.1</span>　Released 8/30/2023
                        </p>
                      </div>

                      {/* 注意 */}
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-sm text-gray-700">
                          注意：最新（V1.2.1）のAmpero II Stompソフトウェアと併用することをお勧めします。
                        </p>
                      </div>

                      {/* 追加ニューエフェクト */}
                      <div className="space-y-3">
                        <h5 className="text-sm font-bold text-gray-900">追加ニューエフェクト</h5>
                        <ul className="space-y-3 text-sm text-gray-700 list-disc list-inside">
                          <li>２つの新しいドライブ モデルが DRV モジュールに追加されました。
                            <ul className="ml-6 mt-2 space-y-1 list-disc list-inside">
                              <li>Face Fuzz Ge – 新しいモデリング手法によるDunlop® Fuzz Face®* （ゲルマニウムトランジスタバージョン）をベースにしました。</li>
                              <li>Fryman Disrt –有名ブティックブランドのUKスタイル ハイゲイン ディストーション ペダルをベースにしています。</li>
                            </ul>
                          </li>
                          <li>３つの新しいディレイモデルが DLY モジュールに追加されました。
                            <ul className="ml-6 mt-2 space-y-1 list-disc list-inside">
                              <li>Glitch Delay – グリッチを含んだフィードバックを再生するデジタル ディレイ</li>
                              <li>Icy Delay – ピッチシフトを備えたスペシャルディレイエフェクト</li>
                              <li>Bloodless Delay – ピッチシフトされたオーディオスライスとステレオクロスフィードを備えたディレイ</li>
                            </ul>
                          </li>
                        </ul>
                        <p className="text-xs text-gray-500 mt-3">
                          ※ 記載のメーカー名、商品名は各社の商標または登録商標です。商標は、この製品のサウンドキャラクターを識別するためにのみ使用されています。
                        </p>
                      </div>

                      {/* 固件下载按钮 */}
                      <div className="flex justify-center pt-2">
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          <span>ダウンロードはこちら</span>
                        </Button>
                      </div>
                    </div>
                      </div>
                )}
                      </div>

              {/* Row 4 Left - AMPERO II STOMP USB Audio Firmware 2.01 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow self-start">
                <button
                  onClick={() => toggleSoftware("usb201")}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Download className="w-4 h-4 text-gray-600" />
                      </div>
                    <span className="font-medium text-gray-900 text-sm">AMPERO II STOMP USB Audio Firmware 2.01</span>
                      </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.usb201 ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.usb201 && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 space-y-6">
                    {/* 顶部说明 */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                      <p className="text-sm text-gray-700">
                        新しい USB オーディオ・ファームウェア（ver.2.01）を使用すると、サンプリング・レートを切り替えて、音質レベルの明瞭度に高めることができます。
                      </p>
                      <p className="text-sm text-gray-700">
                        以下の最前線の我々の開発チームからのメモをチェックし、USB オーディオ・ファームウェアのダウンロード・チュートリアルに従って、アップグレードされたファームウェアをお楽しみください。
                      </p>
                    </div>

                    {/* 主图 */}
                    <div className="flex justify-center">
                      <Image
                        src="/images/brands/hotone/ampero_ii_stomp/software_08.jpg"
                        alt="AMPERO II STOMP USB Audio Firmware 2.01"
                        width={800}
                        height={500}
                        className="rounded-lg"
                        unoptimized
                      />
                    </div>

                    {/* 固件发布说明 */}
                    <div className="space-y-4">
                      <h4 className="text-base font-bold text-gray-900">Ampero II Stomp USB オーディオファームウェア リリースノート</h4>
                      
                      <div className="space-y-2">
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Version 2.01</span>　Released 8/2/2023
                        </p>
                      </div>

                      {/* 新たな仕様 */}
                      <div className="space-y-3">
                        <h5 className="text-sm font-bold text-gray-900">新たな仕様</h5>
                        <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                          <li>サンプリングレートの切り替え機能を追加しました。（16/24ビット、44.1kHz～192kHz）</li>
                          <li>８つの I/O チャンネルはすべて 44.1/48kHz での利用が可能です。</li>
                          <li>I/Oチャンネル1～4は88.2kHz/96kHzでの利用が可能です。</li>
                          <li>I/Oチャンネル1～2は176.4/192kHzでの利用が可能です。</li>
                          <li>176.4/192kHz サンプリング レートの場合、録音/再生パフォーマンスを向上させるために、より大きなバッファーサイズ （64以上）への変更をお勧めします。</li>
                        </ul>
                      </div>
                    </div>

                    {/* USB Audio ファームウェア・アップデート方法 */}
                    <div className="pt-6 border-t border-gray-200 space-y-4">
                      <h4 className="text-base font-bold text-gray-900">USB Audioオーディオファームウェア・アップデート方法</h4>
                      
                      <p className="text-sm text-gray-700">
                        USB オーディオファームウェアをアップデートは、以下の手順に従ってください。
                      </p>

                      {/* USB ASIO ドライバーのインストール */}
                      <div className="space-y-3">
                        <h5 className="text-sm font-bold text-gray-900">USB ASIO ドライバーのインストール （Windows のみ）</h5>
                        <p className="text-sm text-gray-700">
                          以下のすべての操作を正しく実行できるように、最初に最新の Hotone Generic USB ASIO Driver をインストールしてください。HOTONEウェブサイトからダウンロードできます。
                        </p>
                      </div>

                      {/* USBオーディオファームウェアのアップデート */}
                      <div className="space-y-3">
                        <h5 className="text-sm font-bold text-gray-900">USBオーディオファームウェアのアップデート</h5>
                        <p className="text-sm text-gray-700">
                          Ampero II Stompの電源をオンにして （ファームウェア更新/復元モードではなく、通常の電源投入です。）、USB経由でコンピュータに接続してください。次に、OS に応じて Hotone USB Audio Device Firmware Updater を実行します。
                        </p>
                        <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                          <li>macOS：Mac Updaterフォルダーに含まれる Hotone Audio USB オーディオ デバイス ファームウェア アップデーター V1.0.1.pkg を実行します。インストール後、アプリケーションフォルダー内のHOTONE UsbAudioDfuアプリを実行します</li>
                          <li>Windows: Windows Updater/Applications/HOTONEUsbAudioDfu に移動し、HOTONEUsbAudioDfu.exe を見つけて実行します （.exe ファイルの場所は次のとおりです）。</li>
                        </ul>
                      </div>

                      {/* 手順１ - 文件夹结构图 */}
                      <div className="space-y-3">
                        <h5 className="text-sm font-bold text-gray-900">手順１</h5>
                        <div className="flex justify-center">
                          <Image
                            src="/images/brands/hotone/ampero_ii_stomp/software_09.jpg"
                            alt="文件夹结构"
                            width={600}
                            height={400}
                            className="rounded-lg"
                            unoptimized
                          />
                        </div>
                        <p className="text-sm text-gray-700">
                          次に、ソフトウェアの指示に従って USBオーディオ デバイスのファームウェアを更新します。
                        </p>
                      </div>

                      {/* 手順２ - 更新软件界面图 */}
                      <div className="space-y-3">
                        <h5 className="text-sm font-bold text-gray-900">手順２</h5>
                        <p className="text-sm text-gray-700">
                          USB オーディオ ファームウェアは、この zip ファイルのルート フォルダーに含まれる .bin ファイルです。
                        </p>
                        <div className="flex justify-center">
                          <Image
                            src="/images/brands/hotone/ampero_ii_stomp/software_10.png"
                            alt="更新软件界面"
                            width={600}
                            height={400}
                            className="rounded-lg"
                            unoptimized
                          />
                        </div>
                        <p className="text-sm text-gray-700">
                          アップデートが完了すると、「Firmware upgrade finished successfully./ファームウェアのアップグレードは正常に終了しました。」と表示されます。以下に示すメッセージ ボックスにメッセージが表示されます。
                        </p>
                        <div className="flex justify-center">
                          <Image
                            src="/images/brands/hotone/ampero_ii_stomp/software_11.png"
                            alt="更新完成界面"
                            width={600}
                            height={400}
                            className="rounded-lg"
                            unoptimized
                          />
                        </div>
                        <p className="text-sm text-gray-700">
                          「Exit/終了」ボタンをクリックして、USB オーディオファームウェアのアップデートを終了します。
                        </p>
                      </div>

                      {/* 下载按钮 */}
                      <div className="flex justify-center pt-2">
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          <span>ダウンロードはこちら</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
            </div>

              {/* Row 4 Right - ファームウェア：AMPERO II STOMP Firmware 1.1.0 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow self-start">
                <button
                  onClick={() => toggleSoftware("fw110")}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Download className="w-4 h-4 text-gray-600" />
                      </div>
                    <span className="font-medium text-gray-900 text-sm">ファームウェア：AMPERO II STOMP Firmware 1.1.0</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.fw110 ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.fw110 && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 space-y-6">
                    {/* 顶部说明 */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-gray-700">
                        Ampero II Stompの新しいファームウェアFirmware:v1.1.0がリリースされました。（2022年7月29日）
                      </p>
                    </div>

                    {/* 主图 */}
                    <div className="flex justify-center">
                      <Image
                        src="/images/brands/hotone/ampero_ii_stomp/software_12.jpg"
                        alt="AMPERO II STOMP Firmware 1.1.0"
                        width={800}
                        height={500}
                        className="rounded-lg"
                        unoptimized
                      />
                    </div>

                    {/* 注意1 - USB连接 */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm font-bold text-gray-900 mb-2">注意：</p>
                      <p className="text-sm text-gray-700">
                        ソフトウェアをアップデートする際は、USBケーブルをパソコンへ直接接続されているかご確認ください。USBハブを経由いたしますと、アップデートに不具合が発生する場合があります。
                      </p>
                    </div>

                    {/* 注意2 - 硬件版本 */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm font-bold text-gray-900 mb-2">注意：</p>
                      <p className="text-sm text-gray-700">
                        ハードウェア・バージョンが　V1.0.0より古いものをご使用の場合は、Firmware V1.1.0 より古いファームウェアにダウングレードしないでください。故障の原因になる可能性があります。（ハードウェア・バージョンは［Global］→［About］よりご確認いただけます。）
                      </p>
                    </div>

                    {/* 更新步骤 */}
                    <div className="space-y-4">
                      <h4 className="text-base font-bold text-gray-900">以下の手順でアップデートを行なってください。</h4>
                      
                      <ol className="space-y-3 text-sm text-gray-700 list-decimal list-inside">
                        <li>最新のFirmwareをPCにダウンロードします。</li>
                        <li>PCと電源OFFの状態のAMPERO Ⅱ STOMPをUSB接続し、Ampero II Stomp Editorを立ち上げます。</li>
                        <li>Footswitch 2、3、Menu/Valueノブの3つを同時に押しながらAMPERO Ⅱ STOMP本体の電源をONにします。</li>
                        <li>エディター画面に「Update」のボタンが表示されたら、案内に従って画面を進めてください。</li>
                        <li>Firmwareデータファイルを選択する画面に入ったら、先にダウンロードした最新のFirmware binファイル「Ampero_II_Stomp_Firmware_V1.1.0.bin」を選択して頂くとUpdateが始まります。</li>
                        <li>Update完了後、AMPERO Ⅱ STOMPが自動で再起動しますと完了です。</li>
                      </ol>
                    </div>

                    {/* 版本确认方法 */}
                    <div className="bg-gray-100 rounded-lg p-4">
                      <p className="text-sm text-gray-700">
                        アップデート後のソフトウェア・バージョンは、「Global」の中の「About」で確認いただけます。
                      </p>
                    </div>

                    {/* 下载按钮 */}
                    <div className="flex justify-center pt-2">
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        <span>ダウンロードはこちら（.zip）</span>
                      </Button>
                    </div>
                      </div>
                )}
                    </div>

              {/* Row 5 Left - Ampero II Stomp Editor 1.1.0 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow self-start">
                <button
                  onClick={() => toggleSoftware("editor110")}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Download className="w-4 h-4 text-gray-600" />
                      </div>
                    <span className="font-medium text-gray-900 text-sm">Ampero II Stomp Editor 1.1.0</span>
                      </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.editor110 ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.editor110 && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 space-y-4">
                    {/* 说明文字 */}
                    <p className="text-sm text-gray-700">
                      HOTONE メーカーサイトより直接ダウンロードが開始されます。
                    </p>

                    {/* 兼容性说明 */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <p className="text-sm text-gray-700">
                        AMPEROⅡSTOMP Firmware 1.1.0 に対応
                      </p>
                    </div>

                    {/* 下载按钮 */}
                    <div className="flex gap-3 justify-center pt-2">
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        <span>ダウンロード（Windows）</span>
                      </Button>
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        <span>ダウンロード（mac OS）</span>
                      </Button>
                    </div>
                      </div>
                )}
                    </div>

              {/* Row 5 Right - ファームウェア：AMPERO II STOMP Firmware 1.0.3 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow self-start">
                <button
                  onClick={() => toggleSoftware("fw103")}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Download className="w-4 h-4 text-gray-600" />
                  </div>
                    <span className="font-medium text-gray-900 text-sm">ファームウェア：AMPERO II STOMP Firmware 1.0.3</span>
              </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.fw103 ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.fw103 && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 space-y-6">
                    {/* 顶部说明 */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-gray-700">
                        Ampero II Stompの新しいファームウェアFirmware:v1.0.3がリリースされました。（2022年3月31日）
                      </p>
                    </div>

                    {/* 注意1 - USB连接 */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm font-bold text-gray-900 mb-2">注意：</p>
                      <p className="text-sm text-gray-700">
                        ソフトウェアをアップデートする際は、USBケーブルをパソコンへ直接接続されているかご確認ください。USBハブを経由いたしますと、アップデートに不具合が発生する場合があります。
                      </p>
                    </div>

                    {/* 注意2 - 硬件版本 */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm font-bold text-gray-900 mb-2">注意：</p>
                      <p className="text-sm text-gray-700">
                        ハードウェア・バージョンが　V1.0.0より古いものをご使用の場合は、Firmware V1.0.3 より古いファームウェアにダウングレードしないでください。故障の原因になる可能性があります。（ハードウェア・バージョンは［Global］→［About］よりご確認いただけます。）
                      </p>
                    </div>

                    {/* 更新步骤 */}
                    <div className="space-y-4">
                      <h4 className="text-base font-bold text-gray-900">以下の手順でアップデートを行なってください。</h4>
                      
                      <ol className="space-y-3 text-sm text-gray-700 list-decimal list-inside">
                        <li>最新のFirmwareをPCにダウンロードします。</li>
                        <li>PCと電源OFFの状態のAMPERO Ⅱ STOMPをUSB接続し、エディターV1.0.2を立ち上げます。</li>
                        <li>Footswitch 2、3、Menu/Valueノブの3つを同時に押しながらAMPERO Ⅱ STOMP本体の電源をONにします。</li>
                        <li>エディター画面に「Update」のボタンが表示されたら、案内に従って画面を進めてください。</li>
                        <li>Firmwareデータファイルを選択する画面に入ったら、先にダウンロードした最新のFirmware binファイル「Ampero_II_Stomp_Firmware_V1.0.3.bin」を選択して頂くとUpdateが始まります。</li>
                        <li>Update完了後、AMPERO Ⅱ STOMPが自動で再起動しますと完了です。</li>
                      </ol>
                    </div>

                    {/* 版本确认方法 */}
                    <div className="bg-gray-100 rounded-lg p-4">
                      <p className="text-sm text-gray-700">
                        アップデート後のソフトウェア・バージョンは、「Global」の中の「About」で確認いただけます。
                      </p>
                    </div>

                    {/* 主图 */}
                    <div className="flex justify-center">
                      <Image
                        src="/images/brands/hotone/ampero_ii_stomp/software_13.png"
                        alt="AMPERO II STOMP Firmware 1.0.3"
                        width={800}
                        height={500}
                        className="rounded-lg"
                        unoptimized
                      />
                    </div>

                    {/* 下载按钮 */}
                    <div className="flex justify-center pt-2">
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        <span>ダウンロードはこちら（.zip）</span>
                      </Button>
                    </div>
                  </div>
                )}
            </div>

              {/* Row 6 Left - Ampero II Stomp Editor 1.0.2 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow self-start">
                <button
                  onClick={() => toggleSoftware("editor102")}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Download className="w-4 h-4 text-gray-600" />
                  </div>
                    <span className="font-medium text-gray-900 text-sm">Ampero II Stomp Editor 1.0.2</span>
              </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.editor102 ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.editor102 && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 space-y-4">
                    {/* 说明文字 */}
                    <p className="text-sm text-gray-700">
                      HOTONE メーカーサイトより直接ダウンロードが開始されます。
                    </p>

                    {/* 兼容性说明 */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <p className="text-sm text-gray-700">
                        AMPERO II STOMP Firmware 1.0.2、1.0.1、1.0.0に対応
                      </p>
                    </div>

                    {/* 下载按钮 */}
                    <div className="flex gap-3 justify-center pt-2">
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        <span>ダウンロード（Windows）</span>
                      </Button>
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        <span>ダウンロード（mac OS）</span>
                      </Button>
                    </div>
                        </div>
                )}
                    </div>

              {/* Row 6 Right - ファームウェア：AMPERO II STOMP Firmware 1.0.2 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow self-start">
                <button
                  onClick={() => toggleSoftware("fw102")}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Download className="w-4 h-4 text-gray-600" />
                      </div>
                    <span className="font-medium text-gray-900 text-sm">ファームウェア：AMPERO II STOMP Firmware 1.0.2</span>
                      </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.fw102 ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.fw102 && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 space-y-6">
                    {/* 主图 */}
                    <div className="flex justify-center">
                      <Image
                        src="/images/brands/hotone/ampero_ii_stomp/software_14.jpg"
                        alt="AMPERO II STOMP Firmware 1.0.2"
                        width={800}
                        height={500}
                        className="rounded-lg"
                        unoptimized
                      />
                    </div>

                    {/* 改善点、変更、バグフィックスの紹介 */}
                    <div className="space-y-4">
                      <h4 className="text-base font-bold text-gray-900">改善点、変更、バグフィックスの紹介</h4>
                      
                      <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                        <li>システムパフォーマンスを最適化しました。</li>
                        <li>I/Oメーターの精度を最適化しました。</li>
                        <li>スムーズなボリュームコントロール実現のため、ボリュームノブの動作を最適化しました。</li>
                        <li>入出力ジャックが接続されると、対応するI/O メーターのフレームが点灯します。</li>
                        <li>USBオーディオの出力レベルが標準化されました。</li>
                        <li>エフェクトパラメーター（異常があった）が改善されました。: Behemoth M、Moo VCF Env、Chili Wah、Match 30 Clean (AMP/PRE AMP)、Emperor Drive (AMP/PRE AMP)、Messe Bass 400 (AMP/PRE AMP)、Tape Delay M、Tape Delay S、Reverse Delay、2290 Mod、2290 Ducker</li>
                        <li>エクスプレッションペダルの動作：パラメーターバリューと実際のバリューが異なる「パラメーター」が存在しました。このバグフィックスが完了しました。</li>
                        <li>テールスイッチのon/off 動作が繰り返されると発生したオーバーロードが修正されました。</li>
                        <li>Global EQメニューにおいて、特定周波数バンドスイッチのon/off 動作が繰り返されると発生した出力レベルクリッピングを解消しました。</li>
                        <li>他のマイナーバグ修正が完了しました。</li>
                      </ul>
                    </div>

                    {/* 下载按钮 */}
                    <div className="flex justify-center pt-2">
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        <span>ダウンロードはこちら（.zip）</span>
                      </Button>
                    </div>
                      </div>
                )}
                    </div>

              {/* Row 7 Left - Ampero II Stomp Editor 1.0.1 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow self-start">
                <button
                  onClick={() => toggleSoftware("editor101")}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Download className="w-4 h-4 text-gray-600" />
                      </div>
                    <span className="font-medium text-gray-900 text-sm">Ampero II Stomp Editor 1.0.1</span>
                      </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.editor101 ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.editor101 && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 space-y-4">
                    {/* 改善点、変更、バグフィックスの紹介 */}
                    <div className="space-y-4">
                      <h4 className="text-base font-bold text-gray-900">改善点、変更、バグフィックスの紹介</h4>
                      
                      <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                        <li>Firmware V1.0.2 のサポートが追加されています。</li>
                        <li>I/Oメーターの精度を最適化しました。</li>
                        <li>パッチインポートに於いてクイックアクセスパラメーターやtime/rate ベースのセッティングが正しくインポートされないバグを修正しました。</li>
                        <li>入出力ジャックが接続されると、対応するI/O メーターのフレームが点灯します。</li>
                        <li>パッチインポートにおいて一部のエフェクトパラメーターがデフォルト状態になるバグを修正完了しました。</li>
                        <li>他のマイナーバグ修正が完了しました。</li>
                      </ul>
                    </div>

                    {/* 下载按钮 */}
                    <div className="flex gap-3 justify-center pt-2">
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        <span>ダウンロード（Windows）</span>
                      </Button>
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        <span>ダウンロード（mac OS）</span>
                      </Button>
                    </div>

                    {/* 注意提示 */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-gray-700">
                        注意：パッチファイルの書き出しにおけるデータエラーを避けるため、エディターソフトV1.0.1.での再試行をお願いします。
                      </p>
                    </div>
                  </div>
                )}
            </div>

              {/* Row 7 Right - ファームウェア：AMPERO II STOMP Firmware 1.0.1 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow self-start">
                <button
                  onClick={() => toggleSoftware("fw101")}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Download className="w-4 h-4 text-gray-600" />
                  </div>
                    <span className="font-medium text-gray-900 text-sm">ファームウェア：AMPERO II STOMP Firmware 1.0.1</span>
                      </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.fw101 ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.fw101 && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 space-y-4">
                    {/* 说明文字 */}
                    <p className="text-sm text-gray-700 text-center">
                      HOTONE メーカーサイトより直接ダウンロードが開始されます。
                    </p>

                    {/* 下载按钮 */}
                    <div className="flex justify-center pt-2">
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        <span>ダウンロードはこちら（.zip）</span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Row 8 Left - HOTONE USB ASIO ドライバー v5.12.0 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow self-start">
                <button
                  onClick={() => toggleSoftware("asio512")}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Download className="w-4 h-4 text-gray-600" />
                  </div>
                    <span className="font-medium text-gray-900 text-sm">HOTONE USB ASIO ドライバー v5.12.0</span>
                      </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.asio512 ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.asio512 && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 space-y-4">
                    {/* 说明文字 */}
                    <p className="text-sm text-gray-700 text-center">
                      HOTONE メーカーサイトより直接ダウンロードが開始されます。
                    </p>

                    {/* 下载按钮 */}
                    <div className="flex justify-center pt-2">
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        <span>ダウンロードはこちら（.zip）</span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Row 8 Right - ASIO ドライバー：HOTONE USB ASIO Driver Version 5.41.2 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow self-start">
                <button
                  onClick={() => toggleSoftware("asio541")}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Download className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="text-left">
                      <span className="font-medium text-gray-900 text-sm">ASIO ドライバー：HOTONE USB ASIO Driver Version 5.41.2</span>
                      <span className="text-xs text-red-500 font-bold ml-2">- New -</span>
                  </div>
              </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.asio541 ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.asio541 && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 space-y-6">
                    {/* 顶部说明 */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-gray-700">
                        USB ASIO DRIVER が V.5.41.2に更新されました。2022年8月12日にリリースいたしました。
                      </p>
                    </div>

                    {/* 主图15 */}
                    <div className="flex justify-center">
                      <Image
                        src="/images/brands/hotone/ampero_ii_stomp/software_15.jpg"
                        alt="HOTONE USB ASIO Driver"
                        width={800}
                        height={500}
                        className="rounded-lg"
                        unoptimized
                      />
                    </div>

                    {/* HOTONE USB ASIO Driver 标题 */}
                    <div className="text-center">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">HOTONE USB ASIO Driver</h4>
                      <p className="text-sm text-gray-700 mb-4">
                        HOTONE USB ASIO Driver Version 5.41.2　- New! -
                      </p>
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 mx-auto">
                        <span>メーカー・ダウンロードページはこちら</span>
                      </Button>
                    </div>

                    {/* 使用方法 */}
                    <div className="space-y-4">
                      <h4 className="text-base font-bold text-gray-900">Hotone USB ASIO Driver の使用方法</h4>
                      
                      <h5 className="text-sm font-bold text-gray-900">インストールと設定の手順</h5>

                      <ol className="space-y-4 text-sm text-gray-700 list-decimal list-inside">
                        <li className="space-y-2">
                          <p>Hotone製品の電源を入れ、コンピューターに接続します。その後、Hotone USB ASIO Driverをインストールします。</p>
                        </li>
                        <li className="space-y-2">
                          <p>使用されるDAWを起動して、"Devices" – "Device Setup"をクリックします。（Cubase 8 Element versionを例に説明します。）</p>
                          <p className="text-xs text-gray-500">Cubase 8 Element</p>
                          <div className="flex justify-center mt-2">
                            <Image
                              src="/images/brands/hotone/ampero_ii_stomp/software_16.png"
                              alt="Cubase 8 Element"
                              width={600}
                              height={400}
                              className="rounded-lg"
                              unoptimized
                            />
                          </div>
                        </li>
                        <li className="space-y-2">
                          <p>"Device Setup" ウィンドウの"VST Audio"を選択します。</p>
                          <p className="text-xs text-gray-500">Cubase 8 Element</p>
                          <div className="flex justify-center mt-2">
                            <Image
                              src="/images/brands/hotone/ampero_ii_stomp/software_17.png"
                              alt="Device Setup VST Audio"
                              width={600}
                              height={400}
                              className="rounded-lg"
                              unoptimized
                            />
                          </div>
                        </li>
                        <li className="space-y-2">
                          <p>ASIO Driverのドロップダウンメニューから"HOTONE AUDIO USB Audio Device"を見つけて、 "OK"をクリックします。</p>
                          <p className="text-xs text-gray-500">Cubase 8 Element</p>
                          <div className="flex justify-center mt-2">
                            <Image
                              src="/images/brands/hotone/ampero_ii_stomp/software_18.png"
                              alt="ASIO Driver Selection"
                              width={600}
                              height={400}
                              className="rounded-lg"
                              unoptimized
                            />
                          </div>
                        </li>
                        <li className="space-y-2">
                          <p>これで完了です。</p>
                        </li>
                      </ol>
                    </div>

                    {/* 最终下载按钮 */}
                    <div className="flex justify-center pt-2">
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        <span>ここからUSB ASIO Driver V5.41.2.をダウンロードしてください。</span>
                      </Button>
                    </div>
                  </div>
                )}
            </div>

              {/* Row 9 Left - AMPERO II STOMP EDITOR v1.0.0 for macOS */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow self-start">
                <button
                  onClick={() => toggleSoftware("editorMac")}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Download className="w-4 h-4 text-gray-600" />
                  </div>
                    <span className="font-medium text-gray-900 text-sm">AMPERO II STOMP EDITOR v1.0.0 for macOS</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.editorMac ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.editorMac && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 space-y-4">
                    {/* 说明文字 */}
                    <p className="text-sm text-gray-700">
                      HOTONE メーカーサイトより直接ダウンロードが開始されます。
                    </p>

                    {/* 兼容性说明 */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <p className="text-sm text-gray-700">
                          AMPERO II STOMP Firmware 1.0.1、1.0.0 に対応
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <p className="text-sm text-gray-700">
                          macOS版
                        </p>
                      </div>
                    </div>

                    {/* 下载按钮 */}
                    <div className="flex justify-center pt-2">
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        <span>ダウンロードはこちら（.zip）</span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Row 9 Right - AMPERO II STOMP EDITOR v1.0.0 for Windows */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow self-start">
                <button
                  onClick={() => toggleSoftware("editorWin")}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Download className="w-4 h-4 text-gray-600" />
                  </div>
                    <span className="font-medium text-gray-900 text-sm">AMPERO II STOMP EDITOR v1.0.0 for Windows</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.editorWin ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.editorWin && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 space-y-4">
                    {/* 说明文字 */}
                    <p className="text-sm text-gray-700">
                      HOTONE メーカーサイトより直接ダウンロードが開始されます。
                    </p>

                    {/* 兼容性说明 */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <p className="text-sm text-gray-700">
                          AMPERO II STOMP Firmware 1.0.1、1.0.0 に対応
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <p className="text-sm text-gray-700">
                          Windows版
                        </p>
                      </div>
                    </div>

                    {/* 下载按钮 */}
                    <div className="flex justify-center pt-2">
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        <span>ダウンロードはこちら（.zip）</span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 scroll-mt-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">よくある質問</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full bg-teal-500" />
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-3">
            {/* FAQ Item 1 */}
            <div className="bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
              <button
                onClick={() => toggleFAQ("faq1")}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900 text-left">
                    Ampero II Stompは、どうして9-18V DC電源に対応できるのですか?
                  </span>
                </div>
                {expandedFAQ.faq1 ? (
                  <Minus className="w-5 h-5 text-gray-600" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-600" />
                )}
              </button>
              {expandedFAQ.faq1 && (
                <div className="px-6 py-4 bg-white border-t border-gray-200 space-y-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    ご存知のように、ほとんどのペダルは9VDC電源を採用しています。複数のペダルへ電源供給する電源ユニットも9Vのマルチ出力電源がほとんどです。そこで、Ampero II Stompはペダルボード上で他のペダルと一緒に9-18V DCで使えるように設計しました。
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    本機は800mA以上@9V DCの高い電流が必要です。マルチ電源を使用する場合は、Ampero II Stompの故障を防ぐために、信頼性の高いマルチ電源（アイソレートタイプ）を使用してください。Strymon電源ユニットのように1つの出力は最大500mAが一般的です。本機に電源供給する場合は、カレントダブラーケーブル（1Aの電流が流せる規格のケーブル）で２つの出力の合計で1Aが出力できる様にして使います。
                  </p>
                </div>
              )}
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
              <button
                onClick={() => toggleFAQ("faq2")}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900 text-left">
                    本体の３つのフットスイッチでは足りない場合は、追加フットスイッチやペダルで操作できますか?
                  </span>
                </div>
                {expandedFAQ.faq2 ? (
                  <Minus className="w-5 h-5 text-gray-600" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-600" />
                )}
              </button>
              {expandedFAQ.faq2 && (
                <div className="px-6 py-4 bg-white border-t border-gray-200">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Ampero II Stompは、２種類（EXPペダルもしくはフットスイッチ）の外部コントローラーに対応しています。
                  </p>
                </div>
              )}
            </div>

            {/* FAQ Item 3 - New! */}
            <div className="bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
              <button
                onClick={() => toggleFAQ("faq3")}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900 text-left">
                    AMPERO II STOMPがエディターに認識されない？？？
                  </span>
                  <span className="text-xs font-bold text-red-500">New!</span>
                </div>
                {expandedFAQ.faq3 ? (
                  <Minus className="w-5 h-5 text-gray-600" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-600" />
                )}
              </button>
              {expandedFAQ.faq3 && (
                <div className="px-6 py-4 bg-white border-t border-gray-200 space-y-6">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    本体のUSB Firmware Updateを行い解決できます。
                  </p>

                  {/* Windows PC Section */}
                  <div className="space-y-4">
                    <h4 className="text-base font-bold text-gray-900">Windows PC</h4>
                    <div className="space-y-3 text-sm text-gray-700">
                      <p className="leading-relaxed">
                        Windows PCの場合は、AMPERO II STOMP用エディターの他に「HOTONE ASIOドライバー」が必須です。
                      </p>
                      <p className="leading-relaxed">
                        インストールが完了していない場合は、以下URLから「Hotone Generic USB ASIO Driver V5.12.0 Setup」をダウンロード＆インストールまで完了してださい。
                      </p>
                      <p className="leading-relaxed">
                        <a href="https://www.hotoneaudio.com/support/3" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                          https://www.hotoneaudio.com/support/3
                        </a>
                      </p>
                      <p className="leading-relaxed">
                        ノート：ASIOドライバーのインストールを完了した状態でもエディターに認識されない場合は、本体側のUSBドライバーアップデートをお試しください。
                      </p>
                      <ol className="space-y-3 list-decimal list-inside">
                        <li className="leading-relaxed">
                          以下URLから「Solution of Ampero ll Stomp Hardware & Software Connection Problem」をダウンロードします。
                          <br />
                          <a href="https://www.hotoneaudio.com/support/2" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                            https://www.hotoneaudio.com/support/2
                          </a>
                        </li>
                        <li className="leading-relaxed">
                          ダウンロードしたファイルを開き「windows」→「Application」→「HOTONEUsbAudioDfu」から「HOTONEUsbAudioDfu.exe」を立ち上げます。
                        </li>
                        <li className="leading-relaxed">
                          AMPERO II STOMPをUSB接続し、どのボタンも押さない状態で起動します。
                        </li>
                        <li className="leading-relaxed">
                          ウィンドウ内の「Browse」ボタンを押し、先にダウンロードしたファイル内にある「Ampero II Stomp USB Audio Firmware V1.10.bin」のファイルを選択して「Start」を押します。
                        </li>
                        <li className="leading-relaxed">
                          アップデートが終了したら、エディターを立ち上げて、正常に認識されるかを確認してください。
                        </li>
                      </ol>
                      <div className="flex justify-center mt-4">
                        <Image
                          src="/images/brands/hotone/ampero_ii_stomp/software_01.jpg"
                          alt="Windows画面"
                          width={600}
                          height={400}
                          className="rounded-lg"
                          unoptimized
                        />
                      </div>
                      <p className="text-xs text-gray-500">windows画面</p>
                    </div>
                  </div>

                  {/* mac OS Section */}
                  <div className="space-y-4">
                    <h4 className="text-base font-bold text-gray-900">mac OS</h4>
                    <div className="space-y-3 text-sm text-gray-700">
                      <ol className="space-y-3 list-decimal list-inside">
                        <li className="leading-relaxed">
                          以下のURLより「Solution of Ampero ll Stomp Hardware & Software Connection Problem」をダウンロードします。
                          <br />
                          <a href="https://www.hotoneaudio.com/support/2" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                            https://www.hotoneaudio.com/support/2
                          </a>
                        </li>
                        <li className="leading-relaxed">
                          ダウンロードしたファイルを開き「mac Updater」からアップデート用アプリケーションをインストールします。
                        </li>
                        <li className="leading-relaxed">
                          AMPERO II STOMPをUSB接続し、どのボタンも押さない状態で起動します。
                        </li>
                        <li className="leading-relaxed">
                          ウィンドウ内の「Browse」ボタンを押し、先にダウンロードしたファイル内にある「Ampero II Stomp USB Audio Firmware V1.10.bin」のファイルを選択して「Start」を押します。
                        </li>
                        <li className="leading-relaxed">
                          アップデートが終了したら、エディターを立ち上げて、正常に認識されるかを確認してください。
                        </li>
                      </ol>
                      <p className="leading-relaxed">
                        ※macOS10.14以降のマシーンでのみアップデートが可能です。
                      </p>
                      <div className="flex justify-center mt-4">
                        <Image
                          src="/images/brands/hotone/ampero_ii_stomp/software_02.png"
                          alt="macOS画面"
                          width={600}
                          height={400}
                          className="rounded-lg"
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* FAQ Item 4 - New! */}
            <div className="bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
              <button
                onClick={() => toggleFAQ("faq4")}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900 text-left">
                    USBオーディオ（I/O）サンプリングレートの切り替え方法
                  </span>
                  <span className="text-xs font-bold text-red-500">New!</span>
                </div>
                {expandedFAQ.faq4 ? (
                  <Minus className="w-5 h-5 text-gray-600" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-600" />
                )}
              </button>
              {expandedFAQ.faq4 && (
                <div className="px-6 py-4 bg-white border-t border-gray-200 space-y-6">
                  {/* 介绍文字 */}
                  <p className="text-sm text-gray-700 leading-relaxed">
                    USB オーディオ・ファームウェア（ver.2.01）使用時では、USBオーディオのサンプリングレートの切り替え（16/24ビット、44.1kHz～192kHz）が可能です。
                  </p>

                  {/* 规格说明 */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <p className="text-sm text-gray-700">
                        ８つの I/O チャンネルはすべて 44.1/48kHz での利用が可能です。
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <p className="text-sm text-gray-700">
                        I/Oチャンネル1～4は88.2kHz/96kHzでの利用が可能です。
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <p className="text-sm text-gray-700">
                        I/Oチャンネル1～2は176.4/192kHzでの利用が可能です。
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <p className="text-sm text-gray-700">
                        176.4/192kHz サンプリング レートの場合、録音/再生パフォーマンスを向上させるために、より大きなバッファーサイズ （64以上）への変更をお勧めします。
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <p className="text-sm text-gray-700">
                        アップデートが終了したら、エディターを立ち上げて、正常に認識されるかを確認してください。
                      </p>
                    </div>
                  </div>

                  {/* Windows Section */}
                  <div className="space-y-4">
                    <h4 className="text-base font-bold text-gray-900">サンプリングレート変更方法【Windowsの場合】</h4>
                    <div className="space-y-3 text-sm text-gray-700">
                      <ol className="space-y-3 list-decimal list-inside">
                        <li className="leading-relaxed">
                          USB Audio Driverアップグレードの際に、"HOTONE AUDIO USB Audio Device Control Panel"アプリがダウンロードされます。
                        </li>
                      </ol>
                      <div className="flex justify-center mt-4">
                        <Image
                          src="/images/brands/hotone/ampero_ii_stomp/software_03.png"
                          alt="HOTONE AUDIO USB Audio Device Control Panel"
                          width={400}
                          height={400}
                          className="rounded-lg"
                          unoptimized
                        />
                      </div>
                      <ol className="space-y-3 list-decimal list-inside" start={2}>
                        <li className="leading-relaxed">
                          Ampero Ⅱ Stompを接続した状態で、こちらのコントローラーの中で、サンプルレートの変更が可能です。
                        </li>
                      </ol>
                      <div className="flex justify-center mt-4">
                        <Image
                          src="/images/brands/hotone/ampero_ii_stomp/software_04.png"
                          alt="Windows画面"
                          width={600}
                          height={400}
                          className="rounded-lg"
                          unoptimized
                        />
                      </div>
                      <p className="text-xs text-gray-500">画面</p>
                    </div>
                  </div>

                  {/* macOS Section */}
                  <div className="space-y-4">
                    <h4 className="text-base font-bold text-gray-900">サンプリングレート変更方法【macOSの場合】</h4>
                    <div className="space-y-3 text-sm text-gray-700">
                      <p className="leading-relaxed">
                        Macシステムを使用している場合、（Ampero II ステージには出荷時には最新のUSB オーディオ ファームウェアが搭載されているため、USB オーディオ ファームウェア (V2.01) をダウンロードする必要はありません。）ファームウェアをダウンロードすると、USB オーディオ ファームウェア （V2.01）もダウンロードされます。
                      </p>
                      <ol className="space-y-3 list-decimal list-inside">
                        <li className="leading-relaxed">
                          コンピューターから「Audio midi」を検索し、「Audio midi setup」に入ります。
                        </li>
                      </ol>
                      <div className="flex justify-center mt-4">
                        <Image
                          src="/images/brands/hotone/ampero_ii_stomp/software_05.jpg"
                          alt="Audio MIDI Setup"
                          width={600}
                          height={400}
                          className="rounded-lg"
                          unoptimized
                        />
                      </div>
                      <ol className="space-y-3 list-decimal list-inside" start={2}>
                        <li className="leading-relaxed">
                          次に、Ampero II STAGE、Ampero II Stomp Audioを見つけて、[fomat/形式] をクリックして別の出力サンプルレートを選択します。
                        </li>
                      </ol>
                      <div className="flex justify-center mt-4">
                        <Image
                          src="/images/brands/hotone/ampero_ii_stomp/software_06.jpg"
                          alt="Audio MIDI Setup Format"
                          width={600}
                          height={400}
                          className="rounded-lg"
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Specs Section */}
      <section id="specs" className="py-20 scroll-mt-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">製品仕様</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full bg-teal-500" />
            </div>
          </div>

          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Column */}
              <div className="space-y-8">
                {/* INPUT セクション */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">INPUT セクション</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>1 x 3モードセレクター付き1/4&quot;TSインストルメントジャック</p>
                    <p>1 x 5モードセレクター付き XLR or 1/4&quot;（TS）コンボジャック ＜最大ゲイン52dB マイクプリアンプmic preamp＞</p>
                    <p>1 x 1/8&quot;ステレオAuxインジャック</p>
                    <p>2 x 1/4&quot;TRS EXPペダル/モメンタリーフットスイッチ（EXP/CTRL）ジャック）</p>
                    <p>1 x 1/4&quot;TRSアンバランス ステレオFXリターンジャック</p>
                    <p>1 x 1/8&quot;TRS MIDI INジャック</p>
                  </div>
                </div>

                {/* 入力インピーダンス */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">入力インピーダンス</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>1/4&quot;TS入力：E.GT: 1MΩ; A.GT: 4.7MΩ; LINE: 10kΩ</p>
                    <p>XLR入力：5kΩ</p>
                    <p>FX ループリターン入力：100kΩ</p>
                    <p>Aux In：10kΩ</p>
                  </div>
                </div>

                {/* OUTPUT セクション */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">OUTPUT セクション</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>2 x 1/4&quot;TRSアンバランス ステレオ出力ジャック</p>
                    <p>2 x グランドリフト付きXLRバランス出力ジャック</p>
                    <p>1 x 1/4&quot;TRSアンバランス ステレオFXセンドジャック</p>
                    <p>1 x 1/8&quot;ヘッドフォン出力ジャック</p>
                    <p>1 x 1/8&quot;TRS MIDI OUTジャック</p>
                  </div>
                </div>

                {/* 出力インピーダンス */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">出力インピーダンス</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>アンバランス出力：1kΩ</p>
                    <p>バランス出力：1kΩ</p>
                    <p>FX ループセンド：1kΩ</p>
                    <p>ヘッドフォン：47Ω</p>
                  </div>
              </div>

                {/* USBセクション */}
                        <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">USBセクション</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>USB 2.0 Type-C</p>
                    <p>8-in/8-out オーディオインターフェース</p>
                    <p>サンプルレート：44.1kHz/48kHz/88.2kHz/96kHz/176.4kHz/192kHz</p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* 電源 */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">電源</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>9-18V DC、センターマイナス、1.5A以上（9V）/ 0.8A以上（18V）</p>
                  </div>
                </div>

                {/* 寸法 */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">寸法</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>280mm × 135mm × 52mm（ノブ含む）</p>
                  </div>
                </div>

                {/* 重量 */}
                        <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">重量</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>約1.2kg</p>
                  </div>
                      </div>

                {/* 付属品 */}
                        <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">付属品</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>ACアダプター</p>
                    <p>USB Type-Cケーブル</p>
                    <p>クイックスタートガイド</p>
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
  );
}


