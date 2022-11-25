import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import { Stack, Button, Text, IconLink } from '@kalidao/reality'
import { CopyIcon, ExternalLinkIcon } from '@radix-ui/react-icons'
import getExplorerLink, { ExplorerType } from '../../../../../utils/getExplorerLink'
import decodeTx from './decodeTx'
import { tokens } from '@constants/tokens'

export default function Call({
  accounts,
  amounts,
  payloads,
}: {
  accounts: string[]
  amounts: string[]
  payloads: string[]
}) {
  const router = useRouter()
  const chainId = Number(router.query.chainId)
  for (let i = 0; i < accounts.length; i++) {
    const link = getExplorerLink(Number(router.query.chainId), ExplorerType.ADDRESS, accounts[i])
    const decoded = decodeTx(payloads?.[i], amounts?.[i])
    console.log('decoded', decoded)

    const params = createParams(accounts[i], chainId, decoded)
    console.log('params', params)
    return (
      <Stack>
        <Stack>
          <Text>Calling</Text>
          <Button as="a" href={link} target="_blank" prefix={<IconLink />}>
            {accounts[i]}
          </Button>
        </Stack>
        <Stack>
          <Text>Value</Text>
          <Text>{ethers.utils.formatEther(amounts[i])}</Text>
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
          {payloads[i] != '0x' && (
            <>
              <Stack>
                Payload
                <Button onClick={() => navigator.clipboard.writeText(payloads[i])}>
                  <CopyIcon />
                </Button>
              </Stack>
              <Text>{payloads[i]}</Text>
            </>
          )}
        </Stack>
      </Stack>
    )
  }
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
