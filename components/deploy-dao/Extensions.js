import { useState } from 'react';
import { Box, Title, Label, Switch } from '../../styles/form';
import Redemption from "./Redemption";
import Crowdsale from "./Crowdsale";

export default function Extensions() {
  const [showRedemption, setShowRedemption] = useState(false);
  const [showCrowdsale, setShowCrowdsale] = useState(false);

  return (
    <>
      <Title>Extensions</Title>
      <Box>
        <Label htmlFor="showRedemption">Redemption</Label>
        <Switch 
          id="showRedemption" 
          checked={showRedemption} 
          onCheckedChange={() => setShowRedemption(!showRedemption)} 
        />
      </Box>
      {showRedemption && <Redemption />}
      <Box>
        <Label htmlFor="showCrowdsale">Crowdsale</Label>
        <Switch 
          id="showCrowdsale" 
          checked={showCrowdsale} 
          onCheckedChange={() => setShowCrowdsale(!showCrowdsale)} 
        />
      </Box>
      {showCrowdsale && <Crowdsale />}
    </>
  )
}
