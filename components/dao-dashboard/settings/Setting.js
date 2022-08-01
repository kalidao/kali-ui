import { Flex } from '../../../styles/elements'
import GovSettings from './GovSettings'
import LegalSettings from './LegalSettings'

export default function Setting({ setting }) {
  let render
  if (setting == 'gov') {
    render = <GovSettings />
  }
  if (setting == 'legal') {
    render = <LegalSettings />
  }

  return (
    <Flex
      css={{
        width: '80vw',
        height: '100%',
      }}
    >
      {render}
    </Flex>
  )
}
