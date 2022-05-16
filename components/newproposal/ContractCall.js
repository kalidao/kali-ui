import { useState, useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import { Input, Button, Select, Text, Textarea, Link, Box, HStack, VStack, Tabs, TabList, TabPanels, Tab, TabPanel, Center } from "@chakra-ui/react";
import ProposalDescription from "../elements/ProposalDescription";
import { uploadIpfs } from "../tools/ipfsHelpers";
import { getChainInfo } from "../../utils/formatters";

export default function ContractCall() {
  const value = useContext(AppContext);
  const { web3, account, abi, address, chainId } = value.state;

  // For Notes section
  const [doc, setDoc] = useState([]);
  const [note, setNote] = useState(null);
  const [file, setFile] = useState(null);

  const [abi_, setAbi_] = useState(null);
  const [contract, setContract] = useState(null);
  const [etherscanLink, setEtherscanLink] = useState(null);
  const [writeFuncs, setWriteFuncs] = useState(null);
  const [readFuncs, setReadFuncs] = useState(null);
  const [functionName, setFunctionName] = useState(null);
  const [inputs, setInputs] = useState(null);
  const [inputParams, setInputParams] = useState([]);

  const updateABI = (event) => {
    setAbi_(event.target.value);
  };

  const parseABI = (e) => {
    try {
      let array = JSON.parse(abi_);
      const writeFuncs_ = []
      const readFuncs_ = []

      for (var i = 0; i < array.length; i++) {
        let item = array[i];
        const funcType = item["stateMutability"]
        if (funcType == "nonpayable" || funcType == "payable") {
          if (item["type"] != "constructor") {
            writeFuncs_.push(item)
            writeFuncs_.sort((a, b) => a.name > b.name)
            // console.log(writeFuncs_)
          }
        } else if (funcType == "view") {
          readFuncs_.push(item)
          readFuncs_.sort((a, b) => a.name > b.name)
          setEtherscanLink(getExplorerLink(contract))
          // console.log(getExplorerLink(contract))
        }
      }

      setWriteFuncs(writeFuncs_);
      setReadFuncs(readFuncs_);
      setInputs(null);
    } catch (e) {
      value.toast("Enter correct JSON");
    }
  };

  const getExplorerLink = (address) => {
    const { blockExplorerUrls } = getChainInfo(chainId)
    return (blockExplorerUrls[0] + "/address/" + address + "#readContract");
  }

  // const onReadFunctionSelect = (e) => {
  //   setInputParams(JSON.stringify([]))
  //   if (e.target.value == 999) {
  //     setInputs(null);
  //     setFunctionName(null);
  //   } else {
  //     let id = e.target.value;
  //     let inputs_ = readFuncs[id]["inputs"];
  //     let name_ = readFuncs[id]["name"];
  //     setInputs(inputs_);
  //     setFunctionName(name_);
  //     setSelection(id);
  //   }
  // };

  // const onReadInputChange = (e) => {
  //   let element = document.getElementById("inputFields");
  //   let children = element.children;
  //   let array = [];
  //   for (var i = 0; i < children.length; i++) {
  //     let item = children[i].value;
  //     if (item != undefined) {
  //       array.push(children[i].value);
  //     }
  //   }
  //   console.log(array);
  //   setInputParams(JSON.stringify(array));
  // };

  // const handleQuery = async () => {
  //   abi_ = JSON.parse(abi_)
  //   inputParams = JSON.parse(inputParams)

  //   if (inputParams.length == 0) {
  //     try {
  //       const func_ = web3.eth.abi.encodeFunctionCall(readFuncs[selection], inputParams);
  //       const instance = new web3.eth.Contract(abi_, contract);
  //       let result = await instance.methods[func_]().call()
  //       setReadResponse(result)
  //     } catch (e) {
  //       console.log("Error when querying read functions without params.")
  //       console.log(e)
  //     }
  //   } else {
  //     try {
  //       const func_ = web3.eth.abi.encodeFunctionSignature(readFuncs[selection]);
  //       console.log(func_, inputParams)
  //       const instance = new web3.eth.Contract(abi_, contract);
  //       let result = await instance.methods[func_](inputParams).call()
  //       setReadResponse(result)
  //     } catch (e) {
  //       console.log("Error when querying read functions with params.")
  //       console.log(e)
  //     }
  //   }
  // }

  const onWriteFunctionSelect = (e) => {
    if (e.target.value == 999) {
      setInputs(null);
      setFunctionName(null);
    } else {
      let id = e.target.value;
      let inputs_ = writeFuncs[id]["inputs"];
      let name_ = writeFuncs[id]["name"];
      console.log(inputs_)
      setInputs(inputs_);
      setFunctionName(name_);
    }
  };

  const onInputChange = (e) => {
    let element = document.getElementById("inputFields");
    let children = element.children;
    let array = [];
    for (var i = 0; i < children.length; i++) {
      let item = children[i].value;
      if (item != undefined) {
        array.push(children[i].value);
      }
    }
    console.log(array);
    setInputParams(JSON.stringify(array));
  };

  const submitProposal = async () => {
    value.setLoading(true);

    // Configure proposal type
    const proposalType_ = 2;

    // Configure description param and upload to IPFS if necessary
    let description;
    (note && file) ? description = await uploadIpfs(dao.address, "Mint Proposal", file.name) : (description = "none");
    (note) ? description = note : (description = "none");
    (file) ? description = await uploadIpfs(dao.address, "Mint Proposal", file.name) : null;

    // Configure payload 
    inputParams = JSON.parse(inputParams);
    var payload_ = web3.eth.abi.encodeFunctionCall(
      {
        name: functionName,
        type: "function",
        inputs: inputs,
      },
      inputParams
    );

    // console.log(proposalType_, description, contract, 0, payload_);
    try {
      const instance = new web3.eth.Contract(abi, address);
      let result = await instance.methods
        .propose(
          proposalType_,
          description,
          [contract],
          [0],
          [payload_]
        )
        .send({ from: account });
      value.setVisibleView(2);
    } catch (e) {
      value.toast(e);
      value.setLoading(false);
    }


    value.setLoading(false);
  };

  return (
    <form onSubmit={submitProposal}>
      <VStack alignItems="left">
        <HStack w="100%">
          <Text fontSize="14px">Interact with smart contracts programmatically</Text>
        </HStack>
        <Box h={"2%"} />
        <Text>
          <b>Target Contract</b>
        </Text>
        <Input placeholder="0x address of contract" onChange={(e) => { setContract(e.target.value) }}></Input>
        <Box h={"2%"} />
        <Text>
          <b>Contract ABI</b>
        </Text>
        <HStack w={"100%"}>
          <Textarea w={"80%"} placeholder=". . ." onChange={updateABI} />
          <VStack w={"20%"} align={"center"}>
            <Button className="hollow-btn" onClick={parseABI}>Parse ABI</Button>
          </VStack>
        </HStack>
        <Box h={"2%"} />

        {(readFuncs || writeFuncs) ? (
          <Tabs>
            <TabList>
              {writeFuncs ? <Tab>Write Functions</Tab> : null}
              {readFuncs ? <Tab>Read Functions</Tab> : null}
            </TabList>
            <TabPanels>
              {writeFuncs ?
                <TabPanel>
                  <VStack w={"100%"} align={"flex-start"}>
                    <Select w={"70%"} onChange={onWriteFunctionSelect}>
                      <option value="999">Select a function</option>
                      {writeFuncs.map((f, index) => (
                        <option key={index} value={index}>
                          {f["name"]}
                        </option>
                      ))}
                    </Select>
                    {inputs == null ? null : (
                      <>
                        <div id="inputFields">
                          {inputs.map((input, index) => (
                            <>
                              <Text>{input["name"]}</Text>
                              <Input onChange={onInputChange} />
                            </>
                          ))}
                        </div>
                      </>
                    )}
                    <br />
                    <ProposalDescription doc={doc} setDoc={setDoc} note={note} setNote={setNote} setFile={setFile} />
                    <br />
                    <Center>
                      <Button className="solid-btn" type="submit">Submit Proposal</Button>
                    </Center>
                  </VStack>
                </TabPanel>
                : null}
              {readFuncs ?
                <TabPanel>
                  <VStack w={"100%"} align={"flex-start"}>
                    <Text as="u">
                      <Link href={etherscanLink} isExternal>
                        Etherscan
                      </Link>
                    </Text>
                  </VStack>
                </TabPanel>
                : null}
            </TabPanels>
          </Tabs>
        ) : (
          <VStack w={"100%"}>
            <br />
            <Text>Enter contract ABI to parse and interact with contract functions!</Text>
          </VStack>
        )}
        <Box h={"2%"} />
      </VStack>
    </form>
  );
}
