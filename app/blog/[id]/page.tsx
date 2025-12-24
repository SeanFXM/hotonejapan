"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { BlogSlider } from "@/components/blog-slider"
import { blogPostDetails, getCategoryCount } from "@/lib/blog-data"

const categories = [
  { name: "すべて", count: Object.keys(blogPostDetails).length },
  { name: "HOTONE", count: getCategoryCount("HOTONE") },
  { name: "エフェクター", count: getCategoryCount("エフェクター") },
  { name: "AMPERO", count: getCategoryCount("AMPERO") },
  { name: "インタビュー", count: getCategoryCount("インタビュー") },
  { name: "アンプモデラー", count: getCategoryCount("アンプモデラー") },
  { name: "Audient", count: getCategoryCount("Audient") },
  { name: "オーディオインターフェイス", count: getCategoryCount("オーディオインターフェイス") },
]

export default function BlogPost() {
  const params = useParams()
  // 确保 id 是字符串格式
  const blogId = String(params.id)
  const post = blogPostDetails[blogId]

  if (!post) {
    // 调试信息：检查可用的键和传入的ID
    const availableIds = Object.keys(blogPostDetails)
    console.error("博客未找到:", {
      requestedId: blogId,
      requestedIdType: typeof blogId,
      availableIds: availableIds.slice(0, 5),
      paramsId: params.id,
      paramsIdType: typeof params.id,
    })
    
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">記事が見つかりません</h1>
          <p className="text-gray-500 mb-4">ID: {blogId}</p>
          <Link href="/blog" className="text-primary hover:underline">
            ブログ一覧に戻る
          </Link>
        </div>
      </div>
    )
  }

  const allPostIds = Object.keys(blogPostDetails).sort((a, b) => Number(b) - Number(a))
  const currentIndex = allPostIds.indexOf(blogId)
  const prevPostId = currentIndex < allPostIds.length - 1 ? allPostIds[currentIndex + 1] : null
  const nextPostId = currentIndex > 0 ? allPostIds[currentIndex - 1] : null

  const renderParagraphWithLinks = (text: string) => {
    const parts = []
    let lastIndex = 0
    const linkRegex = /\[([^\]]+)\]$$([^)]+)$$/g
    let match

    while ((match = linkRegex.exec(text)) !== null) {
      // 添加链接前的文本
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index))
      }
      // 添加链接
      parts.push(
        <a
          key={match.index}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline font-medium"
        >
          {match[1]}
        </a>,
      )
      lastIndex = match.index + match[0].length
    }

    // 添加剩余文本
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex))
    }

    return parts.length > 0 ? parts : text
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[300px] flex items-center bg-hero-dark">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance text-white">{post.title}</h1>
            <p className="text-lg text-gray-300">{post.date}</p>
          </div>
          <div className="hidden md:block flex-shrink-0 ml-8">
            <Image
              src="/images/hero-products.jpg"
              alt="Products"
              width={400}
              height={300}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-[320px] flex-shrink-0 -ml-[30px]">
            <div className="sticky top-24 space-y-6 rounded-lg shadow-md bg-card-dark p-6">
              {/* Search */}
              <div className="bg-card-darker p-6 rounded-xl">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="ブログ記事をさがす"
                    className="w-full py-3 pl-4 pr-24 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    className="bg-input-dark"
                  />
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 rounded-lg font-medium text-white transition-colors hover:opacity-90"
                    className="bg-accent-orange"
                  >
                    検索
                  </button>
                </div>
              </div>

              {/* Categories */}
              <div className="bg-card-darker p-6 rounded-xl">
                <h3 className="font-semibold mb-4 text-white text-lg">カテゴリー</h3>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={`/blog?category=${category.name}`}
                      className="flex items-center justify-between py-3 px-4 rounded-md transition-colors text-white hover:bg-white/10"
                    >
                      <span className="text-sm">{category.name}</span>
                      <span className="text-sm text-gray-400">({category.count})</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Article Content */}
          <article className="flex-1 bg-card p-8 rounded-lg shadow-md">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.707 9.293l-5-5a1 1 0 00-1.414 0l-9 9a1 1 0 000 1.414l5 5a1 1 0 001.414 0l9-9a1 1 0 000-1.414zM5.5 14L3 11.5 11.5 3 14 5.5 5.5 14z" />
                    <circle cx="7.5" cy="7.5" r="1.5" />
                  </svg>
                  {tag}
                </span>
              ))}
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {!post.interview && !post.youtubeId && (
                <div className="space-y-6">
                  {post.content.split("\n\n").map((paragraph, index) => {
                    // 支持带宽度信息的图片标记：[IMAGE:path|width:800]
                    const imageMatch = paragraph.match(/^\[IMAGE:(.+?)(?:\|width:(\d+))?\]$/)
                    if (imageMatch) {
                      const imageSrc = imageMatch[1]
                      const imageWidth = imageMatch[2] ? parseInt(imageMatch[2]) : 1200
                      return (
                        <div key={index} className="my-8 flex justify-center">
                          <div style={{ maxWidth: `${imageWidth}px`, width: "100%" }}>
                            <Image
                              src={imageSrc || "/placeholder.svg"}
                              alt="Article image"
                              width={imageWidth}
                              height={Math.round(imageWidth * 0.5625)} // 16:9 比例
                              className="w-full h-auto rounded-lg shadow-lg"
                            />
                          </div>
                        </div>
                      )
                    }

                    const linkMatch = paragraph.match(/^\[LINK:(.+)\]$/)
                    if (linkMatch) {
                      return (
                        <div key={index} className="mt-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-lg">
                          <a
                            href={linkMatch[1]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-primary hover:underline font-medium text-lg"
                          >
                            Audient製品ページ
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                        </div>
                      )
                    }

                    return (
                      <p key={index} className="text-base leading-relaxed text-foreground/90">
                        {renderParagraphWithLinks(paragraph)}
                      </p>
                    )
                  })}
                </div>
              )}

              {/* YouTube Video */}
              {!post.interview && post.youtubeId && (
                <div className="space-y-6">
                  {post.content.split("\n\n").map((paragraph, index) => {
                    // 支持带宽度信息的图片标记：[IMAGE:path|width:800]
                    const imageMatch = paragraph.match(/^\[IMAGE:(.+?)(?:\|width:(\d+))?\]$/)
                    if (imageMatch) {
                      const imageSrc = imageMatch[1]
                      const imageWidth = imageMatch[2] ? parseInt(imageMatch[2]) : 1200
                      return (
                        <div key={index} className="my-8 flex justify-center">
                          <div style={{ maxWidth: `${imageWidth}px`, width: "100%" }}>
                            <Image
                              src={imageSrc || "/placeholder.svg"}
                              alt="Article image"
                              width={imageWidth}
                              height={Math.round(imageWidth * 0.5625)} // 16:9 比例
                              className="w-full h-auto rounded-lg shadow-lg"
                            />
                          </div>
                        </div>
                      )
                    }

                    return (
                      <p key={index} className="text-base leading-relaxed text-foreground/90">
                        {renderParagraphWithLinks(paragraph)}
                      </p>
                    )
                  })}

                  <div className="my-8">
                    <div className="aspect-video">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${post.youtubeId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-lg"
                      ></iframe>
                    </div>
                  </div>
                </div>
              )}

              {/* YouTube Video for post 1001 */}
              {blogId === "1001" && post.youtubeId && (
                <div className="my-8">
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${post.youtubeId}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg"
                    ></iframe>
                  </div>
                </div>
              )}

              {/* Interview Content for posts 1002, 1003, and 1005 */}
              {post.interview && (
                <div className="space-y-8 mt-8">
                  {blogId === "1005" && post.youtubeId && (
                    <div className="my-8">
                      <div className="aspect-video">
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${post.youtubeId}`}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="rounded-lg"
                        ></iframe>
                      </div>
                    </div>
                  )}

                  {/* Product image at the top for post 1003 */}
                  {blogId === "1003" && (
                    <div className="my-8">
                      <Image
                        src="/blog-1002-image-3.gif"
                        alt="Ampero II Stomp"
                        width={1200}
                        height={675}
                        className="w-full rounded-lg shadow-lg"
                        unoptimized
                      />
                    </div>
                  )}

                  {/* Product image at the top for post 1002 */}
                  {blogId === "1002" && (
                    <div className="my-8">
                      <Image
                        src="/blog-1002-image-3.gif"
                        alt="Ampero II Stomp"
                        width={1200}
                        height={675}
                        className="w-full rounded-lg shadow-lg"
                        unoptimized
                      />
                    </div>
                  )}

                  {post.interview.map((qa, index) => (
                    <div key={index}>
                      {/* Question */}
                      <div className="mb-4">
                        <h3 className="text-xl font-bold flex items-start gap-3">
                          <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                            Q{index}
                          </span>
                          <span className="flex-1">{qa.question}</span>
                        </h3>
                      </div>

                      {/* Answer */}
                      <div className="bg-muted/50 border-l-4 border-primary p-6 rounded-r-lg mb-6">
                        {qa.answer.split("\n\n").map((paragraph, pIndex) => {
                          // 支持带宽度信息的图片标记：[IMAGE:path|width:800]
                          const imageMatch = paragraph.match(/^\[IMAGE:(.+?)(?:\|width:(\d+))?\]$/)
                          if (imageMatch) {
                            const imageSrc = imageMatch[1]
                            const imageWidth = imageMatch[2] ? parseInt(imageMatch[2]) : 1200
                            return (
                              <div key={pIndex} className="my-6 flex justify-center">
                                <div style={{ maxWidth: `${imageWidth}px`, width: "100%" }}>
                                  <Image
                                    src={imageSrc || "/placeholder.svg"}
                                    alt="Interview image"
                                    width={imageWidth}
                                    height={Math.round(imageWidth * 0.5625)} // 16:9 比例
                                    className="w-full h-auto rounded-lg shadow-lg"
                                  />
                                </div>
                              </div>
                            )
                          }

                          const linkMatch = paragraph.match(/^\[LINK:(.+)\]$/)
                          if (linkMatch) {
                            return (
                              <div
                                key={pIndex}
                                className="mt-6 p-4 bg-primary/10 border-l-4 border-primary rounded-r-lg"
                              >
                                <a
                                  href={linkMatch[1]}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                                >
                                  Audient製品ページ
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                  </svg>
                                </a>
                              </div>
                            )
                          }

                          return (
                            <p key={pIndex} className="whitespace-pre-line leading-relaxed mb-4 last:mb-0">
                              {renderParagraphWithLinks(paragraph)}
                            </p>
                          )
                        })}
                      </div>

                      {/* Insert circuit board image after Q0 for post 1002 */}
                      {blogId === "1002" && index === 3 && (
                        <div className="my-8">
                          <Image
                            src="/blog-1002-image-1.jpg"
                            alt="Ampero II Stomp 内部回路"
                            width={1200}
                            height={800}
                            className="w-full rounded-lg shadow-lg"
                          />
                        </div>
                      )}

                      {/* Insert animated interface image after Q4 for post 1002 */}
                      {blogId === "1002" && index === 4 && (
                        <div className="my-8">
                          <Image
                            src="/blog-1002-image-2.gif"
                            alt="Ampero II Stomp 操作界面"
                            width={1200}
                            height={800}
                            className="w-full rounded-lg shadow-lg"
                            unoptimized
                          />
                        </div>
                      )}

                      {/* Insert guitar image after Q1 for post 1003 */}
                      {blogId === "1003" && index === 1 && (
                        <div className="my-8">
                          <Image
                            src="/blog-1003-image-1.jpg"
                            alt="Ampero II Stomp with Guitar"
                            width={1200}
                            height={800}
                            className="w-full rounded-lg shadow-lg"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t">
              {prevPostId ? (
                <Link
                  href={`/blog/${prevPostId}`}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:-translate-x-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>前の記事</span>
                </Link>
              ) : (
                <div />
              )}

              {nextPostId ? (
                <Link
                  href={`/blog/${nextPostId}`}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:translate-x-1"
                >
                  <span>次の記事</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </article>
        </div>
      </div>

      {/* Blog Slider */}
      <BlogSlider />
    </div>
  )
}
