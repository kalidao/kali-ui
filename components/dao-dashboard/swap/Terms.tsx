import { Checkbox } from '@kalidao/reality'
import { useSwapStore } from './store'

export default function Terms() {  
    const details = useSwapStore((state) => state.swap.details)
    
    const setConsent = useSwapStore((state) => state.setConsent)

    return <Checkbox size="small" label={`I agree to the terms for swapping.`} onChange={setConsent}>

    </Checkbox>
}

