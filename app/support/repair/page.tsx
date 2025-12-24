"use client"

import { Wrench, CheckCircle2, AlertTriangle, FileText } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BlogSlider } from "@/components/blog-slider"

export default function RepairPage() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* 年末年始期間中の対応について */}
        <div className="bg-red-50 border-b-4 border-red-500 py-6">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border-l-4 border-red-500 p-6 shadow-md">
                <h3 className="text-lg font-bold text-red-700 mb-3">【重要】年末年始期間中の対応について</h3>
                <div className="space-y-2 text-gray-800">
                  <p className="leading-relaxed">
                    年末年始の影響により、お問い合わせ・修理対応は <span className="font-bold text-red-600">1月6日以降</span> の対応となります。
                  </p>
                  <p className="leading-relaxed">
                    緊急のご用件につきましては、<a href="mailto:info@hotone.jp" className="text-blue-600 hover:text-blue-800 underline font-medium">info@hotone.jp</a> まで直接お問い合わせください。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-[#161616] text-white py-8 md:py-12 relative overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Wrench className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">修理について</h1>
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

        {/* Main Content */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Title with decorative line */}
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">修理のご依頼について</h2>
                <div className="flex justify-center">
                  <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-red-500 rounded-full" />
                </div>
              </div>

              {/* Introduction */}
              <div className="mb-12 text-gray-700 leading-relaxed">
                <p>
                  当社取扱製品の修理については、製品保証規定内（無償修理）の場合と保証規定外（有償修理）の場合とで、受付窓口を分けさせて頂いております。下記の案内をご参照いただき、それぞれの窓口よりお申し込みをお願い致します。
                </p>
              </div>

              {/* 保証規定内の無償修理について */}
              <div className="bg-gray-100 rounded-lg p-8 mb-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">保証規定内の無償修理について</h3>

                <div className="space-y-4 mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    当社修理窓口で受付をさせて頂きます。
                    <br />
                    保証規定をご一読頂き、下記の条件を満たしているか、いま一度ご確認のうえ、お申し込みフォームよりご依頼ください。
                  </p>

                  <div className="mt-6">
                    <h4 className="font-bold text-gray-900 mb-4">保証規定内のご確認ください。</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">購入日から保証書に記載されている保証期間内であること。</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">当社発行の保証書であること。</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">保証書に「店舗印」「販売日印」が捺印されていること。</span>
                      </li>
                      <li className="flex items-start gap-3 pl-8">
                        <span className="text-gray-600 text-sm">
                          ※
                          ネット購入等で保証書に何も捺印されていない場合、レシート・注文確認メール等の購入証明で代用も可。
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">故障や、使用方法の誤りによる故障ではないこと。</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">中古品、オークション購入品ではないこと。</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex justify-center mt-8">
                  <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-base">
                    <Link href="/support/repair/warranty-form">保証規定内修理　お申し込みフォーム</Link>
                  </Button>
                </div>
              </div>

              {/* 保証規定外の有償修理について */}
              <div className="bg-gray-100 rounded-lg p-8 mb-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">保証規定外の有償修理について</h3>

                <div className="space-y-4 mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    有償修理の場合は、修理代金のお支払いが発生するため、当社では直接お受けすることができません。ご購入の販売店様、またはお近くの取扱販売店様までご依頼ください。修理のお見積もり、期間に関しても販売店様を通じてご案内させて頂きます。
                  </p>
                </div>

                <div className="flex justify-center mb-6">
                  <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-base">
                    <Link href="/#stores">お近くの販売店さがす</Link>
                  </Button>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-sm leading-relaxed">
                      弊社では修理品の直接受付を行っておりません。修理品をお送り頂いてもお受けできませんので、予めご注意ください。なお、最寄りの楽器店が無いなど特別な事情がある場合は、こちらのお問い合わせフォームよりご相談ください。
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <FileText className="w-5 h-5" />
                  <Link href="/support/contact" className="hover:text-gray-900 underline">
                    お問い合わせフォーム
                  </Link>
                </div>
              </div>

              {/* 修理料金の目安について */}
              <div className="bg-gray-100 rounded-lg p-8 mb-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">修理料金の目安について</h3>

                <div className="space-y-4 mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    修理期間や料金は、修理内容により異なります。過去の修理履歴等からその傾向をお調べすることは出来ますが、正確な期間や料金は故障した製品をお預けいただいた上で確認させて頂く必要があります。ご指摘の症状が確認できない場合、製品の故障ではないと断定した場合、修理不能の場合、お見積もり後の修理キャンセルの場合は、見積料、返送料が発生いたします。予めご了承下さい。
                  </p>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <FileText className="w-5 h-5" />
                  <Link href="/support/repair/pricing" className="hover:text-gray-900 underline">
                    修理料金とキャンセル料の目安についてのご案内
                  </Link>
                </div>
              </div>

              {/* 並行輸入品に関するご注意 */}
              <div className="bg-gray-100 rounded-lg p-8 mb-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">並行輸入品に関するご注意</h3>

                <div className="space-y-4 mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    並行輸入品（直輸入品）に関しては、一部修理を承れない物がございます。また、受付可能な物でも、正規輸入品に比べられる正規品特別割引の対象外となるため、修理費／キャンセル料ともに割高になります。詳しくは「並行輸入品に関するご注意」をご参照ください。
                  </p>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <FileText className="w-5 h-5" />
                  <Link href="/support/repair/parallel-imports" className="hover:text-gray-900 underline">
                    並行輸入品に関するご注意
                  </Link>
                </div>
              </div>

              {/* 生产完了品について */}
              <div className="bg-gray-100 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">生産完了品について</h3>

                <div className="space-y-4 mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    生産が完了している製品の修理につきましては、可能な限り対応させていただきます。ただし、必要なパーツが入手不可能な場合、開発メーカーや製造業者の倒産した場合、ブランドが他の会社に移管した場合など、弊社に対応が不可能な場合は修理をお断りさせて頂く場合がございます。その他、修理に関するお問い合わせなどは、こちらのお問い合わせフォームより、お問い合わせください。
                  </p>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <FileText className="w-5 h-5" />
                  <Link href="/support/contact" className="hover:text-gray-900 underline">
                    お問い合わせフォーム
                  </Link>
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
