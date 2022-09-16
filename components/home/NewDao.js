import React from 'react'
import { Flex, Button } from '../../styles/elements'
import { PlusIcon } from '@radix-ui/react-icons'
import { Dialog, DialogTrigger, DialogContent, DialogClose } from '../../styles/Dialog'
import DeployDaoWrapper from '../deploy-dao/'

export default function NewDao() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          css={{
            // display: 'flex',
            // justifyContent: 'space-between',
            // alignItems: 'center',
            fontSize: '1.2rem',
            fontFamily: 'Bold',
            borderRadius: '10px',
            width: '100%',
            height: '3rem',
            marginTop: '1rem',
            '&:hover': {
              background: '$gray11',
            },
            '&:active': {
              transform: 'translate(1px, 1px)',
            },
          }}
        >
          Summon KaliDAO
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogClose asChild />
        <DeployDaoWrapper />
      </DialogContent>
    </Dialog>
  )
}
