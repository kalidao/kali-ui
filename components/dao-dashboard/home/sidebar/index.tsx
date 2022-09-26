import React from 'react'
import { Button, IconSparkles, Stack } from '@kalidao/reality'
import About from './About'
import Entity from './Entity'
import { useRouter } from 'next/router'

type Props = {
  address: string
}
export default function Sidebar() {
  const router = useRouter()
  const { dao: address, chainId } = router.query

  return (
    <Stack>
      <About address={address as string} chainId={chainId as string} />
      {/*<Entity address={address as string} />*/}
      <Button
        prefix={<IconSparkles />}
        variant="secondary"
        onClick={() => router.push(`/daos/${chainId}/${address}/tribute`)}
      >
        Tribute
      </Button>
    </Stack>
  )
}
