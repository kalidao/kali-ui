import { chakra, Box, Button, Text, HStack, Link, Spacer, Divider } from "@chakra-ui/react";
import Reload from "../elements/Reload";

export default function ToggleProposals(props) {
  let toggle = props.toggle;
  let active;
  if(props.proposals != null && 'active' in props.proposals) {
    active = props.proposals['active'].length;
  } else {
    active = 0;
  }
  let pending;
  if(props.proposals != null && 'pending' in props.proposals) {
    pending = props.proposals['pending'].length;
  } else {
    pending = 0;
  }
  return (
    <HStack>
      <Spacer />
      <Button
        onClick={() => props.handleClick("active")}
        color={toggle == "active" ? "black" : "#cccccc"}
        variant="link"
        border="0"
      >
        Active ({active})
      </Button>
      <Divider orientation="vertical" border="1px" height="20px" borderColor="#cccccc" />
      <Button
        onClick={() => props.handleClick("pending")}
        color={toggle == "pending" ? "black" : "#cccccc"}
        variant="link"
        border="0"
      >
        Unsponsored ({pending})
      </Button>
      <Divider orientation="vertical" border="1px" height="20px" borderColor="#cccccc" />
      <Reload reload={props.reloadProposals} />
    </HStack>
  );
}
