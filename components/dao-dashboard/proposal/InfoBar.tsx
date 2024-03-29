import React, { useState } from 'react'
import { Stack, Tag, Button, IconLink } from '@kalidao/reality'
import { copy, truncateAddress } from '../../../utils'
import { useEnsName } from 'wagmi'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Toast from '@design/Toast'

type InfoBarProps = {
  proposer: string
}

export default function InfoBar({ proposer }: InfoBarProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const {
    data: ensName,
    isLoading,
    isFetched,
    isError,
  } = useEnsName({
    address: proposer as `0xstring`,
    chainId: 1,
  })

  const share = () => {
    copy('https://app.kali.gg' + router.asPath)
    setOpen(true)
  }

  return (
    <Stack direction={'horizontal'} align="center">
      <Link href={`/users/${encodeURIComponent(proposer)}`} passHref>
        <Tag>
          {/* TODO: Make this something else. Adding fallbacks for now umm */}
          {isLoading && truncateAddress(proposer)}
          {isError && truncateAddress(proposer)}
          {ensName === null && truncateAddress(proposer)}
          {isFetched && ensName}
        </Tag>
      </Link>
      <Button shape="circle" variant="transparent" onClick={share} size="small">
        <IconLink />
      </Button>
      <Toast
        open={open}
        setOpen={setOpen}
        title={'Copied!'}
        description={'Share the proposal with DAO members.'}
        action={
          <Button tone="red" size="small">
            Close
          </Button>
        }
      />
    </Stack>
  )
}
