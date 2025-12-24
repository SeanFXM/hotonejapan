"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Music } from "lucide-react"
import { BlogSlider } from "@/components/blog-slider"
import { allBlogPosts, getCategoryCount } from "@/lib/blog-data"
import { useSearchParams } from "next/navigation"

const categories = [
  { name: "すべて", count: allBlogPosts.length },
  { name: "HOTONE", count: getCategoryCount("HOTONE") },
  { name: "エフェクター", count: getCategoryCount("エフェクター") },
  { name: "AMPERO", count: getCategoryCount("AMPERO") },
  { name: "インタビュー", count: getCategoryCount("インタビュー") },
  { name: "アンプモデラー", count: getCategoryCount("アンプモデラー") },
  { name: "Audient", count: getCategoryCount("Audient") },
  { name: "オーディオインターフェイス", count: getCategoryCount("オーディオインターフェイス") },
]

export default function BlogPage() {
  const searchParams = useSearchParams()
  const selectedCategory = searchParams.get("category") || "すべて"

  const filteredPosts =
    selectedCategory === "すべて"
      ? allBlogPosts
      : allBlogPosts.filter((post) => post.categories.includes(selectedCategory))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-[#161616] text-white py-8 md:py-12 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Music className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Hot Blog</h1>
              </div>

              <div className="space-y-3 text-white/90 text-base md:text-lg">
                <p>最新の音響機器情報から、プロミュージシャンの使用レビュー、音楽制作のヒントまで。</p>
                <p>Hotone Japanが厳選した、音楽制作に役立つ情報をお届けします。</p>
              </div>

              <Link
                href="/"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mt-4"
              >
                <ArrowLeft className="w-5 h-5" />
                ホームに戻る
              </Link>
            </div>

            {/* Right Image */}
            <div className="relative h-[200px] md:h-[250px] lg:h-[280px]">
              <Image
                src="/images/hero-products.jpg"
                alt="音響機器コレクション"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Blog Grid with Sidebar */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
          {/* Left Sidebar */}
          <aside className="space-y-6">
            {/* Search Box */}
            <div className="bg-[#3a3a3a] rounded-2xl p-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ブログ記事をさがす"
                  className="w-full bg-[#2a2a2a] text-white placeholder:text-gray-400 rounded-lg px-4 py-3 pr-20 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors">
                  検索
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-[#3a3a3a] rounded-2xl p-6">
              <h2 className="text-white text-xl font-bold mb-6">カテゴリー</h2>
              <div className="space-y-1">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={`/blog?category=${category.name}`}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between group ${
                      selectedCategory === category.name ? "bg-orange-500 text-white" : "text-white hover:bg-[#4a4a4a]"
                    }`}
                  >
                    <span
                      className={
                        selectedCategory === category.name ? "" : "group-hover:text-orange-400 transition-colors"
                      }
                    >
                      {category.name}
                    </span>
                    <span className={selectedCategory === category.name ? "text-white" : "text-gray-400 text-sm"}>
                      ({category.count})
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content - Blog Grid */}
          <main>
            {selectedCategory !== "すべて" && (
              <div className="mb-6">
                <p className="text-gray-600">
                  <span className="font-bold text-orange-500">{selectedCategory}</span> の記事：
                  <span className="font-bold">{filteredPosts.length}</span>件
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${String(post.id)}`}
                  className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-5">
                    <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                    <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                    <div className="flex flex-wrap gap-2 justify-center">
                      {post.categories.map((category) => (
                        <span
                          key={category}
                          className="inline-block px-3 py-1 bg-black text-white text-xs font-medium rounded-full"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">該当する記事が見つかりませんでした。</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Blog Slider */}
      <BlogSlider />
    </div>
  )
}
