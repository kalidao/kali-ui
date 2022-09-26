import "little-state-machine";

declare module "little-state-machine" {
    interface GlobalState {
        name: string,
        symbol: string,
        hardMode: boolean,
        votingPeriod: number,
        votingPeriodUnit: string,
        quorum: number,
        approval: number,
        transferability: boolean,
        redemption: false,
        redemptionStart: Date,
        crowdsale: boolean,
        purchaseToken: string,
        purchaseLimit: number,
        personalLimit: number,
        purchaseMultiplier: number,
        crowdsaleEnd: Date,
        legal: boolean,
        docType: string,
        founders: {
            member: string,
            share: string
        }[]
    }
}