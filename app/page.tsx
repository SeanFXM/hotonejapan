import { BrandShowcase } from "@/components/brand-showcase"
import { BrandCarousel } from "@/components/brand-carousel"
import { BlogCarousel as BlogCarouselComponent } from "@/components/blog-carousel"
import { InfoNavigation } from "@/components/info-navigation"

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="overflow-x-hidden">
        <BrandCarousel />
        <div className="px-2 sm:px-4 lg:px-6">
          <BrandShowcase />
          <InfoNavigation />
          <BlogCarouselComponent />
        </div>
      </main>
    </div>
  )
}
