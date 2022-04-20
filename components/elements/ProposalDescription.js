import React, { useState, useEffect } from 'react';
import {
  VStack,
  HStack,
  Text,
  Box,
  Textarea,
  Select
} from "@chakra-ui/react";
import InfoTip from './InfoTip';

function ProposalDescription({ doc, setDoc, note, setNote, setFile }) {
  const [doc_, setDoc_] = useState([])

  useEffect(() => {
    setDoc_(doc);
  }, []);

  return (
    <VStack align="flex-start" w="100%">
      <HStack>
        <Text>
          <b>Notes:</b>
        </Text>
        <InfoTip
          label={
            "You may accompany this proposal with notes or a doc. Notes will be recorded directly onchain, while doc will be uploaded to IPFS. If both are supplied, note is ignored."
          }
        ></InfoTip>
      </HStack>
      <VStack align="flex-start" w="100%" pt="5px">
        {doc_.length > 0 ? (
          <>
            <Select
              onChange={(e) => {
                setDoc(e.target.value);
              }}
              placeholder="Please select">
              {doc_.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </Select>
            <Box h="5px" />
            <Text>-- OR --</Text>
            <Box h="5px" />
          </>
        ) : null}
        <Textarea
          placeholder=". . ."
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
          }}
        />
        <Box h="5px" />
        <Text>-- OR --</Text>
        <Box h="5px" />
        <input
          id="file"
          name="file"
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
      </VStack>
    </VStack>
  );
}

export default ProposalDescription;