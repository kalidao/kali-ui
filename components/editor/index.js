import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Flex } from '../../styles/elements'
import Menu from './Menu'
import { css } from '../../styles/stitches.config'
import styles from './editor.module.css'

export default function Editor({}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        HTMLAttributes: {
          class: styles.editor,
        },
      }),
    ],
    content: '<p>Describe your proposal now.</p>',
    injectCSS: false,
  })

  return (
    <Flex>
      <Menu editor={editor} />
      <EditorContent editor={editor} />
    </Flex>
  )
}
