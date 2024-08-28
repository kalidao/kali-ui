import React from 'react'
import { Button } from '@components/ui/button'
import { Link } from 'lucide-react'
import { copy, truncateAddress } from '../../../utils'
import { useEnsName } from 'wagmi'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { useToast } from '@components/ui/use-toast'

type InfoBarProps = {
  proposer: string
}

export default function InfoBar({ proposer }: InfoBarProps) {
  const pathname = usePathname()
  const { toast } = useToast()
  const {
    data: ensName,
    isLoading,
    isFetched,
    isError,
  } = useEnsName({
    address: proposer as `0x${string}`,
    chainId: 1,
  })

  const share = () => {
    copy('https://app.kali.gg' + pathname)
    toast({
      title: 'Copied!',
      description: 'Share the proposal with DAO members.',
    })
  }

  return (
    <div className="flex items-center space-x-2">
      <NextLink href={`/users/${encodeURIComponent(proposer)}`} passHref>
        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
          {isLoading && truncateAddress(proposer)}
          {isError && truncateAddress(proposer)}
          {ensName === null && truncateAddress(proposer)}
          {isFetched && ensName}
        </span>
      </NextLink>
      <Button variant="ghost" size="icon" onClick={share} className="rounded-full">
        <Link className="h-4 w-4" />
      </Button>
    </div>
  )
}
