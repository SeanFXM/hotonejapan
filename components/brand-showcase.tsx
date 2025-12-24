"use client"

import { useEffect } from "react"

const brands = [
  {
    id: 1,
    name: "Hotone",
    category: "マルチエフェクター",
    description: "プロフェッショナル・マルチエフェクトツプロセッサー",
    fullDescription:
      "革新的なデジタル技術とアナログサウンドを融合させた、次世代のマルチエフェクトプロセッサー。コンパクトなボディに豊富な機能を搭載。",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qSXtLQqvVsGd3OnYonXc0ACDCk3fKr.png",
    productImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MTZcBAYydfSgVfd7RLX75Ry1qlj6kD.png",
    buttonText: "エフェクター",
  },
  {
    id: 2,
    name: "Valeton",
    category: "エフェクター",
    description: "GP-5 コンパクトマルチエフェクター",
    fullDescription:
      "高品質なサウンドとコストパフォーマンスを両立。初心者からプロまで幅広く対応する多機能エフェクター。",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5tNC9mxtBO4BnCpXCuuARv2kRg01SR.png",
    productImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jYRK4LMDWry2htkqowD8JVjqX9XWzO.png",
    buttonText: "エフェクター",
  },
  {
    id: 3,
    name: "Audient",
    category: "オーディオインターフェース",
    description: "iD14 プロフェッショナルオーディオインターフェース",
    fullDescription:
      "スタジオグレードのプリアンプとコンバーターを搭載。クリアで正確なサウンドを実現するプロフェッショナル機器。",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XkYZVsdh4mAmXt2PyFP8DWpO74BhQ2.png",
    productImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-L2DENAlpJdCnkpwcaDic709ZhICRsv.png",
    buttonText: "オーディオ機器",
  },
  {
    id: 4,
    name: "MusiconLab",
    category: "マルチエフェクター",
    description: "プロフェッショナルギターエフェクトシステム",
    fullDescription:
      "ライブパフォーマンスに最適化された、信頼性の高いエフェクトスイッチングシステム。プロミュージシャンの要求に応える。",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7Ss1Wcrptt8lm36sD1PtvcP7wJvKC6.png",
    productImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7ULUp1mJndcsH95eOVGdPSjxfP59nc.png",
    buttonText: "エフェクター",
  },
  {
    id: 5,
    name: "Strymon",
    category: "エフェクター",
    description: "Riverside オーバードライブペダル",
    fullDescription:
      "素材から製法に至るまで徹底的にこだわった最高峰のエフェクター。温かみのあるアナログサウンドと現代的な機能性を融合。",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TWvEHtFaa0ggUjFINJ5z8aJQRCduzT.png",
    productImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sAZAe1AvRxfprYqYpZt6cPyypucCgs.png",
    buttonText: "エフェクター",
  },
  {
    id: 6,
    name: "Klowra",
    category: "エフェクター",
    description: "アーティスティックエフェクターシリーズ",
    fullDescription:
      "独創的なデザインと高品質なサウンドが融合。アーティストの個性を引き出す、唯一無二のエフェクターシリーズ。",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-lGCsf90THbEMnHGYRfSB5PLrS7bbcu.png",
    productImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pz6cVVb4rlG5BH2VjLEhoDD5yU3YRh.png",
    buttonText: "エフェクター",
  },
  {
    id: 7,
    name: "Sonicake",
    category: "マルチエフェクター",
    description: "Pocket Master コンパクトプロセッサー",
    fullDescription:
      "ポケットサイズながら本格的なサウンド処理が可能。持ち運びに便利で、どこでも高品質なサウンドを実現。",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3HPb7rYFa66JM25YA0LV5QFLRElk05.png",
    productImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-t7PQeVtGh1C2nlwJGfryBCIpqRlNIG.png",
    buttonText: "エフェクター",
  },
  {
    id: 8,
    name: "Divitone",
    category: "エレキギター",
    description: "プレミアムエレクトリックギター",
    fullDescription:
      "厳選された木材と精密な加工技術により、卓越した演奏性と豊かな音色を実現。プロフェッショナルのための楽器。",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vHRqhLnjLAUp07tvzqMj8mmYqqknVC.png",
    productImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qcRFMagpzfPz5HvaLnJFOkCpPrYVpA.png",
    buttonText: "ギター",
  },
  {
    id: 9,
    name: "Soundmaker",
    category: "ギター保管システム",
    description: "プロフェッショナルギター展示・保管キャビネット",
    fullDescription: "温度・湿度管理機能を備えた最高級の楽器保管システム。大切な楽器を最適な環境で保護し、美しく展示。",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-lxeHJjtKn0YFwytsln0RArCJ1YjGj0.png",
    productImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-coeoA7UbrXjkaIXjyY666mHWjYyQwK.png",
    buttonText: "保管システム",
  },
]

export function BrandShowcase() {
  useEffect(() => {
    brands.forEach((brand) => {
      if (brand.productImage) {
        const img = new Image()
        img.src = brand.productImage
      }
    })
  }, [])

  return (
    <section className="py-24 bg-gray-50 relative" id="brands">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-gray-900">Brands</h2>
          <div className="flex justify-center mb-4">
            <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
          <p className="text-sm md:text-base text-gray-600 tracking-wide">取扱製品ブランド</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {brands.map((brand) => (
            <a
              key={brand.id}
              href={
                brand.name === "Strymon"
                  ? "/brands/strymon"
                  : brand.name === "Valeton"
                    ? "/brands/valeton"
                    : brand.name === "MusiconLab"
                      ? "/brands/musicomlab"
                      : brand.name === "Audient"
                        ? "/brands/audient"
                        : brand.name === "Hotone"
                          ? "/brands/hotone"
                          : brand.name === "Klowra"
                            ? "/brands/klowra"
                            : brand.name === "Soundmaker"
                              ? "/brands/soundmaker"
                              : brand.name === "Divitone"
                                ? "/brands/divitone"
                                : brand.name === "Sonicake"
                                  ? "https://hotmusic.jp/collections/sonicake"
                                  : "#"
              }
              target={brand.name === "Sonicake" ? "_blank" : undefined}
              rel={brand.name === "Sonicake" ? "noopener noreferrer" : undefined}
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
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
