"use client"

import Image from "next/image"
import { HandlesoftModule } from "@/types/product-config"

interface HandlesoftSectionProps {
  config: HandlesoftModule
}

export function HandlesoftSection({ config }: HandlesoftSectionProps) {
  if (!config.enabled) {
    return null
  }

  // 固定内容，直接复制oria的实现
  return (
    <section id="bundle" className="py-20 bg-[#1a1a1a]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">ARC</h2>
          <h3 className="text-3xl font-bold text-white mb-4">フリー・ソフトウェア・バンドル</h3>
          <div className="flex justify-center mb-8">
            <div className="w-24 h-1 rounded-full bg-purple-600" />
          </div>
          <p className="text-gray-300 max-w-4xl mx-auto mb-2">
            Audientの対象製品をお使いのユーザーの方々は、下記のDAW & プラグイン・ソフトをフリー・ダウンロードしていただけます。
          </p>
          <p className="text-gray-400 text-sm">
            ※ フリー・ダウンロードしていただけるソフトウェアは、期間により変更されることがございます。予めご了承ください。
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Row 1: 3 products */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Softube Flow */}
            <div className="bg-[#f0f0f0] rounded-xl p-6">
              <div className="mb-4">
                <Image src="/images/brands/audient/Oria/handlesoft_01.svg" alt="Softube" width={120} height={30} />
              </div>
              <div className="mb-4">
                <Image src="/images/brands/audient/Oria/handlesoft_02.webp" alt="Softube Flow" width={300} height={180} className="w-full h-auto rounded-lg" />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Softube Flow® Mastering Suite- <span className="text-red-500">New!</span> -</h4>
              <p className="text-sm text-gray-600 mb-3">Mastering Suite</p>
              <p className="text-sm text-gray-700 mb-3">
                Softube と提携して、音楽プロデューサーの時間と命を救う究極のツールである Flow® Mastering Suite の 1 か月間の無料トライアルを独占的にご提供します。
              </p>
              <p className="text-xs text-gray-500">
                ARCに登録すると、１か月間の無料トライアルを独占的にご提供します。（*2025年10月8日まで）
              </p>
            </div>

            {/* GForce AXXESS */}
            <div className="bg-[#f0f0f0] rounded-xl p-6">
              <div className="mb-4">
                <Image src="/images/brands/audient/Oria/handlesoft_03.svg" alt="GForce" width={120} height={30} />
              </div>
              <div className="mb-4">
                <Image src="/images/brands/audient/Oria/handlesoft_04.webp" alt="GForce AXXESS" width={300} height={180} className="w-full h-auto rounded-lg" />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">GForce AXXESS- <span className="text-red-500">New!</span> -</h4>
              <p className="text-sm text-gray-600 mb-3">Fat, Gnarly, Flexible, Poly Synth Plugin</p>
              <p className="text-sm text-gray-700 mb-3">
                GForce AXXESSは、強力で使いやすい新しいシンセで、いくつかの優れた機能を備えています。パワフルなベース、高揚するリード、崇高なパッドをお楽しみください。
              </p>
              <p className="text-xs text-gray-500">
                ARCに登録すると、独占無料永久ライセンスがご利用いただけます。（*2025年7月17日まで）
              </p>
            </div>

            {/* Strymon BigSky */}
            <div className="bg-[#f0f0f0] rounded-xl p-6">
              <div className="mb-4">
                <Image src="/images/brands/audient/Oria/handlesoft_05.png" alt="Strymon" width={120} height={30} />
              </div>
              <div className="mb-4">
                <Image src="/images/brands/audient/Oria/handlesoft_06.png" alt="BigSky" width={300} height={180} className="w-full h-auto rounded-lg" />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">BigSky Plug-in</h4>
              <p className="text-sm text-gray-600 mb-3">Multidimensional Reverb Plugin from strymon®</p>
              <p className="text-sm text-gray-700 mb-3">
                12のカスタムチューニングされた高解像度リバーブアルゴリズムを含む、Strymon BigSkyプラグインで、これまで想像したこともなかったリバーブサウンドを体験できます。
              </p>
              <p className="text-xs text-gray-500 mb-2">
                ARCに登録すると、120日間の無料トライアルをお試しいただけます。（*2024年9月12日まで）
              </p>
              <a href="#" className="text-sm text-red-500 hover:underline">● 詳細はAUDIENT ARC BigSkyをご覧ください。</a>
            </div>
          </div>

          {/* Row 2: 3 products */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Cubase */}
            <div className="bg-[#f0f0f0] rounded-xl p-6">
              <div className="mb-4">
                <Image src="/images/brands/audient/Oria/handlesoft_07.png" alt="Steinberg" width={120} height={30} />
              </div>
              <div className="mb-4">
                <Image src="/images/brands/audient/Oria/handlesoft_08.png" alt="Cubase" width={300} height={180} className="w-full h-auto rounded-lg" />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Cubase™ & Cubasis™ LE 3</h4>
              <p className="text-sm text-gray-600 mb-3">Music creation software from Steinberg®</p>
              <p className="text-sm text-gray-700 mb-3">
                Steinbergの大人気DAWソフトウェア。macOS、Windows、iOSでお使い頂けます。
              </p>
              <p className="text-xs text-gray-500">
                ※ 現在、Cubasis LE3の対応機種は、evo4、iD4、iD4mkⅡの３機種です。これら以外の機種につきましては、今後のアップデートをお待ちください。
              </p>
            </div>

            {/* Retrologue */}
            <div className="bg-[#f0f0f0] rounded-xl p-6">
              <div className="mb-4">
                <Image src="/images/brands/audient/Oria/handlesoft_09.png" alt="Steinberg" width={120} height={30} />
              </div>
              <div className="mb-4">
                <Image src="/images/brands/audient/Oria/handlesoft_10.jpg" alt="Retrologue" width={300} height={180} className="w-full h-auto rounded-lg" />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Retrologue 2</h4>
              <p className="text-sm text-gray-600 mb-3">Classic analogue synth from Steinberg®</p>
              <p className="text-sm text-gray-700">
                Steinbergのクラシック・アナログ（ヴァーチャル）・シンセサイザー
              </p>
            </div>

            {/* M-Tron Pro LE */}
            <div className="bg-[#f0f0f0] rounded-xl p-6">
              <div className="mb-4">
                <Image src="/images/brands/audient/Oria/handlesoft_11.png" alt="GForce" width={120} height={30} />
              </div>
              <div className="mb-4">
                <Image src="/images/brands/audient/Oria/handlesoft_12.png" alt="M-Tron Pro LE" width={300} height={180} className="w-full h-auto rounded-lg" />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">M-Tron Pro LE</h4>
              <p className="text-sm text-gray-600 mb-3">Digital emulation of the classic Mellotron®</p>
              <p className="text-sm text-gray-700">
                The Beatles、Yes、Led ZeppelinやThe Moody Bluesが使用した1960年代のMellotron®のエミュレーション・ソフトウェア。Audientユーザーはフルバージョンへのアップグレードが、通常の50% offで行えます。
              </p>
            </div>
          </div>

          {/* Row 3: 3 products */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Torpedo Wall of Sound */}
            <div className="bg-[#f0f0f0] rounded-xl p-6">
              <div className="mb-4">
                <Image src="/images/brands/audient/Oria/handlesoft_13.png" alt="Two Notes" width={120} height={30} />
              </div>
              <div className="mb-4">
                <Image src="/images/brands/audient/Oria/handlesoft_14.png" alt="Torpedo" width={300} height={180} className="w-full h-auto rounded-lg" />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Torpedo Wall of Sound™</h4>
              <p className="text-sm text-gray-600 mb-3">Highly realistic cab simulation from Two Notes®</p>
              <p className="text-sm text-gray-700">
                キャビネット・シミュレーター・ソフトウェア。MesaBoogie、Fender、Ampegを含んだ８種類のキャビネット・シミュレーター。
              </p>
            </div>

            {/* Subito Piano */}
            <div className="bg-[#f0f0f0] rounded-xl p-6">
              <div className="mb-4">
                <Image src="/images/brands/audient/Oria/handlesoft_15.svg" alt="Subito Piano" width={120} height={30} />
              </div>
              <div className="mb-4">
                <Image src="/images/brands/audient/Oria/handlesoft_16.svg" alt="Subito Piano" width={300} height={180} className="w-full h-auto rounded-lg" />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Subito Piano</h4>
              <p className="text-sm text-gray-600 mb-3">Your tracks through a real grand piano</p>
              <p className="text-sm text-gray-700">
                MIDIトラックをグランドピアノでの演奏に変更してくれます。
              </p>
            </div>

            {/* Waldorf Edition */}
            <div className="bg-[#f0f0f0] rounded-xl p-6">
              <div className="mb-4">
                <Image src="/images/brands/audient/Oria/handlesoft_17.png" alt="Waldorf" width={120} height={30} />
              </div>
              <div className="mb-4">
                <Image src="/images/brands/audient/Oria/handlesoft_18.png" alt="Waldorf Edition" width={300} height={180} className="w-full h-auto rounded-lg" />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Waldorf Edition 2 LE™</h4>
              <p className="text-sm text-gray-600 mb-3">Software emulations of classic Waldorf®</p>
              <p className="text-sm text-gray-700">
                synth PPG Wave 2™、drum module Attack™、filter D-pole™のWaldorf®プロダクトをお使い頂けます。
              </p>
            </div>
          </div>

          {/* Row 4: 2 products */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Produce Like A Pro */}
            <div className="bg-[#f0f0f0] rounded-xl p-6">
              <div className="mb-4">
                <Image src="/images/brands/audient/Oria/handlesoft_19.png" alt="Produce Like A Pro" width={150} height={30} />
              </div>
              <div className="mb-4">
                <Image src="/images/brands/audient/Oria/handlesoft_20.png" alt="Produce Like A Pro" width={300} height={180} className="w-full h-auto rounded-lg" />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Produce Like A Pro™</h4>
              <p className="text-sm text-gray-600 mb-3">3 free online courses plus 10% off your next course</p>
              <p className="text-sm text-gray-700">
                レコーディングやミキシングのオンライン講座（英語）です。
              </p>
            </div>

            {/* Loopcloud */}
            <div className="bg-[#f0f0f0] rounded-xl p-6">
              <div className="mb-4">
                <Image src="/images/brands/audient/Oria/handlesoft_21.png" alt="Loopcloud" width={150} height={30} />
              </div>
              <div className="mb-4">
                <Image src="/images/brands/audient/Oria/handlesoft_22.png" alt="Loopcloud" width={300} height={180} className="w-full h-auto rounded-lg" />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">2GB of free samples</h4>
              <p className="text-sm text-gray-600 mb-3">Access the world&apos;s biggest library of samples</p>
              <p className="text-sm text-gray-700">
                drum loops、synth loops、vocal loopsのパッケージがお使い頂けます。
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <a href="#" className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full transition-colors">
              ● ARCのご利用方法について、詳しくはこちらをご覧ください
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

