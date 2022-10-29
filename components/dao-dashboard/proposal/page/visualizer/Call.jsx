import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import { Flex, Box, Text, Button } from '../../../../../styles/elements'
import { CopyIcon, ExternalLinkIcon } from '@radix-ui/react-icons'
import getExplorerLink from '../../../../../utils/getExplorerLink'
import decodeTx from './decodeTx'
import { tokens } from '../../../../../constants/tokens'

export default function Call({ accounts, amounts, payloads }) {
  const router = useRouter()
  for (let i = 0; i < accounts.length; i++) {
    const link = getExplorerLink(Number(router.query.chainId), 'ADDRESS', accounts[i])
    const decoded = decodeTx(payloads?.[i], amounts?.[i])
    console.log('decoded', decoded)

    const params = createParams(accounts[i], router.query.chainId, decoded)
    console.log('params', params)
    return (
      <Flex
        css={{
          fontFamily: 'Regular',
          flexDirection: 'column',
        }}
      >
        <Flex
          css={{
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text>Calling</Text>
          <Flex
            as="a"
            href={link}
            target="_blank"
            gap="sm"
            align="center"
            css={{
              '&:hover': {
                color: '$gray12',
              },
            }}
          >
            {accounts[i]}
            <ExternalLinkIcon />
          </Flex>
        </Flex>
        <Flex
          css={{
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text>Value</Text>
          <Text>{ethers.utils.formatEther(amounts[i])}</Text>
        </Flex>

        <Flex
          css={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          {decoded && decoded != 'none' && (
            <Flex dir="col" gap="sm">
              <Text
                css={{
                  fontWeight: '500',
                }}
              >
                {decoded['type']}
              </Text>
              <Flex dir="col" gap="sm">
                <Flex
                  css={{
                    border: '1px solid $gray4',
                    background: '$gray3',
                    padding: '10px',
                    borderRadius: '10px',
                    justifyContent: 'space-between',
                    minWidth: '100%',
                  }}
                >
                  <Text>Function</Text>
                  <Text>{decoded['tx']['name']}</Text>
                </Flex>
                {params &&
                  params.map((param, index) => (
                    <Flex
                      key={index}
                      css={{
                        border: '1px solid $gray4',
                        background: '$gray3',
                        padding: '10px',
                        borderRadius: '10px',
                        justifyContent: 'space-between',
                        minWidth: '100%',
                      }}
                    >
                      <Text>{param['name']}</Text>
                      <Text>{param['value']}</Text>
                    </Flex>
                  ))}
              </Flex>
            </Flex>
          )}
          {payloads[i] != '0x' && (
            <>
              <Flex>
                Payload
                <Button variant={'icon'} onClick={() => navigator.clipboard.writeText(payloads[i])}>
                  <CopyIcon />
                </Button>
              </Flex>
              <Text
                as="em"
                css={{
                  border: '1px solid $gray4',
                  background: '$gray3',
                  padding: '10px',
                  borderRadius: '10px',
                  minHeight: '3rem',
                  maxWidth: '98%',
                  overflowWrap: 'break-word',
                }}
              >
                {payloads[i]}
              </Text>
            </>
          )}
        </Flex>
      </Flex>
    )
  }
}

const createParams = (to, chain, decoded) => {
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
