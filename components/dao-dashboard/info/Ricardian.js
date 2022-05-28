import React from 'react'
import Image from 'next/image'
import { Flex, Text } from '../../../styles/elements'
import { ExternalLinkIcon } from '@radix-ui/react-icons'
import { useFetch } from '../../hooks/useFetch'

export default function Ricardian() {
  const { data, isLoading, error } = useFetch('https://gateway.pinata.cloud/ipfs/QmW9asQXxL1zozwZsPNPFWh7x8qsL5SgM5i8dhh7wqbL4Q')

  console.log('ricardian', data)
  return (
    <>
        {data && (
            <>
            <Text variant="heading">{data["name"]}</Text>
            <Flex>
                <Text>{data["description"]}</Text>
                <Image src={data["image"]} height="100%" width="100%" />
            </Flex>
            <Text as="a" href={data["attributes"][1]["value"]}  target="_blank" variant="link">View Master Operating Agreement <ExternalLinkIcon /></Text>
            <Text as="a" href={data["external_url"]} target="_blank" variant="link">Learn more <ExternalLinkIcon /></Text>
            </>
        )}
    </>
  )
}
