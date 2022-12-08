import React from 'react'
import Ricardian from './Ricardian'
import { Card, Stack, Text, IconLink } from '@kalidao/reality'

type Props = {
  docs: string
}

export default function Docs({ docs }: Props) {
  return (
    <Card padding="6">
      {docs === '' ? (
        <Ricardian />
      ) : (
        <Stack>
          <Text>Docs</Text>
          <Text>
            {docs === 'none' && 'Pending...'}
            {docs.substring(0, 4) === 'http' ? (
              <a href={docs} target="_blank" rel="noreferrer noopener">
                <IconLink />
              </a>
            ) : (
              <a href={`https://content.wrappr.wtf/ipfs/${docs}`} target="_blank" rel="noreferrer noopener">
                <IconLink />
              </a>
            )}
          </Text>
        </Stack>
      )}
    </Card>
  )
}
