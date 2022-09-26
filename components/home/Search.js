import React, { useState } from 'react'
import { Input, IconSearch } from '@kalidao/reality'

export default function Search({ daos, setDisplay }) {
  const [search, setSearch] = useState('')
  const [searched, setSearched] = React.useState(false)

  const handleSearch = (e) => {
    if (search === '') return
    setSearched(false)

    const results = []

    Object.keys(daos).forEach((key) => {
      daos[key].forEach((dao) => {
        if (dao.token.name.toLowerCase().includes(search.toLowerCase())) {
          dao['chainId'] = key
          results.push(dao)
        }
      })
    })
    setDisplay(results)
    setSearched(true)
  }

  const handleKeypress = (e) => {
    // it triggers by pressing the enter key
    if (e.nativeEvent.charCode === 13) {
      handleSearch()
    }
  }

  return (
    <Input
      label="Find"
      prefix={<IconSearch />}
      onChange={(e) => setSearch(e.target.value)}
      onKeyPress={handleKeypress}
      width={{
        xs: 'fit',
        lg: '1/3',
      }}
    />
  )
}
