import React from 'react'
import { styled } from '../../styles/stitches.config'
import { PlusIcon } from '@radix-ui/react-icons';

const SidebarLayout = styled('div', {
  position: "absolute",
  width: "5rem",
  height: '100%',
  bottom: "0px",
  borderRight: "1px solid $border",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end"
});

const CreateIcon = styled('div', {
  background: '$purple',
  width: '5rem',
  height: '5rem',
  fontWeight: '200',
  fontSize: '69px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

export default function Sidebar() {
  return (
    <SidebarLayout>
      <CreateIcon>
        +
      </CreateIcon>
    </SidebarLayout>
  )
}
