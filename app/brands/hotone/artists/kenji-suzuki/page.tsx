"use client"

import { BlogSlider } from "@/components/blog-slider"
import Link from "next/link"

export default function KenjiSuzukiArtistPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      {/* Hero Section with Image */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Artist Image */}
            <div className="relative w-full max-w-[500px] mx-auto">
              <div className="aspect-square overflow-hidden shadow-2xl">
                <img src="/kenji-suzuki-hero.png" alt="Kenji Suzuki" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Right: Basic Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4">Kenji Suzuki</h1>
                <p className="text-3xl md:text-4xl font-bold mb-4 text-gray-300">鈴木健治</p>
                <div className="flex items-center gap-4 text-xl">
                  <span className="px-4 py-2 bg-gray-700 font-medium">Guitarist / Composer</span>
                  <span className="text-gray-300">J-Pop / Session</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold mb-4">公式リンク</h3>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://twitter.com/kenjisuzuki_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2"
                  >
                    <span>X (Twitter)</span>
                  </a>
                  <a
                    href="https://www.youtube.com/@kenjisuzuki"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2"
                  >
                    <span>YouTube</span>
                  </a>
                  <a
                    href="https://www.instagram.com/kenjisuzuki_guitar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2"
                  >
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://www.facebook.com/kenjisuzuki0218"
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
                  Kenji
                  Suzuki（鈴木健治）は、豊かで多様なキャリアを誇る、日本の音楽シーンに消えることのない足跡を残してきたギタリスト／作曲家である。彼の音楽の旅は
                  2005 年、「パリ・コレクション」の大舞台から始まり、Bob Dylan や James Brown
                  といった伝説的なアーティストと同じステージに立った。同年には、愛知万博（EXPO 2005）
                  にて、グラミー賞受賞アーティスト Erykah Badu と共演を果たしている。
                </p>
                <p className="text-base">
                  スタジオ・ミュージシャンとしての Kenji の実力は比類なく、これまでに 1000曲以上
                  のレコーディングに参加。MISIA、宇多田ヒカル、BoA、EXILE、倖田來未、SMAP
                  など数多くの有名アーティストの作品に貢献してきた。
                </p>
              </div>
              <div className="lg:col-span-2">
                <div className="overflow-hidden shadow-xl shadow-black/50 h-full">
                  <img
                    src="/kenji-suzuki-photo-2.png"
                    alt="Kenji Suzuki with guitar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-16">
              <div className="lg:col-span-2">
                <div className="overflow-hidden shadow-xl shadow-black/50 h-full">
                  <img
                    src="/kenji-suzuki-studio.png"
                    alt="Kenji Suzuki in studio with Hotone"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="lg:col-span-3 space-y-5 text-gray-300 leading-relaxed">
                <p className="text-base">
                  2004年には、華原朋美「あなたがいれば」
                  の編曲で日本レコード大賞（日本版グラミー賞に相当）編曲賞の金賞を受賞。また、アイドルグループ V6
                  に提供したオリジナル楽曲「ONE」はオリコンランキングで1位を獲得し、彼の卓越した作曲センスを示した。
                </p>
                <p className="text-base">
                  パフォーマーとしても Kenji は輝かしい経歴を持ち、MISIA
                  のバンドに10年以上にわたりレギュラー参加。さらに 「Music Fair」、「僕らの音楽」、「Music
                  Station」、「SONGS」 といった日本の著名な音楽番組にも出演してきた。
                </p>
              </div>
            </div>

            <div className="space-y-5 text-gray-300 leading-relaxed mb-16">
              <p className="text-base">
                ソロアーティストとしては、2011年にデビューアルバム 「Gray World」
                をリリースし、2015年にはセカンドアルバム 「New Gate」
                を発表。2014年には中国7公演のツアーを行い、フジゲン・ギター
                を積極的にプロモーション。また、iPhone用学習ツール 「Final Guitar」 の開発にも携わった。
              </p>
              <p className="text-base">
                1990年代から続く J-Pop シーンにおいて、Kenji
                の独自のグルーヴとクリエイティビティは大きな影響を与えてきた。オリジナルのギターソロ、ゲーム音楽、CM音楽など幅広い分野で活動し、多才な作曲家としての顔を持つ。
              </p>
              <p className="text-base">
                近年では、楽器メーカーのアドバイザーを務める一方、登録者数3.4万人を超える YouTube
                チャンネルで機材レビューや演奏を発信。さらにオンライン・コミュニティを立ち上げ、プロフェッショナル・ミュージシャンとしての活動を新たな領域へと広げている。
              </p>
              <p className="text-base font-medium">
                進化し続ける精神のもと、Kenji Suzuki
                は音楽創造とパフォーマンスの世界で常に新しい境地を切り開き、「音楽の巨匠」としての存在を示し続けている。
              </p>
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
                  <span className="text-2xl font-bold text-orange-400">2004</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">日本レコード大賞 編曲賞 金賞</h3>
                  <p className="text-gray-300">華原朋美「あなたがいれば」の編曲で受賞</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-orange-400">2005</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">パリ・コレクション & 愛知万博</h3>
                  <p className="text-gray-300">Bob Dylan、James Brown と共演。Erykah Badu と愛知万博で共演</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-orange-400">2011</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">デビューアルバム</h3>
                  <p className="text-gray-300">「Gray World」をリリース</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-orange-400">2014</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">中国ツアー</h3>
                  <p className="text-gray-300">中国7公演のツアーを実施</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-orange-400">2015</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">セカンドアルバム</h3>
                  <p className="text-gray-300">「New Gate」を発表</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-orange-400">現在</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">多方面での活動</h3>
                  <p className="text-gray-300">
                    YouTube
                    チャンネル（3.4万人登録）、楽器メーカーアドバイザー、オンライン・コミュニティ運営など、多岐にわたる活動を展開
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
