import React from 'react'
import { DashboardLayout } from "../styles/Dashboard";
import Header from "../components/dash/Header";
import Sidebar from "../components/dash/Sidebar";
import Main from '../components/dash/Main';

export default function Home() {
  return (
    <DashboardLayout>
        <Header />
        <Sidebar />
        <Main />
    </DashboardLayout>
  );
};