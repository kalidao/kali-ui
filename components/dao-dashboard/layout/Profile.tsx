'use client'
import { Avatar, AvatarImage, AvatarFallback } from '@components/ui/avatar'
import { Skeleton } from '@components/ui/skeleton'
import { ArrowRight, Link as LinkIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getDaoInfo } from '@graph/queries'
import { DashboardElementProps } from './types'
import Link from 'next/link'
import { useGetDaoMeta } from '@components/hooks/useGetDaoMeta'
import { Card } from '@components/ui/card'
import { cn } from '@utils/util'
import { useReadContract } from 'wagmi'
import { KALIDAO_ABI } from '@abi/KaliDAO'
import { blo } from 'blo'

const Profile = ({ address, chainId }: DashboardElementProps) => {
  const pathname = usePathname()
  const { data, isLoading } = useQuery(['daoProfileInfo', chainId, address], () => getDaoInfo(chainId, address), {
    enabled: !!chainId && !!address,
  })
  const { data: meta } = useGetDaoMeta(chainId, address)

  const { data: daoName } = useReadContract({
    address: address,
    abi: KALIDAO_ABI,
    functionName: 'name',
    chainId: chainId,
  })

  const { data: daoSymbol } = useReadContract({
    address: address,
    abi: KALIDAO_ABI,
    functionName: 'symbol',
    chainId: chainId,
  })

  console.log('daoName', address, chainId, daoName)

  if (isLoading) return <Skeleton className="w-full h-64" />

  return (
    <Card className={cn('w-full p-6')}>
      <div className="relative w-full flex items-center justify-center">
        {pathname === `/daos/${chainId}/${address}` ? null : (
          <Link href={`/daos/${chainId}/${address}/`} passHref className="absolute top-1 right-1">
            <ArrowRight className="text-gray-600 hover:text-gray-900" />
          </Link>
        )}
        {isLoading ? (
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
        ) : (
          <div className="items-center justify-center text-center w-full">
            <Avatar className="mx-auto">
              <AvatarImage src={meta?.image ?? blo(address)} alt="dao profile pic" className="w-32 h-32" />
              <AvatarFallback>{daoSymbol}</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold mt-4">
              {daoName} ({daoSymbol})
            </h1>
            <p className="text-gray-600 mt-2">{meta?.description}</p>
            <div className="border-t border-gray-200 my-4" />
            <div className="flex justify-center space-x-4 mt-4">
              {meta?.socials?.twitter && (
                <a
                  href={`${meta?.socials?.twitter}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                >
                  X (formerly Twitter)
                </a>
              )}
              {meta?.socials?.discord && (
                <a
                  href={`${meta?.socials?.discord}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Discord
                </a>
              )}
              {meta?.socials?.github && (
                <a
                  href={`${meta?.socials?.github}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Github
                </a>
              )}
              {meta?.socials?.website && (
                <a
                  href={`${meta?.socials?.website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <LinkIcon size={20} />
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

export default Profile
