import React from 'react'
import Sidebar from "./home/";
import Proposals from "./proposals";
import { Flex } from '../../styles/elements';

export function Dashboard({ }) {
  return (
    <Flex css={{
      position: 'relative',
      justifyContent: 'space-between',
      minWidth: '90vw',
      gap: '1rem',
      marginRight: '1rem'
    }}>
        <Proposals />
        <Sidebar />
    </Flex>
  )
}