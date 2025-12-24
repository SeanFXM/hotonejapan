"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Download } from 'lucide-react'
import { BlogSlider } from "@/components/blog-slider"
import { downloadManual } from "@/lib/manual-download"

type Section = "concept" | "features" | "demo" | "controls" | "connections" | "manual" | "specs"

const navigationItems = [
  { id: "concept" as Section, label: "コンセプト" },
  { id: "features" as Section, label: "PCHの特長" },
  { id: "demo" as Section, label: "デモムービー" },
  { id: "controls" as Section, label: "コントロール" },
  { id: "connections" as Section, label: "主な接続例" },
  { id: "manual" as "manual", label: "取扱説明書", isDownload: true },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function PchPage() {
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
    downloadManual("strymon", "pch")
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
      const sections = navigationItems
        .filter((item) => !('isDownload' in item))
        .map((item) => item.id as Section)
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
          src="/images/brands/strymon/PCH/hero.jpg"
          alt="PCH"
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
                <p className="text-2xl font-bold text-gray-900">PCH</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">アクティブ DIボックス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-gray-900">
                  ¥46,500
                </p>
                <p className="text-xs text-gray-500">前後（税込）</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">0852571008622</p>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Image */}
            <div className="space-y-6">
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src="/images/brands/strymon/PCH/intro.jpg"
                  alt="PCH"
                  fill
                  className="rounded-xl shadow-2xl object-contain"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Right Column - Text */}
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Hear Everything.
                </h2>
                <h3 className="text-2xl md:text-3xl font-medium text-gray-700 mb-6">
                  すべてがクリアに聴こえます
                </h3>
                <div className="mb-8">
                  <div className="w-24 h-1 rounded-full bg-gradient-to-r from-purple-500 to-red-500" />
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-6">
                  PCHは、コンソール級のヘッドフォンアンプを内蔵した、超プレミアムなステレオ・アクティブ・ダイレクト・インターフェースです。ペダルボードのサウンドはPCHを通った後も一切変化しません。ヘッドフォンアンプ搭載で、自分のサウンドを誰かに確かめる必要もありません。きっと、その違いが分かるはずです。
                </p>
              </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-purple-600">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700 text-sm">２チャンネル設計 - ステレオまたはデュアルモノで使用可能</p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-purple-600">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700 text-sm">9VDCで動作 - 内部で24Vへ昇圧されるため、信号がクリップする心配がありません</p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-purple-600">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700 text-sm">ハイインピーダンスのヘッドフォンを駆動できるパワフルなヘッドフォンアンプを搭載</p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-purple-600">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700 text-sm">XLR出力はマイク/ラインレベルの切り替えが可能</p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-purple-600">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700 text-sm">XLR出力はグランドリフトの無効化が可能</p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-purple-600">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700 text-sm">スルー出力はサム出力を無効化が可能</p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-purple-600">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700 text-sm">内部電源は感電やグランドループを防ぐガルバニック絶縁カスタムトランスを使用</p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-purple-600">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700 text-sm">PCHは改造されたOjai電源デザインが採用</p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-purple-600">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700 text-sm">フラットな周波数特性</p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-purple-600">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700 text-sm">極めて低いTHD（全高調波歪み）</p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-purple-600">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700 text-sm">厚さ3mmのアルミ製外装＆シェルに5mmリブを装備したツアーに耐えうる堅牢構造</p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-purple-600">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700 text-sm">ヘッドホンのボリュームポットを保護しながら、容易なジャックへのアクセスを実現</p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-purple-600">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700 text-sm">高品質で長寿命のジャックとスイッチを採用</p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 scroll-mt-24 bg-concept-dark">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">PCHの特長</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full bg-blue-600" />
            </div>
          </div>

          <div className="max-w-7xl mx-auto space-y-16">
            {/* Feature 1 */}
            <div className="bg-gray-800/50 rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src="/images/brands/strymon/PCH/concept_01.jpg"
                    alt="ヘッドホンでステレオ・モニタリング"
                    fill
                    className="object-contain rounded-xl"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">ヘッドホンでステレオ・モニタリング</h3>
                  <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                    PCH にはレコーディング・コンソールクラスのヘッドフォン・アンプが搭載されており、ペダルの順序やコンポーネントに関係なく、リグ全体またはペダルボードのサウンドをフルステレオで容易にモニタリングでき、聴きながらのリハーサルが可能になります。
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-800/50 rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="relative w-full aspect-[4/3] lg:order-2">
                  <Image
                    src="/images/brands/strymon/PCH/concept_02.jpg"
                    alt="大きくてクリアなヘッドルーム"
                    fill
                    className="object-contain rounded-xl"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="p-8 lg:order-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">大きくてクリアなヘッドルーム</h3>
                  <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                    ペダルボードの出力をDIに接続することは、ベースやギターを直接DIに接続するのとは全く異なります。ペダルボードは非常に大きな信号を出力するため、一般的なダイレクト・ボックスの入力を圧倒してしまうほどです。PCHは9VDC電源を内部で24Vに昇圧しているので、パワフルな入力音をクリアに処理できる十分なヘッドルームを備えており、常に最高のサウンドが得られます。
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-800/50 rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="grid grid-cols-3 gap-4">
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src="/images/brands/strymon/PCH/concept_03.jpg"
                      alt="どんな楽器にも対応 1"
                      fill
                      className="object-contain rounded-xl"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src="/images/brands/strymon/PCH/concept_04.jpg"
                      alt="どんな楽器にも対応 2"
                      fill
                      className="object-contain rounded-xl"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src="/images/brands/strymon/PCH/concept_05.jpg"
                      alt="どんな楽器にも対応 3"
                      fill
                      className="object-contain rounded-xl"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">どんな楽器にも対応</h3>
                  <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                    演奏する楽器や音楽のジャンルに関係なく、アンバランス出力を PA、レコーディング・インターフェイス、またはフラット・レスポンスのスピーカー・システムへの直接接続する必要がある場合、PCH は完全にクリアでクリーンなステレオ・ダイレクト・インターフェイスの究極の選択肢です。また、内蔵ヘッドフォン・アンプを介してモニターできる唯一のインターフェイスでもあります。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Movie Section */}
      <section id="demo" className="py-20 scroll-mt-24 bg-white">
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
                  src="https://www.youtube.com/embed/D9aFSUlnPfo"
                  title="PCH Demo Video 1"
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
                  src="https://www.youtube.com/embed/-aDu-kshjMY"
                  title="PCH Demo Video 2"
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

      {/* Controls Section */}
      <section id="controls" className="py-20 scroll-mt-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">コントロール</h2>
            <div className="flex justify-center">
              <div className="w-20 h-1 rounded bg-blue-600" />
            </div>
          </div>

          <div className="max-w-5xl mx-auto mb-12">
            <div className="flex justify-center">
              <div className="relative w-full max-w-2xl">
                <Image
                  src="/images/brands/strymon/PCH/control_01.png"
                  alt="Controls"
                  width={800}
                  height={600}
                  className="rounded-lg w-full"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto space-y-12">
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
                1/4インチ アンバランス、左右TS、ハイインピーダンス入力。ギター、ベース、キーボード、アンプ＆キャブ シミュレーションペダル、モデラーなど、モノラル2つまたはステレオ1つの音源を接続できます。
              </p>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11 mt-2">
                モノラル入力として使用する場合は左入力のみ、ステレオ入力として使用する場合は左入力と右入力の両方に接続してください。
              </p>
            </div>

            {/* THRU */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">THRU</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11">
                1/4 インチ アンバランス、左右の TS 出力。バッファリングされた入力ソースをアンプ、エフェクト、その他のデバイスに渡します。モノラルまたはステレオの THRU 出力には、SUM (THRU) スイッチを使用します。
              </p>
            </div>

            {/* PHONES */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">PHONES</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11">
                ヘッドフォンを接続すると、入力ソースを正確にステレオでモニタリングできます。
              </p>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11 mt-2">
                ノブはヘッドホンの音量を調整するために使用します。
              </p>
            </div>

            {/* SUM ボタン */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">SUM ボタン</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11">
                ステレオソースを左右両方の入力に接続する場合、SUMスイッチをオフにしてステレオTHRU出力にしてください。または、SUMスイッチをオンにしてステレオ入力をモノラル信号にマージし、両方のTHRU出力に送ります。
              </p>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11 mt-2">
                左入力のみに接続した場合、モノラル信号はSUMスイッチの影響を受けず、両方のTHRU出力にルーティングされます。
              </p>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11 mt-2 italic">
                ※ XLR出力はSUMスイッチの影響を受けません。
              </p>
            </div>

            {/* POWER */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">POWER</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11">
                アダプターを接続します。PCHはアクティブデバイスであるため、電源接続が必要です。定格9VDC、センターマイナス、500mA以上の電源アダプター（別売）をご使用ください。
              </p>
            </div>

            {/* LEFT OUT & RIGHT OUT */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">LEFT OUT & RIGHT OUT</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11">
                バランス型低インピーダンス出力。ミキシングコンソールなどの低インピーダンス機器に接続することで、ソース入力のノイズや歪みを最小限に抑えることができます。
              </p>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11 mt-2">
                左1/4インチ入力のみに接続した場合、モノラル入力は両方のXLR出力にルーティングされます。
              </p>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11 mt-2">
                ステレオソースを左と右の両方の1/4インチ入力に接続した場合、ステレオ信号は左と右のXLR出力にルーティングされます。
              </p>
            </div>

            {/* GROUND ボタン */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">GROUND ボタン</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11">
                XLR 出力でハムノイズが発生する場合は、「lift」の位置に押してアースを解除します。
              </p>
            </div>

            {/* LEVEL ボタン */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">LEVEL ボタン</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg ml-11">
                マイクレベルのXLR出力の場合は「mic」の位置に押します。ラインレベルのXLR出力の場合は「line」の位置に設定します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Connection Examples Section */}
      <section id="connections" className="py-20 scroll-mt-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">主な接続例</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full bg-blue-600" />
            </div>
            <p className="text-gray-700 text-base md:text-lg mt-6 max-w-3xl mx-auto">
              PCH のさまざまな使用方法については、以下の図をご覧ください。
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="space-y-12">
              {/* Connection Example 1 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900">接続例１</h3>
                </div>
                <div className="p-6">
                  <div className="relative w-full aspect-[16/9] bg-gray-50 rounded-lg">
                    <Image
                      src="/images/brands/strymon/PCH/connection_01.png"
                      alt="接続例１"
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 80vw"
                    />
                  </div>
                </div>
              </div>

              {/* Connection Example 2 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900">接続例２</h3>
                </div>
                <div className="p-6">
                  <div className="relative w-full aspect-[16/9] bg-gray-50 rounded-lg">
                    <Image
                      src="/images/brands/strymon/PCH/connection_02.png"
                      alt="接続例２"
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 80vw"
                    />
                  </div>
                </div>
              </div>

              {/* Connection Example 3 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900">接続例３</h3>
                </div>
                <div className="p-6">
                  <div className="relative w-full aspect-[16/9] bg-gray-50 rounded-lg">
                    <Image
                      src="/images/brands/strymon/PCH/connection_03.png"
                      alt="接続例３"
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 80vw"
                    />
                  </div>
                </div>
              </div>

              {/* Connection Example 4 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900">接続例４</h3>
                </div>
                <div className="p-6">
                  <div className="relative w-full aspect-[16/9] bg-gray-50 rounded-lg">
                    <Image
                      src="/images/brands/strymon/PCH/connection_04.png"
                      alt="接続例４"
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 80vw"
                    />
                  </div>
                </div>
              </div>

              {/* Connection Example 5 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900">接続例５</h3>
                </div>
                <div className="p-6">
                  <div className="relative w-full aspect-[16/9] bg-gray-50 rounded-lg">
                    <Image
                      src="/images/brands/strymon/PCH/connection_05.png"
                      alt="接続例５"
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 80vw"
                    />
                  </div>
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
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
              <div className="space-y-12">
                {/* インプット */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">インプット</h3>
                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">入力インピーダンス</span>
                      <span className="text-gray-900 font-medium text-base">1 Meg Ohm</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">最大入力レベル</span>
                      <span className="text-gray-900 font-medium text-base">+20 dBu</span>
                    </div>
                  </div>
                </div>

                {/* ヘッドホン */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">ヘッドホン</h3>
                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">出力インピーダンス</span>
                      <span className="text-gray-900 font-medium text-base">2 Ohm</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">周波数特性</span>
                      <span className="text-gray-900 font-medium text-base">+/- 0.25dB, 10Hz - 80kHz</span>
                    </div>
                  </div>
                </div>

                {/* スルー */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">スルー</h3>
                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">出力インピーダンス</span>
                      <span className="text-gray-900 font-medium text-base">100 Ohm</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">SNR</span>
                      <span className="text-gray-900 font-medium text-base">+135dB（Aウェイト）</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">ノイズフロア</span>
                      <span className="text-gray-900 font-medium text-base">-115dBV（10-22kHz、Aウェイトなし）</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">入力に対するゲイン</span>
                      <span className="text-gray-900 font-medium text-base">+0dB</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">周波数特性</span>
                      <span className="text-gray-900 font-medium text-base">+/- 0.25dB、10Hz - 80kHz+</span>
                    </div>
                  </div>
                </div>

                {/* XLR出力（LINE 設定時） */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">XLR出力（LINE 設定時）</h3>
                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">出力インピーダンス</span>
                      <span className="text-gray-900 font-medium text-base">275 Ohm</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">SNR</span>
                      <span className="text-gray-900 font-medium text-base">+130dB（Aウェイト）</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">ノイズフロア</span>
                      <span className="text-gray-900 font-medium text-base">-110dBV（10-22kHz、Aウェイトなし）</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">入力に対するゲイン</span>
                      <span className="text-gray-900 font-medium text-base">+0dB</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">最大出力レベル</span>
                      <span className="text-gray-900 font-medium text-base">+20dBu</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">周波数特性</span>
                      <span className="text-gray-900 font-medium text-base">+/- 0.25dB、10Hz - 80kHz+</span>
                    </div>
                  </div>
                </div>

                {/* XLR出力（MIC 設定時） */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">XLR出力（MIC 設定時）</h3>
                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">出力インピーダンス</span>
                      <span className="text-gray-900 font-medium text-base">100 Ω</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">入力に対するゲイン</span>
                      <span className="text-gray-900 font-medium text-base">-20dB</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">最大出力レベル</span>
                      <span className="text-gray-900 font-medium text-base">+0.0dBu</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">SNR</span>
                      <span className="text-gray-900 font-medium text-base">+125dB</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">ノイズフロア</span>
                      <span className="text-gray-900 font-medium text-base">-125 dBV (10-22kHz、Aウェイトなし)</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">周波数特性</span>
                      <span className="text-gray-900 font-medium text-base">+/- 0.25dB、10Hz - 80kHz+</span>
                    </div>
                  </div>
                </div>

                {/* その他 */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">その他</h3>
                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">入力電圧</span>
                      <span className="text-gray-900 font-medium text-base">9VDC センターマイナス、500mA</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">サイズ</span>
                      <span className="text-gray-900 font-medium text-base">133mm（幅）×90mm（縦）×48mm（高）</span>
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

