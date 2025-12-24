"use client"

import { useRouter } from "next/navigation"
import { Package, Settings, FileText, Image as ImageIcon } from "lucide-react"

export default function AdminPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">产品页面管理系统</h1>
          <p className="text-lg text-gray-600">
            可视化创建和管理产品详情页面
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 产品管理 */}
          <button
            onClick={() => router.push("/admin/products")}
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow text-left group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">产品管理</h2>
            </div>
            <p className="text-gray-600">
              创建、编辑和管理所有产品页面。支持可视化配置和JSON编辑。
            </p>
          </button>

          {/* 快速创建 */}
          <button
            onClick={() => router.push("/admin/products/new")}
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow text-left group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">创建新产品</h2>
            </div>
            <p className="text-gray-600">
              通过简单的步骤创建新的产品页面，系统会自动生成配置和页面文件。
            </p>
          </button>

          {/* 主页配置 */}
          <button
            onClick={() => router.push("/admin/home")}
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow text-left group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <ImageIcon className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">主页配置</h2>
            </div>
            <p className="text-gray-600">
              管理主页的新製品情報、サポート情報、お知らせ标签页内容。
            </p>
          </button>

          {/* 博客管理 */}
          <button
            onClick={() => router.push("/admin/blog")}
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow text-left group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">博客管理</h2>
            </div>
            <p className="text-gray-600">
              创建和管理博客文章，支持富文本、图片、视频、访谈等多种内容类型。
            </p>
          </button>
        </div>

        {/* 功能说明 */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">主要功能</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">可视化配置</h3>
                <p className="text-sm text-gray-600">
                  通过表单填写产品信息，无需手动编辑JSON
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">模块选择</h3>
                <p className="text-sm text-gray-600">
                  选择需要的模块，系统自动生成对应的页面结构
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">实时预览</h3>
                <p className="text-sm text-gray-600">
                  生成后立即预览，支持在线编辑配置
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 使用提示 */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">💡 使用提示</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 创建新产品时，系统会自动创建必要的目录结构</li>
            <li>• 图片需要手动上传到 <code className="bg-blue-100 px-1 rounded">public/images/brands/</code> 目录</li>
            <li>• 生成后可以在编辑页面直接修改JSON配置</li>
            <li>• 所有配置都会自动保存，页面会实时更新</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

