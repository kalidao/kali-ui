export type ProposalProps = {
  setProposal?: React.Dispatch<React.SetStateAction<string>>
  title: string
  content: { [key: string]: any } | undefined
}
