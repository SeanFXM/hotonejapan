"use client"

import { Check } from "lucide-react"

interface ModuleDefinition {
  id: string
  label: string
  hasConfig: boolean
}

interface SidebarProps {
  modules: ModuleDefinition[]
  enabledModules: Set<string>
  activeModule: string | null
  onModuleToggle: (moduleId: string) => void
  onModuleSelect: (moduleId: string) => void
}

export function Sidebar({
  modules,
  enabledModules,
  activeModule,
  onModuleToggle,
  onModuleSelect,
}: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">模块列表</h2>
        <div className="space-y-1">
          {modules.map((module) => {
            const isEnabled = enabledModules.has(module.id)
            const isActive = activeModule === module.id

            return (
              <div
                key={module.id}
                className={`group flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                  isActive
                    ? "bg-blue-50 border border-blue-200"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => onModuleSelect(module.id)}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onModuleToggle(module.id)
                  }}
                  className={`flex-shrink-0 w-5 h-5 border-2 rounded flex items-center justify-center transition-colors ${
                    isEnabled
                      ? "bg-blue-600 border-blue-600"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {isEnabled && <Check className="w-3 h-3 text-white" />}
                </button>
                <span
                  className={`flex-1 text-sm ${
                    isActive ? "font-medium text-blue-900" : "text-gray-700"
                  } ${!isEnabled ? "opacity-50" : ""}`}
                >
                  {module.label}
                </span>
                {isEnabled && (
                  <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

