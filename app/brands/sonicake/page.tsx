"use client"

import { useEffect } from "react"

export default function SonicakePage() {
  useEffect(() => {
    // 直接跳转到外部链接
    window.location.href = "https://hotmusic.jp/collections/sonicake"
  }, [])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-600 mb-4">SONICAKE の製品ページへリダイレクトしています...</p>
        <p className="text-sm text-gray-500">
          自動的にリダイレクトされない場合は、
          <a
            href="https://hotmusic.jp/collections/sonicake"
            className="text-blue-600 hover:text-blue-800 underline ml-1"
          >
            こちらをクリック
          </a>
        </p>
      </div>
    </div>
  )
}

