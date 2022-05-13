import { useEnsName } from 'wagmi'
import { truncateAddress } from "../../../utils/formatters";
import { Flex, Box, Text } from '../../../styles/elements';

const validateProposalTag = (type) => {
  let tag
  switch (type) {
    case "MINT":
      tag = "MEMBER";
      break;
    case "BURN":
      tag = "MEMBER";
      break;
    case "CALL":
      tag = "CALL";
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
      tag = "ESCAPE";
      break;
    case "DOCS":
      tag = "DOCUMENT"
  }
  let tagColor
  switch (tag) {
    case "GOVERNANCE":
      tagColor = "$purple100"
      break;
    case "ESCAPE":
      tagColor = "$red100"
      break;
    case "MEMBER":
      tagColor = "$green100"
      break;
    case "DOCS":
      tagColor = "$blue100"
      break;
    case "APP":
      tagColor = "$yellow100"
      break;
    case "CALL":
      tagColor = "$gray100"
      break;
  }
  return { tag, tagColor }
};


export const ProposalCard = ({ proposal }) => {
    const ensName = useEnsName({
      address: proposal["proposer"],
      chainId: 1
    })
    const {tag, tagColor} = validateProposalTag(proposal["proposalType"])

    const proposer = ensName.data != null ? ensName.data : truncateAddress(proposal["proposer"]) 
    console.log(tagColor)
    return <Flex dir="col" gap="sm" css={{ background: '$gray900', padding: '1rem', minWidth: '60vw'}}>
      <Flex color="foreground" align="start">
        <Box css={{ background: `${tagColor}`, color: '$background', padding: '0.2rem', marginRight: '0.3rem'}}>{tag}</Box> by {proposer}
      </Flex>
      <Box>{proposal["description"]}</Box>
      {proposal["status"] ? <Box css={{ background: '$green100', width: '3.8rem'}}>PASSED</Box> : <Text css={{ background: '$red100', width: '3.8rem'}}>FAILED</Text>}
    </Flex>
  }