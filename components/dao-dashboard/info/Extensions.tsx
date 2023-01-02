import React from 'react'
import { Card, Stack, Text } from '@kalidao/reality'

type Props = {
  tribute: any
  redemption: any
  swap: any
}

export default function Extensions({ tribute, redemption, swap }: Props) {
  const extensions = [
    {
      title: 'Tribute',
      value: tribute === null ? 'Inactive' : tribute?.active === true ? 'Active' : 'Inactive',
    },
    {
      title: 'Redemption',
      value: redemption === null ? 'Inactive' : redemption?.active === true ? 'Active' : 'Inactive',
    },
    {
      title: 'Swap',
      value: swap === null ? 'Inactive' : swap?.active === true ? 'Active' : 'Inactive',
    },
  ]
  return (
    <Card padding="6">
      <Stack>
        {extensions?.map((item, index) => {
          return (
            <Stack key={index} direction="horizontal" justify="space-between" align="center">
              <Text>{item.title}</Text>
              <Text weight="bold">{item.value}</Text>
            </Stack>
          )
        })}
      </Stack>
    </Card>
  )
}
