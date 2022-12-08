import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const { dao, extension, chainId, payload, amount } = _req.body
    let result = {}

    return res.status(200).json(result)
  } catch (e: any) {
    res.status(500).json({ error: e?.message })
  }
}
