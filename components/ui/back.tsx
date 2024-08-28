import React from 'react'
import { Button } from '@components/ui/button'
import { ArrowLeftIcon } from 'lucide-react'

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export function Back({ onClick }: Props) {
  return (
    <Button variant="ghost" className="w-fit" onClick={onClick} size="sm">
      <ArrowLeftIcon className="text-foreground" />
      Back
    </Button>
  )
}
