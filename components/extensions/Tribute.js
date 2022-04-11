import { useState, useContext, useEffect } from "react";
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

export default function Tribute() {
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
  const nftAbi = require("../../abi/KaliNFT.json");

  const tribAddress = dao["extensions"]["tribute"]["address"];
  const [selection, setSelection] = useState("");
  const [approveButton, setApproveButton] = useState(false);
  const [submitButtonActive, setSubmitButtonActive] = useState(true);
  const [proposalDetail, setProposalDetail] = useState({});
  const [ownershipError, setOwnershipError] = useState("");

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

  const submitTribProposalWithEth = async (proposalDetail) => {
    value.setLoading(true);
    const instance = new web3.eth.Contract(tribAbi, tribAddress);
    console.log(proposalDetail);
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
        .send({ from: account, value: proposalDetail.assetValue });
      console.log("This is result - ", result);
      value.setVisibleView(1);
    } catch (e) {
      value.toast(e);
      value.setLoading(false);
    }
    value.setLoading(false);
  };

  const submitTribProposal = async (proposalDetail) => {
    value.setLoading(true);
    const instance = new web3.eth.Contract(tribAbi, tribAddress);
    // console.log(proposalDetail)
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
      value.setLoading(false);
    }
    value.setLoading(false);
  };

  const checkTokenAllowance = async (proposalDetail) => {
    const instance = new web3.eth.Contract(tokenAbi, proposalDetail.asset);

    try {
      let result = await instance.methods
        .allowance(account, tribAddress)
        .call();
      console.log("This is result for allowance - ", result);
      if (result == 0) {
        setApproveButton(true);
        setSubmitButtonActive(false);
      } else {
        submitTribProposal(proposalDetail);
      }
    } catch (e) {
      value.toast(e);
    }
  };

  const checkNftAllowance = async (proposalDetail) => {
    const instance = new web3.eth.Contract(nftAbi, proposalDetail.asset);
    console.log(proposalDetail.assetValue);
    try {
      setOwnershipError("");
      let owner = await instance.methods
        .ownerOf(proposalDetail.assetValue)
        .call();
      if (owner.toLowerCase() === account.toLowerCase()) {
        let result = await instance.methods
          .getApproved(proposalDetail.assetValue)
          .call();
        console.log("This is result for approval - ", result);
        if (result == 0) {
          setApproveButton(true);
          setSubmitButtonActive(false);
        } else {
          submitTribProposal(proposalDetail);
        }
      } else {
        setOwnershipError(
          "Please check the token ID again. It doesn't seem like you own this NFT."
        );
      }
    } catch (e) {
      value.toast(e);
    }
  };

  const approve = async () => {
    value.setLoading(true);

    switch (selection) {
      case "erc20":
        const erc20 = new web3.eth.Contract(tokenAbi, proposalDetail.asset);
        const approvedAmount = web3.utils.toWei("100000");
        try {
          let result = await erc20.methods
            .approve(tribAddress, approvedAmount)
            .send({ from: account });
          console.log("This is result for approve - ", result);
          setSubmitButtonActive(true);
          setApproveButton(false);
        } catch (e) {
          value.toast(e);
          value.setLoading(false);
        }
        break;
      case "erc721":
        const erc721 = new web3.eth.Contract(nftAbi, proposalDetail.asset);
        try {
          let result = await erc721.methods
            .approve(tribAddress, proposalDetail.assetValue)
            .send({ from: account });
          console.log("This is result for approve - ", result);
          setSubmitButtonActive(true);
          setApproveButton(false);
        } catch (e) {
          value.toast(e);
          value.setLoading(false);
        }
        break;
    }

    value.setLoading(false);
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
        ethAmount,
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

      const proposalDetail_ = {
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
        case "eth":
          proposalDetail_.asset = "0x0000000000000000000000000000000000000000";
          proposalDetail_.assetValue = web3.utils.toWei(ethAmount);
          submitTribProposalWithEth(proposalDetail_);
          break;
        case "erc20":
          proposalDetail_.asset = erc20Contract;
          proposalDetail_.assetValue = web3.utils.toWei(erc20Amount);
          setProposalDetail(proposalDetail_);
          checkTokenAllowance(proposalDetail_);
          break;
        case "erc721":
          proposalDetail_.asset = erc721Contract;
          proposalDetail_.assetValue = erc721Id;
          setProposalDetail(proposalDetail_);
          checkNftAllowance(proposalDetail_);
          break;
        // case "erc1155":
        //   proposalDetail.asset = erc1155Contract;
        //   proposalDetail.assetValue = erc1155Id;
        //   setProposalDetail(proposalDetail)
        //   checkNftAllowance(proposalDetail);
        //   break;
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
            . You may tribute ETH, ERC20 tokens or NFTs.
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
            <b>with a tribute in the form of...</b>
          </Text>
          <Select
            w="90%"
            onChange={(e) => {
              setSelection(e.target.value);
            }}
            placeholder="Please select"
          >
            <option value="eth">ETH</option>
            <option value="erc20">ERC20</option>
            <option value="erc721">ERC721</option>
            {/* <option value="erc1155">ERC1155</option> */}
          </Select>
        </VStack>
        {selection === "eth" && (
          <HStack w="100%">
            <VStack pt="10px" align="flex-start">
              <Text>Amount</Text>
              <NumInputField name="ethAmount" min="0.0000001" />
            </VStack>
          </HStack>
        )}
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
            <Text>
              <b>Notes</b>
            </Text>
            <Textarea
              name="description"
              size="lg"
              placeholder="You may add notes or document here to your proposal..."
            />
          </VStack>

          {submitButtonActive && <Button type="submit">Submit Proposal</Button>}
          {approveButton && (
            <Button onClick={approve}>
              Allow the tribute contract to use your tribute
            </Button>
          )}
          {ownershipError && <Text>{ownershipError}</Text>}
        </VStack>
      </Stack>
    </form>
  );
}
