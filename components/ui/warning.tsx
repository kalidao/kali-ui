import { AlertTriangle } from 'lucide-react'

export function Warning({ warning }: { warning?: string }) {
  if (!warning) return null

  return (
    <div className="flex items-center">
      <AlertTriangle className="h-4 w-4 text-yellow-500" />
      <span className="ml-2">{warning}</span>
    </div>
  )
}
