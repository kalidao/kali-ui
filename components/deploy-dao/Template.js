import React from 'react'
import { styled } from '../../styles/stitches.config'

const Flex = styled('div', {
  display: 'flex',
  width: '100%',
  gap: '0.1rem',
  alignItems: 'center',
})

const TemplateButton = styled('div', {
  // border: '1px solid $border',
  // borderRadius: '20px',
  padding: '0.2rem 0.4rem',
  // boxShadow: "0px 0px 4px rgba(255, 0, 0, .25)",
  width: '25%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // TODO: background color change if selected
  variants: {
    color: {
      red: {
        border: '1px solid rgba(255, 0, 0, .25)',
        boxShadow: '0px 0px 4px rgba(255, 0, 0, .25)',
      },
      green: {
        border: '1px solid rgba(0, 255, 0, .25)',
        boxShadow: '0px 0px 4px rgba(0, 255, 0, .25)',
      },
      yellow: {
        border: '1px solid rgba(255, 240, 0, .25)',
        boxShadow: '0px 0px 4px rgba(255, 240, 0, .25)',
      },
      blue: {
        border: '1px solid rgba(0, 0, 255, .25)',
        boxShadow: '0px 0px 4px rgba(0, 0, 255, .25)',
      },
    },
  },
})

export default function Template() {
  return (
    <Flex>
      <TemplateButton color="red">Investment</TemplateButton>
      <TemplateButton color="green">Company</TemplateButton>
      <TemplateButton color="yellow">Non-Profit</TemplateButton>
      <TemplateButton color="blue">Social</TemplateButton>
    </Flex>
  )
}
