import { styled } from '../stitches.config'

const Menu = styled('div', {
  display: 'grid',
  gap: '1rem',

  '@media (min-width: 340px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'auto',
  },

  '@media (min-width: 540px)': {
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'auto',
  },
})

const Item = styled('div', {
  background: '$foreground',
  color: '$background',
  padding: '1rem',
  overflow: 'hidden',
  boxShadow: '2px 1px 10px 3px $gray100',

  fontFamily: 'Bold',
  fontWeight: '800',

  '@media (min-width: 340px)': {
    width: '5rem',
    height: '5rem',
    fontSize: '16px',
  },
  '@media (min-width: 640px)': {
    width: '80%',
    height: '10vh',
    fontSize: '1.5em',

    '&:hover': {
      width: '81%',
      height: '11vh',
      border: '1px solid white',
      transition: '0.5s',
    },
  },
})

const MenuNamespace = Object.assign(Menu, { Item: Item })

export { MenuNamespace as Menu }
