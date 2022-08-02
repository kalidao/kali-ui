import { EditorContent } from '@tiptap/react'
import { Flex } from '../../styles/elements'
import Menu from './Menu'

export default function Editor({ editor }) {
  return (
    <Flex>
      <Menu editor={editor} />
      <EditorContent editor={editor} />
    </Flex>
  )
}
