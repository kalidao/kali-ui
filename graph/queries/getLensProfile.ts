export const getLensProfile = async (address: string) => {
    // curl 'https://api.lens.dev/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: https://api.lens.dev' --data-binary '{"query":"query Profiles {\n  profiles(request: { ownedBy: [\"0xCB0592589602B841BE035e1e64C2A5b1Ef006aa2\"], limit: 10 }) {\n    items {\n      id\n      name\n      bio\n      attributes {\n        displayType\n        traitType\n        key\n        value\n      }\n      followNftAddress\n      metadata\n      isDefault\n      picture {\n        ... on NftImage {\n          contractAddress\n          tokenId\n          uri\n          verified\n        }\n        ... on MediaSet {\n          original {\n            url\n            mimeType\n          }\n        }\n        __typename\n      }\n      handle\n      coverPicture {\n        ... on NftImage {\n          contractAddress\n          tokenId\n          uri\n          verified\n        }\n        ... on MediaSet {\n          original {\n            url\n            mimeType\n          }\n        }\n        __typename\n      }\n      ownedBy\n      dispatcher {\n        address\n        canUseRelay\n      }\n      stats {\n        totalFollowers\n        totalFollowing\n        totalPosts\n        totalComments\n        totalMirrors\n        totalPublications\n        totalCollects\n      }\n      followModule {\n        ... on FeeFollowModuleSettings {\n          type\n          amount {\n            asset {\n              symbol\n              name\n              decimals\n              address\n            }\n            value\n          }\n          recipient\n        }\n        ... on ProfileFollowModuleSettings {\n         type\n        }\n        ... on RevertFollowModuleSettings {\n         type\n        }\n      }\n    }\n    pageInfo {\n      prev\n      next\n      totalCount\n    }\n  }\n}"}' --compressed
    // convert curl request to fetch request with address as variable for ownedBy field
    try {
        const res = await fetch('https://api.lens.dev/', {
            method: 'POST',
            headers: {
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Connection: 'keep-alive',
                DNT: '1',
                Origin: 'https://api.lens.dev',
            },
            body: JSON.stringify({
                query: `query Profiles {
        profiles(request: { ownedBy: ["${address}"], limit: 10 }) {
            items {
                id
                name
                bio
                attributes {
                  displayType
                  traitType
                  key
                  value
                }
                followNftAddress
                metadata
                isDefault
                picture {
                  ... on NftImage {
                    contractAddress
                    tokenId
                    uri
                    verified
                  }
                  ... on MediaSet {
                    original {
                      url
                      mimeType
                    }
                  }
                  __typename
                }
                handle
                coverPicture {
                  ... on NftImage {
                    contractAddress
                    tokenId
                    uri
                    verified
                  }
                  ... on MediaSet {
                    original {
                      url
                      mimeType
                    }
                  }
                  __typename
                }
                ownedBy
                dispatcher {
                  address
                  canUseRelay
                }
                stats {
                  totalFollowers
                  totalFollowing
                  totalPosts
                  totalComments
                  totalMirrors
                  totalPublications
                  totalCollects
                }
                followModule {
                  ... on FeeFollowModuleSettings {
                    type
                    amount {
                      asset {
                        symbol
                        name
                        decimals
                        address
                      }
                      value
                    }
                    recipient
                  }
                  ... on ProfileFollowModuleSettings {
                   type
                  }
                  ... on RevertFollowModuleSettings {
                   type
                  }
                }
              }
              pageInfo {
                prev
                next
                totalCount
              }
            }
          }`})
        })
    
        const data = await res.json()
        return data?.data?.profiles?.items?.[0]
      } catch (e) {
        return e
      }
}
