import React from 'react'
import { Banknote, CreditCard, ArrowLeft } from 'lucide-react'
import { Button } from '@components/ui/button'
import { Card, CardContent } from '@components/ui/card'
// menu items
import SendErc20 from './SendErc20'
import SendErc721 from './SendErc721'
import SendEth from './SendEth'
import { Item } from '../Item'

type Props = {
  setProposal: React.Dispatch<React.SetStateAction<string>>
}

function SendMenu({ setProposal }: Props) {
  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-6">
        <div className="space-y-4">
          <Item onClick={() => setProposal('eth')} icon={<Banknote className="w-5 h-5" />} label="Send ETH" />
          <Item onClick={() => setProposal('erc20')} icon={<CreditCard className="w-5 h-5" />} label="Send ERC20" />
          <Item onClick={() => setProposal('erc721')} icon={<CreditCard className="w-5 h-5" />} label="Send ERC721" />
        </div>
        <Button variant="outline" className="mt-6" onClick={() => setProposal('menu')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </CardContent>
    </Card>
  )
}

export { SendMenu, SendErc20, SendErc721, SendEth }
