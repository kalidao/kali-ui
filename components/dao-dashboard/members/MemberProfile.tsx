import { Card, CardContent } from '@components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { Badge } from '@components/ui/badge'
import { FileText, Sparkles, Coins, Diamond } from 'lucide-react'
import { Member } from './types'
import { fetcher } from '@utils/fetcher'
import { useQuery } from '@tanstack/react-query'
import getExplorerLink, { ExplorerType } from '@utils/getExplorerLink'
import { truncateAddress } from '@utils/truncateAddress'
import { useEnsName } from 'wagmi'
import { useParams } from 'next/navigation'

type ProfileProps = {
  member: Member
  proposals: any
  votes: string
  totalSupply: number
}

export default function MemberProfile({ member, proposals, votes, totalSupply }: ProfileProps) {
  const params = useParams<{ chainId: string }>()
  const { chainId } = params ? params : { chainId: '1' }
  const { data: ensName } = useEnsName({
    address: member?.address as `0xstring`,
  })
  const { data: profile } = useQuery(['userProfile', member], () => fetcher(`/api/users/${member?.address}`))

  return (
    <div className="flex w-full flex-wrap gap-1">
      {member && profile && (
        <MemberCard
          title={
            profile?.handle ? (
              <div className="flex flex-col items-center justify-center space-y-1">
                <h2 className="text-xl font-bold">{profile?.name}</h2>
                <Badge variant="secondary">{profile?.handle}</Badge>
              </div>
            ) : (
              <p>{ensName ? ensName : truncateAddress(member?.address)}</p>
            )
          }
          icon={
            <Avatar>
              <AvatarImage src={profile?.picture} alt="Profile" />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>
          }
          info={
            <div className="space-y-2">
              <p>{profile?.bio}</p>
              <div className="flex">
                <a
                  href={getExplorerLink(Number(chainId), ExplorerType.ADDRESS, member?.address)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:text-blue-600"
                >
                  <Diamond className="w-5 h-5" />
                </a>
              </div>
            </div>
          }
        />
      )}
      <MemberCard title="Proposals" icon={<FileText className="w-6 h-6" />} info={proposals?.length} />
      <MemberCard title="Votes" icon={<Sparkles className="w-6 h-6" />} info={votes?.length} />
      <MemberCard
        title="Owns"
        icon={<Coins className="w-6 h-6" />}
        info={`${((Number(member?.shares) / totalSupply) * 100).toFixed(2)}%`}
      />
    </div>
  )
}

type CardProps = {
  title: React.ReactNode
  icon: React.ReactNode
  info: React.ReactNode
}

const MemberCard = ({ title, icon, info }: CardProps) => {
  return (
    <Card className="min-h-[11rem] min-w-[11rem]  flex items-center justify-center">
      <CardContent className="flex flex-col items-center justify-center space-y-2 p-6">
        <div className="text-foreground">{icon}</div>
        <h3 className="text-xl">{title}</h3>
        <p className="text-xl">{info}</p>
      </CardContent>
    </Card>
  )
}
