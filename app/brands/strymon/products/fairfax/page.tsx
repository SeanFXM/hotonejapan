"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Download } from 'lucide-react'
import { BlogSlider } from "@/components/blog-slider"
import { downloadManual } from "@/lib/manual-download"

type Section = "concept" | "demo" | "samples" | "controls" | "manual" | "specs"

const navigationItems = [
  { id: "concept" as Section, label: "コンセプト" },
  { id: "demo" as Section, label: "デモムービー" },
  { id: "samples" as Section, label: "デモサウンド" },
  { id: "controls" as Section, label: "コントロール" },
  { id: "manual" as "manual", label: "取扱説明書", isDownload: true },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function FairfaxPage() {
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
    downloadManual("strymon", "fairfax")
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
      name: "2000's House Party",
      description: "ソフトでありながらもタイトで明るく、際立つオーバードライブ設定は、テレキャスターと組み合わせると、非常に説得力のある2000年代ブリティッシュロックサウンドを生み出します。",
      src: "/images/brands/strymon/fairfax/sound_01.mp3",
      photo: "/images/brands/strymon/fairfax/sound_photo_01.webp",
    },
    {
      id: 2,
      name: "A Dash of Filth",
      description: "ややダークでゲインの高い90年代オルタナティブロックトーンでありながら、明瞭さ、音の輪郭、そしてアンプのようなレスポンスを維持します。Oliveraをローミックスに設定すると空間と動きが加わります。",
      src: "/images/brands/strymon/fairfax/sound_02.mp3",
      photo: "/images/brands/strymon/fairfax/sound_photo_02.webp",
    },
    {
      id: 3,
      name: "Broken Vibro Scamp",
      description: "Flintの Harmonic TremoloエフェクトがFairfaxをクラスAサチュレーションサウンドを交互に引き出します。",
      src: "/images/brands/strymon/fairfax/sound_03.mp3",
      photo: "/images/brands/strymon/fairfax/sound_photo_03.webp",
    },
    {
      id: 4,
      name: "Clashing Chords",
      description: "ゲインの高いFairfaxをGreen Ringerスタイルのオクターブペダルでプッシュすると、厚みがあり複雑で重厚なドロップDパワーコードとリードメロディーラインを生み出します。",
      src: "/images/brands/strymon/fairfax/sound_04.mp3",
      photo: "/images/brands/strymon/fairfax/sound_photo_04.webp",
    },
    {
      id: 5,
      name: "Eye Ohm Me",
      description: "Bright スイッチと Drive と Level を適度に調整すると、アンプは60年代初期のメタルサウンドへと昇華します。",
      src: "/images/brands/strymon/fairfax/sound_05.mp3",
      photo: "/images/brands/strymon/fairfax/sound_photo_05.webp",
    },
    {
      id: 6,
      name: "Hair Spray",
      description: "Drive と Level を高く設定すると、ポップロックのリードサウンドになります。",
      src: "/images/brands/strymon/fairfax/sound_06.mp3",
      photo: "/images/brands/strymon/fairfax/sound_photo_06.webp",
    },
    {
      id: 7,
      name: "Flags At Half Mastodon",
      description: "CompadreでブーストしたドライギターシグナルがFairfaxをMount Doomの炎へと突き動かし、明瞭さを保ちながら、アンプをブーストした時の爆発的なパワーを捉えた重厚なメタルトーンを生み出します。",
      src: "/images/brands/strymon/fairfax/sound_07.mp3",
      photo: "/images/brands/strymon/fairfax/sound_photo_07.webp",
    },
    {
      id: 8,
      name: "Frog Eyes",
      description: "Sag ノブを最大にし、Drive と Level を適度に調整すると、ルーツサウンドのようなカオスサウンドが得られます。",
      src: "/images/brands/strymon/fairfax/sound_08.mp3",
      photo: "/images/brands/strymon/fairfax/sound_photo_08.webp",
    },
    {
      id: 9,
      name: "Gated Sludge",
      description: "最大のサグとゲインが競い合い、ローチューニングのギターがFairfaxをヘビーなファズとゲートの間をゆったりと動きます。",
      src: "/images/brands/strymon/fairfax/sound_09.mp3",
      photo: "/images/brands/strymon/fairfax/sound_photo_09.webp",
    },
    {
      id: 10,
      name: "Hysterical Sub Octave",
      description: "ダーティでラウドなセッティングに少しSagを加え、アナログのサブオクターブでプッシュすると、重厚な単音リズムトーンを生み出します。",
      src: "/images/brands/strymon/fairfax/sound_10.mp3",
      photo: "/images/brands/strymon/fairfax/sound_photo_10.webp",
    },
    {
      id: 11,
      name: "Italian Summer",
      description: "クローズハーモニーのフィンガーピッキングと安定したベースが、クラスA真空管とトランスフォーマーのサチュレーションを通して相互作用し、Oliveraがウォッシュのような雰囲気を醸し出します。",
      src: "/images/brands/strymon/fairfax/sound_11.mp3",
      photo: "/images/brands/strymon/fairfax/sound_photo_11.webp",
    },
    {
      id: 12,
      name: "Les Is More",
      description: "Level コントロールを少しプッシュする程度に設定すると、やや歪んだアンプに厚みを加えます。Fairfax の Drive を最大にすると、ブリッジ側のハムバッカーの信号が飽和したようなサウンドになり、更にBright スイッチをオフにすると、高域が滑らかになります。",
      src: "/images/brands/strymon/fairfax/sound_12.mp3",
      photo: "/images/brands/strymon/fairfax/sound_photo_12.webp",
    },
    {
      id: 13,
      name: "Nice Shoes",
      description: "FairfaxへはJazzmasterとEl Capistanから信号が入力され、重厚でテクスチャー豊かなファズサウンドを生み出します。床を見つめながら、ペダルボードと一体になれます。",
      src: "/images/brands/strymon/fairfax/sound_13.mp3",
      photo: "/images/brands/strymon/fairfax/sound_photo_13.webp",
    },
    {
      id: 14,
      name: "Oh Threes",
      description: "トランスフォーマーのサチュレーションが低音をダイナミックに除き、フォーカスされながらも特徴あるガレージサイケデリックサウンドを生み出します。",
      src: "/images/brands/strymon/fairfax/sound_14.mp3",
      photo: "/images/brands/strymon/fairfax/sound_photo_14.webp",
    },
    {
      id: 15,
      name: "One Two I ii",
      description: "Drive と Level を中程度にすると、ネックピックアップがダブルストップでファットなブーストになります。",
      src: "/images/brands/strymon/fairfax/sound_15.mp3",
      photo: "/images/brands/strymon/fairfax/sound_photo_15.webp",
    },
    {
      id: 16,
      name: "Philly Hoosier Dues",
      description: "Drive を低く、Output Level を中程度にすると、アンプはポップなアメリカンサウンドへと昇華します。",
      src: "/images/brands/strymon/fairfax/sound_16.mp3",
      photo: "/images/brands/strymon/fairfax/sound_photo_16.webp",
    },
    {
      id: 17,
      name: "Sad And In Ohio",
      description: "ダークで陰鬱なこのサンプルでは、Fairfaxはファズとオーバードライブの境界線を踏み越え、ミッドウェストのエモ愛好家にとって完璧なリズムサウンドを生み出します。",
      src: "/images/brands/strymon/fairfax/sound_17.mp3",
      photo: "/images/brands/strymon/fairfax/sound_photo_17.webp",
    },
    {
      id: 18,
      name: "Southern Calliope",
      description: "スワンピーなフィンガーピッキングとホットな80年代のピックアップが、Fairfaxのサウンドをサグ、パチパチ、そしてブルームへと押し上げます。",
      src: "/images/brands/strymon/fairfax/sound_18.mp3",
      photo: "/images/brands/strymon/fairfax/sound_photo_18.webp",
    },
    {
      id: 19,
      name: "Spaghetti Eastern",
      description: "Fairfax を最大ゲインにすると、シングルコイルに重みとグランジ感が加わり、低域が太くダーティーになりピックアップのバイト感が追加されます。",
      src: "/images/brands/strymon/fairfax/sound_19.mp3",
      photo: "/images/brands/strymon/fairfax/sound_photo_19.webp",
    },
    {
      id: 20,
      name: "Tied Seagull",
      description: "DRIVEを高く、SAGを最大に設定し、軽くオーバードライブしたPrincetonアンプにFairfaxが更にスプリングリバーブタンクをドライブして、パチパチとしたゲインの波が生まれ、ファジーなガレージパンクサウンドを生み出します。",
      src: "/images/brands/strymon/fairfax/sound_20.mp3",
      photo: "/images/brands/strymon/fairfax/sound_photo_20.webp",
    },
    {
      id: 21,
      name: "Delicately Handling Pumpkins",
      description: "FairfaxをGreen Ringerスタイルのオクターブアップペダルでプッシュすると、怒りに満ちた爆発的なコードと焼けつくような単音トーンを生み出します。",
      src: "/images/brands/strymon/fairfax/sound_21.mp3",
      photo: "/images/brands/strymon/fairfax/sound_photo_21.webp",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] overflow-hidden">
        <Image
          src="/images/brands/strymon/fairfax/hero.jpg"
          alt="FAIRFAX"
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
                <p className="text-2xl font-bold text-gray-900">FAIRFAX</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">クラスAアウトプットステージ ドライブ</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-gray-900">
                  ¥34,500
                </p>
                <p className="text-xs text-gray-500">前後（税込）</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">852571008660</p>
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

      {/* Concept Section */}
      <section id="concept" className="py-20 scroll-mt-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Miniature Marvel
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
                  src="https://www.youtube.com/embed/RtudBdISwNc"
                  title="Fairfax Class A Output Stage Drive"
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
                  アナログ回路で再現する、真空管ライクな倍音とサチュレーション
                </h3>

                <div className="prose max-w-none mb-8">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Fairfaxは厳密にはディストーションペダルではありません。ゲインやオーバードライブといったイメージを抱く多くの機器とは異なります。Fairfaxは100%アナログのミニチュアアンプであり、数々のクラシック・ロック・アンセムで使用された、あまり知られていない60年代の機器をベースにしています。
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    サウンドとフィーリングは極めて真空管ライクで、真空管アンプの出力トランスの重要な動作をエミュレートする独自の巧妙な回路により、倍音とサチュレーションが加わります。自然な演奏感で、ギター本来のサウンドを保ちながら、音を有機的に繋ぎ合わせるドライブペダルです。
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">真空管アンプの回路を100%アナログで完全再現</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">カスタムアナログ回路により、複数の真空管ステージと重要な出力トランスを再現</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">ガルバニック絶縁電源により、入力電圧は内部で40Vに変換</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">ドライブ、レベル、可変サグコントロールのコントロールを搭載</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">ブライトスイッチで高域特性を微調整可能</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">ナチュラルなサウンドと真空管アンプライクなゲインレンジで、幅広い用途に対応</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">サグ回路により、低設定ではマイルドなサグ効果、最大設定ではスピットやゲートサウンドを実現</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">9V DC 電源 センターマイナス、最小電流 500mA</p>
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
      <section id="concept" className="py-16 scroll-mt-24 bg-concept-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">製品コンセプト</h3>
            <div className="flex justify-center mt-6 mb-8">
              <div className="w-24 h-1 rounded-full bg-blue-600" />
            </div>
            <h4 className="text-xl md:text-2xl font-medium text-gray-300 mb-12">
              More Than A Drive Pedal 〜ドライブペダルの域を超えた存在〜
            </h4>
          </div>

          <div className="max-w-5xl mx-auto space-y-16">
            {/* Main Product Image */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-3xl aspect-[4/3]">
                <Image
                  src="/images/brands/strymon/fairfax/concept_01.gif"
                  alt="FAIRFAX Product"
                  fill
                  className="rounded-xl shadow-2xl object-contain"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 80vw"
                />
              </div>
            </div>

            {/* Main Text Content */}
            <div className="space-y-8 text-gray-300 leading-relaxed">
              <p className="text-base md:text-lg">
                Fairfaxは、1965年にランディ・バックマンのために設計されたオリジナルのGarnet Amplifiers Herzog®真空管ドライブユニットにインスピレーションを得た、エンジニアリングの実験から始まりました。アナログ担当のエンジニアたちは、カスタムChampのような真空管アンプ回路の重要な要素をすべてアナログ領域で再現しようと試みましたが、ペダルの筐体に収まるほど小型化（つまり、本物の真空管や出力トランスを使用できない）を実現しました。
              </p>

              <p className="text-base md:text-lg">
                最終的な設計は、巧みに小型化された真空管プリアンプ、クラスAパワーアンプ、そして出力トランスの飽和特性をエミュレートする独創的なカスタム回路（正確なサウンドを得るために不可欠）で構成されています。
              </p>

              <p className="text-base md:text-lg">
                可変サグ回路も搭載されており、本物の真空管アンプと全く同じように動作します。パワーアンプに送られる信号量とギターの演奏強度によって、プリアンプ部とパワーアンプ部への供給電流量をそれぞれ独立して動的に変化させます。サグ値が低い場合の動作は穏やかで、ソリッドステート（ダイオード）整流器に近い反応が現れます。一方、サグ値が最大になるとJFETが暴走し、バイアスが失われます。これにより入力がゲートされ、ゲートファズでよく見られるような、スピッティングやギグリングのようなサウンドが得られます。
              </p>

              <p className="text-base md:text-lg">
                Fairfaxを本物のアンプのように動作させるには、膨大な動作電圧が必要でした。そこで、トランスフォーマーベースの電源ユニットが9VDCの入力電圧を内部で40Vに変換します。これにより、Fairfaxは高いヘッドルームとアンプのようなフィーリングに必要なパワーを獲得し、幅広いトーンを実現しています。
              </p>

              <p className="text-base md:text-lg">
                低いゲイン設定では、Fairfaxは甘美なサウンドを保ち、アンプへの入力を優しく増幅させながら、倍音の豊かさを増します。高いゲイン設定では、ギターの音色に合わせて、エッジが効いた、コンプレッションのある、あるいはよりアグレッシブなサウンドへと変化します。幅広いゲインレンジにより、Fairfaxはあらゆるセッティングであなたの想像どおりにお使いいだけます。
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-700 my-12"></div>

            {/* Smaller Product Image */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-2xl aspect-[4/3]">
                <Image
                  src="/images/brands/strymon/fairfax/concept_02.jpg"
                  alt="FAIRFAX Product Detail"
                  fill
                  className="rounded-xl shadow-2xl object-contain"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
            </div>

            {/* SERIES A Section */}
            <div className="space-y-8 mt-16">
              <h4 className="text-4xl md:text-5xl font-bold text-gray-200 mb-8">SERIES A</h4>
              
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p className="text-base md:text-lg">
                  最高のサウンドは、理想的なアナログ環境で動作することで初めて実現します。StrymonはDSPの卓越性で知られていますが、強力なアナログチームなしでは、私たちの製品は今のようなサウンドにはならないでしょう。
                </p>

                <p className="text-base md:text-lg">
                  アナログエンジニアは常に興味深いデザインを生み出しています。そこで、彼らの活躍の場として、純粋なアナログペダル「シリーズA」シリーズを立ち上げました。その第一弾としてFairfaxをリリースします。
                </p>

                <p className="text-base md:text-lg">
                  「シリーズA」シリーズでご紹介するペダルは、MIDI、USB、プリセット、その他外部の最新機能を最小限に抑え、従来のStrymon製品とは異なる特徴を提供することを目指しています。これらのペダルは、紛れもなくアナログであり、非常に興味深い製品となるでしょう。今後の「シリーズA」シリーズペダルにもご期待ください。
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
            <div className="flex justify-center">
              <div className="w-full max-w-4xl bg-black rounded-2xl overflow-hidden aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/RtudBdISwNc"
                  title="Fairfax Demo Video"
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
            {/* Introduction Text */}
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-base md:text-lg">
                真空管アンプの設計をベースにしているため、Fairfaxは様々なタイプのアンプやアンプモデラーと相性抜群です。クリーミーなサスティンは、クリーンなアンプにも、自然な歪みのアンプにも、新たな魅力をもたらします。
              </p>
              <p className="text-base md:text-lg">
                電源投入時の状態を設定する内部ジャンパーも搭載。Fairfaxをペダルループスイッチャーと併用する場合、電源投入時に自動的に電源がオンになるように設定できます。これにより、毎回手動でペダルをオンにする手間が省け、暗いステージや複雑なセットアップでは非常に便利です。
              </p>
            </div>

            {/* Control Descriptions */}
            <div className="space-y-10">
              {/* LEVEL Control */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">LEVEL</h3>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                  レベルコントロールはペダルの出力レベルを設定します。他の2つのノブの設定に関わらず、レベルを低く設定するとアンプに送られる出力信号の総量は少なくなります。
                </p>
              </div>

              {/* DRIVE Control */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">DRIVE</h3>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                  ドライブコントロールは、ドライブとサチュレーションの量を調整します。レベルコントロールと連動することで、アンプのドライブ方法を正確に設定できます。クランチとサチュレーションを強めにかけたり、クリーンブーストにしたり、その中間のサウンドにしたりできます。
                </p>
              </div>

              {/* SAG Control */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">SAG</h3>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                  可変サグコントロールは、サグ回路の動作を微調整できます。サグの量は、パワーアンプセクションへの送信レベルと演奏スタイルの両方に依存します。最大にすると、サウンドは甲高い響きになり、その効果はドライブとレベルの設定によって多少異なります。
                </p>
              </div>

              {/* BRIGHT Control */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">BRIGHT</h3>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                  ブライトスイッチは高域の輪郭を決定します。スイッチを「オフ」にすると高域が若干減衰し、周波数特性が滑らかになります。「オン」にすると高域はそのまま残り、より明るい高音域のレスポンスが得られます。
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
                          <p className="text-gray-500 text-xs">サンプルセッティング</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded-lg bg-blue-600 text-white">
                        {String(audio.id).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{audio.description}</p>
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
                    src="/images/brands/strymon/fairfax/control_01.png"
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
                {/* DRIVE */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200">
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">DRIVE</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11">
                    プリアンプのゲイン量を調整します。レベルコントロールと連動することで、アンプをどのようにドライブさせたいかを緻密に決定できます。クランチサウンドを効かせたり、クリーンブーストとして使ったり、その中間のサウンドにすることも可能です。
                  </p>
                </div>

                {/* LEVEL */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200">
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">LEVEL</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11">
                    ペダルの出力レベルを設定します。他の2つのノブの設定に関わらず、低い設定ではアンプへの出力信号が減少します。
                  </p>
                </div>

                {/* SAG */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200">
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">SAG</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11">
                    サグ回路の動作を微調整できます。サグの量は、パワーアンプセクションへの送出レベルと演奏スタイルの両方に依存します。これは完全にダイナミックなコントロールであるため、軽い演奏では高い設定でもサグ/コンプレッション特性がほとんど変化しない場合があります。一方、太い弦で強く弾くと、ポット値を低くしてもノイズが増える可能性があります。
                  </p>
                </div>

                {/* BRIGHT */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200">
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">BRIGHT</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11 mb-3">
                    ２ポジションのトグルスイッチで、高域の輪郭を調整します。
                  </p>
                  <div className="ml-11 space-y-2">
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                      <span className="font-semibold">off：</span>スイッチを「オフ」にすると高域が若干減衰され、周波数特性が滑らかになります。
                    </p>
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                      <span className="font-semibold">on：</span>「オン」に設定すると、高周波数はそのまま残り、高音が増した明るいレスポンスが得られます。
                    </p>
                  </div>
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
                </div>
              </div>
            </div>

            {/* Rear Panel - Input/Output */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">入出力</h3>
              
              <div className="flex justify-center mb-12">
                <div className="relative w-full max-w-2xl">
                  <Image
                    src="/images/brands/strymon/fairfax/control_02.png"
                    alt="Controls - Details"
                    width={800}
                    height={900}
                    className="rounded-lg w-full"
                  />
                </div>
              </div>

              {/* Input/Output Descriptions */}
              <div className="space-y-8">
                {/* INPUT */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200">
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">INPUT</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11">
                    ハイ・インピーダンス JFET バッファ付きモノラル楽器入力。
                  </p>
                </div>

                {/* OUTPUT */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200">
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">OUTPUT</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11">
                    ロー・インピーダンスのモノラル出力。
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
                    9VDC、センターマイナス、最小500mA定格のアダプターを使用してください。
                  </p>
                </div>

                {/* INTERNAL JUMPER SWITCH */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200">
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">INTERNAL JUMPER SWITCH</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11">
                    本体内部には、電源投入時の状態を設定する内部ジャンパースイッチが搭載されています。
                  </p>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11 mt-3">
                    ペダルをエンゲージモードで起動するには、両方のジャンパーを左の位置に、バイパスモードで起動するには、両方のジャンパーを右の位置にそれぞれ移動します。Fairfaxをペダルループスイッチャーと併用する場合、電源投入時に自動的に電源がオンになるように設定できます。※デフォルトではオフ（バイパス）に設定されています。
                  </p>
                </div>
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
              <div className="w-24 h-1 rounded-full bg-blue-600" />
            </div>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="bg-gray-200 rounded-2xl p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8">
                {/* Left Column */}
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
                      <span className="text-gray-900 font-medium text-base">+20 dBu</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">バイパス</span>
                      <span className="text-gray-900 font-medium text-base">トゥルーバイパス（エレクトロメカニカル・リレースイッチング）</span>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    その他
                  </h3>
                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">S/N</span>
                      <span className="text-gray-900 font-medium text-base">114 dB typical</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">電源</span>
                      <span className="text-gray-900 font-medium text-base">9VDC （標準 2.1mm センターマイナス端子）</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">消費電流</span>
                      <span className="text-gray-900 font-medium text-base">500mA</span>
                      <span className="text-red-600 text-xs mt-1">※定格出力500mA以上のアダプターを使用してください。</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">サイズ</span>
                      <span className="text-gray-900 font-medium text-base">71.9mm（幅）×115.1mm（縦）×59.2mm（高）</span>
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

