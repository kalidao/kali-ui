import React from 'react'
import { Flex } from '../../styles/elements'
import { PlusIcon } from '@radix-ui/react-icons'
import { Dialog, DialogTrigger, DialogContent, DialogClose } from '../../styles/Dialog'
import DeployDaoWrapper from '../deploy-dao/'

export default function NewDao() {
  return (
    <Dialog>
      <DialogTrigger>
        <Flex
          align="center"
          dir="row"
          css={{
            position: 'relative',
            height: 'auto',
            minWidth: '45px',
            background: '$violet4',
            color: '$mauve11',
            border: '1px solid $violet5',
            padding: '0.7rem',
            fontSize: '20px',
            fontFamily: 'Bold',
            borderRadius: '20px',
            gap: '5px',

            '&:hover': {
              background: '$violet5',
              color: '$mauve12',
              border: '1px solid $violet6',
            },
            '&:active': {
              background: '$violet6',
              color: '$mauve12',
              border: '1px solid $violet7',
            },

            '@media (max-width: 768px)': {
              fontSize: '18px',
              minWidth: '25px',
            },
          }}
        >
          Create <PlusIcon height="20px" width="20px" />
        </Flex>
      </DialogTrigger>
      <DialogContent>
        <DialogClose asChild />
        <DeployDaoWrapper />
      </DialogContent>
    </Dialog>
  )
}
