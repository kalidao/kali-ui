import create from 'zustand'
import DAO_ABI from '@abi/KaliDAO.json'
import { getProvider } from '@utils/getProvider'
import { ethers } from 'ethers'

interface DaoStore {
  address: string
  name: string
  symbol: string
  decimals: number
  chainId: number
  abi: any
  setDao: (address: string, chainId: number) => void
}

export const useDaoStore = create<DaoStore>((set) => ({
  address: '',
  name: '',
  symbol: '',
  decimals: 18,
  chainId: 1,
  abi: DAO_ABI,
  setDao: async (address: string, chainId: number) => {
    const provider = getProvider(chainId)
    const contract = new ethers.Contract(address, DAO_ABI, provider)
    const name = await contract.name()
    const symbol = await contract.symbol()

    set({ address, chainId, name, symbol })
  },
}))
