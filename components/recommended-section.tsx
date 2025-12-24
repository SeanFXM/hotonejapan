"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getLatestBlogPosts } from "@/lib/blog-data"

export function RecommendedSection() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const blogPosts = getLatestBlogPosts(8)

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById("recommended-scroll")
    if (!container) return

    const cardWidth = 350
    const gap = 24
    const scrollAmount = (cardWidth + gap) * 4

    const newPosition = direction === "left" ? scrollPosition - scrollAmount : scrollPosition + scrollAmount

    container.scrollTo({
      left: newPosition,
      behavior: "smooth",
    })
    setScrollPosition(newPosition)
  }

  return (
    <section className="bg-gray-50 py-16 md:py-20">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">ブログ</h2>
            <p className="text-muted-foreground">Blog</p>
          </div>
          <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 text-gray-800 p-3 shadow-lg transition-all duration-300 hover:scale-110 border border-gray-200"
            aria-label="前へ"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 text-gray-800 p-3 shadow-lg transition-all duration-300 hover:scale-110 border border-gray-200"
            aria-label="次へ"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            id="recommended-scroll"
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-12"
          >
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${String(post.id)}`}
                className="flex-shrink-0 w-[350px] bg-white overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border border-gray-200"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                  <h3 className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{post.excerpt}</p>
                  <span className="inline-block px-3 py-1 bg-black text-white text-xs font-medium">
                    {post.categories[0] || "ブログ"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
