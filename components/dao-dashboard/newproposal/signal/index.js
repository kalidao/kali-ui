import React, { useState } from 'react'
import { useAccount } from 'wagmi';
import { Button, Flex } from "../../../../styles/elements";
import { Input, Label } from "../../../../styles/form-elements";
import { useSignTypedData } from 'wagmi';

export default function Signal() {
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const { data: account } = useAccount();
  const { data, error, isError, isLoading, isSuccess, signTypedData } =
    useSignTypedData({
      domain: {
        name: 'KALI',
        version: '1',
        chainId: 4,
      },
      types : {
          Proposal: [
            { name: 'from', type: 'string' },
            { name: 'title', type: 'string' },
            { name: 'description', type: 'string' },
          ],
      },
      value: {
        from: account?.address,
        title: title,
        description: description
      },
  });

  
  console.log('description', description)
  console.log('title', title)
  return (
    <Flex dir="col" gap="md">
      <Flex dir="col" gap="sm">
        <Label htmlFor="title">Title</Label>
        <Input name="title" onChange={(e) => setTitle(e.target.value)}/>
      </Flex>
      <Flex dir="col" gap="sm">
        <Label htmlFor="description">Description</Label>
        <Input name="description" as="textarea" variant="textarea"  onChange={(e) => setDescription(e.target.value)} />
      </Flex>
      <Button disabled={isLoading} onClick={() => signTypedData()}>Submit</Button>
      {isSuccess && <div>Signature: {data}</div>}
      {isError && <div>Error signing message {error.message}</div>}
    </Flex>
  )
}
