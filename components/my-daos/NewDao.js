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
          dir="col"
          gap="md"
          css={{
            position: 'relative',
            minHeight: '5rem',
            minWidth: '15rem',
            background: '$violet4',
            color: '$mauve11',
            border: '1px solid $violet5',
            padding: '1rem',
            fontSize: '24px',
            fontFamily: 'Bold',
            borderRadius: '20px',

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
          }}
        >
          Create <PlusIcon height="25px" width="25px" />
        </Flex>
      </DialogTrigger>
      <DialogContent>
        <DialogClose asChild />
        <DeployDaoWrapper />
      </DialogContent>
    </Dialog>
  )
}
