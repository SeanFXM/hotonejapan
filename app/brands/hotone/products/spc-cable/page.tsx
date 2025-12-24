"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from 'lucide-react'
import { BlogSlider } from "@/components/blog-slider"

type Section = "concept" | "lineup"

const navigationItems = [
  { id: "concept" as Section, label: "コンセプト" },
  { id: "lineup" as Section, label: "ラインナップ" },
]

export default function SpcCablePage() {
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
          src="/images/brands/hotone/SPC_CABLE/hero.jpg"
          alt="SPC"
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
                <p className="text-2xl font-bold text-gray-900">SPC</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">スピーカー・ケーブル</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">ラインナップを参照</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">ラインナップを参照</p>
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
              Nano Legacy Floorに最適な
            </h2>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              スピーカー・ケーブル
            </h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Image */}
            <div className="rounded-2xl overflow-hidden bg-gray-200">
              <Image
                src="/images/brands/hotone/SPC_CABLE/intro.jpg"
                alt="SPC Cable"
                width={600}
                height={500}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Right Column - Description */}
            <div className="space-y-6">
              <p className="text-sm text-gray-500 uppercase tracking-wider">hotone binary amp</p>
              <p className="text-gray-700 leading-relaxed text-lg">
                足元に設置したNANO LEGACY FLOORアンプから、スピーカー・キャビネットへの接続に便利なスピーカー・ケーブル（3m / 5m）です。
              </p>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Nano Legacy Floor Ampシリーズに最適なスピーカーケーブル</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">透明感あるサウンドの、高品位ケーブル</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">長距離の信号伝送でも劣化の少ないデザイン</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">15AWGのツイストペア構造＆心線には無酸銅を使用</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">耐久性のある1/4インチの金属製ジャック</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">3mと5mのラインナップ</span>
                </li>
              </ul>

              {/* 関連情報 */}
              <div className="mt-8 pt-6 border-t border-gray-300">
                <h4 className="text-sm font-bold text-gray-900 mb-4">関連情報</h4>
                <div className="space-y-2">
                  <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span>BRITWIND 製品情報</span>
                  </a>
                  <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span>MOJO ATTACK 製品情報</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lineup Section */}
      <section id="lineup" className="py-20 scroll-mt-24 bg-gray-600">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* SPC-3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="bg-gray-400 px-6 py-3">
                <h3 className="text-xl font-bold text-white">SPC-3</h3>
              </div>
              <div className="p-6">
                <div className="bg-white flex items-center justify-center mb-6">
                  <Image
                    src="/images/brands/hotone/SPC_CABLE/spc3.jpg"
                    alt="SPC-3"
                    width={300}
                    height={400}
                    className="object-contain"
                  />
                </div>
                <div className="space-y-2 text-gray-700">
                  <p><span className="font-medium">プラグ：</span>1/4インチ・フォーン</p>
                  <p><span className="font-medium">長さ：</span>3m</p>
                  <p><span className="font-medium">価格：</span>オープンプライス</p>
                  <p><span className="font-medium">参考価格：</span>¥3,850（税別）</p>
                  <p><span className="font-medium">JAN：</span>6959473950135</p>
                </div>
              </div>
            </div>

            {/* SPC-5 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="bg-gray-400 px-6 py-3">
                <h3 className="text-xl font-bold text-white">SPC-5</h3>
              </div>
              <div className="p-6">
                <div className="bg-white flex items-center justify-center mb-6">
                  <Image
                    src="/images/brands/hotone/SPC_CABLE/spc5.jpg"
                    alt="SPC-5"
                    width={300}
                    height={400}
                    className="object-contain"
                  />
                </div>
                <div className="space-y-2 text-gray-700">
                  <p><span className="font-medium">プラグ：</span>1/4インチ・フォーン</p>
                  <p><span className="font-medium">長さ：</span>5m</p>
                  <p><span className="font-medium">価格：</span>オープンプライス</p>
                  <p><span className="font-medium">参考価格：</span>¥4,950（税別）</p>
                  <p><span className="font-medium">JAN：</span>6959473950142</p>
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

