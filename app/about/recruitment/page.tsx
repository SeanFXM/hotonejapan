import { Users } from "lucide-react"
import Image from "next/image"
import { BlogSlider } from "@/components/blog-slider"

export default function RecruitmentPage() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <div className="bg-[#161616] text-white py-8 md:py-12 relative overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">採用情報</h1>
                </div>
              </div>

              <div className="hidden lg:flex justify-end">
                <div className="relative w-full max-w-2xl h-[280px]">
                  <Image
                    src="/images/hero-products.jpg"
                    alt="Music Equipment Collection"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border border-gray-200 p-8 md:p-12">
                <p className="text-gray-900 mb-6">現在、採用情報はございません。</p>
                <p className="text-gray-600">
                  採用に関するお問い合わせは、
                  <a href="mailto:info@hotone.jp" className="text-blue-600 hover:underline">
                    info@hotone.jp
                  </a>
                  までご連絡ください。
                </p>
              </div>
            </div>
          </div>
        </section>

        <BlogSlider />
      </main>
    </div>
  )
}
