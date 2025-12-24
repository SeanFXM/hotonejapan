"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Download, ChevronDown, ChevronUp } from 'lucide-react'
import { downloadManual } from "@/lib/manual-download"

type Section = "intro" | "concept" | "manual" | "specs"

const navigationItems = [
  { id: "intro" as Section, label: "イントロ" },
  { id: "concept" as Section, label: "コンセプト" },
  { id: "manual" as "manual", label: "取扱説明書", isDownload: true },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function EvoStarterBundlePage() {
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
    downloadManual("audient", "evostarterbundle")
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
          src="/images/brands/audient/evo_Starter_bundle/hero.jpg"
          alt="evo スターターバンドル"
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
                <p className="text-2xl font-bold text-gray-900">evo スターターバンドル</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">オーディオ・インターフェース・セット</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-gray-900">
                  ¥36,300 前後(税込)
                </p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">5060374260412</p>
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
          <div className="flex items-center justify-center gap-8 overflow-x-auto py-4">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.isDownload) {
                    handleManualDownload()
                  } else {
                    scrollToSection(item.id as Section)
                  }
                }}
                className={`flex-shrink-0 px-4 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? "text-purple-600 border-b-2 border-purple-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Intro Section */}
      <section id="intro" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">USB オーディオ・インターフェイス</h2>
              <h3 className="text-2xl font-bold text-gray-700 mb-6">スターターバンドル</h3>
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
                    src="https://www.youtube.com/embed/BHlada3ZJxA"
                    title="EVO Starter Bundle Feature Overview"
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
                      <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-900">audient製品 OS対応状況のお知らせ</span>
                    </a>
                    <a href="#" className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200 block">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.834 5c-.096-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182-.233-.23-.389-.262-.465-.262h-.834a6.008 6.008 0 011.899 4.588 6.002 6.002 0 01-2.299-.588zM6.666 9a6.002 6.002 0 01-1.899-4.588 6.008 6.008 0 011.899-4.588h.834c.076 0 .232.032.465.262.238.234.497.623.737 1.182.389.907.673 2.142.766 3.556H6.666zm6.291 0H9.25c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262h.834a6.008 6.008 0 01-1.899-4.588 6.002 6.002 0 012.299.588zm-6.291 2h3.936c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262h.834a6.002 6.002 0 01-1.899 4.588 6.008 6.008 0 01-1.899-4.588zm-2.582 4c-.765 1.36-2.722 1.36-3.486 0l-5.58-9.92c-.75-1.334.213-2.98 1.742-2.98h11.164c1.53 0 2.493 1.646 1.743 2.98l-5.58 9.92z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-900">evoシリーズ 特設サイト</span>
                    </a>
                    <a href="#" className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200 block">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-900">役に立つオーディオ・インターフェイス講座 〜 Part.1 〜「evoって？」</span>
                    </a>
                    <a href="#" className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200 block">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-900">役に立つオーディオ・インターフェイス講座 〜 Part.2 〜「iPhone と evo Starter Bundle で音の良い配信動画を作ってみよう！」</span>
                    </a>
                    <a href="#" className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200 block">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-900">AUDIENT：サポート窓口</span>
                    </a>
                    <a href="#" className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200 block">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-900">AUDIENT：ユーザー登録</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column - Product Description and Set Contents */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">EVO スターターバンドルでレコーディングを始めよう</h3>

                  <div className="prose max-w-none mb-6">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      EVO スターターバンドルでサウンドレコーディングの世界へ飛び込もう。これさえあれば、プロのようなクオリティのホームレコーディングがすぐに始められます。Audientが培ってきた高い技術と性能で、ワンランク上のオーディオ体験を。
                    </p>
                  </div>

                  {/* Set Contents */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">セット内容</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-purple-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">evo 4 オーディオ・インターフェース</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-purple-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">evo SR1コンデンサーマイク</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-purple-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">evo SR1専用ショックマウント</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-purple-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">evo SR2000モニタリングヘッドフォン</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-purple-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">XLR マイクケーブル</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Concept Section */}
      <section id="concept" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What's Included</h2>
              <div className="flex justify-center mb-6">
                <div className="w-24 h-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500" />
              </div>
              <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
                evo スターターバンドルには、ご購入後すぐにレコーディングを始められるマイクロホンやモニタリングヘッドホンがセットになっています。
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
              {/* Product 1: EVO 4 */}
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="mb-4 flex justify-center">
                  <Image
                    src="/images/brands/audient/evo_Starter_bundle/concept_01.png"
                    alt="EVO 4"
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">1 x EVO 4</h3>
                <p className="text-sm text-gray-600">オーディオインターフェイス</p>
              </div>

              {/* Product 2: EVO SR1 */}
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="mb-4 flex justify-center">
                  <Image
                    src="/images/brands/audient/evo_Starter_bundle/concept_02.png"
                    alt="EVO SR1"
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">EVO SR1</h3>
                <p className="text-sm text-gray-600">コンデンサーマイク</p>
              </div>

              {/* Product 3: EVO SR2000 */}
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="mb-4 flex justify-center">
                  <Image
                    src="/images/brands/audient/evo_Starter_bundle/concept_03.png"
                    alt="EVO SR2000"
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">EVO SR2000</h3>
                <p className="text-sm text-gray-600">モニタリングヘッドフォン</p>
              </div>

              {/* Product 4: Shock Mount */}
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="mb-4 flex justify-center">
                  <Image
                    src="/images/brands/audient/evo_Starter_bundle/concept_04.png"
                    alt="EVO ショックマウント"
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">EVO マイク用</h3>
                <p className="text-sm text-gray-600">ショックマウント</p>
              </div>

              {/* Product 5: XLR Cable */}
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="mb-4 flex justify-center">
                  <Image
                    src="/images/brands/audient/evo_Starter_bundle/concept_05.png"
                    alt="XLR マイクケーブル"
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">XLR</h3>
                <p className="text-sm text-gray-600">マイクケーブル</p>
              </div>
            </div>

            {/* Link to Product Details */}
            <div className="text-center">
              <a
                href="https://evo.allaccess.co.jp/evo_bundle/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-medium transition-colors shadow-lg"
              >
                <span>evo スターターバンドル 製品詳細はこちら</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Specs Section */}
      <section id="specs" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">製品仕様</h2>
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column - EVO SR1 */}
                <div className="space-y-6">
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">EVO SR1 コンデンサー・マイクロホン</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>ダイヤフラム：14mm バックエレクトリック型コンデンサー・カプセル</p>
                      <p>指向特性：スーパー・カーディオイド</p>
                      <p>周波数特性：20Hz - 18kHz</p>
                      <p>感度：30dB±3dB（0dB=1V/Pa at 1kHz）</p>
                      <p>出力インピーダンス：150Ω±30%（at 1kHz）</p>
                      <p>負荷インピーダンス：≥1kΩ</p>
                      <p>セルフノイズ：16dB A-weighted</p>
                      <p>最大入力SPL：134dB（at 1kHz ≤1% T.H.D）</p>
                      <p>S/N比：78dB</p>
                      <p>ファンタム電源：48V（±4V）</p>
                      <p>ファンタム消費電流：3mA</p>
                    </div>
                  </div>
                </div>

                {/* Right Column - EVO SR2000 */}
                <div className="space-y-6">
                  <div className="border-b border-gray-300 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">EVO SR2000 モニタリング・ヘッドホン</h3>
                    <div className="space-y-1.5 text-sm text-gray-700">
                      <p>ヘッドホンスタイル：耳載せヘッドホン</p>
                      <p>ドライバータイプ：ダイナミック</p>
                      <p>ドライバー直径：40mm</p>
                      <p>インピーダンス：32Ω</p>
                      <p>感度/最大感度：SPL:95±3dB/105±3dB</p>
                      <p>THD :&lt;0.3%</p>
                      <p>周波数特性：15Hz〜22kHz</p>
                      <p>最大出力：400mW</p>
                      <p>標準出力：250mW</p>
                      <p>ケーブル長：3m</p>
                      <p>プラグ：3.5mm</p>
                      <p>重量（ケーブル付き）：233g</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Note */}
              <div className="mt-8 pt-6 border-t border-gray-300">
                <p className="text-sm text-gray-600">
                  ※ レイテンシーのパフォーマンスは、バッファーサイズ、CPUの負荷、OSによって異なります。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

