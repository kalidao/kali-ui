import { useRouter } from 'next/router'
import { getDaoChain } from '../../utils'
import { useNetwork } from 'wagmi'
import { useState } from 'react'
import { ButtonCard, Avatar, Stat } from '@kalidao/reality'

type Props = {
  dao: any,
  chain: number
}
// disable when not active chain
export default function DaoCard({ dao, chain }: Props) {
  const router = useRouter()
  const { chain: activeChain } = useNetwork()
  const [loading, setLoading] = useState(false)

  const gotoDAO = async () => {
    setLoading(true)
    if (chain != null) {
      router.push(`/daos/${chain}/${dao['id']}`)
    } else {
      if (activeChain) {
        router.push(`/daos/${activeChain?.id}/${dao['id']}`)
      } else {
        const chainId = await getDaoChain(dao['id'])
        if (chainId) {
          router.push(`/daos/${chainId}/${dao['id']}`)
        }
      }
    }
    setLoading(false)
  }

  return (
    <ButtonCard
      onClick={gotoDAO}
      buttonText={dao['token']['name']} prefix={<Avatar label="DAO Avatar" address={dao?.['id']} placeholder />}
      loading={loading}
    >
      <Stat
        label="Members"
        value={dao?.['members'].length}
      />
    </ButtonCard>
  )
}
