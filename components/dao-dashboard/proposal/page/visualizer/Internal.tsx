import { AddressZero } from '@ethersproject/constants'
import { useContractRead } from 'wagmi'
import DAO_ABI from '@abi/KaliDAO.json'
import { formatVotingPeriod } from '@utils/votingPeriod'
import { Button } from '@components/ui/button'
import { Loader2, FileText } from 'lucide-react'

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
    address: dao ? (dao as `0xstring`) : AddressZero,
    abi: DAO_ABI,
    functionName: 'paused',
    chainId: chainId,
    enabled: type === 'PAUSE',
  })
  const { data: votingPeriod } = useContractRead({
    address: dao ? (dao.toString() as `0xstring`) : AddressZero,
    abi: DAO_ABI,
    functionName: 'votingPeriod',
    chainId: chainId,
    enabled: type === 'VPERIOD',
  })

  let render
  switch (type) {
    case 'PAUSE':
      render = (
        <p className="text-sm">
          {message} The token is currently {Boolean(pause) === true ? '' : 'not'} paused.
        </p>
      )
      break
    case 'VPERIOD':
      render = (
        <div className="space-y-2">
          {votingPeriod ? (
            <p className="text-sm">The current voting period is {formatVotingPeriod(Number(votingPeriod))}.</p>
          ) : (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}
          <p className="text-sm">{message}</p>
        </div>
      )
      break
    case 'ESCAPE':
      render = (
        <div className="space-y-2">
          <p className="text-sm">{message}</p>
          <Button size="sm" asChild>
            <a href={`/daos/${chainId}/${dao}/proposals/${amount}`}>View Proposal</a>
          </Button>
        </div>
      )
      break
    case 'DOCS':
      render = (
        <div className="space-y-2">
          <p className="text-sm">{message}</p>
          <Button variant="outline" size="sm" asChild>
            <a href={amount} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Review
            </a>
          </Button>
        </div>
      )
      break
    default:
      render = <p className="text-sm">{message}</p>
      break
  }

  return <div className="p-4 bg-white rounded-lg shadow">{render}</div>
}
