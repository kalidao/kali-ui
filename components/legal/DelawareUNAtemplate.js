import React from "react"
import { Page, Text, Document, StyleSheet } from "@react-pdf/renderer"

// Styles
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 60,
  },
  heading1: {
    fontSize: 12,
    marginTop: 12,
    textAlign: "center",
    textDecoration: "underline",
    textTransform: "capitalize",
    fontFamily: "Times-Roman",
  },
  heading2: {
    fontSize: 12,
    marginHorizontal: 12,
    textAlign: "center",
    textTransform: "capitalize",
    fontFamily: "Times-Roman",
  },
  heading3: {
    fontSize: 12,
    marginHorizontal: 12,
    textAlign: "center",
    fontFamily: "Times-Roman",
  },
  text: {
    marginTop: 12,
    marginHorizontal: 12,
    fontSize: 12,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  numbered_list: {
    marginTop: 12,
    marginHorizontal: 12,
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

// Utility
const Br = () => "\n"
const Tab = () => "  "

// Template
const DelawareUNAtemplate = ({
  name,
  chain,
  url
}) => {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.heading1}>
          Trustless Unincorporated Nonprofit Association Agreement ("TUNAA")
          <Br />
          <Br />
        </Text>
        <Text style={styles.heading3}>Article I - Organization</Text>
        <Text style={styles.numbered_list}>
          Section 1.1
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Status.</Text>
          <Tab />
          {name} (the "DAO") is a "nonprofit association" under the Delaware
          Uniform Unincorporated Nonprofit Association Act, Del. Code Ann. Tit.
          6, §§ 1901-1916.
          <Br />
          <Br />
          The DAO is not intended to be, and shall not be deemed to be, a
          partnership.
          <Br />
          <Br />
          Section 1.2
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Purposes.</Text>
          <Tab />
          The DAO is organized to carry out the missions stated in its
          membership portal (available at {url}), related websites or otherwise
          memorialized in a writing by the DAO. The DAO is not intended to be or
          become an entity required to register as an “investment company” as
          defined in Section3(a)(1)(A) of the Investment Company Act of 1940, as
          amended.
          <Br />
          <Br />
          Section 1.3
          <Tab />
          <Text style={{ textDecoration: "underline" }}></Text>Nondiscrimination.
          <Tab />
          The DAO shall not arbitrarily discriminate on the basis of race,
          nationality, religion, age, gender, sexual orientation, disability,
          political affiliation, or otherwise.
          <Br />
          <Br />
          Section 1.4
          <Tab />
          <Text style={{ textDecoration: "underline" }}></Text>Decentralized Autonomous Organization (DAO).
          <Tab />
          The DAO is an unincorporated association of individuals, corporations,
          statutory trusts, business trusts, estates, trusts, partnerships,
          limited liability companies, associations, joint ventures, or any
          other legal or commercial entity, many, if not all, of whom agree to
          join together for a common, nonprofit purpose. For the DAO, that
          purpose is encapsulated in its mission statement.
          <Br />
          <Br />
        </Text>
        <Text style={styles.heading3}>Article II - Membership</Text>
        <Text style={styles.numbered_list}>
          Section 2.1
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Eligibility.</Text>
          <Tab />
          Membership in the DAO, as defined in Del. Code Ann. Tit. 6, § 1901, shall be
          voluntary and open to any individual whose purpose or presumed intent is 
          to contribute to the DAO and is willing to accept the
          responsibilities and terms of membership.
          <Br />
          <Br />
          Section 2.2
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Admission.</Text>
          <Tab />
          The DAO is a decentralized network of members and may admit or
          deny individuals for any arbitrary purpose or lack of purpose.
          <Br />
          <Br />
          All of the DAO governing members shall have their membership
          determined upon receipt of voting tokens secured on a public blockchain 
          (“Cryptographic Units”, and such holders, “Members”). Cryptographic Units are used for
          participating in and improving the governance of the DAO through
          affirmative votes effectuted via the Designated Smart
          Contract (defined herein) (such process, “Cryptographic Consensus”).
          Once the DAO admission requirements are met a prospective Member may be
          put up to a vote of the full membership or similar process enabled by
          the Designated Smart Contract. The DAO will consistently review, and
          if necessary, Members may make adjustments to the DAO admission
          requirements based on their evolving needs and as registered in a
          successful vote through the Designated Smart Contract.
          <Br />
          <Br />
          Section 2.3
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Rights.</Text>
          <Tab />
          The DAO's Members shall utilize the “Designated Smart Contract” (a
          smart contract deployed to the Designated Blockchain at the Designated
          Blockchain Address) as the exclusive method of holding, allocating
          rights and obligations among the Members, and spending, or otherwise
          distributing any Tokens that are DAO Property, of minting and issuing
          Cryptographic Units and holding and recording votes among the Members.
          The DAO may also utilize the Designated Smart Contract to administer
          and facilitate certain other arrangements and transactions involving
          the DAO, the Members and/or third parties.
          <Br />
          <Br />
          Members’ rights and responsibilities are controlled by the use of the
          Designated Smart Contact used to conduct the governance and activities
          of the DAO. Members will cast votes and carry out the decisions made
          on the Designated Smart Contract. Cryptographic Units are held in
          Account Addresses, i.e., key-paired wallets controlled by Members in a
          designated hexadecimal address (“Member Web3 Account”).
          <Br />
          <Br />
          Section 2.4
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Responsibilities.</Text>
          <Tab />
          Each Member shall keep reasonably current in payment of any dues or
          membership fees and other financial obligations of membership, if
          applicable and determined by the DAO. Each Member shall notify the DAO of an e-mail address or
          other acceptable communication channel by which such Member may
          receive written or electronic materials required or permitted by this
          document or shall notify the DAO that such Member has no e-mail
          address and designate a mutually acceptable form of communication.
          <Br />
          <Br />
          If you have received any Cryptographic Units or are otherwise a
          Member, you consent and agree to become legally bound by this
          Agreement as both a participant in the DAO and more specifically a
          "DAO Member".
          <Br />
          <Br />
          Section 2.5
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Limitations.</Text>
          <Tab />
          Status as a DAO Member does not (and shall not be deemed to) create,
          and the DAO does not (and shall not be deemed to) include, any
          authority, right or power on the part of a DAO Member to act as the
          agent, representative or attorney of or otherwise act on behalf of the
          DAO or any other Member, to bind the DAO or any other Member to any
          Contract or Liability or to convey any DAO Property or any asset,
          right or property owned or held by or on behalf of the DAO or any
          Member. Without limiting the generality of the foregoing, no Member
          shall be deemed the partner of the DAO or any other Member solely in
          virute of being a Member. No Member shall state, purport, imply, hold
          out or represent to any person that such Member or any other Member
          has any such authority, right or power.
          <Br />
          <Br />
          To the maximum extent permitted by applicable law, no Member shall be
          (or shall be deemed to be) liable for any liability of the DAO or any
          other Member. This shall not (and shall not be deemed to) create or
          imply any obligation of the DAO or any Member to indemnify or
          compensate any Member from, or hold any Member harmless against, any
          Liabilities incurred by such DAO Member under any applicable law, in
          connection with the Member's participation in the DAO or otherwise.
          <Br />
          <Br />
          Section 2.6
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Inactive Status.</Text>
          <Tab />
          A Member who falls from good standing may have their membership
          revoked or suspended through a Guild Kick. References herein to the
          rights and entitlements of Members shall be understood to refer only
          to Members in good standing.
          <Br />
          <Br />
          Section 2.7
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Access to Information.</Text>
          <Tab />
          Members shall have access to information concerning operational and
          financial affairs via the DAO's preferred treasury application. 
          Currently the DAO treasury can be viewed via Designated Smart Contract.
          <Br />
          <Br />
          Section 2.8
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Settlement of Disputes.</Text>
          <Tab />
          In any dispute between the DAO and any of its Members or former
          Members which cannot be resolved through informal negotiation, it
          shall be the policy of the DAO to prefer the use of mediation whereby
          an impartial mediator may facilitate negotiations between the parties
          and assist them in developing a mutually acceptable settlement.
          Neither party with a grievance against the other shall have recourse
          to litigation until the matter is submitted to mediation and attempted
          to be resolved in good faith. All Members agree that there is a
          preference to settle disputes amongst Members or between Members and
          the DAO via decentralized dispute mechanisms in smart contract
          protocols.
          <Br />
          <Br />
          Section 2.9
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Transferability of Membership.</Text>
          <Tab />
          Membership rights and interests may not be transferred except by an
          affirmative majority vote of Members. Any attempted transfer contrary
          to this section shall be wholly void and shall confer no rights on the
          intended transferee and shall be cause (though none is needed) to burn
          the Cryptographic Units through a Guild Kick member removal procedure.
          <Br />
          <Br />
          Section 2.10
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Withdrawal and Expulsion.</Text>
          <Tab />
          A Member may withdraw at any time upon notice to the DAO by electronic
          writing to an appointed representative of the DAO or by public display
          to the DAO’s online coordination systems (including, but not limited
          to, Discord or Telegram). Withdrawal shall be effectuated through the Member burning their Cryptographic Units,
          a vote to burn such withdrawing DAO Member's Cryptographic Units, or
          mechanisms otherwise authorized in the Designated Smart Contract. Any
          such withdrawal request will not be unreasonably denied and shall be
          deemed conclusively as the DAO Member’s intent to withdraw from the
          DAO. A Member may be expelled by the DAO through the Guild Kick
          procedure established in paragraph 2.6 of this document and adopted by
          the membership. Upon termination of membership, all rights and
          interests in the DAO shall cease except for rights to redemption of
          capital pursuant to Article V below (if any).
          <Br />
          <Br />
        </Text>
        <Text style={styles.heading3}>Article III - Meetings of Members</Text>
        <Text style={styles.numbered_list}>
          Section 3.1
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Meetings.</Text>
          <Tab />
          Meetings of members shall be described on a basis at the discretion of
          the Members. Typically, governance meetings are set on weekly cadence
          through online chats where parties agree to conduct such other
          business as may properly come before the meeting.
          <Br />
          <Br />
          Section 3.2
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Special Meetings.</Text>
          <Tab />
          Special meetings of members may be called by a group (the "DAO
          Advisory Group") designated by an affirmative vote of DAO Members in
          accordance with the governance procedures of the Designated Smart
          Contract. The DAO Advisory Group is not required and may never be
          formed. Creation and designation of the DAO Advisory Group will be
          approved via the Designated Smart Contract.
          <Br />
          <Br />
          Section 3.3
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Time and Place.</Text>
          <Tab />
          The date, time and place of all meetings of the DAO Advisory Group
          shall be determined by the DAO Advisory Group or, in the event that
          the DAO Advisory Group fails to act, by a call for vote by the Members
          to be approved by the native governance processes to the Designated
          Smart Contract.
          <Br />
          <Br />
          Section 3.4
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Notice.</Text>
          <Tab />
          Each Member is responsible for monitoring votes of concern on the
          Designated Smart Contract. Notice of votes can be set up by DAO
          Members via the Designated Smart Contract. Notices of meetings shall
          also be posted on the DAO’s official media outlets, including the DAO
          Member information roster, but the inadvertent failure to do so shall
          not affect the validity of the meeting. Any business conducted at a
          meeting of DAO Members other than that specified in the notice of the
          meeting shall be of an advisory nature only.
          <Br />
          <Br />
        </Text>
        <Text style={styles.heading3}>
          Article IV - Decentralized Governance
        </Text>
        <Text style={styles.numbered_list}>
          Section 4.1
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Powers and Duties.</Text>
          <Tab />
          Except as to matters reserved to members by law or by this
          agreement, all powers to be exercised on behalf of the DAO shall be
          exercised by or under the authority of Members or such agents or
          designees approved by Members through Designated Smart Contract
          voting.
          <Br />
          <Br />
        </Text>
        <Text style={styles.heading3}>
          Article V - Decentralized Governance
        </Text>
        <Text style={styles.numbered_list}>
          Section 5.1
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Fiscal Year.</Text>
          <Tab />
          The fiscal year of the DAO shall be the calendar year beginning
          January 1st and ending December 31st.
          <Br />
          <Br />
          Section 5.2
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Indemnification.</Text>
          <Tab />
          The DAO shall indemnify its directors, officers, employees, or agents
          as required under Delaware law, and may indemnify such persons as
          permitted under Delaware law, including its Members for acts that do
          not involve bad faith or intentional misconduct, including fraud.
          Indemnification payments shall be made on a priority basis but only in
          such increments and at such times as will not jeopardize the ability
          of the DAO to pay its other obligations as they become due.
          <Br />
          <Br />
          Section 5.3
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Communication by Electronic Means.</Text>
          <Tab />
          Unless otherwise required by law or by agreement, any notice, vote,
          consent, petition, or other oral or written communication required or
          permitted can be delivered by electronic means, provided that, in the
          case where such communication expressly or impliedly requires the
          signature of the person submitting the communication, means are in
          place to reasonably assure the authenticity of the signature.
          <Br />
          <Br />
        </Text>
        <Text style={styles.heading3}>
          Article VI - Interpretation and Amendment of TUNAA
        </Text>
        <Text style={styles.numbered_list}>
          Section 6.1
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Interpretation.</Text>
          <Tab />
          The DAO Advisory Group (if formed via vote of Members) shall have the
          power to interpret this TUNAA, apply them to particular circumstances,
          and adopt policies in furtherance of them, provided that all such
          actions are reasonable and consistent.
          <Br />
          <Br />
          Section 6.2
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Severability.</Text>
          <Tab />
          In the event that any provision of this TUNAA is determined to be
          invalid or unenforceable under any statute or rule of law, then such
          provision shall be deemed inoperative to such extent and shall be
          deemed modified to conform with such statute or rule of law without
          affecting the validity or enforceability of any other provision of
          this TUNAA.
          <Br />
          <Br />
          Section 6.3
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Amendment.</Text>
          <Tab />
          This TUNAA may be amended by presenting the redlined version of the
          amendments at a meeting of members, and adopted by a vote or merge
          request as recorded by Cryptographic Consensus. As an alternative to
          achieving Cryptographic Consensus, any Member may timely protest a
          merge request made to the TUNAA that has not been adopted as an
          approved version by Members via the Designated Smart Contract.
          <Br />
          <Br />
        </Text>
        <Text style={styles.heading3}>Article VII - Definitions</Text>
        <Text style={styles.numbered_list}>
          (a)
          <Tab />
          “Account Address” means a public key address on the Designated
          Blockchain Network that is uniquely associated with a single private
          key or equivalent.
          <Br />
          <Br />
          (b)
          <Tab />
          “Consensus Rules” means the rules for transaction validity, block
          validity and determination of the canonical blockchain that are
          embodied in the Designated Client.
          <Br />
          <Br />
          (c)
          <Tab />
          “Contract” means any: (i) written, oral, implied by course of
          performance or otherwise or other agreement, contract, understanding,
          arrangement, settlement, instrument, warranty, license, insurance
          policy, benefit plan or legally binding commitment or undertaking; or
          (ii) any representation, statement, promise, commitment, undertaking,
          right or obligation that may be enforceable, or become subject to an
          Order directing performance thereof, based on equitable principles or
          doctrines such as estoppel, reliance, or quasi-contract.
          <Br />
          <Br />
          (d)
          <Tab />
          “DAO Property" means any Token or other asset, right or property
          licensed to or on deposit with or owned, held, custodied, controlled
          or possessed by or on behalf of the DAO, including any Token on
          deposit with or held, controlled, possessed by or on deposit with the
          Designated Smart Contract.
          <Br />
          <Br />
          (e)
          <Tab />
          “Designated Blockchain” means at any given time, the version of the
          digital blockchain ledger that at least a majority of nodes running
          the Designated Blockchain Client on the Designated Blockchain Network
          recognize as canonical as of such time in accordance with the
          Consensus Rules. The initial Designated Blockchain shall be the
          {chain} blockchain as recognized by the Designated Blockchain Client
          on the Designated Blockchain Network.
          <Br />
          <Br />
          (f)
          <Tab />
          “Designated Blockchain Client” means the blockchain software client
          designated as the “Designated Blockchain Client” by the Members.
          <Br />
          <Br />
          (g)
          <Tab />
          “Designated Blockchain Network” means the blockchain network
          designated as the “Designated Blockchain Network” by the Members. The
          initial Designated Blockchain Network shall be the Official Go
          Ethereum client available at
          "https://github.com/ethereum/go-ethereum", as recognized by the
          Designated Blockchain Client.
          <Br />
          <Br />
          (h)
          <Tab />
          “Designated Smart Contract” means the smart contract deployed at
          an address associated with the creation of the DAO on the Designated Blockchain associated with the
          Members and Cryptographic Units. 
          <Br />
          <Br />
          (i)
          <Tab />
          “Liability” means any debt, obligation, duty or liability of any
          nature (including any unknown, undisclosed, unmatured, unaccrued,
          unasserted, contingent, indirect, conditional, implied, vicarious,
          inchoate derivative, joint, several or secondary liability),
          regardless of whether such debt, obligation, duty or liability would
          be required to be disclosed on a balance sheet prepared in accordance
          with generally accepted accounting principles and regardless of
          whether such debt, obligation, duty or liability is immediately due
          and payable. To be “Liable” means to have, suffer, incur, be obligated
          for or be subject to a Liability.
          <Br />
          <Br />
          (j)
          <Tab />
          “Guild Kick” means removal from the membership via vote by Members
          upon their Cryptographic Units to destroy another Member’s
          Cryptographic Units through a burn function or other similar process.
          Unless specifically provided otherwise, or in the Designated Smart
          Contract, a member subject to a Guild Kick shall not be entitled to
          any distribution or return of capital, funds, retains, etc.
          <Br />
          <Br />
        </Text>
      </Page>
    </Document>
  )
}

export default DelawareUNAtemplate
