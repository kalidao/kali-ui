import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useGetAllUserDaos } from '@graph/queries/getAllUserDaos'
import { Button } from '@components/ui/button'
import { RefreshCw } from 'lucide-react'
import DaoCard from './DaoCard'
import Search from './Search'

export default function UserDAOs({ address, label = 'Your DAOs' }: { address?: string; label?: string }) {
  const [display, setDisplay] = useState<any[]>([])
  const {
    data: daos,
    isSuccess,
    refetch,
  } = useGetAllUserDaos(address ? (address as string) : ethers.constants.AddressZero)

  useEffect(() => {
    if (isSuccess && daos) {
      setDisplay(daos as any[])
    }
  }, [daos, isSuccess])

  const reset = () => {
    refetch()
    setDisplay(daos as any[])
  }

  if (!address) return null

  return (
    <div className="w-full grid grid-cols-1 gap-3 p-3 bg-background">
      {display && (
        <div className="w-full px-12 py-6 flex flex-row items-center justify-between">
          <h2 className="text-2xl font-bold">{label}</h2>
          <div className="flex items-center space-x-2">
            <Search daos={daos as any[]} setDisplay={setDisplay} />
            <Button variant="outline" size="icon" onClick={reset} className="rounded-full">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {display &&
          display.length !== 0 &&
          display.map((dao: { [x: string]: any }) => <DaoCard key={dao?.['id']} dao={dao} chain={dao?.chainId} />)}
      </div>
    </div>
  )
}
