import React from 'react'
import { styled } from '../../styles/stitches.config';
import { Label, Input, Box, Title } from '../../styles/form';

export default function Identity({ details, setDetails }) {
  return (
    <>
      <Title>Identity</Title>
      <Box>
        <Label htmlFor="name">Name</Label> 
        <Input type="text" id="name" placeholder="KaliDAO"/>
      </Box>
      <Box>
        <Label htmlFor="symbol">Symbol</Label> 
        <Input type="text" id="symbol" placeholder="KALI" />
      </Box>
    </>
  )
}
