import React from 'react'
import { Select as ChakraSelect } from '@chakra-ui/react'

function Select(props) {
  return (
    <ChakraSelect border="none" bg="rgba(36, 0, 0, 0.2)" color="#fff" {...props}>
      {props.children}
    </ChakraSelect>
  )
}

export default Select
