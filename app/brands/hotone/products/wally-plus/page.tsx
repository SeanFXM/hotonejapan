"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, ChevronDown } from 'lucide-react'
import { BlogSlider } from "@/components/blog-slider"
import { downloadManual } from "@/lib/manual-download"

type Section = "concept" | "demo" | "control" | "software" | "specs"

const navigationItems = [
  { id: "concept" as Section, label: "コンセプト" },
  { id: "demo" as Section, label: "デモムービー" },
  { id: "control" as Section, label: "コントロール" },
  { id: "software" as Section, label: "ソフトウェア" },
  { id: "manual" as Section, label: "取扱説明書", isDownload: true },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function WallyPlusPage() {
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
    downloadManual("hotone", "wally-plus")
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
          src="/images/brands/hotone/wally+/hero.jpg"
          alt="WALLY+"
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
                <p className="text-2xl font-bold text-gray-900">WALLY+</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">ループ・ステーション</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-hotone">¥12,980</p>
                <p className="text-xs text-gray-500">前後（税込）</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">6959473900291</p>
              </div>

              <div className="pt-2">
                <p className="text-base font-bold text-gray-900">生産完了品</p>
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
              item.isDownload ? (
                <button
                  key={item.id}
                  onClick={handleManualDownload}
                  className="relative px-4 py-2 text-base font-medium transition-colors duration-200 whitespace-nowrap text-gray-500 hover:text-gray-700 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  {item.label}
                </button>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id as Section)}
                  className={`relative px-4 py-2 text-base font-medium transition-colors duration-200 whitespace-nowrap ${
                    activeSection === item.id ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.label}
                  </span>
                  {activeSection === item.id && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-200 hotone-nav-indicator"
                    />
                  )}
                </button>
              )
            ))}
          </div>
        </div>
      </nav>

      {/* Concept Section */}
      <section id="concept" className="py-20 scroll-mt-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              24-bit 高音質レコーディング＆USB転送
            </h2>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              11バンクへの保存もできる超小型ルーパー
            </h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Image */}
            <div>
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src="/images/brands/hotone/wally+/intro.jpg"
                  alt="WALLY+"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Right Column - Description */}
            <div className="space-y-6">
              <p className="text-sm text-gray-500 uppercase tracking-wider">hotone binary amp</p>
              <p className="text-gray-700 leading-relaxed">
                超小型ルーパー「WALLY」のウルトラ進化版「WALLY+」の登場です。SAVEボタンを追加し、11箇所のメモリーバンクへ簡単に録音できるようにしました。録音したループ（WAVフォーマット）は、USB経由でPCへアップロード＆ダウンロードが可能です。バンド音源やリズムトラックをアップロードして持ち歩くこともできます。
              </p>
              <p className="text-gray-700 leading-relaxed">
                24-bit 44.1kHzの高音質で、各バンク30分のロングレコーディングタイム（トータル330分）とサイズからは信じられないスペックを実現しました。
              </p>
              
              {/* Feature List */}
              <div className="space-y-3 pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-700 text-sm">24-bit 44.1kHz 高音質レコーディング＆プレイバック</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-700 text-sm">11バンクからポジションを決めてSAVEボタンで簡単保存</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-700 text-sm">ビッグ・ノブ選べる11バンク・メモリー・ポジション</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-700 text-sm">8GBのビッグ・メモリー</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-700 text-sm">最長全レコーディング・タイム：330 分（各バンク最長タイム：30分）</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-700 text-sm">USB経由のインポート＆エクスポートが可能</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-700 text-sm">PC & Mac用 専用フリー・アプリ</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-700 text-sm">ループ再生時のテンポ＆ボリュームが調整可能</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-700 text-sm">動作や状態を表示する「STATE LED」搭載</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-700 text-sm">トゥルー・バイパス仕様さまざまな楽器の入力レベル、インピーダンスに対応するインプット</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-700 text-sm">SMTを採用しウルトラ・コンパクトで超低ノイズ・スペックを実現</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-700 text-sm">亜鉛ダイキャスト製シャーシ</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-700 text-sm">ON / OFFフット・スイッチィング誤動作バンパー</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Movie Section */}
      <section id="demo" className="py-20 scroll-mt-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">デモムービー</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="max-w-6xl mx-auto space-y-6">
            {/* First video */}
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/Zxmqzy-URLs"
                title="WALLY+ Demo 1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            {/* Second video */}
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/gXRue-7frUY"
                title="WALLY+ Demo 2"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Control Section */}
      <section id="control" className="py-20 scroll-mt-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">コントロール</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="space-y-8">
              {/* Top Panel Image */}
              <div className="flex justify-center">
                <Image
                  src="/images/brands/hotone/wally+/control_01.png"
                  alt="WALLY+ Top Panel"
                  width={1200}
                  height={1200}
                  className="h-auto rounded-lg"
                />
              </div>

              {/* Control Descriptions - Top Panel */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {/* PHRASE */}
                <div className="space-y-2">
                  <div className="inline-block bg-gray-300 px-4 py-1.5 rounded-full">
                    <span className="text-sm font-semibold text-gray-800">⚙ PHRASE</span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    使用する録音バンクを選択します（合計11バンク）。
                  </p>
                </div>

                {/* SAVE */}
                <div className="space-y-2">
                  <div className="inline-block bg-gray-300 px-4 py-1.5 rounded-full">
                    <span className="text-sm font-semibold text-gray-800">◉ SAVE</span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    停止中にSAVEボタンを長押しすると、SAVEボタンのLEDが短く点滅し、データが保存されます。録音された音声はメモリーに保存され、電源を落とした後も残ります。しかし、バンクに予め保存されたデータにはミックス保存はされません。（SAVEボタンを使用して保存したデータは、USB経由でLoop StudioソフトウェアにインポートしPC上にWAVデータで保存できます。）
                  </p>
                </div>

                {/* TEMPO */}
                <div className="space-y-2">
                  <div className="inline-block bg-gray-300 px-4 py-1.5 rounded-full">
                    <span className="text-sm font-semibold text-gray-800">⚙ TEMPO</span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    ループの再生スピード（テンポ）を調整します。
                  </p>
                  <ul className="text-gray-600 text-sm space-y-1 pl-4">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400">≡</span>
                      <span>中央（クリック）の位置で従来のスピード</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400">≡</span>
                      <span>左に回すと再生速度が低下。速度に伴いピッチも下がります。最大時で半分のスピード（1オクターブ下で再生）。</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400">≡</span>
                      <span>右に回すと再生速度が低下。速度に伴いピッチも上がります。最大時で倍のスピード（1オクターブ上で再生）。</span>
                    </li>
                  </ul>
                </div>

                {/* POWER */}
                <div className="space-y-2">
                  <div className="inline-block bg-gray-300 px-4 py-1.5 rounded-full">
                    <span className="text-sm font-semibold text-gray-800">⚡ POWER</span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    本機は、9VDC 電源アダプター専用です。プラグはセンター・マイナスの5.5 x 2.1mm をご使用ください。
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    スイッチング方式を用いたアダプターをご使用の場合、アダプターによってはノイズが出る場合があります。 トランスを使用した安定化電源方式のアダプターを推奨します。
                  </p>
                </div>

                {/* VOLUME */}
                <div className="space-y-2">
                  <div className="inline-block bg-gray-300 px-4 py-1.5 rounded-full">
                    <span className="text-sm font-semibold text-gray-800">⚙ VOLUME</span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    バンクに保存されているループの再生音量を調整できます。
                  </p>
                </div>
              </div>

              {/* Separator */}
              <div className="border-t border-gray-300 pt-8">
                {/* Back Panel Images */}
                <div className="flex justify-center gap-8">
                  <Image
                    src="/images/brands/hotone/wally+/control_02.png"
                    alt="WALLY+ Back Panel"
                    width={800}
                    height={400}
                    className="h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Software Section */}
      <section id="software" className="py-20 scroll-mt-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">ソフトウェア</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Main Content - Image Left, Description Right */}
            <div className="bg-gray-100 rounded-xl p-8 mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div>
                  <Image
                    src="/images/brands/hotone/wally+/software_01.jpg"
                    alt="Loop Studio Software"
                    width={600}
                    height={450}
                    className="w-full rounded-lg"
                  />
                </div>
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">Loop Studio</h3>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    フリーソフトウェア「Loop Studio」を使用すると、WALLY+の各バンクに保存された録音データをパソコンに取り込んだり、パソコン内のデータをWALLY+へ書き出すことができます。
                  </p>

                  {/* Import Section */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-900">Import（インポート）：パソコン内のデータをWALLY+へ取り込む。</h4>
                    <ol className="text-gray-700 text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-5 h-5 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                        <span>WALLY+とコンピューターをUSBケーブル（USB – USB-miniケーブル / 付属）で接続します。</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-5 h-5 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                        <span>初めて接続した時は、ドライバーが自動インストールされます。</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-5 h-5 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                        <span>Loop Studioソフトウェアを起動すると、現保存データのリストが表示されます。</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-5 h-5 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                        <span>データを転送したいバンクをクリックして色を反転させ、「Import」をクリックします。</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-5 h-5 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
                        <span>ブラウジング画面でファイルを選択すると、PCからWALLY+へ転送が始まります。</span>
                      </li>
                    </ol>
                  </div>

                  {/* Export Section */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-900">Export（エクスポート）：WALLY+内のデータをパソコンへ書き出す。</h4>
                    <ol className="text-gray-700 text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-5 h-5 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                        <span>WALLY+とコンピューターをUSBケーブル（USB – USB-miniケーブル / 付属）で接続します。</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-5 h-5 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                        <span>初めて接続した時は、ドライバーが自動インストールされます。</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-5 h-5 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                        <span>Loop Studioソフトウェアを起動すると、現保存データのリストが表示されます。</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-5 h-5 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                        <span>データを転送したいバンクをクリックして色を反転させ、「Export」をクリックします。</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-5 h-5 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
                        <span>ブラウジング画面で保存先を選択すると転送が始まります。保存形式は.WAVです。</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            {/* Installation Guide */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Loop Studio インストールガイド</h3>
              <h4 className="font-bold text-gray-800 mb-3">ダウンロード（フリー）</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                ダウンロードはHOTONEメーカーサイトに移動し、「LoopStudio」のタブをクリックしてください。LoopStudioは、お使いのOS（Windows版 / macOS版）に合ったインストーラーをダウンロードしてください。ダウンロードしたファイルを解凍し、画面に従ってLoopStudioをインストールを行います。
              </p>
              <div className="text-gray-500 text-xs space-y-1 mb-6">
                <p>※ 接続にはUSB – USB-miniケーブル（付属）を使用します。</p>
                <p>※ 新たなアルゴリズム・ライブラリーのアップデートにはネット環境が必要です。</p>
              </div>
              <a 
                href="https://www.hotoneaudio.com/support/downloads/" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
              >
                <Download className="w-5 h-5" />
                ダウンロードページ
              </a>
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
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h3 className="text-base font-bold text-gray-900 mb-4 border-b border-gray-900 pb-2">
                入出力、その他
              </h3>
              <div className="space-y-0">
                <div className="py-3 border-b border-gray-200">
                  <p className="text-gray-700 text-sm">最長ループタイム：各バンク30分（330分トータル）</p>
                </div>
                <div className="py-3 border-b border-gray-200">
                  <p className="text-gray-700 text-sm">最大オーバーダブ回数：∞</p>
                </div>
                <div className="py-3 border-b border-gray-200">
                  <p className="text-gray-700 text-sm">メモリー：8GB</p>
                </div>
                <div className="py-3 border-b border-gray-200">
                  <p className="text-gray-700 text-sm">消費電流：100mA</p>
                </div>
                <div className="py-3 border-b border-gray-200">
                  <p className="text-gray-700 text-sm">サイズ：D70 x W44 x H44 mm</p>
                </div>
                <div className="py-3 border-b border-gray-200">
                  <p className="text-gray-700 text-sm">重量：190g</p>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-gray-500 text-xs">※製品の仕様及びデザインは改良のため予告なく変更することがあります。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Slider */}
      <BlogSlider />

      {/* Back to Products Button */}
      <div className="container mx-auto px-6 py-12 bg-white">
        <a
          href="/brands/hotone"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-colors rounded-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          製品一覧に戻る
        </a>
      </div>

    </div>
  )
}
