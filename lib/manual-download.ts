/**
 * 通用的 manual 下载函数
 * @param brand 品牌名称
 * @param productSlug 产品 slug
 */
export async function downloadManual(brand: string, productSlug: string) {
  const { getManualPath, getManualFileName } = await import('./manual-mapping')
  
  const manualPath = getManualPath(brand, productSlug)
  const manualFileName = getManualFileName(brand, productSlug)
  
  if (!manualPath || !manualFileName) {
    console.error('Manual not found for:', brand, productSlug)
    alert('说明书文件不存在')
    return
  }
  
  try {
    console.log('Starting download:', { manualPath, manualFileName })
    const response = await fetch(manualPath)
    
    console.log('Response status:', response.status, response.statusText)
    console.log('Response headers:', Object.fromEntries(response.headers.entries()))
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Download failed:', {
        status: response.status,
        statusText: response.statusText,
        errorText,
        url: manualPath
      })
      alert(`下载失败 (${response.status}): ${errorText || '请稍后重试'}`)
      return
    }
    
    // 检查响应类型
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/pdf')) {
      const text = await response.text()
      console.error('Unexpected content type:', contentType, text)
      alert('下载失败：服务器返回了非 PDF 文件')
      return
    }
    
    const blob = await response.blob()
    console.log('Blob created:', blob.size, 'bytes')
    
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = manualFileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
    console.log('Download completed successfully')
  } catch (error) {
    console.error('Download error:', error)
    alert(`下载失败: ${error instanceof Error ? error.message : '未知错误'}`)
  }
}

