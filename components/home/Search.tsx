import React, { useState } from 'react'
import { Input, IconSearch } from '@kalidao/reality'

type Props = {
  daos: any[]
  setDisplay: React.Dispatch<React.SetStateAction<any[]>>
}

export default function Search({ daos, setDisplay }: Props) {
  const [searched, setSearched] = useState(false)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const value = e.currentTarget.value

    if (value == '') return

    const results: any[] = []

    daos.forEach((dao) => {
      console.log('user dao', dao)
      if (dao.token.name.toLowerCase().includes(value.toLowerCase())) {
        results.push(dao)
      }
    })

    setDisplay(results)
    setSearched(true)
  }

  return (
    <Input
      hideLabel
      label="Search a DAO"
      placeholder="Search"
      prefix={<IconSearch />}
      onChange={handleSearch}
      width={{
        xs: 'fit',
        lg: '96',
      }}
    />
  )
}
