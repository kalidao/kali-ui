import { useEnsName } from 'wagmi'
import { truncateAddress } from "../../../utils/formatters";
import { Flex, Box, Text } from '../../../styles/elements';
import Image from 'next/image';
import { bounce } from '../../../styles/animation';
import { styled } from '../../../styles/stitches.config';

const Icon = styled(Image, {
  '&:hover': {
    animation: `${bounce} 0.5s infinite`
  }
});

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


export const ProposalCard = ({ proposal }) => {
    const ensName = useEnsName({
      address: proposal["proposer"],
      chainId: 1
    })
    const {tag, tagColor} = validateProposalTag(proposal["proposalType"])

    const proposer = ensName.data != null ? ensName.data : truncateAddress(proposal["proposer"]) 
    console.log(tagColor)
    return <Flex dir="row" gap="sm" css={{ background: '$gray800', padding: '1rem 0.5rem 1rem 0.5rem', minWidth: '50vw', borderRadius: '0.5rem', justifyContent: 'space-between', alignItems: 'center'}}>
            <Flex dir="col" gap="md" minWidth="10%" height="100%">
              <Icon src={'/icons/upvote.png'} height="32px" width="32px"  />
              <Icon src={'/icons/downvote.png'} height="32px" width="32px"  />
            </Flex>
        <Flex dir="col" gap="sm" css={{
          minWidth: '80%',
          justifyContent: 'flex-start',
          alignItems: 'flex-start'
        }}>
        <Flex color="foreground" align="start" gap="sm" >
          <Box css={{ 
            // background: `${tagColor}`, 
            color: `${tagColor}`,
            fontWeight: '800', 
            fontFamily: 'Screen',
            borderRadius: '20rem'
            // marginRight: '0.3rem'
          }}
          >
            {tag}
          </Box>{" "} proposal by 
          <Text css={{
            color: '$purple300'
          }}>
            {proposer}
          </Text>
        </Flex>
          <Box>
            {proposal["description"].length > 100 ? 
            proposal["description"].slice(0, 100) + '...' : 
            proposal["description"]}
          </Box>
        </Flex>
        <Box css={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '10%'
        }}>
            {proposal["status"] ? 
              <Icon src={`/icons/checkmark.png`} height="32px" width="32px" /> : 
              <Icon src={`/icons/cross.png`} height="32px" width="32px" />}
        </Box>
    </Flex>
  }