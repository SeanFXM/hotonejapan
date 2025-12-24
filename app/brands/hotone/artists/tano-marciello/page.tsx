"use client"

import { BlogSlider } from "@/components/blog-slider"
import Link from "next/link"

export default function TanoMarcielloArtistPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      {/* Hero Section with Image */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Artist Image */}
            <div className="relative w-full max-w-[500px] mx-auto">
              <div className="aspect-square overflow-hidden shadow-2xl">
                <img
                  src="/tano-marciello-hero.png"
                  alt="Claudio Tano Marciello"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right: Basic Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4">Claudio "Tano" Marciello</h1>
                <div className="flex items-center gap-4 text-xl">
                  <span className="px-4 py-2 bg-gray-700 font-medium">Guitarist / Composer</span>
                  <span className="text-gray-300">Heavy Metal / Thrash</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold mb-4">公式リンク</h3>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://www.instagram.com/claudiotanomarciello/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2"
                  >
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://open.spotify.com/artist/4gHjWV2oalYMkHYfBCt3Lr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2"
                  >
                    <span>Spotify</span>
                  </a>
                  <a
                    href="https://music.apple.com/es/artist/claudio-tano-marciello/1123084661"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2"
                  >
                    <span>Apple Music</span>
                  </a>
                  <a
                    href="https://www.facebook.com/claudio.marciellook/"
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
                  Claudio Rosano Marciello、通称 "Tano" Marciello
                  は、アルゼンチンを代表するギタリストの一人であり、同国におけるトップ5のメタルギタリストとして広く認知されている。1963年、サン・フストに生まれ、30年以上にわたりラテンアメリカのメタルシーンを牽引してきた存在である。
                </p>
                <p className="text-base">
                  1995年から2016年まで、伝説的なバンド Almafuerte
                  のリードギタリストを務め、そのプレイはバンドの独自のサウンドの中心となった。彼はヘヴィメタルやスラッシュメタルだけでなく、アルゼンチンのフォルクローレやタンゴの要素を取り入れ、ジャンルの表現力を広げ、南米ロックに消えない足跡を残した。
                </p>
              </div>
              <div className="lg:col-span-2">
                <div className="overflow-hidden shadow-xl shadow-black/50 h-full">
                  <img
                    src="/tano-marciello-ampero.png"
                    alt="Tano Marciello with Hotone Ampero"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-16">
              <div className="lg:col-span-2">
                <div className="overflow-hidden shadow-xl shadow-black/50 h-full">
                  <img
                    src="/tano-marciello-concert.png"
                    alt="Tano Marciello concert view"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="lg:col-span-3 space-y-5 text-gray-300 leading-relaxed">
                <p className="text-base">
                  Almafuerte 以前には、Mama Split、Tronador、El Reloj、El Expreso
                  などのバンドで腕を磨き、またソロキャリアにおいても複数のアルバムを発表。高度なテクニックと旋律的かつ情感豊かなギタープレイを披露してきた。
                </p>
                <p className="text-base">
                  『Rolling
                  Stone』誌は彼をアルゼンチンで最も技巧的なギタリストの一人と評した。しかしランキングを超えて、ファンやミュージシャンにとって
                  "Tano"
                  は真のアイコンであり、情熱、精緻さ、そしてアルゼンチンの魂を一音一音に込めるギタリストなのである。
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              <div className="lg:col-span-3 space-y-5 text-gray-300 leading-relaxed">
                <p className="text-base">
                  近年では、ソロアーティストとして活動を継続し、ライブ出演、レコーディング、教育活動などを展開。アルゼンチン・メタルを代表する存在として、ファンやミュージシャンからアイコン的ギタリストと見なされている。
                </p>
              </div>
              <div className="lg:col-span-2">
                <div className="overflow-hidden shadow-xl shadow-black/50 h-full">
                  <img
                    src="/tano-marciello-stage.png"
                    alt="Tano Marciello performing on stage"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          <div className="border-t border-gray-800"></div>

          {/* Career Highlights Timeline */}
          <section className="p-12 md:p-16 bg-gray-800/30">
            <h2 className="text-4xl font-bold text-gray-100 mb-3">キャリアハイライト</h2>
            <div className="h-1 w-16 bg-orange-400 mb-10"></div>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-orange-400">1963</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">誕生</h3>
                  <p className="text-gray-300">アルゼンチン、ブエノスアイレス州サン・フストに生まれる</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-orange-400">1980年代</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">キャリア開始</h3>
                  <p className="text-gray-300">
                    アルゼンチンのローカルなロック／メタルシーンで活動を開始し、Mama Split、Tronador、El Reloj、El
                    Expreso など複数のバンドに参加
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-orange-400">1995</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">Almafuerte 加入</h3>
                  <p className="text-gray-300">
                    伝説的メタルバンド Almafuerte
                    に加入し、リードギタリストを務める。彼の演奏はバンドの象徴的なサウンドの中核となる
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-orange-400">1995–2016</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">Almafuerte での活躍</h3>
                  <p className="text-gray-300">
                    Almafuerte
                    のギタリストとして20年以上にわたり活躍。アルゼンチンのフォルクローレやタンゴの要素をヘヴィメタルに融合させ、南米ロック／メタルのスタイルに大きな影響を与える
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-orange-400">2000年代</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">ソロキャリア展開</h3>
                  <p className="text-gray-300">
                    ソロキャリアも展開し、複数のソロアルバムをリリース。高度なテクニックと旋律的・情感的なギタープレイを披露
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-orange-400">2011以降</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">Rolling Stone 誌による評価</h3>
                  <p className="text-gray-300">
                    『Rolling Stone』誌にてアルゼンチンでもっとも技巧的なギタリストの一人として選出される
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-orange-400">2016</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">ソロ活動継続</h3>
                  <p className="text-gray-300">
                    Almafuerte の活動休止後、ソロでの音楽活動を継続。ライブ出演、レコーディング、教育活動などを展開
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-orange-400">現在</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">アルゼンチン・メタルのアイコン</h3>
                  <p className="text-gray-300">
                    アルゼンチン・メタルを代表する存在として、ファンやミュージシャンからアイコン的ギタリストと見なされている。彼の演奏は「情熱・精緻さ・アルゼンチンの魂」が融合したものとして知られる
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
