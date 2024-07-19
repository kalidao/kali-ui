import { Checkbox } from '@components/ui/checkbox'
import { Label } from '@components/ui/label'
import { ExternalLink } from 'lucide-react'
import { useSwapStore } from './store'

export default function Terms() {
  const setConsent = useSwapStore((state) => state.setConsent)

  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" onCheckedChange={setConsent} />
      <Label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        I agree to the{' '}
        <a
          href="/tos"
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:underline inline-flex items-center"
        >
          terms and conditions
          <ExternalLink className="ml-1 h-3 w-3" />
        </a>
      </Label>
    </div>
  )
}
