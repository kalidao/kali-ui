import 'little-state-machine'

declare module 'little-state-machine' {
  interface GlobalState {
    name: string
    symbol: string
    hardMode: boolean
    votingPeriod: number
    votingPeriodUnit: string
    quorum: number
    approval: number
    transferability: boolean
    redemption: boolean
    redemptionStart: string
    crowdsale: boolean
    purchaseToken: string
    customTokenAddress: string
    purchaseLimit: number
    personalLimit: number
    purchaseMultiplier: number
    crowdsaleEnd: string
    legal: boolean
    docType: string
    email: string
    mission: string
    existingDocs: string
    founders: {
      member: string
      share: string
    }[]
  }
}
