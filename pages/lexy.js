import React from 'react'
import Layout from '../components/layout'
import Lexy from '../components/lexy/index'
import NewDaoSquare from '../components/my-daos/NewDaoSquare'

export default function LexyPage() {
  return (
    <Layout heading="Lexy">
      <Lexy />
      <NewDaoSquare />
    </Layout>
  )
}
