import React from 'react'
import { Button, IconArrowLeft } from '@kalidao/reality'

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export default function Back({ onClick }: Props) {
  return (
    <Button prefix={<IconArrowLeft />} variant="transparent" onClick={onClick} size="small">
      Back
    </Button>
  )
}
