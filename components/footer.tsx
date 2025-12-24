"use client"

import Link from "next/link"
import { Mail, Wrench, FileText, MapPin } from "@/lib/icons"

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white overflow-hidden">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600 blur-[120px] animate-pulse-slow"></div>
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600 blur-[120px] animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-pink-600 blur-[120px] animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500 animate-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 pb-16 border-b border-gray-800/50 relative">
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

          <div className="mb-8 md:mb-0 flex flex-col items-start">
            <div className="text-xl text-gray-400 mb-4 tracking-wider font-bold">株式会社</div>

            <div className="relative my-4">
              <div className="h-px w-64 bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700 mb-6"></div>
              <h2
                className="text-4xl md:text-5xl font-bold tracking-[0.2em] whitespace-nowrap bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                HOTONE JAPAN
              </h2>
              <div className="h-px w-64 bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700 mt-6"></div>
            </div>

            <div className="text-sm text-gray-400 mt-4 tracking-wide font-light">
              プロフェッショナル音響機器総合代理店
            </div>
          </div>

          <div className="flex gap-4">
            <Link
              href="https://twitter.com"
              target="_blank"
              className="group relative w-14 h-14 flex items-center justify-center bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-[#1DA1F2] transition-all duration-300 shadow-xl hover:shadow-[#1DA1F2]/50 hover:scale-110 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1DA1F2] to-[#0d8bd9] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg
                className="w-6 h-6 relative z-10 transition-transform group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </Link>
            <Link
              href="https://facebook.com"
              target="_blank"
              className="group relative w-14 h-14 flex items-center justify-center bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-[#4267B2] transition-all duration-300 shadow-xl hover:shadow-[#4267B2]/50 hover:scale-110 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#4267B2] to-[#2d4a8f] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg
                className="w-6 h-6 relative z-10 transition-transform group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </Link>
            <Link
              href="https://youtube.com"
              target="_blank"
              className="group relative w-14 h-14 flex items-center justify-center bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-[#FF0000] transition-all duration-300 shadow-xl hover:shadow-[#FF0000]/50 hover:scale-110 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF0000] to-[#cc0000] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg
                className="w-6 h-6 relative z-10 transition-transform group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93-.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </Link>
            <Link
              href="/blog"
              className="group relative w-14 h-14 flex items-center justify-center bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-orange-500 transition-all duration-300 shadow-xl hover:shadow-orange-500/50 hover:scale-110 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg
                className="w-6 h-6 relative z-10 transition-transform group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Company Links */}
          <div className="relative">
            <div className="absolute -left-3 top-0 w-1 h-8 bg-gradient-to-b from-blue-500 to-transparent"></div>
            <h4 className="text-sm font-bold mb-6 text-white uppercase tracking-widest">企業情報</h4>
            <nav className="space-y-4">
              <Link
                href="/about/company-overview"
                className="block text-sm text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-200 relative group"
              >
                <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                会社概要
              </Link>
              <Link
                href="/about/recruitment"
                className="block text-sm text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-200 relative group"
              >
                <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                採用情報
              </Link>
              <Link
                href="/about/terms-of-use"
                className="block text-sm text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-200 relative group"
              >
                <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                サイトご利用案内
              </Link>
              <Link
                href="/about/privacy-policy"
                className="block text-sm text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-200 relative group"
              >
                <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                プライバシーポリシー
              </Link>
            </nav>
          </div>

          {/* Column 2: Customer Support */}
          <div className="relative">
            <div className="absolute -left-3 top-0 w-1 h-8 bg-gradient-to-b from-purple-500 to-transparent"></div>
            <h4 className="text-sm font-bold mb-6 text-white uppercase tracking-widest">サポート</h4>
            <nav className="space-y-4">
              <Link
                href="/support/contact"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-all duration-200 group"
              >
                <Mail className="w-4 h-4 group-hover:scale-125 group-hover:text-purple-400 transition-all" />
                お問い合わせ
              </Link>
              <Link
                href="/support/repair"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-all duration-200 group"
              >
                <Wrench className="w-4 h-4 group-hover:scale-125 group-hover:text-purple-400 transition-all" />
                修理のご依頼
              </Link>
              <Link
                href="/support/repair/warranty-form"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-all duration-200 group"
              >
                <FileText className="w-4 h-4 group-hover:scale-125 group-hover:text-purple-400 transition-all" />
                製品保証規定
              </Link>
            </nav>
          </div>

          {/* Column 3: Purchase Info */}
          <div className="relative">
            <div className="absolute -left-3 top-0 w-1 h-8 bg-gradient-to-b from-pink-500 to-transparent"></div>
            <h4 className="text-sm font-bold mb-6 text-white uppercase tracking-widest">ご購入</h4>
            <div className="space-y-4">
              <p className="text-sm text-gray-400">お買い求めはこちら</p>
              <Link
                href="/dealers"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-all duration-200 group"
              >
                <MapPin className="w-4 h-4 group-hover:scale-125 group-hover:text-pink-400 transition-all" />
                お近くの販売店を探す
              </Link>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="relative">
            <div className="absolute -left-3 top-0 w-1 h-8 bg-gradient-to-b from-orange-500 to-transparent"></div>
            <h4 className="text-sm font-bold mb-6 text-white uppercase tracking-widest">最新情報</h4>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">新製品情報やイベント情報をお届けします</p>
            <Link
              href="/blog"
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-purple-500/50 hover:scale-105"
            >
              ブログを見る
            </Link>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-800/50 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-2 h-2 bg-blue-500 animate-pulse"></div>
            <div className="w-2 h-2 bg-purple-500 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-2 h-2 bg-pink-500 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
          </div>
          <p className="text-sm text-gray-500 font-light tracking-wide">
            Copyright © {new Date().getFullYear()} 株式会社 Hotone Japan. All rights reserved.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.1); }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>
    </footer>
  )
}
