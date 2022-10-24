import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

const pinataSDK = require('@pinata/sdk')
const pinata = pinataSDK(process.env.PINATA_KEY, process.env.PINATA_SECRET)

const options = {
  pinataMetadata: {
    name: 'Wrappr',
  },
  pinataOptions: {
    cidVersion: 0,
  },
}

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  let status = 200,
    resultBody = { status: 'ok', message: 'Files were uploaded successfully' }

  const readableStreamForFile = fs.createReadStream(_req.body)
  pinata
    .pinFileToIPFS(readableStreamForFile, options)
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

