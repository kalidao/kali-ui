import React, { useState } from "react";
import {
  useAccount,
  useNetwork,
  useContract,
  useSigner,
  erc721ABI,
} from "wagmi";
import { Flex, Text, Button, Box } from "../../../styles/elements";
import { Form, FormElement, Label, Input } from "../../../styles/form-elements";
import { ethers } from "ethers";
import { Select } from "../../../styles/form-elements/Select";
import FileUploader from "../../tools/FileUpload";
import KALIDAO_ABI from "../../../abi/KaliDAO.json";
import { useRouter } from "next/router";
import { getDaoChain } from "../../../utils";
import { getTokenName } from "../../../utils/fetchTokenInfo";
import { uploadIpfs } from "../../tools/ipfsHelpers";
import { tokens } from "../../../constants/tokens";
import { TiWarning } from "react-icons/ti";

export default function SendErc721() {
  const router = useRouter();
  const daoAddress = router.query.dao;
  const daoChainId = getDaoChain(daoAddress);
  const daoName = getTokenName(daoChainId, daoAddress);
  const { data: account } = useAccount();
  const { data: signer } = useSigner();
  const { activeChain } = useNetwork();

  const kalidao = useContract({
    addressOrName: daoAddress,
    contractInterface: KALIDAO_ABI,
    signerOrProvider: signer,
  });

  // form
  const [tokenAddress, setTokenAddress] = useState(null);
  const [tokenId, setTokenId] = useState(null);
  const [recipient, setRecipient] = useState(null);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  // TODO: Popup to change network if on different network from DAO
  const submit = async (e) => {
    e.preventDefault();

    let iface = new ethers.utils.Interface(erc721ABI);
    let payload = iface.encodeFunctionData("transferFrom", [
      daoAddress,
      recipient,
      tokenId,
    ]);

    let docs;
    if (file) {
      docs = await uploadIpfs(daoAddress, "Send ERC721 Proposal", file);
    } else {
      docs = description;
    }

    console.log("Proposal Params - ", 2, docs, [tokenAddress], [0], [payload]);

    try {
      const tx = await kalidao.propose(
        2, // CALL prop
        docs,
        [tokenAddress],
        [0],
        [payload]
      );
      console.log("tx", tx);
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <Flex dir="col" gap="md">
      <Text>Send an ERC721 from DAO's treasury</Text>
      <Form>
        <FormElement>
          <Label htmlFor="contractAddress">ERC721 Contract Address</Label>
          <Input
            name="contractAddress"
            type="text"
            defaultValue={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
          />
        </FormElement>
        <FormElement>
          <Label htmlFor="tokenId">Token ID</Label>
          <Input
            name="tokenId"
            type="number"
            defaultValue={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
          />
        </FormElement>
        <Box
          variant="tip"
          css={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "0.6rem",
          }}
        >
          <TiWarning color="yellow" />
          DAO does not own this ERC721. You may not be able to process this proposal.
        </Box>
        <FormElement>
          <Label htmlFor="recipient">Recipient</Label>
          <Input
            name="recipient"
            type="number"
            defaultValue={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </FormElement>
        <FormElement variant="vertical">
          <Label htmlFor="description">Proposal Note</Label>
          <Input
            as="textarea"
            name="description"
            type="text"
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
            css={{ padding: "0.5rem", width: "97%", height: "10vh" }}
          />
        </FormElement>
        <Flex gap="sm" align="end" effect="glow">
          <FileUploader setFile={setFile} />
        </Flex>
        <Button onClick={submit}>Submit</Button>
      </Form>
    </Flex>
  );
}
