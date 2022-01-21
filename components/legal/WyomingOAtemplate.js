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
    margin: 12,
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

const WyomingOAtemplate = ({ name, date, email, ethAddress, id }) => {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.heading1}>DAO LLC OPERATING AGREEMENT</Text>
        <Text style={styles.heading3}>{name} LLC</Text>
        <Text style={styles.heading3}>A Member-Managed DAO LLC</Text>
        <Text style={styles.text}></Text>
        <Text style={styles.heading2}>WYOMING LLC OPERATING AGREEMENT</Text>
        <Text style={styles.text}>
          THIS OPERATING AGREEMENT is made and entered into effective as of{" "}
          {date}, by and among the parties indicated on{" "}
          <Text style={{ textDecoration: "underline" }}>Schedule 1</Text>{" "}
          contributing to and managing "{name}", a limited liability company
          operating on the Ethereum blockchain network ("
          <Text style={{ textDecoration: "underline" }}>Ethereum</Text>")
          (collectively referred to in this agreement as the "
          <Text style={{ textDecoration: "underline" }}>Members</Text>"). THIS
          OPERATING AGREEMENT is made and entered into effective as of {date},
          by and among the parties assigned cryptographic interests in the
          decentralized autonomous organization described on Schedule 1
          (collectively referred to in this agreement as the "Members")
        </Text>
        <Text style={styles.heading1}>SECTION 1</Text>
        <Text style={styles.heading2}>THE DAO LLC</Text>
        <Text style={styles.numbered_list}>
          1.1
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Formation.</Text>
          <Tab />
          Effective {date}, the Members form a limited liability company ("
          <Text style={{ textDecoration: "underline" }}>LLC</Text>") under the
          name {name} LLC (the "
          <Text style={{ textDecoration: "underline" }}>DAO LLC</Text>") on the
          terms and conditions in this Operating Agreement (this "
          <Text style={{ textDecoration: "underline" }}>Agreement</Text>") and
          pursuant to Chapter 29 of the Wyoming Limited Liability Company Act
          (the "<Text style={{ textDecoration: "underline" }}>Act</Text>"). The
          Members agree to file with the appropriate agency(ies) within the
          State of Wyoming charged with processing and maintaining such records
          all documentation required for the formation and maintenance of the
          DAO LLC. The rights and obligations of the Members are as provided in
          the Act except as otherwise expressly provided in this Agreement.
          <Br />
          <Br />
          1.2
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Name.</Text>
          <Tab />
          The business of the DAO LLC will be conducted under the name {
            name
          }{" "}
          LLC, or under such other name(s) which the Members may agree upon as
          provided in this Agreement and from time to time.
          <Br />
          <Br />
          1.3
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Purpose.</Text>
          <Tab />
          The purpose of the DAO LLC is to engage in any lawful act or activity
          for which an LLC may be formed within the State of Delaware.
          <Br />
          <Br />
          1.4
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Office.</Text>
          <Tab />
          The DAO LLC shall continuously maintain an office and registered agent
          in the State of Wyoming as required by the Act. The DAO LLC will
          maintain its principal business office at such places of business
          and/or Ethereum address(es) as the Members may deem advisable for the
          conduct of the DAO LLC's business.
          <Br />
          <Br />
          1.5
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Term.</Text>
          <Tab />
          The term of the DAO LLC commences on {date} and shall continue
          perpetually unless sooner terminated as provided in this Agreement.
          <Br />
          <Br />
          1.6
          <Tab />
          <Text style={{ textDecoration: "underline" }}>
            Admission of Additional Members.
          </Text>
          <Tab />
          Except as otherwise expressly provided herein, no additional Members
          may be admitted to the DAO LLC without the consent of the Members as
          provided in this Agreement.
          <Br />
          <Br />
          1.7
          <Tab />
          <Text style={{ textDecoration: "underline" }}>
            Admission of Series of Members.
          </Text>
          <Tab />
          The DAO LLC may form separate series with respect to the Members
          pursuant to the Act, and if so formed and listed on *Schedule 2*, the
          Members intend that the debts, liabilities and obligations incurred,
          contracted for or otherwise existing with respect to a particular
          series of the DAO LLC will be enforceable against the assets of such
          series only, and not against the assets of the DAO LLC generally or
          any other series thereof, and none of the debts, liabilities,
          obligations and expenses incurred, contracted for or otherwise
          existing with respect to the DAO LLC generally or any other series
          thereof shall be enforceable against the assets of such series ("
          <Text style={{ textDecoration: "underline" }}>Series</Text>").
          <Br />
        </Text>
        <Text style={styles.heading1}>SECTION 2</Text>
        <Text style={styles.heading2}>CAPITAL CONTRIBUTIONS</Text>
        <Text style={styles.numbered_list}>
          2.1
          <Tab />
          <Text style={{ textDecoration: "underline" }}>
            Initial Contributions.
          </Text>
          <Tab />
          The initial and other contributions of the Members and those
          subsequently admitted as Members shall be set forth in *Schedule 1* as
          amended from time to time. Contributions shall be made in ether, USDC,
          DAI, digital assets, cryptocurrencies and/or equivalent work as
          determined by the Members. Contributions by members among Series shall
          be set forth in *Schedule 2* as amended from time to time.
          <Br />
          <Br />
          2.2
          <Tab />
          <Text style={{ textDecoration: "underline" }}>
            Additional Contributions.
          </Text>
          <Tab />
          No Member shall be obligated to make any additional contribution to
          the DAO LLC's capital without the consent of the Members as provided
          in this Agreement.
          <Br />
          <Br />
          2.3
          <Tab />
          <Text style={{ textDecoration: "underline" }}>
            No Interest on Capital Contributions.
          </Text>
          <Tab />
          Members are not entitled to interest or other compensation for or on
          account of their capital contributions to the DAO LLC except to the
          extent, if any, expressly provided in this Agreement.
          <Br />
        </Text>
        <Text style={styles.heading1}>SECTION 3</Text>
        <Text style={styles.heading2}>
          ALLOCATION OF PROFITS AND LOSSES; DISTRIBUTIONS
        </Text>
        <Text style={styles.numbered_list}>
          3.1
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Distributions.</Text>
          <Tab />
          The Members shall determine and distribute available funds annually or
          at more frequent intervals as they see fit and determine as provided
          in this Agreement. Available funds, as referred to herein, shall mean
          the net cash, digital asset and/or cryptocurrency equivalents of the
          DAO LLC available after appropriate provision for expenses and
          liabilities, as determined by the Members. Distributions in
          liquidation of the DAO LLC or in liquidation of a Member's interest
          shall be made in accordance with the positive capital account balances
          pursuant to *U.S. Department of the Treasury Regulation
          1.704.1(b)(2)(ii)(b)(2)*. To the extent a Member shall have a negative
          capital account balance, there shall be a qualified income offset, as
          set forth in *U.S. Department of the Treasury Regulation
          1.704.1(b)(2)(ii)(d)*.
          <Br />
          <Br />
          3.2
          <Tab />
          <Text style={{ textDecoration: "underline" }}>
            No Right to Demand Return of Capital.
          </Text>
          <Tab />
          No Member has any right to any return of capital or other distribution
          except as expressly provided in this Agreement. No Member has any
          drawing account in the DAO LLC.
          <Br />
        </Text>
        <Text style={styles.heading1}>SECTION 4</Text>
        <Text style={styles.heading2}>LIMITATION OF LIABILITIES</Text>
        <Text style={styles.numbered_list}>
          4.1
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Indemnification.</Text>
          <Tab />
          The DAO LLC shall indemnify any person who was or is a party defendant
          or is threatened to be made a party defendant, pending or completed
          action, suit or proceeding, whether civil, criminal, administrative,
          or investigative (other than an action by or in the right of the DAO
          LLC) by reason of the fact that they are or were a Member of the DAO
          LLC, manager, employee, or agent of the DAO LLC, or are or were
          serving at the request of the DAO LLC, against expenses (including
          attorney's fees), judgments, fines, and amounts paid in settlement
          actually and reasonably incurred in connection with such action, suit
          or proceeding if the Members determine that they acted in good faith
          and in a manner they reasonably believed to be in or not opposed to
          the best interest of the DAO LLC, and with respect to any criminal
          action proceeding, have no reasonable cause to believe their conduct
          was unlawful. The termination of any action, suit, or proceeding by
          judgment, order, settlement, conviction, or upon a plea of "no lo
          Contendere" or its equivalent, shall not in itself create a
          presumption that the person did or did not act in good faith and in a
          manner which they reasonably believed to be in the best interest of
          the DAO LLC, and, with respect to any criminal action or proceeding,
          had reasonable cause to believe that their conduct was lawful.
          <Br />
          <Br />
          4.2
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Fiduciary Duties.</Text>
          <Tab />
          No Member, manager, employee, or similarly authorized agent of the DAO
          LLC ("<Text style={{ textDecoration: "underline" }}>Manager</Text>")
          shall be obligated personally for any debt, obligation or liability of
          the DAO LLC or of any Member, whether arising in contract, tort or
          otherwise, by reason of being or acting as Manager of the DAO LLC. No
          Manager shall be personally liable to the DAO LLC or its Members for
          any action undertaken or omitted in good faith reliance upon the
          provisions of this Agreement, and the DAO LLC shall indemnify such
          Managers for the same, unless the acts or omissions of the Manager
          were not in good faith or involved criminal activity, willful
          misconduct, fraud, or a knowing violation or breach of this Agreement;
          provided, however, that each Manager shall owe, and shall act in a
          manner consistent with, fiduciary duties to the DAO LLC and its
          Members of the nature, and to the same extent, as those owed by
          directors of a Delaware corporation. Additionally, the DAO LLC may
          provide additional liability protection by entering into individual
          indemnification contracts with Managers. For the avoidance of doubt
          the DAO LLC may also enter into individual indemnification contracts
          with its Members, officers, employees, and agents.
        </Text>
        <Text style={styles.heading1}>SECTION 5</Text>
        <Text style={styles.heading2}>
          POWERS AND DUTIES OF MANAGING MEMBERS
        </Text>
        <Text style={styles.numbered_list}>
          5.1
          <Tab />
          <Text style={{ textDecoration: "underline" }}>
            Management of DAO LLC.
          </Text>
          <Tab />
          5.1.1 The Members, within the authority granted by the Act and the
          terms of this Agreement and as signified through Member Token Votes
          (*defined below*), shall have the complete power and authority to
          manage and operate the DAO LLC and make all decisions affecting its
          business and affairs. Similarly, the business and affairs of a Series
          shall be vested in the members of that Series in accordance with this
          Agreement and as detailed in *Schedule 2*.
          <Br />
          <Br />
          5.1.2 Except as otherwise provided in this Agreement, all decisions
          and documents relating to the management and operation of the DAO LLC
          shall be made and determined by recorded votes of the Members'
          interests in the DAO LLC secured and denominated on Ethereum ("
          <Text style={{ textDecoration: "underline" }}>Member Tokens</Text>")
          and as signified through the online DAO LLC Member portal indicated on
          *Schedule 1*, including such other governance interfaces approved by
          the Members as provided in this Agreement (such determination, "
          <Text style={{ textDecoration: "underline" }}>
            Member Token Votes
          </Text>
          ").
          <Br />
          <Br />
          5.1.3 Third parties dealing with the DAO LLC shall be entitled to rely
          conclusively upon the power and authority of the Members to manage and
          operate the business and affairs of the DAO LLC as signified through
          Member Token Votes.
          <Br />
          <Br />
          5.1.4 In the event that Member Token Votes cannot be determined, due
          to, among other causes, exigent circumstances related to the operation
          of the DAO LLC interface(s), Ethereum, or otherwise, the Members shall
          promptly select an alternative governance mechanism in writing to
          record votes of Member Tokens and determine Member Token Votes for the
          DAO LLC.
          <Br />
          <Br />
          5.2
          <Tab />
          <Text style={{ textDecoration: "underline" }}>
            Decisions by Members.
          </Text>
          <Tab />
          Whenever in this Agreement reference is made to the decision, consent,
          approval, judgment, or action of the Members, unless otherwise
          expressly provided in this Agreement, such decision, consent,
          approval, judgment, or action shall mean the consent of Members
          determined by recorded votes of Member Tokens and as signified through
          Member Token Votes.
          <Br />
        </Text>
        <Text style={styles.heading1}>SECTION 6</Text>
        <Text style={styles.heading2}>
          PAYMENT OF EXPENSES, SALARIES, AND COUNSEL
        </Text>
        <Text style={styles.numbered_list}>
          6.1
          <Tab />
          <Text style={{ textDecoration: "underline" }}>
            Organization Expenses.
          </Text>
          <Tab />
          All expenses incurred in connection with the organization of the DAO
          LLC will be paid by the DAO LLC as approved by Member Token Votes.
          <Br />
          <Br />
          6.2
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Salary.</Text>
          <Tab />
          No salary will be paid to a Member for the performance of their duties
          under this Agreement unless the salary has been approved by Member
          Token Votes.
          <Br />
          <Br />
          6.3
          <Tab />
          <Text style={{ textDecoration: "underline" }}>
            Legal and Accounting Services.
          </Text>
          <Tab />
          The DAO LLC may obtain legal and accounting services to the extent
          reasonably necessary for the conduct of the DAO LLC's business.
          <Br />
        </Text>
        <Text style={styles.heading1}>SECTION 7</Text>
        <Text style={styles.heading2}>
          BOOKS OF ACCOUNT, RECORDS, ACCOUNTING REPORTS, FISCAL YEAR, TAX
          MATTERS
        </Text>
        <Text style={styles.numbered_list}>
          7.1
          <Tab />
          <Text style={{ textDecoration: "underline" }}>
            Method of Accounting.
          </Text>
          <Tab />
          The DAO LLC will use the method of accounting previously determined by
          the Members for financial reporting and tax purposes.
          <Br />
          <Br />
          7.2
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Books of Record.</Text>
          <Tab />
          The books and records of the DAO LLC may be kept within or outside the
          State of Wyoming at such places as may from time to time be designated
          by the Members.
          <Br />
          <Br />
          7.3
          <Tab />
          <Text style={{ textDecoration: "underline" }}>
            Fiscal Year; Taxable Year.
          </Text>
          <Tab />
          The fiscal year and the taxable year of the DAO LLC is the calendar
          year.
          <Br />
          <Br />
          7.4
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Capital Accounts.</Text>
          <Tab />
          Capital Accounts among the Members and any Series formed hereafter
          shall be maintained on Ethereum and evidenced by Member Token Votes
          and equivalent determinations by Series under their respective
          agreements.
          <Br />
          <Br />
          7.5
          <Tab />
          <Text style={{ textDecoration: "underline" }}>
            Tax Representative.
          </Text>
          <Tab />
          TThe Members shall select a "Tax Representative," who shall be the
          "partnership representative" of the DAO LLC within the meaning of
          Section 6223(a) of the Internal Revenue Code of 1986. If any state or
          local tax law provides for a partnership representative or person
          having similar rights, powers, authority or obligations (including as
          a "tax matters partner"), the Tax Representative shall also serve in
          such capacity. The Tax Representative may resign at any time. If a Tax
          Representative ceases to serve as such for any reason, the DAO LLC
          itself will automatically and immediately become the new (acting) Tax
          Representative until a new Tax Representative is selected by the
          Members as provided in this Agreement.
          <Br />
        </Text>
        <Text style={styles.heading1}>SECTION 8</Text>
        <Text style={styles.heading2}>REPRESENTATIONS & WARRANTIES</Text>
        <Text style={styles.numbered_list}>
          By entering into this Agreement, Members represent and warrant to the
          DAO LLC that they acknowledge and agree to the following:
          <Br />
          <Br />
          (i)
          <Tab />
          {name} LLC has no present intention of registering the Member Tokens
          and is under no obligation to register the Member Tokens. There is no
          assurance that any exemption from registration under the Securities
          Act will be available, and that, even if available, such exemption may
          not allow Members to transfer all or any portion of the Member Tokens
          under the circumstances, in the amounts, or at the times that they
          might propose;
          <Br />
          <Br />
          (ii)
          <Tab />
          This Agreement has been reviewed and authorized by the existing
          Members; and
          <Br />
          <Br />
          (iii)
          <Tab />
          This Agreement constitutes legal, valid, and binding obligations,
          enforceable in accordance with their terms among the Members, except
          as enforceability may be limited by applicable bankruptcy, insolvency,
          reorganization, moratorium, or similar laws affecting creditor’s
          rights generally and by general equitable principles.
          <Br />
        </Text>
        <Text style={styles.heading1}>SECTION 9</Text>
        <Text style={styles.heading2}>TRANSFER OF MEMBERSHIP INTERESTS</Text>
        <Text style={styles.numbered_list}>
          9.1
          <Tab />
          <Text style={{ textDecoration: "underline" }}>
            Sale or Encumbrance Prohibited.
          </Text>
          <Tab />
          Except as otherwise permitted in this Agreement, no Member may
          voluntarily or involuntarily transfer, sell, convey, encumber, pledge,
          assign, or otherwise dispose of (collectively, "***Transfer***") an
          interest in the DAO LLC, including, but not limited to, assigning
          control over Member Tokens, without the prior authorization of the
          Members under Member Token Votes or formal assignment mechanisms
          otherwise authorized for the DAO LLC or Series formed hereafter.
          <Br />
          <Br />
          9.2
          <Tab />
          <Text style={{ textDecoration: "underline" }}>
            Death, Incompetency, or Bankruptcy of Member.
          </Text>
          <Tab />
          On the death, adjudicated incompetence, or bankruptcy of a Member,
          unless the DAO LLC exercises its rights under *Section 9.3*, the
          successor-in-interest to the Member (whether an estate, bankruptcy
          trustee, or otherwise) will receive only the economic right to receive
          distributions whenever made by the DAO LLC and the Member's allocable
          share of taxable income, gain, loss, deduction, and credit (the
          "***Economic Rights***") unless and until the transferee is admitted
          as a fully substituted Member by Member Token Votes.
          <Br />
          <Br />
          9.2.1
          <Tab />
          Any Transfer of Economic Rights pursuant to *Section 9.2* will not
          include any right to participate in the management of the DAO LLC,
          including any right to vote, consent to, and will not include any
          right to information on the DAO LLC or its operations or financial
          condition. Following any Transfer of only the Economic Rights of a
          Member's interest in the DAO LLC, the transferring Member's power and
          right to vote or consent to any matter submitted to the Members will
          be eliminated, and the interests of the remaining Members, for
          purposes only of such votes, consents, and participation in
          management, will be proportionately increased until such time, if any,
          as the transferee of the Economic Rights becomes a fully substituted
          Member.
          <Br />
          <Br />
          9.3
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Death Redemption.</Text>
          <Tab />
          Notwithstanding the foregoing provisions of *Section 9*, the Members
          covenant and agree that on the death of any Member, the DAO LLC, at
          its option, by providing written notice to the estate of the deceased
          Member within one-hundred eighty (180) days of the death of the
          Member, may purchase, acquire, and redeem the interest of the deceased
          Member in the DAO LLC pursuant to the provisions of *Section 9.2*.
          <Br />
          <Br />
          9.3.1
          <Tab />
          The value of each Member's interest in the DAO LLC as represented by
          Member Tokens will be determined and signified through Member Token
          Votes.
          <Br />
          <Br />
          9.3.2
          <Tab />
          On completion of the redemption of the deceased Member's interest in
          the DAO LLC, the interests of the remaining Members will increase
          proportionately to their existing interests recorded by Member Token
          Votes.
          <Br />
          <Br />
          9.4
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Withdrawal.</Text>
          <Tab />
          For the avoidance of doubt, a Member may at all times redeem their
          interests in the DAO LLC through mechanisms approved through Member
          Token Votes, and may be similarly subject to removal from the DAO LLC
          for violation of this Agreement or associated Member obligations and
          face liquidation of their interests in the DAO LLC through formal exit
          mechanisms approved through Member Token Votes.
          <Br />
        </Text>
        <Text style={styles.heading1}>SECTION 10</Text>
        <Text style={styles.heading2}>
          DISSOLUTION AND WINDING UP OF THE DAO LLC
        </Text>
        <Text style={styles.numbered_list}>
          10.1
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Dissolution.</Text>
          <Tab />
          The DAO LLC will be dissolved on the happening of any of the following
          events:
          <Br />
          <Br />
          10.1.1
          <Tab />
          Sale, transfer, or other disposition of all or substantially all of
          the property of the DAO LLC;
          <Br />
          <Br />
          10.1.2
          <Tab />
          The agreement of all of the Members;
          <Br />
          <Br />
          10.1.3
          <Tab />
          By operation of law; or
          <Br />
          <Br />
          10.1.4
          <Tab />
          TThe death, incompetence, expulsion, or bankruptcy of a Member, or the
          occurrence of any event that terminates the continued membership of a
          Member in the DAO LLC, unless there are then remaining at least the
          minimum number of Members required by law and all of the remaining
          Members, within one-hundred twenty (120) days after the date of the
          event, elect to continue the business of the DAO LLC.
          <Br />
          <Br />
          10.2
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Winding Up.</Text>
          <Tab />
          On the dissolution of the DAO LLC (if the DAO LLC is not continued),
          the Members must take full account of the DAO LLC's assets and
          liabilities, and the assets will be liquidated as promptly as is
          consistent with obtaining their fair value, and the proceeds, to the
          extent sufficient to pay the DAO LLC's obligations with respect to the
          liquidation, will be applied and distributed, after any gain or loss
          realized in connection with the liquidation has been allocated in
          accordance with *Section 3* of this Agreement, and the Members’
          Capital Accounts have been adjusted to reflect the allocation and all
          other transactions through the date of the distribution, in the
          following order:
          <Br />
          <Br />
          10.2.1
          <Tab />
          To payment and discharge of the expenses of liquidation and of all the
          DAO LLCs debts and liabilities to persons or organizations other than
          Members;
          <Br />
          <Br />
          10.2.2
          <Tab />
          To the payment and discharge of any DAO LLC debts and liabilities owed
          to Members; and
          <Br />
          <Br />
          10.2.3
          <Tab />
          To Members in the amount of their respective adjusted Capital Account
          balances on the date of distribution and as authorized by the
          designated Tax Representative as provided in *Section 7.5*.
          <Br />
        </Text>
        <Text style={styles.heading1}>SECTION 11</Text>
        <Text style={styles.heading2}>GENERAL PROVISIONS</Text>
        <Text style={styles.numbered_list}>
          11.1
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Amendments.</Text>
          <Tab />
          Amendments to this Agreement may be proposed by any Member. A proposed
          amendment will be adopted and become effective as an amendment upon
          the consent of the Members as signified through Member Token Votes.
          <Br />
          <Br />
          11.2
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Governing Law.</Text>
          <Tab />
          This Agreement and the rights and obligations of the parties under it
          are governed by and interpreted in accordance with the laws of the
          State of Wyoming (without regard to principles of conflicts of law).
          <Br />
          <Br />
          11.3
          <Tab />
          <Text style={{ textDecoration: "underline" }}>
            Entire Agreement; Modification.
          </Text>
          <Tab />
          This Agreement constitutes the entire understanding and agreement
          between the Members with respect to the subject matter of this
          Agreement. No agreements, understandings, restrictions,
          representations, or warranties exist between or among the Members
          other than those in this Agreement or referred to or provided for in
          this Agreement. No modification or amendment of any provision of this
          Agreement will be binding on any Member unless in writing and signed
          in accordance with *Section 11.1*.
          <Br />
          <Br />
          11.4
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Attorney Fees.</Text>
          <Tab />
          In the event of any suit or action to enforce or interpret any
          provision of this Agreement (or that is based on this Agreement), the
          prevailing party is entitled to recover, in addition to other costs,
          reasonable attorney fees in connection with the suit, action, or
          arbitration, and in any appeals. The determination of who is the
          prevailing party and the amount of reasonable attorney fees to be paid
          to the prevailing party will be decided by the court(s), including any
          appellate courts, in which the matter is tried, heard, or decided.
          <Br />
          <Br />
          11.5
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Further Effect.</Text>
          <Tab />
          The parties agree to execute other documents reasonably necessary to
          further effect and evidence the terms of this Agreement, as long as
          the terms and provisions of the other documents are fully consistent
          with the terms of this Agreement.
          <Br />
          <Br />
          11.6
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Severability.</Text>
          <Tab />
          If any term or provision of this Agreement is held to be void or
          unenforceable, that term or provision will be severed from this
          Agreement, the balance of the Agreement will survive, and the balance
          of this Agreement will be reasonably construed to carry out the intent
          of the parties as evidenced by the terms of this Agreement.
          <Br />
          <Br />
          11.7
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Captions.</Text>
          <Tab />
          The captions used in this Agreement are for the convenience of the
          parties only and will not be interpreted to enlarge, contract, or
          alter the terms and provisions of this Agreement.
          <Br />
          <Br />
          11.8
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Notices.</Text>
          <Tab />
          All notices required to be given by this Agreement will be in writing
          and will be effective when actually delivered or, if mailed, when
          deposited as certified mail, postage prepaid, and directed to the
          addresses documented in *Schedule 1* for each Member or to such other
          addresses as a Member may specify by notice given in conformance with
          these provisions to the other Members.
          <Br />
          <Br />
          11.9
          <Tab />
          <Text style={{ textDecoration: "underline" }}>Arbitration.</Text>
          <Tab />
          In the event of any dispute among Members regarding this Agreement,
          the dispute and any issue as to the arbitrability of such dispute
          shall be settled (to the exclusion of a court of law) by arbitration
          in New York City, New York, in accordance with the Commercial
          Arbitration Rules of the American Arbitration Association then in
          effect. The decision of the arbitrator(s) shall be final and binding
          upon the parties. All costs of the arbitration and the fees of the
          arbitrators shall be allocated between the parties as determined
          therein, it being the intention of the parties that the prevailing
          party in such a proceeding be made whole with respect to its expenses.
          <Br />
          <Br />
        </Text>
        <Text style={styles.text}>
          IN WITNESS WHEREOF, the parties to this Agreement execute this
          Operating Agreement as of the date and year first above written.
        </Text>
        <Text style={styles.text}>{email}</Text>
        <Text style={styles.text}>{ethAddress}</Text>
        <Text style={styles.text}>Founding Member</Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
      <Page style={styles.body}>
        <Text style={styles.heading1}>Membership - Schedule 1</Text>
        <Text style={styles.text}>DAO LLC. OPERATING AGREEMENT</Text>
        <Text style={styles.text}>FOR {name} LLC</Text>
        <Text style={styles.text}>
          LISTING OF MEMBERS & CAPITAL CONTRIBUTIONS
        </Text>
        <Text style={styles.text}>
          The DAO LLC providing a digital signature in connection with the
          Agreement hash below, or otherwise deployed and stamped by this
          Agreement and related hash info, provides a running account of DAO LLC
          capital contributions, Member Token Votes, and Ethereum addresses
          identified among the Members:
          <Br />
          <Br />
          {id}
        </Text>
      </Page>
      <Page style={styles.body}>
        <Text style={styles.heading1}>Series - Schedule 2</Text>
        <Text style={styles.text}>DAO LLC. OPERATING AGREEMENT</Text>
        <Text style={styles.text}>FOR {name} LLC</Text>
        <Text style={styles.text}>Listing of LLC Series</Text>
        <Text style={styles.numbered_list}>
          The following Series have been established under the DAO LLC pursuant
          to the Act:
          <Br />
          <Br />
          [RESERVED]
          <Br />
          <Br />
          Those Series duly authorized under Member Token Votes and the DAO LLC
          governance interface(s) established under this Agreement.
        </Text>
      </Page>
    </Document>
  )
}

export default WyomingOAtemplate
