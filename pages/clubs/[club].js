import React from 'react'
import Layout from '../../components/layout'
import { useRouter } from 'next/router'
import Club from '../../components/club/';

export default function Clone() {
  const router = useRouter();
  const club = router.query.club

  return (
    <Layout heading="Club">
        <Club club={club} />
    </Layout>
  )
}