"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Download, ChevronDown, ChevronUp } from 'lucide-react'
import { BlogSlider } from "@/components/blog-slider"
import { downloadManual } from "@/lib/manual-download"

type Section = "concept" | "demo" | "features" | "controls" | "connections" | "software" | "manual" | "specs"

const navigationItems = [
  { id: "concept" as Section, label: "コンセプト" },
  { id: "demo" as Section, label: "デモムービー" },
  { id: "features" as Section, label: "主な機能" },
  { id: "controls" as Section, label: "コントロール" },
  { id: "connections" as Section, label: "一般的な接続例" },
  { id: "software" as Section, label: "ソフトウェア" },
  { id: "manual" as Section, label: "取扱説明書", isDownload: true },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function PulzeMiniPage() {
  const [activeSection, setActiveSection] = useState<Section>("concept")
  const [headerHeight, setHeaderHeight] = useState(72)
  const [expandedSoftware, setExpandedSoftware] = useState<{
    firmware: boolean
    app: boolean
    updater: boolean
  }>({
    firmware: false,
    app: false,
    updater: false,
  })

  const toggleSoftware = (key: "firmware" | "app" | "updater") => {
    setExpandedSoftware((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const scrollToSection = (sectionId: Section) => {
    if (sectionId === "manual") {
      downloadManual("hotone", "pulze-mini")
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

    // Initial calculation
    updateHeaderHeight()

    // Update on scroll
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
        {/* Full width background image */}
        <div className="absolute inset-0">
          <img src="/products/pulze-mini/hero-fullwidth.png" alt="PULZE MINI" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
        </div>

        {/* Floating info card - smaller and positioned on the right */}
        <div className="relative container mx-auto px-6 h-full flex items-center justify-end">
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-white/30 w-96">
            {/* HOTONE logo */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 tracking-wider">HOTONE</h1>
            </div>

            <div className="space-y-4 text-gray-900">
              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">製品名：</p>
                <p className="text-2xl font-bold text-gray-900">PULZE MINI</p>
                <p className="text-sm text-gray-600">（AP-5WH）</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">
                  Bluetooth<sup>®</sup> モデリングアンプ
                </p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-hotone">
                  ¥20,000 前後
                </p>
                <p className="text-xs text-gray-500">（税込）</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">6959473911037</p>
              </div>
            </div>

            <div className="mt-6">
              <a
                href="https://hotmusic.jp/collections/hotone/products/hotone-pulze-mini"
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

      {/* Introduction Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="container mx-auto px-6">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Big Sound. Zero Clutter.</h2>
            <p className="text-xl md:text-2xl text-gray-700">どこでも練習&録音を可能にする、超小型モデリングアンプ</p>
            <div className="mt-6 flex justify-center">
              <div className="w-24 h-1 rounded-full hotone-bar" />
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Image */}
            <div className="space-y-6">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/products/pulze-mini/intro-scene.png"
                  alt="PULZE MINI with guitar"
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Right Column - Features List */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  超コンパクトなBluetooth<sup>®</sup>モデリングアンプ
                </h3>

                <div className="prose max-w-none mb-8">
                  <p className="text-gray-700 leading-relaxed">
                    Pulze Mini
                    は、手のひらサイズのパワフルなアンプです。ギタリスト、ベーシスト、アコースティック・プレイヤーが、本格的な機材を持ち運ぶことなくプロレベルのトーンを求めるために設計されました。この超ポータブルなモデリング・アンプは、内蔵充電式バッテリー、ワイヤレス・コントロール、そしてHOTONEのフラッグシップモデルPULZEから引き継がれたスタジオグレードのモデリング技術を搭載しています。自宅でのジャムセッション、バックステージでの練習、屋上でのサンセット・セットなど、どんなシーンでもPulze
                    Miniはサイズを超えた迫力のトーンを提供します。
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">2インチ・フルレンジ・スピーカー採用の5W出力</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">
                      忠実なサウンド再生を実現する、最適チューニング小型キャビネットデザイン
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Celestion<sup>®</sup> Digitalによる5種類のクラシックCelestion<sup>®</sup> スピーカーIR
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">強力なDSPと24bitデジタル信号処理による優れた音質</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">
                      オーディオ再生とリモコン用にBluetooth<sup>®</sup> 5.0 デュアルモード・モジュールを採用
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="text-gray-700 text-sm">
                      <p className="font-medium mb-1">CDCM HD & F.I.R.E. モデリング・エフェクト：</p>
                      <ul className="ml-4 space-y-1">
                        <li>- 52種のアンプモデル</li>
                        <li>- 48種のキャビネット</li>
                        <li>- 伝説のペダルmodels</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">
                      エフェクトチェーンが編集可能な、最大7つの同時エフェクトモジュールを搭載
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">最大200音色（プリセット）保存可能</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">
                      アコースティック・ギター用のシミュレーション・エフェクトとトーン
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Hotoneコミュニティ経由でお気に入りのトーンをダウンロード/アップロード/共有
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">100パターンのドラムマシン/メトロノームを内蔵</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">高精度チューナーを内蔵</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">サイレント練習のためのヘッドフォン・ジャック</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">USBオーディオ・インターフェイスとしても利用可能</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hotone-check-circle"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm">持ち運びに便利な着脱式レザーストラップ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="bg-gray-50">
        {/* Concept Section */}
        <section id="concept" className="py-20 scroll-mt-24 bg-concept-dark">
          <div className="container mx-auto px-6">
            {/* Section Title */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">製品コンセプト</h2>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 rounded-full hotone-bar" />
              </div>
            </div>

            {/* Concept 1: Professional Modeling in Your Pocket */}
            <div className="mb-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <h3 className="text-3xl font-bold text-white mb-6">プロレベルのモデリングをポケットに</h3>
                  <p className="text-gray-300 leading-relaxed text-lg mb-6">
                    そのサイズから想像つかないほどの、Pulze
                    Miniは驚異的なフラッグシップモデルPULZEから引き継がれたスタジオグレードのモデリング技術を搭載しています。ギタリスト、ベーシスト、アコースティック・プレイヤーが、本格的な機材を持ち運ぶことなくプロレベルのトーンを求めるために設計されました。この超ポータブルなモデリング・アンプは、内蔵充電式バッテリー、ワイヤレス・コントロール、そしてHOTONEのフラッグシップモデルPULZEから引き継がれたスタジオグレードのモデリング技術を搭載しています。自宅でのジャムセッション、バックステージでの練習、屋上でのサンセット・セットなど、どんなシーンでもPulze
                    Miniはサイズを超えた迫力のトーンを提供します。
                  </p>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src="/products/pulze-mini/gold-amp.png"
                      alt="Professional modeling in pocket"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Concept 2: Flagship Technology in Small Body */}
            <div className="mb-24 rounded-3xl p-12 bg-concept-dark">
              <h3 className="text-3xl font-bold text-white mb-8 text-center">フラッグシップ手小さなボディに集約</h3>

              {/* CDCM HD & F.I.R.E. */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <div className="relative">
                    <img
                      src="/products/pulze-mini/wave-pattern.png"
                      alt="CDCM HD & F.I.R.E."
                      className="w-full h-auto rounded-xl"
                    />
                  </div>
                </div>
                <div className="text-white">
                  <h4 className="text-2xl font-bold mb-4">CDCM HD & F.I.R.E.</h4>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    エレキギターの多様性とベースのグルーヴ感、アコースティックギターのストラミングまで、Pulze
                    Miniは真の多才さを発揮します。まるでプロ級のマルチエフェクトプロセッサー、オーディオインターフェース、Bluetoothスピーカーをバックパックに詰め込んだような感覚です。
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div
                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0 hotone-check-circle"
                      />
                      <span className="text-gray-300">52種のアンプモデル</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div
                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0 hotone-check-circle"
                      />
                      <span className="text-gray-300">48種のキャビネット</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div
                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0 hotone-check-circle"
                      />
                      <span className="text-gray-300">伝説のペダルmodels</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* CELESTION Digital */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="text-white order-2 lg:order-1">
                  <h4 className="text-2xl font-bold mb-4">CELESTION® Digital</h4>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Celestion®
                    Digitalによる5種類のクラシックCelestion®スピーカー、小さい本体ながら5種類のIRが搭載されました。
                  </p>
                  <div className="mt-6">
                    <img
                      src="/products/pulze-mini/celestion-logo.png"
                      alt="Celestion"
                      className="h-12 w-auto opacity-90"
                    />
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                    <div className="text-center">
                      <p className="text-6xl font-bold mb-2 text-hotone">
                        5
                      </p>
                      <p className="text-white text-lg">種類のクラシックスピーカーIR</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Concept 3: Wireless Control, Cloud Tones, Instant Jam */}
            <div className="mb-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="rounded-2xl overflow-hidden shadow-2xl bg-black">
                    <img
                      src="/products/pulze-mini/concept-wireless-control.png"
                      alt="Wireless control"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-6">
                    ワイヤレスコントロール、クラウドトーン、インスタントジャム
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg mb-6">
                    Pulze
                    Editorアプリを使えば、スマートフォンのすべてのコントロールにアクセスできます。プリセットやIRの編集、クラウドからユーザーが作成した音を探したり、自分でバックアップしたりできます。さらに、タップしてダウンロードするだけで、すぐに使えます。また、タップしてダウンロードするだけで、すぐに使えます。
                  </p>
                  <div className="flex items-center gap-4">
                    <a
                      href="https://www.hotone.com/support/2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="text-white flex items-center gap-2 btn-hotone">
                        <Download className="w-4 h-4" />
                        ダウンロードはこちら
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Concept 4: Wireless, Play Anywhere */}
            <div className="mb-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <h3 className="text-3xl font-bold text-white mb-6">ワイヤレスで、どこでもプレイ</h3>
                  <p className="text-gray-300 leading-relaxed text-lg mb-6">
                    3000mAhバッテリーを内蔵したPulze
                    Miniは、ヘッドフォンで使用すれば最大13時間、中音量でスピーカーレッスン/ジャムを楽しめ、最大5時間のセッションをこなせます。コンセントやパワーバンクを探す必要はありません。
                  </p>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="rounded-2xl overflow-hidden shadow-2xl bg-black">
                    <img
                      src="/products/pulze-mini/battery-green.png"
                      alt="Wireless battery"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Concept 5: Silent Practice */}
            <div className="mb-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="rounded-2xl overflow-hidden shadow-2xl">
                    <img src="/products/pulze-mini/handheld.png" alt="Silent practice" className="w-full h-auto" />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-6">静かに練習したい？ そんな時でも大丈夫。</h3>
                  <p className="text-gray-300 leading-relaxed text-lg mb-6">
                    3.5mmステレオ出力がヘッドフォンとを接続すれば、誰にも邪魔されず、誰も邪魔しない、スタジオのような体験を楽しめます。
                  </p>
                </div>
              </div>
            </div>

            {/* Concept 6: USB Audio Interface */}
            <div className="mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <h3 className="text-3xl font-bold text-white mb-6">
                    USBオーディオインターフェース：プロのようにレコーディング
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg mb-6">
                    Pulze
                    Miniは、スピーカレスはもちろん、USBオーディオインターフェースとして機能します。DAWに接続して、レコーディング、ミックス、マスタリングを行えます。別途オーディオインターフェースを購入する必要はありません。
                  </p>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="rounded-2xl overflow-hidden shadow-2xl bg-black">
                    <img
                      src="/products/pulze-mini/usb-connection.png"
                      alt="USB audio interface"
                      className="w-full h-auto"
                    />
                  </div>
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
            <div className="max-w-5xl mx-auto">
              <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/2virEn10obU?start=45"
                  title="PULZE MINI Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 scroll-mt-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">主な機能</h2>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 rounded-full hotone-bar" />
              </div>
            </div>

            <div className="space-y-16 max-w-7xl mx-auto">
              {/* Feature 01: 豊富な音色 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="p-12 flex flex-col justify-center">
                    <div className="inline-block px-4 py-1 bg-gray-100 text-gray-500 text-sm font-bold rounded-full mb-4 w-fit">
                      01
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-6">豊富な音色</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0 hotone-check-circle"
                        />
                        <span className="text-gray-700">520アンプシミュレーション</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0 hotone-check-circle"
                        />
                        <span className="text-gray-700">48種のキャビネットシミュレーション</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0 hotone-check-circle"
                        />
                        <span className="text-gray-700">1910のクラシックなエフェクトシミュレーション</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0 hotone-check-circle"
                        />
                        <span className="text-gray-700">5つのCelestionスピーカー IR（20ユーザー IRスロット）</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-8 flex items-center justify-center">
                    <img
                      src="/images/brands/hotone/pulze-mini/amp-models-grid.png"
                      alt="豊富な音色"
                      className="w-full h-auto max-w-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Feature 02: 自由なコンビネーション */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="bg-gradient-to-br from-gray-100 to-gray-50 p-8 flex items-center justify-center order-2 lg:order-1">
                    <img
                      src="/images/brands/hotone/pulze-mini/app-hand-static.png"
                      alt="自由なコンビネーション"
                      className="w-full h-auto max-w-md rounded-2xl shadow-xl"
                    />
                  </div>
                  <div className="p-12 flex flex-col justify-center order-1 lg:order-2">
                    <div className="inline-block px-4 py-1 bg-gray-100 text-gray-500 text-sm font-bold rounded-full mb-4 w-fit">
                      02
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-6">自由なコンビネーション</h3>
                    <p className="text-gray-700 mb-6">
                      専用のコントロールアプリ「Pulze Editor（iOS /
                      Android）」を使えば、自由にプリセットの編集ができ、好きなアンプやエフェクトをそれぞれ1つずつ選んで組み合わせることができます。
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0 hotone-check-circle"
                        />
                        <span className="text-gray-700">7つのエフェクト・モジュール</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0 hotone-check-circle"
                        />
                        <span className="text-gray-700">2000トーン・プリセット・スロット</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0 hotone-check-circle"
                        />
                        <span className="text-gray-700">接続変更可能なエフェクト・チェーン</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0 hotone-check-circle"
                        />
                        <span className="text-gray-700">簡単にトーン・プリセットの保存や切り替えが可能</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Feature 03: Pulze Controlでレベルアップ */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="p-12 flex flex-col justify-center">
                    <div className="inline-block px-4 py-1 bg-gray-100 text-gray-500 text-sm font-bold rounded-full mb-4 w-fit">
                      03
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-6">Pulze Controlでレベルアップ</h3>
                    <p className="text-gray-700 mb-6">
                      Pulze MiniをPulze
                      Control(ワイヤレスMIDIフットスイッチ（別売）と組み合わせれば、ペダルボードスタイルのコントロールが可能です。プリセットの切り替え、エフェクトのオン/オフ、エクスプレッションペダルの接続など、ケーブルは一切不要です。
                    </p>
                  </div>
                  <div className="bg-gray-50 p-8 flex items-center justify-center">
                    <img
                      src="/images/brands/hotone/pulze-mini/connection-diagram.png"
                      alt="Pulze Controlでレベルアップ"
                      className="w-full h-auto max-w-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Feature 04: Bluetooth®スピーカー */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="bg-black p-8 flex items-center justify-center order-2 lg:order-1">
                    <img
                      src="/images/brands/hotone/pulze-mini/speaker-on-turntable.png"
                      alt="Bluetooth®スピーカー"
                      className="w-full h-auto max-w-lg"
                    />
                  </div>
                  <div className="p-12 flex flex-col justify-center order-1 lg:order-2">
                    <div className="inline-block px-4 py-1 bg-gray-100 text-gray-500 text-sm font-bold rounded-full mb-4 w-fit">
                      04
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-6">
                      Bluetooth<sup>®</sup>スピーカー
                    </h3>
                    <p className="text-gray-700 mb-6">
                      Pulze Miniは、フルレンジの音響再生向けにチューニングされた高性能Bluetooth<sup>®</sup>
                      スピーカーとしても機能します。精密な音響設計、さらに細かなEQ、そして力強い音量により、200ドル以上のBluetoothスピーカーに匹敵します。
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 05: サウンド・プリセットを共有できる */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="p-12 flex flex-col justify-center">
                    <div className="inline-block px-4 py-1 bg-gray-100 text-gray-500 text-sm font-bold rounded-full mb-4 w-fit">
                      05
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-6">サウンド・プリセットを共有できる</h3>
                    <p className="text-gray-700 mb-6">クラウド・サウンド・コミュニティ</p>
                    <p className="text-gray-700 mb-6">
                      Pulzeの公式サウンド・コミュニティは、専用のモバイルアプリからアクセスできます。簡単にサウンドをアップロードしたり、アーティストやユーザーのプリセットをダウンロードしたりできます。思い描いたサウンドを求めてパラメーターを調整する必要はありません。膨大なクラウドデータの中からお好きなサウンド・プリセットをいつでもどこでもスマートフォンやPulzeにダウンロードできます。
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-100 to-gray-50 p-8 flex items-center justify-center">
                    <img
                      src="/images/brands/hotone/pulze-mini/app-hand-static.png"
                      alt="サウンド・プリセットを共有できる"
                      className="w-full h-auto max-w-md rounded-2xl shadow-xl"
                    />
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
            <div className="max-w-5xl mx-auto">
                <img
                  src="/images/brands/hotone/pulze-mini/pulze-mini-and-control.png"
                  alt="PULZE MINI and PULZE CONTROL"
                  className="w-full h-auto"
                />
            </div>
          </div>
        </section>

        {/* Connections Section */}
        <section id="connections" className="py-20 scroll-mt-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">一般的な接続例</h2>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 rounded-full hotone-bar" />
              </div>
            </div>
            <div className="max-w-6xl mx-auto space-y-16">
              {/* 楽器との接続方法 */}
              <div>
                <div className="p-8 md:p-12">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">楽器との接続方法</h3>
                  <div className="flex justify-center">
                    <img
                      src="/images/brands/hotone/pulze-mini/instrument-connection-diagram.png"
                      alt="楽器との接続方法"
                      className="w-full h-auto max-w-xl"
                    />
                  </div>
                </div>
              </div>

              {/* USBオーディオ・インターフェイスとしての接続例 */}
              <div>
                <div className="p-8 md:p-12">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                    USBオーディオ・インターフェイスとしての接続例
                  </h3>
                  <div className="flex justify-center">
                    <img
                      src="/images/brands/hotone/pulze-mini/usb-connection-diagram.png"
                      alt="USBオーディオ・インターフェイスとしての接続例"
                      className="w-full h-auto max-w-xl"
                    />
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
                <div className="w-24 h-1 rounded-full hotone-bar" />
              </div>
              <p className="text-gray-600 mt-6">
                Pulze Miniの各ソフトウェアは、HOTONEメーカーサイトよりダウンロードしていただけます。
              </p>
            </div>

            <div className="max-w-5xl mx-auto space-y-6">
              {/* PULZE MINI Firmware */}
              <div className="bg-gray-200 rounded-xl overflow-hidden shadow-md">
                <button
                  onClick={() => toggleSoftware("firmware")}
                  className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-300 transition-colors"
                >
                  <span className="text-xl font-bold text-gray-900">PULZE MINI Firmware V.1.0.2</span>
                  {expandedSoftware.firmware ? (
                    <ChevronUp className="w-6 h-6 text-gray-900" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-900" />
                  )}
                </button>

                {expandedSoftware.firmware && (
                  <div className="px-8 py-6 bg-gray-200 border-t border-gray-300">
                    <p className="text-gray-700 mb-2">PULZE MINI ファームウェア　リリースノート</p>
                    <p className="text-gray-700 mb-4">Version 1.0.2</p>
                    <p className="text-sm text-gray-600 mb-6">※ 最新のPulze App（V.1.4.4）でご使用ください。</p>
                    <a
                      href="https://www.hotone.com/support/2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        className="text-white px-6 py-3 rounded-lg flex items-center gap-2"
                        className="bg-accent-amber"
                      >
                        <Download className="w-4 h-4" />
                        ダウンロードはこちら
                      </Button>
                    </a>
                  </div>
                )}
              </div>

              {/* PULZE APP */}
              <div className="bg-gray-200 rounded-xl overflow-hidden shadow-md">
                <button
                  onClick={() => toggleSoftware("app")}
                  className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-300 transition-colors"
                >
                  <span className="text-xl font-bold text-gray-900">PULZE APP</span>
                  {expandedSoftware.app ? (
                    <ChevronUp className="w-6 h-6 text-gray-900" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-900" />
                  )}
                </button>

                {expandedSoftware.app && (
                  <div className="px-8 py-6 bg-gray-200 border-t border-gray-300">
                    <p className="text-gray-700 mb-2">PULZE APP ソフトウェア　リリースノート</p>
                    <p className="text-gray-700 mb-4">Version 1.4.4</p>
                    <p className="text-sm text-gray-600 mb-6">
                      ※ 最新のPulze Mini Firmware（V.1.0.2）でご使用ください。
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href="https://www.hotone.com/support/2"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          className="text-white px-6 py-3 rounded-lg flex items-center gap-2"
                          className="bg-accent-amber"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.523 15.341c-.1.1-.2.2-.3.3-.5.4-1.1.7-1.7.9-.6.2-1.3.3-2 .3-1.4 0-2.7-.5-3.7-1.5-1-1-1.5-2.3-1.5-3.7 0-.7.1-1.4.3-2 .2-.6.5-1.2.9-1.7.1-.1.2-.2.3-.3l7.7 7.7z" />
                          </svg>
                          Android版のダウンロードはこちら
                        </Button>
                      </a>
                      <a
                        href="https://www.hotone.com/support/2"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          className="text-white px-6 py-3 rounded-lg flex items-center gap-2"
                          className="bg-accent-amber"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                          </svg>
                          iOS版のダウンロードはこちら
                        </Button>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* PULZE USBUpdater */}
              <div className="bg-gray-200 rounded-xl overflow-hidden shadow-md">
                <button
                  onClick={() => toggleSoftware("updater")}
                  className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-300 transition-colors"
                >
                  <span className="text-xl font-bold text-gray-900">PULZE USB Updater</span>
                  {expandedSoftware.updater ? (
                    <ChevronUp className="w-6 h-6 text-gray-900" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-900" />
                  )}
                </button>

                {expandedSoftware.updater && (
                  <div className="px-8 py-6 bg-gray-200 border-t border-gray-300">
                    <p className="text-gray-700 mb-2">PULZE USB Updater　リリースノート</p>
                    <p className="text-gray-700 mb-6">Version 1.1.0（Win / Mac）</p>
                    <a
                      href="https://www.hotone.com/support/2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        className="text-white px-6 py-3 rounded-lg flex items-center gap-2"
                        className="bg-accent-amber"
                      >
                        <Download className="w-4 h-4" />
                        ダウンロードはこちら
                      </Button>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Specs Section */}
        <section id="specs" className="py-20 scroll-mt-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">製品仕様</h2>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 rounded-full hotone-bar" />
              </div>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-4">
                      <p className="text-gray-900">
                        <span className="font-medium">周波数レンジ：</span>20Hz - 20kHz
                      </p>
                    </div>
                    <div className="border-b border-gray-200 pb-4">
                      <p className="text-gray-900">
                        <span className="font-medium">搭載スピーカー：</span>2 x 2" カスタム・フルレンジ・スピーカー
                      </p>
                    </div>
                    <div className="border-b border-gray-200 pb-4">
                      <p className="text-gray-900">
                        <span className="font-medium">パワーアンプ：</span>Class D パワーアンプ 5W出力
                      </p>
                    </div>
                    <div className="border-b border-gray-200 pb-4">
                      <p className="text-gray-900">
                        <span className="font-medium">デジタル・オーディオ・プロセッシング：</span>24-bit、48kHz
                      </p>
                    </div>
                    <div className="border-b border-gray-200 pb-4">
                      <p className="text-gray-900">
                        <span className="font-medium">エフェクトモジュール数：</span>7
                      </p>
                    </div>
                    <div className="border-b border-gray-200 pb-4">
                      <p className="text-gray-900">
                        <span className="font-medium">エフェクト数：</span>191（Global EQを含む）
                      </p>
                    </div>
                    <div className="border-b border-gray-200 pb-4">
                      <p className="text-gray-900">
                        <span className="font-medium">トーン（プリセット）：</span>最大200 トーン
                      </p>
                    </div>
                    <div className="border-b border-gray-200 pb-4">
                      <p className="text-gray-900">
                        <span className="font-medium">ドラムマシーン：</span>100リズムパターン＆メトロノーム
                      </p>
                    </div>
                    <div className="border-b border-gray-200 pb-4">
                      <p className="text-gray-900">
                        <span className="font-medium">Bluetooth®：</span>5.0デュアルモード（BLE & audio）& Bluetooth®
                        MIDI
                      </p>
                    </div>
                    <div className="pb-4">
                      <p className="text-gray-900">
                        <span className="font-medium">TELEC 認証：</span>R220-JP9345
                      </p>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-4">
                      <p className="text-gray-900">
                        <span className="font-medium">入力：</span>1/4" Tip Sleeve (TS) インストルメント入力
                      </p>
                    </div>
                    <div className="border-b border-gray-200 pb-4">
                      <p className="text-gray-900">
                        <span className="font-medium">出力：</span>1/8" ステレオ・ヘッドフォン・ジャック
                      </p>
                    </div>
                    <div className="border-b border-gray-200 pb-4">
                      <p className="text-gray-900">
                        <span className="font-medium">スクリーン：</span>1.45インチ TFT LCDカラースクリーン
                      </p>
                    </div>
                    <div className="border-b border-gray-200 pb-4">
                      <p className="text-gray-900">
                        <span className="font-medium">USBポート：</span>USB 2.0 Type-C ポート、USB Audio 2.0 対応
                      </p>
                    </div>
                    <div className="border-b border-gray-200 pb-4">
                      <p className="text-gray-900">
                        <span className="font-medium">USBオーディオ：</span>
                        ループバックおよびアンプ対応の2 入出力USB オーディオインターフェース
                      </p>
                    </div>
                    <div className="border-b border-gray-200 pb-4">
                      <p className="text-gray-900">
                        <span className="font-medium">IR プロセッシング：</span>24 ビット/48kHz モノラルWAV
                        ファイル対応1024 ポイント、最大20 個のユーザーIR をサポート
                      </p>
                    </div>
                    <div className="border-b border-gray-200 pb-4">
                      <p className="text-gray-900">
                        <span className="font-medium">バッテリー：</span>内蔵3.8V 3900mAh リチウムバッテリー
                      </p>
                    </div>
                    <div className="border-b border-gray-200 pb-4">
                      <p className="text-gray-900">
                        <span className="font-medium">連続再生：</span>中音量以下で約5.5 時間
                      </p>
                    </div>
                    <div className="border-b border-gray-200 pb-4">
                      <p className="text-gray-900">
                        <span className="font-medium">最大再生時間：</span>ヘッドホン使用時約11.5 時間
                      </p>
                    </div>
                    <div className="border-b border-gray-200 pb-4">
                      <p className="text-gray-900">
                        <span className="font-medium">サイズ：</span>125mm（W）x 57mm（D）x 79mm（H）
                      </p>
                    </div>
                    <div className="pb-4">
                      <p className="text-gray-900">
                        <span className="font-medium">重量：</span>368g
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

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

      {/* Blog Slider */}
      <BlogSlider />
    </div>
  )
}
