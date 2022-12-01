import { Tag } from "@kalidao/reality"

type Status = {
    text: string
    color: 'accent' | 'green' | 'red' | 'blue' | 'orange' | 'pink' | 'purple' | 'violet' | 'secondary' | undefined
    icon: React.ReactNode
  }

type StatusProps = {
    sponsored: boolean
    votingPeriod: number 
    votingStarts: number
    status: boolean
    proposalType: string
}

const StatusTag = ({ sponsored, proposalType, votingPeriod, votingStarts, status }: StatusProps) => {
    const currentStatus = (): Status => {
        // unsponsored
        if (!sponsored) {
          return {
            color: 'secondary',
            icon: <></>,
            text: 'Unsponsored',
          }
        }
        // voting
        const timeLeft =
          new Date().getTime() - new Date(votingPeriod * 1000 + votingStarts * 1000).getTime()
        if (sponsored === true) {
          if (timeLeft > 0) {
            if (status === null) {
              return {
                color: 'accent',
                icon: <></>,
                text: 'Process',
              }
            } else {
              return {
                color: status ? 'green' : 'red',
                icon: <></>,
                text: status ? 'Passed' : 'Failed',
              }
            }
          } else {
            return {
              color: 'accent',
              icon: <></>,
              text: 'Voting',
            }
          }
        }
        // execute
    
        return {
          color: undefined,
          icon: <></>,
          text: '...',
        }
      }

      const { color, text } = currentStatus()

    return <Tag label={proposalType} tone={color!} size="medium">
    {text}
  </Tag>
}

export { StatusTag }

