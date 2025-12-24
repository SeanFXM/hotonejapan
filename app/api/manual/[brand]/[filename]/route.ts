import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

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
      console.error('Invalid params:', { brand, filename, types: { brand: typeof brand, filename: typeof filename } })
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
      console.error('Failed to decode filename:', filename, e)
      decodedFilename = filename // 如果解码失败，使用原始文件名
    }
    
    // 获取当前工作目录
    const cwd = process.cwd()
    if (typeof cwd !== 'string' || !cwd) {
      console.error('process.cwd() is not a valid string:', cwd)
      return new NextResponse(JSON.stringify({ error: 'Invalid working directory' }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    // 构建文件路径 - 从 public/manuals 读取（静态文件，不包含在 Serverless Functions 中）
    const pathParts = [cwd, 'public', 'manuals', brand, decodedFilename].filter(p => typeof p === 'string')
    const filePath = join(...pathParts)
    
    console.log('Manual download request:', { 
      brand, 
      filename, 
      decodedFilename, 
      filePath, 
      cwd,
      pathParts,
      filePathType: typeof filePath
    })
    
    // 检查文件是否存在
    if (!existsSync(filePath)) {
      console.error(`File not found: ${filePath}`)
      // 列出目录中的文件以便调试
      const manualDir = join(process.cwd(), 'public', 'manuals', brand)
      if (existsSync(manualDir)) {
        const { readdirSync } = await import('fs/promises')
        const files = await readdirSync(manualDir)
        console.log('Available files in directory:', files.filter(f => f.includes('AMPERO')))
      }
      return new NextResponse(JSON.stringify({ 
        error: 'File not found', 
        filePath,
        brand,
        filename: decodedFilename
      }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    // 读取文件 - 确保 filePath 是字符串
    if (typeof filePath !== 'string') {
      console.error('filePath is not a string:', filePath, typeof filePath)
      return new NextResponse(JSON.stringify({ error: 'Invalid file path' }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    const fileBuffer = await readFile(filePath)
    
    // 设置响应头
    const headers = new Headers()
    headers.set('Content-Type', 'application/pdf')
    
    // 对文件名进行安全编码，避免特殊字符问题
    // 使用 ASCII 安全的文件名，或者使用 RFC 5987 编码
    const safeFilename = decodedFilename.replace(/[^\x20-\x7E]/g, '_') // 将非 ASCII 字符替换为下划线
    const encodedFilename = encodeURIComponent(decodedFilename)
    headers.set('Content-Disposition', `attachment; filename="${safeFilename}"; filename*=UTF-8''${encodedFilename}`)
    headers.set('Content-Length', String(fileBuffer.length))
    
    return new NextResponse(fileBuffer, {
      status: 200,
      headers,
    })
  } catch (error) {
    console.error('Error serving manual file:', error)
    return new NextResponse(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error instanceof Error ? error.stack : String(error)
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

