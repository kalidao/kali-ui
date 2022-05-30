import React, { useState, useEffect } from 'react';
import InfoTip from './InfoTip';
import FileUploader from '../tools/FileUpload';
import { Flex, Box, Text } from "../../styles/elements/";
import { Input } from "../../styles/elements/";

function ProposalDescription({ doc, setDoc, note, setNote, setFile }) {
  const [doc_, setDoc_] = useState([])

  useEffect(() => {
    setDoc_(doc);
  }, []);

  return (
    <Flex align="flex-start" w="100%" >
      <Flex pb={"5px"}>
        <Text>
          <b>Notes:</b>
        </Text>
        <InfoTip
          label={
            "You may accompany this proposal with notes or a doc. Notes will be recorded directly onchain, while doc will be uploaded to IPFS. If both are supplied, note is ignored."
          }
        ></InfoTip>
      </Flex>
      <Flex w="100%" spacing={"20px"} justify={"stretch"}>
        {doc_.length > 0 ? (
          <>
            <select
              onChange={(e) => {
                setDoc(e.target.value);
              }}
              placeholder="Please select">
              {doc_.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
            <Box h="5px" />
            <Text>-- OR --</Text>
            <Box h="5px" />
          </>
        ) : null}
        <Input
          w="50%"
          placeholder=". . ."
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
          }}
        />
        <Box w={"1%"}/>
        <Text>- OR -</Text>
        <Box w={"1%"}/>
          <FileUploader setFile={setFile} />
      </Flex>
    </Flex>
  );
}

export default ProposalDescription;