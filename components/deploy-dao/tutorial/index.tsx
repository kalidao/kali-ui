import { Button } from '@components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog'
import { BookOpen } from 'lucide-react'

const Tutorial = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          Tutorial
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tutorial</DialogTitle>
          <DialogDescription>
            If you have any questions after watching this deployment walkthrough, you may contact us on our discord at
            https://discord.gg/e9cqr6MEwR.
          </DialogDescription>
        </DialogHeader>
        <div className="relative pb-[56.25%] h-0">
          <iframe
            src="https://www.loom.com/embed/76197b675b714316a752c895451381e2"
            className="absolute top-0 left-0 w-full h-full"
            allowFullScreen
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Tutorial
