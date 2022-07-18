import React from 'react'
import { Flex, Button } from '../../styles/elements'
import { Input } from '../../styles/form-elements'
import ActivityLog from './ActivityLog'
import Featured from './Featured'
import { styled } from '../../styles/stitches.config'
import { GoSearch } from 'react-icons/go'
import NewDao from './NewDao'
import DaoCard from './DaoCard'

const SearchBar = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '10px',
  minWidth: '25rem',
  background: '$gray2',
  color: '$gray12',
  border: '1px solid $gray6',
  borderRadius: '20px',
  gap: '5px',
  '&:focus': {
    outline: 'none',
  },
})

const SearchInput = styled('input', {
  border: 'none',
  outline: 'none',
  background: 'none',
  color: '$gray12',
  lineHeight: '1.5',
  fontSize: '16px',
})

export default function Welcome({ daos }) {
  const [search, setSearch] = React.useState('')
  const [searchResults, setSearchResults] = React.useState([])

  const handleSearch = React.useCallback((e) => {
    if (search === '') return
    const results = []

    Object.keys(daos).forEach((key) => {
      daos[key].forEach((dao) => {
        if (dao.token.name.toLowerCase().includes(search.toLowerCase())) {
          dao['chainId'] = key
          results.push(dao)
        }
      })
    })

    console.log('results', results)
    setSearchResults(results)
  })

  return (
    <Flex
      dir="col"
      gap="md"
      css={{
        position: 'absolute',
        top: '7rem',
        right: '25%',
        left: '25%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <SearchBar>
        <GoSearch />
        <SearchInput placeholder="KaliDAO" onChange={(e) => setSearch(e.target.value)} />
      </SearchBar>
      <Flex>
        <Button
          css={{
            fontSize: '16px',
            fontFamily: 'Bold',
            borderRadius: '10px',
          }}
          onClick={handleSearch}
        >
          Search for a DAO
        </Button>
        <NewDao />
      </Flex>
      <Flex dir="col" gap="md">
        {searchResults.map((result) => (
          <DaoCard key={result['id']} dao={result} chain={result['chainId']} />
        ))}
      </Flex>
      {/* <ActivityLog allDaos={daos} />
      <Featured /> */}
    </Flex>
  )
}
