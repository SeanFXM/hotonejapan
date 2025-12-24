"use client"

import { BlogSlider } from "@/components/blog-slider"
import Link from "next/link"

const artists = [
  {
    id: 1,
    name: "saki",
    role: "Guitarist",
    genre: "Rock / Metal",
    image: "/valeton-saki-main.jpg",
    link: "/brands/valeton/artists/saki",
  },
  {
    id: 2,
    name: "右近 輝明",
    role: "Guitarist",
    genre: "Rock / Pop",
    image: "/valeton-ukon-teruaki.jpg",
  },
  {
    id: 3,
    name: "馬場 美夕",
    role: "Guitarist",
    genre: "Pop / Rock",
    image: "/valeton-baba-miyu.jpg",
  },
  {
    id: 4,
    name: "LUCILLE ROASCIO",
    role: "Bassist",
    genre: "Rock / Alternative",
    image: "/valeton-lucille-roascio.jpg",
  },
  {
    id: 5,
    name: "稲月カノン",
    role: "Guitarist",
    genre: "Pop / Rock",
    image: "/valeton-inazuki-kanon.jpg",
  },
  {
    id: 6,
    name: "Artist Name 6",
    role: "Guitarist",
    genre: "Metal / Hard Rock",
    image: "/musician.png?height=400&width=400&query=metal guitarist",
  },
  {
    id: 7,
    name: "Artist Name 7",
    role: "Acoustic Guitarist",
    genre: "Folk / Acoustic",
    image: "/musician.png?height=400&width=400&query=acoustic guitarist",
  },
  {
    id: 8,
    name: "Artist Name 8",
    role: "Guitarist",
    genre: "Indie / Alternative",
    image: "/musician.png?height=400&width=400&query=indie guitarist",
  },
]

export default function ValetonArtistsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Valeton Artists</h1>
            <div className="flex justify-center mb-6">
              <div className="h-1 w-32 bg-blue-500 rounded-full"></div>
            </div>
            <p className="text-xl text-gray-300 leading-relaxed">
              世界中のプロフェッショナルアーティストがValetonを信頼し、使用しています。
              <br />
              彼らの音楽とともに、Valetonのサウンドをお楽しみください。
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
                className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
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
                  <p className="text-sm text-blue-600 font-medium mb-2">{artist.role}</p>
                  <p className="text-sm text-gray-600">{artist.genre}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">あなたもValetonアーティストに</h2>
          <p className="text-xl mb-8 text-blue-100">
            Valetonの製品を使用しているアーティストの方は、ぜひご連絡ください
          </p>
          <a
            href="/support/contact"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition-colors font-bold text-lg"
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
