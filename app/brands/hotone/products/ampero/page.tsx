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

export default function AmperoPage() {
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
          src="/images/brands/hotone/Ampero/hero.jpg"
          alt="AMPERO"
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
                <p className="text-2xl font-bold text-gray-900">AMPERO</p>
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
                  ¥74,800
                </p>
                <p className="text-xs text-gray-500">前後（税込）</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">6959473905029</p>
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
              コンパクトにて無敵
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              完全体のマルチ・エフェクター
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
                  src="/images/brands/hotone/Ampero/intro.jpg"
                  alt="AMPERO"
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
                    <span>AMPERO 取扱説明書</span>
                  </a>
                  <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm">
                    <span>📄</span>
                    <span>AMPERO 取扱説明書（Firmware v3.7対応）</span>
                  </a>
                  <a href="#" className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm">
                    <span className="font-bold">New!</span>
                    <span>AMPERO 取扱説明書（Firmware v4.1対応）</span>
                  </a>
                  <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm">
                    <span>📄</span>
                    <span>アップデーター・マニュアル</span>
                  </a>
                  <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm">
                    <span className="text-yellow-500">☆</span>
                    <span>AMPERO ONE 製品情報</span>
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
                  超高速演算によりクラス最高のAmp + Effect + IRが同時にプレイできる完全体です。XTOMPの400%の演算力でHOTONEが誇るダイナミック・モデリングのサウンドをお届けできます。250を優に超えるAmp、Effector、IR CABで、Eギター、アコースティック、ベース＆ラインに対応できます。完璧なI/Oを装備しており、場所も用途も選びません。
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
                  <h4 className="text-lg font-bold text-gray-900 mb-2">高ダイナミックレンジ、120dB、３種類の入力インピーダンス</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    18V DC電源採用（内部アナログ回路は24Vに昇圧）による高ダイナミック・レンジ設計と24-bitシグナル・プロセッシングによる120dB 高S/N比。さらに、異なる入力ソースに対応できるように、入力インピーダンスの異なる３段階の入力モード切り替えで、Eギター、アコースティック・ギター、キーボード（ライン）の入力が可能です。異なる楽器専用のプリセットも用意しました。
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">アコースティック・サウンド</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    ライブにアコースティック・ギターを持っていく必要がありません。IRとシミュレーション・アルゴリズムの両テクノロジーにより、Eギターから精度の高いアコースティック・サウンドを再生することに成功しました。スティール弦、ナイロン弦、ウクレレまで、マイク収音したサウンドを提供できます。
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
                  src="https://www.youtube.com/embed/j_PPuRWmwOM"
                  title="AMPERO Introduction"
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
                  src="/images/brands/hotone/Ampero/concept_01.jpg"
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
                src="/images/brands/hotone/Ampero/concept_02.png"
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
                  src="https://www.youtube.com/embed/j_PPuRWmwOM"
                  title="AMPERO Demo Video 1"
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
                  src="https://www.youtube.com/embed/tiy765Z1JWk"
                  title="AMPERO Demo Video 2"
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
                  src="https://www.youtube.com/embed/z7m6ftfyS_8"
                  title="AMPERO Demo Video 3"
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
                  src="https://www.youtube.com/embed/NSzGTHIttrU"
                  title="AMPERO Demo Video 4"
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
                  title="AMPERO Demo Video 5"
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
                  src="https://www.youtube.com/embed/DHanV9R5hbY"
                  title="AMPERO Demo Video 6"
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
                  <span>♫</span> Demo Song 1-Music
                </p>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/Ampero/sound_01.mp3" type="audio/mpeg" />
                </audio>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <span>♫</span> Demo Song 2-Music
                </p>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/Ampero/sound_02.mp3" type="audio/mpeg" />
                </audio>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <span>♫</span> Finger Bass + Slap Bass Demo-Music
                </p>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/Ampero/sound_03.mp3" type="audio/mpeg" />
                </audio>
              </div>

              {/* Row 2 */}
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <span>♫</span> Marshell 900 Higain
                </p>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/Ampero/sound_04.mp3" type="audio/mpeg" />
                </audio>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <span>♫</span> Eddie 51 Higain
                </p>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/Ampero/sound_05.mp3" type="audio/mpeg" />
                </audio>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <span>♫</span> Messe IV Lead 3 Higain
                </p>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/Ampero/sound_06.mp3" type="audio/mpeg" />
                </audio>
              </div>

              {/* Row 3 */}
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <span>♫</span> P03-3 Digiera Clean Guitar Preset
                </p>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/Ampero/sound_07.mp3" type="audio/mpeg" />
                </audio>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <span>♫</span> P08-2 Panned Horror Guitar Preset
                </p>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/Ampero/sound_08.mp3" type="audio/mpeg" />
                </audio>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <span>♫</span> P18-3 Edgy Delay Guitar Preset
                </p>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/Ampero/sound_09.mp3" type="audio/mpeg" />
                </audio>
              </div>

              {/* Row 4 */}
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <span>♫</span> Baseman Bright Low Gain
                </p>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/Ampero/sound_10.mp3" type="audio/mpeg" />
                </audio>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <span>♫</span> Emperor Clean Low Gain
                </p>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/Ampero/sound_11.mp3" type="audio/mpeg" />
                </audio>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <span>♫</span> Messe IIC+ 3 Low Gain
                </p>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/Ampero/sound_12.mp3" type="audio/mpeg" />
                </audio>
              </div>

              {/* Row 5 */}
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <span>♫</span> Chorus Bass Dry
                </p>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/Ampero/sound_13.mp3" type="audio/mpeg" />
                </audio>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <span>♫</span> Fuzz Bass
                </p>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/Ampero/sound_14.mp3" type="audio/mpeg" />
                </audio>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <span>♫</span> Slap Bass 2 Dry
                </p>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/Ampero/sound_15.mp3" type="audio/mpeg" />
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
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-lg">
                  <span className="text-green-500 text-lg">✓</span>
                  <span className="text-gray-700 text-sm">新世代CDCM HD モデリング・テクノロジーとIR / F.I.R.E. テクノロジーを採用</span>
                </div>
                <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-lg">
                  <span className="text-green-500 text-lg">✓</span>
                  <span className="text-gray-700 text-sm">４インチ・カラー・タッチスクリーンで直感的な操作</span>
                </div>
                <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-lg">
                  <span className="text-green-500 text-lg">✓</span>
                  <span className="text-gray-700 text-sm">パワフルなデュアル SHARC DSPプラット・フォーム</span>
              </div>
                <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-lg">
                  <span className="text-green-500 text-lg">✓</span>
                  <span className="text-gray-700 text-sm">24-bitシグナル・プロセッシングによる120dB 高S/N比</span>
                </div>
                <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-lg">
                  <span className="text-green-500 text-lg">✓</span>
                  <span className="text-gray-700 text-sm">18V DC電源採用による高ダイナミック・レンジ設計</span>
                </div>
                <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-lg">
                  <span className="text-green-500 text-lg">✓</span>
                    <span className="text-gray-700 text-sm">USB経由のファームウェア・アップデート、ロード、エディット、編集が可能</span>
                  </div>
                <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-lg">
                  <span className="text-green-500 text-lg">✓</span>
                  <span className="text-gray-700 text-sm">Mac/PCフリーソフトによるIRローディング</span>
                </div>
                <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-lg">
                  <span className="text-green-500 text-lg">✓</span>
                    <span className="text-gray-700 text-sm">USBオーディオ・インターフェース機能</span>
                  </div>
                <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-lg">
                  <span className="text-green-500 text-lg">✓</span>
                  <span className="text-gray-700 text-sm">244 エフェクト・ライブラリー</span>
                </div>
                <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-lg">
                  <span className="text-green-500 text-lg">✓</span>
                    <span className="text-gray-700 text-sm">64 アンプモデル、60 キャブモデル、100+ ペダルモデルを収録</span>
                  </div>
                <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-lg">
                  <span className="text-green-500 text-lg">✓</span>
                  <span className="text-gray-700 text-sm">新マイクポジション変更＆マイクタイプのシミュレーション</span>
                </div>
                <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-lg">
                  <span className="text-green-500 text-lg">✓</span>
                    <span className="text-gray-700 text-sm">3rdパーティIR＆ユーザーIRのロードが可能</span>
                  </div>
                <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-lg">
                  <span className="text-green-500 text-lg">✓</span>
                  <span className="text-gray-700 text-sm">50+ HOTONEオリジナル・エフェクトを追加</span>
                </div>
                <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-lg">
                  <span className="text-green-500 text-lg">✓</span>
                    <span className="text-gray-700 text-sm">198 x プリセット</span>
                  </div>
                <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-lg">
                  <span className="text-green-500 text-lg">✓</span>
                  <span className="text-gray-700 text-sm">100パターンを備えたドラムマシーンを内蔵</span>
                </div>
                <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-lg">
                  <span className="text-green-500 text-lg">✓</span>
                    <span className="text-gray-700 text-sm">120秒ルーパー機能内蔵</span>
                  </div>
                <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-lg">
                  <span className="text-green-500 text-lg">✓</span>
                  <span className="text-gray-700 text-sm">機能のアサインが可能な4 x LED付きフットスイッチ</span>
                </div>
                <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-lg">
                  <span className="text-green-500 text-lg">✓</span>
                    <span className="text-gray-700 text-sm">エクスプレッション・ペダルを本体に装備</span>
                  </div>
                <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-lg">
                  <span className="text-green-500 text-lg">✓</span>
                  <span className="text-gray-700 text-sm">ステレオ・プロセッシング</span>
                </div>
                <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-lg">
                  <span className="text-green-500 text-lg">✓</span>
                    <span className="text-gray-700 text-sm">AUX入力</span>
                  </div>
                <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-lg">
                  <span className="text-green-500 text-lg">✓</span>
                  <span className="text-gray-700 text-sm">Line出力、XLR出力、ヘッドフォン出力</span>
                  </div>
                <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-lg">
                  <span className="text-green-500 text-lg">✓</span>
                  <span className="text-gray-700 text-sm">MIDI IN、EXP2（エクスプレッション）</span>
                </div>
                <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-lg">
                  <span className="text-green-500 text-lg">✓</span>
                  <span className="text-gray-700 text-sm">GND LIFT 切り替えスイッチ</span>
                  </div>
                <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-lg">
                  <span className="text-green-500 text-lg">✓</span>
                  <span className="text-gray-700 text-sm">３種類の入力インピーダンス切り替え</span>
                  </div>
                  </div>
                  </div>
          </div>
        </div>
      </section>

      {/* Controls Section */}
      <section id="controls" className="py-20 scroll-mt-24 bg-gray-200">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">コントロール</h2>
            <div className="flex justify-center">
              <div className="w-20 h-1 rounded hotone-bar" />
            </div>
          </div>

          <div className="max-w-4xl mx-auto bg-gray-300 rounded-xl p-8">
            <div className="flex justify-center mb-8">
              <Image
                src="/images/brands/hotone/Ampero/control_01.png"
                alt="AMPERO Front Panel"
                width={900}
                height={450}
                className="w-full h-auto"
              />
            </div>

            <div className="border-t border-gray-400 my-8"></div>

            <div className="flex justify-center">
              <Image
                src="/images/brands/hotone/Ampero/control_02.png"
                alt="AMPERO Back Panel"
                width={900}
                height={200}
                className="w-full h-auto"
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
                {/* Firmware 4.2 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                  <button
                    onClick={() => toggleSoftware("fw42")}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-gray-900 block">最新ファームウェア：Ampero Firmware Version 4.2</span>
                        <span className="text-xs text-red-500 font-bold">New!</span>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.fw42 ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedSoftware.fw42 && (
                    <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                      <p className="text-gray-700 text-sm mb-3">
                        この V4.2 ファームウェア アップデートでは、新しいエフェクト、より強力な機能、最適化されたシステム パフォーマンス、バグ修正が提供されます。可能な限り最高のユーザーエクスペリエンスを実現するために、すべてのユーザーにこのアップデートを実行することをお勧めします。
                      </p>
                      <p className="text-gray-600 text-sm mb-4">リリース日：2024年10月29日</p>
                      
                      <div className="mb-4">
                        <Image
                          src="/images/brands/hotone/Ampero/software_01.png"
                          alt="Ampero Firmware 4.2"
                          width={400}
                          height={200}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                        <p className="text-gray-800 text-sm font-bold mb-2">＜重要！＞</p>
                        <p className="text-gray-700 text-xs mb-2">
                          ファームウェアのアップデート後、内蔵/外部エクスプレッション・ペダルの両方を再キャリブレーションしてください。
                        </p>
                        <p className="text-gray-600 text-xs mb-2">
                          （CTRL/EXP &gt; EXP 1/2 設定 &gt; キャリブレーション）
                        </p>
                        <p className="text-gray-700 text-xs mb-2">
                          今回のアップデートにより、元のCTRLデータはCTRL1の位置に移動されますので、必要に応じて再設定してください。
                        </p>
                        <p className="text-gray-600 text-xs">
                          注：V4.2 ファームウェアは、Ampero Editor V1.4.2 のみで使用してください。
                        </p>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-gray-900 text-sm font-bold mb-2">V4.2ファームウェア：新たに追加された機能</h4>
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
                            <span>CTRLコントロールを追加し、4つのフットスイッチをすべてCTRLに設定できるようになりました（このアップデート後、元のCTRLデータはCTRL 1の位置に移動されます）。</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">4</span>
                            <span>パラメータバーのタッチコントロールを追加しました。パラメータバーの左側と右側をクリックして、選択したパラメータを増減または切り替えることができます。</span>
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
                            <span>TC Electronic® 2290 ダイナミック デジタル ディレイ* に基づいた、DLY モジュールで利用可能な 2290 Mod–CDCM HD ディレイ モデル</span>
                          </div>
                        </div>
                        <p className="text-gray-500 text-xs mt-2">
                          ＊記載のメーカー名、商品名は各社の商標または登録商標です。商標は、この製品のサウンドキャラクターを識別するためにのみ使用されています。
                        </p>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-gray-900 text-sm font-bold mb-2">V4.2ファームウェア：改善＆バグ修正</h4>
                        <div className="flex items-start gap-2 text-xs text-gray-700">
                          <span className="text-green-500">✓</span>
                          <span>その他の軽微なバグ修正</span>
                        </div>
                      </div>

                      <a
                        href="#"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-full transition-colors text-sm"
                      >
                        🌐 メーカー・ダウンロードページはこちら
                      </a>
                    </div>
                  )}
                </div>

                {/* Firmware 4.1 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                  <button
                    onClick={() => toggleSoftware("fw41")}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-gray-900 block">最新ファームウェア：Ampero Firmware Version 4.1</span>
                    </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.fw41 ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedSoftware.fw41 && (
                    <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                      <p className="text-gray-700 text-sm mb-3">
                        この V4.1 ファームウェア・アップデートでは、新しいエフェクト、より強力な機能、最適化されたシステムパフォーマンス、バグ修正が提供されます。可能な限り最高のユーザー・エクスペリエンスを実現するために、すべてAmperoユーザーにこのアップデートの実行をお勧めします。
                      </p>
                      <p className="text-gray-600 text-sm mb-4">リリース日：2023年8月9日</p>
                      
                      <div className="mb-4">
                        <Image
                          src="/images/brands/hotone/Ampero/software_03.jpg"
                          alt="Ampero Firmware 4.1"
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
                          注：V4.1 ファームウェアは、Ampero Editor V1.4.0 のみで使用してください。
                        </p>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-gray-900 text-sm font-bold mb-2">V4.1ファームウェア：新たに追加された機能</h4>
                        <div className="space-y-2 text-xs text-gray-700">
                          <div className="flex items-start gap-2">
                            <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">1</span>
                            <span>リアンプ機能の追加（Global &gt; USB Audio）</span>
                        </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">2</span>
                            <span>Blues Butter – CDCM HDドライブモデル（FX1/FX2モジュール内）モデリングベースMarshall® Bluesbreaker</span>
                      </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">3</span>
                            <span>Magic T – CDCM HDドライブモデル（FX1/FX2モジュール内）モデリングベースCochrane® Timmy*</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">4</span>
                            <span>Prince of Drive – CDCM HDドライブモデル（FX1/FX2モジュール内）モデリングベースAnalog Man® Prince of Tone*</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">5</span>
                            <span>Behemoth M – CDCM HDドライブモデル（FX1/FX2モジュール内）モデリングベースDarkglass® Microtubes B7K*</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">6</span>
                            <span>Basshammer 1/2 – CDCM HDドライブモデル（FX1/FX2モジュール内）モデリングベースAguilar® Tone Hammer*</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">7</span>
                            <span>Brown King Clean - CDCM HDアンプモデル（AMPモジュール内）モデリングベースFender® Vibro-King combo* (FAT off)</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">8</span>
                            <span>Brown King Drive - CDCM HDアンプモデル（AMPモジュール内）モデリングベースFender® Vibro-King combo* (FAT on)</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">9</span>
                            <span>Silver Master - CDCM HDアンプモデル（AMPモジュール内）モデリングベースFender® Silverface Bandmaster*</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">10</span>
                            <span>Tang A30 Clean - CDCM HDアンプモデル（AMPモジュール内）モデリングベースOrange® AD30* (channel 1)</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">11</span>
                            <span>Tang A30 Drive - CDCM HDアンプモデル（AMPモジュール内）モデリングベースOrange® AD30* (channel 2)</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">12</span>
                            <span>Dumbell Drive - CDCM HDアンプモデル（AMPモジュール内）モデリングベースDumble® Overdrive Special*</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">13</span>
                            <span>Ambience - Hotone オリジナル multitap delay（DLYモジュール内）</span>
                          </div>
                        </div>
                        <p className="text-gray-500 text-xs mt-2">
                        ＊記載のメーカー名、商品名は各社の商標または登録商標です。商標は、この製品のサウンドキャラクターを識別するためにのみ使用されています。
                      </p>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-gray-900 text-sm font-bold mb-2">V4.1ファームウェア：改善＆バグ修正</h4>
                        <div className="space-y-1 text-xs text-gray-700">
                          <div className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>アンプとドライブエフェクトのダイナミックパフォーマンスを最適化しました。</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>その他のマイナーなバグ修正</span>
                          </div>
                        </div>
                      </div>

                      <a
                        href="#"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-full transition-colors text-sm"
                      >
                        🌐 メーカー・ダウンロードページはこちら
                      </a>
                    </div>
                  )}
                </div>

                {/* Firmware 4.0 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                  <button
                    onClick={() => toggleSoftware("fw40")}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-gray-900 block">最新ファームウェア：Ampero Firmware Version 4.0</span>
                    </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.fw40 ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedSoftware.fw40 && (
                    <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                      <p className="text-gray-700 text-sm mb-3">
                        この V4.0 ファームウェア・アップデートは、新しいエフェクト、より強力な機能（新しいメイン ディスプレイなど）、最適化されたシステム パフォーマンス、およびバグ修正をお届けします。可能な限りのベストユーザーエクスペリエンスのために、すべてのAmpero ユーザーにこのアップデートの実行をお勧めします。
                      </p>
                      <p className="text-gray-600 text-sm mb-4">リリース日：2022年10月21日</p>
                      
                      <div className="mb-4">
                        <Image
                          src="/images/brands/hotone/Ampero/software_05.jpg"
                          alt="Ampero Firmware 4.0"
                          width={400}
                          height={200}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                        <p className="text-gray-800 text-sm font-bold mb-2">＜重要！＞</p>
                        <p className="text-gray-700 text-xs mb-2">
                          このV4.0 ファームウェアのアップデートの後、内蔵＆外部エクスプレッションペダルの再キャリブレーションを行なってください。
                        </p>
                        <p className="text-gray-600 text-xs mb-2">
                          （CTRL/EXP→EXP 1/2 Settings→Calibrate)。
                        </p>
                        <p className="text-gray-600 text-xs">
                          注：V4.0 ファームウェアは、Ampero Editor V1.3.2 のみで使用してください。
                        </p>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-gray-900 text-sm font-bold mb-2">V4.0ファームウェア：新たに追加された機能</h4>
                        <div className="space-y-2 text-xs text-gray-700">
                          <div className="flex items-start gap-2">
                            <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">1</span>
                            <span>メインディスプレイに追加されたI/Oレベリングメーター</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">2</span>
                            <span>メインディスプレイに追加されたパッチのクイック選択スライダー</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">3</span>
                            <span>メインディスプレイに追加された EXP 1 オン/オフボタン</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">4</span>
                            <span>ゲーテッド ブースト – FX1/FX2 モジュールで使用可能なHotone オリジナルブーストモデル</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">5</span>
                            <span>Micro Boost – FX1/FX2モジュールで使用可能なCDCM HDモデリングによるMXR® M133 Micro Amp*</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">6</span>
                            <span>Pitch Shift – FX1/FX2モジュールで使用可能なCDCM HDモデリングによるHotoneオリジナルピッチシフター</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">7</span>
                            <span>Black Deluxe – CDCM HDモデリングによるFender® Blackface Deluxe Reverb* (Normal CH) ＜アンプモジュール内＞</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">8</span>
                            <span>Black Deluxe+ – CDCM HDモデリングによるFender® Blackface Deluxe Reverb* (Vibrato CH) ＜アンプモジュール内＞</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">9</span>
                            <span>Marshell SLP – CDCM HDモデリングによるMarshall® Super Lead 1959* (Normal CH) ＜アンプモジュール内＞</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">10</span>
                            <span>Marshell SLP+ – CDCM HDモデリングによるMarshall® Super Lead 1959* (Bright CH) ＜アンプモジュール内＞</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">11</span>
                            <span>Marshell SLP Jump – CDCM HDモデリングによるMarshall® Super Lead 1959* ＜アンプモジュール内＞</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-gray-900 text-sm font-bold mb-2">V4.0ファームウェア：改善＆バグ修正</h4>
                        <div className="space-y-1 text-xs text-gray-700">
                          <div className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>CABモジュールのストックキャブIRを最適化</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>Ampero が一部の特定のMIDI コントローラーで制御できない問題 – 修正済み</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>その他のマイナーなバグ修正</span>
                          </div>
                        </div>
                      </div>

                      <a
                        href="#"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-full transition-colors text-sm"
                      >
                        🌐 メーカー・ダウンロードページはこちら
                      </a>
                    </div>
                  )}
                </div>

                {/* Preset Pack */}
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                  <button
                    onClick={() => toggleSoftware("preset")}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-gray-900 block">Merry Christmas and Happy New Year プリセットパック</span>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.preset ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedSoftware.preset && (
                    <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                      <p className="text-gray-700 text-sm mb-2">
                        Amperoは、もうEギター専用ではない！
                      </p>
                      <p className="text-gray-700 text-sm mb-2">
                        HOTONEからのお年玉。ベース、アコースティックギター＆エレクトリックAmperoプリセットパックをプレゼント！
                      </p>
                      <p className="text-gray-700 text-sm mb-4">
                        33 x guitar、33 x bass、33 x acoustic、4 x specials by the Choptones teamのスペシャルプリセットをダウンロードして頂けます。
                      </p>
                      
                      <div className="mb-4">
                        <Image
                          src="/images/brands/hotone/Ampero/software_07.jpg"
                          alt="Ampero Presets Pack"
                          width={400}
                          height={200}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>

                      <p className="text-gray-700 text-sm mb-4">
                        下記のリンクから「Ampero Christmas Patches.zip」ファイルをダウンロードしてください。
                      </p>

                      <a
                        href="#"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-full transition-colors text-sm"
                      >
                        <Download className="w-4 h-4" />
                        Ampero presets pack
                      </a>
                    </div>
                  )}
                </div>

                {/* Firmware 3.7 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                  <button
                    onClick={() => toggleSoftware("fw37")}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-gray-900 block">最新ファームウェア：Ampero Firmware Version 3.7</span>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.fw37 ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedSoftware.fw37 && (
                    <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                      <p className="text-gray-700 text-sm mb-4">
                        ソフトウェアのアップデートには非常に多くの改良が含まれています。Amperoユーザーの方々は是非お試しください。
                      </p>
                      
                      <div className="mb-4">
                          <Image
                          src="/images/brands/hotone/Ampero/software_09.jpg"
                          alt="Ampero Firmware 3.7"
                            width={400}
                            height={200}
                            className="w-full h-auto rounded-lg"
                          />
                        </div>
                        
                      <p className="text-sm font-bold text-gray-800 mb-4">
                        🔧 Ampero Firmware Version 3.7
                      </p>

                      <div className="mb-4">
                        <h4 className="text-gray-900 text-sm font-bold mb-2">新機能</h4>
                        <div className="space-y-2 text-xs text-gray-700">
                        <div className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>Global EQ 機能が追加されました。（Global &gt; Global EQ）</span>
                        </div>
                          <div className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>スクリーンのオートスリープが設定できます。（Global &gt; Display）</span>
                          </div>
                        </div>
                        </div>
                        
                      <div className="mb-4">
                        <h4 className="text-gray-900 text-sm font-bold mb-2">改良点</h4>
                        <div className="space-y-2 text-xs text-gray-700">
                        <div className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>チューナーインターフェースの改善＆アルゴリズムを改良しました。</span>
                        </div>
                          <div className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>信号のダイナミックプロセスの改善により、音質が改善されました。</span>
                      </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-gray-900 text-sm font-bold mb-2">重要：ご注意ください</h4>
                        <p className="text-xs text-gray-700">
                          firmware V3.1以降は、新Ampero Editor V1.2.2（エディター）のみを使用します。V3.1は前ファームウェアと大きく異なるため、以前に保存したユーザーパッチや設定が抹消され、新たなFACTORY/USER PATCHES（ファクトリー/ユーザーパッチ）に書き換えられます。IRファイルも抹消されます。 よって、このアップデートを行う前に、以前に保存したプリセットパッチ等を必ず保存してください。V3.1へのアップデートの後、V1.2.2の新エディターで保存したパッチファイルは読み込めます。（この新エディターは古いパッチファイルを自動的に読み込みますから、新しいV3.1ファームウェアでも以前と同じように使用できます。）
                        </p>
                      </div>

                      <a
                        href="#"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-full transition-colors text-sm"
                      >
                        🌐 メーカー・ダウンロードページはこちら
                      </a>
                    </div>
                  )}
                </div>
                        
                {/* Editor 1.2.9 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                  <button
                    onClick={() => toggleSoftware("ed129")}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-gray-900 block">エディター・ソフトウェア：Ampero Editor V1.2.9</span>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.ed129 ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedSoftware.ed129 && (
                    <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                      <p className="text-gray-700 text-sm mb-4">
                        ソフトウェアのアップデートには非常に多くの改良が含まれています。Amperoユーザーの方々は是非お試しください。
                      </p>
                      
                      <div className="mb-4">
                          <Image
                          src="/images/brands/hotone/Ampero/software_11.jpg"
                          alt="Ampero Editor V1.2.9"
                            width={400}
                          height={200}
                            className="w-full h-auto rounded-lg"
                          />
                        </div>
                        
                      <p className="text-sm font-bold text-gray-800 mb-4">
                        🔧 Ampero Editor V1.2.9
                      </p>

                      <div className="mb-4">
                        <h4 className="text-gray-900 text-sm font-bold mb-2">改善点とバグ修正（ver.1.2.8）</h4>
                        <div className="space-y-2 text-xs text-gray-700">
                        <div className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>Firmware V3.6 のサポート</span>
                        </div>
                          <div className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>エディターでのパッチスイッチングの際に、変更がポップアップされるようになりました。</span>
                      </div>
                          <div className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>Global EQがエディターからアクセスできます。</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>Previous/NextボタンをCABモジュールのマイクスイッチングに追加しました。</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>パッチのインポーティング/エクスポーティングやIRのインポーティングの際、前ファイルロケーションが記憶されます。</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>ユーザーIRインポートの際に保存するロケーションが指定できます。</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>マイナーバグを解決しました。</span>
                          </div>
                        </div>
                      </div>

                      <a
                        href="#"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-full transition-colors text-sm"
                      >
                        🌐 メーカー・ダウンロードページはこちら
                      </a>
                    </div>
                  )}
                        </div>
                        
                {/* ASIO 5.0.0 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                  <button
                    onClick={() => toggleSoftware("asio500")}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-gray-900 block">ASIO ドライバー：HOTONE USB ASIO Driver Version 5.0.0</span>
                      </div>
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
                          src="/images/brands/hotone/Ampero/software_13.jpg"
                          alt="HOTONE USB ASIO Driver Version 5.0.0"
                          width={400}
                          height={200}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>

                      <p className="text-sm font-bold text-gray-800 mb-4">
                        🔧 HOTONE USB ASIO Driver Version 5.0.0
                      </p>

                      <a
                        href="#"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-full transition-colors text-sm mb-6"
                      >
                        🌐 メーカー・ダウンロードページはこちら
                      </a>

                      <hr className="my-6 border-gray-200" />

                      <h4 className="text-gray-900 text-sm font-bold mb-4">Hotone USB ASIOドライバー ユーザーガイド</h4>
                      
                      <div className="mb-4">
                        <h5 className="text-gray-800 text-sm font-bold mb-3">インストールと設定の手順</h5>
                        <div className="space-y-4 text-xs text-gray-700">
                        <div className="flex items-start gap-2">
                            <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] flex-shrink-0">1</span>
                            <span>AMPEROの電源を入れ、コンピューターとUSBケーブルで接続します。次にHOTONE USB ASIOドライバーをインストールします。</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] flex-shrink-0">2</span>
                          <span>お使いのDAWを起動します。（例）Cubase 8 Element：［デバイス］→［デバイス設定］をクリックします。</span>
                        </div>
                          <div className="my-3">
                          <Image
                              src="/images/brands/hotone/Ampero/software_14.png"
                            alt="Cubase 8 Element"
                            width={400}
                            height={200}
                            className="w-full h-auto rounded-lg"
                          />
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] flex-shrink-0">3</span>
                          <span>［デバイス設定］ウィンドウから［VSTオーディオ］を選択します。</span>
                        </div>
                          <div className="my-3">
                          <Image
                              src="/images/brands/hotone/Ampero/software_15.png"
                              alt="Device Setup"
                            width={400}
                              height={200}
                            className="w-full h-auto rounded-lg"
                          />
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] flex-shrink-0">4</span>
                          <span>『ASIO Driver』のドロップダウンリストから［HOTONE AUDIO USB ASIO Device］を選択し［OK］をクリックします。</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Editor 1.4.2 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                  <button
                    onClick={() => toggleSoftware("ed142")}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-gray-900 block">エディター・ソフトウェア：Ampero Editor V1.4.2</span>
                        <span className="text-xs text-red-500 font-bold">New!</span>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.ed142 ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedSoftware.ed142 && (
                    <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                      <p className="text-gray-700 text-sm mb-2">
                        Ampero Firmware 4.2に対応したAmpero Editorです。
                      </p>
                      <p className="text-gray-600 text-sm mb-4">リリース日：2024年10月29日</p>
                      
                      <div className="mb-4">
                        <Image
                          src="/images/brands/hotone/Ampero/software_02.png"
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
                          <span>Firmware V4.2 サポート機能の追加</span>
                        </div>
                      </div>

                      <a
                        href="#"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-full transition-colors text-sm"
                      >
                        🌐 メーカー・ダウンロードページはこちら
                      </a>
                    </div>
                  )}
                </div>

                {/* Editor 1.4.0 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                  <button
                    onClick={() => toggleSoftware("ed140")}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-gray-900 block">エディター・ソフトウェア：Ampero Editor V1.4.0</span>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.ed140 ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedSoftware.ed140 && (
                    <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                      <p className="text-gray-700 text-sm mb-2">
                        Ampero Firmware 4.1に対応したAmpero Editorです。
                      </p>
                      <p className="text-gray-600 text-sm mb-4">リリース日：2023年7月20日</p>
                      
                      <div className="mb-4">
                        <Image
                          src="/images/brands/hotone/Ampero/software_04.jpg"
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
                          <span>Firmware V4.1 サポート機能の追加</span>
                        </div>
                      </div>

                      <a
                        href="#"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-full transition-colors text-sm"
                      >
                        🌐 メーカー・ダウンロードページはこちら
                      </a>
                    </div>
                  )}
                </div>

                {/* Editor 1.3.2 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                  <button
                    onClick={() => toggleSoftware("ed132")}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-gray-900 block">エディター・ソフトウェア：Ampero Editor V1.3.2</span>
                    </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.ed132 ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedSoftware.ed132 && (
                    <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                      <p className="text-gray-700 text-sm mb-2">
                        Ampero Firmware 4.0に対応したAmpero Editorです。
                      </p>
                      <p className="text-gray-600 text-sm mb-4">リリース日：2022年9月23日</p>
                      
                      <div className="mb-4">
                        <Image
                          src="/images/brands/hotone/Ampero/software_06.jpg"
                          alt="Ampero Editor V1.3.2"
                          width={400}
                          height={200}
                          className="w-full h-auto rounded-lg"
                        />
                    </div>

                      <div className="mb-4">
                        <h4 className="text-gray-900 text-sm font-bold mb-2">新機能</h4>
                        <div className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-green-500">✓</span>
                          <span>Firmware V4.0 サポート機能の追加</span>
                        </div>
                      </div>

                      <a
                        href="#"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-full transition-colors text-sm"
                      >
                        🌐 メーカー・ダウンロードページはこちら
                      </a>
                    </div>
                  )}
                </div>

                {/* Ampero Pink Firmware */}
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                  <button
                    onClick={() => toggleSoftware("pink")}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-gray-900 block">Ampero Pink 専用：Ampero Firmware Version 3.3B</span>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.pink ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedSoftware.pink && (
                    <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                      <p className="text-gray-700 text-sm font-bold mb-2">
                        ※重要 – V3.3Bファームウェアは、Ampero Editor V1.2.9.と一緒にご使用ください。
                      </p>
                      <p className="text-gray-700 text-sm mb-4">
                        このアップデートは、新しいエフェクトとパッチの機構を変更しており、以前のPinkや通常のブラックAmpero用ファームウェアと全く異なります。
                      </p>
                      
                      <div className="mb-4">
                        <Image
                          src="/images/brands/hotone/Ampero/software_08.jpg"
                          alt="Ampero Pink Firmware 3.3B"
                          width={400}
                          height={200}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>

                      <p className="text-sm font-bold text-gray-800 mb-4">
                        🔧 Ampero Firmware Version 3.3B <span className="text-red-500">- New! -</span>
                      </p>

                      <div className="mb-4">
                        <h4 className="text-gray-900 text-sm font-bold mb-2">新たな特徴</h4>
                        <div className="space-y-2 text-xs text-gray-700">
                          <div className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>Global EQ 機能が追加されました。（Global &gt; Global EQ）</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>スクリーンのオートスリープが設定できます。（Global &gt; Display）</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>「Forest Boost」（Based on the Fortin® Grind* booster pedal）をFX1＆FX2モジュールに追加しました。</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>「Blues Butter」（Based on the Marshall® Bluesbreaker®* overdrive pedal）をFX1＆FX2モジュールに追加しました。</span>
                        </div>
                          <div className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>「Precise Attack」（Based on the Horizon Devices® Precision Drive* pedal）をFX1＆FX2モジュールに追加しました。</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>「Magic T」(Based on the Paul Cochrane Timmy®* overdrive (V2) pedal)をFX1＆FX2モジュールに追加しました。</span>
                        </div>
                        </div>
                        </div>
                        
                      <div className="mb-4">
                        <h4 className="text-gray-900 text-sm font-bold mb-2">改良点</h4>
                        <div className="flex items-start gap-2 text-xs text-gray-700">
                          <span className="text-green-500">✓</span>
                          <span>チューナーインターフェースの改善＆アルゴリズムを改良しました。</span>
                        </div>
                      </div>

                      <a
                        href="#"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-full transition-colors text-sm"
                      >
                        🌐 メーカー・ダウンロードページはこちら
                      </a>
                    </div>
                  )}
                </div>

                {/* Firmware 3.8 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                  <button
                    onClick={() => toggleSoftware("fw38")}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-gray-900 block">最新ファームウェア：Ampero Firmware Version 3.8</span>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.fw38 ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedSoftware.fw38 && (
                    <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                      <p className="text-gray-700 text-sm mb-4">
                        Ampero V3.8 ファームウェアには、新しいエフェクター、パワフルな追加仕様（CABモジュールに10ユーザーIRスロット追加＆low/highカットコントロール）、システムパフォーマンスの改善、バグ修正が含まれています。是非、ダウンロードしてお試しください。
                      </p>
                      
                      <div className="mb-4">
                          <Image
                          src="/images/brands/hotone/Ampero/software_10.jpg"
                          alt="Ampero Firmware 3.8"
                            width={400}
                            height={200}
                            className="w-full h-auto rounded-lg"
                          />
                      </div>
                        
                      <p className="text-sm font-bold text-gray-800 mb-4">
                        🔧 Ampero Firmware Version 3.8 <span className="text-red-500">- New! -</span>
                      </p>

                      <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <h4 className="text-gray-900 text-sm font-bold mb-2">＜アップデートする前にやっておく事！＞</h4>
                        <div className="text-xs text-gray-700 space-y-2">
                          <p><strong>ノート：</strong>V3.8 firmwareとAmpero Editor V1.3.0は一緒に使用するように更新されています。以前のファームウェアでセーブしたプリセットパッチは、新しい機能が含まれているアップデートとの互換性がありません。よって、以前のプリセットのままでは正常に動作しません。</p>
                          <p>まず、アップデートする前に、以前に使用していたAmpero Editorからパッチをエクスポートしてください。それらを新しいAmpero Editor V1.3.0へインポートします。新しいエディターは、古いパッチをAmpero Editor V1.3.0（＆V3.8 firmware）で動作するように自動的に書き換えてくれます。</p>
                          <p>もし、パッチに3rd-party IRファイルが含まれていると、パッチのインポートの際に確認のメッセージが表示されます。保存する場合は、必ず"Keep"を選択してください。</p>
                          <p>パッチをアップデートする前に、ファームウェアを更新してしまった場合は、前のファームウェアに戻せば、パッチのエクスポート/インポートが可能です。</p>
                          <p><strong>重要事項：</strong>本体のエクスプレッションペダルも、改めて設定し直してください。CTRL/EXP →EXP 1 Settingsで行います。</p>
                        </div>
                        </div>
                        
                      <div className="mb-4">
                        <h4 className="text-gray-900 text-sm font-bold mb-2">V3.8ファームウェア：新たに追加された仕様</h4>
                        <div className="space-y-2 text-xs text-gray-700">
                          <div className="flex items-start gap-2">
                            <span className="bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] flex-shrink-0">1</span>
                            <span>新しい言語の追加 （Global &gt; Display）</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] flex-shrink-0">2</span>
                            <span>CAB モジュールに10 個のユーザーIRスロットが追加されました。</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] flex-shrink-0">3</span>
                            <span>CAB モジュールにLow cut/high cut のパラメーターが追加されました。</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] flex-shrink-0">4</span>
                            <span>FX1、FX2モジュール内のSqueezer - Hotone original compressor にwet/dry signal ratioが追加されました。</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] flex-shrink-0">5</span>
                            <span>Precise Attack – CDCM HD overdrive/boost modelがFX1/FX2モジュールに追加されました。</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] flex-shrink-0">6</span>
                            <span>Forest Boost – CDCM HD boost modelがFX1/FX2モジュールに追加されました。</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] flex-shrink-0">7</span>
                            <span>Sweller – Hotone original slow attackがFX1/FX2/FX3モジュールに追加されました。</span>
                          </div>
                        </div>
                        </div>
                        
                      <div className="mb-4">
                        <h4 className="text-gray-900 text-sm font-bold mb-2">V3.8ファームウェア：改良＆バグフィックス</h4>
                        <div className="space-y-2 text-xs text-gray-700">
                        <div className="flex items-start gap-2">
                            <span className="bg-green-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] flex-shrink-0">1</span>
                            <span>本体のエクスプレッションペダルインジケーター（on/offステータス）が改善されました。</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-green-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] flex-shrink-0">2</span>
                            <span>Wah使用時、本体エクスプレッションペダルのユーザーフィールを改善しました。</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-green-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] flex-shrink-0">3</span>
                            <span>パッチナンバー＆フルパッチネームがEdit Menuに表示されます。</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-green-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] flex-shrink-0">4</span>
                            <span>Global EQ メニュー調整精度が改善されました。</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-green-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] flex-shrink-0">5</span>
                            <span>Global EQメニューでBand 2の周波数が表示と一致しないバグを修正しました。</span>
                          </div>
                        </div>
                        </div>
                        
                      <a
                        href="#"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-full transition-colors text-sm"
                      >
                        🌐 メーカー・ダウンロードページはこちら
                      </a>
                    </div>
                  )}
                        </div>
                        
                {/* Editor 1.3.0 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                  <button
                    onClick={() => toggleSoftware("ed130")}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-gray-900 block">エディター・ソフトウェア：Ampero Editor V1.3.0</span>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSoftware.ed130 ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedSoftware.ed130 && (
                    <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                      <p className="text-gray-700 text-sm mb-4">
                        ソフトウェアのアップデートには非常に多くの改良が含まれています。Amperoユーザーの方々は是非お試しください。
                      </p>
                      
                      <p className="text-sm font-bold text-gray-800 mb-4">
                        リリース日：2021年4月28日
                      </p>
                      
                      <div className="mb-4">
                          <Image
                          src="/images/brands/hotone/Ampero/software_12.jpg"
                          alt="Ampero Editor V1.3.0"
                            width={400}
                          height={200}
                            className="w-full h-auto rounded-lg"
                          />
                        </div>
                        
                      <p className="text-sm font-bold text-gray-800 mb-4">
                        🔧 Ampero Editor V1.3.0 <span className="text-red-500">- New! -</span>
                      </p>

                      <div className="mb-4">
                        <h4 className="text-gray-900 text-sm font-bold mb-2">改善点とバグ修正（ver.1.3.0）</h4>
                        <div className="space-y-2 text-xs text-gray-700">
                        <div className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>Firmware V3.8 のサポート</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>新パッチの保存を忘れてパッチを変更した場合でも、"Cancel"ボタンで保存を忘れたパッチへ即座に戻れます。</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>マウスのドラッグ機能が修正されました。パラメーターがリアルタイムで反応します。</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>他のマイナーバグの修正が完了しました。</span>
                          </div>
                        </div>
                      </div>

                      <a
                        href="#"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-full transition-colors text-sm"
                      >
                        🌐 メーカー・ダウンロードページはこちら
                      </a>
                    </div>
                  )}
                </div>

                {/* ASIO 5.41.2 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                  <button
                    onClick={() => toggleSoftware("asio5412")}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-gray-900 block">ASIO ドライバー：HOTONE USB ASIO Driver Version 5.41.2</span>
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
                          src="/images/brands/hotone/Ampero/software_16.jpg"
                          alt="HOTONE USB ASIO Driver Version 5.41.2"
                          width={400}
                          height={200}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>

                      <p className="text-sm font-bold text-gray-800 mb-4">
                        🔧 HOTONE USB ASIO Driver Version 5.41.2 <span className="text-red-500">- New! -</span>
                      </p>

                      <a
                        href="#"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-full transition-colors text-sm mb-6"
                      >
                        🌐 メーカー・ダウンロードページはこちら
                      </a>

                      <hr className="my-6 border-gray-200" />

                      <h4 className="text-gray-900 text-sm font-bold mb-4">Hotone USB ASIO Driver の使用方法</h4>
                      
                      <div className="mb-4">
                        <h5 className="text-gray-800 text-sm font-bold mb-3">インストールと設定の手順</h5>
                        <div className="space-y-4 text-xs text-gray-700">
                        <div className="flex items-start gap-2">
                            <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] flex-shrink-0">1</span>
                          <span>Hotone製品の電源を入れ、コンピューターに接続します。その後、Hotone USB ASIO Driverをインストールします。</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] flex-shrink-0">2</span>
                            <span>使用されるDAWを起動して、"Devices" – "Device Setup"をクリックします。（Cubase 8 Element versionを例に説明します。）</span>
                        </div>
                          <div className="my-3">
                          <Image
                              src="/images/brands/hotone/Ampero/software_17.png"
                            alt="Cubase 8 Element"
                            width={400}
                            height={200}
                            className="w-full h-auto rounded-lg"
                          />
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] flex-shrink-0">3</span>
                            <span>"Device Setup" ウィンドウの"VST Audio"を選択します。</span>
                        </div>
                          <div className="my-3">
                          <Image
                              src="/images/brands/hotone/Ampero/software_18.png"
                              alt="Device Setup - VST Audio"
                            width={400}
                              height={200}
                            className="w-full h-auto rounded-lg"
                          />
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] flex-shrink-0">4</span>
                            <span>ASIO Driverのドロップダウンメニューから"HOTONE AUDIO USB Audio Device"を見つけて、 "OK"をクリックします。</span>
                        </div>
                          <div className="my-3">
                          <Image
                              src="/images/brands/hotone/Ampero/software_19.png"
                              alt="HOTONE AUDIO USB Audio Device"
                            width={400}
                              height={200}
                            className="w-full h-auto rounded-lg"
                          />
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] flex-shrink-0">5</span>
                          <span>これで完了です。</span>
                          </div>
                        </div>
                      </div>

                      <a
                        href="#"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-full transition-colors text-sm"
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
                    <p>MIDI 入力（5 pin）</p>
                  </div>
                </div>

                {/* OUTPUT セクション */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">OUTPUT セクション</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>1/4&quot;アンバランス出力 x2</p>
                    <p>XLR バランス出力 x2（グランドリフト・スイッチ付き）</p>
                    <p>1/8&quot;ヘッドホン端子</p>
                  </div>
                </div>

                {/* 入力インピーダンス */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">入力インピーダンス</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>E.GT（エレキギター）：1MΩ</p>
                    <p>A.GT（エレアコ）：4.7MΩ</p>
                    <p>LINE（ライン）：10kΩ</p>
                    <p>AUX IN：10kΩ</p>
                  </div>
                </div>

                {/* 出力インピーダンス */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">出力インピーダンス</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>アンバランス出力：3.2kΩ</p>
                    <p>バランス出力：2kΩ</p>
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
                    <p>電源：18V DC センターマイナス</p>
                    <p>消費電力：500mA Max</p>
                    <p>サイズ：320mm（W）x 147mm（D）x 46mm（H）</p>
                    <p>重量：1408g</p>
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

