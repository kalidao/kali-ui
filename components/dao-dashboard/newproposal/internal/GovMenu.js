import GovSettings from '@components/dao-dashboard/settings/GovSettings'
import { Box, Button, Heading, Stack, Text } from '@kalidao/reality'
import { MdOutlineBallot, MdPeopleOutline, MdCached, MdApproval } from 'react-icons/md'
import { govItem } from './styles.css'

export default function GovMenu({ setView }) {
  const iconSize = 24
  const iconColor = "white"

  const items = [
    {
      title: 'Voting Period',
      icon: <MdOutlineBallot size={iconSize} color={iconColor} />,
      onClick: () => setView(1),
    },
    {
      title: 'Participation Needed',
      icon: <MdPeopleOutline size={iconSize} color={iconColor} />,
      onClick: () => setView(2),
    },
    {
      title: 'Approval Needed',
      icon: <MdCached size={iconSize} color={iconColor} />,
      onClick: () => setView(3),
    },
    {
      title: 'Token Transferability',
      icon: <MdApproval size={iconSize} color={iconColor} />,
      onClick: () => setView(4),
    },
  ]
  return (
    <Stack
      direction="vertical"
      align={"flex-start"}
      space="2.5"
    >
      <Text>
        View the governance settings configured for the DAO. Make a proposal to change them.
      </Text>
    
      {items.map((item) => <GovItem key={item.title} title={item.title} icon={item.icon} onClick={item.onClick} />)}

    </Stack>
  )
}

const GovItem = ({ title, icon, onClick }) => {
  return (
    <button className={govItem} onClick={onClick} >
        {icon}
        <Text>{title}</Text>
    </button>
  )
}
