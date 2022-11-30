import { Input } from "@kalidao/reality"

type Props = {
    amount: number,
    setAmount: React.Dispatch<React.SetStateAction<number>>
    max: number,
    tokenSymbol: string,
}

export const SwapInput = ({
    max
}: Props) => {
    return  <Input
    label="Amount"
    type="number"
    min={0}
    max={max}
    defaultValue="0.0"
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAmount(e.target.value)}
    suffix={tokenSymbol}
  />
}