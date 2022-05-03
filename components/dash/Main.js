import React from 'react'
import { styled } from '../../styles/stitches.config';
import MyDAOs from "./my-daos/MyDAOs"; 

const Main = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  paddingTop: '1rem',
  paddingRight: '3rem'
});

export default function MainComponent() {
  return (
    <Main>
      <MyDAOs />
    </Main>
  )
}
