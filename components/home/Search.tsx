import React, { useState } from 'react'
import { Input } from '@components/ui/input'
import { Search as SearchIcon } from 'lucide-react'

type Props = {
  daos: any[]
  setDisplay: React.Dispatch<React.SetStateAction<any[]>>
}

export default function Search({ daos, setDisplay }: Props) {
  const [searched, setSearched] = useState(false)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const value = e.currentTarget.value
    if (value === '') {
      setDisplay(daos)
      setSearched(false)
      return
    }
    const results: any[] = daos.filter((dao) => dao.token.name.toLowerCase().includes(value.toLowerCase()))
    setDisplay(results)
    setSearched(true)
  }

  return (
    <div className="relative w-full xs:w-fit lg:w-96">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        type="text"
        placeholder="Search"
        onChange={handleSearch}
        className="pl-10 pr-4 py-2"
        aria-label="Search a DAO"
      />
    </div>
  )
}
