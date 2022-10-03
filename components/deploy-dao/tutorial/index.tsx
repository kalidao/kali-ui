import { Dialog, DialogTrigger, DialogContent, DialogClose } from '@design/Dialog'
import { IconBookOpen, Button } from '@kalidao/reality'

const Tutorial = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button prefix={<IconBookOpen />} variant="secondary">
          Tutorial
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogClose />
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: '0' }}>
          <iframe
            src="https://www.loom.com/embed/76197b675b714316a752c895451381e2"
            frameBorder="0"
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
            }}
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Tutorial
