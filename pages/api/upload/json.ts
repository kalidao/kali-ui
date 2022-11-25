import type { NextApiRequest, NextApiResponse } from 'next'

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

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  pinata
    .pinJSONToIPFS(_req.body, options)
    .then((result: any) => {
      //handle results here
      console.log(result)
      return res.status(200).json(result)
    })
    .catch((e: any) => {
      //handle error here
      console.log(e)
    })
}
