"use client"

import { BlogSlider } from "@/components/blog-slider"
import Link from "next/link"

export default function CoryWongArtistPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      {/* Hero Section with Image */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Artist Image */}
            <div className="relative w-full max-w-[500px] mx-auto">
              <div className="aspect-square overflow-hidden shadow-2xl">
                <img src="/cory-wong-hero.png" alt="Cory Wong" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Right: Basic Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4">Cory Wong</h1>
                <div className="flex items-center gap-4 text-xl">
                  <span className="px-4 py-2 bg-gray-700 font-medium">Guitarist / Arranger / Producer</span>
                  <span className="text-gray-300">Funk / Jazz</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold mb-4">公式リンク</h3>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://www.corywongmusic.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2"
                  >
                    <span>Official Website</span>
                  </a>
                  <a
                    href="https://www.instagram.com/coryjwong/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2"
                  >
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UCQqC08JWnJGJIgw43XJ0GXw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2"
                  >
                    <span>YouTube</span>
                  </a>
                  <a
                    href="https://x.com/corywong"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2"
                  >
                    <span>X (Twitter)</span>
                  </a>
                  <a
                    href="https://www.facebook.com/corywongmusic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2"
                  >
                    <span>Facebook</span>
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
                  音楽は人々の心の最も深い部分を揺さぶり、力を与えてくれる。朝に気持ちを奮い立たせるために音楽を流し、ランニングマシンの前ではエネルギーを得るために聴き、長い通勤時間には生活に彩りを添えるために音楽を聴く。
                </p>
                <p className="text-base">
                  Cory Wong
                  はギタリスト、アレンジャー、プロデューサーであることを誇りに思っているが、自らをまず「エネルギッシュな存在」と考えている。Stratocaster
                  を肩に掛け、時にはジョークで観客を笑わせながら、ステージ上で自由奔放に演奏する姿はまさに彼らしい。
                </p>
              </div>
              <div className="lg:col-span-2">
                <div className="overflow-hidden shadow-xl shadow-black/50 h-full">
                  <img
                    src="/cory-wong-concert-1.png"
                    alt="Cory Wong performing live"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-16">
              <div className="lg:col-span-2">
                <div className="overflow-hidden shadow-xl shadow-black/50 h-full">
                  <img
                    src="/cory-wong-concert-2.png"
                    alt="Cory Wong concert view"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="lg:col-span-3 space-y-5 text-gray-300 leading-relaxed">
                <p className="text-base">「僕にとって一番大事なのはリスナーの感覚なんだ。」</p>
                <p className="text-base">
                  「『癒された』『面白かった』『現実から解放された』――そう感じてもらいたい。歌詞のないインストゥルメンタルで人を鼓舞するのは面白いチャレンジで、一人でもそう思ってくれたら成功なんだ。」2011年の登場以来、Cory
                  は自らを「音楽界の Tony
                  Robbins」と位置づけてきた。リズムギターの魔法、情熱あふれる演奏、ユーモアと強烈なステージ・プレゼンスが、彼を憧れの共演相手とし、同時に名高いソロアーティストへと押し上げた。
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-16">
              <div className="lg:col-span-3 space-y-5 text-gray-300 leading-relaxed">
                <p className="text-base">
                  「ギターを楽曲の特徴として際立たせるけど、自分が常に中心である必要はない。派手さよりもグルーヴを前面に出している。僕はそれを"秘密兵器"と呼んでいる。実際には難しいことをやっているが、曲の構成に欠かせないんだ。僕はギタリストというより作曲家として曲に向き合っている。」
                </p>
                <p className="text-base">
                  要するに、Cory Wong
                  はギターを通して最も純粋な喜びを伝えている。「僕の理念は"喜びを伝えること"。人々に新しい形でインストゥルメンタルを体験してほしい。これは単なるギター以上のものなんだ。」
                </p>
              </div>
              <div className="lg:col-span-2">
                <div className="overflow-hidden shadow-xl shadow-black/50 h-full">
                  <img
                    src="/cory-wong-pedalboard.png"
                    alt="Cory Wong pedalboard with Hotone"
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
                  href="https://www.corywongmusic.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:text-orange-300 transition-colors"
                >
                  www.corywongmusic.com
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
                  <span className="text-2xl font-bold text-orange-400">2000年代初</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">音楽教育</h3>
                  <p className="text-gray-300">
                    明尼苏ダ大学と McNally Smith College of Music で学び、職業音楽家を目指す
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-orange-400">2011</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">プロキャリア開始</h3>
                  <p className="text-gray-300">
                    ミネアポリス/セントポールのジャズクラブで活動を開始し、徐々に注目を集める
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-orange-400">2013</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">Vulfpeck との出会い</h3>
                  <p className="text-gray-300">バンド Vulfpeck のメンバーと出会い、長期的なコラボレーションを開始</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-orange-400">2017</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">初のソロアルバム</h3>
                  <p className="text-gray-300">デビューアルバム『Cory Wong and The Green Screen Band』をリリース</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-orange-400">2018</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">The Optimist</h3>
                  <p className="text-gray-300">個人アルバム『The Optimist』を発表</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-orange-400">2019</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">音楽スタイルの確立</h3>
                  <p className="text-gray-300">
                    『Motivational Music for the Syncopated Soul』をリリースし、個人的な音楽スタイルと影響力を確立
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-orange-400">2020</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">グラミー賞ノミネート</h3>
                  <p className="text-gray-300">
                    Jon Batiste
                    とのコラボアルバム『Meditations』がグラミー賞最優秀ニューエイジアルバムにノミネート。同年『Elevator
                    Music for an Elevated Mood』『Trail Songs: Dusk』『Trail Songs: Dawn』もリリース
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-orange-400">2021</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">大規模ツアー</h3>
                  <p className="text-gray-300">『Cory and the Wongnotes』をリリースし、大規模なツアーを展開</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-orange-400">2022</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">Power Station</h3>
                  <p className="text-gray-300">アルバム『Power Station』を発表</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-orange-400">2023</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">The Lucky One & 世界ツアー</h3>
                  <p className="text-gray-300">アルバム『The Lucky One』をリリースし、世界ツアーを継続</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-orange-400">現在</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">国際的な活動</h3>
                  <p className="text-gray-300">
                    ソロアーティスト、プロデューサー、コラボレーター（Vulfpeck、Dirty Loops、Dave Koz、Snarky Puppy
                    など）として国際的に活躍し、演奏とレコーディングを続けている
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
