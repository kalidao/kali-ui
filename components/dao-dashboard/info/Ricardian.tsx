import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Loader2, ExternalLink } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { Button } from '@components/ui/button'
import { fetcher } from '@utils/fetcher'

export default function Ricardian() {
  const { data, isLoading } = useQuery(['ricardianLLC'], async () =>
    fetcher('https://gateway.pinata.cloud/ipfs/QmW9asQXxL1zozwZsPNPFWh7x8qsL5SgM5i8dhh7wqbL4Q'),
  )

  return (
    <div className="p-4">
      {isLoading && (
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}
      {data && (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{data?.['name']}</h1>
          <p className="text-gray-600">{data['description']}</p>
          <Avatar className="h-24 w-24">
            <AvatarImage src={data?.image} alt="Ricardian LLC NFT" />
            <AvatarFallback>RLL</AvatarFallback>
          </Avatar>
          <div className="flex space-x-4">
            <Button asChild>
              <a
                href={data['attributes'][1]['value']}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View Master Operating Agreement
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={data['external_url']} target="_blank" rel="noopener noreferrer" className="flex items-center">
                <ExternalLink className="mr-2 h-4 w-4" />
                Learn more
              </a>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
