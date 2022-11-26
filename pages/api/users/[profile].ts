import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const { profile } = _req.query
    console.log('user: ', profile)
    const data = await axios({
      url: 'https://api.lens.dev/',
      method: 'post',
      data: {
        query: `
        query Profiles {
          profiles(request: { ownedBy: ["${profile}"], limit: 10 }) {
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
                }
                pageInfo {
                  prev
                  next
                  totalCount
                }
              }
            }
          `,
      },
    })

    if (data?.data?.data?.profiles?.items.length > 0) {
      const profile = {
        handle: data?.data?.data?.profiles?.items[0].handle,
        bio: data?.data?.data?.profiles?.items[0].bio,
        name: data?.data?.data?.profiles?.items[0].name,
        ownedBy: data?.data?.data?.profiles?.items[0].ownedBy,
        picture:
          data?.data?.data?.profiles?.items[0].picture.__typename === 'NftImage'
            ? data?.data?.data?.profiles?.items[0].picture.uri
            : data?.data?.data?.profiles?.items[0].picture.original.url,
        cover_picture:
          data?.data?.data?.profiles?.items[0].coverPicture.__typename === 'NftImage'
            ? data?.data?.data?.profiles?.items[0].coverPicture.uri
            : data?.data?.data?.profiles?.items[0].coverPicture.original.url,
      }

      return res.status(200).json(profile)
    }

    return res.status(400).json({
      error: 'User not found',
    })
  } catch (e) {
    return res.status(500).json({
      error: 'Internal server error',
    })
  }
}
