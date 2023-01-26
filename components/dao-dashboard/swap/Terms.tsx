import { Box, Checkbox } from '@kalidao/reality'
import { useSwapStore } from './store'

export default function Terms() {
  const setConsent = useSwapStore((state) => state.setConsent)

  return (
    <Checkbox
      size="small"
      label={
        <Box color="text">
          I agree to the{' '}
          <a href={'/tos'} target="_blank" rel="noreferrer">
            terms and conditions
          </a>
          .
        </Box>
      }
      onCheckedChange={setConsent}
    ></Checkbox>
  )
}
