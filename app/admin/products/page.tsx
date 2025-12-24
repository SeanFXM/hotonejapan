"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Plus, Folder, Package, Image as ImageIcon, ArrowLeft } from "lucide-react"

interface Brand {
  name: string
  productCount: number
  newSystemCount: number
  oldSystemCount: number
}

export default function ProductAdminPage() {
  const router = useRouter()
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBrands()
  }, [])

  const loadBrands = async () => {
    try {
      const response = await fetch("/api/admin/brands-with-products")
      if (response.ok) {
        const data = await response.json()
        setBrands(data.brands || [])
      }
    } catch (error) {
      console.error("加载品牌失败:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateNew = () => {
    router.push("/admin/products/new")
  }

  const handleBrandClick = (brandName: string) => {
    router.push(`/admin/products/brand/${brandName}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">加载中...</div>
      </div>
    )
  }

  const totalProducts = brands.reduce((sum, brand) => sum + brand.productCount, 0)
  const totalNewSystem = brands.reduce((sum, brand) => sum + brand.newSystemCount, 0)
  const totalOldSystem = brands.reduce((sum, brand) => sum + brand.oldSystemCount, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/admin")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            返回管理首页
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">产品页面管理</h1>
              <p className="mt-2 text-gray-600">按品牌管理产品详情页面</p>
            </div>
            <button
              onClick={handleCreateNew}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              创建新产品页面
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">总品牌数</div>
            <div className="text-3xl font-bold text-gray-900">{brands.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">总产品数</div>
            <div className="text-3xl font-bold text-gray-900">{totalProducts}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">新系统</div>
            <div className="text-3xl font-bold text-green-600">{totalNewSystem}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">旧系统</div>
            <div className="text-3xl font-bold text-gray-600">{totalOldSystem}</div>
          </div>
        </div>

        {/* Brands List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">品牌列表</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {brands.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <Folder className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">还没有品牌</p>
                <button
                  onClick={handleCreateNew}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  创建第一个产品页面 →
                </button>
              </div>
            ) : (
              brands.map((brand, index) => (
                <div
                  key={index}
                  className="w-full px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-200 last:border-0"
                >
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleBrandClick(brand.name)}
                      className="flex items-center gap-4 flex-1 text-left"
                    >
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Folder className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{brand.name.toUpperCase()}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          共 {brand.productCount} 个产品
                        </p>
                      </div>
                    </button>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-3 text-sm">
                          {brand.newSystemCount > 0 && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                              新系统: {brand.newSystemCount}
                            </span>
                          )}
                          {brand.oldSystemCount > 0 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                              旧系统: {brand.oldSystemCount}
                            </span>
                          )}
                        </div>
                      </div>
                      <a
                        href={`/admin/brands/${brand.name}`}
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                        className="px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
                      >
                        配置内容
                      </a>
                      <div className="text-gray-400">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
