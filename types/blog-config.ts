// 博客配置类型定义

// 博客文章配置
export interface BlogPostConfig {
  id: number
  title: string
  excerpt: string
  image: string
  date: string
  dateSort: string // 用于排序的日期格式 YYYY-MM-DD
  categories: string[]
  content: string // 文章内容（支持Markdown和特殊标记，图片大小格式：[IMAGE:path|width:800]）
  tags: string[]
  youtubeId?: string // YouTube视频ID
  interview?: {
    question: string
    answer: string
  }[]
  // 特殊内容标记
  images?: string[] // 文章中的图片
  links?: {
    text: string
    url: string
  }[]
  createdAt: string
  updatedAt?: string
}

// 博客配置
export interface BlogConfig {
  posts: BlogPostConfig[] // 按时间倒序排列，最新的在前
  updatedAt: string
}

