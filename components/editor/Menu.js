import { BubbleMenu } from '@tiptap/react'
import { css, styled } from '../../styles/stitches.config'
import { FontBoldIcon, FontItalicIcon, StrikethroughIcon } from '@radix-ui/react-icons'

const bubbles = css({
  backgroundColor: '$mauve12',
  borderRadius: '10px',
  fontSize: '16px',
  padding: '5px',
})

const Item = styled('button', {
  border: 'none',
  backgroundColor: 'none',
  color: '$gray1',
  padding: '5px',
  borderRadius: '100%',
  height: '30px',
  width: '30px',

  '&:hover': {
    backgroundColor: '$mauve11',
  },
})

export default function Menu({ editor }) {
  return (
    <>
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} className={bubbles()}>
          <Item
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
          >
            <FontBoldIcon />
          </Item>
          <Item
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
          >
            <FontItalicIcon />
          </Item>
          <Item
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            <StrikethroughIcon />
          </Item>
        </BubbleMenu>
      )}
    </>
  )
}
