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
  HStack,
  VStack,
  Center,
  Spacer,
  Checkbox,
  Box,
} from "@chakra-ui/react";
import NumInputField from "../elements/NumInputField";
import {
  toDecimals,
  fromDecimals,
  unixToDate,
  getTokenName,
} from "../../utils/formatters";
import { addresses } from "../../constants/addresses";

export default function BuyCrowdsale() {
  const value = useContext(AppContext);
  const { web3, loading, account, address, abi, dao, chainId } = value.state;

  const tokenName = getTokenName(
    dao["extensions"]["crowdsale"]["details"]["purchaseToken"],
    chainId
  );
  const purchaseToken =
    dao["extensions"]["crowdsale"]["details"]["purchaseToken"];
  // console.log("TOKEN", tokenName);
  // console.log("TOKEN", purchaseToken);
  const purchaseMultiplier =
    dao["extensions"]["crowdsale"]["details"]["purchaseMultiplier"];
  const purchaseMultiplierRatio = 1 / purchaseMultiplier
  const purchaseLimit =
    dao["extensions"]["crowdsale"]["details"]["purchaseLimit"];
  const saleEnds = dao["extensions"]["crowdsale"]["details"]["saleEnds"];
  const date = new Date(saleEnds * 1000)

  const [purchaseAmount, setPurchaseAmount] = useState(purchaseMultiplier); // amount to be spent on shares, not converted to wei/decimals
  // const [purchaseAllowance, setPurchaseAllowance] = useState(0);
  const [purchaseTokenSymbol, setPurchaseTokenSymbol] = useState(null);
  const [purchaseTokenBalance, setPurchaseTokenBalance] = useState(0);
  const [approveButton, setApproveButton] = useState(false);
  const [amountAvailable, setAmountAvailable] = useState(0);
  const [eligibleBuyer, setEligibleBuyer] = useState(null);
  const [error, setError] = useState(null);

  // no decimals in dao object
  // const decimals = dao["extensions"]["crowdsale"]["details"]["decimals"];
  // const extAddress = dao["extensions"]["crowdsale"]["address"];

  const tokenAbi = require("../../abi/ERC20.json");
  const crowdsaleAbi = require("../../abi/KaliDAOcrowdsale.json")
  const crowdsaleAddress = dao["extensions"]["crowdsale"]["address"];
  const accessListAbi = require("../../abi/KaliAccessManager.json")
  const accessListAddress = addresses[chainId]["access"];

  const getPurchaseTokenSymbol = async () => {
    try {
      const instance_ = new web3.eth.Contract(tokenAbi, purchaseToken);
      let symbol_ = await instance_.methods
        .symbol()
        .call();
      setPurchaseTokenSymbol(symbol_.toUpperCase())
    } catch (e) {
      value.toast(e);
    }
  }

  const getPurchaseTokenBalance = async () => {
    try {
      const instance_ = new web3.eth.Contract(tokenAbi, purchaseToken);
      let result = await instance_.methods
        .balanceOf(account)
        .call();
      result = web3.utils.fromWei(result, "ether")
      setPurchaseTokenBalance(result)
      console.log(result)
    } catch (e) {
      value.toast(e);
    }
  }

  const checkPurchaseTokenAllowance = async () => {
    const instance = new web3.eth.Contract(tokenAbi, purchaseToken);
    try {
      let result = await instance.methods
        .allowance(account, crowdsaleAddress)
        .call();
      result = web3.utils.fromWei(result, "ether")
      // setPurchaseAllowance(result)
      if (result == 0) {
        setApproveButton(true);
      } else {
        console.log("already approved this much", result)
      }
    } catch (e) {
      value.toast(e);
    }
  };

  const getAmountPurchased = async () => {
    const instance = new web3.eth.Contract(crowdsaleAbi, crowdsaleAddress)

    try {
      let result = await instance.methods.crowdsales(dao.address).call()
      setAmountAvailable(fromDecimals(purchaseLimit, 18) - fromDecimals(result[4], 18))
    } catch (e) {
      value.toast(e)
    }
  }

  const getAccessListId = async () => {
    const instance = new web3.eth.Contract(crowdsaleAbi, crowdsaleAddress)

    try {
      let result = await instance.methods.crowdsales(dao.address).call()
      checkEligibility(result[0])
    } catch (e) {
      value.toast(e)
    }
  }

  const checkEligibility = async (listId) => {
    const instance = new web3.eth.Contract(accessListAbi, accessListAddress)

    try {
      let result = await instance.methods.isListed(listId, account).call()
      // console.log(result)
      setEligibleBuyer(result)
    } catch (e) {
      value.toast(e)
    }
  }

  useEffect(() => {
    getPurchaseTokenSymbol()
    getPurchaseTokenBalance()
    checkPurchaseTokenAllowance()
    getAmountPurchased()
    getAccessListId()
  }, [account])

  function CrowdsaleDetail(props) {
    return (
      <HStack w="100%">
        <Text>{props.name}</Text>
        <Spacer />
        <Text>{props.input}</Text>
      </HStack>
    )
  }

  const approveSpend = async () => {
    let amt_;
    let allowance_ = 1000000000;

    if (purchaseTokenSymbol.toUpperCase() == "USDC") {
      amt_ = toDecimals(allowance_, 6).toString(); // toWei() won't work for tokens with less than 18 decimals
    } else {
      amt_ = web3.utils.toWei(allowance_.toString(), "ether");
    }
    try {
      value.setLoading(true);
      const instance_ = new web3.eth.Contract(tokenAbi, purchaseToken);
      let result = await instance_.methods
        .approve(crowdsaleAddress, amt_)
        .send({ from: account });
      value.setLoading(false);
      console.log(result)
      setApproveButton(false)
    } catch (e) {
      value.toast(e);
    }
  };

  const submitProposal = async (event) => {
    event.preventDefault();
    value.setLoading(true);

    let object = event.target;
    // console.log("object", object);
    var array = [];
    for (let i = 0; i < object.length; i++) {
      array[object[i].name] = object[i].value;
    }

    // console.log(purchaseToken)
    var { amount_ } = array; // this must contain any inputs from custom forms


    if (purchaseTokenSymbol.toUpperCase() == "USDC") {
      amount_ = toDecimals(amount_, 6).toString(); // toWei() won't work for tokens with less than 18 decimals
    } else {
      amount_ = web3.utils.toWei(amount_, "ether");
    }

    try {
      // var value_ = 0;
      // if (
      //   purchaseToken == "0x0000000000000000000000000000000000000000" ||
      //   purchaseToken == "0x000000000000000000000000000000000000dEaD"
      // ) {
      //   value_ = amount_;
      // }

      const instance = new web3.eth.Contract(crowdsaleAbi, crowdsaleAddress);

      try {
        // let result = await instance.methods
        //   .callExtension(address, amount_)
        //   .send({ from: account, value: amount_ });
        console.log(amount_, address, instance, account)


        let result = await instance.methods
          .callExtension(address, amount_)
          .send({ from: account });
        value.setVisibleView(1);
      } catch (e) {
        console.log("error here contract interaction")
        value.toast(e);
        value.setLoading(false);
      }
    } catch (e) {
      console.log("error here")
      value.toast(e);
      value.setLoading(false);
    }

    value.setLoading(false);
  };

  const handleChange = (value) => {
    const purchaseAmount_ = value * purchaseMultiplier;
    setPurchaseAmount(purchaseAmount_);

    if (purchaseAmount_ > amountAvailable) {
      setError(`⛔️ Purchase amount of ${purchaseAmount_} exceeds amount available for sale, ${amountAvailable} ⛔️`)
    } else if (parseInt(value) > parseInt(purchaseTokenBalance)) {
      setError(`⛔️ You do not have enough ${purchaseTokenSymbol}! ⛔️`)
    } else {
      setError(null)
    }
  }

  return (
    <>
      <form onSubmit={submitProposal}>
        <Stack w="90%" spacing="40px">
          <Text><i>
            {dao.name.substring(0, 1).toUpperCase() + dao.name.substring(1)}
          </i> is currently running a sale of its token with the following details:</Text>
          {/* <Box h="20px"/> */}
          <VStack align="flex-start">
            <CrowdsaleDetail name={"DAO Token: "} input={dao.token["symbol"].toUpperCase()} />
            <CrowdsaleDetail name={"DAO Token Contract Address: "} input={dao.address} />
            <CrowdsaleDetail name={"Purchase Token Contract Address: "} input={purchaseToken} />
            <CrowdsaleDetail name={"Price of 1 DAO Token: "} input={`~${purchaseMultiplierRatio.toFixed(4)} ${purchaseTokenSymbol} token (${purchaseMultiplier} 
            ${dao.token["symbol"].toUpperCase()} per ${purchaseTokenSymbol ? purchaseTokenSymbol : "ETH"})`} />
            <CrowdsaleDetail name={"Amount of DAO Tokens available for sale: "} input={`${amountAvailable} ${dao.token["symbol"].toUpperCase()}`} />
            <CrowdsaleDetail name={"Deadline: "} input={date.toString()} />
          </VStack>
          {/* <Box h="20px"/> */}

          <>
            {(eligibleBuyer) ? (
              <>
                <HStack w="100%">
                  <Text pr="5px">
                    <b>I'd like to purhcase</b>
                  </Text>
                  <Input w="15%" value={purchaseAmount} disabled />
                  <Text>
                    <b>DAO Token</b>
                  </Text>

                  <Text> <b>with</b> </Text>
                  <NumInputField
                    name="amount_"
                    defaultValue={1}
                    min=".000000000000000001"
                    max={purchaseLimit / purchaseMultiplier}
                    onChange={handleChange}
                  />
                  <Text><b>Purhcase Token</b></Text>
                </HStack>
                <Center>
                  <VStack w="50%">
                    {/* <Checkbox>I agree to the terms of crowdsale</Checkbox> */}
                    <Box h="5px" />
                    {approveButton ? (
                      <Button w="100%" className="solid-btn" onClick={approveSpend}>
                        Allow KALI to use your {purchaseTokenSymbol}
                      </Button>
                    ) :
                      null
                    }
                    {!approveButton ? (
                      <Button w="100%" className="solid-btn" type="submit" isDisabled={error}>
                        Buy DAO token
                      </Button>
                    ) : (
                      <Button w="100%" variant="ghost" fontStyle="unset" type="submit" isDisabled>
                        Buy DAO token
                      </Button>
                    )}
                  </VStack>
                </Center>
                <VStack w="100%" align="center">
                  {error && <Text color="red.400">{error}</Text>}
                </VStack>
              </>
            ) : (
              <Center>
                <Text><b>🚫 You are not eligible to participate in this crowdsale 🚫</b></Text>
              </Center>)}
          </>
        </Stack>
      </form>
    </>
  );
}
