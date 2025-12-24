"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Download } from "lucide-react"
import { BlogSlider } from "@/components/blog-slider"
import { downloadManual } from "@/lib/manual-download"

type Section = "concept" | "demo" | "features" | "controls" | "connections" | "software" | "manual" | "specs"

const navigationItems = [
  { id: "concept" as Section, label: "コンセプト" },
  { id: "demo" as Section, label: "デモムービー" },
  { id: "features" as Section, label: "主な機能" },
  { id: "controls" as Section, label: "コントロール" },
  { id: "connections" as Section, label: "接続例" },
  { id: "software" as Section, label: "ソフトウェア・ダウンロード" },
  { id: "manual" as Section, label: "取扱説明書", isDownload: true },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function AmperoIIPage() {
  const [activeSection, setActiveSection] = useState<Section>("concept")
  const [headerHeight, setHeaderHeight] = useState(72)

  const scrollToSection = (sectionId: Section) => {
    const navItem = navigationItems.find((item) => item.id === sectionId)
    if (navItem?.isDownload) {
      window.open("https://www.hotone.com/support/2", "_blank")
      return
    }

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
      <section className="relative w-full h-[600px] overflow-hidden bg-gray-100">
        <Image src="/images/brands/hotone/ampero_ii/hero.jpg" alt="AMPERO II" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

        <div className="relative container mx-auto px-6 h-full flex items-center justify-end">
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-white/30 w-96">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 tracking-wider">HOTONE</h1>
            </div>

            <div className="space-y-4 text-gray-900">
              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">製品名：</p>
                <p className="text-2xl font-bold text-gray-900">AMPERO II</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">アンプモデラー</p>
                <p className="text-base text-gray-900">エフェクター</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-hotone">
                  ¥84,700
                </p>
                <p className="text-xs text-gray-500">前後（税込）</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">6959473905210</p>
              </div>
            </div>

            <div className="mt-6">
              <a
                href="https://hotmusic.jp/collections/hotone/products/hotone-ampero-ii"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  className="w-full text-white text-base py-6 flex items-center justify-center gap-2 btn-hotone"
                >
                  <ShoppingCart className="w-5 h-5" />
                  購入する
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Bar */}
      <nav
        className="sticky z-[90] bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-md"
        style={{ top: `${headerHeight}px` }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-8 overflow-x-auto py-4 scrollbar-hide">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 text-base font-medium transition-colors duration-200 whitespace-nowrap ${
                  activeSection === item.id
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
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

      {/* Content Sections */}
      <div className="bg-gray-50">
        {/* Introduction Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Ampero GEN 2</h2>
              <p className="text-2xl text-gray-700">次世代のトーン - 更なるインスピレーションを届ける進化</p>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 rounded-full bg-gradient-to-r from-purple-600 to-red-600" />
              </div>
            </div>

            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Left: Video and Related Info */}
                <div className="space-y-8">
                  {/* YouTube Video */}
                  <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/DZyYpvxNJ04"
                      title="Ampero II: The Second Generation"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>

                  {/* 関連情報 */}
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">関連情報</h3>
                    <div className="space-y-3">
                      <a
                        href="#"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <span className="text-lg">🎵</span>
                        <span className="text-sm">Ampero II シリーズに対応の新機能「Sound Clone」が正式リリース</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span className="text-sm">Ampero II 日本語ユーザーマニュアル</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span className="text-sm">Ampero II エフェクトリスト（日本語版）</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span className="text-sm">Ampero II Stage ドラムリズムリスト</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span className="text-sm">Ampero II Stage MIDI コントロール・インフォメーション・リスト</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        <span className="text-lg">🔗</span>
                        <span className="text-sm">AMPERO II Stage 製品情報</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        <span className="text-lg">🔗</span>
                        <span className="text-sm">AMPERO II Stomp 製品情報</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        <span className="text-lg">🔗</span>
                        <span className="text-sm">
                          USBオーディオ（I/O）のサンプリングレートの切替方法はこちらをご覧ください
                        </span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right: Description and Features */}
                <div className="space-y-8">
                  {/* 产品介绍 */}
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      Ampero II
                      は、Amperoシリーズの最新モデルであり、オリジナルのAmperoから継承されたスマート・コントロール・レトリプルコア・デジタル・ギター・プロセッサーのプラットフォームの絶大なパワーを見事に組み合わせたリアルモデリング・マルチエフェクト・プロセッサーです。
                    </p>
                    <p>
                      Ampero II
                      はコンパクトで軽量なデザインを維持しながら、ライブショーに必要なすべての接続性とコントロールを提供してくれます。Ampero
                      II
                      で、まったく新しいレベルのプロフェッショナルなパフォーマンスがあなたの手に。それはまた、クラシックと最先端のイノベーションの究極の融合であり、強力な機能、プレミアムなトーン、シームレスなユーザー・インターフェイスが満載されており、あらゆるミュージシャンやクリエーターに欠かせないパートナーになってくれます。
                    </p>
                  </div>

                  {/* 主な仕様、拡張性 */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">主な仕様、拡張性</h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="mt-1.5 w-2 h-2 rounded-full bg-purple-600 flex-shrink-0" />
                        <p className="text-gray-700">第二世代のアンプモデラーとエフェクトプロセッサー</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1.5 w-2 h-2 rounded-full bg-purple-600 flex-shrink-0" />
                        <p className="text-gray-700">
                          トライコア DSP プラットフォームと ESS® Sabre® AD/DA による音楽的なサウンド
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1.5 w-2 h-2 rounded-full bg-purple-600 flex-shrink-0" />
                        <p className="text-gray-700">新開発のサウンド・キャプチャー機能「Tone Catch」を搭載</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1.5 w-2 h-2 rounded-full bg-purple-600 flex-shrink-0" />
                        <p className="text-gray-700">24ビット信号処理、最大127dBの高ダイナミックレンジ</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1.5 w-2 h-2 rounded-full bg-purple-600 flex-shrink-0" />
                        <p className="text-gray-700">ステレオ I/O ジャックとステレオ FX ループ ジャックを装備</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1.5 w-2 h-2 rounded-full bg-purple-600 flex-shrink-0" />
                        <p className="text-gray-700">XLR入力にはファンタム電源とマイクプリアンプを搭載</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1.5 w-2 h-2 rounded-full bg-purple-600 flex-shrink-0" />
                        <p className="text-gray-700">5pin MIDI入出力とEXP/CTRLジャックを装備</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1.5 w-2 h-2 rounded-full bg-purple-600 flex-shrink-0" />
                        <p className="text-gray-700">世界中のミュージシャンと音を共有できる「Sound Clone」に新対応</p>
                      </div>
                    </div>
                  </div>

                  {/* 460以上のアンプ、エフェクト＆キャビネット */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">460以上のアンプ、エフェクト＆キャビネット</h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="mt-1.5 w-2 h-2 rounded-full bg-purple-600 flex-shrink-0" />
                        <p className="text-gray-700">90種類以上のアンプモデル</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1.5 w-2 h-2 rounded-full bg-purple-600 flex-shrink-0" />
                        <p className="text-gray-700">68種類のキャビネットモデル</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1.5 w-2 h-2 rounded-full bg-purple-600 flex-shrink-0" />
                        <p className="text-gray-700">100+ ペダルモデリング</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1.5 w-2 h-2 rounded-full bg-purple-600 flex-shrink-0" />
                        <p className="text-gray-700">60+ Hotoneオリジナルエフェクト</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1.5 w-2 h-2 rounded-full bg-purple-600 flex-shrink-0" />
                        <p className="text-gray-700">300 プリセット（75バンクx4パッチ）</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Concept Section */}
        <section id="concept" className="scroll-mt-24 py-20 bg-concept-dark">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">製品コンセプト</h2>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 rounded-full bg-gradient-to-r from-red-600 via-orange-500 to-red-600" />
              </div>
            </div>

            <div className="space-y-24">
              {/* 1. 質量への挑戦：Amperoの特徴的なデザインを継承 */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="aspect-video rounded-xl overflow-hidden shadow-2xl relative">
                  <Image
                    src="/images/brands/hotone/ampero_ii/concept_01.png"
                    alt="AMPERO II A01-I Design"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">軽量かつ強力：Ampero の特徴的なデザインを継承</h3>
                  <p className="text-gray-300 leading-relaxed">
                    オリジナルの Ampero と同様に、Ampero II はオンボードエクスプレッションペダルを備えながらも、わずか
                    1.7kg重量を実現。このコンパクトなパワーハウスは、ギターのギグバッグ、ペダルボード
                    ケース、バックパック、さらには引き出しにも簡単に収まり、どこにいても音楽制作を可能にしてくれます。
                  </p>
                </div>
              </div>

              {/* 2. 最強のステージ対応コネクション */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="aspect-video rounded-xl overflow-hidden shadow-2xl relative">
                  <Image
                    src="/images/brands/hotone/ampero_ii/concept_02.png"
                    alt="AMPERO II Connections"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">抜群のステージ対応コネクション</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Ampero II の広範な I/O
                    オプションは、ステージ対応できるように設計されています。ステレオバランス出力とアンバランス出力は、個別のボリュームコントロールを備えた独立した信号処理が提供されており、メイン信号をPA
                    システムにルーティングし、別の信号をアンプにルーティングするのに最適です。
                    また、ボリュームとエクスプレッションが切り替え可能な本体マウントのエクスプレッションペダルに加え、さらに多くのコントロールオプションを引き出す外部EXP/CTRL入力も搭載しています。
                  </p>
                </div>
              </div>

              {/* 3. Tone Catch（トーンキャッチ） */}
              <div className="space-y-16">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    <span className="text-red-500">NEW!</span> Tone Catch（トーンキャッチ）
                  </h3>
                </div>

                {/* 3a. 第アルク视频 - 左视频右文 */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/dEbgnrFKn5I"
                      title="Tone Catch Tutorial"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-300 leading-relaxed">
                      Ampero II はTone
                      Catchをサポートしており、お気に入りのアンプやペダルのサウンドをプロセッサーに直接キャプチャーできます。また、Hotone
                      コミュニティ「Sound
                      Clone」を通じて世界中のユーザーからトーンを共有したり発見したりすることも可能です。
                      <br />
                      Tone Catchは、ユーザーエンドのブラックボックスリバースモデリングのための、Hotone 初の
                      CDCMHD+F.I.R.E
                      アプリケーションです。アンプやペダルの音色特性を素早く捉え、正確に再現します。この機能はグローバル設定で利用でき、作成したトーンは
                      CATCH エフェクトモジュールに保存して、エフェクトチェーン内で使用できます。
                    </p>
                  </div>
                </div>

                {/* 3b. 第二视频 - 左视频右文 */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/_b2JgbNb16k"
                      title="Tone Catch Comparison Demo"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-300 leading-relaxed">
                      Tone
                      Catchは、アンプ、キャビネット、ダートペダル、ブースター、またはそれらの組み合わせをキャッチできます。ただし、モジュレーションやディレイ、リバーブなどクリーン信号が混合されたペダル（TS
                      スタイルのドライブペダルなど）はキャッチすることができません。また、個別のコンプ/EQ
                      ペダルを使用することはお勧めできません。
                    </p>
                  </div>
                </div>

                {/* 3c. Tone Catch UI截图 - 保持原始尺寸，居中显示 */}
                <div className="max-w-5xl mx-auto">
                  <Image
                    src="/images/brands/hotone/ampero_ii/concept_03.png"
                    alt="Tone Catch Interface"
                    width={1200}
                    height={600}
                    className="w-full rounded-xl shadow-2xl"
                  />
                </div>
              </div>

              {/* 4. Sound Clone（サウンドクローン）正式リリース */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="aspect-video rounded-xl overflow-hidden shadow-2xl relative">
                  <Image
                    src="/images/brands/hotone/ampero_ii/concept_04.jpg"
                    alt="Sound Clone Official Release"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">
                    <span className="text-orange-500">Firmware 1.2.0対応</span> Sound
                    Clone（サウンドクローン）正式リリース
                  </h3>
                  <div className="space-y-3 text-gray-300 leading-relaxed">
                    <p>
                      Firmware 1.2より、Tone Catchが「Sound
                      Clone」へと進化し、保存可能なクローン数も30へと増加しました。
                    </p>
                    <p>
                      Tone Catch テクノロジーの進化形である Sound Clone を使用すると、コンピューターと基本的なオーディオ
                      インターフェイスだけで、実際のアンプやペダルのサウンドを正確に再現できます。さらに、Hotone
                      デバイスでNAM（Neural
                      AmpModeler）ファイルのインポートと使用もサポートされるようになりました。Sound Clone
                      は公式サイトからダウンロードでき、Hotone
                      コミュニティを通じて世界中のミュージシャンと音色（トーン）を共有できます。
                    </p>
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                      <p className="text-orange-400 font-semibold text-sm">
                        🔗 Sound Clone　詳しくはこちらをご覧ください
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. 4つのシーンスロットによるシームレス切替とリアルタイム切り替え */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="aspect-video rounded-xl overflow-hidden shadow-2xl relative">
                  <Image
                    src="/images/brands/hotone/ampero_ii/concept_05.gif"
                    alt="AMPERO II 4 Scene Slots"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">
                    ４つのシーンオプションによるシームレスなトーン切り替え
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Ampero II
                    独自のシーン機能で、スムーズなゼロレイテンシーのトーン切り替えを体験してください。各プリセットには最大4つの異なるシーンを含めることができ、複雑なパフォーマンス中に複数のエフェクトやパラメーターをシームレスに切り替えることができます。
                  </p>
                </div>
              </div>

              {/* 6. トリプルコア・プラットフォームが誇る、最高上質な再現能力 */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="aspect-video rounded-xl overflow-hidden shadow-2xl bg-black flex items-center justify-center p-8 relative">
                  <Image
                    src="/images/brands/hotone/ampero_ii/concept_06.png"
                    alt="Analog Devices Triple Core"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">
                    トリプルコア・プラットフォームが導く、他を上回る信号処理能力
                  </h3>
                  <div className="text-gray-300 leading-relaxed space-y-3">
                    <p>
                      Ampero II は、独自のトリプルコア・プラットフォームと ESS® Sabre® シリーズAD/DA
                      コンバーターを搭載しており、24ビット処理と最大127dBの高ダイナミック・レンジを実現しました。
                    </p>

                    <p>
                      Hotone独自の CDCM HD と F.I.R.E.
                      デジタルモデリング・テクノロジーの限界をさらに飛躍させ、これまで以上にダイナミックで没入感のある、音楽的でリアルなトーンを実現しました。
                    </p>
                  </div>
                </div>
              </div>

              {/* 7. 460以上のエフェクトライブラリー */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="aspect-video rounded-xl overflow-hidden shadow-2xl bg-black flex items-center justify-center p-8 relative">
                  <Image
                    src="/images/brands/hotone/ampero_ii/concept_07.png"
                    alt="460+ Effects Library"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">460以上のエフェクトライブラリー</h3>
                  <div className="grid gap-2">
                    <div className="flex items-start gap-3">
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                      <p className="text-gray-300">リアルスタジオデータで最適化された新しいマイクシミュレーション</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                      <p className="text-gray-300">新しいプリアンプモデル</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                      <p className="text-gray-300">オプションの独立したパワーアンプ・シミュレーション</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                      <p className="text-gray-300">90以上のアンプモデル</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                      <p className="text-gray-300">68キャブモデル</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                      <p className="text-gray-300">100以上の伝統的なエフェクト</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                      <p className="text-gray-300">60以上の HOTONE オリジナルエフェクト</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 8. Celestion®官方によるき上の高いパフォーマンス */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="aspect-video rounded-xl overflow-hidden shadow-2xl bg-black flex items-center justify-center p-8 relative">
                  <Image
                    src="/images/brands/hotone/ampero_ii/concept_08.png"
                    alt="Celestion IR Performance"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">Celestion®認定IRによる極上のIRパフォーマンス</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Ampero II は最大 2048 サンプル ポイントの IR をサポートし、オリジナルAmpero の解像度を2
                    倍にしました。 Celestion® ライセンスを取得した20個のスピーカー キャビネット IR と50個のユーザー IR
                    スロットを備え、最高のトーンを引き出してくれます。
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
            <div className="max-w-7xl mx-auto">
              <div className="max-w-5xl mx-auto">
                <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/DZyYpvxNJ04"
                    title="AMPERO II Demo Movie"
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

        {/* Main Features Section */}
        <section id="features" className="py-20 scroll-mt-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">主な機能</h2>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 rounded-full bg-teal-500" />
              </div>
            </div>

            <div className="max-w-7xl mx-auto space-y-16">
              {/* Feature Cards Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Feature 01 */}
                <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg">
                  <div className="relative">
                    <div className="absolute top-4 left-4 bg-gray-400 text-white px-4 py-1 rounded-full text-sm font-bold z-10">
                      01
                    </div>
                    <div className="aspect-video bg-gray-200 relative">
                      <Image
                        src="/images/brands/hotone/ampero_ii/fuction_01.gif"
                        alt="Dual Signal Chain"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-gray-900">
                      デデュアルシグナルチェーンがもたらす完全な創造的自由
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Ampero II
                      のデュアルシグナルチェーン設計は、シリアルとパラレルエフェクトの両方を活用し、複雑なトーンパスが作成できます。最大12個の異なるエフェクト
                      モジュールを同時に使用できるため、最大限の柔軟なトーンパスが得られます。
                    </p>
                  </div>
                </div>

                {/* Feature 02 */}
                <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg">
                  <div className="relative">
                    <div className="absolute top-4 left-4 bg-gray-400 text-white px-4 py-1 rounded-full text-sm font-bold z-10">
                      02
                    </div>
                    <div className="aspect-video bg-gray-200 relative">
                      <Image
                        src="/images/brands/hotone/ampero_ii/fuction_02.png"
                        alt="Vocal Performance Mic Input"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-gray-900">ボーカルパフォーマンス用のマイク入力</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Ampero II のステレオ入力には、48Vファンタム電源と最大52dB
                      のゲインを備えたマイク用（右チャンネル）コンボ入力があります。ギター、ベース、シンセを演奏する場合でも、ダイナミック/コンデンサーマイクを使用する場合でも、Ampero
                      II
                      はプロレベルのボーカルパフォーマンスをフルサポートするオンボード・ボーカルエフェクトも備えています。
                    </p>
                  </div>
                </div>

                {/* Feature 03 */}
                <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg">
                  <div className="relative">
                    <div className="absolute top-4 left-4 bg-gray-400 text-white px-4 py-1 rounded-full text-sm font-bold z-10">
                      03
                    </div>
                    <div className="aspect-video bg-gray-200 relative">
                      <Image
                        src="/images/brands/hotone/ampero_ii/fuction_03.gif"
                        alt="Enhanced Practice Features"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-gray-900">強化されたプラクティス機能</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      最高のパフォーマンスを発揮するには、継続的な練習が必要です。Ampero II
                      こそ完璧な練習パートナーです。 - 60 秒のステレオ録音を備えた内蔵ステレオ ルーパー -
                      アンドゥ/リドゥ、ハーフスピード、リバース機能 -
                      内蔵ドラム100種類のリズムスタイルとメトロノーム機能を搭載し、あらゆるジャンルのスキルを磨くのに最適なマシンに仕上がりました。
                    </p>
                  </div>
                </div>

                {/* Feature 04 */}
                <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg">
                  <div className="relative">
                    <div className="absolute top-4 left-4 bg-gray-400 text-white px-4 py-1 rounded-full text-sm font-bold z-10">
                      04
                    </div>
                    <div className="aspect-video bg-gray-200 relative">
                      <Image
                        src="/images/brands/hotone/ampero_ii/fuction_04.png"
                        alt="Pro-grade Audio Interface"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-gray-900">プログレードのオーディオインターフェイス</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Ampero II は、44.1～192kHz の可変サンプリング レートを備えたプロフェッショナルな 8 イン/8 アウト
                      USB オーディオ
                      インターフェイスとして機能します。ドライ/ウェットトラックを録音する場合でも、リアンプを使用する場合でも、必要なサウンドを簡単に実現できます。
                    </p>
                  </div>
                </div>

                {/* Feature 05 */}
                <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg">
                  <div className="relative">
                    <div className="absolute top-4 left-4 bg-gray-400 text-white px-4 py-1 rounded-full text-sm font-bold z-10">
                      05
                    </div>
                    <div className="aspect-video bg-gray-200 relative">
                      <Image
                        src="/images/brands/hotone/ampero_ii/fuction_05.jpg"
                        alt="Smooth Touch Screen Control"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-gray-900">スムーズなタッチスクリーン制御</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Ampero II には、洗練の5インチ ダイナミック
                      カラータッチスクリーンが採用され、さらに直感的でインテリジェントなインターフェイスをお届けします。多言語タッチスクリーン
                      コントロールにより、スムーズでボーダーレスなユーザー・エクスペリエンスが保証されます。
                    </p>
                  </div>
                </div>

                {/* Feature 06 */}
                <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg">
                  <div className="relative">
                    <div className="absolute top-4 left-4 bg-gray-400 text-white px-4 py-1 rounded-full text-sm font-bold z-10">
                      06
                    </div>
                    <div className="aspect-video bg-gray-200 relative">
                      <Image
                        src="/images/brands/hotone/ampero_ii/fuction_06.png"
                        alt="1-Click Cloud Access & Share"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-gray-900">1 クリックでクラウドにアクセス＆シェア</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      新しいHotoneコミュニティにアクセスできる専用のWin/Macソフトウェアなら、自分のパッチを簡単に共有したり、ワンクリックで他の人のパッチをダウンロードできます。世界中にいる仲間のユーザーやコラボアーティストとつながりましょう。
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature Lists - Two Columns */}
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 mt-16">
                {/* Left Column */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 w-5 h-5 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      さらに進化を遂げた CDCM HD と
                      F.I.R.Eモデリングシステムにより、ハイエンドの音色表現力とリアルな演奏体験をお届けします。
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 w-5 h-5 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      より大きく鮮明な5インチのダイナミック
                      タッチスクリーンと、よりスムーズで直感的かつ便利なインタラクションを実現する新設計のシステム UI。
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 w-5 h-5 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      好きなエフェクトモジュールをエフェクトチェーンに追加できます。
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 w-5 h-5 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      さらなるルーティング/音色の可能性を実現するステレオ I/O ジャックとステレオ FX ループ
                      ジャックを装備しました。
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 w-5 h-5 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">最大12のエフェクトモジュールの同時使用が可能</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 w-5 h-5 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      サードパーティIRサポートを備えた専用IRローダーモジュール、最大50個のカスタムIR スロット
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 w-5 h-5 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      トーン解像度を向上させる最大2048のIRサンプリングポイントをサポート
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 w-5 h-5 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      44.1～192kHzのサンプルレート切り替えを備えた
                      8イン、8アウトUSBオーディオインターフェース。リアンプ機能もサポート
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 w-5 h-5 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">300プリセット（75バンク x 4パッチ）</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 w-5 h-5 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      独立した出力ボリューム制御または異なる信号出力のための独立した BAL/UNBAL/フォン出力処理
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 w-5 h-5 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      パッチ内に４つのシーンを提供するシーン機能 -
                      エフェクトのオン/オフやパラメーターをレイテンシーなしで切り替えます
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 w-5 h-5 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      MIDI I/Oジャックと拡張コントロール用のデュアルEXP/CTRLジャック
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 w-5 h-5 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">9-18V DC電源に対応</p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 w-5 h-5 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      Tone Catch テクノロジーはクラシックなアンプ/ペダルをキャプチャーし、Ampero II と統合し、Hotone
                      コミュニティ経由で共有できます。
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 w-5 h-5 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      複数のシリアル/パラレル信号ルーティングをサポートする、高度にカスタマイズ可能な DUALエフェクト
                      チェーン。
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 w-5 h-5 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      ルーティング/トーンの可能性を実現するステレオI/OとステレオFXループ
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 w-5 h-5 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      ダイナミック/コンデンサーマイクの両方に適応するための内蔵マイクプリアンプとファントム電源を備えたR入力。
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 w-5 h-5 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      アップグレードされたエフェクト ライブラリーは、Hotone
                      の次世代の高品位アルゴリズムを含む460以上のエフェクトを提供します
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 w-5 h-5 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      20のクラシックCelestion® スピーカーIRを含む（Celestion® Digitalを搭載）
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 w-5 h-5 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      ファームウェアのアップグレード、エフェクト/IRロード/編集/管理などのための無料の
                      Win/Macソフトウェア
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 w-5 h-5 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">アコースティック用エフェクト＆プリセット</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 w-5 h-5 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      エレキギター/アコースティックギター/マイク/ライン入力をサポートする5つの異なる入力モード
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 w-5 h-5 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      マルチカラーHalo LED を備えた４つの割り当て可能なフットスイッチ
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 w-5 h-5 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">カスタマイズ可能なメイン表示モードとテーマカラー</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 w-5 h-5 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">ツアー仕様の軽量アルミニウムケース</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Controls Section */}
        <section id="controls" className="py-20 scroll-mt-24 bg-gray-100">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">コントロール</h2>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 rounded-full hotone-bar" />
              </div>
            </div>
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <Image
                  src="/images/brands/hotone/ampero_ii/control_01.png"
                  alt="Ampero II Top Control Panel"
                  width={1200}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <Image
                  src="/images/brands/hotone/ampero_ii/control_02.png"
                  alt="Ampero II Back Panel and Connections"
                  width={1200}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Connections Section */}
        <section id="connections" className="py-20 scroll-mt-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">接続例</h2>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 rounded-full hotone-bar" />
              </div>
            </div>
            <div className="max-w-5xl mx-auto">
              <div className="space-y-16">
                {/* 1. 楽器やアンプと組み合わせる */}
                <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                    楽器やアンプと組み合わせる
                  </h3>

                  {/* 連接図 */}
                  <div className="mb-8 bg-gray-50 rounded-2xl p-6 flex items-center justify-center">
                    <Image
                      src="/images/brands/hotone/ampero_ii/connection_01.png"
                      alt="楽器やアンプとの接続図"
                      width={800}
                      height={400}
                      className="w-full max-w-4xl h-auto object-contain"
                    />
                  </div>

                  {/* 説明文 */}
                  <p className="text-gray-700 text-lg leading-relaxed text-center max-w-3xl mx-auto">
                    楽器をユニットの入力 L ジャック（ステレオ接続が必要な場合は
                    L+R）に接続し、出力ジャックからアンプまで１本（または 2
                    本）のケーブルを接続します。アンプが１台の場合は、L 出力からケーブルで接続します。
                  </p>
                </div>

                {/* 2. アンプの RETURN または パワーアンプ/FRFR キャビネット INPUT */}
                <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                    アンプの RETURN またはパワーアンプ（ラウドスター）/FRFR キャビネット INPUTに接続します
                  </h3>

                  <div className="mb-8 bg-gray-50 rounded-2xl p-6 flex items-center justify-center">
                    <Image
                      src="/images/brands/hotone/ampero_ii/connection_02.png"
                      alt="アンプRETURN/パワーアンプ接続図"
                      width={800}
                      height={400}
                      className="w-full max-w-4xl h-auto object-contain"
                    />
                  </div>

                  <div className="mb-8 bg-gray-50 rounded-2xl p-6 flex items-center justify-center">
                    <Image
                      src="/images/brands/hotone/ampero_ii/connection_03.gif"
                      alt="FRFR キャビネット接続図"
                      width={800}
                      height={400}
                      className="w-full max-w-4xl h-auto object-contain"
                      unoptimized
                    />
                  </div>

                  {/* 説明文 */}
                  <div className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto space-y-4">
                    <p>
                      出力をアンプの FX ループリターン入力またはパワーアンプ入力に接続します。アンプが１台の場合は、L
                      出力からケーブルで接続します。非 FRFR アンプの場合、最良のサウンドを得るには、本機の CAB
                      モジュールを「オフ」にしてください。
                    </p>
                    <p>
                      一部のアンプの FX ループリターン ジャックを使用すると、AMP
                      モジュールが耳障りな音やブーミーな音になる場合があります。この場合、AMPモジュールの代わりに PRE
                      AMP モジュールを使用します。
                    </p>
                  </div>
                </div>

                {/* 3. ステージ上のデュアル出力 */}
                <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                    ステージ上のデュアル出力
                  </h3>

                  <div className="mb-8 bg-gray-50 rounded-2xl p-6 flex items-center justify-center">
                    <Image
                      src="/images/brands/hotone/ampero_ii/connection_04.png"
                      alt="ステージデュアル出力接続図"
                      width={800}
                      height={400}
                      className="w-full max-w-4xl h-auto object-contain"
                    />
                  </div>

                  {/* 説明文 */}
                  <div className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
                    <p>
                      このシナリオでは、Y-A/B チェーン テンプレートを使用することをお勧めします。チェーン
                      A：キャビシミュを使用した通常の出力、XLR 出力経由でミキシングデスクに直接送信します。チェーン
                      B：キャビシミュなし、モニタリング用にアンバランス出力経由でステージ楽器アンプに信号を送ります。この場合、楽器用アンプをピックアップして、ミキシングデスクのチェーン
                      A 出力とミックスすることもできます。
                    </p>
                  </div>
                </div>

                {/* 4. 楽器を演奏しながら歌うセッティング */}
                <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                    楽器を演奏しながら歌うセッティング
                  </h3>

                  <div className="mb-8 bg-gray-50 rounded-2xl p-6 flex items-center justify-center">
                    <Image
                      src="/images/brands/hotone/ampero_ii/connection_05.png"
                      alt="楽器と歌唱の同時セッティング接続図"
                      width={800}
                      height={400}
                      className="w-full max-w-4xl h-auto object-contain"
                    />
                  </div>

                  {/* 説明文 */}
                  <div className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
                    <p>
                      このシナリオでは、独立したエフェクト チェーンを使用することをお勧めします。チェーン
                      A：楽器信号のみを処理し、アンバランス出力(または必要に応じてミキサー/PA)
                      経由で楽器アンプに信号を送ります。チェーン B：ボーカル信号を処理し、XLR
                      出力経由でミキサー/フルレンジスピーカーに送ります。この場合、楽器用アンプをピックアップして、ミキシングデスクのチェーン
                      A 出力とミックスすることもできます。
                    </p>
                  </div>
                </div>

                {/* 5. ミキサー、インターフェイス、ヘッドフォン、その他の機器への接続 */}
                <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                    ミキサー、インターフェイス、ヘッドフォン、その他の機器への接続
                  </h3>

                  <div className="mb-8 bg-gray-50 rounded-2xl p-6 flex items-center justify-center">
                    <Image
                      src="/images/brands/hotone/ampero_ii/connection_06.png"
                      alt="ミキサー、インターフェイス、ヘッドフォン接続図"
                      width={800}
                      height={400}
                      className="w-full max-w-4xl h-auto object-contain"
                    />
                  </div>

                  {/* 説明文 */}
                  <div className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
                    <p>
                      Ampero II の出力をミキサーまたはオーディオ・インターフェイスの対応する入力に接続します。S/N
                      比を最適化するには、バランス接続をお勧めします。モノラル信号を送りたい場合は L
                      出力を使用してください。機器への損傷を防ぐため、接続前にミキサーまたはインターフェイス・チャンネルのボリュームがミュートされていることを確認してください。耳への損傷を防ぐため、ヘッドフォンを接続する前には出力ボリュームを最小にしてください。
                    </p>
                  </div>
                </div>

                {/* 6. オーディオ・インターフェイスとしてコンピューターに接続する */}
                <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                    オーディオ・インターフェイスとしてコンピューターに接続する
                  </h3>

                  <div className="mb-8 bg-gray-50 rounded-2xl p-6 flex items-center justify-center">
                    <Image
                      src="/images/brands/hotone/ampero_ii/connection_07.png"
                      alt="オーディオ・インターフェイス接続図"
                      width={800}
                      height={400}
                      className="w-full max-w-4xl h-auto object-contain"
                    />
                  </div>

                  {/* 説明文 */}
                  <div className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
                    <p>
                      USB ケーブルを本機からコンピューターに接続します。 PC
                      システムの場合はドライバーをセットアップする必要がありますが、macOS
                      用はプラグアンドプレイです。ライン出力からアクティブモニターに接続するか、ヘッドフォンでモニタリングします。
                    </p>
                  </div>
                </div>

                {/* 7. AUX IN を使用する */}
                <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">AUX IN を使用する</h3>

                  <div className="mb-8 bg-gray-50 rounded-2xl p-6 flex items-center justify-center">
                    <Image 
                      src="/images/brands/hotone/ampero_ii/connection_08.png" 
                      alt="AUX IN接続図" 
                      width={800}
                      height={400}
                      className="w-full max-w-4xl h-auto object-contain" 
                    />
                  </div>

                  {/* 説明文 */}
                  <div className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
                    <p>
                      Aux ケーブルで音楽プレーヤーと Ampero
                      IIを接続します。その後、バッキングトラックや内蔵ドラム/ルーパーを使用して、練習や即興演奏が楽しめます。
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
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">ソフトウェア・ダウンロード</h2>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 rounded-full bg-blue-500" />
              </div>
            </div>

            <div className="max-w-6xl mx-auto mb-16">
              <div className="bg-white rounded-2xl p-4 shadow-lg">
                <div className="aspect-[16/7] rounded-xl overflow-hidden relative">
                  <Image
                    src="/images/brands/hotone/ampero_ii/software_01.png"
                    alt="Ampero II Software Interface"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {/* AMPERO II Firmware 1.2.0 */}
              <details className="group bg-gray-200 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-300 transition-colors">
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
                      <span className="text-base font-medium text-gray-900">AMPERO II Firmware 1.2.0</span>
                      <span className="px-2 py-0.5 bg-red-600 text-white text-xs font-bold rounded">New!</span>
                    </div>
                  </div>
                  <svg
                    className="w-6 h-6 text-gray-700 transition-transform group-open:rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 pt-4 bg-white space-y-6">
                  {/* Sound Clone Banner Image */}
                  <div className="w-full rounded-lg overflow-hidden">
                    <Image
                      src="/images/brands/hotone/ampero_ii/software_02.png"
                      alt="Sound Clone Official Release"
                      width={1200}
                      height={600}
                      className="w-full h-auto"
                    />
                  </div>

                  {/* New Features Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900">【 新機能 】</h3>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-700 text-white text-xs flex items-center justify-center font-medium">
                          1
                        </span>
                        <p className="text-gray-800 text-sm leading-relaxed">
                          Tone CatchをSound Cloneテクノロジーにアップグレード。
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-700 text-white text-xs flex items-center justify-center font-medium">
                          2
                        </span>
                        <p className="text-gray-800 text-sm leading-relaxed">
                          Sound Clone テクノロジーは NAM（Neural Amp Modeler）ファイルの変換と利用をサポートします。
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-700 text-white text-xs flex items-center justify-center font-medium">
                          3
                        </span>
                        <p className="text-gray-800 text-sm leading-relaxed">
                          DSP 使用率表示を追加（Stomp Mode/ストンプ モード→FX Chain View/FX チェーン ビュー）
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-700 text-white text-xs flex items-center justify-center font-medium">
                          4
                        </span>
                        <p className="text-gray-800 text-sm leading-relaxed">
                          パッチ名表示を強調できるようになりました（Stomp Mode/ストンプ モード→ Footswitch
                          View/フットスイッチ ビュー）
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Improvements Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900">【 改善、変更、バグ修正 】</h3>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-700 text-white text-xs flex items-center justify-center font-medium">
                          1
                        </span>
                        <p className="text-gray-800 text-sm leading-relaxed">
                          Sound Cloneのデータ構造の最適化により、トーンファイルの保存容量が30に増加しました。
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-700 text-white text-xs flex items-center justify-center font-medium">
                          2
                        </span>
                        <p className="text-gray-800 text-sm leading-relaxed">その他のマイナーな改善とバグ修正。</p>
                      </div>
                    </div>
                  </div>

                  {/* Download Notice */}
                  <div className="pt-2">
                    <p className="text-gray-800 text-sm leading-relaxed">
                      Ampero II ファームウェアは、Hotone Web
                      サイトからダウンロードして頂けます。問題を回避するために、アップデートする前にパッチをバックアップしてください。
                    </p>
                  </div>

                  {/* Download Button */}
                  <div className="pt-2">
                    <a
                      href="https://www.hotone.com/support/2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      ダウンロードはこちら
                    </a>
                  </div>
                </div>
              </details>

              {/* Firmware アップデート方法 */}
              <details className="group bg-gray-200 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-300 transition-colors">
                  <div className="flex items-center gap-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-base font-medium text-gray-900">Firmware アップデート方法</span>
                  </div>
                  <svg
                    className="w-6 h-6 text-gray-700 transition-transform group-open:rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 pt-4 bg-white space-y-6">
                  {/* Update instruction diagram */}
                  <div className="w-full bg-black rounded-lg overflow-hidden">
                    <Image 
                      src="/images/brands/hotone/ampero_ii/software_03.png" 
                      alt="Firmware Update Process" 
                      width={1200}
                      height={600}
                      className="w-full h-auto" 
                    />
                  </div>

                  {/* Update steps */}
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        1
                      </div>
                      <p className="text-gray-800 text-base leading-relaxed pt-1">
                        USB接続を維持したままユニットの電源をオフにします。
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        2
                      </div>
                      <p className="text-gray-800 text-base leading-relaxed pt-1">
                        「MENU/VALUE」、3、4のフットスイッチを同時に押したまま電源を入れます。
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        3
                      </div>
                      <p className="text-gray-800 text-base leading-relaxed pt-1">
                        Ampero II エディター ソフトウェアを起動し、「Firmware
                        Update」ボタンをクリックし、予めダウンロードしたファームウェアファイル（Ampero II Firmware
                        V.......bin *解凍しない状態）を選択し、「Update now」をクリックします。
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        4
                      </div>
                      <p className="text-gray-800 text-base leading-relaxed pt-1">
                        ファームウェアのアップデートが完了したら再起動をしてください。これで完了です。
                      </p>
                    </div>
                  </div>
                </div>
              </details>

              {/* AMPERO II Firmware 1.1.0 */}
              <details className="group bg-gray-200 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-300 transition-colors">
                  <div className="flex items-center gap-4">
                    <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-base font-medium text-gray-900">AMPERO II Firmware 1.1.0</span>
                  </div>
                  <svg
                    className="w-6 h-6 text-gray-700 transition-transform group-open:rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 pt-4 bg-white space-y-6">
                  <p className="text-gray-800 text-base">
                    Ampero II ファームウェアは、Hotone Web サイトからダウンロードして頂けます。
                  </p>

                  <a
                    href="https://www.hotone.com/support/2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg flex items-center gap-2 transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      ダウンロードはこちら
                    </button>
                  </a>
                </div>
              </details>

              {/* ASIO ドライバー */}
              <details className="group bg-gray-200 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-300 transition-colors">
                  <div className="flex items-center gap-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-base font-medium text-gray-900">
                      ASIO ドライバー：HOTONE GENERIC USB ASIO Driver Version 5.71.1
                    </span>
                  </div>
                  <svg
                    className="w-6 h-6 text-gray-700 transition-transform group-open:rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 pt-4 bg-white">
                  <p className="text-gray-700 text-base mb-6">
                    USB ASIO DRIVERは、Hotone Web サイトからを直接ダウンロードして頂けます。
                  </p>

                  <a
                    href="https://www.hotone.com/support/2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="inline-flex items-center gap-3 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-medium transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                      USB ASIO Driver V5.71.1.zip
                    </button>
                  </a>
                </div>
              </details>

              {/* AMPERO II Software v1.1.0 for macOS */}
              <details className="group bg-gray-200 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-300 transition-colors">
                  <div className="flex items-center gap-4">
                    <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <span className="text-base font-medium text-gray-900">AMPERO II Software v1.1.0 for macOS</span>
                  </div>
                  <svg
                    className="w-6 h-6 text-gray-700 transition-transform group-open:rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 pt-3 bg-white">
                  <p className="text-gray-700 text-sm mb-6">
                    Mac用のAMPERO II ソフトウェア（ファームウェア v.1.1.0 同梱）は、Hotone Web
                    サイトからダウンロードして頂けます。
                  </p>
                  <a
                    href="https://www.hotone.com/support/2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-8 py-3 rounded-lg transition-colors text-base">
                      AMPERO II Software v1.1.0 for macOS
                    </button>
                  </a>
                </div>
              </details>

              {/* AMPERO II Software v1.1.0 for Windows */}
              <details className="group bg-gray-200 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer hover:bg-gray-300 transition-colors">
                  <div className="flex items-center gap-4">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 5.45L10.94 4.3v7.45H3V5.45m10.94-1.15L21 3v9.75h-7.06V4.3M3 12.55h7.94v7.45L3 18.85v-6.3m10.94 6.3V12.55H21V21l-7.06-1.15z" />
                    </svg>
                    <span className="text-base font-medium text-gray-900">AMPERO II Software v1.1.0 for Windows</span>
                  </div>
                  <svg
                    className="w-6 h-6 text-gray-700 transition-transform group-open:rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 pt-4 bg-white">
                  <p className="text-gray-700 text-base mb-6 leading-relaxed">
                    Windows用のAMPERO II ソフトウェア（ファームウェア v.1.1.0 同梱）は、Hotone Web
                    サイトからダウンロードして頂けます。
                  </p>
                  <a
                    href="https://www.hotone.com/support/2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors">
                      AMPERO II Software v1.1.0 for Windows
                    </button>
                  </a>
                </div>
              </details>

            </div>
          </div>
        </section>

        {/* Specifications Section */}
        <section id="specs" className="py-20 scroll-mt-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">製品仕様</h2>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />
              </div>
            </div>

            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                {/* Left Column */}
                <div className="space-y-8">
                  {/* INPUT Section */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                      INPUT セクション
                    </h3>
                    <div className="space-y-3 text-sm text-gray-700">
                      <p>1 x 3 入力モード選択が可能な1/4"TSインストルメントジャック</p>
                      <p>
                        1 x 5 入力モード選択とマイクプリアンプ（最大ゲイン 52dB）を備えた XLR or
                        1/4"（TS）コンボジャック
                      </p>
                      <p>1 x 1/8" ステレオ AUX INジャック</p>
                      <p>2 x 1/4" TRS EXPペダル/モメンタリーフットスイッチ（EXP/CTRL）ジャック</p>
                      <p>1 x 1/4" チップリング スリーブ（TRS）アンバランス ステレオ AUX IN x 1</p>
                      <p>1 x 5pin MIDI INジャック</p>
                    </div>
                  </div>

                  {/* Input Impedance */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                      入力インピーダンス
                    </h3>
                    <div className="space-y-3 text-sm text-gray-700">
                      <p>1/4"TS入力：E.GT: 1MΩ; A.GT: 4.7MΩ; LINE: 10kΩ</p>
                      <p>XLR入力：5kΩ</p>
                      <p>FX ループリターン入力：100kΩ</p>
                      <p>Aux In：10kΩ</p>
                    </div>
                  </div>

                  {/* OUTPUT Section */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                      OUTPUT セクション
                    </h3>
                    <div className="space-y-3 text-sm text-gray-700">
                      <p>2 x 1/4" TRS アンバランス ステレオ出力ジャック</p>
                      <p>2 x グランドリフト付きXLRバランス出力ジャック</p>
                      <p>1 x 1/4" TRS アンバランス ステレオ FX ループセンドジャック</p>
                      <p>1 x 1/8" ヘッドフォン出力ジャック</p>
                      <p>1 x 1/8" TRS MIDI OUTジャック</p>
                      <p>1 x 5pin MIDI OUTジャック</p>
                    </div>
                  </div>

                  {/* Output Impedance */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                      出力インピーダンス
                    </h3>
                    <div className="space-y-3 text-sm text-gray-700">
                      <p>アンバランス出力：1kΩ</p>
                      <p>バランス出力：1kΩ</p>
                      <p>FX ループセンド：1kΩ</p>
                      <p>ヘッドフォン：47Ω</p>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  {/* Digital Section */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                      デジタル・セクション
                    </h3>
                    <div className="space-y-3 text-sm text-gray-700">
                      <p>5インチ 800 x 480カラーダイナミックタッチスクリーン</p>
                      <p>USB 2.0 Type-C port：USB Audio 2.0をサポート　44.1～192kHzサンプルレートをサポート</p>
                      <p>
                        IR プロセッシング：24-bit/44.1kHz ±/WAVファイル、両1024 & 2048ポイントをサポート、最大 50
                        のユーザー IR
                      </p>
                      <p>エフェクト・デジタル・オーディオ・シグナルプロセッシング：24-bit / 44.1kHz</p>
                      <p>周波数特性：20Hz – 20kHz ± 1dB</p>
                      <p>ダイナミックレンジ：最大127dB（digital to analog）</p>
                      <p>エフェクト：460+（global EQも含む）</p>
                      <p>エフェクト・モジュール：17</p>
                      <p>エフェクト・スロット：12同時使用可能エフェクト・スロット</p>
                      <p>パッチ数：300</p>
                      <p>ルーパータイム：ステレオ60秒</p>
                    </div>
                  </div>

                  {/* Other Specifications */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">その他</h3>
                    <div className="space-y-3 text-sm text-gray-700">
                      <p>電源：9VDC – 18VDC センターマイナス</p>
                      <p>消費電力：最大1.2A（9VDC給電時）</p>
                      <p>サイズ：330mm（W）x 157mm（D）x 61mm（H）</p>
                      <p>重量：1695g</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Blog Slider */}
      <BlogSlider />
    </div>
  )
}
