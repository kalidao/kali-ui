import React from 'react'
import { Flex } from '../../styles/elements'
import Profile from "./Profile";
import Proposals from "./proposals/";
import { styled } from '../../styles/stitches.config';

const Layout = styled(Flex, {
  position: 'absolute',
  top: '7rem',
  left: '8rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  gap: '1rem',
  

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
        {/* <Profile dao={dao} /> */}
        <Proposals dao={dao} />
    </Layout>
  )
}