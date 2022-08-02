import React from 'react'
import { Page, Text, Document, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 60,
  },
  text: {
    marginTop: 12,
    marginHorizontal: 12,
    fontSize: 12,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
  },
})

const Br = () => '\n'
const Tab = () => '  '

const VoterSignature = ({ dao, chain, proposal, signature }) => {
  console.log(signature)
  return (
    <Document>
      <Page style={styles.body} orientation="landscape">
        <Text style={styles.text}>
          DAO:
          <Tab />
          {dao}
          <Br />
          Chain:
          {chain}
          <Br />
          Proposal #:
          {proposal}
          <Br />
          Signature:
          <Tab />
          {signature}
          <Br />
          <Br />
        </Text>
      </Page>
    </Document>
  )
}

export default VoterSignature
