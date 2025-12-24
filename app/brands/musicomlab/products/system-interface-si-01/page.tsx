"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Download } from 'lucide-react'
import { BlogSlider } from "@/components/blog-slider"
import { downloadManual } from "@/lib/manual-download"

type Section = "intro" | "block-diagram" | "connections" | "manual" | "specs"

const navigationItems = [
  { id: "intro" as Section, label: "コンセプト" },
  { id: "block-diagram" as Section, label: "ブロック図" },
  { id: "connections" as Section, label: "接続例と設定" },
  { id: "manual" as "manual", label: "取扱説明書", isDownload: true },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function SystemInterfaceSi01Page() {
  const [activeSection, setActiveSection] = useState<Section>("intro")
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
    downloadManual("musicomlab", "system-interface-si-01")
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
          src="/images/brands/musicomlab/SYSTEM-INTERFACE-SI-01/hero.jpg"
          alt="SYSTEM INTERFACE SI-01"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        <div className="relative container mx-auto px-6 h-full flex items-center justify-end">
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-white/30 w-96">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 tracking-wider">MUSICOMLAB</h1>
            </div>

            <div className="space-y-4 text-gray-900">
              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">製品名：</p>
                <p className="text-2xl font-bold text-gray-900">SYSTEM INTERFACE SI-01</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">デュアル・バッファー</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-gray-900">
                  ¥29,480
                </p>
                <p className="text-xs text-gray-500">前後（税込）</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">8809425664970</p>
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

      {/* Intro Section */}
      <section id="intro" className="py-20 scroll-mt-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              ペダルボードの音質を圧倒的に向上させる、入出力バッファー
            </h2>
            <p className="text-lg text-gray-600 mb-4">musicomlab efx mk-v</p>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full bg-blue-600" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Product Image */}
            <div className="space-y-6">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/brands/musicomlab/SYSTEM-INTERFACE-SI-01/intro.jpg"
                  alt="SYSTEM INTERFACE SI-01 Introduction"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Column - Product Description */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">SYSTEM INTERFACE SI-01</h3>

                <div className="prose max-w-none mb-8">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    ペダルボードの音質を圧倒的に向上させる、システムインターフェース「SI-01」の登場です。
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    システムインターフェース（SI-01）は、ディスクリートClass-AとローノイズOp-Ampを用いた異なる2種類のバッファーアンプを備えており、インピーダンスのミスマッチングとケーブル静電容量から起こる、高帯域とローエンド迫力減を改善します。より良いギタートーンでプレイするために、ペダル接続の前後にSI-01を挿入することをお勧めします。
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    FuzzやWahペダルの中には、バッファー使用が適さないモデルがあります。それの解決策として、バッファー1(Buffer 1)はバイパスできるように設計しました。又、2つのバッファーを同シグナルチェーンで使用すると、グランドハムやノイズの問題が出ることがあります。これを避けるために、2つ目のバッファー(Buffer 2)は、独立電源で動作するようにデザインしました。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block Diagram Section */}
      <section id="block-diagram" className="py-20 scroll-mt-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">ブロック図</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full bg-blue-600" />
            </div>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center">
              <Image
                src="/images/brands/musicomlab/SYSTEM-INTERFACE-SI-01/block.jpg"
                alt="ブロック図"
                width={600}
                height={400}
                className="rounded-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Connections Section */}
      <section id="connections" className="py-20 scroll-mt-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">接続例と設定</h2>
            <div className="flex justify-center">
              <div className="w-20 h-1 rounded bg-blue-600" />
            </div>
          </div>

          <div className="max-w-7xl mx-auto space-y-16">
            {/* 1. 基本的な接続例 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">基本的な接続例</h3>
              <div className="flex justify-center">
                <Image
                  src="/images/brands/musicomlab/SYSTEM-INTERFACE-SI-01/connect_01.jpg"
                  alt="基本的な接続例"
                  width={1600}
                  height={800}
                  className="w-full max-w-3xl"
                />
              </div>
            </div>

            {/* 2. ファズの接続例（1） */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">ファズの接続例（1）</h3>
              <div className="flex justify-center">
                <Image
                  src="/images/brands/musicomlab/SYSTEM-INTERFACE-SI-01/connect_02.jpg"
                  alt="ファズの接続例（1）"
                  width={1600}
                  height={800}
                  className="w-full max-w-3xl"
                />
              </div>
            </div>

            {/* 3. ファズの接続例（2） */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">ファズの接続例（2）</h3>
              <div className="flex justify-center">
                <Image
                  src="/images/brands/musicomlab/SYSTEM-INTERFACE-SI-01/connect_03.jpg"
                  alt="ファズの接続例（2）"
                  width={1600}
                  height={800}
                  className="w-full max-w-3xl"
                />
              </div>
            </div>

            {/* 4. インピーダンス補正 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">インピーダンス補正</h3>
              <div className="flex justify-center">
                <Image
                  src="/images/brands/musicomlab/SYSTEM-INTERFACE-SI-01/connect_04.jpg"
                  alt="インピーダンス補正"
                  width={1600}
                  height={800}
                  className="w-full max-w-3xl"
                />
              </div>
            </div>

            {/* 5. チューナーの接続例 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">チューナーの接続例</h3>
              <div className="flex justify-center">
                <Image
                  src="/images/brands/musicomlab/SYSTEM-INTERFACE-SI-01/connect_05.jpg"
                  alt="チューナーの接続例"
                  width={1600}
                  height={800}
                  className="w-full max-w-3xl"
                />
              </div>
            </div>

            {/* 6. チューナー＆ファズの接続例 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">チューナー＆ファズの接続例</h3>
              <div className="flex justify-center">
                <Image
                  src="/images/brands/musicomlab/SYSTEM-INTERFACE-SI-01/connect_06.jpg"
                  alt="チューナー＆ファズの接続例"
                  width={1600}
                  height={800}
                  className="w-full max-w-3xl"
                />
              </div>
            </div>

            {/* 7. AMP FX ループへの接続例 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">AMP FX ループへの接続例</h3>
              <div className="flex justify-center">
                <Image
                  src="/images/brands/musicomlab/SYSTEM-INTERFACE-SI-01/connect_07.jpg"
                  alt="AMP FX ループへの接続例"
                  width={1600}
                  height={800}
                  className="w-full max-w-3xl"
                />
              </div>
            </div>

            {/* 8. IN1＆OUT1を使用しない接続例 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">IN1＆OUT1を使用しない接続例</h3>
              <div className="flex justify-center">
                <Image
                  src="/images/brands/musicomlab/SYSTEM-INTERFACE-SI-01/connect_08.jpg"
                  alt="IN1＆OUT1を使用しない接続例"
                  width={1600}
                  height={800}
                  className="w-full max-w-3xl"
                />
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
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
              {/* Left Column - INPUT / OUTPUT セクション */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-3">
                  INPUT / OUTPUT セクション
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-col border-b border-gray-200 pb-3">
                    <span className="text-gray-600 text-sm mb-1">IN1/IN2　入力インピーダンス</span>
                    <span className="text-gray-900 font-medium">1MΩ</span>
                  </div>
                  <div className="flex flex-col border-b border-gray-200 pb-3">
                    <span className="text-gray-600 text-sm mb-1">OUT1/OUT2　出力インピーダンス</span>
                    <span className="text-gray-900 font-medium">100Ω</span>
                  </div>
                  <div className="flex flex-col border-b border-gray-200 pb-3">
                    <span className="text-gray-600 text-sm mb-1">Buffer 1 最大信号レベル</span>
                    <span className="text-gray-900 font-medium">+8dB</span>
                  </div>
                  <div className="flex flex-col pb-3">
                    <span className="text-gray-600 text-sm mb-1">Buffer 2 最大信号レベル</span>
                    <span className="text-gray-900 font-medium">+18dB</span>
                  </div>
                </div>
              </div>

              {/* Right Column - 電源、サイズ */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-3">
                  電源、サイズ
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-col border-b border-gray-200 pb-3">
                    <span className="text-gray-600 text-sm mb-1">電源</span>
                    <span className="text-gray-900 font-medium">DC9Vセンターマイナス、電源は別売（メーカー純正品はありませんので、「strymon Ojai」等をご使用ください）</span>
                  </div>
                  <div className="flex flex-col border-b border-gray-200 pb-3">
                    <span className="text-gray-600 text-sm mb-1">消費電流</span>
                    <span className="text-gray-900 font-medium">最大45mA</span>
                  </div>
                  <div className="flex flex-col border-b border-gray-200 pb-3">
                    <span className="text-gray-600 text-sm mb-1">サイズ</span>
                    <span className="text-gray-900 font-medium">72mm（W） x 113mm（D） x 31mm（H）</span>
                  </div>
                  <div className="flex flex-col pb-3">
                    <span className="text-gray-600 text-sm mb-1">重量</span>
                    <span className="text-gray-900 font-medium">180g</span>
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
          href="/brands/musicomlab"
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

