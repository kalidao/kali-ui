import { Button, Stack, IconSparkles, Input, IconBookOpen } from '@kalidao/reality'
import { Dialog } from '@design/Dialog'
import { useDaoStore } from '@components/dao-dashboard/useDaoStore'
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { addresses } from '@constants/addresses'
import TRIBUTE_ABI from '@abi/KaliDAOtribute.json'
import { useState } from 'react'
import { JSONContent } from '@tiptap/react'
import { ethers } from 'ethers'
import Editor from '@components/editor'
import ChainGuard from '@components/dao-dashboard/ChainGuard'

export default function Tribute() {
  const name = useDaoStore((state) => state.name)
  const symbol = useDaoStore((state) => state.symbol)
  const daoAddress = useDaoStore((state) => state.address)
  const chainId = useDaoStore((state) => state.chainId)
  const abi = useDaoStore((state) => state.abi)
  const tributeAddress = addresses[chainId].extensions.tribute
  const {
    data: status,
    isLoading: isLoadingStatus,
    isError: isStatusError,
  } = useContractRead({
    addressOrName: daoAddress,
    contractInterface: abi,
    chainId: chainId,
    functionName: 'extensions',
    args: [tributeAddress],
  })
  const { address, isConnected } = useAccount()
  const [description, setDescription] = useState<JSONContent>()
  const [amount, setAmount] = useState<string>('0')
  const [value, setValue] = useState<string>('0')

  const { config } = usePrepareContractWrite({
    addressOrName: tributeAddress,
    contractInterface: TRIBUTE_ABI,
    functionName: 'submitTributeProposal',
    chainId: chainId,
    args: [
      daoAddress,
      0,
      description,
      [address],
      [amount ? ethers.utils.parseEther(amount) : ethers.utils.parseEther('0')],
      [ethers.constants.HashZero],
      false, // nft
      ethers.constants.AddressZero,
      ethers.utils.parseEther('0'),
    ],
    overrides: {
      value: value ? ethers.utils.parseEther(value) : ethers.utils.parseEther('0'),
    },
  })
  const { write, isSuccess } = useContractWrite(config)

  if (isLoadingStatus || isStatusError || Boolean(status) === false) return null

  return (
    <Dialog
      title="✨ Tribute"
      description={`Give a tribute to ${name}.`}
      trigger={
        <Button size="small" variant="secondary" tone="green" prefix={<IconSparkles />}>
          Tribute
        </Button>
      }
    >
      <Stack>
        <Editor label="Description" description="Why should we accept your tribute?" setContent={setDescription} />
        <Input min="0" label="Tribute (ETH)" type="number" value={value} onChange={(e) => setValue(e.target.value)} />
        <Input
          min="0"
          label={`Request (${symbol})`}
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <ChainGuard
          fallback={
            <Button width="full" prefix={<IconSparkles />}>
              Give
            </Button>
          }
        >
          <Button prefix={<IconSparkles />} disabled={!write} width="full" onClick={() => write?.()}>
            {isSuccess ? 'Success' : 'Give'}
          </Button>
        </ChainGuard>
      </Stack>
    </Dialog>
  )
}
