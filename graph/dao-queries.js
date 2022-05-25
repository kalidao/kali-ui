import { gql } from "@apollo/client";

export const DAO_MEMBERS = gql(`
    query daoMemberQuery($dao: ID!) {
        daos(where: {
            id: $dao
          }) {
            members {
              address
              shares
            }
          }
      }
`)

export const DAO_PROPOSALS = gql(`
    query daoProposalQuery($dao: ID!) {
        daos(where: {
            id: $dao
          }) {
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
`)

export const CHECK_APPS = gql(`
    query daoCheckAppsQuery($dao: ID!) {
        daos(where: {
            id: $dao
          }) {
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
`)

// Members for sorting
export const ALL_DAOS = gql(`
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
`)

