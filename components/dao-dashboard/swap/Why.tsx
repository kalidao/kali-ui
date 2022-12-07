import { Progress } from '@design/Progress'
import { Card, Stack, Text, Heading, Divider, Field } from '@kalidao/reality'
import { prettyDate } from '@utils/prettyDate'
import { ethers } from 'ethers'
import { useEffect } from 'react'
import { useSwapStore } from './store'
import StarterKit from '@tiptap/starter-kit'
import { generateHTML } from '@tiptap/react'
import { useMemo } from 'react'

export default function Why() {  
    const dao = useSwapStore((state) => state.dao)
    const background = useSwapStore((state) => state.background)
    const setBackground = useSwapStore((state) => state.setBackground)

    const output = useMemo(() => {
        if (background != null) {
          return generateHTML(background, [StarterKit])
        } else {
          return null
        }
      }, [background])

    useEffect(() => {
        if (!dao) return
        setBackground(dao.address)
    })

    return <Card padding="6"><Stack>
        <Heading>Why should I swap?</Heading>
        <Divider />
        {output && output != null && <Text color="text">
            <div dangerouslySetInnerHTML={{ __html: output }}></div>
          </Text>}
        </Stack>
    </Card>
}

