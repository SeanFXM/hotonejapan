"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getLatestBlogPosts } from "@/lib/blog-data"

export function BlogSlider() {
  // 获取最新的8条博客文章
  const blogPosts = getLatestBlogPosts(8)
  
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 350
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
      setTimeout(checkScrollButtons, 300)
    }
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">ブログ</h2>
          <p className="text-gray-500">Blog</p>
        </div>

        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center transition-opacity ${
              canScrollLeft ? "opacity-100 hover:bg-gray-100" : "opacity-30 cursor-not-allowed"
            }`}
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center transition-opacity ${
              canScrollRight ? "opacity-100 hover:bg-gray-100" : "opacity-30 cursor-not-allowed"
            }`}
            disabled={!canScrollRight}
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            onScroll={checkScrollButtons}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-8 pb-4"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${String(post.id)}`}
                className="flex-shrink-0 w-[300px] group"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                    <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                    <div className="mt-4 w-8 h-1 bg-gray-900"></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
