import { getProvider } from '@utils/getProvider'
import create from 'zustand'
import SWAP_ABI from '@abi/KaliDAOcrowdsaleV2.json'
import DAO_ABI from '@abi/KaliDAO.json'
import { erc20ABI } from 'wagmi'
import { ethers } from 'ethers'
import { addresses } from '@constants/addresses'

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
}

export const useSwapStore = create<SwapState>((set) => ({
  chainId: 1,
  setChainId: (chainId) => set({ chainId }),
  consent: false,
  setConsent: () => set((state) => ({ consent: !state.consent })),
  background: null,
  setBackground: async (address) => {
    const data = await fetch(`https://imxoahmacbkavjzdzzoz.supabase.co/rest/v1/DAO?address=eq.${address}&select=*`, {
      headers: {
        apiKey: process.env.NEXT_PUBLIC_DAO_API_KEY as string,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_DAO_API_KEY as string}`,
        Range: '0-9',
      },
    }).then((res) => res.json())
    if (!data?.[0]?.background) return null
    const sale = await fetch(data?.[0]?.crowdsale).then((res) => res.json())
    return sale.background
  },
  user: {
    tokenBalance: 0,
  },
  setUser: async (tokenAddress, address, chainId) => {
    const provider = getProvider(chainId)
    const contract = new ethers.Contract(tokenAddress, erc20ABI, provider)
    const balance = await contract.balanceOf(address)
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
    const contract = new ethers.Contract(address, DAO_ABI, provider)
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
  },
  setToken: async (address, chainId) => {
    const provider = getProvider(chainId)
    const contract = new ethers.Contract(address, erc20ABI, provider)

    const name = await contract.name()
    const symbol = await contract.symbol()
    const decimals = await contract.decimals()
    set({ token: { address, name, symbol, decimals } })
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
    set({
      swap: {
        address: addresses[chainId].extensions.crowdsale2,
        listId: Number(swap.listId),
        purchaseMultiplier: Number(swap.purchaseMultiplier),
        saleEnds: Number(swap.saleEnds),
        purchaseAsset: swap.purchaseAsset,
        purchaseLimit: swap.purchaseLimit,
        personalLimit: swap.personalLimit,
        details: swap.details,
        type: Number(swap.listId) === 0 ? 'PUBLIC' : 'PRIVATE',
      },
    })
  },
}))
