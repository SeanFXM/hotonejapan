"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "@/lib/icons"
import { Button } from "@/components/ui/button"

const carouselBrands = [
  {
    brand: "HOTONE",
    model: "PULZE MINI",
    description: "プロフェッショナル音響処理システム",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TFNvA2grZ6yc6HIjbK6sY7SJiNvjTr.png",
    link: "/brands/hotone/products/pulze-mini",
  },
  {
    brand: "Strymon",
    model: "BigSky",
    description: "高品質リバーブエフェクター",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-p7HHvBFTkETeQC0p8lYKR4jPdX7Ih7.png",
    link: null, // 没有产品页
  },
  {
    brand: "AUDIENT",
    model: "ORIA",
    description: "Dolby Atmos認定オーディオインターフェース",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DvLLYJTnb6NCZ7DroE1XgYKbF4Ymzu.png",
    link: "/brands/audient/products/oria",
  },
  {
    brand: "Strymon",
    model: "SUPERKAR+",
    description: "32ボイスストリングシンセシス",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HHGv0oSULzX735oaFs3eqVWzDNSa0V.png",
    link: "/brands/strymon/products/superkar-plus",
  },
  {
    brand: "Strymon",
    model: "FAIRFAX",
    description: "クラスAアウトプットステージ ドライブ",
    image: "/images/brands/strymon/fairfax/hero.jpg",
    link: "/brands/strymon/products/fairfax",
  },
]

export function BrandCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    carouselBrands.forEach((brand) => {
      const img = new Image()
      img.src = brand.image
    })
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselBrands.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselBrands.length) % carouselBrands.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselBrands.length)
  }

  const currentBrand = carouselBrands[currentIndex]

  return (
    <section className="relative w-full bg-gradient-to-b from-slate-900 via-slate-800 to-background">
      <div className="relative h-[400px] w-full overflow-hidden">
        {carouselBrands.map((brand, index) => {
          const content = (
            <div
              className="w-full h-full group relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{ cursor: brand.link ? "pointer" : "default" }}
            >
              <img
                src={brand.image || "/placeholder.svg"}
                alt={`${brand.brand} ${brand.model}`}
                loading="eager"
                className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:brightness-110 group-hover:contrast-105 group-hover:scale-105"
              />
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-primary/30 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
            </div>
          )

          return (
            <div
              key={brand.model}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              style={{ pointerEvents: index === currentIndex ? "auto" : "none" }}
            >
              {brand.link ? (
                <Link href={brand.link} className="block w-full h-full">
                  {content}
                </Link>
              ) : (
                content
              )}
            </div>
          )
        })}

        <div className="absolute top-0 right-0 z-20 overflow-hidden pointer-events-none">
          <div
            className={`relative transition-all duration-500 ${isHovered ? "w-72 h-72" : "w-48 h-48"}`}
            style={{ pointerEvents: "auto" }}
          >
            <div
              className="absolute top-0 right-0 w-full h-full origin-top-right transition-all duration-500"
              style={{
                transform: "rotate(45deg) translate(30%, -30%)",
              }}
            >
              <div
                className={`w-full h-32 backdrop-blur-md bg-gradient-to-br from-slate-900/90 to-slate-800/90 shadow-2xl border-b-2 border-primary/40 transition-all duration-500 ${
                  isHovered ? "h-40" : "h-32"
                }`}
              >
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              </div>
            </div>

            <div
              className="absolute top-8 right-8 transition-all duration-500"
              style={{
                transform: isHovered ? "translate(0, 0)" : "translate(10px, -10px)",
              }}
            >
              <div className="flex flex-col items-end gap-2 text-right">
                <div className="flex items-center gap-2">
                  <div className="h-0.5 w-6 bg-gradient-to-l from-primary to-blue-500" />
                  <span className="text-xs font-bold text-white tracking-widest uppercase drop-shadow-lg">
                    {currentBrand.brand}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white drop-shadow-lg leading-tight">{currentBrand.model}</h3>

                <div
                  className={`transition-all duration-500 origin-top ${
                    isHovered ? "opacity-100 scale-100 max-h-40" : "opacity-0 scale-95 max-h-0"
                  }`}
                >
                  <p className="text-xs text-slate-200 drop-shadow max-w-[200px]">{currentBrand.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/90 hover:bg-background backdrop-blur-sm shadow-lg border-2 z-10"
          onClick={goToPrevious}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/90 hover:bg-background backdrop-blur-sm shadow-lg border-2 z-10"
          onClick={goToNext}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {carouselBrands.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 transition-all shadow-lg ${index === currentIndex ? "bg-white w-8" : "bg-white/50 w-2"}`}
              aria-label={`转到幻灯片 ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
