import { useNetwork } from 'wagmi'
import Layout from '../../components/layout'
import AllDAOs from '../../components/all-daos'
import NewDaoSquare from '../../components/my-daos/NewDaoSquare'
import { ALL_DAOS } from '../../graph'
import { Spinner } from '../../components/elements/'
import { useGraph } from '../../components/hooks/useGraph'

export default function DAOs() {
  const { activeChain } = useNetwork()
  // const [daos, setDaos] = useState();
  const { data, isLoading } = useGraph(activeChain?.id, ALL_DAOS)
  const daos = data?.daos
  console.log('daos')
  
  return (
    <Layout heading="All DAOs">
      {isLoading && (
        <Spinner
          css={{
            position: 'absolute',
            top: '50%',
            right: '50%',
          }}
        />
      )}
      {daos && <AllDAOs daos={daos} chainId={activeChain?.chainId} />}
      <NewDaoSquare />
    </Layout>
  )
}
