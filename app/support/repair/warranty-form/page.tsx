import { Package, AlertCircle, User, Info } from "lucide-react"
import { BlogSlider } from "@/components/blog-slider"

export default function WarrantyRepairForm() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#161616] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">保証規定内修理</h1>
              <p className="text-gray-400">Warranty Repair Request</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            <form>
              {/* 修理品の情報 */}
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-6 pb-3 border-b">
                  <Package className="w-5 h-5" />
                  <h2 className="text-xl font-bold">修理品の情報を教えてください</h2>
                </div>

                <div className="space-y-6">
                  {/* ブランド */}
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="md:w-1/3 flex items-center gap-2">
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">必須</span>
                      <label className="font-medium">
                        ブランド
                        <span className="block text-sm text-blue-600">Brand</span>
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <select className="w-full border border-gray-300 rounded px-3 py-2">
                        <option>ブランドを選んでください</option>
                        <option>Hotone</option>
                        <option>Valeton</option>
                        <option>Audient</option>
                        <option>MusiconLab</option>
                        <option>Strymon</option>
                        <option>Klowra</option>
                        <option>Sonicake</option>
                        <option>Divitone</option>
                        <option>Soundmaker</option>
                      </select>
                    </div>
                  </div>

                  {/* 製品名・型番 */}
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="md:w-1/3 flex items-center gap-2">
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">必須</span>
                      <label className="font-medium">
                        製品名・型番
                        <span className="block text-sm text-blue-600">Model Name</span>
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                  </div>

                  {/* シリアルナンバー */}
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="md:w-1/3 flex items-center gap-2">
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">必須</span>
                      <label className="font-medium">
                        シリアルナンバー
                        <span className="block text-sm text-blue-600">Serial Number</span>
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                  </div>
                </div>
              </div>

              {/* 症状を教えてください */}
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-6 pb-3 border-b">
                  <AlertCircle className="w-5 h-5" />
                  <h2 className="text-xl font-bold">症状を教えてください</h2>
                </div>

                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/3 flex items-center gap-2">
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">必須</span>
                      <label className="font-medium">
                        症状について
                        <span className="block text-sm text-blue-600">Failure details</span>
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <textarea
                        rows={6}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="症状はできるだけ詳しくご記入ください。"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ご購入方法を教えてください */}
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-6 pb-3 border-b">
                  <Package className="w-5 h-5" />
                  <h2 className="text-xl font-bold">ご購入方法を教えてください</h2>
                </div>

                <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <div className="flex gap-3">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm leading-relaxed">
                      <p className="font-semibold text-blue-900 mb-2">オンライン購入のお客様へ</p>
                      <p className="text-blue-800 mb-2">
                        インターネット通販サイト（Amazon、楽天市場等）でご購入された場合は、以下の情報をご記入ください：
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-blue-800 ml-2">
                        <li>販売店名：購入されたオンラインショップ名（例：Amazon.co.jp、楽天市場内の店舗名）</li>
                        <li>店舗・支店名：オンラインショップ内の具体的な販売者名（任意）</li>
                        <li>
                          ご購入の証明として、注文確認メール、領収書、または購入履歴のスクリーンショットを後ほどメールにてお送りください
                        </li>
                      </ul>
                      <p className="text-blue-800 mt-2 font-medium">
                        ※保証書に販売店印がない場合でも、購入証明があれば保証期間内の修理を受け付けます。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* ご購入日 */}
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="md:w-1/3 flex items-center gap-2">
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">必須</span>
                      <label className="font-medium">
                        ご購入日
                        <span className="block text-sm text-blue-600">Purchase date</span>
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input
                        type="text"
                        placeholder="年 / 月 / 日"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                      />
                    </div>
                  </div>

                  {/* 販売店名 */}
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="md:w-1/3 flex items-center gap-2">
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">必須</span>
                      <label className="font-medium">
                        販売店名
                        <span className="block text-sm text-blue-600">Dealer name</span>
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                  </div>

                  {/* 店舗・支店名 */}
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="md:w-1/3 flex items-center gap-2">
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">任意</span>
                      <label className="font-medium">
                        店舗・支店名
                        <span className="block text-sm text-blue-600">Shop name</span>
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                  </div>
                </div>
              </div>

              {/* お客様の情報をご記入ください */}
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-6 pb-3 border-b">
                  <User className="w-5 h-5" />
                  <h2 className="text-xl font-bold">お客様の情報をご記入ください</h2>
                </div>

                <div className="space-y-6">
                  {/* お名前 */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/3 flex items-center gap-2">
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">必須</span>
                      <label className="font-medium">
                        お名前
                        <span className="block text-sm text-blue-600">Your Name</span>
                      </label>
                    </div>
                    <div className="md:w-2/3 flex gap-2">
                      <input type="text" placeholder="姓" className="w-1/2 border border-gray-300 rounded px-3 py-2" />
                      <input type="text" placeholder="名" className="w-1/2 border border-gray-300 rounded px-3 py-2" />
                    </div>
                  </div>

                  {/* ふりがな */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/3 flex items-center gap-2">
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">任意</span>
                      <label className="font-medium">
                        ふりがな
                        <span className="block text-sm text-blue-600">Name Reading</span>
                      </label>
                    </div>
                    <div className="md:w-2/3 flex gap-2">
                      <input
                        type="text"
                        placeholder="せい"
                        className="w-1/2 border border-gray-300 rounded px-3 py-2"
                      />
                      <input
                        type="text"
                        placeholder="めい"
                        className="w-1/2 border border-gray-300 rounded px-3 py-2"
                      />
                    </div>
                  </div>

                  {/* 郵便番号 */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/3 flex items-center gap-2">
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">必須</span>
                      <label className="font-medium">
                        郵便番号
                        <span className="block text-sm text-blue-600">Postal</span>
                      </label>
                    </div>
                    <div className="md:w-2/3 flex gap-2">
                      <input type="text" className="flex-1 border border-gray-300 rounded px-3 py-2" />
                      <button
                        type="button"
                        className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded transition-colors"
                      >
                        郵便番号検索
                      </button>
                    </div>
                  </div>

                  {/* ご住所 */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/3 flex items-center gap-2">
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">必須</span>
                      <label className="font-medium">
                        ご住所
                        <span className="block text-sm text-blue-600">Address</span>
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                  </div>

                  {/* メールアドレス */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/3 flex items-center gap-2">
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">必須</span>
                      <label className="font-medium">
                        メールアドレス
                        <span className="block text-sm text-blue-600">Mail Address</span>
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input type="email" className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                  </div>

                  {/* メールアドレス（確認用） */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/3 flex items-center gap-2">
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">必須</span>
                      <label className="font-medium">
                        メールアドレス
                        <span className="block text-sm text-gray-600">（確認用）</span>
                        <span className="block text-sm text-blue-600">Mail Address Confirm</span>
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input type="email" className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-12 py-3 rounded-lg font-medium transition-colors"
                >
                  送信する
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <BlogSlider />
    </div>
  )
}
