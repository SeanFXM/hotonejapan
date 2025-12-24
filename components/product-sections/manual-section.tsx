"use client"

import { ManualModule } from "@/types/product-config"

interface ManualSectionProps {
  config: ManualModule
}

export function ManualSection({ config }: ManualSectionProps) {
  // Manual模块不渲染任何section内容，只处理导航栏下载功能
  // 这个组件实际上不会被使用，因为manual模块不渲染section
  // 但为了类型完整性，我们保留这个组件
  return null
}

