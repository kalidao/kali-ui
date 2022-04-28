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
const PropertyTokenizer = ({ header, effectiveDate, ownerAddress, holder, holderAddress, propertyDesc, licenseLang, token, amount, term, licenseFee, prohibitions, choiceOfLaw, designatedClient, network, networkId, chainId, smartAddress, imageLink }) => {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.heading1}>PROPERTY TOKENIZER</Text>
        <Text style={styles.text}>
          THIS SEVERANCE AND TOKENIZATION AGREEMENT OF {header} (“Agreement”) is made and entered into effective as of {effectiveDate} (“Effective Date”), by and between the owner represented at Account Address {ownerAddress} (“Owner”) of real, tangible or personal property, and {holder} (“Holder”) represented at Account Address {holderAddress}. Owner and Holder are referred to collectively below as the “Parties.”
        </Text>
        <Text style={styles.text}>
          WHEREAS, Owner is the owner of that certain tangible, personal or real property commonly known as the {propertyDesc} (“Real Property”); and
        </Text>
        <Text style={styles.text}>
          WHEREAS, Holder and Owner desire to constructively sever and treat as personal property (“Severed Property”); and
        </Text>
        <Text style={styles.text}>
          WHEREAS, Holder and Owner desire to mint cryptographic tokens to manage and represent certain rights, ownership and control over the Severed Property (“Severed Property Token”); and
        </Text>
        <Text style={styles.text}>
          WHEREAS, Holder desires to transfer ownership of the Severed Property Token to the Holder; and
        </Text>
        <Text style={styles.text}>
          WHEREAS, Holder desires to obtain license to {licenseLang}; and
        </Text>
        <Text style={styles.text}>
          NOW, THEREFORE, in consideration of the foregoing recitals, which are hereby incorporated into this Agreement, and other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the Parties hereby:
        </Text>
        <Text style={styles.numbered_list}>
          Agree that the Severed Property typically considered a fixture or otherwise real property, is considered severed by this agreement and shall be considered personal property until which time the Option to repurchase is exercised and Severed Property merges back with the Real Property,
          <Br />
          <Br />
          Consent that the {token} will be minted and the parties will defer to this agreement to govern and manage the Severed Property using the Severed Property Token,
          <Br />
          <Br />
          Consent to the License from the Owner to the Holder to access Severed Property, and
          <Br />
          <Br />
          Agree that upon payment of a liquidated amount of {amount}, the Holder shall grant said Owner the right, but not the obligation, to repurchase Severed Property at any time thereby revoking the License and this Agreement (the “Option”). For avoidance of doubt, Severed Property would resume its state as a fixture and constructively merge and become part of the Real Property upon exercise of this Option.
        </Text>
        <Text style={styles.text}><Text style={{ textDecoration: "underline" }}>Revocable License</Text></Text>
        <Text style={styles.text}>
          Grant of Revocable License. Subject to the terms of this Agreement, Owner hereby grants to Holder a revocable license for the Term of this Agreement to use that portion of Real Property shown on the Site Plan for the sole use of traversing the Real Property {licenseLang} to use, enjoy, or harvest Severed Property. It is specifically determined that Holder may not {prohibitions}. The ownership of Severed Property and license shall be managed and represented amongst the parties through the minting of a token on the Designated Blockchain Network and shall also include a Cryptographic Hash Function to map the executed document using IPFS of this executed Agreement.
        </Text>
        <Text style={styles.text}><Text style={{ textDecoration: "underline" }}>Term</Text></Text>
        <Text style={styles.text}>
          This License shall be for a term of {term}. This License shall automatically expire at the end of the Term, unless both parties agree otherwise.
        </Text>
        <Text style={styles.text}><Text style={{ textDecoration: "underline" }}>License Fee</Text></Text>
        <Text style={styles.text}>
          The Holder agrees to pay Owner {licenseFee} for the Term of the Agreement.
        </Text>
        <Text style={styles.text}><Text style={{ textDecoration: "underline" }}>Restriction</Text></Text>
        <Text style={styles.text}>
          Holder is expressly prohibited from changing the Real Property in any manner and shall tread lightly. Holder shall permit no liens to be filed against Real Property and Holder shall indemnify and hold Owner and its successors and assigns harmless from and against all costs or expenses of any kind, including but not limited to attorneys&#39; fees, incurred by Owner or its successors or assigns related to any such lien or any notice of intent to file such a lien. The provisions of this paragraph shall survive the termination of this Agreement.
        </Text>
        <Text style={styles.text}><Text style={{ textDecoration: "underline" }}>Insurance</Text></Text>
        <Text style={styles.text}>
          Owner shall not provide insurance for Holder and Owner shall not be liable for damages or injuries caused by or arising from actions or nonactions of the Owner. Holder assumes all risk from actions or inactions on the property and agrees that they will obtain insurance showing evidence of liability coverage for bodily injury, death, and property damage to any person.
        </Text>
        <Text style={styles.text}><Text style={{ textDecoration: "underline" }}>Termination</Text></Text>
        <Text style={styles.text}>
          This Agreement is for the sole benefit of Owner and shall not create any easement or other interest in Real Property in favor of Holder. This Agreement and the license granted herein shall not run with the land. Owner may terminate this agreement and the revocable license at any time upon exercise of the Option. Any attempted alienation or assignment without Owner&#39;s consent as provided herein shall be null and void and without legal effect as it is a NON FUNGIBLE token.
        </Text>
        <Text style={styles.text}><Text style={{ textDecoration: "underline" }}>Effect of Termination</Text></Text>
        <Text style={styles.text}>
          Upon the termination of this Agreement after Owner excercises the Option or through its natural expiry of the Term the token shall be constructively destroyed (a “Token Burn”), Holder shall no longer have any right to visit the Real Property unless invited.
        </Text >
        <Text style={styles.text}><Text style={{ textDecoration: "underline" }}>Title to Real Property</Text></Text>
        <Text style={styles.text}>
          Owner expressly acknowledges and agrees that Owner has good and sufficient title to the Real Property, including but not limited to that portion that is shown on the Site Plan as Severed Property. Holder gains access to and acknowledges that Real Property is taken “As Is” and “With All Faults.” Holder further acknowledges and agrees that the License granted herein is permissive in nature, and Holder waives any and all claims of whatsoever kind or character, including but not limited to claims of adverse possession, to any interest in Real Property arising from or relating in any way to the License granted herein. This Agreement is expressly granted with the understanding that the licensed use shall not constitute adverse possession of any portion of Real Property. This Agreement shall not in any way limit Owner&#39;s ability to license or otherwise dispose of land not subject to the terms of this Agreement. The provisions of this paragraph shall survive the termination of this Agreement.
        </Text >
        <Text style={styles.text}><Text style={{ textDecoration: "underline" }}>Governing Law</Text></Text>
        <Text style={styles.text}>
          Construction of Agreement, and Venue. The interpretation and enforcement of this Agreement shall be governed by the laws of the State of {choiceOfLaw}. The Parties acknowledge that this Agreement was produced by arms-length negotiation between sophisticated parties with equal bargaining power. The Parties agree that the rule of construction that any ambiguities are to be construed against the drafting party shall not be employed in any interpretation of this Agreement.
        </Text >
        <Text style={styles.text}><Text style={{ textDecoration: "underline" }}>Entire Agreement</Text></Text>
        <Text style={styles.text}>
          Attorneys&#39; Fees. This Agreement constitutes the complete and entire agreement between the Parties and supersedes all prior written or oral negotiations, representations or agreements between the Parties as to the subject matter of this Agreement. The terms of this Agreement may not be modified except by a writing signed by all of the Parties. In any dispute, conflict, legal action or other proceeding arising out of, or brought to construe or enforce any of the provisions of, this Agreement, the prevailing party shall be entitled to recover its costs and attorneys&#39; fees from the non-prevailing party. The provisions of this paragraph shall survive the termination of this Agreement.
        </Text>
        <Text style={styles.text}><Text style={{ textDecoration: "underline" }}>Counterparts; Signatures</Text></Text>
        <Text style={styles.text}>
          The parties hereto agree that this Agreement shall be executed via signed transaction on the Designated Blockchain Network through a function call of transfer() to the smart contract initiated transfer of the Token from Owner to Holder, and payment of License Fee from Holder to Owner (the “Signature”).
        </Text>
        <Text style={styles.text}>
          IN WITNESS WHEREOF, this Agreement is entered into by the Parties as of the Effective Date upon the effectuated Signature of the parties.
        </Text>
        <Text style={styles.text}>
          /s Owner
        </Text>
        <Text style={styles.text}>
          /s Holder
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber }) =>
            `${pageNumber}`
          }
          fixed
        />
      </Page>
      <Page style={styles.body}>
        <Text style={styles.heading1}>Exhibit A - SITE PLAN</Text>
      </Page>
      <Page style={styles.body}>
        <Text style={styles.heading1}>Exhibit B - General Definition</Text>
        <Text style={styles.numbered_list}>
          (a)
          <Tab />
          <Text style={{ textDecoration: "underline" }}>“Account Address”</Text>{" "}
          means a public key address on the Designated Blockchain Network that is uniquely associated with a single private key, and at which no smart contract has been deployed.
          <Br />
          <Br />
          (b)
          <Tab />
          <Text style={{ textDecoration: "underline" }}>“Claim”</Text>{" "}
          means any past, present or future dispute, claim, controversy, demand, right, obligation, liability, action or cause of action of any kind or nature.
          <Br />
          <Br />
          (c)
          <Tab />
          <Text style={{ textDecoration: "underline" }}>“Confirmation”</Text>{" "}
          of a transaction shall be deemed to have occurred if and only if such transaction has been recorded in accordance with the Consensus Rules in a valid block whose hashed header is referenced by at least 12 subsequent valid blocks on the Designated Blockchain.
          <Br />
          <Br />
          (d)
          <Tab />
          <Text style={{ textDecoration: "underline" }}>“Consensus Attack”</Text>{" "}
          means an attack that: (i) is undertaken by or on behalf of a block producer who controls, or group of cooperating block producers who collectively control, a preponderance of the means of block production on the Designated Blockchain Network; and (ii) has the actual or intended effect of: (A) reversing any transaction made to or by the Designated Smart Contract after Confirmation of such transaction, including any “double spend” attack having or intended to have such effect; or (B) preventing inclusion in blocks or Confirmation of any transaction made to or by the Designated Smart Contract, including any “censorship attack,” “transaction withholding attack” or “block withholding attack” having or intended to have such effect.
          <Br />
          <Br />
          (e)
          <Tab />
          <Text style={{ textDecoration: "underline" }}>“Consensus Rules”</Text>{" "}
          means the rules for transaction validity, block validity and determination of the canonical blockchain that are embodied in the Designated Client.
          <Br />
          <Br />
          (f)
          <Tab />
          <Text style={{ textDecoration: "underline" }}>“Contract”</Text>{" "}
          means any: (i) written, oral, implied by course of performance or otherwise or other agreement, contract, understanding, arrangement, settlement, instrument, warranty, license, insurance policy, benefit plan or legally binding commitment or undertaking; or (ii) any representation, statement, promise, commitment, undertaking, right or obligation that may be enforceable, or become subject to an Order directing performance thereof, based on equitable principles or doctrines such as estoppel, reliance, or quasi-contract.
          <Br />
          <Br />
          (g)
          <Tab />
          <Text style={{ textDecoration: "underline" }}>“Severed Property Token”</Text>{" "}
          means any Token or other asset, right or property licensed to or on deposit with or owned, held, custodied, controlled or possessed by or on behalf of Holder, including any Token on deposit with or held, controlled, possessed by or on deposit with the Designated Smart Contract relating to the Severed Property.
          <Br />
          <Br />
          (h)
          <Tab />
          <Text style={{ textDecoration: "underline" }}>“Designated Blockchain”</Text>{" "}
          means at any given time, the version of the digital blockchain ledger that at least a majority of nodes running the Designated Client on the Designated Blockchain Network recognize as canonical as of such time in accordance with the Consensus Rules. For the avoidance of doubt, the “Designated Blockchain“ does not refer to ETHEREUM CLASSIC or any digital blockchain ledger commonly known as a “testnet“.
          <Br />
          <Br />
          (i)
          <Tab />
          <Text style={{ textDecoration: "underline" }}>“Designated Blockchain Network”</Text>{" "}
          means the {network} mainnet (networkID: {networkId}, chainID: {chainId}) as recognized by the Designated Client.
          <Br />
          <Br />
          (j)
          <Tab />
          <Text style={{ textDecoration: "underline" }}>“Designated Client”</Text>{" "}
          means the {designatedClient}.
          <Br />
          <Br />
          (k)
          <Tab />
          <Text style={{ textDecoration: "underline" }}>“Designated Smart Contract”</Text>{" "}
          means the smart contract deployed on {network} mainnet (networkID: {networkId}, chainID: {chainId}) at {smartAddress}.
          <Br />
          <Br />
          (l)
          <Tab />
          <Text style={{ textDecoration: "underline" }}>“Distributed Property”</Text>{" "}
          means any asset, right or property that was once Severed Property Token and has been distributed.
          <Br />
          <Br />
          (m)
          <Tab />
          <Text style={{ textDecoration: "underline" }}>“Legal Order”</Text>{" "}
          means any restraining order, preliminary or permanent injunction, stay or other order, writ, injunction, judgment or decree that either: (i) is issued by a court of competent jurisdiction, or (ii) arises by operation of applicable law as if issued by a court of competent jurisdiction, including, in the case of clause “(ii)” an automatic stay imposed by applicable law upon the filing of a petition for bankruptcy.
          <Br />
          <Br />
          (n)
          <Tab />
          <Text style={{ textDecoration: "underline" }}>“Legal Proceeding”</Text>{" "}
          means any private or governmental action, suit, litigation, arbitration, claim, proceeding (including any civil, criminal, administrative, investigative or appellate proceeding), hearing, inquiry, audit, examination or investigation commenced, brought, conducted or heard by or before, or otherwise involving, any court or other governmental entity or any arbitrator or arbitration panel.
          <Br />
          <Br />
          (o)
          <Tab />
          <Text style={{ textDecoration: "underline" }}>“Liability”</Text>{" "}
          means any debt, obligation, duty or liability of any nature (including any unknown, undisclosed, unmatured, unaccrued, unasserted, contingent, indirect, conditional, implied, vicarious, inchoate derivative, joint, several or secondary liability), regardless of whether such debt, obligation, duty or liability would be required to be disclosed on a balance sheet prepared in accordance with generally accepted accounting principles and regardless of whether such debt, obligation, duty or liability is immediately due and payable. To be “Liable” means to have, suffer, incur, be obligated for or be subject to a Liability.
          <Br />
          <Br />
          (p)
          <Tab />
          <Text style={{ textDecoration: "underline" }}>“Lien”</Text>{" "}
          means any lien, pledge, hypothecation, charge, mortgage, security interest, encumbrance, other possessory interest, conditional sale or other title retention agreement, intangible property right, claim, infringement, option, right of first refusal, preemptive right, exclusive license of intellectual property, community property interest or restriction of any nature including any restriction on the voting of any security or restriction on the transfer, use or ownership of any security or other asset.
          <Br />
          <Br />
          (q)
          <Tab />
          <Text style={{ textDecoration: "underline" }}>“Material Adverse Exception Event”</Text>{" "}
          means that one or more of the following has occurred, is occurring or would reasonably be expected to occur:
          <Br />
        </Text>
        <Text style={styles.numbered_list}>
          (i)
          <Tab />
          a Consensus Attack adversely affecting the results or operations of the Designated Smart Contract;
          <Br />
          <Br />
          (ii)
          <Tab />
          the Designated Smart Contract having become inoperable, inaccessible or unusable, including as the result of any code library or repository incorporated by reference into the Designated Smart Contract or any other smart contract or oracle on which the Designated Smart Contract depends having become inoperable, inaccessible or unusable or having itself suffered a Material Adverse Exception Event, mutatis mutandis;
          <Br />
          <Br />
          (iii)
          <Tab />
          a material and adverse effect on the use, functionality or performance of the Designated Smart Contract as the result of any bug, defect or error in the Designated Smart Contract or the triggering, use or exploitation (whether intentional or unintentional) thereof (it being understood that for purposes of this clause “(iii)”, a bug, defect or error will be deemed material only if it results in a loss to a RealDAO Member or RealDAO of at least 25 percent of such RealDAO Member&#39;s distributable interest in RealDAO Property and/or 15 percent of the RealDAO Property);
          <Br />
          <Br />
          (iv)
          <Tab />
          any unauthorized use of an administrative function or privilege of the Designated Smart Contract, including: (A) any use of any administrative credential, key, password, account or address by a Person who has misappropriated or gained unauthorized access to such administrative credential, key, password, account or address or (B) any unauthorized use of an administrative function or privilege by a Holder or a representative of a Holder; or
          <Br />
          <Br />
          (v)
          <Tab />
          the Designated Smart Contract, any of Holder or the Owner is subject to a Legal Order that prohibits the Designated Smart Contract (or that, if the Designated Smart Contract were a Person, would prohibit the Designated Smart Contract) from executing any function or operation it would otherwise reasonably be expected to execute.
          <Br />
          <Br />
          (vi)
          <Tab />
          the Severed Property Token, has been irretrievable lost, stolen, converted by an unauthorized party or transferred to a party that has not been made a Party to this Agreement.
        </Text>
        <Text style={styles.numbered_list}>
          (r)
          <Tab />
          <Text style={{ textDecoration: "underline" }}>“Person”</Text>{" "}
          means any human, robot, bot, artificial intelligence, corporation, partnership, association or other individual or entity recognized as having the status of a person under the law.
          <Br />
          <Br />
          (s)
          <Tab />
          <Text style={{ textDecoration: "underline" }}>“Token”</Text>{" "}
          means a digital unit that is recognized by the Designated Client on the Designated Blockchain Network as capable of: (a) being uniquely associated with or “owned“ by a particular public-key address on the Designated Blockchain Network at each particular block height; and (b) having Transfers of such digital unit recorded on the Designated Blockchain.
          <Br />
          <Br />
          (t)
          <Tab />
          <Text style={{ textDecoration: "underline" }}>“Transfer”</Text>{" "}
          of a Token to a given address (the “Receiving Address”) on the Designated Blockchain Network will be deemed to have occurred if and only if it is recognized by the Designated Client on the Designated Blockchain Network that:
          <Br />
        </Text>
        <Text style={styles.numbered_list}>
          (i)
          <Tab />
          there has been duly transmitted to the Designated Blockchain Network a new transfer function transaction that: (a) provides for the reassociation of the Designated Token with the Receiving Address; and (b) is signed by a private key that is (or a group of private keys that together are) sufficient to authorize the execution of such transfer function; and
          <Br />
          <Br />
          (ii)
          <Tab />
          such transaction has been Confirmed.
          <Br />
        </Text>
        <Text style={styles.numbered_list}>
          (u)
          <Tab />
          <Text style={{ textDecoration: "underline" }}>“Guild Kick”</Text>{" "}
          means removal from the membership via vote of RealDAO members to destroy the RealDAO Membership token through a burn function or other process as described in the Handbook. Unless specifically provided otherwise a member subject to a Guild Kick shall not be entitled to any distribution or return of capital, funds, retains, etc nor shall retain any benefit of the Token.
          <Br />
          <Br />
          (v)
          <Tab />
          <Text style={{ textDecoration: "underline" }}>“Token Burn”</Text>{" "}
          means destruction or permanent removal from the Token through institution a “burn” function or otherwise sending to Account Address 0x000000000000000000000000000000000000.
          <Br />
          <Br />
          (w)
          <Tab />
          <Text style={{ textDecoration: "underline" }}>“A Cryptographic Hash Function”</Text>{" "}
          is a mathematical algorithm that maps data of arbitrary size (often called the “message”) to a bit array of a fixed size (the “hash value”, “hash”, or “message digest”).
          <Br />
          <Br />
        </Text>
      </Page >
    </Document >
  )
}

export default PropertyTokenizer