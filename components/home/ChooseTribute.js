import { useState, useEffect } from 'react'
import { HStack, Checkbox, Text } from '@chakra-ui/react'
import InfoTip from '../elements/InfoTip'

function ChooseTribute({ details, setDetails }) {
  const [tribute, setTribute] = useState(details['extensions']['tribute']['active'])

  useEffect(() => {
    details['extensions']['tribute']['active'] = tribute
    setDetails(details)
  }, [tribute])

  return (
    <HStack>
      <Checkbox
        name="tribute"
        value="tribute"
        size="sm"
        isChecked={tribute}
        defaultValue={tribute}
        onChange={() => setTribute(!tribute)}
      >
        <Text fontSize="sm">Tribute</Text>
      </Checkbox>
      <InfoTip label={'Anyone can propose to send ETH, ERC20 tokens, or NFTs to the DAO 💌'} />
    </HStack>
  )
}

export default ChooseTribute
