import React from 'react'
import { IconLink, Avatar, Spinner, Stack, Button, Text, Heading } from '@kalidao/reality'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@utils/fetcher'

export default function Ricardian() {
  const { data, isLoading, error } = useQuery(['ricardianLLC'], async () =>
    fetcher('https://gateway.pinata.cloud/ipfs/QmW9asQXxL1zozwZsPNPFWh7x8qsL5SgM5i8dhh7wqbL4Q'),
  )

  return (
    <>
      {isLoading && <Spinner />}
      {data && (
        <Stack>
          <Heading>{data?.['name']}</Heading>
          <Text>{data['description']}</Text>
          <Avatar shape="square" size="96" src={data?.image} label="Ricardian LLC NFT" />
          <Stack direction={'horizontal'}>
            <Button as="a" href={data['attributes'][1]['value']} target="_blank" prefix={<IconLink />}>
              View Master Operating Agreement
            </Button>
            <Button variant="secondary" as="a" href={data['external_url']} target="_blank" prefix={<IconLink />}>
              Learn more
            </Button>
          </Stack>
        </Stack>
      )}
    </>
  )
}
