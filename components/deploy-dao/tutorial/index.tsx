import { Dialog } from '@design/Dialog'
import { Box, IconBookOpen, Button } from '@kalidao/reality'

const Tutorial = () => {
  return (
    <Dialog title="Tutorial" description="If you have any questions after watching this deployment walkthrough. You may contact us on our discord at https://discord.gg/e9cqr6MEwR." trigger={
      <Button prefix={<IconBookOpen />} variant="secondary">
          Tutorial
        </Button>
    }>
        <Box position={"relative"} paddingBottom="96" height="0" >
          <iframe
            src="https://www.loom.com/embed/76197b675b714316a752c895451381e2"
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
            }}
          ></iframe>
        </Box>
    </Dialog>
  )
}

export default Tutorial
