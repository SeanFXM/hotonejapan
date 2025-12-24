"use client"

import { useEffect } from "react"
import Link from "next/link"
import { BlogSlider } from "@/components/blog-slider"

const brands = [
  {
    id: 1,
    name: "Hotone",
    category: "マルチエフェクター",
    description: "プロフェッショナル・マルチエフェクトプロセッサー",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qSXtLQqvVsGd3OnYonXc0ACDCk3fKr.png",
    productImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MTZcBAYydfSgVfd7RLX75Ry1qlj6kD.png",
    href: "/brands/hotone",
  },
  {
    id: 2,
    name: "Valeton",
    category: "エフェクター",
    description: "GP-5 コンパクトマルチエフェクター",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5tNC9mxtBO4BnCpXCuuARv2kRg01SR.png",
    productImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jYRK4LMDWry2htkqowD8JVjqX9XWzO.png",
    href: "/brands/valeton",
  },
  {
    id: 3,
    name: "Audient",
    category: "オーディオインターフェース",
    description: "iD14 プロフェッショナルオーディオインターフェース",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XkYZVsdh4mAmXt2PyFP8DWpO74BhQ2.png",
    productImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-L2DENAlpJdCnkpwcaDic709ZhICRsv.png",
    href: "/brands/audient",
  },
  {
    id: 4,
    name: "MusiconLab",
    category: "マルチエフェクター",
    description: "プロフェッショナルギターエフェクトシステム",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7Ss1Wcrptt8lm36sD1PtvcP7wJvKC6.png",
    productImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7ULUp1mJndcsH95eOVGdPSjxfP59nc.png",
    href: "/brands/musicomlab",
  },
  {
    id: 5,
    name: "Strymon",
    category: "エフェクター",
    description: "Riverside オーバードライブペダル",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TWvEHtFaa0ggUjFINJ5z8aJQRCduzT.png",
    productImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sAZAe1AvRxfprYqYpZt6cPyypucCgs.png",
    href: "/brands/strymon",
  },
  {
    id: 6,
    name: "Klowra",
    category: "エフェクター",
    description: "アーティスティックエフェクターシリーズ",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-lGCsf90THbEMnHGYRfSB5PLrS7bbcu.png",
    productImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pz6cVVb4rlG5BH2VjLEhoDD5yU3YRh.png",
    href: "/brands/klowra",
  },
  {
    id: 7,
    name: "Sonicake",
    category: "マルチエフェクター",
    description: "Pocket Master コンパクトプロセッサー",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3HPb7rYFa66JM25YA0LV5QFLRElk05.png",
    productImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-t7PQeVtGh1C2nlwJGfryBCIpqRlNIG.png",
    href: "https://hotmusic.jp/collections/sonicake",
  },
  {
    id: 8,
    name: "Divitone",
    category: "エレキギター",
    description: "プレミアムエレクトリックギター",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vHRqhLnjLAUp07tvzqMj8mmYqqknVC.png",
    productImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qcRFMagpzfPz5HvaLnJFOkCpPrYVpA.png",
    href: "/brands/divitone",
  },
  {
    id: 9,
    name: "Soundmaker",
    category: "ギター保管システム",
    description: "プロフェッショナルギター展示・保管キャビネット",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-lxeHJjtKn0YFwytsln0RArCJ1YjGj0.png",
    productImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-coeoA7UbrXjkaIXjyY666mHWjYyQwK.png",
    href: "/brands/soundmaker",
  },
]

export default function BrandsPage() {
  useEffect(() => {
    brands.forEach((brand) => {
      if (brand.productImage) {
        const img = new Image()
        img.src = brand.productImage
      }
    })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-gray-900">Brands</h1>
            <div className="flex justify-center mb-4">
              <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>
            <p className="text-sm md:text-base text-gray-600 tracking-wide">取扱製品ブランド</p>
            <p className="text-sm text-gray-500 mt-4 max-w-2xl mx-auto">
              株式会社Hotone Japanが取り扱う、世界トップクラスの音響機器ブランドをご紹介します。
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {brands.map((brand) => (
              brand.href.startsWith("http") ? (
                <a
                  key={brand.id}
                  href={brand.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden bg-white rounded-xl transition-all duration-300 hover:-translate-y-2 aspect-square shadow-[0_2px_8px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08),0_16px_48px_rgba(0,0,0,0.12)]"
                >
                  <div className="absolute inset-0 p-8 flex items-center justify-center">
                    <img
                      src={brand.image || "/placeholder.svg"}
                      alt={brand.name}
                      loading="eager"
                      className="w-full h-full object-contain transition-opacity duration-500 filter grayscale-[30%] group-hover:opacity-0"
                    />
                  </div>

                  <img
                    src={brand.productImage || brand.image || "/placeholder.svg"}
                    alt={`${brand.name} product`}
                    loading="eager"
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-500 opacity-0 scale-110 group-hover:opacity-100 group-hover:scale-100"
                  />

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-xs font-medium">{brand.category}</p>
                  </div>
                </a>
              ) : (
                <Link
                  key={brand.id}
                  href={brand.href}
                  className="group relative overflow-hidden bg-white rounded-xl transition-all duration-300 hover:-translate-y-2 aspect-square shadow-[0_2px_8px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08),0_16px_48px_rgba(0,0,0,0.12)]"
                >
                <div className="absolute inset-0 p-8 flex items-center justify-center">
                  <img
                    src={brand.image || "/placeholder.svg"}
                    alt={brand.name}
                    loading="eager"
                    className="w-full h-full object-contain transition-opacity duration-500 filter grayscale-[30%] group-hover:opacity-0"
                  />
                </div>

                <img
                  src={brand.productImage || brand.image || "/placeholder.svg"}
                  alt={`${brand.name} product`}
                  loading="eager"
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-500 opacity-0 scale-110 group-hover:opacity-100 group-hover:scale-100"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-xs font-medium">{brand.category}</p>
                </div>
                </Link>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Blog Slider */}
      <BlogSlider />
    </div>
  )
}
