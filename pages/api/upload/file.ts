import type { NextApiRequest, NextApiResponse } from 'next'
import * as fs from 'fs'
import formidable, { File } from 'formidable'
import { pinataOptions } from '../../../constants/pinata'

export const config = {
  api: {
    bodyParser: false,
  },
}

type ProcessedFiles = Array<[string, File]>

const pinataSDK = require('@pinata/sdk')
const pinata = pinataSDK(process.env.PINATA_KEY, process.env.PINATA_SECRET)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const files = await new Promise<ProcessedFiles>((resolve, reject) => {
      const form = new formidable.IncomingForm()
      const files: ProcessedFiles = []
      form.on('file', function (field, file) {
        files.push([field, file])
      })
      form.on('end', () => resolve(files))
      form.on('error', (err) => reject(err))
      form.parse(req, () => {
        //
      })
    })

    if (files.length === 0) {
      return res.status(400).json({ status: 'fail', message: 'No files were uploaded' })
    }

    const results = await Promise.all(
      files.map(async (file) => {
        const readableStreamForFile = fs.createReadStream(file[1].filepath)
        try {
          const result = await pinata.pinFileToIPFS(readableStreamForFile, pinataOptions)
          return result
        } catch (error) {
          console.error('Error pinning file to IPFS:', error)
          throw error
        }
      }),
    )

    return res.status(200).json({ status: 'ok', message: 'Files were uploaded successfully', results })
  } catch (error) {
    console.error('Upload error:', error)
    return res.status(500).json({ status: 'fail', message: 'Upload error', error: error.message })
  }
}
