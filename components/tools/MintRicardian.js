import React, { useState } from 'react'
import { useAccount, useNetwork, useContractWrite } from 'wagmi'
import { addresses } from '../../constants/addresses'
import { Button, Flex } from '../../styles/elements'
import { Input, Label } from '../../styles/form-elements'
import { AddressZero } from '@ethersproject/constants'
import RICARDIAN_ABI from '../../abi/RicardianLLC.json'

export default function MintRicardian() {
  const { data: account } = useAccount()
  const { activeChain } = useNetwork()
  const [to, setTo] = useState()
  const {
    data,
    isLoading: isWritePending,
    isSuccess: isWriteSuccess,
    writeAsync,
  } = useContractWrite(
    {
      addressOrName: activeChain?.id ? addresses[activeChain?.id]['ricardian'] : AddressZero,
      contractInterface: RICARDIAN_ABI,
    },
    'mintLLC',
    {
      onSuccess(data) {
        console.log('success!', data)
      },
    },
  )

  const mint = async () => {
    console.log(to)
    if (!activeChain || !account || !to) return

    const res = await writeAsync({
      args: [to],
      overrides: {
        gasLimit: 1050000,
      },
    }).catch((e) => {
      console.log('error', e.code, e.reason)
    })
  }

  return (
    <Flex dir="col" css={{ gap: '1rem', position: 'absolute', left: '8rem', top: '5rem', margin: '1rem' }}>
      <Flex dir="col" gap="sm">
        <Label htmlFor="address">Address for Minting</Label>
        <Input name="address" placeholder="0x" onChange={(e) => setTo(e.target.value)} />
      </Flex>
      <Button onClick={mint} disabled={isWritePending}>
        {isWritePending ? <div>Confirm Mint</div> : <div>Mint</div>}
      </Button>
    </Flex>
  )
}
