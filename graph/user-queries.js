import { gql } from "@apollo/client";

export const USER_DAOS = gql(`
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
`)