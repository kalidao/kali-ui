import React from "react"
import { Page, Text, Document, StyleSheet, Font } from "@react-pdf/renderer"

Font.register({
  family: "Times-New-Roman",
  fonts: [
    {
      src: "../../../../public/fonts/Times-New-Roman/Times-New-Roman.ttf",
    },
    {
      src: `../../../../public/fonts/Times-New-Roman/Times-New-Roman-Bold.ttf`,
      fontWeight: "bold",
    },
    {
      src: `../../../../public/fonts/Times-New-Roman/Times-New-Roman-Italic.ttf`,
      fontWeight: "normal",
      fontStyle: "italic",
    },
    {
      src: `../../../../public/fonts/Times-New-Roman/Times-New-Roman-BoldItalic.ttf`,
      fontWeight: "bold",
      fontStyle: "italic",
    },
  ],
})

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 60,
  },
  title: {
    fontSize: 25,
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
    fontStyle: "italic",
    fontFamily: "Times-Roman",
  },
  heading1: {
    fontSize: 12,
    textAlign: "center",
    textDecoration: "underline",
    textTransform: "capitalize",
    fontFamily: "Times-Roman",
  },
  heading2: {
    fontSize: 12,
    textAlign: "center",
    fontFamily: "Times-Roman",
  },
  subheader: {
    fontSize: 12,
    textAlign: "center",
    textTransform: "capitalize",
    fontFamily: "Times-Roman",
  },
  text: {
    margin: 12,
    fontSize: 12,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  numbered_list: {
    margin: 12,
    fontSize: 12,
    textIndent: 30,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  bulleted_list: {
    fontSize: 12,
    marginBottom: 12,
    textIndent: 30,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Times-Roman",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 10,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    fontFamily: "Times-Roman",
  },
})

const Br = () => "\n"
const Indent = () => "   "

