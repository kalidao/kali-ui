import { Button, Stack, IconLink, Text, IconTokens } from '@kalidao/reality'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import { addresses } from '../../../../../constants/addresses'
import decodeExtensions from './decodeExtensions'
import KALIDAO_ABI from '../../../../../abi/KaliDAO.json'
import { useContractRead } from 'wagmi'
import { useExplorer } from '@components/hooks/useExplorer'

export default function Extension({ accounts, amounts, payloads }) {
  const router = useRouter()
  const { dao, chainId } = router.query
  const extensions = addresses[router.query.chainId]['extensions']
  const link = useExplorer({
    chainId: Number(chainId),
    type: 'address',
  })

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

  for (let i = 0; i < accounts.length; i++) {
    const decoded = decodeExtensions(accounts[i], payloads[i], chainId)
    let extension
    for (const key in extensions) {
      if (accounts[i].toLowerCase() == extensions[key].toLowerCase()) {
        extension = key
      }
    }

    return (
      <Stack>
        {/* TODO: Removing till I add activation to subgraph  */}
        {/* <Text>{extension}</Text>
        <Text>{amounts[i] != 0 ? (status == true ? 'Deactivating' : 'Activating') : 'Activating'}</Text> */}
        {decoded &&
          decoded['values'].map((item) => (
            <Stack direction="horizontal" justify="space-between" align="center" border="" key={item['label']}>
              <Text responsive>{item['label']}</Text>
              <Text weight="bold" responsive>
                {item['label'] == 'Details' ? (
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
                ) : item['display'] == 'token' ? (
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
}
