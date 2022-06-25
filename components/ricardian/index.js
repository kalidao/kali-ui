import React, { useState } from 'react'
import { Flex, Button } from '../../styles/elements'
import Create from './Create'
import Mint from './Mint'

export default function index() {
  const [show, setShow] = useState()

  return (
    <Flex
      css={{
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        top: '7rem',
        left: 0,
        right: 0,
        textAlign: 'center',
        width: '20rem',
        height: '20rem',
        background: '$mauve2',
        border: '$mauve4',
        color: '$mauve11',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row',
        gap: '20px',
        borderRadius: '20px',
      }}
    >
      {show === 'mint' && <Mint />}
      {show == 'create' && <Create />}
    </Flex>
  )
}
