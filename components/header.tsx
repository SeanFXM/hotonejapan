"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, ChevronDown } from "@/lib/icons"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 50)
      setScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const shadowOpacity = Math.max(0, 1 - scrollY / 500)

  return (
    <>
      <div
        className={`bg-black transition-all duration-500 ease-in-out ${
          isScrolled ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
        style={{ willChange: "transform, opacity" }}
      >
        <div className="flex items-center justify-center py-6">
          <Link href="/" className="group">
            <Image
              src="/hotone-japan-logo.png"
              alt="Hotone Japan Logo"
              width={96}
              height={32}
              className="h-8 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>
      </div>

      <header
        className={`bg-black sticky top-0 z-[100] border-t border-gray-800 transition-all duration-300 relative ${
          isScrolled ? "shadow-lg" : "shadow-[0_8px_30px_rgb(0,0,0,0.4)]"
        }`}
      >
        <div className="flex items-center justify-center py-3 relative">
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-2 bg-white text-black text-sm font-medium hover:bg-gray-200 transition-colors rounded"
            >
              ホーム
            </Link>
            <span className="text-gray-500 mx-1">|</span>
            <Link
              href="/brands"
              className="px-4 py-2 text-sm text-white hover:text-gray-300 transition-colors font-medium"
            >
              取扱製品ブランド
            </Link>
            <span className="text-gray-500 mx-1">|</span>
            <Link
              href="/blog"
              className="px-4 py-2 text-sm text-white hover:text-gray-300 transition-colors font-medium"
            >
              ブログ
            </Link>
            <span className="text-gray-500 mx-1">|</span>
            <div className="relative group z-10">
              <button className="px-4 py-2 text-sm text-white hover:text-gray-300 transition-colors font-medium flex items-center gap-1">
                サポート
                <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 mt-2 bg-black/95 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.8)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[200px]">
                <Link
                  href="/support/contact"
                  className="block px-5 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors border-b border-white/5 last:border-b-0 font-medium"
                >
                  お問い合わせ
                </Link>
                <Link
                  href="/support/repair"
                  className="block px-5 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors border-b border-white/5 last:border-b-0 font-medium"
                >
                  修理について
                </Link>
              </div>
            </div>
            <span className="text-gray-500 mx-1">|</span>
            <div className="relative group z-10">
              <button className="px-4 py-2 text-sm text-white hover:text-gray-300 transition-colors font-medium flex items-center gap-1">
                会社案内
                <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 mt-2 bg-black/95 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.8)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[200px]">
                <Link
                  href="/about/company-overview"
                  className="block px-5 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors border-b border-white/5 last:border-b-0 font-medium"
                >
                  会社概要
                </Link>
                <Link
                  href="/about/recruitment"
                  className="block px-5 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors border-b border-white/5 last:border-b-0 font-medium"
                >
                  採用情報
                </Link>
                <Link
                  href="/about/terms-of-use"
                  className="block px-5 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors border-b border-white/5 last:border-b-0 font-medium"
                >
                  サイトご利用案内
                </Link>
                <Link
                  href="/about/privacy-policy"
                  className="block px-5 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors border-b border-white/5 last:border-b-0 font-medium"
                >
                  プライバシーポリシー
                </Link>
              </div>
            </div>
            {/* <span className="text-gray-500 mx-1">|</span>
            <Link
              href="/dealers"
              className="px-4 py-2 text-sm text-white hover:text-gray-300 transition-colors font-medium"
            >
              販売店情報
            </Link> */}
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden absolute right-4 text-white hover:text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-gray-900 border-t border-gray-700 shadow-lg md:hidden">
              <nav className="flex flex-col p-4 gap-2">
                <Link
                  href="/"
                  className="px-4 py-2 bg-white text-black text-sm font-medium rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ホーム
                </Link>
                <Link
                  href="/brands"
                  className="px-4 py-2 text-sm text-white hover:bg-gray-800 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  取扱製品ブランド
                </Link>
                <Link
                  href="/blog"
                  className="px-4 py-2 text-sm text-white hover:bg-gray-800 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ブログ
                </Link>
                <div className="px-4 py-2 text-sm text-white font-medium flex items-center gap-1">
                  サポート
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
                </div>
                <Link
                  href="/support/contact"
                  className="px-6 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  お問い合わせ
                </Link>
                <Link
                  href="/support/repair"
                  className="px-6 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  修理について
                </Link>
                <Link
                  href="/about/company-overview"
                  className="px-6 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  会社概要
                </Link>
                <Link
                  href="/about/recruitment"
                  className="px-6 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  採用情報
                </Link>
                <Link
                  href="/about/terms-of-use"
                  className="px-6 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  サイトご利用案内
                </Link>
                <Link
                  href="/about/privacy-policy"
                  className="px-6 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  プライバシーポリシー
                </Link>
                {/* <Link
                  href="/dealers"
                  className="px-4 py-2 text-sm text-white hover:bg-gray-800 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  販売店情報
                </Link> */}
              </nav>
            </div>
          )}
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none translate-y-full transition-opacity duration-300"
          style={{ opacity: shadowOpacity }}
        />
      </header>
    </>
  )
}
