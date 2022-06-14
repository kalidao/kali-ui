import { styled } from '../../styles/stitches.config'
import DaoCard from './DaoCard'
import { Flex } from '../../styles/elements'
import { useNetwork, useAccount } from 'wagmi'
import { useGraph } from '../hooks/useGraph'
import { USER_DAOS } from '../../graph'
import Welcome from './Welcome'

export const ResultsText = styled('div', {
  // TODO: Add font Monument Grotesk
  color: '$foreground',
  fontSize: '18px',
  fontFamily: 'Italic',
  fontStyle: 'italic',
  lineHeight: '100%',
  fontWeight: '500',
  marginBottom: '0.6rem',
})

export const Results = styled('div', {
  display: 'grid',
  gap: '1.5rem',
  marginBottom: '5rem',

  '@media (min-width: 540px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'auto',
  },
  '@media (min-width: 640px)': {
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'auto',
  },
  '@media (min-width: 840px)': {
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridTemplateRows: 'auto',
  },
  '@media (min-width: 940px)': {
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridTemplateRows: 'auto',
  },
  '@media (min-width: 1040px)': {
    gridTemplateColumns: 'repeat(6, 1fr)',
    gridTemplateRows: 'auto',
  },
})

export default function MyDAOs() {
  const { activeChain } = useNetwork()
  const { data: account } = useAccount()
  const { data, isLoading } = useGraph(activeChain?.id, USER_DAOS, {
    address: account?.address,
  })
  const daos = data?.['members']

  return (
    <>
      <Flex dir="col" css={{ gap: '1rem', position: 'absolute', left: '8rem', top: '5rem', margin: '1rem' }}>
        {daos &&
          (daos.length > 1 ? (
            <ResultsText> You are in {daos.length} DAOs </ResultsText>
          ) : daos.length === 1 ? (
            <ResultsText>You are in {daos.length} DAO</ResultsText>
          ) : (
            <ResultsText>You are not in any DAO. Create one!</ResultsText>
          ))}
        <Results>{daos && daos.map((dao) => <DaoCard key={dao['dao']['id']} dao={dao['dao']} />)}</Results>
      </Flex>
      {(!account || !daos) && <Welcome />}
    </>
  )
}
