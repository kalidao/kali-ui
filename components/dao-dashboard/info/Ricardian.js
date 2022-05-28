import React from 'react'
import Image from 'next/image'
import { Flex, Text } from '../../../styles/elements'
import { useFetch } from '../../hooks/useFetch'

export default function Ricardian() {
  const { data, isLoading, error } = useFetch('https://gateway.pinata.cloud/ipfs/QmW9asQXxL1zozwZsPNPFWh7x8qsL5SgM5i8dhh7wqbL4Q')

  console.log('ricardian', data)
  return (
    <>
        {data && (
            <>
            <Text>{data["name"]}</Text>
            <Flex>
                <Text>{data["description"]}</Text>
                <Image src={data["image"]} height="100%" width="100%" />
            </Flex>
            <a href={data["attributes"][1]["value"]}  target="_blank">View Master Operating Agreement.</a>
            <a href={data["external_url"]} target="_blank">Learn more</a>
            </>
        )}
    </>
  )
}
