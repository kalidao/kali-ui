import React from 'react'
import Ricardian from './Ricardian'
import { Flex, Text } from '../../../styles/elements'
import { BsFillArrowUpRightSquareFill } from "react-icons/bs"

export default function Docs({ info }) {
  return (
    <Flex gap="md" dir="col" css={{
      border: '1px solid $gray800',
      padding: '1rem'
    }}>
    {info["docs"] === "" ? <Ricardian /> : <Flex gap="md" align="separate">
        <Text>Docs</Text>
        <Text>{info["docs"] == "none" ? "Pending..." : (
          info["docs"].substring(0, 4) == 'http' ?
          <a href={info["docs"]} target="_blank">
            <BsFillArrowUpRightSquareFill />
          </a> : <a href={`https://ipfs.fleek.co/ipfs/${info["docs"]}`} target="_blank">
            <BsFillArrowUpRightSquareFill />
          </a>
        )}</Text>
      </Flex>} 
  </Flex>
  )
}
