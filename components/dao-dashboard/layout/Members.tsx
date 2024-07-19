import { Card, CardContent, CardFooter } from '@components/ui/card'
import { Button } from '@components/ui/button'
import { Badge } from '@components/ui/badge'
import { Loader2, BookOpen } from 'lucide-react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useQuery } from 'wagmi'
import { getMembers } from '@graph/queries'
import { formatEther } from 'ethers/lib/utils'
import { useMemo } from 'react'
import { User } from '@components/tools/User'

const Members = () => {
  const router = useRouter()
  const { chainId, dao } = router.query
  const { data, isLoading } = useQuery(
    ['daoProfileMembers', chainId, dao],
    () => getMembers(Number(chainId), dao as string),
    {
      enabled: !!chainId && !!dao,
    },
  )

  const list = useMemo(
    () =>
      data?.members
        ?.sort((a: { shares: number }, b: { shares: number }) => b.shares - a.shares)
        .filter((p: { shares: number }) => p.shares > 0),
    [data],
  )

  if (isLoading) return <Loader2 className="animate-spin" />

  return (
    <Card className="p-6">
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <div className="flex flex-col justify-between h-full">
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Members</h2>
              <Badge variant="secondary">{data?.members?.length}</Badge>
            </div>
            <div className="space-y-4">
              {list?.slice(0, 3)?.map((member: any) => (
                <Member key={member?.address} address={member?.address} shares={member?.shares} />
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Link
              href={{
                pathname: `/daos/[chainId]/[dao]/members`,
                query: { chainId: chainId, dao: dao },
              }}
              passHref
            >
              <Button variant="outline" className="w-full" size="sm">
                <BookOpen className="mr-2 h-4 w-4" />
                View All
              </Button>
            </Link>
          </CardFooter>
        </div>
      )}
    </Card>
  )
}

const Member = ({ address, shares }: { address: string; shares: string }) => {
  return (
    <div className="flex items-center justify-between">
      <User address={address} />
      <span className="text-sm">{Number(formatEther(shares)).toFixed(2)}</span>
    </div>
  )
}

export default Members
