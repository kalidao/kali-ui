import { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import ProposalDetails from "./ProposalDetails";
import {
  chakra,
  Input,
  Text,
  Textarea,
  Divider,
  Box,
  Heading,
} from "@chakra-ui/react";
import { viewProposalsHelper } from "../../constants/viewProposalsHelper";
import {
  decodeBytes,
  formatAmounts,
  formatContract,
} from "../../utils/formatters";

const ProposalLabel = (props) => {
  return (
    <Text casing="uppercase">
      <b>{props.children}</b>
    </Text>
  );
};

const ProposalInput = (props) => {
  return <Input value={props.value} disabled />;
};

const ProposalDivider = (props) => {
  return <Divider mb={5} />;
};

export default function ProposalModal(props) {
  const value = useContext(AppContext);
  const { web3, loading, chainId } = value.state;
  const p = props["p"];
  const type = p["proposalType"];
  const details = viewProposalsHelper[type]["details"];
  var decoded = null;
  if (type == 2 || type == 9) {
    decoded = decodeBytes(type, p, web3, chainId);
    //decoded = p["payload"];
  }
  const amountsFormatted = formatAmounts(type, p);

  return (
    <>
      <Text casing="uppercase">Submitted by {p["proposer"]}</Text>
      <ProposalDivider />

      <ProposalLabel>description</ProposalLabel>
      <Text>{p["description"]}</Text>
      <ProposalDivider />

      {p["amounts"].map((item, index) => (
        <>
          <Box key={`item-${index}`} background="#eeeeee" p={5} mb={5}>
            <Text>Transaction {index + 1}</Text>
            {details["amounts"] == null ? null : p["amounts"][index] ==
              0 ? null : (
              <div key={`amounts-${index}`}>
                <ProposalLabel>{details["amounts"]}</ProposalLabel>
                <Text>{amountsFormatted[index]}</Text>
                <ProposalDivider />
              </div>
            )}

            {details["accounts"] == null ? null : (
              <div key={`accounts-${index}`}>
                <ProposalLabel>
                  {p["payloads"][index] == "0x"
                    ? "Recipient"
                    : details["accounts"]}
                </ProposalLabel>
                <Text>
                  {p["payloads"][index] == "0x" ? (
                    p["accounts"][index]
                  ) : (
                    <>
                      {formatContract(type, p, chainId)} ({p["accounts"][index]}
                      )
                    </>
                  )}
                </Text>
                <ProposalDivider />
              </div>
            )}
            {decoded != null && decoded[index] != null ? (
              <div key={`decoded-${index}`}>
                <ProposalLabel>Details:</ProposalLabel>
                <ul>
                  {decoded[index].map((item, index) => (
                    <li key={`decoded-${index}`}>{item}</li>
                  ))}
                </ul>
                <ProposalDivider />
              </div>
            ) : null}
            {details["payloads"] == null ? null : p["payloads"][index] !=
              "0x" ? ( // don't display dummy data
              <div key={`payloads-${index}`}>
                <ProposalLabel>payload</ProposalLabel>
                <Text>{p["payloads"][index]}</Text>
                <ProposalDivider />
              </div>
            ) : null}
          </Box>
        </>
      ))}
    </>
  );
}
