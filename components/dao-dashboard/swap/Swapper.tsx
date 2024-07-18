import { Input } from '@components/ui/input'
import { ArrowDown } from 'lucide-react'
import Terms from './Terms'
import { useSwapStore } from './store'
import { useState } from 'react'
import { BigNumber, ethers } from 'ethers'
import { Alert, AlertDescription } from '@components/ui/alert'
import Approve from './Approve'
import Swap from './Swap'

export default function Swapper() {
  const token = useSwapStore((state) => state.token)
  const dao = useSwapStore((state) => state.dao)
  const consent = useSwapStore((state) => state.consent)
  const multiplier = useSwapStore((state) => state.swap.purchaseMultiplier)
  const userBalance = useSwapStore((state) => state.user.tokenBalance)
  const approved = useSwapStore((state) => state.approved)
  const [amountIn, setAmountIn] = useState('0')
  const [amountOut, setAmountOut] = useState(0)
  const [warning, setWarning] = useState('')

  const handleAmountIn = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value
    setAmountIn(amount)
    const amountOut = ethers.utils.formatUnits(
      ethers.utils.parseUnits(amount ? amount : '0', token.decimals).mul(BigNumber.from(multiplier)),
      dao.decimals,
    )
    setAmountOut(Number(amountOut))

    if (Number(amountIn) > userBalance) {
      setWarning('Insufficient balance')
    } else {
      setWarning('')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-full max-w-sm">
          <Input type="number" min="0" value={amountIn} onChange={handleAmountIn} placeholder={`0 ${token.symbol}`} />
          <p className="text-sm text-gray-500 mt-1">{token.name}</p>
        </div>
        <ArrowDown className="w-6 h-6" />
        <div className="w-full max-w-sm">
          <Input type="number" min="0" value={amountOut} disabled placeholder={`0 ${dao.symbol}`} />
          <p className="text-sm text-gray-500 mt-1">{dao.name}</p>
        </div>
        <Terms />
        {consent === false ? null : !approved ? <Approve /> : <Swap amount={amountIn.toString()} />}
        {warning && (
          <Alert variant="destructive">
            <AlertDescription>{warning}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}
