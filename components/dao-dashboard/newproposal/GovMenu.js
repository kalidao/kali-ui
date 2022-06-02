import React from 'react'
import { Box } from '../../../styles/elements'
import { styled } from '../../../styles/stitches.config'

const Menu = styled(Box, {
  display: 'grid',
  gap: '1rem',

  '@media (min-width: 340px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'auto',
  },

  '@media (min-width: 540px)': {
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'auto',
  },
})

const Item = styled(Box, {
  background: '$foreground',
  color: '$background',
  padding: '1rem',
  fontWeight: '800',
  overflow: 'hidden',
  boxShadow: '2px 1px 10px 3px $gray100',

  '@media (min-width: 340px)': {
    width: '5rem',
    height: '5rem',
    fontSize: '16px',
  },
  '@media (min-width: 640px)': {
    width: '80%',
    height: '10vh',
    fontSize: '1.5em',
    fontFamily: 'Bold',

    '&:hover': {
      width: '81%',
      height: '11vh',
      border: '1px solid white',
      transition: '0.5s',
    },
  },
})

export default function GovMenu({ setProposal }) {
  return (
    <Menu>
      <Item onClick={() => setProposal('transferability')}>Toggle Transferability</Item>
      <Item onClick={() => setProposal('votingPeriod')}>Update Voting Period</Item>
      <Item onClick={() => setProposal('quorum')}>Update Quorum</Item>
    </Menu>
  )
}
