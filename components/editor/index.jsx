import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { BubbleMenu } from '@tiptap/react'
import { FontBoldIcon, FontItalicIcon, StrikethroughIcon } from '@radix-ui/react-icons'
import * as styles from './editor.css'
import { Field, Button, Box } from '@kalidao/reality'

export default function Editor({ setContent }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `
      <p>
        Provide a detailed description of your proposal here!
      </p>
    `,
    onUpdate({ editor }) {
      console.log('editor', editor.getJSON())
      setContent(editor.getJSON())
    },
  })

  return (
    <Box>
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} className={styles.bubbles}>
          <Button
            shape="circle"
            size="small"
            variant="transparent"
            onClick={() => editor.chain().focus().toggleBold('bold').run()}
          >
            <FontBoldIcon />
          </Button>
          <Button
            shape="circle"
            size="small"
            variant="transparent"
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <FontItalicIcon />
          </Button>
          <Button
            shape="circle"
            size="small"
            variant="transparent"
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <StrikethroughIcon />
          </Button>
        </BubbleMenu>
      )}
      <Field label="Description (Optional)">
        <EditorContent className={styles.editor} editor={editor} />
      </Field>
    </Box>
  )
}
