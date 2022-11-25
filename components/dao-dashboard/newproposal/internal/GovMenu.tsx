import GovSettings from '@components/dao-dashboard/settings/GovSettings'
import { Box, Button, Heading, Stack, Text, vars } from '@kalidao/reality'
import { MdOutlineBallot, MdPeopleOutline, MdCached, MdApproval } from 'react-icons/md'
import { govItem, govItemLabel, icon } from './styles.css'

type Props = {
  view: number
  setView: React.Dispatch<React.SetStateAction<number>>
}

export default function GovMenu({ view, setView }: Props) {
  const iconSize = 24
  const iconColor = vars.colors.foreground

  const items = [
    {
      title: 'Voting Period',
      icon: <MdOutlineBallot size={iconSize} color={iconColor} className={icon} />,
      onClick: () => setView(1),
      active: view === 1 ? true : false,
    },
    {
      title: 'Participation Needed',
      icon: <MdPeopleOutline size={iconSize} color={iconColor} className={icon} />,
      onClick: () => setView(2),
      active: view === 2 ? true : false,
    },
    {
      title: 'Approval Needed',
      icon: <MdCached size={iconSize} color={iconColor} className={icon} />,
      onClick: () => setView(3),
      active: view === 3 ? true : false,
    },
    {
      title: 'Token Transferability',
      icon: <MdApproval size={iconSize} color={iconColor} className={icon} />,
      onClick: () => setView(4),
      active: view === 4 ? true : false,
    },
  ]

  return (
    <Stack direction="vertical" align={'flex-start'} space="2.5">
      <Text>Review setting and make proposal to change them.</Text>
      {items.map((item) => (
        <GovItem key={item.title} active={item.active} title={item.title} icon={item.icon} onClick={item.onClick} />
      ))}
    </Stack>
  )
}

type ItemProps = {
  title: string
  icon: React.ReactNode
  active: boolean
  onClick: () => void
}

const GovItem = ({ title, icon, active, onClick }: ItemProps) => {
  console.log('active', title, active)
  return (
    <Box as="button" className={govItem} onClick={onClick} backgroundColor={active ? 'accentSecondary' : 'transparent'}>
      {icon}
      <Box className={govItemLabel} color="textPrimary">
        {title}
      </Box>
    </Box>
  )
}
