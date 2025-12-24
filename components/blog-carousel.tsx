"use client"

import Link from "next/link"
import Image from "next/image"
import { getLatestBlogPosts } from "@/lib/blog-data"

export function BlogCarousel() {
  const blogPosts = getLatestBlogPosts(8)

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 text-foreground">Blog</h2>
          <div className="flex justify-center mb-3">
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
          </div>
          <p className="text-sm md:text-base text-muted-foreground tracking-wide">ブログ</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${String(post.id)}`}
              className="group block bg-white overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-4">
                <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                <h3 className="text-base font-bold text-foreground mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>

                <div className="flex justify-center">
                  <span className="inline-block px-4 py-1.5 bg-black text-white text-xs font-medium">
                    {post.categories[0] || "ブログ"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-3 bg-black text-white font-medium hover:bg-gray-800 transition-colors duration-300 group"
          >
            すべてのブログを見る
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
