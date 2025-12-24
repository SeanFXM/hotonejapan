import { BlogSlider } from "@/components/blog-slider"
import { Building2 } from "lucide-react"
import Image from "next/image"

export default function CompanyOverviewPage() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero Section */}
        <div className="bg-[#161616] text-white py-8 md:py-12 relative overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">会社概要</h1>
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

        {/* Existing Company Overview Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-sm border border-gray-200">
              {/* Company Name */}
              <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-200">
                <div className="bg-gray-50 p-6 md:col-span-1 border-r border-gray-200">
                  <h3 className="font-bold text-gray-700">会社名</h3>
                </div>
                <div className="p-6 md:col-span-3">
                  <p className="text-gray-900">株式会社Hotone Japan</p>
                </div>
              </div>

              {/* Established */}
              <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-200">
                <div className="bg-gray-50 p-6 md:col-span-1 border-r border-gray-200">
                  <h3 className="font-bold text-gray-700">設立</h3>
                </div>
                <div className="p-6 md:col-span-3">
                  <p className="text-gray-900">令和7年3月25日</p>
                </div>
              </div>

              {/* Address */}
              <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-200">
                <div className="bg-gray-50 p-6 md:col-span-1 border-r border-gray-200">
                  <h3 className="font-bold text-gray-700">本社所在地</h3>
                </div>
                <div className="p-6 md:col-span-3">
                  <p className="text-gray-900">〒113-0034　東京都文京区湯島2-2-4 JP-BASE御茶ノ水 9F</p>
                </div>
              </div>

              {/* Capital */}
              <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-200">
                <div className="bg-gray-50 p-6 md:col-span-1 border-r border-gray-200">
                  <h3 className="font-bold text-gray-700">資本金</h3>
                </div>
                <div className="p-6 md:col-span-3">
                  <p className="text-gray-900">700万円</p>
                </div>
              </div>

              {/* Representatives */}
              <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-200">
                <div className="bg-gray-50 p-6 md:col-span-1 border-r border-gray-200">
                  <h3 className="font-bold text-gray-700">代表者</h3>
                </div>
                <div className="p-6 md:col-span-3">
                  <div className="space-y-2 text-gray-900">
                    <p>代表取締役：グオルンポ</p>
                    <p>取締役：馮　心銘</p>
                    <p>
                      相談役：服部　弘一（
                      <span className="text-red-600">オールアクセスインターナショナル株式会社</span>
                      　代表取締役社長）
                    </p>
                  </div>
                </div>
              </div>

              {/* Business Content */}
              <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-200">
                <div className="bg-gray-50 p-6 md:col-span-1 border-r border-gray-200">
                  <h3 className="font-bold text-gray-700">事業内容</h3>
                </div>
                <div className="p-6 md:col-span-3">
                  <ul className="space-y-2 text-gray-900">
                    <li>・ギター／ベース用エフェクター、アンプ、音響機器の企画・販売</li>
                    <li>・ブランドマーケティング、アーティスト支援</li>
                    <li>・国内代理店・小売チャネルの統括管理</li>
                  </ul>
                </div>
              </div>

              {/* Contact */}
              <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-200">
                <div className="bg-gray-50 p-6 md:col-span-1 border-r border-gray-200">
                  <h3 className="font-bold text-gray-700">一般お問い合わせ</h3>
                </div>
                <div className="p-6 md:col-span-3">
                  <div className="space-y-1">
                    <p className="text-gray-900">
                      メール：
                      <a href="mailto:info@hotone.jp" className="text-blue-600 hover:underline">
                        info@hotone.jp
                      </a>
                    </p>
                    <p className="text-sm text-gray-600">※お問い合わせはメールにてお願いします</p>
                  </div>
                </div>
              </div>

              {/* Website */}
              <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="bg-gray-50 p-6 md:col-span-1 border-r border-gray-200">
                  <h3 className="font-bold text-gray-700">会社ホームページ</h3>
                </div>
                <div className="p-6 md:col-span-3">
                  <p className="text-gray-900">
                    <a
                      href="https://www.hotone.jp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      www.hotone.jp
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Slider */}
        <BlogSlider />
      </main>
    </div>
  )
}
