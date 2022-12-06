import create from 'zustand'

interface SwapState {
    dao: {
        address: string
        name: string
        symbol: string 
        decimals: number
    },
    token: {
        address: string
        name: string 
        symbol: string 
        decimals: number
    },
    swap: {
        
    }
}
