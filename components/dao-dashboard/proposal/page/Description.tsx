import React, { useMemo } from 'react'
import StarterKit from '@tiptap/starter-kit'
import { Box, Text } from '@kalidao/reality'
import { generateHTML } from '@tiptap/react'

// TODO: description types
type Props = {
  type?: string
  description: any
  isSchema: boolean
  short?: boolean
}

export default function Description({ type, description, isSchema, short }: Props) {
  const output = useMemo(() => {
    if (isSchema && description != undefined) {
      return generateHTML(description, [StarterKit])
    } else {
      return null
    }
  }, [description, isSchema])

  // <Text as="p" wordBreak="break-word" whiteSpace="pre-line" ellipsis></Text>
  if (short) {
    if (type === 'DOCS') {
      return (
        <Box width="full" height={'20'} marginTop="5">
          <Text as="p" wordBreak="break-word" whiteSpace="pre-line" ellipsis>
            This will update the docs for this DAO. Expand to review the details.
          </Text>
        </Box>
      )
    }
    return (
      <Box width="full" maxHeight={'20'} overflow="hidden">
        {isSchema ? (
          output && (
            <Text as="p" wordBreak="break-word" color="text" whiteSpace="pre-line" ellipsis>
              <div
                dangerouslySetInnerHTML={{ __html: output }}
                style={{
                  height: 60,
                }}
              ></div>
            </Text>
          )
        ) : description.length > 0 ? (
          <Text as="p" wordBreak="break-word" color="text" whiteSpace="pre-line" ellipsis>
            {description}
          </Text>
        ) : (
          <Text as="p" wordBreak="break-word" color="text" whiteSpace="pre-line" ellipsis>
            No description.
          </Text>
        )}
      </Box>
    )
  }

  return (
    <Box width={{ xs: 'full', md: '128', lg: '224' }}>
      {/* TODO: output could be anything, sanitize?  */}
      {isSchema ? (
        output && (
          <Text color="text">
            <div dangerouslySetInnerHTML={{ __html: output }}></div>
          </Text>
        )
      ) : description.length > 0 ? (
        <Text color="text" whiteSpace="pre-line">
          {description}
        </Text>
      ) : (
        <Text color="text">No description.</Text>
      )}
    </Box>
  )
}
