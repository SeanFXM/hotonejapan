// 品牌页面配置类型定义

// 内容项：支持文章、图片、视频、链接
export interface ContentItem {
  id: string
  type: "text" | "image" | "video" | "mixed" | "link" // mixed = 文字 + 图片/视频, link = 纯链接
  title?: string
  content?: string // 文章内容（支持HTML）
  image?: string // 图片路径
  video?: string // 视频路径（本地或YouTube URL）
  link?: string // 链接URL（当type为link时使用）
  linkText?: string // 链接显示文字（当type为link时使用）
  createdAt: string // ISO 8601 格式时间戳
  updatedAt?: string
}

// 标签页配置
export interface TabContent {
  items: ContentItem[] // 按时间倒序排列，最新的在前
}

// 品牌页面配置
export interface BrandConfig {
  brand: string
  news: TabContent // 新着順
  announcements: TabContent // お知らせ
  supportInfo: TabContent // サポート情報
  updatedAt: string
}

