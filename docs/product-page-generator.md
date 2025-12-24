# 产品页面生成系统使用指南

## 快速开始

### 1. 安装依赖

首先确保安装了必要的依赖：

```bash
npm install
```

如果 `tsx` 未安装，系统会自动提示，或者手动安装：

```bash
npm install --save-dev tsx
```

### 2. 准备配置文件

有两种方式准备配置文件：

#### 方式A：使用模板（推荐）

1. 复制配置模板：
```bash
cp templates/product.config.json.example my-product.config.json
```

2. 编辑 `my-product.config.json`，填写产品信息：
   - 修改 `product` 部分的产品名称、slug、品牌等
   - 修改 `heroImage` 路径
   - 配置 `floatingInfo`（悬浮产品信息窗）
   - 根据需要启用/禁用模块
   - 填写各模块的具体内容

#### 方式B：交互式生成

直接运行生成命令，系统会引导你完成配置。

### 3. 准备图片资源

将产品图片上传到对应目录：

```
public/images/brands/{brand}/{slug}/
```

例如，对于 `audient` 品牌的 `id24` 产品：
```
public/images/brands/audient/id24/
  - hero.jpg
  - concept_01.jpg
  - function_01.jpg
  - ...
```

### 4. 生成产品页面

运行生成命令：

```bash
npm run generate:product
```

系统会引导你：
1. 选择品牌（或输入新品牌）
2. 选择产品（或输入新产品slug）
3. 选择配置文件路径（或使用模板）

或者直接指定参数：

```bash
npm run generate:product -- --brand audient --slug id24 --config my-product.config.json
```

### 5. 验证配置文件（可选）

在生成前验证配置文件：

```bash
npm run validate:config my-product.config.json
```

## 详细配置说明

### 产品基本信息 (`product`)

```json
{
  "product": {
    "name": "产品名称",
    "slug": "product-slug",  // URL中的产品标识
    "brand": "audient",       // 品牌名称
    "heroImage": "/images/brands/audient/product-slug/hero.jpg",
    "floatingInfo": {
      "enabled": true,
      "productName": "产品名",
      "category": "产品类别",
      "price": "价格",
      "referencePrice": "参考价格",
      "jan": "JAN码"
    }
  }
}
```

### Intro模块（可选）

Intro模块显示在Hero之后，导航栏之前，**没有导航栏项**。

```json
{
  "intro": {
    "enabled": true,
    "title": "10in / 14out",
    "subtitle": "USB オーディオ・インターフェイス",
    "video": "https://youtu.be/xxx",
    "description": "产品描述",
    "features": ["特性1", "特性2"],
    "relatedLinks": [
      {"text": "链接文本", "url": "#"}
    ]
  }
}
```

### 导航栏配置 (`navigation`)

```json
{
  "navigation": [
    {
      "id": "concept",
      "label": "コンセプト",
      "enabled": true
    },
    {
      "id": "manual",
      "label": "取扱説明書",
      "enabled": true,
      "isDownload": true  // manual模块只显示下载按钮
    }
  ]
}
```

**注意**：
- `intro` 模块不会出现在导航栏中
- `manual` 模块只显示下载按钮，不渲染section内容

### 模块配置

#### Concept模块（コンセプト）

支持图片或视频，左侧图片右侧文字布局：

```json
{
  "concept": {
    "enabled": true,
    "sections": [
      {
        "media": {
          "type": "image",  // 或 "video"
          "src": "/images/brands/audient/product-slug/concept_01.jpg",
          "alt": "图片描述"
        },
        "imagePosition": "left",  // 或 "right"
        "title": "标题",
        "subtitle": "副标题",
        "content": "内容文本"
      }
    ]
  }
}
```

#### Demo模块（デモムービー）

视频网格布局：

```json
{
  "demo": {
    "enabled": true,
    "videos": [
      "https://youtu.be/xxx",
      "https://youtu.be/yyy"
    ],
    "columns": 2  // 可选，默认2列
  }
}
```

#### Function模块（主な性能）

功能卡片网格：

```json
{
  "function": {
    "enabled": true,
    "items": [
      {
        "number": "①",
        "image": "/images/brands/audient/product-slug/function_01.jpg",
        "title": "功能标题",
        "subtitle": "功能副标题",
        "description": "功能描述"
      }
    ]
  }
}
```

#### Software模块（ソフトウェア）

参考ampero-ii的实现，**无顶部自动播放视频**：

```json
{
  "software": {
    "enabled": true,
    "headerImage": "/images/brands/audient/product-slug/software_01.png",
    "items": [
      {
        "title": "Firmware 1.2.0",
        "isNew": true,
        "content": "更新内容",
        "features": ["新機能1", "新機能2"],
        "downloadUrl": "https://example.com/download"
      }
    ]
  }
}
```

