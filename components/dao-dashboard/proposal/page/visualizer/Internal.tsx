import { Stack, Box, Button, Text, Spinner, IconLink, IconDocumentAdd, IconDocumentsSolid } from '@kalidao/reality'
import { AddressZero } from '@ethersproject/constants'
import { useContractRead } from 'wagmi'
import DAO_ABI from '@abi/KaliDAO.json'
import { formatVotingPeriod } from '@utils/votingPeriod'
import Link from 'next/link'

export default function Internal({
  type,
  amount,
  message,
  dao,
  chainId,
}: {
  type: string
  amount?: string
  message: string
  dao?: string
  chainId?: number
}) {
  const { data: pause } = useContractRead({
    addressOrName: dao ? dao : AddressZero,
    contractInterface: DAO_ABI,
    functionName: 'paused',
    chainId: chainId,
    enabled: type === 'PAUSE',
  })
  const { data: votingPeriod } = useContractRead({
    addressOrName: dao ? dao.toString() : AddressZero,
    contractInterface: DAO_ABI,
    functionName: 'votingPeriod',
    chainId: chainId,
    enabled: type === 'VPERIOD',
  })

  console.log('amount', amount)

  let render
  switch (type) {
    case 'PAUSE':
      render = (
        <Text>
          {message} The token is currently {Boolean(pause) === true ? '' : 'not'} paused.
        </Text>
      )
      break
    case 'VPERIOD':
      render = (
        <Stack>
          {votingPeriod ? (
            <Text>The current voting period is {formatVotingPeriod(Number(votingPeriod))}.</Text>
          ) : (
            <Spinner />
          )}
          <Text>{message}</Text>
        </Stack>
      )
      break
    case 'ESCAPE':
        render = (
          <Stack>
             <Link href={`/daos/${chainId}/${dao}/proposals/${amount}`} passHref>
          <Text>
            {message}
            
          </Text>
          </Link>
        </Stack>
        )
        break
    case 'DOCS':
      render = (
        <Stack direction={'vertical'}>
          <Text>{message}</Text>
          <Button
            as="a"
            variant="secondary"
            target="_blank"
            rel="noopenner noreferrer"
            href={amount}
            tone="accent"
            prefix={<IconDocumentsSolid />}
          >
            Review
          </Button>
        </Stack>
      )
      break
    default:
      render = <Text>{message}</Text>
      break
  }

  return <Box>{render}</Box>
}
