import { NextPage } from 'next'
import {Heading, Text, Stack, Box} from '@kalidao/reality'
import Layout from '@components/layout'
import Link from 'next/link'

const Custom404: NextPage = () => {
  return (<Layout content="404 Page">
    <Box style={{
      minHeight: "90vh"
    }} display={"flex"} alignItems="center" justifyContent={"center"}>
      <Stack align="center" justify={"center"}>
      <Heading>404 - Not Found</Heading>
        <Text>
          Tell us how you got here on our{' '}
          <a href="https://discord.com/invite/UKCS9ghzUE" target="_blank" rel="noreferrer">
            discord
          </a>
          .
        </Text>
        <Text>
          Go back to safety of{' '}
          <Link
            href="/"
            style={{
              color: '#fff',
            }}
          >
            homepage
          </Link>
          .
        </Text>
      </Stack>
      </Box>
    </Layout>
  )
}

export default Custom404
