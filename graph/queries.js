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