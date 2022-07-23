import Layout from '../../components/layout'
import UserDAOs from '../../components/user-daos/'
import NewDaoSquare from '../../components/home/NewDaoSquare'
import { useRouter } from 'next/router'
import { useEnsName } from 'wagmi'

// TODO: Error page is not an address
export default function UserDAOsPage() {
  const router = useRouter()
  const { data } = useEnsName({
    addressOrName: router.query.user,
    chainId: Number(1),
  })

  return (
    <Layout
      heading={data ? data : 'User'}
      content={`Learn more about ${data ? data : 'user'}'s activity on Kali platform.`}
    >
      <UserDAOs address={router.query.user} />
      <NewDaoSquare />
    </Layout>
  )
}
