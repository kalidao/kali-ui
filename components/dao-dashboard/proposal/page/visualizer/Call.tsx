import { ethers } from 'ethers'
import { useParams } from 'next/navigation'
import { Button } from '@components/ui/button'
import { Card, CardContent } from '@components/ui/card'
import { Copy } from 'lucide-react'
import getExplorerLink, { ExplorerType } from '@utils/getExplorerLink'
import decodeTx from './decodeTx'
import { tokens } from '@constants/tokens'
import { Address } from 'viem'

interface Call {
  account: string
  amount: string
  payload: string
}

export default function CallShell({
  accounts,
  amounts,
  payloads,
}: {
  accounts: string[]
  amounts: string[]
  payloads: string[]
}) {
  const params = useParams<{ chainId: string; dao: Address }>()
  const chainId = params ? Number(params.chainId) : 1
  const dao = params?.dao as Address

  let calls: Call[] = []
  for (let i = 0; i < accounts.length; i++) {
    calls.push({
      account: accounts[i],
      amount: amounts[i],
      payload: payloads[i],
    })
  }

  return (
    <div className="space-y-4">
      {calls.map((call, i) => (
        <CallCard
          key={call.account}
          account={call.account}
          amount={call.amount}
          payload={call.payload}
          chainId={chainId}
          dao={dao}
        />
      ))}
    </div>
  )
}

const CallCard = ({
  account,
  amount,
  payload,
  dao,
  chainId,
}: {
  account: string
  amount: string
  payload: string
  dao: string
  chainId: number
}) => {
  const decoded = decodeTx(payload, amount)
  const params = createParams(account, chainId, decoded)

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <p className="text-sm">
          This will interact with an external contract. You can review the contract{' '}
          <a
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
            href={getExplorerLink(chainId, ExplorerType.ADDRESS, account)}
          >
            here
          </a>
          .
        </p>
        {decoded && decoded != 'none' && (
          <div className="space-y-2">
            <h3 className="font-bold">{decoded['type']}</h3>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Function</span>
                <span className="font-semibold">{decoded['tx']['name']}</span>
              </div>
              {params &&
                params.map((param, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{param['name']}</span>
                    <span className="font-semibold">{param['value']}</span>
                  </div>
                ))}
              <div className="flex justify-between">
                <span>value (native)</span>
                <span>{ethers.utils.formatEther(amount)}</span>
              </div>
            </div>
          </div>
        )}
        {payload != '0x' && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Payload</span>
              <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(payload)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="bg-gray-100 rounded p-2 break-words text-sm">{payload}</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

const createParams = (to: string, chain: number, decoded?: any) => {
  if (!decoded || decoded == 'none') return
  let array: { name: string; type: string; value: string | number }[] = []
  for (let i = 0; i < decoded['tx']['args'].length; i++) {
    let value = decoded['tx']['args'][i]
    if (decoded['tx']['functionFragment']['inputs'][i]['type'] == 'uint256') {
      value = ethers.utils.formatUnits(decoded['tx']['args'][i], 18)

      // FIXME: fetch decimals instead
      if (decoded['type'] == 'ERC20') {
        const cTokens = tokens[chain]
        for (let key in cTokens) {
          if (!cTokens.hasOwnProperty(key)) continue
          if (cTokens[key]['address'].toLowerCase() === to.toLowerCase()) {
            value = ethers.utils.formatUnits(decoded['tx']['args'][i], cTokens[key]['decimals'])
          }
        }
      }
    }

    array.push({
      name: decoded['tx']['functionFragment']['inputs'][i]['name'],
      type: decoded['tx']['functionFragment']['inputs'][i]['type'],
      value: value,
    })
  }
  return array
}
