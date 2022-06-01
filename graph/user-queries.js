import { gql } from "graphql-request";

export const USER_DAOS = gql`
    query userDaosQuery($address: ID!) {
        members(where: {
            address: $address
          }) {
            dao {
              id
              token {
                name
              }
            }
          }
      }
`