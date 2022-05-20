import { useEffect, useState } from "react";
import { Flex } from "../../styles/elements/"
import { DialogTitle } from "../../styles/Dialog";
import ProposalsMenu from "./ProposalsMenu";
import { proposals } from "./proposals";

export function NewProposalModal({ showMenu, proposal}) {
  const [show, setShow] = useState(proposal ? proposal : null);
  let heading, component
  
  useEffect(() => {
    if (!showMenu) {
      heading = proposals[show]["title"]
      component = proposals[show]["component"]
    }
  }, [show])

  return (
    <Flex dir="col" css={{ gap: '1rem'}}>
      {showMenu ? <ProposalsMenu setShow={setShow} /> : 
      <>
        <DialogTitle>{heading}</DialogTitle>
        {component}
      </>}
    </Flex>
  )
}
