import React from 'react'
import { getRandomEmoji } from '../../utils'
import { featured } from '../../constants/featured'
import { TriggerTip } from '../elements/Tip'
import { Flex, Box, Text } from '../../styles/elements'
import { Avatar, AvatarImage, AvatarFallback } from '../../styles/Avatar'
import Link from 'next/link'

export default function Featured() {
  return (
    <Flex
      align="start"
      dir="col"
      gap="md"
      css={{
        position: 'relative',
        top: '0',
        right: '1rem',
        // border: '1px solid $gray6',
        padding: '1rem',
      }}
    >
      <Text
        css={{
          fontSize: '36px',
          fontFamily: 'Bold',
          width: '25rem',
          borderBottom: '1px solid $gray6',
        }}
      >
        ✨ Featured
      </Text>
      <Flex dir="col" gap="md" align="center">
        {featured.map((feature) => (
          <TriggerTip label={feature.label} key={feature.name}>
            <Link href={`/daos/${encodeURIComponent(feature.chainId)}/${encodeURIComponent(feature.address)}`} passHref>
              <Box
                variant="card"
                css={{
                  fontSize: '24px',
                  fontFamily: 'Regular',
                  alignItems: 'center',
                  width: '80%',
                  lineHeight: '1.5',
                  padding: '2px 10px',
                }}
              >
                <Avatar>
                  <AvatarImage src={feature?.icon} alt={`${feature.name} icon`} />
                  <AvatarFallback>{getRandomEmoji(feature.address)}</AvatarFallback>
                </Avatar>
                <Text
                  css={{
                    fontSize: '24px',
                    fontFamily: 'Regular',
                    paddingBottom: '2.5px',
                  }}
                >
                  {feature.name}
                </Text>
              </Box>
            </Link>
          </TriggerTip>
        ))}
      </Flex>
    </Flex>
  )
}
