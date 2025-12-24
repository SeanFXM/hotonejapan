"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Download, ChevronDown, ChevronUp } from 'lucide-react'
import { BlogSlider } from "@/components/blog-slider"
import { downloadManual } from "@/lib/manual-download"

type Section = "concept" | "demo" | "audio" | "software" | "bundle" | "manual" | "specs"

const navigationItems = [
  { id: "concept" as Section, label: "コンセプト" },
  { id: "demo" as Section, label: "デモムービー" },
  { id: "audio" as Section, label: "オーディオ性能" },
  { id: "software" as Section, label: "ソフトウエア" },
  { id: "bundle" as Section, label: "バンドルソフト" },
  { id: "manual" as "manual", label: "取扱説明書", isDownload: true },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function OriaMiniPage() {
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
    downloadManual("audient", "oria-mini")
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
          src="/images/brands/audient/oria_mini/hero.jpg"
          alt="ORIA mini"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        <div className="relative container mx-auto px-6 h-full flex items-center justify-end">
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-white/30 w-96">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 tracking-wider">AUDIENT</h1>
            </div>

            <div className="space-y-4 text-gray-900">
              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">製品名：</p>
                <p className="text-2xl font-bold text-gray-900">ORIA mini</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">ルーム補正システム</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">下記を参照</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-gray-900">下記を参照</p>
                <p className="text-xs text-gray-500">前後（税込）</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">下記を参照</p>
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
                <a
                  key={item.id}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    handleManualDownload()
                  }}
                  className={`relative px-4 py-2 text-base font-medium transition-colors duration-200 whitespace-nowrap ${
                    activeSection === item.id ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 rounded-full" />
                  )}
                </a>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 text-base font-medium transition-colors duration-200 whitespace-nowrap ${
                    activeSection === item.id ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 rounded-full" />
                  )}
                </button>
              )
            ))}
          </div>
        </div>
      </nav>

      {/* Intro Section - White Background */}
      <section className="py-20 scroll-mt-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Main Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              最高のミックスを実現する
            </h2>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">
              Sonarworksに適応した究極のハードウェアソリューション
            </p>
            <div className="flex justify-center mt-8">
              <div className="w-24 h-1 rounded-full bg-purple-600" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Video and Related Info */}
            <div className="space-y-6">
              {/* YouTube Video */}
              <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/ZDwRvU9hEkk"
                  title="ORIA Mini Features Explained"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              {/* Related Information */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <h3 className="font-bold text-gray-900 text-lg mb-4">関連情報</h3>
                <div className="space-y-3">
                  <a href="#" className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200 block">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-900">AUDIENT：サポート窓口</span>
                  </a>
                  <a href="#" className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200 block">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-900">AUDIENT：ユーザー登録</span>
                  </a>
                  <a href="#" className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200 block">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-900">ARC フリー・バンドル・ソフトウェア＆プラグイン</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Product Description and Features */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Unlock Your Best Mixes</h3>

                <div className="prose max-w-none mb-8">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    聴いている音が信頼できないなら、ミックスも信頼できません。実は、あなたが作業している部屋のアコースティックが、あなたのパフォーマンスを阻害している可能性が高いのです。オーディオインターフェースとスピーカーの間に設置できる、強力なルーム補正システム、ORIA Miniをここにご紹介します。スタジオモニタリングを変革し、パフォーマンスを瞬時に向上させます。Sonarworksとの提携により、数分で部屋の音響的欠陥を分析・補正する専用ハードウェアソリューションを実現しました。スタジオを、手探りで仕上げた環境から、信頼性の高いプロフェッショナルなモニタリング環境へと進化させます。
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    ORIA miniは、Sonarworks SoundID Referenceのバンドル別に３種類のパッケージを販売いたします。詳しくは、製品ラインナップをご覧ください。
                  </p>
                </div>

                {/* Feature List */}
                <div className="space-y-2">
                  {[
                    "あらゆるスピーカーの音質を向上",
                    "内蔵DSPに4つのSonarworksプロファイルをロードし、切り替えての使用が可能",
                    "あらゆるオーディオ インターフェースやスピーカーで使用可能",
                    "最大2.1ch スピーカー システムに対応",
                    "リモート コントロール",
                    "Stream Deck + iPad",
                    "プロレベルのオーディオ パフォーマンス",
                    "高度な32ビット コンバーター テクノロジー",
                    "127dbのダイナミックレンジ",
                    "オンボード ルーム キャリブレーション処理",
                    "EQ、トリム、ディレイ、ベースマネジメント",
                    "ステレオ入力（TRS）×1、デジタル入力（S/PDIF）×1、ステレオスピーカー出力（TRS）×1、サブ出力（TRS）×1",
                    "24bit/96kHz",
                    "USB3.0バスパワー駆動",
                    "MacOSおよびWindows対応",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-gray-700 text-sm">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Lineup Section */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">製品ラインナップ</h3>
            
            <div className="space-y-6 max-w-4xl mx-auto">
              {/* Complete Bundle */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  ORIA Mini + SoundID Reference　コンプリートバンドル
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  品番：OM-SIR-COM　　　JAN：4560347885112　　　市場想定価格帯：￥75,500 前後
                </p>
                <div className="bg-white rounded-lg p-4">
                  <p className="font-medium text-gray-900 mb-3">【 同梱内容 】</p>
                  <div className="space-y-2">
                    {[
                      "ORIA Mini ハードウェア",
                      "SoundID Reference Measurement Microphone（同梱されています）",
                      "ORIA Mini Room Correction Add-on（Digital Key）",
                      "SoundID Reference for Speakers & Headphones License（Digital Key）",
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-4">※ ハードウェア本体および上記ソフトウェアをお持ちでない新規のお客様にお勧め</p>
                </div>
              </div>

              {/* Add-on Bundle */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  ORIA Mini + SoundID Reference　アドオンバンドル
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  品番：OM-SIR-ADD　　　JAN：4560347885129　　　市場想定価格帯：￥68,500 前後
                </p>
                <div className="bg-white rounded-lg p-4">
                  <p className="font-medium text-gray-900 mb-3">【 同梱内容 】</p>
                  <div className="space-y-2">
                    {[
                      "ORIA Mini ハードウェア",
                      "SoundID Reference Measurement Microphone（同梱されています）",
                      "ORIA Mini Room Correction Add-on（Digital Key）",
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-4">※ SoundID Referenceソフトウェアを既にお持ちの方はこちらをお求めください</p>
                </div>
              </div>

              {/* Hardware Only */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  ORIA Mini　ハードウェアのみ（*測定用マイクロフォンは付属します）
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  品番：OM-ONLY　　　JAN：5060374260641　　　市場想定価格帯：￥51,500 前後
                </p>
                <div className="bg-white rounded-lg p-4">
                  <p className="font-medium text-gray-900 mb-3">【 同梱内容 】</p>
                  <div className="space-y-2">
                    {[
                      "ORIA Mini ハードウェア",
                      "SoundID Reference Measurement Microphone（同梱されています）",
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-4">※ 既存のSoundID Referenceユーザー（ライセンス所有者）でORIA Miniハードウェアのみの購入を希望される場合は、Sonarworksの日本販売代理店、（株）メディア・インテグレーションから別途「ORIA Mini Room Correction Add-on（アクティベーションキー）」を購入していただく必要があります。これにより、ORIA Mini ハードウェアにキャリブレーションプロファイルを読み込みできるようになります。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Concept Section - Dark Background */}
      <section id="concept" className="scroll-mt-24 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Title */}
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">製品コンセプト</h3>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full bg-purple-600" />
            </div>
          </div>

          {/* Section 1: Video + Room Acoustics Problem */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
            {/* Video */}
            <div>
              <div className="aspect-video bg-black rounded-xl overflow-hidden">
                <video 
                  src="/images/brands/audient/oria_mini/concept_01.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>
              <p className="text-green-400 mt-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Calibrated
              </p>
            </div>

            {/* Text Content */}
            <div>
              <h4 className="text-2xl font-bold text-white mb-4">ルームアコースティックの問題を解決</h4>
              <h5 className="text-xl text-gray-300 mb-6">ミックスがうまく伝わらない理由</h5>
              <p className="text-gray-400 leading-relaxed">
                何時間もかけて完璧なミックスを仕上げたのに、スタジオを出た途端、壊れしてしまう。これは音楽クリエイターにとってよくある、苛立たしい現実です。そして、その原因はあなたの才能ではなく、あなたのルームアコースティックにあります。ホームスタジオからプロのスタジオまで、あらゆる空間で不要な反射、共鳴、周波数のアンバランスが生じ、聴感上の歪みを引き起こします。こうした音響干渉は、クリティカルなリスニングを常に困難にし、その結果として、外の世界には全く伝わらない、妥協したミックスになってしまうのです。
              </p>
            </div>
          </div>

          {/* Section 2: Why ORIA mini is excellent - 6 Feature Cards */}
          <div className="mb-20">
            <h4 className="text-2xl font-bold text-white mb-8 text-center">ORIA mini が優れている理由は何ですか？</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="bg-[#2a2a2a] rounded-xl p-6">
                <div className="w-16 h-16 mb-4">
                  <Image src="/images/brands/audient/oria_mini/concept_02.svg" alt="Sonarworks搭載" width={64} height={64} />
                </div>
                <h5 className="text-lg font-bold text-white mb-2">Sonarworks 搭載</h5>
                <p className="text-gray-400 text-sm">
                  SoundID Referenceで部屋の音響を測定・調整。ベッドルームプロデューサーからグラミー賞受賞エンジニアまで、世界中の25万以上のスタジオで信頼され、使用されています。
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-[#2a2a2a] rounded-xl p-6">
                <div className="w-16 h-16 mb-4">
                  <Image src="/images/brands/audient/oria_mini/concept_03.svg" alt="自信を持ってミックス" width={64} height={64} />
                </div>
                <h5 className="text-lg font-bold text-white mb-2">自信を持ってミックス</h5>
                <p className="text-gray-400 text-sm">
                  部屋の音色に左右されることなく、本来の音を忠実に再現。重要なミックスの判断を絶対的な確信を持って下せます。
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-[#2a2a2a] rounded-xl p-6">
                <div className="w-16 h-16 mb-4">
                  <Image src="/images/brands/audient/oria_mini/concept_04.svg" alt="完璧なミックスの実現" width={64} height={64} />
                </div>
                <h5 className="text-lg font-bold text-white mb-2">完璧なミックスの実現</h5>
                <p className="text-gray-400 text-sm">
                  カーステレオからストリーミングサービスまで、あらゆる環境で素晴らしいサウンドを実現するミックスを作成できます。すべては、正しく調整された環境でミックスを行うから実現できます。
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-[#2a2a2a] rounded-xl p-6">
                <div className="w-16 h-16 mb-4">
                  <Image src="/images/brands/audient/oria_mini/concept_05.svg" alt="ワークフローをスピードアップ" width={64} height={64} />
                </div>
                <h5 className="text-lg font-bold text-white mb-2">ワークフローをスピードアップ</h5>
                <p className="text-gray-400 text-sm">
                  複数のシステムでミックスを何度も確認したり、何度も修正したりする手間が省けます。正しく調整されたモニタリング環境は、プロセスを効率化し、生産性を飛躍的に向上させます。
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-[#2a2a2a] rounded-xl p-6">
                <div className="w-16 h-16 mb-4">
                  <Image src="/images/brands/audient/oria_mini/concept_06.svg" alt="簡単なセットアップ" width={64} height={64} />
                </div>
                <h5 className="text-lg font-bold text-white mb-2">簡単なセットアップ、即効性</h5>
                <p className="text-gray-400 text-sm">
                  Sonarworksを使えば、20分もかからずにキャリブレーションが完了し、すぐにミックスの準備が整います。測定とキャリブレーションだけで、サウンドが劇的に向上することがすぐに実感できます。
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-[#2a2a2a] rounded-xl p-6">
                <div className="w-16 h-16 mb-4">
                  <Image src="/images/brands/audient/oria_mini/concept_07.svg" alt="堅牢な専用ハードウェア" width={64} height={64} />
                </div>
                <h5 className="text-lg font-bold text-white mb-2">堅牢な専用ハードウェア</h5>
                <p className="text-gray-400 text-sm">
                  超低レイテンシーでCPU負荷の少ない、一貫性と信頼性の高いパフォーマンスを実現します。ルーム補正は、ソフトウェアを介さずに、24時間365日、バックグラウンドでシームレスに実行されます。
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: System Overview */}
          <div className="mb-20">
            <h4 className="text-2xl font-bold text-white mb-8 text-center">システム概要</h4>
            <div className="bg-[#2a2a2a] rounded-xl p-8">
              <Image
                src="/images/brands/audient/oria_mini/concept_08.webp"
                alt="ORIA mini システム概要"
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Section 4: Unparalleled Reliability */}
          <div className="mb-20">
            <h4 className="text-2xl font-bold text-white mb-4 text-center">比類のなき信頼性</h4>
            <p className="text-gray-400 text-center mb-8">専用ハードウェアの圧倒的なメリット</p>
            
            <p className="text-gray-400 text-center max-w-3xl mx-auto mb-8">
              ソフトウェアのみによる室内補正で満足してますかか？<br />
              ORIA Miniは、そうした制約から解放します。<br />
              完全にハードウェア領域で動作することで、ORIA Miniは以下のことを実現してくれます。
            </p>

            {/* Product Image */}
            <div className="flex justify-center mb-12">
              <Image
                src="/images/brands/audient/oria_mini/concept_09.webp"
                alt="ORIA mini"
                width={600}
                height={300}
                className="rounded-xl"
              />
            </div>

            {/* 4 Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-[#2a2a2a] rounded-full flex items-center justify-center">
                  <Image src="/images/brands/audient/oria_mini/concept_10.svg" alt="超低レイテンシー" width={48} height={48} />
                </div>
                <h5 className="text-lg font-bold text-white mb-2">超低レイテンシー</h5>
                <p className="text-gray-400 text-sm">オーディオは完璧に同期し、途切れることはありません。</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-[#2a2a2a] rounded-full flex items-center justify-center">
                  <Image src="/images/brands/audient/oria_mini/concept_11.svg" alt="揺るぎない信頼性" width={48} height={48} />
                </div>
                <h5 className="text-lg font-bold text-white mb-2">揺るぎない信頼性</h5>
                <p className="text-gray-400 text-sm">いつでもグリッチのない、安定したパフォーマンスを体験できます。</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-[#2a2a2a] rounded-full flex items-center justify-center">
                  <Image src="/images/brands/audient/oria_mini/concept_12.svg" alt="途切れることのないワークフロー" width={48} height={48} />
                </div>
                <h5 className="text-lg font-bold text-white mb-2">途切れることのないワークフロー</h5>
                <p className="text-gray-400 text-sm">DAWのマスターバスプラグインは不要。キャリブレーションされたサウンドが常にアクティブです。</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-[#2a2a2a] rounded-full flex items-center justify-center">
                  <Image src="/images/brands/audient/oria_mini/concept_13.svg" alt="どこでも安定したサウンド" width={48} height={48} />
                </div>
                <h5 className="text-lg font-bold text-white mb-2">どこでも安定したサウンド</h5>
                <p className="text-gray-400 text-sm">ミキシングセッションの最中でも、あらゆるソースから音楽を聴いている時でも、完璧なオーディオを実現します。</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: SoundID Reference - Same Dark Background */}
        <div className="py-16 border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header with logo */}
            <div className="mb-2">
              <Image src="/images/brands/audient/oria_mini/concept_15.svg" alt="SoundID Reference" width={200} height={40} />
            </div>
            <p className="text-white text-lg mb-1">Sonarworks SoundIDリファレンス</p>
            <p className="text-gray-400 mb-8">Sonarworks搭載</p>

            {/* SoundID Screenshot - Before/After calibration */}
            <div className="bg-white rounded-xl p-6 mb-8 max-w-4xl mx-auto">
              <Image
                src="/images/brands/audient/oria_mini/concept_16.gif"
                alt="SoundID Reference スクリーンショット"
                width={900}
                height={450}
                className="w-full h-auto"
              />
            </div>

            <div className="max-w-4xl mx-auto">
              <p className="text-gray-300 leading-relaxed mb-6">
                音響ルームキャリブレーションの業界リーダーであるSonarworksと提携し、専門知識を必要とせずに、ご自身で室内の測定とキャリブレーションを行うことができます。ORIA Miniでは、Sonarworks SoundID ReferenceのカスタムキャリブレーションプロファイルがORIA Miniの専用ハードウェアプロセッサに直接読み込まれる仕様で、画期的な製品として完成しました。
              </p>

              <p className="text-gray-300 leading-relaxed mb-12">
                つまり、Sonarworksのキャリブレーション済みリスニング環境の素晴らしいメリット、つまりピンポイントの精度、フラットな周波数特性、そして信頼性の高い変換をすべて、Sonarworksソフトウェアをコンピューターで実行することなく享受できるということです。CPU負荷、レイテンシー、ソフトウェアの不具合の可能性と決別できます。キャリブレーション済みのサウンドは常時オン、常に安定、そしていつでも準備万端です。
              </p>

              {/* Two Screenshot Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white rounded-xl p-4">
                  <Image
                    src="/images/brands/audient/oria_mini/concept_17.webp"
                    alt="リスニング環境チェック"
                    width={500}
                    height={300}
                    className="rounded-lg mb-4 w-full"
                  />
                  <h5 className="text-lg font-bold text-gray-900 mb-2">リスニング環境チェックの時間を節約</h5>
                  <p className="text-gray-600 text-sm">
                    カーステレオからハイエンドHi-Fiシステムまで、幅広いリスニング環境をシミュレートし、ORIA Miniに直接インポートできます。デスクにいながら、ミックスが他のリスニング環境でどのように聴こえるかを確認できます。
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <Image
                    src="/images/brands/audient/oria_mini/concept_18.webp"
                    alt="モニターのパフォーマンスをカスタマイズ"
                    width={500}
                    height={300}
                    className="rounded-lg mb-4 w-full"
                  />
                  <h5 className="text-lg font-bold text-gray-900 mb-2">モニターのパフォーマンスをカスタマイズ</h5>
                  <p className="text-gray-600 text-sm">
                    ターゲットカーブをリアルタイムでカスタム調整し、キャリブレーションを適用する周波数範囲を手動で選択できます。
                  </p>
                </div>
              </div>

              {/* SoundID Reference Info */}
              <div className="mb-8">
                <p className="text-gray-300 mb-6">
                  SoundID Reference についての詳しい情報は、Sonarworks社 日本販売代理店（株）メディア・インテグレーション様のWEBサイトでご覧いただけます。ソフトウェアのサポートと拡張したいときのご購入案内は下記のリンクをご覧ください。
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <a href="#" className="text-green-400 hover:underline">ORIA Mini Room Correction Add-on の販売のリンク</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <a href="#" className="text-green-400 hover:underline">SoundID Reference のサポート情報</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <a href="#" className="text-green-400 hover:underline">SoundID Reference に関する総合お問合せ窓口</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <a href="#" className="text-green-400 hover:underline">測定手順に関しての資料</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <a href="#" className="text-green-400 hover:underline">スピーカーの測定方法に関する動画は、こちら（英語版・自動翻訳字幕をご利用ください。）</a>
                  </li>
                </ul>
              </div>

              {/* Green Button */}
              <div className="flex justify-center">
                <a href="#" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                  メディア・インテグレーション　オンラインストア
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Professional Calibration Steps */}
        <div className="py-16 border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h4 className="text-2xl font-bold text-white mb-4">プロ仕様のキャリブレーション。シンプルに。</h4>
              <p className="text-gray-400">設定して、あとはお任せ。</p>
            </div>

            <p className="text-gray-400 text-center max-w-4xl mx-auto mb-12">
              ORIA Miniを使えば、プロフェッショナルなルーム補正が簡単に行えます。20分以内で、部屋の測定、カスタムプロファイルの作成、ORIA Miniの接続、そしてスタジオグレードの高解像度モニタリングによるミキシングを開始できます。４つのカスタマイズ可能なプロファイルスロットで、異なるターゲットカーブを簡単に切り替えられるため、電話や車内環境など、様々な再生シミュレーションでミックスを素早く試聴できます。しかも、椅子に座ったまま快適に操作できます。A/Bテストも簡単です。
            </p>

            {/* 4 Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="mb-4">
                  <Image 
                    src="/images/brands/audient/oria_mini/concept_19.webp" 
                    alt="Step 1" 
                    width={280} 
                    height={200} 
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <h5 className="text-white font-bold mb-2">1. スピーカーを測定する</h5>
                <p className="text-gray-400 text-sm">SoundID Reference またはお好みのソフトウェアを使って、お部屋を簡単に分析できます。</p>
              </div>

              <div className="text-center">
                <div className="mb-4">
                  <Image 
                    src="/images/brands/audient/oria_mini/concept_20.webp" 
                    alt="Step 2" 
                    width={280} 
                    height={200} 
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <h5 className="text-white font-bold mb-2">2. キャリブレーション</h5>
                <p className="text-gray-400 text-sm">空間に合わせてカスタマイズされたカスタムキャリブレーションプロファイルを作成できます。</p>
              </div>

              <div className="text-center">
                <div className="mb-4">
                  <Image 
                    src="/images/brands/audient/oria_mini/concept_21.webp" 
                    alt="Step 3" 
                    width={280} 
                    height={200} 
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <h5 className="text-white font-bold mb-2">3. 転送</h5>
                <p className="text-gray-400 text-sm">最大4つのプロファイルをORIA Miniにエクスポートして読み込み、すぐに呼び出すことができます。</p>
              </div>

              <div className="text-center">
                <div className="mb-4">
                  <Image 
                    src="/images/brands/audient/oria_mini/concept_22.webp" 
                    alt="Step 4" 
                    width={280} 
                    height={200} 
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <h5 className="text-white font-bold mb-2">4. 保存</h5>
                <p className="text-gray-400 text-sm">毎日、一日中持続する、正確で信頼性の高いモニタリングをお楽しみください。</p>
              </div>
            </div>

            {/* Universal Compatibility */}
            <div className="mb-16">
              <h4 className="text-2xl font-bold text-white mb-4 text-center">ユニバーサルな互換性</h4>
              <p className="text-gray-400 text-center mb-8">あらゆるスタジオへの統合が可能</p>
              
              <p className="text-gray-400 text-center max-w-4xl mx-auto mb-8">
                ORIA Miniは、あらゆるオーディオインターフェースとスピーカーの間にシームレスに設置できるよう設計されており、サウンドの精度と信頼性を即座に向上させます。複雑な設置や互換性の問題もありません。ORIA Miniは既存のセットアップにスムーズに統合できるため、スタジオ全体を改修することなく、使い慣れたお気に入りの機材をそのまま使用できます。
              </p>

              <div className="flex justify-center">
                <Image
                  src="/images/brands/audient/oria_mini/concept_23.webp"
                  alt="ユニバーサルな互換性"
                  width={800}
                  height={400}
                  className="rounded-xl"
                />
              </div>
            </div>

            {/* Portability */}
            <div className="mb-16">
              <h4 className="text-2xl font-bold text-white mb-4 text-center">ポータビリティ</h4>
              <p className="text-gray-400 text-center mb-8">ミニデザイン、パワフルなパフォーマンス</p>
              
              <p className="text-gray-400 text-center max-w-4xl mx-auto mb-8">
                サイズに惑わされないでください。ORIA Miniは、業界トップ基準のキャリブレーション技術を洗練されたポータブルデバイスに凝縮し、スタジオや自宅のセットアップに無理なくフィットするように設計されています。
              </p>

              <div className="flex justify-center mb-12">
                <Image
                  src="/images/brands/audient/oria_mini/concept_24.jpg"
                  alt="ORIA mini ポータビリティ"
                  width={1000}
                  height={500}
                  className="rounded-xl"
                />
              </div>
            </div>

            {/* Final CTA */}
            <div className="text-center">
              <h4 className="text-2xl font-bold text-white mb-4">あなたの耳を信じてみませんか？</h4>
              <p className="text-gray-400 max-w-3xl mx-auto mb-8">
                ORIA Miniは単なる機材ではありません。あなたの技術、ワークフロー、そして最終的には最高のミックスへの投資です。自分のミックス環境と格闘するのはもう終わりにして、自信を持って創作を始めましょう。
              </p>

              <div className="flex justify-center">
                <Image
                  src="/images/brands/audient/oria_mini/concept_25.jpg"
                  alt="ORIA mini"
                  width={800}
                  height={400}
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Movie Section */}
      <section id="demo" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">デモムービー</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/ZDwRvU9hEkk"
                title="ORIA Mini: Fix Your Room, Fix Your Mix"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Audio Performance Section */}
      <section id="audio" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section 1: 32-bit Converter Technology */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              {/* Left - Product Image */}
              <div className="flex justify-center">
                <Image
                  src="/images/brands/audient/oria_mini/audio_01.png"
                  alt="ORIA mini"
                  width={500}
                  height={300}
                  className="rounded-xl"
                />
              </div>

              {/* Right - Content */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">次世代のオーディオパフォーマンス</h2>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">高度な32ビットコンバーターテクノロジー</h3>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  ORIA Miniの先進的な32ビットAD/DAコンバーターは、絶対的な音の透明性を実現するために設計されています。変換時の音質劣化を最小限に抑え、オーディオ信号経路を最もクリーンで高精度なものにするよう設計されています。その透明度はあまりにも高く、ORIA Miniの存在を全く感じさせないほどです。
                </p>
                
                <p className="text-gray-700 leading-relaxed mb-8">
                  127dBという圧倒的なダイナミックレンジと組み合わせることで、ミックスの最も繊細なディテールまでも明瞭に捉え、問題箇所を瞬時に特定できます。これは単に音質を向上させるだけでなく、絶対的な自信を持ってミキシングを行い、常にリリース可能な結果を実現するためのベースになります。
                </p>

                {/* 32-bit and 127dB badges */}
                <div className="flex gap-6">
                  <Image
                    src="/images/brands/audient/oria_mini/audio_02.png"
                    alt="32-bit"
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                  <Image
                    src="/images/brands/audient/oria_mini/audio_03.png"
                    alt="127dB"
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Performance Comparison */}
            <div className="mb-16">
              <div className="flex justify-center">
                <Image
                  src="/images/brands/audient/oria_mini/audio_04.png"
                  alt="性能比較"
                  width={450}
                  height={250}
                  className="h-auto"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-16"></div>

            {/* Section 3: Hardware Processor */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">ハードウェアプロセッサ</h3>
              
              <h4 className="text-lg font-bold text-gray-900 mb-4">オンボードDSPの機能</h4>
              
              <p className="text-gray-700 leading-relaxed mb-8">
                ORIA Miniは、Sonarworksを使ったルームキャリブレーション機能だけでなく、SmaartやRoomEQ Wizardなどの測定ソフトウェアを使って手動でルームキャリブレーションを行うこともできます。内蔵プロセッシング機能を手動で制御し、出力チャンネルごとにEQ、ディレイ、トリム、ベースマネジメントが調整できます。
              </p>

              {/* 3 Feature Cards - Dark Background */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* EQ */}
                <div className="bg-[#2a2a2a] rounded-xl p-6 text-center">
                  <h5 className="text-xl font-bold text-white mb-4">EQ</h5>
                  <div className="mb-4">
                    <Image
                      src="/images/brands/audient/oria_mini/audio_05.svg"
                      alt="EQ"
                      width={60}
                      height={60}
                      className="mx-auto"
                    />
                  </div>
                  <p className="text-gray-300 text-sm">
                    不要な音響的問題や色付けに対処して、オーディオのフラットで一貫した再現を保証します。
                  </p>
                </div>

                {/* Trim */}
                <div className="bg-[#2a2a2a] rounded-xl p-6 text-center">
                  <h5 className="text-xl font-bold text-white mb-4">Trim</h5>
                  <div className="mb-4">
                    <Image
                      src="/images/brands/audient/oria_mini/audio_06.svg"
                      alt="Trim"
                      width={60}
                      height={60}
                      className="mx-auto"
                    />
                  </div>
                  <p className="text-gray-300 text-sm">
                    各スピーカーのレベルを個別に調整し、バランスの取れた音場を実現します。
                  </p>
                </div>

                {/* Delay */}
                <div className="bg-[#2a2a2a] rounded-xl p-6 text-center">
                  <h5 className="text-xl font-bold text-white mb-4">Delay</h5>
                  <div className="mb-4">
                    <Image
                      src="/images/brands/audient/oria_mini/audio_07.svg"
                      alt="Delay"
                      width={60}
                      height={60}
                      className="mx-auto"
                    />
                  </div>
                  <p className="text-gray-300 text-sm">
                    すべてのスピーカーからの音声がミックス位置に正確に同時に到達するように調整します。
                  </p>
                </div>
              </div>

              {/* Bass Management - Dark Background with Image on Right */}
              <div className="bg-[#2a2a2a] rounded-xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
                  {/* Left - Content */}
                  <div className="p-10 flex flex-col justify-center">
                    <h5 className="text-2xl font-bold text-white mb-6">Bass Management</h5>
                    <div className="mb-6">
                      <Image
                        src="/images/brands/audient/oria_mini/audio_09.svg"
                        alt="Bass Management"
                        width={80}
                        height={80}
                      />
                    </div>
                    <p className="text-gray-300">
                      メインスピーカーとサブウーファー間のクロスオーバーを最適化し、濁りのないタイトでコントロールされた、力強い低音を実現します。
                    </p>
                  </div>
                  
                  {/* Right - Image (Square) */}
                  <div className="relative aspect-square lg:aspect-auto lg:h-full">
                    <Image
                      src="/images/brands/audient/oria_mini/audio_10.jpg"
                      alt="Studio Setup"
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Software Section */}
      <section id="software" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">ソフトウエア</h2>
          
          <div className="max-w-6xl mx-auto">
            {/* Accordion Items - 2 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start mb-4">
              {/* Mac Driver */}
              <details className="bg-gray-200 rounded-lg overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-300 transition-colors">
                  <span className="flex items-center gap-2 font-medium text-blue-600">
                    <span></span> Mac Driver v1.3.3 - <span className="text-red-500">New!</span> -
                  </span>
                  <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">−</span>
                </summary>
                <div className="p-4 bg-gray-200">
                  <p className="text-gray-700 mb-4">
                    ORIA miniのドライバーとソフトウェアインストーラー、およびユーザーマニュアルなどのドキュメントは、次のリンクから入手できます。
                  </p>
                  <p className="text-gray-700 mb-4">
                    <a href="https://audient.com/products/monitor-controllers/oria-mini/downloads/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                      https://audient.com/products/monitor-controllers/oria-mini/downloads/
                    </a>
                  </p>
                  <p className="text-gray-600 text-sm">
                    *Elgato Stream Deck ソフトウェアがシステムにすでにインストールされている場合、ORIA V1.3 はセットアップ中に ORIA Stream Deck プラグインを自動的にインストールします。
                  </p>
                </div>
              </details>

              {/* Windows Driver */}
              <details className="bg-gray-200 rounded-lg overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-300 transition-colors">
                  <span className="flex items-center gap-2 font-medium text-blue-600">
                    <span>⊞</span> Windows Driver v1.3.3 - <span className="text-red-500">New!</span> -
                  </span>
                  <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">−</span>
                </summary>
                <div className="p-4 bg-gray-200">
                  <p className="text-gray-700 mb-4">
                    ORIA miniのドライバーとソフトウェアインストーラー、およびユーザーマニュアルなどのドキュメントは、次のリンクから入手できます。
                  </p>
                  <p className="text-gray-700 mb-4">
                    <a href="https://audient.com/products/monitor-controllers/oria-mini/downloads/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                      https://audient.com/products/monitor-controllers/oria-mini/downloads/
                    </a>
                  </p>
                  <p className="text-gray-600 text-sm">
                    *Elgato Stream Deck ソフトウェアがシステムにすでにインストールされている場合、ORIA V1.3 はセットアップ中に ORIA Stream Deck プラグインを自動的にインストールします。
                  </p>
                </div>
              </details>
            </div>

            {/* ORIA iPad Remote */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              <details className="bg-gray-200 rounded-lg overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-300 transition-colors">
                  <span className="flex items-center gap-2 font-medium text-blue-600">
                    <span>📱</span> ORIA iPad Remote - <span className="text-red-500">New!</span> -
                  </span>
                  <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">−</span>
                </summary>
                <div className="p-4 bg-gray-200">
                  <p className="text-gray-700 mb-4">
                    ORIA miniのドライバーとソフトウェアインストーラー、およびユーザーマニュアルなどのドキュメントは、次のリンクから入手できます。
                  </p>
                  <p className="text-gray-700">
                    <a href="https://audient.com/products/monitor-controllers/oria-mini/downloads/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                      https://audient.com/products/monitor-controllers/oria-mini/downloads/
                    </a>
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* Bundle Software Section */}
      <section id="bundle" className="py-20 bg-[#1a1a1a]">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-white mb-2">ARC</h2>
            <h3 className="text-3xl font-bold text-white mb-4">フリー・ソフトウェア・バンドル</h3>
            <div className="flex justify-center mb-8">
              <div className="w-24 h-1 rounded-full bg-purple-600" />
            </div>
            <p className="text-gray-300 max-w-4xl mx-auto mb-2">
              Audientの対象製品をお使いのユーザーの方々は、下記のDAW & プラグイン・ソフトをフリー・ダウンロードしていただけます。
            </p>
            <p className="text-gray-400 text-sm">
              ※ フリー・ダウンロードしていただけるソフトウェアは、期間により変更されることがございます。予めご了承ください。
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            {/* Row 1: 3 products */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Softube Flow */}
              <div className="bg-[#f0f0f0] rounded-xl p-6">
                <div className="mb-4">
                  <Image src="/images/brands/audient/oria_mini/handlesoft_01.svg" alt="Softube" width={120} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/oria_mini/handlesoft_02.webp" alt="Softube Flow" width={300} height={180} className="w-full h-auto rounded-lg" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">Softube Flow® Mastering Suite- <span className="text-red-500">New!</span> -</h4>
                <p className="text-sm text-gray-600 mb-3">Mastering Suite</p>
                <p className="text-sm text-gray-700 mb-3">
                  Softube と提携して、音楽プロデューサーの時間と命を救う究極のツールである Flow® Mastering Suite の 1 か月間の無料トライアルを独占的にご提供します。
                </p>
                <p className="text-xs text-gray-500">
                  ARCに登録すると、１か月間の無料トライアルを独占的にご提供します。（*2025年10月8日まで）
                </p>
              </div>

              {/* GForce AXXESS */}
              <div className="bg-[#f0f0f0] rounded-xl p-6">
                <div className="mb-4">
                  <Image src="/images/brands/audient/oria_mini/handlesoft_03.svg" alt="GForce" width={120} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/oria_mini/handlesoft_04.webp" alt="GForce AXXESS" width={300} height={180} className="w-full h-auto rounded-lg" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">GForce AXXESS- <span className="text-red-500">New!</span> -</h4>
                <p className="text-sm text-gray-600 mb-3">Fat, Gnarly, Flexible, Poly Synth Plugin</p>
                <p className="text-sm text-gray-700 mb-3">
                  GForce AXXESSは、強力で使いやすい新しいシンセで、いくつかの優れた機能を備えています。パワフルなベース、高揚するリード、崇高なパッドをお楽しみください。
                </p>
                <p className="text-xs text-gray-500">
                  ARCに登録すると、独占無料永久ライセンスがご利用いただけます。（*2025年7月17日まで）
                </p>
              </div>

              {/* Strymon BigSky */}
              <div className="bg-[#f0f0f0] rounded-xl p-6">
                <div className="mb-4">
                  <Image src="/images/brands/audient/oria_mini/handlesoft_05.png" alt="Strymon" width={120} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/oria_mini/handlesoft_06.png" alt="BigSky" width={300} height={180} className="w-full h-auto rounded-lg" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">BigSky Plug-in</h4>
                <p className="text-sm text-gray-600 mb-3">Multidimensional Reverb Plugin from strymon®</p>
                <p className="text-sm text-gray-700 mb-3">
                  12のカスタムチューニングされた高解像度リバーブアルゴリズムを含む、Strymon BigSkyプラグインで、これまで想像したこともなかったリバーブサウンドを体験できます。
                </p>
                <p className="text-xs text-gray-500 mb-2">
                  ARCに登録すると、120日間の無料トライアルをお試しいただけます。（*2024年9月12日まで）
                </p>
                <a href="#" className="text-sm text-red-500 hover:underline">● 詳細はAUDIENT ARC BigSkyをご覧ください。</a>
              </div>
            </div>

            {/* Row 2: 3 products */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Cubase */}
              <div className="bg-[#f0f0f0] rounded-xl p-6">
                <div className="mb-4">
                  <Image src="/images/brands/audient/oria_mini/handlesoft_07.png" alt="Steinberg" width={120} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/oria_mini/handlesoft_08.png" alt="Cubase" width={300} height={180} className="w-full h-auto rounded-lg" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">Cubase™ & Cubasis™ LE 3</h4>
                <p className="text-sm text-gray-600 mb-3">Music creation software from Steinberg®</p>
                <p className="text-sm text-gray-700 mb-3">
                  Steinbergの大人気DAWソフトウェア。macOS、Windows、iOSでお使い頂けます。
                </p>
                <p className="text-xs text-gray-500">
                  ※ 現在、Cubasis LE3の対応機種は、evo4、iD4、iD4mkⅡの３機種です。これら以外の機種につきましては、今後のアップデートをお待ちください。
                </p>
              </div>

              {/* Retrologue */}
              <div className="bg-[#f0f0f0] rounded-xl p-6">
                <div className="mb-4">
                  <Image src="/images/brands/audient/oria_mini/handlesoft_09.png" alt="Steinberg" width={120} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/oria_mini/handlesoft_10.jpg" alt="Retrologue" width={300} height={180} className="w-full h-auto rounded-lg" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">Retrologue 2</h4>
                <p className="text-sm text-gray-600 mb-3">Classic analogue synth from Steinberg®</p>
                <p className="text-sm text-gray-700">
                  Steinbergのクラシック・アナログ（ヴァーチャル）・シンセサイザー
                </p>
              </div>

              {/* M-Tron Pro LE */}
              <div className="bg-[#f0f0f0] rounded-xl p-6">
                <div className="mb-4">
                  <Image src="/images/brands/audient/oria_mini/handlesoft_11.png" alt="GForce" width={120} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/oria_mini/handlesoft_12.png" alt="M-Tron Pro LE" width={300} height={180} className="w-full h-auto rounded-lg" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">M-Tron Pro LE</h4>
                <p className="text-sm text-gray-600 mb-3">Digital emulation of the classic Mellotron®</p>
                <p className="text-sm text-gray-700">
                  The Beatles、Yes、Led ZeppelinやThe Moody Bluesが使用した1960年代のMellotron®のエミュレーション・ソフトウェア。Audientユーザーはフルバージョンへのアップグレードが、通常の50% offで行えます。
                </p>
              </div>
            </div>

            {/* Row 3: 3 products */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Torpedo Wall of Sound */}
              <div className="bg-[#f0f0f0] rounded-xl p-6">
                <div className="mb-4">
                  <Image src="/images/brands/audient/oria_mini/handlesoft_13.png" alt="Two Notes" width={120} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/oria_mini/handlesoft_14.png" alt="Torpedo" width={300} height={180} className="w-full h-auto rounded-lg" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">Torpedo Wall of Sound™</h4>
                <p className="text-sm text-gray-600 mb-3">Highly realistic cab simulation from Two Notes®</p>
                <p className="text-sm text-gray-700">
                  キャビネット・シミュレーター・ソフトウェア。MesaBoogie、Fender、Ampegを含んだ８種類のキャビネット・シミュレーター。
                </p>
              </div>

              {/* Subito Piano */}
              <div className="bg-[#f0f0f0] rounded-xl p-6">
                <div className="mb-4">
                  <Image src="/images/brands/audient/oria_mini/handlesoft_15.svg" alt="Subito Piano" width={120} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/oria_mini/handlesoft_16.svg" alt="Subito Piano" width={300} height={180} className="w-full h-auto rounded-lg" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">Subito Piano</h4>
                <p className="text-sm text-gray-600 mb-3">Your tracks through a real grand piano</p>
                <p className="text-sm text-gray-700">
                  MIDIトラックをグランドピアノでの演奏に変更してくれます。
                </p>
              </div>

              {/* Waldorf Edition */}
              <div className="bg-[#f0f0f0] rounded-xl p-6">
                <div className="mb-4">
                  <Image src="/images/brands/audient/oria_mini/handlesoft_17.png" alt="Waldorf" width={120} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/oria_mini/handlesoft_18.png" alt="Waldorf Edition" width={300} height={180} className="w-full h-auto rounded-lg" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">Waldorf Edition 2 LE™</h4>
                <p className="text-sm text-gray-600 mb-3">Software emulations of classic Waldorf®</p>
                <p className="text-sm text-gray-700">
                  synth PPG Wave 2™、drum module Attack™、filter D-pole™のWaldorf®プロダクトをお使い頂けます。
                </p>
              </div>
            </div>

            {/* Row 4: 2 products */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Produce Like A Pro */}
              <div className="bg-[#f0f0f0] rounded-xl p-6">
                <div className="mb-4">
                  <Image src="/images/brands/audient/oria_mini/handlesoft_19.png" alt="Produce Like A Pro" width={150} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/oria_mini/handlesoft_20.png" alt="Produce Like A Pro" width={300} height={180} className="w-full h-auto rounded-lg" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">Produce Like A Pro™</h4>
                <p className="text-sm text-gray-600 mb-3">3 free online courses plus 10% off your next course</p>
                <p className="text-sm text-gray-700">
                  レコーディングやミキシングのオンライン講座（英語）です。
                </p>
              </div>

              {/* Loopcloud */}
              <div className="bg-[#f0f0f0] rounded-xl p-6">
                <div className="mb-4">
                  <Image src="/images/brands/audient/oria_mini/handlesoft_21.png" alt="Loopcloud" width={150} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/oria_mini/handlesoft_22.png" alt="Loopcloud" width={300} height={180} className="w-full h-auto rounded-lg" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">2GB of free samples</h4>
                <p className="text-sm text-gray-600 mb-3">Access the world&apos;s biggest library of samples</p>
                <p className="text-sm text-gray-700">
                  drum loops、synth loops、vocal loopsのパッケージがお使い頂けます。
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <a href="#" className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full transition-colors">
                ● ARCのご利用方法について、詳しくはこちらをご覧ください
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Specs Section */}
      <section id="specs" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gray-100 rounded-xl p-8">
              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-8">
                  {/* システム仕様 */}
                  <div className="border-b border-gray-300 pb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">システム仕様</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>アナログ入力チャンネル：2</p>
                      <p>アナログ出力チャンネル：3</p>
                      <p>デジタル入力チャンネル*：2</p>
                      <p>システム・サンプルレート：96kHz（デジタル入力用サンプルレート変換機能内蔵）</p>
                      <p className="text-xs text-gray-500 mt-2">*USB経由のオーディオストリーミングはできません。USBは電源と制御データのみに使用されます。</p>
                    </div>
                  </div>

                  {/* ライン入力からライン出力 */}
                  <div className="border-b border-gray-300 pb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">ライン入力からライン出力</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>最大入力レベル：+18dBu</p>
                      <p>ダイナミックレンジ（Aウェイト）：122.5dB</p>
                      <p>THD+N（-1dBFS）：-105dB/0.0005%</p>
                      <p>周波数特性（20Hz～40kHz）：±0.2dB</p>
                      <p>クロストーク（1kHz）：&lt; -118dB</p>
                    </div>
                  </div>

                  {/* デジタル入力 */}
                  <div className="border-b border-gray-300 pb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">デジタル入力</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>ステレオS/PDIF：44.1kHz～96kHz</p>
                    </div>
                  </div>

                  {/* Sonarworks 計測用マイク 技術仕様 */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Sonarworks 計測用マイク 技術仕様</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>マイクタイプ：エレクトレットコンデンサー型　トランスデューサータイプ：MEMS</p>
                      <p>周波数特性：20Hz～20kHz　指向特性：無指向性　出力インピーダンス：330Ω</p>
                      <p>感度：-40dBV/Pa</p>
                      <p>SNR：65dBA</p>
                      <p>ダイナミックレンジ：105dB</p>
                      <p>最大音圧レベル：125dBSPL</p>
                      <p>電源要件：+48Vファンタム電源　コネクタタイプ：3ピンXLR</p>
                      <p>重量：54g</p>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  {/* ライン入力（光入力経由） */}
                  <div className="border-b border-gray-300 pb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">ライン入力（光入力経由）</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>最大出力レベル：+18dBu</p>
                      <p>ダイナミックレンジ（Aウェイト）：127dB</p>
                      <p>THD+N（-1dBFS）：-113dB/0.0002%</p>
                      <p>周波数特性（20Hz &gt; FS/2*）：±0.1dB</p>
                      <p>クロストーク（1kHz）：&lt; -123dB</p>
                      <p className="text-xs text-gray-500 mt-2">*入力光信号のFS/2</p>
                    </div>
                  </div>

                  {/* USB-C */}
                  <div className="border-b border-gray-300 pb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">USB-C</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>コネクター：USB Type-C</p>
                      <p>バスパワー要件：0.9A @ 5V（USB 3.0ポート以上）</p>
                      <p>付属ケーブル：USB-C - 1m</p>
                    </div>
                  </div>

                  {/* サイズ */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">サイズ</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>180mm（幅）x 123mm（奥行き）x 46mm（高さ）</p>
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
    </div>
  )
}

