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
          boxShadow: 'rgba(0, 0, 0, 0.1) 1px 1px 6px 0px inset, rgba(0, 0, 0, 0.1) -1px -1px 6px 1px inset',
          borderBottom: '1px solid rgba(0, 0, 0, 0.15)',
          width: '100%',
          overflow: 'hidden',
          padding: '1rem 1rem 0.5rem 1rem',
        }}
      >
        {heading}
      </Box>
      <Box
        css={{
          padding: '1rem',
          boxShadow: 'rgba(0, 0, 0, 0.1) 1px 1px 6px 0px inset, rgba(0, 0, 0, 0.1) -1px -1px 6px 1px inset',
          borderBottomLeftRadius: '25px',
          borderBottomRightRadius: '25px',
          width: '100%',
          overflow: 'hidden',
          padding: '1rem',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