const RicardianTemplate = ({ ricardianId }) => {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.heading1}>SCHEDULE C</Text>
        <Text style={styles.subheader}>
          SEPARATE SERIES OPERATING AGREEMENT
        </Text>
        <Text style={styles.title}>Richardian LLC, <Br /> {ricardianId} Series</Text>
        <Text style={styles.heading2}>
          Delaware Limited Liability Company Agreement
        </Text>
        <Text style={styles.heading2}>
          0x43B644a01d87025c9046F12eE4cdeC7E04258eBf
        </Text>
        <Text style={styles.text}>
          THIS LIMITED LIABILITY COMPANY AGREEMENT (this “Agreement”) of
          Ricardian LLC, a Delaware limited liability company (the “Company”),
          is effective as of February 1, 2021 (the “Effective Date”), by LexDAO
          LLC, Ricardian Series, a Delaware limited liability company (referred
          to herein as “LexDAO” or the “Member”) as the initial member of the
          Company.
        </Text>
        <Text style={styles.heading1}>RECITALS</Text>
        <Text style={styles.numbered_list}>
          A. <Indent /> The Company has been organized as a separate Series of
          the Master LLC in accordance with the Delaware Limited Liability
          Company Act, 6 Del. C. Section 18-101, et seq. (as amended from time
          to time, the “Act”).
          <Br />
          <Br />
          B. <Indent /> The Master LLC Certificate of Formation includes a
          notice of limitation of liabilities of series limited liability
          company interests in accordance with Section 18-215(b) of the Act.
          <Br />
          <Br />
          C. <Indent /> LexDAO, the sole member of the Master LLC, desires to
          facilitate the convenient formation of limited liability accounts on
          Ethereum, and to this end, invites the Company to establish a Series
          subject to the terms of the Master LLC Agreement.
          <Br />
          <Br />
          NOW, THEREFORE, in consideration of the agreements and obligations set
          forth herein and for other good and valuable consideration, the
          receipt and sufficiency of which are hereby acknowledged, the Members
          agree as follows:
        </Text>
        <Text style={styles.heading1}>ARTICLE 1</Text>
        <Text style={styles.subheader}>ORGANIZATIONAL MATTERS</Text>
        <Text style={styles.numbered_list}>
          1.1
          <Indent />
          <Text style={{ textDecoration: "underline" }}>Smart Contract.</Text>
          <Indent />
          This Agreement is entered into through a Ricardian Mint and is
          otherwise documented on IPFS at ricardianllc.eth. Any amendments to
          this Agreement shall only be valid if made with a Confirmed
          Transaction with the `updateTokenDetails()` function of the Ricardian
          Smart Contract and as otherwise permitted under this Agreement and the
          Master LLC Agreement. Any signature or execution made through the use
          of private keys on Ethereum for any matters relating to the Master LLC
          or a Series LLC, including, but not limited to, a Ricardian Mint or
          Ricardian Revocation, shall be valid, as if signed in writing.
          <Br />
          <Br />
          1.2
          <Indent />
          <Text style={{ textDecoration: "underline" }}>Name.</Text>
          <Indent />
          The name of the Company shall be “Ricardian LLC, {ricardianId}”. For
          the avoidance of doubt, “{ricardianId}” reflects the RicardianId
          generated through a Ricardian Mint to the Address that created this
          Agreement under Section 1.1 (such Address, the “Series Ethereum
          Address”). The business of the Company may be conducted under that
          name or, upon compliance with applicable laws, any other name that the
          Members deems appropriate or advisable. The Members shall file or
          cause to be filed any fictitious name certificates and similar
          filings, and any amendments thereto, that the Members consider
          appropriate or advisable.
          <Br />
          <Br />
          1.3
          <Indent />
          <Text style={{ textDecoration: "underline" }}>Term.</Text>
          <Indent />
          The “Term” of the Company shall be perpetual. Except as specifically
          provided in Section 6.1, the Company shall not be dissolved prior to
          the end of its Term.
          <Br />
          <Br />
          1.4 <Indent />
          <Text style={{ textDecoration: "underline" }}>
            Registered Office and Agent.
          </Text>
          <Indent />
          The initial registered office and agent of the Company shall be as
          stated in the Master LLC Certificate of Formation.
          <Br />
          <Br />
          1.5 <Indent />
          <Text style={{ textDecoration: "underline" }}>Offices.</Text>
          <Indent />
          The Company will maintain its principal business office at such places
          of business as the Members may deem advisable for the conduct of the
          Company’s business. The Company may have such other offices and in
          such locations as the Members may determine from time to time, or the
          business of the Company may require.
          <Br />
          <Br />
          1.6 <Indent />
          <Text style={{ textDecoration: "underline" }}>Purpose.</Text>
          <Indent />
          The Company has been created to engage in any and all lawful
          activities and transactions as may be necessary or advisable to
          complete the Company’s business as determined by the Members.
          <Br />
          <Br />
          1.7 <Indent />
          <Text style={{ textDecoration: "underline" }}>
            Additional Documents.
          </Text>
          <Indent />
          The Members shall cause to be executed, filed, recorded, published, or
          amended in the name of the Company any documents or Ethereum
          transactions as the Members in their sole and absolute discretion
          determine to be necessary or advisable, (a) in connection with the
          conversion or the formation, operation, dissolution, winding up, or
          termination of the Company pursuant to applicable law, or (b) to
          otherwise give effect to the terms of this Agreement. The terms and
          provisions of each document described in the preceding sentence shall
          be initially established and shall be amended from time to time as
          necessary to cause such terms and provisions to be consistent with
          applicable law, the terms and provisions of this Agreement, or the
          Master LLC Agreement.
          <Br />
          <Br />
          1.8 <Indent />
          <Text style={{ textDecoration: "underline" }}>Taxation Status.</Text>
          <Indent />
          At all times that the Company has only one Member (who owns 100% of
          the limited liability company interests in the Company), it is the
          intention of the Members that the Company be disregarded for federal,
          state, local and foreign income tax purposes. Otherwise, this Company
          shall be, to the extent permissible by applicable law, treated as a
          “partnership” for federal and applicable State tax purposes.
        </Text>
        <Text style={styles.heading1}>ARTICLE 2</Text>
        <Text style={styles.subheader}>SEPARATE SERIES AND CAPITALIZATION</Text>
        <Text style={styles.numbered_list}>
          2.1 <Indent />
          <Text style={{ textDecoration: "underline" }}>
            Establishment of Series.
          </Text>
          <Indent />
          Pursuant to Section 18-215(b) of the Act and the Master LLC, the
          Master LLC is authorized to establish separate members and limited
          liability company interests with separate and distinct rights, powers,
          duties, obligations, businesses and objectives. Notice is hereby given
          that the Company is hereby established as a Series under the Master
          LLC Agreement.
          <Br />
          <Br />
          2.2 <Indent />
          <Text style={{ textDecoration: "underline" }}>
            Separate Existence.
          </Text>
          <Indent />
          The Series created hereby, and the rights and obligations of the
          Members will be governed by this Agreement. The debts, liabilities,
          obligations and expenses incurred, with respect to the Company will be
          enforceable against the assets of the Company only and not against the
          assets of the Master LLC generally or any other Series of the Master,
          and, unless otherwise provided in this Agreement, none of the debts,
          liabilities, obligations and expenses incurred, contracted for or
          otherwise existing with respect to the Master LLC generally or any
          other Series of the Master LLC will be enforceable against the assets
          of the Company. A member participating in one Series will have no
          rights or interest with respect to any other Series, other than
          through that Member’s interest in that Series independently acquired
          by that Member. This Agreement and all provisions herein will be
          interpreted in a manner to give full effect to the separateness of
          each Series. The Master LLC shall take reasonable steps as are
          necessary to implement the provisions of this Section. The Company
          will be dissolved and its affairs wound up pursuant to the provisions
          of this Agreement. The dissolution and termination of the Company will
          not, in and of itself, cause or result in the dissolution or
          termination of the Master LLC or any other Series.
          <Br />
          <Br />
          2.3 <Indent />
          <Text style={{ textDecoration: "underline" }}>Maintenance.</Text>
          <Indent />
          The Company will do all things necessary to maintain its limited
          liability company existence separate. In furtherance of the foregoing,
          the Company must (i) maintain, or cause to be maintained by an agent
          under the Company’s control, possession of all its books and records
          (including, as applicable, storage of electronic records online or in
          “cloud” services), (ii) account for and manage all of its liabilities
          separately from those of any other person, and (iii) identify
          separately all its assets from those of any other person.
          <Br />
          <Br />
          2.4 <Indent />
          <Text style={{ textDecoration: "underline" }}>Disclaimers.</Text>
          <Indent />
          The Members agree to the disclaimers set forth under Schedule B of the
          Master LLC Agreement and shall at all times hold the Master LLC and
          its representatives harmless of any losses or claims relating to the
          content of such Schedule B.
          <Br />
          <Br />
          2.5 <Indent />
          <Text style={{ textDecoration: "underline" }}>
            Capital Contributions.
          </Text>
          <Indent />
          The Members may make such capital contributions in such amounts and at
          such times as the Members shall determine.
        </Text>
        <Text style={styles.heading1}>ARTICLE 3</Text>
        <Text style={styles.subheader}>MEMBERS</Text>
        <Text style={styles.numbered_list}>
          3.1 <Indent />
          <Text style={{ textDecoration: "underline" }}>
            Limited Liability.
          </Text>
          <Indent />
          No Member shall be personally liable for any debt, obligation, or
          liability of the Company or a Series, whether that liability or
          obligation arises in contract, tort, or otherwise, solely by reason of
          being a Member of the Company or a Series.
          <Br />
          <Br />
          3.2 <Indent />
          <Text style={{ textDecoration: "underline" }}>
            Nature of Interest.
          </Text>
          <Indent />A Member’s interest constitutes personal property. No Member
          has any interest in any specific asset or property of the Company.
        </Text>
        <Text style={styles.heading1}>ARTICLE 4</Text>
        <Text style={styles.subheader}>
          MANAGEMENT AND CONTROL OF THE COMPANY
        </Text>
        <Text style={styles.numbered_list}>
          4.1 <Indent />
          <Text style={{ textDecoration: "underline" }}>
            Management of the Company by Members.
          </Text>
          <Indent />
          The business, property, and affairs of the Company shall be managed
          exclusively by or under the direction of the Members. Except for
          situations in which the approval of the Master LLC is expressly
          required by the Act or this Agreement, the Members shall have full,
          complete, and exclusive authority, power, and discretion to manage and
          control the business, property, and affairs of the Company, to make
          all decisions regarding those matters, and to perform any and all
          other acts or activities customary or incident to the management of
          the Company’s business, property, and affairs.
          <Br />
          <Br />
          4.2 <Indent />
          <Text style={{ textDecoration: "underline" }}>
            Obligations between Members.
          </Text>
          <Indent />
          Except as otherwise expressly provided, nothing contained in this
          Agreement will be deemed to constitute any Member, in that Member’s
          capacity as a Member, an agent or legal representative of any other
          Member or to create any fiduciary relationship between Members for any
          purpose whatsoever, apart from obligations between the members of a
          limited liability company as may be created by the Act. Except as
          otherwise expressly provided in this Agreement, a Member has no
          authority to act for, or to assume any obligation or responsibility on
          behalf of, any other Member or the Company.
          <Br />
          <Br />
          4.3 <Indent />
          <Text style={{ textDecoration: "underline" }}>Indemnification.</Text>
          <Indent />
          The Company shall indemnify any person who was or is a party defendant
          or is threatened to be made a party defendant, pending or completed
          action, suit or proceeding, whether civil, criminal, administrative,
          or investigative (other than an action by or in the right of the
          Company) by reason of the fact that they are or were a Member of the
          Company, manager, employee, or agent of the Company, or are or were
          serving at the request of the Company, against expenses (including
          attorney’s fees), judgments, fines, and amounts paid in settlement
          actually and reasonably incurred in connection with such action, suit
          or proceeding if the Members determine that they acted in good faith
          and in a manner they reasonably believed to be in or not opposed to
          the best interest of the Company, and with respect to any criminal
          action proceeding, have no reasonable cause to believe their conduct
          was unlawful. The termination of any action, suit, or proceeding by
          judgment, order, settlement, conviction, or upon a plea of “nolo
          Contendere” or its equivalent, shall not in itself create a
          presumption that the person did or did not act in good faith and in a
          manner which they reasonably believed to be in the best interest of
          the Company, and, with respect to any criminal action or proceeding,
          had reasonable cause to believe that their conduct was lawful.
        </Text>
        <Text style={styles.heading1}>ARTICLE 5</Text>
        <Text style={styles.subheader}>RECORDS</Text>
        <Text style={styles.numbered_list}>
          5.1 <Indent />
          <Text style={{ textDecoration: "underline" }}>
            Books and Records.
          </Text>
          <Indent />
          The books and records of the Company shall be kept, and the financial
          position and the results of its operations recorded, in accordance
          with any appropriate accounting method selected by the Members in
          their sole discretion and consistently applied.
        </Text>
        <Text style={styles.heading1}>ARTICLE 6</Text>
        <Text style={styles.subheader}>DISSOLUTION AND WINDING UP</Text>
        <Text style={styles.numbered_list}>
          6.1 <Indent />
          <Text style={{ textDecoration: "underline" }}>Dissolution.</Text>
          <Indent />
          The Company will be dissolved on the happening of any of the following
          events:
        </Text>
        <Text style={styles.bulleted_list}>
          -<Indent />Sale, transfer, or other disposition of all or substantially all of
          the property of the Company; <Br />
          -<Indent />The agreement of all of the Members;<Br />
          -<Indent />Ricardian Revocation executed by the Master LLC; or<Br />
          -<Indent />By operation of law.
        </Text>
        <Text style={styles.heading1}>ARTICLE 7</Text>
        <Text style={styles.subheader}>MISCELLANEOUS</Text>
        <Text style={styles.numbered_list}>
          7.1 <Indent />
          <Text style={{ textDecoration: "underline" }}>
            Complete Agreement.
          </Text>
          <Indent />
          This Agreement constitutes the complete and exclusive statement of
          agreement among the Members with respect to the subject matter herein
          and replaces and supersedes all prior written and oral agreements or
          statements by and among the Members. No representation, statement,
          condition, or warranty not contained in or otherwise incorporated into
          this Agreement will be binding on the Members. To the extent that any
          provision of this Agreement conflicts with any provision of the Master
          LLC Agreement, the Master LLC Agreement shall control.
          <Br />
          <Br />
          7.2 <Indent />
          <Text style={{ textDecoration: "underline" }}>Governing Law.</Text>
          <Indent />
          The interpretation and enforceability of this Agreement and the rights
          and liabilities of the members as such shall be governed by the laws
          of the State of Delaware, without giving effect to its conflict of
          laws principles to the extent those principles or rules would require
          or permit the application of the laws of another jurisdiction. To the
          extent permitted by the Act and other applicable laws, the provisions
          of this Agreement shall supersede any contrary provisions of the Act
          or other applicable laws.
          <Br />
          <Br />
          7.3 <Indent />
          <Text style={{ textDecoration: "underline" }}>Arbitration.</Text>
          <Indent />
          Disputes among the Members related to this Agreement or the Master LLC
          Agreement shall be first submitted to mediation. The terms and
          procedure for mediation shall be arranged by the parties to the
          dispute. If good-faith mediation of a dispute proves impossible or if
          an agreed-upon mediation outcome cannot be obtained by the parties,
          the dispute may be submitted to arbitration in accordance with the
          rules of the American Arbitration Association. All parties shall
          initially share the cost of arbitration, but the prevailing party or
          parties may be awarded attorney fees, costs and other expenses of
          arbitration. All arbitration decisions shall be final, binding and
          conclusive on all the parties to arbitration, and legal judgment may
          be entered based upon such decision in accordance with applicable law
          in any court having jurisdiction to do so.
          <Br />
          <Br />
          7.4 <Indent />
          <Text style={{ textDecoration: "underline" }}>Severability.</Text>
          <Indent />
          In the event any provision of this Agreement is determined to be
          invalid or unenforceable, such provision shall be deemed severed from
          the remainder of this Agreement and replaced with a valid and
          enforceable provision as similar in intent as reasonably possible to
          the provision so severed and shall not cause the invalidity or
          unenforceability of the remainder of this Agreement.
          <Br />
          <Br />
          7.5 <Indent />
          <Text style={{ textDecoration: "underline" }}>Amendments.</Text>
          <Indent />
          Amendments to this Agreement may be proposed by any Member and adopted
          upon the written consent of the Members under the method described in
          Section 1.1.
          <Br />
          <Br />
          7.6 <Indent />
          <Text style={{ textDecoration: "underline" }}>
            Ministerial and Administrative Amendments.
          </Text>
          <Indent />
          Notwithstanding the limitations above, ministerial or administrative
          amendments as may in the discretion of the Master LLC be deemed
          necessary or appropriate and those amendments as may be required by
          law, may be made from time to time without the consent of any of the
          Members; provided, however, that no such amendment will be adopted
          pursuant to this Section unless that amendment would not alter, or
          result in the alteration of, the limited liability of the Members,
          capital accounts, the status of the Company as a “partnership” for
          federal income tax purposes, or methods of making allocations,
          distributions or determining the interest or ownership percentage of
          the Members.
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  )
}

export default RicardianTemplate
