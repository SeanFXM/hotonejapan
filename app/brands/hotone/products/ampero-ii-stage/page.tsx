"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Download, ChevronDown, ChevronUp } from 'lucide-react'
import { BlogSlider } from "@/components/blog-slider"
import { downloadManual } from "@/lib/manual-download"

type Section = "concept" | "demo" | "features" | "controls" | "connections" | "software" | "manual" | "specs"

const navigationItems = [
  { id: "concept" as Section, label: "コンセプト" },
  { id: "demo" as Section, label: "デモムービー" },
  { id: "features" as Section, label: "主な機能" },
  { id: "controls" as Section, label: "コントロール" },
  { id: "connections" as Section, label: "接続例" },
  { id: "software" as Section, label: "ソフトウェア" },
  { id: "manual" as "manual", label: "取扱説明書", isDownload: true },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function AmperoIIStagePage() {
  const [activeSection, setActiveSection] = useState<Section>("concept")
  const [headerHeight, setHeaderHeight] = useState(72)
  const [expandedSoftware, setExpandedSoftware] = useState<{ [key: string]: boolean }>({})

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
    downloadManual("hotone", "ampero-ii-stage")
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
          src="/images/brands/hotone/ampero_ii_stage/hero.jpg"
          alt="AMPERO II STAGE"
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
                <p className="text-2xl font-bold text-gray-900">AMPERO II STAGE</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">アンプモデラー</p>
                <p className="text-base text-gray-900 pl-12">エフェクター</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-hotone">
                  ¥95,700 <span className="text-sm font-normal text-gray-600">前後（税込）</span>
                </p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">6959473905142</p>
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
              CDCM HD GEN 2 ステージタイプ
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              アンプモデラー / エフェクトプロセッサー
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
                  src="/images/brands/hotone/ampero_ii_stage/intro.jpg"
                  alt="AMPERO II STAGE"
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
                    <a href="#" className="text-gray-700 hover:text-hotone">「AMPERO II Stage」のご購入者を対象に「AMPERO II Press」の特別引換クーポンがもらえるキャンペーン開催中</a>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-hotone">📢</span>
                    <a href="#" className="text-gray-700 hover:text-hotone">Ampero IIシリーズに対応の新機能「Sound Clone」が正式リリース</a>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500">📄</span>
                    <a href="#" className="text-gray-700 hover:text-hotone">Ampero II Stage 日本語ユーザーマニュアル</a>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500">📄</span>
                    <a href="#" className="text-gray-700 hover:text-hotone">Ampero II Stage エフェクトリスト（日本語版）</a>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500">📄</span>
                    <a href="#" className="text-gray-700 hover:text-hotone">Ampero II Stage クイックマニュアル</a>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500">📄</span>
                    <a href="#" className="text-gray-700 hover:text-hotone">Ampero II Stage ドラムリズムリスト</a>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500">📄</span>
                    <a href="#" className="text-gray-700 hover:text-hotone">Ampero II Stage MIDI コントロール・インフォメーション・リスト</a>
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
                <p className="text-gray-800 leading-relaxed font-medium">
                  <span className="font-bold">Ampero シリーズの最新ジェムAmpero II Stageが、あなたのライブパフォーマンスに革命をもたらします。</span>
                </p>
                <p className="text-gray-600 leading-relaxed">
                  最先端のトリプルコアデジタルプラットフォームと、高音質を誇るESS® Sabreシリーズの独立したAD/DAコンバーターを備えたAmpero II Stageは、比類のない優れたサウンドをお届けします。
                </p>
                <p className="text-gray-600 leading-relaxed">
                  大規模な音楽フェスティバルのステージでも、行きつけのライブハウスでも、Ampero II Stageはステージに左右されないサウンドを提供してくれる即戦力ギアです。ステージパフォーマンスのために特別にデザインされており、8つのフットスイッチ、直感的な操作感、斬新なUIデザインでパフォーマンスをサポートします。 Bluetooth接続と見やすいLEDインジケーターが追加されたAmpero II Stageは、どんなステージ上でも頼もしい相棒です。
                </p>
                <p className="text-gray-800 leading-relaxed font-bold">
                  Ampero II Stageは、Hotoneの次世代エフェクトアルゴリズムをお届けします。<br />
                  ヒアリングとプレイの両面で圧倒的な音質の違いを体験できます。
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4 mt-8">
                <h4 className="text-xl font-bold text-gray-900">400+のアンプ、エフェクト＆キャビネット</h4>
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
                    スタジオデーターに基づいた精度の高い7種類のマイクプレイスメント
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
                    新開発のサウンド・キャプチャー機能「Tone Catch」を搭載
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
            {/* Concept 1 - ワンストップソリューション */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">「ワンストップ」ソリューション</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="rounded-2xl overflow-hidden">
                  <Image
                    src="/images/brands/hotone/ampero_ii_stage/concept_01.gif"
                    alt="ワンストップソリューション"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                    unoptimized
                  />
                </div>
                <div className="text-gray-300 space-y-4">
                  <p className="leading-relaxed">
                    優れたステージパフォーマンスを実現するには、練習した通りが平気です。Ampero II Stageは、エクストリーム・ループ、60秒のルーパー機能、メトロノーム、約30種類のドラムパターンを内蔵しています。
                  </p>
                </div>
              </div>
            </div>

            {/* Concept 2 - お好みのコントロールスタイル */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">お好みのコントロールスタイル</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="rounded-2xl overflow-hidden">
                  <Image
                    src="/images/brands/hotone/ampero_ii_stage/concept_02.gif"
                    alt="コントロールスタイル"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                    unoptimized
                  />
                </div>
                <div className="text-gray-300 space-y-4">
                  <p className="leading-relaxed">
                    Ampero II Stageは、PATCHとSTOMPチェンジの2つの動作モードがあり、それぞれに異なるコーディングウェーターとモード切り替えフットスイッチが付いています。STOMPモードでは、7つのフットスイッチを独立したエフェクトの操作用として、指定を順方向シーンの切り替えエフェクトのトグル又はシーンの変更に、シームレスなワークフローを提供します。
                  </p>
                </div>
              </div>
            </div>

            {/* Concept 3 - 5つのシーン */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">5つのシーンでセッティングをシームレスに切り替え</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="rounded-2xl overflow-hidden">
                  <Image
                    src="/images/brands/hotone/ampero_ii_stage/concept_03.gif"
                    alt="5つのシーン"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                    unoptimized
                  />
                </div>
                <div className="text-gray-300 space-y-4">
                  <p className="leading-relaxed">
                    スムーズなサウンドチェンジを実現するため新しい「シーン」機能を追加しました。各Ampero II Stageパッチには最大5つのシーンを保存できるため、曲の流れに合わせるセクションやエフェクトパラメーターを瞬時に切り替えることができます。すでにある人のためのギア製品です。
                  </p>
                </div>
              </div>
            </div>

            {/* Concept 4 - Tone Catch */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-sm text-orange-400 bg-orange-400/20 px-3 py-1 rounded">Firmware 1.3.7 Update</span>
                <h3 className="text-2xl font-bold text-white">Tone Catch（トーンキャッチ）</h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-4">
                  {/* YouTube Video 1 */}
                  <div className="aspect-video bg-black rounded-xl overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/jr4PNJgbB1w"
                      title="Tone Catch Tutorial"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <p className="text-sm text-gray-400">前往主台確認 @ YouTube</p>
                  
                  {/* YouTube Video 2 */}
                  <div className="aspect-video bg-black rounded-xl overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/_b2JgbNb16k"
                      title="Tone Catch Comparison Demo"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <p className="text-sm text-gray-400">前往主台確認 @ YouTube</p>
                  <p className="text-sm text-gray-500 mt-2">※「Ampero II」版Tone Catch動作説明です。</p>
                </div>
                <div className="text-gray-300 space-y-4">
                  <p className="leading-relaxed">
                    Firmware 1.3.7 アップデートにより、追加の「Tone Catch」が搭載されました。Podsやエフェクターペダルのサウンドをそのままキャプチャーできます。また、Hotone コミュニティ「<span className="text-orange-400">Sound Clone</span>」を通じて世界中のユーザーがトーンを共有したり発見したりすることも可能です。
                  </p>
                  <div className="my-6">
                    <Image
                      src="/images/brands/hotone/ampero_ii_stage/tonecatch.png"
                      alt="Tone Catch Flow"
                      width={600}
                      height={150}
                      className="w-full h-auto"
                    />
                  </div>
                  <p className="leading-relaxed">
                    Tone Catchは、コーリー・ウォンがブラック・キャッツ・バースデイライブンジでためにも、Hotone的CDCMのほとんどソリューションで、アンポデシグネ（バージョン名称）を追くしよい、立場として、立体的グルーブ「Axe-FxIII」及びウェットモートのONTOセンションなどをセンションして、ニューリッチにニュアンス豊かなサウンドを伝わえています。
                  </p>
                  <p className="leading-relaxed">
                    Tone Catchは、アンプ、キャビネット、オーバースペ、ブースター、また外のオーディオを採れることができます。さまざな直接に感じるような周波電気に基づいて実現しようとオペレーに変る。一般的のコンプをペダルを利用するように限のフォルダー
                  </p>
                  <div className="rounded-xl overflow-hidden mt-4">
                    <Image
                      src="/images/brands/hotone/ampero_ii_stage/concept_04.png"
                      alt="Tone Catch Interface"
                      width={600}
                      height={300}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Concept 5 - Sound Clone */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-sm text-orange-400 bg-orange-400/20 px-3 py-1 rounded">Firmware 1.4.3 Update</span>
                <h3 className="text-2xl font-bold text-white">Sound Clone（サウンドクローン）正式リリース</h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="rounded-2xl overflow-hidden">
                  <Image
                    src="/images/brands/hotone/ampero_ii_stage/concept_05.jpg"
                    alt="Sound Clone"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
                <div className="text-gray-300 space-y-4">
                  <p className="leading-relaxed">
                    Firmware 1.4.3より、Tone Catchが「Sound Clone」へと進化しました。さらに信頼性やクリーン操作5.0へと対応しました。
                  </p>
                  <p className="leading-relaxed">
                    Tone Catch/クエローズの優れた音質で音をSound Clone を共有する。コンピューターとは接続のモービルアプリ「GIG-GIG」で、本格的なプリアンプのサウンドをキャプチャーすることができます。クラウド、Hotone モバイルアプリ「Sound Cloneソフトウェア」アプリでトップペーダーと設定をサポートいたしなりました。
                  </p>
                  <p className="leading-relaxed">
                    Sound Clone は公式サイトからダウンロードでき。Hotone コミュニティで登録して世界中よミュージシャンと曲（トーン）を共有できます。
                  </p>
                  <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors mt-4">
                    Sound Clone 詳しくはこちらをご覧ください
                  </a>
                </div>
              </div>
            </div>

            {/* Concept 6 - トリプルコアデジタルプラットフォーム */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">トリプルコアデジタルプラットフォーム<br /><span className="text-xl font-normal text-gray-400">- 信号処理をさらに加速</span></h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="rounded-2xl overflow-hidden bg-black/50 p-8 flex items-center justify-center">
                  <Image
                    src="/images/brands/hotone/ampero_ii_stage/concept_06.png"
                    alt="Analog Devices"
                    width={400}
                    height={200}
                    className="w-auto h-auto max-w-full"
                  />
                </div>
                <div className="text-gray-300 space-y-4">
                  <p className="leading-relaxed">
                    Ampero II Stageは、最新のトリプルコアデジタルプラットフォームとESS® Sabreシリーズの独立したAD/DAコンバーターを使用しています。驚くべきのGHz周波数高性能のDSP（デジタル信号処理能力）により、あらゆるシナリオのダイナミックなプロセスを実現しよう。立体的な空間性とナチュラルさを実現。
                  </p>
                </div>
              </div>
            </div>

            {/* Concept 7 - 460以上のエフェクトのライブラリー */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">460以上のエフェクトのライブラリー</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="rounded-2xl overflow-hidden">
                  <Image
                    src="/images/brands/hotone/ampero_ii_stage/concept_07.png"
                    alt="エフェクトライブラリー"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
                <div className="text-gray-300 space-y-3">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400">●</span>
                      87アンプモデル
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400">●</span>
                      68キャビネットモデル
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400">●</span>
                      リアルなスタジオレコーディングデーターに基づいた、より正確にキャビネット マイクプレイスメント
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400">●</span>
                      独占しなプリアンプモデル
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400">●</span>
                      独占パワーアンプエミュレーション
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400">●</span>
                      100以上の総計99ペダルモデル
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400">●</span>
                      単品なディストーション、ダイナミック、フィルター、モジュレーション、ディレイ、リバーブなどを含む60+以上のHotoneオリジナルエフェクト
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Concept 8 - 強化されたIRパフォーマンス */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">強化されたIRパフォーマンス<br /><span className="text-xl font-normal text-gray-400">本物のサウンドをあなたらしく</span></h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="rounded-2xl overflow-hidden">
                  <Image
                    src="/images/brands/hotone/ampero_ii_stage/concept_08.png"
                    alt="IRパフォーマンス"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
                <div className="text-gray-300 space-y-4">
                  <p className="leading-relaxed">
                    Ampero II Stageは、（従Amperoと比較して）2倍の最大20msまでサンプリングポイントをサポートし、キャビネットIRリソースと両動性が大幅に上上しました。IRパッチャーで最大100 slots（スロット）、1024ポイント/2048ポイントの8KHzのレートオーディオコイク。あなトーンは以前よりもへとグレードアップします。
                  </p>
                </div>
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
                  title="AMPERO II STAGE Demo 1"
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
                  title="AMPERO II STAGE Demo 2"
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
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg">
              <div className="relative">
                <span className="absolute top-4 left-4 text-6xl font-bold text-gray-200 z-10">01</span>
                <h3 className="absolute top-4 left-20 text-lg font-bold text-gray-900 z-10">デュアルエフェクトチェーン、トーンの可能性は無限大</h3>
              </div>
              <div className="aspect-video overflow-hidden mt-12">
                <Image
                  src="/images/brands/hotone/ampero_ii_stage/function_01.gif"
                  alt="デュアルエフェクトチェーン"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed">
                  Ampero II Stageは、シリーズおよびパラレルといった複数の接続形式のエフェクトチェーンをサポートする、柔軟なデュアルエフェクトチェーン設計です。ストンプボックスと同じように、モジュールとエフェクトを自由に組み合わせてサウンドメイクが可能です。Ampero II Stage は、単一か複合かにかかわらず、最大12個のエフェクトモジュールを同時に動作できます。
                </p>
              </div>
            </div>

            {/* Feature 02 */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg">
              <div className="relative">
                <span className="absolute top-4 right-4 text-6xl font-bold text-gray-200 z-10">02</span>
                <h3 className="absolute top-4 left-6 text-lg font-bold text-gray-900 z-10">マルチカラー エクスペリエンス</h3>
              </div>
              <div className="aspect-video overflow-hidden mt-12">
                <Image
                  src="/images/brands/hotone/ampero_ii_stage/function_02.png"
                  alt="マルチカラー エクスペリエンス"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    大型5インチディスプレイ
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    マルチカラー
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    アサイン可能なマルチカラーHalo LED付きフットスイッチ
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 03 */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg">
              <div className="relative">
                <span className="absolute top-4 left-4 text-6xl font-bold text-gray-200 z-10">03</span>
                <h3 className="absolute top-4 left-20 text-lg font-bold text-gray-900 z-10">プレイも歌も。パフォーマンスを解き放つ</h3>
              </div>
              <div className="aspect-video overflow-hidden mt-12">
                <Image
                  src="/images/brands/hotone/ampero_ii_stage/function_03.png"
                  alt="プレイも練る"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed">
                  Ampero II Stageはステレオ入力を備え、右チャンネルにはライン入力とマイク入力の両方をサポートするコンボ入力を備えています。48Vファンタム電源と最大52dBのゲインでダイナミック＆コンデンサー マイクに対応するマイクプリも内蔵し、5つの異なる入力モードは、ギター、ベース、シンセサイザー、ボーカル全てに対応します。あなたがギタリストでもボーカリストでも、Ampero II Stageはあなたの完璧なパートナーです。
                </p>
              </div>
            </div>

            {/* Feature 04 */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg">
              <div className="relative">
                <span className="absolute top-4 right-4 text-6xl font-bold text-gray-200 z-10">04</span>
                <h3 className="absolute top-4 left-6 text-lg font-bold text-gray-900 z-10">究極のステージハブをすべてのステージへ</h3>
              </div>
              <div className="aspect-video overflow-hidden mt-12">
                <Image
                  src="/images/brands/hotone/ampero_ii_stage/function_04.jpg"
                  alt="究極のステージハブ"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed">
                  Ampero II Stageは、ステージに合わせて複数のインターフェースを提供します。オンボードのバランス/アンバランスステレオ出力は、独立した信号処理とボリュームコントロールをサポートしているため、PAシステムとステージモニター用それぞれにエフェクトチェーンを提供できます。デュアルTRS EXP/CTRL拡張ジャックにより、Ampero II Pressなどの外部コントロールデバイスも簡単に接続できます。
                </p>
              </div>
            </div>

            {/* Feature 05 */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg">
              <div className="relative">
                <span className="absolute top-4 left-4 text-6xl font-bold text-gray-200 z-10">05</span>
                <h3 className="absolute top-4 left-20 text-lg font-bold text-gray-900 z-10">洗練されたUI、インテリジェントなタッチスクリーンOS</h3>
              </div>
              <div className="aspect-video overflow-hidden mt-12">
                <Image
                  src="/images/brands/hotone/ampero_ii_stage/function_05.jpg"
                  alt="タッチスクリーンOS"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed">
                  Amperoシリーズの経験とユーザーからのフィードバックを反映したAmpero II Stageは、大型5インチのダイナミック カラータッチスクリーンと、新鮮なUIデザインを実現しました。非常に直感的でスマートフォンのような操作性と、シームレスなコントロールと使い勝手をもたらします。
                </p>
              </div>
            </div>

            {/* Feature 06 */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg">
              <div className="relative">
                <span className="absolute top-4 right-4 text-6xl font-bold text-gray-200 z-10">06</span>
                <h3 className="absolute top-4 left-6 text-lg font-bold text-gray-900 z-10">Bluetooth –　ワイヤレスコントロール</h3>
              </div>
              <div className="aspect-video overflow-hidden mt-12">
                <Image
                  src="/images/brands/hotone/ampero_ii_stage/function_06.jpg"
                  alt="Bluetoothワイヤレスコントロール"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed">
                  Ampero II StageにはBluetoothモジュールが内蔵されており、iOS/Android対応の専用モバイルアプリにより、ステージ上での調整が簡単です。パフォーマンス中にかがみ込んで設定を変更する必要はもうありません。さらに、Bluetooth MIDIをサポートし、Ampero Controlなどのコントローラーとペアリングすることで、余計なケーブルの必要がないシンプルな足元を実現します。
                </p>
              </div>
            </div>

            {/* Feature 07 */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg">
              <div className="relative">
                <span className="absolute top-4 left-4 text-6xl font-bold text-gray-200 z-10">07</span>
                <h3 className="absolute top-4 left-20 text-lg font-bold text-gray-900 z-10">１クリックでクラウドへアクセス＆シェア</h3>
              </div>
              <div className="aspect-video overflow-hidden mt-12">
                <Image
                  src="/images/brands/hotone/ampero_ii_stage/function_07.jpg"
                  alt="クラウドアクセス"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed">
                  新しいHotoneコミュニティにアクセスできる専用のWin/Mac/iOS/Androidソフトウェアなら、自分のパッチを簡単に共有したり、ワンクリックで他の人のパッチをダウンロードできます。世界中にいる仲間のユーザーやコラボアーティストとつながりましょう。
                </p>
              </div>
            </div>

            {/* Feature 08 */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg">
              <div className="relative">
                <span className="absolute top-4 right-4 text-6xl font-bold text-gray-200 z-10">08</span>
                <h3 className="absolute top-4 left-6 text-lg font-bold text-gray-900 z-10">レコーディングもストリーミングもプロ仕様のインターフェースで</h3>
              </div>
              <div className="aspect-video overflow-hidden mt-12">
                <Image
                  src="/images/brands/hotone/ampero_ii_stage/function_08.jpg"
                  alt="レコーディング&ストリーミング"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed">
                  8x8 USBオーディオ機能と44.1kHz〜192kHz までの可変サンプリングレートを備えた Ampero II Stageは、あらゆるレコーディングおよびストリーミングにぴったりです。さらに、録音可能なBluetoothオーディオ入力（loop back）をサポートし、ストリーミングにも最適。 OTGケーブルでスマートフォンを接続すれば、バッキングトラックに合わせてオンラインストリーミングもお手の物です。
                </p>
              </div>
            </div>
          </div>

          {/* Feature List */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>24ビット信号プロセッシングにより最大127dBのダイナミックレンジを実現</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>スムーズで直感的なインタラクションを実現する新設計UI</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>ルーティング/トーンの可能性を実現するステレオI/OとステレオFXループ</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>最大12個エフェクトモジュールの同時プレイが可能</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>次世代の高品位アルゴリズムを含む460以上のエフェクト</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>20のクラシックCelestion® スピーカーIRを含む（Celestion® Digitalを搭載）</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Bluetooth® 4.2デュアルモードモジュールにより、iOS/Androidアプリ経由でオーディオ再生とリモートコントロール</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>ファームウェアのアップグレード、エフェクト/IRロード/編集/管理などのための無料の Win/Mac/Android/iOSソフトウェア</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>アコースティック用エフェクト＆プリセット</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>エレキギター/アコースティックギター/マイク/ライン入力をサポートする5つの異なる入力モード</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>マルチカラーHalo LED を備えた8つの割り当て可能なフットスイッチ</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>カスタマイズ可能なメイン表示モードとテーマカラー</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>ツアー仕様の軽量アルミニウムケース</span>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>大きく鮮明な５インチのダイナミック・タッチスクリーン</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>複数のシリアル/パラレル信号ルーティングをサポートする、高度なDUALエフェクトチェーン</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>R入力には、コンデンサーマイクの使用が可能なファンタム電源付きマイクプリアンプを内蔵</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>スタジオ録音データに基づいた、より正確なキャビネットマイクアルゴリズム</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>サードパーティIRサポートを備えた専用IRローダーモジュール、最大50個のカスタムIR スロット</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>トーン解像度を向上させる最大2048のIRサンプリングポイントをサポート</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Bluetooth® MIDIをサポート</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>44.1～192kHzのサンプルレート切り替えを備えた 8イン、8アウトUSBオーディオインターフェース。リアンプ機能もサポート</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>300プリセット（60バンク x 5パッチ）</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>独立した出力ボリューム制御または異なる信号出力のための独立した BAL/UNBAL/フォン出力処理</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>パッチ内に5つのシーンを提供するシーン機能 - エフェクトのオン/オフやパラメーターをレイテンシーなしで切り替えます</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>MIDI I/Oジャックと拡張コントロール用のデュアルEXP/CTRLジャック</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>9-18V DC電源に対応</span>
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
                src="/images/brands/hotone/ampero_ii_stage/control_01.png"
                alt="Control Top View"
                width={1200}
                height={800}
                className="w-full h-auto"
              />
            </div>

            {/* Back View */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/brands/hotone/ampero_ii_stage/control_02.png"
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
            {/* Connection 1 - アンプ入力に接続する */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">アンプ入力に接続する</h3>
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src="/images/brands/hotone/ampero_ii_stage/connection_01.gif"
                  alt="アンプ入力に接続する"
                  width={800}
                  height={400}
                  className="w-full h-auto"
                  unoptimized
                />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Ampero II Stageの出力をアンプの入力に接続します。必要に応じて、Ampero II StageのFXループで追加の外部コントローラーや他のエフェクトペダルを使用できます。ギターアンプに接続する場合は、キャビネットエミュレーションをオフにします
              </p>
            </div>

            {/* Connection 2 - アンプのFXループリターンまたはポストステージパワーアンプ */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">アンプのFXループリターンまたはポストステージパワーアンプ（HOTONEラウドスターなど）の入力に接続する。</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">アンプのFXループリターンへの接続</p>
                <div className="rounded-2xl overflow-hidden">
                  <Image
                    src="/images/brands/hotone/ampero_ii_stage/connection_02.gif"
                    alt="アンプのFXループリターンへの接続"
                    width={800}
                    height={400}
                    className="w-full h-auto"
                    unoptimized
                  />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">ポストステージパワーアンプへの接続</p>
                <div className="rounded-2xl overflow-hidden">
                  <Image
                    src="/images/brands/hotone/ampero_ii_stage/connection_03.gif"
                    alt="ポストステージパワーアンプへの接続"
                    width={800}
                    height={400}
                    className="w-full h-auto"
                    unoptimized
                  />
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                パワーアンプに接続すると、本物のアンプと同じようにAmpero II Stageのパラメーターを調整できます。ギターアンプのFXループリターンジャックに接続すると、Ampero II StageのPRE AMPモジュールをフルに楽しめます。
              </p>
            </div>

            {/* Connection 3 - ステージ上のデュアル出力 */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">ステージ上のデュアル出力</h3>
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src="/images/brands/hotone/ampero_ii_stage/connection_04.gif"
                  alt="ステージ上のデュアル出力"
                  width={800}
                  height={400}
                  className="w-full h-auto"
                  unoptimized
                />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Y-A/Bチェーン テンプレートの使用を推奨します。: チェーンA：キャビネットシミュレーション出力はXLR出力からミキサーに直接接続します。チェーンB：キャビネットシミュレーションを使用せず、モニタリング用にアンバランス出力経由でステージ楽器のアンプに接続します。この場合、楽器用アンプをマイキングして、チェーンA出力とミックスすることもできます。
              </p>
            </div>

            {/* Connection 4 - 楽器を演奏しながら歌うセッティング */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">楽器を演奏しながら歌うセッティング</h3>
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src="/images/brands/hotone/ampero_ii_stage/connection_05.gif"
                  alt="楽器を演奏しながら歌うセッティング"
                  width={800}
                  height={400}
                  className="w-full h-auto"
                  unoptimized
                />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                独立したエフェクトチェーンを使用します。：チェーンAは楽器信号のみを処理し、アンバランス出力を介して楽器アンプへ接続します。チェーンBはボーカル信号を処理し、XLR出力からミキサー/フルレンジスピーカーに接続します。
              </p>
            </div>

            {/* Connection 5 - ミキシングコンソール、オーディオインターフェイス、ヘッドフォンなどのフルレンジオーディオデバイスへの接続 */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">ミキシングコンソール、オーディオインターフェイス、ヘッドフォンなどのフルレンジオーディオデバイスへの接続</h3>
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src="/images/brands/hotone/ampero_ii_stage/connection_06.gif"
                  alt="ミキシングコンソール、オーディオインターフェイス、ヘッドフォンなどのフルレンジオーディオデバイスへの接続"
                  width={800}
                  height={400}
                  className="w-full h-auto"
                  unoptimized
                />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                自宅練習やライブ演奏など、ニーズに応じて理想の音色を思いのままに提供します。
              </p>
            </div>

            {/* Connection 6 - オーディオインターフェイスとしてデスクトップ/ラップトップへの接続 */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">オーディオインターフェイスとしてデスクトップ/ラップトップへの接続</h3>
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src="/images/brands/hotone/ampero_ii_stage/connection_07.gif"
                  alt="オーディオインターフェイスとしてデスクトップ/ラップトップへの接続"
                  width={800}
                  height={400}
                  className="w-full h-auto"
                  unoptimized
                />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                USBジャックからコンピューターに接続し、モニタースピーカー（パワード）に接続します。ソフトウェアとドライバーの設定を忘れないでください。これだけで、あなただけのミニ音楽スタジオが完成します。
              </p>
            </div>

            {/* Connection 7 - Aux Inジャック/Bluetoothオーディオを使った練習 */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Aux Inジャック/Bluetoothオーディオを使った練習</h3>
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src="/images/brands/hotone/ampero_ii_stage/connection_08.gif"
                  alt="Aux Inジャック/Bluetoothオーディオを使った練習"
                  width={800}
                  height={400}
                  className="w-full h-auto"
                  unoptimized
                />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Auxケーブルで音楽プレーヤーとAmpero II Stageを接続します。 Bluetooth接続でペアリングし、音楽を再生することもできます。その後、音楽ソースのバッキングや内蔵ドラム/ルーパーを音源にして、好きなだけ練習したり即興演奏が可能です。
              </p>
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
            {/* Intro Text */}
            <p className="text-gray-600 text-center mb-12">
              高機能なAmperoⅡStageのエディットをフルサポートできるソフトウェアを用意しました。ルーティング＆モジュール設定や各エフェクトのエディットを迅速にサポートしてくれます。メーカーサイトからダウンロードしていただけます。
            </p>

            {/* Downloads Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              {/* Firmware 1.4.1 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <button
                  onClick={() => toggleSoftware("fw141")}
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                      <Download className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <span className="font-semibold text-gray-900 block">AMPEROⅡSTAGE Firmware 1.4.1</span>
                      <span className="text-xs text-red-500 font-bold">New!</span>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.fw141 ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.fw141 && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                    <Image src="/images/brands/hotone/ampero_ii_stage/software_01.png" alt="Firmware" width={500} height={300} className="rounded-lg mb-6 w-full" />
                    
                    <p className="text-sm font-bold text-gray-800 mb-3">【 新機能 】</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex gap-3 text-sm text-gray-700">
                        <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                        <p>Tone CatchをSound Cloneテクノロジーにアップグレード。</p>
                      </div>
                      <div className="flex gap-3 text-sm text-gray-700">
                        <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                        <p>Sound Clone テクノロジーは NAM（Neural Amp Modeler）ファイルの変換と利用をサポートします。</p>
                      </div>
                      <div className="flex gap-3 text-sm text-gray-700">
                        <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                        <p>メイン ディスプレイの下に Bluetooth® オーディオ/コントロールスイッチが追加されました。</p>
                      </div>
                    </div>

                    <p className="text-sm font-bold text-gray-800 mb-3">【 改善、変更、バグ修正 】</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex gap-3 text-sm text-gray-700">
                        <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                        <p>Sound Cloneのデータ構造の最適化により、トーンファイルの保存容量が30に増加しました。</p>
                      </div>
                      <div className="flex gap-3 text-sm text-gray-700">
                        <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                        <p>その他のマイナーな改善とバグ修正。</p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">
                      Ampero II ファームウェアは、Hotone Web サイトからダウンロードして頂けます。現在のファームウェア バージョンが V1.3.3 未満の場合、最新の Ampero II V1.3.0 ソフトウェアを使用してファームウェア アップデートを実行してください。問題を回避するために、アップデートする前にパッチをバックアップしてください。
                    </p>

                    <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium">
                      <Download className="w-4 h-4" />ダウンロードはこちら
                    </a>
                  </div>
                )}
              </div>

              {/* Mobile Software 1.0.9 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <button
                  onClick={() => toggleSoftware("mobile109")}
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
                      <Download className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <span className="font-semibold text-gray-900 block">AMPEROⅡSTAGE Mobile Software 1.0.9</span>
                      <span className="text-xs text-red-500 font-bold">New!</span>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.mobile109 ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.mobile109 && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                    <p className="text-sm text-gray-700 mb-4">
                      Ampero II Stage モバイル・ソフトウェア・バージョン 1.0.9 がダウンロードできるようになりました。（2025年3月17日）※ 最新（V1.4.1）のAmpero II Stageファームウェアで使用することをお勧めします。
                    </p>
                    
                    <Image src="/images/brands/hotone/ampero_ii_stage/software_02.png" alt="Mobile Software" width={500} height={300} className="rounded-lg mb-6 w-full" />
                    
                    <p className="text-sm font-bold text-gray-800 mb-3">改善、変更、バグ修正</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex gap-3 text-sm text-gray-700">
                        <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                        <p>ファームウェア V1.4.1 のサポートを追加。</p>
                      </div>
                      <div className="flex gap-3 text-sm text-gray-700">
                        <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                        <p>NAM （Neural Amp Modeler）ファイルの変換とインポート機能を追加。</p>
                      </div>
                      <div className="flex gap-3 text-sm text-gray-700">
                        <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                        <p>その他の軽微なバグ修正</p>
                      </div>
                    </div>

                    <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium">
                      <Download className="w-4 h-4" />ダウンロードはこちら
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Firmware アップデート方法 & Firmware 1.2.1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <button onClick={() => toggleSoftware("fwUpdate")} className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center"><span className="text-white text-lg font-bold">?</span></div>
                    <span className="font-semibold text-gray-900">Firmware アップデート方法</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.fwUpdate ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.fwUpdate && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                    <Image src="/images/brands/hotone/ampero_ii_stage/software_03.png" alt="Firmware Update" width={600} height={200} className="rounded-lg mb-6 w-full" />
                    <div className="space-y-3 text-sm text-gray-700">
                      <div className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                        <p>USB接続を維持したままユニットの電源をオフにします。</p>
                      </div>
                      <div className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                        <p>「MODE」、6、7のフットスイッチを同時に押したまま電源を入れます。</p>
                      </div>
                      <div className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                        <p>Ampero II エディター ソフトウェアを起動し、「Firmware Update」ボタンをクリックし、予めダウンロードしたファームウェアファイル（Ampero II Stage Firmware V.......bin *解凍しない状態）を選択し、「Update now」をクリックします。</p>
                      </div>
                      <div className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                        <p>ファームウェアのアップデートが完了したら再起動をしてください。これで完了です。</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <button onClick={() => toggleSoftware("fw121")} className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center"><Download className="w-5 h-5 text-white" /></div>
                    <span className="font-semibold text-gray-900">AMPEROⅡSTAGE Firmware 1.2.1</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.fw121 ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.fw121 && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                    <p className="text-sm text-gray-700 mb-4">
                      Ampero II Stage ファームウェア・バージョン 1.2.1 がダウンロードできるようになりました。（2024年11月7日）最新の Ampero II および Ampero II Stage ファームウェアとソフトウェア アップデートで、新たなクリエイティブの可能性を解き放ち、強力な新しいトーン キャッチ機能とパフォーマンスの強化を実現します。
                    </p>
                    
                    <Image src="/images/brands/hotone/ampero_ii_stage/software_04.png" alt="Firmware 1.2.1" width={500} height={300} className="rounded-lg mb-6 w-full" />
                    
                    <p className="text-sm font-bold text-gray-800 mb-2">新機能</p>
                    <p className="text-sm text-gray-700 mb-4">
                      Tone Catch（Global {">"} Tone Catch）機能の追加 - お気に入りのトーンをキャプチャーして保存し、新しい CATCH モジュールで適用できるようになりました。
                    </p>

                    <p className="text-sm font-bold text-gray-800 mb-3">改善、変更、バグ修正</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex gap-3 text-sm text-gray-700">
                        <span className="flex-shrink-0 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                        <p>CAB モジュールの遅延を大幅に最適化</p>
                      </div>
                      <div className="flex gap-3 text-sm text-gray-700">
                        <span className="flex-shrink-0 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                        <p>IRモジュールのシステムリソース使用率を削減</p>
                      </div>
                      <div className="flex gap-3 text-sm text-gray-700">
                        <span className="flex-shrink-0 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                        <p>高解像度オプションの追加によりフリーズ効果を最適化しました。</p>
                      </div>
                      <div className="flex gap-3 text-sm text-gray-700">
                        <span className="flex-shrink-0 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                        <p>安定性を高めるためにすべてのノイズゲートエフェクトを最適化しました。</p>
                      </div>
                      <div className="flex gap-3 text-sm text-gray-700">
                        <span className="flex-shrink-0 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
                        <p>その他の小さな改善とバグ修正</p>
                      </div>
                    </div>

                    <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium">
                      <Download className="w-4 h-4" />ダウンロードはこちら
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Firmware 1.1.0 & Mobile Software 1.0.3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <button onClick={() => toggleSoftware("fw110")} className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center"><Download className="w-5 h-5 text-white" /></div>
                    <span className="font-semibold text-gray-900">AMPEROⅡSTAGE Firmware 1.1.0</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.fw110 ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.fw110 && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                    <p className="text-sm text-gray-700 mb-4">
                      Ampero II Stage ファームウェア・バージョン 1.1.0 がダウンロードできるようになりました。（2024年6月20日）最新のファームウェアとソフトウェアのアップデートで、Ampero II Stage エクスペリエンスを強化しましょう！　Hotone Web サイトから最新のファームウェアとソフトウェア バージョンを入手してお試しください。
                    </p>
                    
                    <Image src="/images/brands/hotone/ampero_ii_stage/software_05.jpg" alt="Firmware 1.1.0" width={500} height={300} className="rounded-lg mb-6 w-full" />
                    
                    <p className="text-sm font-bold text-gray-800 mb-3">新しいエフェクト</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex gap-3 text-sm text-gray-700">
                        <span className="flex-shrink-0 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                        <p>MOD - Freeze：モジュールに追加された新しいエフェクト。サウンドフリーズ/無限サステインエフェクト。</p>
                      </div>
                    </div>

                    <p className="text-sm font-bold text-gray-800 mb-3">新機能</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex gap-3 text-sm text-gray-700">
                        <span className="flex-shrink-0 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                        <p>フットスイッチ使用時のMIDI出力機能を追加</p>
                      </div>
                      <div className="flex gap-3 text-sm text-gray-700">
                        <span className="flex-shrink-0 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                        <p>グローバルテンポ機能を追加（グローバル→コントロール）</p>
                      </div>
                      <div className="flex gap-3 text-sm text-gray-700">
                        <span className="flex-shrink-0 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                        <p>シーンネーミング機能を追加</p>
                      </div>
                      <div className="flex gap-3 text-sm text-gray-700">
                        <span className="flex-shrink-0 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                        <p>参照しやすいようにシーン 1 パラメーター値を強調表示</p>
                      </div>
                    </div>

                    <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium">
                      <Download className="w-4 h-4" />ダウンロードはこちら
                    </a>
                  </div>
                )}
              </div>
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <button onClick={() => toggleSoftware("mobile103")} className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center"><Download className="w-5 h-5 text-white" /></div>
                    <span className="font-semibold text-gray-900">AMPEROⅡSTAGE Mobile Software 1.0.3</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.mobile103 ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.mobile103 && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                    <p className="text-sm text-gray-700 mb-4">
                      Ampero II Stage モバイル・ソフトウェア・バージョン 1.0.2 がダウンロードできるようになりました。（2024年2月1日）※ 最新（V1.1.0）のAmpero II Stageファームウェアで使用することをお勧めします。
                    </p>
                    
                    <Image src="/images/brands/hotone/ampero_ii_stage/software_05.jpg" alt="Mobile Software 1.0.3" width={500} height={300} className="rounded-lg mb-6 w-full" />
                    
                    <p className="text-sm font-bold text-gray-800 mb-3">改善、変更、バグ修正</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex gap-3 text-sm text-gray-700">
                        <span className="flex-shrink-0 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                        <p>ファームウェア V1.1.0 のサポートが追加されました。</p>
                      </div>
                      <div className="flex gap-3 text-sm text-gray-700">
                        <span className="flex-shrink-0 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                        <p>その他の軽微なバグ修正</p>
                      </div>
                    </div>

                    <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium">
                      <Download className="w-4 h-4" />ダウンロードはこちら
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Firmware 1.0.4 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <button onClick={() => toggleSoftware("fw104")} className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-rose-600 rounded-xl flex items-center justify-center"><Download className="w-5 h-5 text-white" /></div>
                    <span className="font-semibold text-gray-900">AMPEROⅡSTAGE Firmware 1.0.4</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.fw104 ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.fw104 && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                    <p className="text-sm text-gray-700 mb-4">
                      Ampero II Stage ファームウェア・バージョン 1.0.4 がダウンロードできるようになりました。（2024年2月1日）
                    </p>
                    
                    <Image src="/images/brands/hotone/ampero_ii_stage/software_07.jpg" alt="Firmware 1.0.4" width={500} height={300} className="rounded-lg mb-6 w-full" />
                    
                    <p className="text-sm font-bold text-gray-800 mb-3">新しいエフェクト</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex gap-3 text-sm text-gray-700">
                        <span className="flex-shrink-0 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                        <div>
                          <p>２つのボーカルエフェクトモデルが FREQモジュールに追加されました。</p>
                          <p className="text-gray-500 ml-4">（1）ピッチ補正 – ボーカルの自動ピッチ補正効果</p>
                          <p className="text-gray-500 ml-4">（2）AT-Tune – 自動ボーカルピッチ補正/シフトエフェクト</p>
                        </div>
                      </div>
                      <div className="flex gap-3 text-sm text-gray-700">
                        <span className="flex-shrink-0 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                        <div>
                          <p>AMP/PRE AMP モジュールに 3つの新しいアンプ/プリアンプ モデルが追加されました。</p>
                          <p className="text-gray-500 ml-4">Petrus Clean/Crunch/Lead HQ – Mesa/Boogie® JP-2C™* アンプヘッドをベース</p>
                        </div>
                      </div>
                      <div className="flex gap-3 text-sm text-gray-700">
                        <span className="flex-shrink-0 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                        <div>
                          <p>新しいドライブモデルが DRVモジュールに追加されました。</p>
                          <p className="text-gray-500 ml-4">Noble Drive – Nobels® ODR-1* オーバードライブ ペダルをベースにしています。</p>
                        </div>
                      </div>
                      <div className="flex gap-3 text-sm text-gray-700">
                        <span className="flex-shrink-0 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                        <div>
                          <p>新しいリバーブモデルが RVBモジュールに追加されました。</p>
                          <p className="text-gray-500 ml-4">Silver Linings – 巨大で豊かなリバーブトーンを生み出す特別なリバーブ</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm font-bold text-gray-800 mb-3">新機能</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex gap-3 text-sm text-gray-700">
                        <span className="flex-shrink-0 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                        <p>Cab機能の追加なし（Global {">"} I/O）</p>
                      </div>
                      <div className="flex gap-3 text-sm text-gray-700">
                        <span className="flex-shrink-0 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                        <p>パッチフットスイッチ機能の設定を追加（Global {">"} Controls）</p>
                      </div>
                      <div className="flex gap-3 text-sm text-gray-700">
                        <span className="flex-shrink-0 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                        <p>48Vファントム電源のオン/オフステータス表示を追加</p>
                      </div>
                    </div>

                    <p className="text-sm font-bold text-gray-800 mb-3">アップデートの内容</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex gap-3 text-sm text-gray-700">
                        <span className="flex-shrink-0 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                        <p>ルーパーにフレーズを録音する際にドラムと自動で同期する機能を最適化しました。</p>
                      </div>
                      <div className="flex gap-3 text-sm text-gray-700">
                        <span className="flex-shrink-0 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                        <p>その他の軽微な改善とバグ修正</p>
                      </div>
                    </div>

                    <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium">
                      <Download className="w-4 h-4" />ダウンロードはこちら
                    </a>
                  </div>
                )}
              </div>
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <button onClick={() => toggleSoftware("sw101")} className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center"><Download className="w-5 h-5 text-white" /></div>
                    <div className="text-left"><span className="font-semibold text-gray-900 block">AMPEROⅡSTAGE Software 1.0.1</span><span className="text-xs text-red-500 font-bold">New!</span></div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.sw101 ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.sw101 && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                    <p className="text-sm text-gray-700 mb-4">
                      Ampero II Stage ソフトウェア・バージョン 1.0.1 がダウンロードできるようになりました。（2024年2月1日）
                    </p>
                    
                    <Image src="/images/brands/hotone/ampero_ii_stage/software_08.jpg" alt="Software 1.0.1" width={500} height={300} className="rounded-lg mb-6 w-full" />
                    
                    <div className="space-y-3 mb-4 text-sm text-gray-700">
                      <p>Firmware 1.0.4に対応</p>
                      <p>IR ファイルのインポート時にビット深度/サンプルレートを自動変換する機能が追加されました</p>
                      <p>その他、マイナーバグの改善</p>
                    </div>

                    <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium">
                      <Download className="w-4 h-4" />ダウンロードはこちら
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Software 1.0.2 & Firmware 1.0.3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <button onClick={() => toggleSoftware("mobile102")} className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-xl flex items-center justify-center"><Download className="w-5 h-5 text-white" /></div>
                    <span className="font-semibold text-gray-900">AMPEROⅡSTAGE Mobile Software 1.0.2</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.mobile102 ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.mobile102 && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                    <p className="text-sm text-gray-700 mb-4">
                      Ampero II Stage モバイル・ソフトウェア・バージョン 1.0.2 がダウンロードできるようになりました。（2024年2月1日）
                    </p>
                    
                    <Image src="/images/brands/hotone/ampero_ii_stage/software_08.jpg" alt="Mobile Software 1.0.2" width={500} height={300} className="rounded-lg mb-6 w-full" />
                    
                    <div className="space-y-3 mb-6 text-sm text-gray-700">
                      <p>Firmware 1.0.4に対応</p>
                      <p>ドラムマシンコントロール用のドラムメニューが追加されました</p>
                      <p>その他、マイナーバグの改善</p>
                    </div>

                    <div className="flex flex-col gap-3">
                      <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium w-fit">
                        <Download className="w-4 h-4" />Android版のダウンロードはこちら
                      </a>
                      <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium w-fit">
                        <Download className="w-4 h-4" />iOS版のダウンロードはこちら（App store）
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <button onClick={() => toggleSoftware("fw103")} className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl flex items-center justify-center"><Download className="w-5 h-5 text-white" /></div>
                    <span className="font-semibold text-gray-900">AMPEROⅡSTAGE Firmware 1.0.3</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.fw103 ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.fw103 && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                    <p className="text-sm text-gray-700 mb-4">
                      Ampero II Stage ファームウェア・バージョン 1.0.3 がダウンロードできるようになりました。（2023年12月29日）
                    </p>
                    
                    <Image src="/images/brands/hotone/ampero_ii_stage/software_11.jpg" alt="Firmware 1.0.3" width={500} height={300} className="rounded-lg mb-6 w-full" />
                    
                    <div className="space-y-3 mb-4 text-sm text-gray-700">
                      <p className="font-bold">Ampero II Stageファームウェアのリリースノート</p>
                      <p>Version 1.0.3　Released 12/29/2023</p>
                      <p className="font-bold">改善、変更、バグ修正を完了しました。</p>
                      <p>Ampero II Stage と PC ソフトウェア間の通信を最適化その他のマイナーな改善とバグ修正を完了しました。</p>
                    </div>

                    <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium">
                      <Download className="w-4 h-4" />ダウンロードはこちら
                    </a>
                  </div>
                )}
              </div>
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <button onClick={() => toggleSoftware("sw100")} className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-600 rounded-xl flex items-center justify-center"><Download className="w-5 h-5 text-white" /></div>
                    <span className="font-semibold text-gray-900">AMPEROⅡSTAGE Software 1.0.0</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.sw100 ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.sw100 && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                    <p className="text-sm text-gray-700 mb-4">
                      Ampero II Stage ソフトウェア・バージョン 1.0.0 がダウンロードできるようになりました。（2024年1月2日）
                    </p>
                    
                    <Image src="/images/brands/hotone/ampero_ii_stage/software_11.jpg" alt="Software 1.0.0" width={500} height={300} className="rounded-lg mb-6 w-full" />
                    
                    <div className="space-y-3 mb-4 text-sm text-gray-700">
                      <p className="font-bold">Ampero II Stageソフトウェアのリリースノート</p>
                      <p>Version 1.0.0　Released 1/2/2024</p>
                      <p className="font-bold">改善、変更、バグ修正を完了しました。</p>
                      <p>Ampero II Stage と PC ソフトウェア間の通信を最適化その他のマイナーな改善とバグ修正を完了しました。</p>
                    </div>

                    <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium">
                      <Download className="w-4 h-4" />ダウンロードはこちら
                    </a>
                  </div>
                )}
              </div>
              {/* ASIO Driver */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <button onClick={() => toggleSoftware("asio")} className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center"><Download className="w-5 h-5 text-white" /></div>
                    <div className="text-left"><span className="font-semibold text-gray-900 block">ASIO ドライバー</span><span className="text-xs text-red-500 font-bold">New!</span></div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.asio ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.asio && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                    <p className="text-sm text-gray-700 mb-4">USB ASIO DRIVER が V.5.71.1に更新されました。</p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-lg">🔧</span>
                      <span className="text-sm font-bold text-gray-800">HOTONE USB ASIO Driver Version 5.71.1</span>
                      <span className="text-red-500 text-sm font-bold">- New! -</span>
                    </div>

                    <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium mb-6">
                      <span>⊕</span> ここからUSB ASIO Driver V5.71.1をダウンロードしてください。
                    </a>

                    <hr className="my-6 border-gray-300" />

                    <h4 className="font-bold text-gray-800 mb-2">Hotone USB ASIO Driver の使用方法</h4>
                    <h5 className="font-bold text-gray-700 mb-4">インストールと設定の手順</h5>
                    
                    <div className="space-y-6 text-sm text-gray-700">
                      <div className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                        <p>Hotone製品の電源を入れ、コンピューターに接続します。その後、Hotone USB ASIO Driverをインストールします。</p>
                      </div>
                      <div className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                        <p>使用されるDAWを起動して、&quot;Devices&quot; – &quot;Device Setup&quot;をクリックします。（Cubase 8 Element versionを例に説明します。）</p>
                      </div>
                      <Image src="/images/brands/hotone/ampero_ii_stage/software_13.png" alt="Setup 1" width={500} height={300} className="rounded-lg w-full" />
                      
                      <div className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                        <p>&quot;Device Setup&quot; ウィンドウの&quot;VST Audio&quot;を選択します。</p>
                      </div>
                      <Image src="/images/brands/hotone/ampero_ii_stage/software_14.png" alt="Setup 2" width={500} height={400} className="rounded-lg w-full" />
                      
                      <div className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                        <p>ASIO Driverのドロップダウンメニューから&quot;HOTONE AUDIO USB Audio Device&quot;を見つけて、&quot;OK&quot;をクリックします。</p>
                      </div>
                      <Image src="/images/brands/hotone/ampero_ii_stage/software_15.png" alt="Setup 3" width={500} height={400} className="rounded-lg w-full" />
                      
                      <div className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
                        <p>これで完了です。</p>
                      </div>
                    </div>

                    <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium mt-6">
                      <span>⊕</span> ここからUSB ASIO Driver V5.71.1をダウンロードしてください。
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Editor Downloads */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <button onClick={() => toggleSoftware("editorMac")} className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-zinc-400 to-zinc-600 rounded-xl flex items-center justify-center"><Download className="w-5 h-5 text-white" /></div>
                    <span className="font-semibold text-gray-900">AMPEROⅡSTAGE EDITOR v1.0.0 for macOS</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.editorMac ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.editorMac && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                    <p className="text-sm text-gray-700 mb-4">HOTONE メーカーサイトより直接ダウンロードが開始されます。</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="text-green-500">✓</span>
                        <p>AMPERO II STAGE Firmware 1.0.3 に対応</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="text-green-500">✓</span>
                        <p>macOS版</p>
                      </div>
                    </div>
                    <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium">
                      <Download className="w-4 h-4" />ダウンロードはこちら（.zip）
                    </a>
                  </div>
                )}
              </div>
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <button onClick={() => toggleSoftware("editorWin")} className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-sky-600 rounded-xl flex items-center justify-center"><Download className="w-5 h-5 text-white" /></div>
                    <span className="font-semibold text-gray-900">AMPEROⅡSTAGE EDITOR v1.0.0 for Windows</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.editorWin ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.editorWin && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                    <p className="text-sm text-gray-700 mb-4">HOTONE メーカーサイトより直接ダウンロードが開始されます。</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="text-green-500">✓</span>
                        <p>AMPERO II STAGE Firmware 1.0.3 に対応</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="text-green-500">✓</span>
                        <p>Windows版</p>
                      </div>
                    </div>
                    <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium">
                      <Download className="w-4 h-4" />ダウンロードはこちら（.zip）
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* App Downloads */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <button onClick={() => toggleSoftware("appIos")} className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl flex items-center justify-center"><Download className="w-5 h-5 text-white" /></div>
                    <span className="font-semibold text-gray-900">AMPEROⅡSTAGE APP for iOS</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.appIos ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.appIos && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                    <p className="text-sm text-gray-700 mb-4">HOTONE メーカーサイトより直接ダウンロードが開始されます。</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="text-green-500">✓</span>
                        <p>iOS版</p>
                      </div>
                    </div>
                    <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium">
                      <Download className="w-4 h-4" />ダウンロードはこちら（App store）
                    </a>
                  </div>
                )}
              </div>
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <button onClick={() => toggleSoftware("appAndroid")} className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-lime-400 to-lime-600 rounded-xl flex items-center justify-center"><Download className="w-5 h-5 text-white" /></div>
                    <span className="font-semibold text-gray-900">AMPEROⅡSTAGE APP for Android</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.appAndroid ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.appAndroid && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                    <p className="text-sm text-gray-700 mb-4">HOTONE メーカーサイトより直接ダウンロードが開始されます。</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="text-green-500">✓</span>
                        <p>Android版</p>
                      </div>
                    </div>
                    <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium">
                      <Download className="w-4 h-4" />ダウンロードはこちら（.zip）
                    </a>
                  </div>
                )}
              </div>
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
                    <p>1 x 1/8&quot;TRS) MIDI OUTジャック</p>
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
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* デジタル・セクション */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">デジタル・セクション</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>5インチ 800 x 480カラーダイナミックタッチスクリーン</p>
                    <p>USB 2.0 Type-C port：USB Audio 2.0　44.1〜192kHzサンプルレート切り替え可能</p>
                    <p>IR プロセッシング：24-bit/44.1kHz モノWAVファイル、両1024＆2048ポイントをサポート、50 user IR</p>
                    <p>エフェクト・デジタル・オーディオ・シグナルプロセッシング：24-bit / 44.1kHz</p>
                    <p>周波数特性：20Hz – 20kHz ± 1dB</p>
                    <p>ダイナミックレンジ：最大127dB（digital to analog）</p>
                    <p>エフェクト：460+（global EQも含む）</p>
                    <p>エフェクト・モジュール：16</p>
                    <p>エフェクト・スロット：12同時使用可能エフェクト・スロット</p>
                    <p>パッチ数：300</p>
                    <p>ルーパータイム：ステレオ60秒</p>
                    <p>Bluetooth®：4.2 Dual-Mode（BLE & audio）w/Bluetooth® MIDI</p>
                    <p className="flex items-center gap-2">TELEC 認証：R220-JP6890 <span className="inline-flex items-center border border-gray-400 rounded px-2 py-0.5 text-xs">📡 R220-JP6890</span></p>
                  </div>
                </div>

                {/* その他 */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">その他</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>電源：9VDC – 18VDC センターマイナス</p>
                    <p>消費電力：最大1.4A（9VDC給電時）</p>
                    <p>サイズ：301mm（W）x 180mm（D）x 58mm（H）</p>
                    <p>重量：1895g</p>
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

