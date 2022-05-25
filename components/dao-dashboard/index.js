import React from 'react'
import Profile from "./Profile";
import Proposals from "./proposals";
import { Flex } from '../../styles/elements';

export function Dashboard({ }) {
  return (
    <Flex css={{
      position: 'relative',
      justifyContent: 'space-between',
      minWidth: '90vw'
    }}>
        <Proposals />
        <Profile />
    </Flex>
  )
}