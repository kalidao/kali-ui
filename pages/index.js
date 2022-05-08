import React from 'react'
import { Header, Sidebar } from '../components/layout';
import { Box } from "../styles/elements";
import globalStyles from '../styles/globalStyles';
import MyDAOs from '../components/my-daos';

export default function Home() {

  globalStyles();

  return (
    <Box css={{ minHeight: '100vh' }}>
      <Box 
        css={{
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          position: 'absolute',
          zIndex: '-1',
          background: '$background',
        }}
      />
        <Header />
        <Sidebar />
        <MyDAOs />
    </Box>  
  );
};