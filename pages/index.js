import Layout from '../components/layout';
import globalStyles from '../styles/globalStyles';
import MyDAOs from '../components/my-daos';
import NewDaoSquare from '../components/my-daos/NewDaoSquare';
import { useNetwork, useAccount } from 'wagmi';
import { useQuery } from '@apollo/client';
import { USER_DAOS } from '../graph';

export default function Home() {
  const { activeChain } = useNetwork();
  const { data: account } = useAccount();
  const { loading, error, data } = useQuery(USER_DAOS, {
    variables: { address: account?.address },
    // client: new ApolloClient({
    //   uri: GRAPH_URL[daoChain],
    //   cache: new InMemoryCache()
    // })
  });
  return (
    <Layout heading="DAOs">
      {!error && <MyDAOs daos={data && data['members']} />}
      <NewDaoSquare />
    </Layout>  
  );
};