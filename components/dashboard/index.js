import React from 'react'
import { Flex } from '../../styles/elements'
import Profile from "./Profile";
import Proposals from "./proposals/";
import { styled } from '../../styles/stitches.config';

const Layout = styled(Flex, {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'row',
  gap: '1rem',
  marginTop: '5rem',
  marginLeft: '5rem',

  '@media (max-width: 520px)': {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '3.8rem',
    marginLeft: '1.2rem',
    marginRight: '1rem',
  }
});

export function Dashboard({ dao, props}) {
  return (
    <Layout>
        <Profile dao={dao} />
        <Proposals dao={dao} />
    </Layout>
  )
}


export * from "./NewProposalSquare"