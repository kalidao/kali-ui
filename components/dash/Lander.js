import { DashboardLayout } from "../../styles/Dashboard";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from './Main';

export default function Dashboard() {

  return (
    <DashboardLayout>
        <Header />
        <Sidebar />
        <Main />
    </DashboardLayout>
  )
}
