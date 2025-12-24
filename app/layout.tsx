import type React from "react"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Hotone Japan Homepage",
  description: "HOTONE Audio Japan Official Website - ギターエフェクター、アンプ、アクセサリー",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <ScrollToTop />
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          {children}
          <Footer />
        </Suspense>
      </body>
    </html>
  )
}
