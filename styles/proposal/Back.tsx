import React from 'react'
import { Button } from '@components/ui/button'
import { ArrowLeftIcon } from 'lucide-react'
type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export default function Back({ onClick }: Props) {
  return (
    <Button variant="ghost" onClick={onClick} size="sm">
      <ArrowLeftIcon />
      Back
    </Button>
  )
}
