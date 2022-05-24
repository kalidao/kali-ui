import { useContext } from 'react'
import AppContext from '../../context/AppContext'
import { Button, VStack } from '@chakra-ui/react'
import abi_ from '../../abi/Souldbinder.json'

export default function Soulbinder() {
  const value = useContext(AppContext)
  const { web3, account } = value.state

  const submitProposal = async (values) => {
    value.setLoading(true)

    try {
      const instance = new web3.eth.Contract(abi_, '0x6945A175791Be63B57b7F53214001AF8A29FbcC6')
      let result = await instance.methods.bindSoul().send({ from: account })
      value.setVisibleView(2)
    } catch (e) {
      value.toast(e)
      value.setLoading(false)
    }

    value.setLoading(false)
  }

  return (
    <VStack width="100%">
      <Button className="solid-btn" onClick={submitProposal}>
        Souldbind
      </Button>
    </VStack>
  )
}
