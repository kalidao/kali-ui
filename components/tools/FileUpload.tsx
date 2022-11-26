import React, { useState } from 'react'
import { Stack, Button, IconUpload } from '@kalidao/reality'

const FileUploader = (props: any) => {
  const [hasFile, setHasFile] = useState(false)
  const hiddenFileInput = React.useRef(null)

  const handleClick = (e) => {
    e.preventDefault()
    if (!hiddenFileInput) return
    hiddenFileInput.current.click()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (!e.target.files) return
    const fileUploaded = e.target.files[0]
    props.setFile(fileUploaded)
    setHasFile(true)
  }

  return (
    <>
      {hasFile ? (
        <Stack>
          <Button variant="transparent" disabled={true}>
            Got it!
          </Button>
          <input style={{ width: '30px', display: 'none' }} type="file" ref={hiddenFileInput} onChange={handleChange} />
        </Stack>
      ) : (
        <Stack>
          <Button variant="transparent" onClick={handleClick}>
            Upload <IconUpload />
          </Button>
          <input style={{ width: '30px', display: 'none' }} type="file" ref={hiddenFileInput} onChange={handleChange} />
        </Stack>
      )}
    </>
  )
}

export default FileUploader
