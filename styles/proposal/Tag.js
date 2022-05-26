import React from 'react'
import { Box } from '../elements';

const validateProposalTag = (type) => {
    let tag
    switch (type) {
      case "MINT":
        tag = "MEMBERSHIP";
        break;
      case "BURN":
        tag = "MEMBERSHIP";
        break;
      case "CALL":
        tag = "EXTERNAL";
        break;
      case "VPERIOD":
        tag = "GOVERNANCE";
        break;
      case "GPERIOD":
        tag = "GOVERNANCE";
        break;
      case "QUORUM":
        tag = "GOVERNANCE";
        break;
      case "SUPERMAJORITY":
        tag = "GOVERNANCE";
        break;
      case "PAUSE":
        tag = "GOVERNANCE";
        break;
      case "EXTENSION":
        tag = "APP";
        break;
      case "ESCAPE":
        tag = "GOVERNANCE";
        break;
      case "DOCS":
        tag = "GOVERNANCE"
    }
    let tagColor
    switch (tag) {
      case "GOVERNANCE":
        tagColor = "$purple200"
        break;
      case "MEMBERSHIP":
        tagColor = "$green200"
        break;
      case "APP":
        tagColor = "$yellow200"
        break;
      case "EXTERNAL":
        tagColor = "$yellow200"
        break;
    }
    return { tag, tagColor }
  };


export default function Tag({ type }) {
  const { tag, tagColor } = validateProposalTag(type);

  return (
    <Box css={{ 
              color: `${tagColor}`,
              fontWeight: '800', 
              fontFamily: 'Screen',
            }}
        >
              {tag}
    </Box>
  )
}
