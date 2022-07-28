import { Flex, Text } from '../../../../../styles/elements'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import { addresses } from '../../../../../constants/addresses'
import decodeExtensions from './decodeExtensions'
import KALIDAO_ABI from '../../../../../abi/KaliDAO.json'
import { useContractRead } from 'wagmi'

export default function Extension({ accounts, amounts, payloads }) {
  const router = useRouter()
  const { dao, chainId } = router.query
  const extensions = addresses[router.query.chainId]['extensions']
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
    console.log(amounts, status, error)
    let extension
    for (const key in extensions) {
      if (accounts[i].toLowerCase() == extensions[key].toLowerCase()) {
        extension = key
      }
    }
    return (
      <>
        <Flex
          css={{
            fontFamily: 'Regular',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* TODO: Removing till I add activation to subgraph  */}
          {/* <Text>{extension}</Text>
        <Text>{amounts[i] != 0 ? (status == true ? 'Deactivating' : 'Activating') : 'Activating'}</Text> */}
        </Flex>
        {decoded &&
          decoded['values'].map((item) => (
            <Flex
              css={{
                fontFamily: 'Regular',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              key={item['label']}
            >
              <Text>{item['label']}</Text>
              <Text>{item['value']}</Text>
            </Flex>
          ))}
      </>
    )
  }
}
