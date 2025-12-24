"use client"

import { BlogSlider } from "@/components/blog-slider"
import Link from "next/link"

export default function MASAToooNArtistPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      {/* Hero Section with Image */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Artist Image */}
            <div className="relative w-full max-w-[500px] mx-auto">
              <div className="aspect-square overflow-hidden shadow-2xl">
                <img src="/masatooon-hero-main.png" alt="MASAToooN" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Right: Basic Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4">MASAToooN!</h1>
                <div className="flex items-center gap-4 text-xl">
                  <span className="px-4 py-2 bg-gray-700 font-medium">
                    8string guitarist / Composer / Model / Jewelry designer
                  </span>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold mb-4">公式リンク</h3>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://masatooon.jimdofree.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2"
                  >
                    <span>Official Website</span>
                  </a>
                  <a
                    href="https://www.instagram.com/dime.masatooon/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2"
                  >
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://www.youtube.com/user/TheMasatoDX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2"
                  >
                    <span>YouTube</span>
                  </a>
                  <a
                    href="https://twitter.com/MASAToooN_New?lang=ja"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2"
                  >
                    <span>X (Twitter)</span>
                  </a>
                  <a
                    href="https://open.spotify.com/artist/54W3oUcPwp565G9faepkD4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2"
                  >
                    <span>Spotify</span>
                  </a>
                  <a
                    href="https://music.apple.com/us/artist/masatooon/1453784922"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2"
                  >
                    <span>Apple Music</span>
                  </a>
                  <a
                    href="http://hotoneaudio.oss-cn-shenzhen.aliyuncs.com/prod/support/Ampero%20Patches%20by%20MasaToooN%2C%20Pack%201.1596002862102.zip"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-orange-600 hover:bg-orange-700 transition-colors flex items-center gap-2"
                  >
                    <span>Download Presets</span>
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

            {/* First paragraph with large side image */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-16">
              <div className="lg:col-span-3 space-y-5 text-gray-300 leading-relaxed">
                <p className="text-base">
                  Masato は「Fantasy
                  journey（幻想の旅）」というコンセプトを基に、8弦ギターによるソロ演奏を行っている。彼のプレイは、これまでに聴いたことのないような新鮮な風を音楽にもたらす。
                </p>
                <p className="text-base">
                  フィンガースタイルを中心に、タッピングやスラップなど独自の奏法とサウンドを駆使し、独特の雰囲気とサウンドスケープを生み出している。
                </p>
              </div>
              <div className="lg:col-span-2">
                <div className="overflow-hidden shadow-xl shadow-black/50 h-full">
                  <img src="/masatooon-hero-2.png" alt="MASAToooN performing" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-16">
              <div className="lg:col-span-2">
                <div className="overflow-hidden shadow-xl shadow-black/50 h-full">
                  <img src="/masatooon-hero-1.png" alt="MASAToooN portrait" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="lg:col-span-3 space-y-5 text-gray-300 leading-relaxed">
                <p className="text-base">
                  ライブハウスやライブバー、レストラン、野外ステージ、ショッピングモール、美術館など、幅広いシーンでパフォーマンスを展開。
                </p>
                <p className="text-base">また、ジェンダーレスモデルやジュエリーデザイナーとしても活動している。</p>
              </div>
            </div>

            {/* Endorsement Brands */}
            <div className="space-y-5 text-gray-300 leading-relaxed">
              <p className="text-lg font-medium text-center">
                <span className="text-orange-400">その他のエンドースブランド：</span>
                <br />
                Futra / Sir Tone / Limetone Audio / Grover Allman
              </p>
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
