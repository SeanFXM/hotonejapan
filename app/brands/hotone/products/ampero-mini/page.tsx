"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Download, ChevronDown } from 'lucide-react'
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

export default function AmperoMiniPage() {
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
    downloadManual("hotone", "ampero-mini")
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
          src="/images/brands/hotone/ampero_mini/hero.jpg"
          alt="AMPERO Mini"
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
                <p className="text-2xl font-bold text-gray-900">AMPERO Mini</p>
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
                  ¥36,630 <span className="text-sm font-normal text-gray-500">前後（税込）</span>
                </p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">6959473905159</p>
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
              機動力とパワーを備えた
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              即戦力の超小型ストンプボックス
            </h3>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Image and Related Info */}
            <div className="space-y-6">
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src="/images/brands/hotone/ampero_mini/intro.jpg"
                  alt="AMPERO Mini"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>

              {/* Related Info */}
              <div className="space-y-3">
                <h4 className="font-bold text-gray-900 border-b border-gray-300 pb-2">関連情報</h4>
                <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors">
                  <span className="text-red-500">📄</span>
                  AMPERO Mini カラーバージョン、数量限定セール開催中！
                </a>
                <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors">
                  <span className="text-purple-600">📄</span>
                  AMPERO シリーズの性能比較表
                </a>
              </div>
            </div>

            {/* Right Column - Description */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-gray-900">AmperoシリーズのDNAを継承した、妥協のないマルチコンパクト</h4>
              
              <div className="prose prose-lg max-w-none space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Amperoファミリー中、最もコンパクトなAmpero Miniの登場です！<br />
                  エッセンシャルなI/Oに絞り込み、小型で頑丈なアルミケースにいっさい妥協のないAmperoサウンドを凝縮しました。直感的に使えるタッチスクリーンとUIは、マニュアルなしでもわかりやすく、スムーズに操作が可能です。優れたIRセクションとエフェクトはまさに即戦力。
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Ampero Miniは、Amperoの多彩で高音質なトーンを体験したいプレイヤー、コンパクトさとプロのトーンを兼ね備えたエフェクターを求めるセッションミュージシャン、さらに経験豊富なアンプモデラー・プレイヤーにとっても、優れたパフォーマンスを提供してくれます。
                </p>
              </div>

              {/* Features Title */}
              <h4 className="text-lg font-bold text-gray-900">パワフルなデュアルコアDSPプラットフォームにより、Ampero品質のトーンを実現</h4>

              {/* Features List */}
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-gray-700">超コンパクト仕様のアンプモデラー＆エフェクトプロセッサー</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-gray-700">CDCM＆F.I.R.E.モデリングシステムにより、ハイエンドの表現力とリアルな演奏体験</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-gray-700">CDCM HD＆F.I.R.E.テクノロジーのリアルなアンプ、キャビネット、伝説のペダルモデルを含む</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-gray-700">Hotoneオリジナルのエフェクト（ドライブ/ダイナミック/フィルター/モジュレーション/ディレイ/リバーブモデルなど）を満載</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-gray-700">同時に最大9つまで使えるエフェクト</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-gray-700">24ビットの信号処理、112dBのS/N比</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-gray-700">マイクポジションとマイクタイプのシミュレーション</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-gray-700">サードパーティのIRに対応、ユーザーカスタマイズが可能なIRローダー</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-gray-700">エレクトリックとアコースティック両方に対応した特別設計のインプット</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-gray-700">198プリセット</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-gray-700">内蔵のドラムマシン（100パターン）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-gray-700">モノラルで最大100秒の録音時間の内蔵ルーパー</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-gray-700">リアルなステレオ出力処理</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-gray-700">外部コントローラージャックで外部フットスイッチ/ペダルの接続が可能</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-gray-700">メインディスプレイモード、テーマカラー、UI言語のカスタマイズが可能</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-gray-700">耐久性に優れた軽量アルミケース</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-gray-700">9V DC電源</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Concept Section */}
      <section id="concept" className="py-20 scroll-mt-24 bg-concept-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-20">
            {/* Concept 1 - 小さくてもスマートに */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="rounded-xl overflow-hidden">
                <Image
                  src="/images/brands/hotone/ampero_mini/concept_01.jpg"
                  alt="AMPERO Mini"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
              <div className="text-gray-300 space-y-6">
                <h3 className="text-2xl font-bold text-white">小さくてもスマートに、無限に描くサウンドが思いのまま。</h3>
                <p className="leading-relaxed">
                  どこへでも持ち運べるミニサイズと、強力なCDCM HD+F.I.R.E.モデリング技術による、最高のコンビネーションで作り上げられた秀作です。完璧なまでのAmpero体験を叶える、最小のマルチストンプがこのAmpero Miniです。
                </p>

                <div className="pt-4">
                  <h4 className="text-lg font-bold text-white mb-4">CDCM HD ＋ F.I.R.E（Field Impulse Response Enhancement）</h4>
                  <div className="mb-6">
                    <Image
                      src="/images/brands/hotone/ampero_mini/icon_1.svg"
                      alt="CDCM HD + F.I.R.E"
                      width={300}
                      height={60}
                      className="h-12 w-auto"
                    />
                  </div>
                  <p className="leading-relaxed mb-4">
                    これまで、「サウンドが鈍い」「味気ない」「リアルさに欠ける」・・・と一般的に言われ続けてきたデジタルマルチのサウンド。我々は、本物のアンプから感じるような生々しくリアルな音ができないものかと、開発に情熱を燃やし続けて来ました。十年以上に渡るリサーチやテストを繰り返し、ホワイトボックスモデリングやブラックボックスモデリングとは異なる、独自のCDCM HD + F.I.R.Eモデリングにたどり着きました。
                  </p>
                  <p className="leading-relaxed">
                    オリジナルデバイスのパーツの音、入力信号の変化に追従するサウンドのダイナミックバリエーションを忠実に再現し、リアルトーンのフィーリングを再現することに成功しました。このサウンドを体験した世界中のプロミュージシャンからも、ライブ演奏がこの上なくリアルになると高く評価されています。
                  </p>
                </div>
              </div>
            </div>

            {/* Concept 2 - 強力なデュアルDSPを搭載 */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">強力なデュアルDSPを搭載</h3>
              <p className="text-gray-300 leading-relaxed">
                Ampero Miniは、デュアルコアのデジタル信号処理プラットフォームを搭載。通常のAmperoシグネチャーサウンドを、このサイズで実現しました。
              </p>
              <div className="space-y-4 text-gray-300">
                <div className="flex gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <p><span className="font-bold text-white">メインプロセッサー：</span>オーディオエンジン専用に高性能なNXP® RTクロスオーバープロセッサーを搭載しました。この高速クロックスピードのプロセッサーは、これまでのAmperoで使用されてきたAnalog Devices® SHARC® DSPと比較しても非常に優れており、複数の高品位なエフェクトアルゴリズムを同レベルで処理することが可能です。</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <p><span className="font-bold text-white">コプロセッサー：</span>Ampero Miniは、メインプロセッサーが高いレベルのオーディオプロセッシングのみを担当できるように、NXP® RTコプロセッサーを搭載しています。このコプロセッサーは、オーディオストリームの処理だけでなく、タッチスクリーンディスプレイ、USB、I/O、その他の機能の司令塔です。</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700" />

            {/* Concept 3 - 充実のAmperoトーン */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">充実のAmperoトーン</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <p>199エフェクト - 100以上のアンプ/キャビネット/伝説のペダルアルゴリズムを多数搭載</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <p>次世代&quot;マイクポジション&quot;と&quot;マイクタイプ&quot;のシミュレーションを追加</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <p>優れたHotoneオリジナルエフェクトも満載 - 高音質なドライブ/ダイナミック/フィルター/モジュレーション/ディレイ/リバーブモデル等</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <p>ユーザーIRローダー＆サードパーティIRもサポート可能</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700" />

            {/* Concept 4 - さらに、本物のアコースティックサウンド */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">さらに、本物のアコースティックサウンド</h3>
              <p className="text-gray-300 leading-relaxed">
                もうアコースティックギターを持ち歩く必要はありません。Ampero Miniには高度なアコースティックシミュレーションのアルゴリズムが搭載されています。アコースティックシミュレーションプリセットを使用すれば、エレクトリックギターがマイク録りしたような優れたアコースティックサウンドに早変わり。スチールストリング、ナイロンストリングなど、さまざまなタイプのアコースティックサウンドがプレイできます。
              </p>
            </div>

            <div className="border-t border-gray-700" />

            {/* Concept 5 - オーディオインターフェースとして */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="rounded-xl overflow-hidden">
                <Image
                  src="/images/brands/hotone/ampero_mini/concept_02.jpg"
                  alt="AMPERO Mini Audio Interface"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
              <div className="text-gray-300 space-y-4">
                <h3 className="text-2xl font-bold text-white">オーディオインターフェースとして</h3>
                <p className="leading-relaxed">Windowsとmac両OSに対応しています。</p>
                <p className="leading-relaxed">さらに、スマートフォンを使ったモバイル録音も可能です。</p>
              </div>
            </div>

            {/* Concept 6 - なめらかさを増したタッチスクリーン */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">なめらかさを増したタッチスクリーン</h3>
                <p className="text-gray-300 leading-relaxed">
                  新たにスクリーン上に搭載された&quot;+/-&quot; ボタンが、思いのままにサウンドツゥイークを可能にします。
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="rounded-xl overflow-hidden mb-3">
                    <Image
                      src="/images/brands/hotone/ampero_mini/concept_03.gif"
                      alt="スライド操作"
                      width={400}
                      height={300}
                      className="w-full h-auto"
                      unoptimized
                    />
                  </div>
                  <p className="text-gray-300 text-sm">スライド操作</p>
                </div>
                <div className="text-center">
                  <div className="rounded-xl overflow-hidden mb-3">
                    <Image
                      src="/images/brands/hotone/ampero_mini/concept_04.gif"
                      alt="+/- ボタン操作"
                      width={400}
                      height={300}
                      className="w-full h-auto"
                      unoptimized
                    />
                  </div>
                  <p className="text-gray-300 text-sm">+/- ボタン操作</p>
                </div>
                <div className="text-center">
                  <div className="rounded-xl overflow-hidden mb-3">
                    <Image
                      src="/images/brands/hotone/ampero_mini/concept_05.gif"
                      alt="GLOBAL カラー設定"
                      width={400}
                      height={300}
                      className="w-full h-auto"
                      unoptimized
                    />
                  </div>
                  <p className="text-gray-300 text-sm">GLOBAL カラー設定</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Movie Section */}
      <section id="demo" className="py-20 scroll-mt-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">デモムービー</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/-0OzhPiwEkM"
                title="AMPERO Mini Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 scroll-mt-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">主な機能</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* 01 - USB-Cポート */}
            <div className="bg-gray-100 rounded-2xl overflow-hidden">
              <div className="flex items-start justify-between p-4 pb-0">
                <h3 className="text-lg font-bold text-gray-900">USB-Cポート</h3>
                <span className="text-4xl font-bold text-gray-300">01</span>
              </div>
              <div className="p-4">
                <Image
                  src="/images/brands/hotone/ampero_mini/function_01.jpg"
                  alt="USB-Cポート"
                  width={500}
                  height={300}
                  className="w-full h-auto rounded-lg mb-4"
                />
                <p className="text-sm text-gray-700">
                  ファームウェアアップグレード、無料のMac/PCソフトウェアを介してエフェクト/IRのロード/編集/管理、またはUSBオーディオインターフェースとしての使用を可能にするUSB-Cポートを搭載。
                </p>
              </div>
            </div>

            {/* 02 - 50秒録音できるステレオルーパー */}
            <div className="bg-gray-100 rounded-2xl overflow-hidden">
              <div className="flex items-start justify-between p-4 pb-0">
                <h3 className="text-lg font-bold text-gray-900">50秒録音できるステレオルーパー</h3>
                <span className="text-4xl font-bold text-gray-300">02</span>
              </div>
              <div className="p-4">
                <Image
                  src="/images/brands/hotone/ampero_mini/function_02.gif"
                  alt="ルーパー機能"
                  width={500}
                  height={300}
                  className="w-full h-auto rounded-lg mb-4"
                  unoptimized
                />
                <p className="text-sm text-gray-700">
                  ルーパー機能を備え、最長50秒間のステレオレコーディングが可能です。1/2 speed、reverse、record/playといった追加機能も備えています。
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Feature List */}
          <div className="max-w-6xl mx-auto bg-gray-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">超コンパクト仕様のアンプモデラー＆エフェクトプロセッサー</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">パワフルなデュアルコアDSPプラットフォームにより、Ampero品質のトーンを実現</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">CDCM＆F.I.R.E.モデリングシステムにより、ハイエンドの表現力とリアルな演奏体験</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">24ビットの信号処理、112dBのS/N比</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">直感的に使えるタッチスクリーンとシンプルなUI</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">編集可能なエフェクトチェーン</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">同時に最大9つまで使えるエフェクト</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">マイクポジションとマイクタイプのシミュレーション</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">サードパーティのIRに対応、ユーザーカスタマイズが可能なIRローダー</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">198プリセット</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">Amperoスタイルのアコースティックエフェクト＆パッチ</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">内蔵のドラムマシン（100パターン）</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">モノラルで最大100秒の録音時間の内蔵ルーパー</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">リアルなステレオ出力処理</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">外部コントローラージャックで外部フットスイッチ/ペダルの接続が可能</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">メインディスプレイモード、テーマカラー、UI言語のカスタマイズが可能</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">耐久性に優れた軽量アルミケース</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">9V DC電源</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Controls Section */}
      <section id="controls" className="py-20 scroll-mt-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">コントロール</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {/* Front View */}
            <div className="flex justify-center">
              <Image
                src="/images/brands/hotone/ampero_mini/control_01.png"
                alt="AMPERO Mini Front View"
                width={800}
                height={500}
                className="w-full h-auto max-w-2xl"
              />
            </div>

            <div className="border-t border-gray-300" />

            {/* Back View */}
            <div className="flex justify-center">
              <Image
                src="/images/brands/hotone/ampero_mini/control_02.png"
                alt="AMPERO Mini Back View"
                width={800}
                height={300}
                className="w-full h-auto max-w-3xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Connections Section */}
      <section id="connections" className="py-20 scroll-mt-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">接続例</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="max-w-5xl mx-auto space-y-16">
            {/* Connection 1 - 楽器やアンプとの接続方法 */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">楽器やアンプとの接続方法</h3>
              <div className="flex justify-center">
                <Image
                  src="/images/brands/hotone/ampero_mini/connection_01.png"
                  alt="楽器やアンプとの接続方法"
                  width={900}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-sm text-gray-700">
                楽器をAmpero Miniのインストゥルメント入力ジャックに接続、OUTからアンプにケーブルを接続します。ステレオ接続の場合は、Yケーブルを使用してL/Rの出力チャンネルを分けます（Tip＝左チャンネル、Ring＝右チャンネル）。
              </p>
              {/* Y-Cable説明図 */}
              <div className="flex justify-center">
                <Image
                  src="/images/brands/hotone/ampero_mini/connection_02.png"
                  alt="Y-Cable - Blue stands for left channel (tip), and red stands for right channel (ring)"
                  width={800}
                  height={150}
                  className="w-full max-w-2xl h-auto"
                />
              </div>
            </div>

            <div className="border-t border-gray-200" />

            {/* Connection 2 - アンプのリターンまたはパワーアンプ */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">アンプのリターンまたはパワーアンプ（Loudster）のインプットに接続する場合</h3>
              <p className="text-sm text-gray-700">
                出力をアンプのFXループリターン入力または後方アンプのインプットに接続します。
              </p>
              <div className="flex justify-center">
                <Image
                  src="/images/brands/hotone/ampero_mini/connection_03.png"
                  alt="アンプのリターンまたはパワーアンプ 1"
                  width={900}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
              <div className="flex justify-center">
                <Image
                  src="/images/brands/hotone/ampero_mini/connection_04.png"
                  alt="アンプのリターンまたはパワーアンプ 2"
                  width={900}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div className="border-t border-gray-200" />

            {/* Connection 3 - ミキサーやオーディオインターフェース */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">ミキサーやオーディオインターフェース、ヘッドホンなどの機器との接続方法</h3>
              <p className="text-sm text-gray-700">
                ミキサーやオーディオインターフェースの対応する「入力」にAmpero Miniの「出力」を接続します。
              </p>
              <div className="flex justify-center">
                <Image
                  src="/images/brands/hotone/ampero_mini/connection_05.png"
                  alt="ミキサーやオーディオインターフェース"
                  width={900}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div className="border-t border-gray-200" />

            {/* Connection 4 - コンピューターにオーディオインターフェースとして */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">コンピューターにオーディオインターフェースとして接続する場合</h3>
              <p className="text-sm text-gray-700">
                USBケーブルでAmpero Miniとコンピューターに接続します。Windows PCの場合は、ドライバーの設定が必要です（macOSでは設定不要）。モニタースピーカーにラインアウトケーブルを接続するか、ヘッドフォンでモニターします。
              </p>
              <div className="flex justify-center">
                <Image
                  src="/images/brands/hotone/ampero_mini/connection_06.png"
                  alt="コンピューターにオーディオインターフェースとして接続"
                  width={900}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div className="border-t border-gray-200" />

            {/* Connection 5 - ペダルボード上の接続 */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">ペダルボード上の接続</h3>
              <p className="text-sm text-gray-700">
                Ampero Miniをペダルボードにセットし、図のようにI/Oの構成に応じて他のペダルやコントローラーを接続します。
              </p>
              <div className="flex justify-center">
                <Image
                  src="/images/brands/hotone/ampero_mini/connection_07.png"
                  alt="ペダルボード上の接続"
                  width={900}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div className="border-t border-gray-200" />

            {/* Connection 6 - Aux Inラインの使用 */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Aux Inラインの使用</h3>
              <div className="flex justify-center">
                <Image
                  src="/images/brands/hotone/ampero_mini/connection_08.png"
                  alt="Aux Inラインの使用"
                  width={900}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-sm text-gray-700">
                オーディオソース（携帯電話や音楽プレーヤーなど）とAmpero MiniのAux Inジャックから、オス-オスの1/8インチステレオケーブルで接続します。このライン信号は、Ampero Miniの内部エフェクトやUSBオーディオに影響を受けません。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Software Section */}
      <section id="software" className="py-20 scroll-mt-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">ソフトウェア</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Win/Mac Software Title */}
            <h3 className="text-xl font-bold text-gray-900 text-center mb-8">Win/Mac 対応のフリーソフトウェア</h3>

            {/* Main Software Image */}
            <div className="flex justify-center mb-8">
              <Image
                src="/images/brands/hotone/ampero_mini/software_01.jpg"
                alt="AMPERO Mini Editor"
                width={900}
                height={500}
                className="w-full max-w-2xl h-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Description */}
            <p className="text-center text-gray-700 mb-12">
              高機能なAmpero Miniのエディットをフルサポートできるソフトウェアを用意しました。エフェクターの詳細な説明と簡単な編集が可能なソフトウェアをダウンロードしていただけます。スムーズなサウンドメイキングや編集作業をサポートしてくれます。
            </p>

            {/* Software Downloads Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start mb-4">
              {/* 1. Firmware アップデート方法 */}
              <div className="bg-white rounded-lg overflow-hidden border border-gray-300 self-start">
                <button onClick={() => toggleSoftware("firmware_update")} className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                      <span className="text-white text-sm">?</span>
                    </div>
                    <span className="font-medium text-gray-800">Firmware アップデート方法</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedSoftware.firmware_update ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.firmware_update && (
                  <div className="px-4 py-4 bg-gray-100 border-t border-gray-200 space-y-4">
                    {/* Images */}
                    <div className="grid grid-cols-2 gap-4">
                      <Image
                        src="/images/brands/hotone/ampero_mini/software_02.png"
                        alt="Firmware Update Step 1"
                        width={400}
                        height={300}
                        className="w-full h-auto rounded-lg"
                      />
                      <Image
                        src="/images/brands/hotone/ampero_mini/software_03.png"
                        alt="Firmware Update Step 2"
                        width={400}
                        height={300}
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                    {/* Steps */}
                    <div className="space-y-3 text-sm text-gray-700">
                      <p className="flex gap-2">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                        <span>USB接続を維持したままユニットの電源をオフにします。</span>
                      </p>
                      <p className="flex gap-2">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                        <span>1のフットスイッチを同時に押したまま電源を入れます。</span>
                      </p>
                      <p className="flex gap-2">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                        <span>Ampero II エディター ソフトウェアを起動し、「Firmware Update」ボタンをクリックし、予めダウンロードしたファームウェアファイル（Ampero Mini Firmware V.......bin *解凍しない状態）を選択し、「Update now」をクリックします。</span>
                      </p>
                      <p className="flex gap-2">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                        <span>ファームウェアのアップデートが完了したら再起動をしてください。これで完了です。</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. AMPERO Mini Firmware 1.1 New! */}
              <div className="bg-white rounded-lg overflow-hidden border border-gray-300 self-start">
                <button onClick={() => toggleSoftware("firmware_11")} className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                      <Download className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-gray-800">AMPERO Mini Firmware 1.1</span>
                    <span className="text-red-500 text-sm font-bold">New!</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedSoftware.firmware_11 ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.firmware_11 && (
                  <div className="px-4 py-4 bg-gray-100 border-t border-gray-200 space-y-4">
                    <p className="text-sm text-gray-700">Ampero Mini ファームウェア・バージョン 1.1 がダウンロードできるようになりました。（2024年5月28日）</p>
                    
                    {/* Image */}
                    <div className="flex justify-center">
                      <Image
                        src="/images/brands/hotone/ampero_mini/software_04.jpg"
                        alt="AMPERO Mini Firmware 1.1"
                        width={600}
                        height={400}
                        className="w-full h-auto rounded-lg"
                      />
                    </div>

                    <p className="text-sm text-gray-700">MINI 機関銃は、さらにクレイジーな弾薬に対応するようになりました。私たちは現在、パックアンドゴー体験を拡張するための最新の Ampero Mini ファームウェア アップデートを配信しています...長い間お待たせしました。</p>

                    {/* 新しいエフェクト */}
                    <div className="space-y-3">
                      <h4 className="font-bold text-gray-900">新しいエフェクト</h4>
                      <div className="space-y-2 text-sm text-gray-700">
                        <p className="flex gap-2">
                          <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                          <span>Magic T – Paul Cochrane® Timmy* に基づく、FX1/FX2モジュールで使用可能なCDCM HD ドライブモデルです。</span>
                        </p>
                        <p className="flex gap-2">
                          <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                          <span>Dr. Blues – 広く使用されているブルース オーバードライブをベースにした、FX1/FX2 モジュールで利用可能な CDCM HD ドライブ モデル</span>
                        </p>
                        <p className="flex gap-2">
                          <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                          <span>Blues Butter – Blues breaker®* ペダルをベースにした、FX1/FX2 モジュールで使用可能な CDCM HD ドライブモデルです。</span>
                        </p>
                        <p className="flex gap-2">
                          <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                          <span>Classic PS – Whammy®* に基づいた FX1/FX2/FX3 モジュールで使用可能な CDCM HD ドライブモデルです。</span>
                        </p>
                        <p className="flex gap-2">
                          <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
                          <span>Tweed Prince – Fender® Tweed Princeton*（5F2-A バージョン）をベースにした、AMP モジュールで使用可能な CDCM HD アンプモデルです。</span>
                        </p>
                        <p className="flex gap-2">
                          <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">6</span>
                          <span>Black Prince – Fender® Blackface Princeton®*（AA964 バージョン）をベースにした、AMPモジュールで使用可能な CDCM HD アンプモデルです。</span>
                        </p>
                      </div>
                    </div>

                    <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium">
                      <Download className="w-4 h-4" />ダウンロードはこちら
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start mb-4">
              {/* 3. AMPERO Editor 1.4.1 New! */}
              <div className="bg-white rounded-lg overflow-hidden border border-gray-300 self-start">
                <button onClick={() => toggleSoftware("editor_141")} className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                      <Download className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-gray-800">AMPERO Editor 1.4.1</span>
                    <span className="text-red-500 text-sm font-bold">New!</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedSoftware.editor_141 ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.editor_141 && (
                  <div className="px-4 py-4 bg-gray-100 border-t border-gray-200 space-y-4">
                    <p className="text-sm text-gray-700">Ampero II Stage ソフトウェア・バージョン 1.0.1 がダウンロードできるようになりました。（2024年5月28日）</p>
                    
                    {/* Image */}
                    <div className="flex justify-center">
                      <Image
                        src="/images/brands/hotone/ampero_mini/software_05.jpg"
                        alt="AMPERO Editor 1.4.1"
                        width={600}
                        height={400}
                        className="w-full h-auto rounded-lg"
                      />
                    </div>

                    <p className="text-sm text-gray-700">Firmware 1.1に対応</p>

                    <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium">
                      <Download className="w-4 h-4" />ダウンロードはこちら
                    </a>
                  </div>
                )}
              </div>

              {/* 4. Ampero Mini Editor V1.3.3 */}
              <div className="bg-white rounded-lg overflow-hidden border border-gray-300 self-start">
                <button onClick={() => toggleSoftware("editor_133")} className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                      <Download className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-gray-800">Ampero Mini Editor V1.3.3</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedSoftware.editor_133 ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.editor_133 && (
                  <div className="px-4 py-4 bg-gray-100 border-t border-gray-200 space-y-4">
                    <p className="text-sm text-gray-700">HOTONE メーカーサイトより直接ダウンロードが開始されます。</p>
                    <p className="text-sm text-gray-700">※ AMPERO Mini Firmware 1.0〜1.0Aに対応</p>

                    <div className="flex flex-wrap gap-4">
                      <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium">
                        <Download className="w-4 h-4" />ダウンロード（Windows）
                      </a>
                      <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium">
                        <Download className="w-4 h-4" />ダウンロード（mac OS）
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start mb-4">
              {/* 5. ファームウェア：AMPERO Mini Firmware 1.0B */}
              <div className="bg-white rounded-lg overflow-hidden border border-gray-300 self-start">
                <button onClick={() => toggleSoftware("firmware_10b")} className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                      <Download className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-gray-800">ファームウェア：AMPERO Mini Firmware 1.0B</span>
                    <span className="text-red-500 text-sm font-bold">- New -</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedSoftware.firmware_10b ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.firmware_10b && (
                  <div className="px-4 py-4 bg-gray-100 border-t border-gray-200 space-y-4">
                    <h4 className="font-bold text-gray-900">V1.0Bの改善のポイント</h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Looperのフットスイッチィング機能が改善されました。</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>マイナーバグの修正</span>
                      </p>
                    </div>
                    <p className="text-sm text-gray-700">HOTONE メーカーサイトより直接ダウンロードが開始されます。</p>
                    <p className="text-sm text-gray-700">※ AMPERO EDITOR V1.3.3に対応</p>
                    <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium">
                      <Download className="w-4 h-4" />ダウンロードはこちら（.zip）
                    </a>
                  </div>
                )}
              </div>

              {/* 6. ファームウェア：AMPERO Mini Firmware 1.0A */}
              <div className="bg-white rounded-lg overflow-hidden border border-gray-300 self-start">
                <button onClick={() => toggleSoftware("firmware_10a")} className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                      <Download className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-gray-800">ファームウェア：AMPERO Mini Firmware 1.0A</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedSoftware.firmware_10a ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.firmware_10a && (
                  <div className="px-4 py-4 bg-gray-100 border-t border-gray-200 space-y-4">
                    <p className="text-sm text-gray-700">HOTONE メーカーサイトより直接ダウンロードが開始されます。</p>
                    <p className="text-sm text-gray-700">※ AMPERO EDITOR V1.3.3に対応</p>
                    <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium">
                      <Download className="w-4 h-4" />ダウンロードはこちら（.zip）
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
              {/* 7. ASIO ドライバー */}
              <div className="bg-white rounded-lg overflow-hidden border border-gray-300 self-start">
                <button onClick={() => toggleSoftware("asio")} className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                      <Download className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-gray-800">ASIO ドライバー：HOTONE USB ASIO Driver Version 5.41.2</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedSoftware.asio ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.asio && (
                  <div className="px-4 py-4 bg-gray-100 border-t border-gray-200 space-y-6">
                    {/* Main Image */}
                    <div className="flex justify-center">
                      <Image
                        src="/images/brands/hotone/ampero_mini/software_06.jpg"
                        alt="HOTONE USB ASIO Driver V5.41.2"
                        width={600}
                        height={400}
                        className="w-full h-auto rounded-lg"
                      />
                    </div>

                    <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium">
                      <span>🌐</span> メーカー・ダウンロードページはこちら
                    </a>

                    <div className="border-t border-gray-300 pt-6">
                      <h4 className="font-bold text-gray-900 text-lg mb-4">Hotone USB ASIO Driver の使用方法</h4>
                      <h5 className="font-bold text-gray-900 mb-4">インストールと設定の手順</h5>

                      <div className="space-y-6 text-sm text-gray-700">
                        {/* Step 1 */}
                        <div className="space-y-2">
                          <p className="flex gap-2">
                            <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                            <span>Hotone製品の電源を入れ、コンピューターに接続します。その後、Hotone USB ASIO Driverをインストールします。</span>
                          </p>
                        </div>

                        {/* Step 2 */}
                        <div className="space-y-2">
                          <p className="flex gap-2">
                            <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                            <span>使用されるDAWを起動して、"Devices" – "Device Setup"をクリックします。（Cubase 8 Element versionを例に説明します。）</span>
                          </p>
                          <div className="flex justify-center mt-2">
                            <Image
                              src="/images/brands/hotone/ampero_mini/software_07.png"
                              alt="Device Setup Menu"
                              width={400}
                              height={300}
                              className="h-auto rounded-lg"
                            />
                          </div>
                        </div>

                        {/* Step 3 */}
                        <div className="space-y-2">
                          <p className="flex gap-2">
                            <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                            <span>"Device Setup" ウィンドウの"VST Audio"を選択します。</span>
                          </p>
                          <div className="flex justify-center mt-2">
                            <Image
                              src="/images/brands/hotone/ampero_mini/software_08.png"
                              alt="VST Audio Selection"
                              width={600}
                              height={400}
                              className="w-full h-auto rounded-lg"
                            />
                          </div>
                        </div>

                        {/* Step 4 */}
                        <div className="space-y-2">
                          <p className="flex gap-2">
                            <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                            <span>ASIO Driverのドロップダウンメニューから"HOTONE AUDIO USB Audio Device"を見つけて、"OK"をクリックします。</span>
                          </p>
                          <div className="flex justify-center mt-2">
                            <Image
                              src="/images/brands/hotone/ampero_mini/software_09.png"
                              alt="HOTONE AUDIO USB Audio Device"
                              width={600}
                              height={400}
                              className="w-full h-auto rounded-lg"
                            />
                          </div>
                        </div>

                        {/* Step 5 */}
                        <div className="space-y-2">
                          <p className="flex gap-2">
                            <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
                            <span>これで完了です。</span>
                          </p>
                        </div>
                      </div>

                      <div className="mt-6">
                        <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium">
                          <span>🌐</span> ここからUSB ASIO Driver V5.41.2.をダウンロードしてください。
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs Section */}
      <section id="specs" className="py-20 scroll-mt-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">製品仕様</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Column */}
              <div className="space-y-6 text-sm text-gray-700">
                {/* 入力 */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">入力</h4>
                  <p>1 x 1/4" TS インストルメントジャック</p>
                  <p>1 x 1/8" ステレオAux In ジャック</p>
                  <p>1 x 1/4" TRS エクスプレッションペダルジャック（10kΩ〜25kΩ対応）</p>
                </div>

                {/* 出力 */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">出力</h4>
                  <p>1 x 1/4" TRS バランスステレオ出力ジャック</p>
                  <p>1 x 1/8" ステレオヘッドフォン出力ジャック</p>
                </div>

                {/* 入力インピーダンス */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">入力インピーダンス</h4>
                  <p>インストゥルメント：4.7MΩ</p>
                  <p>AUX IN：10kΩ</p>
                </div>

                {/* 出力インピーダンス */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">出力インピーダンス</h4>
                  <p>出力：1kΩ</p>
                  <p>ヘッドフォン：22Ω</p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6 text-sm text-gray-700">
                {/* デジタル */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">デジタル</h4>
                  <p>デジタルプロセッシング：24-bit / 44.1kHz</p>
                  <p>DNR：112dB（DA）</p>
                  <p>エフェクト数：199</p>
                  <p>エフェクトモジュール：同時使用最大9</p>
                  <p>パッチ数：198（ユーザーパッチ99、ファクトリーパッチ99）</p>
                  <p>ルーパータイム：モノラル100 秒、ステレオ50秒</p>
                  <p>内蔵ドラムマシン：100 リズムパターン</p>
                </div>

                {/* その他 */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">その他</h4>
                  <p>スクリーン：4" 800 x 480 カラーダイナミックタッチスクリーン</p>
                  <p>USB ポート：USB 2.0 Type-C port、USB Audio 2.0</p>
                  <p>インパルスレスポンス/IR プロセッサ：24-bit/44.1kHz モノ WAV ファイル、1024ポイント</p>
                  <p>電源仕様：9V DC センターマイナス</p>
                  <p>必要電流量：最大500mA</p>
                  <p>寸法：134mm（W）x120mm（D）x49mm（H）</p>
                  <p>重量：529g</p>
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

