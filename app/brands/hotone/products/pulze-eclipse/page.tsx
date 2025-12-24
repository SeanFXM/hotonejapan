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

export default function PulzeEclipsePage() {
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
    downloadManual("hotone", "pulze-eclipse")
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
          src="/images/brands/hotone/PULZE_eclipse/hero.jpg"
          alt="PULZE Eclipse"
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
                <p className="text-2xl font-bold text-gray-900">PULZE Eclipse</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">Bluetooth® モデリングアンプ</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-hotone">
                  ¥61,050 <span className="text-sm font-normal text-gray-500">前後（税込）</span>
                </p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">Luna（白）：6959473911013</p>
                <p className="text-sm font-mono text-gray-700">Eclipse（黒）：6959473911020</p>
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
              多機能でモダンな進化形
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              Bluetooth® モデリングアンプ
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
                  src="/images/brands/hotone/PULZE_eclipse/intro.jpg"
                  alt="PULZE Eclipse"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>

              {/* Related Info */}
              <div className="space-y-3">
                <h4 className="font-bold text-gray-900 border-b border-gray-300 pb-2">関連情報</h4>
                <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors">
                  <span className="text-purple-600">📄</span>
                  PULZE クイックユーザーガイド
                </a>
                <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors">
                  <span className="text-purple-600">📄</span>
                  PULZE 搭載エフェクトリスト
                </a>
                <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors">
                  <span className="text-purple-600">📄</span>
                  PULZE ドラムマシーンリスト
                </a>
                <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors">
                  <span className="text-purple-600">📄</span>
                  PULZE MIDI Control Information リスト
                </a>
              </div>
            </div>

            {/* Right Column - Description */}
            <div className="space-y-6">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  Pulze（パルス）は近代的でミニマルな外観をまとった最新型のBluetooth®デジタル・モデリング・アンプです。エレクトリックからアコースティックまであらゆる楽器に対応する多彩な仕様を備えています。緻密に設計されたエンクロージャーとスピーカーは、ポータブルなフォームファクターでありながら、高品質なオーディオ再生とプロ仕様のトーンをお届け。優雅なクラシック音楽でも、ど迫力の映画のオーディオも余すところなくリッチなサウンドで堪能できます。Bluetooth® 5.0対応の専用モバイルアプリからタッチスクリーンで直感的に操作でき、誰にでも使いやすくインテリジェントなデジタル体験が可能になりました。レコーディングやライブ・ストリーミング向けの機能も充実しており、いつでも創造性を掻き立て、その一瞬のひらめきも逃しません。カラーはスタイリッシュなLuna（ルナ）とEclipse（エクリプス）の２種類をご用意しています。
                </p>
              </div>

              {/* Features Title */}
              <h4 className="text-lg font-bold text-gray-900">さまざまな楽器が接続できるコンパクトなBluetooth®モデリングアンプ</h4>

              {/* Features List */}
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-gray-700">デュアル3.5インチ・フルレンジ・スピーカー採用の30W（15W+15W）出力</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-gray-700">Celestion® Digitalによる5つのクラシックCelestion® スピーカーIR</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-gray-700">強力なデュアルコア DSP と24bitデジタル信号処理による優れた音質</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-gray-700">タッチスクリーンとソフトウェアと柔軟なUIによる直感的なコントロール</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-gray-700">オーディオ再生とリモコン用にBluetooth® 5.0 デュアルモード・モジュールを採用</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <div className="text-gray-700">
                    <p>CDCM HD＆F.I.R.E.モデリング・エフェクト：</p>
                    <p className="ml-4">- 46 種のアンプ</p>
                    <p className="ml-4">- 48 種のキャビネット</p>
                    <p className="ml-4">- 伝説のペダルmodels</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-gray-700">エフェクトチェーンが編集可能な、最大7つの同時エフェクトモジュールを搭載</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-gray-700">最大200音色（プリセット）保存可能</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-gray-700">アコースティック・ギター用のシミュレーション・エフェクトとトーン</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-gray-700">数秒で音色を切り替えられるソングリストモード</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-gray-700">Hotoneコミュニティ経由でお気に入りのトーンをダウンロード/アップロード/共有</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-gray-700">100パターンのドラムマシン/メトロノームを内蔵</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-gray-700">高精度チューナーを内蔵</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-gray-700">サイレント練習のためのヘッドフォン・ジャック</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-gray-700">録音可能なAUX入力ジャック</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-gray-700">独自のコントロール・パネルが作れるカスタマイズ可能なユーザー・ディスプレイ</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-gray-700">ノブのタイプ、テーマ、雰囲気のライトカラーがカスタマイズ可能</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-gray-700">明るさを制御できる内蔵ムードライト</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-gray-700">持ち運びに便利な着脱式レザーストラップ</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-gray-700">2カラーモデル</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Concept Section */}
      <section id="concept" className="py-20 scroll-mt-24 bg-concept-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">製品コンセプト</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full bg-orange-500" />
            </div>
          </div>

          <div className="space-y-20">
            {/* Concept 1 - プレイする、だけじゃない */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="rounded-xl overflow-hidden">
                <Image
                  src="/images/brands/hotone/PULZE_eclipse/concept_01.jpg"
                  alt="Concept 1"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
              <div className="text-gray-300 space-y-4">
                <h3 className="text-2xl font-bold text-white mb-4">プレイする、だけじゃない<br />好きな音楽をどこへでも</h3>
                <p className="leading-relaxed">
                  「プロ仕様の楽器用アンプでありながら、音楽も楽しめるポータブルオーディオシステム」──それがPulze開発のコンセプトでした。精密に設計されたPulzeは、楽器のトーンを忠実に鳴らすだけでなく、素晴らしいステレオスピーカーとしても使うことができます。
                </p>
                <p className="leading-relaxed">
                  USB、Bluetooth、Aux Inなどの複数の接続オプションを備え、コンピューターやスマートフォンからいつでもどこでも高品質の音楽や迫力のムービーサウンドを再生できます。クリアな高音と重低音により、どんな場所でもライブ感のある音楽が楽しめます。
                </p>
              </div>
            </div>

            {/* Concept 2 - イノベーションの継承 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="rounded-xl overflow-hidden flex justify-center">
                <Image
                  src="/images/brands/hotone/PULZE_eclipse/concept_02.png"
                  alt="CDCM HD + F.I.R.E."
                  width={500}
                  height={200}
                  className="w-auto h-auto max-w-full"
                />
              </div>
              <div className="text-gray-300 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">イノベーションの継承</h3>
                  <p className="leading-relaxed">
                    Hotoneのエフェクトは、その優れた音質と本格的なフィールで長年にわたり多くのミュージシャンから高い評価を得てきました。HotoneのCDCM HD ＆ F.I.R.E.デジタル・モデリング・テクノロジーは常に進化し続けています。
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white mb-2">コアテクノロジーの融合</h4>
                  <p className="leading-relaxed">
                    HOTONEの経験豊富なチームが最高のデジタル・モデリング・テクノロジーをこの新しいPulze アンプに注入しました。高品質なデュアルコアによるデジタル・プラットフォームを搭載し、複雑で強力なアルゴリズムも余裕で処理します。
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white mb-2">革新的でユニークなエンクロージャー・デザイン</h4>
                  <p className="leading-relaxed">
                    Pulze は、完璧なトーンとサイズ感を両立しました。綿密に設計されたABSエンクロージャーと2基のカスタム3.5&quot;フルレンジスピーカーを備え、豊かなダイナミクスを持ちながら、繊細で優れたトーンを提供できるよう細かくチューニングされています。
                  </p>
                  <ul className="mt-3 space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>3.5インチ・フルレンジ・スピーカー</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>ワイドなステレオサウンドステージをお届けする特別仕様のABSキャビネット</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Concept 3 - 自宅での練習からステージまで */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="rounded-xl overflow-hidden">
                <Image
                  src="/images/brands/hotone/PULZE_eclipse/concept_03.jpg"
                  alt="Concept 3"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
              <div className="text-gray-300 space-y-4">
                <h3 className="text-2xl font-bold text-white mb-4">自宅での練習からステージまで<br />場所を選ばず楽しめる</h3>
                <p className="leading-relaxed">
                  一般的な真空管アンプは、大音量を鳴らせる十分なスペースがなければ艶のあるサウンドは得られません。一方、Pulzeでは音量のレベルにかかわらず、優れたサウンドパフォーマンスを提供できる、自宅などでの練習でもスタジオの練習でも快適なサウンドを提供します。さらに、ステレオのクラスDアンプが放つ30ワットの出力は、小規模なライブ会場でも威力を発揮します。
                </p>
              </div>
            </div>

            {/* Concept 4 - Space+ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="rounded-xl overflow-hidden">
                <Image
                  src="/images/brands/hotone/PULZE_eclipse/concept_04.jpg"
                  alt="Space+"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
              <div className="text-gray-300 space-y-4">
                <h3 className="text-2xl font-bold text-white mb-4">Space+ がもたらす迫力のサウンドステージと没入感</h3>
                <p className="leading-relaxed">
                  Pulzeには、真のステレオ信号処理とオーディオ再生をベースにした、革新的な Space+ステレオ・エンハンス・テクノロジーが組み込まれています。楽器の演奏でも、音楽の再生でも、より広いサウンドステージ、よりリアルな臨場感、そして豊かな音の奥行きを生み出します。どんな場面でもひとたびPulzeで鳴らせばその臨場感溢れるステレオサウンドに包み込まれます。
                </p>
              </div>
            </div>

            {/* Concept 5 - 高度なテクノロジー */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="rounded-xl overflow-hidden">
                <Image
                  src="/images/brands/hotone/PULZE_eclipse/concept_05.gif"
                  alt="Touch Screen"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                  unoptimized
                />
              </div>
              <div className="text-gray-300 space-y-6">
                <h3 className="text-2xl font-bold text-white mb-4">高度なテクノロジーが叶えるデジタル体験</h3>
                
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">革新的な 4インチ・フルカラー・タッチスクリーン</h4>
                  <p className="leading-relaxed">
                    これまでのノブやボタン操作から解放されます。指先でタッチするだけで素早く設定を調整・変更できます。
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white mb-2">コンパニオン・モバイルアプリ</h4>
                  <p className="leading-relaxed">
                    Bluetooth®接続により、エフェクトチェーンや各種パラメーターをワイヤレスで編集が可能です。
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white mb-2">内蔵プレイリスト・モード＆Bluetooth® 5.0サポート</h4>
                  <p className="leading-relaxed">
                    思いのままに音楽再生を楽しめます。（注：Bluetooth MIDIコントロールには、サードパーティのBluetooth MIDIブリッジ・ソフトウェアのサポートが必要です。）
                  </p>
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

          {/* Main Video */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/sSxjyNAzd0c"
                title="PULZE Introduction"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Tutorial Videos Grid */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Part 1 */}
            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/-T76DvjePn4"
                title="Hotone PULZE Tutorial - Part 1: Installation steps / Interface usage"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            {/* Part 2 */}
            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/tRkyavRpxaA"
                title="Hotone PULZE Tutorial - Part 2: App & Bluetooth usage"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            {/* Part 3 */}
            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/d9rdpLoZO4s"
                title="Hotone PULZE Tutorial - Part 3: USB audio usage / Reamp & OTG"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            {/* Part 4 */}
            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/52MhKwo2rJo"
                title="Hotone PULZE Tutorial - Part 4: Bluetooth MIDI control"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Note */}
          <p className="text-center text-gray-500 text-sm mt-8">
            ※ YouTubeに移動してご覧いただくと、日本語字幕機能がお使いいただけます。
          </p>
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

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* 01 - 豊富な音色 */}
            <div className="bg-gray-100 rounded-2xl overflow-hidden">
              <div className="flex items-start justify-between p-4 pb-0">
                <h3 className="text-lg font-bold text-gray-900">豊富な音色</h3>
                <span className="text-4xl font-bold text-gray-300">01</span>
              </div>
              <div className="p-4">
                <Image
                  src="/images/brands/hotone/PULZE_eclipse/function_01.jpg"
                  alt="豊富な音色"
                  width={500}
                  height={300}
                  className="w-full h-auto rounded-lg mb-4"
                />
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    46のアンプシミュレーション
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    48種のキャビネットシミュレーション
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    60以上のクラシックなエフェクトシミュレーション
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    5つの Celestionスピーカー IR（20 ユーザー IR スロット）
                  </li>
                </ul>
              </div>
            </div>

            {/* 02 - 自由なコンビネーション */}
            <div className="bg-gray-100 rounded-2xl overflow-hidden">
              <div className="flex items-start justify-between p-4 pb-0">
                <h3 className="text-lg font-bold text-gray-900">自由なコンビネーション</h3>
                <span className="text-4xl font-bold text-gray-300">02</span>
              </div>
              <div className="p-4">
                <Image
                  src="/images/brands/hotone/PULZE_eclipse/function_02.gif"
                  alt="自由なコンビネーション"
                  width={500}
                  height={100}
                  className="w-full h-auto mb-4"
                  unoptimized
                />
                <p className="text-sm text-gray-700 mb-4">
                  従来のアンプではサウンドレンジにも限りがあり、エフェクトボードを充実させるにもお金がかかるものです。しかしPulzeなら、好きなアンプとエフェクトをこれ１台で複数組み合わせることができます。
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    7つのエフェクト・モジュール
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    200のトーン・プリセット・スロット
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    接続変更可能なエフェクト・チェーン
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    簡単にトーン・プリセットの保存や切り替えが可能
                  </li>
                </ul>
              </div>
            </div>

            {/* 03 - 自分好みにカスタム */}
            <div className="bg-gray-100 rounded-2xl overflow-hidden">
              <div className="flex items-start justify-between p-4 pb-0">
                <h3 className="text-lg font-bold text-gray-900">自分好みにカスタム</h3>
                <span className="text-4xl font-bold text-gray-300">03</span>
              </div>
              <div className="p-4">
                <Image
                  src="/images/brands/hotone/PULZE_eclipse/function_03.gif"
                  alt="自分好みにカスタム"
                  width={500}
                  height={300}
                  className="w-full h-auto rounded-lg mb-4"
                  unoptimized
                />
                <p className="text-sm text-gray-700">
                  Pulze のフルカラー・タッチスクリーンはカスタマイズ可能なインターフェイスです。最もよく使うエフェクト・モジュールとパラメータを自由に選択できます。さらに、調整できるアンビエント照明、テーマカラー、ノブスタイルを備えており、自分らしさを最大限に表現できます。
                </p>
              </div>
            </div>

            {/* 04 - ひらめきを刺激して */}
            <div className="bg-gray-100 rounded-2xl overflow-hidden">
              <div className="flex items-start justify-between p-4 pb-0">
                <h3 className="text-lg font-bold text-gray-900">ひらめきを刺激して</h3>
                <span className="text-4xl font-bold text-gray-300">04</span>
              </div>
              <div className="p-4">
                <Image
                  src="/images/brands/hotone/PULZE_eclipse/function_04.jpg"
                  alt="ひらめきを刺激して"
                  width={500}
                  height={300}
                  className="w-full h-auto rounded-lg mb-4"
                />
                <h4 className="font-bold text-gray-900 mb-2">創造性を逃さない</h4>
                <p className="text-sm text-gray-700 mb-3">
                  Pulzeの内蔵サウンドカードは、USB 経由でのオーディオ録音でき、リアンプ機能もサポートしています。自分のプレイを録音した後に、いつでも好みのトーンに調整でき、高品質のトゥルーステレオオーディオを楽しむことができます。
                </p>
                <p className="text-sm text-gray-700">
                  DAWやその他のツールを使用して、曲やバンドのデモを制作したら、いつでも手軽に作業内容を保存して共有できます。
                </p>
              </div>
            </div>

            {/* 05 - どこででもライブ・ストリーミング！ */}
            <div className="bg-gray-100 rounded-2xl overflow-hidden">
              <div className="flex items-start justify-between p-4 pb-0">
                <h3 className="text-lg font-bold text-gray-900">どこででもライブ・ストリーミング！</h3>
                <span className="text-4xl font-bold text-gray-300">05</span>
              </div>
              <div className="p-4">
                <Image
                  src="/images/brands/hotone/PULZE_eclipse/function_05.jpg"
                  alt="どこででもライブ・ストリーミング"
                  width={500}
                  height={300}
                  className="w-full h-auto rounded-lg mb-4"
                />
                <p className="text-sm text-gray-700">
                  PulzeのUSB オーディオにはループバック機能が備わっており、インターネット上でいつでもライブ・ストリーミングを行うことができます。コンピュータ上でオーディオ伴奏を再生し、リスナーの前でライブ演奏を行うことができます。 Pulze はBluetooth®オーディオとAUX INオーディオも録音できるため、クリエイティブな可能性が広がります。
                </p>
              </div>
            </div>

            {/* 06 - 自分の作品を共有できる */}
            <div className="bg-gray-100 rounded-2xl overflow-hidden">
              <div className="flex items-start justify-between p-4 pb-0">
                <h3 className="text-lg font-bold text-gray-900">自分の作品を共有できる</h3>
                <span className="text-4xl font-bold text-gray-300">06</span>
              </div>
              <div className="p-4">
                <Image
                  src="/images/brands/hotone/PULZE_eclipse/function_06.png"
                  alt="自分の作品を共有できる"
                  width={500}
                  height={300}
                  className="w-full h-auto rounded-lg mb-4"
                />
                <h4 className="font-bold text-gray-900 mb-2">クラウド・サウンド・コミュニティ</h4>
                <p className="text-sm text-gray-700">
                  Pulzeの公式サウンド・コミュニティは、専用のモバイルアプリからアクセスでき、わずか２分ほどでアカウント登録できます。簡単にサウンドをアップロードしたり、アーティストやユーザーのプリセットをダウンロードしたりできます。思い描いたサウンドを求めてパラメーター調整に時間をかける必要はもうありません。膨大なクラウドデータの中からお好きなサウンド・プリセットをいつでもどこでもスマートフォンやPulzeにダウンロードできます。
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Feature List */}
          <div className="max-w-6xl mx-auto bg-gray-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">サウンド再生に特化したABSキャビネット・デザインにより、コンパクトで軽量な筐体でありながらワイドなステレオ・サウンドステージ、忠実なオーディオ再生、しっかりと深みのある低音をもたらします</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">デュアル 3.5 インチ・フルレンジ・スピーカー採用の30W（15W+15W）出力</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">さらに進化を遂げたCDCM HDとF.I.R.E.モデリング・システムによる、ハイエンドなトーンとリアルな演奏体験</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">ハイレベルなステレオ・プロセッシングとオーディオ再生、Space+ ステレオエンハンス・テクノロジーによる臨場感あふれるサウンドステージを実現しました</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">強力なデュアルコア DSP プラットフォームと24bitデジタル信号処理により、優れた音質を楽しめます</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">４インチ 800×480 ダイナミック・タッチスクリーンと柔軟なUIによる直感的なコントロール</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">オーディオ再生とリモコン用にBluetooth® 5.0 デュアルモード・モジュールを採用</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">Bluetooth® MIDIによるワイヤレス・コントロールをサポート¹</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <div className="text-gray-700">
                  <p>CDCM HD & F.I.R.E.モデリング・エフェクト：</p>
                  <p className="ml-2">- 46 種のアンプ</p>
                  <p className="ml-2">- 48 種のキャビネット</p>
                  <p className="ml-2">- 伝説のペダルmodels</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">高音質なHotoneオリジナル・エフェクトを搭載。ドライブ/ダイナミック/フィルター/モジュレーション/ディレイ/リバーブモデルなど</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">最大20のユーザーIR</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">Celestion® Digitalによる5つのクラシックCelestion® スピーカーIR</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">エフェクトチェーンが編集可能な、最大7つの同時エフェクトモジュールを搭載</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">ファームウェア・アップデートまたはUSBオーディオ・インターフェイス用のUSBポート（ループバックおよびリアンプをサポート）</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">最大200音色（プリセット）保存可能</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">アコースティック・ギター用のシミュレーション・エフェクトとトーン</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">数秒で音色を切り替えられるソングリストモード</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">Hotoneコミュニティ経由でお気に入りのトーンをダウンロード/アップロード/共有</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">100パターンのドラムマシン/メトロノームを内蔵</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">高精度チューナーを内蔵</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">サイレント練習のためのヘッドフォン・ジャック</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">録音可能なAUX入力ジャック</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">独自のコントロール・パネルが作れるカスタマイズ可能なユーザー・ディスプレイ</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">ノブのタイプ、テーマ、雰囲気のライトカラーがカスタマイズ可能²</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">明るさを制御できる内蔵ムードライト</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">持ち運びに便利な着脱式レザーストラップ</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">２カラーモデル</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">18V DC電源</span>
              </div>
            </div>

            {/* Footnotes */}
            <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-500 space-y-1">
              <p>¹　Bluetooth® MIDIコントロールには、サードパーティのBluetooth® MIDIブリッジ・ソフトウェアが必要です。</p>
              <p>²　ムードライトの色はテーマカラーの設定に従います。</p>
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
                src="/images/brands/hotone/PULZE_eclipse/control_01.png"
                alt="PULZE Front View"
                width={800}
                height={400}
                className="w-full h-auto max-w-3xl"
              />
            </div>

            <div className="border-t border-gray-300" />

            {/* Back View */}
            <div className="flex justify-center">
              <Image
                src="/images/brands/hotone/PULZE_eclipse/control_02.png"
                alt="PULZE Back View"
                width={800}
                height={400}
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
            {/* Connection 1 - 楽器やヘッドホン、音楽プレーヤーとの接続方法 */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 text-center">楽器やヘッドホン、音楽プレーヤーとの接続方法</h3>
              <div className="flex justify-center">
                <Image
                  src="/images/brands/hotone/PULZE_eclipse/connection_01.png"
                  alt="楽器やヘッドホン、音楽プレーヤーとの接続方法"
                  width={900}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Connection 2 - Bluetooth接続 */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 text-center">Bluetooth®を使用して、スマホやAMPERO Controlとの接続</h3>
              <div className="flex justify-center">
                <Image
                  src="/images/brands/hotone/PULZE_eclipse/connection_02.png"
                  alt="Bluetooth接続"
                  width={900}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
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
            <p className="text-center text-gray-700 mb-8">
              Pulzeの各ソフトウェアは、HOTONE メーカーサイトよりダウンロードしていただけます。
            </p>

            {/* Software Downloads Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
              {/* Row 1 */}
              <div className="bg-gray-300 rounded-lg overflow-hidden self-start">
                <button onClick={() => toggleSoftware("fw140")} className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-400/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600">🖥️</span>
                    <span className="font-medium text-gray-800">PULZE Firmware 1.4.0</span>
                    <span className="text-red-500 font-bold text-sm">New!</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${expandedSoftware.fw140 ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.fw140 && (
                  <div className="px-4 py-4 bg-gray-200 border-t border-gray-300 space-y-4">
                    <Image
                      src="/images/brands/hotone/PULZE_eclipse/software_01.png"
                      alt="PULZE Firmware 1.4.0"
                      width={500}
                      height={300}
                      className="w-full h-auto rounded-lg"
                    />
                    
                    <div className="space-y-2">
                      <p className="font-bold text-gray-800">PULZE ファームウェアのリリースノート</p>
                      <p className="text-sm text-gray-700">Version 1.4.0　Released 11/11/2025</p>
                      <p className="text-sm text-gray-700">Pulze ファームウェア V1.4.0リリースのお知らせです。</p>
                    </div>

                    <div className="space-y-2">
                      <p className="font-bold text-gray-800">注意事項</p>
                      <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs">1</span>
                          <p>最新版（V2.0.0）のPulze Editorをご使用ください。</p>
                        </div>
                        <div className="flex gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs">2</span>
                          <div>
                            <p>アップデートには最新版（V1.2.1）のPulze Updaterのご使用をお勧めします。</p>
                            <p className="mt-1">※ <a href="#" className="text-orange-500 hover:underline">こちらから最新版をダウンロード</a>してご使用ください。（Win / Mac）</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="font-bold text-gray-800">改善、変更、バグ修正など</p>
                      <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs">1</span>
                          <p>Sound Clone/NAM（Neural Amp Modeler）ファイルインポート/変換機能を追加しました（AMPモジュールで実行され、ソフトウェア経由でインポートされます）。</p>
                        </div>
                        <div className="flex gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs">2</span>
                          <p>その他の軽微なバグ修正を完了しました。</p>
                        </div>
                      </div>
                    </div>

                    <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium">
                      <Download className="w-4 h-4" />ダウンロードはこちら
                    </a>
                  </div>
                )}
              </div>

              <div className="bg-gray-300 rounded-lg overflow-hidden self-start">
                <button onClick={() => toggleSoftware("editor200")} className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-400/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600">📱</span>
                    <span className="font-medium text-gray-800">PULZE Editor Mobile Software 2.0.0</span>
                    <span className="text-red-500 font-bold text-sm">New!</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${expandedSoftware.editor200 ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.editor200 && (
                  <div className="px-4 py-4 bg-gray-200 border-t border-gray-300 space-y-4">
                    <div className="aspect-video bg-black rounded-lg overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/h5scgGCvQyA"
                        title="Hotone PULZE and PULZE Mini: Family update"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <p className="font-bold text-gray-800">PULZE Editor Mobile Softwareのリリースノート</p>
                      <p className="text-sm text-gray-700">Version 2.0.0　Released 11/11/2025</p>
                      <p className="text-sm text-gray-700">Pulze Editor Mobile Software V2.0.0リリースのお知らせです。</p>
                    </div>

                    <div className="space-y-2">
                      <p className="font-bold text-gray-800">改善、変更、バグ修正など</p>
                      <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs">1</span>
                          <p>完全刷新されたユーザーインターフェース</p>
                        </div>
                        <div className="flex gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs">2</span>
                          <p>ファームウェア（Pulze Mini）V1.1.0のサポートを追加</p>
                        </div>
                        <div className="flex gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs">3</span>
                          <p>ファームウェア（Pulze）V1.4.0のサポートを追加</p>
                        </div>
                        <div className="flex gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs">4</span>
                          <p>サウンドクローン/NAM（ニューラルアンプモデラー）ファイルのインポート/変換機能を追加（AMPモジュール内）</p>
                        </div>
                        <div className="flex gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs">5</span>
                          <p>その他の軽微なバグ修正を完了しました。</p>
                        </div>
                      </div>
                    </div>

                    <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium">
                      <Download className="w-4 h-4" />ダウンロードはこちら
                    </a>
                  </div>
                )}
              </div>

              {/* Row 2 */}
              <div className="bg-gray-300 rounded-lg overflow-hidden self-start">
                <button onClick={() => toggleSoftware("fw131")} className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-400/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600">🖥️</span>
                    <span className="font-medium text-gray-800">PULZE Firmware 1.3.1</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${expandedSoftware.fw131 ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.fw131 && (
                  <div className="px-4 py-4 bg-gray-200 border-t border-gray-300 space-y-4">
                    <Image
                      src="/images/brands/hotone/PULZE_eclipse/software_02.png"
                      alt="PULZE Firmware 1.3.1"
                      width={500}
                      height={300}
                      className="w-full h-auto rounded-lg"
                    />
                    
                    <div className="space-y-2">
                      <p className="font-bold text-gray-800">PULZE ファームウェアのリリースノート</p>
                      <p className="text-sm text-gray-700">Version 1.3.1　Released 1/02/2025</p>
                    </div>

                    <div className="space-y-2 text-sm text-gray-700">
                      <p>Pulze ファームウェア V1.3.1＆モバイル アプリ V1.3.0 のリリースのお知らせです。</p>
                      <p>これらの新たなアップデートにより、機能の強化、パフォーマンスの向上、エキサイティングな新機能をお届けします。最高のエクスペリエンスを得るために、必ず最新バージョンへの更新をお勧めします。</p>
                      <p>※ 最新（V1.3.0）のPulze Editorでご使用ください。</p>
                      <p>※ 最新（V1.1.0）の Pulze Updater を使用してのアップデートをお勧めします。</p>
                    </div>

                    <div className="space-y-2">
                      <p className="font-bold text-gray-800">新しいエフェクト</p>
                      <div className="space-y-3 text-sm text-gray-700">
                        <div className="flex gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs">1</span>
                          <div>
                            <p>PREモジュールに 3つの新しいモデルが追加されました。</p>
                            <p className="ml-4">Noble OD – Nobels® ODR-1※ ペダルをベースにしています。</p>
                            <p className="ml-4">Bass OD4 – Tech 21® SansAmp® Bass Driver DI※ ペダルをベースにしています。</p>
                            <p className="ml-4">ベースプリ – Aguilar® Tone Hammer®※ ペダルをベースにしています。</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs">2</span>
                          <div>
                            <p>新しいリバーブ モデルが FX2モジュールに追加されました。</p>
                            <p className="ml-4">Linings – 巨大で豊かなリバーブ効果です。</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium">
                      <Download className="w-4 h-4" />ダウンロードはこちら
                    </a>
                  </div>
                )}
              </div>

              <div className="bg-gray-300 rounded-lg overflow-hidden self-start">
                <button onClick={() => toggleSoftware("mobile130")} className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-400/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600">🖥️</span>
                    <span className="font-medium text-gray-800">PULZE Mobile app 1.3.0</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${expandedSoftware.mobile130 ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.mobile130 && (
                  <div className="px-4 py-4 bg-gray-200 border-t border-gray-300 space-y-4">
                    <Image
                      src="/images/brands/hotone/PULZE_eclipse/software_02.png"
                      alt="PULZE Mobile app 1.3.0"
                      width={500}
                      height={300}
                      className="w-full h-auto rounded-lg"
                    />
                    
                    <div className="space-y-2">
                      <p className="font-bold text-gray-800">PULZE Editor モバイルソフトウェア　リリースノート</p>
                      <p className="text-sm text-gray-700">Version 1.3.0　Released 1/02/2025</p>
                    </div>

                    <p className="text-sm text-gray-700">※ 最新（V1.3.1）のPulzeファームウェアでのご使用をお勧めします。</p>

                    <div className="space-y-2">
                      <p className="font-bold text-gray-800">改善、変更、バグ修正など</p>
                      <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs">1</span>
                          <p>ファームウェア V1.3.1 のサポートが追加されました。</p>
                        </div>
                        <div className="flex gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs">2</span>
                          <p>その他の軽微なバグ修正を完了</p>
                        </div>
                      </div>
                    </div>

                    <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium">
                      <Download className="w-4 h-4" />ダウンロードはこちら
                    </a>
                  </div>
                )}
              </div>

              {/* Row 3 */}
              <div className="bg-gray-300 rounded-lg overflow-hidden self-start">
                <button onClick={() => toggleSoftware("updater110")} className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-400/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600">🖥️</span>
                    <span className="font-medium text-gray-800">PULZE Updater 1.1.0</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${expandedSoftware.updater110 ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.updater110 && (
                  <div className="px-4 py-4 bg-gray-200 border-t border-gray-300 space-y-4">
                    <Image
                      src="/images/brands/hotone/PULZE_eclipse/software_02.png"
                      alt="PULZE Updater 1.1.0"
                      width={500}
                      height={300}
                      className="w-full h-auto rounded-lg"
                    />
                    
                    <div className="space-y-2">
                      <p className="font-bold text-gray-800">PULZE アップデーター　リリースノート</p>
                      <p className="text-sm text-gray-700">Version 1.1.0　Released 1/02/2025</p>
                    </div>

                    <div className="space-y-2">
                      <p className="font-bold text-gray-800">改善、変更、バグ修正など</p>
                      <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs">1</span>
                          <p>ファームウェア V1.3.1 のサポートが追加されました。</p>
                        </div>
                        <div className="flex gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs">2</span>
                          <p>その他の軽微なバグ修正を完了</p>
                        </div>
                      </div>
                    </div>

                    <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium">
                      <Download className="w-4 h-4" />ダウンロードはこちら
                    </a>

                    <p className="text-xs text-gray-600">
                      ※ Product TypeからAmplifier / Pulzeを選び、「Pulze USB Updater（Windows または Mac）」をダウンロードください。メーカーサイトの表記が「V1.0.0」と誤っておりますが、V1.1.0がダウンロードされます。
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-gray-300 rounded-lg overflow-hidden self-start">
                <button onClick={() => toggleSoftware("fw120")} className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-400/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600">🖥️</span>
                    <span className="font-medium text-gray-800">PULZE Firmware 1.2.0</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${expandedSoftware.fw120 ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.fw120 && (
                  <div className="px-4 py-4 bg-gray-200 border-t border-gray-300 space-y-4">
                    <Image
                      src="/images/brands/hotone/PULZE_eclipse/software_03.png"
                      alt="PULZE Firmware 1.2.0"
                      width={500}
                      height={300}
                      className="w-full h-auto rounded-lg"
                    />
                    
                    <div className="space-y-2">
                      <p className="font-bold text-gray-800">PULZE ファームウェアのリリースノート</p>
                      <p className="text-sm text-gray-700">Version 1.2.0　Released 7/18/2024</p>
                    </div>

                    <div className="space-y-2 text-sm text-gray-700">
                      <p>最新のファームウェアをアップデートして、Pulze エクスペリエンスをアップグレードしてください。最新のファームウェアとソフトウェアはHotone Webサイトから入手できます。</p>
                      <p>このアップデートでは、ファクトリートーンを最適化し、再構成しました。それらを調べるために、必要に応じて工場出荷時設定にリセットすることができます（まず、以前に保存したトーンをバックアップしてください）。</p>
                      <p>※ 最新（V1.1.0）のPulze Editorでご使用ください。</p>
                    </div>

                    <div className="space-y-2">
                      <p className="font-bold text-gray-800">新しいエフェクト</p>
                      <div className="space-y-3 text-sm text-gray-700">
                        <div className="flex gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs">1</span>
                          <p>AMP モジュールに3つの新しいアンプモデルを追加：Tang A30 Clean/Drive – Orange® AD30　* Marshell Blues – Marshall® 1958アンプヘッドがベース</p>
                        </div>
                        <div className="flex gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs">2</span>
                          <p>DYN/PREモジュールに追加された新しいブーストモデル：Boost 5 – Fortin® Grind* ペダルに基づいたブースト</p>
                        </div>
                        <div className="flex gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs">3</span>
                          <p>PRE モジュールに3つの新しいドライブモデルが追加されました。　TaiChi – Hermida® Zendrive®ペダルがベースです。　B-Breaker – Marshall® Bluesbreakペダルがベースです。Cruncher – MI Audio® Crunch Box®ペダルがベースです。</p>
                        </div>
                        <div className="flex gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs">4</span>
                          <p>PRE、EQ/MOD、FX1モジュールに新しいフィルター モデルを追加：パターン – 8 ステップのパターンフィルター</p>
                        </div>
                        <div className="flex gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs">5</span>
                          <p>DLYモジュールに追加された新しいディレイモデル：Multi Tap – マルチヘッド テープ エコーユニットをシミュレートします。</p>
                        </div>
                      </div>
                    </div>

                    <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium">
                      <Download className="w-4 h-4" />ダウンロードはこちら
                    </a>

                    <p className="text-xs text-gray-600">
                      ※ 記載のメーカー名、商品名は各社の商標または登録商標です。商標は、この製品のサウンドキャラクターを識別するためにのみ使用されています。
                    </p>

                    <div className="space-y-2">
                      <p className="font-bold text-gray-800">改善、変更、バグ修正など</p>
                      <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs">1</span>
                          <p>最適化され再構成されたファクトリートーン</p>
                        </div>
                        <div className="flex gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs">2</span>
                          <p>アーティストトーンを追加</p>
                        </div>
                        <div className="flex gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs">3</span>
                          <p>マイナーな改善とバグ修正</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Row 4 */}
              <div className="bg-gray-300 rounded-lg overflow-hidden self-start">
                <button onClick={() => toggleSoftware("mobile110")} className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-400/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600">🖥️</span>
                    <span className="font-medium text-gray-800">PULZE Mobile app 1.1.0</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${expandedSoftware.mobile110 ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.mobile110 && (
                  <div className="px-4 py-4 bg-gray-200 border-t border-gray-300 space-y-4">
                    <Image
                      src="/images/brands/hotone/PULZE_eclipse/software_06.jpg"
                      alt="PULZE Mobile app 1.1.0"
                      width={500}
                      height={300}
                      className="w-full h-auto rounded-lg"
                    />
                    
                    <div className="space-y-2">
                      <p className="font-bold text-gray-800">PULZE Editor モバイルソフトウェア　リリースノート</p>
                      <p className="text-sm text-gray-700">Version 1.1.0　Released 7/18/2024</p>
                    </div>

                    <p className="text-sm text-gray-700">
                      ※ 最新（V1.1.2）のPulzeファームウェアでのご使用をお勧めします。
                    </p>

                    <div className="space-y-2">
                      <p className="font-bold text-gray-800">改善、変更、バグ修正など</p>
                      <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs">1</span>
                          <p>ファームウェア V1.1.2 のサポートが追加されました。</p>
                        </div>
                        <div className="flex gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs">2</span>
                          <p>その他の軽微なバグ修正</p>
                        </div>
                      </div>
                    </div>

                    <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium">
                      <Download className="w-4 h-4" />ダウンロードはこちら
                    </a>
                  </div>
                )}
              </div>

              <div className="bg-gray-300 rounded-lg overflow-hidden self-start">
                <button onClick={() => toggleSoftware("fw108")} className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-400/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600">🖥️</span>
                    <span className="font-medium text-gray-800">PULZE Firmware 1.0.8 & Mobile app 1.0.2</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${expandedSoftware.fw108 ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.fw108 && (
                  <div className="px-4 py-4 bg-gray-200 border-t border-gray-300 space-y-4">
                    <Image
                      src="/images/brands/hotone/PULZE_eclipse/software_08.jpg"
                      alt="PULZE Firmware 1.0.8 & Mobile app 1.0.2"
                      width={500}
                      height={300}
                      className="w-full h-auto rounded-lg"
                    />
                    
                    <div className="space-y-2">
                      <p className="font-bold text-gray-800">PULZE ファームウェアのリリースノート</p>
                      <p className="text-sm text-gray-700">Version 1.0.8　Released 4/24/2024</p>
                    </div>

                    <div className="space-y-2">
                      <p className="font-bold text-gray-800">重要なお知らせ</p>
                      <p className="text-sm text-gray-700">最新（V1.0.2）のPulze Editorでご利用ください。</p>
                    </div>

                    <div className="space-y-2">
                      <p className="font-bold text-gray-800">新しいエフェクト</p>
                      <div className="space-y-3 text-sm text-gray-700">
                        <div className="flex gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs">1</span>
                          <div>
                            <p>3つの新しいアンプ モデルが AMP モジュールに追加されました。</p>
                            <p className="mt-1">Petrus Clean/Crunch/Lead – 最新のモデリング技術を使用したMesa/Boogie® JP-2C™* アンプヘッドをベースにしています。</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs">2</span>
                          <div>
                            <p>新しいブーストモデルが DYN/DRV モジュールに追加されました。</p>
                            <p className="mt-1">Boost 4 – Horizon Devices® Precision Drive* ペダルをベースにしています。</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs">3</span>
                          <div>
                            <p>新しいディレイモデルが DLYモジュールに追加されました。</p>
                            <p className="mt-1">Icy Dly – ピッチシフトされたオーディオスライスを備えた特別なディレイエフェクトです。</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="font-bold text-gray-800">アップデートの内容</p>
                      <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs">1</span>
                          <p>EQモジュールをEQ/MODモジュールに更新し、モジュレーション/ピッチ/フィルターエフェクトを追加</p>
                        </div>
                        <div className="flex gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs">2</span>
                          <p>ドラムリズムの異常な問題を修正しました</p>
                        </div>
                        <div className="flex gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs">3</span>
                          <p>その他の小さな改善とバグ修正</p>
                        </div>
                      </div>
                    </div>

                    <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium">
                      <Download className="w-4 h-4" />ダウンロードはこちら
                    </a>
                  </div>
                )}
              </div>

              {/* Row 5 */}
              <div className="bg-gray-300 rounded-lg overflow-hidden self-start">
                <button onClick={() => toggleSoftware("pulzeFw")} className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-400/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600">🖥️</span>
                    <span className="font-medium text-gray-800">Pulze Firmware</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${expandedSoftware.pulzeFw ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.pulzeFw && (
                  <div className="px-4 py-4 bg-gray-200 border-t border-gray-300 space-y-4">
                    <p className="text-sm text-gray-700">
                      HOTONE メーカーサイトより直接ダウンロードが開始されます。
                    </p>

                    <a href="#" className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium">
                      <Download className="w-4 h-4" />PULZE FIRMWARE V1.0.6
                    </a>
                  </div>
                )}
              </div>

              <div className="bg-gray-300 rounded-lg overflow-hidden self-start">
                <button onClick={() => toggleSoftware("pulzeSw")} className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-400/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600">🖥️</span>
                    <span className="font-medium text-gray-800">Pulze Software</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${expandedSoftware.pulzeSw ? 'rotate-180' : ''}`} />
                </button>
                {expandedSoftware.pulzeSw && (
                  <div className="px-4 py-4 bg-gray-200 border-t border-gray-300 space-y-4">
                    <p className="text-sm text-gray-700">
                      HOTONE メーカーサイトより直接ダウンロードが開始されます。
                    </p>

                    <div className="space-y-3">
                      <a href="#" className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium">
                        <Download className="w-4 h-4" />PULZE APP for Android
                      </a>
                      <a href="#" className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium">
                        <Download className="w-4 h-4" />PULZE APP for iOS
                      </a>
                      <a href="#" className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium">
                        <Download className="w-4 h-4" />PULZE USB Updater for Windows / Mac V1.0.0
                      </a>
                      <a href="#" className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium">
                        <Download className="w-4 h-4" />HOTONE Generic USB ASIO Driver V5.57.0 SETUP
                      </a>
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
              <div className="space-y-3 text-sm text-gray-700">
                <p><span className="font-medium">周波数レンジ：</span>20Hz - 20kHz</p>
                <p><span className="font-medium">搭載スピーカー：</span>2 x 3.5&quot; カスタム・フルレンジ・スピーカー</p>
                <p><span className="font-medium">パワーアンプ：</span>Class D ステレオ・パワーアンプ 30W出力（15W+15W、1% THD）</p>
                <p><span className="font-medium">デジタル・オーディオ・プロセッシング：</span>24-bit、44.1kHz</p>
                <p><span className="font-medium">エフェクトモジュール数：</span>7</p>
                <p><span className="font-medium">エフェクト数：</span>177（Global EQを含む）</p>
                <p><span className="font-medium">トーン（プリセット）：</span>最大200 トーン</p>
                <p><span className="font-medium">ドラムマシーン・</span>100リズムパターン＆メトロノーム</p>
                <p><span className="font-medium">Bluetooth®：</span>5.0デュアルモード（BLE & audio）& Bluetooth® MIDI</p>
                <div className="flex items-center gap-3 pt-2">
                  <span className="font-medium">TELEC 認証：</span>
                  <span>R220-JP6808</span>
                  <div className="inline-flex items-center border border-gray-400 rounded px-2 py-0.5 text-xs">
                    <span className="mr-1">⭕</span>R220-JP6808
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <p><span className="font-medium">入力：</span>1/4&quot; Tip Sleeve (TS) インストルメント入力</p>
                  <p className="pl-12">1/8&quot; ステレオAuxiliary In (Aux In) 入力</p>
                </div>
                <p><span className="font-medium">出力：</span>1/8&quot; ステレオ・ヘッドフォン・ジャック</p>
                <p><span className="font-medium">スクリーン：</span>4インチ 800 x 480 カラー・ダイナミック・ディスプレイ（タッチスクリーン）</p>
                <p><span className="font-medium">USBポート：</span>USB 2.0 Type-C port, supports USB Audio 2.0</p>
                <p><span className="font-medium">USBオーディオ：</span>2-in/2-out USB オーディオ・インターフェイス（loopback & reampをサポート）</p>
                <p><span className="font-medium">IR プロセッシング：</span>24-bit / 44.1kHz Mono WAV ファイル、1024 points：最大20 user IR</p>
                <p><span className="font-medium">電源仕様：</span>18V DC Center Positive</p>
                <p><span className="font-medium">消費電流：</span>2A</p>
                <p><span className="font-medium">サイズ：</span>455mm（W）x 161mm（D）x 171mm（H）</p>
                <p><span className="font-medium">重量：</span>3.8kg</p>
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

