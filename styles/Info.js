import { Flex, Text, Box } from './elements'

export default function Info({ heading, children, props }) {
  return (
    <Box>
      <Box
        css={{
          fontFamily: 'Screen',
          fontWeight: '700',
          fontSize: '24px',
          borderTopLeftRadius: '25px',
          borderTopRightRadius: '25px',
          boxShadow: 'rgba(60, 60, 60, 0.4) 1px 1px 6px 0px inset, rgba(60, 60, 60, 0.4) -1px -1px 6px 1px inset',
          borderBottom: '1px solid rgba(0, 0, 0, 0.15)',
          minWidth: '15rem',
          overflow: 'hidden',
          padding: '1rem 1rem 0.5rem 1rem',
        }}
      >
        {heading}
      </Box>
      <Box
        css={{
          padding: '1rem',
          boxShadow: 'rgba(60, 60, 60, 0.4) 1px 1px 6px 0px inset, rgba(60, 60, 60, 0.4) -1px -1px 6px 1px inset',
          borderBottomLeftRadius: '25px',
          borderBottomRightRadius: '25px',
          minWidth: '15rem',
          overflow: 'hidden',
          padding: '1rem',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
