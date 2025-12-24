import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "新規ブランド代理業務開始のお知らせ | Hotone Japan",
  description: "2026年より新規ブランドの日本国内における正規代理業務を開始いたします",
}

export default function NewDistributorsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <article className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <header className="mb-8 pb-6 border-b border-gray-200">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              新規ブランド代理業務開始のお知らせ
            </h1>
            <time className="text-sm text-gray-500">2025年12月20日</time>
          </header>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              平素より弊社および弊社取扱ブランドをご愛顧いただき、誠にありがとうございます。
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              このたび弊社は、2026年より、下記ブランドの日本国内における正規代理業務を開始することとなりましたので、お知らせいたします。
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">新たに代理を開始するブランド：</h2>
              <ul className="space-y-2 text-gray-800">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span className="text-lg font-medium">strymon</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span className="text-lg font-medium">Audient</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span className="text-lg font-medium">MusicomLAB</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                取扱開始日、商品ラインアップ、価格、サポート体制等の詳細につきましては、後日改めてご案内いたします。
              </p>
              <p>
                今後とも、より良い製品とサービスの提供に努めてまいりますので、引き続きご支援・ご愛顧を賜りますようお願い申し上げます。
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                ホームに戻る
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