#### Handlesoft模块（バンドルソフト）

**固定内容**，直接复制oria的实现，只需启用/禁用：

```json
{
  "handlesoft": {
    "enabled": true
  }
}
```

图片路径固定使用：`/images/brands/audient/Oria/handlesoft_*.{ext}`

#### Manual模块（取扱説明書）

**只处理导航栏下载功能**，不渲染section内容：

```json
{
  "manual": {
    "enabled": true,
    "downloadUrl": "https://example.com/manual.pdf"
  }
}
```

#### FAQ模块（よくある質問）

2列可折叠问答：

```json
{
  "faq": {
    "enabled": true,
    "items": [
      {
        "number": "①",
        "question": "よくある質問",
        "answer": "回答内容",
        "images": ["/images/brands/audient/product-slug/faq_01.png"]
      }
    ]
  }
}
```

#### Specs模块（製品仕様）

2列规格表：

```json
{
  "specs": {
    "enabled": true,
    "leftColumn": [
      {
        "title": "マイク・プリアンプ",
        "items": {
          "マイクゲインレンジ": "0 to 60dB",
          "ラインゲインレンジ": "-10 to 50dB"
        }
      }
    ],
    "rightColumn": [
      {
        "title": "ヘッドホン出力",
        "items": {
          "最大出力レベル": "+14dBu",
          "出力インピーダンス": "<50Ω"
        }
      }
    ]
  }
}
```

## 完整示例

### 示例1：创建新产品页面

```bash
# 1. 复制模板
cp templates/product.config.json.example id24.config.json

# 2. 编辑配置文件（使用你喜欢的编辑器）
# 修改产品信息、图片路径等

# 3. 准备图片
# 将图片上传到 public/images/brands/audient/id24/

# 4. 生成页面
npm run generate:product -- --brand audient --slug id24 --config id24.config.json
```

### 示例2：交互式生成

```bash
npm run generate:product
```

系统会逐步引导：
1. 显示可用品牌列表，选择品牌
2. 显示该品牌的产品列表，选择产品或输入新名称
3. 选择配置文件路径

### 示例3：验证配置

```bash
npm run validate:config id24.config.json
```

## 路径规则

### 图片路径

所有图片路径必须遵循以下格式：

```
/images/brands/{brand}/{slug}/{filename}
```

例如：
- `/images/brands/audient/id24/hero.jpg`
- `/images/brands/audient/id24/concept_01.jpg`

**例外**：handlesoft模块使用固定路径：
- `/images/brands/audient/Oria/handlesoft_*.{ext}`

### 视频URL

支持以下YouTube URL格式：
- `https://youtu.be/xxx`
- `https://www.youtube.com/watch?v=xxx`
- `https://www.youtube.com/embed/xxx`

## 常见问题

### Q: 如何只启用部分模块？

A: 在配置文件中，将不需要的模块设置为 `"enabled": false`，或直接从 `navigation` 数组中移除。

### Q: Intro模块为什么不在导航栏中？

A: 这是设计特性。Intro模块显示在Hero之后、导航栏之前，用于产品介绍，不需要导航项。

### Q: Manual模块为什么不显示内容？

A: Manual模块只提供导航栏的下载按钮功能，不渲染section内容。这是设计特性。

### Q: 图片路径验证失败怎么办？

A: 系统会显示警告但继续生成。确保图片已上传到正确的 `public/images/brands/{brand}/{slug}/` 目录。

### Q: 如何修改已生成的页面？

A: 直接编辑生成的 `app/brands/{brand}/products/{slug}/page.tsx` 文件，或修改 `product.config.json` 后重新生成。

## 最佳实践

1. **先验证再生成**：使用 `validate:config` 命令先验证配置文件
2. **使用模板**：从模板开始，逐步修改
3. **图片命名规范**：使用有意义的文件名，如 `concept_01.jpg`, `function_01.jpg`
4. **版本控制**：将配置文件纳入版本控制，方便管理
5. **测试预览**：生成后使用 `npm run dev` 本地预览页面

## 故障排除

### 错误：配置文件不存在

**解决**：检查配置文件路径是否正确，或使用模板文件。

### 错误：品牌目录不存在

**解决**：系统会自动创建目录，或手动创建 `app/brands/{brand}/` 目录。

### 错误：图片路径不存在

**解决**：这是警告，不影响生成。确保图片已上传到 `public/images/brands/{brand}/{slug}/` 目录。

### 错误：JSON格式错误

**解决**：使用JSON验证工具检查格式，确保所有引号、逗号正确。

## 下一步

生成页面后：
1. 运行 `npm run dev` 启动开发服务器
2. 访问 `/brands/{brand}/products/{slug}` 查看页面
3. 根据需要调整配置和样式

