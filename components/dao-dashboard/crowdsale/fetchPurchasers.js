import { useState } from 'react'
import { ethers } from 'ethers'
import { addresses } from '../../../constants/addresses'
import CROWDSALE_ABI from '../../../abi/KaliDAOcrowdsaleV2.json'

export async function fetchPurchasers(dao, chainId) {
  const provider = new ethers.providers.InfuraProvider(Number(chainId), process.env.NEXT_PUBLIC_INFURA_ID)
  const instance = new ethers.Contract(addresses[chainId]['extensions']['crowdsale2'], CROWDSALE_ABI, provider)

  //   const crowdsale = await instance.crowdsales(dao)

  //   const listId = crowdsale.listId
  //   const purchaseAsset = crowdsale.purchaseAsset
  //   const purchaseLimit = crowdsale.purchaseLimit
  //   const personalLimit = crowdsale.personalLimit
  //   const purchaseTotal = crowdsale.purchaseTotal
  //   const purchaseMultiplier = crowdsale.purchaseMultiplier
  //   const details = crowdsale.details

  const purchasers = await instance.checkPurchasers(dao)

  let _purchasers = []
  let _totalDistributed = 0

  console.log(purchasers)
  for (let i = 0; i < purchasers.length; i++) {
    const _purchaser = purchasers[i]
    const _swap = await instance.checkPersonalPurchased(_purchaser, dao)
    console.log(ethers.utils.formatEther(_swap))
    _totalDistributed = _totalDistributed + Number(ethers.utils.formatEther(_swap))

    _purchasers.push({
      purchaser: _purchaser,
      purchased: Number(ethers.utils.formatEther(_swap)),
    })
  }

  return { _purchasers, _totalDistributed }
}
