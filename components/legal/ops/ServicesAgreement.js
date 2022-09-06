import React from 'react'
import { Page, Text, Document, StyleSheet, Font } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 60,
  },
  heading1: {
    fontSize: 12,
    marginTop: 12,
    textAlign: 'center',
    textDecoration: 'underline',
    textTransform: 'capitalize',
    fontWeight: 700,
    fontFamily: 'Times-Roman',
  },
  heading2: {
    fontSize: 12,
    marginHorizontal: 12,
    textAlign: 'center',
    textTransform: 'capitalize',
    fontFamily: 'Times-Roman',
  },
  heading3: {
    fontSize: 12,
    marginHorizontal: 12,
    textAlign: 'center',
    fontFamily: 'Times-Roman',
  },
  text: {
    marginTop: 12,
    marginHorizontal: 12,
    fontSize: 12,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
  },
  numbered_list: {
    marginTop: 12,
    marginHorizontal: 12,
    fontSize: 12,
    textIndent: 30,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
  },
  bulleted_list: {
    fontSize: 12,
    marginBottom: 12,
    textIndent: 30,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 10,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: 'Times-Roman',
  },
})

const Br = () => '\n'
const Tab = () => '  '

const ServicesAgreementTemplate = ({ customerEthAddress, serviceProviderEthAddress, service, serviceToken }) => {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.heading1}>GENERAL SERVICE AGREEMENT (the “Agreement”)</Text>

        <Text style={styles.heading3}>BETWEEN</Text>

        <Text style={styles.heading3}>{customerEthAddress}</Text>
        <Text style={styles.heading3}>(the “Customer”)</Text>

        <Text style={styles.heading3}>- AND -</Text>

        <Text style={styles.heading3}>{serviceProviderEthAddress}</Text>
        <Text style={styles.heading3}>(the “Service Provider”).</Text>

        <Text style={styles.heading3}>
          <Br />
          BACKGROUND:
        </Text>

        <Text style={styles.text}>
          The Customer is of the opinion that the Service Provider has the necessary qualifications, experience and
          abilities to provide services to the Customer. The Service Provider is agreeable to providing such services to
          the Customer on the terms and conditions set out in this Agreement.
          <Br />
          <Br />
          <Text style={{ textDecoration: 'underline' }}>IN CONSIDERATION OF </Text>
          the matters described above and of the mutual benefits and obligations set forth in this Agreement, the
          receipt and sufficiency of which consideration is hereby acknowledged, the Customer and the Service Provider
          (individually the “<Text style={{ textDecoration: 'underline' }}>Party</Text>” and collectively the “
          <Text style={{ textDecoration: 'underline' }}>Parties</Text>” to this Agreement) agree as follows:
        </Text>

        <Text style={styles.heading3}>
          <Br />
          Services Provided
        </Text>

        <Text style={styles.numbered_list}>
          1.
          <Tab />
          The Customer hereby agrees to engage the Service Provider to provide the Customer with services (the
          “Services”) consisting of:
          <Br />
          <Tab />
          <Tab />• Providing the following services by demand: {service}. (For example: consultation, web3 development,
          advertising, graphic design, web design, audiovisual and photography.)
          <Br />
          2.
          <Tab />
          The Services will also include any other tasks which the Parties may agree on. The Service Provider hereby
          agrees to provide such Services to the Customer.
          <Br />
        </Text>

        <Text style={styles.heading3}>
          <Br />
          Term of Agreement
        </Text>

        <Text style={styles.numbered_list}>
          3.
          <Tab />
          The term of this Agreement (the “<Text style={{ textDecoration: 'underline' }}>Term</Text>”) will begin on the
          blockstamp of the smart contract this Agreement is associated with and will remain in full force and effect
          indefinitely until terminated as provided in this Agreement.
          <Br />
          4.
          <Tab />
          In the event that either Party wishes to terminate this Agreement, that Party will be required to provide
          reasonable notice to the other Party.
          <Br />
          5.
          <Tab />
          Except as otherwise provided in this Agreement, the obligations of the Service Provider will end upon the
          termination of this Agreement.
          <Br />
        </Text>

        <Text style={styles.heading3}>
          <Br />
          Performance
        </Text>

        <Text style={styles.numbered_list}>
          6.
          <Tab />
          The Parties agree to do everything necessary to ensure that the terms of this Agreement take effect.
          <Br />
        </Text>

        <Text style={styles.heading3}>
          <Br />
          Currency
        </Text>

        <Text style={styles.numbered_list}>
          7.
          <Tab />
          Except as otherwise provided in this Agreement, all monetary amounts referred to in this Agreement are in{' '}
          {serviceToken}.
          <Br />
        </Text>

        <Text style={styles.heading3}>
          <Br />
          Compensation
        </Text>

        <Text style={styles.numbered_list}>
          8.
          <Tab />
          For the services rendered by the Service Provider as required by this Agreement, the Customer will provide
          compensation (the “<Text style={{ textDecoration: 'underline' }}>Compensation</Text>”) to the Service Provider
          as follows:
          <Br />
          <Tab />
          <Tab />
          • The Customer will pay the Service Provider per project agreed. Each project has its own costs and the
          Service Provider agrees to inform the Customer what are the costs involved when setting the quotation and the
          Customer agrees to pay the total amount when the project is delivered.
          <Br />
          9.
          <Tab />
          The Compensation will be payable upon completion of the Services.
          <Br />
          10.
          <Tab />
          The above Compensation includes all applicable sales tax, and duties as required by law.
          <Br />
        </Text>

        <Text style={styles.heading3}>
          <Br />
          Reimbursement of Expenses
        </Text>

        <Text style={styles.numbered_list}>
          11.
          <Tab />
          The Service Provider will not be reimbursed for expenses incurred by the Service Provider in connection with
          providing the Services of this Agreement.
          <Br />
        </Text>

        <Text style={styles.heading3}>
          <Br />
          Confidentiality
        </Text>

        <Text style={styles.numbered_list}>
          12.
          <Tab />
          Confidential information (the “Confidential Information”) refers to any data or information relating to the
          business of the Customer which would reasonably be considered to be proprietary to the Customer including, but
          not limited to, accounting records, business processes, and client records and that is not generally known in
          the industry of the Customer and where the release of that Confidential Information could reasonably be
          expected to cause harm to the Customer.
          <Br />
          13.
          <Tab />
          The Service Provider agrees that they will not disclose, divulge, reveal, report or use, for any purpose, any
          Confidential Information which the Service Provider has obtained, except as authorized by the Customer. This
          obligation will survive indefinitely upon termination of this Agreement.
          <Br />
          14.
          <Tab />
          All written and oral information and material disclosed or provided by the Customer to the Service Provider
          under this Agreement is Confidential Information regardless of whether it was provided before or after the
          date of this Agreement or how it was provided to the Service Provider.
          <Br />
        </Text>

        <Text style={styles.heading3}>
          <Br />
          Return of Property
        </Text>

        <Text style={styles.numbered_list}>
          15.
          <Tab />
          Upon the expiry or termination of this Agreement, the Service Provider will return to the Customer any
          property, documentation, records, or Confidential Information which is the property of the Customer.
          <Br />
        </Text>

        <Text style={styles.heading3}>
          <Br />
          Capacity/Independent Contractor
        </Text>

        <Text style={styles.numbered_list}>
          16.
          <Tab />
          In providing the Services under this Agreement it is expressly agreed that the Service Provider is acting as
          an independent contractor and not as an employee. The Service Provider and the Customer acknowledge that this
          Agreement does not create a partnership or joint venture between them, and is exclusively a contract for
          service.
          <Br />
        </Text>

        <Text style={styles.heading3}>
          <Br />
          Notice
        </Text>

        <Text style={styles.numbered_list}>
          17.
          <Tab />
          All notices, requests, demands or other communications required or permitted by the terms of this Agreement
          will be given in writing and delivered to the Parties of this Agreement as any Party may from time to time
          notify the other.
          <Br />
        </Text>

        <Text style={styles.heading3}>
          <Br />
          Dispute Resolution
        </Text>

        <Text style={styles.numbered_list}>
          18.
          <Tab />
          In the event a dispute arises out of or in connection with this Agreement, the Parties will attempt to resolve
          the dispute through friendly consultation.
          <Br />
          19.
          <Tab />
          If the dispute is not resolved within a reasonable period then any or all outstanding issues may be submitted
          to mediation in accordance with any statutory rules of mediation. If mediation is unavailable or is not
          successful in resolving the entire dispute, any or all outstanding issues may be submitted to LexDAO for
          resolution. If LexDAO is unavailable or undesirable, any outstanding issues will be submitted to final and
          binding arbitration in accordance with the laws of the State of Delaware. The arbitrator's award will be
          final, and judgment may be entered upon it by any court having jurisdiction within the State of Delaware.
          <Br />
        </Text>

        <Text style={styles.heading3}>
          <Br />
          Modification of Agreement
        </Text>

        <Text style={styles.numbered_list}>
          20.
          <Tab />
          Any amendment or modification of this Agreement or additional obligation assumed by either Party in connection
          with this Agreement will only be binding if evidenced in writing signed by each Party or an authorized
          representative of each Party.
          <Br />
        </Text>

        <Text style={styles.heading3}>
          <Br />
          Assignment
        </Text>

        <Text style={styles.numbered_list}>
          22.
          <Tab />
          The Service Provider will not voluntarily or by operation of law assign or otherwise transfer its obligations
          under this Agreement without the prior written consent of the Customer.
          <Br />
        </Text>

        <Text style={styles.heading3}>
          <Br />
          Entire Agreement
        </Text>

        <Text style={styles.numbered_list}>
          23.
          <Tab />
          It is agreed that there is no representation, warranty, collateral agreement or condition affecting this
          Agreement except as expressly provided in this Agreement.
          <Br />
        </Text>

        <Text style={styles.heading3}>
          <Br />
          Enurement
        </Text>

        <Text style={styles.numbered_list}>
          24.
          <Tab />
          This Agreement will enure to the benefit of and be binding on the Parties and their respective heirs,
          executors, administrators, successors and permitted assigns.
          <Br />
        </Text>

        <Text style={styles.heading3}>
          <Br />
          Titles/Headings
        </Text>

        <Text style={styles.numbered_list}>
          25.
          <Tab />
          Headings are inserted for the convenience of the Parties only and are not to be considered when interpreting
          this Agreement.
          <Br />
        </Text>

        <Text style={styles.heading3}>
          <Br />
          Governing Law
        </Text>

        <Text style={styles.numbered_list}>
          26.
          <Tab />
          It is the intention of the Parties to this Agreement that this Agreement and the performance under this
          Agreement, and all suits and special proceedings under this Agreement, be construed in accordance with and
          governed, to the exclusion of the law of any other forum, by the laws of the State of Delaware, without regard
          to the jurisdiction in which any action or special proceeding may be instituted.
          <Br />
        </Text>

        <Text style={styles.heading3}>
          <Br />
          Severability
        </Text>

        <Text style={styles.numbered_list}>
          27.
          <Tab />
          In the event that any of the provisions of this Agreement are held to be invalid or unenforceable in whole or
          in part, all other provisions will nevertheless continue to be valid and enforceable with the invalid or
          unenforceable parts severed from the remainder of this Agreement.
          <Br />
        </Text>

        <Text style={styles.heading3}>
          <Br />
          Waiver
        </Text>

        <Text style={styles.numbered_list}>
          28.
          <Tab />
          The waiver by either Party of a breach, default, delay or omission of any of the provisions of this Agreement
          by the other Party will not be construed as a waiver of any subsequent breach of the same or other provisions.
          <Br />
        </Text>

        <Text style={styles.heading3}>
          <Br />
          SIGNED by
        </Text>

        <Text style={styles.text}>
          <Br />
          CUSTOMER:
          <Br />
          /s/ {customerEthAddress}
          <Br />
          SERVICE PROVIDER:
          <Br />
          /s/ {serviceProviderEthAddress}
          <Br />
        </Text>
      </Page>
    </Document>
  )
}

export default ServicesAgreementTemplate
