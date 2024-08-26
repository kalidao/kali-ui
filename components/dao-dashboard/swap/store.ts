import { getProvider } from '@utils/getProvider'
import { create } from 'zustand'
import { SWAP_ABI } from '@abi/KaliDAOcrowdsaleV2'
import { KALIDAO_ABI } from '@abi/KaliDAO'
import { erc20Abi } from 'viem'
import { ethers, BigNumber } from 'ethers'
import { addresses } from '@constants/addresses'
import { zeroAddress } from 'viem'
import { convertIpfsHash } from '@utils/convertIpfsHash'

interface SwapState {
  chainId: number
  consent: boolean
  background: any
  setBackground: (address: string) => void
  setConsent: () => void
  setChainId: (chainId: number) => void
  user: {
    address?: string
    tokenBalance: any
  }
  setUser: (tokenAddress: string, address: string, chainId: number) => void
  dao: {
    address: string
    name: string
    symbol: string
    decimals: number
  }
  setDAO: (address: string, chainId: number) => void
  token: {
    address: string
    name: string
    symbol: string
    decimals: number
  }
  setToken: (address: string, chainId: number) => void
  approved: boolean
  setApproved: (userAddress: string, tokenAddress: string, swapAddress: string, chainId: number) => void
  swap: {
    address: string
    listId: number
    purchaseMultiplier: number
    saleEnds: number
    purchaseAsset: string
    purchaseLimit: number
    personalLimit: number
    details: string
    type?: 'PUBLIC' | 'PRIVATE'
  }
  setSwap: (address: string, chainId: number) => void
  success: boolean
  setSuccess: (success: boolean) => void
}

export const useSwapStore = create<SwapState>((set) => ({
  chainId: 1,
  setChainId: (chainId) => set({ chainId }),
  consent: false,
  setConsent: () => set((state) => ({ consent: !state.consent })),
  background: null,
  setBackground: async (address) => {
    if (!address) return
    const data = await fetch(`https://imxoahmacbkavjzdzzoz.supabase.co/rest/v1/DAO?address=eq.${address}&select=*`, {
      headers: {
        apiKey: process.env.NEXT_PUBLIC_DAO_API_KEY as string,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_DAO_API_KEY as string}`,
        Range: '0-9',
      },
    }).then((res) => res.json())
    const sale = await fetch(data?.[0]?.crowdsale).then((res) => res.json())

    set({ background: sale.background })
  },
  user: {
    tokenBalance: 0,
  },
  setUser: async (tokenAddress, address, chainId) => {
    console.log('setUser', tokenAddress, address, chainId)
    if (tokenAddress == zeroAddress || tokenAddress.toLowerCase() == '0x000000000000000000000000000000000000dead') {
      try {
        const provider = getProvider(chainId)
        const balance = await provider.getBalance(address)
        set({ user: { address: address, tokenBalance: balance } })
        return
      } catch (e) {
        console.log('setUser eth error', e)
        return
      }
    }
    console.log('setUser token', tokenAddress, address, chainId)
    const provider = getProvider(chainId)
    const contract = new ethers.Contract(tokenAddress, erc20Abi, provider)
    const balance = await contract.balanceOf(address)
    console.log('balance', balance)
    set({ user: { address: address, tokenBalance: balance } })
  },
  dao: {
    address: '',
    name: '',
    symbol: '',
    decimals: 0,
  },
  setDAO: async (address, chainId) => {
    const provider = getProvider(chainId)
    const contract = new ethers.Contract(address, KALIDAO_ABI, provider)
    const name = await contract.name()
    const symbol = await contract.symbol()
    const decimals = await contract.decimals()
    set({ dao: { address, name, symbol, decimals } })
  },
  token: {
    address: '',
    name: '',
    symbol: '',
    decimals: 0,
    approved: false,
  },
  setToken: async (address, chainId) => {
    if (address == zeroAddress || address.toLowerCase() == '0x000000000000000000000000000000000000dead') {
      set({ token: { address, name: 'Ether', symbol: 'ETH', decimals: 18 } })
      return
    }

    const provider = getProvider(chainId)
    const contract = new ethers.Contract(address, erc20Abi, provider)
    const name = await contract.name()
    const symbol = await contract.symbol()
    const decimals = await contract.decimals()

    set({ token: { address, name, symbol, decimals } })
  },
  approved: false,
  setApproved: async (userAddress, tokenAddress, swapAddress, chainId) => {
    if (tokenAddress == zeroAddress || tokenAddress.toLowerCase() == '0x000000000000000000000000000000000000dead') {
      set({ approved: true })
      return
    }

    const provider = getProvider(chainId)
    const contract = new ethers.Contract(tokenAddress, erc20Abi, provider)
    const allowance = await contract.allowance(userAddress, swapAddress)
    set({ approved: allowance > BigNumber.from(0) })
  },
  swap: {
    address: '',
    listId: 0,
    purchaseMultiplier: 0,
    saleEnds: 0,
    purchaseAsset: '',
    purchaseLimit: 0,
    personalLimit: 0,
    details: '',
  },
  setSwap: async (address, chainId) => {
    const provider = getProvider(chainId)
    const contract = new ethers.Contract(addresses[chainId].extensions.crowdsale2, SWAP_ABI, provider)
    const swap = await contract.crowdsales(address)
    let details = swap.details.slice(0, 3) === 'http' ? swap.details : convertIpfsHash(swap.details)

    set({
      swap: {
        address: addresses[chainId].extensions.crowdsale2,
        listId: Number(swap.listId),
        purchaseMultiplier: Number(swap.purchaseMultiplier),
        saleEnds: Number(swap.saleEnds),
        purchaseAsset: swap.purchaseAsset,
        purchaseLimit: swap.purchaseLimit,
        personalLimit: swap.personalLimit,
        details: details,
        type: Number(swap.listId) === 0 ? 'PUBLIC' : 'PRIVATE',
      },
    })
  },
  success: false,
  setSuccess: (yasss) => set({ success: yasss }),
}))
