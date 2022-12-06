import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import { Box, Stack, Button, Text, IconLink, IconDuplicate } from '@kalidao/reality'
import getExplorerLink, { ExplorerType } from '@utils/getExplorerLink'
import decodeTx from './decodeTx'
import { tokens } from '@constants/tokens'

export default function CallShell({
  accounts,
  amounts,
  payloads,
}: {
  accounts: string[]
  amounts: string[]
  payloads: string[]
}) {
  const router = useRouter()
  const dao = router.query.dao as string
  const chainId = Number(router.query.chainId)

  let calls = []
  for (let i = 0; i < accounts.length; i++) {
    calls.push({
      account: accounts[i],
      amount: amounts[i],
      payload: payloads[i],
    })
  }

  return <Stack>
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
  </Stack>
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

  return <Stack>
      <Text>
          This will interact with an external contract.
          You can review the contract{" "}
          <a target="_blank" rel="noopener noreferrer" href={getExplorerLink(chainId, ExplorerType.ADDRESS, account)}>
            here
          </a>
          .
        </Text>
       <Stack direction={"horizontal"} align="center" justify={"space-between"}>
          <Text>Value</Text>
          <Text>{ethers.utils.formatEther(amount)}</Text>
        </Stack>
        <Stack>
          {decoded && decoded != 'none' && (
            <Stack>
              <Text>{decoded['type']}</Text>
              <Stack>
                <Stack>
                  <Text>Function</Text>
                  <Text>{decoded['tx']['name']}</Text>
                </Stack>
                {params &&
                  params.map((param, index) => (
                    <Stack key={index}>
                      <Text>{param['name']}</Text>
                      <Text>{param['value']}</Text>
                    </Stack>
                  ))}
              </Stack>
            </Stack>
          )}
          {payload != '0x' && (
            <Stack>
              <Stack direction={"horizontal"} align="center" justify={"space-between"}>
                <Text>Payload</Text>
                <Button size="small" variant="transparent" onClick={() => navigator.clipboard.writeText(payload)}>
                  <IconDuplicate />
                </Button>
              </Stack>
              <Box backgroundColor="backgroundTertiary" color="text" padding="2" wordBreak="break-word">{payload}</Box>
            </Stack>
          )}
        </Stack>
  </Stack>
}

const createParams = (to: string, chain: number, decoded?: any) => {
  if (!decoded || decoded == 'none') return
  let array = []
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
