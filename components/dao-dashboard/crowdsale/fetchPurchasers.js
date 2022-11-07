import { useState } from 'react'
import { ethers } from 'ethers'
import { addresses } from '../../../constants/addresses'
import CROWDSALE_ABI from '../../../abi/KaliDAOcrowdsaleV2.json'
import { getProvider } from '../../../utils/getProvider'

export async function fetchPurchasers(dao, chainId) {
  const provider = getProvider(chainId)
  const instance = new ethers.Contract(addresses[chainId]['extensions']['crowdsale2'], CROWDSALE_ABI, provider)

  const purchasers = await instance.checkPurchasers(dao)

  let _purchasers = []
  let _totalDistributed = 0

  for (let i = 0; i < purchasers.length; i++) {
    const _purchaser = purchasers[i]
    const _swap = await instance.checkPersonalPurchased(_purchaser, dao)
    // console.log(ethers.utils.formatEther(_swap))
    _totalDistributed = _totalDistributed + Number(ethers.utils.formatEther(_swap))

    _purchasers.push({
      purchaser: _purchaser,
      purchased: Number(ethers.utils.formatEther(_swap)),
    })
  }

  return { _purchasers, _totalDistributed }
}
