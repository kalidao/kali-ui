import { Flex } from "../../styles/elements/"
import { DialogTitle } from "../../styles/Dialog";
import { proposals } from "./proposals";


export function NewProposalModal({ heading, component }) {
   
  return (
    <Flex dir="col" css={{ gap: '1rem'}}>
      <DialogTitle>{heading}</DialogTitle>
      {component}
    </Flex>
  )
}
