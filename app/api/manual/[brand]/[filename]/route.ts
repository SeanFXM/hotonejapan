import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ brand: string; filename: string }> | { brand: string; filename: string } }
) {
  try {
    // 处理 Next.js 15+ 的 params 可能是 Promise 的情况
    const params = context.params instanceof Promise ? await context.params : context.params
    const { brand, filename } = params
    
    // 验证参数类型
    if (typeof brand !== 'string' || typeof filename !== 'string') {
      return new NextResponse(JSON.stringify({ error: 'Invalid parameters' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    // URL 解码文件名（处理特殊字符）
    let decodedFilename: string
    try {
      decodedFilename = decodeURIComponent(filename)
    } catch (e) {
      decodedFilename = filename
    }
    
    // 直接重定向到静态文件，而不是读取文件
    // 这样可以避免将文件打包到 Serverless Functions 中
    const staticFileUrl = `/manuals/${brand}/${encodeURIComponent(decodedFilename)}`
    
    // 返回重定向响应
    return NextResponse.redirect(new URL(staticFileUrl, request.url), {
      status: 302,
      headers: {
        'Content-Disposition': `attachment; filename="${decodedFilename}"`,
      },
    })
  } catch (error) {
    console.error('Error redirecting to manual file:', error)
    return new NextResponse(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

