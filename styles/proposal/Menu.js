import { styled } from '../stitches.config'

const Menu = styled('div', {
  display: 'grid',

  '@media (min-width: 340px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'auto',
  },

  '@media (min-width: 540px)': {
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridTemplateRows: 'auto',
    gap: '1rem',
  },
})

const Item = styled('div', {
  background: '$gray2',
  border: '1px solid $gray5',
  color: '$mauve12',
  borderRadius: '20px',
  padding: '1rem',
  overflow: 'hidden',
  boxShadow: '2px 1px 10px 3px $gray7',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '10px',
  fontFamily: 'Regular',
  fontWeight: '600',

  '@media (min-width: 340px)': {
    height: '5rem',
    fontSize: '12px',
  },
  '@media (min-width: 640px)': {
    height: '3rem',
    fontSize: '21px',

    '&:hover': {
      background: '$gray4',
      border: '1px solid $gray8',
    },
  },

  '& svg': {
    display: 'inline-block',
    width: '15%',
    height: 'auto',
    color: '$gray9',

    '&:hover': {
      color: '$gray10',
    },
  },
})

const MenuNamespace = Object.assign(Menu, { Item: Item })

export { MenuNamespace as Menu }
