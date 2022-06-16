import { styled } from '../stitches.config'
// all: 'unset',
//         display: 'inline-flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 4,
//         padding: '0 10px',
//         height: 32,
//         fontSize: 12,
//         lineHeight: 1,
//         color: '$gray11',
//         backgroundColor: '$gray3',
//         border: '1px solid $gray7',

//         '&:hover': {
//           color: '$gray12',
//           backgroundColor: '$gray4',
//           border: '1px solid $gray8',
//         },

//         '&:focus': {
//           color: '$gray12',
//           backgroundColor: '$gray5',
//           border: '1px solid $gray8',
//         },
const Select = styled('select', {
  // all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 10px',
  height: 34,
  fontSize: 12,
  lineHeight: 1,
  color: '$gray11',
  backgroundColor: '$gray3',
  border: '1px solid $gray7',
  borderRadius: 4,

  '&:hover': {
    color: '$gray12',
    backgroundColor: '$gray4',
    border: '1px solid $gray8',
  },
  '&:focus': {
    color: '$gray12',
    backgroundColor: '$gray5',
    border: '1px solid $gray8',
    boxShadow: 'none',
    outline: 'none',
  },
  '&:active': {
    color: '$gray12',
    backgroundColor: '$gray5',
    border: '1px solid $gray8',
  },
})

const SelectItem = styled('option', {})

const SelectNamespace = Object.assign(Select, { Item: SelectItem })

export { SelectNamespace as Select }
