import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { fetchCrowdsaleDataHash } from '../../tools/ipfsHelpers'
import { Text, Box, Stack, Heading } from '@kalidao/reality'

export default function Background() {
  const router = useRouter()
  const { dao } = router.query
  const [background, setBackground] = useState(null)

  useEffect(() => {
    const getCrowdsaleData = async () => {
      const data = await fetchCrowdsaleDataHash(dao)
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
    <Stack>
      <Heading level="2">Why should I swap?</Heading>
      <Box width={'3/4'}>{background && <Text>{background}</Text>}</Box>
    </Stack>
  )
}
