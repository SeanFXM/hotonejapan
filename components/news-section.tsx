import Link from "next/link"
import { Calendar } from "@/lib/icons"

const newsItems = [
  {
    id: 1,
    date: "2025.01.15",
    category: "新製品",
    title: "新しいブランドパートナーシップを発表",
    link: "/news/1",
  },
  {
    id: 2,
    date: "2025.01.10",
    category: "お知らせ",
    title: "2025年春季展示会のご案内",
    link: "/news/2",
  },
  {
    id: 3,
    date: "2025.01.05",
    category: "イベント",
    title: "製品デモンストレーションイベント開催",
    link: "/news/3",
  },
  {
    id: 4,
    date: "2024.12.20",
    category: "新製品",
    title: "最新製品ラインナップのご紹介",
    link: "/news/4",
  },
]

export function NewsSection() {
  return (
    <section className="py-16 md:py-24 bg-background relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">ニュース</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent" />
          </div>
          <Link href="/news" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
            すべて見る →
          </Link>
        </div>

        <div className="grid gap-6">
          {newsItems.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className="group border-b border-border pb-6 hover:border-primary/50 transition-all hover:pl-4 duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{item.date}</span>
                  </div>
                  <span className="px-3 py-1 bg-gradient-to-r from-primary/10 to-accent/10 text-xs font-medium text-foreground">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
