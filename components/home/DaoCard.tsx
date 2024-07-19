import { useRouter } from 'next/router'
import ALL_CHAINS from '@constants/chains.json'
import { useGetDaoMeta } from '@components/hooks/useGetDaoMeta'
import { Card } from '@components/ui/card'
import { Badge } from '@components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { Users } from 'lucide-react'

type Props = {
  dao: any
  chain: number
}

export default function DaoCard({ dao, chain }: Props) {
  const router = useRouter()
  const chainObj = ALL_CHAINS.find((c) => c.chainId == chain)
  const { data: meta } = useGetDaoMeta(chain, dao['id'])

  const gotoDAO = async () => {
    if (!dao || !chain) return

    router.push(`/daos/${chain}/${dao['id']}`)
  }

  return (
    <Card
      className="p-6 w-96 bg-background dark:bg-gray-800 cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={gotoDAO}
    >
      <div className="w-full flex items-center justify-between">
        <span className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={meta?.image} alt="DAO Avatar" />
            <AvatarFallback>
              <Users className="h-6 w-6 text-gray-400" />
            </AvatarFallback>
          </Avatar>
          <p className="text-gray-900 dark:text-white font-bold text-xl">{dao?.['token']?.['name']}</p>
        </span>
        <Badge variant="secondary" className="text-sm">
          {chainObj?.name}
        </Badge>
      </div>
    </Card>
  )
}
