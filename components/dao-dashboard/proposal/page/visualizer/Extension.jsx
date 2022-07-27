import { Flex, Text } from '../../../../../styles/elements'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import { addresses } from '../../../../../constants/addresses'

export default function Extension({ accounts, amounts, payloads }) {
  const router = useRouter()
  const extensions = addresses[router.query.chainId]["extensions"]

  for (let i = 0; i < accounts.length; i++) {
    // const decoded = decodeExtensions(accounts[i], payloads[i], router.query.chainId)
    // console.log('decoded', decoded)
    let extension
  for (const key in extensions) {
    if (accounts[i].toLowerCase() == extensions[key].toLowerCase()) {
      extension = key
    }
  }
    return (
      <Flex
        css={{
          fontFamily: 'Regular',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <Text>{extension}</Text>
        <Text>{amounts[i] == 1 ? 'Activating' : 'Deactivating'}</Text>
      </Flex>
    )
  }
}


