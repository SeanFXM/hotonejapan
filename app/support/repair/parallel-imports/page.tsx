import { AlertTriangle } from "lucide-react"
import { BlogSlider } from "@/components/blog-slider"

export default function ParallelImportsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        {/* Content Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
              {/* Title with decorative line */}
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-6">並行輸入品に関するご注意</h1>
                <div className="flex justify-center">
                  <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-red-500 rounded-full" />
                </div>
              </div>

              {/* Introduction */}
              <div className="mb-8 text-gray-700 leading-relaxed">
                <p className="mb-6">
                  「並行輸入品」とは、国内の正規代理店を通さず、海外の販売店から直接仕入れられて売られている商品を指します。そのため、下記のようなリスクがあります。
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>使用電圧が日本仕様（100V）になっていない。</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>日本で使用するために必要な認証（電取法、PSEなど）を受けていない。</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>輸入の段階で、メーカーと共同でのチェックが行われていない。</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>国内における保証の対象外。</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>国内における修理不可、もしくは制増の対応となる場合がある。</span>
                  </li>
                </ul>
              </div>

              {/* 電源に関するリスク */}
              <div className="bg-gray-100 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900">電源に関するリスク</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  海外仕様（120V、220Vなど）や、PSE未取得の製品を国内で使用すると、機器破損や発火など事故が発生する可能性がございます。一部、海外からの「直輸入品」には「120Vと記載されていますが日本でも使用できます」などと記載し売られている商品もありますが、安全と言い切れる保証はありません。
                </p>
                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-sm leading-relaxed">
                      日本国内で販売／使用するために必要な認証（電取法、PSEなど）を受けていない商品は、販売自体が違法ですのでご注意ください。
                    </p>
                  </div>
                </div>
              </div>

              {/* その他、海外仕様の商品に関して */}
              <div className="bg-gray-100 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900">その他、海外仕様の商品に関して</h2>
                <p className="text-gray-700 leading-relaxed">
                  アナログ・ワイヤレス製品など、国ごとに法律で電波の使用帯域が定められている商品は、使用するだけで違法となりますので、ご注意ください。
                </p>
              </div>

              {/* 保証に関するリスク */}
              <div className="bg-gray-100 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900">保証に関するリスク</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  正規輸入品には、日本国内の代理店で発行される「製品保証書」が同梱されています。これは英語で記載されているメーカーの保証書とは異なり、「保証期間内に問題が発生した場合、日本国内の代理店にて対応します」という証明になります。「直輸入品」には、これが同梱されていません。そのため、日本国内の代理店における一切の保証の対象外となります。
                </p>
                <p className="text-gray-700 leading-relaxed">
                  なお、直輸入品に関して、海外メーカーより直接の保証を受けたい場合には、ユーザー様自身で直接行って頂く必要がございます（代理店は関与いたしません）。付属品やパーツ（ツマミ、ナット等）の販売は、正規輸入品のみ行っております。
                </p>
              </div>

              {/* 修理に関するリスク */}
              <div className="bg-gray-100 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900">修理に関するリスク</h2>
                <p className="text-gray-700 leading-relaxed">
                  海外仕様（120V、220Vなど）の製品に関しては、規定やパーツ入手不可により修理不可の場合がございます。海外仕様のワイヤレスに関しても、違法となりますので修理不可となります。電源を搭載していないアイテム（エフェクター等）に関しては修理対応が可能な場合もありますが、正規品割引の適用外となります。そのため修理代、パーツ代、キャンセル料金が割高となります（1.5倍目安）
                </p>
              </div>

              {/* 見分け方 */}
              <div className="bg-gray-100 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900">見分け方</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  「弊社取扱いの正規輸入品には、ステッカー等で正規品である表示がされており、日本語の保証書が同梱されています。また、一部製品はシリアル番号管理されています。これらの表示や、照合のためのシリアル番号が割がされている場合には、正規品としてお受けする事が出来ませんので、ご注意ください。
                </p>
                <p className="text-gray-700 leading-relaxed">
                  シリアル番号による正規品か否の問い合わせは、修理の場合を除いて受け付けておりません。識別のための保証書の提示をお願いする場合がございます。保証期間を過ぎた物でも、大切に保管して頂く事をお勧めします。お買い上げ時より輸入代理店が移行している場合、正規品であれば内容は引き継がれます。
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
