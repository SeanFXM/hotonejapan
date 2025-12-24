"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { BlogSlider } from "@/components/blog-slider"

type Section = "concept" | "demo" | "features" | "controls" | "specs"

const navigationItems = [
  { id: "concept" as Section, label: "コンセプト" },
  { id: "demo" as Section, label: "デモムービー" },
  { id: "features" as Section, label: "主な機能" },
  { id: "controls" as Section, label: "コントロール" },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function BStationPage() {
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
          src="/images/brands/hotone/B_STATION/hero.jpg"
          alt="B STATION"
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
                <p className="text-2xl font-bold text-gray-900">B STATION</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">ベース・プリアンプ DI</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-hotone">¥15,180</p>
                <p className="text-xs text-gray-500">前後（税込）</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">6959473906026</p>
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
            ))}
          </div>
        </div>
      </nav>

      {/* Concept Section */}
      <section id="concept" className="py-20 scroll-mt-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Let&apos;s play LOUD.
            </h2>
            <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-4">
              このサウンド、明らかにベース用
            </h3>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Image */}
            <div>
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src="/images/brands/hotone/B_STATION/intro.jpg"
                  alt="B STATION"
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
                コンパクトサイズが定番のHOTONE。今回は『ビッグ』サイズのパフォーマー・モデルをリリースしました。レコーディング＆ライブにフル対応できる充実の入出力、ルーティング切り替え可能なEQセクション、オプトコンプ、珠玉のプロ仕様。Let&apos;s play LOUD.
              </p>
              
              {/* Feature List */}
              <div className="space-y-3 pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-sm">ダウンチューニングや多弦ベースも明確な音程で再生できる、ワイド周波数特性。</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-sm">ベーシストが直感的にセットできるEQデザイン、各弦をバランス良く再生します。</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-sm">速いフレーズにもナチュラルなサウンドで追従するオプティカル・コンプレッサー。</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-sm">ダイナミックEQ：「EQ → COMP → DRIVE」、ドライブEQ：「COMP → DRIVE → EQ」の2種類のプリ／ポストの切り替えが可能なEQセクション。</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-sm">低域がブーストされたDRIVE・サウンド、BLENDによるドライと歪みのブレンドが可能。</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-sm">充実した出力：アンバランス出力、XLRバランス出力、チューナー、アンプ用パラレル出力。</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-sm">エフェクト・ループ搭載（1/4インチ SEND/RETURN）</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-sm">1/8インチ・ヘッドフォン出力搭載。</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-sm">XLRダイレクト出力用グラウンド・リフト・スイッチ搭載。</p>
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

          <div className="max-w-4xl mx-auto">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/ZcGdNLT579E"
                title="B STATION Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section id="features" className="py-20 scroll-mt-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">主な機能</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 01 - Compセクション */}
              <div className="bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg overflow-hidden shadow-lg">
                <div className="px-6 py-4 flex justify-between items-center">
                  <h3 className="font-bold text-white">Compセクション</h3>
                  <span className="text-3xl font-bold text-white/50">01</span>
                </div>
                <div className="bg-white px-6 py-4">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    オプトセル採用のコンプレッサーです。自然でウォーム、パンチのあるコンプレッションがサウンドに追加できます。コンプレッションは深く設定すると、出力レベルが下がります。1コントロールでこの問題を解消できるように2連ポットを採用し、コンプレッションで下がったレベルをゲインを上げてユニティー・レベルを保てるようにコントロールします。
                  </p>
                </div>
              </div>

              {/* 02 - EQセクション */}
              <div className="bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg overflow-hidden shadow-lg">
                <div className="px-6 py-4 flex justify-between items-center">
                  <h3 className="font-bold text-white">EQセクション</h3>
                  <span className="text-3xl font-bold text-white/50">02</span>
                </div>
                <div className="bg-white px-6 py-4">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    3-バンドのアクティブEQです。各バンドは+/- 16 dBのブースト/カットが可能です。それぞれのセンター周波数は40Hz (BASS)、800Hz (MIDDLE)、6kHz (TREBLE)です。このEQセクションをPRE/POST EQボタンでPRE EQ切り替え、積極的なブースト/カット設定でコンプレッション組み合わせると、ダイナミックEQとして使用できます。 また、POST EQ でDRIVE（ドライブ）との組み合わせでより太いトーンがクリエイトできます。
                  </p>
                </div>
              </div>

              {/* 03 - DRIVEセクション */}
              <div className="bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg overflow-hidden shadow-lg">
                <div className="px-6 py-4 flex justify-between items-center">
                  <h3 className="font-bold text-white">DRIVEセクション</h3>
                  <span className="text-3xl font-bold text-white/50">03</span>
                </div>
                <div className="bg-white px-6 py-4">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    OP-ampベースのDRIVEチャンネルです。太いベースサウンドのスタンダード、SVTスタイルのサウンドが得られます。特に、MIDDLEスクープ、BASS & TREBLEブーストのグラインド・サウンドがオススメです。BLENDコントロールは2連ポットを採用しており、歪みが増えて音量が上がったレベル分を下げて、ユニティー出力レベルになるように設計されています。
                  </p>
                </div>
              </div>

              {/* 04 - 電圧ブースト回路 */}
              <div className="bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg overflow-hidden shadow-lg">
                <div className="px-6 py-4 flex justify-between items-center">
                  <h3 className="font-bold text-white">電圧ブースト回路</h3>
                  <span className="text-3xl font-bold text-white/50">04</span>
                </div>
                <div className="bg-white px-6 py-4">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    ベーシストが求める、高い(More)ダイナミクス＆高い(More)ヘッドルームを、ボルテージ・ダブラー回路の採用で実現しました。アダプターから入力された9Vは18Vに昇圧され、回路は18Vオペレーションでこれらを可能にしました。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Control Section */}
      <section id="controls" className="py-20 scroll-mt-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">コントロール</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="space-y-8">
              <div className="flex justify-center">
                <Image
                  src="/images/brands/hotone/B_STATION/control_01.png"
                  alt="B STATION Top Panel"
                  width={1000}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="border-t border-gray-200 pt-8">
                <Image
                  src="/images/brands/hotone/B_STATION/control_02.png"
                  alt="B STATION Back Panel"
                  width={1000}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs Section */}
      <section id="specs" className="py-20 scroll-mt-24 bg-gray-100">
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
                  <p className="text-gray-700 text-sm">入力インピーダンス：1M Ohms</p>
                </div>
                <div className="py-3 border-b border-gray-200">
                  <p className="text-gray-700 text-sm">出力インピーダンス：OUTPUT：100 Ohms、DIRECT OUTPUT：100 Ohms、Headphones（PHONES jack）：120mW（16 Ohms load）</p>
                </div>
                <div className="py-3 border-b border-gray-200">
                  <p className="text-gray-700 text-sm">パワー：9V DCセンターマイナス（アダプター仕様）</p>
                </div>
                <div className="py-3 border-b border-gray-200">
                  <p className="text-gray-700 text-sm">消費電流：65mA</p>
                </div>
                <div className="py-3 border-b border-gray-200">
                  <p className="text-gray-700 text-sm">サイズ：140mm（D）× 120mm（W）× 54mm（H）</p>
                </div>
                <div className="py-3 border-b border-gray-200">
                  <p className="text-gray-700 text-sm">重量：480g</p>
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

