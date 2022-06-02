import React from 'react'
import Ricardian from './Ricardian'
import { Flex, Text, Link } from '../../../styles/elements'
import { BsFillArrowUpRightSquareFill } from 'react-icons/bs'
import { Spinner } from '../../elements'
import Info from '../../../styles/Info'

export default function Docs({ info }) {
  return (
    <Info heading="Documents">
      {info['docs'] === '' ? (
        <Ricardian />
      ) : (
        <Flex gap="md" align="separate">
          <Text>Docs</Text>
          <Text>
            {info['docs'] === 'none' && 'Pending...'}
            {info['docs'].substring(0, 4) === 'http' ? (
              <Link href={info['docs']} target="_blank" rel="noreferrer noopener">
                <BsFillArrowUpRightSquareFill color="white" />
              </Link>
            ) : (
              <a href={`https://ipfs.fleek.co/ipfs/${info['docs']}`} target="_blank" rel="noreferrer noopener">
                <BsFillArrowUpRightSquareFill color="white" />
              </a>
            )}
          </Text>
        </Flex>
      )}
    </Info>
  )
}
