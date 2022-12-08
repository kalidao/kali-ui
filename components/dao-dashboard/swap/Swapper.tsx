import { Progress } from '@design/Progress'
import { Box, Stack, Input, IconArrowDown, Button, Checkbox } from '@kalidao/reality'
import Terms from './Terms'
import { useSwapStore } from './store'
import * as styles from './styles.css'
import { useState } from 'react'
import { BigNumber, ethers } from 'ethers'
import { Warning } from '@design/elements'
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

    if (amountIn > userBalance) {
      setWarning('Insufficient balance')
    } else {
      setWarning('')
    }
  }

  return (
    <Box className={styles.container}>
      <Stack align="center" justify={'center'}>
        <Input
          placeholder="0"
          type="number"
          min="0"
          value={amountIn}
          onChange={handleAmountIn}
          label={token.name}
          suffix={token.symbol}
        />
        <IconArrowDown />
        <Input placeholder="0" min="0" value={amountOut} disabled label={dao.name} suffix={dao.symbol} />
        <Terms />
        {consent === false ? null : !approved ? <Approve /> : <Swap amount={amountIn.toString()} />}
        <Warning warning={warning} />
      </Stack>
    </Box>
  )
}
