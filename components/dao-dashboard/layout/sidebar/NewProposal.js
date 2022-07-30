import { Dialog, DialogTrigger, DialogContent, DialogClose } from '../../../../styles/Dialog'
import { Flex, Text } from '../../../../styles/elements'
import { styled } from '../../../../styles/stitches.config'
import { NewProposalModal } from '../../newproposal'
import { FaPen } from 'react-icons/fa'

const Icon = styled('span', {
  display: 'flex',
  justifyContent: 'center',
  padding: '6px',
  alignItems: 'center',
  background: '$background',
  maxWidth: '2rem',
  borderRadius: '100%',
  height: '24px',
  width: '24px',
})

export default function NewProposal() {
  // TODO: Disable when fetching
  return (
    <Dialog>
      <DialogTrigger>
        <Flex
          css={{
            alignItems: 'center',
            gap: '5px',
            borderRadius: '20px',
            color: '$gray12',
            background: '$violet7',
            padding: '5px',

            '&:hover': {
              background: '$violet6',
            },
          }}
        >
          <Icon>
            <FaPen size={20} />
          </Icon>
          <Text
            css={{
              fontFamily: 'Regular',
              fontSize: '24px',
            }}
          >
            Propose
          </Text>
        </Flex>
      </DialogTrigger>
      <DialogContent onInteractOutside={(event) => event.preventDefault()}>
        <NewProposalModal proposalProp={'menu'} />
        <DialogClose />
      </DialogContent>
    </Dialog>
  )
}
