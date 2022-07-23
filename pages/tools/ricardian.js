import React from 'react'
import Layout from '../../components/layout'
import MintRicardian from '../../components/tools/MintRicardian'

export default function Ricardian() {
  return (
    <Layout heading="Ricardian" content="Use Ricardian to wrap your account or DAO with a legal entity.">
      <MintRicardian />
    </Layout>
  )
}
