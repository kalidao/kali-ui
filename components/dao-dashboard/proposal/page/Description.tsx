import React, { useMemo } from 'react'
import StarterKit from '@tiptap/starter-kit'
import { generateHTML } from '@tiptap/react'
import { ScrollArea } from '@components/ui/scroll-area'
import { FileText } from 'lucide-react'

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

  if (short) {
    if (type === 'DOCS') {
      return (
        <div className="w-full h-20 mt-5 p-4">
          <p className="break-words whitespace-pre-line overflow-hidden text-ellipsis">
            This will update the docs for this DAO. Expand to review the details.
          </p>
        </div>
      )
    }
    return (
      <div className="w-full h-20 overflow-hidden p-4">
        {isSchema ? (
          output && (
            <div
              className="break-words text-foreground whitespace-pre-line overflow-hidden text-ellipsis h-[60px]"
              dangerouslySetInnerHTML={{ __html: output }}
            />
          )
        ) : description.length > 0 ? (
          <p className="break-words text-foreground whitespace-pre-line overflow-hidden text-ellipsis">{description}</p>
        ) : (
          <p className="break-words text-foreground whitespace-pre-line overflow-hidden text-ellipsis">
            No description.
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="w-full md:w-128 lg:w-224 p-4">
      <ScrollArea className="h-[300px]">
        {isSchema ? (
          output && <div className="text-foreground" dangerouslySetInnerHTML={{ __html: output }} />
        ) : description.length > 0 ? (
          <p className="text-foreground whitespace-pre-line">{description}</p>
        ) : (
          <div className="flex items-center text-foreground">
            <FileText className="mr-2" />
            <span>No description.</span>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
