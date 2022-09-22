import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { erc20ABI, useContractRead, useSigner } from 'wagmi'
import { Flex, Text } from '../../../styles/elements'
import { AddressZero } from '@ethersproject/constants'
import { ethers } from 'ethers'
import { fetchCrowdsaleDataHash } from '../../tools/ipfsHelpers'

export default function Background() {
  const router = useRouter()
  const { dao } = router.query
  const [background, setBackground] = useState(null)

  useEffect(() => {
    const getCrowdsaleData = async () => {
      const data = await fetchCrowdsaleDataHash(ethers.utils.getAddress(dao))
      const response = await fetch('https://ipfs.io/ipfs/' + data)
      const responseJson = await response.json()
      console.log(data)
      try {
        const _background = responseJson.background ? responseJson.background.content[0].content[0].text : ''
        setBackground(_background)
      } catch (e) {
        console.log(e)
        setBackground('')
      }
    }

    getCrowdsaleData()
  }, [])

  return (
    <Flex dir="col" gap="md">
      <Text variant="subheading">Why should I swap?</Text>
      {background && <Text>{background}</Text>}
    </Flex>
  )
}
