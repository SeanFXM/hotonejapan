"use client"

import { BlogSlider } from "@/components/blog-slider"
import Link from "next/link"

export default function KaichiNaitoArtistPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      {/* Hero Section with Image */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Artist Image */}
            <div className="relative w-full max-w-[500px] mx-auto">
              <div className="aspect-square overflow-hidden shadow-2xl">
                <img src="/kaichi-naito-hero.png" alt="Kaichi Naito" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Right: Basic Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4">Kaichi Naito</h1>
                <div className="flex items-center gap-4 text-xl">
                  <span className="px-4 py-2 bg-gray-700 font-medium">Guitarist</span>
                  <span className="text-gray-300">Kawaii Future Bass / HipHop</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold mb-4">公式リンク</h3>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://kaichi-naito.github.io/website"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2"
                  >
                    <span>Official Website</span>
                  </a>
                  <a
                    href="https://www.instagram.com/kaichi_zz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2"
                  >
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://x.gd/Spotify_Kaichi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2"
                  >
                    <span>Spotify</span>
                  </a>
                  <a
                    href="https://x.gd/AppleM_Kaichi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2"
                  >
                    <span>Apple Music</span>
                  </a>
                  <a
                    href="https://x.com/Kaichi_zZ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2"
                  >
                    <span>X (Twitter)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto bg-gray-900/80 backdrop-blur-sm shadow-2xl border border-gray-800 overflow-hidden">
          {/* Biography Section */}
          <section className="p-12 md:p-16">
            <h2 className="text-4xl font-bold text-gray-100 mb-3">プロフィール</h2>
            <div className="h-1 w-16 bg-orange-400 mb-10"></div>

            {/* Main content with image */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-16">
              <div className="lg:col-span-3 space-y-5 text-gray-300 leading-relaxed">
                <p className="text-base">
                  Kaichi
                  Naitoは、東京出身のギタリスト。彼の音楽は、クリーントーンのギターを使ったタッピングやアルペジオに、Kawaii
                  Future Bass や HipHop を融合させたスタイルが特徴。
                </p>
                <p className="text-base">
                  2020年から Instagram や YouTube
                  などのSNSで世界的に活動を開始し、現在SNSの総フォロワー数は約3万人に達している。
                </p>
              </div>
              <div className="lg:col-span-2">
                <div className="overflow-hidden shadow-xl shadow-black/50 h-full">
                  <img
                    src="/kaichi-naito-hero.png"
                    alt="Kaichi Naito with guitar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Final paragraph full width */}
            <div className="space-y-5 text-gray-300 leading-relaxed text-center">
              <p className="text-lg font-medium">
                🌐{" "}
                <a
                  href="https://kaichi-naito.github.io/website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:text-orange-300 transition-colors"
                >
                  kaichi-naito.github.io/website
                </a>
              </p>
            </div>
          </section>

          <div className="border-t border-gray-800"></div>

          {/* Career Highlights Timeline */}
          <section className="p-12 md:p-16 bg-gray-800/30">
            <h2 className="text-4xl font-bold text-gray-100 mb-3">キャリアハイライト</h2>
            <div className="h-1 w-16 bg-orange-400 mb-10"></div>

            <div className="space-y-8">
              {/* Timeline Item */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-orange-400">2020</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">1st EP「Midnight Galaxy」</h3>
                  <p className="text-gray-300">デビューEP「Midnight Galaxy」をリリース。SNSでの活動を本格的に開始</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-orange-400">2021</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">2nd EP「Late bread girl」</h3>
                  <p className="text-gray-300">
                    2nd EP「Late bread girl」をリリース。テーマは「Kawaii Future Bass × クリーンギターインスト」
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-orange-400">2022</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">「Starlight Arpeggio」コラボレーション</h3>
                  <p className="text-gray-300">
                    トラックメイキングユニット Neko Hacker の Sera とコラボレーションし、「Starlight
                    Arpeggio」をリリース
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-orange-400">現在</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">継続的な活動</h3>
                  <p className="text-gray-300">
                    約3か月ごとにシングルを継続的に発表し、SNS総フォロワー数約3万人を達成。世界的に活動を展開中
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Back to Artists */}
      <section className="py-12 bg-gray-950 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <Link
            href="/brands/hotone/artists"
            className="inline-flex items-center gap-3 text-gray-400 hover:text-gray-100 transition-colors group"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-base font-medium border-b border-transparent group-hover:border-gray-400 transition-all">
              アーティスト一覧に戻る
            </span>
          </Link>
        </div>
      </section>

      <div className="h-px bg-gray-800"></div>

      {/* Blog Slider */}
      <BlogSlider />
    </div>
  )
}
