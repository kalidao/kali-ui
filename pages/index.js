import Layout from '../components/layout';
import globalStyles from '../styles/globalStyles';
import MyDAOs from '../components/my-daos';
import NewDaoSquare from '../components/my-daos/NewDaoSquare';

export default function Home() {
 
  return (
    <Layout heading="DAOs">
        <MyDAOs />
        <NewDaoSquare />
    </Layout>  
  );
};