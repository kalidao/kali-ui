import Layout from '@components/layout'
import UserDAOs from '@components/user-daos'
import { useRouter } from 'next/router'
import { NextPage } from 'next'

// TODO: Error page is not an address
const UserDAOsPage: NextPage = () => {
  const router = useRouter()
  return (
    <Layout
      heading={'User'}
      content={`Learn more about user activity on Kali platform.`}
    >
      <UserDAOs address={router.query.user as string} />
    </Layout>
  )
}

export default UserDAOsPage
