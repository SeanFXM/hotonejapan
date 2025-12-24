"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, ChevronDown, ChevronUp, Download } from 'lucide-react'
import { BlogSlider } from "@/components/blog-slider"
import { downloadManual } from "@/lib/manual-download"

type Section = "concept" | "demo" | "controls" | "connections" | "software" | "manual" | "specs"

const navigationItems = [
  { id: "concept" as Section, label: "コンセプト" },
  { id: "demo" as Section, label: "デモムービー" },
  { id: "features" as Section, label: "主な機能", disabled: true },
  { id: "controls" as Section, label: "コントロール" },
  { id: "connections" as Section, label: "接続例" },
  { id: "software" as Section, label: "ソフトウェア" },
  { id: "manual" as Section, label: "取扱説明書", isDownload: true },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function PulzeControlPage() {
  const [activeSection, setActiveSection] = useState<Section>("concept")
  const [headerHeight, setHeaderHeight] = useState(72)

  const scrollToSection = (sectionId: Section) => {
    const navItem = navigationItems.find(item => item.id === sectionId)
    if (navItem?.isDownload) {
      window.open("https://www.hotone.com/support/3", "_blank")
      return
    }

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
      const sections = navigationItems.filter(item => !item.disabled).map((item) => item.id)
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
      <section className="relative w-full h-[600px] overflow-hidden bg-gray-100">
        <img
          src="/images/brands/hotone/pulze-control/pulzecontrol_main.jpg"
          alt="PULZE CONTROL"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

        <div className="relative container mx-auto px-6 h-full flex items-center justify-end">
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-white/30 w-96">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 tracking-wider">HOTONE</h1>
            </div>

            <div className="space-y-4 text-gray-900">
              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">製品名：</p>
                <p className="text-2xl font-bold text-gray-900">PULZE CONTROL（EC-2）</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">ワイヤレス MIDI コントローラー</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-hotone">
                  ¥10,450
                </p>
                <p className="text-xs text-gray-500">前後（税込）</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">6959473908068</p>
              </div>
            </div>

            <div className="mt-6">
              <a
                href="https://hotmusic.jp/collections/hotone/products/hotone-verbera"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  className="w-full text-white text-base py-6 flex items-center justify-center gap-2 btn-hotone"
                >
                  <ShoppingCart className="w-5 h-5" />
                  購入する
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Bar */}
      <nav
        className="sticky z-[90] bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-md"
        style={{ top: `${headerHeight}px` }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-8 overflow-x-auto py-4 scrollbar-hide">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => !item.disabled && scrollToSection(item.id)}
                disabled={item.disabled}
                className={`relative px-4 py-2 text-base font-medium transition-colors duration-200 whitespace-nowrap ${
                  item.disabled
                    ? "text-gray-400 cursor-not-allowed"
                    : activeSection === item.id
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {item.label}
                {activeSection === item.id && !item.disabled && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-200 hotone-nav-indicator"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content Sections */}
      <div className="bg-gray-50">
        {/* Introduction Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Wireless MIDI Controller
              </h2>
              <p className="text-2xl text-gray-700">スマート&コンパクトなMIDIコントローラー</p>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 rounded-full bg-gradient-to-r from-purple-600 to-red-600" />
              </div>
            </div>

            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                {/* Left: Video */}
                <div className="space-y-6">
                  <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/MiUDa0y3tq0"
                      title="HOTONE PULZE Control Product Introduction"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">関連情報</h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => scrollToSection("software")}
                        className="flex items-start gap-2 text-gray-700 hover:text-orange-600 transition-colors group w-full text-left"
                      >
                        <svg className="w-4 h-4 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="group-hover:underline whitespace-nowrap overflow-hidden text-ellipsis">
                          「ページターン機能」が追加されたファームウェアとモバイルアプリを公開
                        </span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors group">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        <span className="group-hover:underline">PULZE 製品情報</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right: Description */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      PULZE スピーカー・MIDIコントローラー＆More！
                    </h3>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        PULZE
                        スピーカーのポテンシャルを最大限に引き出し、エフェクトペダルのように簡単にコントロールできる、PULZE
                        CONTROLワイヤレススマートMIDIコントローラー（*型番 EC-2）を開発しました。
                      </p>
                      <p>
                        従来のHotone
                        MIDIコントローラーとは異なり、PULZE
                        CONTROLはホストモードとクライアントモードの両方をサポートし、PULZEやAmpero II
                        Stageなどのデバイスに直接ワイヤレス接続できるため非常に便利です。
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      "超コンパクトな2フットスイッチ搭載のワイヤレスMIDIコントローラー",
                      "多様なフットスイッチトリガーアクションで、柔軟なスイッチングと多様な用途に対応",
                      "有線および無線MIDI出力に対応",
                      "PULZE アンプなどの機器をコントロールできるサーバーモード",
                      "1つのフットスイッチで最大16個のMIDIメッセージを送信可能（A/Bグループの場合は32個）",
                      "専用モバイルアプリで、コントローラーの設定を瞬時に簡単に実行",
                      "MIDIワールドに簡単にアクセスするための様々なモード（アプリで利用可能）",
                      "外部フットスイッチ/エクスプレッションペダルを接続したり、MIDI出力として使用したりするためのCTRL/MIDI TRSジャック",
                      "最大12時間のバッテリー駆動時間を誇る内蔵バッテリー",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Concept Section */}
        <section id="concept" className="scroll-mt-24 py-16 bg-concept-dark">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">製品コンセプト</h2>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 rounded-full bg-gradient-to-r from-purple-600 to-red-600" />
              </div>
            </div>

            <div className="space-y-20">
              {/* 1. サイズを超えたパワフルなMIDIコマンドセンター */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <img
                    src="/images/brands/hotone/pulze-control/feature_1.jpg"
                    alt="PULZE CONTROL Front View"
                    className="w-full rounded-xl shadow-2xl"
                  />
                </div>
                <div className="order-1 lg:order-2">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    サイズを超えたパワフルなMIDIコマンドセンター
                  </h3>
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p>
                      PULZE CONTROLは、PC（プログラムチェンジ）、CC（コントロールチェンジ）、ノートオン、ノートオフの4種類のMIDIメッセージに対応しています。MIDIメッセージは、1/4インチ（6.35mm）TRSジャック、USBポート、またはワイヤレスで送信できます。各フットスイッチには最大16個のMIDIメッセージ（A/Bグループ使用時は最大32個）を割り当てることができ、様々なオペレーションシナリオに合わせて様々なトリガーオプションも選択できます。
                    </p>
                    <p>
                      ※ Pulze ControlはUSB-HOSTとしての機能がありません。USBを装備したエフェクターをMIDIでコントロールする場合は、モバイルデバイスのMIDIブリッジングアプリ+OTGケーブルの中継が必要です。
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. 簡単！ モバイルアプリからモードを選択 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">
                    簡単！ モバイルアプリからモードを選択
                  </h3>
                  <div className="space-y-6 text-gray-300 leading-relaxed">
                    <p>
                      PULZE CONTROLは、AndroidとiOSに対応した専用モバイルアプリに対応しており、様々なユーザーフレンドリーなモードを用意しました。
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-white mb-1">シンプルモード：</p>
                          <p>Pulze、Ampero、その他の対応デバイス向けにあらかじめ設定されたセッティング。必要なモードを選択するだけですぐに使えます！</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-white mb-1">プロモード：</p>
                          <p>
                            フットスイッチの機能、トリガー方法、MIDIメッセージ、CTRL/MIDIジャックの設定など、あらゆる詳細をカスタマイズできます（カスタマイズの詳細については、ユーザーマニュアルをご覧ください）。
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <img
                    src="/images/brands/hotone/pulze-control/feature_2.png"
                    alt="Mobile App Interface"
                    className="w-full rounded-xl shadow-2xl"
                  />
                </div>
              </div>

              {/* 3. 内蔵リチウムバッテリーで長時間使用が可能 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <img
                    src="/images/brands/hotone/pulze-control/feature_3.png"
                    alt="Battery Life"
                    className="w-full rounded-xl shadow-2xl"
                  />
                </div>
                <div className="order-1 lg:order-2">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    内蔵リチウムバッテリーで長時間使用が可能
                  </h3>
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p>
                      PULZE CONTROLはUSB経由で充電可能なリチウムバッテリーを内蔵しており、フル充電で最大12時間の連続使用が可能です。
                    </p>
                    <p>
                      *このデータは当社のテスト結果に基づいています。実際のパフォーマンスは、使用条件によって異なる場合があります。
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. 多用途に対応するCTRL/MIDIジャック */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">
                    多用途に対応するCTRL/MIDIジャック
                  </h3>
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p>
                      CTRL/MIDIジャックは、エクスプレッションペダルやモーメンタリーフットスイッチが接続できるほか、TRS MIDI出力としても機能します。外部デバイスを接続&設定するだけで、エクスプレッションペダルや2つのMIDIフットスイッチを接続できるなど、コントロールオプションが広がります。
                    </p>
                  </div>
                </div>
                <div>
                  <img
                    src="/images/brands/hotone/pulze-control/feature_4.jpg"
                    alt="CTRL/MIDI Jack"
                    className="w-full rounded-xl shadow-2xl"
                  />
                </div>
              </div>

              {/* 5. 進化し続けるファームウェア */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <img
                    src="/images/brands/hotone/pulze-control/feature_5.jpg"
                    alt="Firmware Updates"
                    className="w-full rounded-xl shadow-2xl"
                  />
                </div>
                <div className="order-1 lg:order-2">
                  <h3 className="text-2xl font-bold text-white mb-6">進化し続けるファームウェア</h3>
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p>
                      PULZE CONTROLはファームウェアのアップデートに対応しており、新しいバージョンがリリースされるたびにモバイルアプリからワイヤレスでアップグレードできます。アップデートごとに、継続的な改善と新機能を楽しんでいただけます。
                    </p>
                    <p>
                      ※ ファームウェア Ver.1.1.0（2025年9月）より、ページターン機能に対応致しました。
                    </p>
                    <p>
                      詳しくは、 ソフトウェア「Update」をご覧ください。
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
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">デモムービー</h2>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 rounded-full hotone-bar" />
              </div>
            </div>
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Video 1 */}
                <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/C7tevHeCd0A"
                    title="PULZE CONTROL Demo Video 1"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                {/* Video 2 */}
                <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/8MqwdKeApFY"
                    title="PULZE CONTROL Demo Video 2"
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

        {/* Controls Section */}
        <section id="controls" className="py-20 scroll-mt-24 bg-gray-100">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">コントロール</h2>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 rounded-full hotone-bar" />
              </div>
            </div>
            <div className="max-w-5xl mx-auto space-y-12">
              {/* Front View */}
              <div>
                <img
                  src="/images/brands/hotone/pulze-control/control_2.png"
                  alt="PULZE CONTROL Front Panel"
                  className="w-full rounded-xl"
                />
              </div>
              {/* Back View */}
              <div>
                <img
                  src="/images/brands/hotone/pulze-control/control_1.png"
                  alt="PULZE CONTROL Back Panel"
                  className="w-full rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Connections Section */}
        <section id="connections" className="py-20 scroll-mt-24 bg-gray-100">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">接続例</h2>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 rounded-full hotone-bar" />
              </div>
            </div>

            <div className="max-w-5xl mx-auto space-y-20">
              {/* 一般的な使用例 */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">一般的な使用例</h3>
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-1 rounded-full bg-green-500" />
                </div>

                {/* ワイヤレスコントローラーとしての使用 */}
                <div className="mb-12">
                  <h4 className="text-lg font-bold text-gray-800 mb-6">ワイヤレスコントローラーとしての使用</h4>
                  <div className="bg-gray-50 rounded-xl p-6 mb-4">
                    <img
                      src="/images/brands/hotone/pulze-control/connection01.png"
                      alt="Wireless Controller Usage"
                      className="w-full rounded-lg"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Pulzeの接続例</p>
                  <p className="text-gray-700 leading-relaxed">
                    このシナリオでは、ユニットはPulzeなどの特定デバイスにワイヤレスで接続されます。エクスプレッションペダルやモーメンタリーフットスイッチをCTRL/MIDIジャックに接続すると、コントロール機能を拡張できます。PULZE CONTROLアプリの使用で、ワイヤレスコントロールを維持しながらユニットの設定が実行できます。
                  </p>
                </div>

                {/* コンピューターにブルートゥース接続して使用する */}
                <div className="mb-12">
                  <h4 className="text-lg font-bold text-gray-800 mb-6">
                    コンピューターにブルートゥース接続して使用する
                  </h4>
                  <div className="bg-gray-50 rounded-xl p-6 mb-4">
                    <img
                      src="/images/brands/hotone/pulze-control/connection02.png"
                      alt="Computer Bluetooth Connection"
                      className="w-full rounded-lg"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Pulzeの接続例</p>
                  <p className="text-gray-700 leading-relaxed">
                    このシナリオでは、本機はコンピューターにワイヤレスで接続されます。エクスプレッションペダルまたはモーメンタリーフットスイッチをCTRL/MIDIジャックに接続して、コントロール機能を拡張できます。このシナリオでは、初めにPULZE CONTROLアプリから切断してからお使いください。
                  </p>
                </div>

                {/* 有線MIDI コントローラーとして使用する（USB/TRS MIDI入力があるデバイス） */}
                <div className="mb-12">
                  <h4 className="text-lg font-bold text-gray-800 mb-6">
                    有線MIDI コントローラーとして使用する（USB/TRS MIDI入力があるデバイス）
                  </h4>
                  <div className="bg-gray-50 rounded-xl p-6 mb-4">
                    <img
                      src="/images/brands/hotone/pulze-control/connection03.png"
                      alt="TRS MIDI Cable Connection"
                      className="w-full rounded-lg"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Pulzeの接続例</p>
                </div>

                {/* 有線MIDI コントローラーとして使用する（スタンダードMIDI入力のみのデバイス） */}
                <div className="mb-12">
                  <h4 className="text-lg font-bold text-gray-800 mb-6">
                    有線MIDI コントローラーとして使用する（スタンダードMIDI入力のみのデバイス）
                  </h4>
                  <div className="bg-gray-50 rounded-xl p-6 mb-4">
                    <img
                      src="/images/brands/hotone/pulze-control/connection04.png"
                      alt="TRS to 5-pin MIDI Converter"
                      className="w-full rounded-lg"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Pulzeの接続例</p>
                </div>

                {/* MIDI HUB 経由での接続 */}
                <div className="mb-12">
                  <h4 className="text-lg font-bold text-gray-800 mb-6">MIDI HUB 経由での接続</h4>
                  <div className="bg-gray-50 rounded-xl p-6 mb-4">
                    <img
                      src="/images/brands/hotone/pulze-control/connection05.png"
                      alt="MIDI Hub Connection"
                      className="w-full rounded-lg"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Pulzeの接続例</p>
                </div>

                {/* USBケーブルまたはTRS-MIDIケーブルでデバイスに接続 */}
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-6">
                    USBケーブルまたはTRS-MIDIケーブルでデバイスに接続
                  </h4>
                  <div className="bg-gray-50 rounded-xl p-6 mb-4">
                    <img
                      src="/images/brands/hotone/pulze-control/connection06.png"
                      alt="USB/TRS Connection"
                      className="w-full rounded-lg"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Pulzeの接続例</p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    このシナリオでは、ユニットはUSBケーブルまたはTRS-MIDIケーブルでデバイスに接続されます。
                  </p>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 font-bold mt-1">✓</span>
                      <p>
                        デバイスがTRS MIDI入力をサポートしている場合は、TRS MIDIケーブルでデバイスに接続します。接続前にTRS MIDI接続の互換性を確認してください（CTRL/MIDIを参照）。
                  </p>
                </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 font-bold mt-1">✓</span>
                      <p>
                        デバイスが5ピンMIDI入力のみをサポートしている場合は、TRS-5ピンMIDI変換ケーブルでデバイスに接続します。接続前にMIDI変換ケーブルの互換性を確認してください（CTRL/MIDIを参照）。
                      </p>
              </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 font-bold mt-1">✓</span>
                      <p>
                        複数のデバイス（複雑なペダルボードなど）を制御する場合は、TRS MIDI入力の転送をサポートするMIDIハブが必要です。PULZE CONTROLと他のデバイスをMIDIハブに接続し、必要に応じて設定してください。
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 font-bold mt-1">✓</span>
                      <p>
                        ユニットを拡張できるのは、USB経由でコンピューターに接続している場合のみです。PULZE CONTROLアプリを使用して、同時にユニットの設定が可能です。
                      </p>
                    </div>
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
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">ソフトウェア・ダウンロード</h2>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 rounded-full bg-blue-500" />
              </div>
              <p className="text-gray-700 mt-6">
                PULZE CONTROLの各ソフトウェアは、HOTONE メーカーサイトよりダウンロードしていただけます。
              </p>
            </div>

            <div className="max-w-6xl mx-auto space-y-6">
              {/* Software Item 1 - Desktop Software */}
              <SoftwareDownloadCard
                title="Pulze Control Software 1.1.0"
                isNew={true}
                image="/images/brands/hotone/pulze-control/20250918_update.png"
                defaultExpanded={false}
              >
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">
                      Pulze Control　新たなファームウェアと新モバイルアプリのご紹介
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      お待たせしました！　Pulze Control
                      の新ファームウェアV1.1.0と新モバイルアプリV1.1.0がリリースされました！　今回のアップデートでは、ページターンモードによる新たな操作が追加され、さらに安定性とパフォーマンスが向上しました。
                    </p>
                  </div>

                  <div>
                    <h5 className="font-bold text-gray-900 mb-2">【 新機能 】</h5>
                    <div className="space-y-3 text-gray-700">
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-gray-900 mt-0.5">1</span>
                        <p>
                          最高の体験のために、最新のファームウェアバージョン（V1.1.0）の使用を推奨いたします。新しいページターン機能を使用するには、V1.1.0のファームウェアが必要です。
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-gray-900 mt-0.5">2</span>
                        <p>
                          Pulze ControlをV1.1.0のファームウェアにアップデートした後、アプリで検索して接続する前に、システムメニューからPulze Controlとスマートフォン/タブレットをペアリングする必要があります。V1.0.4のファームウェアは、アプリから直接接続できます。
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-gray-900 mt-0.5">3</span>
                        <p>
                          Pulze ControlをV1.1.0ファームウェアにアップデートすると、デバイス名はPulze Control BLEにリセットされ、変更できなくなります。
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-gray-900 mt-0.5">4</span>
                        <p>
                          Pulze ControlをV1.1.0ファームウェアにアップデートした後は、誤動作を防ぐため、以前のファームウェアにダウングレードしないでください。
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-bold text-gray-900 mb-2">【 改善、変更、バグ修正 】</h5>
                    <div className="space-y-2 text-gray-700">
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-gray-900 mt-0.5">1</span>
                        <p>V1.1.0ファームウェアのサポートを追加</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-gray-900 mt-0.5">2</span>
                        <p>ページターンモードを追加（V1.1.0ファームウェアのみ）</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-gray-900 mt-0.5">3</span>
                        <p>その他の軽微なバグ修正</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      Hotoneの公式ウェブサイトから、最新のPulze
                      Controlファームウェアとモバイルアプリをダウンロードしてください。今すぐデバイスをアップデートして、新しいページターンモードを体験し、よりスムーズで信頼性の高いパフォーマンスをお楽しみください。
                    </p>
                    <a
                      href="https://www.hotone.com/support/3"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-base">
                        <Download className="w-5 h-5 mr-2" />
                        ダウンロードはこちら
                      </Button>
                    </a>
                  </div>
                </div>
              </SoftwareDownloadCard>

              {/* Software Item 2 - Android App */}
              <SoftwareDownloadCard
                title="PULZE CONTROL APP for Android"
                isNew={false}
                defaultExpanded={false}
              >
                <div className="py-8">
                  <a
                    href="https://www.hotone.com/support/3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-base">
                      <Download className="w-5 h-5 mr-2" />
                      ダウンロードはこちら
                    </Button>
                  </a>
                </div>
              </SoftwareDownloadCard>
            </div>
          </div>
        </section>

        {/* Specifications Section */}
        <section id="specs" className="py-20 scroll-mt-24 bg-gray-100">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">製品仕様</h2>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />
              </div>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-200">
                  <div className="px-8 py-6 hover:bg-gray-50 transition-colors">
                    <p className="text-gray-900 leading-relaxed">
                      対応エクスプレッションペダル・ポット抵抗値：最大25kΩ
                    </p>
                  </div>
                  
                  <div className="px-8 py-6 hover:bg-gray-50 transition-colors">
                    <p className="text-gray-900 leading-relaxed">
                      電源仕様：内蔵バッテリー（USB Type-C 充電式）
                    </p>
                  </div>
                  
                  <div className="px-8 py-6 hover:bg-gray-50 transition-colors">
                    <p className="text-gray-900 leading-relaxed">
                      バッテリー駆動時間：最大12時間
                    </p>
                  </div>
                  
                  <div className="px-8 py-6 hover:bg-gray-50 transition-colors">
                    <p className="text-gray-900 leading-relaxed">
                      サイズ：102mm（W）x 63.5mm（D）x 47mm（H）
                    </p>
                  </div>
                  
                  <div className="px-8 py-6 hover:bg-gray-50 transition-colors">
                    <p className="text-gray-900 leading-relaxed">
                      重量：215g
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Blog Slider */}
      <BlogSlider />
    </div>
  )
}

interface SoftwareDownloadCardProps {
  title: string
  isNew?: boolean
  image?: string
  children: React.ReactNode
  defaultExpanded?: boolean
}

function SoftwareDownloadCard({
  title,
  isNew = false,
  image,
  children,
  defaultExpanded = false,
}: SoftwareDownloadCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <div className="bg-gray-100 rounded-xl overflow-hidden shadow-md">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-200 transition-colors"
      >
        <div className="flex items-center gap-3">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span className="text-lg font-bold text-gray-900">{title}</span>
          {isNew && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">New!</span>
          )}
        </div>
        <div className="text-blue-600">
          {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
        </div>
      </button>

      {isExpanded && (
        <div className="bg-white px-6 py-8 border-t border-gray-200">
          {image && (
            <div className="mb-6">
              <img src={image || "/placeholder.svg"} alt={title} className="w-1/2 rounded-lg shadow-md" />
            </div>
          )}
          {children}
        </div>
      )}
    </div>
  )
}
