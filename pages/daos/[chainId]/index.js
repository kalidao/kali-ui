import Layout from '../../../components/layout'
import AllDAOs from '../../../components/all-daos'
import NewDaoSquare from '../../../components/my-daos/NewDaoSquare'
import { useRouter } from 'next/router'
import { GRAPH_URL } from '../../../graph'
import { addresses } from '../../../constants/addresses'

export async function getStaticPaths() {
  return {
    paths: [
      { params: { chainId: '1' } },
      { params: { chainId: '4' } },
      { params: { chainId: '137' } },
      { params: { chainId: '42161' } },
    ],
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const res = await fetch(GRAPH_URL[params.chainId], {
    method: 'POST',
    body: JSON.stringify({
      query: `query {
            daos {
              id
              token {
                name
              }
              members {
                id
              }
            }  
          }`,
    }),
  })
  const daos = await res.json()

  return { props: { daos } }
}

export default function DAOs({ daos }) {
  const router = useRouter()
  const chainId = router.query.chainId
  console.log('dao', daos?.data?.daos)
  return (
    <Layout heading={`DAOs: ${addresses[chainId]['name']}`}>
      {<AllDAOs daos={daos?.data?.daos} chainId={chainId} />}
      <NewDaoSquare />
    </Layout>
  )
}
