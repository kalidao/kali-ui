import { styled } from './stitches.config'

const Table = styled('table', {
  width: '100%',
})

const Row = styled('tr', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const Heading = styled('th', {
  color: '$gray8',
})

const Data = styled('td', {
  display: 'table-cell',
  verticalAlign: 'middle',
  textAlign: 'center',
  textJustify: 'center',
})

export { Table, Row, Heading, Data }
