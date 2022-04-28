import { useState, useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import { Input, Button, Select, Text, Textarea, Spacer, Box, HStack, VStack, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { AiOutlineDelete, AiOutlineUserAdd } from "react-icons/ai";
import ProposalDescription from "../elements/ProposalDescription";
import { uploadIpfs } from "../tools/ipfsHelpers";
import { validateEns } from "../tools/ensHelpers";

export default function ContractCall() {
  const value = useContext(AppContext);
  const { web3, loading, account, abi, address } = value.state;

  // For Notes section
  const [doc, setDoc] = useState([]);
  const [note, setNote] = useState(null);
  const [file, setFile] = useState(null);

  const [abi_, setAbi_] = useState(null);
  const [writeFuncs, setWriteFuncs] = useState(null);
  const [readFuncs, setReadFuncs] = useState(null);
  const [functionName, setFunctionName] = useState(null);
  const [inputs, setInputs] = useState(null);
  const [inputParams, setInputParams] = useState(null);

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
        // if (item["type"] == "function") {
        //   functions_.push(item);
        // }

        if (funcType == "payable") {
          writeFuncs_.push(item)
        } else if (funcType == "view") {
          readFuncs_.push(item)
        }
      }

      setWriteFuncs(writeFuncs_);
      setReadFuncs(readFuncs_);
      setInputs(null);
    } catch (e) {
      value.toast("Enter correct JSON");
    }
  };

  const onFunctionSelect = (e) => {
    if (e.target.value == 999) {
      setInputs(null);
      setFunctionName(null);
    } else {
      let id = e.target.value;
      let inputs_ = writeFuncs[id]["inputs"];
      let name_ = writeFuncs[id]["name"];
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

  const submitProposal = async (event) => {
    event.preventDefault();
    value.setLoading(true);

    let object = event.target;
    var array = [];
    for (let i = 0; i < object.length; i++) {
      array[object[i].name] = object[i].value;
    }

    var {
      // proposalType_,
      // description_,
      account_,
      amount_,
      abi_,
      functionName,
      inputParams,
      inputs,
    } = array; // this must contain any inputs from custom forms

    console.log(array);

    // Configure proposal type
    const proposalType_ = 2;

    // Configure description param and upload to IPFS if necessary
    let description;
    (note && file) ? description = await uploadIpfs(dao.address, "Mint Proposal", file.name) : (description = "none");
    (note) ? description = note : (description = "none");
    (file) ? description = await uploadIpfs(dao.address, "Mint Proposal", file.name) : null;

    abi_ = JSON.parse(abi_);

    inputs = JSON.parse(inputs);
    inputParams = JSON.parse(inputParams);
    // console.log("test");
    // console.log(abi_);
    // console.log(inputs);
    // console.log(inputParams);

    var payload_ = web3.eth.abi.encodeFunctionCall(
      {
        name: functionName,
        type: "function",
        inputs: inputs,
      },
      inputParams
    );
    // console.log(payload_);

    console.log(proposalType_, description, accounts_, amounts_, payloads_);
    try {
      const instance = new web3.eth.Contract(abi, address);
      let result = await instance.methods
        .propose(
          proposalType_,
          description,
          [account_],
          [amount_],
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
        <Input name="account_" placeholder="0x address of contract"></Input>
        <Box h={"2%"} />
        <Text>
          <b>Contract ABI</b>
        </Text>
        <HStack w={"100%"}>
          <Textarea w={"80%"} placeholder=". . ." onChange={updateABI} />
          <VStack w={"20%"} align={"center"}>
            <Button className="hollow-btn" onClick={parseABI}>Parse ABI</Button>
            {/* <Button w={"100%"} className="hollow-btn" onClick={parseABI}>Clear</Button> */}
          </VStack>
        </HStack>

        {/* <Input type="hidden" name="abi_" value={abi_} />
        <Input type="hidden" name="inputs" value={JSON.stringify(inputs)} /> */}
        <Box h={"2%"} />

        {(readFuncs || writeFuncs) ? (
          <Tabs>
            <TabList>
              {readFuncs ? <Tab>Read Contract</Tab> : null}
              {writeFuncs ? <Tab>Write Contract</Tab> : null}
            </TabList>

            <TabPanels>
              {readFuncs ?
                <TabPanel>
                  <VStack w={"100%"} align={"flex-start"}>
                    <Select w={"40%"} onChange={onFunctionSelect}>
                      <option value="999">Select</option>
                      {readFuncs.map((f, index) => (
                        <option key={index} value={index}>
                          {f["name"]}
                        </option>
                      ))}
                    </Select>
                    {/* <Input type="hidden" name="functionName" value={functionName} /> */}
                    <Button className="solid-btn" type="submit">Query</Button>

                  </VStack>
                </TabPanel>
                : null}
              {writeFuncs ?
                <TabPanel>
                  <VStack w={"100%"}>
                    <Select w={"70%"} onChange={onFunctionSelect}>
                      <option value="999">Select a function</option>
                      {writeFuncs.map((f, index) => (
                        <option key={index} value={index}>
                          {f["name"]}
                        </option>
                      ))}
                    </Select>
                    {/* <Input type="hidden" name="functionName" value={functionName} /> */}
                    {inputs == null ? null : (
                      <>
                        {/* <Input type="hidden" name="inputParams" value={inputParams} /> */}
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
                    <ProposalDescription doc={doc} setDoc={setDoc} note={note} setNote={setNote} setFile={setFile} />
                    <br />
                    <Button className="solid-btn" type="submit">Submit Proposal</Button>
                  </VStack>
                </TabPanel>
                : null}
            </TabPanels>
          </Tabs>
        ) : (
          <VStack w={"100%"}>
            <br />
            <Text>Enter contract ABI above to parse and interact with parsed functions!</Text>
          </VStack>
        )}

        {/* {readFuncs == null ? null : (
          <VStack w={"100%"} align={"flex-start"}>
            <Button className="hollow-btn">Read Contract</Button>

            <Select w={"40%"} onChange={onFunctionSelect}>
              <option value="999">Select</option>
              {readFuncs.map((f, index) => (
                <option key={index} value={index}>
                  {f["name"]}
                </option>
              ))}
            </Select>
            <Input type="hidden" name="functionName" value={functionName} />
            <Button className="solid-btn" type="submit">Query</Button>

          </VStack>
        )} */}
        {/* <Box h={"2%"} /> */}
        {/* {writeFuncs == null ? null : (
          <VStack w={"100%"}>
            <Text>Write Contract</Text>
            <Select w={"70%"} onChange={onFunctionSelect}>
              <option value="999">Select a function</option>
              {writeFuncs.map((f, index) => (
                <option key={index} value={index}>
                  {f["name"]}
                </option>
              ))}
            </Select>
            <Input type="hidden" name="functionName" value={functionName} />
            {inputs == null ? null : (
              <>
                <Input type="hidden" name="inputParams" value={inputParams} />
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
            <ProposalDescription doc={doc} setDoc={setDoc} note={note} setNote={setNote} setFile={setFile} />
            <br />
            <Button className="solid-btn" type="submit">Submit Proposal</Button>
          </VStack>
        )} */}


        {/* <Input type="hidden" name="proposalType_" value="2" /> */}
      </VStack>
    </form>
  );
}
