"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Download, ChevronDown, ChevronUp } from 'lucide-react'
import { BlogSlider } from "@/components/blog-slider"
import { downloadManual } from "@/lib/manual-download"

type Section = "concept" | "demo" | "function" | "software" | "bundle" | "faq" | "manual" | "specs"

const navigationItems = [
  { id: "concept" as Section, label: "コンセプト" },
  { id: "demo" as Section, label: "デモムービー" },
  { id: "function" as Section, label: "主な性能" },
  { id: "software" as Section, label: "ソフトウエア" },
  { id: "bundle" as Section, label: "バンドルソフト" },
  { id: "faq" as Section, label: "よくある質問" },
  { id: "manual" as "manual", label: "取扱説明書", isDownload: true },
  { id: "specs" as Section, label: "製品仕様" },
]

export default function Evo8Page() {
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

  const handleManualDownload = () => {
    downloadManual("audient", "evo8")
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
          src="/images/brands/audient/evo8/hero.jpg"
          alt="evo 8"
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
                <p className="text-2xl font-bold text-gray-900">evo 8</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">概要：</p>
                <p className="text-base text-gray-900">オーディオ・インターフェイス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">価格：</p>
                <p className="text-base text-gray-900">オープンプライス</p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 mb-1">参考価格帯：</p>
                <p className="text-xl font-bold text-gray-900">
                  ¥34,980 前後(税込)
                </p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">JAN：</p>
                <p className="text-sm font-mono text-gray-700">5060374260382</p>
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">4 in / 4 out</h2>
              <h3 className="text-2xl font-bold text-gray-700 mb-6">USB オーディオ・インターフェイス</h3>
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
                    src="https://www.youtube.com/embed/pI5GP0yZbJM"
                    title="evo Introducing EVO 8 Audio Interface"
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
                    <a href="#" className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200 block">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm6 6H7v2h6v-2z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-900">専用ミキサー・ソフトウェア ＆ 最新ファームウェア</span>
                    </a>
                    <a href="#" className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 border border-gray-200 block">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm6 6H7v2h6v-2z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-900">ARC フリー・バンドル・ソフトウェア＆プラグイン</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column - Product Description and Features */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">次世代のサウンドは、もっとスマートに</h3>

                  <div className="prose max-w-none mb-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Capture creativity fast</h4>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      evo 8は、バンドサウンドの録音、ポッドキャスト・コンテンツの制作など、コラボレーションが必要なあらゆるシーンで活躍し、アイデアをすぐに形にすることが出来る機能を備えています。
                    </p>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">あらゆるシーンに対応できる、ワンランク上の 4in / 4out</h4>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      evo 8はUSB バスパワー駆動なので、コンピューターとevo 8さえあればいつでもどこでも直感的に高品位なレコーディングが可能です。evo 4でも証明された優れた性能と高い品質に、新たに入出力が追加され、4in / 4outとなったevo 8はバンドのライブ録音や複数のスピーカーを迎えたポッドキャストやウェビナー、対戦ゲーム実況など幅広く活躍します。
                    </p>
                  </div>

                  {/* Usage Scenarios */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">利用シーン</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                          <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700">バンド録音</span>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                          <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700">イベント配信</span>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                          <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700">ゲーム実況</span>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                          <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700">オンライン会議</span>
                      </div>
                    </div>
                  </div>

                  {/* Feature List */}
                  <div className="space-y-2 mb-4">
                    {[
                      "4in / 4out オーディオ・インターフェース",
                      "スマートゲイン機能",
                      "ループバック機能",
                      "高性能マイクプリ搭載",
                      "USBバスパワー",
                      "超ローレイテンシー",
                      "+48V ファンタム電源",
                      "Mac M1 & M1 Pro & M1 Max 対応",
                      "mac OS 13.X（Ventura）、windows 11に対応",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-gray-700 text-sm">{feature}</p>
                      </div>
                    ))}
                  </div>

                  <p className="text-gray-600 text-sm mt-4">
                    ※最新のドライバーをお使いください
                  </p>
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

          {/* Section 1: Top Section - Video and Text */}
          <div className="mb-20 space-y-12">
            {/* YouTube Video */}
            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg w-full max-w-4xl mx-auto">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/pI5GP0yZbJM"
                title="AUDIENT evo 8 - Concept"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            {/* Text Content */}
            <div className="max-w-4xl mx-auto space-y-6">
              <h4 className="text-3xl font-bold text-white text-center mb-8">
                もっと楽しみながらプロジェクトを進めてもいいんじゃないか
              </h4>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  我々のミッションは、クリエーターの方々にレコーディングを簡単に楽しんで頂くための、革新的でシンプルなスタイリッシュなプロダクトを提供することです。どんな芸術形式にも囚われず、evo 8はインスタントに非常に高い音質を届けてくれます。
                </p>
                
                <p>
                  ポッドキャスター、ミュージシャン、プロデューサー、コンテンツクリエーターの全てが、evo 8を用いて、高いクオリィティーのオーディオを簡単にキャプチャーすることができます。心地よいサウンドを提供してくれる4機のevoマイクプリ、Hi-Zインストルメント入力、Smartgain（スマートゲイン）自動ゲインコントロール。さらに、4 x 1/4"ライン出力＆2 x ヘッドホンが、複数のモニタースピーカーやヘッドホンの接続を可能にします。
                </p>
                
                <p>
                  evo 8の中央にある大型ノブは、モニター、ヘッドホン、マルチ機能ボタンと組み合わせ、入力やヘッドホン出力の「イージーミュート」も実行できます。evo 8のオーディオループバック機能は、入力信号とコンピューターオーディオの同時録音を可能にしてくれます。この機能により、ポッドキャスターやビジネスミーティングで必要とされる、スカイプやビデオアプリのリモートゲストのオーディオキャプチャーが容易になります。
                </p>
                
                <p>
                  制作に必要なソフトウェアやプラグインも完璧に用意しました。また、電源はバスパワーで起動できるため、ライブや現場での使用も安心です。パワーサプライの心配はもうありません。
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Additional Sections */}
          <div className="mb-20 space-y-20">
            {/* Part 1: 究極のミニマル・デザイン */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Video */}
              <div className="flex justify-center">
                <video
                  src="/images/brands/audient/evo8/concept_01.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto rounded-xl object-cover pointer-events-none"
                  controls={false}
                />
              </div>
              
              {/* Right: Text Content */}
              <div>
                <h4 className="text-2xl font-bold text-white mb-6">究極のミニマル・デザイン</h4>
                <p className="text-gray-400 leading-relaxed">
                  高い技術力と革新性で極限まで無駄を省いたデザイン設計は、スタイリッシュで場所を選ばないワークスペースを演出します。
                </p>
              </div>
            </div>

            {/* Part 2: Work anywhere */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text Content */}
              <div>
                <h4 className="text-2xl font-bold text-white mb-3">Work anywhere</h4>
                <p className="text-gray-400 leading-relaxed">
                  evo 8は、コンピューターのUSB経由で給電を受けるバスパワーを電源に採用しています。いつでもどこででも、アイデアを逃すことなく録音できます。
                </p>
              </div>

              {/* Right: Video */}
              <div className="flex justify-center">
                <video
                  src="/images/brands/audient/evo8/concept_02.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto rounded-xl object-cover pointer-events-none"
                  controls={false}
                />
              </div>
            </div>

            {/* Part 3: 高音質なパフォーマンス */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Images */}
              <div className="space-y-6">
                <div className="flex justify-center">
                  <Image
                    src="/images/brands/audient/evo8/concept_02.png"
                    alt="高音質なパフォーマンス"
                    width={600}
                    height={600}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <div className="flex justify-center">
                  <Image
                    src="/images/brands/audient/evo8/concept_03.svg"
                    alt="高音質なパフォーマンス"
                    width={600}
                    height={600}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>
              
              {/* Right: Text Content */}
              <div className="space-y-8">
                <div>
                  <h4 className="text-2xl font-bold text-white mb-4">高音質なパフォーマンス</h4>
                  <p className="text-gray-400 leading-relaxed">
                    evo 8には、20有余年に渡るAudientのオーディオ・デザインのノウハウを惜しみなく注ぎ込みました。素晴らしいオーディオ・クォリティを堪能していただけます。
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h5 className="text-xl font-bold text-white mb-3">４基のevo マイク・プリアンプ</h5>
                    <p className="text-gray-400 leading-relaxed">
                      クリーンで柔らかく正確な音質を誇り、58dB の高いゲインレンジのマイク・プリアンプです。
                    </p>
                  </div>

                  <div>
                    <h5 className="text-xl font-bold text-white mb-3">高いオーディオ入力性能</h5>
                    <p className="text-gray-400 leading-relaxed">
                      Audient iD44と同等の低歪スペックを実現しました。
                    </p>
                  </div>

                  <div>
                    <h5 className="text-xl font-bold text-white mb-3">JFET インストゥルメント（楽器）入力</h5>
                    <p className="text-gray-400 leading-relaxed">
                      ギターやベースを直接接続できるJFETインストルメント入力を備えています。
                    </p>
                  </div>

                  <div>
                    <h5 className="text-xl font-bold text-white mb-3">ハイ・パフォーマンス・コンバーター</h5>
                    <p className="text-gray-400 leading-relaxed">
                      113dBの高いダイナミックレンジ・コンバーター。ミュージカルな高品位のサウンドを支える96kHzサンプリング・レートを採用しています。
                    </p>
                  </div>
                </div>
              </div>
            </div>


          </div>

        </div>
      </section>

      {/* Demo Movie Section */}
      <section id="demo" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">デモムービー</h2>
          
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Video 1 */}
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/pI5GP0yZbJM"
                  title="AUDIENT evo 8 Demo 1"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              {/* Video 2 */}
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/6xROByoWZrw"
                  title="AUDIENT evo 8 Demo 2"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              {/* Video 3 */}
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/sV0lWx4snUU"
                  title="AUDIENT evo 8 Demo 3"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              {/* Video 4 */}
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/v_dyNvLl7eg"
                  title="AUDIENT evo 8 Demo 4"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              {/* Video 5 */}
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/IPJGKWevG0U"
                  title="AUDIENT evo 8 Demo 5"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              {/* Video 6 */}
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/pp7KIGaGdcM"
                  title="AUDIENT evo 8 Demo 6"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              {/* Video 7 */}
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/9OpwOdgpypY"
                  title="AUDIENT evo 8 Demo 7"
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

      {/* Function Section - 主な性能 */}
      <section id="function" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">主な性能</h2>
            
            {/* Function Sections */}
            <div className="space-y-20">
              {/* 1. スマートゲイン機能 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left: Video */}
                <div className="flex justify-center">
                  <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg w-full max-w-2xl">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/sV0lWx4snUU"
                      title="スマートゲイン機能"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </div>
                
                {/* Right: Text Content */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">スマートゲイン機能</h3>
                    <p className="text-gray-700 leading-relaxed">
                      レコーディングの重要なテクニックの一つである、音量調整をevo 8が自動でサポート。スマートゲイン・ボタンを押して調整したいチャンネルを選び、マイクに向かって音声を入力するか、楽器をプラグインして演奏するだけで簡単に適正な音量レベルに調整されます。
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <p className="text-gray-700">ゲインを正しく＆早く設定できます。</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <p className="text-gray-700">オーバーロードや歪みを避けられます。</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <p className="text-gray-700">レコーディングを順調に進められます。</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      <p className="text-gray-700">一人でレコーディング作業が進められます。</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. スマートミュート機能 */}
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">スマートミュート機能</h3>
                  <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto mb-6">
                    ヘッドホンをヘッドホンポートに接続すると、そのチャンネルにかかわらず、スピーカー出力がミュートされます。ラウドモニタースピーカーとヘッドホンモニターをシームレスに切り替えます。
                  </p>
                  <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto mb-6">
                    ミキシングの際、トラックのモニタリングは幅広いリスナー（リスナーによって使用スピーカーやヘッドホンが異なるため）をカバーできるように、異なるヘッドホンやスピーカーを使用することをお勧めします。最低でも2 x ヘッドホンを使いましょう。
                  </p>
                </div>
                
                {/* Diagram */}
                <div className="flex justify-center items-center gap-8 py-8">
                  <div className="flex flex-col items-center">
                    <svg className="w-12 h-12 text-green-600 mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-600">ヘッドホン</span>
                  </div>
                  <div className="flex-1 border-t-2 border-dashed border-gray-400"></div>
                  <div className="flex flex-col items-center">
                    <svg className="w-12 h-12 text-gray-400 mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-.929 7.071 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 11-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                      <path d="M9 10a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" />
                    </svg>
                    <span className="text-sm text-gray-600">スピーカー（ミュート）</span>
                  </div>
                  <div className="flex-1 border-t-2 border-dashed border-gray-400"></div>
                  <div className="flex flex-col items-center">
                    <svg className="w-12 h-12 text-green-600 mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-.929 7.071 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 11-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-600">スピーカー</span>
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto text-center">
                  ヘッドホンでモニターしている時には、特にオープンバックやセミオープンのヘッドホンをしようしている場合、バックグランドでモニタースピーカーが再生していると邪魔になります。EVO 8のスマートミュートは、自動的にモニターミュートが作動します。
                </p>
              </div>

              {/* 3. ループバック機能 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left: Text Content */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">ループバック機能</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      マイクからの入力とコンピューターのサウンドを同時に録音する際にループバック機能を使用することができます。ポッドキャストやストリーム配信時、BGM を流しながら話したい時にも便利です。
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-gray-900 font-semibold mb-1">コンピューター</p>
                        <p className="text-gray-700">コンピューターからのサウンド録音に</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                      </svg>
                      <div>
                        <p className="text-gray-900 font-semibold mb-1">ビデオ会議</p>
                        <p className="text-gray-700">スカイプやビデオ会議の相手との会話記録に</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                      </svg>
                      <div>
                        <p className="text-gray-900 font-semibold mb-1">ゲーム実況</p>
                        <p className="text-gray-700">ゲーム実況時のサウンド録音に</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right: Video */}
                <div className="flex justify-center">
                  <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg w-full max-w-2xl">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/v_dyNvLl7eg"
                      title="ループバック機能"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Software Section */}
      <section id="software" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">ソフトウェア</h2>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 rounded-full bg-purple-600" />
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {/* Driver Software Section */}
            <div className="bg-gray-50 rounded-xl p-8">
              <p className="text-gray-700 leading-relaxed mb-6">
                ドライバー・ソフトウェアは、Audient WEBサイトからダウンロードして頂けます。
              </p>
              <a
                href="https://audient.com/products/audio-interfaces/evo8/downloads/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                <Download className="w-5 h-5" />
                Audient ダウンロード・ページ
              </a>
            </div>

            {/* Firmware Section */}
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">ファームウェア</h3>
              <h4 className="text-xl font-bold text-gray-700 mb-6">最新ファームウェアのご案内</h4>
              
              <div className="space-y-4 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  EVOシリーズの最新ドライバーVersion4.4.0がリリースされました。
                </p>
                <p className="text-gray-700 leading-relaxed">
                  WindowsではARM64に対応、MacではOS 15 Sequoiaに対応済みとなりました。
                </p>
              </div>
              
              <p className="text-gray-700 mb-6">
                EVO Driverは、Audient WEBサイトからダウンロードして頂けます。
              </p>
              
              <a
                href="https://audient.com/products/audio-interfaces/evo8/downloads/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                <Download className="w-5 h-5" />
                ダウンロードはこちら
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bundle Software Section - 完全复制 ORIA 的 */}
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
                  <Image src="/images/brands/audient/Oria/handlesoft_01.svg" alt="Softube" width={120} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/Oria/handlesoft_02.webp" alt="Softube Flow" width={300} height={180} className="w-full h-auto rounded-lg" />
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
                  <Image src="/images/brands/audient/Oria/handlesoft_03.svg" alt="GForce" width={120} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/Oria/handlesoft_04.webp" alt="GForce AXXESS" width={300} height={180} className="w-full h-auto rounded-lg" />
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
                  <Image src="/images/brands/audient/Oria/handlesoft_05.png" alt="Strymon" width={120} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/Oria/handlesoft_06.png" alt="BigSky" width={300} height={180} className="w-full h-auto rounded-lg" />
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
                  <Image src="/images/brands/audient/Oria/handlesoft_07.png" alt="Steinberg" width={120} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/Oria/handlesoft_08.png" alt="Cubase" width={300} height={180} className="w-full h-auto rounded-lg" />
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
                  <Image src="/images/brands/audient/Oria/handlesoft_09.png" alt="Steinberg" width={120} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/Oria/handlesoft_10.jpg" alt="Retrologue" width={300} height={180} className="w-full h-auto rounded-lg" />
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
                  <Image src="/images/brands/audient/Oria/handlesoft_11.png" alt="GForce" width={120} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/Oria/handlesoft_12.png" alt="M-Tron Pro LE" width={300} height={180} className="w-full h-auto rounded-lg" />
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
                  <Image src="/images/brands/audient/Oria/handlesoft_13.png" alt="Two Notes" width={120} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/Oria/handlesoft_14.png" alt="Torpedo" width={300} height={180} className="w-full h-auto rounded-lg" />
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
                  <Image src="/images/brands/audient/Oria/handlesoft_15.svg" alt="Subito Piano" width={120} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/Oria/handlesoft_16.svg" alt="Subito Piano" width={300} height={180} className="w-full h-auto rounded-lg" />
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
                  <Image src="/images/brands/audient/Oria/handlesoft_17.png" alt="Waldorf" width={120} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/Oria/handlesoft_18.png" alt="Waldorf Edition" width={300} height={180} className="w-full h-auto rounded-lg" />
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
                  <Image src="/images/brands/audient/Oria/handlesoft_19.png" alt="Produce Like A Pro" width={150} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/Oria/handlesoft_20.png" alt="Produce Like A Pro" width={300} height={180} className="w-full h-auto rounded-lg" />
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
                  <Image src="/images/brands/audient/Oria/handlesoft_21.png" alt="Loopcloud" width={150} height={30} />
                </div>
                <div className="mb-4">
                  <Image src="/images/brands/audient/Oria/handlesoft_22.png" alt="Loopcloud" width={300} height={180} className="w-full h-auto rounded-lg" />
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

      {/* FAQ Section */}
      <section id="faq" className="py-20 scroll-mt-24 bg-gray-200">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">よくある質問</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column */}
              <div className="space-y-4">
                {/* FAQ Item 1 */}
                <div className="bg-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq1")}
                    className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-400 transition-colors rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">③</span>
                      <span className="font-medium text-gray-900 text-left">EVOアプリのミキサーはどのようにリセットできますか？</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq1 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq1 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4 text-gray-700 leading-relaxed text-left">
                      <p>
                        もしEVOアプリを使ってサウンドのバランスやレベルをミキシング中に、セッティングをやり直したくなったり、トラブルが起こったりした場合には、初期設定に戻すことが可能です。
                      </p>
                      
                      <div className="flex justify-center my-6">
                        <Image
                          src="/images/brands/audient/evo8/Q&A_01.png"
                          alt="EVO Mixer Interface"
                          width={800}
                          height={500}
                          className="rounded-lg w-full h-auto"
                        />
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-3">MacOSの場合</h4>
                          <ol className="list-decimal list-inside space-y-2 ml-4">
                            <li>まず、EVOアプリのメニューバーから「Quit（終了）」を選択します。</li>
                            <li>次にファインダーを開き、メニューバーにある「移動」メニューをクリックした後、ALTキーを押して「ライブラリ」をクリック、その後、Application Support &gt; Audient &gt; EVO &gt; state.xmlの順に開きます。</li>
                            <li>最後に、「state.xml」ファイルをゴミ箱へドラッグ＆ドロップし削除します。</li>
                            <li>EVOアプリを再起動するとミキサーのセッティングはリセットされています。</li>
                          </ol>
                        </div>

                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-3">Windowsの場合</h4>
                          <ol className="list-decimal list-inside space-y-2 ml-4">
                            <li>まず、システムトレイのEVOアプリを終了します。</li>
                            <li>次にファイルエクスプローラーを立ち上げ、以下の順番でフォルダーを開いてください。</li>
                          </ol>
                          <p className="ml-8 mt-2 mb-4">
                            OS（C:）ドライブ &gt; ユーザー &gt; （あなたのPCの名前） &gt; AppData &gt; Roaming &gt; Audient &gt; EVO &gt; state.xml
                          </p>
                          <p className="mb-2">もし上記の場所にファイルが見つからない場合は以下を試してください。</p>
                          <ul className="list-disc list-inside space-y-2 ml-6">
                            <li>
                              <strong>Windows 7の場合</strong> – ウィンドウのメニューバーから「整理」のドロップダウンメニューから「フォルダーと検索のオプション」を選択します。フォルダーオプション上で「表示」タブを選択し「隠しファイル、隠しフォルダーおよび隠しドライブを表示する」にチェックを入れて下さい。
                            </li>
                            <li>
                              <strong>Windows 8または10の場合</strong> – ファイルエクスプローラーの「表示」メニューから「隠しファイル」にチェックを入れて下さい。
                            </li>
                          </ul>
                          <ol className="list-decimal list-inside space-y-2 ml-4 mt-4" start={3}>
                            <li>最後に、「state.xml」ファイルを削除します。</li>
                            <li>EVOアプリを再起動するとミキサーのセッティングはリセットされています。</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* FAQ Item 3 */}
                <div className="bg-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq3")}
                    className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-400 transition-colors rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">③</span>
                      <span className="font-medium text-gray-900 text-left">ストリーミングなどに使うループバック機能はないのですか？</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq3 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq3 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4 text-gray-700 leading-relaxed text-left">
                      <p>
                        EVO Mixerを用いれば、ループバック機能を使うことが出来ます。スクリーンショットのように、EVOドロップダウンメニューで、Set Loop-back Sourceからループバックの音源を選択します。
                      </p>
                      
                      <div className="flex justify-center my-6">
                        <Image
                          src="/images/brands/audient/evo8/Q&A_04.png"
                          alt="EVO Loop-back Source Menu"
                          width={800}
                          height={500}
                          className="rounded-lg w-full h-auto"
                        />
                      </div>

                      <p>
                        ドライバーがインストールされるとevo Mixerを使うことが出来ます。
                      </p>
                      <p className="text-sm text-gray-600 italic">
                        （注：EVO 4と同様のLoopback設定が出来る専用のLoopback Mixerではありません。）
                      </p>
                    </div>
                  )}
                </div>

                {/* FAQ Item 5 */}
                <div className="bg-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq5")}
                    className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-400 transition-colors rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">③</span>
                      <span className="font-medium text-gray-900 text-left">出力のミュートとミュート解除のやり方を教えて下さい</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq5 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq5 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4 text-gray-700 leading-relaxed text-left">
                      <p>
                        本機には出力と4つの入力をミュートする機能があります。いずれかのチャンネルボタンとボリュームボタンを同時に長押しすると、入出力ともにミュートできます。
                      </p>
                      
                      <p>
                        この時、ボタンは点滅してミュート状態を表示します。ミュートの解除は、同じようにボタンを長押しします。
                      </p>

                      <div className="flex justify-center my-6">
                        <Image
                          src="/images/brands/audient/evo8/Q&A_06.jpg"
                          alt="Mute and Unmute Output"
                          width={800}
                          height={500}
                          className="rounded-lg w-full h-auto"
                        />
                      </div>

                      <p>
                        この機能は、ポッドキャスト中に緊急に音声を止めたいときなど、ミュートできる便利な機能です。
                      </p>
                    </div>
                  )}
                </div>

                {/* FAQ Item 7 */}
                <div className="bg-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq7")}
                    className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-400 transition-colors rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">③</span>
                      <span className="font-medium text-gray-900 text-left">ファンタム電源について</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq7 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq7 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4 text-gray-700 leading-relaxed text-left">
                      <p>
                        コンデンサーマイクの使用にはファンタム電源が必要です。48Vの電源はXLRケーブル経由でマイクロホンに供給されます。稀にファンタム電源がマイクロホンにダメージを与える場合がありますので、マイクの説明書を事前にご確認ください。
                      </p>
                      
                      <p>
                        EVO 8でのファンタム電源の投入は、チャンネルを選択して48Vボタンを押すだけで完了します。このファンタム電源がオンのチャンネルは、LEDがレッドに点灯します。
                      </p>

                      <div className="flex justify-center my-6">
                        <Image
                          src="/images/brands/audient/evo8/Q&A_08.png"
                          alt="Phantom Power"
                          width={800}
                          height={500}
                          className="rounded-lg w-full h-auto"
                        />
                      </div>

                      <p>
                        EVO 8がUSB-Cに接続され1.5Aが供給されていれば、4チャンネル全てにファンタム電源が供給できます。
                      </p>
                      
                      <p className="text-sm text-gray-600">
                        ※ EVO 8がUSB-Aポートに接続（給電）されているときは、2チャンネルしかファンタム電源は供給されません。
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* FAQ Item 2 */}
                <div className="bg-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq2")}
                    className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-400 transition-colors rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">③</span>
                      <span className="font-medium text-gray-900 text-left">どうすればアーティストミックスを分離することができますか？</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq2 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq2 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4 text-gray-700 leading-relaxed text-left">
                      <p>
                        Setup (セットアップ)メニューから、"Enable Artist Mix"をクリックし、有効にすると、アウトプット3+4(ヘッドホン2)へ、アーティストミックスを送ることができます。
                      </p>
                      
                      <div className="flex justify-center my-6">
                        <Image
                          src="/images/brands/audient/evo8/Q&A_02.png"
                          alt="Enable Artist Mix Menu"
                          width={800}
                          height={500}
                          className="rounded-lg w-full h-auto"
                        />
                      </div>

                      <p>
                        ミキサーのマスターセクションにあるOutput 3+4をクリックすると、第二のミキサーが表示され（上部に黄色い線が現れます）、アウトプット3+4へ送るオーディオが調整できます。
                      </p>

                      <div className="flex justify-center my-6">
                        <Image
                          src="/images/brands/audient/evo8/Q&A_03.png"
                          alt="EVO Mixer with Artist Mix"
                          width={800}
                          height={500}
                          className="rounded-lg w-full h-auto"
                        />
                      </div>

                      <p>
                        例えば、エンジニアがメインスピーカー(アウトプット1+2)を使用して全体のミックスを聴き、アーティストがヘッドホン(アウトプット3+4)を使用してクリックやマイクロホンのダイレクトモニターを聴く、というモニタリングに適応できます。
                      </p>
                    </div>
                  )}
                </div>

                {/* FAQ Item 4 */}
                <div className="bg-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq4")}
                    className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-400 transition-colors rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">③</span>
                      <span className="font-medium text-gray-900 text-left">スマートミューティング出力はどのように機能しますか？</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq4 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq4 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4 text-gray-700 leading-relaxed text-left">
                      <p>
                        EVO 8はヘッドホンを挿すと自動でモニタースピーカーはミュートされます。例えばヘッドホンを1に挿すとスピーカー出力している１L/2Rが、ヘッドホンを2に挿すとスピーカー出力している3L/4Rがミュートされます。
                      </p>
                      
                      <div className="flex justify-center my-6">
                        <Image
                          src="/images/brands/audient/evo8/Q&A_05.jpg"
                          alt="Smart Muting Output"
                          width={800}
                          height={500}
                          className="rounded-lg w-full h-auto"
                        />
                      </div>

                      <p>
                        ヘッドホンとスピーカーを同時に鳴らしたい場合は、スピーカーを1L/2Rへ、ヘッドホンを全面にあるヘッドホンポートの２へ接続します。
                      </p>
                      
                      <p>
                        こうすることでヘッドホンとスピーカーのレベルや左右の定位を個別に調整することが可能です。
                      </p>
                      
                      <p className="text-sm text-gray-600">
                        詳しくはこちらのページをご覧ください。
                      </p>
                    </div>
                  )}
                </div>

                {/* FAQ Item 6 */}
                <div className="bg-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq6")}
                    className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-400 transition-colors rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">③</span>
                      <span className="font-medium text-gray-900 text-left">iOSとの互換性について</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq6 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq6 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4 text-gray-700 leading-relaxed text-left">
                      <div className="flex justify-center my-6">
                        <Image
                          src="/images/brands/audient/evo8/Q&A_07.png"
                          alt="iOS Compatibility"
                          width={800}
                          height={500}
                          className="rounded-lg w-full h-auto"
                        />
                      </div>

                      <p>
                        EVO 8はiPadやiPhoneといったiOSデバイスには対応しておりません。サポート対象外となりますのでiOSデバイスでのご使用はお控えください。
                      </p>
                    </div>
                  )}
                </div>

                {/* FAQ Item 8 */}
                <div className="bg-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq("faq8")}
                    className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-400 transition-colors rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">③</span>
                      <span className="font-medium text-gray-900 text-left">Cubasis LE3とiPhone / iPadを組み合わせて使用できますか？</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ml-3">{expandedFaq.faq8 ? '−' : '+'}</span>
                  </button>
                  {expandedFaq.faq8 && (
                    <div className="p-4 bg-gray-300 border-t border-gray-400 space-y-4 text-gray-700 leading-relaxed text-left">
                      <p>
                        現在、iPhone / iPadとCubasis LE3に対応しているのは、evo4、iD4、iD4mkⅡの３機種のみです。
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs Section */}
      <section id="specs" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">製品仕様</h2>
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="space-y-6">
                {/* 対応OS、最小システム要件 */}
                <div className="border-b border-gray-300 pb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">対応OS、最小システム要件</h3>
                  <div className="space-y-1.5 text-sm text-gray-700">
                    <p>Mac：macOS 10.7.5 (Lion)またはそれ以降、Intel CPU、1GB RAMメモリ以上</p>
                    <p>Windows：Windows 7またはそれ以降（32bit または 64bit）、Intel Core 2 @1.6Ghzまたは同等のAMD製CPU、1GB RAMメモリ以上</p>
                    <p className="mt-2">※最新のドライバーをお使いください</p>
                  </div>
                </div>

                {/* マイク・プリアンプ */}
                <div className="border-b border-gray-300 pb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">マイク・プリアンプ</h3>
                  <div className="space-y-1.5 text-sm text-gray-700">
                    <p>マイクゲインレンジ：58dB</p>
                    <p>ライン入力ゲイン：58dB w/-10dB Pad</p>
                    <p>ファンタム電源：48v +/-4v @ 10mA/Channel（USB-A = 2CH）</p>
                    <p>CMRR：＞85dB @ 1kHz</p>
                    <p>最大入力レベル：+16dBu</p>
                    <p>入力インピーダンス（Mic）：＞3kΩバランス</p>
                    <p>入力インピーダンス（Line）：＞10kΩバランス</p>
                    <p>周波数特性：+/-0.5dB 10Hz 〜 40kHz</p>
                    <p>チャンネル間クロストーク：＜-105dBu @ 1kHz &amp; 10kHz</p>
                    <p>THD+N @ 0dBu（1kHz）：＜0.0015%</p>
                    <p>SNR：100dB</p>
                    <p>マイク入力EIN：＜-128dBu</p>
                    <p>XLR：Pin 2（Hot）、Pin3（Cold）＆ Pin1（Shield）</p>
                    <p>1/4インチ・ジャック：TIP（Hot）、RING（Cold）&amp; SLEEVE（Shield）</p>
                  </div>
                </div>

                {/* D.I */}
                <div className="border-b border-gray-300 pb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">D.I</h3>
                  <div className="space-y-1.5 text-sm text-gray-700">
                    <p>D.Iゲイン：58dB</p>
                    <p>最大入力レベル：+10dBu</p>
                    <p>入力インピーダンス：1MegΩ Unbalanced</p>
                    <p>周波数特性：+/-0.5dB 10Hz 〜 50kHz</p>
                    <p>THD+N @ 0dBu（1kHz）：＜0.3%</p>
                    <p>SNR：100dB</p>
                    <p>1/4インチ・ジャック：TIP（Hot） &amp; SLEEVE（Shield）</p>
                  </div>
                </div>

                {/* DAC 出力 */}
                <div className="border-b border-gray-300 pb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">DAC 出力</h3>
                  <div className="space-y-1.5 text-sm text-gray-700">
                    <p>最大出力レベル：+11dBu</p>
                    <p>デジタルリファレンスレベル：0dBFS = +11dBu</p>
                    <p>出力インピーダンス：＜100Ω Balanced</p>
                    <p>周波数特性：+/-0.5dB 10Hz 〜 Fs/2</p>
                    <p>クロストーク：＜-110dBu @ 1kHz</p>
                    <p>THD+N @ -1dBFS (1kHz)：＜0.0015%</p>
                    <p>ダイナミックレンジ：113dB A-weighted</p>
                    <p>1/4インチ・ジャック：113dB A-weighted</p>
                  </div>
                </div>

                {/* ヘッドホン出力 */}
                <div className="border-b border-gray-300 pb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">ヘッドホン出力</h3>
                  <div className="space-y-1.5 text-sm text-gray-700">
                    <p>最大出力レベル：-8 〜 +50 dB</p>
                    <p>デジタルレファレンスレベル：-18 〜 +40 dB</p>
                    <p>出力インピーダンス：＜50Ω</p>
                    <p>クロストーク：-110dBu@1kHz</p>
                    <p>THD+N @ -1dBFS (1kHz)：＜0.0015％</p>
                    <p>ダイナミックレンジ：113dB</p>
                    <p>最大レベル→ 30ohms：+0.5dBu, 0.0025% THD+N, 1.16Vpk Power : 45mW</p>
                    <p>最大レベル→ 60ohms: +4.22dBu, 0.0015% THD+N, 1.78Vpk Power : 52mW</p>
                    <p>最大レベル→ 600ohms: +10.1dBu, 0.0018% THD+N, 3.52Vpk Power : 20mW</p>
                    <p>1/4インチ・ジャック：TRS</p>
                  </div>
                </div>

                {/* DSP ミキサー・レイテンシー */}
                <div className="border-b border-gray-300 pb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">DSP ミキサー・レイテンシー（IN → OUT）</h3>
                  <div className="space-y-1.5 text-sm text-gray-700">
                    <p>44.1 kHz：0.594ms</p>
                    <p>48.0 kHz：0.552ms</p>
                    <p>88.2 kHz：0.302ms</p>
                    <p>96.0 kHz：0.281ms</p>
                  </div>
                </div>

                {/* DAW 再生レイテンシー */}
                <div className="border-b border-gray-300 pb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">DAW 再生レイテンシー（@ 32サンプル・バッファーでのソフト・インストルメントの再生）</h3>
                  <div className="space-y-1.5 text-sm text-gray-700">
                    <p>44.1 kHz：〜2.5ms</p>
                    <p>96.0 kHz：〜2ms</p>
                  </div>
                </div>

                {/* DAW ソフトウェア・モニター・レイテンシー */}
                <div className="border-b border-gray-300 pb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">DAW ソフトウェア・モニター・レイテンシー @ 32サンプル・バッファー（IN → OUT）</h3>
                  <div className="space-y-1.5 text-sm text-gray-700">
                    <p>44.1 kHz：5ms</p>
                    <p>96.0 kHz：4.1ms</p>
                  </div>
                </div>

                {/* USB 2.0 High Speed */}
                <div className="border-b border-gray-300 pb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">USB 2.0 High Speed</h3>
                  <div className="space-y-1.5 text-sm text-gray-700">
                    <p>入力チャンネル：2 Analogue</p>
                    <p>出力チャンネル：2 Digital</p>
                    <p>コネクター：USB Type-C</p>
                    <p>同梱ケーブル：1m USB 2.0 Type-C 〜 USB Type-C</p>
                  </div>
                </div>

                {/* サイズ、重量 */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">サイズ、重量</h3>
                  <div className="space-y-1.5 text-sm text-gray-700">
                    <p>W190mm x H70mm x D70mm</p>
                    <p>475g</p>
                    <p className="mt-2">※ レイテンシーのパフォーマンスは、バッファーサイズ、CPUの負荷、OSによって異なります。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

