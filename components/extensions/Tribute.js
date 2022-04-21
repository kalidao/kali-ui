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
  Box,
  Center,
} from "@chakra-ui/react";
import NumInputField from "../elements/NumInputField";
import ProposalDescription from "../elements/ProposalDescription";
import { toDecimals } from "../../utils/formatters";
import { uploadIpfs } from "../tools/ipfsHelpers";

export default function Tribute() {
  const value = useContext(AppContext);
  const {
    web3,
    account,
    dao,
  } = value.state;
  const tribAbi = require("../../abi/KaliDAOtribute.json");
  const tokenAbi = require("../../abi/ERC20.json");
  const nftAbi = require("../../abi/KaliNFT.json");

  const tribAddress = dao["extensions"]["tribute"]["address"];
  const [selection, setSelection] = useState("");
  const [approveButton, setApproveButton] = useState(false);
  const [canPurchase, setCanPurchase] = useState(false);
  const [proposalDetail, setProposalDetail] = useState({});
  const [isContract, setIsContract] = useState(false);
  const [tokenContract, setTokenContract] = useState(null);
  const [tokenSymbol, setTokenSymbol] = useState(null);
  const [tokenDecimals, setTokenDecimals] = useState(null);
  const [nftContract, setNftContract] = useState(null);
  const [nftId, setNftId] = useState(null);
  const [error, setError] = useState("");

  // For Notes section
  const [doc, setDoc] = useState([]);
  const [note, setNote] = useState(null);
  const [file, setFile] = useState(null);

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
    console.log(proposalDetail)
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

  const getTokenInfo = async () => {
    if (tokenContract && web3.utils.isAddress(tokenContract)) {
      try {
        const instance_ = new web3.eth.Contract(tokenAbi, tokenContract);
        let symbol_ = await instance_.methods
          .symbol()
          .call();
        setTokenSymbol(symbol_.toUpperCase())
      } catch (e) {
        // value.toast(e);
        console.log("Can't find purchase token symbol")
      }

      try {
        const instance_ = new web3.eth.Contract(tokenAbi, tokenContract);
        let decimals_ = await instance_.methods
          .decimals()
          .call();
        setTokenDecimals(decimals_)
      } catch (e) {
        // value.toast(e);
        console.log("Can't find purchase token decimal")
      }
    } else {
      console.log("NFT contract not found / Not valid contract")
    }
  }

  const checkTokenAllowance = async (e) => {
    const address = e.target.value;
    const instance = new web3.eth.Contract(tokenAbi, address);

    if (web3.utils.isAddress(address)) {
      setIsContract(true);
      setTokenContract(address)
      try {
        let result = await instance.methods
          .allowance(account, tribAddress)
          .call();
        console.log("This is result for allowance - ", result);
        if (result == 0) {
          setApproveButton(true);
          setCanPurchase(false);
          console.log("Token contract not yet approved")
        } else {
          setApproveButton(false);
          setCanPurchase(true);
          console.log("Token contract already approved")
        }
      } catch (e) {
        value.toast(e);
      }
    } else {
      console.log("Not valid eth address");
    }
  };

  const checkNftAllowance = async (e) => {
    const id = e;

    if (nftContract && web3.utils.isAddress(nftContract)) {
      setIsContract(true);
      const instance = new web3.eth.Contract(nftAbi, nftContract);
      try {
        setError("");
        let owner = await instance.methods
          .ownerOf(id)
          .call();
        console.log(owner)
        if (owner.toLowerCase() === account.toLowerCase()) {
          let result = await instance.methods
            .getApproved(id)
            .call();
          console.log("This is result for approval - ", result);
          if (result != tribAddress) {
            setNftId(id)
            setApproveButton(true);
            setCanPurchase(false);
            setError("")
          } else {
            setCanPurchase(true)
            setApproveButton(false)
            setError("")
          }
        } else {
          setError(
            "⛔️ You don't own this NFT ⛔️"
          );
          setApproveButton(false);
          setCanPurchase(false);
        }
      } catch (e) {
        value.toast(e);
      }
    } else {
      console.log("NFT contract not found / Not valid contract")
    }
  };

  const concatDecimals = (baseAmount) => {
    let result;

    switch (tokenDecimals) {
      case "6":
        result = toDecimals(baseAmount, 6).toString();
        break;
      case "18":
        result = toDecimals(baseAmount, 18).toString();
        console.log(result)
        break;
    };
    return result;
  }

  const approve = async () => {
    value.setLoading(true);
    switch (selection) {
      case "erc20":
        const erc20 = new web3.eth.Contract(tokenAbi, nftContract);
        let allowance_ = 1000000000;
        const approvalAmount = concatDecimals(allowance_)
        try {
          let result = await erc20.methods
            .approve(tribAddress, approvalAmount)
            .send({ from: account });
          console.log("This is result for approve - ", result);
          setCanPurchase(true);
          setApproveButton(false);
          setError("")
        } catch (e) {
          value.toast(e);
          value.setLoading(false);
        }
        break;
      case "erc721":
        const erc721 = new web3.eth.Contract(nftAbi, nftContract);
        try {
          let result = await erc721.methods
            .approve(tribAddress, nftId)
            .send({ from: account });
          console.log("This is result for approve - ", result);
          setCanPurchase(true);
          setApproveButton(false);
          setError("")
        } catch (e) {
          value.toast(e);
          value.setLoading(false);
        }
        break;
    }

    value.setLoading(false);
  };

  useEffect(() => {
    getTokenInfo()
  }, [tokenContract]);

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
      } = array; // this must contain any inputs from custom forms

      if (!proposer || !askAmount) {
        value.toast("The Address proposing this tribute is missing")
        value.setLoading(false)
        return
      } else {
        proposer = await resolveAddressAndEns(proposer);
        askAmount = web3.utils.toWei(askAmount);
      }

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
          proposalDetail_.assetValue = concatDecimals(erc20Amount);
          (file) ? proposalDetail_.description = await uploadIpfs(dao.address, "Token Tribute Proposal", file.name) : proposalDetail_.description = "none"
          setProposalDetail(proposalDetail_);
          submitTribProposal(proposalDetail_)
          break;
        case "erc721":
          proposalDetail_.asset = erc721Contract;
          proposalDetail_.assetValue = erc721Id;
          (file) ? proposalDetail_.description = await uploadIpfs(dao.address, "NFT Tribute Proposal", file.name) : proposalDetail_.description = "none"
          setProposalDetail(proposalDetail_);
          submitTribProposal(proposalDetail_)
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
        <VStack w="70%" align="flex-start">
          <Text>
            Make a tribute to join{" "}
            <i>
              {dao.name.substring(0, 1).toUpperCase() + dao.name.substring(1)}
            </i>
            . You may tribute ETH, ERC20 tokens or NFTs.
          </Text>
          <br />
          <HStack w="100%" align={"center"}>
            <VStack align="flex-start" w="60%">
              <Text>
                <b>This address</b>
              </Text>
              <Input
                name="proposer"
                placeholder="0xKALI or .eth"
              ></Input>
            </VStack>
            <Spacer />
            <VStack align="flex-start">
              <Text>
                <b>wants</b>
              </Text>
              <HStack>
                <NumInputField name="askAmount" />
                <Text>DAO tokens</Text>
              </HStack>
            </VStack>
          </HStack>
          <br />
          <Text>
            <b>In exchange, this address will tribute</b>
          </Text>
          <HStack w="100%">
            <Select
              w="23%"
              onChange={(e) => {
                setSelection(e.target.value);
              }}
              placeholder="Select"
            >
              <option value="eth">ETH</option>
              <option value="erc20">ERC20</option>
              <option value="erc721">ERC721</option>
              {/* <option value="erc1155">ERC1155</option> */}
            </Select>
            {selection === "eth" && (
              <HStack w="80%" justify={"flex-start"}>

                <Text>Amount</Text>
                <NumInputField name="ethAmount" min="0.0000001" />
              </HStack>
            )}
            {selection === "erc20" && (
              <HStack w="80%" justify={"flex-end"}>
                <HStack w="70%" pl="5px">
                  <Text>Contract</Text>
                  <Input name="erc20Contract" placeholder="0xKALI" onChange={checkTokenAllowance}></Input>
                  {isContract && <Text>✅</Text>}
                </HStack>
                <Spacer />
                <HStack>
                  <Text>Amount</Text>
                  <NumInputField name="erc20Amount" />
                </HStack>
              </HStack>
            )}
            {selection === "erc721" && (
              <HStack w="80%" justify={"flex-end"}>
                <HStack w="70%" pl="5px">
                  {tokenSymbol ? <Text>${tokenSymbol}</Text> : <Text>Contract</Text>}
                  <Input name="erc721Contract" placeholder="0xKALI" value={nftContract} onChange={(e) => setNftContract(e.target.value)}></Input>
                </HStack>
                <Spacer />
                <HStack>
                  <Text>Id</Text>
                  <NumInputField name="erc721Id" onChange={checkNftAllowance} />
                  {isContract && <Text>✅</Text>}
                </HStack>
              </HStack>
            )}
          </HStack>
        </VStack>
        <br />
        <VStack w={"60%"}>
          <ProposalDescription doc={doc} setDoc={setDoc} note={note} setNote={setNote} setFile={setFile} />
          <br />
          <VStack h={"50px"} w={"60%"}>
            {approveButton && (
              <Button w={"100%"} className="solid-btn" onClick={approve}>
                Allow KALI to use your tribute
              </Button>
            )}
            {error && <Text>{error}</Text>}
            {canPurchase ? (
              <Button w={"100%"} className="solid-btn" type="submit">Submit Proposal</Button>
            ) : (
              <Button w={"100%"} className="hollow-btn" type="submit" isDisabled>Submit Proposal</Button>
            )}
          </VStack>
        </VStack>
      </Stack>
    </form>
  );
}
