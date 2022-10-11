import React from 'react'
import Link from 'next/link'
import { serviceProviders } from '@constants/serviceProviders'
import Image from 'next/image'
import { Stack, Heading, Card, Avatar, Text, Button, IconArrowRight } from '@kalidao/reality'

export default function Services() {
  return (
    <Stack align="center">
      <Heading align="center" responsive transform="capitalize">
        Partner Service Providers
      </Heading>
      <Stack direction={'horizontal'} align="center" justify={'center'} wrap>
        {serviceProviders.map((provider) => (
          <Card
            key={provider.name}
            borderRadius="2xLarge"
            padding="10"
            width={{
              xs: '80',
              md: '168',
            }}
            hover
            shadow
          >
            <Stack>
              <Stack direction={'horizontal'} align="center">
                <Avatar
                  size="16"
                  shape="square"
                  noBorder
                  src={provider.icon ? provider.icon : ''}
                  placeholder={provider.icon ? false : true}
                  label={`${provider.name} + logo`}
                />
                <Heading level="2">{provider.name}</Heading>
              </Stack>
              <Stack direction="horizontal" align="center" justify={'space-between'}>
                <Text color="foreground">{provider.text}</Text>
                <Button
                  as="a"
                  href={provider.link}
                  shape="circle"
                  tone="violet"
                  target="_blank"
                  rel="noreferrer nooppenner"
                >
                  <IconArrowRight />
                </Button>
              </Stack>
            </Stack>
          </Card>
        ))}
      </Stack>
    </Stack>
  )
}
