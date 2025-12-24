// 主页配置类型定义

// 内容项：支持文章、图片、视频、链接
export interface HomeContentItem {
  id: string
  type: "text" | "image" | "video" | "mixed" | "link"
  title?: string
  content?: string // 文章内容（支持HTML）
  image?: string // 图片路径
  video?: string // 视频路径（本地或YouTube URL）
  link?: string // 链接URL（当type为link时使用）
  linkText?: string // 链接显示文字（当type为link时使用）
  brand?: string // 品牌标签
  date?: string // 日期
  createdAt: string // ISO 8601 格式时间戳
  updatedAt?: string
}

// 主页配置
export interface HomeConfig {
  newProducts: { items: HomeContentItem[] } // 新製品情報
  supportInfo: { items: HomeContentItem[] } // サポート情報
  announcements: { items: HomeContentItem[] } // お知らせ
  updatedAt: string
}

