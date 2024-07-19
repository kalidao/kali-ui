import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { useContract, useSigner } from 'wagmi'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@components/ui/button'
import { Switch } from '@components/ui/switch'
import { Alert, AlertDescription } from '@components/ui/alert'
import { Calendar } from '@components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@utils/util'

import KALIDAO_ABI from '@abi/KaliDAO.json'
import { addresses } from '@constants/addresses'
import { fetchExtensionStatus } from '@utils/fetchExtensionStatus'
import { ProposalProps } from '../utils/types'
import { getRedemptionTokens } from '@utils/getRedemptionTokens'
import { createProposal } from '../utils/createProposal'

export default function SetRedemption({ setProposal, title, content }: ProposalProps) {
  const router = useRouter()
  const daoAddress = router.query.dao as string
  const daoChainId = Number(router.query.chainId)
  const { data: signer } = useSigner()
  const redemptionAddress = addresses[daoChainId]['extensions']['redemption']
  const tokenArray = getRedemptionTokens(daoChainId)

  const kalidao = useContract({
    address: daoAddress,
    abi: KALIDAO_ABI,
    signerOrProvider: signer,
  })

  const [redemptionStart, setRedemptionStart] = useState<Date>()
  const [toggleRedemption, setToggleRedemption] = useState<boolean>(false)
  const [warning, setWarning] = useState<string>()

  const { data: redemptionStatus } = useQuery(
    ['redemptionStatus'],
    async () => {
      const status = await fetchExtensionStatus(Number(daoChainId), daoAddress, redemptionAddress)
      return status ? 'Active' : 'Inactive'
    },
    {
      enabled: !!daoAddress && !!daoChainId && !!redemptionAddress,
    },
  )

  const submit = async () => {
    if (!redemptionStart) {
      setWarning('Please enter a valid date')
      return
    }
    let starts = Math.floor(redemptionStart.getTime() / 1000)

    let _toggleRedemption = toggleRedemption ? 1 : 0

    let payload
    try {
      const abiCoder = ethers.utils.defaultAbiCoder
      payload = abiCoder.encode(['address[]', 'uint256'], [tokenArray, starts])
      console.log(payload)
    } catch (e) {
      setWarning('Please set a start time.')
      return
    }

    let docs
    try {
      docs = await createProposal(daoAddress, daoChainId, 9, title, content)
    } catch (e) {
      console.error(e)
      return
    }

    console.log(
      'Proposal Params - ',
      9,
      docs,
      [addresses[daoChainId]['extensions']['redemption']],
      [_toggleRedemption],
      [payload],
    )

    try {
      const tx = await kalidao?.propose(
        9,
        docs,
        [addresses[daoChainId]['extensions']['redemption']],
        [_toggleRedemption],
        [payload],
      )
      console.log('tx', tx)
    } catch (e) {
      console.log('error', e)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Redemption</h2>
        <p className="text-sm text-gray-500">Set redemption for DAI, USDC, WETH. Current status - {redemptionStatus}</p>
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="redemption-toggle" checked={toggleRedemption} onCheckedChange={setToggleRedemption} />
        <label
          htmlFor="redemption-toggle"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {redemptionStatus === 'Inactive' ? 'Activate Redemption' : 'Deactivate Redemption'}
        </label>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn('w-[240px] justify-start text-left font-normal', !redemptionStart && 'text-muted-foreground')}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {redemptionStart ? format(redemptionStart, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={redemptionStart} onSelect={setRedemptionStart} initialFocus />
        </PopoverContent>
      </Popover>

      {warning && (
        <Alert variant="destructive">
          <AlertDescription>{warning}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={() => setProposal?.('appsMenu')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={submit}>Submit</Button>
      </div>
    </div>
  )
}
