"use client"

import { ProductInfo } from "@/types/product-config"
import { MediaUploadField } from "../media-upload-field"

interface ProductInfoEditorProps {
  product: ProductInfo
  onChange: (product: ProductInfo) => void
  brands: string[]
}

export function ProductInfoEditor({
  product,
  onChange,
  brands,
}: ProductInfoEditorProps) {
  const updateField = (field: keyof ProductInfo, value: any) => {
    onChange({
      ...product,
      [field]: value,
    })
  }

  const updateFloatingInfo = (field: keyof ProductInfo["floatingInfo"], value: any) => {
    onChange({
      ...product,
      floatingInfo: {
        ...product.floatingInfo,
        [field]: value,
      },
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            产品名称 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="例如：iD24"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slug <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={product.slug}
            onChange={(e) => {
              const slug = e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "")
              updateField("slug", slug)
              // 当slug改变时，如果brand已设置，更新heroImage路径
              if (slug && product.brand) {
                updateField(
                  "heroImage",
                  `/images/brands/${product.brand}/products/${slug}/hero.jpg`
                )
              }
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            placeholder="例如：id24"
          />
          <p className="mt-1 text-xs text-gray-500">
            只能包含小写字母、数字、下划线和连字符
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            品牌 <span className="text-red-500">*</span>
          </label>
          <select
            value={product.brand}
            onChange={(e) => {
              updateField("brand", e.target.value)
              // 当brand改变时，如果slug已设置，更新heroImage路径
              if (e.target.value && product.slug) {
                updateField(
                  "heroImage",
                  `/images/brands/${e.target.value}/products/${product.slug}/hero.jpg`
                )
              }
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">请选择品牌</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <MediaUploadField
          label="Hero图片"
          value={product.heroImage}
          onChange={(value) => updateField("heroImage", typeof value === "string" ? value : value.src)}
        />
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">浮动信息框</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={product.floatingInfo.enabled}
              onChange={(e) => updateFloatingInfo("enabled", e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">启用浮动信息框</span>
          </label>

          {product.floatingInfo.enabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  产品名
                </label>
                <input
                  type="text"
                  value={product.floatingInfo.productName}
                  onChange={(e) => updateFloatingInfo("productName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  类别
                </label>
                <input
                  type="text"
                  value={product.floatingInfo.category}
                  onChange={(e) => updateFloatingInfo("category", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  价格
                </label>
                <input
                  type="text"
                  value={product.floatingInfo.price}
                  onChange={(e) => updateFloatingInfo("price", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  参考价格
                </label>
                <input
                  type="text"
                  value={product.floatingInfo.referencePrice}
                  onChange={(e) => updateFloatingInfo("referencePrice", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  JAN码
                </label>
                <input
                  type="text"
                  value={product.floatingInfo.jan}
                  onChange={(e) => updateFloatingInfo("jan", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

