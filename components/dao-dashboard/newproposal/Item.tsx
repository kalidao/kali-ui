import { Box, Text } from '@kalidao/reality'
import * as styles from './styles.css'

type ItemProps = {
  onClick: () => void
  label: string
  icon: React.ReactNode
}

export const Item = ({ onClick, label, icon }: ItemProps) => {
  return (
    <Box
      padding="6"
      borderWidth={'px'}
      borderColor="foregroundSecondary"
      borderRadius={'2xLarge'}
      className={styles.itemContainer}
      as="button"
      onClick={onClick}
    >
      {icon}
      <Text>{label}</Text>
    </Box>
  )
}
