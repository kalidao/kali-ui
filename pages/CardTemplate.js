import { Flex, Text, Box } from '../styles/elements'

export default function CardTemplate() {
  var URL = require('url').URL

  return (
    <>
      <Flex
        gap="md"
        css={{
          height: '70%',
          width: '30%',
          // background: 'Blue',
        }}
      >
        <Flex
          dir="col"
          css={{
            width: '100%',
            height: '100%',
            background: '$gray3',
            borderRadius: '20px',
          }}
        >
          <Flex
            dir="col"
            gap="md"
            css={{
              width: '100%',
              height: '100%',
              // opacity: '0%',

              // margin: '1rem',
              // background: 'Red',
            }}
          >
            <Flex
              css={{
                marginTop: '2rem',
                // margin: '5px',
                justifyContent: 'center',
              }}
            >
              <Text variant="heading">Non-Profit</Text>
            </Flex>

            <Box css={{ height: '30%', background: '$amber11', width: '100%', opacity: '35%' }}>hey</Box>

            <Flex
              dir="col"
              gap="md"
              css={{
                alignItems: 'stretch',
                marginTop: '1.5rem',
                marginLeft: '1.5rem',
                marginRight: '1.5rem',
                // background: 'Blue',
                // justifyContent: 'center',
              }}
            >
              <Text
                css={{
                  fontSize: '0.9rem',
                }}
              >
                Summon a non-profit DAO
              </Text>
              <Text
                css={{
                  fontSize: '0.9rem',
                }}
              >
                Apply for 501(c)(3)
              </Text>
              <Text
                css={{
                  fontSize: '0.9rem',
                }}
              >
                Operate on-chain public charities
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
