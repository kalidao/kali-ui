import { useContext } from 'react'
import AppContext from '../../context/AppContext'
import { Text, IconButton, HStack, VStack, Input } from '@chakra-ui/react'
import { BsHandThumbsUpFill, BsHandThumbsDownFill } from 'react-icons/bs'
import { useDisclosure } from '@chakra-ui/react'

const VoteButton = ({ label, bg, icon, ...props }) => {
  return (
    <IconButton
      size="lg"
      bg={bg}
      aria-label={label}
      icon={icon}
      {...props}
      _hover={{ bg: bg }}
      _active={{ bg: bg }}
      border="none"
    />
  )
}

export default function VotingModule(props) {
  const value = useContext(AppContext)
  const { web3, loading, account, address, abi } = value.state
  const p = props['p']
  const { isOpen, onOpen, onClose } = useDisclosure()

  const vote = async () => {
    event.preventDefault()
    value.setLoading(true)

    try {
      let object = event.target
      var array = []
      for (let i = 0; i < object.length; i++) {
        array[object[i].name] = object[i].value
      }

      const { id, approval } = array

      try {
        // * first, see if they already voted * //
        const instance = new web3.eth.Contract(abi, address)
        const voted = await instance.methods.voted(id, account).call()
        if (voted == true) {
          alert('You already voted')
        } else {
          try {
            let result = await instance.methods.vote(id, parseInt(approval)).send({ from: account })
          } catch (e) {
            value.toast(e)
            value.setLoading(false)
          }
        }
      } catch (e) {
        value.toast(e)
        value.setLoading(false)
      }
    } catch (e) {
      value.toast(e)
      value.setLoading(false)
    }
    value.setLoading(false)
  }

  return (
    <VStack border="#ccc" backgroundColor="#5a268607" width="100%" p={5} rounded="3xl" boxShadow="xl">
      <Text fontSize="lg" fontWeight="900">
        VOTE
      </Text>
      <HStack gap={3}>
        <form onSubmit={vote}>
          <Input type="hidden" name="id" value={p['id']} />
          <Input type="hidden" name="approval" value={1} />
          <VoteButton icon={<BsHandThumbsUpFill />} size="lg" aria-label="upvote" bg="#71E100" type="submit" />
        </form>

        <form onSubmit={vote}>
          <Input type="hidden" name="id" value={p['id']} />
          <Input type="hidden" name="approval" value={0} />
          <VoteButton bg="#FE2602" icon={<BsHandThumbsDownFill />} aria-label="downvote" type="submit" />
        </form>
      </HStack>
    </VStack>
  )
}
