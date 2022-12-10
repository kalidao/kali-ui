import { useEditor, EditorContent, JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { BubbleMenu } from '@tiptap/react'
import { FontBoldIcon, FontItalicIcon, StrikethroughIcon } from '@radix-ui/react-icons'
import * as styles from './editor.css'
import { Field, Button, Box } from '@kalidao/reality'
import LexyComplete from './LexyComplete'
import suggestion from './suggestions'

type Props = {
  setContent: React.Dispatch<React.SetStateAction<JSONContent>>
  placeholder?: string
  label?: string
  description?: string
}

export default function Editor({ placeholder, label = 'Description (Optional)', description, setContent }: Props) {
  const editor = useEditor({
    extensions: [StarterKit, LexyComplete.configure({
      suggestion,
    })],
    content: ``,
    onUpdate({ editor }) {
      setContent(editor.getJSON())
    },
  })

  // autocomplete with gpt


  return (
    <Box>
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} className={styles.bubbles}>
          <Button
            shape="circle"
            size="small"
            variant="transparent"
            onClick={() => editor.chain().focus().toggleBold().run()}
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
      <Field label={label} description={description}>
        <EditorContent placeholder={placeholder} className={styles.editor} editor={editor} />
      </Field>
    </Box>
  )
}
