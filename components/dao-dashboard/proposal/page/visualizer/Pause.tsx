import { Card, Stack, Text } from '@kalidao/reality'
import { useContractRead } from 'wagmi'
import KALIDAO_ABI from '@abi/KaliDAO.json'

type Props = {
  dao: string
  chainId: number
}

export default function Pause({ dao, chainId }: Props) {
  const { data } = useContractRead({
    addressOrName: dao,
    contractInterface: KALIDAO_ABI,
    functionName: 'paused',
    chainId: Number(chainId),
  })

  return (
    <Card padding="6">
      <Text>
        This proposal will flip transferability. The token {Boolean(data) === true ? 'is' : 'is not'} currently paused.
      </Text>
    </Card>
  )
}
