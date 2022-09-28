import { EditorContent } from '@tiptap/react'
import Menu from './Menu'
import { Box } from '@kalidao/reality'

export default function Editor({ editor }) {
  return (
    <Box width="2/3">
      <Menu editor={editor} />
      <EditorContent editor={editor} />
    </Box>
  )
}
