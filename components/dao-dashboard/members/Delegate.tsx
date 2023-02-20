import { Stack, Button, Box, Text } from '@kalidao/reality'
import { Select } from '@design/Select'
import getExplorerLink, { ExplorerType } from '@utils/getExplorerLink'
import { useRouter } from 'next/router'
import { truncateAddress } from '@utils/truncateAddress'
import { useContract, useSigner, useAccount, useContractRead } from 'wagmi'
import KALIDAO_ABI from '@abi/KaliDAO.json'
import { useState } from 'react'

export default function Delegate({ members }: any) {
  const router = useRouter()
  const daoAddress = router.query.dao as string
  const { chainId } = router.query
  const { data: signer } = useSigner()
  const { address } = useAccount()

  const { data: currentDelegatee } = useContractRead({
    address: daoAddress as `0xstring`,
    abi: KALIDAO_ABI,
    functionName: 'delegates',
    args: [address],
    chainId: Number(chainId),
  })

  const kalidao = useContract({
    address: daoAddress as `0xstring`,
    abi: KALIDAO_ABI,
    signerOrProvider: signer,
  })

  const [delegatee, setDelegatee] = useState<string>('')
  const [status, setStatus] = useState<string>('Delegate')

  const handleDelegation = async () => {
    setStatus('Delegating...')
    console.log(delegatee)
    try {
      const tx = await kalidao?.delegate(delegatee)
      console.log(tx)
      setStatus('Submitted!')
    } catch (e) {
      console.log(e)
    }
  }

  let daoMembers = []
  daoMembers.push({
    value: 'select',
    label: 'Select',
  })
  for (let i = 0; i < members.length; i++) {
    daoMembers.push({
      value: members[i].address,
      label: members[i].address,
    })
  }

  return (
    <Stack>
      <Box width={'2/3'}>
        <Stack direction={'horizontal'} space={'5'} align={'flex-end'}>
          <Box>
            <Text>
              Current Delegate:{' '}
              {currentDelegatee ? (
                <a
                  href={getExplorerLink(Number(chainId), ExplorerType.ADDRESS, currentDelegatee as string)}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {truncateAddress(currentDelegatee as string)}
                </a>
              ) : (
                'None'
              )}
            </Text>
            <Box padding={'1'}></Box>
            <Select
              label=""
              description="Is this Swap open to all or only to a select collective of addresses? Public swaps are available to anyone with an Eth address."
              name="type"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDelegatee(e.target.value)}
              options={daoMembers}
            />
          </Box>
          <Button onClick={handleDelegation}>{status ? status : 'Delegate'}</Button>
        </Stack>
      </Box>
    </Stack>
  )
}
