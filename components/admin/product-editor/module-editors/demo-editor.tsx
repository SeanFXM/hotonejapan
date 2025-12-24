"use client"

import { Plus, Trash2 } from "lucide-react"
import { DemoModule } from "@/types/product-config"

interface DemoEditorProps {
  demo: DemoModule
  onChange: (demo: DemoModule) => void
}

export function DemoEditor({ demo, onChange }: DemoEditorProps) {
  const addVideo = () => {
    onChange({
      ...demo,
      videos: [...(demo.videos || []), ""],
    })
  }

  const updateVideo = (index: number, url: string) => {
    const videos = [...(demo.videos || [])]
    videos[index] = url
    onChange({
      ...demo,
      videos,
    })
  }

  const removeVideo = (index: number) => {
    const videos = (demo.videos || []).filter((_, i) => i !== index)
    onChange({
      ...demo,
      videos,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={demo.enabled}
            onChange={(e) =>
              onChange({
                ...demo,
                enabled: e.target.checked,
              })
            }
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">启用Demo模块</span>
        </label>
      </div>

      {demo.enabled && (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">视频列表</h3>
            <button
              type="button"
              onClick={addVideo}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              添加视频
            </button>
          </div>

          <div className="space-y-4">
            {(demo.videos || []).map((video, index) => (
              <div key={index} className="p-4 border border-gray-300 rounded-lg bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">视频 {index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeVideo(index)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  value={video}
                  onChange={(e) => updateVideo(index, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="YouTube URL 或本地视频路径"
                />
                {video && (
                  <div className="mt-2">
                    {video.includes("youtube.com") || video.includes("youtu.be") ? (
                      <div className="max-w-md border border-gray-200 rounded overflow-hidden">
                        <iframe
                          width="100%"
                          height="200"
                          src={
                            video.includes("youtu.be/")
                              ? `https://www.youtube.com/embed/${video.split("youtu.be/")[1].split("?")[0]}`
                              : video.includes("watch?v=")
                              ? `https://www.youtube.com/embed/${video.split("v=")[1].split("&")[0]}`
                              : video
                          }
                          title="Video preview"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full"
                        />
                      </div>
                    ) : (
                      <video
                        src={video}
                        className="max-w-md max-h-48 border border-gray-200 rounded"
                        controls
                      />
                    )}
                  </div>
                )}
              </div>
            ))}

            {(!demo.videos || demo.videos.length === 0) && (
              <div className="text-center py-8 text-gray-500 text-sm border-2 border-dashed border-gray-300 rounded-lg">
                暂无视频，点击"添加视频"按钮添加
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

