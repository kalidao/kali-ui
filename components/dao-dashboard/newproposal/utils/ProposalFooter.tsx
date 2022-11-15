import { Stack, Button } from "@kalidao/reality"
import Back from "@design/proposal/Back"

type Props = {
    setProposal?: React.Dispatch<React.SetStateAction<string>>
    proposal: string
    submitProposal: () => void
    disabled?: boolean
}

export const ProposalFooter = ({
    setProposal,
    proposal,
    submitProposal,
    disabled
}: Props) => {
    return <Stack align="center" justify={"space-between"} direction="horizontal">
         <Back onClick={() => setProposal?.(proposal)} />
        <Button onClick={submitProposal} disabled={disabled}>Submit</Button>
    </Stack>
}