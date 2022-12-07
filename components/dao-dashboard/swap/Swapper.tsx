import { Progress } from '@design/Progress'
import { Box, Stack, Input, IconArrowDown, Button, Checkbox } from '@kalidao/reality'
import Terms from './Terms'
import { useSwapStore } from './store'
import * as styles from './styles.css'
import { useState } from 'react'
import { BigNumber, ethers } from 'ethers'

export default function Swapper() {  
    const token = useSwapStore((state) => state.token)
    const dao = useSwapStore((state) => state.dao)
    const consent = useSwapStore((state) => state.consent)
    const multiplier = useSwapStore((state) => state.swap.purchaseMultiplier)

    const [amountIn, setAmountIn] = useState(0)
    const [amountOut, setAmountOut] = useState(0)

    const handleAmountIn = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmountIn(Number(e.target.value));
        const amountOut = ethers.utils.formatEther(ethers.utils.parseUnits(e.target.value, token.decimals).mul(BigNumber.from(multiplier)), dao.decimals)
        setAmountOut(amountOut);
    }

    return <Box  className={styles.container}>
        <Stack align="center" justify={"center"}>
        <Input placeholder="0" type="number" min="0" value={amountIn} onChange={handleAmountIn} label={token.name} suffix={token.symbol}  />
        <IconArrowDown />
        <Input placeholder="0" min="0" value={amountOut} disabled label={dao.name} suffix={dao.symbol} />
        <Terms />
        <Button width="full" disabled={!consent}>Swap</Button>
        </Stack>
    </Box>
}

