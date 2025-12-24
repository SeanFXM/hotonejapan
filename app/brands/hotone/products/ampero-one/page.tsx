"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, ChevronDown, Download } from 'lucide-react'
import { BlogSlider } from "@/components/blog-slider"

type Section = "concept" | "demo" | "sound" | "features" | "controls" | "software" | "faq" | "specs"

const navigationItems = [
  { id: "concept" as Section, label: "コンセプト" },
  { id: "demo" as Section, label: "デモムービー" },
  { id: "sound" as Section, label: "デモサウンド" },
  { id: "features" as Section, label: "主な機能" },
  { id: "controls" as Section, label: "コントロール" },
  { id: "software" as Section, label: "ソフトウエア" },
  { id: "faq" as Section, label: "よくある質問" },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function AmperoOnePage() {
  const [activeSection, setActiveSection] = useState<Section>("concept")
  const [headerHeight, setHeaderHeight] = useState(72)
  const [expandedFaq, setExpandedFaq] = useState<{ [key: string]: boolean }>({})
  const [expandedSoftware, setExpandedSoftware] = useState<{ [key: string]: boolean }>({})

  const toggleFaq = (key: string) => {
    setExpandedFaq((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const toggleSoftware = (key: string) => {
    setExpandedSoftware((prev) => ({
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
          src="/images/brands/hotone/AMPERO_ONE/hero.jpg"
          alt="AMPERO ONE"
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
                <p className="text-2xl font-bold text-gray-900">AMPERO ONE</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">マルチ・エフェクター</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-hotone">
                  ¥38,500
                </p>
                <p className="text-xs text-gray-500">前後（税込）</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">6959473905077</p>
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
          <div className="flex items-center justify-center gap-6 overflow-x-auto py-4 scrollbar-hide">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id as Section)}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                  activeSection === item.id ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {item.label}
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

      {/* Intro Section */}
      <section className="py-20 scroll-mt-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              SHARC DSP搭載
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              マイティー・スモール
            </h3>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Product Image and Related Info */}
            <div className="space-y-8">
              <div>
                <Image
                  src="/images/brands/hotone/AMPERO_ONE/intro_01.jpg"
                  alt="AMPERO ONE"
                  width={500}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>

              <div className="border-t border-gray-200 pt-6">
                <p className="text-sm font-medium text-gray-700 mb-3">関連情報</p>
                <div className="space-y-2">
                  <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm">
                    <span>📄</span>
                    <span>AMPERO ONE 取扱説明書</span>
                  </a>
                  <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm">
                    <span className="text-yellow-500">☆</span>
                    <span>AMPERO 製品情報</span>
                  </a>
                  <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm">
                    <span>📋</span>
                    <span>AMPERO 搭載エフェクトリスト（発売時）</span>
                  </a>
                  <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm">
                    <span>🎸</span>
                    <span>ギタリスト・二木元太郎さんがAMPEROの多彩な使い方をデモ演奏付きで解説</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Description and Features */}
            <div className="space-y-6">
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>
                  AMPEROのサウンドをそのままに、さらにコンパクトでカンタン操作な兄弟機が登場しました。 超高速演算を可能にする第４世代の「SHARC DSP」と、ダイナミクスに溢れたリアルなプレイアビリティを実現するCDCMモデリング & F.I.R.E IRテクノロジーとの融合によって、AMPEROから移植されたクラス最高峰のサウンドをお届けします。
                </p>
                <p>
                  64種のアンプ、60種のキャビネット・モデリングと150種を超えるエフェクト群。 入力する楽器も選ばず、エレキギター、アコースティックギター、ベースに対応。自宅練習からライブハウス、レコーディングの現場までを網羅した機能をコンパクトな一台で完結することが可能です。
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">ユーザー・インターフェイス</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    プレーヤーが「すぐに使える」シンプルな使用方法でデザインしました。スマートフォン並みの４インチ・カラー・タッチスクリーンと、３つのクイック・アクセス・ノブで、パラーメーターの変更も簡単です。
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">高ダイナミックレンジ、120dB</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    アナログ回路に18V DCの内部電源を採用し、通常のアナログペダルの2倍のアナログヘッドルームを実現。さらに、24-bitシグナル・プロセッシングによる120dBのS/N比を実現しました。
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">充実のライブラリー</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    9エフェクト・モジュールの同時使用が可能です。自在にマウントできるFX1&FX2とモジュレーション用のステレオFX3モジュールを備えています。
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <p className="text-gray-700 text-sm">244 effects、HOTONE独自のモデリングメソードCDCM HD & F.I.R.E.による完成度が高い64 x Amp、60 x CAB、100 x ご存知のペダル。</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <p className="text-gray-700 text-sm">3rdパーティーIRがロードできます。</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <p className="text-gray-700 text-sm">50 x HOTONEオリジナルアルゴリズムのエフェクト</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Concept Section */}
      <section id="concept" className="py-20 scroll-mt-24 bg-concept-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              製品コンセプト
            </h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            {/* Left - Video */}
            <div>
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/9Wy6bbSxkbw"
                  title="AMPERO ONE Introduction"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Right - Hardware Technology */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">AMPERO Hard & Softテクノロジー</h3>
              
              <div>
                <h4 className="text-lg font-bold text-white mb-3">ハードウェア・テクノロジー</h4>
                <p className="text-gray-300 leading-relaxed text-sm">
                  第４世代 SHARC DSPにARM Cortex M7を追加したデュアルDSPプラットホームを採用しました。AMPEROの超高速演算力は、ワールドツアーで愛用されているF社「Amp + fx」デジタル・モデリング機器の約60％に相当します。この溢れるパワーによりクラス最高峰のサウンドをお届けできます。
                </p>
              </div>

              <div className="flex justify-center">
                <Image
                  src="/images/brands/hotone/AMPERO_ONE/concept_01.jpg"
                  alt="SHARC DSP"
                  width={400}
                  height={250}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 my-12"></div>

          {/* Software Technology */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">ソフトウェア・テクノロジー</h3>
              <h4 className="text-lg font-bold text-white mb-4">CDCM HD ＋ F.I.R.E（Field Impulse Response Enhancement）</h4>
              <p className="text-gray-300 leading-relaxed text-sm">
                XTOMPと共にベールを脱いだHOTONE独自のモデリング・テクノロジーのCDCM。さらなる高速演算プラットホームに対応し、CDCM もハイ・ディフィニションに進化しました。更にIR （F.I.R.E / Field Impulse Response Enhancement）を加え、これら二つのコンビネーションによって、サウンドの完成度はさらに高いレベルへと到達しました。
              </p>
            </div>

            <div className="flex justify-center">
              <Image
                src="/images/brands/hotone/AMPERO_ONE/concept_02.png"
                alt="CDCM HD + F.I.R.E"
                width={500}
                height={100}
                className="h-auto"
              />
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-3">CDCM HD</h4>
              <p className="text-gray-300 leading-relaxed text-sm">
                従来のサーキット・モデリングは、入力信号の変化に関係なく同一の処理を行う『スタティック・モデリング』（回路モデリンング）または、音を似せるブラックボックス・セオリーが一般的でした。HOTONEのCDCM HDは、複雑な入力信号の変化に対応するモデリング・テクノロジーです。このマトリクス変化や周波数、コントロール類のセッティングや接続楽器のインピーダンスによるサウンドの変化を、より適切に再現する、複雑で膨大な演算処理を行います。AMPEROではこのCDCMをハイ・デフィニッション化しています。よりリアルなエミュレーションを実現するために、Cabエミュレーションなどに使われているIRテクノロジーF.I.R.E / Field Impulse Response Enhancementを追加しました。
              </p>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black rounded-xl overflow-hidden aspect-video shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/HFLpw45-hrM"
                  title="AMPERO ONE Demo Video 1"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="bg-black rounded-xl overflow-hidden aspect-video shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/9Wy6bbSxkbw"
                  title="AMPERO ONE Demo Video 2"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="bg-black rounded-xl overflow-hidden aspect-video shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/PxLcgoTtPYw"
                  title="AMPERO ONE Demo Video 3"
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

      {/* Demo Sound Section */}
      <section id="sound" className="py-20 scroll-mt-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">デモサウンド</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Row 1 */}
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <span>♫</span> P01-1 Helo Ampero One
                </p>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/AMPERO_ONE/sound_01.wav" type="audio/wav" />
                </audio>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <span>♫</span> P03-2 Djentle & Bouncy
                </p>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/AMPERO_ONE/sound_02.wav" type="audio/wav" />
                </audio>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <span>♫</span> P04-3 Comp&apos;d Clean
                </p>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/AMPERO_ONE/sound_03.wav" type="audio/wav" />
                </audio>
              </div>

              {/* Row 2 */}
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <span>♫</span> P05-2 Crunchy Rhythm
                </p>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/AMPERO_ONE/sound_04.wav" type="audio/wav" />
                </audio>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <span>♫</span> P06-2 Beefy Dirt
                </p>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/AMPERO_ONE/sound_05.wav" type="audio/wav" />
                </audio>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <span>♫</span> P06-3 Archtop Clean
                </p>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/AMPERO_ONE/sound_06.wav" type="audio/wav" />
                </audio>
              </div>

              {/* Row 3 */}
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <span>♫</span> P08-3 Narrowed Vision
                </p>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/AMPERO_ONE/sound_07.wav" type="audio/wav" />
                </audio>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <span>♫</span> P09-3 Frozen Clean
                </p>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/AMPERO_ONE/sound_08.wav" type="audio/wav" />
                </audio>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <span>♫</span> P14-2 Gypsy Drive
                </p>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/AMPERO_ONE/sound_09.wav" type="audio/wav" />
                </audio>
              </div>

              {/* Row 4 */}
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <span>♫</span> P17-3 Kaleidoscope
                </p>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/AMPERO_ONE/sound_10.wav" type="audio/wav" />
                </audio>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <span>♫</span> P20-3 ZZ&apos;s Garage
                </p>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/AMPERO_ONE/sound_11.wav" type="audio/wav" />
                </audio>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <span>♫</span> P25-1 Lush Acoustic
                </p>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/AMPERO_ONE/sound_12.wav" type="audio/wav" />
                </audio>
              </div>

              {/* Row 5 */}
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <span>♫</span> P27-1 Overdriven Bass
                </p>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/AMPERO_ONE/sound_13.wav" type="audio/wav" />
                </audio>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <span>♫</span> P27-2 Smooth FlipTop
                </p>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/AMPERO_ONE/sound_14.wav" type="audio/wav" />
                </audio>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <span>♫</span> P27-3 Rich Bass_Env
                </p>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/AMPERO_ONE/sound_15.wav" type="audio/wav" />
                </audio>
              </div>
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
          <div className="max-w-7xl mx-auto">
            {/* Features Grid - 2 columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* 01 - もう、たくさんのスイッチを踏む必要はありません */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="relative">
                  <span className="absolute top-4 right-4 text-6xl font-bold text-gray-200">01</span>
                  <Image
                    src="/images/brands/hotone/AMPERO_ONE/function_01.gif"
                    alt="スイッチ操作"
                    width={600}
                    height={300}
                    className="w-full h-auto"
                    unoptimized
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">もう、たくさんのスイッチを踏む必要はありません</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Ampero ONEなら、スイッチにどんな仕事をさせたいかも設定できるので、ワンスイッチングでアンプやエフェクターのパラメーター、接続順など様々な設定が少ないスイッチ操作で変更可能です。
                  </p>
                </div>
              </div>

              {/* 02 - 操作はタッチスクリーンで */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="relative">
                  <span className="absolute top-4 right-4 text-6xl font-bold text-gray-200">02</span>
                  <Image
                    src="/images/brands/hotone/AMPERO_ONE/function_02.gif"
                    alt="タッチスクリーン"
                    width={600}
                    height={300}
                    className="w-full h-auto"
                    unoptimized
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">操作はタッチスクリーンで</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Ampero Oneは、4-inch 800 x 480のタッチスクリーンを採用しています。全てのプログラム中のパラメーター等の変更が、『タッチ＆スライド』の簡単な画面操作で行えます。
                  </p>
                </div>
              </div>
            </div>

            {/* Features Grid - 3 columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* 03 - 簡単操作でエフェクト・チェーンを入れ替え */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="relative">
                  <span className="absolute top-2 right-2 text-4xl font-bold text-gray-200">03</span>
                  <Image
                    src="/images/brands/hotone/AMPERO_ONE/function_03.gif"
                    alt="エフェクト・チェーン"
                    width={400}
                    height={250}
                    className="w-full h-auto"
                    unoptimized
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">簡単操作でエフェクト・チェーンを入れ替え</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Ampero ONEなら、画面上のいくつかの簡単なタッチとスライドで、エフェクト・チェーンを簡単に変更できます。フィックス・チェーンは、マルチエフェクトを使用したり、巨大なペダルボードでペダルの順序を変更したりするよりもはるかに便利です。
                  </p>
                </div>
              </div>

              {/* 04 - 様々な楽器入力に対応 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="relative">
                  <span className="absolute top-2 right-2 text-4xl font-bold text-gray-200">04</span>
                  <Image
                    src="/images/brands/hotone/AMPERO_ONE/function_04.png"
                    alt="楽器入力"
                    width={400}
                    height={250}
                    className="w-full h-auto"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">様々な楽器入力に対応</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Ampero OneにはAmperoのような入力切替はありませんが、可能な限り最高の機器互換性を実現するために、高入力インピーダンス（最大4.7Mohm）の特別な入力ジャックを設計しました。これにより、Ampero Oneは切替操作なしでエレキギター、ベースやアコースティック楽器に対応できるようになりました。
                  </p>
                </div>
              </div>

              {/* 05 - 豊富なツール (no image) */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="relative p-4">
                  <span className="absolute top-2 right-2 text-4xl font-bold text-gray-200">05</span>
                  <h3 className="text-sm font-bold text-gray-900 mb-3">豊富なツール</h3>
                  <p className="text-gray-600 text-xs leading-relaxed mb-3">
                    Ampero Oneは、最大９個のエフェクト・モジュールの同時使用が可能です。FX1、FX2、FX3の3エフェクト・モジュールは豊富なエフェクターのセレクションを備えており、他のモジュール同様にベストなサウンドコンビネーションが得られるように接続順位を自由に変更できます。
                  </p>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-700">242 エフェクターライブラリー</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-700">CDCM HD & F.I.R.E. モデリング： 64 amp / 60 cab /100+ レジェンドペダル / マイクポジション＆マイクタイプ機能</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-700">3rdパーティーやユーザーIRをロードできる機能を備えています</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-700">50+ Hotone オリジナルエフェクト</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Grid - 3 columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* 06 - 9Vアダプターが使用できます */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="relative">
                  <span className="absolute top-2 right-2 text-4xl font-bold text-gray-200">06</span>
                  <Image
                    src="/images/brands/hotone/AMPERO_ONE/function_06.png"
                    alt="9Vアダプター"
                    width={400}
                    height={250}
                    className="w-full h-auto"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">9Vアダプターが使用できます</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Ampero ONE はデジタルペダル並みの9VDC（500mA）で動作可能です。でも、アナログセクションは18VDCなので、ダイナミックレンジは広い！プレーの息づかいをきちんと伝えてくれます。演奏力がしっかり出せます。
                  </p>
                </div>
              </div>

              {/* 07 - レコーディングもライブも同じプリセットで演奏 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="relative">
                  <span className="absolute top-2 right-2 text-4xl font-bold text-gray-200">07</span>
                  <Image
                    src="/images/brands/hotone/AMPERO_ONE/function_07.gif"
                    alt="プリセット"
                    width={400}
                    height={250}
                    className="w-full h-auto"
                    unoptimized
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">レコーディングもライブも同じプリセットで演奏</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    お好みのサウンドを「パッチ」として保存したら、ライブでのアナログ出力、録音時のUSBからのデジタル出力でも同じサウンドでプレイできます。
                  </p>
                </div>
              </div>

              {/* 08 - アコースティック・プリセット (no image) */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="relative p-4">
                  <span className="absolute top-2 right-2 text-4xl font-bold text-gray-200">08</span>
                  <h3 className="text-sm font-bold text-gray-900 mb-3">アコースティック・プリセット</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    ライブの際に、更にもう一本アコースティック楽器を持っていくのは大変です。Ampero Oneは、IRテクノロジーとシミュレーションアルゴリズムを併用したプリセットを備えています。それらはスティール弦、ナイロン弦、ウッドベースをマイク収録したサウンドを、エレクトリックの入力ソースからエミュレートしてくれます。
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Features List */}
            <div className="bg-white rounded-xl p-6 mt-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-700 text-sm">USB経由のファームウェア・アップデート、ロード、エディット、編集が可能</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-700 text-sm">USBオーディオ・インターフェース機能</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-700 text-sm">64 アンプモデル、60 キャブモデル、100+ ペダルモデルを収録</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-700 text-sm">3rdパーティIR＆ユーザーIRのロードが可能</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-700 text-sm">198 x プリセット</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-700 text-sm">120秒ルーパー機能内蔵</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-700 text-sm">エクスプレッション・ペダルを本体に装備</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-700 text-sm">AUX入力</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-700 text-sm">EXP2（エクスプレッション）</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-700 text-sm">Mac/PCフリーソフトによるIRローディング</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-700 text-sm">244 エフェクト・ライブラリー</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-700 text-sm">新マイクポジション変更＆マイクタイプのシミュレーション</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-700 text-sm">50+ HOTONEオリジナル・エフェクトを追加</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-700 text-sm">100パターンを備えたドラムマシーンを内蔵</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-700 text-sm">機能のアサインが可能な3 x LED付きフットスイッチ</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-700 text-sm">ステレオ・プロセッシング</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-700 text-sm">Line出力、ヘッドフォン出力</span>
                  </div>
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
              <div className="w-20 h-1 rounded hotone-bar" />
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            <div className="flex justify-center">
              <Image
                src="/images/brands/hotone/AMPERO_ONE/control_01.png"
                alt="AMPERO ONE Front Panel"
                width={800}
                height={400}
                className="rounded-lg w-full"
              />
            </div>

            <div className="flex justify-center">
              <Image
                src="/images/brands/hotone/AMPERO_ONE/control_02.png"
                alt="AMPERO ONE Back Panel"
                width={800}
                height={400}
                className="rounded-lg w-full"
              />
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
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Firmware 2.1 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                  <button
                    onClick={() => toggleSoftware("fw21")}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-gray-900 block">Ampero One Firmware Version 2.1</span>
                        <span className="text-xs text-red-500 font-bold">New!</span>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.fw21 ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedSoftware.fw21 && (
                    <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                      <p className="text-gray-700 text-sm mb-3">
                        この V2.1 ファームウェア アップデートでは、新しいエフェクト、より強力な機能、最適化されたシステム パフォーマンス、バグ修正が提供されます。可能な限り最高のユーザーエクスペリエンスを実現するために、すべての Ampero One ユーザーにこのアップデートを実行することをお勧めします。
                      </p>
                      <p className="text-gray-600 text-sm mb-4">リリース日：2024年10月29日</p>
                      
                      <div className="mb-4">
                        <Image
                          src="/images/brands/hotone/AMPERO_ONE/software_01.png"
                          alt="Ampero One Firmware 2.1"
                          width={400}
                          height={200}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                        <p className="text-gray-800 text-sm font-bold mb-2">＜重要！＞</p>
                        <p className="text-gray-700 text-xs mb-2">
                          新しい方法で内蔵エクスプレッション・ペダルを最適化したため、アップデート後に内蔵エクスプレッション・ペダルを再調整してください。
                        </p>
                        <p className="text-gray-600 text-xs mb-2">
                          （CTRL/EXP &gt; EXP 1 設定 &gt; キャリブレーション）
                        </p>
                        <p className="text-gray-700 text-xs mb-2">
                          今回のアップデートにより、元のCTRLデータはCTRL1の位置に移動されますので、必要に応じて再設定してください。
                        </p>
                        <p className="text-gray-600 text-xs">
                          注：V2.1 ファームウェアは、Ampero Editor V1.4.2 のみで使用してください。
                        </p>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-gray-900 text-sm font-bold mb-2">V2.1ファームウェア：新たに追加された機能</h4>
                        <div className="space-y-2 text-xs text-gray-700">
                          <div className="flex items-start gap-2">
                            <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">1</span>
                            <span>モジュール位置をドラッグする機能を追加しました。モジュールを編集インターフェイス内の希望の位置にドラッグできます。</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">2</span>
                            <span>ボリュームペダルのプリ/ポスト機能（TEMPO/VOLUMEモジュール - Vol Position）を追加し、ボリュームペダルをプリ/ポストに配置することを選択できるようになりました。</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">3</span>
                            <span>CTRLコントロールを追加し、３つのフットスイッチをすべてCTRLに設定できるようになりました（このアップデート後、元のCTRLデータはCTRL 1の位置に移動されます）</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">4</span>
                            <span>パラメータバーのタッチコントロールを追加しました。パラメータバーの左側と右側をクリックして、選択したパラメータを増減または切り替えることができます</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">5</span>
                            <span>クラシック PS – Whammy®* に基づく、FX1/FX2/FX3 モジュールで利用可能な CDCM HD ピッチ モデル</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">6</span>
                            <span>Tweed Prince – Fender® Tweed Princeton* (5F2-A バージョン) をベースにした、AMP モジュールで利用可能な CDCM HD アンプ モデル</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">7</span>
                            <span>Black Prince – Fender® Blackface Princeton®* (AA964 バージョン) をベースにした、AMP モジュールで利用可能な CDCM HD アンプ モデル</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">8</span>
                            <span>2290 Mod – TC Electronic® 2290 ダイナミック デジタル ディレイ* に基づく、DLY モジュールで利用可能な CDCM HD ディレイ モデル</span>
                          </div>
                        </div>
                        <p className="text-gray-500 text-xs mt-2">
                          ＊記載のメーカー名、商品名は各社の商標または登録商標です。商標は、この製品のサウンドキャラクターを識別するためにのみ使用されています。
                        </p>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-gray-900 text-sm font-bold mb-2">V2.1ファームウェア：改善＆バグ修正</h4>
                        <div className="flex items-start gap-2 text-xs text-gray-700">
                          <span className="text-green-500">✓</span>
                          <span>その他の軽微なバグ修正</span>
                        </div>
                      </div>

                      <a
                        href="#"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors text-sm"
                      >
                        <Download className="w-4 h-4" />
                        ダウンロードはこちら
                      </a>
                    </div>
                  )}
                </div>

                {/* Firmware 2.0 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                  <button
                    onClick={() => toggleSoftware("fw20")}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-semibold text-gray-900">Ampero One Firmware Version 2.0</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.fw20 ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedSoftware.fw20 && (
                    <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                      <p className="text-gray-700 text-sm mb-2">
                        この V2.0 ファームウェア・アップデートでは、新しいエフェクト、より強力な機能、最適化されたシステム・パフォーマンス、バグ修正が提供されます。可能な限り最高のユーザー・エクスペリエンスを実現するために、すべてAmpero Oneユーザーにこのアップデートの実行をお勧めします。
                      </p>
                      <p className="text-gray-600 text-sm mb-4">リリース日：2023年8月9日</p>
                      
                      <div className="mb-4">
                        <Image
                          src="/images/brands/hotone/AMPERO_ONE/software_03.jpg"
                          alt="Ampero One Firmware 2.0"
                          width={400}
                          height={200}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                        <p className="text-gray-800 text-sm font-bold mb-2">＜重要！＞</p>
                        <p className="text-gray-700 text-xs mb-2">
                          このファームウェアのアップデートの後、必ず内蔵/外部エクスプレッション・ペダルの両方を再キャリブレーションしてください。
                        </p>
                        <p className="text-gray-600 text-xs mb-2">
                          （CTRL/EXP &gt; EXP 1/2 設定 &gt; キャリブレーション）
                        </p>
                        <p className="text-gray-600 text-xs">
                          注：V2.0 ファームウェアは、Ampero Editor V1.4.0 のみで使用してください。
                        </p>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-gray-900 text-sm font-bold mb-2">V2.0ファームウェア：新たに追加された機能</h4>
                        <div className="space-y-1 text-xs text-gray-700">
                          <div className="flex items-start gap-2"><span className="bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">1</span><span>メインディスプレイにI/Oレベルメーターが追加されました。</span></div>
                          <div className="flex items-start gap-2"><span className="bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">2</span><span>Patchクイックスライドセレクターがメインディスプレイに追加されました。</span></div>
                          <div className="flex items-start gap-2"><span className="bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">3</span><span>EXP 1 on/offボタンがメインディスプレイに追加されました。</span></div>
                          <div className="flex items-start gap-2"><span className="bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">4</span><span>リアンプ機能の追加（Global &gt; USB Audio）</span></div>
                          <div className="flex items-start gap-2"><span className="bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">5</span><span>Gated Boost – Hotoneオリジナルモデル（FX1/FX2モジュール内）モデリングベース</span></div>
                          <div className="flex items-start gap-2"><span className="bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">6</span><span>Micro Boost – CDCM HDドライブモデル（FX1/FX2モジュール内）モデリングベースMXR® M133 Micro Amp*</span></div>
                          <div className="flex items-start gap-2"><span className="bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">7</span><span>Pitch Shift – Hotoneオリジナルpitch shifterモデル（FX1/FX2モジュール内）</span></div>
                          <div className="flex items-start gap-2"><span className="bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">8</span><span>Blues Butter – CDCM HDドライブモデル（FX1/FX2モジュール内）モデリングベースMarshall® Bluesbreaker</span></div>
                          <div className="flex items-start gap-2"><span className="bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">9</span><span>Magic T – CDCM HDドライブモデル（FX1/FX2モジュール内）モデリングベースCochrane® Timmy*</span></div>
                          <div className="flex items-start gap-2"><span className="bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">10</span><span>Prince of Drive – CDCM HDドライブモデル（FX1/FX2モジュール内）モデリングベースAnalog Man® Prince of Tone*</span></div>
                          <div className="flex items-start gap-2"><span className="bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">11</span><span>Behemoth M – CDCM HDドライブモデル（FX1/FX2モジュール内）モデリングベースDarkglass® Microtubes B7K*</span></div>
                          <div className="flex items-start gap-2"><span className="bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">12</span><span>Basshammer 1/2 – CDCM HDドライブモデル（FX1/FX2モジュール内）モデリングベースAguilar® Tone Hammer*</span></div>
                          <div className="flex items-start gap-2"><span className="bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">13</span><span>Black Deluxe – CDCM HDアンプモデル（AMPモジュール内）モデリングベースFender® Blackface Deluxe Reverb* (Normal CH)</span></div>
                          <div className="flex items-start gap-2"><span className="bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">14</span><span>Black Deluxe+ – CDCM HDアンプモデル（AMPモジュール内）モデリングベースFender® Blackface Deluxe Reverb* (Vibrato CH)</span></div>
                          <div className="flex items-start gap-2"><span className="bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">15</span><span>Marshell SLP – CDCM HDアンプモデル（AMPモジュール内）モデリングベースMarshall® Super Lead 1959* (Normal CH)</span></div>
                          <div className="flex items-start gap-2"><span className="bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">16</span><span>Marshell SLP+ – CDCM HDアンプモデル（AMPモジュール内）モデリングベースMarshall® Super Lead 1959* (Bright CH)</span></div>
                          <div className="flex items-start gap-2"><span className="bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">17</span><span>Marshell SLP Jump – CDCM HDアンプモデル（AMPモジュール内）モデリングベースMarshall® Super Lead 1959* (&quot;Jump&quot; connection)</span></div>
                          <div className="flex items-start gap-2"><span className="bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">18</span><span>Brown King Clean - CDCM HDアンプモデル（AMPモジュール内）モデリングベースFender® Vibro-King combo* (FAT off)</span></div>
                          <div className="flex items-start gap-2"><span className="bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">19</span><span>Brown King Drive - CDCM HDアンプモデル（AMPモジュール内）モデリングベースFender® Vibro-King combo* (FAT on)</span></div>
                          <div className="flex items-start gap-2"><span className="bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">20</span><span>Silver Master - CDCM HDアンプモデル（AMPモジュール内）モデリングベースFender® Silverface Bandmaster*</span></div>
                          <div className="flex items-start gap-2"><span className="bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">21</span><span>Tang A30 Clean - CDCM HDアンプモデル（AMPモジュール内）モデリングベースOrange® AD30* (channel 1)</span></div>
                          <div className="flex items-start gap-2"><span className="bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">22</span><span>Tang A30 Drive - CDCM HDアンプモデル（AMPモジュール内）モデリングベースOrange® AD30* (channel 2)</span></div>
                          <div className="flex items-start gap-2"><span className="bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">23</span><span>Dumbell Drive - CDCM HDアンプモデル（AMPモジュール内）モデリングベースDumble® Overdrive Special*</span></div>
                          <div className="flex items-start gap-2"><span className="bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">24</span><span>Ambience - Hotone オリジナル multitap delay（DLYモジュール内）</span></div>
                        </div>
                      </div>

                      <p className="text-xs text-gray-500 mb-4">
                        ＊記載のメーカー名、商品名は各社の商標または登録商標です。商標は、この製品のサウンドキャラクターを識別するためにのみ使用されています。
                      </p>

                      <div className="mb-4">
                        <h4 className="text-gray-900 text-sm font-bold mb-2">V4.1ファームウェア：改善＆バグ修正</h4>
                        <div className="space-y-1 text-xs text-gray-700">
                          <div className="flex items-start gap-2"><span className="text-green-500">✓</span><span>アンプとドライブエフェクトのダイナミックパフォーマンスを最適化しました。</span></div>
                          <div className="flex items-start gap-2"><span className="text-green-500">✓</span><span>CABモジュールのIRを最適化しました。</span></div>
                          <div className="flex items-start gap-2"><span className="text-green-500">✓</span><span>その他のマイナーなバグ修正</span></div>
                        </div>
                      </div>

                      <a
                        href="#"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors text-sm"
                      >
                        <Download className="w-4 h-4" />
                        ダウンロードはこちら
                      </a>
                    </div>
                  )}
                </div>

                {/* Firmware 1.2 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                  <button
                    onClick={() => toggleSoftware("fw12")}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-semibold text-gray-900">Ampero One Firmware Version 1.2</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.fw12 ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedSoftware.fw12 && (
                    <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                      <p className="text-gray-700 text-sm mb-4">
                        Ampero One V1.2 ファームウェアには、新しいエフェクター、パワフルな追加仕様（CABモジュールに10ユーザーIRスロット追加＆low/highカットコントロール）、システムパフォーマンスの改善、バグ修正が含まれています。是非、ダウンロードしてお試しください。
                      </p>
                      
                      <div className="mb-4">
                        <Image
                          src="/images/brands/hotone/AMPERO_ONE/software_05.jpg"
                          alt="Ampero One Firmware 1.2"
                          width={400}
                          height={200}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>

                      <p className="text-sm font-bold text-gray-800 mb-3">
                        Ampero One Firmware Version 1.2 <span className="text-red-500">- New! -</span>
                      </p>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                        <p className="text-gray-800 text-sm font-bold mb-2">＜アップデートする前にやっておく事！＞</p>
                        <p className="text-gray-700 text-xs mb-2">
                          <span className="font-bold">ノート：</span>V1.2 firmwareとAmpero Editor V1.3.0は一緒に使用するように更新されています。以前のファームウェアでセーブしたプリセットパッチは、新しい機能が含まれているアップデートとの互換性がありません。よって、以前のプリセットのままでは正常に動作しません。
                        </p>
                        <p className="text-gray-700 text-xs mb-2">
                          まず、アップデートする前に、以前に使用していたAmpero Editorからパッチをエクスポートしてください。それらを新しいAmpero Editor V1.3.0へインポートします。新しいエディターは、古いパッチをAmpero Editor V1.3.0（＆V1.2 firmware）で動作するように自動的に書き換えてくれます。
                        </p>
                        <p className="text-gray-700 text-xs mb-2">
                          もし、パッチに3rd-party IRファイルが含まれていると、パッチのインポートの際に確認のメッセージが表示されます。保存する場合は、必ず&quot;Keep&quot;を選択してください。
                        </p>
                        <p className="text-gray-700 text-xs mb-2">
                          パッチをアップデートする前に、ファームウェアを更新してしまった場合は、前のファームウェアに戻せば、パッチのエクスポート/インポートが可能です。
                        </p>
                        <p className="text-gray-700 text-xs">
                          <span className="font-bold">重要事項：</span>ファームウェアのアップデートが完了したら、本体のエクスプレッションペダルの再調整を行ってください。CTRL/EXP→EXP 1 Settings→Calibrateの順で再設定できます。
                        </p>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-gray-900 text-sm font-bold mb-2">V1.2ファームウェア：新たに追加された仕様</h4>
                        <div className="space-y-1 text-xs text-gray-700">
                          <div className="flex items-start gap-2"><span className="bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">1</span><span>新しい言語の追加 （Global &gt; Display）</span></div>
                          <div className="flex items-start gap-2"><span className="bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">2</span><span>CAB モジュールに10 個のユーザーIRスロットが追加されました。</span></div>
                          <div className="flex items-start gap-2"><span className="bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">3</span><span>CAB モジュールにLow cut/high cut のパラメーターが追加されました。</span></div>
                          <div className="flex items-start gap-2"><span className="bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">4</span><span>FX1、FX2モジュール内のSqueezer - Hotone original compressor にwet/dry signal ratioが追加されました。</span></div>
                          <div className="flex items-start gap-2"><span className="bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">5</span><span>Precise Attack – CDCM HD overdrive/boost modelがFX1/FX2モジュールに追加されました。</span></div>
                          <div className="flex items-start gap-2"><span className="bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">6</span><span>Forest Boost – CDCM HD boost modelがFX1/FX2モジュールに追加されました。</span></div>
                          <div className="flex items-start gap-2"><span className="bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">7</span><span>Sweller – Hotone original slow attackがFX1/FX2/FX3モジュールに追加されました。</span></div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-gray-900 text-sm font-bold mb-2">V1.2ファームウェア：改良＆バグフィックス</h4>
                        <div className="space-y-1 text-xs text-gray-700">
                          <div className="flex items-start gap-2"><span className="bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">1</span><span>本体のエクスプレッションペダルインジケーター（on/offステータス）が改善されました。</span></div>
                          <div className="flex items-start gap-2"><span className="bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">2</span><span>Wah使用時、本体エクスプレッションペダルのユーザーフィールを改善しました。</span></div>
                          <div className="flex items-start gap-2"><span className="bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">3</span><span>パッチナンバー＆フルパッチネームがEdit Menuに表示されます。</span></div>
                          <div className="flex items-start gap-2"><span className="bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">4</span><span>Global EQ メニュー調整精度が改善されました。</span></div>
                          <div className="flex items-start gap-2"><span className="bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0">5</span><span>Global EQメニューでBand 2の周波数が表示と一致しないバグを修正しました。</span></div>
                        </div>
                      </div>

                      <a
                        href="#"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors text-sm"
                      >
                        <Download className="w-4 h-4" />
                        ダウンロードはこちら
                      </a>
                    </div>
                  )}
                </div>

                {/* ASIO Driver 5.0.0 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                  <button
                    onClick={() => toggleSoftware("asio500")}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-semibold text-gray-900">HOTONE USB ASIO Driver Version 5.0.0</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.asio500 ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedSoftware.asio500 && (
                    <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                      <p className="text-gray-700 text-sm mb-4">
                        Windows 10 version 2009/20H2に対応。改良とバグ修正を加え、2021年1月28日にリリースいたしました。
                      </p>
                      
                      <div className="mb-4">
                        <Image
                          src="/images/brands/hotone/AMPERO_ONE/software_07.jpg"
                          alt="HOTONE USB ASIO Driver"
                          width={400}
                          height={200}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>

                      <p className="text-sm font-bold text-gray-800 mb-3">
                        HOTONE USB ASIO Driver Version 5.0.0 <span className="text-red-500">- New! -</span>
                      </p>

                      <a
                        href="#"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-full transition-colors text-sm mb-6"
                      >
                        🌐 メーカー・ダウンロードページはこちら
                      </a>

                      <hr className="my-6 border-gray-300" />

                      <h4 className="text-gray-900 font-bold mb-4">Hotone USB ASIOドライバー ユーザーガイド</h4>
                      
                      <h5 className="text-gray-800 font-semibold text-sm mb-3">インストールと設定の手順</h5>
                      
                      <div className="space-y-4 text-sm text-gray-700">
                        <div className="flex items-start gap-2">
                          <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">1</span>
                          <span>AMPERO ONEの電源を入れ、コンピューターとUSBケーブルで接続します。次にHOTONE USB ASIOドライバーをインストールします。</span>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">2</span>
                          <span>お使いのDAWを起動します。（例）Cubase 8 Element：［デバイス］→［デバイス設定］をクリックします。</span>
                        </div>
                        
                        <div className="ml-7 mb-2">
                          <Image
                            src="/images/brands/hotone/AMPERO_ONE/software_08.jpg"
                            alt="Cubase 8 Element"
                            width={400}
                            height={200}
                            className="w-full h-auto rounded-lg"
                          />
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">3</span>
                          <span>［デバイス設定］ウィンドウから［VSTオーディオ］を選択します。</span>
                        </div>
                        
                        <div className="ml-7 mb-2">
                          <Image
                            src="/images/brands/hotone/AMPERO_ONE/software_09.png"
                            alt="Cubase 8 Element VST Audio"
                            width={400}
                            height={300}
                            className="w-full h-auto rounded-lg"
                          />
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">4</span>
                          <span>『ASIO Driver』のドロップダウンリストから［HOTONE AUDIO USB ASIO Device］を選択し［OK］をクリックします。</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Editor V1.4.2 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                  <button
                    onClick={() => toggleSoftware("ed142")}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-gray-900 block">Ampero Editor V1.4.2</span>
                        <span className="text-xs text-red-500 font-bold">New!</span>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.ed142 ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedSoftware.ed142 && (
                    <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                      <p className="text-gray-700 text-sm mb-2">
                        Ampero One Firmware 2.1に対応したAmpero Editorです。
                      </p>
                      <p className="text-gray-600 text-sm mb-4">リリース日：2024年10月29日</p>
                      
                      <div className="mb-4">
                        <Image
                          src="/images/brands/hotone/AMPERO_ONE/software_02.png"
                          alt="Ampero Editor V1.4.2"
                          width={400}
                          height={200}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>

                      <div className="mb-4">
                        <h4 className="text-gray-900 text-sm font-bold mb-2">新機能</h4>
                        <div className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-green-500">✓</span>
                          <span>Firmware V2.1 サポート機能の追加</span>
                        </div>
                      </div>

                      <a
                        href="#"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors text-sm"
                      >
                        <Download className="w-4 h-4" />
                        ダウンロードはこちら
                      </a>
                    </div>
                  )}
                </div>

                {/* Editor V1.4.0 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                  <button
                    onClick={() => toggleSoftware("ed140")}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-semibold text-gray-900">Ampero Editor V1.4.0</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.ed140 ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedSoftware.ed140 && (
                    <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                      <p className="text-gray-700 text-sm mb-2">
                        Ampero Firmware 4.1に対応したAmpero Editorです。
                      </p>
                      <p className="text-gray-600 text-sm mb-4">リリース日：2023年7月12日</p>
                      
                      <div className="mb-4">
                        <Image
                          src="/images/brands/hotone/AMPERO_ONE/software_04.jpg"
                          alt="Ampero Editor V1.4.0"
                          width={400}
                          height={200}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>

                      <div className="mb-4">
                        <h4 className="text-gray-900 text-sm font-bold mb-2">新機能</h4>
                        <div className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-green-500">✓</span>
                          <span>Ampero One Firmware V2.0 サポート機能の追加</span>
                        </div>
                      </div>

                      <a
                        href="#"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors text-sm"
                      >
                        <Download className="w-4 h-4" />
                        ダウンロードはこちら
                      </a>
                    </div>
                  )}
                </div>

                {/* Editor V1.2.7 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                  <button
                    onClick={() => toggleSoftware("ed127")}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-xl flex items-center justify-center">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-semibold text-gray-900">Ampero Editor V1.2.7</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.ed127 ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedSoftware.ed127 && (
                    <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                      <p className="text-gray-700 text-sm mb-4">
                        Ampero One Editorは準備中ですが、Ampero Editor v1.2.7を暫定的に使用していただけます。
                      </p>
                      
                      <div className="mb-4">
                        <Image
                          src="/images/brands/hotone/AMPERO_ONE/software_06.png"
                          alt="Ampero Editor V1.2.7"
                          width={400}
                          height={200}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>

                      <p className="text-sm font-bold text-gray-800 mb-3">Ampero Editor V1.2.7</p>

                      <div className="mb-4">
                        <h4 className="text-gray-900 text-sm font-bold mb-2">詳細情報（ver.1.2.7）</h4>
                        <div className="space-y-1 text-sm text-gray-700">
                          <div className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>Ampero One Firmware V1.0 に対応</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>Windows版、macOS版</span>
                          </div>
                        </div>
                      </div>

                      <a
                        href="#"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors text-sm"
                      >
                        <Download className="w-4 h-4" />
                        ダウンロードはこちら
                      </a>
                    </div>
                  )}
                </div>

                {/* ASIO Driver 5.41.2 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                  <button
                    onClick={() => toggleSoftware("asio5412")}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-gray-900 block">HOTONE USB ASIO Driver Version 5.41.2</span>
                        <span className="text-xs text-red-500 font-bold">New!</span>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.asio5412 ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedSoftware.asio5412 && (
                    <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                      <p className="text-gray-700 text-sm mb-4">
                        USB ASIO DRIVER が V.5.41.2に更新されました。2022年8月12日にリリースいたしました。
                      </p>
                      
                      <div className="mb-4">
                        <Image
                          src="/images/brands/hotone/AMPERO_ONE/software_10.jpg"
                          alt="HOTONE USB ASIO Driver V5.41.2"
                          width={400}
                          height={200}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>

                      <p className="text-sm font-bold text-gray-800 mb-3">
                        HOTONE USB ASIO Driver Version 5.41.2 <span className="text-red-500">- New! -</span>
                      </p>

                      <a
                        href="#"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-full transition-colors text-sm mb-6"
                      >
                        🌐 メーカー・ダウンロードページはこちら
                      </a>

                      <hr className="my-6 border-gray-300" />

                      <h4 className="text-gray-900 font-bold mb-4">Hotone USB ASIO Driver の使用方法</h4>
                      
                      <h5 className="text-gray-800 font-semibold text-sm mb-3">インストールと設定の手順</h5>
                      
                      <div className="space-y-4 text-sm text-gray-700">
                        <div className="flex items-start gap-2">
                          <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">1</span>
                          <span>Hotone製品の電源を入れ、コンピューターに接続します。その後、Hotone USB ASIO Driverをインストールします。</span>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">2</span>
                          <span>使用されるDAWを起動して、&quot;Devices&quot; – &quot;Device Setup&quot;をクリックします。（Cubase 8 Element versionを例に説明します。）</span>
                        </div>
                        
                        <div className="ml-7 mb-2">
                          <Image
                            src="/images/brands/hotone/AMPERO_ONE/software_11.png"
                            alt="Cubase 8 Element"
                            width={400}
                            height={200}
                            className="w-full h-auto rounded-lg"
                          />
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">3</span>
                          <span>&quot;Device Setup&quot; ウィンドウの&quot;VST Audio&quot;を選択します。</span>
                        </div>
                        
                        <div className="ml-7 mb-2">
                          <Image
                            src="/images/brands/hotone/AMPERO_ONE/software_12.png"
                            alt="VST Audio Setup"
                            width={400}
                            height={300}
                            className="w-full h-auto rounded-lg"
                          />
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">4</span>
                          <span>ASIO Driverのドロップダウンメニューから&quot;HOTONE AUDIO USB Audio Device&quot;を見つけて、 &quot;OK&quot;をクリックします。</span>
                        </div>
                        
                        <div className="ml-7 mb-2">
                          <Image
                            src="/images/brands/hotone/AMPERO_ONE/software_13.png"
                            alt="ASIO Driver Selection"
                            width={400}
                            height={300}
                            className="w-full h-auto rounded-lg"
                          />
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">5</span>
                          <span>これで完了です。</span>
                        </div>
                      </div>

                      <a
                        href="#"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-full transition-colors text-sm mt-4"
                      >
                        🌐 ここからUSB ASIO Driver V5.41.2.をダウンロードしてください。
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 scroll-mt-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">よくある質問</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
              {/* Left Column */}
              <div className="space-y-4">
                {/* FAQ 1 */}
                <div className="bg-gray-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq1")}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 text-lg">?</span>
                      <span className="font-medium text-gray-800 text-left text-sm">Ampero、Ampero Oneをオーディオ・インターフェースとして使用する</span>
                    </div>
                    <span className={`text-gray-400 transition-transform ${expandedFaq.faq1 ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {expandedFaq.faq1 && (
                    <div className="px-5 py-4 bg-blue-50">
                      <p className="text-gray-700 text-sm mb-4">
                        両AmperoはUSBオーディオインターフェースとして使用できます。セットアップや使用に関する以下の注意点をご参照ください。
                      </p>
                      <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex gap-3">
                          <span className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                          <p>スピーカーやヘッドフォンがAmperoに接続されていることを確認して下さい。</p>
                        </div>
                        <div className="flex gap-3">
                          <span className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                          <p>Amperoやインストルメントのボリューム設定を確認して下さい。</p>
                        </div>
                        <div className="flex gap-3">
                          <span className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                          <p>Ampero & Ampero Oneに最新ファームウェアがインストールされていることを確認して下さい。また、実機とコンピューターは、必ず直接USB接続して下さい。</p>
                        </div>
                        <div className="flex gap-3">
                          <span className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                          <p>ハブや延長ケーブルを使用しての接続は誤動作の原因になります。</p>
                        </div>
                        <div className="flex gap-3">
                          <span className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
                          <p>同梱されているUSBケーブルを使用して下さい。</p>
                        </div>
                        <div className="flex gap-3">
                          <span className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">6</span>
                          <p>コンピューター/プレイバックソフトウェア/DAWは、Amperoで使用できるようにセットアップして下さい。DAWのセッティング時にPCユーザーは「HOTONE AUDIO USB Audio Device（HOTONE専用ASIOドライバー）」を選択して下さい。</p>
                        </div>
                        <div className="flex gap-3">
                          <span className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">7</span>
                          <p>ハードウェアの入出力設定は、コンピューター/プレイバックソフトウェア/DAWとAmperoを1対1で行って下さい。</p>
                        </div>
                        <div className="flex gap-3">
                          <span className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">8</span>
                          <p>DAWとのトラック設定は、コンピューター/プレイバックソフトウェア/DAWとAmperoを1対1で行って下さい。</p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mt-4 italic">
                        ノート：上記の手順で行っても正常動作しない場合は、異なるUSBポート、USBケーブル、または異なるコンピューターで試してみて下さい。
                      </p>
                    </div>
                  )}
                </div>

                {/* FAQ 2 */}
                <div className="bg-gray-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq2")}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 text-lg">?</span>
                      <span className="font-medium text-gray-800 text-left text-sm">レコーディング信号が非常に低い</span>
                    </div>
                    <span className={`text-gray-400 transition-transform ${expandedFaq.faq2 ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {expandedFaq.faq2 && (
                    <div className="px-5 py-4 bg-blue-50">
                      <p className="text-gray-700 text-sm">
                        AmperoまたはAmpero Editorのレコーディング・ボリューム・オプションで信号レベルは調整できます。また、プリセット・ボリュームの出力をあげての調整も可能です。上げすぎると出力段をオーバーロードしますので気をつけて下さい。
                      </p>
                    </div>
                  )}
                </div>

                {/* FAQ 3 */}
                <div className="bg-gray-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq3")}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 text-lg">?</span>
                      <span className="font-medium text-gray-800 text-left text-sm">オーディオ・インターフェースとして使用時、モニターボリュームが調整できない</span>
                    </div>
                    <span className={`text-gray-400 transition-transform ${expandedFaq.faq3 ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {expandedFaq.faq3 && (
                    <div className="px-5 py-4 bg-blue-50">
                      <p className="text-gray-700 text-sm">
                        色々な接続ケースを考慮して、システムボリューム機能を使えないようにしました。リスニングボリュームの調整は、Global Settings→USB Audio（本体またはAmpero Editor）で行います。PCユーザーはソフトウェアドライバーのコンソールで調整できます。
                      </p>
                    </div>
                  )}
                </div>

                {/* FAQ 4 */}
                <div className="bg-gray-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq4")}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 text-lg">?</span>
                      <span className="font-medium text-gray-800 text-left text-sm">ノイズ関連の問題点</span>
                    </div>
                    <span className={`text-gray-400 transition-transform ${expandedFaq.faq4 ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {expandedFaq.faq4 && (
                    <div className="px-5 py-4 bg-blue-50">
                      <p className="text-gray-700 text-sm mb-4">
                        ノイズ問題はミュージシャンにとって頭の痛い問題です。それらが起こる原因は複雑な場合が多いのですが、対策により取り除いたり、減少させることは可能です。トラブルシューティングを始める前に、Ampero （またはAmpero One）が最新のファームウェアがアップロードされているか確認しましょう。
                      </p>
                      <p className="text-gray-800 text-sm font-bold mb-2">Amperoシリーズ　最新ファームウェア</p>
                      <ul className="text-gray-700 text-sm space-y-1 mb-4">
                        <li>Ampero Black：V3.7</li>
                        <li>Ampero Pink：V3.3B</li>
                        <li>Ampero One：V1.1</li>
                      </ul>
                      <p className="text-gray-700 text-sm">
                        最新ファームウェアのダウンロード：<a href="http://www.hotoneaudio.com/support/2" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">http://www.hotoneaudio.com/support/2</a>
                      </p>
                    </div>
                  )}
                </div>

                {/* FAQ 5 */}
                <div className="bg-gray-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq5")}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 text-lg">?</span>
                      <span className="font-medium text-gray-800 text-left text-sm">外部からアクセスできるフットスイッチを増やしたいのですが...</span>
                    </div>
                    <span className={`text-gray-400 transition-transform ${expandedFaq.faq5 ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {expandedFaq.faq5 && (
                    <div className="px-5 py-4 bg-blue-50">
                      <p className="text-gray-700 text-sm mb-4">
                        スイッチング機能の追加は、Ampero Switchの増設で解決できます。Ampero Switch のAmpero Oneでの使い方は<a href="https://hotonejapan.jp/brands/hotone/products/ampero-switch-plus" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">こちら</a>をご覧ください。Amperoで使用する際は、Global menuで EXP 2/FSのサブメニューのMODEを「Dual FS」に設定します。さらなる外部アクセス機能の追加は、MIDIコントローラーの追加を推奨します。
                      </p>
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                        <iframe
                          src="https://www.youtube.com/embed/PxLcgoTtPYw?start=41"
                          title="Ampero Switch Demo"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* FAQ 6 */}
                <div className="bg-gray-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq6")}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 text-lg">?</span>
                      <span className="font-medium text-gray-800 text-left text-sm">最新バージョンのファームウェアとソフトウェアのダウンロード先は？</span>
                    </div>
                    <span className={`text-gray-400 transition-transform ${expandedFaq.faq6 ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {expandedFaq.faq6 && (
                    <div className="px-5 py-4 bg-blue-50">
                      <p className="text-gray-700 text-sm mb-2">
                        Hotone オフィシャルwebサイトからダウンロードできます。
                      </p>
                      <a href="https://www.hotoneaudio.com/support/1" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm">
                        https://www.hotoneaudio.com/support/1
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* FAQ 7 */}
                <div className="bg-gray-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq7")}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 text-lg">?</span>
                      <span className="font-medium text-gray-800 text-left text-sm">Ampero（Ampero Editor）を認識しない、機能しない等の症状が出る場合</span>
                    </div>
                    <span className={`text-gray-400 transition-transform ${expandedFaq.faq7 ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {expandedFaq.faq7 && (
                    <div className="px-5 py-4 bg-blue-50">
                      <p className="text-gray-700 text-sm mb-4">
                        「Amperoをデバイスとして認識しない。」「オーディオインターフェースとして機能しない。」「Ampero Editorを認識しない。」このような症状が出た場合は、次の6つのステップをお試し下さい。
                      </p>
                      <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex gap-3">
                          <span className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                          <p>Amperoを使用するコンピューターに接続して、Device Manager を起動しSound、Audio Devices、Game Controller sub-optionsを設定します。</p>
                        </div>
                        <div className="flex gap-3">
                          <span className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                          <p>Amperoに関連するドライバーを全てアンインストールします。</p>
                        </div>
                        <div className="flex gap-3">
                          <span className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                          <p>Hotoneドライバーをアンインストールします。</p>
                        </div>
                        <div className="flex gap-3">
                          <span className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                          <p>Ampero とコンピューターの接続を解除し、コンピューターを再起動します。</p>
                        </div>
                        <div className="flex gap-3">
                          <span className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
                          <p>最新版のHotone ASIOドライバーを再インストールします。この際、Amperoはコンピューターに接続しないでください。</p>
                        </div>
                        <div className="flex gap-3">
                          <span className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">6</span>
                          <p>ステップ5の再インストールが完了したら、Ampero を再びコンピューターに接続して機能を試してみて下さい。</p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mt-4 italic">
                        ノート：上記の手順で行っても正常動作しない場合は、異なるUSBポート、USBケーブル、または異なるコンピューターで試してみて下さい。
                      </p>
                    </div>
                  )}
                </div>

                {/* FAQ 8 */}
                <div className="bg-gray-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq8")}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 text-lg">?</span>
                      <span className="font-medium text-gray-800 text-left text-sm">DAWからのモニタリングで2つのサウンドが聴こえる</span>
                    </div>
                    <span className={`text-gray-400 transition-transform ${expandedFaq.faq8 ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {expandedFaq.faq8 && (
                    <div className="px-5 py-4 bg-blue-50">
                      <p className="text-gray-700 text-sm">
                        この症状はAmperoに早いサウンドが戻され遅いサウンドに重なるために起こります。この問題を解決してレコーディングの精度を上げるには、録音の際はDAWのトラックをモニターするのではなく、Amperoの出力を直接することをお勧めします。
                      </p>
                    </div>
                  )}
                </div>

                {/* FAQ 9 */}
                <div className="bg-gray-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq9")}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 text-lg">?</span>
                      <span className="font-medium text-gray-800 text-left text-sm">ドライバーのアップデートで使用していた機能が使えなくなった</span>
                    </div>
                    <span className={`text-gray-400 transition-transform ${expandedFaq.faq9 ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {expandedFaq.faq9 && (
                    <div className="px-5 py-4 bg-blue-50">
                      <p className="text-gray-700 text-sm">
                        このような問題が起きたら support@hotone.jp までメールでご連絡ください。メーカーサポートと調整いたします。
                      </p>
                    </div>
                  )}
                </div>

                {/* FAQ 10 */}
                <div className="bg-gray-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq10")}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 text-lg">?</span>
                      <span className="font-medium text-gray-800 text-left text-sm">ノイズのトラブル・シューティング</span>
                    </div>
                    <span className={`text-gray-400 transition-transform ${expandedFaq.faq10 ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {expandedFaq.faq10 && (
                    <div className="px-5 py-4 bg-blue-50">
                      <div className="space-y-4 text-sm text-gray-700">
                        <div>
                          <p className="font-bold text-gray-800 mb-2">1. ギター関連</p>
                          <p>シングルコイルPU（ノイズレスタイプを除く）のギターは、外部からのノイズを拾う傾向があります。ノイズが発生した際に、弦やメタルパーツに触れるとノイズが下がるようであれば、ギターのグランド接続の問題です。また、PUにワイヤーシールドが無かったり、使用ケーブルのシールディングが良くない、アンプや機材に近い場合もノイズは発生します。</p>
                        </div>
                        
                        <div>
                          <p className="font-bold text-gray-800 mb-2">2. ケーブル</p>
                          <p>本質の高いプロフェッショナルケーブルの使用をお勧めします。安価なケーブルはシールディング密度が低いため、外部からのノイズの混入が考えられます。また、ケーブルは、ノイズの混入を避けるため、携帯電話やエフェクター、スピーカーから離すようにして下さい。</p>
                        </div>
                        
                        <div>
                          <p className="font-bold text-gray-800 mb-2">3. パワーサプライ</p>
                          <p>Ampero（またはAmpero One）に同梱されているオリジナルアダプターを使用して下さい。スペックの異なる電源の使用はノイズの原因になります。また、複数のエフェクターやアンプと使用する場合は、電源フィルターやコンディショナーからの接続を推奨します。</p>
                        </div>
                        
                        <div>
                          <p className="font-bold text-gray-800 mb-2">4. エフェクトチェーン</p>
                          <p className="mb-2">他のエフェクターと組み合わせる場合、適切なセットアップがなされていないとノイズを増やす場合があります。次にあげるポイントを注意しましょう。</p>
                          <p className="mb-2">（１）Ampero をアンプの入力に接続する場合は、AMPとCABモジュールをオフにして下さい。AMPがオンになっていると信号が複数回増幅されますから、大きなノイズの原因になります。また、ギタートーンも本来のアンプサウンドからかけ離れたものになります。</p>
                          <p>（２）Ampero 出力をアンプのリターンジャックに接続する場合は、CABモジュールをオフにして下さい。アンプに接続されているスピーカーキャビネットと重なり、正常なギタートーンが得られません。</p>
                        </div>
                        
                        <div>
                          <p className="font-bold text-gray-800 mb-2">● 固定周波数ノイズ</p>
                          <p>Amperoをミキサーやパワードスピーカー（レコーディング用モニターやパワードフロアモニター）などの機器と接続して使用すると、固定周波数ノイズが発生する場合があります。これは接続機器とのグランドループが原因です。原因になっている機器を特定し、電源リフトプラグを使いグランドをアイソレートする必要があります。</p>
                        </div>
                        
                        <div>
                          <p className="font-bold text-gray-800 mb-2">● 不規則な低域周波数のハムノイズ</p>
                          <p>この種のノイズはプリセットにNoise Gateを入れれば解決できます。ノイズが消えるようにスレッショルドを設定して下さい。</p>
                        </div>
                        
                        <div>
                          <p className="font-bold text-gray-800 mb-2">● クリックノイズ</p>
                          <p>高出力インストルメントの入力への接続やエフェクターの過度な設定で起こるオーバーロードがノイズの原因です。先のアップデートになりますが、オーバーロードを防ぐために、入出力メーターでのレベルモニターを追加する予定です。</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* FAQ 11 */}
                <div className="bg-gray-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq11")}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 text-lg">?</span>
                      <span className="font-medium text-gray-800 text-left text-sm">Ampero, and Ampero Oneの電源仕様</span>
                    </div>
                    <span className={`text-gray-400 transition-transform ${expandedFaq.faq11 ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {expandedFaq.faq11 && (
                    <div className="px-5 py-4 bg-blue-50">
                      <p className="text-gray-700 text-sm mb-4">
                        それぞれに同梱されているオリジナルアダプターの使用を推奨します。
                      </p>
                      <p className="text-gray-800 text-sm font-bold mb-2">各機種の電源スペック</p>
                      <ul className="text-gray-700 text-sm space-y-2">
                        <li><span className="font-semibold">Ampero：</span>DC 18V/500mAセンターマイナス5.5mm X 2.1mmプラグ （AC電源側はGND接続を推奨）</li>
                        <li><span className="font-semibold">Ampero One：</span>DC 9V/500mAセンターマイナス5.5mm X 2.1mmプラグ</li>
                      </ul>
                    </div>
                  )}
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
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Column */}
              <div className="space-y-8">
                {/* INPUT セクション */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">INPUT セクション</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>1/4&quot;楽器入力（TS）</p>
                    <p>1/8&quot;ステレオ AUX IN</p>
                    <p>1/4&quot;エクスプレッション入力（TRS）</p>
                  </div>
                </div>

                {/* OUTPUT セクション */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">OUTPUT セクション</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>1/4&quot;アンバランス出力 x2</p>
                    <p>1/8&quot;ヘッドホン端子</p>
                  </div>
                </div>

                {/* 入力インピーダンス */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">入力インピーダンス</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>楽器入力：4.7MΩ</p>
                    <p>AUX IN：10kΩ</p>
                  </div>
                </div>

                {/* 出力インピーダンス */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">出力インピーダンス</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>アンバランス出力：3.2kΩ</p>
                    <p>ヘッドホン出力：66Ω</p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* デジタル・セクション */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">デジタル・セクション</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>デジタル・プロセッシング：24-bit depth, 44.1kHz sample rate</p>
                    <p>SN比：120dB</p>
                    <p>搭載エフェクト数：242（最大同時使用数 9個まで）</p>
                    <p>プリセット数：198 (99 user patches, 99 factory patches)</p>
                    <p>ルーパータイム：Mono 100秒, Stereo 50秒</p>
                    <p>ドラムマシーン機能：100 Rhythm Patterns</p>
                    <p>ディスプレイ：４インチ 800 x 480px カラー・ダイナミック・ディスプレイ・タッチスクリーン</p>
                    <p>USB：USB 2.0 Type-B port, supports USB Audio 2.0</p>
                    <p>IR プロセッシング：Supports 24-bit/44.1kHz Mono WAV files, 1024 points</p>
                  </div>
                </div>

                {/* その他 */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">その他</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>電源：9V DC センターマイナス</p>
                    <p>消費電力：500mA Max</p>
                    <p>サイズ：273mm（W）x 143mm（D）x 51mm（H）</p>
                    <p>重量：1202g</p>
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

