import { useState, useContext, useEffect } from "react";
import Router, { useRouter } from "next/router";
import AppContext from "../../context/AppContext";
import {
  Input,
  Button,
  Select,
  Text,
  Textarea,
  Stack,
  VStack,
  HStack,
  Spacer,
  Checkbox,
} from "@chakra-ui/react";
import NumInputField from "../elements/NumInputField";
import InfoTip from "../elements/InfoTip";

export default function BuyCrowdsale() {
  const value = useContext(AppContext);
  const {
    web3,
    loading,
    account,
    isMember,
    chainId,
    extensions,
    address,
    abi,
    dao,
  } = value.state;
  const tribAbi = require("../../abi/KaliDAOtribute.json");
  const tokenAbi = require("../../abi/ERC20.json");
  const tribAddress = dao["extensions"]["tribute"]["address"];
  const [selection, setSelection] = useState("");
  const [approveButton, setApproveButton] = useState(false);
  const [submitButtonActive, setSubmitButtonActive] = useState(true);
  const [tokenContract, setTokenContract] = useState("");

  // Toggle token forms
  // const [erc20Form, setErc20Form] = useState(false);
  // const [erc721Form, setErc721Form] = useState(false);
  // const [erc1155Form, setErc1155Form] = useState(false);
  // const [comboForm, setComboForm] = useState(false);

  const resolveAddressAndEns = async (ens) => {
    let address;

    if (ens.slice(-4) === ".eth") {
      address = await web3.eth.ens.getAddress(ens).catch(() => {
        value.toast(ens + " is not a valid ENS.");
      });
    } else if (web3.utils.isAddress(ens) == false) {
      value.toast(ens + " is not a valid Ethereum address.");
      return;
    } else {
      address = ens;
    }

    if (ens === undefined) {
      return;
    }

    return address;
  };

  const submitTributeProposal = async (proposalDetail) => {
    value.setLoading(true)
    const instance = new web3.eth.Contract(tribAbi, tribAddress);

    try {
      let result = await instance.methods
        .submitTributeProposal(
          proposalDetail.dao,
          proposalDetail.proposalType,
          proposalDetail.description,
          proposalDetail.accounts,
          proposalDetail.amounts,
          proposalDetail.payloads,
          proposalDetail.nft,
          proposalDetail.asset,
          proposalDetail.assetValue
        )
        .send({ from: account });
      console.log("This is result - ", result);
      value.setVisibleView(1);
    } catch (e) {
      value.toast(e);
    }
  };

  const checkTokenAllowance = async (proposalDetail) => {
    const tribAddress = dao["extensions"]["tribute"]["address"];
    const instance = new web3.eth.Contract(tokenAbi, proposalDetail.asset);

    try {
      let result = await instance.methods
        .allowance(account, tribAddress)
        .call();
      console.log("This is result for allowance - ", result);
      if (result == 0) {
        setApproveButton(true);
        setTokenContract(proposalDetail.asset)
        setSubmitButtonActive(false);
      } else {
        submitTributeProposal(proposalDetail);
      }
    } catch (e) {
      value.toast(e);
    }
  };

  const approveToken = async () => {
    value.setLoading(true)
    const instance = new web3.eth.Contract(tokenAbi, tokenContract);
    const approvedAmount = web3.utils.toWei("100000");
    try {
      let result = await instance.methods
        .approve(tribAddress, approvedAmount)
        .send({ from: account });
      console.log("This is result for approve - ", result);
      setSubmitButtonActive(true);
      setApproveButton(false);
    } catch (e) {
      value.toast(e);
      value.setLoading(false)
    }
    value.setLoading(false)
  };

  const submitProposal = async (event) => {
    event.preventDefault();
    value.setLoading(true);

    try {
      let object = event.target;
      var array = [];
      for (let i = 0; i < object.length; i++) {
        array[object[i].name] = object[i].value;
      }

      var {
        proposer,
        description,
        askAmount,
        erc20Contract,
        erc20Amount,
        erc721Contract,
        erc721Id,
        erc1155Contract,
        erc1155Id,
      } = array; // this must contain any inputs from custom forms

      proposer = await resolveAddressAndEns(proposer);
      askAmount = web3.utils.toWei(askAmount);

      // Get asset contract and value
      let nft, asset, assetValue;
      selection === "erc721" || selection === "erc1155"
        ? (nft = "true")
        : (nft = "false");

      const proposalDetail = {
        dao: dao.address,
        proposalType: 0,
        description: description,
        accounts: [proposer],
        amounts: [askAmount],
        payloads: [Array(0)],
        nft: nft,
        asset: asset,
        assetValue: assetValue,
      };

      switch (selection) {
        case "erc20":
          proposalDetail.asset = erc20Contract;
          proposalDetail.assetValue = erc20Amount;
          checkTokenAllowance(proposalDetail);
          break;
        case "erc721":
          asset = erc721Contract;
          assetValue = erc721Id;
          break;
        case "erc1155":
          asset = erc1155Contract;
          assetValue = erc1155Id;
          break;
      }
    } catch (e) {
      value.toast(e);
      value.setLoading(false);
    }

    value.setLoading(false);
  };

  return (
    <form onSubmit={submitProposal}>
      <Stack>
        <VStack align="flex-start">
          <Text>
            Make a tribute to join{" "}
            <i>
              {dao.name.substring(0, 1).toUpperCase() + dao.name.substring(1)}
            </i>
            . You may tribute any ERC20 tokens, NFTs (e.g., ERC721 or ERC1155),
            or a combination.
          </Text>
          <br />
          <HStack w="100%">
            <VStack align="flex-start" w="80%">
              <Text>
                <b>Prospective Member...</b>
              </Text>
              <Input
                name="proposer"
                size="lg"
                placeholder="0xKALI or .eth"
              ></Input>
            </VStack>
            <Spacer />
            <VStack align="flex-start">
              <Text>
                <b>is asking for...</b>
              </Text>
              <HStack>
                <NumInputField name="askAmount" />
                <Text>DAO tokens</Text>
              </HStack>
            </VStack>
          </HStack>
          <br />
          <Text>
            <b>in exchange for...</b>
          </Text>
          <Select
            onChange={(e) => {
              setSelection(e.target.value);
            }}
            placeholder="Please select"
          >
            <option value="erc20">ERC20</option>
            <option value="erc721">ERC721</option>
            <option value="erc1155">ERC1155</option>
          </Select>
          {/* <HStack w="100%">
            <Checkbox
              w="33%"
              name="erc20Form"
              value="erc20Form"
              isChecked={erc20Form}
              defaultValue={erc20Form}
              onChange={() => setErc20Form(!erc20Form)}
            >
              <Text>ERC20</Text>
            </Checkbox>
            <Checkbox
              w="33%"
              name="erc721Form"
              value="erc721Form"
              isChecked={erc721Form}
              defaultValue={erc721Form}
              onChange={() => setErc721Form(!erc721Form)}
            >
              <Text>ERC721</Text>
            </Checkbox>
            <Checkbox
              w="33%"
              name="erc1155Form"
              value="erc1155Form"
              isChecked={erc1155Form}
              defaultValue={erc1155Form}
              onChange={() => setErc1155Form(!erc1155Form)}
            >
              <Text>ERC1155</Text>
            </Checkbox>
          </HStack> */}
        </VStack>
        {selection === "erc20" && (
          <HStack w="100%">
            <VStack w="90%" pt="10px" align="flex-start">
              <Text>ERC20 Contract Address</Text>
              <Input name="erc20Contract" placeholder="0xKALI"></Input>
            </VStack>
            <VStack pt="10px" align="flex-start">
              <Text>Amount</Text>
              <NumInputField name="erc20Amount" />
            </VStack>
          </HStack>
        )}
        {selection === "erc721" && (
          <HStack w="100%">
            <VStack w="90%" pt="10px" align="flex-start">
              <Text>ERC721 Contract Address</Text>
              <Input name="erc721Contract" placeholder="0xKALI"></Input>
            </VStack>
            <VStack pt="10px" align="flex-start">
              <Text>Token ID</Text>
              <NumInputField name="erc721Id" />
            </VStack>
          </HStack>
        )}
        {selection === "erc1155" && (
          <HStack w="100%">
            <VStack w="90%" pt="10px" align="flex-start">
              <Text>ERC1155 Contract Address</Text>
              <Input name="erc1155Contract" placeholder="0xKALI"></Input>
            </VStack>
            <VStack pt="10px" align="flex-start">
              <Text>Token ID</Text>
              <NumInputField name="erc1155Id" />
            </VStack>
          </HStack>
        )}
        <br />
        <VStack align="flex-start">
          <VStack w="90%" pt="10px" align="flex-start">
            <HStack>
              <Text>
                <b>Notes</b>
              </Text>
              <InfoTip label="You may add notes or document here to your proposal." />
            </HStack>
          </VStack>

          <Textarea
            name="description"
            size="lg"
            placeholder="dropdown to pick template or custom, upload to ipfs, then store ipfs hash here"
          />

          {/* <Text>
          <b>Tribute (ETH)</b>
          <br />
          extra bag of ERC20 or ERC721
          </Text>
        <NumInputField name="assetAmount_" min=".000000000000000001" /> */}

          {submitButtonActive && <Button type="submit">Submit Proposal</Button>}
          {approveButton && (
            <Button onClick={approveToken}>Allow the tribute contract to use your tribute</Button>
          )}
        </VStack>
      </Stack>
    </form>
  );
}
