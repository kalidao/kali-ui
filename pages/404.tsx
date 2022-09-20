import { NextPage } from "next"
import { Text, Flex, Box } from "@design/elements"
import Link from "next/link"

const Custom404: NextPage = () => {
    return <Flex css={{
        minHeight: '100vh',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '5px'
    }}>
        <h1>404 - Not Found</h1>
        <Box css={{
            background: '$gray2',
            height: '2px',
            width: '25vw',
            marginBottom: '10px'
        }}></Box>
        <Flex css={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '5px'
        }}>
            <Text>Tell us how you got here on our <a href="https://discord.com/invite/UKCS9ghzUE" target="_blank" rel="noreferrer">discord</a>.</Text>
            <Text>Go back to safety of <Link href="/" style={{
                color: '#fff'
            }}>homepage</Link>.</Text>
        </Flex>
    </Flex>
}

export default Custom404