import { Box } from '@kalidao/reality'
import GovSettings from './GovSettings'
import LegalSettings from './LegalSettings'

export default function Setting({ setting }: { setting: string }) {
  let render
  if (setting == 'gov') {
    render = <GovSettings />
  }
  if (setting == 'legal') {
    render = <LegalSettings />
  }

  return <Box>{render}</Box>
}
