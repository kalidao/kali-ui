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
            justifyContent: 'flex-start',
            gap: '5px',
            borderRadius: '20px',
            color: '$gray12',
            background: '$violet7',
            padding: '5px',
            width: '8rem',

            '&:hover': {
              background: '$violet6',
            },
            '@media (max-width: 640px)': {
              borderRadius: '100%',
              justifyContent: 'center',
              height: '24px',
              width: '24px',
              padding: '10px',
            },
          }}
        >
          <Icon>
            <FaPen />
          </Icon>
          <Text
            css={{
              fontFamily: 'Regular',
              fontSize: '16px',

              '@media (max-width: 640px)': {
                display: 'none',
              },
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
