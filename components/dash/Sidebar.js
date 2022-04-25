import React from 'react'
import { styled } from '../../styles/stitches.config'

const SidebarLayout = styled('div', {
  borderRight: "1px solid $border"
});

const CreateIcon = styled('div', {

});

export default function Sidebar() {
  return (
    <SidebarLayout>
      Sidebar
    </SidebarLayout>
  )
}
