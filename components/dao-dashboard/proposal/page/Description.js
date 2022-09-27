import React, { useMemo } from 'react'
import StarterKit from '@tiptap/starter-kit'
import { Text } from '@kalidao/reality'
import { generateHTML } from '@tiptap/react'

export default function Description({ description, isSchema }) {
  const output = useMemo(() => {
    if (isSchema && description != undefined) {
      return generateHTML(description, [StarterKit])
    } else {
      return null
    }
  }, [description, isSchema])

  return (
    <>
      {/* TODO: output could be anything, sanitize?  */}
      {isSchema ? (
        output && (
          <Text color="foreground" responsive>
            <div dangerouslySetInnerHTML={{ __html: output }}></div>
          </Text>
        )
      ) : description.length > 0 ? (
        <Text color="foreground" responsive>
          {description}
        </Text>
      ) : (
        <Text
          responsive
          css={{
            color: '$gray300',
          }}
        >
          No description.
        </Text>
      )}
    </>
  )
}
