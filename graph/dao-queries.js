import { gql } from 'graphql-request'

export const DAO_MEMBERS = gql`
  query daoMemberQuery($dao: ID!) {
    daos(where: { id: $dao }) {
      members {
        address
        shares
      }
      token {
        totalSupply
      }
    }
  }
`

export const DAO_PROPOSALS = gql`
  query daoProposalQuery($dao: ID!) {
    daos(where: { id: $dao }) {
      proposals {
        serial
        proposer
        proposalType
        description
        sponsor
        sponsored
        status
        votes {
          voter
          vote
        }
        creationTime
      }
    }
  }
`

export const CHECK_APPS = gql`
  query daoCheckAppsQuery($dao: ID!) {
    daos(where: { id: $dao }) {
      crowdsale {
        active
        saleEnds
      }
      tribute {
        active
      }
      redemption {
        active
        starts
      }
    }
  }
`

// votingPeriod to calculate when proposal ends
export const FETCH_PROPOSAL = gql`
  query fetchProposalQuery($dao: ID!, $serial: BigInt!) {
    proposals(where: { dao: $dao, serial: $serial }) {
      id
      dao {
        address
        votingPeriod
      }
      serial
      proposer
      proposalType
      description
      sponsor
      sponsored
      status
      votes {
        id
        voter
        vote
      }
      creationTime
    }
  }
`

// Members for sorting
export const ALL_DAOS = gql`
  query allDaosQuery {
    daos {
      id
      token {
        name
      }
      members {
        id
      }
    }
  }
`

export const DAO_TOKEN = gql`
  query daoToken($dao: ID!) {
    tokens(where: { dao: $dao }) {
      name
      symbol
      paused
      totalSupply
    }
  }
`

export const DAO_INFO = gql`
  query daoInfo($dao: ID!) {
    daos(where: { id: $dao }) {
      id
      token {
        id
        name
        symbol
        paused
        totalSupply
      }
      docs
      votingPeriod
      gracePeriod
      quorum
      supermajority
      proposals
      tribute {
        active
      }
      crowdsale {
        active
        saleEnds
      }
      redemption {
        active
      }
    }
  }
`
// Members for sorting
export const CROWDSALE = gql`
  query crowdsaleQuery($dao: ID!) {
    crowdsales(where: { dao: $dao }) {
      id
      dao {
        token {
          name
          symbol
        }
      }
      version
      listId
      purchaseToken
      purchaseMultiplier
      purchaseLimit
      saleEnds
      details
      amountPurchased
      personalLimit
    }
  }
`
