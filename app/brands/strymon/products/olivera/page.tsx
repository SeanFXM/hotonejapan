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

export default function OliveraPage() {
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
    downloadManual("strymon", "olivera")
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
      name: "A Fistful of Echoes",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/olivera/sound_01.mp3",
      photo: "/images/brands/strymon/olivera/sound_photo_01.webp",
    },
    {
      id: 2,
      name: "Doggie Pedal",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/olivera/sound_02.mp3",
      photo: "/images/brands/strymon/olivera/sound_photo_02.webp",
    },
    {
      id: 3,
      name: "Falling Leaves",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/olivera/sound_03.mp3",
      photo: "/images/brands/strymon/olivera/sound_photo_03.webp",
    },
    {
      id: 4,
      name: "Murky Chew Chew",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/olivera/sound_04.mp3",
      photo: "/images/brands/strymon/olivera/sound_photo_04.webp",
    },
    {
      id: 5,
      name: "Same Old Same Ol'",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/olivera/sound_05.mp3",
      photo: "/images/brands/strymon/olivera/sound_photo_05.webp",
    },
    {
      id: 6,
      name: "Shenandoah Avalon",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/olivera/sound_06.mp3",
      photo: "/images/brands/strymon/olivera/sound_photo_06.webp",
    },
    {
      id: 7,
      name: "Underwater Bicycle",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/olivera/sound_07.mp3",
      photo: "/images/brands/strymon/olivera/sound_photo_07.webp",
    },
    {
      id: 8,
      name: "Crash Pads",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/olivera/sound_08.mp3",
      photo: "/images/brands/strymon/olivera/sound_photo_08.webp",
    },
    {
      id: 9,
      name: "Dream Thyme",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/olivera/sound_09.mp3",
      photo: "/images/brands/strymon/olivera/sound_photo_09.webp",
    },
    {
      id: 10,
      name: "Tacky Grandma",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/olivera/sound_10.mp3",
      photo: "/images/brands/strymon/olivera/sound_photo_10.webp",
    },
    {
      id: 11,
      name: "Oberheimlich Maneuver",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/olivera/sound_11.mp3",
      photo: "/images/brands/strymon/olivera/sound_photo_11.webp",
    },
    {
      id: 12,
      name: "The Rhodes Less Traveled",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/olivera/sound_12.mp3",
      photo: "/images/brands/strymon/olivera/sound_photo_12.webp",
    },
    {
      id: 13,
      name: "Post-Rock Tumbler",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/olivera/sound_13.mp3",
      photo: "/images/brands/strymon/olivera/sound_photo_13.webp",
    },
    {
      id: 14,
      name: "New Vegas Radio",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/olivera/sound_14.mp3",
      photo: "/images/brands/strymon/olivera/sound_photo_14.webp",
    },
    {
      id: 15,
      name: "Bring Out Your Dead, Man",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/olivera/sound_15.mp3",
      photo: "/images/brands/strymon/olivera/sound_photo_15.webp",
    },
    {
      id: 16,
      name: "Change（In The House of Fried Chicken）",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/olivera/sound_16.mp3",
      photo: "/images/brands/strymon/olivera/sound_photo_16.webp",
    },
    {
      id: 17,
      name: "Oil Canary In A Coal Mine",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/olivera/sound_17.mp3",
      photo: "/images/brands/strymon/olivera/sound_photo_17.webp",
    },
    {
      id: 18,
      name: "Departing Optimism",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/olivera/sound_18.mp3",
      photo: "/images/brands/strymon/olivera/sound_photo_18.webp",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] overflow-hidden">
        <Image
          src="/images/brands/strymon/olivera/hero.jpg"
          alt="OLIVERA"
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
                <p className="text-2xl font-bold text-gray-900">OLIVERA</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">ビンテージ・オイル缶 エコー</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-gray-900">
                  ¥44,000
                </p>
                <p className="text-xs text-gray-500">前後（税込）</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">0852571008646</p>
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
              A Well Oiled Machine
            </h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500" />
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
                  src="https://www.youtube.com/embed/fgl2PxKC83I"
                  title="Olivera Oil Can Echo"
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
                  心地よく酔った雰囲気
                </h3>

                <div className="prose max-w-none mb-8">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    オーディオエフェクトがまだ未知の領域だった時代へと時計の針を戻し、本物のオイル缶エコーのヴィンテージで甘美な響きをご体感ください。
                    ダークでモジュレーションのかかったリピート音から、クラシックなスプリングリバーブタンクのサウンドに迫るサスティン感のあるテクスチャまで。Oliveraは、これらの風変わりなマシンの、機械的でありながらワイルドでオーガニックなキャラクターを捉えた初のペダルエミュレーションです。あらゆるサウンドにファンキーなインスピレーションを届けてくれます。
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
            {/* 革新的でユニークなオールドデザイン */}
            <div>
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
                革新的でユニークなオールドデザイン
              </h4>
              <div className="flex justify-center mb-8">
                <div className="relative w-full max-w-3xl aspect-[4/3]">
                  <Image
                    src="/images/brands/strymon/olivera/concept_01.jpg"
                    alt="Olivera Concept"
                    fill
                    className="rounded-xl shadow-2xl object-contain"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 80vw"
                  />
                </div>
              </div>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p className="text-base md:text-lg">
                  最初のオイル缶エコーは1959年、Tel-Rey社によって開発されました。テープの代わりに、導電性オイルを充填した小さな回転缶を誘電体として用い、リピート音を実現しました。この斬新なアプローチは、テープマシンで聴く音とは全く異なるサウンドを生み出し、リスナーを瞬時に、バイブ漂う、よりダークで濁った世界へと誘います。
                </p>
                <p className="text-base md:text-lg">
                  オリジナルデザインの膨大な変数からの忠実なエミュレーションは困難を極め、目指したリアリズムを実現するには、さらなる研究と全く新しいアルゴリズムが必要でした。Oliveraは、独特のリズムとディケイ特性を含んだダークなリピート音から、音の動きに合わせて変化し、モーフィングする非現実的で厚みのあるモジュレーションまで、オリジナルモデルの魂を捉えていると確信しています。オイル缶ディレイを再現できているディレイは他になく、ペダルエミュレーションでもOliveraに匹敵するものは存在しないと、我々は確信しています。
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-700 my-12"></div>

            {/* 最新機能で強化されたビンテージステレオエコー */}
            <div>
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
                最新機能で強化されたビンテージステレオエコー
              </h4>
              <div className="flex justify-center mb-8">
                <div className="relative w-full max-w-3xl aspect-[4/3]">
                  <Image
                    src="/images/brands/strymon/olivera/concept_02.jpg"
                    alt="Olivera Features"
                    fill
                    className="rounded-xl shadow-2xl object-contain"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 80vw"
                  />
                </div>
              </div>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p className="text-base md:text-lg">
                  Oliveraは、これらのノスタルジックなサウンドを現代の機材に簡単に組み込める強力な機能を多数搭載しています。左右のステレオ入力を独立して処理できるディスクリート・ステレオ操作、シンプルなコントロールセットとエクスプレッション・ペダル、そしてマルチスイッチ機能。ペダルをオフにしてもリピート音を維持するディレイ・スピルオーバー。卓越したタッチ感度と理想的な周波数特性を実現するディスクリート・クラスA JFETステレオ入力プリアンプ。パッチ呼び出しと連続コントローラー・データのMIDIコントロール。プレミアムなコンポーネント、耐久性に優れた頑丈な構造、そしてファームウェアのアップデートやコンピューターからのペダル操作に便利なUSBジャック。Oliveraなら簡単にモダン仕様に適応します。
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-700 my-12"></div>

            {/* オイル缶エコーとは？ */}
            <div>
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
                オイル缶エコーとは？
              </h4>
              <div className="flex justify-center mb-8">
                <div className="relative w-full max-w-3xl aspect-[4/3]">
                  <Image
                    src="/images/brands/strymon/olivera/concept_03.png"
                    alt="Oil Can Echo Diagram"
                    fill
                    className="rounded-xl shadow-2xl object-contain"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 80vw"
                  />
                </div>
              </div>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p className="text-base md:text-lg">
                  ビンテージオイル缶エコー機器は、回転する金属缶に静電気を帯電させる電気機械式ユニットです。オイルを潤滑剤として使用することで、缶の電荷を保持します。その結果生じる遅延信号は帯域が非常に制限され、濁った響きのエコーを生み出します。しかし、オイル缶エコーが持つ独特の雰囲気は、それだけではありません。
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-700 my-12"></div>

            {/* オイル缶エコーの構成 */}
            <div>
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
                オイル缶エコーの構成
              </h4>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p className="text-base md:text-lg">
                  これらのユニットは録音ヘッドと通常は2つの再生ヘッドを備えていますが、消去ヘッドは備えていないのが一般的です。そのため、缶の回転時に電荷がいくらか残存します。それが、システムに2つの独自の特性をもたらします。
                </p>
                <div className="space-y-4 ml-6">
                  <p className="text-base md:text-lg">
                    まず、再生ヘッドからのフィードバック（REGEN）がかかっていない場合でも、再生リピート音を生成します。静電気には独自の減衰時定数があるため、どのような設定でもエコーの「リピート」が常に発生します。
                  </p>
                  <p className="text-base md:text-lg">
                    次に、エコーの再生リズムに不均一なリズムを生成します。最初のエコーは録音ヘッドから再生ヘッドまでの距離で発生しますが、その後のエコーは、消散した信号が戻ってくる際に、システムの回転速度で発生します。結果として生じる不均一な遅延リズムは、強い「リズム」要素がないにもかかわらず、独特の雰囲気を作り出す大きな要因となっています。
                  </p>
                  <p className="text-base md:text-lg">
                    再生ヘッドからのフィードバック（REGEN）を追加したり、2つのヘッドの出力を組み合わせることで、エコーの雰囲気が増します。
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
                  src="https://www.youtube.com/embed/s-ybKsRbwsQ"
                  title="Olivera Demo Video 1"
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
                  src="https://www.youtube.com/embed/zhzG1NcKx2Q"
                  title="Olivera Demo Video 2"
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

      {/* Sample Sound Section */}
      <section id="samples" className="py-20 scroll-mt-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">デモサウンド</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full bg-blue-600" />
            </div>
          </div>

          <div className="max-w-5xl mx-auto space-y-12 mb-20">
            {/* Control Descriptions */}
            <div className="space-y-10">
              {/* Time */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Time</h3>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-4">
                  オイル缶の回転速度を調整するように、Timeノブはリピートのディレイタイムを決定します。一部のビンテージ機では回転速度が固定されていましたが、本機ではこの回転速度を約200msから800msの範囲で調整できるようにし、さらにヘッド選択スイッチで調整することも可能にしています。
                </p>
                <div className="ml-6 space-y-2 text-gray-700 text-sm md:text-base">
                  <p>Short Head delay time：72ms – 290ms</p>
                  <p>Long Head delay time：155ms – 620ms</p>
                  <p>Disc Rotation, 200ms – 800ms (residual static repeats)</p>
                </div>
              </div>

              {/* Heads Control */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Heads Control</h3>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-4">
                  ビンテージのオイル缶エコーユニットには、録音ヘッドが１つと再生ヘッドが２つありました。録音ヘッドからの再生ヘッドの距離によってエコーの減衰時間が決まり、このスイッチで「Short」「Long」「Both」のいずれかを選択できます。
                </p>
                <div className="ml-6 space-y-3 text-gray-700 text-sm md:text-base">
                  <p><span className="font-semibold">Short：</span>録音ヘッドに最も近いヘッドが選択され、エコーは最短になります。</p>
                  <p><span className="font-semibold">Long：</span>録音ヘッドから最も遠いヘッドが選択され、エコーは最長になります。</p>
                  <p><span className="font-semibold">Both：</span>両方のヘッドが同時に有効になり、リピート音に不均一で複雑なタップ効果が得られます。</p>
                </div>
              </div>

              {/* Mix */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Mix</h3>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                  このコントロールはウェット信号とドライ信号のミックス比を決定します。ノブを約3時の位置へ回すと、ウェット信号とドライ信号が50/50の割合になります。
                </p>
              </div>

              {/* Rate */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Rate</h3>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                  モジュレーションのスピードをコントロールします。
                </p>
              </div>

              {/* Intensity */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Intensity</h3>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                  モジュレーションの強度をコントロールします。ノブを高く設定するほど、オーディオミックスにおけるモジュレーションの効果が顕著になります。
                </p>
              </div>

              {/* Regeneration */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Regeneration</h3>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-4">
                  このコントロールは、ビンテージ機では「リバーブ」と呼ばれることが多かったもので、オイル缶エコーにフィードバックされるエコーのリピート量をコントロールします。ノブを高く設定すると、残響的で雰囲気のあるキャラクターが生まれ、オイル缶エコーのサウンド特性を特徴づける要素の一つになります。
                </p>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg italic">
                  注：フットスイッチを押しながらRegenerationノブを回すと、リピートのトーンが調整できます。ノブの12時位置は、リファレンスユニットからキャプチャした特性です。低い設定では暗く、高い設定ではリピート音が明るくなります。
                </p>
              </div>

              {/* Infinite Mode */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Infinite Mode</h3>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                  Strymon MiniSwitch を使用すると、再生ノブを最大にしたときと同じように、連続リピートが有効になり、無限に進化するエコーが得られます。
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {audioFiles.map((audio) => (
                <div key={audio.id} className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-blue-500/30">
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
                          <h3 className="font-bold text-gray-900 text-base leading-tight">{audio.name}</h3>
                          <p className="text-gray-500 text-xs">{audio.description}</p>
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
                    src="/images/brands/strymon/olivera/function_01.jpg"
                    alt="MIDI"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-xs text-gray-500">機能紹介</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">MIDI</h3>
                  <p className="text-sm text-gray-600 mb-4 italic">Limitless Possibilities.</p>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    Oliveraは、完全なMIDIインプリメンテーションと300種類のプリセットを備えており、EXP/MIDIジャックまたはUSB接続を介してMIDIコントローラーやデジタルオーディオワークステーションからリモートコントロールが可能です。
                  </p>
                </div>
              </div>

              {/* Feature 2: トゥルー／バッファードバイパス */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src="/images/brands/strymon/olivera/function_02.jpg"
                    alt="True/Buffered Bypass"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-xs text-gray-500">機能紹介</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">トゥルー／バッファードバイパス</h3>
                  <p className="text-sm text-gray-600 mb-4 italic">Choose Your Bypass Mode.</p>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    Oliveraでは、ペダルがオフの状態で信号が加工されずにそのまま出力される、エレクトロメカニカルリレースイッチ式トゥルーバイパス（デフォルト）と、長いケーブルによる高域の損失を防ぎ、信号をそのまま維持するプレミアムバッファードバイパスのどちらかが選択できます。
                  </p>
                </div>
              </div>

              {/* Feature 3: JFET入力 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src="/images/brands/strymon/olivera/function_03.jpg"
                    alt="JFET Input"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-xs text-gray-500">機能紹介</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">JFET入力</h3>
                  <p className="text-sm text-gray-600 mb-4 italic">Analog Touch.</p>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    ディスクリート設計のクラスA JEFT入力プリアンプは、究極のダイナミクスとフィーリングを実現する当社のノウハウを凝縮した秘密兵器の一つです。プリアンプ回路は、入力されたオーディオ信号を可能な限り理想的な方法で処理できるよう準備し、超低ノイズ動作とフラットな周波数特性を実現します。
                  </p>
                </div>
              </div>

              {/* Feature 4: ステレオ入出力 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src="/images/brands/strymon/olivera/function_04.jpg"
                    alt="Stereo Input/Output"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-xs text-gray-500">機能紹介</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">ステレオ入出力</h3>
                  <p className="text-sm text-gray-600 mb-4 italic">Moving In Stereo.</p>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    Oliveraは完全なステレオ入出力機能を備え、入力されたステレオ信号を独立して処理するため、シグナルチェーン内の任意の場所、どこにでも配置できます。リアパネルの専用スイッチからは、モノラル入力/モノラル出力、モノラル入力/ステレオ出力、ステレオ入力/ステレオ出力の3種類の入出力ルーティングが選択できます。専用のTRSステレオ入力と出力により、パッチング接続も容易です（ステレオ入力と出力には、各ジャックにTRSケーブルが必要です）。
                  </p>
                </div>
              </div>

              {/* Feature 5: パワフルなARMプロセッサー搭載 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src="/images/brands/strymon/olivera/function_05.jpg"
                    alt="ARM Processor"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-xs text-gray-500">機能紹介</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">パワフルなARMプロセッサー搭載</h3>
                  <p className="text-sm text-gray-600 mb-4 italic">Power To The Pedal.</p>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    モバイルデバイスやノートパソコンが牽引する技術革新の成果であるARMプロセッサーを、現在多くの製品に採用しています。これらのデバイスは、これまで以上に多くの同時処理を実行できる一方で、消費電流は大幅に低減しています。これにより、ペダルボードの電源供給からの消費電流を抑えながら、よりパワフルな処理能力で、あらゆる音のニュアンスをエミュレートすることが可能になりました。
                  </p>
                </div>
              </div>

              {/* Feature 6: より幅広いコントロールと柔軟性 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src="/images/brands/strymon/olivera/function_06.jpg"
                    alt="Wider Control and Flexibility"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-xs text-gray-500">機能紹介</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">より幅広いコントロールと柔軟性</h3>
                  <p className="text-sm text-gray-600 mb-4 italic">Switch Things Up A Bit.</p>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    Strymon MultiSwitch PlusをOliveraに接続することで、より幅広いコントロールと柔軟性が得られます。プリセットモードではお気に入りの３つのサウンドに瞬時にアクセスでき、カスタムモードではモジュレーションの切り替え、お気に入りのプリセットの呼び出し、無限リピート機能の有効化など、これらすべてをコンパクトなペダル1台で実現できます。
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
                    src="/images/brands/strymon/olivera/control_01.png"
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
                {/* HEADS */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200">
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">HEADS</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11 mb-3">
                    ３ポジションのトグルスイッチで、異なるディレイタイムとパターンに合わせてアクティブな再生ヘッドを選択します。
                  </p>
                  <div className="ml-11 space-y-2">
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                      <span className="font-semibold">long：</span>録音ヘッドから離れた位置で、ディレイタイムが長くなります。
                    </p>
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                      <span className="font-semibold">short：</span>録音ヘッドに近く、ディレイタイムが短くなります。
                    </p>
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                      <span className="font-semibold">both：</span>両方のヘッドを有効にして、マルチタップエコーパターンを生成します。
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
                    ビンテージオイル缶エコーでは、オイル缶の回転速度を変化させることでディレイタイムを調整します。TIMEは仮想的な回転速度を調整します。ディレイタイムはHEADSの選択によっても決まります。
                  </p>
                </div>

                {/* RATE */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200">
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">RATE</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11">
                    エコーリピートに適用されるモジュレーションの速度をコントロールします。
                  </p>
                </div>

                {/* INTENSITY */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200">
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">INTENSITY</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11">
                    モジュレーションの深さを調整します。最小値ではモジュレーションはオフになります。
                  </p>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11 mt-2 italic">
                    *注：オプションとして、Strymon MultiSwitch Plus または MiniSwitch を使用して、モジュレーション、無限リピートなどをリモートで切り替えることができます。
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
                    ドライ信号とウェット信号のバランスをコントロールします。最小でドライ信号100%、最大でウェット信号100%まで調整できます。DRY SIGNALがデフォルトのデジタルモードに設定されている場合、3時の位置にすると50/50のミックスになります。
                  </p>
                </div>

                {/* REGEN */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200">
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">REGEN</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11">
                    選択したヘッドから入力へフィードバックされるディレイ信号量を調節します。最小値では、ヘッドフォンに残こる静電気の影響で多少エコーが残ります。最大値では、発振音とエンドレスリピート音が発生します。
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
                    エフェクトのオン/オフを切り替えます。
                  </p>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11 mt-3">
                    ペダル上部のレッドLEDが点灯している場合は、エフェクトがオンになっていることを示します。デフォルトではトゥルーバイパスが選択されていますが、Oliveraはオプションでバッファードバイパスへの設定変更も可能です。フットスイッチを押しながらREGENを回すと、ライブエディットのTONE機能が調整できます。フットスイッチを2秒間長押しするとSAVE/EXPRESSIONモードに入るか、エクスプレッションペダルのパラメータ割り当てを設定できます。
                  </p>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11 mt-3 italic">
                    *注意：発信リピートは急速に大きくなる可能性があります。発信リピートを引き起こす可能性のある高いREGEN設定で短いエコー時間を使用することは避けてください。
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
                    src="/images/brands/strymon/olivera/control_02.png"
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
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11">
                    Oliveraの機能を外部から制御するための多機能コミュニケーションジャックです。以下のいずれかのモードで動作するように設定できます。
                  </p>
                  <div className="ml-11 mt-3 space-y-1">
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">・エクスプレッションペダルモード</p>
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">・お気に入りモード</p>
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">・Modモード</p>
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">・Infiniteモード</p>
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">・MIDIモード</p>
                  </div>
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
                      <span className="font-semibold">mono：</span>ギターなどのモノラル入力信号を使用します。出力はモノラルです。デフォルトはトゥルーバイパスです。
                    </p>
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                      <span className="font-semibold">mono → stereo：</span>モノラル入力信号を使用します。出力はステレオです。*バイパスモードはバッファードバイパスです。
                    </p>
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                      <span className="font-semibold">stereo：</span>ステレオ入力信号を使用します。OUTジャックにステレオケーブルを接続すると、出力はトゥルーステレオになります。*バイパスモードはバッファードバイパスです。
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
                    src="/images/brands/strymon/olivera/software_01.webp"
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
                      <span className="text-gray-900 font-medium text-base">トゥルーバイパス（エレクトロメカニカル・リレースイッチング）</span>
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

