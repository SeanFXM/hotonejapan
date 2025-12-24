"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Download } from 'lucide-react'
import { BlogSlider } from "@/components/blog-slider"
import { downloadManual } from "@/lib/manual-download"

type Section = "concept" | "demo" | "samples" | "features" | "controls" | "software" | "manual" | "specs"

const navigationItems = [
  { id: "concept" as Section, label: "コンセプト" },
  { id: "demo" as Section, label: "デモムービー" },
  { id: "samples" as Section, label: "デモサウンド" },
  { id: "features" as Section, label: "主な特長" },
  { id: "controls" as Section, label: "コントロール" },
  { id: "software" as Section, label: "ソフトウエア" },
  { id: "manual" as "manual", label: "取扱説明書", isDownload: true },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function Ec1Page() {
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
    downloadManual("strymon", "ec-1")
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

  // 音频文件列表
  const audioFiles = [
    {
      id: 1,
      name: "New Tape, New You",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/ec-1/sound_01.mp3",
      photo: "/images/brands/strymon/ec-1/sound_photo_01.png",
    },
    {
      id: 2,
      name: "Gas Giant Telex",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/ec-1/sound_02.mp3",
      photo: "/images/brands/strymon/ec-1/sound_photo_02.png",
    },
    {
      id: 3,
      name: "Kids In The Fall",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/ec-1/sound_03.mp3",
      photo: "/images/brands/strymon/ec-1/sound_photo_03.png",
    },
    {
      id: 4,
      name: "Jog Like Heck",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/ec-1/sound_04.mp3",
      photo: "/images/brands/strymon/ec-1/sound_photo_04.png",
    },
    {
      id: 5,
      name: "Echo Boogie",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/ec-1/sound_05.mp3",
      photo: "/images/brands/strymon/ec-1/sound_photo_05.png",
    },
    {
      id: 6,
      name: "Dirty Water",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/ec-1/sound_06.mp3",
      photo: "/images/brands/strymon/ec-1/sound_photo_06.png",
    },
    {
      id: 7,
      name: "Bell Bottoms",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/ec-1/sound_07.mp3",
      photo: "/images/brands/strymon/ec-1/sound_photo_07.png",
    },
    {
      id: 8,
      name: "Back And Forth",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/ec-1/sound_08.mp3",
      photo: "/images/brands/strymon/ec-1/sound_photo_08.png",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] overflow-hidden">
        <Image
          src="/images/brands/strymon/ec-1/hero.jpg"
          alt="EC-1"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        <div className="relative container mx-auto px-6 h-full flex items-center justify-end">
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-white/30 w-96">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 tracking-wider">strymon®</h1>
            </div>

            <div className="space-y-4 text-gray-900">
              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">製品名：</p>
                <p className="text-2xl font-bold text-gray-900">EC-1</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">single head dTape エコー</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-gray-900">
                  ¥47,000
                </p>
                <p className="text-xs text-gray-500">前後（税込）</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">0852571008592</p>
              </div>
            </div>

            <div className="mt-6">
              <Button
                className="w-full text-white text-base py-6 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
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
                    className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-200 bg-blue-600"
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              A Timeless Classic Reborn
            </h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full bg-gradient-to-r from-purple-500 to-red-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Video */}
            <div className="space-y-6">
              {/* YouTube Video */}
              <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dZ71exGmr0U"
                  title="EC-1 dTape Echo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Right Column - Product Description */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  時を超え、クラシック・テープエコーがここに生まれ変わる
                </h3>

                <div className="prose max-w-none mb-8">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    チューブプリの豊かな倍音を備えた、夢の中で浮遊するようなクラシックな60年代のテープエコーサウンドを体感してください。繊細なメカニカルな欠陥によって生まれる有機的で幻想的なモジュレーションをぜひお楽しみください。ウォームなスラップバックから驚くほどゴージャスなステレオイメージを備えた広大なエコーフィードバックベッドまで、あらゆるエコーサウンドを簡単に表現できます。完璧に調整された低周波レスポンス、豊かなテープサチュレーション、崇高なエコーディケイを備えたEC-1 は、チューブプリ仕様のテープエコーが届けてくれる最高のサウンドをすべて提供してくれます。
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">プレミアムなハードウェア</h4>
                  <p className="text-gray-700 leading-relaxed text-sm mb-4">
                    超低ノイズのディスクリートアナログJFET入力回路が、演奏に優れたレスポンスを提供し、モノからモノ、モノからステレオ、またはステレオからステレオI/Oへ、リアパネルのスイッチで切り替えられます。さらに、ARM DSPチップ搭載により、より少ない消費電力で、繊細なサウンドニュアンスまで正確に再現する高い処理能力を可能にしました。
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">外部機器との接続によるコントロールが可能なTRS MIDI/Expジャック</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">フルMIDI対応。300のプリセット保存、リアルタイムのパラメータ制御が可能</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">TRSジャックを介したフルステレオ入出力</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">シームレスなTAPテンポ機能</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">DAW MIDI制御およびファームウェア更新のためのUSB-Cを装備</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">超低ノイズ、高性能 24 ビット 96kHz AD/DA コンバーター</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">32bit 浮動小数点プロセッシング</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">標準的S/N：116dB</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">9V DC 電源 センターマイナス、最小電流 250mA</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">Designed and built in the USA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Concept Section - Full Width Dark Background */}
      <section className="py-16 scroll-mt-24 bg-concept-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">製品コンセプト</h3>
            <div className="flex justify-center mt-6 mb-8">
              <div className="w-24 h-1 rounded-full bg-blue-600" />
            </div>
          </div>

          <div className="max-w-5xl mx-auto space-y-16">
            {/* テープ、チューブ、そして・・・とびきり最高の完成形へ。 */}
            <div>
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
                テープ、チューブ、そして・・・とびきり最高の完成形へ。
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src="/images/brands/strymon/ec-1/concept_01.jpg"
                    alt="EC-1 Concept"
                    fill
                    className="rounded-xl shadow-2xl object-contain"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="space-y-6 text-gray-300 leading-relaxed">
                  <p className="text-base md:text-lg">
                    EC-1の開発は、もともとビンテージ テープ エコーをリアルに再現することで定評あるEl Capistan ペダル用に開発された、画期的なシングル ムービング ヘッド アルゴリズムから始まりました。
                  </p>
                  <p className="text-base md:text-lg">
                    そこから…、私たちは幸運にも非常に特別なCesar Diaz（ギタリストで伝説のアンプ＆エフェクターテック）モッドのEchoplex EP-2 を入手することができました。また、それは驚くほど良好な状態で、EP-3 の周波数特性に近く、より温かみのあるサウンドを実現するための真空管プリアンプのモッドなど、いくつかの巧みな変更がユニットに加えられていることがわかりました。彼のモッドは、さまざまなビンテージ Echoplex モデルの最良の面を組み込むことを目的としていたようで、その刺激的な成果は EC-1の開発に大きな影響を与え、すぐにノスタルジックを感じさせるキャラクターを吹き込みました。
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-700 my-12"></div>

            {/* フル機能を備えたコンパクト・ステレオ・テープエコー */}
            <div>
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
                フル機能を備えたコンパクト・ステレオ・テープエコー
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src="/images/brands/strymon/ec-1/concept_02.jpg"
                    alt="EC-1 Features"
                    fill
                    className="rounded-xl shadow-2xl object-contain"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="space-y-6 text-gray-300 leading-relaxed">
                  <p className="text-base md:text-lg">
                    EC-1 は、小型でエレガントな躯体から、圧倒的なパワーとフレキシビリティーを提供します。：選択可能なチューブプリアンプのモデリングボイス。アーティファクトのないタップテンポ。左右ステレオ入力独立のディスクリート ステレオプロセッシング。シンプルでストレートなコントロール＆エクスプレッションペダル機能。ハイインピーダンス、超低ノイズのディスクリート クラス A JFET ステレオ入力プリアンプによる、優れたタッチ感度、ダイナミクス、フィールを実現します。テンポ、パッチの保存/呼び出しなどのMIDIコントロール。プレミアムコンポーネント、頑丈な構造、ファームウェアのアップデートの実行とコンピューターからペダル制御を行うUSBジャックも搭載。
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
              <div className="w-24 h-1 rounded-full bg-blue-600" />
            </div>
          </div>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Video 1 */}
              <div className="bg-black rounded-2xl overflow-hidden aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dZ71exGmr0U"
                  title="EC-1 Demo Video 1"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              {/* Video 2 */}
              <div className="bg-black rounded-2xl overflow-hidden aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/BvN49aYALcw"
                  title="EC-1 Demo Video 2"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              {/* Video 3 */}
              <div className="bg-black rounded-2xl overflow-hidden aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/tuyWvtDh-_E"
                  title="EC-1 Demo Video 3"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              {/* Video 4 */}
              <div className="bg-black rounded-2xl overflow-hidden aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/k41_TwuiXX8"
                  title="EC-1 Demo Video 4"
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

      {/* Sound Design Section */}
      <section id="samples" className="py-20 scroll-mt-24 bg-concept-dark">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">サウンドデザイン</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500" />
            </div>
          </div>

          <div className="max-w-7xl mx-auto space-y-16 mb-20">
            {/* プリアンプ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src="/images/brands/strymon/ec-1/sounddesign_01.jpg"
                  alt="Preamp"
                  fill
                  className="rounded-xl shadow-2xl object-contain"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">プリアンプ</h3>
                <p className="text-sm text-gray-400 mb-4">入力信号エンハンサー</p>
                <div className="space-y-4 text-gray-300 leading-relaxed text-base">
                  <p>
                    細心の注意を払った真空管モデリング技術を採用したEC-1プリアンプは、入力信号に絶妙なビンテージ感を与える2つのプリアンプ回路（モデリング）から選択できます。
                  </p>
                  <p>
                    １つはクラシックな EP-2チューブプリアンプをベースにしており、ダークなハムバッカーサウンドを明るくするのに最適な強化されたハイエンド シェルフを備えています。もう1つのプリアンプ オプション（デフォルト設定）は、EC-1の開発中に研究した EP-2 ユニットの改造プリアンプ回路に基づいており、温かみあるバランスの取れたレスポンスを生成します。
                  </p>
                  <p>
                    このオプションは、特にシングルコイルに心地よい重量感を追加します。どちらのプリアンプを選択しても、最大 +6dB のブーストが可能です。また、必要に応じてプリアンプをバイパスして未処理のドライ信号を出力することもできます。
                  </p>
                </div>
              </div>
            </div>

            {/* Strymon dTape System */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative w-full aspect-[4/3] lg:order-2">
                <Image
                  src="/images/brands/strymon/ec-1/sounddesign_02.jpg"
                  alt="Strymon dTape System"
                  fill
                  className="rounded-xl shadow-2xl object-contain"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="space-y-4 lg:order-1">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Strymon dTape System</h3>
                <p className="text-sm text-gray-400 mb-4">テープの物語</p>
                <div className="space-y-4 text-gray-300 leading-relaxed text-base">
                  <p>
                    当社の独自の dTapeテクノロジーは、最初はEl Capistan用に開発されました。そして、最近入手した、一般的には考えられないほど素晴らしい状態にあったチューブEchoplex の研究中に遭遇した、すべての感動的なニュアンスを再現するために、そのテクノロジーをさらに向上させました。
                  </p>
                  <p>
                    私たちの dTape システムは、研究してきたすべてのテープ エコーのあらゆる側面を正確に複製することを可能にします。EC-1では、移動ヘッドの効果、テープの状態、バイアス設定、モーターの機械的効果、キャプスタンの滑りなど、ビンテージ テープ エコーの紛れもない感動的なサウンドを生み出すために積み重なるすべての不規則性が含まれます。
                  </p>
                </div>
              </div>
            </div>

            {/* Record Level */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src="/images/brands/strymon/ec-1/sounddesign_03.jpg"
                  alt="Record Level"
                  fill
                  className="rounded-xl shadow-2xl object-contain"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Record Level</h3>
                <p className="text-sm text-gray-400 mb-4">満足なサチュレーション</p>
                <div className="space-y-4 text-gray-300 leading-relaxed text-base">
                  <p>
                    最もクリーンなリピート、微妙な太さ、またはまったくダーティなエコーが必要な場合でも、スイッチを切り替えるだけでテープサチュレーションを瞬時に調整できます。
                  </p>
                  <p>
                    ３段階の録音レベル トグルスイッチは、薄い音から太い音への心地よい音色変化を、仮想録音ヘッドへの信号ゲインで生み出します。ユニティゲインのlowポジションを選択すると、バイアスが最適化されて最もクリーンなリピートが得られ、mediumポジションではバイアスが増加し入力信号が6dBブーストされて、わずかにサチュレートしたリピート音が得られます。Highポジションでは、さらに入力信号が12dBブーストされ、バイアスが増加して深くサチュレートしたリピート音が得られます。
                  </p>
                  <p>
                    また、このコントロールを使用すると、EC-1 への入力信号レベルに素早く簡単に合わせることができ、あらゆるピックアップタイプやペダルボード構成から目的のサウンドを得ることができます。
                  </p>
                </div>
              </div>
            </div>

            {/* Mechanics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative w-full aspect-[4/3] lg:order-2">
                <Image
                  src="/images/brands/strymon/ec-1/sounddesign_04.jpg"
                  alt="Mechanics"
                  fill
                  className="rounded-xl shadow-2xl object-contain"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="space-y-4 lg:order-1">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Mechanics</h3>
                <p className="text-sm text-gray-400 mb-4">不完全さの美しさ</p>
                <div className="space-y-4 text-gray-300 leading-relaxed text-base">
                  <p>
                    EC-1では、モーターや機構部品の変動を徹底的に研究し、その欠陥を正確に捉えました。
                  </p>
                  <p>
                    Mechanics コントロールレンジの下限では、モーター関連の遅いワウフラッターのみが反映されますが、1 時付近では、これらの変動は減少し、しわ、継ぎ目、キャプスタンの滑りによる速い乱れが優先され、我々（所有）のEP-2 ユニットのサウンドを正確に再現します。この設定では、ステレオ スペクトル全体に広がる、独特の残響がある3次元のエコーが生み出されます。
                  </p>
                  <p>
                    メカニクス設定を最大値に近づけると、より遅い変動がより顕著にミックスされ、複数の不完全性のユニークな組み合わせにより、これまでに聞いたことのない、本当にゴージャスで有機的なステレオモジュレーションエフェクトが再生されます。
                  </p>
                </div>
              </div>
            </div>

            {/* Tape Age */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src="/images/brands/strymon/ec-1/sounddesign_05.jpg"
                  alt="Tape Age"
                  fill
                  className="rounded-xl shadow-2xl object-contain"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Tape Age</h3>
                <p className="text-sm text-gray-400 mb-4">成熟したメディア</p>
                <div className="space-y-4 text-gray-300 leading-relaxed text-base">
                  <p>
                    エコーリピートの周波数特性は、テープ個々の帯域幅によって部分的に決まるため、古いテープの場合は帯域幅が狭く、高域が甘く温かいサウンドになります。
                  </p>
                  <p>
                    EC-１では、テープのTape Ageコントロールを上げて温かいリピートにしたり、最小設定にして新品のテープのフル帯域幅のサウンドにしたりすることで、これらの特性を忠実に再現します。
                  </p>
                </div>
              </div>
            </div>

            {/* Repeats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative w-full aspect-[4/3] lg:order-2">
                <Image
                  src="/images/brands/strymon/ec-1/sounddesign_06.jpg"
                  alt="Repeats"
                  fill
                  className="rounded-xl shadow-2xl object-contain"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="space-y-4 lg:order-1">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Repeats</h3>
                <p className="text-sm text-gray-400 mb-4">全て完璧にコントロールできます。</p>
                <div className="space-y-4 text-gray-300 leading-relaxed text-base">
                  <p>
                    EC-1 は、非常に豊かで高レベルのリピートを再生できるように設計されていますが、制御不能なフィードバック起こすことはありません。
                  </p>
                  <p>
                    発信フィードバックを起こす境目にある広いスイートスポットは、リードやリズムプレイで魅力的なバックグランドを作成できます。もちろん、リピートコントロールを最大にして、スライド式録音ヘッドテープエコーだけが生み出せるユニークなピッチ効果を鳴らしながら演奏したい場合でも、それらのエフェクトはサウンド・レスポンス共に、正確に再現されます。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {audioFiles.map((audio) => (
                <div key={audio.id} className="group relative bg-gray-800/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-blue-500/30">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-6 relative">
                    <div className="mb-4 bg-black rounded-lg overflow-hidden">
                      <Image
                        src={audio.photo}
                        alt={audio.name}
                        width={400}
                        height={300}
                        className="w-full h-48 object-contain rounded-lg"
                      />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-600">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-base leading-tight">{audio.name}</h3>
                          <p className="text-gray-400 text-xs">{audio.description}</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded-lg bg-blue-600 text-white">
                        {String(audio.id).padStart(2, '0')}
                      </span>
                    </div>
                    <audio controls className="w-full h-10 rounded-lg">
                      <source src={audio.src} type="audio/mpeg" />
                    </audio>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 scroll-mt-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">主な特長</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full bg-blue-600" />
            </div>
          </div>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1: MIDI */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src="/images/brands/strymon/ec-1/function_01.jpg"
                    alt="MIDI"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">MIDI</h3>
                  <p className="text-sm text-gray-600 mb-4 italic">Limitless Possibilities.</p>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    EC-1はMIDIフル対応です。本体のEXP/MIDIジャックまたはUSB-C接続を介して、コントローラーまたはDAWからのMIDIコマンドを受け、ほぼすべてのスイッチ、ノブ、および設定をリモート制御することができます。エコータイムはMIDIクロックに同期させることができ、同期はプリセット毎に設定できます。お気に入りのプリセットは300まで保存できます。
                  </p>
                </div>
              </div>

              {/* Feature 2: トゥルー／バッファードバイパス */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src="/images/brands/strymon/ec-1/function_02.jpg"
                    alt="True/Buffered Bypass"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">トゥルー／バッファードバイパス</h3>
                  <p className="text-sm text-gray-600 mb-4 italic">Choose Your Bypass Mode.</p>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    EC-1は、100% ピュアな未処理の信号を得るための機械式リレー・スイッチによるトゥルー・バイパス（これがデフォルト設定）と、長いケーブルを使用しても高域の劣化が起きないプレミアム・クオリティーのバッファード・バイパスが選択できます。
                  </p>
                </div>
              </div>

              {/* Feature 3: JFET入力 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src="/images/brands/strymon/ec-1/function_03.jpg"
                    alt="JFET Input"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">JFET入力</h3>
                  <p className="text-sm text-gray-600 mb-4 italic">Analog Touch.</p>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    妥協のないダイナミクスとフィーリング。優れたタッチ感度と応答性。EC-1は、ハイ・インピーダンスの超低ノイズ・ディスクリート・クラスA JFETプリアンプ入力により、そのサウンドと同じくらい優れたプレイ・フィーリングを実現します。
                  </p>
                </div>
              </div>

              {/* Feature 4: ステレオ入出力 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src="/images/brands/strymon/ec-1/function_04.jpg"
                    alt="Stereo Input/Output"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">ステレオ入出力</h3>
                  <p className="text-sm text-gray-600 mb-4 italic">Moving In Stereo.</p>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    EC-1 は完全なステレオ入出力機能を備えており、入力されるステレオ信号を個別に処理するため、ステレオ エフェクトチェーンのどこにでも配置できます。 また、信号パスのステレオ起点として使用したい場合は、モノラル入力を受けてステレオ出力することもできます。 EC-1のシングルTRS入出力により、コンパクトな駆体でありながらステレオコネクションが可能です。 リアパネルにある専用入力スイッチによって、モノラル入力→モノラル出力、モノラル入力→ステレオ出力、またはステレオ入力→ステレオ出力（ステレオ入力と出力には、各ジャックに TRSケーブルが必要です）を選択して、オーディオ ルーティングが決定できます。
                  </p>
                </div>
              </div>

              {/* Feature 5: パワフルなARMプロセッサー搭載 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src="/images/brands/strymon/ec-1/function_05.jpg"
                    alt="ARM Processor"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">パワフルなARMプロセッサー搭載</h3>
                  <p className="text-sm text-gray-600 mb-4 italic">Power To The Pedal.</p>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    携帯電話とコンピューターの大幅な開発による技術の進化で、ペダルは以前より少ない消費電力で、より多くのプロセッシングを同時に実行できるようになりました。つまり、ペダルボードの消費電力を抑えつつ、あらゆる音のニュアンスに対してより多くの処理能力を発揮します。
                  </p>
                </div>
              </div>

              {/* Feature 6: 正確なインスタントタップテンポ入力 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src="/images/brands/strymon/ec-1/function_06.jpg"
                    alt="Accurate Instant Tap Tempo"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">正確なインスタントタップテンポ入力</h3>
                  <p className="text-sm text-gray-600 mb-4 italic">March To Your Own Beat.</p>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    EC-1のテンポタップは、本物のテープエコーでは不可能なシームレスな方法で実行できます。テンポをタップ入力時に、ピッチシフト、クリック、ランプ、ミュートの症状を起こしません。タイムノブでテンポ（ディレイ長）を設定するときは、スライディングヘッドテープエコーの特徴であるピッチシフトエフェクトを使えますが、テンポをタップ入力する際は新しい設定値にスムーズに変更され、グルーブを維持できます。テンポがタップ入力されたら、タイムノブで3 連符、8分、付点8分、または 4分音符の解像度でのタップディビジョンが設定できます。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Controls Section */}
      <section id="controls" className="py-20 scroll-mt-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">コントロール</h2>
            <div className="flex justify-center">
              <div className="w-20 h-1 rounded bg-blue-600" />
            </div>
          </div>

          <div className="max-w-5xl mx-auto space-y-16">
            {/* Front Panel Controls */}
            <div>
              <div className="flex justify-center mb-12">
                <div className="relative w-full max-w-2xl">
                  <Image
                    src="/images/brands/strymon/ec-1/control_01.png"
                    alt="Controls - Front"
                    width={800}
                    height={900}
                    className="rounded-lg w-full"
                    priority
                  />
                </div>
              </div>

              {/* Control Descriptions */}
              <div className="space-y-8">
                {/* REC LEVEL */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200">
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">REC LEVEL</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11 mb-3">
                    ３ポジションのトグルスイッチで、仮想「録音ヘッド」に送られる信号のアナログゲインを選択し、オプションでエコー・マシンをより強くドライブしてリピートのサチュレーションを高めることができます。
                  </p>
                  <div className="ml-11 space-y-2">
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                      <span className="font-semibold">low：</span>ユニティーゲイン、最適化されたバイアスで最もクリーンなリピートが得られます。
                    </p>
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                      <span className="font-semibold">med：</span>6dB 入力信号をブーストし、わずかにサチュレートしたリピート音が得られるようにバイアスを増加します。
                    </p>
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                      <span className="font-semibold">high：</span>12dB 入力信号をブーストし、深くサチュレートしたリピート音が得られるようにバイアスを増加します。
                    </p>
                  </div>
                </div>

                {/* TIME */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200">
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">TIME</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11">
                    ディレイ・タイム（録音ヘッドを再生ヘッドに近づけたり遠ざけたりする仮想的な設定）を50ミリ秒から1秒のレンジでコントロールします。スライディング・レコード・ヘッドによるテープ・エコーの複雑さが忠実に再現されているため、リピート中にこのコントロールを調整すると、興味深いテープエコーの効果が生まれます。
                  </p>
                </div>

                {/* TAPE AGE */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200">
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">TAPE AGE</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11">
                    物理的なテープディレイマシンで、時間の経過とともに起こるテープ劣化と同じように、テープの周波数帯域幅を制御します。通常のテープは磨耗すると帯域幅が制限されます。TAPE AGEコントロールは、この摩耗した状態を再現します。最小に設定すると、新鮮な全帯域テープになります。ノブを時計回りに回すと、高い周波数レンジが低下します。
                  </p>
                </div>

                {/* REPEATS */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200">
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">REPEATS</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11">
                    エコーの繰り返し回数を、1回から発振まで変化させます。
                  </p>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11 mt-2 italic">
                    ノート：発振を起こさず、持続的に無限に繰り返すリピート音を得るには、3時に設定します。
                  </p>
                </div>

                {/* MIX */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200">
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">MIX</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11">
                    エコーミックスを、最小位置のフルドライから最大位置の（ドライシグナルなしの）フルウェットまでコントロールします。ノブ設定が3時の位置で50/50のミックスが得られます。
                  </p>
                </div>

                {/* MECHANICS */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200">
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">MECHANICS</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11">
                    摩擦、折り目、スプライス、汚れなど、機械的な速度変動やメディアの不規則性の量を制御します。新鮮でクリーンな記録メディアの場合は最小に設定します。修理が必要な記録メディアの場合は最大に設定します。
                  </p>
                </div>

                {/* FOOTSWITCH */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200">
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">FOOTSWITCH</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11">
                    エフェクトのオン/オフを実行します。エフェクトオンでLEDがレッドに点灯します。
                  </p>
                </div>
              </div>
            </div>

            {/* Rear Panel - Input/Output */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">入出力</h3>
              
              <div className="flex justify-center mb-12">
                <div className="relative w-full max-w-2xl">
                  <Image
                    src="/images/brands/strymon/ec-1/control_02.png"
                    alt="Controls - Details"
                    width={800}
                    height={900}
                    className="rounded-lg w-full"
                  />
                </div>
              </div>

              {/* Input/Output Descriptions */}
              <div className="space-y-8">
                {/* IN */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200">
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">IN</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11">
                    ハイ・インピーダンス、超低ノイズ、ディスクリート・クラス A JFET プリアンプ（ステレオ）入力です。ステレオ入力信号にはTRSアダプターケーブルが必要です。
                  </p>
                </div>

                {/* OUT */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200">
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">OUT</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11">
                    ロー・インピーダンス・ステレオTRS出力です。モノラル出力にはTS、ステレオ出力にはTRSを使用します。
                  </p>
                </div>

                {/* EXP/MIDI */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200">
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">EXP/MIDI</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11 mb-3">
                    本機の機能を外部から制御するための多機能通信ジャックです。ペダルのノブを連続的に制御するには、TRSエクスプレッション・ペダルを使用します（デフォルト設定）。
                  </p>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11 mb-3">
                    Expression Pedal、Favorite、Tap、Infinite、MIDI Mode の５つのモードのいずれかで動作するように選択＆設定できます。詳細については、ユーザーマニュアルを参照してください。
                  </p>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11">
                    Strymon Conduit、MultiSwitch Plus、MiniSwitch などの MIDI 通信またはアクセサリの設定の詳細については、ユーザーマニュアルを参照してください。
                  </p>
                </div>

                {/* I/O MODE SELECTOR */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200">
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">I/O MODE SELECTOR</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11 mb-3">
                    オーディオ入力セレクター
                  </p>
                  <div className="ml-11 space-y-3">
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                      <span className="font-semibold">mono：</span>モノ入力、モノ出力
                    </p>
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                      <span className="font-semibold">mono → stereo：</span>モノ入力、ステレオ出力
                    </p>
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                      <span className="font-semibold">stereo：</span>ステレオ入力、ステレオ出力
                    </p>
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg italic mt-3">
                      ノート：ステレオ信号の接続には、TRSアダプターまたはケーブルが必要です。
                    </p>
                  </div>
                </div>

                {/* USB-C */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200">
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">USB-C</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11">
                    MIDI経由での制御、およびファームウェアのアップデートを実行するためのコンピューター接続ポートです。
                  </p>
                </div>

                {/* 9VDC */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200">
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">9VDC</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11">
                    9VDC、センターマイナス、最小250mA定格のアダプターを使用してください。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Software Section */}
      <section id="software" className="py-20 scroll-mt-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">ソフトウエア</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full bg-blue-600" />
            </div>
          </div>

          <div className="max-w-7xl mx-auto space-y-12">
            {/* Strymon Update Software Introduction */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div>
                  <Image
                    src="/images/brands/strymon/ec-1/software_01.webp"
                    alt="Strymon Update"
                    width={500}
                    height={350}
                    className="w-full rounded-lg"
                  />
                  <p className="text-gray-500 text-xs mt-2 text-center">※ 画像はCloudburstを使用した例です。</p>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Strymon Updateソフトウェアの使用について</h3>
                    <p className="text-gray-700 leading-relaxed text-base">
                      Strymon Update 2.0 ソフトウェアをコンピュータにインストールした後、電源オンのデバイスをコンピュータに接続してアプリケーションを実行します。
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-700 leading-relaxed text-base mb-4">
                      下記より、ダウンロードするコンピューターに合わせたソフトウェアをダウンロードをしてください。
                    </p>
                    <p className="text-gray-700 font-semibold mb-4">Download Version.2.0.0.4</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href="https://www.strymon.net/downloads/strymonupdate2/strymon_update_2.0.0.4.pkg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                      >
                        <Download className="w-5 h-5" />
                        <span>macOS</span>
                      </a>
                      <a
                        href="https://www.strymon.net/downloads/strymonupdate2/strymon_update_2.0.0.4_.msix.zip"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors"
                      >
                        <Download className="w-5 h-5" />
                        <span>Windows</span>
                      </a>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-3">必要システム環境</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>macOS 11.6 以上</li>
                      <li>Windows 10 以上</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Connection Guidelines */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">接続ガイドライン</h3>
              <div className="space-y-4 text-gray-700 leading-relaxed text-base">
                <p>
                  USBポートを備えた Strymon ペダルまたはEurorackモジュールの場合は、互換性のある電源からスペックに適合した電源を供給し、USB 経由でコンピュータに接続します。
                </p>
                <p>
                  Conduitの場合は、デバイスを USB経由でコンピュータに接続します。 USB 経由で接続した場合は、Conduitへ外部電源を接続しないでください。
                </p>
                <p>
                  BigSky、Mobius、および TimeLine の場合は、外部電源から電力を供給し、ペダルのMIDI IN＆MIDI OUTポートを使用して Strymon Conduitなどの互換性のある MIDIインターフェイスでコンピューターに接続します。
                </p>
                <p>
                  これらのペダルの GLOBLS メニューで、MIDI THをON またはMERGEに設定します。
                </p>
              </div>

              <div className="mt-6 space-y-4 text-gray-700 leading-relaxed text-base">
                <p>
                  Strymon Update 2.0ソフトウェアは、接続されたデバイスを自動的に検出し、インストールされている現ファームウェアバージョンと、接続されているデバイスで使用可能な最新バージョンのファームウェアを表示します。
                </p>
                <p>
                  ソフトウェアの右上にあるボックス（※画像の「❶」）には、ソフトウェアに接続されている検出された互換性のある製品の数が表示されます。このボックスをクリックしてメニューを開き、Strymon Update 2.0 でアップデートを実行する製品を選択します。
                </p>
              </div>

              <div className="mt-6 bg-blue-50 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-3">アップデート手順</h4>
                <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
                  <li>接続されたデバイスで使用可能な新しいバージョンのファームウェアがある場合は、INSTALL UPDATE ボタンをクリックしてアップデートを実行します。</li>
                  <li>完了すると、インストールされたバージョンが使用可能なバージョンと一致し、デバイスが最新であることを示します。</li>
                  <li>デバイスをコンピュータから取り外します。</li>
                  <li>デバイスを使用する準備が整いました。</li>
                </ol>
              </div>
            </div>

            {/* Connection Methods */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Strymon Update 2との接続方法</h3>
              <div className="space-y-6">
                {/* BigSky, Mobius & TimeLine */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">BigSky、Mobius＆TimeLine</h4>
                  <p className="text-gray-700 leading-relaxed text-base">
                    これらのペダルは外部電源から必ず給電し、（USB 接続がないため）Strymon ConduitなどのMIDIインターフェイスでMIDI IN＆MIDI OUTポート接続ます。これらのペダルの GLOBLSメニューで、ペダルがソフトウェアと通信できるように MIDI TH を ON または MERGEに設定します。
                  </p>
                </div>

                {/* Conduit */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Conduit</h4>
                  <p className="text-gray-700 leading-relaxed text-base">
                    Conduitへの電源接続をすべて取り外し、USB-C ジャック経由で付属USB-Cケーブルでインターフェイスをコンピューターに接続します。
                  </p>
                </div>

                {/* Compadre, Riverside & Sunset */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Compadre、Riverside＆Sunset</h4>
                  <p className="text-gray-700 leading-relaxed text-base">
                    これらのペダルには、ペダルのシャーシ内にマイクロUSBポートがあり、底板を取り外すことでアクセスで、ペダルの左側にmicro-USBポートがあります。ペダルをコンピューターのUSBポートに接続するにはmicro-USBケーブルが必要です。
                  </p>
                </div>

                {/* blueSky v2, Deco v2, etc. */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">blueSky v2、Deco v2、DIG v2、El Capistan v2、Flint v2＆Lex v2、ZELZAH</h4>
                  <p className="text-gray-700 leading-relaxed text-base">
                    給電されているペダルの（ペダルの背面）USB-CジャックとコンピューターをUSB-C ケーブルで接続します。
                  </p>
                </div>

                {/* Iridium, NightSky & Volante */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Iridium、NightSky＆Volante</h4>
                  <p className="text-gray-700 leading-relaxed text-base">
                    給電されているペダルの（ペダルの背面）USB-CジャックとコンピューターをUSB-C ケーブルで接続します。
                  </p>
                </div>

                {/* Magneto, StarLab Eurorack */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Magneto、StarLab ユーロラック</h4>
                  <p className="text-gray-700 leading-relaxed text-base">
                    Magneto（＆StarLab）には、モジュールの背面、回路基板上にUSB-mini ポートがあります。付属のUSB-mini ケーブルでモジュールをコンピューターに接続し、アップデートしている間は、Magnetoに外部電源から供給が必要です。
                  </p>
                </div>
              </div>
            </div>

            {/* Troubleshooting */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Strymon アップデート2のトラブルシューティング</h3>
              <p className="text-gray-700 leading-relaxed text-base mb-6">
                Strymon Update アプリケーションを使用してデバイスを更新の際に問題が発生した場合、ソフトウェアにテキストが表示されたり、デバイスの動作が通常と異なる場合があります。
              </p>

              {/* バージョンナンバー */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">バージョンナンバー</h4>
                <p className="text-gray-700 leading-relaxed text-base mb-4">
                  ファームウェアの更新には 2つの部分があります: USER および DSPファームウェアです。オリジナルの工場出荷時のファームウェアで駆動するMagnetoモジュールを接続すると、「インストールされたバージョン/ installed version」は「1.00」と表示されます。お使いのデバイスで更新が中断されたり、更新の一部しかインストールされていない場合、「インストールされたバージョン」に異なる表示が出ます。例えば、USERコードが更新されても、DSPコードがまだ元の工場出荷時のバージョンである場合、ファームウェアの2つの部分が同期していないことを示す「D114-U042」が表示されます。これが発生した場合：
                </p>
                <ul className="space-y-2 text-gray-700 text-base ml-6 list-disc">
                  <li>アップデートを再度実行して、単一のバージョン番号 (例: 1.14) が表示されるを確認します。</li>
                  <li>ファイル形式のエラーが発生した場合は、[はい/ Yes] を選択して更新を続行します。問題が解決しない場合は、suport_02@hotone.jpに電子メールを送信して、問題の詳細、コンピューターシステムと接続、および受信したエラーメッセージを記載してください。</li>
                </ul>
              </div>

              {/* LEDの点滅 */}
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">LEDの点滅</h4>
                <p className="text-gray-700 leading-relaxed text-base mb-4">
                  ファームウェアの更新中に問題が発生した場合、ユニットの1つまたは複数のLED が白く点滅することがあります。これは、デバイスが「更新モード/ Update Mode」にあり、更新の実行を待機していることを示しています。 Strymon Updateソフトウェアは、このモードの間、デバイスを「strymon_recover」として認識します。デバイスを通常の機能に戻すには、以下の2つのオプションがあります。：
                </p>
                <ul className="space-y-2 text-gray-700 text-base ml-6 list-disc mb-4">
                  <li>Strymon Updateソフトウェアでもう一度アップデートを再実行します。</li>
                  <li>デバイスからUSB ケーブルと電源を取り外し、電源を再投入します。デバイスは通常の機能で起動します。</li>
                </ul>
                <p className="text-gray-700 leading-relaxed text-base">
                  これらを実行しても問題が解決できないときは、suport_02@hotone.jpに電子メールを送信して、問題の詳細、コンピューターシステムと接続、および受信したエラーメッセージを記載してください。
                </p>
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
              <div className="w-24 h-1 rounded-full bg-blue-600" />
            </div>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="bg-gray-200 rounded-2xl p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-8">
                {/* Column 1: インプット、アウトプット、スイッチ */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    インプット、アウトプット、スイッチ
                  </h3>
                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">入力インピーダンス</span>
                      <span className="text-gray-900 font-medium text-base">1 Meg Ohm</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">出力インピーダンス</span>
                      <span className="text-gray-900 font-medium text-base">100 Ohm</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">最大入力レベル</span>
                      <span className="text-gray-900 font-medium text-base">+10 dBu</span>
                    </div>
                  </div>
                </div>

                {/* Column 2: DSP、オーディオ */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    DSP、オーディオ
                  </h3>
                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">A/D & D/A</span>
                      <span className="text-gray-900 font-medium text-base">24bit/96kHz</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">S/N</span>
                      <span className="text-gray-900 font-medium text-base">116 dB typical</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">プロセッサー</span>
                      <span className="text-gray-900 font-medium text-base">520MHz ARM スーパー・スカラー・プロセッサー採用</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">演算方式</span>
                      <span className="text-gray-900 font-medium text-base">32bit 浮遊演算方式</span>
                    </div>
                  </div>
                </div>

                {/* Column 3: その他 */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    その他
                  </h3>
                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">バイパス</span>
                      <span className="text-gray-900 font-medium text-base">トゥルーバイパス（リレースイッチング）</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">入力電圧</span>
                      <span className="text-gray-900 font-medium text-base">9VDC センターマイナス、250mA</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">サイズ</span>
                      <span className="text-gray-900 font-medium text-base">69mm（幅）×117mm（縦）×64mm（高）※突起部含む</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">シャーシ</span>
                      <span className="text-gray-900 font-medium text-base">軽量、堅牢なアルマイト処理アルミシャーシを採用</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">製造</span>
                      <span className="text-gray-900 font-medium text-base">Designed and built in the USA</span>
                    </div>
                  </div>
                </div>
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
          href="/brands/strymon"
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

