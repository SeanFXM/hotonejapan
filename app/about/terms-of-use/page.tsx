import { FileText } from "lucide-react"
import Image from "next/image"
import { BlogSlider } from "@/components/blog-slider"

export default function TermsOfUsePage() {
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
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">サイトご利用案内</h1>
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
              <div className="bg-white border border-gray-200 p-8 md:p-12 space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">著作権について</h3>
                  <p className="text-gray-700">
                    本サイトに掲載されている全てのコンテンツ（文章、画像、動画等）の著作権は、株式会社Hotone
                    Japanまたは権利者に帰属します。
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">免責事項</h3>
                  <p className="text-gray-700">
                    本サイトの情報は予告なく変更される場合があります。また、本サイトの利用により生じた損害について、当社は一切の責任を負いません。
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">推奨環境</h3>
                  <p className="text-gray-700">本サイトは、最新のブラウザでの閲覧を推奨しております。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <BlogSlider />
      </main>
    </div>
  )
}
