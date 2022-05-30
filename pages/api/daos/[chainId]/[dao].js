import { getDao } from '../../../../graph/queries/getDao';

export default async function handler(req, res) {
  const { chainId, address } = req.query
  const dao = await getDao(chainId, address)
  res.status(200).send(dao)
}