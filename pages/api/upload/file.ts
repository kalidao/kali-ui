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

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  let status = 200,
    resultBody = { status: 'ok', message: 'Files were uploaded successfully' }

  console.log('Uploading files...', _req)
  const files = await new Promise<ProcessedFiles | undefined>((resolve, reject) => {
    const form = new formidable.IncomingForm()
    const files: ProcessedFiles = []
    form.on('file', function (field, file) {
      files.push([field, file])
    })
    form.on('end', () => resolve(files))
    form.on('error', (err) => reject(err))
    form.parse(_req, () => {
      //
    })
  }).catch((e) => {
    status = 500
    resultBody = {
      status: 'fail',
      message: 'Upload error',
    }
  })

  if (files?.length) {
    for (const file of files) {
      const readableStreamForFile = fs.createReadStream(file[1].filepath)
      pinata
        .pinFileToIPFS(readableStreamForFile, pinataOptions)
        .then((result: any) => {
          //handle results here
          status = 200
          resultBody = result
          return res.status(status).json(resultBody)
        })
        .catch((e: any) => {
          //handle error here
          status = 500
          resultBody = e
          return res.status(status).json(resultBody)
        })
    }
  }
}
