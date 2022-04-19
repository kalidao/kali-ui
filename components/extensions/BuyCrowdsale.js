import { useState, useContext, useEffect } from "react";
import Router, { useRouter } from "next/router";
import AppContext from "../../context/AppContext";
import {
  Input,
  Button,
  Text,
  Link,
  Stack,
  HStack,
  VStack,
  Center,
  Spacer,
  Checkbox,
  IconButton,
  Box,
} from "@chakra-ui/react";
import NumInputField from "../elements/NumInputField";
import {
  toDecimals,
  fromDecimals,
  getTokenName,
} from "../../utils/formatters";
import { addresses } from "../../constants/addresses";
import { getChainInfo } from "../../utils/formatters";
import { fetchCrowdsaleTermsHash } from "../tools/ipfsHelpers";

export default function BuyCrowdsale() {
  const value = useContext(AppContext);
  const { web3, loading, account, address, abi, dao, chainId } = value.state;

  // Contract setups
  const tokenAbi = require("../../abi/ERC20.json");
  const crowdsaleAbi = require("../../abi/KaliDAOcrowdsale.json")
  const crowdsaleAddress = dao["extensions"]["crowdsale"]["address"];
  const accessListAbi = require("../../abi/KaliAccessManager.json")
  const accessListAddress = addresses[chainId]["access"];

  // Crowdsale details
  const purchaseToken =
    dao["extensions"]["crowdsale"]["details"]["purchaseToken"];
  const purchaseMultiplier =
    dao["extensions"]["crowdsale"]["details"]["purchaseMultiplier"];
  const purchaseMultiplierRatio = 1 / purchaseMultiplier
  const purchaseLimit =
    dao["extensions"]["crowdsale"]["details"]["purchaseLimit"];
  const saleEnds = dao["extensions"]["crowdsale"]["details"]["saleEnds"];
  const date = new Date(saleEnds * 1000)

  const [purchaseAmount, setPurchaseAmount] = useState(purchaseMultiplier); // amount to be spent on shares, not converted to wei/decimals
  const [purchaseTokenSymbol, setPurchaseTokenSymbol] = useState(null);
  const [purchaseTokenDecimals, setPurchaseTokenDecimals] = useState(null);
  const [purchaseTokenBalance, setPurchaseTokenBalance] = useState(0);
  const [purchaseTerms, setPurchaseTerms] = useState("");
  const [didCheckTerms, setDidCheckTerms] = useState(false);
  const [canPurchase, setCanPurchase] = useState(false);
  const [approveButton, setApproveButton] = useState(false);
  const [amountAvailable, setAmountAvailable] = useState(0);
  const [eligibleBuyer, setEligibleBuyer] = useState(null);
  const [error, setError] = useState(null);

  const getPurchaseTokenInfo = async () => {
    try {
      const instance_ = new web3.eth.Contract(tokenAbi, purchaseToken);
      let symbol_ = await instance_.methods
        .symbol()
        .call();
      setPurchaseTokenSymbol(symbol_.toUpperCase())
    } catch (e) {
      value.toast(e);
    }

    try {
      const instance_ = new web3.eth.Contract(tokenAbi, purchaseToken);
      let decimals_ = await instance_.methods
        .decimals()
        .call();
      setPurchaseTokenDecimals(decimals_)
    } catch (e) {
      value.toast(e);
      console.log("no purchase token")
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
    } catch (e) {
      value.toast(e);
      console.log("no token balance")
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
        console.log("not approved yet")
      } else {
        console.log("already approved this much", result)
      }
    } catch (e) {
      value.toast(e);
      console.log("no token allowance")
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
      console.log("access list not accessible")
    }
  }

  const checkEligibility = async (listId) => {
    const instance = new web3.eth.Contract(accessListAbi, accessListAddress)

    try {
      let result = await instance.methods.isListed(listId, account).call()
      setEligibleBuyer(result)
    } catch (e) {
      value.toast(e)
      console.log("not eligible")
    }
  }

  const getExplorerLink = (type, address) => {
    const { blockExplorerUrls } = getChainInfo(chainId)

    switch (type) {
      case "address":
        return (blockExplorerUrls[0] + "/address/" + address);
      case "token":
        return (blockExplorerUrls[0] + "/token/" + address);
    };
  }

  const getPurchaseTerms = async () => {
    let hash;
    
    try {
      hash = await fetchCrowdsaleTermsHash(dao.name, dao["members"][0].member);
    } catch (e) {
      console.log("Error retrieving crowdsale terms.")
    }

    const terms = "https://ipfs.io/ipfs/" + hash.hash
    setPurchaseTerms(terms)
  }

  useEffect(() => {
    getPurchaseTokenInfo()
    getPurchaseTokenBalance()
    checkPurchaseTokenAllowance()
    getAmountPurchased()
    getAccessListId()
    getPurchaseTerms()
  }, [account])

  const concatDecimals = (baseAmount) => {
    let result;

    switch (purchaseTokenDecimals) {
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

  const approveSpend = async () => {
    let allowance_ = 1000000000;
    const approvalAmount = concatDecimals(allowance_)

    try {
      value.setLoading(true);
      const instance_ = new web3.eth.Contract(tokenAbi, purchaseToken);
      let result = await instance_.methods
        .approve(crowdsaleAddress, approvalAmount)
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
    var array = [];
    for (let i = 0; i < object.length; i++) {
      array[object[i].name] = object[i].value;
    }

    var { amount_ } = array; // this must contain any inputs from custom forms
    const purchaseAmount_ = concatDecimals(amount_);
    const instance = new web3.eth.Contract(crowdsaleAbi, crowdsaleAddress);

    try {
      // console.log(purchaseAmount_, address, instance, account)
      let result = await instance.methods
        .callExtension(address, purchaseAmount_)
        .send({ from: account });
      value.setVisibleView(1);
    } catch (e) {
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

  const handleDisclaimer = () => {
    let didCheckTerms_ = didCheckTerms;
    didCheckTerms_ = !didCheckTerms_
    setDidCheckTerms(didCheckTerms_)


    console.log(didCheckTerms_, approveButton)
    if (didCheckTerms_ && !approveButton) {
      setCanPurchase(true)
    } else {
      setCanPurchase(false)
    }
  }

  function CrowdsaleDetail(props) {
    return (
      <HStack w="100%">
        <Text>{props.name}</Text>
        <Spacer />
        {(props.link) ? (
          <>
            <Link href={props.link} isExternal>
              {props.input}
            </Link>
          </>
        ) :
          <Text>{props.input}</Text>
        }
      </HStack>
    )
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
            <CrowdsaleDetail name={"DAO Token Contract Address: "} input={dao.address.slice(0, 4) + "..." + dao.address.slice(-4)} link={getExplorerLink("address", dao.address)} />
            <CrowdsaleDetail name={"Purchase Token Contract Address: "} input={purchaseToken.slice(0, 4) + "..." + purchaseToken.slice(-4)} link={getExplorerLink("token", purchaseToken)} />
            <CrowdsaleDetail name={"Price of 1 DAO Token: "} input={`~${purchaseMultiplierRatio.toFixed(4)} ${purchaseTokenSymbol} token (${purchaseMultiplier} 
            ${dao.token["symbol"].toUpperCase()} per ${purchaseTokenSymbol ? purchaseTokenSymbol : "ETH"})`} />
            <CrowdsaleDetail name={"Amount of DAO Tokens available for sale: "} input={`${amountAvailable} ${dao.token["symbol"].toUpperCase()}`} />
            <CrowdsaleDetail name={"Deadline: "} input={date.toString()} />
          </VStack>
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
                    <Checkbox onChange={() => handleDisclaimer()}>
                      I agree to the {" "}
                      <Text as="u">
                        <Link href={purchaseTerms} isExternal>
                          terms
                        </Link>
                      </Text>
                      {" "} of crowdsale
                    </Checkbox>
                    <Box h="5px" />
                    {approveButton ? (
                      <Button w="100%" className="solid-btn" onClick={approveSpend}>
                        Allow KALI to use your {purchaseTokenSymbol}
                      </Button>
                    ) :
                      null
                    }
                    {console.log(canPurchase)}
                    {canPurchase ? (
                      <Button w="100%" className="solid-btn" type="submit" isDisabled={error}>
                        Buy DAO token
                      </Button>
                    ) : (
                      <Button w="100%" variant="ghost" fontStyle="unset" type="submit" isDisabled>
                        Buy DAO token
                      </Button>
                    )}
                    {/* {!approveButton ? (
                      <Button w="100%" className="solid-btn" type="submit" isDisabled={error}>
                        Buy DAO token
                      </Button>
                    ) : (
                      <Button w="100%" variant="ghost" fontStyle="unset" type="submit" isDisabled>
                        Buy DAO token
                      </Button>
                    )} */}
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
