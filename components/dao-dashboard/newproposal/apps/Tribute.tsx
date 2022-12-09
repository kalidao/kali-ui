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
import { createProposal } from '../utils'

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
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState<JSONContent>()
  const [amount, setAmount] = useState<string>('0')
  const [value, setValue] = useState<string>('0')
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { writeAsync, isSuccess } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: tributeAddress,
    contractInterface: TRIBUTE_ABI,
    functionName: 'submitTributeProposal',
    chainId: chainId,
  })

  if (isLoadingStatus || isStatusError || Boolean(status) === false) return null

  const tribute = async () => {
    if (!isConnected) return
    setLoading(true)
    let docs
    try {
      docs = await createProposal(daoAddress as string, Number(chainId), 2, title, description)
    } catch (e) {
      console.error(e)
      return
    }

    if (docs) {
      const tx = await writeAsync({
        recklesslySetUnpreparedArgs: [
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
        recklesslySetUnpreparedOverrides: {
          value: value ? ethers.utils.parseEther(value) : ethers.utils.parseEther('0'),
        },
      })
      tx.wait(1).then(() => {
        setLoading(false)
        setOpen(false)
      })
    }
    setLoading(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      title="✨ Tribute"
      description={`Give a tribute to ${name}.`}
      trigger={
        <Button size="small" variant="secondary" tone="green" prefix={<IconSparkles />}>
          Tribute
        </Button>
      }
    >
      <Stack>
        <Input placeholder="Tribute for..." label='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
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
          <Button prefix={<IconSparkles />} loading={loading} disabled={loading || isSuccess} width="full" onClick={tribute}>
            {'Give'}
          </Button>
        </ChainGuard>
      </Stack>
    </Dialog>
  )
}
