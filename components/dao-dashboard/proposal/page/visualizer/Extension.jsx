import { Button, Stack, IconLink, Text, IconTokens } from '@kalidao/reality'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import { addresses } from '../../../../../constants/addresses'
import decodeExtensions from './decodeExtensions'
import KALIDAO_ABI from '../../../../../abi/KaliDAO.json'
import { useContractRead, useSigner } from 'wagmi'
import { useExplorer } from '@components/hooks/useExplorer'
import { useEffect, useState } from 'react'
import { decodeSwap } from './decodeSwap'

export default function Extension({ accounts, amounts, payloads }) {
  const router = useRouter()
  const { data: signer } = useSigner()
  const { dao, chainId } = router.query
  const extensions = addresses[router.query.chainId]['extensions']
  const link = useExplorer({
    chainId: Number(chainId),
    type: 'address',
  })
  const [decoded, setDecoded] = useState(null)

  const { data: symbol } = useContractRead(
    {
      addressOrName: dao,
      contractInterface: KALIDAO_ABI,
      functionName: 'symbol',
      chainId: Number(chainId),
    },
  )

  const { data: status, error } = useContractRead(
    {
      addressOrName: dao,
      contractInterface: KALIDAO_ABI,
    },
    'extensions',
    {
      args: accounts[0],
      chainId: Number(chainId),
    },
  )

  useEffect(() => {
    const visualize = async () => {
      if (accounts[0].toLowerCase() === extensions.crowdsale2.toLowerCase()) {
        const { values, decimals } = await decodeSwap(payloads[0], symbol, signer)
        console.log(values, decimals)
        setDecoded(values)
      } else {
        const _decoded = decodeExtensions(accounts[0], payloads[0], chainId)
        setDecoded(_decoded)
      }
    }

    if (signer) {
      visualize()
    }

    // for (const key in extensions) {
    //   if (accounts[i].toLowerCase() == extensions[key].toLowerCase()) {
    //     extension = key
  }, [signer, symbol])


    return (
      <Stack>
        {/* TODO: Removing till I add activation to subgraph  */}
        {/* <Text>{extension}</Text>
        <Text>{amounts[i] != 0 ? (status == true ? 'Deactivating' : 'Activating') : 'Activating'}</Text> */}
        {decoded &&
          decoded.map((item) => (
            <Stack direction="horizontal" justify="space-between" align="center" border="" key={item['label']}>
              <Text responsive>{item['label']}</Text>
              <Text weight="bold" responsive>
                {item['label'] == 'Details' && item['value'] != 'none' ? (
                  <Button
                    as="a"
                    href={`https://${item['value']}.ipfs.dweb.link/`}
                    target="_blank"
                    rel="noreferrer"
                    shape="circle"
                    variant="transparent"
                    size="small"
                  >
                    <IconLink />
                  </Button>
                ) : (item['display'] == 'token' && item['value'] != 'ETH') ? (
                  <Button
                    as="a"
                    href={`${link}${item['value']}`}
                    target="_blank"
                    rel="noreferrer"
                    shape="circle"
                    variant="transparent"
                    size="small"
                  >
                    <IconTokens />
                  </Button>
                ) : (
                  item['value']
                )}
              </Text>
            </Stack>
          ))}
      </Stack>
    )
}
