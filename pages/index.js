import React from 'react'
import { Header } from '../components/layout';
import { Box } from "../styles/elements";
import globalStyles from '../styles/globalStyles';
import MyDAOs from '../components/my-daos';
import NewDaoSquare from '../components/my-daos/NewDaoSquare';

export default function Home() {

  globalStyles();

  return (
    <Box>
        <Header />
        <MyDAOs />
        <NewDaoSquare />
    </Box>  
  );
};