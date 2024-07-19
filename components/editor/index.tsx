import { useEditor, EditorContent, JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { BubbleMenu } from '@tiptap/react'
import { Bold, Italic, Strikethrough } from 'lucide-react'
import { Button } from '@components/ui/button'
import { Label } from '@components/ui/label'

type Props = {
  setContent: React.Dispatch<React.SetStateAction<JSONContent>>
  placeholder?: string
  label?: string
  description?: string
}

export default function Editor({ placeholder, label = 'Description (Optional)', description, setContent }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: ``,
    onUpdate({ editor }) {
      setContent(editor.getJSON())
    },
  })

  return (
    <div className="space-y-2">
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className="flex bg-background border rounded-md shadow-sm"
        >
          <Button variant="ghost" size="sm" className="p-1" onClick={() => editor.chain().focus().toggleBold().run()}>
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="p-1" onClick={() => editor.chain().focus().toggleItalic().run()}>
            <Italic className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="p-1" onClick={() => editor.chain().focus().toggleStrike().run()}>
            <Strikethrough className="h-4 w-4" />
          </Button>
        </BubbleMenu>
      )}
      <div className="space-y-1">
        <Label>{label}</Label>
        {description && <p className="text-sm text-gray-500">{description}</p>}
        <EditorContent
          placeholder={placeholder}
          className="min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          editor={editor}
        />
      </div>
    </div>
  )
}
