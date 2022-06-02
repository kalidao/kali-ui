import React from 'react'
import { Flex, Button, Text, Box } from '../../../styles/elements'
import { useSignMessage } from 'wagmi'

export default function SignalView() {
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage()
  const string = "KALI ACCELERATIONISM"

  return (
    <Flex dir="col" gap="md">
        <Text>{string}</Text>
        <Flex gap="sm">
            <Button 
                disabled={isLoading} 
                onClick={() => signMessage({
                message: `${string} YES`
            })}
            >
                YES
            </Button>
            <Button 
                disabled={isLoading}
                onClick={() => signMessage({
                    message: `${string} NO`
                })}
            >
                NO
            </Button>
        </Flex>
        {isSuccess && <Box>Signature: {data}</Box>}
        {isError && <Box>Error signing message</Box>}
    </Flex>
  )
}
