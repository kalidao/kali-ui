import React from 'react'
import { Button, Text, Field, IconClose, Box, IconUpload, FileInput } from '@kalidao/reality'
import * as styles from './styles.css'

type Props = {
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>
  label: string
  description?: string
  labelSecondary?: React.ReactNode
}

const FileUploader = ({ setFile, label, description, labelSecondary }: Props) => {
  return (
    <Field label={label} description={description} labelSecondary={labelSecondary}>
      <FileInput onChange={(file) => setFile(file)} accept="application/pdf">
        {(context) =>
          context.name ? (
            <Box className={styles.container}>
              <Text>{context.name}</Text>
              <Button
                size="small"
                variant="transparent"
                suffix={<IconClose />}
                onClick={(e) => {
                  e.preventDefault()

                  context.reset(e)
                  setFile(undefined)
                }}
              >
                Remove
              </Button>
            </Box>
          ) : (
            <Box className={styles.container}>
              <IconUpload />
              <Text>{context.droppable ? 'Drop file' : 'Attach file'}</Text>
            </Box>
          )
        }
      </FileInput>
    </Field>
  )
}

export default FileUploader
