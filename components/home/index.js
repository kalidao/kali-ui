import { styled } from '../../styles/stitches.config'
import MyDAOs from './MyDAOs'
import NewDaoSquare from './NewDaoSquare'

export const ResultsText = styled('div', {
  // TODO: Add font Monument Grotesk
  color: '$foreground',
  fontSize: '24px',
  fontFamily: 'Italic',
  fontStyle: 'italic',
  lineHeight: '100%',
  fontWeight: '500',
  marginBottom: '0.6rem',
})

export const Results = styled('div', {
  display: 'grid',
  gap: '2rem',
  marginBottom: '5rem',

  '@media (min-width: 540px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'auto',
  },
  '@media (min-width: 840px)': {
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'auto',
  },
  '@media (min-width: 940px)': {
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridTemplateRows: 'auto',
  },
  '@media (min-width: 1040px)': {
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridTemplateRows: 'auto',
  },
})

export { MyDAOs, NewDaoSquare }
