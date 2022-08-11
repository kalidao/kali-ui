import { Box } from '../../styles/elements'
import DaoCard from './DaoCard'

export default function Display({ daos }) {
  return (
    <Box
      css={{
        display: 'grid',
        gap: '10px',
        marginBottom: '5rem',

        '@media (min-width: 540px)': {
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridTemplateRows: 'auto',
        },
        '@media (min-width: 840px)': {
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'auto',
        },
      }}
    >
      {daos.map((dao) => (
        <DaoCard key={dao['id']} dao={dao} chain={dao['chainId']} />
      ))}
    </Box>
  )
}
