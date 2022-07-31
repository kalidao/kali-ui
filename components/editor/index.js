import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Flex } from '../../styles/elements'
import Menu from './Menu'
import { css } from '../../styles/stitches.config'
import styles from './editor.module.css'

const editorStyles = css({
  all: 'unset',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 10px',
  height: '20rem',
  width: '100%',
  fontSize: '16px',
  lineHeight: 1,
  color: '$gray12',
  backgroundColor: '$gray2',
  border: '1px solid $gray3',
  fontFamily: 'Regular',

  '&:hover': {
    color: '$gray12',
    backgroundColor: '$gray2',
    border: '1px solid $gray4',
  },

  '&:focus': {
    color: '$gray12',
    backgroundColor: '$gray2',
    border: '1px solid $gray4',
  },
})

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
