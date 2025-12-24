"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Download } from 'lucide-react'
import { BlogSlider } from "@/components/blog-slider"
import { downloadManual } from "@/lib/manual-download"

type Section = "concept" | "movie" | "operation" | "software" | "specs"

const navigationItems = [
  { id: "concept" as Section, label: "コンセプト" },
  { id: "movie" as Section, label: "デモムービー" },
  { id: "operation" as Section, label: "オペレーション" },
  { id: "software" as Section, label: "ソフトウェア" },
  { id: "manual" as Section, label: "取扱説明書", isDownload: true },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function XtompPage() {
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
    downloadManual("hotone", "xtomp")
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
      const sections = navigationItems.filter(item => !('isDownload' in item)).map((item) => item.id)
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
          src="/images/brands/hotone/xtomp/hero.jpg"
          alt="XTOMP"
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
                <p className="text-2xl font-bold text-gray-900">XTOMP</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">DSP エフェクター</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-hotone">¥27,280</p>
                <p className="text-xs text-gray-500">前後（税込）</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">6959473907016</p>
              </div>

              <div className="pt-2">
                <p className="text-base font-bold text-gray-900">生産完了品</p>
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
              'isDownload' in item && item.isDownload ? (
                <button
                  key={item.id}
                  onClick={handleManualDownload}
                  className="relative px-4 py-2 text-base font-medium transition-colors duration-200 whitespace-nowrap text-gray-500 hover:text-gray-700 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  {item.label}
                </button>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id as Section)}
                  className={`relative px-4 py-2 text-base font-medium transition-colors duration-200 whitespace-nowrap ${
                    activeSection === item.id ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.label}
                  </span>
                  {activeSection === item.id && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-200 hotone-nav-indicator"
                    />
                  )}
                </button>
              )
            ))}
          </div>
        </div>
      </nav>

      {/* Concept Section */}
      <section id="concept" className="py-20 scroll-mt-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              無限への扉
            </h2>
            <p className="text-xl text-gray-600">DSP Processing Pedal</p>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Video */}
            <div>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/DqxO8pXGoPc"
                  title="XTOMP Concept Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full aspect-video"
                />
              </div>
              <div className="mt-8 pt-6 border-t border-gray-300">
                <h4 className="text-sm font-bold text-gray-900 mb-3">関連情報</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>⊞ XTOMP 搭載エフェクト・ライブラリ</li>
                </ul>
              </div>
            </div>

            {/* Right Column - Description */}
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                スマートフォンほどの小さなボディーの中にHOTONEが誇るDSPベースのエミュレーション・テクノロジーを集約しました。アイコン化された有名エフェクターや入手困難なヴィンテージ、さらに高性能のモダン・エフェクターやチューブ・アンプがXTOMPで再現できます。
              </p>
              <p className="text-gray-700 leading-relaxed">
                エフェクト・アルゴリズムを自由に入れ替え、その役割を変える高性能DSPプロセッシング・ペダル、それがXTOMPの正体です。XTOMPは、250種類を超えるエフェクト・アルゴリズムを自在にローディングし、歪み、モッド系、アンビエント系、CABエミュレーション、チューブ・アンプ、複合コンビネーション・エフェクトに即座に役割を変えるのです。
              </p>
              <p className="text-gray-700 leading-relaxed">
                それらのアルゴリズムは、iOS / AndroidのXTOMPアプリからBluetooth® Smart経由で本体に転送されます。ローディングに要する時間はわずか数秒、ライブの曲間でも対応できます。
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>亜鉛合金製のスリムデザイン</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>リレー式トゥルー・バイパス仕様</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>アルゴリズムに追従するHalo LED搭載のコントロールノブ</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>タップテンポの入力が可能（一部のプログラムのみ）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>パワフルなテキサスインストルメンツ社製DSP採用</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>24-bit 128xオーバーサンプリングA/D/A変換</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>iOS、Android、PC対応の無料アプリで、エフェクター・アルゴリズムをロード</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>USBポート搭載</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>114dBワイド・ダイナミックレンジ＆周波数特性、ローノイズ高音質設計</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>プレイのダイナミクスにリアルに追従するCDCMエミュレーション</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>ステレオ入出力（Lchはトゥルー / バッファードのバイパスモードの切替可能）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>9V 200mA以上電源アダプター使用</span>
                </li>
              </ul>
              <div className="text-xs text-gray-500 space-y-1 pt-4 border-t border-gray-300">
                <p>※ Bluetooth® Smart は、Bluetooth SIG, Inc.の登録商標です。</p>
                <p>※ iOS は、Apple, Inc. の登録商標です。</p>
                <p>※ Android は、Google Inc. の登録商標です。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Concept Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">製品コンセプト</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="max-w-6xl mx-auto space-y-16">
            {/* Section 1: アルゴリズム編 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src="/images/brands/hotone/xtomp/concept_01.jpg"
                  alt="XTOMP Algorithms"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">クラッシック・ペダルやオールド・アンプを</h3>
                  <h3 className="text-2xl font-bold text-white mb-4">どうやって再現するか</h3>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">アルゴリズム編</p>
                  <h4 className="text-lg font-bold text-white mb-4">CDCM：コンプリヘンシブ・ダイナミック・サーキット・モデリング</h4>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm">
                  音楽史を飾った名演、それに使われていたヴィンテージ・エフェクターやアンプは、例えオークション・サイトで見つかったとしても、非常に高価で簡単には入手できませんでした。
                </p>
                <p className="text-gray-300 leading-relaxed text-sm">
                  2001年頃、HOTONE開発チームはクラッシック・ペダルやオールド・アンプをどうやって再現するか、度々ブレイン・ストーミングを繰り返していました。折しも、他社がトーン・モデリングを開発していた時期です。テクニカル・ディスカッションはエスカレートして、より複雑でリアルなモデリングを目指し、このテクノロジーのベースが描き出されていきました。
                </p>
                <p className="text-gray-300 leading-relaxed text-sm">
                  当時のモデリング方式の主流は、回路を解析してアルゴリズムを制作する方法でした。それらのアルゴリズムは、回路の『スタティック/静止状態』を再現し、オリジナルに近いサウンドを再現できます。しかし、この『スタティック/静止状態』は、入力信号や他の条件によって変化する回路動作までは再現していません。ですから、本物と識別できないレベルには到達できなかったのです。
                </p>
                <p className="text-gray-300 leading-relaxed text-sm">
                  そこで、開発チームは『モデリングのベースは、回路がダイナミックに変化した状態でモデリングを行うべきだ。』という結論に達しました。それ以降、マルチ・エフェクター等の開発を経て、よりパワフルなハードウェアをベースにモデリング手法の開発を継続しました。その結果、『スタティック・モデリング』を超え、さらにリアルなモデリング「CDCM」が完成しました。CDCMは、入力信号の変化や周波数、コントロール類のセッティングや接続楽器のインピーダンスによるサウンドの変化を、より適切に再現する、複雑で膨大な演算処理を行うモデリング・テクノロジーです。CDCMがリアルなサウンドをXTOMPで再生してくれる秘密はここにあるのです。
                </p>
              </div>
            </div>

            <hr className="border-gray-700" />

            {/* Section 2: ハードウェア編 */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-400 mb-1">ハードウェア編</p>
                <h4 className="text-lg font-bold text-white mb-4">パワフルなDSPを単一のエフェクトに投入する</h4>
              </div>
              <p className="text-gray-300 leading-relaxed text-sm">
                デジタル・シグナル・プロセッシングにも各社それぞれにノウハウがあり、各社それぞれがベストであると信じています。しかし、使用されているプロセッサーのスピードによって、データ処理能力が異なることは明らかです。それがサウンド・クォリティーに影響を与えることは簡単に想像できます。また、デジタル・エフェクターに使われるプロセッサーには、浮遊小数点演算と固定少数点演算の2種類があり（前者の方が高性能です。）、それによって演算スピードは大きく異なります。
              </p>
              <p className="text-gray-300 leading-relaxed text-sm">
                XTOMPは200Mhzの浮遊小数点演算チップ（テキサスインストルメンツ社製）を使用しており、動作のキャパは1.2GFLOPS（単位：GFLOPS=100億浮遊小数点演算/sec）で、US のL社のX3には若干劣りますが、XTOMPでは、この性能を単一エフェクトやアンプ（アルゴリズム）に使用しています。先の例に挙げたようなマルチは、エフェクターを8個のうちの1つしか使っていなくても、33MHzしか割り当てられません（8エフェクトなので1/8です。XTOMPは約5倍の演算能力）ちなみに、USのF社のFX２は、1xエフェクト（or アンプ）分は150MHzです。
              </p>
              <p className="text-gray-300 leading-relaxed text-sm">
                サウンド・クォリティーは、プロセッサーだけではなく、アルゴリズム、回路デザイン、サンプルレート、SNRや動作電圧等にも影響を受けます。これらは製品設計上のバランスです。iPhoneカメラは最も高いピクセルレートではありません。しかし、非常に高いクォリティーの写真が撮れます。XTOMPも突出したスペックを追い求めたハードではありませんが、完成されたバランス設計で素晴らしいサウンドをお届けできたと確信しています。
              </p>
            </div>

            <hr className="border-gray-700" />

            {/* Section 3: デザイン、操作性 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src="/images/brands/hotone/xtomp/concept_02.png"
                  alt="XTOMP Design"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-400 mb-1">デザイン、操作性</p>
                  <h4 className="text-lg font-bold text-white mb-4">スマートフォンやパソコンから簡単に</h4>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm">
                  XTOMPは、これまでに蓄積したHOTONEテクノロジーの結晶です。 DSPプロセッシング、CDCM、USBインターフェース、Bluetooth Smartの採用、超薄型ボティー、LED haloと、今までのフットペダルスタイルにはない、新たなスタイルを完成しました。
                </p>
                <p className="text-gray-300 leading-relaxed text-sm">
                  ミュージシャンは簡単に使えるツールを好みます。複雑な操作なしで多くのエフェクターやアンプを操作できるようにするために、HOTONEはモバイル・ミュージックソフトメーカーのEUMLabにアプリの開発を依頼しました。その結果、アイコンを選択してボタンを押すだけの素晴らしいアプリが誕生しました。アルゴリズムのローディングは非常に早く、曲間でも対応できます。本体の操作は、クラシックなエフェクトペダル同様、コントロールノブを好みの設定に回すだけです。ミュージシャンが音楽だけに専心できるプロセッサー、それがXTOMPです。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Movie Section */}
      <section id="movie" className="py-20 scroll-mt-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">デモムービー</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "iDSlHsU_9eE",
              "MtvOJk9U1VM",
              "6ZuO9ulPX5M",
              "o2n70xgJPg4",
              "A87REw2FtC8",
              "e3HxP4NOeQo",
              "5oJmKbVLto4",
              "V5XH6BfRY_g",
              "E9cyCastJWU",
              "i7-4z2Ppd9A",
              "PaUoy0iu1iA",
              "TI51bTFWM2M",
              "rXta5Lo51VQ",
              "2_gBBnhO5VY",
              "_M4ztXop2iE",
              "ZvQBBGgXqOA",
              "ad_Li0mxkSk",
              "Zorb_v_uRmk",
            ].map((videoId, index) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="200"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={`XTOMP Demo ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operation Section */}
      <section id="operation" className="py-20 scroll-mt-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">オペレーション</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="max-w-6xl mx-auto space-y-12">
            {/* First Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src="/images/brands/hotone/xtomp/Operation_01.png"
                  alt="XTOMP Operation"
                  width={500}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  XTOMPは、プレイしたことのない新たなアルゴリズムをローディングする場合、アルゴリズムのソフトの重さ（複雑さ）にもよりますが、約１分ほどの時間がかかります。しかし、プレイしたことのあるアルゴリズムのローディングは数秒で完了します。ですから、ライブの曲間にアルゴリズムを乗せ変えたい場合は、リハーサルを行っておけば、即座にアルゴリズを入れ替えてその役割を変えられるわけです。
                </p>
                <p className="text-gray-700 leading-relaxed">
                  例：ライブ中に、オーバードライブの『Zen Garden』→『Big Pie』ファズに変える。以前に、アルゴリズム『Big Pie』をプレイしたことがあれば、数秒で『Zen Garden』→『Big Pie』の変更が完了します。
                </p>
              </div>
            </div>

            <hr className="border-gray-300" />

            {/* Second Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src="/images/brands/hotone/xtomp/Operation_02.jpg"
                  alt="XTOMP Library"
                  width={500}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">XTOMP本体に全エミュレーションを一度に読み込ませる便利な方法</h3>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm">1</span>
                    <span>XTOMPの電源をONにします。</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm">2</span>
                    <span>コンピューター、またはスマートフォンでXTOMPアプリ（ソフトウェア）を起動します。</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm">3</span>
                    <span>コンピューターの場合はXTOMPをUSB接続し、スマートフォンの場合はBluetoothで接続します。</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm">4</span>
                    <span>接続確立のメッセージが出たら、「Library」をクリックします。</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm">5</span>
                    <span>「One-Click-Load（Win）」または「ダウンロード」マーク（Mac）をクリックします。</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm">6</span>
                    <span>「All」をクリックします。</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm">7</span>
                    <span>「Load」をクリックすると、XTOMPにロードが開始されます。</span>
                  </li>
                </ol>

                <hr className="border-gray-300" />

                <div>
                  <h4 className="font-bold text-gray-900 mb-3">ご注意</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600">⚠</span>
                      <span>ロード中は、XTOMPのLEDが順番に点灯します。</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600">⚠</span>
                      <span>XTOMPのLEDが点滅を始めたら、それはファームウェアのバージョンが低い事をお知らせしています。ファームウェアをアップデートしてから改めてお試しください。</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600">⚠</span>
                      <span>一度ロードした内容でも、ファームウェア／エミュレーションのバージョンが変わると、再ロードが必要になる場合があります。</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600">⚠</span>
                      <span>ロードに失敗したエフェクトに関するメッセージが表示された場合、そのエフェクトは手動で再ロードしてください。</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600">⚠</span>
                      <span>XTOMPおよびXTOMP miniは、一度に159個のエフェクトまでしかロードできません。159個以上選択された場合、若い番号が、160個目に上書きされます。</span>
                    </li>
                  </ul>
                </div>

                <hr className="border-gray-300" />

                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Bluetoothプロファイルについてのご注意</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    本製品のBluetoothプロファイルはATTを使用しています。ご使用のスマートフォンやタブレットが、ATTに対応しているかは取扱説明書またはメーカー公開情報をご参照ください。
                  </p>
                  <p className="text-xs text-gray-500">
                    ※ 2018年夏時点で富士通製Arrowsシリーズ（F-シリーズ）に非対応製品がある事が確認されております。最新の使用状況に関しては、ご使用のArrowsシリーズの取扱説明書をご確認ください。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Software Section */}
      <section id="software" className="py-20 scroll-mt-24 bg-gray-200">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">ソフトウェア</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          {/* App Screenshots */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* iOS App */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">iOS アプリ</h3>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/brands/hotone/xtomp/software_01.png"
                  alt="iOS App"
                  width={400}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Android App */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Android アプリ</h3>
              <div className="flex gap-2">
                <div className="flex-1 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/images/brands/hotone/xtomp/software_02.png"
                    alt="Android App 1"
                    width={200}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
                <div className="flex-1 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/images/brands/hotone/xtomp/software_03.png"
                    alt="Android App 2"
                    width={200}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            {/* PC Software */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">PC ソフトウェア</h3>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/brands/hotone/xtomp/software_04.jpg"
                  alt="PC Software"
                  width={400}
                  height={300}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Accordion Items */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <details className="bg-gray-100 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-200 transition-colors">
                <span className="flex items-center gap-2 font-medium text-blue-600">
                  <span>🖥</span> Tap Tempo（タップテンポ）機能
                </span>
                <span className="text-gray-500">⊕</span>
              </summary>
              <div className="p-4 bg-gray-300 border-t border-gray-400">
                <p className="text-gray-800 mb-4">
                  2016年11月26日更新のファームウェアより、Tap Tempo（タップテンポ）機能が追加されました。エミュレーション説明文中の「Features」に「Tap-Tempo-Ready」と記載されている物は、タップテンポ機能をご使用頂けます。
                </p>
                <h4 className="font-bold text-gray-900 mb-3">【使用方法】</h4>
                <ul className="space-y-2 text-gray-800">
                  <li>フットスイッチを長押しすると、スイッチのLEDが点滅を始めます。</li>
                  <li>テンポに合わせてフットスイッチを踏み、好みのテンポを決めます。</li>
                  <li>再びフットスイッチを長押しすると、通常モードに戻ります。</li>
                </ul>
              </div>
            </details>

            <details className="bg-gray-100 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-200 transition-colors">
                <span className="flex items-center gap-2 font-medium text-blue-600">
                  <span>🖥</span> ファームウェアのアップデート方法
                </span>
                <span className="text-gray-500">⊕</span>
              </summary>
              <div className="p-4 bg-gray-300 border-t border-gray-400">
                <p className="text-gray-800 mb-6">
                  ファームウェアのアップデートにより新機能が追加された場合に使用可能になります。スマートフォン用アプリ／PCソフトウェアの「MY XTOMP」より、使用中のXTOMPのファームウェアが確認できます。以下の部分をタップ／クリックし、最新のファームウェアにアップデートします。
                </p>
                
                <div className="space-y-8">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-4">スマートフォン用アプリ</h4>
                    <div className="flex justify-center">
                      <Image
                        src="/images/brands/hotone/xtomp/software_04.jpg"
                        alt="スマートフォン用アプリ"
                        width={350}
                        height={500}
                        className="rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                  
                  <hr className="border-gray-400" />
                  
                  <div>
                    <h4 className="font-bold text-gray-900 mb-4">PC用ソフトウェア</h4>
                    <div className="flex justify-center">
                      <Image
                        src="/images/brands/hotone/xtomp/software_05.jpg"
                        alt="PC用ソフトウェア"
                        width={350}
                        height={500}
                        className="rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </details>

            <details className="bg-gray-100 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-200 transition-colors">
                <span className="flex items-center gap-2 font-medium text-blue-600">
                  <span>🖥</span> コンピューター版 アプリ（ソフトウェア）
                </span>
                <span className="text-gray-500">⊕</span>
              </summary>
              <div className="p-4 bg-gray-300 border-t border-gray-400">
                <p className="text-gray-800 mb-2">
                  XTOMPのコンピューター版 アプリ（ソフトウェア）が登場しました。
                </p>
                <p className="text-gray-800 mb-4">
                  Bluetooth経由のiOSやAndroidよりも遥かに早く、超高速でのアルゴリズム（DEVICE）転送が可能です。
                </p>
                
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="text-gray-800">USB経由で、各アルゴリズム（DEVICE）の超高速ロードが数秒で行えます。</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="text-gray-800">アルゴリズムの解説やコントロール説明、本体のステータスが、PCの大画面で確認できます。</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="text-gray-800">本体名やパスワードの変更もソフトウェア上から行う事が可能。</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="text-gray-800">ファームウェアのアップデートもこのソフトウェアを使用します。</span>
                  </li>
                </ul>
                
                <div className="text-sm text-gray-700 space-y-2 mb-6">
                  <p>※ 製品の特徴上、初めてロードするアルゴリズム（DEVICE）は、Bluetooth転送に20～30秒程度の時間が必要です。2回目以降のロードは、瞬時にアップロードされるようになります。コンピューター版からロードする場合は、初回のロードでも一瞬で完了します。予め使用するアルゴリズム（DEVICE）をXTOMPに1度ロードしておくと、スマートフォンからのBluetooth転送でもロードが速くなります。</p>
                  <p>※ 接続にはUSB – USB-miniケーブル（別売）が必要です。</p>
                  <p>※ 新たなアルゴリズム・ライブラリーのアップデートにはネット環境が必要です。</p>
                </div>
                
                <hr className="border-gray-400 my-6" />
                
                {/* Mac版 */}
                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-4">Mac版</h4>
                  <a
                    href="#"
                    className="inline-block px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors mb-4"
                  >
                    Mac - ダウンロード
                  </a>
                  <p className="text-sm text-gray-700 mb-2">※ システム動作環境： Mac 10.10以降</p>
                  <p className="text-sm text-gray-700 mb-4">
                    インストールの際、セキュリティー環境によっては「発行元が不明なためインストールできません」とのエラーメッセージが出る場合がございます。
                  </p>
                  <p className="text-sm text-gray-800 font-medium mb-2">
                    システム環境設定　→　セキュリティーとプライバシー　→　一般　→　ダウンロードしたアプリケーションの実行許可
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    上記画面でリストに表示されたXTOMPソフトウェアを許可するか、ロックを解除してからXTOMPを実行してください。
                  </p>
                  <p className="text-sm text-gray-700">
                    Apple：開発元が未確認のアプリケーションを開く際のご注意
                  </p>
                </div>
                
                <hr className="border-gray-400 my-6" />
                
                {/* Windows版 */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-4">Windows版</h4>
                  <a
                    href="#"
                    className="inline-block px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors mb-4"
                  >
                    Windows - ダウンロード
                  </a>
                  <p className="text-sm text-gray-700">
                    ※ システム動作環境： Win XP / Win 7（32 / 64bit） / Win 8（32 / 64bit） / Win10（32 / 64bit）
                  </p>
                </div>
              </div>
            </details>

            <details className="bg-gray-100 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-200 transition-colors">
                <span className="flex items-center gap-2 font-medium text-blue-600">
                  <span>📱</span> スマートフォン用アプリ
                </span>
                <span className="text-gray-500">⊕</span>
              </summary>
              <div className="p-4 bg-gray-300 border-t border-gray-400">
                <p className="text-gray-800 mb-6">
                  各デバイス用のソフトウェアは下記のリンクからダウンロードすることができます。App Store (iOS) または Play Store (Android) から「XTOMP」を検索するか、以下の QR コードを読み取って、XTOMP アプリケーションをダウンロードして下さい。
                </p>
                
                <div className="space-y-8">
                  {/* iOS */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-4">iOS</h4>
                    <div className="flex justify-center">
                      <Image
                        src="/images/brands/hotone/xtomp/software_06.png"
                        alt="iOS QR Code"
                        width={300}
                        height={300}
                        className="bg-white p-2 rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                  
                  <hr className="border-gray-400 max-w-xs mx-auto" />
                  
                  {/* Android */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-4">Android</h4>
                    <div className="flex justify-center">
                      <Image
                        src="/images/brands/hotone/xtomp/software_07.png"
                        alt="Android QR Code"
                        width={300}
                        height={300}
                        className="bg-white p-2 rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                </div>
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
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* INPUT セクション */}
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-3">INPUT セクション</h3>
                    <div className="space-y-2 text-gray-700 text-sm">
                      <p className="py-2 border-b border-gray-200">オーディオ入力：Left in (mono)、Right in</p>
                      <p className="py-2 border-b border-gray-200">バイパス・モード：Left – リレーバイパス or アナログバッファード・バイパス、Right- アナログバッファード・バイパス</p>
                      <p className="py-2 border-b border-gray-200">入力インピーダンス：1M ohms</p>
                    </div>
                  </div>
                  
                  {/* OUTPUT セクション */}
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-3">OUTPUT セクション</h3>
                    <div className="space-y-2 text-gray-700 text-sm">
                      <p className="py-2 border-b border-gray-200">オーディオ出力：Left out (mono)、Right out</p>
                      <p className="py-2 border-b border-gray-200">出力インピーダンス：100 ohms</p>
                    </div>
                  </div>
                </div>
                
                {/* Right Column */}
                <div className="space-y-6">
                  {/* デジタル・セクション */}
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-3">デジタル・セクション</h3>
                    <div className="space-y-2 text-gray-700 text-sm">
                      <p className="py-2 border-b border-gray-200">コントロール：6 x コントロールノブ、1 x On/Off フットスイッチ</p>
                      <p className="py-2 border-b border-gray-200">オーディオ周波数特性：5Hz〜21kHz</p>
                      <p className="py-2 border-b border-gray-200">S/N 比：114dB</p>
                    </div>
                  </div>
                  
                  {/* その他 */}
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-3">その他</h3>
                    <div className="space-y-2 text-gray-700 text-sm">
                      <p className="py-2 border-b border-gray-200">電源：9V DC センターマイナス</p>
                      <p className="py-2 border-b border-gray-200">消費電流：最大200mA</p>
                      <p className="py-2 border-b border-gray-200">サイズ：126mm（D） x 73mm（W） x 35mm（H）</p>
                      <p className="py-2 border-b border-gray-200">重量：472g</p>
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

