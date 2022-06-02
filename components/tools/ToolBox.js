import React, { useState } from 'react'
import TokenForm from './TokenForm.js'
import NftForm from './NftForm.js'
import ListManagerForm from './ListManagerForm.js'
import { Button, Flex } from '../../styles/elements'

export default function ToolBox() {
  const [tokenVisible, setTokenVisible] = useState(false)
  const [nftVisible, setNftVisible] = useState(false)
  const [listManagerVisible, setListManagerVisible] = useState(false)

  const toggleToken = () => {
    setTokenVisible(() => !tokenVisible)
    setNftVisible(false)
    setListManagerVisible(false)
  }

  const toggleNft = () => {
    setNftVisible(() => !nftVisible)
    setTokenVisible(false)
    setListManagerVisible(false)
  }

  const toggleListManager = () => {
    setListManagerVisible(() => !listManagerVisible)
    setTokenVisible(false)
    setNftVisible(false)
  }

  return (
    <>
      <Flex dir="col">
        <Button onClick={toggleToken}>Mint ERC20</Button>
        <Button onClick={toggleNft}>Mint NFT</Button>
        <Button onClick={toggleListManager}>List Manager</Button>
      </Flex>
      <>{tokenVisible ? <TokenForm /> : null}</>
      <>{nftVisible ? <NftForm /> : null}</>
      <>{listManagerVisible ? <ListManagerForm /> : null}</>
    </>
  )
}
