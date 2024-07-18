import React from 'react'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { X, Upload } from 'lucide-react'

type Props = {
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>
  label: string
  description?: string
}

const FileUploader = ({ setFile, label, description }: Props) => {
  const [fileName, setFileName] = React.useState<string>('')

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFile(file)
      setFileName(file.name)
    }
  }

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setFile(undefined)
    setFileName('')
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="file-upload">{label}</Label>
      {description && <p className="text-sm text-gray-500">{description}</p>}
      <div className="flex items-center space-x-2">
        <Input id="file-upload" type="file" onChange={handleFileChange} accept="application/pdf" className="hidden" />
        {fileName ? (
          <>
            <span className="flex-grow truncate">{fileName}</span>
            <Button size="sm" variant="ghost" onClick={handleRemove}>
              <X className="h-4 w-4 mr-2" />
              Remove
            </Button>
          </>
        ) : (
          <label
            htmlFor="file-upload"
            className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
          >
            <span className="flex items-center space-x-2">
              <Upload className="w-6 h-6 text-gray-600" />
              <span className="font-medium text-gray-600">Click to upload or drag and drop</span>
            </span>
          </label>
        )}
      </div>
    </div>
  )
}

export default FileUploader
