import { Card } from '@components/ui/card'
import GovSettings from './GovSettings'
import LegalSettings from './LegalSettings'

export default function Setting({ setting }: { setting: string }) {
  let render
  if (setting === 'gov') {
    render = <GovSettings />
  }
  if (setting === 'legal') {
    render = <LegalSettings />
  }

  return <Card className="p-6">{render}</Card>
}
