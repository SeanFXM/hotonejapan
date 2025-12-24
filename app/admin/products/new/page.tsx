"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function NewProductPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // 重定向到新的编辑器页面
    const brand = searchParams.get("brand")
    const slug = searchParams.get("slug")
    const name = searchParams.get("name")

    const params = new URLSearchParams()
    if (brand) params.set("brand", brand)
    if (slug) params.set("slug", slug)
    if (name) params.set("name", name)

    router.replace(`/admin/products/editor?${params.toString()}`)
  }, [router, searchParams])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-600">正在跳转到编辑器...</div>
    </div>
  )
}
