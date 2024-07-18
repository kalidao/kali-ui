import { ethers } from 'ethers'
import { useEnsName } from 'wagmi'
import { truncateAddress } from '../../../utils'
import { Member } from './types'
import { Button } from '@components/ui/button'
import { Card, CardContent } from '@components/ui/card'
import { Loader2 } from 'lucide-react'

type Props = {
  member: Member
  active: boolean
  setActive: React.Dispatch<React.SetStateAction<Member>>
}

export default function MemberCard({ member, setActive }: Props) {
  const { data: ensName, isLoading } = useEnsName({
    address: member.address as `0x${string}`,
    chainId: Number(1),
  })

  // TODO:
  //  - Add profile image

  return (
    <Button variant="outline" className="w-full" key={member.address} onClick={() => setActive(member)}>
      {member ? (
        <Card className="w-full">
          <CardContent className="p-4">
            <div className="flex flex-col space-y-2">
              <p className="text-sm font-medium">
                {isLoading || ensName === null ? truncateAddress(member?.address) : ensName}
              </p>
              <p className="text-sm text-muted-foreground">
                {Number(ethers.utils.formatEther(member?.shares)).toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Loader2 className="h-4 w-4 animate-spin" />
      )}
    </Button>
  )
}
