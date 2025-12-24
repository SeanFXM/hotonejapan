"use client"

import { BlogSlider } from "@/components/blog-slider"
import Link from "next/link"

const artists = [
  {
    id: 1,
    name: "Cory Wong",
    role: "Guitarist",
    genre: "Funk / Jazz",
    image: "/hotone-cory-wong-main.png",
    link: "/brands/hotone/artists/cory-wong",
  },
  {
    id: 2,
    name: "Kaichi Naito",
    role: "Guitarist",
    genre: "Kawaii Future Bass",
    image: "/kaichi-naito-hero.png",
    link: "/brands/hotone/artists/kaichi-naito",
  },
  {
    id: 3,
    name: "Kenji Suzuki",
    nameJp: "鈴木健治",
    role: "Guitarist / Composer",
    genre: "J-Pop / Session",
    image: "/kenji-suzuki-hero.png",
    link: "/brands/hotone/artists/kenji-suzuki",
  },
  {
    id: 4,
    name: "MASAToooN!",
    role: "8string Guitarist / Composer / Model / Jewelry Designer",
    genre: "Fantasy Journey",
    image: "/masatooon-hero-main.png",
    link: "/brands/hotone/artists/masatooon",
  },
  {
    id: 5,
    name: 'Claudio "Tano" Marciello',
    role: "Guitarist / Composer",
    genre: "Heavy Metal / Thrash",
    image: "/tano-marciello-hero.png",
    link: "/brands/hotone/artists/tano-marciello",
  },
  {
    id: 6,
    name: "Artist Name 6",
    role: "Bassist",
    genre: "Rock / Alternative",
    image: "/bassist.png",
  },
  {
    id: 7,
    name: "Artist Name 7",
    role: "Guitarist",
    genre: "Metal / Hard Rock",
    image: "/metal-guitarist.jpg",
  },
  {
    id: 8,
    name: "Artist Name 8",
    role: "Acoustic Guitarist",
    genre: "Folk / Acoustic",
    image: "/acoustic-guitarist.jpg",
  },
]

export default function HotoneArtistsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Hotone Artists</h1>
            <div className="flex justify-center mb-6">
              <div className="h-1 w-32 bg-orange-500"></div>
            </div>
            <p className="text-xl text-gray-300 leading-relaxed">
              世界中のプロフェッショナルアーティストがHotoneを信頼し、使用しています。
              <br />
              彼らの音楽とともに、Hotoneのサウンドをお楽しみください。
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {artists.map((artist) => (
              <Link
                key={artist.id}
                href={artist.link || "#"}
                className="group cursor-pointer bg-white overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-[400px] bg-gray-200 overflow-hidden">
                  <img
                    src={artist.image || "/placeholder.svg"}
                    alt={artist.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{artist.name}</h3>
                  {artist.nameJp && <p className="text-lg text-gray-700 mb-1">{artist.nameJp}</p>}
                  <p className="text-sm text-orange-600 font-medium mb-2">{artist.role}</p>
                  <p className="text-sm text-gray-600">{artist.genre}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">あなたもHotoneアーティストに</h2>
          <p className="text-xl mb-8 text-orange-100">
            Hotoneの製品を使用しているアーティストの方は、ぜひご連絡ください
          </p>
          <a
            href="/support/contact"
            className="inline-block px-8 py-4 bg-white text-orange-600 hover:bg-gray-100 transition-colors font-bold text-lg"
          >
            お問い合わせ
          </a>
        </div>
      </section>

      {/* Blog Slider */}
      <BlogSlider />
    </div>
  )
}
