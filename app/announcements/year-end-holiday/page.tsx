import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "年末年始休業のお知らせ | Hotone Japan",
  description: "年末年始休業期間のお知らせ",
}

export default function YearEndHolidayPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <article className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <header className="mb-8 pb-6 border-b border-gray-200">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              年末年始休業のお知らせ
            </h1>
            <time className="text-sm text-gray-500">2025年12月20日</time>
          </header>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              平素より弊社製品をご利用いただき、誠にありがとうございます。
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              誠に勝手ながら、下記期間を年末年始休業とさせていただきます。
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">休業期間</h2>
              <p className="text-lg text-gray-800 font-medium">
                2025年12月27日（土）～2026年1月6日（火）
              </p>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                上記期間中、お問い合わせへの返信及び修理対応は休止となります。
              </p>
              <p>
                期間中にいただいたお問い合わせにつきましては、1月6日（火）以降順次対応いたします。
              </p>
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <p className="text-gray-800 mb-2">
                <strong className="text-gray-900">お急ぎの場合は、下記メールアドレスまでご連絡ください。</strong>
              </p>
              <p className="text-lg">
                <a 
                  href="mailto:info@hotone.jp" 
                  className="text-blue-600 hover:text-blue-800 font-medium underline"
                >
                  📩 info@hotone.jp
                </a>
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-700 leading-relaxed">
                お客様にはご不便をおかけいたしますが、何卒ご理解のほどお願い申し上げます。
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <a
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              ← ホームに戻る
            </a>
          </div>
        </article>
      </div>
    </div>
  )
}

