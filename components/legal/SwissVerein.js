import React from "react";
import { Page, Text, Document, StyleSheet, Font } from "@react-pdf/renderer";

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
});

const Br = () => "\n";
const Tab = () => "  ";

const SwissVerein = ({ name, city, project, purpose }) => {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.heading1}>
          Article of Association
          <Br />
          <Br />
        </Text>
        <Text style={styles.heading3}>
          Article I - Name and Registered Office
        </Text>
        <Text style={styles.numbered_list}>
          Under the name of {name} an association (Verein) according to Art. 60.
          et seq of the Swiss Civil Code (Schweizerisches Zivilgesetzbuch) the
          following provisions of the articles of association are established.
          <Br />
          <Br />
          The Association has its seat in {city}, Switzerland.
          <Br />
          <Br />
        </Text>
        <Text style={styles.heading3}>Article II - Purpose</Text>
        <Text style={styles.numbered_list}>
          The purpose of the Association is to develop the {project} project
          which aims to {purpose} The Association may purchase, encumber, sell
          and manage real estate in Switzerland and abroad. The Association is
          not subject to the authorization requirement of the acquisition of
          real estate pursuant to the Federal Law on the Acquisition of Real
          Estate by Persons Abroad of December 1983.
          <Br />
          <Br />
        </Text>
        <Text style={styles.heading3}>Article III - Membership</Text>
        <Text style={styles.numbered_list}>
          Natural persons and/or legal entities shall be admitted as members of
          the Association. The membership is established by submitting a written
          declaration of accession to the Committee’s attention, paying the
          member subscription and the Committee resolution. The Committee
          informs the General Meeting about the admission of the new members.
          The Committee’s resolution on the admission of a new member shall be
          made at its own discretion. The Committee may, among other things,
          make special demands on the admission of a new member. The Committee
          may refuse the membership without reason.
          <Br />
          <Br />
        </Text>
        <Text style={styles.heading3}>
          Article 4 - Resignation and Exclusion
        </Text>
        <Text style={styles.numbered_list}>
          Membership is terminated by: Resignation. A member may resign from the
          Association by submitting a written notice. The termination may take
          effect at any time; and Exclusion. The Committee may expel a member in
          case of a serious breach of the articles of association by written
          notice. The Committee decides on such exclusion with a majority of the
          votes cast in the Committee Meeting. The expelled member may appeal
          against the Committee's expulsion resolution within 30 days of its
          written notice to the General Meeting. The appeal must be submitted to
          the Committee. The General Meeting's resolution regarding the
          objection is passed by the majority of all votes represented
          <Br />
          <Br />
        </Text>
        <Text style={styles.heading3}>Article 5 - Organisation</Text>
        <Text style={styles.numbered_list}>
          The Association shall be composed of: The General Meeting The
          Committee The Auditors
          <Br />
          <Br />
        </Text>
        <Text style={styles.heading3}>Article 6 - General Meeting</Text>
        <Text style={styles.numbered_list}>
          The General Meeting of members is the supreme governing body of the
          Association, In particular, it has the following powers; to elect and
          dismiss the members of the Committee; to elect the President of the
          Committee; to elect the Auditors; to approve the annual accounts of
          the Association; to discharge the members of the Committee; to
          determine the subscriptions to be paid by the members; to determine
          and amend the articles of association to approve or disapprove appeals
          regarding the Committee’s exclusion resolutions to resolve the
          dissolution of the Association; to resolve on matters reserved for it
          by law or the articles of association or submitted by the Committee.
          <Br />
          <Br />
        </Text>
        <Text style={styles.heading3}>
          Article 7 - Convocation of the General Meeting
        </Text>
        <Text style={styles.numbered_list}>
          The General Meeting is convened by the President of the Committee.
          Moreover, it must be convened if one-fifth of the members of the
          Association so request. The ordinary General Meeting takes place every
          year within six months after the end of the financial year. Notice
          convening the General Meeting must be given no later than 30 days, in
          case of an extraordinary General Meeting at least 10 days, before the
          date for which it is scheduled. It must include the agenda items.
          <Br />
          <Br />
        </Text>
        <Text style={styles.heading3}>
          Article 8 - Voting Rights and Adoption of Resolutions
        </Text>
        <Text style={styles.numbered_list}>
          At the General Meeting, each member of the Association shall have one
          vote. Unless provided otherwise by mandatory provisions of law
          resolutions and elections are passed by the majority of all votes
          represented.
          <Br />
          <Br />
        </Text>
        <Text style={styles.heading3}>Article 9 - Committee</Text>
        <Text style={styles.numbered_list}>
          The Committee consists of one or more members. The Committee
          constitutes itself, with the exception of the president of the
          Committee who is elected by the General Meeting. In particular the
          Committee has the following powers: To prepare the General Meeting To
          execute the General Meeting resolutions To resolve the admission and
          the exclusion of the Association’s memes To deal with suggestions,
          petitions and complaints of the members of the Association To prepare
          the budget and the annual accounts To manage the association’s assets
          To carry out activities with regard to fulfil the purpose of the
          Association Moreover, the Committee is entitled to all further powers,
          which are not reserved expressly by law or the articles of association
          to another power of the Association.
          <Br />
          <Br />
        </Text>
        <Text style={styles.heading3}>
          Article 10 - Representation and Signatory Power
        </Text>
        <Text style={styles.numbered_list}>
          The Association is represented by the Committee in relation to third
          parties. The Committee determines who is authorized to sign and to
          what extent.
          <Br />
          <Br />
        </Text>
        <Text style={styles.heading3}>Article 11 - Auditors</Text>
        <Text style={styles.numbered_list}>
          The General Meeting elects one or two natural persons or a legal
          entity (e.g. fiduciary company, etc.) as Auditors for one year. The
          financial statements shall be prepared annually. The Auditors examine
          and verify the annual financial statements and present its findings to
          the General Meeting. The General Meeting may waive election of
          statutory auditors if the Association does not exceed two of the
          following thresholds in two successive financial years. A balance
          sheet total of 10 Million francs Sales revenue of 20 Million francs 50
          full-time positions on annual average This waiver also applies to the
          subsequent years. However, each member who is personally liable to
          make additional contributions has the right to request that a limited
          audit be implemented and the corresponding statutory auditors be
          elected.
          <Br />
          <Br />
        </Text>
        <Text style={styles.heading3}>Article 12 - Resources</Text>
        <Text style={styles.numbered_list}>
          The financial resources to pursue the purpose of the Association
          consists of: Member subscriptions which are determined by the General
          Meeting on proposal of the Committee; Resources from events and the
          Association’s assets; Voluntary contributions (sponsorship, donations,
          bequests); Loans.
          <Br />
          <Br />
        </Text>
        <Text style={styles.heading3}>Article 13 - Member Subscriptions</Text>
        <Text style={styles.numbered_list}>
          The General Meeting may determine the member subscriptions. Resigning
          or excluded members of the Association shall pay the subscriptions
          until the end of the year.
          <Br />
          <Br />
        </Text>
        <Text style={styles.heading3}>Article 14 - Liability</Text>
        <Text style={styles.numbered_list}>
          The Association is liable for its obligations with its assets. Any
          personal liability of its members is expressly excluded.
          <Br />
          <Br />
        </Text>
        <Text style={styles.heading3}>Article 15 - Commercial Register</Text>
        <Text style={styles.numbered_list}>
          The Association may file for registry in the Commercial Register even
          if not required by law.
          <Br />
          <Br />
        </Text>
        <Text style={styles.heading3}>
          Article 16 - Dissolution and liquidation
        </Text>
        <Text style={styles.numbered_list}>
          The General Meeting resolves to dissolve Association with an at least
          two thirds majority of all votes represented. In case the dissolution
          is resolved, the Committee shall execute the liquidation if the
          General Meeting does not appoint any liquidator. In case of
          dissolution of the Association debts, levies and other obligations
          must be paid. The remaining assets shall be allocated in accordance
          with the purpose of the Association by resolution of the General
          Meeting.
          <Br />
          <Br />
        </Text>
      </Page>
    </Document>
  );
};

export default SwissVerein;
