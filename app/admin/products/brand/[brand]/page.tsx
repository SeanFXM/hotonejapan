"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Edit, Eye, FileText, Image as ImageIcon } from "lucide-react"

interface Product {
  brand: string
  slug: string
  name: string
  configPath?: string
  hasConfig: boolean
  hasPage: boolean
  pagePath: string
  link?: string
  description?: string
  category?: string
}

export default function BrandProductsPage() {
  const router = useRouter()
  const params = useParams()
  const brand = params.brand as string

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [brandName, setBrandName] = useState(brand)

  useEffect(() => {
    if (brand) {
      loadProducts()
    }
  }, [brand])

  const loadProducts = async () => {
    try {
      const response = await fetch(`/api/admin/products?brand=${brand}`)
      if (response.ok) {
        const data = await response.json()
        // API已经按时间排序，直接使用
        setProducts(data.products || [])
        if (data.products && data.products.length > 0) {
          setBrandName(data.products[0].brand)
        }
      }
    } catch (error) {
      console.error("加载产品失败:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (product: Product) => {
    if (product.hasConfig) {
      router.push(`/admin/products/edit?brand=${product.brand}&slug=${product.slug}`)
    } else {
      alert("此产品使用旧版页面，无法通过管理系统编辑。如需迁移到新系统，请创建新的产品页面。")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">加载中...</div>
      </div>
    )
  }

  const newSystemCount = products.filter((p) => p.hasConfig).length
  const oldSystemCount = products.filter((p) => p.hasPage && !p.hasConfig).length
  const noPageCount = products.filter((p) => !p.hasPage).length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/admin/products")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            返回品牌列表
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{brandName.toUpperCase()}</h1>
              <p className="mt-2 text-gray-600">产品列表</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">总产品数</div>
            <div className="text-3xl font-bold text-gray-900">{products.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">新系统</div>
            <div className="text-3xl font-bold text-green-600">{newSystemCount}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">旧系统</div>
            <div className="text-3xl font-bold text-gray-600">{oldSystemCount}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">未制作</div>
            <div className="text-3xl font-bold text-orange-600">{noPageCount}</div>
          </div>
        </div>

        {/* Products List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">产品列表</h2>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>新系统</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span>旧系统</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>未制作</span>
              </div>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {products.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">该品牌下还没有产品页面</p>
              </div>
            ) : (
              products.map((product, index) => {
                // 确定边框颜色和标识
                let borderColor = "border-gray-300"
                let bgColor = "bg-gray-100"
                let iconColor = "text-gray-600"
                let statusBadge = null

                if (product.hasConfig) {
                  borderColor = "border-green-500"
                  bgColor = "bg-green-100"
                  iconColor = "text-green-600"
                  statusBadge = (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                      新系统
                    </span>
                  )
                } else if (product.hasPage) {
                  borderColor = "border-gray-300"
                  bgColor = "bg-gray-100"
                  iconColor = "text-gray-600"
                  statusBadge = (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                      旧系统
                    </span>
                  )
                } else {
                  borderColor = "border-orange-500"
                  bgColor = "bg-orange-100"
                  iconColor = "text-orange-600"
                  statusBadge = (
                    <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-medium rounded">
                      未制作
                    </span>
                  )
                }

                return (
                  <div
                    key={index}
                    className={`px-6 py-4 hover:bg-gray-50 transition-colors border-l-4 ${borderColor}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${bgColor}`}>
                          <ImageIcon className={`w-6 h-6 ${iconColor}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900">{product.name}</h3>
                            {statusBadge}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {product.slug}
                          </p>
                          {product.description && (
                            <p className="text-xs text-gray-400 mt-1">
                              {product.description}
                            </p>
                          )}
                          {product.configPath && (
                            <p className="text-xs text-gray-400 mt-1">
                              {product.configPath}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {product.hasPage ? (
                          <a
                            href={product.pagePath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium px-3 py-1.5 rounded hover:bg-blue-50 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            预览
                          </a>
                        ) : (
                          <button
                            onClick={() => {
                              router.push(`/admin/products/new?brand=${product.brand}&slug=${product.slug}&name=${encodeURIComponent(product.name)}`)
                            }}
                            className="flex items-center gap-2 text-orange-600 hover:text-orange-700 text-sm font-medium px-3 py-1.5 rounded hover:bg-orange-50 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                            创建页面
                          </button>
                        )}
                        {product.hasConfig && (
                          <button
                            onClick={() => handleEdit(product)}
                            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                            编辑
                          </button>
                        )}
                        {product.hasPage && !product.hasConfig && (
                          <button
                            onClick={() => handleEdit(product)}
                            className="flex items-center gap-2 text-gray-500 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                            title="旧版页面无法通过管理系统编辑"
                          >
                            <Edit className="w-4 h-4" />
                            查看
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

