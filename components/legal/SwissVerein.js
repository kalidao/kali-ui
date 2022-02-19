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

const SwissVerein = ({name, city}) => {
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
      </Page>
    </Document>
  );
};

export default SwissVerein;
