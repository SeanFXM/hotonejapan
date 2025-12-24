import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin } from "@/lib/icons"

export function ContactSection() {
  return (
    <section className="py-20 bg-muted/30" id="contact">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-foreground">お問い合わせ</h2>
            <p className="text-sm text-muted-foreground">Contact</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="flex flex-col items-center text-center p-6 bg-background border border-border">
              <div className="w-12 h-12 bg-muted flex items-center justify-center mb-3">
                <Mail className="w-5 h-5 text-foreground" />
              </div>
              <h3 className="font-semibold mb-2 text-sm">メール</h3>
              <p className="text-sm text-muted-foreground">contact@distributor.com</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-background border border-border">
              <div className="w-12 h-12 bg-muted flex items-center justify-center mb-3">
                <Phone className="w-5 h-5 text-foreground" />
              </div>
              <h3 className="font-semibold mb-2 text-sm">電話</h3>
              <p className="text-sm text-muted-foreground">+86 400-123-4567</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-background border border-border">
              <div className="w-12 h-12 bg-muted flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5 text-foreground" />
              </div>
              <h3 className="font-semibold mb-2 text-sm">住所</h3>
              <p className="text-sm text-muted-foreground">中国上海市浦東新区</p>
            </div>
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90">
              お問い合わせフォーム
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
