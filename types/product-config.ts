// 产品页面配置类型定义
// 基于16个模块的实际实现

// 文本格式说明：
// 所有文本字段（description, content, question, answer等）支持富文本格式
// 格式标记语法：Markdown + 自定义标记
// - **文本** : 粗体
// - <size:small|normal|large|h1|h2|h3>文本</size> : 字体大小
// - <color:#FF0000>文本</color> : 文字颜色

// 媒体类型：支持图片或视频
export interface MediaItem {
  type: "image" | "video"
  src: string
  alt?: string
  // 背景是否透明（和模版背景一致）
  transparentBackground?: boolean
  // 是否把视频当作动图使用（自动循环播放，无法暂停）
  asAnimatedGif?: boolean
}

// Hero Section 配置
export interface FloatingInfo {
  enabled: boolean
  productName: string
  category: string
  price: string
  referencePrice: string
  jan: string
}

export interface HeroConfig {
  heroImage: string
  floatingInfo: FloatingInfo
}

// Intro Section 配置（可选，无导航栏）
export interface RelatedLink {
  text: string
  url: string
  icon?: string
}

export interface IntroModule {
  enabled: boolean
  title?: string
  subtitle?: string
  video?: string // 支持图片路径、视频路径或YouTube URL
  image?: string // 图片路径（如果video字段用于视频，image用于图片）
  media?: MediaItem // 或者使用MediaItem统一处理图片和视频
  description?: string
  features?: string[]
  relatedLinks?: RelatedLink[]
}

// Concept Section 配置
export interface ConceptSection {
  media: MediaItem
  imagePosition: "left" | "right"
  title?: string
  subtitle?: string
  content: string
}

export interface ConceptModule {
  enabled: boolean
  sections: ConceptSection[]
}

// Lineup Section 配置
export interface LineupProduct {
  name: string
  image: string
  specs: {
    [key: string]: string
  }
}

export interface LineupModule {
  enabled: boolean
  products: LineupProduct[]
}

// Comparison Section 配置
export interface ComparisonModule {
  enabled: boolean
  image: string
  alt?: string
}

// Demo Section 配置
export interface DemoModule {
  enabled: boolean
  videos: string[]
  layout?: "grid" | "list"
  columns?: number
}

// Samples Section 配置
export interface SampleItem {
  name: string
  preset: string
  audioUrl: string
  description?: string
}

export interface SamplesModule {
  enabled: boolean
  samples: SampleItem[]
}

// Usage Section 配置
export interface UsageExample {
  number: string
  title: string
  image: string
  alt?: string
}

export interface UsageModule {
  enabled: boolean
  examples: UsageExample[]
}

// Function Section 配置
export interface FunctionItem {
  number: string
  image: string
  title: string
  subtitle?: string
  description: string
  alt?: string
}

export interface FunctionModule {
  enabled: boolean
  items: FunctionItem[]
}

// Controls Section 配置
export interface ControlsModule {
  enabled: boolean
  images: string[]
}

// Block Diagram Section 配置
export interface BlockDiagramModule {
  enabled: boolean
  image: string
  alt?: string
}

// Connections Section 配置
export interface ConnectionExample {
  title: string
  image: string
  description?: string
  alt?: string
}

export interface ConnectionsModule {
  enabled: boolean
  examples: ConnectionExample[]
}

// Operation Section 配置
export interface OperationItem {
  media: MediaItem
  imagePosition: "left" | "right"
  title?: string
  content: string
}

export interface OperationModule {
  enabled: boolean
  items: OperationItem[]
}

// Software Section 配置（参考ampero-ii，无顶部自动播放视频）
export interface SoftwareItem {
  title: string
  isNew?: boolean
  icon?: string
  content?: string
  image?: string
  features?: string[]
  improvements?: string[]
  downloadUrl?: string
  downloadText?: string
  notice?: string
  linkText?: string
  linkUrl?: string
}

export interface SoftwareModule {
  enabled: boolean
  headerImage?: string
  items: SoftwareItem[]
}

// Handlesoft/Bundle Section 配置（固定内容，直接复制oria的实现）
export interface HandlesoftModule {
  enabled: boolean
  // 无需其他配置，内容完全固定
}

// FAQ Section 配置
export interface FAQItem {
  number: string
  question: string
  answer: string
  images?: string[]
}

export interface FAQModule {
  enabled: boolean
  items: FAQItem[]
}

// Manual Section 配置（只需要导航栏下载功能）
export interface ManualModule {
  enabled: boolean
  downloadUrl?: string
  // 不渲染section内容，只处理导航栏下载
}

// Specs Section 配置
export interface SpecGroup {
  title: string
  items: {
    [key: string]: string
  }
}

export interface SpecsModule {
  enabled: boolean
  leftColumn: SpecGroup[]
  rightColumn: SpecGroup[]
}

// 导航项配置
export interface NavigationItem {
  id: string
  label: string
  enabled: boolean
  isDownload?: boolean
}

// 产品基本信息
export interface ProductInfo {
  name: string
  slug: string
  brand: string
  heroImage: string
  introVideo?: string
  introText?: string
  features?: string[]
  floatingInfo: FloatingInfo
}

// 主配置接口
export interface ProductConfig {
  product: ProductInfo
  intro?: IntroModule
  navigation: NavigationItem[]
  modules: {
    concept?: ConceptModule
    lineup?: LineupModule
    comparison?: ComparisonModule
    demo?: DemoModule
    samples?: SamplesModule
    usage?: UsageModule
    function?: FunctionModule
    controls?: ControlsModule
    "block-diagram"?: BlockDiagramModule
    connections?: ConnectionsModule
    operation?: OperationModule
    software?: SoftwareModule
    handlesoft?: HandlesoftModule
    faq?: FAQModule
    manual?: ManualModule
    specs?: SpecsModule
  }
}

