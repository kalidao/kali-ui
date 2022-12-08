import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '@components/layout'
import { Box } from '@kalidao/reality'
import DeployDaoWrapper from '@components/deploy-dao'
import Back from '@design/proposal/Back'
import * as styles from '@design/create.css'

const CreatePage: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/')
  })

  const goto = () => {
    router.push('/')
  }

  return (
    <Layout heading="Create" content="Create a Kali DAO.">
      <Box className={styles.container}>
        <Back onClick={goto} />
        <Box>
          <DeployDaoWrapper />
        </Box>
      </Box>
    </Layout>
  )
}

export default CreatePage
