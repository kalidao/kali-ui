import { useEffect, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import { Separator } from '@components/ui/separator'
import { Info } from 'lucide-react'
import { useSwapStore } from './store'
import StarterKit from '@tiptap/starter-kit'
import { generateHTML } from '@tiptap/react'

export default function Why() {
  const dao = useSwapStore((state) => state.dao)
  const background = useSwapStore((state) => state.background)
  const setBackground = useSwapStore((state) => state.setBackground)

  const output = useMemo(() => {
    if (background != null) {
      return generateHTML(background, [StarterKit])
    } else {
      return null
    }
  }, [background])

  useEffect(() => {
    if (!dao?.address) return
    setBackground(dao.address)
  }, [dao, setBackground])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Info className="mr-2" size={24} />
          Why should I swap?
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="pt-6">
        {output && output != null && (
          <div className="text-sm text-gray-700 break-words" dangerouslySetInnerHTML={{ __html: output }} />
        )}
      </CardContent>
    </Card>
  )
}
