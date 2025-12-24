"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronDown, Download, ShoppingCart } from "lucide-react"
import { BlogSlider } from "@/components/blog-slider"
import { Button } from "@/components/ui/button"
import { downloadManual } from "@/lib/manual-download"

type Section = "concept" | "demo" | "features" | "manual" | "specs"

const navigationItems = [
  { id: "concept" as Section, label: "コンセプト" },
  { id: "demo" as Section, label: "デモムービー" },
  { id: "features" as Section, label: "主な機能" },
  { id: "manual" as "manual", label: "取扱説明書", isDownload: true },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function WongPressIIPage() {
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
    downloadManual("hotone", "wong-press-ii")
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
          src="/images/brands/hotone/wong_press_ii/hero.jpg"
          alt="WONG PRESS"
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
                <p className="text-2xl font-bold text-gray-900">WONG PRESS</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">Wah / Exp / Vol ペダル</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-hotone">
                  34,980 前後
                </p>
                <p className="text-xs text-gray-500">（税込）</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">6959473904114</p>
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

      {/* Concept Section - Intro */}
      <section id="concept" className="py-20 scroll-mt-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              世界的に有名なファンクギターのマエストロ
            </h2>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              コーリー・ウォンの歯切れ良いサウンドを支えるシグネチャーペダル
            </h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Images */}
            <div className="space-y-6">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/brands/hotone/wong_press_ii/intro_01.png"
                  alt="WONG PRESS"
                  width={600}
                  height={400}
                  className="w-full"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/brands/hotone/wong_press_ii/intro_02.jpg"
                  alt="WONG PRESS"
                  width={600}
                  height={400}
                  className="w-full"
                />
              </div>
            </div>

            {/* Right Column - Product Description */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">コーリーが求めたワウトーンと操作性、耐久性を兼ね備えた最新ペダル</h3>
                <div className="prose max-w-none text-gray-700 space-y-4 text-sm leading-relaxed">
                  <p>
                    世界的に有名なファンクギターのマエストロであり、第63回グラミー賞候補者でもあるコーリー・ウォンは、そのユニークな演奏スタイルと正確かつ歯切れの良いトーンでギタープレーヤーのハートを掴みました。表現力豊かなテクニックで知られる彼は、他に例のないエネルギーと魂の融合で、世界中のあらゆるオーディエンスから賞賛されています。
                  </p>
                  <p>
                    2022年、コーリーはHotoneの多機能Soul Press IIペダルを見出し、すぐにその虜になりました。それ以来、Soul Press IIは彼のライブパフォーマンスに欠かせないペダルになりました。
                  </p>
                  <p>
                    ２年後の今、Hotoneチームは、Cory Wongのために特別にデザインし直したペダル、Wong Pressを彼のインプットを基に製作しました。Soul Pressシリーズの多機能設計フィロソフィーに基づいてデザインされたこのニューペダルには、コーリーのカスタムスペックが含まれています。特徴的な青と白の配色、カスタマイズされたボリュームペダルカーブ、調整可能なワウQレンジ、二つの動作モードを示すトラベルライトです。
                  </p>
                  <p>
                    アーティストとエンジニアが共に協力し、音楽性を追求して完成しました。Cory Wongは音楽性に対してほぼ完璧主義的なアプローチをとっています。「Hotoneのエンジニアと緊密に協力してペダルのパラメーターと周波数範囲を微調整し、より音楽的で機械的ではないトーンに仕上がりました。」
                  </p>
                </div>

                <div className="mt-8 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <p className="text-gray-700 text-sm">Cory Wongの要望を取り入れたプレスペダル</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <p className="text-gray-700 text-sm">トゥルーバイパス</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <p className="text-gray-700 text-sm">4 in 1機能（ボリューム、エクスプレッション、ワウ、ボリューム/ワウ）</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <p className="text-gray-700 text-sm">ペダルのモードと位置をリアルタイムで示すデュアルカラー・ステータスLED</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <p className="text-gray-700 text-sm">コーリーのカスタム・ボリュームカーブとワウQコントロール</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <p className="text-gray-700 text-sm">柔軟な音域を備えたクラシックなワウトーン</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <p className="text-gray-700 text-sm">オリジナルトーンを損なわないアクティブボリューム設計</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <p className="text-gray-700 text-sm">独立したチューナー出力とエクスプレッション出力により、より多くの接続方法を実現</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <p className="text-gray-700 text-sm">9V DC または 9Vバッテリー</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Concept Section - Dark Background */}
      <section className="py-16 bg-concept-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">製品コンセプト</h3>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="space-y-20 max-w-7xl mx-auto">
            {/* 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative w-full aspect-[16/10]">
                  <Image
                    src="/images/brands/hotone/wong_press_ii/concept_01.png"
                    alt="Cory Wong Performance"
                    fill
                    className="rounded-xl shadow-2xl object-cover"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h4 className="text-2xl font-bold text-white mb-6">
                  コーリーが求めたトーンとペダルの感触の完璧なレベルへの追求
                </h4>
                <p className="text-gray-300 leading-relaxed text-sm">
                  コーリーが求めたトーンとペダルの感触の完璧なレベルへの追求は、開発チームにとって大きな課題でした。Q値レンジを無数に調整した結果、Hotoneのエンジニアは、予期せぬQ設定値の変更がサウンドに影響を与えるリスクを最小限に抑えながら、コーリーが望んでいた正確なWAHトーンを実現できました。
                </p>
                <p className="text-gray-300 leading-relaxed text-sm mt-4">
                  さらに、コーリーのフィードバックに基づいて、よりスムーズで音楽的なボリュームの変化を実現するためにボリュームコントロールが微調整され、全体的なボリュームの変化が向上しました。
                </p>
              </div>
            </div>

            {/* 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h4 className="text-2xl font-bold text-white mb-6">
                  象徴的なブルーとホワイト、Cory Wong「クラシックの真髄」
                </h4>
                <p className="text-gray-300 leading-relaxed text-sm">
                  このビンテージネイビーにインスパイアされた青と白の配色は、Cory Wongのロゴと組み合わされて、ペダルの美学とアーティストのユニークなスタイルを完璧に融合させたデザインを生み出しています。Wong Pressのロゴも彼の独特の雰囲気を反映しており、デザインとコーリーの個性がシームレスに結びついています。
                </p>
              </div>
              <div>
                <div className="relative w-full aspect-[16/10]">
                  <Image
                    src="/images/brands/hotone/wong_press_ii/concept_02.jpg"
                    alt="Cory Wong Stage"
                    fill
                    className="rounded-xl shadow-2xl object-cover"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>

            {/* 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative w-full aspect-[16/10]">
                  <Image
                    src="/images/brands/hotone/wong_press_ii/concept_03.png"
                    alt="World Tour"
                    fill
                    className="rounded-xl shadow-2xl object-cover"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h4 className="text-2xl font-bold text-white mb-6">
                  ワールドツアーの要求に応える。あなたの堅固なパートナー！
                </h4>
                <p className="text-gray-300 leading-relaxed text-sm">
                  Wong Pressは、すでにコーリー・ウォンの激しいワールドツアーに同行し、見事に厳しいテストに合格しました。コーリー曰く「私はこのペダルのテストバージョンを使用して、信じられないほどツアーで厳しいテストを行いました。世界中に持ち歩き、飛行機に投げ込み、車のトランクにも投げ込みましたよ。すべてスーツケースに詰め、ペリカンやハードケースにさえ詰めて、求める耐久性があるかどうかを確認しました。私がその耐久性を保証します！」
                </p>
                <p className="text-gray-300 leading-relaxed text-sm mt-4">
                  Hotoneデザイン・インスピレーションのフィロソフィーに沿って、Wong Pressはデザインとインスピレーションの完璧な融合を表現しています。これで、ミュージシャンは自分の内なるCory Wongをチャネリングし、Wong Pressで演奏する自由と喜びを楽しむことができます。
                </p>
              </div>
            </div>

            {/* 4 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h4 className="text-2xl font-bold text-white mb-6">
                  ステージ上で鮮明に表示される<br />
                  アップグレードされた二色のトラベルインジケーター
                </h4>
                <p className="text-gray-300 leading-relaxed text-sm">
                  Soul Press IIの象徴的なトラベルライトを2色のトラベルライト（ワウモードではブルー、ボリュームモードではグリーン）にアップグレードし、ライブパフォーマンスをより直感的で視覚的にモードを認識できるようにしました。
                </p>
              </div>
              <div>
                <div className="relative w-full aspect-[16/10]">
                  <Image
                    src="/images/brands/hotone/wong_press_ii/concept_04.png"
                    alt="Wah Pedal Features"
                    fill
                    className="rounded-xl shadow-2xl object-cover"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
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

          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">4つの機能を1つに集約：パワフルでありながらコンパクト！</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Wong Pressは、Soul Press IIの機能をベースに構築されており、その巧みに仕上げられたデザインにより、コンパクトでポータブルでありながら、優れたフットコントロールを提供してくれます。
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {/* Function 1 */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h4 className="font-bold text-gray-900 mb-4">ボリュームペダル</h4>
                <div className="mb-4 flex justify-center">
                  <Image
                    src="/images/brands/hotone/wong_press_ii/function_02.jpg"
                    alt="Volume Pedal"
                    width={100}
                    height={100}
                    className="mx-auto"
                  />
                </div>
                <p className="text-gray-600 text-sm">
                  ロスレスサウンドを保証するアクティブボリューム設計
                </p>
              </div>

              {/* Function 2 */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h4 className="font-bold text-gray-900 mb-4">ワウペダル</h4>
                <div className="mb-4 flex justify-center">
                  <Image
                    src="/images/brands/hotone/wong_press_ii/function_03.jpg"
                    alt="Wah Pedal"
                    width={100}
                    height={100}
                    className="mx-auto"
                  />
                </div>
                <p className="text-gray-600 text-sm">
                  Q（エフェクトレンジ）とTONE（周波数範囲）が調整可能
                </p>
              </div>

              {/* Function 3 */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h4 className="font-bold text-gray-900 mb-4">耐久性</h4>
                <div className="mb-4 flex justify-center">
                  <Image
                    src="/images/brands/hotone/wong_press_ii/function_04.jpg"
                    alt="Durability"
                    width={100}
                    height={100}
                    className="mx-auto"
                  />
                </div>
                <p className="text-gray-600 text-sm">
                  内部構造をアップグレード
                </p>
              </div>

              {/* Function 4 */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h4 className="font-bold text-gray-900 mb-4">視認性</h4>
                <div className="mb-4 flex justify-center">
                  <Image
                    src="/images/brands/hotone/wong_press_ii/function_05.jpg"
                    alt="Visibility"
                    width={100}
                    height={100}
                    className="mx-auto"
                  />
                </div>
                <p className="text-gray-600 text-sm">
                  クリアで見易いステータス表示
                </p>
              </div>

              {/* Function 5 */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h4 className="font-bold text-gray-900 mb-4">機能性</h4>
                <div className="mb-4 flex justify-center">
                  <Image
                    src="/images/brands/hotone/wong_press_ii/function_06.jpg"
                    alt="Functionality"
                    width={100}
                    height={100}
                    className="mx-auto"
                  />
                </div>
                <p className="text-gray-600 text-sm">
                  4つの選択モード（ボリューム、ワウ、ボリューム/ワウ、エクスプレッション）
                </p>
              </div>

              {/* Function 6 */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h4 className="font-bold text-gray-900 mb-4">入出力</h4>
                <div className="mb-4 flex justify-center">
                  <Image
                    src="/images/brands/hotone/wong_press_ii/function_02.jpg"
                    alt="Input/Output"
                    width={100}
                    height={100}
                    className="mx-auto"
                  />
                </div>
                <p className="text-gray-600 text-sm">
                  複数のI/Oオプションでプレイアビリティが向上
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Movie Section */}
      <section id="demo" className="py-20 scroll-mt-24 bg-white">
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
                src="https://www.youtube.com/embed/fjwxNuTNuoE"
                title="WONG PRESS Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-2 mb-4">入出力</h3>
                <div className="space-y-3 text-sm">
                  <div className="border-b border-gray-200 pb-2">
                    <span className="text-gray-900">ポット抵抗（EXP OUT）：10kΩ</span>
                  </div>
                  <div className="border-b border-gray-200 pb-2">
                    <span className="text-gray-900">入力インピーダンス：1MΩ</span>
                  </div>
                  <div className="border-b border-gray-200 pb-2">
                    <span className="text-gray-900">出力インピーダンス：100Ω</span>
                  </div>
                  <div className="border-b border-gray-200 pb-2">
                    <span className="text-gray-900">ワウレンジセレクター（TONE）：ウォーム - 290Hz～1.4kHz、クラシック - 360Hz～1.8kHz</span>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-2 mb-4">サイズ・重量</h3>
                <div className="space-y-3 text-sm">
                  <div className="border-b border-gray-200 pb-2">
                    <span className="text-gray-900">電源仕様：DC9Vセンターマイナス、または9Vバッテリー</span>
                  </div>
                  <div className="border-b border-gray-200 pb-2">
                    <span className="text-gray-900">消費電流：最大30mA</span>
                  </div>
                  <div className="border-b border-gray-200 pb-2">
                    <span className="text-gray-900">サイズ：81mm（W）x 162mm（D）x 51mm（H）</span>
                  </div>
                  <div className="border-b border-gray-200 pb-2">
                    <span className="text-gray-900">重量：512g</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
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
