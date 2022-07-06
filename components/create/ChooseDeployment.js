import React from 'react'
import { Flex, Button } from '../../styles/elements'

export default function ChooseDeployment({ setView }) {
  return (
    <Flex
      dir="col"
      gap="md"
      css={{
        padding: '10px',
      }}
    >
      <Button
        onClick={() => setView(1)}
        css={{
          width: '100%',
          padding: '10px 2px',
          borderRadius: '10px',
          background: '$amber9',
        }}
      >
        DAO
      </Button>
      <Button
        onClick={() => setView(2)}
        css={{
          width: '100%',
          padding: '10px 2px',
          borderRadius: '10px',
          background: '$cyan9',
        }}
      >
        Club
      </Button>
    </Flex>
  )
}
