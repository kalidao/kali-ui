import React, { useState, useEffect } from 'react'
import SetRedemption from './SetRedemption'
import { useRouter } from 'next/router'
import { addresses } from '@constants/addresses'
import { fetchExtensionStatus } from '@utils/fetchExtensionStatus'
import { Sparkles, Trash2, ArrowLeft } from 'lucide-react'
import { Button } from '@components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card'

type Props = {
  setProposal: React.Dispatch<React.SetStateAction<string>>
}

function AppsMenu({ setProposal }: Props) {
  const router = useRouter()
  const { dao, chainId } = router.query

  const [isCrowdsale, setIsCrowdsale] = useState(false)

  useEffect(() => {
    const getCrowdsaleStatus = async () => {
      const status = await fetchExtensionStatus(
        Number(chainId),
        dao as string,
        addresses[Number(chainId)]['extensions']['crowdsale2'],
      )
      console.log(status)
      status ? setIsCrowdsale(true) : setIsCrowdsale(false)
    }

    getCrowdsaleStatus()
  }, [chainId, dao])

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Swap</CardTitle>
          <CardDescription>
            Swap allows KaliDAOs to swap KaliDAO tokens for ETH or ERC20 tokens publicly or privately.
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Redemption</CardTitle>
          <CardDescription>
            Redemption allows KaliDAO members to redeem a portion of DAO treasury by burning their KaliDAO tokens.
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Data Room</CardTitle>
          <CardDescription>
            Data Room is on-chain storage for recording off-chain activities or ratifying documents.
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardContent className="space-y-2">
          {isCrowdsale ? (
            <>
              <Button onClick={() => setProposal('swap_update')} className="w-full justify-start">
                <Sparkles className="mr-2 h-4 w-4" />
                Update Swap
              </Button>
              <Button onClick={() => setProposal('swap_remove')} className="w-full justify-start">
                <Trash2 className="mr-2 h-4 w-4" />
                Remove Swap
              </Button>
            </>
          ) : (
            <Button onClick={() => setProposal('swap_add')} className="w-full justify-start">
              <Sparkles className="mr-2 h-4 w-4" />
              Add Swap
            </Button>
          )}
          <Button onClick={() => setProposal('redemption')} className="w-full justify-start">
            <Sparkles className="mr-2 h-4 w-4" />
            Add Redemption
          </Button>
          <Button onClick={() => setProposal('record')} className="w-full justify-start">
            <Sparkles className="mr-2 h-4 w-4" />
            Record Off-Chain Activities
          </Button>
        </CardContent>
      </Card>
      <Button onClick={() => setProposal('menu')} variant="outline" className="w-full">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
    </div>
  )
}

export { AppsMenu, SetRedemption }
