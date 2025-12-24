import type { Metadata } from "next"
import { ChevronDown, Store, ExternalLink, Globe } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BlogSlider } from "@/components/blog-slider"

export const metadata: Metadata = {
  title: "販売店情報 | Hotone Japan",
  description: "Hotone製品を取り扱う販売店の情報をご覧いただけます。",
}

const onlineStores = [
  { name: "イケベ楽器", type: "WEBショップ", url: "https://www.ikebe-gakki.com/" },
  { name: "イシバシ楽器", type: "WEBショップ", url: "https://www.ishibashi.co.jp/" },
  { name: "ミュージックランドKEY", type: "WEBショップ", url: "https://www.musicland.co.jp/" },
  { name: "三木楽器", type: "MIKIGAKKI.COM", url: "https://www.mikigakki.com/ec/" },
  { name: "Rock on Company", type: "", url: "https://store.miroc.co.jp/" },
  { name: "chuya-online.com", type: "", url: "https://www.chuya-online.com/" },
  { name: "デジ倉 Sound Wave", type: "", url: "https://www.rakuten.ne.jp/gold/dejikura/" },
  { name: "ムラウチドットコム", type: "", url: "https://www.murauchi.com/" },
  { name: "Amazon.co.jp", type: "", url: "https://www.amazon.co.jp/" },
  { name: "愛曲楽器", type: "", url: "https://aikyoku.com/オンラインストア/" },
  { name: "三木楽器DZONE", type: "", url: "https://www.miki.co.jp/shop/#shop-dzone" },
  { name: "ワタナベ楽器通販", type: "", url: "https://www.watanabe-mi.com" },
  { name: "クロサワオンライン", type: "", url: "https://www.shopping-kurosawagakki.com" },
  { name: "サウンドハウス", type: "", url: "https://www.soundhouse.co.jp" },
  { name: "島村楽器オンライン", type: "", url: "https://store.shimamura.co.jp/ec/" },
  { name: "THEONE", type: "", url: "https://theonestore.jp" },
]

const regions = [
  {
    id: "online",
    title: "オンラインショップ",
    stores: onlineStores,
  },
  {
    id: "hokkaido-tohoku",
    title: "北海道・東北エリア",
    stores: [],
  },
  {
    id: "kanto-shutoken",
    title: "関東・首都圏エリア",
    stores: [],
  },
  {
    id: "tokyo",
    title: "東京エリア",
    stores: [],
  },
  {
    id: "koshinetsu-hokuriku",
    title: "甲信越・北陸エリア",
    stores: [],
  },
  {
    id: "tokai",
    title: "東海エリア",
    stores: [],
  },
  {
    id: "kansai",
    title: "関西エリア",
    stores: [],
  },
  {
    id: "chugoku-shikoku",
    title: "中国・四国エリア",
    stores: [],
  },
  {
    id: "kyushu-okinawa",
    title: "九州・沖縄エリア",
    stores: [],
  },
]

export default function DealersPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-muted/30 to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center justify-center rounded-full bg-primary/10 p-3">
              <Store className="h-8 w-8 text-primary" />
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">お近くの販売店をさがす</h1>
            <div className="mx-auto mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-primary/60" />
            <p className="text-lg text-muted-foreground">当社の取扱製品はこちらの販売店様でご購入いただけます。</p>
          </div>
        </div>
      </section>

      {/* Dealers List Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <Accordion type="single" collapsible className="space-y-4">
              {regions.map((region) => (
                <AccordionItem
                  key={region.id}
                  value={region.id}
                  className="overflow-hidden rounded-lg border bg-card shadow-sm transition-shadow hover:shadow-md"
                >
                  <AccordionTrigger className="px-6 py-5 text-left hover:no-underline [&[data-state=open]>svg]:rotate-180">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Store className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-lg font-semibold">{region.title}</span>
                    </div>
                    <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200" />
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    {region.stores.length > 0 ? (
                      <div className="space-y-3">
                        {region.stores.map((store, index) => (
                          <a
                            key={index}
                            href={store.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between rounded-lg border bg-card p-4 transition-all hover:border-primary/50 hover:bg-accent/50 hover:shadow-md"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                                <Globe className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                  {store.name}
                                </div>
                                {store.type && <div className="text-sm text-muted-foreground">{store.type}</div>}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </div>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-md bg-muted/30 p-6">
                        <p className="text-center text-muted-foreground">販売店情報は準備中です。</p>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Blog Slider */}
      <BlogSlider />
    </div>
  )
}
