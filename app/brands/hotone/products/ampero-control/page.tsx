"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Download, ChevronDown } from 'lucide-react'
import { BlogSlider } from "@/components/blog-slider"
import { downloadManual } from "@/lib/manual-download"

type Section = "concept" | "demo" | "usage" | "controls" | "software" | "faq" | "manual" | "specs"

const navigationItems = [
  { id: "concept" as Section, label: "コンセプト" },
  { id: "demo" as Section, label: "デモムービー" },
  { id: "usage" as Section, label: "使用例" },
  { id: "controls" as Section, label: "コントロール" },
  { id: "software" as Section, label: "ソフトウエア" },
  { id: "faq" as Section, label: "よくある質問" },
  { id: "manual" as "manual", label: "取扱説明書", isDownload: true },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function AmperoControlPage() {
  const [activeSection, setActiveSection] = useState<Section>("concept")
  const [headerHeight, setHeaderHeight] = useState(72)
  const [expandedSoftware, setExpandedSoftware] = useState<{
    firmware: boolean
    app: boolean
  }>({
    firmware: false,
    app: false,
  })

  const [expandedFaq, setExpandedFaq] = useState<{ [key: string]: boolean }>({})

  const toggleSoftware = (key: "firmware" | "app") => {
    setExpandedSoftware((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const toggleFaq = (key: string) => {
    setExpandedFaq((prev) => ({
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
    downloadManual("hotone", "ampero-control")
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
          src="/images/brands/hotone/ampero_control/hero.jpg"
          alt="Ampero Control"
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
                <p className="text-2xl font-bold text-gray-900">AMPERO CONTROL</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">MIDIコントローラー</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-hotone">
                  ¥20,350
                </p>
                <p className="text-xs text-gray-500">前後（税込）</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">6959473908037</p>
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Control your MIDI world！
            </h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
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
                  src="https://www.youtube.com/embed/nZKij3lWsy4"
                  title="Hotone Ampero Control Introduction"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              {/* Related Information */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <h3 className="font-bold text-gray-900 text-lg mb-4 border-b border-gray-200 pb-3">関連情報</h3>
                <div className="space-y-3">
                  <a href="#" className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-gray-900">アプリケーション・シナリオ（MIDI活用例）</span>
                  </a>
                  <a href="#" className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-gray-900">アプリケーション・マニュアル（v1.3）</span>
                  </a>
                  <a href="#" className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-gray-900">AMPERO CONTROL HOW TO USE Manual</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Product Description and Features */}
            <div className="space-y-6">
              <div>
                <div className="prose max-w-none mb-8">
                  <p className="text-gray-700 leading-relaxed">
                    Ampero Controlは、MIDIポート、USBジャック、Bluetoothの出力方式で、フルにMIDIコントロールできる、コンパクトで頑丈なMIDIコントローラーです。本機は４つのフットスイッチが用意されており、１回のスイッチング毎に１６の異なるMIDIメッセージを送り出すことができます。また、エクスプレッションペダルやフットスイッチを追加することもできます。これらの充実した機能はスマートな専用モバイルアプリで、簡単にプログラムすることが可能です。
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">コンパクト、4フットスイッチBluetooth MIDI コントローラー</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">スタンダードMIDI、USB MIDI、Bluetooth MIDI input/output/thru をサポートします。</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">MIDIメッセージの出力、転送が可能</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">1フットスイッチアクションで最大16 MIDIメッセージが出力できます（32 for A/B groups）</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">100 バンクx 4フットスイッチのセッティングがメモリーできます。（2 CTRL/EXPジャックセッティングも含む）</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">4つの異なるフットスイッチ機能が設定できます。</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">専用モバイルアプリで簡単に操作できます。</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">外部スイッチやエクスプレッションペダルの接続が可能な2 CTRL/EXP TRSジャック</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">3- LEDがMIDI messageとBluetooth接続のステータスを表示します。</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">ワイド電源仕様レンジ：DC 9-18V または 5V USBバスパワー</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Concept Section */}
      <section id="concept" className="scroll-mt-24 bg-black py-12">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          {/* 1. MIDIコマンダー */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center rounded-lg overflow-hidden">
            <div className="p-0">
              <Image
                src="/images/brands/hotone/ampero_control/concept_01.png"
                alt="MIDIコマンダー"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-8 lg:p-12">
              <h4 className="text-2xl font-bold text-white mb-6">
                MIDIコマンダー
              </h4>
              <p className="text-gray-300 leading-relaxed mb-4">
                Ampero ControlはPC、CC、Note On/Offを含む広いレンジのMIDIメッセージをMIDI、USB、Bluetoothの3タイプの出力が可能です。プリセットの変更、エフェクターやマルチのオン/オフ、DAWのプレイ/ストップ等を自在にMIDIコントロールできます。
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                ※ Ampero ControlはUSB-HOSTとしての機能がありません。USBを装備したエフェクターをMIDIでコントロールする場合は、モバイルデバイスのMIDIブリッジングアプリ+OTGケーブルの中継が必要です。
              </p>
            </div>
          </div>

          <div className="border-t border-gray-700 mx-auto w-full"></div>

          {/* 2. 複雑なコントロールをシンプルなタップアクションで解決 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center rounded-lg overflow-hidden">
            <div className="p-0">
              <Image
                src="/images/brands/hotone/ampero_control/concept_02.png"
                alt="複雑なコントロールをシンプルなタップアクションで解決"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-8 lg:p-12">
              <h4 className="text-2xl font-bold text-white mb-6">
                複雑なコントロールをシンプルなタップアクションで解決
              </h4>
              <p className="text-gray-300 leading-relaxed">
                Ampero Controlは、1フットスイッチアクションで16の異なるMIDIメッセージ（32 MIDIメッセージを2グループに分けることも可能）が送信できます。
              </p>
            </div>
          </div>

          <div className="border-t border-gray-700 mx-auto w-full"></div>

          {/* 3. 簡単に使えるモバイルアプリ（Android & iOS） */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center rounded-lg overflow-hidden">
            <div className="p-0">
              <Image
                src="/images/brands/hotone/ampero_control/concept_03.png"
                alt="簡単に使えるモバイルアプリ"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-8 lg:p-12">
              <h4 className="text-2xl font-bold text-white mb-6">
                簡単に使えるモバイルアプリ（Android & iOS）
              </h4>
              <p className="text-gray-300 leading-relaxed">
                Ampero Controlには、MIDIメッセージをエディットできる、シンプルでユーザーフレンドリーな専用アプリが用意されています。アプリの中には、いくつかのオーディオデバイスのテンプレートも用意されています。また、ご自身のテンプレートも簡単に作成でき、あらゆるレベルのプレーヤーに最適です。
              </p>
            </div>
          </div>

          <div className="border-t border-gray-700 mx-auto w-full"></div>

          {/* 4. 高い拡張性 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center rounded-lg overflow-hidden">
            <div className="p-0">
              <Image
                src="/images/brands/hotone/ampero_control/concept_04.png"
                alt="高い拡張性"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-8 lg:p-12">
              <h4 className="text-2xl font-bold text-white mb-6">
                高い拡張性
              </h4>
              <p className="text-gray-300 leading-relaxed">
                Ampero Controlには、エクスプレッションペダル、またはモメンタリーフットスイッチが接続できる2つのTRSジャックが装備されています。それらを本機に接続して、MIDIフットスイッチを増設したり、パッチの-/+、EXP連続コントロール等の機能を拡張したりできます。
              </p>
            </div>
          </div>

          <div className="border-t border-gray-700 mx-auto w-full"></div>

          {/* 5. パワーサプライ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center rounded-lg overflow-hidden">
            <div className="p-0">
              <Image
                src="/images/brands/hotone/ampero_control/concept_05.png"
                alt="パワーサプライ"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-8 lg:p-12">
              <h4 className="text-2xl font-bold text-white mb-6">
                パワーサプライ
              </h4>
              <p className="text-gray-300 leading-relaxed">
                本機はUSBバスパワー、または9-18V のワイドレンジのDC電源で動作します。
              </p>
            </div>
          </div>

          <div className="border-t border-gray-700 mx-auto w-full"></div>

          {/* 6. アプリケーション */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center rounded-lg overflow-hidden">
            <div className="p-0">
              <Image
                src="/images/brands/hotone/ampero_control/concept_06.jpg"
                alt="アプリケーション"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-8 lg:p-12">
              <h4 className="text-2xl font-bold text-white mb-6">
                アプリケーション
              </h4>
              <p className="text-gray-300 leading-relaxed mb-4">
                MIDIやUSB、Bluetooth機能を利用する際の接続例や使用法などをPDFで解説しています。
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                また、スマートフォン用アプリのマニュアルはこちらからご覧ください。
              </p>
              <div className="space-y-3">
                <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>アプリケーション・シナリオ（MIDI活用例）</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>アプリケーション・マニュアル</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-gray-50">
        {/* Demo Movie Section */}
        <section id="demo" className="py-20 scroll-mt-24 bg-gray-100">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">デモムービー</h2>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 rounded-full hotone-bar" />
              </div>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="bg-black rounded-2xl overflow-hidden aspect-video shadow-2xl">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/nZKij3lWsy4"
                  title="Ampero Control Demo Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Usage Examples Section */}
        <section id="usage" className="py-20 scroll-mt-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">使用例</h2>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 rounded-full hotone-bar" />
              </div>
            </div>
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 01 */}
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <div className="bg-gray-300 px-6 py-3 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">Amperoとの使用例</h3>
                    <span className="text-2xl font-bold text-gray-400">01</span>
                  </div>
                  <div className="p-4">
                    <Image
                      src="/images/brands/hotone/ampero_control/example_01.gif"
                      alt="Amperoとの使用例"
                      width={600}
                      height={400}
                      className="w-full rounded"
                      unoptimized
                    />
                  </div>
                </div>

                {/* 02 */}
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <div className="bg-gray-300 px-6 py-3 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">Ampero Pressとの使用例</h3>
                    <span className="text-2xl font-bold text-gray-400">02</span>
                  </div>
                  <div className="p-4">
                    <Image
                      src="/images/brands/hotone/ampero_control/example_02.gif"
                      alt="Ampero Pressとの使用例"
                      width={600}
                      height={400}
                      className="w-full rounded"
                      unoptimized
                    />
                  </div>
                </div>

                {/* 03 */}
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <div className="bg-gray-300 px-6 py-3 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">Ampero Switchとの使用例</h3>
                    <span className="text-2xl font-bold text-gray-400">03</span>
                  </div>
                  <div className="p-4">
                    <Image
                      src="/images/brands/hotone/ampero_control/example_03.gif"
                      alt="Ampero Switchとの使用例"
                      width={600}
                      height={400}
                      className="w-full rounded"
                      unoptimized
                    />
                  </div>
                </div>

                {/* 04 */}
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <div className="bg-gray-300 px-6 py-3 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">VStomp Ampアプリとの使用例</h3>
                    <span className="text-2xl font-bold text-gray-400">04</span>
                  </div>
                  <div className="p-4">
                    <Image
                      src="/images/brands/hotone/ampero_control/example_04.gif"
                      alt="VStomp Ampアプリとの使用例"
                      width={600}
                      height={400}
                      className="w-full rounded"
                      unoptimized
                    />
                  </div>
                </div>

                {/* 05 */}
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <div className="bg-gray-300 px-6 py-3 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">drum machine との使用例</h3>
                    <span className="text-2xl font-bold text-gray-400">05</span>
                  </div>
                  <div className="p-4">
                    <Image
                      src="/images/brands/hotone/ampero_control/example_05.gif"
                      alt="drum machine との使用例"
                      width={600}
                      height={400}
                      className="w-full rounded"
                      unoptimized
                    />
                  </div>
                </div>

                {/* 06 */}
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <div className="bg-gray-300 px-6 py-3 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">MIDI機能のあるエフェクターとの使用例</h3>
                    <span className="text-2xl font-bold text-gray-400">06</span>
                  </div>
                  <div className="p-4">
                    <Image
                      src="/images/brands/hotone/ampero_control/example_06.gif"
                      alt="MIDI機能のあるエフェクターとの使用例"
                      width={600}
                      height={400}
                      className="w-full rounded"
                      unoptimized
                    />
                  </div>
                </div>

                {/* 07 */}
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <div className="bg-gray-300 px-6 py-3 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">シンセサイザーとの使用例</h3>
                    <span className="text-2xl font-bold text-gray-400">07</span>
                  </div>
                  <div className="p-4">
                    <Image
                      src="/images/brands/hotone/ampero_control/example_07.gif"
                      alt="シンセサイザーとの使用例"
                      width={600}
                      height={400}
                      className="w-full rounded"
                      unoptimized
                    />
                  </div>
                </div>

                {/* 08 */}
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <div className="bg-gray-300 px-6 py-3 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">DAWのリモートコントロール（プレイ/ストップ）</h3>
                    <span className="text-2xl font-bold text-gray-400">08</span>
                  </div>
                  <div className="p-4">
                    <Image
                      src="/images/brands/hotone/ampero_control/example_08.gif"
                      alt="DAWのリモートコントロール（プレイ/ストップ）"
                      width={600}
                      height={400}
                      className="w-full rounded"
                      unoptimized
                    />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-8 text-center">
                ※注：サイト中のHOTONE以外の製品は、アプリケーション説明のリファレンスとして使用しています。
              </p>
            </div>
          </div>
        </section>

        {/* Controls Section */}
        <section id="controls" className="py-20 scroll-mt-24 bg-gray-100">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">コントロール</h2>
              <div className="flex justify-center">
                <div className="w-20 h-1 rounded bg-accent-green" />
              </div>
            </div>

            <div className="max-w-7xl mx-auto space-y-16">
              <div className="flex justify-center mb-16">
                <div className="relative w-full max-w-2xl">
                  <Image
                    src="/images/brands/hotone/ampero_control/control_01.png"
                    alt="Controls - Front"
                    width={800}
                    height={900}
                    className="rounded-lg w-full"
                    priority
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Footswitches */}
                  <div>
                    <div className="inline-block bg-gray-300 px-4 py-2 rounded-full mb-3">
                      <span className="flex items-center gap-2 text-sm font-medium text-gray-800">
                        <span className="text-lg">◉</span> フットスイッチ 1-4
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-700">
                      <p><strong>短押し：</strong>割り当てられたMIDIメッセージを送信します。</p>
                      <p><strong>長押し：</strong>バンクを切り替えます。</p>
                    </div>
                  </div>

                  {/* LED Indicators */}
                  <div>
                    <div className="inline-block bg-gray-300 px-4 py-2 rounded-full mb-3">
                      <span className="flex items-center gap-2 text-sm font-medium text-gray-800">
                        <span className="text-lg">◉</span> LEDインジケーター
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-700">
                      <p>各フットスイッチの状態をカラーLEDで表示します。</p>
                      <p>アプリで色をカスタマイズ可能です。</p>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Display */}
                  <div>
                    <div className="inline-block bg-gray-300 px-4 py-2 rounded-full mb-3">
                      <span className="flex items-center gap-2 text-sm font-medium text-gray-800">
                        <span className="text-lg">●</span> ディスプレイ
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-700">
                      <p>現在のバンク番号とプリセット情報を表示します。</p>
                    </div>
                  </div>

                  {/* Bank Navigation */}
                  <div>
                    <div className="inline-block bg-gray-300 px-4 py-2 rounded-full mb-3">
                      <span className="flex items-center gap-2 text-sm font-medium text-gray-800">
                        <span className="text-lg">●</span> バンクナビゲーション
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-700">
                      <p>4つのバンクを切り替えて、合計16種類のプリセットにアクセスできます。</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-20">
                <div className="flex justify-center mb-12">
                  <div className="relative w-full max-w-2xl">
                    <Image
                      src="/images/brands/hotone/ampero_control/control_02.png"
                      alt="Ampero Control Back Panel"
                      width={1400}
                      height={800}
                      className="rounded-lg shadow-lg w-full"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  {/* MIDI OUT */}
                  <div>
                    <div className="inline-block bg-gray-300 px-4 py-2 rounded-full mb-3">
                      <span className="text-sm font-semibold text-gray-800">◉ MIDI OUT</span>
                    </div>
                    <div className="text-sm text-gray-700">
                      <p>MIDIメッセージを出力します。3.5mm TRSジャックを使用してMIDI機器に接続します。</p>
                    </div>
                  </div>

                  {/* MIDI IN */}
                  <div>
                    <div className="inline-block bg-gray-300 px-4 py-2 rounded-full mb-3">
                      <span className="text-sm font-semibold text-gray-800">◉ MIDI IN</span>
                    </div>
                    <div className="text-sm text-gray-700">
                      <p>外部からのMIDIメッセージを受信します。</p>
                    </div>
                  </div>

                  {/* MIDI THRU */}
                  <div>
                    <div className="inline-block bg-gray-300 px-4 py-2 rounded-full mb-3">
                      <span className="text-sm font-semibold text-gray-800">◉ MIDI THRU</span>
                    </div>
                    <div className="text-sm text-gray-700">
                      <p>受信したMIDIメッセージをそのまま転送します。複数のMIDI機器をデイジーチェーン接続する際に使用します。</p>
                    </div>
                  </div>

                  {/* USB */}
                  <div>
                    <div className="inline-block bg-gray-300 px-4 py-2 rounded-full mb-3">
                      <span className="text-sm font-semibold text-gray-800">◉ USB Type-C</span>
                    </div>
                    <div className="text-sm text-gray-700">
                      <p>電源供給用のUSB Type-C端子です。USBアダプターやモバイルバッテリーで電源を供給できます。</p>
                    </div>
                  </div>

                  {/* DC IN */}
                  <div>
                    <div className="inline-block bg-gray-300 px-4 py-2 rounded-full mb-3">
                      <span className="text-sm font-semibold text-gray-800">◉ DC IN</span>
                    </div>
                    <div className="text-sm text-gray-700">
                      <p>9V DC センターマイナスのアダプターを使用してください。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Software Section */}
        <section id="software" className="py-20 scroll-mt-24 bg-gray-200">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">ソフトウエア</h2>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 rounded-full hotone-bar" />
              </div>
            </div>

            {/* App Download Cards */}
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* iOS App */}
                <div className="bg-gray-100 rounded-xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleSoftware("firmware")}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6 text-sky-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                      <h3 className="text-base font-bold text-sky-500">AMPERO CONTROL APP FOR iOS</h3>
                    </div>
                    <div className={`w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center transition-transform ${expandedSoftware.firmware ? '' : 'rotate-45'}`}>
                      <span className="text-white text-lg font-bold leading-none">−</span>
                    </div>
                  </button>
                  {expandedSoftware.firmware && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-700 mb-4">
                        こちらのApple App Storeからダウンロードしてください。
                      </p>
                      <a 
                        href="#" 
                        className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        ダウンロードページはこちら
                      </a>
                    </div>
                  )}
                </div>

                {/* Android App */}
                <div className="bg-gray-100 rounded-xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleSoftware("app")}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6 text-sky-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.523 2.336a.5.5 0 00-.67.223l-1.463 2.926a7.982 7.982 0 00-6.78 0L7.147 2.559a.5.5 0 10-.894.447l1.412 2.824A8.034 8.034 0 004 12.5V13h16v-.5a8.034 8.034 0 00-3.665-6.67l1.412-2.824a.5.5 0 00-.224-.67zM8.5 10a1 1 0 110-2 1 1 0 010 2zm7 0a1 1 0 110-2 1 1 0 010 2zM4 14v6a2 2 0 002 2h12a2 2 0 002-2v-6H4z"/>
                      </svg>
                      <h3 className="text-base font-bold text-sky-500">AMPERO CONTROL APP FOR ANDROID</h3>
                    </div>
                    <div className={`w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center transition-transform ${expandedSoftware.app ? '' : 'rotate-45'}`}>
                      <span className="text-white text-lg font-bold leading-none">−</span>
                    </div>
                  </button>
                  {expandedSoftware.app && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-700 mb-4">
                        こちらのリンクからダウンロードしてください。
                      </p>
                      <a 
                        href="#" 
                        className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        メーカーサイトよりダウンロードが始まります
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 scroll-mt-24 bg-gray-100">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">よくある質問</h2>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 rounded-full hotone-bar" />
              </div>
            </div>
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
                {/* FAQ 1 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                  <button
                    onClick={() => toggleFaq("faq1")}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">Q</span>
                      </div>
                      <span className="font-medium text-gray-800 text-left text-sm">MIDIコントロールで発生するレイテンシーについて</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${expandedFaq.faq1 ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFaq.faq1 && (
                    <div className="px-5 py-4 bg-blue-50 border-t border-blue-100">
                      <div className="text-gray-700 text-sm space-y-4">
                        <p>
                          ブランドを問わず、MIDIコントローラーからマルチエフェクターやその他のMIDI機器を操作すると、レイテンシーは発生します。そのレイテンシーを"0"にすることはできません。下記の動画をご覧ください。
                        </p>
                        
                        <div className="aspect-video bg-black rounded-lg overflow-hidden my-4">
                          <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/CO1fVXY30VE"
                            title="MIDI Latency Demo"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                          />
                        </div>
                        
                        <p>
                          Ampero Control経由でEXPペダルの動きをMIDIでAmpero II StompのWahを操作しています。右のセットアップはWahサウンドの動きが遅れます。左のセットアップはEXPペダルを直接Ampero II Stompに繋いで操作していますから、大きな遅れ（レイテンシー）は発生していません。
                        </p>
                        
                        <p>
                          MIDIでのEXPペダル操作は、Swellのような一方向への動きに適しています。しかし、この動画のWahのような二方向の動きではレイテンシーが大きくなります。
                        </p>
                        
                        <p>
                          この動画例のEXP pedal + Ampero II Stompでのバリエーションレンジが0-100に対して、EXP pedal + Ampero Control⇄Ampero II Stompではレンジが5-95に制限されていました。(HOTONEでの検証結果）MIDIシステムは一定のインターバルでペダルのステータスを読み込んでいます。ペダルが100へ動いても、ステータスを読み込んでいない時にはその値は反映されません。この繰り返しによって、遅れとレンジの制約が発生するわけです。これはHOTONEだけの問題ではありません。
                        </p>
                        
                        <p className="font-semibold text-gray-900">
                          結論：Wahなど遅れやタイミングが重要なペダル操作は、MIDI経由ではなく直接実機（Ampero II Stomp等）のEXPからの操作を推奨します。
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* FAQ 2 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                  <button
                    onClick={() => toggleFaq("faq2")}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">Q</span>
                      </div>
                      <span className="font-medium text-gray-800 text-left text-sm">Ampero Controlのスイッチ動作について</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${expandedFaq.faq2 ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFaq.faq2 && (
                    <div className="px-5 py-4 bg-blue-50 border-t border-blue-100">
                      <p className="text-gray-700 text-sm">
                        Ampero Controlのスイッチング機能は、踏んだ（押した）フットスイッチを離した時にメッセージ信号を発信します。スイッチの切り替え動作を"踏んだ（押した）時"、もしくは"離した時"のどちらかに設定するモードはありません。
                      </p>
                    </div>
                  )}
                </div>

                {/* FAQ 3 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                  <button
                    onClick={() => toggleFaq("faq3")}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">Q</span>
                      </div>
                      <span className="font-medium text-gray-800 text-left text-sm">Ampero Controlアプリに出てくる「Template/テンプレート」とは何ですか？</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${expandedFaq.faq3 ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFaq.faq3 && (
                    <div className="px-5 py-4 bg-blue-50 border-t border-blue-100">
                      <div className="text-gray-700 text-sm space-y-3">
                        <p>
                          テンプレートはひとつの目的に特化したMIDIメッセージグループです。Ampero Controlアプリには、人気プロダクトのテンプレートライブラリが含まれています。それらのテンプレート名には、馴染みのある特徴的な名前が付けられています。（商標の問題があるためオリジナルネームは使用していません。）
                        </p>
                        <p>
                          また、ご自身でお好きなライブラリを拡充することも可能です。MIDIメッセージのグループを編集したら、テンプレートライブラリは自分で広げることもできます。あなたが編集したいくつかのMIDIメッセージは、テンプレートとして保存することができます。保存したテンプレートを使用すれば、毎回最初からMIDIセティングを作成する必要がなくなります。
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* FAQ 4 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                  <button
                    onClick={() => toggleFaq("faq4")}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">Q</span>
                      </div>
                      <span className="font-medium text-gray-800 text-left text-sm">スマホのアプリと毎回接続する必要がありますか？</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${expandedFaq.faq4 ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFaq.faq4 && (
                    <div className="px-5 py-4 bg-blue-50 border-t border-blue-100">
                      <p className="text-gray-700 text-sm">
                        プリセットの編集が完了し、本機EC-4にその設定を保存している場合は、モバイルデバイスがなくても使用できます。お好きなプリセット設定が保存されていれば、あとは電源を入れるだけでMIDIコントロールが可能です。
                      </p>
                    </div>
                  )}
                </div>

                {/* FAQ 5 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                  <button
                    onClick={() => toggleFaq("faq5")}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">Q</span>
                      </div>
                      <span className="font-medium text-gray-800 text-left text-sm">アプリ中のTest（テスト）とは何ですか？</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${expandedFaq.faq5 ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFaq.faq5 && (
                    <div className="px-5 py-4 bg-blue-50 border-t border-blue-100">
                      <p className="text-gray-700 text-sm">
                        アプリの編集ページには「Test」ボタンがあります。「Test」ボタンを押すと、本機はエディット中のMIDIメッセージを接続しているMIDI機器へ送信します。そのメッセージは保存されず、また、プリセットも変更されません。この方法で保存前のメッセージを最終確認することができます。
                      </p>
                    </div>
                  )}
                </div>

                {/* FAQ 6 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                  <button
                    onClick={() => toggleFaq("faq6")}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">Q</span>
                      </div>
                      <span className="font-medium text-gray-800 text-left text-sm">MIDI INの使い方について教えてください。</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${expandedFaq.faq6 ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFaq.faq6 && (
                    <div className="px-5 py-4 bg-blue-50 border-t border-blue-100">
                      <div className="text-gray-700 text-sm space-y-3">
                        <p>
                          まず、Ampero ControlのMIDI OUTはMIDITHRUでもあります。MIDI IN、Bluetooth MIDIまたは USB MIDI のいずれかで受けたメッセージは、変更されずMIDI OUT（MIDITHRU） へそのまま転送されます。MIDI INの使い方には次の２つがあります。
                        </p>
                        <p>
                          MIDI INの使用例の1つ目は、4つ以上のフットスイッチを使うために複数のAmpero Control接続する増設です。一方のMIDI OUTと別のMIDI INをMIDIケーブルでデイジーチェーンの要領で接続します。
                        </p>
                        <p>
                          2つ目は、メッセージチェーンの先頭にだけではなく、MIDIメッセージチェーンの途中にAmpero Controlを入れる場合も同様の接続が可能です。
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* FAQ 7 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                  <button
                    onClick={() => toggleFaq("faq7")}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">Q</span>
                      </div>
                      <span className="font-medium text-gray-800 text-left text-sm">USBまたはBluetoothを介してAmpero ControlにMIDIメッセージを送信できますか?</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${expandedFaq.faq7 ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFaq.faq7 && (
                    <div className="px-5 py-4 bg-blue-50 border-t border-blue-100">
                      <p className="text-gray-700 text-sm">
                        USB MIDIとBluetooth MIDIからAmpero ControlにMIDIメッセージを送信できます。受信したすべてのメッセージは、（MIDI THRUのように）MIDI OUTからそのまま送信されます。
                      </p>
                    </div>
                  )}
                </div>

                {/* FAQ 8 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                  <button
                    onClick={() => toggleFaq("faq8")}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">Q</span>
                      </div>
                      <span className="font-medium text-gray-800 text-left text-sm">Bluetooth MIDIをモバイルデバイスで使用する場合</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${expandedFaq.faq8 ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFaq.faq8 && (
                    <div className="px-5 py-4 bg-blue-50 border-t border-blue-100">
                      <div className="text-gray-700 text-sm space-y-3">
                        <p>
                          Bluetooth MIDI に対応しているGarageBand等、Bluetooth MIDI Connectへ、プログラムチェンジ等のMIDIメッセージを送ることが可能です。モバイルデバイスで使用したいアプリのMIDI設定からEC-4を選択してください。アプリによって設定が異なる場合があります。特にMIDIの有効化、MIDIチャンネルの一致など注意してください。
                        </p>
                        <p className="text-gray-600 italic">
                          ノート：EC-4でプリセットを変更する際は、呼び出したいプリセットのPC No,が決まっていないと、EC-4側の設定が出来ません。ご注意ください。
                        </p>
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
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">製品仕様</h2>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 rounded-full hotone-bar" />
              </div>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-200">
                  <div className="px-6 py-4">
                    <span className="text-gray-900 font-medium">技適基準適合証明ナンバー：214-115490</span>
                  </div>
                  <div className="px-6 py-4">
                    <span className="text-gray-900 font-medium">EXPペダルの抵抗値：Max. 10kΩ</span>
                  </div>
                  <div className="px-6 py-4">
                    <span className="text-gray-900 font-medium">電源仕様：9-18V DC（センターマイナス）or 5V DC（USB）</span>
                  </div>
                  <div className="px-6 py-4">
                    <span className="text-gray-900 font-medium">消費電流：Max. 100mA</span>
                  </div>
                  <div className="px-6 py-4">
                    <span className="text-gray-900 font-medium">ブルートゥースレンジ：≤5m</span>
                  </div>
                  <div className="px-6 py-4">
                    <span className="text-gray-900 font-medium">サイズ：258.5mm（W） x 55.5mm（D） x 49mm（H）</span>
                  </div>
                  <div className="px-6 py-4">
                    <span className="text-gray-900 font-medium">重量：440g</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

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

