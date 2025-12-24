export function AboutSection() {
  return (
    <section className="py-20 bg-background" id="about">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-foreground">会社概要</h2>
            <p className="text-sm text-muted-foreground">About Us</p>
          </div>

          <div className="prose prose-sm md:prose-base max-w-none">
            <div className="bg-muted/30 p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">会社名</h3>
                  <p className="text-base text-foreground">株式会社代理商</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">設立</h3>
                  <p className="text-base text-foreground">2010年</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">代表取締役</h3>
                  <p className="text-base text-foreground">山田 太郎</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">従業員数</h3>
                  <p className="text-base text-foreground">50名</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">事業内容</h3>
                  <p className="text-base text-foreground leading-relaxed">
                    世界各国の優れた製品を日本市場に紹介し、販売代理業務を行っております。
                    お客様のニーズに合わせた最適な製品をご提案いたします。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
