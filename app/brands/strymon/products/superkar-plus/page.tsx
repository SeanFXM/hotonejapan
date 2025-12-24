"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Download } from 'lucide-react'
import { BlogSlider } from "@/components/blog-slider"

type Section = "concept" | "demo" | "sound-design" | "controls" | "specs"

const navigationItems = [
  { id: "concept" as Section, label: "コンセプト" },
  { id: "demo" as Section, label: "デモムービー" },
  { id: "sound-design" as Section, label: "サウンドデザイン" },
  { id: "controls" as Section, label: "コントロール" },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function SuperKarPlusPage() {
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

  // 音频文件列表
  const audioFiles = [
    {
      id: 1,
      name: "Bass and Chord Dynamics",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/SuperKar/sound_01.mp3",
      photo: "/images/brands/strymon/SuperKar/sound_01.jpg",
    },
    {
      id: 2,
      name: "CV Mania",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/SuperKar/sound_02.mp3",
      photo: "/images/brands/strymon/SuperKar/sound_01.jpg",
    },
    {
      id: 3,
      name: "Detune and Harmony CV",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/SuperKar/sound_03.mp3",
      photo: "/images/brands/strymon/SuperKar/sound_01.jpg",
    },
    {
      id: 4,
      name: "GlideCollide",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/SuperKar/sound_04.mp3",
      photo: "/images/brands/strymon/SuperKar/sound_01.jpg",
    },
    {
      id: 5,
      name: "Minor Accident",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/SuperKar/sound_05.mp3",
      photo: "/images/brands/strymon/SuperKar/sound_01.jpg",
    },
    {
      id: 6,
      name: "Pitch Mod CV",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/SuperKar/sound_06.mp3",
      photo: "/images/brands/strymon/SuperKar/sound_01.jpg",
    },
    {
      id: 7,
      name: "Portamento with StarLab",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/SuperKar/sound_07.mp3",
      photo: "/images/brands/strymon/SuperKar/sound_01.jpg",
    },
    {
      id: 8,
      name: "Random Chromatic to Both Voices",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/SuperKar/sound_08.mp3",
      photo: "/images/brands/strymon/SuperKar/sound_01.jpg",
    },
    {
      id: 9,
      name: "Solo Damp Pitch Chord Harmony",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/SuperKar/sound_09.mp3",
      photo: "/images/brands/strymon/SuperKar/sound_01.jpg",
    },
    {
      id: 10,
      name: "Solo Resonator",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/SuperKar/sound_10.mp3",
      photo: "/images/brands/strymon/SuperKar/sound_01.jpg",
    },
    {
      id: 11,
      name: "Solo Decay Damp Detune CV Chord Harmony CV",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/SuperKar/sound_11.mp3",
      photo: "/images/brands/strymon/SuperKar/sound_01.jpg",
    },
    {
      id: 12,
      name: "Solo Pitch CV Octaves",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/SuperKar/sound_12.mp3",
      photo: "/images/brands/strymon/SuperKar/sound_01.jpg",
    },
    {
      id: 13,
      name: "Super",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/SuperKar/sound_13.mp3",
      photo: "/images/brands/strymon/SuperKar/sound_01.jpg",
    },
    {
      id: 14,
      name: "Undamp My Heart",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/SuperKar/sound_14.mp3",
      photo: "/images/brands/strymon/SuperKar/sound_01.jpg",
    },
    {
      id: 15,
      name: "Variable Tempo",
      description: "サンプルセッティング",
      src: "/images/brands/strymon/SuperKar/sound_15.mp3",
      photo: "/images/brands/strymon/SuperKar/sound_01.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] overflow-hidden">
        <Image
          src="/images/brands/strymon/SuperKar/hero.jpg"
          alt="SuperKar+"
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
                <p className="text-2xl font-bold text-gray-900">SuperKar+</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">ユーロラック ボイスモジュール</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-gray-900">
                  ¥67,000
                </p>
                <p className="text-xs text-gray-500">前後（税込）</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">0852571008639</p>
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
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 text-base font-medium transition-colors duration-200 whitespace-nowrap ${
                  activeSection === item.id ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <span>{item.label}</span>
                {activeSection === item.id && (
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
              A New Type of Synth Module
            </h2>
            <h3 className="text-2xl md:text-3xl font-medium text-gray-700 mb-4">
              新しいタイプのシンセモジュール
            </h3>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            {/* Left Column - Video */}
            <div className="space-y-6">
              {/* YouTube Video */}
              <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/9Dl95sdd8Y4"
                  title="SuperKar+ Introduction"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Right Column - Product Description */}
            <div className="space-y-6">
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4 text-base md:text-lg">
                  SuperKar+は、Karplus-Strongシンセシスを採用したユーロラック・ボイス・モジュールです。弦の撥弦や弓弦、パイプや管の叩きつけや吹き込み、そしてパーカッシブなテクスチャからレガートのメロディー、そしてスマートなハーモニーを奏でるコードまで、様々なサウンドを再現します。Karplus-Strongシンセシスの最も直感的で魅力的なサウンドです。
                </p>
                <p className="text-gray-700 leading-relaxed mb-4 text-base md:text-lg">
                  Karplus-Strongはディレイ・フィードバックシンセの一種で、あらゆる音色とテクスチャが常に変化する状態にあります。SuperKar+は、アタック／ディケイタイムとダンピングのわずかな変化によって、繊細で劇的な音色変化を無限に生み出し、ノートごとにランダムにデチューンすることで、リアルな音色を生み出す、非常に魅力的なレスポンスを備えた楽器です。
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-sm">Karplus-Strongベースのボイスモジュール</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-sm">独立した2つのボイスチャンネル – ソロボイスとコードボイス</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-sm">各ボイスは最大16音のポリフォニック</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-sm">ソロボイスは、同時にサステイン可能な単音を演奏します</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-sm">コードボイスは、受信したV/Oct（Volt per Octave）CVのルートに基づいてコード構造を演奏します</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-sm">コードボイスは固定音程に対応し、スマートハーモニーも利用できます</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-sm">ワイド＆ナローステレオ、スプリットボイス、モノラル出力を選択可能</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-sm">MIDI入力でソロボイスをコントロールし、ベロシティ対応の16パートポリフォニックサウンドを実現します（MIDIを使用する場合は、ソロボイスのTRIGと ソロボイスのV/Oct CVを外してください）</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-sm">ソロボイスはCVで6オクターブ、MIDIで8オクターブまでチューニングが安定しており、コードボイスは5オクターブまでチューニングが安定しています</p>
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
            {/* 驚くほどパワフル、魅力的なほどシンプルで直感的 */}
            <div>
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
                驚くほどパワフル、魅力的なほどシンプルで直感的
              </h4>
              <div className="flex justify-center mb-8">
                <div className="relative w-full max-w-3xl aspect-[4/3]">
                  <Image
                    src="/images/brands/strymon/SuperKar/concept_01.jpg"
                    alt="SuperKar+ Concept"
                    fill
                    className="rounded-xl shadow-2xl object-contain"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 80vw"
                  />
                </div>
              </div>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p className="text-base md:text-lg">
                  一目で理解できるインターフェースを備えたSuperKar+モジュール1つで、あなたのｿｳｿﾞｳを超えた音楽が生み出せます。CV接続により、想像を絶する音楽的・音色のバリエーションを駆使し、豊かな響きのアレンジメントを生み出すことができます。無限のサウンド探求の中心となるに十分なパワーを備えたSuperKar+は、コンパクトな12HPのフォームファクターにこれらすべての要素を凝縮しています。
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-700 my-12"></div>

            {/* 自己完結型のボイスモジュール */}
            <div>
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
                自己完結型のボイスモジュール
              </h4>
              <div className="flex justify-center mb-8">
                <div className="relative w-full max-w-3xl aspect-[4/3]">
                  <Image
                    src="/images/brands/strymon/SuperKar/concept_02.jpg"
                    alt="SuperKar+ Self-Contained"
                    fill
                    className="rounded-xl shadow-2xl object-contain"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 80vw"
                  />
                </div>
              </div>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p className="text-base md:text-lg">
                  Karplus-Strongシンセシスの特性により、SuperKar+専用のVCAやアンプエンベロープを用意する必要はありません。ソロとコードのボイスそれぞれに独立したアタック、ディケイ、ダンピングが備わっており、さらにこのモジュールには、両方のボイスに独立した出力レベルを備えた内部ミキサーと、複数のステレオおよびモノラルオーディオ出力モードが搭載されています。
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-700 my-12"></div>

            {/* 2つの楽器を1つに：独立したメロディーとコード */}
            <div>
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
                2つの楽器を1つに：独立したメロディーとコード
              </h4>
              <div className="flex justify-center mb-8">
                <div className="relative w-full max-w-3xl aspect-[4/3]">
                  <Image
                    src="/images/brands/strymon/SuperKar/concept_03.jpg"
                    alt="SuperKar+ Two Instruments"
                    fill
                    className="rounded-xl shadow-2xl object-contain"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 80vw"
                  />
                </div>
              </div>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p className="text-base md:text-lg">
                  SuperKar+は、ソロボイスとコードボイスの2つのパート、つまり二つのボイスに分かれており、必要に応じて同時に、または独立して演奏できます。両方のボイスは、CV（コントロールボルテージ）で個別にトリガーおよびピッチ調整でき、ソロボイスはMIDI経由でポリフォニックにコントロールできます。
                </p>
                <p className="text-base md:text-lg">
                  両方のボイスで独立した音色を選択でき、各ボイスには独立したレベルコントロールがあり、必要に応じて別々のオーディオ出力にルーティングできます。
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
                  src="https://www.youtube.com/embed/JbsmNm1qXFk"
                  title="SuperKar+ Demo Video 1"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              {/* Video 2 - placeholder for second video if needed */}
              <div className="bg-black rounded-2xl overflow-hidden aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/9Dl95sdd8Y4"
                  title="SuperKar+ Demo Video 2"
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
      <section id="sound-design" className="py-20 scroll-mt-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">サウンドデザイン</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full bg-blue-600" />
            </div>
          </div>

          {/* Sound Design Image */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="relative w-full aspect-[4/3]">
              <Image
                src="/images/brands/strymon/SuperKar/sound_01.jpg"
                alt="Sound Design"
                fill
                className="rounded-xl shadow-2xl object-contain"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 80vw"
              />
            </div>
          </div>

          <div className="max-w-5xl mx-auto space-y-12 mb-20">
            {/* Inspiration */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Inspiration</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Karplus-Strongシンセシス</h4>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                    StrymonのシニアDSPエンジニアであり共同創設者でもあるPete Celiは、数年前にStarLab Experimental ReverbモジュールのモノフォニックKarplus-Strongボイスのチューニングを終えた際、すぐにスタンドアロンのポリフォニック楽器の構築方法を思いつきました。
                  </p>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg mt-4">
                    しかし、Karplus-Strong合成とは一体何なのでしょうか？この手法では、非常に短いディレイラインと高いフィードバックが、鋭いトランジェントまたはバーストノイズによって励起され、弦をはじく原理に非常によく似た音程のある音を生成します。より長い励起は弦を弾いたような音を作り出し、フィードバック構造の極性を反転させると、パイプやチューブのような音色を生み出すことができます。SuperKar+では、この合成方法はまるで生きているかのように、アタックタイムとディケイタイムのわずかな変化やダンピング（弦やパイプの振動をパームミュートのように減衰させる高周波フィルタリング）にも劇的に反応します。設定によっては、クレイドラムのようなテクスチャーさえも再現できるのです。
                  </p>
                </div>
              </div>
            </div>

            {/* Damp */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Damp：明るい響きからパームミュートまで</h3>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                Dampコントロールは単なるフィルターではありません。ディレイのフィードバック構造の一部であり、弦や管の振動の自由度に影響を与えます。Decayコントロールと組み合わせると、明るい響きのテクスチャから、深く響き渡る低音を伴うダークなサウンド、さらにはパームミュート効果まで、様々なサウンドを作り出すことができます。DampパラメーターをCVコントロールすると、非常にリアルで、まるで人間が演奏しているかのようなサウンドを作り出すことができます。
              </p>
            </div>

            {/* Decay */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Decay：フィードバックを再生</h3>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                短いアタックタイムと組み合わせることで、Decayコントロールは最小設定付近で非常に短くタイトなパーカッシブサウンドを作り出すことができます。高めの設定ではサウンドが自由に鳴り響き、最大設定付近ではチューニングされた自己発振も可能です。Damp、Decay、Attackの相互作用により、無限のバリエーションと魅力的な効果を生み出すことができます。これら3つはすべて、ノブとCVの両方でのコントロールが可能です。
              </p>
            </div>

            {/* Attack */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Attack：音色のアタック</h3>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                従来のADSR振幅エンベロープでは、アタックタイムが長くなると、ノートのフェードインにかなり長い時間がかかりますが、SuperKar+では、アタックタイムを長くすることで、短いストロークからより持続的なボウイング／ブローイングまで、様々なボウイング／ブローイングサウンドを生み出すことができます。アタックタイムを非常に短くすると、爪弾きやストライキングサウンドが得られます。DampやDecayのパラメーターと同様に、アタックタイムはノブまたはCVでコントロールでき、ノブはCV入力のオフセットとして機能します。
              </p>
            </div>

            {/* Detune */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Detune：ソロボイスのデチューン</h3>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                CV入力で利用可能なソロボイスのデチューン機能は、演奏されるすべてのノートに対してランダムなデチューンを可能にします。これにより、弦楽器のような音色を全く新しいレベルのリアリズムへと引き上げたり、音色に動きや不気味な雰囲気を加えたりすることができます。
              </p>
            </div>

            {/* Timbre */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Timbre：二つの音色の物語</h3>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                SuperKar+では、ボタンを押すだけで、各ボイスに独立した音色を選択できます。緑のLEDは弦楽器の正帰還を示し、赤のLEDは中空管楽器の負帰還を示します。
              </p>
            </div>

            {/* Glide */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Glide：ポルタメント・トゥ・ザ・ピープル</h3>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                可変グライド設定を使用すると、ピッチの変化を遅くすることができます。ノート間のピッチが離れるほど、効果はより顕著になります。
              </p>
            </div>

            {/* Harmony */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Harmony：ダブリング、オクターブ、スマートハーモニーなど</h3>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                ハーモニーコントロールを使用すると、力強いダブルノート、低音と高音のハーモニー、そして5度ハーモニーを作成できます。また、スケールと組み合わせることで、高度で広がりのあるコードを作成できるスマートハーモニーも選択できます。
              </p>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg mt-4">
                ボイスは「Solo/ソロ」と「Chord/コード」と表記されていますが、MIDIを経由してソロボイスでコードを演奏し、コードボイスでダブリングや低音のハーモニーを使ったベースラインを作成することもできます。制限するのはあなたの内なる想像力だけです。ハーモニーCV入力にLFOを適用することで、トレモロのようなユニークな効果を生み出すこともできます。振幅を変化させるのではなく、ハーモニーエクステンションの数を増減させます。
              </p>
            </div>

            {/* Scale */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Scale：スーパースケール+</h3>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                ハーモニー・パラメーターでスマート・ハーモニーを選択した場合、スケール設定によって生成されるコードの雰囲気が変わります。ハーモニック・マイナー、エオリアン、メジャー、拡張ボイシング・メジャー・スケール（ルートから離れたハーモニー用）、ドリアン、リディアン、フリジアン、またはオール・メジャー・コードから選択できます。
              </p>
            </div>

            {/* Pitch */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Pitch：ソロ・ボイス・ピッチ</h3>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                ソロ・ボイス・ピッチCV入力にLFOを接続すると、ビブラートやトリルを作成できます。また、エンベロープを接続すると、エンベロープベースのピッチエフェクトを作成できます。この入力は、ピッチを一定量オフセットするためにも使用できます。ピッチCV入力のレンジは±1オクターブです。
              </p>
            </div>

            {/* Output Settings */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">出力設定モード：ワイドステレオ、独立処理、＆その他</h3>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                SuperKar+は、驚くほど広がりのあるステレオイメージを作り出すことができます。２つのステレオ出力モードのどちらにおいても、コードボイスは、使用されているハーモニーの数に基づいて、同じタイプの満足できるステレオイメージを作り出します。しかし、ソロボイスの動作は異なります。
              </p>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg mt-4">
                どちらのステレオモードにおいても、ソロボイスのポリフォニーが1に設定されている場合、ソロボイスのノートはステレオイメージの中央で聴こえます。ソロボイスのポリフォニーが2ボイス以上に上げられると、交互にステレオイメージ内で左右にパンニングされます。ワイドステレオモードでは左右に大きくパンニングされ、ナローステレオモードでは10時と2時付近にパンニングされます。
              </p>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg mt-4">
                SuperKar+には、柔軟性を高める2つの出力モードが追加されています。
                Split Outputsモードでは、ソロボイスをOUT Lに、コードボイスをOUT Rに出力することで、それぞれの信号を個別に処理できます。Mono Sumモードでは、両方のボイスのモノラルミックス出力が両方の出力から出力され、同じミックスを複数の出力先に送ることができます。
              </p>
            </div>
          </div>

          {/* Audio Samples */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {audioFiles.map((audio) => (
                <div key={audio.id} className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-blue-500/30">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-6 relative">
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

      {/* Controls Section */}
      <section id="controls" className="py-20 scroll-mt-24 bg-gray-100">
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
                    src="/images/brands/strymon/SuperKar/control_01.png"
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
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">フロントパネル（ノブ、ボタン）</h3>
                  
                  <div className="space-y-6 mt-6">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">DAMP</h4>
                      <p className="text-gray-700 leading-relaxed text-base">
                        各ボイスの弦振動における高域の減衰を調整します。
                      </p>
                      <p className="text-gray-700 leading-relaxed text-base mt-2">
                        （レベル）: 各ボイスの出力レベルを調整します。
                      </p>
                      <p className="text-gray-700 leading-relaxed text-base mt-2 italic">
                        ※ TIMBREボタンを押しながらSOLO DAMPを回すと、３次機能にアクセスできます。
                      </p>
                      <p className="text-gray-700 leading-relaxed text-base mt-2">
                        SOLO DAMP：V/Oct補正を調整します。ダンピングは12時位置でニュートラルです。時計回りに回すと レスポンスがシャープになり、反時計回りに回すとレスポンスがフラットになります。
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">DECAY</h4>
                      <p className="text-gray-700 leading-relaxed text-base">
                        各ボイスの弦のサスティーンを調整します。
                      </p>
                      <p className="text-gray-700 leading-relaxed text-base mt-2">
                        （glide）：各ボイスのポルタメント効果を調整します。
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">ATTACK（polyphony）</h4>
                      <p className="text-gray-700 leading-relaxed text-base">
                        各ボイスの弦のアタックを、鋭いストライクから柔らかいボウイング（またはオルタナティブティンバーでは「ブレス」）まで変化させます。polyphonyでは、同時にサスティンするソロボイスの数を1から16まで設定します。
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">出力設定（out config）</h4>
                      <p className="text-gray-700 leading-relaxed text-base">
                        最小：ワイドステレオミックス（ソロボイス信号は左右にハードパンニングされ、オルタネートボイスとして出力され、コードボイスはステレオで出力されます）。
                      </p>
                      <p className="text-gray-700 leading-relaxed text-base mt-2">
                        10時：ナローステレオミックス（ソロボイス信号は左右にソフトパンニングされ、オルタネートボイスとして出力され、コードボイスはステレオで出力されます）。
                      </p>
                      <p className="text-gray-700 leading-relaxed text-base mt-2">
                        2時：スプリット出力（ソロボイスはOUT L、コードボイスはOUT Rから出力されます）。
                      </p>
                      <p className="text-gray-700 leading-relaxed text-base mt-2">
                        最大：両方のボイス信号がモノラルに加算され、OUT LとOUT Rの両方に出力されます。
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">TUNE</h4>
                      <p className="text-gray-700 leading-relaxed text-base">
                        出力ピッチを1オクターブ変化させます。
                      </p>
                      <p className="text-gray-700 leading-relaxed text-base mt-2">
                        （クオンタイズ）：最小から12時方向では連続的なTUNE調整となり、12時方向から最大方向では半音単位のクオンタイズとなります。
                      </p>
                      <p className="text-gray-700 leading-relaxed text-base mt-2 italic">
                        ※ TIMBREボタンを押しながらTUNEを回すと、３次機能にアクセスできます。
                      </p>
                      <p className="text-gray-700 leading-relaxed text-base mt-2">
                        TUNE：クオンタイズされたTUNEコントロールを使用する場合、±半ステップの微調整が可能で、あらゆる基準チューニングに対応します。
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">HARMONY</h4>
                      <p className="text-gray-700 leading-relaxed text-base">
                        ノブで15種類のハーモニー設定が選択できます。新しいハーモニーが選択されると、左側のTIMBREボタンのLEDが一瞬点滅し、再び点灯します。
                      </p>
                      <p className="text-gray-700 leading-relaxed text-base mt-2">
                        （スケール）：ノブで８つの異なるスケールタイプが選択できます。使用可能なハーモニーとスケールのリストについては、ユーザーマニュアルをご覧ください。
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">TIMBRE</h4>
                      <p className="text-gray-700 leading-relaxed text-base">
                        これらの2つのスイッチは、フィードバックの極性を選択することで弦の音色を変化させます。右のTIMBREボタンを長押しすると、２次機能にアクセスできます。
                      </p>
                      <p className="text-gray-700 leading-relaxed text-base mt-2">
                        左のTIMBREボタンはソロ・ボイスをコントロールします。長押しすると、３次機能にアクセスできます。
                      </p>
                      <p className="text-gray-700 leading-relaxed text-base mt-2">
                        右のTIMBREボタンはコード・ボイスをコントロールします。
                      </p>
                      <p className="text-gray-700 leading-relaxed text-base mt-2">
                        グリーンLEDは弦楽器ベースのサウンドの正帰還を示し、赤のLEDは中空管楽器ベースのサウンドの負帰還を示します。
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">フロントパネル（モジュレーション端子）/ SOLO VOICE</h3>
                  
                  <div className="space-y-4 mt-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">TRIG</h4>
                      <p className="text-gray-700 leading-relaxed text-base">立ち上がりエッジトリガー。0V ～ +5 V。</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">DAMP</h4>
                      <p className="text-gray-700 leading-relaxed text-base">連続コントロール。DAMPノブはオフセットとして機能します。-5V～+5V。</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">PITCH</h4>
                      <p className="text-gray-700 leading-relaxed text-base">ノートのピッチを±1オクターブ変更します。ビブラート、トリル、ハンマリング効果、またはピッチを一定量オフセットする場合に便利です。-5V ～ +5V。</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">ATTACK</h4>
                      <p className="text-gray-700 leading-relaxed text-base">アタックの連続コントロール。ソロボイスのATTACK ノブはオフセットとして機能します。-5V～+5V。</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">DETUNE</h4>
                      <p className="text-gray-700 leading-relaxed text-base">ノートトリガー時に、CV 値に応じてランダムなチューニングエラーを追加します。0V = 完璧なチューニング、5V = ランダムに最大チューニングがずれる。</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">MIDI</h4>
                      <p className="text-gray-700 leading-relaxed text-base">Solo Voice のMIDI コントロール用。MIDI 経由で８オクターブまで使用できます。（polyphony）２次機能を最大に設定すると、16ボイスのポリフォニックMIDI 音源モジュールとして機能します。</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">V/OCT</h4>
                      <p className="text-gray-700 leading-relaxed text-base">C0 = 0V、1V/オクターブ、６オクターブ範囲。0V～+6V。</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">DECAY</h4>
                      <p className="text-gray-700 leading-relaxed text-base">連続制御。DECAYノブはオフセットとして機能します。-5V～+5V。</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">IN</h4>
                      <p className="text-gray-700 leading-relaxed text-base">最大20Vpp。オーディオはトリガー入力と並列にソロ・ボイス・チャンネルの弦に直接送られ、弦をオーディオ的に励起したり、SuperKar+を共鳴器アレイとして使用したりできます。（ポリフォニー）セカンダリー機能を最小に設定すると、最良の結果が得られます。</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">フロントパネル（モジュレーション端子）/ CHORD VOICE</h3>
                  
                  <div className="space-y-4 mt-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">V/OCT</h4>
                      <p className="text-gray-700 leading-relaxed text-base">C0 = 0V、1V/オクターブ、コードルートの5オクターブ。安定性を最大限に高めるため、最も近い半音にクオンタイズされます。0V ～ +5V。</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">DECAY</h4>
                      <p className="text-gray-700 leading-relaxed text-base">連続可変。コードボイスのDECAYノブはオフセットとして機能します。-5V～+5V。</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">IN</h4>
                      <p className="text-gray-700 leading-relaxed text-base">最大20Vpp。オーディオはトリガー入力と並列にChord Voiceチャンネルの弦に直接送られ、弦のオーディオ励起を可能にしたり、SuperKar+を共鳴器アレイとして使用したりできます。</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">ATTACK</h4>
                      <p className="text-gray-700 leading-relaxed text-base">連続可変。コードボイスのATTACKノブはオフセットとして機能します。-5V～+5V。</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">HARMONY</h4>
                      <p className="text-gray-700 leading-relaxed text-base">連続可変。Chord Voice のHARMONY ノブはオフセットとして機能します。ノブの後半部分でハーモニーをスイープし、スマートハーモニーボイス数を増減します。-5V～+5V。</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">TRIG</h4>
                      <p className="text-gray-700 leading-relaxed text-base">立ち上がりエッジトリガー。0V ～ +5 V。</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">DAMP</h4>
                      <p className="text-gray-700 leading-relaxed text-base">連続可変。Chord VoiceのDAMPノブはオフセットとして機能します。-5V～+5V。</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">OUT L / OUT R</h4>
                      <p className="text-gray-700 leading-relaxed text-base">左右の出力。（出力設定）の２次機能を使用して、ステレオまたはモノラル出力を選択します。出力レベルは最大17.5Vppです。</p>
                    </div>
                  </div>
                </div>
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
                {/* Column 1: 入出力、スイッチ */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    入出力、スイッチ
                  </h3>
                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <span className="text-gray-900 font-medium text-base">ステレオ入出力</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-900 font-medium text-base">豊富なパラメータCVコントロール</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-900 font-medium text-base">ファームウェアアップデート用USBジャック（背面）</span>
                    </div>
                  </div>
                </div>

                {/* Column 2: オーディオ・クォリティー */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    オーディオ・クォリティー
                  </h3>
                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">プロセッサー</span>
                      <span className="text-gray-900 font-medium text-base">520MHz ARM スーパー スカラー プロセッサ</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">演算方式</span>
                      <span className="text-gray-900 font-medium text-base">32ビット浮動小数点処理</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">入力から出力までのSN比</span>
                      <span className="text-gray-900 font-medium text-base">108 dB（A-Weighted）</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">DACのSN比</span>
                      <span className="text-gray-900 font-medium text-base">111 dB（A-Weighted）</span>
                    </div>
                  </div>
                </div>

                {/* Column 3: 電源、その他 */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    電源、その他
                  </h3>
                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">+12V レール</span>
                      <span className="text-gray-900 font-medium text-base">120mA</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">-12V レール</span>
                      <span className="text-gray-900 font-medium text-base">120mA</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">+5V レール</span>
                      <span className="text-gray-900 font-medium text-base">0mA</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">ラック幅</span>
                      <span className="text-gray-900 font-medium text-base">12hp</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">ラック深</span>
                      <span className="text-gray-900 font-medium text-base">38mm</span>
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

