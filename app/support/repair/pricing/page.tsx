import { AlertTriangle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function RepairPricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Main Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              {/* Title with decorative line */}
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                  修理料金とキャンセル料の目安についてのご案内
                </h1>
                <div className="flex justify-center">
                  <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-red-500 rounded-full" />
                </div>
              </div>

              {/* Introduction */}
              <div className="mb-8">
                <p className="text-gray-700 leading-relaxed">
                  当社で取り扱う正規輸入製品の有償の修理料金等については、下記の概算をご参照ください。
                </p>
              </div>

              {/* Notice Section */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-gray-900">ご注意</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-sm leading-relaxed">
                      下記の金額は、あくまで目安です。機種や破損状態、使用するパーツによって変動します。
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-sm leading-relaxed">
                      パーツ代や返送料込みの金額ですが、外貨レートや運送料の変化により予告なく変動する場合がございます。
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-sm leading-relaxed">
                      並行品は、下記の目安金額の約1.5倍の金額が目安となります。
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-sm leading-relaxed">
                      ケーブル／電源アダプター／小型機器など、一部構造上の理由から修理が不可→修理不可の物がございます。
                    </p>
                  </div>
                </div>
              </div>

              {/* Pedal Effects Section */}
              <div className="bg-gray-100 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-bold mb-4 text-gray-900">ペダル型エフェクター</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-gray-600 rounded-full flex-shrink-0 mt-2" />
                    <span>クリーニング／メンテナンス： 3,000円〜</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-gray-600 rounded-full flex-shrink-0 mt-2" />
                    <span>スイッチ／ポット／端子交換： 7,000円〜</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-gray-600 rounded-full flex-shrink-0 mt-2" />
                    <span>基盤交換： 13,000円〜（機種による）</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-gray-600 rounded-full flex-shrink-0 mt-2" />
                    <span>見積もりキャンセル料： 2,500円〜</span>
                  </li>
                </ul>
              </div>

              {/* Rack Effects Section */}
              <div className="bg-gray-100 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-bold mb-4 text-gray-900">ラック型などの大型のプリアンプ／エフェクター</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-gray-600 rounded-full flex-shrink-0 mt-2" />
                    <span>クリーニング／メンテナンス： 6,000円〜</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-gray-600 rounded-full flex-shrink-0 mt-2" />
                    <span>スイッチ／ポット／端子交換： 10,000円〜</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-gray-600 rounded-full flex-shrink-0 mt-2" />
                    <span>トランス交換： 21,000円〜（機種による）</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-gray-600 rounded-full flex-shrink-0 mt-2" />
                    <span>基盤交換： 30,000円〜（機種による）</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-gray-600 rounded-full flex-shrink-0 mt-2" />
                    <span>見積もりキャンセル料： 9,000円〜</span>
                  </li>
                </ul>
              </div>

              {/* Small Amp Section */}
              <div className="bg-gray-100 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-bold mb-4 text-gray-900">小型アンプ</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-gray-600 rounded-full flex-shrink-0 mt-2" />
                    <span>クリーニング／メンテナンス： 6,000円〜</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-gray-600 rounded-full flex-shrink-0 mt-2" />
                    <span>スイッチ／ポット／端子交換： 5,000円〜</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-gray-600 rounded-full flex-shrink-0 mt-2" />
                    <span>電子パーツ交換： 5,000円〜</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-gray-600 rounded-full flex-shrink-0 mt-2" />
                    <span>パターン補正： 10,000円〜</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-gray-600 rounded-full flex-shrink-0 mt-2" />
                    <span>リバーブユニット交換： 13000円〜</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-gray-600 rounded-full flex-shrink-0 mt-2" />
                    <span>真空管交換： 15,000円〜（使用パーツによる）</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-gray-600 rounded-full flex-shrink-0 mt-2" />
                    <span>トランス交換： 21,000円〜（機種による）</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-gray-600 rounded-full flex-shrink-0 mt-2" />
                    <span>スピーカー交換： 8,000円〜（機種による）</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-gray-600 rounded-full flex-shrink-0 mt-2" />
                    <span>基盤交換： 20,000円〜（機種による）</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-gray-600 rounded-full flex-shrink-0 mt-2" />
                    <span>見積もりキャンセル料： 8,000円〜</span>
                  </li>
                </ul>
              </div>

              {/* Back Button */}
              <div className="flex justify-center">
                <Button asChild variant="outline" size="lg">
                  <Link href="/support/repair">修理ページに戻る</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
