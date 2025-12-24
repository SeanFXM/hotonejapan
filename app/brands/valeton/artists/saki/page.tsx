"use client"

import { BlogSlider } from "@/components/blog-slider"
import Link from "next/link"

export default function SakiArtistPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      {/* Hero Section with Image */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Artist Image */}
            <div className="relative w-full max-w-[500px] mx-auto">
              <div className="aspect-square rounded-lg overflow-hidden shadow-2xl">
                <img src="/valeton-saki-main.jpg" alt="saki" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Right: Basic Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4">SAKI</h1>
                <div className="flex items-center gap-4 text-xl">
                  <span className="px-4 py-2 bg-gray-700 rounded-md font-medium">Guitarist</span>
                  <span className="text-gray-300">Rock / Metal</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold mb-4">公式リンク</h3>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://x.com/_chakixx_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors flex items-center gap-2"
                  >
                    <span>X (Twitter)</span>
                  </a>
                  <a
                    href="https://www.instagram.com/_chakixx_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors flex items-center gap-2"
                  >
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://www.youtube.com/@guitaristsakichannel3515"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors flex items-center gap-2"
                  >
                    <span>YouTube</span>
                  </a>
                  <a
                    href="https://www.threads.com/@_chakixx_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors flex items-center gap-2"
                  >
                    <span>Threads</span>
                  </a>
                  <a
                    href="https://www.tiktok.com/@guitaristsaki"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors flex items-center gap-2"
                  >
                    <span>TikTok</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-800 overflow-hidden">
          {/* Biography Section */}
          <section className="p-12 md:p-16">
            <h2 className="text-4xl font-bold text-gray-100 mb-3">プロフィール</h2>
            <div className="h-1 w-16 bg-amber-400 mb-10"></div>

            {/* First paragraph with large side image */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-16">
              <div className="lg:col-span-3 space-y-5 text-gray-300 leading-relaxed">
                <p className="text-base">
                  SAKIは2010年、慶應義塾大学在学中に徳間書店より出版された『mixx』でデビューしました。
                  2013年にはメタルバンド Mary's Blood
                  に加入し、日本コロムビアから二度目のメジャーデビューを果たしました。
                  同年リリースされたデビューアルバム『Countdown to
                  Evolution』はオリコンデイリーランキングで最高8位を記録しました。
                </p>
                <p className="text-base">
                  2016年には、ルーク篁（聖飢魔II）、山下昌良（LOUDNESS）、本間辰宗（ANTHEM）と共に OzzFest 2016
                  に出演しました。 また、Animetal the Second の唯一の女性メンバーでもあります。
                </p>
              </div>
              <div className="lg:col-span-2">
                <div className="rounded-xl overflow-hidden shadow-xl shadow-black/50 h-full">
                  <img
                    src="/valeton-saki-gp200-1.jpg"
                    alt="saki with Valeton GP-200"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-16">
              <div className="lg:col-span-2">
                <div className="rounded-xl overflow-hidden shadow-xl shadow-black/50 h-full">
                  <img
                    src="/valeton-saki-gp200-2.jpg"
                    alt="saki with Valeton GP-200"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="lg:col-span-3 space-y-5 text-gray-300 leading-relaxed">
                <p className="text-base">
                  2019年、ガールズメタルバンド NEMOPHILA を結成。
                  バンドのメタル／ラウドロックサウンドは日本国内外で人気を集め、YouTubeのチャンネル登録者数は36万人に到達しました。
                  初のワンマンライブは LINE CUBE SHIBUYA
                  でソールドアウトし、デビュー4年目には日本武道館で公演を実現。海外ではアメリカで開催された Aftershock
                  Festival などにも招待されました。
                </p>
                <p className="text-base">
                  2020年には、Kreator（元 DragonForce）の フレデリック・ルクレール と共に多国籍メタルユニット AMAHIRU
                  を結成。 デビューアルバム『AMAHIRU』をリリースし、AMARANTHE の エリーゼ・リード
                  をゲストボーカルに迎えました。
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-16">
              <div className="lg:col-span-3 space-y-5 text-gray-300 leading-relaxed">
                <p className="text-base">
                  2023年には、L'Arc~en~Ciel のtetsuyaが結成した Like~an~Angel にメンバーとして加入。
                  2024年にはソロギタリストとしてのキャリアを開始し、2021年リリースのソロシングル『BRIGHTNESS』、そして2024年の『GERMINANS』はいずれも日本国内外のiTunesインストゥルメンタル部門で高い評価を得ました。
                </p>
              </div>
              <div className="lg:col-span-2">
                <div className="rounded-xl overflow-hidden shadow-xl shadow-black/50 h-full">
                  <img
                    src="/valeton-saki-vps6.jpg"
                    alt="saki with Valeton VPS-6"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Final paragraph full width */}
            <div className="space-y-5 text-gray-300 leading-relaxed">
              <p className="text-base">
                過去10年間、彼女はヘヴィメタル専門誌 『BURRN!』 の読者投票において女性ギタリスト部門で連続1位を獲得。
                また、TBSのテレビ番組『マツコの知らない世界』においても、「BURRN!」誌の男性投票で最高位を獲得したギタリストとして紹介され、SHOW-YAの寺田恵子と共に出演し、ガールズバンドの世界を紹介しました。
              </p>
            </div>
          </section>

          <div className="border-t border-gray-800"></div>

          {/* Career Highlights Timeline */}
          <section className="p-12 md:p-16 bg-gray-800/30">
            <h2 className="text-4xl font-bold text-gray-100 mb-3">キャリアハイライト</h2>
            <div className="h-1 w-16 bg-amber-400 mb-10"></div>

            <div className="space-y-8">
              {/* Timeline Item */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-amber-400">2010</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">デビュー</h3>
                  <p className="text-gray-300">慶應義塾大学在学中に徳間書店より出版された『mixx』でデビュー</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-amber-400">2013</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">Mary's Blood 加入</h3>
                  <p className="text-gray-300">
                    メタルバンド Mary's Blood に加入、日本コロムビアからメジャーデビュー
                    <br />
                    デビューアルバム『Countdown to Evolution』がオリコンデイリーランキング最高8位を記録
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-amber-400">2016</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">OzzFest 2016 出演</h3>
                  <p className="text-gray-300">
                    ルーク篁（聖飢魔II）、山下昌良（LOUDNESS）、本間辰宗（ANTHEM）と共演
                    <br />
                    Animetal the Second の唯一の女性メンバーとして活動
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-amber-400">2019</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">NEMOPHILA 結成</h3>
                  <p className="text-gray-300">
                    ガールズメタルバンド NEMOPHILA を結成
                    <br />
                    YouTubeチャンネル登録者数36万人、日本武道館公演実現、Aftershock Festival 出演
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-amber-400">2020</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">AMAHIRU 結成</h3>
                  <p className="text-gray-300">
                    フレデリック・ルクレール（元 DragonForce）と多国籍メタルユニット AMAHIRU を結成
                    <br />
                    デビューアルバム『AMAHIRU』をリリース
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-amber-400">2023</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">Like~an~Angel 加入</h3>
                  <p className="text-gray-300">L'Arc~en~Ciel のtetsuyaが結成した Like~an~Angel にメンバーとして加入</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-amber-400">2024</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">ソロキャリア開始</h3>
                  <p className="text-gray-300">
                    ソロギタリストとしてのキャリアを開始
                    <br />
                    ソロシングル『BRIGHTNESS』『GERMINANS』がiTunesインストゥルメンタル部門で高評価
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
            href="/brands/valeton/artists"
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
