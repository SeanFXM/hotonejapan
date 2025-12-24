"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from 'lucide-react'
import { BlogSlider } from "@/components/blog-slider"

type Section = "concept" | "demo" | "sound" | "control" | "connections" | "specs"

const navigationItems = [
  { id: "concept" as Section, label: "コンセプト" },
  { id: "demo" as Section, label: "デモムービー" },
  { id: "sound" as Section, label: "デモサウンド" },
  { id: "control" as Section, label: "コントロール" },
  { id: "connections" as Section, label: "接続例" },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function BritwindPage() {
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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] overflow-hidden">
        <Image
          src="/images/brands/hotone/BRITWIND/hero.jpg"
          alt="BRITWIND"
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
                <p className="text-2xl font-bold text-gray-900">BRITWIND</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">ペダル型ギターアンプ・ヘッド</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-hotone">¥30,800</p>
                <p className="text-xs text-gray-500">前後（税込）</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">6959473901205</p>
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
            ))}
          </div>
        </div>
      </nav>

      {/* Concept Section */}
      <section id="concept" className="py-20 scroll-mt-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              792gから叩き出される
            </h2>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              75W / 2ch ブリティッシュ・ギターアンプ
            </h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Image */}
            <div>
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src="/images/brands/hotone/BRITWIND/intro.jpg"
                  alt="BRITWIND"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>

              {/* 関連情報 */}
              <div className="mt-8 pt-6 border-t border-gray-300">
                <h4 className="text-sm font-bold text-gray-900 mb-4">関連情報</h4>
                <div className="space-y-2">
                  <a href="/brands/hotone/products/mojo-attack" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span>MOJO ATTACK 製品情報</span>
                  </a>
                  <a href="/brands/hotone/products/spc-cable" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span>SPC スピーカー・ケーブル 製品情報</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Description */}
            <div className="space-y-6">
              <p className="text-sm text-gray-500 uppercase tracking-wider">hotone binary amp</p>
              <p className="text-gray-700 leading-relaxed">
                カリフォルニアを代表するFenderスタイルのビンテージとハイゲイン、2タイプのプリアンプに75Wの強力なパワーアンプを装備しました。800g切る重量と大型歪みペダル並みのサイズ、ペダルボードにそのままマウントできるフロアー・ストンプスタイルの2チャンネルアンプです。
              </p>
              <p className="text-gray-700 leading-relaxed">
                入力段にOn/Off付き+12dBクリーンブーストを備え、異なるチャンネルゲインでのサウンドバリエーションに対応します。また、ライブでのチャンネル切り替えや内臓デジタルリバーブのOn/Offもインスタントなスイッチングが可能です。本機はエフェクターループも備えているため、ペダルボード上で全ての接続が完結できます。従来のアンプエフェクトループへの接続用に長いケーブルを持ち歩く必要がありません。
              </p>
              <p className="text-gray-700 leading-relaxed">
                ライン出力も充実しており、XLRと1/4&quot;の両バランス出力を備え、On/Offスイッチ付きキャビネットエミュレーション回路（アナログ4x12インチ・エミュレーション）も備えています。本機アンプをモニター用に、レコーディングやライブをラインから出力することもできます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Movie Section */}
      <section id="demo" className="py-20 scroll-mt-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">デモムービー</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/hJEFS8SYIUk"
                title="BRITWIND Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Sound Section */}
      <section id="sound" className="py-16 scroll-mt-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">デモサウンド</h2>
            <div className="flex justify-center mt-4">
              <div className="w-16 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-lg">🎵</span>
                  <p className="font-medium text-gray-900 text-sm">BRIT WIND（CH.A with Reverb）Intro</p>
                </div>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/BRITWIND/sound_01.mp3" type="audio/mpeg" />
                </audio>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-lg">🎵</span>
                  <p className="font-medium text-gray-900 text-sm">BRIT WIND（CH.A）01</p>
                </div>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/BRITWIND/sound_02.mp3" type="audio/mpeg" />
                </audio>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-lg">🎵</span>
                  <p className="font-medium text-gray-900 text-sm">BRIT WIND（CH.A）02</p>
                </div>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/BRITWIND/sound_03.mp3" type="audio/mpeg" />
                </audio>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-lg">🎵</span>
                  <p className="font-medium text-gray-900 text-sm">BRIT WIND（CH.A）03</p>
                </div>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/BRITWIND/sound_04.mp3" type="audio/mpeg" />
                </audio>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-lg">🎵</span>
                  <p className="font-medium text-gray-900 text-sm">BRIT WIND（CH.A）04</p>
                </div>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/BRITWIND/sound_05.mp3" type="audio/mpeg" />
                </audio>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-lg">🎵</span>
                  <p className="font-medium text-gray-900 text-sm">BRIT WIND（Ch.B with Boost）05</p>
                </div>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/BRITWIND/sound_06.mp3" type="audio/mpeg" />
                </audio>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-lg">🎵</span>
                  <p className="font-medium text-gray-900 text-sm">BRIT WIND（CH.A）06</p>
                </div>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/BRITWIND/sound_07.mp3" type="audio/mpeg" />
                </audio>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-lg">🎵</span>
                  <p className="font-medium text-gray-900 text-sm">BRIT WIND（CH.A）07</p>
                </div>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/BRITWIND/sound_08.mp3" type="audio/mpeg" />
                </audio>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-lg">🎵</span>
                  <p className="font-medium text-gray-900 text-sm">BRIT WIND（CH.B）08</p>
                </div>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/BRITWIND/sound_09.mp3" type="audio/mpeg" />
                </audio>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-lg">🎵</span>
                  <p className="font-medium text-gray-900 text-sm">BRIT WIND（CH.B）09</p>
                </div>
                <audio controls className="w-full h-10">
                  <source src="/images/brands/hotone/BRITWIND/sound_10.mp3" type="audio/mpeg" />
                </audio>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Control Section */}
      <section id="control" className="py-20 scroll-mt-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">コントロール</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8">
              <div className="space-y-8">
                <div>
                  <Image
                    src="/images/brands/hotone/BRITWIND/control_01.png"
                    alt="BRITWIND Top Panel"
                    width={1000}
                    height={400}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="border-t border-gray-200 pt-8">
                  <Image
                    src="/images/brands/hotone/BRITWIND/control_02.png"
                    alt="BRITWIND Back Panel"
                    width={1000}
                    height={400}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connections Section */}
      <section id="connections" className="py-20 scroll-mt-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">接続例</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            <Image
              src="/images/brands/hotone/BRITWIND/connection_01.png"
              alt="BRITWIND Connection Example"
              width={1200}
              height={600}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Specs Section */}
      <section id="specs" className="py-20 scroll-mt-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h3 className="text-base font-bold text-gray-900 mb-4 border-b border-gray-900 pb-2">
                入出力、その他
              </h3>
              <div className="space-y-0">
                <div className="py-3 border-b border-gray-200">
                  <p className="text-gray-700 text-sm">出力：75W @ 4Ω、40W @ 8Ω、20W @ 16Ω</p>
                </div>
                <div className="py-3 border-b border-gray-200">
                  <p className="text-gray-700 text-sm">サイズ：190（D）x 118.5（W）x 53.5（H）mm</p>
                </div>
                <div className="py-3 border-b border-gray-200">
                  <p className="text-gray-700 text-sm">重量：792g</p>
                </div>
                <div className="py-3 border-b border-gray-200">
                  <p className="text-gray-700 text-sm">アダプターサイズ：125（D）x 50（W）x 31（H）mm</p>
                </div>
                <div className="py-3 border-b border-gray-200">
                  <p className="text-gray-700 text-sm">電源ケーブル長（アダプターも含む）：2.23m</p>
                </div>
                <div className="py-3 border-b border-gray-200">
                  <p className="text-gray-700 text-sm">アダプター重量：360g（ケーブル含む）</p>
                </div>
              </div>
              <div className="mt-6 space-y-1">
                <p className="text-gray-500 text-xs">※製品の仕様及びデザインは改良のため予告なく変更することがあります。</p>
                <p className="text-gray-500 text-xs">※本製品以外の製品名および会社名は、各社の商号、登録商標または商標です。本文中で使用している名称は、音色の傾向をお伝えする目的で使用しております。</p>
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

