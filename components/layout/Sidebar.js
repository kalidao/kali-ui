import React from 'react'
import { styled } from '../../styles/stitches.config'
import { PlusIcon } from '@radix-ui/react-icons';
import NewDaoSquare from "../my-daos/NewDaoSquare";

const SidebarLayout = styled('div', {
  position: "absolute",
  width: "5rem",
  height: '100%',
  bottom: "0px",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end"
});

const CreateIcon = styled('div', {
  background: '$accent',
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
      <NewDaoSquare />
    </SidebarLayout>
  )
}
