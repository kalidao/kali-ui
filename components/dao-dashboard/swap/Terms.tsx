import { Box, Checkbox } from '@kalidao/reality'
import { useSwapStore } from './store'

export default function Terms() {
  const details = useSwapStore((state) => state.swap.details)

  const setConsent = useSwapStore((state) => state.setConsent)
  const consent = useSwapStore((state) => state.consent)

  console.log('details', details)
  return <Checkbox size="small" label={<Box>
    I agree to the <a href={details} target="_blank" rel="noreferrer">terms and conditions</a>
  </Box>} onCheckedChange={setConsent}></Checkbox>
}
