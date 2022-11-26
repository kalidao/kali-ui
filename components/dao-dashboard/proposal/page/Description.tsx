import React, { useMemo } from 'react'
import StarterKit from '@tiptap/starter-kit'
import { Box, Text } from '@kalidao/reality'
import { generateHTML } from '@tiptap/react'

// TODO: description types
type Props = {
  description: any
  isSchema: boolean
  short?: boolean
}

export default function Description({ description, isSchema, short }: Props) {
  const output = useMemo(() => {
    if (isSchema && description != undefined) {
      return generateHTML(description, [StarterKit])
    } else {
      return null
    }
  }, [description, isSchema])

  // <Text as="p" wordBreak="break-word" whiteSpace="pre-line" ellipsis></Text>
  if (short) {
    return (
      <Box width="full">
        {isSchema ? (
          output && (
            <Text as="p" wordBreak="break-word" whiteSpace="pre-line" ellipsis>
              <div dangerouslySetInnerHTML={{ __html: output }}></div>
            </Text>
          )
        ) : description.length > 0 ? (
          <Text as="p" wordBreak="break-word" whiteSpace="pre-line" ellipsis>
            {description}
          </Text>
        ) : (
          <Text as="p" wordBreak="break-word" whiteSpace="pre-line" ellipsis>
            No description.
          </Text>
        )}
      </Box>
    )
  }

  return (
    <Box width="full">
      {/* TODO: output could be anything, sanitize?  */}
      {isSchema ? (
        output && (
          <Text color="foreground">
            <div dangerouslySetInnerHTML={{ __html: output }}></div>
          </Text>
        )
      ) : description.length > 0 ? (
        <Text color="foreground" whiteSpace="pre-line">
          {description}
        </Text>
      ) : (
        <Text>No description.</Text>
      )}
    </Box>
  )
}
