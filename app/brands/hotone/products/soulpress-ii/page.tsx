"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Download } from 'lucide-react'
import { BlogSlider } from "@/components/blog-slider"
import { downloadManual } from "@/lib/manual-download"

type Section = "concept" | "features" | "block-diagram" | "manual" | "specs"

const navigationItems = [
  { id: "concept" as Section, label: "コンセプト" },
  { id: "concept" as Section, label: "主な機能" },
  { id: "features" as Section, label: "コントロール" },
  { id: "block-diagram" as Section, label: "ブロック図" },
  { id: "manual" as "manual", label: "取扱説明書", isDownload: true },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function SoulPressIIPage() {
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
    downloadManual("hotone", "soulpress-ii")
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
          src="/images/brands/hotone/soul_press_ii/hero.jpg"
          alt="Soul Press II"
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
                <p className="text-2xl font-bold text-gray-900">SOUL PRESS II</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">ワウ＆ボリュームペダル</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-hotone">
                  ¥19,250
                </p>
                <p className="text-xs text-gray-500">前後（税込）</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">6959473904060</p>
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

      {/* Intro Section */}
      <section className="py-20 scroll-mt-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              １台４役！
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              コンパクトな本格仕様
            </h3>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/de-B09AM3O8"
                  title="Soul Press II Introduction"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">関連情報</p>
                <div className="space-y-2">
                  <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm">
                    <span>☆</span>
                    <span>SOUL PRESS 製品情報</span>
                  </a>
                  <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm">
                    <span>☆</span>
                    <span>VOW PRESS 製品情報</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>
                  多機能なミニペダルとして話題となったSoul Press＆Vow Pressが、装いも新たに、更に進化したSoul PressⅡとして登場しました。本製品は、同社のAmperoシリーズにも使用されている、丈夫で「滑らない」エクスプレッションペダル筐体を採用し、安心して踏めるちょうどいいミッドサイズに仕上がっています。機能としては、ほとんどのギタリストが最もよく使う定番のVolume、Expression、Wah、Volume/Wah の4種類を内蔵し、複数のアプリケーションに対応できるよう設計されています。特に、EXP OUTは他の機能とも併用でき、Wah＋Digital Effectのエクスプレッションコントロールが同時に行えます。
                </p>
                <p>
                  Wahは、Q（フィルターレンジ）にTONE（フィルター移動帯域レンジ）を備え、強烈なワウからメロウなトーンまで、幅広いジャンルに対応するサウンドクリエイションが可能です。また、チューナーアウト搭載でいつでもシームレスに調音できる上、ペダルポジションがモニターできるLEDインジケーターを装備し、暗いステージでも正確なコントロールが可能です。進化したSoul PressⅡは、コンパクトでシンプルでありながら、ステージでもスタジオでも即戦力の１台４役で、どんなペダルボードにも本格プロ仕様のサウンドを提供します。
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <p className="text-gray-700 text-sm">トゥルー・バイパス</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <p className="text-gray-700 text-sm">81（W）× 162（D）× 51mm（H）ペダル面のサイズを拡大した設計</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <p className="text-gray-700 text-sm">ペダルポジションをリアルタイム表示するLEDインジケーター</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <p className="text-gray-700 text-sm">Volume、Expression、Wah、Volume/Wah の4機能を搭載</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <p className="text-gray-700 text-sm">伝説のワウサウンドを継承</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <p className="text-gray-700 text-sm">広いレンジのワウサウンドをテーラーできるQ（フィルターレンジ）をTONE（フィルター移動帯域レンジ）搭載</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <p className="text-gray-700 text-sm">音の劣化を防ぐアクティブボリュームを採用</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <p className="text-gray-700 text-sm">チューナーアウトとエクスプレッションアウトを個々に搭載</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <p className="text-gray-700 text-sm">9VDCアダプター＆9Vバッテリーの両電源サプライ仕様</p>
                </div>
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

      {/* Product Concept Section */}
      <section id="concept" className="scroll-mt-24 bg-black py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">主な機能</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          {/* 4 Icons Row - Small icons with text below */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {/* 1. サウンドの進化 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Image
                  src="/images/brands/hotone/soul_press_ii/concept_01.png"
                  alt="サウンドの進化"
                  width={80}
                  height={80}
                  className="w-20 h-20 object-contain"
                  loading="lazy"
                />
              </div>
              <h4 className="text-lg font-bold text-white mb-3">サウンドの進化</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                ボリューム回路をアクティブに変更し、パッシブ回路の「トーンサック」信号ロスを排除しました。これにより、音痩せすることなく、芯のあるサウンドを響かせることが出来ます。
              </p>
            </div>

            {/* 2. 構造の進化 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Image
                  src="/images/brands/hotone/soul_press_ii/concept_02.png"
                  alt="構造の進化"
                  width={80}
                  height={80}
                  className="w-20 h-20 object-contain"
                  loading="lazy"
                />
              </div>
              <h4 className="text-lg font-bold text-white mb-3">構造の進化</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                駆体構造を改良し、基板の据わり、メカノイズや経年疲労を大幅に改善し、過酷な使用にも耐える構造に進化しました。
              </p>
            </div>

            {/* 3. 機能の進化 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Image
                  src="/images/brands/hotone/soul_press_ii/concept_03.png"
                  alt="機能の進化"
                  width={80}
                  height={80}
                  className="w-20 h-20 object-contain"
                  loading="lazy"
                />
              </div>
              <h4 className="text-lg font-bold text-white mb-3">機能の進化</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                ギタリストなら持っておきたいVolume、Expression、Wah、Volume/Wah の４機能をこの１台に搭載しました。
              </p>
            </div>

            {/* 4. Wahフィルター */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Image
                  src="/images/brands/hotone/soul_press_ii/concept_04.png"
                  alt="Wahフィルター"
                  width={80}
                  height={80}
                  className="w-20 h-20 object-contain"
                  loading="lazy"
                />
              </div>
              <h4 className="text-lg font-bold text-white mb-3">Wahフィルター</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                コアアプリのWahでは、Q（フィルターレンジ）にTONE（フィルター移動帯域レンジ）機能を追加して、幅広いジャンルに対応するサウンドメイキングを可能にしました。
              </p>
            </div>
          </div>

          {/* Feature Sections - Image left, text right */}
          <div className="space-y-16">
            {/* 5. マルチI/O */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <Image
                  src="/images/brands/hotone/soul_press_ii/concept_05.png"
                  alt="マルチI/O"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
                />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">マルチI/O</h4>
                <p className="text-gray-300 leading-relaxed">
                  エクスプレッション機能はEXP OUTに接続すれば、どのモード設定でも同時使用が可能で、使い方が広がります。
                </p>
              </div>
            </div>

            {/* 6. クリアーなステータスLED表示 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <Image
                  src="/images/brands/hotone/soul_press_ii/concept_06.gif"
                  alt="クリアーなステータスLED表示"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg"
                  unoptimized
                />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">クリアーなステータスLED表示</h4>
                <p className="text-gray-300 leading-relaxed">
                  ペダルポジションをLED表示します。モード毎に異なるLEDカラーでリアルタイム表示され、暗いステージやスタジオでも正確なコントロールが可能です。
                </p>
              </div>
            </div>

            {/* 7. デザインの進化 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <Image
                  src="/images/brands/hotone/soul_press_ii/concept_07.gif"
                  alt="デザインの進化"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg"
                  unoptimized
                />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">デザインの進化</h4>
                <p className="text-gray-300 leading-relaxed mb-4">
                  軽量アルミダイキャストボディに、ダブルスティールシャフトでペダル部を設置。高い安定感と堅牢性を実現しました。
                </p>
                <p className="text-gray-400 text-sm">
                  サイズ：81mm（W）×162mm（D）×51mm（H）
                </p>
              </div>
            </div>

            {/* 8. ユーザーフィールの進化 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <Image
                  src="/images/brands/hotone/soul_press_ii/concept_08.png"
                  alt="ユーザーフィールの進化"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
                />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">ユーザーフィールの進化</h4>
                <p className="text-gray-300 leading-relaxed">
                  収納性を極めた前モデルのミニサイズから、より安心して踏み込みやすいミッドサイズへ一回りサイズアップしながら*、Amperoでも定評のある、滑り止めサーフェスを採用し、安心＆クイックな踏み心地を実現しました。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-gray-50">
        {/* Main Features Section */}
        <section id="features" className="py-20 scroll-mt-24 bg-white">
          <div className="container mx-auto px-6">
            {/* Product Image */}
            <div className="max-w-4xl mx-auto mb-16">
              <Image
                src="/images/brands/hotone/soul_press_ii/control_01.gif"
                alt="Soul Press II Controls"
                width={800}
                height={500}
                className="w-full h-auto"
                unoptimized
              />
            </div>

            {/* Controls Grid */}
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8">
                {/* Left Column */}
                <div className="space-y-8">
                  {/* INPUT */}
                  <div>
                    <div className="inline-block bg-gray-200 px-4 py-2 rounded-full mb-3">
                      <span className="text-sm font-medium text-gray-800">♪ INPUT</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      ギターを接続する1/4&quot;モノラル・フォーン端子です。（ハイ・インピーダンス）
                    </p>
                  </div>

                  {/* EXPOUT */}
                  <div>
                    <div className="inline-block bg-gray-200 px-4 py-2 rounded-full mb-3">
                      <span className="text-sm font-medium text-gray-800">♪ EXPOUT</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      エクスプレッション用の1/4&quot; TRSジャックです。外部機器のEXP INにTRSケーブルで接続します。接続する機器の推奨EXPインピーダンスを確認してください。どのモード設定でもEXP出力は常に動作します。エクスプレッションペダルとしてだけ使用する場合は、電源接続は必要ありません。
                    </p>
                  </div>

                  {/* OUTPUT */}
                  <div>
                    <div className="inline-block bg-gray-200 px-4 py-2 rounded-full mb-3">
                      <span className="text-sm font-medium text-gray-800">♪ OUTPUT</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      ロー・インピーダンスのオーディオ出力端子です。
                    </p>
                  </div>

                  {/* TUNER OUT */}
                  <div>
                    <div className="inline-block bg-gray-200 px-4 py-2 rounded-full mb-3">
                      <span className="text-sm font-medium text-gray-800">♪ TUNER OUT</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      入力された信号をチューナーへ常時送れる1/4&quot;モノ出力です。
                    </p>
                  </div>

                  {/* POWER */}
                  <div>
                    <div className="inline-block bg-gray-200 px-4 py-2 rounded-full mb-3">
                      <span className="text-sm font-medium text-gray-800">♪ POWER</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      本機は、9VDC 電源アダプター専用です。プラグはセンター・マイナスの5.5 x 2.1mm をご使用ください。
                    </p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  {/* MODE */}
                  <div>
                    <div className="inline-block bg-gray-200 px-4 py-2 rounded-full mb-3">
                      <span className="text-sm font-medium text-gray-800">◎ MODE</span>
                    </div>
                    <div className="space-y-3 mt-2">
                      <div>
                        <p className="text-gray-900 font-medium text-sm">☰ V</p>
                        <p className="text-gray-700 text-sm ml-4">ボリューム・ペダルとして使用するボリューム・モードです。</p>
                      </div>
                      <div>
                        <p className="text-gray-900 font-medium text-sm">☰ W</p>
                        <p className="text-gray-700 text-sm ml-4">ワウ・ペダルとして使用するワウ・モードです。</p>
                      </div>
                      <div>
                        <p className="text-gray-900 font-medium text-sm">☰ V/W</p>
                        <p className="text-gray-700 text-sm ml-4">スイッチ切り替え可能なボリューム/ワウペダルとして使用するV/Wモードです。</p>
                      </div>
                    </div>
                  </div>

                  {/* TONE */}
                  <div>
                    <div className="inline-block bg-gray-200 px-4 py-2 rounded-full mb-3">
                      <span className="text-sm font-medium text-gray-800">◎ TONE</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      ワウ・フィルターのスイープする周波数レンジを切り替えます。
                    </p>
                  </div>

                  {/* Q */}
                  <div>
                    <div className="inline-block bg-gray-200 px-4 py-2 rounded-full mb-3">
                      <span className="text-sm font-medium text-gray-800">◎ Q</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      ワウ・フィルターの幅（Q）を調整します。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Block Diagram Section */}
        <section id="block-diagram" className="py-20 scroll-mt-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">ブロック図</h2>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 rounded-full hotone-bar" />
              </div>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-center">
                <Image
                  src="/images/brands/hotone/soul_press_ii/block_01.jpg"
                  alt="ブロック図"
                  width={800}
                  height={500}
                  className="rounded-lg w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Specs Section */}
        <section id="specs" className="py-20 scroll-mt-24 bg-gray-100">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900">入出力、その他</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="px-6 py-4">
                    <span className="text-gray-900">入力インピーダンス：1MΩ</span>
                  </div>
                  <div className="px-6 py-4">
                    <span className="text-gray-900">出力インピーダンス：100kΩ</span>
                  </div>
                  <div className="px-6 py-4">
                    <span className="text-gray-900">ワウレンジ・セレクター：WARM　290Hz〜1.4kHz、CLASSIC 360Hz〜1.8kHz</span>
                  </div>
                  <div className="px-6 py-4">
                    <span className="text-gray-900">電源：DC9Vパワーサプライ（センターマイナス）</span>
                  </div>
                  <div className="px-6 py-4">
                    <span className="text-gray-900">消費電流：最大30mA</span>
                  </div>
                  <div className="px-6 py-4">
                    <span className="text-gray-900">サイズ：81mm (W) × 162mm (D) × 51mm (H)</span>
                  </div>
                  <div className="px-6 py-4">
                    <span className="text-gray-900">重量：500g</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="mt-8 space-y-2">
                <p className="text-gray-600 text-sm">
                  ※製品の仕様及びデザインは改良のため予告なく変更することがあります。
                </p>
                <p className="text-gray-600 text-sm">
                  ※本製品以外の製品名および会社名は、各社の商号、登録商標または商標です。本文中で使用している名称は、音色の傾向をお伝えする目的で使用しております。
                </p>
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

