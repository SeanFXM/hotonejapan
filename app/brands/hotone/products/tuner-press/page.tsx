"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Download, ShoppingCart } from "lucide-react"
import { BlogSlider } from "@/components/blog-slider"
import { Button } from "@/components/ui/button"
import { downloadManual } from "@/lib/manual-download"

type Section = "concept" | "demo" | "features" | "software" | "manual" | "specs"

const navigationItems = [
  { id: "concept" as Section, label: "コンセプト" },
  { id: "demo" as Section, label: "デモムービー" },
  { id: "features" as Section, label: "主な機能" },
  { id: "software" as Section, label: "ソフトウエア" },
  { id: "manual" as "manual", label: "取扱説明書", isDownload: true },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function TunerPressPage() {
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
    }
  }

  const handleManualDownload = () => {
    downloadManual("hotone", "tuner-press")
  }

  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector("header")
      if (header) {
        setHeaderHeight(header.offsetHeight)
      }
    }
    updateHeaderHeight()
    window.addEventListener("resize", updateHeaderHeight)
    return () => window.removeEventListener("resize", updateHeaderHeight)
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
            setActiveSection(sectionId as Section)
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
          src="/images/brands/hotone/tuner_press/hero.jpg"
          alt="TUNER PRESS"
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
                <p className="text-2xl font-bold text-gray-900">TUNER PRESS</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">多機能チューナーペダル</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-hotone">
                  23,980 前後
                </p>
                <p className="text-xs text-gray-500">（税込）</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">6959473904091</p>
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
          <div className="flex items-center justify-center gap-1 py-4 overflow-x-auto scrollbar-hide">
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
                  {'isDownload' in item && item.isDownload && <Download className="w-4 h-4" />}
                </span>
                {activeSection === item.id && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full hotone-bar"
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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              最高峰のピッチ検出精度と、インピーダンス切替可能な高音質バッファー
            </h2>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              VOLペダルとEXPペダルをも組み合わせた、マルチタスク・チューナー・ペダル
            </h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Image */}
            <div>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/brands/hotone/tuner_press/intro.jpg"
                  alt="TUNER PRESS Introduction"
                  width={600}
                  height={400}
                  className="w-full"
                />
              </div>
            </div>

            {/* Right Column - Product Description */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">1台4役、軽量小型のスグレモノ！</h3>
              
              <div className="prose max-w-none text-gray-700 space-y-4 text-sm leading-relaxed">
                <p>
                  TUNER PRESSは単なるどこにでもあるチューナーペダルではありません。それは、多用途性を極めた優れものです。この重さ600gのペダルは、高精度チューナー、高音質バッファー、ボリューム・ペダル、エクスプレッション・ペダルの機能が１台にまとめられたマルチタスクなペダルです。フットスイッチは確かなスイッチ操作の触覚をフィードバックしてくれますし、エクスプレッションとボリューム・コントロールもシームレスに切り替えることができます。
                </p>
                <p>
                  ボリューム・モードでペダルをヒール（かかと）側に戻すと、自動的に0.01セント精度のサイレント・チューニングが有効になります。HD LCD画面とスイッチング・インジケーターにより、直感的で正確かつ迅速なユーザーエクスペリエンスを届けてくれます。さらにTUNER PRESSは、人気のAmpero Pressシリーズのクラシックなデザインを継承し、手軽な携帯性と実用性をシームレスに融合させています。
                </p>
              </div>

              <div className="mt-8 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-blue-500 mt-0.5">✓</span>
                  <p className="text-gray-700 text-sm">±0.01セントの圧倒的なピッチ検出精度のストロボ・チューナー</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-500 mt-0.5">✓</span>
                  <p className="text-gray-700 text-sm">2種類のチューナーモード（ストロボ、クロマチック）</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-500 mt-0.5">✓</span>
                  <p className="text-gray-700 text-sm">HI/LOW インピーダンス切り替え可能な高音質バッファーアンプ</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-500 mt-0.5">✓</span>
                  <p className="text-gray-700 text-sm">多機能：チューナー、バッファーアンプ、ボリューム、エクスプレッション</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-500 mt-0.5">✓</span>
                  <p className="text-gray-700 text-sm">独立したボリューム出力とエクスプレッション出力ジャック</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-500 mt-0.5">✓</span>
                  <p className="text-gray-700 text-sm">トーンを損なわないアクティブ・ボリューム設計</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Concept Section - Dark Background */}
      <section id="concept" className="py-16 scroll-mt-24 bg-concept-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">製品コンセプト</h3>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Main Concept */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/brands/hotone/tuner_press/concept_01.gif"
                  alt="TUNER PRESS Concept"
                  width={500}
                  height={400}
                  className="w-full"
                  unoptimized
                />
              </div>
              <div className="space-y-6">
                <h4 className="text-2xl font-bold text-white">4つの機能でペダルボードをさらに小さく！</h4>
                <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
                  <p>
                    1台のTUNER PRESSで、超高精度チューナー、高音質バッファー、ボリューム・ペダル、EXPペダルの役割を果たします。1台4役です。
                  </p>
                  <p>
                    HOTONEのエンジニア陣が新たに開発した、最新のチューニング・アルゴリズムは「+/- 0.01セント」という前代未聞の検出精度を誇ります。そして、この検出精度を存分に生かすために開発された「ストロボチューナー・モード」によって、繊細でスムーズなチューニング体験を提供してくれることでしょう。
                  </p>
                  <p>
                    また、本機には独立したボリューム出力とエクスプレッション出力を備えており、ストンプボックス・ペダルとマルチ・エフェクトの両方に最適です。バッファ回路を有効にするオプションにより、セットアップに柔軟性も加わります。
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-700 my-12"></div>

            {/* Additional Concepts */}
            <div className="space-y-12">
              <div>
                <h4 className="text-xl font-bold text-white mb-4">小さくて軽いが、酷使に耐える頑丈設計</h4>
                <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
                  <p>
                    TUNER PRESSは小さくて軽いかもしれませんが、酷使して頂いても問題ありません（通常のペダル用途以外はお勧めしません）。軽量アルミニウム合金シャシ、頑丈なスチール構造シャフト、滑り止めの肉厚シリコン踏など、最高級の素材で作られており、高品位で確かな使用感を体験して頂けます。内蔵のポテンショメーターも正確な応答と耐久性を保証しています。
                  </p>
                  <p>
                    一方、HOTONEの研究開発チームは製品をさらに進化させ、将来USB経由でのアップデートで、機能とエクスペリエンスを継続的にアップグレードしていく予定です。
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold text-white mb-4">1分も要らないシンプルな操作性</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  TUNER PRESSは、強力な機能、わかりやすいロジック、そしてユーザーフレンドリーな操作性を特長としています。チューナーの起動はペダルをヒール側へ持ち上げるだけで簡単に行えます。ボリュームとエクスプレッションの切り替えはフットスイッチを素早く押すだけです。
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-white mb-4">スイッチのフィーリング</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  一般的なエフェクターの内蔵フットスイッチは、ゴム製のパッドを使用するため、踏み込んだ時の感触が分かりにくいことがあります。一方、TUNER PRESSは独自の「クリック」フットスイッチを採用しており、ステージでの演奏中でもペダルの状態変化を確実に感じることができます。
                </p>
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

          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/nKSZ0ioGfAU"
                title="TUNER PRESS Demo"
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
      <section id="features" className="py-20 scroll-mt-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">主な機能</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Feature 1 */}
              <div className="bg-white rounded-3xl p-8 shadow-lg aspect-square flex flex-col">
                <h4 className="font-bold text-gray-900 text-lg mb-4">最高レベルの検出精度</h4>
                <div className="mb-4 flex-shrink-0">
                  <Image
                    src="/images/brands/hotone/tuner_press/fuction_01.jpg"
                    alt="最高レベルの検出精度"
                    width={400}
                    height={250}
                    className="w-full h-48 object-contain rounded-2xl"
                  />
                </div>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                  新しいチューニング・アルゴリズムを採用したTUNER PRESSは、高い精度と応答性の向上を保証します。TUNER PRESSには、クロマチック・チューナー・モードとストロボ・チューナー・モードの2つのチューナーモードがあり、ストロボ・チューナー・モード使用時には、他のチューナーを圧倒する「+/- 0.01セント」の検出精度を誇ります。
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-3xl p-8 shadow-lg aspect-square flex flex-col">
                <h4 className="font-bold text-gray-900 text-lg mb-4">スタイルに合わせて動作＆表示モードをカスタマイズ</h4>
                <div className="mb-4 flex-shrink-0">
                  <Image
                    src="/images/brands/hotone/tuner_press/fuction_02.png"
                    alt="スタイルに合わせて動作＆表示モードをカスタマイズ"
                    width={400}
                    height={250}
                    className="w-full h-48 object-contain rounded-2xl"
                  />
                </div>
                <div className="text-gray-600 text-sm leading-relaxed space-y-2 flex-grow">
                  <p>
                    TUNER PRESSは、演奏スタイルや好みに合わせてスイッチの切り替えによって、チューナーの動作モードや表示モードを切り替えることが可能です。
                  </p>
                  <p className="text-orange-600">● T+S：ペダルをヒール側へ踏み切るとチューナーが作動し、それ以外の位置ではチューナーはオフになります。</p>
                  <p className="text-orange-600">● T：ペダルを上げてもチューナーはどの位置でもオンのままです。</p>
                  <p className="text-orange-600">● T+P：ペダルを完全に上げたときにチューナーを表示し、他の位置ではリアルタイムのペダル移動を表示します。</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-3xl p-8 shadow-lg aspect-square flex flex-col">
                <h4 className="font-bold text-gray-900 text-lg mb-4">高音質バッファーとインピーダンス切替</h4>
                <div className="mb-4 flex-shrink-0">
                  <Image
                    src="/images/brands/hotone/tuner_press/fuction_03.jpg"
                    alt="高音質バッファーとインピーダンス切替"
                    width={400}
                    height={250}
                    className="w-full h-48 object-contain rounded-2xl"
                  />
                </div>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                  TUNER PRESSは入力インピーダンスを切り替えることができ、ギターやエフェクトにマッチングするインピーダンスで、最良のサウンドを引き出します。ハイインピーダンスはギターやベースなどの楽器入力に適しており、ペダルはエフェクトチェーンの先頭に位置します。ローインピーダンスはエフェクトやその他のデバイス入力に適しており、ペダルをエフェクトチェーンの中間または最後に配置してカスタムニーズに応えます。
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white rounded-3xl p-8 shadow-lg aspect-square flex flex-col">
                <h4 className="font-bold text-gray-900 text-lg mb-4">VOLペダルとEXPペダルを同時に1台で</h4>
                <div className="mb-4 flex-shrink-0">
                  <Image
                    src="/images/brands/hotone/tuner_press/fuction_04.jpg"
                    alt="VOLペダルとEXPペダルを同時に1台で"
                    width={400}
                    height={250}
                    className="w-full h-48 object-contain rounded-2xl"
                  />
                </div>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                  TUNER PRESSは、独立したEXP OUT/エクスプレッションアウトとVOL OUT/ボリュームアウトを備え、多様性に溢れたプレイヤー達にとって有益です。エフェクトペダルにEXPコネクターが1つしかなく、エクスプレッションとボリュームコントロールを同時に使用したい場合、TUNER PRESSが最適です。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Software Section */}
      <section id="software" className="py-20 scroll-mt-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">ソフトウェア・ダウンロード</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full bg-blue-500" />
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <p className="text-center text-gray-700 mb-8">
              TUNER PRESSの各ソフトウェアは、HOTONE メーカーサイトよりダウンロードしていただけます。
            </p>

            {/* Firmware Download Dropdown */}
            <details className="group bg-white rounded-xl overflow-hidden shadow-lg">
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div className="flex items-center gap-3">
                    <span className="text-base font-medium text-gray-900">TUNER PRESS Firmware 1.2.0</span>
                    <span className="px-2 py-0.5 bg-red-600 text-white text-xs font-bold rounded">New!</span>
                  </div>
                </div>
                <svg
                  className="w-6 h-6 text-blue-500 transition-transform group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </summary>
              <div className="px-6 pb-6 pt-4 space-y-6">
                {/* Firmware Image */}
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src="/images/brands/hotone/tuner_press/software.jpg"
                    alt="TUNER PRESS Firmware 1.2.0"
                    width={600}
                    height={300}
                    className="w-full max-w-lg"
                  />
                </div>

                {/* Release Notes */}
                <div className="space-y-2">
                  <p className="text-gray-900">TUNER PRESS ファームウェアのリリースノート</p>
                  <p className="text-gray-600 text-sm">Version 1.2.0　Released 3/07/2024</p>
                </div>

                {/* Update Content */}
                <div className="space-y-3">
                  <p className="font-bold text-gray-900">アップデートの内容</p>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-700 text-white text-xs flex items-center justify-center">1</span>
                      <p>クロマチック、ストロボチューニングのピッチ検出精度を±0.01セントに最適化</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-700 text-white text-xs flex items-center justify-center">2</span>
                      <p>クロマチックとストロボチューニングの表示を最適化し、精度を向上させました。</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-700 text-white text-xs flex items-center justify-center">3</span>
                      <p>起動アニメーションの後に現在のファームウェアのバージョン番号の表示を追加しました。</p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 text-sm">
                  HOTONE メーカーサイトより直接ダウンロードが開始されます。
                </p>

                {/* Download Button */}
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  TUNER PRESS FIRMWARE V1.2.0
                </a>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Specs Section */}
      <section id="specs" className="py-20 scroll-mt-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">製品仕様</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full bg-teal-500" />
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left - 検出制度・入出力 */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-2 mb-4">検出制度・入出力</h3>
                <div className="space-y-3 text-sm">
                  <div className="border-b border-gray-200 pb-2">
                    <span className="text-gray-700">ピッチ検出精度：±0.01セント</span>
                  </div>
                  <div className="border-b border-gray-200 pb-2">
                    <span className="text-gray-700">ポット抵抗値（EXP出力）：10kΩ</span>
                  </div>
                  <div className="border-b border-gray-200 pb-2">
                    <span className="text-gray-700">入力：1/4インチチップスリーブ（TS）ジャック×1、1MΩ/10kΩ</span>
                  </div>
                  <div className="border-b border-gray-200 pb-2">
                    <span className="text-gray-700">出力：1/4"チップスリーブ（TS）ジャック×1、1kΩ</span>
                  </div>
                  <div className="border-b border-gray-200 pb-2">
                    <span className="text-gray-700">EXP OUT：1/4" チップリングスリーブ（TRS）ジャック×1、10kΩ</span>
                  </div>
                </div>
              </div>

              {/* Right - サイズ・重量 */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-2 mb-4">サイズ・重量</h3>
                <div className="space-y-3 text-sm">
                  <div className="border-b border-gray-200 pb-2">
                    <span className="text-gray-700">電源仕様：DC9V センターマイナス</span>
                  </div>
                  <div className="border-b border-gray-200 pb-2">
                    <span className="text-gray-700">消費電流：最大70mA</span>
                  </div>
                  <div className="border-b border-gray-200 pb-2">
                    <span className="text-gray-700">サイズ：81mm（W）x 162mm（D）x 61mm（H）</span>
                  </div>
                  <div className="border-b border-gray-200 pb-2">
                    <span className="text-gray-700">重量：606g</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <p className="text-gray-500 text-sm">
                ※製品の仕様及びデザインは改良のため予告なく変更することがあります。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Slider */}
      <BlogSlider />
    </div>
  )
}

