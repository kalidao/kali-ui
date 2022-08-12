import React, { useState } from 'react'
import { Flex, Box } from '../../../styles/elements'
import { copy, truncateAddress } from './../../../utils/'
import { useEnsName } from 'wagmi'
import Link from 'next/link'
import { Share2Icon } from '@radix-ui/react-icons'
import { useRouter } from 'next/router'
import Toast from '../../../styles/Toast'

export default function InfoBar({ proposal }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const {
    data: ensName,
    isLoading,
    isFetched,
    isError,
  } = useEnsName({
    address: proposal && proposal['proposer'],
    chainId: 1,
  })

  const share = () => {
    copy('https://app.kali.gg' + router.asPath)
    setOpen(true)
  }

  return (
    <Flex
      css={{
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <Link href={`/users/${encodeURIComponent(proposal && proposal['proposer'])}`}>
        <Box variant="id">
          {/* TODO: Make this something else. Adding fallbacks for now umm */}
          {isLoading && truncateAddress(proposal['proposer'])}
          {isError && truncateAddress(proposal['proposer'])}
          {ensName === null && truncateAddress(proposal['proposer'])}
          {isFetched && ensName}
        </Box>
      </Link>
      <Box
        as="button"
        onClick={share}
        css={{
          all: 'unset',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '100%',
          height: '30px',
          width: '30px',
          '&:hover': {
            background: '$gray4',
          },
        }}
      >
        <Share2Icon />
      </Box>
      <Toast open={open} setOpen={setOpen} title={'Copied!'} description={'Share the proposal with DAO members.'} />
    </Flex>
  )
}
