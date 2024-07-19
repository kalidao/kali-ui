import { Card } from '@components/ui/card'
import { GovSettings } from './GovSettings'
import { LegalSettings } from './LegalSettings'

export function Setting({ setting }: { setting: string }) {
  let render
  if (setting === 'gov') {
    render = <GovSettings />
  }
  if (setting === 'legal') {
    render = <LegalSettings />
  }

  return <div className="p-1">{render}</div>
}
