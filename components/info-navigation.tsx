"use client"

import { useState } from "react"
import Link from "next/link"
import { Package, Headphones, FileText, Bell } from "lucide-react"
import { getLatestBlogPosts } from "@/lib/blog-data"

export function InfoNavigation() {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { name: "新製品情報", icon: Package },
    { name: "サポート情報", icon: Headphones },
    { name: "ブログ情報", icon: FileText },
    { name: "お知らせ", icon: Bell },
  ]

  // 始终读取最新的5条博客
  const latestBlogPosts = getLatestBlogPosts(5)

  const content = [
    // 新製品情報
    [
      {
        text: "strymon：100%アナログ回路で再現する、真空管ライクな倍音とサチュレーション「FAIRFAX」が登場",
        brand: "Strymon",
        href: "/brands/strymon/products/fairfax",
      },
      {
        text: "strymon：オイル缶エコーのノスタルジックで魅惑のサウンドを現代に甦らせる「OLIVERA」が登場",
        brand: "Strymon",
        href: "/brands/strymon/products/olivera",
      },
      {
        text: "strymon：Karplus-Strong シンセシスを採用したユーロラック・ボイス・モジュール「SuperKar+」が登場",
        brand: "Strymon",
        href: "/brands/strymon/products/superkar-plus",
      },
      {
        text: "HOTONE：どこでも練習＆録音を可能にする、超小型モデリングアンプ「PULZE MINI」が登場",
        brand: "Hotone",
        href: "/brands/hotone/products/pulze-mini",
      },
      {
        text: "HOTONE：最新のIRとアルゴリズムで空想のアンビエントを生むデュアルリバーブ「VERBERA」が登場",
        brand: "Hotone",
        href: "/brands/hotone/products/verbera",
      },
    ],
    // サポート情報
    [],
    latestBlogPosts.map((post) => ({
      text: post.title,
      brand: "ブログ",
      date: post.date,
      id: post.id,
    })),
    // お知らせ
    [
      { 
        text: "新規ブランド代理業務開始のお知らせ", 
        brand: "お知らせ", 
        href: "/announcements/new-distributors",
      },
      { 
        text: "年末年始休業のお知らせ", 
        brand: "お知らせ", 
        href: "/announcements/year-end-holiday",
      },
    ],
  ]

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-3 relative">
              News
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-900 to-transparent"></div>
            </h2>
          </div>
          <p className="text-gray-600 text-base mt-6 font-medium">最新情報をお届けします</p>
        </div>

        <div className="flex justify-center gap-4 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab, index) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(index)}
                className={`${
                  activeTab === index
                    ? "bg-gray-900 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                } flex items-center gap-2.5 py-3.5 px-6 rounded-lg text-base font-semibold transition-all duration-200 whitespace-nowrap border border-gray-200`}
              >
                <Icon className="w-5 h-5" />
                {tab.name}
              </button>
            )
          })}
        </div>

        <div className="bg-gray-50 p-6 md:p-8 shadow-xl border border-gray-200">
          <div className="space-y-1">
            {content[activeTab].length > 0 ? (
              content[activeTab].map((item, index) => {
                const href = item.id ? `/blog/${String(item.id)}` : (item as any).href || "#"
                const isExternal = href.startsWith("http")
                
                const linkContent = (
                  <>
                    <div className="flex items-baseline gap-4 mb-2">
                      {index === 0 && (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded uppercase">New</span>
                      )}
                      {activeTab !== 0 && item.date && (
                        <time className="text-xs text-gray-500 font-mono flex-shrink-0">{item.date}</time>
                      )}
                      <span className="text-xs text-gray-600 font-medium flex-shrink-0">{item.brand}</span>
                    </div>
                    <p className="text-base text-gray-800 group-hover:text-gray-900 leading-relaxed font-medium">
                      {item.text}
                    </p>
                  </>
                )

                return (
                  <div key={index}>
                    {href === "#" || isExternal ? (
                      <a
                        href={href}
                        className="group block py-5 px-4 hover:bg-white transition-all duration-200"
                      >
                        {linkContent}
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className="group block py-5 px-4 hover:bg-white transition-all duration-200"
                      >
                        {linkContent}
                      </Link>
                    )}
                    {index < content[activeTab].length - 1 && <div className="border-b border-gray-200" />}
                  </div>
                )
              })
            ) : (
              <div className="py-8 text-center text-gray-500">
                <p>コンテンツを準備中です</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
