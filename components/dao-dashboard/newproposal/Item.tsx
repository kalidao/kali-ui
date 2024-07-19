import React from 'react'
import { Button } from '@components/ui/button'

type ItemProps = {
  onClick: () => void
  label: string
  icon: React.ReactNode
}

export const Item = ({ onClick, label, icon }: ItemProps) => {
  return (
    <Button
      variant="outline"
      className="flex flex-col items-center justify-center p-6 w-32 h-32 rounded-2xl border border-gray-300 transition-colors hover:bg-gray-100"
      onClick={onClick}
    >
      {icon}
      <span className="mt-2 text-sm">{label}</span>
    </Button>
  )
}
