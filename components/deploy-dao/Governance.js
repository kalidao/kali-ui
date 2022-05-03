import React, { useState } from 'react'
import { Title, Box, Label, Switch } from '../../styles/form'
import { Slider, SliderButton } from '../../styles/Slider'
import { VotingPeriod } from '../../styles/VotingPeriod';
import { styled } from '../../styles/stitches.config';

const Input = styled('input', {
  border: '1px solid $border'
});

export default function Governance() {
  const [showQuorum, setShowQuorum] = useState(false);
  const [showSupermajority, setShowSupermajority] = useState(false);

  return (
    <>
      <Title>Governance</Title>
      <Box>
        <Label htmlFor="votingPeriod">Voting Period</Label>
        <Input placeholder="days"/>
        <Input placeholder="hours" />
        <Input placeholder="minutes" min="0" max="60" />
      </Box>
      <Box>
        <Label htmlFor="quorum">Quorum</Label>
        <SliderButton onClick={() => setShowQuorum(!showQuorum)}>25%</SliderButton>
      </Box>
      {showQuorum && <Slider id="quorum" />}
      <Box>
        <Label htmlFor="supermajority">Supermajority</Label>
        <SliderButton onClick={() => setShowSupermajority(!showSupermajority)}>50%</SliderButton>
      </Box>
      {showSupermajority && <Slider id="supermajority" />}
      <Box>
        <Label htmlFor="paused">Shares Transferable</Label>
        <Switch id="paused" />
      </Box>
    </>
  )
}
