import React from "react"
import { Page, Text, Document, StyleSheet, Font } from "@react-pdf/renderer"

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
    fontWeight: 700,
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
    marginHorizontal: 12,
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

const Br = () => "\n"
const Tab = () => "  "

const DelawareInvestmentClubTemplate = ({ name, chain }) => {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.heading1}>OPERATING AGREEMENT OF {name}</Text>
        <Text style={styles.text}>
          This Operating Agreement (this “Agreement”) sets forth the rights and
          obligations among {name}, a Delaware limited liability company (the
          “Org”) and the members of the Org.
        </Text>
        <Text style={styles.heading1}>BACKGROUND</Text>
        <Text style={styles.numbered_list}>
          A.
          <Tab />
          The Org has been formed for the purposes contemplated by this
          Agreement by the filing with the Secretary of State of the State of
          Delaware a Certificate of Formation (the “Certificate”) in
          accordance with the Delaware Limited Liability Company Act (the “Delaware LLC Act”).
          <Br />
          <Br />
          B.
          <Tab />
          This Agreement is being entered into for the purposes of organizing
          and establishing the governance and operations of the Org and the
          rights and obligations of membership in the Org.
          <Br />
        </Text>
        <Text style={styles.heading1}>THE AGREEMENT</Text>
        <Text style={styles.text}>
          In consideration of the mutual covenants contained herein and for
          other good and valuable consideration, the receipt and sufficiency of
          which are hereby acknowledged, the parties hereto, intending to be
          legally bound, hereby covenant and agree as follows:
        </Text>
        <Text style={styles.numbered_list}>
          1.
          <Tab />
          <Text style={{ textDecoration: "underline" }}>
            ORGANIZATIONAL MATTER.
          </Text>
          <Br />
          <Br />
          1.1
          <Tab />
          <Text style={{ textDecoration: "underline" }}>
            Terms and Conditions of Membership.
          </Text>
          <Br />
          <Br />
          (a)
          <Tab />
          Nature of Agreement.
          <Tab />
          This Agreement constitutes the Org’s limited liability company
          agreement (as defined in the Delaware LLC Act).
          <Br />
          <Br />
          (b)
          <Tab />
          Governing Terms.
          <Tab />
          All rights, powers and obligations of the Members relating to the Org
          shall be governed and determined in accordance with: (i) the terms and
          conditions of this Agreement; and (ii) the Delaware LLC Act.
          <Br />
          <Br />
          (c)
          <Tab />
          Relationship of this Agreement to the Delaware LLC Act.
          <Tab />
          To the extent that: (i) any provision of the Delaware LLC Act provides
          that such provision or any right, power or obligation specified
          therein or in the Delaware LLC Act shall apply “unless otherwise
          provided in a limited liability company agreement” or words of similar
          import or Delaware law permits a limited liability company agreement
          to restrict or expand any provision of the Delaware LLC Act and (ii)
          this Agreement directly or indirectly provides otherwise with respect
          to the subject matter of such provision or such right, power or
          obligation, then such subject matter, right, power or obligation shall
          be determined in accordance with this Agreement and not such provision
          of the Delaware LLC Act.
          <Br />
          <Br />
          1.2
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Name of Org.</Text>
          <Tab />
          The name of the Org shall be {name} or such other name as may be
          determined from time to time in accordance with this Agreement.
          <Br />
          <Br />
          1.3
          <Tab />
          <Text style={{ textDecoration: "underline" }}>
            Place of Business; Registered Office.
          </Text>
          <Tab />
          The Org has no fixed offices or place of business. The Org’s
          activities are directed, controlled, and coordinated primarily through
          the Designated Blockchain and other electronic communications
          networks by Members located throughout the world. The registered
          office and registered agent of the Org required by the Delaware LLC
          Act to be maintained in the State of Delaware shall be the office and
          registered agent named in the Certificate or such other office (which
          need not be a place of business of the Org) or registered agent as may
          be designated from time to time in accordance with this Agreement.
          <Br />
          <Br />
          1.4
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Purposes.</Text>
          <Tab />
          The purposes and business of the Org shall be to engage in any other
          lawful acts or activities for which limited liability companies may be
          organized under the Delaware LLC Act, as determined from time to time
          in accordance with this Agreement.
          <Br />
          <Br />
          1.5
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Term.</Text>
          <Tab />
          The term and existence of the Org commenced upon the filing of the
          Certificate and shall respectively continue until the dissolution, if
          any, of the Org and cancellation of the Certificate, if ever, in
          accordance with this Agreement.
          <Br />
          <Br />
          1.6
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Tax Partnership.</Text>
          <Tab />
          The Members intend that the Org shall be treated as a partnership for
          federal and, if applicable, state or local income tax purposes; each
          Member and the Org shall file all tax returns and shall otherwise take
          all tax and financial reporting positions in a manner consistent with
          such treatment.
          <Br />
          <Br />
          1.7
          <Tab />
          <Text style={{ textDecoration: "underline" }}>
            Securities Law Partnership.
          </Text>
          <Tab />
          The Members intend that the Org shall be treated as a partnership for
          federal and, if applicable, state or local securities law purposes;
          each Member and the Org shall actively participate in the management
          and entrepreneurial efforts of the Org in a manner consistent with
          such treatment.
          <Br />
          <Br />
          1.8
          <Tab />
          <Text style={{ textDecoration: "underline" }}>
            Not an Investment Company
          </Text>
          <Tab />
          The Org is not intended to be or become an Entity required to register
          as an “investment company” as defined in Section 3(a)(1)(A) the
          Investment Company Act of 1940, as amended (the “Investment Company
          Act”). The Org is intended to be a private investment company exempt
          from such registration requirements pursuant to Section 3(c)(1) of the
          Investment Company Act, which exempts from registration an Entity the
          outstanding securities of which are beneficially owned by not more
          than 100 Persons and that is not making and does not presently to
          propose to make a public offering of its securities. Each Member shall
          manage the Org in a manner that will not cause the Org to be an
          investment company under the Investment Company Act, including by
          limiting the number of Members to 100 Persons (with certain
          exceptions, such as “knowledgeable persons” as defined in the
          Investment Company Act) and not making or proposing to make a public
          offering of any of its Membership Interests or other securities.
          <Br />
          <Br />
          1.9
          <Tab />
          <Text style={{ textDecoration: "underline" }}>
            Illegal Distributions; Maintaining Sufficient Net Assets For Member
            Exits.
          </Text>
          <Tab />
          §18-607 of the Delaware LLC Act provides as follows:
          <Br />
          <Br />
          A limited liability company shall not make a distribution to a member
          to the extent that at the time of the distribution, after giving
          effect to the distribution, all liabilities of the limited liability
          company, other than liabilities to members on account of their limited
          liability company interests and liabilities for which the recourse of
          creditors is limited to specified property of the limited liability
          company, exceed the fair value of the assets of the limited liability
          company, except that the fair value of property that is subject to a
          liability for which the recourse of creditors is limited shall be
          included in the assets of the limited liability company only to the
          extent that the fair value of that property exceeds that liability.
          For purposes of this subsection (a), the term “distribution” shall not
          include amounts constituting reasonable compensation for present or
          past services or reasonable payments made in the ordinary course of
          business pursuant to a bona fide retirement plan or other benefits
          program.
          <Br />
          <Br />
          Accordingly, in order to preserve the Members’ right of “free exit” by
          allowing for Org Property to be legally distributable to Members upon
          exit by means of the Designated Smart Contracts, the Org is intended
          to be managed in a such a manner that the Org does not maintain
          Liabilities. Nevertheless, the Org may from time to time incur
          Liabilities. Accordingly, each Member, prior to exercising an exit or
          redeeming another Member’s interests, shall use reasonable care to
          ensure that the resulting distributions of Org Property will not cause
          the Liabilities of the Org to exceed the fair value of the remaining
          Org Property. In the event that a Member knowingly receives a
          distribution in violation of §18-607 of the Delaware LLC Act, such
          Member may be personally liable to return the relevant Org Property or
          the fair value thereof to the Org or a creditor of the Org.
          <Br />
          <Br />
          1.10
          <Tab />
          <Text style={{ textDecoration: "underline" }}>
            Blockchain-Based Governance Mechanisms.
          </Text>
          <Tab />
          <Br />
          <Br />
          (a) Definitions. The following defined terms have the definitions that
          are ascribed to them below
          <Br />
          <Br />
          (i) “Confirmation” of a transaction shall be deemed to have occurred
          if and only if such transaction has been recorded on the Designated
          Blockchain in accordance with the Consensus Rules in a valid block
          whose hashed header is referenced by a commercially reasonable number
          of subsequent valid blocks on the Designated Blockchain, as determined
          from time to time by the Members. The initial number of such blocks
          shall be 12.
          <Br />
          <Br />
          (ii) “Contract” means any written, oral, implied or other agreement,
          contract, understanding, arrangement, instrument, note, guaranty,
          indemnity, representation, warranty, deed, assignment, power of
          attorney, certificate, purchase order, work order, insurance policy,
          benefit plan, commitment, covenant, assurance or undertaking of any
          nature.
          <Br />
          <Br />
          (iii) “Consensus Attack” means an attack that: (A) is undertaken by or
          on behalf of a block producer who controls, or group of cooperating
          block producers who collectively control, a preponderance of the means
          of block production on the Designated Blockchain; and (B) has
          the actual or intended effect of: (1) reversing any transaction made
          to or by any Designated Smart Contract after Confirmation of such
          transaction, including any “double spend” attack having or intended to
          have such effect; or (2) preventing inclusion in blocks or
          Confirmation of any transaction made to or by any Designated Smart
          Contract, including any “censorship attack,” “transaction withholding
          attack” or “block withholding attack” having or intended to have such
          effect.
          <Br />
          <Br />
          (iv) “Consensus Rules” means the rules for transaction validity, block
          validity and determination of the canonical blockchain that are
          embodied in the Designated Blockchain Client.
          <Br />
          <Br />
          (v) “Designated Blockchain” means at any given time, the version of
          the digital blockchain ledger that at least a majority of nodes
          running the Designated Blockchain Client recognize 
          as canonical as of such time in accordance with the
          Consensus Rules. The initial Designated Blockchain shall be the
          {chain} blockchain as recognized by the Designated Blockchain Client
          on the Designated Blockchain.
          <Br />
          <Br />
          (vi) “Designated Blockchain Client” means the blockchain software
          client designated as the “Designated Blockchain Client” by the
          Members. The initial Designated Blockchain Client shall be
          the Official Go Ethereum client available at "https://github.com/ethereum/go-ethereum", 
          as it may be updated from time to time.
          <Br />
          <Br />
          (vii) “Designated Blockchain Account Address” means a public
          key address on the Designated Blockchain that is uniquely
          associated with a single private key, and at which no smart contract
          has been deployed.
          <Br />
          <Br />
          (viii) “Designated Smart Contract” means a “smart contract” (as such
          term is commonly understood and used by software engineers expert in
          developing software for use on the Designated Blockchain) that
          is: (A) designated by the Members to serve as a ‘Designated Smart
          Contract’ for one of more specified purposes under this Agreement, and
          (B) deployed to a specified public key address as recognized by the
          Designated Client on the Designated Blockchain. The initial
          Designated Smart Contract for augmenting the governance of the Org,
          including with respect to the admission, resignation and expulsion of
          Members, the minting, issuance and accounting for Membership
          Interests, the submission, voting and passage of Proposals and the
          escrow, release allocation of Tokens owned by the Org or the Members
          is the instance of the applicable Designated Smart Contract Source
          Code deployed to the Designated Blockchain by the Members as recognized
          by the Designated Client on the Designated Blockchain (the
          “Designated Governance Smart Contract”).
          <Br />
          <Br />
          (ix) “Designated Smart Contract Source Code” means the source code that
          has been designated by the Members to be deployed as a Designated
          Smart Contract. The initial Designated Smart Contract Source Code for
          the Designated Governance Smart Contract is the code referenced
          at "https://github.com/kalidao/kali-contracts".
          <Br />
          <Br />
          (x) “Distributed Org Property” means any asset, right or property
          that was once Org Property and has been distributed or allocated to a
          Member or former Member.
          <Br />
          <Br />
          (xi) “Order” means any restraining order, preliminary or permanent
          injunction, stay or other order, writ, injunction, judgment or decree
          that either: (A) is issued by a court of competent jurisdiction, or
          (B) arises by operation of applicable law as if issued by a court of
          competent jurisdiction, including, in the case of clause “(B)” an
          automatic stay imposed by applicable law upon the filing of a petition
          for bankruptcy.
          <Br />
          <Br />
          (xii) “Legal Proceeding” means any private or governmental action,
          suit, litigation, arbitration, claim, proceeding (including any civil,
          criminal, administrative, investigative or appellate proceeding),
          hearing, inquiry, audit, examination or investigation commenced,
          brought, conducted or heard by or before, or otherwise involving, any
          court or other governmental entity or any arbitrator or arbitration
          panel.
          <Br />
          <Br />
          (xiii) “Legal Requirement” means any federal, state, local, municipal,
          foreign or other law, statute, legislation, constitution, principle of
          common law, resolution, ordinance, code, edict, decree, proclamation,
          treaty, convention, rule, regulation, ruling, directive,
          pronouncement, requirement, specification, determination, decision,
          opinion or interpretation issued, enacted, adopted, passed, approved,
          promulgated, made, implemented or otherwise put into effect by or
          under the authority of any Governmental Body.
          <Br />
          <Br />
          (xiv) “Liability” means any debt, obligation, duty or liability of any
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
          (xv) “Lien” means any lien, pledge, hypothecation, charge, mortgage,
          security interest, encumbrance, equity, trust, equitable interest,
          claim, preference, right of possession, lease, tenancy, license,
          encroachment, covenant, infringement, interference, Order, proxy,
          option, right of first refusal, preemptive right, community property
          interest, legend, defect, impediment, exception, reservation,
          limitation, impairment, imperfection of title, condition or
          restriction of any nature.
          <Br />
          <Br />
          (xvi) A “Material Adverse Exception Event” on a Designated Smart
          Contract means that one or more of the following has occurred, is
          occurring or would reasonably be expected to occur:
          <Br />
          <Br />
          (A) a Consensus Attack adversely affecting the results or operations
          of such Designated Smart Contract;
          <Br />
          <Br />
          (B) a change to the Consensus Rules or Designated Blockchain Client
          that could reasonably be expected to adversely affect the results or
          operations of such Designated Smart Contract or could reasonably be
          expected to result in a “contentious hard fork” (as such term is
          commonly understood and used by software engineers expert in
          developing blockchain protocol software clients) of the Designated
          Blockchain;
          <Br />
          <Br />
          (C) a “reorganization” (as such term is commonly understood and used
          by software engineers expert in developing blockchain protocol
          software clients) of the Designated Blockchain that could reasonably
          be expected to adversely affect the results or operations of such
          Designated Smart Contract;
          <Br />
          <Br />
          (D) such Designated Smart Contract having become inoperable,
          inaccessible or unusable, or any Tokens under the control of such
          Designated Smart Contract having become permanently “frozen,” “stuck”
          or non-transferable (where such a condition shall be deemed
          “permanent” if such condition would persist except in the event of a
          change to the Consensus Rules that is not reasonably expected to occur
          in the near future), including as the result of any code library or
          repository incorporated by reference into such Designated Smart
          Contract or any other smart contract or oracle on which such
          Designated Smart Contract depends in whole or in part having become
          inoperable, inaccessible or unusable or having itself suffered a
          Material Adverse Exception Event, mutatis mutandis;
          <Br />
          <Br />
          (E) a material and adverse effect on the use, functionality or
          performance of such Designated Smart Contract as the result of a clear
          and manifest bug, defect or error in such Designated Smart Contract,
          as evidenced by the failure of such Designated Smart Contract to
          function in accordance with provisions of this Agreement expressly
          pertaining to such Designated Smart Contract or by documentation or
          other evidence prepared contemporaneously with the Designated Smart
          Contract Source Code demonstrating that the intended functioning of
          such Designated Smart Contract differs materially from the actual
          functioning as a result of such bug, defect or error;
          <Br />
          <Br />
          (F) any unauthorized use of an administrative function or privilege of
          such Designated Smart Contract, including: (1) any use of any
          administrative credential, key, password, account or address by a
          Person who has misappropriated or gained unauthorized access to such
          administrative credential, key, password, account or address or (2)
          any unauthorized use of an administrative function or privilege by a
          Person who ordinarily is authorized to use such administrative
          function or privilege but in a single instance or series of instance
          exceeds such Person’s authority to use such administrative function or
          privilege; provided, however, that it is acknowledged and agreed by
          the Members that the initial Designated Governance Smart Contract does
          not have any administrative function or privilege, and thus this
          clause “(F)” shall be inapplicable to the initial Designated
          Governance Smart Contract; or
          <Br />
          <Br />
          (G) (1) (aa) such Designated Smart Contract or any of the Org Property
          or other Tokens controlled by such Designated Smart Contract becomes
          subject to an Order or applicable Legal Requirement that permanently
          or temporarily prohibits or restrains such Designated Smart Contract
          (or that, if such Designated Smart Contract were a Person, would
          prohibit or restrain such Designated Smart Contract) from executing
          any function or operation it would otherwise reasonably be expected to
          execute or (bb) permanently or temporarily orders or directs such
          Designated Smart Contract (or that, if such Designated Smart Contract
          were a Person, would order or direct such Designated Smart Contract)
          to take an action or bring about a circumstance it would otherwise not
          reasonably be expected to take or bring about; or (2) the Org or any
          Member becomes subject to an Order or applicable Legal Requirement
          requiring the Org or such Member to cause such Designated Smart
          Contract to take or refrain from taking any action or requiring the
          Org or such Member to take or refrain from taking any action with
          respect to any of the Org Property or other Tokens controlled by such
          Designated Smart Contract, in each case, which it is not within the
          power of the Org or such Member to comply with.
          <Br />
          <Br />
          (xvii) “Order” means any: (A) order, judgment, temporary restraining
          order, temporary or permanent injunction, edict, decree, ruling,
          pronouncement, determination, decision, opinion, verdict, sentence,
          subpoena, writ or award issued, made, entered, rendered or otherwise
          put into effect by or under the authority of any court, administrative
          agency or other Governmental Body or any arbitrator or arbitration
          panel; or (B) Contract with any Governmental Body entered into in
          connection with any Legal Proceeding.
          <Br />
          <Br />
          (xviii) “Org Property” means any Token or other asset, right or property
          owned by the Org and, in the case of Tokens, shall include all Tokens
          allocated to the account of the Designated Governance Smart Contract.
          <Br />
          <Br />
          (xvix) “Person” means: (A) any human being/individual/natural person,
          Entity or Governmental Body; and (B) any other thing recognized as a
          legal person under applicable Legal Requirements.
          <Br />
          <Br />
          (xx) “Token” means a digital unit that is recognized by the
          Designated Blockchain Client on the Designated Blockchain as
          capable of: (A) being uniquely associated with or “owned” by a
          particular public-key address on the Designated Blockchain at
          each particular block height; and (B) having Transfers of such digital
          unit recorded on the Designated Blockchain.
          <Br />
          <Br />
          (b) Qualified Exclusivity of Designated Smart Contracts. Except as
          otherwise provided in this Agreement in connection with a Material
          Adverse Exception Event, the Members shall utilize and cause the Org
          to utilize the Designated Smart Contracts as the exclusive method of
          (i) holding. allocating among the Members and spending or otherwise
          distributing any Tokens that are Org Property, (ii) creating and
          assigning Membership Interests, (iii) minting and issuing Shares and
          (iv) making Proposals and recording votes of the Members on Proposals.
          The Members may also utilize the Designated Smart Contracts to
          administer and facilitate certain other arrangements and transactions
          involving the Org, the Members and/or third parties, as approved by
          the Members from time to time pursuant to Proposals.
          <Br />
          <Br />
          (c) Qualified Deference to Results of Designated Smart Contract.
          Except as otherwise provided in this Agreement in connection with a
          Material Adverse Exception Event, among any or all of the Org and the
          Members, the results of operation of the Designated Smart Contracts
          shall be determinative of the rights and obligations of, and shall be
          final, binding upon and not permitted to be contested or disputed by,
          the Org and each of the Members with respect to the Org and all
          matters relating to the Org or the Members in their capacities as
          Members (including the management powers and duties of Members), and
          shall not be contested (in a Legal Proceeding or otherwise) by any of
          them; provided, however, that the foregoing shall not prohibit or
          limit any Legal Proceeding brought by or on behalf of the Org or any
          Member(s) (the “Plaintiff(s)”) against the Org, any other Member(s) or
          any other Person(s) (the “Defendant(s)”) to the extent that:
          <Br />
          <Br />
          (i) a prohibition or limitation of such Legal Proceeding would be
          illegal or unenforceable under the laws of the State of Delaware or
          any applicable U.S. federal law; or
          <Br />
          <Br />
          (ii) such Legal Proceeding satisfies the condition set forth in the
          following clause “(A)” and the condition set forth in the following
          clause “(B)”:
          <Br />
          <Br />
          (A) such Legal Proceeding is based on or arises from a Material
          Adverse Exception Event that either:
          <Br />
          <Br />
          (1) resulted directly or indirectly, in whole or in part, from the
          fraud, willful misconduct or knowing violation of any applicable Legal
          Requirement or applicable Order by the Defendant(s); or
          <Br />
          <Br />
          (2) resulted in an improper personal benefit to the Defendant(s)
          (which may include receipt of a distribution in violation of
          §18-607(a) of the Delaware LLC Act to the extent the Defendant(s) may
          be liable therefor pursuant to §§18-607(b)-(c) of the Delaware LLC
          Act) directly or indirectly, in whole or in part, as a result of such
          Material Adverse Exception Event; and
          <Br />
          <Br />
          (B) Plaintiff(s) suffered or incurred Damages as a result of such
          Material Adverse Exception Event.
          <Br />
          <Br />
          The provisions of this clause “(c)” shall continue to apply to a
          Person who was a Member after such Person is no longer a Member.
          <Br />
          <Br />
          (d) Handling of Material Adverse Exception Events.
          <Br />
          <Br />
          (i) Exception Notice. If any Member becomes aware that there is a
          Material Adverse Exception Event, such Member (the “Sending Member”)
          shall deliver or cause to be delivered to the other Members and , to
          the extent their interests may be implicated, any former Members (the
          “Receiving Members”) a written notice (an “Exception Notice”):
          <Br />
          <Br />
          (A) certifying that the Sending Member believes in good faith that
          there is a Material Adverse Exception Event;
          <Br />
          <Br />
          (B) describing in reasonable detail the events, facts, circumstances
          and reasons forming the basis of such belief;
          <Br />
          <Br />
          (C) if so desired by such Member, describing in reasonable detail a
          proposal by such Member of the actions to be taken, the agreements to
          be entered into, and the remedies to be sought by the Members or the
          Org in response to the Material Adverse Exception Event an “Exception
          Handling Proposal”; and
          <Br />
          <Br />
          (D) including copies of any written evidence or other material written
          information, and summaries of any other evidence, relevant to, and
          material for the consideration of, the Material Adverse Exception
          Event and the other matters referred to in the Exception Notice.
          <Br />
          <Br />
          (ii) Exception Standstill. During the period starting on the date of
          delivery of an Exception Notice and ending at the time an Exception
          Handling Determination is made in accordance with clause “(iii)” of
          this Section 1.10(d) (the “Standstill Period”), each Member and former
          Member shall: (A) safeguard, set aside and hold in trust for the Org
          and the other Members any Distributed Org Property that may have been
          received by such Member or former Member as a result of the Material
          Adverse Exception Event and otherwise treat such Distributed Org
          Property as if it continued to be Org Property, including by
          refraining from withdrawing any Tokens that may have been allocated to
          such Member or former Member as a result of the Material Adverse
          Exception Event that have not yet been withdrawn; and (B) refrain from
          using the Designated Smart Contract in a manner that would reasonably
          be expected to be affected by the Material Adverse Exception Event as
          described in the Exception Notice.
          <Br />
          <Br />
          (iii) Determination of Exception Handling. The term “Exception
          Handling Determination” means a determination by the Members, as
          expressed in an Extraordinary Proposal approved by the Members, as to:
          (A) the existence or non-existence of a Material Adverse Exception
          Event and (B) if a Material Adverse Exception Event has been
          determined to exist, the actions to be taken, the agreements to be
          entered into, and the remedies to be sought by the Org and the Members
          in response thereto. Each of the Members shall act in accordance with
          the Exception Handling Determination. If any amendment to this
          Agreement is required by the Exception Handling Determination, the
          Members shall promptly cause the Org to engage legal counsel to draft
          such amendment for approval by the Members as an Extraordinary
          Proposal.
          <Br />
          <Br />
          (e) Compromise by Members. The provisions of this Section 1.10 shall
          constitute a compromise to which all Members have consented within the
          meaning of the Delaware LLC Act. Any violation or breach of this
          Section 1.10, including the covenant not to sue set forth in clause
          “(c)” of this Section 1.10, shall entitle the applicable Plaintiff(s)
          to any Damages that are not remote or unforeseeable from the
          Defendant(s), including reasonable costs of defense arising from
          breach or violation of the covenant not to sue. Each Member to whom
          the protections of California law may apply: (i) represents, warrants
          and acknowledges that such Member has been fully advised of the
          contents of Section 1542 of the Civil Code of the State of California;
          and (ii) to the extent that such Section may otherwise limit the
          effect of the provisions of this Section 1.10, hereby expressly waives
          the benefits of such Section and any rights that the Member may have
          thereunder. Section 1542 of the Civil Code of the State of California
          provides as follows: “A GENERAL RELEASE DOES NOT EXTEND TO CLAIMS
          WHICH THE CREDITOR DOES NOT KNOW OR SUSPECT TO EXIST IN HIS OR HER
          FAVOR AT THE TIME OF EXECUTING THE RELEASE, WHICH IF KNOWN BY HIM OR
          HER MUST HAVE MATERIALLY AFFECTED HIS OR HER SETTLEMENT WITH THE
          DEBTOR.” Each Member hereby waives the benefits of, and any rights
          that the undersigned may have under, any statute or common law
          regarding protection of release of unknown claims in any jurisdiction
          to the extent that the foregoing would otherwise limit the effect of
          the provisions of this Section 1.10.
        </Text>
        <Text style={styles.heading1}>SECTION 2</Text>
        <Text style={styles.heading2}>
          ADMISSION, EXPULSION, RIGHTS AND OBLIGATIONS OF MEMBERS.
        </Text>
        <Text style={styles.numbered_list}>
          2.1
          <Tab />
          Certain Defined Terms. The following defined terms have the
          definitions that are set forth for them below:
          <Br />
          <Br />
          (a) “Affiliate” of a Person means any other Person that directly or
          indirectly, through one or more intermediaries, controls, or is
          controlled by, or is under common control with, such Person. A Person
          shall be deemed to control another Person if the controlling Person
          possesses, directly or indirectly through one or more intermediaries,
          the power to direct or cause the direction of the management and
          policies of the other Person, whether through the ownership of voting
          securities or interests, the ability to exercise voting power, by
          contract or otherwise.
          <Br />
          <Br />
          (b) “Charter Documents” of an Entity means such Entity’s certificate
          of incorporation, bylaws, articles or memorandum of association or
          similar formation or governing documents, including all amendments
          thereto.
          <Br />
          <Br />
          (c) “Consent” means any approval, consent, ratification, permission,
          waiver, authorization or affirmative vote.
          <Br />
          <Br />
          (e) “Governmental Body” means any: (i) nation, principality, state,
          commonwealth, province, territory, county, municipality, district or
          other jurisdiction of any nature; (ii) federal, state, local,
          municipal, foreign or other government; (iii) governmental authority
          of any nature (including any governmental division, subdivision,
          department, agency, bureau, branch, office, commission, council,
          board, instrumentality, officer, official, representative,
          organization, unit, body or Entity and any court or other tribunal);
          (iv) multi-national organization or body; or (v) individual, Entity or
          body exercising, or entitled to exercise, any executive, legislative,
          judicial, administrative, regulatory, police, military or taxing.
          <Br />
          <Br />
          (f) “Member” means any member (as defined in the Delaware LLC Act) of
          the Org.
          <Br />
          <Br />
          (g) “Member Mapping” of a Member shall mean data that: (i) is a
          collection of artifacts related to the Member’s public-key address (as
          defined in the Designated Governance Smart Contract Source Code) with
          all applicable fields of such mapping having been assigned values
          corresponding to such Member’s information; and (ii) has been stored
          on and is readable from the Designated Blockchain by the Designated
          Governance Smart Contract. For example, the Member Mapping of a Member
          may include values for a Member’s public-key address on the Designated
          Blockchain Network, the number of Shares and Tokens held by such
          Member and the index number of the latest Proposal on which such
          Member voted Yes.
          <Br />
          <Br />
          (h) “Member Economic Percentage” means the percentage of the
          Membership Interests of the Org held by a Member, which at each time
          shall equal: (i) the value of the balanceOf() field of the Member
          Mapping of such Member at such time; divided by (ii) the value of the
          totalSupply() variable of the Designated Governance Smart Contract at
          such time (it being understood that the value described in this clause
          “(ii)” is intended to equal the aggregate of all values of the
          balanceOf() fields of all Member Mappings at such time); multiplied by
          (iii) 100.
          <Br />
          <Br />
          (i) “Member Voting Percentage” means the percentage of issued and
          outstanding Shares held by a Member; for the avoidance of doubt, the
          Member Voting Percentage of a Member shall at each time equal: (i) (A)
          the value of the balance() field of the Member Mapping of such Member
          at such time; divided by (B) the value of the totalSupply() variable
          of the Designated Governance Smart Contract at such time (it being
          understood that the value described in this clause “(B)” is intended
          to equal the aggregate of all values of the balanceOf() fields of all
          Member Mappings at such time); multiplied by (ii) 100.
          <Br />
          <Br />
          (j) “Membership Interest” shall mean a Member’s share of the profits
          and losses of the Org and the Member’s right to receive distributions
          of the Org’s assets.
          <Br />
          <Br />
          (k) “Representatives” of a Person means officers, directors, managers,
          employees, agents, attorneys, accountants, advisors and
          representatives of such Person.
          <Br />
          <Br />
          (l) “Shares” of or held by a Member means the value of the balanceOf()
          field of the Member Mapping of such Member. The Shares held by Member
          represent the Member’s Membership Interest. Shares held by a Member
          entitle the Member to vote.
          <Br />
          <Br />
          (m) “Subsidiary” shall mean, with respect to any Person, any Entity of
          which at least a majority of the securities or other interests having
          by their terms ordinary voting power to elect a majority of the board
          of directors or others performing similar functions with respect to
          such Entity is directly or indirectly owned or controlled by such
          Person or by any one or more of its Subsidiaries.
          <Br />
          <Br />
          2.2
          <Tab />
          Admission of Members.
          <Br />
          <Br />
          (a) Admission as a Member. Members may be admitted upon the approval by 
          the Members of an Ordinary Proposal for the admission of such Person as a Member made
          pursuant to Section 4.3(a) (a “Membership Proposal”) resulting in the
          allocation of Shares to such Person in the Membership Mapping
          representing such Person as recognized by the Designated Governance
          Smart Contract, or other means otherwise approved by the Members.
          <Br />
          <Br />
          (b) Procedure for Membership Proposals. Procedures for making
          Membership Proposals shall be established from time to time by the
          Members. In any event, the Members or their designated representatives
          shall use reasonable best efforts to ensure that each Person wishing
          to become a Member, prior to the Membership Proposal for such Person
          being submitted for a vote of the Members or related process
          authorized by the Designated Smart Contract:
          <Br />
          <Br />
          (i) receives an accurate and complete copy of, and has sufficient
          opportunity to review and ask questions regarding, this Agreement;
          <Br />
          <Br />
          (ii) duly executes and delivers to the Org a Joinder Agreement in
          substantially the form attached hereto as Exhibit A, agreeing to
          automatically and without further action of any Person become a party
          to, be bound by and perform this Agreement in the event that such
          Person’s Membership Proposal is approved;
          <Br />
          <Br />
          (iii) duly completes and delivers to the Org all identity
          verification, KYC and AML verification and background checks required
          for admission of Members to the Org, as determined by the Members;
          <Br />
          <Br />
          (iv) duly completes, executes and delivers to the Org a Form W-9 or
          Form W- 8BEN, as applicable, and any other forms that are necessary or
          desirable to be obtained from the Members under applicable Legal
          Requirements relating to taxes;
          <Br />
          <Br />
          (v) either:
          <Br />
          <Br />
          (A) duly completes, executes and delivers to the Org an Accredited
          Investor Questionnaire substantially in the form attached hereto as
          Exhibit B and provides evidence reasonably satisfactory to the Members
          or their designated representatives of the accuracy thereof
          demonstrating that such Person is an “accredited investor” as such
          term is defined in Rule 501 of Regulation D under the Securities Act;
          or
          <Br />
          <Br />
          (B) establishes to the satisfaction of the Members or their designated
          representatives that another exemption to the registration
          requirements of the Securities Act applies to such Person’s
          acquisition of Shares, as applicable; and
          <Br />
          <Br />
          (vi) offers evidence satisfactory to the Members or their designated
          representatives of the accuracy of the representations and warranties
          that such Person would be making pursuant to Section 2.4.
          <Br />
          <Br />
          (c) Curing Failure to Follow Procedures. In the event that any Member
          learns that any Person has received Shares (and thus become a Member)
          before completing all required procedures for Membership Proposals,
          such Member shall provide written notice thereof to the other Members
          or their designated representatives as promptly as reasonably
          practicable, and the Members shall use reasonable best efforts to
          cause such defects to be cured as promptly as reasonably practicable
          after receiving such notice. In the event any material defect cannot
          be cured or is not promptly cured, the Members shall use reasonable
          best efforts to cause the Person who has not completed the required
          procedures to be removed from the Designated Smart Contract.
          <Br />
          <Br />
          2.3
          <Tab />
          Termination of Membership.
          <Br />
          <Br />
          (a) No Resignation While Holding Shares. Without limiting clause “(b)”
          of this Section 2.3 or any Member’s right to exit pursuant to Section
          5.4(a), so long as a Member continues to hold any Shares, such Member
          shall not have the right or power to withdraw, resign as or otherwise
          voluntarily cease to be a Member prior to the dissolution and winding
          up of the Org; any actual or attempted withdrawal, resignation or
          other cessation of membership in violation of the foregoing shall be
          null and void ab initio and shall have no force or effect.
          <Br />
          <Br />
          (b) Automatic Termination of Membership Upon Certain Events. Any
          Person who is a Member shall automatically and without further action
          of any Person cease to be a Member: (i) at the first time as of which
          such Person no longer holds any Shares; (ii) upon such Person being
          adjudged to be incompetent to serve as a Member or manage such
          Person’s person or property by a court of competent jurisdiction; or
          (iii) upon the death of such Person. Notwithstanding that payment on
          account of a termination of membership may be made after the effective
          time of such termination, any Person who has ceased to be a Member
          will not be considered a Member for any purpose after the applicable
          event described in the preceding sentence. In the case of a partial
          redemption of Shares, a Member’s Capital Account (and any other rights
          corresponding to the redeemed Shares) shall be correspondingly reduced
          for all purposes of this Agreement.
          <Br />
          <Br />
          (c) No Termination of Membership Due to Bankruptcy Etc.; Obligation to
          Notify Members of Such Events. The happening of any the events of
          membership cessation specified in §18-304 of the Delaware LLC Act with
          respect to a Person (including such Person suffering the bankruptcy-
          or insolvency-related events set forth therein) shall not, in and of
          itself, result in the termination of the Membership of such Person. A
          Member suffering any such events shall promptly notify the other
          Members or their designated representatives.
          <Br />
          <Br />
          2.4
          <Tab />
          Representations and Warranties of Members.
          <Br />
          <Br />
          Each Person who is proposing to become or actually becomes a Member
          (the “Representing Person”), hereby represents and warrants, to and
          for the benefit of the Org and each Member of the Org, on each date on
          which such Person is the subject of a pending Membership Proposal or
          is a Member, as follows:
          <Br />
          <Br />
          (a) Capacity, Authority, Etc. The Representing Person has all
          requisite power, authority and capacity to enter into this Agreement
          and to enter into the transactions and conduct the activities
          contemplated by this Agreement. If the Representing Person is an
          Entity, the execution, delivery and performance of this Agreement by
          the Representing Person, and the entry into the transactions and the
          conduct of the activities contemplated by this Agreement by the
          Representing Person, have been duly authorized by all necessary action
          on the part of the Representing Person and its board of directors (or,
          if the Representing Person does not have a board of directors,
          equivalent body or manager), and no other proceedings on the part of
          the Representing Person are necessary to authorize any of the
          aforementioned matters.
          <Br />
          <Br />
          (b) Due Execution. This Agreement has been duly executed and delivered
          by the Representing Person, and constitutes the legal, valid and
          binding obligation of the Representing Person, enforceable against the
          Representing Person in accordance with its terms, subject to
          applicable bankruptcy, insolvency, moratorium or other similar laws
          affecting the rights of creditors generally and rules of law governing
          specific performance, injunctive relief and other equitable remedies.
          <Br />
          <Br />
          (c) Non-Contravention. The execution and delivery of this Agreement
          does not, and the entry into the transactions and the conduct of the
          activities contemplated by this Agreement will not: (i) if the
          Representing Person is an Entity, conflict with or violate any of its
          Charter Documents, or any resolution adopted by its stockholders or
          other holders of voting securities, board of directors (or other
          similar body) or any committee of the board of directors (or other
          similar body) of the Representing Person; (ii) conflict with or
          violate any applicable Legal Requirement to which the Representing
          Person or the Org is subject; (iii) result in any breach of or 
          constitute a default (or an event that with notice or lapse of time 
          or both would become a default) under, or impair the rights of the 
          Representing Person or alter the rights or obligations of any Person under, 
          or give to any Person any rights of termination, amendment, acceleration or cancellation of, or
          result in the creation of a Lien on any of the properties or assets of
          the Representing Person pursuant to, any Contract to which the
          Representing Person is a party or by which it is bound; or (iv)
          contravene, conflict with or result in a violation of any of the terms
          or requirements of, or give any Governmental Body the right to revoke,
          withdraw, suspend, cancel, terminate or modify, any Permit that is
          held by the Representing Person.
          <Br />
          <Br />
          (d) Consents. No Consent from or filing with any Governmental Body or
          under any Contract to which the Representing Person is a party or by
          which it is bound is required to be obtained or made, and the
          Representing Person is not or will not be required to give any notice
          to, any Person in connection with the execution, delivery or
          performance of this Agreement or entry into the transactions and the
          conduct of the activities contemplated by this Agreement.
          <Br />
          <Br />
          (e) Absence of Litigation. There is no Legal Proceeding pending, or,
          to the knowledge of the Representing Person, threatened against the
          Representing Person: (i) that challenges, or that may have the effect
          of preventing, delaying, making illegal or otherwise interfering with,
          the entry into, performance of, compliance with and enforcement of any
          of the obligations of the Representing Person or any other Person
          under this Agreement. No event has occurred, and no claim, dispute or
          other condition or circumstance exists, that will or could reasonably
          be expected to give rise to or serve as a basis for the commencement
          of any such Legal Proceeding.
          <Br />
          <Br />
          (f) Title and Ownership of Tokens. The Representing Person is the
          record and beneficial owner of, and has sole and has exclusive good,
          valid and marketable title to all Tokens contributed or
          to-be-contributed to the Org by the Representing Person, free and
          clear of all Liens. The Representing Person is not a party to any
          option, warrant, purchase right or other Contract that could require
          the Representing Person to Transfer any Tokens (other than this
          Agreement).
          <Br />
          <Br />
          (g) Accredited Investor Status. Unless the Representing Person is a
          designated representative in compliance in all material respects with
          rules set by the Members: (i) the Representing Person is an accredited
          investor as such term is defined in Rule 501 of Regulation D under the
          Securities Act; (ii) the Representing Person has completed and
          delivered to the Org an Accredited Investor Questionnaire in the form
          requested by the Org; and (iii) the statements and information
          provided in the Accredited Investor Questionnaire are accurate.
          <Br />
          <Br />
          (h) No “Bad Actor” Disqualification. Neither the Representing Person
          nor any other Person (including any direct or indirect holders of
          equity interests in the Representing Person) who would become a
          beneficial owner of any Membership Interests (and any Shares
          representing Membership Interests) by virtue of the Representing
          Person’s ownership thereof (in accordance with Rule 506(d) of the
          Securities Act) is subject to any of the “bad actor” disqualifications
          described in Rule 506(d)(1)(i) through (viii) under the Securities Act
          or (d)(3) under the Securities Act.
          <Br />
          <Br />
          (i) Non-Transferability of Membership Interests. The Representing
          Person has been advised and acknowledges and understands that the
          Membership Interests (and any Shares representing Membership
          Interests) have not been registered under the Securities Act, or any
          U.S. state or non-U.S. securities laws and, therefore, in addition to
          the restrictions on Transfer provided by the terms and conditions of
          this Agreement, cannot be resold unless they are registered under the
          Securities Act and applicable U.S. state and non-U.S. securities laws
          or unless an exemption from such registration requirements is
          available, or otherwise permitted by the Members. The Representing
          Person has been advised and acknowledges and understands that any
          transfer of Membership Interests (or any Shares representing
          Membership Interests) in violation of Section 5 of this Agreement may
          result in highly consequences to the Member, the Org and the other
          Members under applicable Legal Requirements, including:
          <Br />
          <Br />
          (i) violating or causing the Org to violate applicable securities
          Laws, including the registration requirements of the Securities Act,
          or causing the Org to become subject to the public company reporting
          requirements under Rule 12(g)(1) promulgated under the Securities
          Exchange Act of 1934, as amended;
          <Br />
          <Br />
          (ii) causing the Org to be considered a “publicly traded partnership”
          under Section 7704(b) of the Code within the meaning of Treasury
          Regulations Section 1.7704- 1(h)(1)(ii), including the look-through
          rule in Treasury Regulations Section 1.7704-1(h)(3);
          <Br />
          <Br />
          (iii) adversely affecting the Org’s existence or qualification as a
          limited liability company under the Delaware LLC Act;
          <Br />
          <Br />
          (iv) causing the Org to lose its status as a partnership for federal
          income tax purposes;
          <Br />
          <Br />
          (v) causing the Org to be required to register as an investment
          company under the Investment Company Act of 1940;
          <Br />
          <Br />
          (vi) causing the Org to be in violation or breach of
          anti-money-laundering, sanctions, export/import controls or other
          applicable financial, trade or commercial Laws; or
          <Br />
          <Br />
          (vii) causing the assets of the Org to be deemed “Plan Assets” as
          defined under the Employee Retirement Income Security Act of 1974 or
          its accompanying regulations or result in any “prohibited transaction”
          thereunder involving the Org.
          <Br />
          <Br />
          (j) Purchase For Own Account. The Representing Person is purchasing
          the Membership Interests (and any Shares representing Membership
          Interests) for its own account for investment, not as a nominee or
          agent, and not with a view to, or for resale in connection with, the
          distribution or other Transfer thereof, and the Representing Person
          has no present intention of selling, granting any participation in, or
          otherwise distributing or Transferring any Membership Interests (and
          any Shares representing Membership Interests).
          <Br />
          <Br />
          (k) Sophistication; Ability to Bear Loss of Investment; Reliance
          Solely on Own Due Diligence.
          <Br />
          <Br />
          (i) The Representing Person has received and carefully reviewed a copy
          of this Agreement and all other documents and agreements referred to
          herein, including the Designated Smart Contract Source Code and the
          disclosure of risk factors attached hereto as Exhibit C, sufficiently
          in advance of becoming a Member to make an informed decision regarding
          becoming a Member. The Representing Person has been given a full and
          fair opportunity to: (A) to ask questions of, and to receive answers
          from, the other Member regarding the subject matter of this Charter
          and the Designated Smart Contracts and (B) to obtain any additional
          information that is necessary to evaluate this Charter and the matters
          contemplated thereby
          <Br />
          <Br />
          (ii) The Representing Person is a Person who is, or in connection with
          this Agreement and the matters contemplated thereby has received the
          advice of Persons who are, knowledgeable, sophisticated and
          experienced in making, and qualified to make, evaluations and
          decisions with respect to the quality, security and intended and
          expected functionality of the Designated Smart Contracts and the other
          matters contemplated by this Agreement. The Representing Person has
          such knowledge and experience in financial and business matters that
          the Representing Person is capable of evaluating the merits and risks
          of this Agreement and an investment in the Org, is able to incur a
          complete loss of such investment without impairing the Representing
          Person’s financial condition and is able to bear the economic risk of
          such investment for an indefinite period of time. The Representing
          Person is relying solely on its own due diligence and analysis in
          determining to become a Member and enter into and perform this
          Agreement. Neither the Representing Person nor any of its
          Representatives or Affiliates has relied on any statement,
          information, representation or warranty (including oral statements,
          due diligence presentations, etc.), or any omission of any statement,
          information, representation or warranty, made by the Org, any Member
          (other than the representations and warranties of the other Members
          set forth in this Section 2.4) or any designated representative of the
          Org or any Member, in determining to become a Member or enter into or
          perform this instrument or any of the transactions contemplated by
          this Agreement. The Member understands that the Org is not making and
          has not made any representation, warranty or other statement, or any
          omission of any representation, warranty or other statement, intended
          to be relied upon or to give rise to any claim, obligation or
          liability based on the accuracy or completeness thereof, and that no
          Member or other Person is authorized to make any such representation,
          warranty or other statement on behalf of the Org or any of the
          Members.
          <Br />
          <Br />
          (l) KYC/AML; No Money Laundering or Sanctions. All information
          provided to the Org and/or its third-party designees for purposes of
          the Org’s required KYC (Know-Your-Customer) and AML
          (Anti-Money-Laundering) checks, including its address and social
          security number or tax ID number, is accurate and complete. The Tokens
          pledged by the Representing Person to acquire Membership Interests
          (and any Shares representing Membership Interests) were not and are
          not directly or indirectly derived from any activities that contravene
          any law, rule, regulation or order (including anti- money laundering
          laws and regulations) applicable to the Representing Person or the
          Org. None of: (i) the Representing Person; (ii) any Person controlling
          or controlled by the Representing Person; (iii) any Person having a
          beneficial interest in the Representing Person; or (iv) any Person for
          whom the Representing Person is acting as agent or nominee in
          connection with this instrument is: (A) a country, territory, entity
          or individual named on an OFAC list as provided at
          http://www.treas.gov/ofac, or a person or entity prohibited under the
          OFAC Programs, regardless of whether or not they appear on the OFAC
          list; or (B) a senior foreign political figure, or any immediate
          family member or close associate of a senior foreign political figure.
          <Br />
          <Br />
          2.5
          <Tab />
          No Personal Liability. Except as otherwise provided in the Delaware
          LLC Act, by applicable Legal Requirement or expressly in this
          Agreement (including Section 1.10(c)), no Member will be obligated
          personally for any debt, obligation, or other Liability of the Org or
          any other Member, whether arising in contract, tort, or otherwise,
          solely by reason of being a Member or Manager or Representative of the
          Org. Except as otherwise provided in this Agreement, a Member’s
          Liability (in its capacity as such) for debts, obligations and other
          Liabilities of the Org shall be limited to such Member’s Member
          Economic Percentage of the Org Property. The immediately preceding
          sentence shall constitute a compromise to which all Members have
          consented within the meaning of the Delaware LLC Act. Notwithstanding
          anything contained herein to the contrary, the failure of the Org to
          observe any formalities or requirements relating to the exercise of
          its powers or management of its business and affairs under this
          Agreement or the Delaware LLC Act shall not be grounds for imposing
          personal Liability on any Member for any Liability of the Org, except
          to the extent constituting fraud, willful misconduct or a knowing
          violation of any applicable Legal Requirement or applicable Order by
          such Member.
          <Br />
          <Br />
          2.6
          <Tab />
          No Right of Partition. No Member shall have the right to seek or
          obtain partition by court decree or operation of law of, or the right
          to personally own or use, any Org Property. The immediately preceding
          sentence shall not be deemed to limit any rights of a Member to
          receive distributions of Org Property in connection with an exit
          authorized by the Designated Smart Contract.
          <Br />
          <Br />
          2.7
          <Tab />
          No Appraisal Rights. No Member shall have any appraisal or dissenters’
          rights in connection with a merger, consolidation or other acquisition
          of the Org or the assets of the Org, and §18-210 of the Delaware LLC
          Act (entitled “Contractual Appraisal Rights”) shall not apply to the
          Org.
          <Br />
          <Br />
          2.8
          <Tab />
          Information Rights and Obligations
          <Br />
          <Br />
          (a) Members’ Information Rights. Subject to clause “(b)” of this
          Section 2.8, each Member shall have the right to obtain from the Org
          from time to time, upon reasonable demand for any purpose reasonably
          related to the Member’s interest as a member (or, to the extent
          applicable, position as manager) of the Org, the information and
          documents such Member has the right to so obtain pursuant to
          §18-305(a)-(b) of the Delaware LLC Act, as amended and in effect on
          the date of the demand. Without limiting or expanding the immediately
          preceding sentence, it is acknowledged and agreed that as of the date
          of this Agreement such information and documents may include:
          <Br />
          <Br />
          (i) true and full information regarding the status of the business and
          financial condition of the Org;
          <Br />
          <Br />
          (ii) promptly after becoming available, a copy of the Org’s federal,
          state and local income tax returns for each year;
          <Br />
          <Br />
          (iii) a current list of the name and last known business, residence or
          mailing address of each Member;
          <Br />
          <Br />
          (iv) a copy of this Agreement and all amendments thereto and the
          certificate of formation of the Org and all amendments thereto,
          together with executed copies of any written powers of attorney
          pursuant to which the limited liability company agreement and any
          certificate and all amendments thereto have been executed;
          <Br />
          <Br />
          (v) true and full information regarding the amount of cash and a
          description and statement of the agreed value of any other property or
          services contributed by each Member and which each Member has agreed
          to contribute in the future, and the date on which each became a
          Member; and
          <Br />
          <Br />
          (vi) such other information regarding the affairs of the Org as is
          just and reasonable.
          <Br />
          <Br />
          (b) Conditions to Members’ Information Rights. The Members or their
          designated representatives shall have the right to keep confidential,
          for such period of time as deemed reasonable, any personally
          identifiable or sensitive information regarding the Members, the
          disclosure of which the Members in good faith believe is not in the
          best interest of the Org or could reasonably be expected to result in
          the Org suffering or incurring Damages or which the Org is required by
          applicable Legal Requirement or Contract with a third party to keep
          confidential.
          <Br />
          <Br />
          (c) Confidentiality Obligations.
          <Br />
          <Br />
          (i) “Confidential Information” means any and all confidential,
          proprietary or non-public information, knowledge, data, Intellectual
          Property, test results, research, business plans, budgets, forecasts,
          projections, documents, reports, records, files, forms and materials
          (in each case, regardless of: (A) whether invented, recorded or made
          available prior to or after the date of this Agreement, (B) the form
          thereof (whether written, unwritten, oral, electronic, tangible or
          intangible); and (C) the Person(s) by or on behalf of whom created)
          (collectively, “Information”):
          <Br />
          <Br />
          (1) made available to any Member by or on behalf of, or belonging to,
          the Org or another Member;
          or (2) substantially related to the business or operations of the Org,
          in each case, including any such Information provided to the Org by
          Entities or other Persons in connection with the Org’s due diligence
          into potential investment opportunities or received pursuant to the
          Org’s information rights with the Entities or other Persons in which
          the Org has invested; provided, however, that Confidential Information
          shall not include any of the foregoing that is or becomes generally
          available to the public other than as a result of or in connection
          with any breach of this Section 2.8(c).
          <Br />
          <Br />
          (ii) Except as authorized by the Org, each Member shall not disclose
          or make available to Persons (other than the Org and other Members) or
          otherwise fail to protect the confidentiality of, or fail to use
          commercially reasonable efforts to protect and maintain the
          confidentiality of, any Confidential Information received by or
          accessible to such Member.
          <Br />
          <Br />
          (iii) Notwithstanding anything to the contrary set forth in the
          preceding clause “(ii)” of this Section 2.8(c), such clause shall not
          apply to any Confidential Information the extent that such
          Confidential Information: (A) was made available to the Org or a
          Member on a non- confidential basis by a third party prior to the date
          of this Agreement, provided that at the time of such disclosure the
          third party was not bound by any contractual or other obligation of
          confidentiality or use restriction with respect thereto; or (B) is
          required to be disclosed by Order of a Governmental Body (provided
          that the Org and the Members or their designated representatives are
          notified of such Order as far in advance of such disclosure, making
          available or failure as reasonably practicable and afforded the
          opportunity to seek (at its own expense) a protective Order or similar
          remedy limiting or mitigating the effects of such Order.
          <Br />
          <Br />
          2.9
          <Tab />
          Exculpation of Members and Elimination of Fiduciary Duties; No
          Indemnification.
          <Br />
          <Br />
          (a) Exculpation of Members. No Member shall be liable to the Org or
          any other Member for any Damages incurred or suffered by reason of any
          action taken or omitted to be taken by such Member in his, her, or its
          capacity as a Member, so long as such action or omission does not
          constitute fraud, willful misconduct or a knowing violation of any
          applicable Legal Requirement or applicable Order by such Member.
          <Br />
          <Br />
          (b) Liabilities and Duties of Members.
          <Br />
          <Br />
          (i) This Agreement is not intended to, and does not, create or impose
          any fiduciary or (except for the contractual duty to perform the
          express provisions of this Agreement, including the implied
          contractual covenant of good faith and fair dealing) other duty on any
          Member relating to the Org or any its assets, operations or affairs or
          any of the other matters contemplated by this Agreement. Furthermore,
          except to the extent prohibited by applicable Legal Requirements, each
          of the Members and the Org hereby waives and agrees to the elimination
          of any and all fiduciary and (except for the contractual duty to
          perform the express provisions of this Agreement, including the
          implied contractual covenant of good faith and fair dealing) other
          duties that, absent such waiver, may be implied by any applicable
          Legal Requirement or otherwise, and in doing so, acknowledges and
          agrees that the duties and obligation of each Member to each other and
          to the Org are only as expressly set forth in this Agreement. The
          provisions of this Agreement, to the extent that they restrict the
          duties and Liabilities of a Member otherwise existing at law or in
          equity or otherwise under applicable Legal Requirements, are agreed by
          the Members to replace such other duties and Liabilities of such
          Member.
          <Br />
          <Br />
          (ii) Whenever in this Agreement a Member is permitted or required to
          make a decision (including a decision that is in such Member’s
          “discretion” or under a grant of similar authority or latitude), the
          Member shall be entitled to consider only such interests and factors
          as such Member desires, including its own interests, and shall have no
          duty or obligation to give any consideration to any interest of or
          factors affecting the Org or any other Person. Whenever in this
          Agreement a Member is permitted or required to make a decision in such
          Member’s “good faith,” the Member shall act under such express
          standard and shall not be subject to any other or different standard
          imposed by this Agreement or any other applicable Legal Requirement.
          <Br />
          <Br />
          (iii) Members: (A) shall be permitted to have, and may presently or in
          the future have, investments or other business relationships,
          ventures, agreements, or arrangements with other Entities engaged in
          the business of the Org (an “Other Business”); (B) may have or may
          develop a strategic relationship with businesses that are or may be
          competitive with the Org; (C) shall not be prohibited by virtue of the
          Members’ investments in the Org from pursuing and engaging in any such
          activities; (D) shall not be obligated to inform the Org or any Member
          of any such opportunity, relationship, or investment (a “Org
          Opportunity”) or to present Org Opportunity, and the Org hereby
          renounces any interest in a Org Opportunity and any expectancy that a
          Org Opportunity will be offered to it; (E) shall not be limited,
          prohibited, or restricted by this Agreement from serving on the board
          of directors or other governing body or committee of any Other
          Business; and (F) shall not be required to offer the Org or any other
          Member any option on or opportunity to acquire, or any entitlement to
          any interest or participation in any Other Business. The parties
          hereto expressly authorize and consent to the involvement of the
          Members in any Other Business. The parties hereto expressly waive, to
          the fullest extent permitted by applicable Legal Requirement, any
          rights to assert any claim that such involvement breaches any
          fiduciary or other duty or obligation owed to the Org or any Member or
          to assert that such involvement constitutes a conflict of interest by
          any Member with respect to the Org or any other Member.
          <Br />
          <Br />
          (c) No Indemnification. Neither the Org nor any Member or Members of
          the Org shall be required to indemnify, compensate, reimburse, defend,
          hold harmless or advance any expenses to any Member for, from or
          against any loss, damage, injury, decline in value, lost opportunity,
          Liability, claim, settlement, judgment, award, fine, penalty, tax,
          fee, charge, cost or expense of any nature (“Damages”) incurred or
          suffered or expected to incurred or suffered, by any Member or any
          Affiliate or Representative of any Member, or any Legal Proceeding by
          or against any Member or any Affiliate or Representative of any
          Member.
          <Br />
          <Br />
        </Text>
        <Text style={styles.heading1}>SECTION 3</Text>
        <Text style={styles.heading2}>
          MATTERS RELATING TO CAPITAL ACCOUNTS
        </Text>
        <Text style={styles.numbered_list}>
          3.1
          <Tab />
          Initial Capital Contributions.
          <Br />
          <Br />
          (a) “Capital Contributions” means any Tokens that a Member contributes
          or is deemed to have contributed to the Org in exchange for Membership
          Interests represented as Shares.
          <Br />
          <Br />
          (b) The Tokens pledged as part of a Member’s approved Membership
          Proposal constitute a Capital Contribution made to the Org in exchange
          for the Membership Interest (represented as Shares) issued to the
          applicable Member as recorded in the Member’s Membership Mapping. All
          such Capital Contributions are property of and are owned by the Org.
          All such Membership Interests (and Shares representing Membership
          Interest) are personal property of and are owned by the applicable
          Member.
          <Br />
          <Br />
          3.2
          <Tab />
          Additional Capital Contributions.
          <Br />
          <Br />
          (a) No Member shall be required to make any additional Capital
          Contributions to the Org. Any future Capital Contributions made after
          a Member’s initial Membership Proposal shall be made by additional
          Membership Proposal tied to the same Membership Mapping.
          <Br />
          <Br />
          (b) No Member shall be required to lend any funds to the Org, and no
          Member shall have any personal liability for the payment or repayment
          of any Capital Contribution by or to any other Member. In the event
          that any Member lends funds to the Org, such funds shall not be deemed
          Capital Contributions and shall not increase the Member’s Capital
          Account.
          <Br />
          <Br />
          3.3
          <Tab />
          Maintenance of Capital Accounts.
          <Br />
          <Br />
          (a) Establishment of Capital Accounts. The Org shall establish and
          maintain for each Member a separate capital account (a “Capital
          Account”) on its books and records in accordance with this Section
          3.3. Each Capital Account shall be established and maintained in
          accordance with the following provisions.
          <Br />
          <Br />
          (b) Increases to Capital Accounts. Each Member’s Capital Account shall
          be increased by the amount of (i) such Member’s Capital Contributions;
          and (ii) any income or gains of the Org allocated to such Member based
          on such Member’s Membership Interest.
          <Br />
          <Br />
          (c) Decreases to Capital Accounts. Each Member’s Capital Account shall
          be decreased: (i) the fair market value of any Tokens distributed to
          such Member on account of such Member’s Membership Interest; and (ii)
          any losses or deductions of the Org allocated to such Member based on
          such Member’s Membership Interest.
          <Br />
          <Br />
          (d) Succession to Capital Accounts by Transfer of Membership
          Interests. In the event that any Membership Interests (including in
          the form of Shares) are Transferred in accordance with the terms of
          this Agreement, the Transferee shall succeed to the Capital Account of
          the Transferor.
          <Br />
          <Br />
          (e) Negative Capital Accounts. In the event that any Member shall have
          a deficit balance in his, her or its Capital Account, such Member
          shall have no obligation, during the term of the Org or upon
          dissolution or liquidation thereof, to restore such negative balance
          or make any Capital Contributions to the Org by reason thereof, except
          as may be required by applicable Legal Requirement or in respect of
          any negative balance resulting from a withdrawal of capital or
          dissolution in contravention of this Agreement.
          <Br />
          <Br />
          (f) No Withdrawal from Capital Accounts. No Member shall be entitled
          to withdraw any part of his, her or its Capital Account or to receive
          any Distribution from the Org, except upon a redemption of Membership
          Interests pursuant to Section 5.4. No Member shall receive any
          interest, salary, or drawing with respect to its Capital Contributions
          or its Capital Account. The Capital Accounts are maintained for the
          sole purpose of allocating items of income, gain, loss, and deduction
          among the Members based on their Membership Interests, and shall have
          no effect on the amount of any Distributions to any Members, in
          liquidation or otherwise.
          <Br />
          <Br />
          (g) Modifications. The foregoing provisions and the other provisions
          of this Agreement relating to the maintenance of Capital Accounts are
          intended to comply with Treasury Regulations Section 1.704-1(b) and
          shall be interpreted and applied in a manner consistent with such
          Treasury Regulations. The Members or their designated representatives
          are authorized to make or cause to be made changes to such provisions
          to ensure compliance with such Treasury Regulations.
          <Br />
          <Br />
          3.4
          <Tab />
          Allocation of Profits and Losses.
          <Br />
          <Br />
          For each Fiscal Year (or portion thereof) income, gain, loss, and
          deductions of the Org shall be allocated among the Members in a manner
          such that the Capital Account balance of each Member is, as nearly as
          possible, equal to the Distributions that would be made to such Member
          if the Org were dissolved, its affairs wound up and its assets sold
          for cash equal to their Book Value, all Liabilities of the Org were
          satisfied (limited with respect to each nonrecourse liability to the
          Book Value of the assets securing such Liability), and the net assets
          of the Org were Distributed to the Members immediately, computed
          immediately prior to the hypothetical sale of assets. “Book Value”
          means, with respect to any Org Property, the Org’s adjusted basis for
          federal income tax purposes, adjusted from time to time to reflect the
          adjustments required or permitted by Treasury Regulation Section
          l.704-l(b)(2)(iv)(d)-(g).
          <Br />
          <Br />
          4.
          <Tab />
          Management and Voting.
          <Br />
          <Br />
          4.1
          <Tab />
          Definitions. The following defined terms shall have the definitions
          that are ascribed to them below:
          <Br />
          <Br />
          (a) “Extraordinary Proposal” means any Proposal for the Org to, or for
          the Org to enter into any Contract providing for the Org to:
          <Br />
          <Br />
          (i) amend, modify or waive the Certificate of Formation or this
          Agreement, other than a deemed amendment expressly provided for by the
          provisions of this Agreement;
          <Br />
          <Br />
          (ii) change the Designated Blockchain, the Designated Blockchain
          Client, or any Designated Smart Contract or Designated Smart Contract Source Code;
          <Br />
          <Br />
          (iii) accept any loan or other indebtedness for borrowed money, pledge
          or grant Liens on any assets or indemnify, guaranty, assume, endorse
          or otherwise become responsible for the obligations or Liabilities of
          any other Person;
          <Br />
          <Br />
          (iv) establish a Subsidiary or enter into any state-law partnership,
          joint venture or similar business arrangement;
          <Br />
          <Br />
          (v) commence or settle any lawsuit, action, dispute or other Legal
          Proceeding or agree to the provision of any equitable relief by the
          Org;
          <Br />
          <Br />
          (vi) initiate or consummate an initial public offering or make a
          public offering and sale of the Membership Interests or any other
          securities; or
          <Br />
          <Br />
          (vii) make an Exception Handling Determination.
          <Br />
          <Br />
          (b) “Exit Proposal” means a Proposal to expel a Member from membership
          in the Org.
          <Br />
          <Br />
          (c) “Liquidation Proposal” means:
          <Br />
          <Br />
          (i) any liquidation, dissolution or winding up of the Org;
          <Br />
          <Br />
          (ii) a merger or consolidation in which the Org is a constituent
          party; or
          <Br />
          <Br />
          (iii) the sale, lease, transfer, exclusive license or other
          disposition, in a single transaction or series of related
          transactions, by the Org of all or substantially all the assets of the
          Org, except where such sale, lease, transfer, exclusive license or
          other disposition is to a wholly owned subsidiary of the Org.
          <Br />
          <Br />
          (d) “Ordinary Proposal” means any Proposal that is neither an
          Extraordinary Proposal , Exit Proposal nor a Liquidation Proposal.
          <Br />
          <Br />
          (e) “Proposal” shall mean a proposal to be voted upon by the Members.
          <Br />
          <Br />
          (f) “Proposal Struct” of a Proposal shall mean data that: (i) is of
          type Proposal struct (as defined in the Designated Governance Smart
          Contract Source Code) with all relevant variables of the struct having
          been assigned values corresponding to such Proposal’s information; and
          (ii) has been stored on and is readable from the Designated Blockchain
          by the Designated Governance Smart Contract. For example, the Proposal
          Struct of a Proposal may include values for the number and types of
          Tokens or the number of Shares to be received by and/or paid out or
          issued by the Org if the Proposal is approved, the Designated
          Blockchain Network Account Address of the Person making the Proposal,
          the Designated Blockchain Account Address of the Member
          sponsoring the Proposal, the Designated Blockchain Account
          Address of the Person, if any, who would become a Member if the
          Proposal is approved, and flags and/or strings indicating the nature
          of the Proposal.
          <Br />
          <Br />
          4.2
          <Tab />
          Management of the Org.
          <Br />
          <Br />
          (a) Management by Members Holding Shares. Upon the terms and subject
          to the conditions set forth in this Agreement, the Members holding
          Shares collectively shall have: (i) the full, exclusive and complete
          right, power, authority and discretion to manage the operations and
          affairs of the Org and to make all decisions regarding the business of
          the Org; and (ii) all other rights, powers, authority and discretion
          of a manager (as defined in §18-101(12) of the Delaware LLC Act).
          Neither the Org nor any Member, individually or together with any
          other Member(s), shall have any right, power, authority or discretion
          to act for or on behalf of the Org in any manner, to do any act that
          would be (or could be construed as) binding on the Org, in any manner
          or way, or to make any expenditures on behalf of the Org, except to
          the extent expressly granted to and not revoked by virtue of a
          Proposal.
          <Br />
          <Br />
          (b) Voting Power of Each Member. Each Member shall be entitled to one
          vote per Share held by such Member on each Proposal.
          <Br />
          <Br />
          (c) Binding Effect of Authorized Actions. Any action taken by one or
          more Members in accordance with a Proposal that has been approved by
          the Members in accordance with this Agreement shall constitute the act
          of and serve to bind the Org.
          <Br />
          <Br />
          4.3
          <Tab />
          Voting Procedures
          <Br />
          <Br />
          (a) Proposal Submission. Except if there is a Material Adverse
          Exception Event affecting the voting mechanics of the Designated
          Governance Smart Contract, each Proposal shall be made as follows, as
          Confirmed on the Designated Blockchain. The Person submitting the
          Proposal or causing the Proposal to be submitted for potential
          consideration of the Members (the “Proposer”) and the Member
          sponsoring the Proposal for voting by the Members (the “Sponsor”)
          shall be solely responsible for ensuring that the Proposal is
          accurately and completely described and complies with the terms and
          conditions of this Agreement. The Proposer and the Sponsor may be, but
          are not required to be, the same Person. The Proposer may be, but is
          not required to be, a Member.
          <Br />
          <Br />
          (i) If the Proposal contemplates any matters beyond the allocation,
          purchase/sale or payment of Shares and/or Tokens, all relevant
          information for such other matters shall be accurately and completely
          set forth in string form as the value of the ‘description’ field in
          the Proposal Struct; provided, however, that such information may be
          supplied by means of a web URL or other link to information off the
          Designated Blockchain.
          <Br />
          <Br />
          (ii) The Proposer shall submit the Proposal for potential
          consideration by the Members by calling the propose() function on the
          Designated Smart Contract with the result that an index number
          uniquely corresponding to the Proposal shall be added to the
          “proposals” mapping of the Designated Governance Smart Contract.
          <Br />
          <Br />
          (iii) The Sponsor shall submit the Proposal to be voted upon by the
          Members by calling the sponsor() function on the Designated Governance
          Smart Contract (with the index number corresponding to the Proposal
          being supplied as the argument of such function call). The actions of
          a Sponsor as described in the preceding sentence are referred to
          herein as “Sponsorship”.
          <Br />
          <Br />
          (iv) The Proposer may cancel the Proposal at any time prior to
          Sponsorship thereof by calling the cancelProposal() function on the
          Designated Governance Smart Contract (with the index number
          corresponding to the Proposal being supplied as the argument of such
          function call).
          <Br />
          <Br />
          (b) Proposal Period. A Proposal that has been submitted and sponsored
          in accordance with the preceding clause “(a)” of this Section 4.3
          shall be open for voting by the Members holding Shares for a period
          starting at a time determined by the value of the ‘creationTime’ field
          of the Proposal Struct for such Proposal and lasting for an amount of
          time determined by the value of the ‘votingPeriod’ parameter for the
          Designated Governance Smart Contract (the total amount of time during
          which the Proposal may be voted on through the Designated Governance
          Smart Contract, the “Voting Period”).
          <Br />
          <Br />
          (c) Proposal Voting.
          <Br />
          <Br />
          (i) Except if there is a Material Adverse Exception Event affecting
          the voting mechanics of the Designated Governance Smart Contract, a
          Member may vote the Shares held by such Member on any Proposal
          which has been sponsored in accordance with Section 4.3 by calling the
          vote() function on the Designated Governance Smart Contract during the
          Voting Period for such Proposal (with the Proposal and the Member’s
          desired vote upon such Proposal being supplied as the arguments of
          such function call). A Member may only vote Yes or No on a given
          Proposal as represented by a boolean. All Shares held by a voting
          Member will be voted in the manner indicated in the vote() function
          call; a Member shall not be permitted to vote less than all of the
          Member’s Shares on a Proposal. A Members shall not be permitted to
          vote Yes with some of the Member’s Shares and No with other of the
          Member’s Shares on any single Proposal.
          <Br />
          <Br />
          (ii) Each vote by a Member upon a Proposal shall be final and
          irrevocable. The calling of vote() on the Designated Governance Smart
          Contract from a Member’s applicable address on the Designated
          Blockchain Network shall be conclusive evidence of the Member’s vote
          upon a particular Proposal. There shall be no cancellations,
          revocations or re-votes held on account of a mistaken vote() call by a
          Member.
          <Br />
          <Br />
          4.4
          <Tab />
          Proposal Approval and Processing.
          <Br />
          <Br />
          (a) Proposal Approval Thresholds. The Members shall be deemed to have
          approved a Proposal if, in the tallying of Member Shares voted
          thereby, the number of Shares voted Yes exceed the requisite quorum or
          other thresholds set within the Designed Smart Contract, as well as
          exceed the approval threshold relative to No votes also set therein.
          <Br />
          <Br />
          (b) Proposal Processing. After the completion of the Voting Period for
          a Proposal, any Member may cause the Proposal to be processed by
          calling the processProposal() function and if such Proposal achieved
          consensus among the Members, requested Shares will be minted or
          exited, as the case may be, and/or other governance actions permitted
          by the Designated Governance Smart Contract will be executed on the
          Designated Blockchain.
          4.5
          <Tab />
          Alternative Voting Mechanics in Material Adverse Exception Event.
          <Br />
          <Br />
          If there is a Material Adverse Exception
          Event affecting the use of the Designated Governance Smart Contract as
          set forth in this Section 4, the Members or their designated
          representatives shall use reasonable best efforts to create temporary
          emergency mechanisms approximating, as nearly as reasonably
          practicable under the circumstances, the relevant mechanisms of the
          Designated Governance Smart Contract. Such mechanisms shall replace
          the mechanisms of the Designated Governance Smart Contract set forth
          in the other provisions of this Section 4 until such Material Adverse
          Exception Event is cured.
          <Br />
          <Br />
          5.
          <Tab />
          TRANSFERS AND REDEMPTIONS OF MEMBERSHIP INTERESTS.
          <Br />
          <Br />
          5.1
          <Tab />
          General Prohibition Against Transfers. Except as set forth in Section
          5.2, Section 5.4, or as otherwise authorized by the Members,
          no Member shall directly or indirectly sell,
          transfer, assign, pledge, mortgage, exchange, hypothecate, grant a
          security interest in, or otherwise directly or indirectly dispose of
          or encumber any Membership Interests or Shares or any direct or
          indirect record or beneficial economic, voting or other interest
          therein or right with respect thereto (including by operation of law)
          or enter into any contract, option or other arrangement or
          understanding providing for any of the foregoing (each transaction
          described in this Section 5.1, a “Transfer”). Without limiting the
          generality of the foregoing, a Member providing any other Person with,
          or a Person otherwise obtaining, access to, a copy of or knowledge of
          the private key controlling such Member’s member address shall be
          automatically deemed a prohibited “Transfer” of such Member’s
          Membership Interests and Shares, as applicable, unless the Org has
          been furnished with a written and signed legal agreement, in form and
          substance reasonably satisfactory to the Members, binding such other
          Person to only use private key under the personal supervision of and
          in accordance with specific instructions from such Member. For
          purposes of the Uniform Commercial Code and any similar state statute,
          Membership Interests and Shares are nonnegotiable and are not subject
          to Article 8 of the Uniform Commercial Code.
          <Br />
          <Br />
          5.2
          <Tab />
          Exception for Inheritance. Notwithstanding Section 5.1, but subject to
          the other clauses of this Section 5.2, a Member’s economic rights in
          its Membership Interest may be Transferred as a result of such
          Member’s death to:
          <Br />
          <Br />
          (a) such Member’s spouse;
          <Br />
          <Br />
          (b) any of such Member’s lineal descendants or antecedents, siblings,
          aunts, uncles, cousins, nieces and nephews (including adoptive
          relationships and step relationships); or
          <Br />
          <Br />
          (c) any of the lineal descendants or antecedents, siblings, cousins,
          aunts, uncles, nieces and nephews of Member’s spouse or domestic
          partner shall be exempt from the restriction set forth in Section
          5.1.
          <Br />
          <Br />
          For the avoidance of doubt, such Transfer shall be solely a transfer
          of the economic rights with respect to the Member’s Membership
          Interests, and shall not entitle the Transferee to become a Member or
          to receive or exercise any voting, informational, managerial or other
          rights or powers of a Member. All non-economic rights and powers of a
          Person who was a Member at the time of such Person’s death shall
          automatically and without further action of any Person be deemed
          terminated, cancelled, null and void upon such Person’s death. As
          promptly as reasonably practicable after learning of the death of a
          Member who held Shares, the other Members shall cause such Member to
          be exited with the result that such Member’s Shares are converted or
          redeemed for Tokens.
          <Br />
          <Br />
          5.3
          <Tab />
          Unpermitted Transfers Are Void Or Solely Of Economic Interests. Any
          Transfer or purported or attempted Transfer in violation or
          contravention of this Section 5 shall be void ab initio and of no force
          or effect. In the event that any restriction on Transfer set forth
          herein is unenforceable under applicable Legal Requirement such that a
          prohibited Transfer is nevertheless given legal effect (an
          “Unavoidable Transfer”), then, to the maximum extent permitted by
          applicable Legal Requirement, such Transfer shall be solely a transfer
          of the economic rights with respect to the Membership Interests, and
          shall not entitle the Transferee to become a Member or to receive or
          exercise any voting, informational, managerial or other rights or
          powers of a Member, and all such non-economic rights and powers of the
          Transferring Member shall automatically and without further action of
          any Person be deemed terminated, cancelled, null and void.
          <Br />
          <Br />
          5.4
          <Tab />
          Redemptions of Membership Interests.
          <Br />
          <Br />
          (a) Exits.
          <Br />
          <Br />
          (i) Each Member may at any time, as permitted by the Designated
          Governance Smart Contract, voluntarily and irrevocably cause all or a
          portion of the Member’s Membership Interests represented in the form
          of Shares and/or other interests otherwise authorized by the Members,
          to be redeemed by the Org. A successful call in this manner
          is referred to in this Agreement as a “RageQuit.”
          <Br />
          <Br />
          (ii) In exchange for the redeemed Membership Interests of a
          RageQuitting Member, such Member shall be entitled to receive only the
          following:
          <Br />
          <Br />
          (A) such Member’s Economic Membership Interest Percentage of each
          Token held in their account of the Designated Governance Smart
          Contract at the time of the RageQuit, as supplemented by additional
          interests authorized by the Members; and
          <Br />
          <Br />
          (B) if any of the Org Property is not either a Token or legally
          represented by a Token allocated in the account of the Designated
          Governance Smart Contract, the Member’s Economic Membership Interest
          Percentage of such other Org Property and/or other interests otherwise authorized by the Members
          ; provided, however, that this
          clause “(B)” shall not apply to, and no Member shall have any right or
          entitlement to, any intellectual property, information, files,
          servers, computer system, accounts (such as web, app, bank, brokerage
          or other accounts), real property title or leases, insurance policies,
          Contracts, Consents, permits or other non-cash and non-investment
          assets included in the Org Property or that is necessary or desirable
          for the general conduct of the Org’s business or operations (for
          example, the logo of the Org, the name and any DBAs of the Org,
          trademarks and other branding of the Org, licenses to another Person’s
          intellectual property held by the Org, email accounts of the Org, AWS
          accounts of the Org, websites of the Org, etc.), which shall remain
          the sole and exclusive property of the Org unless provided otherwise
          in a license or assignment agreement from the Org to one or more
          Members that is approved by the Members in an Extraordinary Proposal.
          <Br />
          <Br />
          (iii) Transfer of ownership of the Org Property to which a Member or
          former Member is entitled pursuant to the preceding clause “(ii)” of
          this Section 5.4(a) shall be made solely as follows:
          <Br />
          <Br />
          (A) the Designated Governance Smart Contract shall allocate the Tokens
          or such other authorized interests to which such Member or former Member is so entitled to such Member or
          former Member by transferring such Tokens or other interests to the account of the
          Member, and such allocation shall be deemed a complete and final
          assignment and transfer of all of the Org’s right, title and ownership
          in and to such Tokens and other interests to such Member or former Member, regardless of
          whether or when such Member or former Member actually withdraws or
          receives possession or control of such Tokens;
          <Br />
          <Br />
          (B) the Members or their designated representatives shall use
          reasonable best efforts to cause the Org to allocate, set aside and
          hold in trust for such Member or former Member any other Org Property
          to which such Member or former Member is so entitled, and such
          allocation shall be deemed a complete and final assignment, transfer
          and conveyance of all right, title and ownership in and to such Org
          Property to such Member or former Member, and such setting aside and
          holding in trust shall be deemed a complete and final assignment and
          transfer of all of the Org’s right, title and ownership in and to such
          Org Property to such Member or former Member, regardless of whether or
          when such Member or former Member actually collects or receives
          possession or control of such Org Property; and
          <Br />
          <Br />
          (C) the Members or their designated representatives shall use
          reasonable best efforts to cause the Org to distribute to or make
          available for collection by such Member or former Member any other Org
          Property to which such Member or former Member is so entitled by any
          commercially reasonable means; provided, however, that any fees, costs
          or other expenses of such conveyance shall be borne exclusively by
          such Member or former Member, and either: (1) such fees, costs or
          other expenses (or the fair value thereof) may be deducted and
          withheld by the Org from such Org Property as a setoff to the amounts
          otherwise payable to such Member or former Member or (B) the Org may
          delay conveyance of such Org Property and continue to hold such Org
          Property in trust pursuant to the preceding clause of this Section
          5.4(a) until such Member or former Member has advanced to the Org any
          such fees, costs and other expenses the Org has reasonably requested
          that such Member or former Member pay.
          <Br />
          <Br />
          (iv) For the avoidance of doubt, pursuant to Section 2.3(b), a Member
          who has Ragequit with respect to all of the Member’s Shares shall
          cease to be a Member.
          <Br />
          <Br />
          (v) The allocation of the Tokens, authorized interests and other Org Property to a
          RageQuitting Member in accordance with this clause “(iii)” shall be
          deemed full, final and fair payment for the Member’s Membership
          Interests, Shares and similar authorized rights, equal to or greater than the fair market value
          thereof, and such a redemption and fair market value shall be deemed
          final, binding and non-appealable by the RageQuitting Member and all
          other Members and the Org, and shall not be contested by or on behalf
          of any of them except to the extent permitted by Section 1.10(c). THE
          MEMBERS ACKNOWLEDGE AND AGREE THAT THE DESIGNATED GOVERNANCE SMART
          CONTRACT AND ANY OTHER SMART CONTRACTS GOVERNING THE ALLOCATION AND
          TRANSFER OF THE TOKENS AND OTHER INTERESTS ARE AUTONOMOUS PERSISTENT SCRIPTS RUNNING
          PERMISSIONLESSLY AND FOR ALL PRACTICAL PURPOSES UNALTERABLY ON THE
          DESIGNATED BLOCKCHAIN AND ARE NOT UNDER THE CONTROL OF THE
          MEMBERS OR THE ORG. ACCORDINGLY, THE MEMBERS HEREBY ACKNOWLEDGE AND
          AGREE THAT THE ABILITY OF A MEMBER TO RECEIVE OR WITHDRAW TOKENS OR OTHER INTERESTS
          CANNOT BE GUARANTEED, AND ALL RISK OF NON-DELIVERY OR NON-RECEIPT OF
          THE TOKENS TO WHICH A MEMBER IS OR MAY BECOME ENTITLED SHALL BE BORNE
          EXCLUSIVELY BY AND IS HEREBY FULLY AND VOLUNTARILY ASSUMED BY SUCH
          MEMBER.
          <Br />
          <Br />
          No failure or delay on the part of a Member or former Member to
          receive or withdraw from the Designated Governance Smart Contract the
          Tokens or other interests allocated to such Member or to collect or otherwise receive
          possession of the other Org Property allocated to such Member shall be
          deemed to invalidate, void, reverse, delay, revoke or otherwise limit
          the redemption of such Member’s Membership Interests, Shares and other interests.
          <Br />
          <Br />
          (b) GuildKicks. Each Member may at any time make a Proposal to exit or
          redeem another Member’s interests in the Org. A GuildKick (defined
          below) Proposal that is approved by the Members will expel another
          Member from the Org by causing all of such Member’s Shares or similar
          interests to be redeemed by the Org through the Designated Governance
          Smart Contract. There shall be no prohibition or limit, by virtue of
          conflict of interest or otherwise, on a Member voting or refraining
          from voting in any manner (Yes, No, or abstaining) on a GuildKick
          Proposal relating to the Member’s own expulsion. If a GuildKick
          Proposal is approved by the Members (referred to as a “GuildKick”),
          all of the GuildKicked Member’s Shares and other authorized interests shall be redeemed by the Org,
          mutatis mutandis.
          <Br />
          <Br />
          (c) Alternative Redemption Mechanics in Material Adverse Exception
          Event. If there is a Material Adverse Exception Event affecting the
          use of the Designated Governance Smart Contract as set forth in this
          Section 5.4, the Members or their designated representatives shall use
          reasonable best efforts to create temporary emergency mechanisms
          approximate to, as nearly as reasonably practicable under the
          circumstances, the relevant mechanisms of the Designated Governance
          Smart Contract. Such mechanisms shall replace the mechanisms of the
          Designated Governance Smart Contract set forth in the other provisions
          of this Section 5.4 until such Material Adverse Exception Event is
          cured.
          <Br />
          <Br />
          6.
          <Tab />
          DISSOLUTION AND WINDING UP.
          <Br />
          <Br />
          6.1
          <Tab />
          No Automatic Dissolutions.
          <Tab />
          Except as otherwise set forth in this Section 6, the Org is intended
          to have perpetual existence. The admission of any additional
          Member(s), the expulsion or resignation of any Member(s), or the
          death, or the retirement, expulsion, bankruptcy or dissolution of any
          Member(s), shall not in itself cause or require a dissolution of the
          Org.
          <Br />
          <Br />
          6.2
          <Tab />
          Dissolution.
          <Tab />
          The Org shall dissolve, and its affairs shall be wound up upon the
          first to occur of the following: (a) upon approval by the Members of a
          Liquidation Proposal providing for the dissolution and winding up the
          affairs of the Org; and (b) the entry of a decree of judicial
          dissolution of the Org under §18-802 of the Delaware LLC Act or an
          administrative dissolution under §18-802 of the Delaware LLC Act.
          <Br />
          <Br />
          6.3
          <Tab />
          Liquidation and Termination.
          <Tab /> On the dissolution of the Org, the Members or their designated
          representatives shall act as liquidators or may appoint one or more
          other Persons to act as liquidators. The liquidators shall proceed
          diligently to wind up the affairs of the Org and make final
          distributions as provided herein and in the Delaware LLC Act. The
          costs of liquidation shall be borne as an expense of the Org. Until
          final distribution, the liquidators shall continue to operate the Org
          with all of the power and authority of the Members. The steps to be
          accomplished by the liquidators are as follows:
          <Br />
          <Br />
          (a) The liquidators shall use reasonable best efforts to pay, satisfy
          or discharge from funds of the Org all of the debts, liabilities and
          obligations of the Org (including, without limitation, all expenses
          incurred in liquidation) or otherwise make adequate provision for
          payment and discharge thereof (including, without limitation, the
          establishment of a cash fund for contingent liabilities in such amount
          and for such term as the liquidators may reasonably determine).
          <Br />
          <Br />
          (b) As promptly as reasonably practicable after dissolution, the
          liquidators shall use reasonable best efforts to cause all Members to
          be GuildKicked with the result that all Tokens and other authorized interests under the control of
          the Designated Governance Smart Contract are distributed pro rata to
          the Members in accordance with their Membership Interests.
          <Br />
          <Br />
          (c) The distribution of cash and/or property to a Member in accordance
          with the provisions of this Section 6 constitutes a complete return to
          the Member of its Capital Contributions and a complete distribution to
          the Member of its interest in the Org and all Org property and
          constitutes a compromise to which all Members have consented within
          the meaning of the Delaware LLC Act. To the extent that a Member
          returns funds to the Org, it has no claim against any other Member for
          those funds.
          <Br />
          <Br />
          6.4
          <Tab />
          Cancellation of Certificate.
          <Tab />
          On completion of the distribution of Org assets and all other
          activities necessary for the winding-up of the Org as provided herein,
          the Org shall be terminated (and the Org shall not be terminated prior
          to such time), and the liquidators shall file a certificate of
          cancellation with the Secretary of State of the State of Delaware,
          cancel any other filings made pursuant to this Agreement that are or
          should be canceled, and take such other actions as may be necessary to
          terminate the Org. The Org shall be deemed to continue in existence
          for all purposes of this Agreement until it is terminated pursuant to
          this Section 6.4.
          <Br />
          <Br />
          6.5
          <Tab />
          Reasonable Time for Winding Up.
          <Tab />
          A reasonable time shall be allowed for the orderly winding up of the
          business and affairs of the Org and the liquidation of its assets
          pursuant to Section 6.3 in order to minimize any losses otherwise
          attendant upon such winding up.
          <Br />
          <Br />
          6.6
          <Tab />
          No Personal Liability of Liquidators.
          <Tab />
          The liquidators shall not be personally liable for the return of
          Capital Contributions or any portion thereof to the Members (it being
          understood that any such return shall be made solely from Org assets).
          <Br />
          <Br />
          7.
          <Tab />
          MISCELLANEOUS PROVISIONS.
          <Br />
          <Br />
          7.1
          <Tab />
          Notices.
          <Tab />
          Any notice or other communication required or permitted to be
          delivered to any Party in connection with this Agreement shall be in
          writing and shall be deemed properly delivered, given and received to
          such Party: (a) if delivered to such Party by hand, when so delivered;
          (b) if sent by email, one Business Day after being sent; and (c) if
          sent by overnight delivery via a national courier service, one
          Business Day after being sent, in each case, to the address set forth
          for such Party among the Members. This provision may be modified or
          supplemented from time to time by the Members. “Business Day” means
          any day other than: (i) a Saturday, Sunday or national holiday in the
          jurisdiction of the recipient; or (ii) a day on which commercial banks
          in the jurisdiction of the recipient are authorized or required to be
          closed.
          <Br />
          <Br />
          7.2
          <Tab />
          Headings.
          <Tab />
          The headings and captions contained in this Agreement are for
          convenience of reference only, shall not be deemed to be a part of
          this Agreement and shall not be referred to in connection with the
          construction or interpretation of this Agreement.
          <Br />
          <Br />
          7.3
          <Tab />
          Counterparts and Exchanges by Electronic Delivery.
          <Tab />
          This Agreement may be executed in several counterparts, each of which
          shall constitute an original and all of which, when taken together,
          shall constitute one agreement. Signatures may be provided by
          electronic delivery in .pdf format, which shall be sufficient to bind
          the parties to the terms and conditions of this Agreement.
          <Br />
          <Br />
          7.4
          <Tab />
          Governing Law.
          <Tab />
          This Agreement shall be governed by and construed and interpreted in
          accordance with the laws of the State of Delaware irrespective of the
          choice of laws principles of the State of Delaware, as to all matters,
          including matters of validity, construction, effect, enforceability,
          performance and remedies and in respect of the statute of limitations
          or any other limitations period applicable to any claim, controversy
          or dispute.
          <Br />
          <Br />
          7.5
          <Tab />
          Venue.
          <Tab />
          Any action, suit or other legal proceeding relating to this Agreement
          or the matters contemplated by this Agreement, including any dispute
          involving any Member in its capacity as such, shall be brought or
          otherwise commenced exclusively in the Court of Chancery of the State
          of Delaware (unless the federal courts have exclusive jurisdiction
          over such suit, action or proceeding, in which case such suit, action
          or proceeding shall be brought or otherwise commenced exclusively in
          the United States District Court for the District of Delaware). Each
          Member and other Person who benefits from or is bound by this
          Agreement: (a) expressly and irrevocably consents and submits to the
          jurisdiction of the Court of Chancery of the State of Delaware (and
          the Delaware Supreme Court to the extent any judgment or order of the
          Court of Chancery of the State of Delaware is appealed thereto)
          (unless the federal courts have exclusive jurisdiction over such suit,
          action or proceeding, in which case each party hereto consents and
          submits to the jurisdiction of the United States District Court for
          the District of Delaware (and the United States Court of Appeals for
          the Third Circuit to the extent any judgment or order of such District
          Court is appealed thereto)) in connection with any such suit, action
          or proceeding; (b) agrees that each of the courts referred to in the
          preceding clause “(a)” shall be deemed to be a convenient forum; (c)
          agrees not to assert (by way of motion, as a defense or otherwise), in
          any such suit, action or proceeding commenced in any of the courts
          referred to in the preceding clause “(a)” that such party hereto is
          not subject personally to the jurisdiction of such court, that such
          suit, action or proceeding has been brought in an inconvenient forum,
          that the venue of such proceeding is improper or that this Agreement
          or the subject matter of this Agreement may not be enforced in or by
          such court; and (d) irrevocably consents to service of process by
          first class certified mail, return receipt requested, postage prepaid,
          to the address at which the Member or other party, as the case may be,
          is to receive notice in accordance with Section 7.1.
          <Br />
          <Br />
          7.6
          <Tab />
          Successors and Assigns; Parties in Interest.
          <Br />
          <Br />
          (a) This Agreement shall be binding upon: (i) each Member; and (ii)
          each Member’s heirs, executors, successors, assigns and delegates (if
          any). This Agreement shall inure to the benefit of the Members.
          <Br />
          <Br />
          (b) No Member shall be permitted to assign any of its rights or
          delegate any of its obligations under this Agreement without the prior
          written consent of the other Members hereto. Any attempted assignment
          or delegation in violation of this Section 7.6(b) shall be null and
          void ab initio.
          <Br />
          <Br />
          (c) None of the provisions of this Agreement are intended to provide
          any rights or remedies to any Person other than the Members. Without
          limiting the generality of the foregoing, no creditor of any Member
          shall have any rights under this Agreement.
          <Br />
          <Br />
          7.7
          <Tab />
          Amendments.
          <Tab />
          Except as otherwise expressly provided herein, this Agreement may not
          be amended, modified, altered or supplemented other than by means of a
          written instrument approved by the Members in an Extraordinary
          Proposal.
          <Br />
          <Br />
          7.8
          <Tab />
          Title to Org’s Assets.
          <Tab />
          The Org’s assets shall be deemed to be owned by the Org as an entity,
          and the Org shall have legal title thereto, and no Member,
          individually or collectively, shall have any ownership interest in
          such Org assets or any portion thereof.
          <Br />
          <Br />
          7.9
          <Tab />
          Severability.
          <Tab />
          In the event that any provision of this Agreement, or the application
          of any such provision to any Person or set of circumstances, shall be
          determined to be invalid, unlawful, void or unenforceable to any
          extent, the remainder of this Agreement, and the application of such
          provision to Persons or circumstances other than those as to which it
          is determined to be invalid, unlawful, void or unenforceable, shall
          not be impaired or otherwise affected and shall continue to be valid
          and enforceable to the fullest extent permitted by law. If a judicial
          determination is made that any provision of this Agreement (or part of
          any provision of this Agreement) is unenforceable, such provision (or
          part thereof) shall be rendered void only to the extent that such
          judicial determination finds such provision unenforceable. In this
          regard, the Org and the Members hereby acknowledge and agree that any
          such judicial authority construing this Agreement shall be empowered
          to sever any provision or portion thereof and to apply the remaining
          provisions of this Agreement not so severed.
          <Br />
          <Br />
          7.10
          <Tab />
          Entire Agreement.
          <Tab />
          This Agreement sets forth the entire understanding of the parties
          relating to the subject matter thereof and supersedes all prior
          agreements and understandings among or between the Members relating to
          the subject matter thereof.
          <Br />
          <Br />
          7.11
          <Tab />
          Force Majeure.
          <Tab />
          “Force Majeure Event” means, in respect of any Person, any act,
          omission or occurrence whatsoever, whether similar or dissimilar to
          those referred to in this paragraph, which is beyond the reasonable
          control of that Person, including a Material Adverse Exception Event,
          strike, lockout or other labor dispute or disturbance, act of nature,
          fire, flood, lightning, severe weather, shortage of materials,
          rationing, utility failure, failure of or delay by any Person from
          which such party must obtain information in order to perform its
          obligations hereunder (other than an Affiliate or Representative of
          such party), failure or delay in any system, plant or machinery,
          earthquake, war, revolution, terrorist act, epidemic, pandemic, civil
          commotion, act of a public enemy, blockade, embargo, or any Order or
          Legal Requirement Legal Requirement. Neither the Org nor any Member
          shall be liable for any delay in performing any of its obligations
          under this Agreement if such delay arises out of or is caused by a
          Force Majeure Event. To the extent that any Force Majeure Event
          prevents the Org or any Member from performing any of its obligations
          under this Agreement, the Org or such Member (or any Member on behalf
          of the Org or any group of Members) affected by such Force Majeure
          Event shall inform the other Members promptly in writing specifying
          the Force Majeure Event and, to the extent practicable, the expected
          duration of and performance obligations adversely affected by the
          Force Majeure Event. The affected Persons shall be excused from
          performing the affected obligations to the extent the Force Majeure
          Event prevents such performance, but shall use commercially reasonable
          efforts to limit the period during which the Force Majeure Event
          prevents such performance.
          <Br />
          <Br />
          7.12
          <Tab />
          Construction.
          <Br />
          <Br />
          (a) For purposes of this Agreement, whenever the context requires: (i)
          the singular number shall include the plural, and vice versa; (ii) the
          masculine gender shall include the feminine and neuter genders; the
          feminine gender shall include the masculine and neuter genders; (iii)
          the neuter gender shall include the masculine and feminine genders;
          and (iv) “either” shall mean “either or both.”
          <Br />
          <Br />
          (b) The parties hereto agree that any rule of construction to the
          effect that ambiguities are to be resolved against the drafting party
          shall not be applied in the construction or interpretation of this
          Agreement or the other the documents and agreements referred to
          herein. Each of the parties hereto acknowledge that it has received
          independent legal advice in connection with the negotiation and
          execution of this Agreement and the other the documents and agreements
          referred to herein.
          <Br />
          <Br />
          (c) As used in this Agreement, the words “include” and “including,”
          and variations thereof, shall not be deemed to be terms of limitation,
          but rather shall be deemed to be followed by the words “without
          limitation.”
          <Br />
          <Br />
          (d) As used in this Agreement, the word “or” shall not be deemed to be
          “exclusive or”, but rather shall be deemed to be the “inclusive or”
          (i.e., “and/or”), unless it is qualified by the word “alternatively,”
          in which case it shall be deemed to be “exclusive or”.
          <Br />
          <Br />
          (e) Except as otherwise indicated, all references in this Agreement
          and the Exhibits to this Agreement to “Sections,” “Exhibits” and
          “Schedules” are intended to refer to Sections of this Agreement,
          Exhibits to this Agreement and Schedules to this Agreement. <Br />
          <Br />
          <Br />
        </Text>
      </Page>
      <Page style={styles.body}>
        <Text style={styles.heading1}>Exhibit A - JOINDER AGREEMENT</Text>
        <Text style={styles.heading2}>JOINDER TO {name} AGREEMENT</Text>
        <Text style={styles.numbered_list}>
          This JOINDER (this “Joinder”) to the Operating Agreement of {name}{" "}
          (the “Agreement”), a copy of which has been made available to you, is
          being made and entered into by the Person indicated on the signature
          page hereto (the “Candidate”). Capitalized terms used herein but not
          otherwise defined shall have the meanings set forth in the Agreement.
          <Br />
          <Br />
          WHEREAS, subject to the terms and conditions of this Joinder and the
          Agreement, if the Membership Proposal or other authorized admission process
          for the Candidate is approved by the Members, the Candidate will become a Member of the Org and will
          receive Shares and/or other interests, as applicable; and
          <Br />
          <Br />
          WHEREAS, the Agreement requires the Candidate, as a condition
          precedent to becoming a Member, to become a party to the Agreement and
          abide by all of the terms and conditions of the Agreement, and the
          Candidate agrees to do so in accordance with the terms hereof.
          <Br />
          <Br />
          NOW, THEREFORE, in consideration of the mutual covenants contained
          herein and for other good and valuable consideration, the receipt and
          sufficiency of which are hereby acknowledged, the Candidate, intending
          to be legally bound, hereby agrees as follows:
          <Br />
          <Br />
          1. Agreement to be Bound.
          <Tab />
          The Candidate acknowledges that he, she or it has received and
          reviewed a complete copy of the Agreement. The Candidate agrees that
          upon execution and delivery of this Joinder and approval of the
          Candidate’s Membership Proposal or other admission resulting in the Candidate becoming
          entitled to receive any Shares or similar interests, the Candidate
          shall become a party to the Agreement as a Member and shall be fully
          bound by, and subject to, all of the covenants, terms and conditions
          of the Agreement as though an original party thereto. The Candidate
          shall not have any rights or obligations under the Agreement, and
          shall not become a Member, in the event that the Candidate’s
          Membership Proposal is not approved by the Members.
          <Br />
          <Br />
          2. Miscellaneous.
          <Tab />
          Section 7 of the Agreement is incorporated herein by reference and
          shall apply to the terms and provisions of this Joinder, mutatis
          mutandis. The Candidate has caused this Joinder to be executed and
          delivered as of the date indicated below.
          <Br />
          <Br />
          Signature:
          <Br />
          <Br />
          Name:
          <Br />
          <Br />
          Title:
          <Br />
          <Br />
          Date:
          <Br />
          <Br />
          ETH Address:
        </Text>
      </Page>
      <Page style={styles.body}>
        <Text style={styles.heading1}>
          Exhibit B - ACCREDITED INVESTOR QUESTIONNAIRE
        </Text>
        <Text style={styles.heading2}>{name}</Text>
        <Text style={styles.numbered_list}>
          This Questionnaire is being distributed to certain individuals and
          entities which may be offered the opportunity to purchase securities
          (the “Securities”) by {name}
          , a Delaware limited liability company (the “Company”). The purpose of
          this Questionnaire is to assure the Company that all such offers and
          purchases will meet the standards imposed by the Securities Act of
          1933, as amended (the “Act”), and applicable state securities laws.
          <Br />
          <Br />
          All answers will be kept confidential. However, by signing this
          Questionnaire, the undersigned agrees that this information may be
          provided by the Company to its legal and financial advisors, and the
          Company and such advisors may rely on the information set forth in
          this Questionnaire for purposes of complying with all applicable
          securities laws and may present this Questionnaire to such parties as
          it reasonably deems appropriate if called upon to establish its
          compliance with such securities laws. The undersigned represents that
          the information contained herein is complete and accurate and will
          notify the Company of any material change in any of such information
          prior to the undersigned’s investment in the Company.
        </Text>
        <Br />
        <Br />
        <Text style={styles.heading2}>FOR INDIVIDUAL INVESTORS</Text>
        <Text style={styles.text}>Accredited Investor Certification.</Text>
        <Text style={styles.text}>
          The undersigned makes one of the following representations regarding
          its income, net worth, status as a “family client” of a “family
          office,” and/or certain professional certifications or designations
          and certain related matters and has checked the applicable
          representation:
        </Text>
        <Text style={styles.numbered_list}>
          [__] The undersigned’s income during each of the last two years
          exceeded $200,000 or, if the undersigned is married or has a spousal
          equivalent , the joint income of the undersigned and the undersigned’s
          spouse or spousal equivalent, as applicable, during each of the last
          two years exceed $300,000, and the undersigned reasonably expects the
          undersigned’s income, from all sources during this year, will exceed
          $200,000 or, if the undersigned is married or has a spousal
          equivalent, the joint income of undersigned and the undersigned’s
          spouse or spousal equivalent, as applicable, from all sources during
          this year will exceed $300,000.
          <Br />
          <Br />
          [__] The undersigned’s net worth, including the net worth of the
          undersigned’s spouse or spousal equivalent, as applicable, is in
          excess of $1,000,000 (excluding the value of the undersigned’s primary
          residence).
          <Br />
          <Br />
          [__] The undersigned is a holder in good standing of one or more of
          the following certifications or designations administered by the
          Financial Industry Regulatory Authority, Inc. (FINRA): the Licensed
          General Securities Representative (Series 7), Licensed Investment
          Adviser Representative (Series 65), or Licensed Private Securities
          Offerings Representative (Series 82).
          <Br />
          <Br />
          [__] The undersigned is a “family client,” as defined in rule
          202(a)(11)(G)-1 under the Investment Advisers Act of 1940, as amended
          (the “Advisers Act”), of a family office as defined in rule
          202(a)(11)(G)-1 under the Advisers Act, (i) with assets under
          management in excess of $5,000,000, (ii) that is not formed for the
          specific purpose of acquiring the securities offered, and (iii) whose
          prospective investment is directed by a person who has such knowledge
          and experience in financial and business matters that such family
          office is capable of evaluating the merits and risks of the
          prospective investment, and whose prospective investment is directed
          by such family office pursuant to clause (iii) of this sentence.
          <Br />
          <Br />
          [__] The undersigned cannot make any of the representations set forth
          above.
        </Text>
        <Br />
        <Br />
        <Text style={styles.heading2}>FOR ENTITY INVESTORS</Text>
        <Text style={styles.text}>Accredited Investor Certification.</Text>
        <Text style={styles.text}>
          The undersigned makes one of the following representations regarding
          its net worth and certain related matters and has checked the
          applicable representation:
        </Text>
        <Text style={styles.numbered_list}>
          [__] The undersigned is a trust with total assets in excess of
          $5,000,000 whose purchase is directed by a person with such knowledge
          and experience in financial and business matters that such person is
          capable of evaluating the merits and risks of the prospective
          investment.
          <Br />
          <Br />
          [__] The undersigned is a bank, an investment adviser registered
          pursuant to Section 203 of the Advisers Act or registered pursuant to
          the laws of a state, any investment adviser relying on the exemption
          from registering with the SEC under Section 203(l) or (m) of the
          Advisers Act, an insurance company, an investment company registered
          under the United States Investment Company Act of 1940, as amended, a
          broker or dealer registered pursuant to Section 15 of the United
          States Securities Exchange Act of 1934, as amended, a business
          development company, a Small Business Investment Company licensed by
          the United States Small Business Administration, a Rural Business
          Investment Company as defined in Section 384A of the Consolidated Farm
          and Rural Development Act, as amended, a plan with total assets in
          excess of $5,000,000 established and maintained by a state for the
          benefit of its employees, or a private business development company as
          defined in Section 202(a)(22) of the Advisers Act.
          <Br />
          <Br />
          [__] The undersigned is an employee benefit plan and either all
          investment decisions are made by a bank, savings and loan association,
          insurance company, or registered investment advisor, or the
          undersigned has total assets in excess of $5,000,000 or, if such plan
          is a self-directed plan, investment decisions are made solely by
          persons who are accredited investors.
          <Br />
          <Br />
          [__] The undersigned is a corporation, limited liability company,
          partnership, business trust, not formed for the purpose of acquiring
          the Securities, or an organization described in Section 501(c)(3) of
          the Internal Revenue Code of 1986, as amended (the “Code”), in each
          case with total assets in excess of $5,000,000.
          <Br />
          <Br />
          [__] The undersigned is an entity in which all of the equity owners
          (in the case of a revocable living trust, its grantor(s)) qualify
          under any of the above subparagraphs, or, if an individual, each such
          individual has a net worth,2 either individually or upon a joint basis
          with such individual’s spouse or spousal equivalent, as applicable, in
          excess of $1,000,000 (within the meaning of such terms as used in the
          definition of “accredited investor” contained in Rule 501 under the
          Act), or has had an individual income1 in excess of $200,000 for each
          of the two most recent years, or a joint income with such individual’s
          spouse or spousal equivalent, as applicable, in excess of $300,000 in
          each of those years, and has a reasonable expectation of reaching the
          same income level in the current year.
          <Br />
          <Br />
          [__] The undersigned is an entity, of a type not listed in any of the
          paragraphs above, which was not formed for the specific purpose of
          acquiring the securities offered, owning investments in excess of
          $5,000,000.
          <Br />
          <Br />
          [__] The undersigned is a “family office,” as defined in rule
          202(a)(11)(G)-1 under the Advisers Act, (i) with assets under
          management in excess of $5,000,000, (ii) that is not formed for the
          specific purpose of acquiring the securities offered, and (iii) whose
          prospective investment is directed by a person who has such knowledge
          and experience in financial and business matters that such family
          office is capable of evaluating the merits and risks of the
          prospective investment.
          <Br />
          <Br />
          [__] The undersigned is a “family client,” as defined in rule
          202(a)(11)(G)-1 under the Advisers Act, of a family office meeting the
          requirements in the above paragraph and whose prospective investment
          is directed by such family office pursuant to clause (iii) of the
          above paragraph.
          <Br />
          <Br />
          [__] The undersigned cannot make any of the representations set forth
          above.
          <Br />
          <Br />
          IN WITNESS WHEREOF, the undersigned has executed this Investor
          Suitability Questionnaire as of the date written below.
          <Br />
          <Br />
          Signature:
          <Br />
          <Br />
          Name:
          <Br />
          <Br />
          Title:
          <Br />
          <Br />
          Date:
          <Br />
          <Br />
          ETH Address:
        </Text>
      </Page>
      <Page style={styles.body}>
        <Text style={styles.heading1}>
          Exhibit C - DISCLOSURE OF RISK FACTORS
        </Text>
        <Text style={styles.heading2}>RISK FACTORS</Text>
        <Text style={styles.numbered_list}>
          Becoming a member of {name}
           involves a high degree of risk. You should carefully consider the
          risks we describe below, along with all of the other information set
          forth herein and in the Operating Agreement of {name}
           (the Agreement), before deciding to contribute capital to, acquire
          membership interests in and participate in the governance of {name}.
          The risks and uncertainties described below are those significant risk
          factors, currently known and specific to us, which we believe are
          relevant to contributing capital to, acquiring membership interests in
          and participating in the governance of {name}. If any of these risks
          materialize, our business, results of operations or financial
          condition could suffer, the value of the membership interests could
          decline substantially and you could lose part or all of your capital
          contributed to {name}. Additional risks and uncertainties not
          currently known to us or that we now deem immaterial may also harm us
          and adversely affect your investment or participation in {name}
          .
          <Br />
          <Br />
          You may lose all of the capital that you contribute to {name}. If you
          are uncertain as to our business and operations or you are not
          prepared to lose all capital you contributed to {name} in exchange for
          membership interests, we strongly urge you not to become a member. We
          recommend you consult legal, financial, tax and other professional
          advisors or experts for further guidance before seeking to become a
          member of {name}
          and contribute capital to {name}. Further, we recommend you consult
          independent legal advice in respect of the legality of becoming a
          member in {name} and participating in the governance of {name}
          .
          <Br />
          <Br />
          In order to become and exercise the rights of a member of {name}, you
          will need to interact with a “smart contract” or persistent executable
          code on the {chain} blockchain network. We do not recommend that you
          attempt to become a member of
          {name}
          unless you have prior experience with cryptographic tokens,
          blockchain-based software and distributed ledger technology and unless
          you have received independent professional advice.
          <Br />
          <Br />
          Capitalized terms used but not defined herein have the definitions
          that are ascribed to them in the Agreement, which you should have
          received a copy of.
          <Br />
          <Br />
          1. BUSINESS/OPERATIONAL RISKS
          <Br />
          <Br />
          {name}
           has no operating history. {name}
           may need to raise additional capital in the future to continue
          operations, which may not be available on acceptable terms, or at all.
          <Br />
          <Br />
          {name}
           is a recently formed company established under the laws of the State
          of Delaware with minimal activity and no historical operating results.
          There is no guarantee that {name}
           will be able to raise any additional capital in the future or that
          additional capital will be available on acceptable terms. {name}
           generally lacks any ability to raise certain kinds of capital (e.g.,
          debt) and may not have the ability to finance capital expenditures or
          finance strategic initiatives.
          <Br />
          <Br />
          Because we lack an operating history, you have no basis upon which to
          evaluate our ability to achieve our business objectives. Our proposed
          operations are subject to all business risks associated with a new
          enterprise. The likelihood of our creation of a viable business must
          be considered in light of the problems, expenses, difficulties,
          complications, and delays frequently encountered in connection with
          the inception of a business operating in a relatively new, highly
          competitive, and developing industry. There can beno assurance that we
          will ever generate any operating activity or develop and operate the
          business as planned. If we are unsuccessful at executing on our
          business plan, our business, prospects, and results of operations may
          be materially adversely affected and investors may lose all or a
          substantial portion of their investment.
          <Br />
          <Br />
          {name}
           may be unable to recover assets for which the associated cryptographic
          key is lost, stolen, or destroyed. Stolen cryptographic keys may be
          used to improperly influence {name}’s activities.
          <Br />
          <Br />
          Responsibility for the safekeeping of digital assets including the
          cryptographic keys associated with blockchain-based assets rests
          solely on the individual Members. {name}
           is generally incapable of recovering any assets associated with a lost
          or destroyed cryptographic key. Such loss or destruction would result
          in the total loss of any investment in {name}
          .
          <Br />
          <Br />
          In the event a cryptographic key is stolen or duplicated, the thief
          may gain access to assets of {name}, including the ability to create
          or approve new proposals related to {name}
          ’s business. This may have a material adverse effect on an investment
          in
           {name}
          .
          <Br />
          <Br />
          {name}
           may suffer from misaligned incentives, adverse selection, and related
          effects through the operation of Designated Smart Contracts and
          inapplicability of fiduciary duties.
          <Br />
          <Br />
          {name}
           is designed to coordinate its operations through its Members’
          individual economic incentives. Individual Members are expected to
          source investment opportunities and conduct required due diligence.
          <Br />
          <Br />
          However, it is possible that the incentive structure produced by the
          Designated Smart Contracts may ultimately impede effective
          coordination of the Members. Members are not subject to fiduciary
          duties to one another or to {name}. As such, Members may retain
          favorable investment opportunities for themselves, or cause
           {name}
          to make unfavorable investments or disbursements. Members may also
          promote investment opportunities in which they have significant,
          independent financial stakes. For example, a Member holding large
          quantities of a specific type of token or other investment asset may
          promote investments which would not be expected to accrue value for
          other Members, but which would increase the value of such token or
          other investment asset. This may have a material adverse effect on an
          investment in {name}
          .
          <Br />
          <Br />
          Liquidated assets may lose value or become unmarketable.
          <Br />
          <Br />
          Although the RageQuit functionality permits each Member to withdraw a
          pro-rated distribution of
          <Br />
          <Br />
          {name}
          ’s assets, those assets may subsequently lose value or become illiquid
          or unmarketable due to market conditions or legal requirements. This
          may have a material adverse effect on an investment in {name}
          .
          <Br />
          <Br />
          {name}
          ’s governance functions, including Designated Smart Contracts, may
          become captured by a hostile Member or group of Members. {name}
          ’s governance is primarily executed through its Designated Smart
          Contracts and the votes of its Members. It is possible that an
          individual Member or group of Members (the “attackers”) may cause{" "}
          {name}
          to issue new Membership Interests (whether in the form of Shares or
          similar interests) or otherwise approve proposals for the benefit of
          the attackers. This may result in the dilution of other Members’
          investments in {name}, misappropriation of the assets of {name}, or
          other harms which may have a material adverse effect on an investment
          in
           {name}
          .
          <Br />
          <Br />
          Members may be subject to the GuildKick functionality of Designated
          Smart Contracts, which may result in foregone investment
          opportunities.
          <Br />
          <Br />
          Continued Membership in  {name}
          is conditioned on the ongoing consent of an economic majority of the
          other Members. A Member may be forcibly removed from {name}
           through the GuildKick functionality of the Designated Smart Contracts.
          In this event, the ejected Member will receive a pro-rated
          distribution of {name}’s assets, but will forfeit any ability to
          influence or participate in future investment decisions of {name}.
          Depending on the availability of present or subsequent investment
          opportunities at that time, an ejected Member may ultimately be
          required to forego favorable investment opportunities. The ongoing
          possibility of such ejection constitutes a material risk of investment
          in {name}
          .
          <Br />
          <Br />
          Oracles used to determine the exchange rate or value of {name}’s
          assets may become captured or otherwise manipulated to provide false
          information that could be exploited by a Member or external adversary.
          <Br />
          <Br />
          The Designated Smart Contracts, or smart contracts on which the
          Designated Smart Contracts depend, may rely on external sources of
          information (“Oracles”) to determine asset valuations and exchange
          rates or to maintain price stability of an asset. It is possible that
          an entity could capture or manipulate an oracle to inject false
          information. The ongoing possibility of an Oracle producing such false
          information constitutes a material risk of investment in {name}.
          <Br />
          <Br />
          Addition or subtraction of new Members may dilute the ownership
          interests of existing Members in {name}
          ’s assets.
          <Br />
          <Br />
          It is possible to acquire Membership Interests in  {name}
          for a range of types and amounts of other assets. Accordingly,
          acceptance of a new Member may change the overall kind and number of
          assets beneficially owned by individual Members. This may result in
          the dilution of other Members’ investments in  {name}
          or other harms which may have a material adverse effect on an
          investment in
           {name}
          .
          <Br />
          <Br />
          Entities receiving investment or funding from  {name}
          are not under the control of {name}. Such projects may act in a manner
          adverse to  {name}
          or its Members.
          <Br />
          <Br />
          {name}
           is unlikely to have effective control over any individuals or
          entities. There is no guarantee that an entity funded by {name}
           will act in accordance with any funding agreement. Material risks
          include, but are not limited to, any of the following:
          <Br />
          <Br />
          • <Tab /> the entity may attempt to raise additional funding from
          other sources, causing dilution of {name}
          ’s investment;
          <Br />
          <Br />
          • <Tab /> the entity may issue different cryptographic tokens or
          assets, in addition to or in lieu of assets owed to {name}
          ; or
          <Br />
          <Br />
          • <Tab /> the entity may not deliver any cryptographic tokens or
          assets.
          <Br />
          <Br />
          Accordingly, the decisions or actions of entities funded by {name} may
          have a material adverse effect on an investment in {name}.
          <Br />
          <Br />
          Members may not perform adequate or uniform due diligence.
          <Br />
          <Br />
          Members are responsible for due diligence of investment opportunities.
          Members may not have the necessary expertise to perform adequate due
          diligence. The ultimate decision of whether to undertake any
          investment opportunity will be subject to a vote of the Members,
          notwithstanding any due diligence performed. It is possible that
          Members may apply incomplete or inconsistent due diligence procedures,
          which could result in the improper assessment of risks attending such
          investments. This may have a material adverse effect on an investment
          in {name}
          .
          <Br />
          <Br />
          Members may not effectively source investment opportunities compared
          to competing entities.
          <Br />
          <Br />
          Members are responsible for sourcing investment opportunities. Members
          may not have the necessary expertise, position, or incentive to
          identify and negotiate investment opportunities on behalf of {name}.
          It is possible that Members will be unable to identify favorable
          investment opportunities, which may have a material adverse effect on
          an investment in {name}
          .
          <Br />
          <Br />
          Additionally, {name}
           expects intense competition for limited investment opportunities.
          Competitors may include investment companies and investment advisers
          including pension funds and hedge funds, technology firms, and others.
          These competitors may have fewer financial, legal, and technological
          constraints. They may also have greater name recognition or
          established good will. {name}
          ’s ability to compete will depend on the capabilities and actions of
          its Members, for which {name}
           can offer no assurances.
          <Br />
          <Br />
          {name}
           does not have D&O indemnification or other insurance, does not intend
          to seek such insurance and may be unable to obtain such insurance on
          commercially reasonable terms. Consequently, {name} itself or its
          members could be exposed to losses.
          <Br />
          <Br />
          {name}
           does not have and does not presently intend to seek insurance that
          would cover Members against claims for damages by third parties other
          Members or by {name}, or that would cover
          {name}
           against claims for damages by Members or third parties. In the event
          that Members wished to obtain such insurance, such insurance may not
          be available on commercially reasonable terms, due to the novel
          governance features of {name}. Consequently, in the event that Members
          or {name}
           face such litigation, insurance will not be available, and any losses
          suffered by Members or {name}
           will be uninsured.
          <Br />
          <Br />
          2. LEGAL/REGULATORY RISK
          <Br />
          <Br />
          It is intended that the Members who hold Shares be general partners in
          {name}
           for securities law purposes, as a result of which
           {name}
           Members will not have the protections of the securities laws in
          purchasing or divesting themselves of their Shares.
          <Br />
          <Br />
          Although {name}
           is a company and thus not a “general partnership” under U.S. state
          laws regarding unincorporated associations, Members who hold Shares
          have the rights, powers and responsibilities of general managers of{" "}
          {name}, have the right to vote on all decisions of {name}, and may
          exit freely prior to the implementation of proposals they voted
          against. Accordingly, for securities law purposes, it is intended that
          Members holding shares be viewed as general partners of one another in
          the management of {name}. A general partnership interest is generally
          presumed not to be a security under the U.S. federal securities acts;
          accordingly, {name}
          Members may not, and should assume that they do not, have the
          protections of the U.S. federal securities laws in their investment
          decision to acquire or divest themselves of Shares. As a result,{" "}
          {name}
           Members will not have the remedies against {name}
           that would be available if Shares were securities—such as a right of
          rescission for failure to register the offering of Shares.
          <Br />
          <Br />
          It is possible that Members may, individually or collectively, cause
           {name}
           to require registration under the Investment Company Act of 1940, with
          which {name}
           would be unable to comply.
          <Br />
          <Br />
          The Investment Company Act of 1940 exempts from registration entities
          with fewer than 100 beneficial owners of securities held by the
          entity. Although {name}
           is designed not to be or become an entity required to register as an
          “investment company”, it is possible that Members may act outside the
          limitations established by the Agreement and Designated Smart
          Contracts. A Member may, for example, transfer control of a Designated
          Blockchain Network Account Address to another natural person or group
          of natural persons, in violation of the Agreement’s prohibition on such
          actions, thereby triggering registration requirements under the
          Investment Company Act.
          <Br />
          <Br />
          In the event registration is required, it may be impossible or
          infeasible for {name}
           to comply with relevant laws and regulations pertaining to the
          registration, recordkeeping, and oversight of {name}. In addition, it
          may not be possible for
           {name}
           to become aware of such an event, so that Members may not be able to
          RageQuit in order to avoid liability for violations of the Investment
          Company Act. This could have a material adverse effect on an
          investment in {name}
          .
          <Br />
          <Br />
          {name}
           may inadvertently issue non-voting shares triggering regulatory
          requirements under the Investment Advisers Act that {name} may be
          unable to comply with.
          <Br />
          <Br />
          The Investment Advisers Act of 1940 requires the registration, or
          exemption from registration, any entity that engages in the business
          of advising others as to the value or advisability of investing in,
          purchasing, or selling securities. Members of {name}
           may cause the issuance of non-voting shares which may cause {name} to
          be subject to the Investment Advisers Act. The Investment Advisers Act
          may impose restrictions on the activities of {name}, including
          substantive prohibitions, contractual requirements, recordkeeping
          requirements, and regulatory oversight and examination.
          <Br />
          <Br />
          In such an event, {name}
          ’s compliance with the Investment Advisers Act may be impossible or
          infeasible, and may require extraordinary response up to and including
          liquidation of {name}. It may be impossible for {name}
           to produce a faithful disclosure of material facts or conflicts of
          interest. It may be impossible to prevent principal transactions.
          <Br />
          <Br />
          Sales of Shares may be securities transactions requiring registration.
          <Br />
          <Br />
          The Securities Act of 1933 requires that securities transactions be
          registered with the Securities and Exchange Commission. The sale of
          Shares or other assets of {name}
           may be deemed securities transactions requiring registration unless
          subject to an exemption from registration.
          <Br />
          <Br />
          In such an event, it may be impossible or infeasible for {name} to
          comply with regulatory requirements associated with these securities
          transactions, which could have a material adverse effect on an
          investment in {name}
          .
          <Br />
          <Br />
          Shares may not be tradeable on secondary markets.
          <Br />
          <Br />
          In order to preserve exemptions from registration under the Securities
          Act and Investment Company Act, Shares of {name}
           may generally not be traded. The ability of Members to dispose of the
          Shares may be limited to redemption of Shares through the RageQuit
          function of the Designated Smart Contracts. Any such liquidation would
          distribute Org assets to the exiting Member in kind. Both Shares and
          underlying assets may not be marketable due to legal restrictions,
          which may prevent a Member from recovering part or all of the Member’s
          investment.
          <Br />
          <Br />
          As a result of its reliance on the Designated Smart Contracts, {
            name
          }{" "}
          or one of its Members may become subject to a legal order or other
          requirement that permanently or temporarily prohibits or restrains{" "}
          {name}
           from executing a function it would otherwise reasonably be expected to
          execute, or that mandates or directs {name}
           to take an action it would otherwise not reasonably be expected to
          perform, which {name}
           or such Member may be incapable of complying with.
          <Br />
          <Br />
          As a result of its reliance on the Designated Smart Contracts, which
          cannot be modified after they are deployed, {name}
           or one of its Members may become subject to a legal order or other
          requirement for which compliance is impossible or infeasible. {name}
           may not have Member or agent capable of executing a legal order or
          requirement. Noncompliance could result in legal liability that would
          have a material adverse effect on an investment in {name}
          .
          <Br />
          <Br />
          {name} may be deemed a Money Services Business requiring State and
          Federal supervision, which {name} may be incapable of complying with.
          <Br />
          <Br />
          The Bank Secrecy Act imposes a requirement for money transmitters and
          other money services businesses (MSBs) to be licensed and supervised
          by the States in which they operate. It is possible that the
          investment of money in blockchain-mediated ventures, or the operation
          of {name}
          ’s Designated Smart Contracts in conjunction with the actions of{" "}
          {name}
           or its individual Members, may constitute money transmission subject
          to licensure and supervision. In particular, the Trade functionality
          of the Designated Smart Contracts may be deemed exchange or
          transmission of money subject to State and Federal regulation.
          <Br />
          <Br />
          Compliance with such licensure and supervision requirements would
          likely be impossible or infeasible, subjecting {name}
           to legal liability. In particular, it may be impossible to maintain
          and implement required compliance programs including
          anti-money-laundering (AML) policies or participation in regulatory
          examinations. Noncompliance could result in legal liability that would
          have a material adverse effect on an investment in {name}
          .
          <Br />
          <Br />
          It may be impossible or infeasible to enforce legal agreements,
          remedies, or orders against {name}
           or its Members due to the nature of blockchain technology.
          <Br />
          <Br />
          Nearly all actions and decisions of {name}
           are mediated by blockchain technology. Generally, blockchain
          technology does not permit any action not within a specific set of
          parameters granted by the possession of a cryptographic key. Although{" "}
          {name}
           is a legal entity subject to the laws and courts of applicable
          jurisdictions, it may be impossible to enforce some legal agreements,
          remedies, or other orders against {name}
           or individual Members due to the inherent limitations of blockchain
          technology. This may have a material adverse effect on the legal
          rights of a Member or third party, or on an investment in {name}
          .
          <Br />
          <Br />
          3. BLOCKCHAIN RISK
          <Br />
          <Br />
          The Blockchain Network or a Designated Smart Contract may become
          subject to a Material Adverse Exception Event.
          <Br />
          <Br />
          Most blockchain networks operate based on open-source software. An
          open source project is not represented, maintained or monitored by an
          official organization or authority. Because of the nature of
          open-source software projects, it may be easier for third parties not
          affiliated with {name}
           to introduce software vulnerabilities or bugs into the core
          infrastructure elements of the blockchain network. This could result
          in the corruption or exploitation of the open-source code including
          but not limited to Consensus Attacks, changes to Consensus Rules, or
          blockchain reorganizations, which may result in the loss or theft of
          blockchain-based assets and have a material adverse effect on an
          investment in {name}
          .
          <Br />
          <Br />
          Similarly, it is possible that a software bug results in or permits
          the non-functionality or inoperability of Designated Smart Contracts
          or the unauthorized use of an administrative function of a Designated
          Smart Contract, which may result in the loss or theft of
          blockchain-based assets and have a material adverse effect on an
          investment in {name}
          .
          <Br />
          <Br />
          Blockchain networks may be the target of malicious attacks seeking to
          identify and exploit weaknesses in the software. Such events may
          result in a loss of trust in the security and operation of blockchain
          networks and a decline in user activity which could have a negative
          impact on {name}
           and its investments.
          <Br />
          <Br />
          Investments may be rendered valueless due to the open-source nature of
          blockchain networks.
          <Br />
          <Br />
          The majority of software operating on blockchain networks is open
          source, which generally allows third parties to produce modified
          duplicates of the software. To the extent {name}
           funds the development of such software, it is possible that a third
          party may release competing software or modify the software to remove
          profit-generating mechanisms built into the original software. This
          may have a material adverse effect on an investment in {name}.
          <Br />
          <Br />
          Blockchain technology is nascent and rapidly changing, and there
          remains minimal use of blockchain networks and blockchain assets in
          the retail and commercial marketplace. The slowing or stopping of the
          development or acceptance of blockchain networks may adversely affect
          an investment in {name}
          .
          <Br />
          <Br />
          The development of blockchain networks is a new and rapidly evolving
          industry that is subject to a high degree of uncertainty. Factors
          affecting the further development of the blockchain industry include:
          <Br />
          <Br />
          •<Tab />
          continued worldwide growth in the adoption and use of blockchain
          networks and assets;
          <Br />
          •<Tab />
          the maintenance and development of the open-source software protocol
          of blockchain networks;
          <Br />
          •<Tab />
          changes in consumer demographics and public tastes and preferences;
          <Br />
          •<Tab />
          the popularity or acceptance of the Bitcoin, Ethereum, or other
          networks;
          <Br />
          •<Tab />
          the availability and popularity of other forms or methods of buying
          and selling goods and services, including new means of using fiat
          currencies;
          <Br />
          •<Tab />
          government and quasi-government regulation of blockchain networks and
          assets, including any restrictions on access, operation and use of
          blockchain networks and assets; and
          <Br />
          •<Tab />
          the general economic environment and conditions relating to blockchain
          networks and assets.
          <Br />
          <Br />
          {name}’s business model is dependent on continued investment in and
          development of the blockchain industry and related technologies. If
          investments in the blockchain industry become less attractive to
          investors or innovators and developers, or if blockchain networks and
          assets do not gain public acceptance or are not adopted and used by a
          substantial number of individuals, companies and other entities, it
          could have a material adverse impact on {name}’s prospects and
          operations.
          <Br />
          <Br />
          The application of distributed ledger technology is novel and untested
          and may contain inherent flaws or limitations.
          <Br />
          <Br />
          The capabilities of blockchain technology are not fully proven in use.
          There are relatively few successful examples of the application of
          blockchain technology. In most cases, software used by entities
          issuing blockchain-based assets will be in an early development stage
          and still unproven. As with other novel software products, the
          computer code underpinning Shares and blockchain networks may contain
          errors, or function in unexpected ways. Insufficient testing of smart
          contract code, as well as the use of external code libraries, may
          cause the software to malfunction. Any error or unexpected
          functionality may cause a decline in value of Shares or other Org
          assets and result in substantial losses to purchasers of Shares.
          <Br />
          <Br />
          If {name}
           discovers errors or unexpected functionalities in a Designated Smart
          Contract after it has been deployed, {name} may make a determination
          that the Designated Smart Contract is defective and that its use
          should be discontinued. Members may be unable to rely on {name}
          ’s successful performance of measures intended to restore
          functionality to defective Designated Smart Contracts.
          <Br />
          <Br />
          The creation and operation of Designated Smart Contracts will be
          subject to potential technical, legal and regulatory constraints.
          There is no warranty that the process for receiving, use and ownership
          of blockchain- based assets will be uninterrupted or error-free and
          there is an inherent risk that the software, network, assets and
          related technologies and theories could contain undiscovered technical
          flaws or weaknesses, the cryptographic security measures that
          authenticate transactions and the distributed ledger could be
          compromised, and breakdowns and trading halts could cause the partial
          or complete inability loss of blockchain-based assets or
          functionality.
          <Br />
          <Br />
          Risks associated with the distributed ledger technology could affect
           {name}
          ’s business directly or the market for blockchain assets generally. In
          either case, the occurrence of these events could have a material
          adverse effect on an investment in {name}.
          <Br />
          <Br />
          Each blockchain network is dependent upon its users and contributors,
          and actions taken, or not taken, by the users or contributors of a
          blockchain network could damage its reputation and the reputation of
          blockchain networks generally.
          <Br />
          <Br />
          Developers and other contributors to blockchain network protocols
          generally maintain or develop those blockchain networks, including the
          verification of transactions on such networks. Because the networks
          are decentralized, these contributors are generally not directly
          compensated by the network for their actions. Most blockchain networks
          provide that certain classes of contributors receive awards and
          transfer fees for recording transactions and otherwise maintaining the
          blockchain network. Such fees are generally paid in the native asset
          of that network.
          <Br />
          <Br />
          The security and integrity of blockchain-based assets, including the
          value ascribed to those assets, relies on the integrity of the
          underlying blockchain networks. {name}
          ’s Designated Smart Contracts are programmed for compatibility with
          the Ethereum blockchain.
          <Br />
          <Br />
          If the awards and fees paid for maintenance of a network are not
          sufficiently high to incentivize ongoing contribution to the network,
          individuals or entities may respond in a way that reduces confidence
          in the blockchain network. To the extent that any miners or validators
          cease to record transactions, the operations and governance of {
            name
          }{" "}
          will also cease. Furthermore, any widespread delays in the recording
          of transactions could result in a loss of confidence in the blockchain
          network and its assets. This could have a material adverse effect on
          an investment in {name}, or on {name}
           itself.
          <Br />
          <Br />
          The prices of blockchain-based assets are extremely volatile.
          Fluctuations in the price of Bitcoin, Ether and/or other network
          tokens could materially and adversely affect {name}
          .
          <Br />
          <Br />
          The prices of assets such as Bitcoin and Ether have historically been
          subject to dramatic fluctuations and are highly volatile. As
          relatively new products and technologies, blockchain-based assets are
          not widely accepted as a means of payment for goods and services. A
          significant portion of demand for these assets is generated by
          speculators and investors seeking to profit from the short- or
          long-term holding of blockchain assets.
          <Br />
          <Br />
          In addition, some blockchain industry participants have reported that
          a significant percentage of trading activity on blockchain networks is
          artificial or non-economic in nature and may represent attempts to
          manipulate the price of certain assets. Trading platforms and
          blockchain developers are incentivized to artificially inflate trading
          volumes so that their platform or asset rises in league tables and
          gains prominence in the industry. As a result, trading platforms or
          blockchain assets may seek to inflate demand for a specific blockchain
          assets, or blockchain assets generally, which could increase the
          volatility of that asset or blockchain asset trading prices generally.
          <Br />
          <Br />
          The market price of these assets, as well as assets that may be
          developed in the future, may continue to be highly volatile. A lack of
          expansion, or a contraction of adoption and use of blockchain assets,
          may result in increased volatility or a reduction in the price of
          blockchain assets.
          <Br />
          <Br />
          Several additional factors may influence the market price of
          blockchain assets, including, but not limited to:
          <Br />
          <Br />
          •<Tab />
          Global blockchain asset supply;
          <Br />
          •<Tab />
          Global blockchain asset demand, which can be influenced by the growth
          of retail merchants’ and commercial businesses’ acceptance of
          blockchain assets like cryptocurrencies as payment for goods and
          services, the security of online blockchain asset trading platforms
          and digital wallets that hold blockchain assets, the perception that
          the use and holding of blockchain assets is safe and secure, and the
          regulatory restrictions on their use;
          <Br />
          •<Tab />
          Changes in the software, software requirements or hardware
          requirements underlying the blockchain networks;
          <Br />
          •<Tab />
          Changes in the rights, obligations, incentives, or rewards for the
          various participants in blockchain networks;
          <Br />
          •<Tab /> The cost of trading and
          transacting in blockchain assets, and whether such costs may become
          fixed or standardized;
          <Br />
          •<Tab />
          Investors’ expectations with respect to the rate of inflation;
          <Br />
          •<Tab />
          Interest rates;
          <Br />
          •<Tab />
          Currency exchange rates, including the rates at which blockchain
          assets may be exchanged for fiat currencies;
          <Br />
          •<Tab />
          Fiat currency withdrawal and deposit policies of blockchain asset
          trading platforms and liquidity on such platforms;
          <Br />
          •<Tab />
          Interruptions in service or other failures of major blockchain asset
          trading platforms;
          <Br />
          •<Tab />
          Investment and trading activities of large investors, including
          private and registered funds, that may directly or indirectly invest
          in blockchain networks or blockchain assets;
          <Br />
          •<Tab />
          Monetary policies of governments, trade restrictions, currency
          devaluations and revaluations;
          <Br />
          •<Tab />
          Regulatory measures, if any, that affect the use of blockchain assets;
          <Br />
          •<Tab />
          The maintenance and development of the open-source software utilized
          in blockchain networks; • Global or regional political, economic or
          financial events and situations; or
          <Br />
          •<Tab /> Global or regional political, economic or
          financial events and situations; or
          <Br />
          •<Tab />
          Expectations among blockchain network participants that the value of
          such blockchain assets will soon change.
          <Br />
          <Br />A decrease in the price of a single blockchain asset may cause
          volatility in the entire blockchain industry and may affect other
          blockchain assets. For example, a security breach that affects
          investor or user confidence in Ether or Bitcoin may affect the
          industry as a whole and may also cause the price of other blockchain
          assets to fluctuate. The value of blockchain assets and fluctuations
          in the price of blockchain assets could materially and adversely
          affect any investment in {name}.
          <Br />
          <Br />
          The regulatory regimes governing blockchain technologies, blockchain
          assets and the purchase and sale of blockchain-based assets are
          uncertain, and new regulations or policies may materially adversely
          affect the development of blockchain networks and the use of
          blockchain assets.
          <Br />
          <Br />
          As blockchain networks and blockchain assets have grown in popularity
          and in market size, international, Federal, State and local regulatory
          agencies have begun to clarify their position regarding the sale,
          purchase, ownership and trading of blockchain assets. However, there
          is growing demand among industry participants, legislators, and even
          regulators themselves for new or modified regulations in light of the
          risks and opportunities presented by blockchain technology. Various
          legislative and executive bodies in the United States and in other
          countries have shown that they intend to adopt legislation to regulate
          the sale and use of blockchain assets. Such legislation may vary
          significantly among jurisdictions, which may subject participants in
           {name}
           and the greater blockchain marketplace to different and perhaps
          contradictory requirements.
          <Br />
          <Br />
          New or changing laws and regulations or interpretations of existing
          laws and regulations, in the United States and elsewhere, may
          materially and adversely impact the development and growth of
          blockchain networks and the adoption and use of blockchain assets. The
          imposition of restrictions on all blockchain assets, or certain
          blockchain assets, could affect the value, liquidity and market price
          of blockchain assets. Heightened regulation may limit access to
          marketplaces or exchanges on which to trade such assets, or impose
          restrictions on the structure, rights and transferability of such
          assets. Some governments may seek to ban transactions in blockchain
          assets altogether.
          <Br />
          <Br />
          {name}
           may be prevented from entering, or may be required to cease operations
          in, a jurisdiction that makes it illegal or commercially unviable or
          undesirable to operate in such jurisdiction. Enforcement, or the
          threat of enforcement, may also drive a critical mass of participants
          and trading activity away from regulated markets. Although it is
          impossible to predict the positions that will be taken by certain
          governments, any regulatory changes affecting blockchain assets could
          be substantial and materially adverse to the development and growth of{" "}
          {name}
           and its business.
          <Br />
          <Br />
          The extent to which blockchain assets are used or perceived to fund
          criminal or terrorist enterprises or launder the proceeds of illegal
          activities could materially impact {name}
          .
          <Br />
          <Br />
          The potential, or perceived potential, for anonymity in transfers of
          bitcoin and similar assets, as well as the decentralized nature of
          blockchain networks, has led some terrorist groups and other criminals
          to solicit bitcoins and other blockchain-based assets for capital
          raising purposes. As blockchain assets have grown in both popularity
          and market size, legislative and regulatory bodies have been examining
          the operations of blockchain assets, users, and exchanges, concerning
          the use of blockchain assets for the purpose of laundering the
          proceeds of illegal activities or funding criminal or terrorist
          enterprises.
          <Br />
          <Br />
          In addition to existing networks and assets, new blockchain networks
          or similar technologies may be developed to provide more anonymity and
          less traceability. There is also the potential that other blockchain
          asset trading platforms may court illicit activity by not adhering to
          know-your-customer and anti-money laundering practices.
          <Br />
          <Br />
          {name}
           may not be able to prevent illegal activity from occurring using the
          Designated Smart Contracts. {name}
           may be unable to detect the unauthorized use of a KYC/AML whitelisted
          Member address. Further, {name}
           may be unable to verify whether cryptographic keys for wallets
          containing Shares have been transferred to third parties who have not
          completed the required KYC/AML process. Although {name}
           plans to implement compliance procedures for KYC/AML obligations,
          {name}
           may not be successful in deterring or identifying illegal activity.
          <Br />
          <Br />
          The use of blockchain assets for illegal purposes, or the perception
          of such use, could result in significant legal and financial exposure,
          damage to {name}
          ’s reputation, damage to the reputation of blockchain assets
          generally, and a loss of confidence in the services provided by {name}
           and the blockchain industry and community as a whole.
          <Br />
          <Br />
        </Text>
      </Page>
    </Document>
  )
}

export default DelawareInvestmentClubTemplate
