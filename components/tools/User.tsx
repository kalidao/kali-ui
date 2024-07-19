import { truncateAddress } from '@utils/truncateAddress'
import { useEnsName } from 'wagmi'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@utils/fetcher'
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@components/ui/hover-card'
import { Avatar, AvatarImage, AvatarFallback } from '@components/ui/avatar'
import { User as UserIcon } from 'lucide-react'
import Link from 'next/link'

export const User = ({ address }: { address: string }) => {
  const { data: ensName } = useEnsName({
    address: address as `0x${string}`,
    chainId: 1,
  })
  const { data: profile } = useQuery(['userProfile', address], () => fetcher(`/api/users/${address}`))

  const displayName = profile?.handle || ensName || truncateAddress(address)

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link href={`/users/${address}`} className="flex items-center space-x-2">
          <Avatar className="w-9 h-9">
            <AvatarImage src={profile?.picture} alt={`${address} picture`} />
            <AvatarFallback>{address.slice(2, 4)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{displayName}</span>
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex space-x-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={profile?.picture} alt="User profile picture" />
            <AvatarFallback>
              <UserIcon className="w-6 h-6" />
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{displayName}</h4>
            {profile?.bio && <p className="text-sm text-muted-foreground">{profile.bio}</p>}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
