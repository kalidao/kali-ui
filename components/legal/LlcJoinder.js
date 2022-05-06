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

const LlcJoinder = ({ name, address, state }) => {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.heading1}>LLC MEMBERSHIP JOINDER AGREEMENT</Text>
        <Text style={styles.text}>
          THIS LLC MEMBERSHIP JOINDER AGREEMENT (this “Agreement”) is entered into by and among {name} at the public key
          address {address} (“Company”) and the accounts conducting transactions through its approved smart contract
          extensions (“Buyer”, and such smart contracts, “Joinder Contracts”).
        </Text>
        <Text style={styles.heading2}>RECITALS</Text>
        <Text style={styles.text}>
          WHEREAS, Buyer, desires to purchase from Company (also referred to herein as “Seller”), and Seller desires to
          sell to Buyer, tokenized membership units in the Company, subject to the terms set forth herein (such units,
          “Membership Interests”).
          <Br />
        </Text>
        <Text style={styles.text}>
          NOW, THEREFORE, THE PARTIES AGREE AS FOLLOWS:
          <Br />
          <Br />
        </Text>
        <Text style={styles.heading2}>AGREEMENT</Text>
        <Text style={styles.numbered_list}>
          1.
          <Tab />
          Purchase and Sale of Membership Interest.
          <Br />
          <Br />
          (a)
          <Tab />
          Buyer shall purchase from Seller, and Seller shall sell to Buyer, Membership Interests in exchange for capital
          contributions in cryptographic value according to the terms of the sale program recorded at the time of
          purchase in the Joinder Contracts. Such sale shall conclude and be effective upon the recording of the
          transfer in the Joinder Contracts. <Br />
          <Br />
          (b)
          <Tab />
          Seller agrees and acknowledges that no certificate or certificates are necessary to evidence the Membership
          Interests that are being sold by Seller to Buyer hereunder; such transfer shall be deemed effective
          automatically, without further notice or instruction from Seller, and shall be further deemed an acceptance
          and joinder to the membership agreement of Seller (such agreement, the "Operating Agreement") effective at the
          time of purchase.
          <Br />
          <Br />
          2.
          <Tab />
          Representation and Warranties of Seller.
          <Br />
          <Br />
          Seller hereby represents and warrants to Buyer that:
          <Br />
          <Br />
          (a)
          <Tab />
          Seller is a limited liability company duly organized, validly existing and in good standing under the laws of
          the State of {state} with full corporate power and authority to enter into this Agreement and to carry out its
          obligations hereunder. The execution, delivery, and performance by Seller of this Agreement have been duly
          authorized by all necessary corporate action on the part of Seller, and, this Agreement is legally binding
          upon Seller in accordance with its terms;
          <Br />
          <Br />
          (b)
          <Tab />
          The execution, delivery, and performance by Seller of this Agreement and the transactions contemplated thereby
          will not (i) violate the provisions of any order, judgment, or decree of any court or other governmental
          agency or any arbitrator applicable to Seller or the organizational documents of Seller; or (ii) result in a
          material breach of or constitute (with due notice or lapse of time or both) a material default under any
          contract or agreement to which Seller is a party or by which Seller is bound;
          <Br />
          <Br />
          (c)
          <Tab />
          Upon consummation of the transactions contemplated by this Agreement, Seller shall have transferred to Buyer and Buyer shall have
          obtained from Seller all right, title and interest in the Membership Interests, free and clear of any and all
          liens, mortgages, hypothecations, collateral assignments, charges, encumbrances, title defects, security
          interests or claims (whether recorded or unrecorded) of any kind;
          <Br />
          <Br />
          (d)
          <Tab />
          Seller has not retained any investment banker, broker, or finder in connection with the transactions
          contemplated by this Agreement; and
          <Br />
          <Br />
          (e)
          <Tab />
          Seller has provided a copy of the Operating Agreement to Buyer for review, with such copy being deemed
          provided by notice of the public key address of the Company and a form of this Agreement that can be
          reasonably appended thereto.
          <Br />
          <Br />
          3.
          <Tab />
          Representations and Acknowledgments of Buyer.
          <Br />
          <Br />
          Buyer hereby represents and warrants to Seller that:
          <Br />
          <Br />
          (a) <Tab />
          Buyer has the power and authority to enter into this Agreement and to carry out its obligations hereunder. The
          execution, delivery, and performance by Buyer of this Agreement have been duly authorized by all necessary
          corporate actions on the part of Buyer, and, this Agreement is legally binding upon Buyer in accordance with
          its terms;
          <Br />
          <Br />
          (b) <Tab />
          The execution, delivery, and performance by Buyer of this Agreement and the transactions contemplated thereby
          will not (i) violate the provisions of any order, judgment, or decree of any court or other governmental
          agency or any arbitrator applicable to Buyer or the organizational documents of Buyer; or (ii) result in a
          material breach of or constitute (with due notice or lapse of time or both) a material default under any
          contract or agreement to which Buyer is a party or by which Buyer is bound;
          <Br />
          <Br />
          (c) <Tab />
          Buyer has not retained any investment banker, broker, or finder in connection with the transactions
          contemplated by this Agreement; and
          <Br />
          <Br />
          (d) <Tab />
          Buyer has been provided a copy of the Operating Agreement and an opportunity to review, with such copy being
          deemed provided by notice of the public key address of the Company and a form of this Agreement that can be
          reasonably appended thereto.
          <Br />
          <Br />
          4. <Tab />
          Revised Membership Interests and Capital Accounts.
          <Br />
          <Br />
          The Membership Interests in the Company, adjusted to reflect the transfers hereunder shall be as set and
          recorded by the Joinder Contracts and the organizational code of the Seller (the "DAO") on the public key
          addresses associated with the Joinder Contracts and the DAO.
          <Br />
          <Br />
          5. <Tab />
          Binding Effect.
          <Br />
          <Br />
          This Agreement shall be binding upon the legal representatives and successors of Seller and Buyer.
          <Br />
          <Br />
          6. <Tab />
          Governing Law.
          <Br />
          <Br />
          This Agreement shall be governed by and construed in accordance with the laws of the State of {state}, without
          giving effect to any choice of law or conflict of law rules or provisions (whether of the State of {state} or
          any other jurisdiction) that would cause the application of the laws of any jurisdiction other than the State
          of {state}.
          <Br />
          <Br />
          7. <Tab />
          Arbitration.
          <Br />
          <Br />
          Any controversy or claim arising out of or relating to this Agreement, or the breach thereof, shall be settled
          exclusively in online arbitration by arbitrator(s) selected by the parties, or in the absence of such
          selection, by the parties, in accordance with the Commercial Arbitration Rules of the American Arbitration
          Association then in effect, and judgment upon the award rendered by the arbitrator(s) may be entered in any
          court having jurisdiction thereof. All costs of the arbitration and the fees of the arbitrators shall be
          allocated between the parties as determined therein, it being the intention of the parties that the prevailing
          party in such a proceeding be made whole with respect to its expenses.
          <Br />
          <Br />
          8. <Tab />
          Entire Agreement.
          <Br />
          <Br />
          This Agreement constitutes the entire agreement of the parties pertaining to the sale of the Membership
          Interest by Seller and supersedes all prior and contemporaneous agreements, representations, and
          understandings of the parties with respect to such sale.
          <Br />
          <Br />
          9. <Tab />
          Counterparts.
          <Br />
          <Br />
          This Agreement may be signed in counterparts with the same effect as if the signature on each such counterpart
          were on the same instrument. Facsimiles of signatures shall be deemed to be originals.
          <Br />
          <Br />
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  )
}

export default LlcJoinder
