import { Box, IconCheck, IconHand, IconTokens, IconUserGroupSolid, Stack, Text } from '@kalidao/reality'
import { govItem, govItemLabel, icon } from './styles.css'

type Props = {
  view: number
  setView: React.Dispatch<React.SetStateAction<number>>
}

export default function GovMenu({ view, setView }: Props) {
  const items = [
    {
      title: 'Voting Period',
      icon: <IconHand className={icon} />,
      onClick: () => setView(1),
      active: view === 1 ? true : false,
    },
    {
      title: 'Participation Needed',
      icon: <IconUserGroupSolid className={icon} />,
      onClick: () => setView(2),
      active: view === 2 ? true : false,
    },
    {
      title: 'Approval Needed',
      icon: <IconCheck className={icon} />,
      onClick: () => setView(3),
      active: view === 3 ? true : false,
    },
    {
      title: 'Token Transferability',
      icon: <IconTokens className={icon} />,
      onClick: () => setView(4),
      active: view === 4 ? true : false,
    },
  ]

  return (
    <Stack direction="vertical" align={'flex-start'} space="2.5">
      <Text>Review setting and make proposal to change them.</Text>
      <Stack
        direction={{
          xs: 'horizontal',
          lg: 'vertical',
        }}
      >
        {items.map((item) => (
          <GovItem key={item.title} active={item.active} title={item.title} icon={item.icon} onClick={item.onClick} />
        ))}
      </Stack>
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
  return (
    <Box as="button" className={govItem} onClick={onClick} backgroundColor={active ? 'accentSecondary' : 'transparent'}>
      {icon}
      <Box className={govItemLabel} color="textPrimary">
        {title}
      </Box>
    </Box>
  )
}
