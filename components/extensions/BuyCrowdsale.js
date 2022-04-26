import { useState, useContext, useEffect } from "react";
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
  Progress,
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
import Crowdsales from "./Crowdsales";

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
  const ether = "0x000000000000000000000000000000000000dead"
  const purchaseToken =
    dao["extensions"]["crowdsale"]["details"]["purchaseToken"];
  const purchaseMultiplier =
    dao["extensions"]["crowdsale"]["details"]["purchaseMultiplier"];
  const purchaseMultiplierRatio = 1 / purchaseMultiplier
  const purchaseLimit =
    dao["extensions"]["crowdsale"]["details"]["purchaseLimit"];
  const saleEnds = dao["extensions"]["crowdsale"]["details"]["saleEnds"];
  // const date = new Date(saleEnds * 1000)
  const remainingTime = ((saleEnds * 1000) - Date.now())

  function calculateTimeLeft(duration) {
    let seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
      days = Math.floor((duration / (1000 * 60 * 60 * 24)) % 365);

    // console.log('time: ', days, hours, minutes, seconds)
    const timeleft = seconds + minutes + hours + days;
    
    days = (hours < 10) ? 0 + days : days;
    hours = (hours < 10) ? 0 + hours : hours;
    minutes = (minutes < 10) ? 0 + minutes : minutes;
    seconds = (seconds < 10) ? 0 + seconds : seconds;
    
    // console.log('time: ', days, hours, minutes, seconds)
    
    if (timeleft < 0) {
      return "SALE ENDED";
    } else {
      return days + " days " + hours + " hr " + minutes + " min " + seconds + " sec "; 
    }
  }

  const [purchaseAmount, setPurchaseAmount] = useState(purchaseMultiplier); // amount to be spent on shares, not converted to wei/decimals
  const [purchaseTokenSymbol, setPurchaseTokenSymbol] = useState(null);
  const [purchaseTokenDecimals, setPurchaseTokenDecimals] = useState(null);
  const [purchaseTokenBalance, setPurchaseTokenBalance] = useState(0);
  const [purchaseTerms, setPurchaseTerms] = useState(null);
  const [purchaseList, setPurchaseList] = useState(null);
  const [didCheckTerms, setDidCheckTerms] = useState(false);
  const [canPurchase, setCanPurchase] = useState(false);
  const [approveButton, setApproveButton] = useState(false);
  const [purchasedAmount, setPurchasedAmount] = useState(0);
  const [eligibleBuyer, setEligibleBuyer] = useState(null);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(remainingTime));

  const getPurchaseTokenInfo = async () => {
    try {
      const instance_ = new web3.eth.Contract(tokenAbi, purchaseToken);
      let symbol_ = await instance_.methods
        .symbol()
        .call();
      setPurchaseTokenSymbol(symbol_.toUpperCase())
    } catch (e) {
      // value.toast(e);
      console.log("Can't find purchase token symbol")
    }

    try {
      const instance_ = new web3.eth.Contract(tokenAbi, purchaseToken);
      let decimals_ = await instance_.methods
        .decimals()
        .call();
      setPurchaseTokenDecimals(decimals_)
    } catch (e) {
      // value.toast(e);
      console.log("Can't find purchase token decimal")
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
      // value.toast(e);
      console.log("Can't find token balance")
    }
  }

  const getEthBalance = async () => {
    try {
      const ethBalance = await web3.eth.getBalance(account)
      ethBalance = web3.utils.fromWei(ethBalance, "ether")
      console.log(ethBalance)
      setPurchaseTokenBalance(ethBalance)
    } catch (e) {
      console.log("Can't get eth balance")
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
        console.log("Token contract not yet approved")
      } else {
        console.log("Token contract already approved")
      }
    } catch (e) {
      // value.toast(e);
      console.log("Can't find token allowance")
    }
  };

  const getPurchasedAmount = async () => {
    const instance = new web3.eth.Contract(crowdsaleAbi, crowdsaleAddress)

    try {
      let result = await instance.methods.crowdsales(dao.address).call()
      setPurchasedAmount(fromDecimals(result[4], 18))
    } catch (e) {
      value.toast(e)
      console.log("Can't find amount purchased")
    }
  }

  const getPurchaseList = async () => {
    const instance = new web3.eth.Contract(crowdsaleAbi, crowdsaleAddress)

    try {
      let result = await instance.methods.crowdsales(dao.address).call()

      console.log(result[0])

      switch (result[0]) {
        case "0":
          setPurchaseList("Public Sale")
          break;
        case "1":
          setPurchaseList("Accredited Investors")
        default:
          setPurchaseList("Private Sale")
      }
    } catch (e) {
      value.toast(e)
      console.log("Can't find amount purchased")
    }
  }

  const getAccessListId = async () => {
    const instance = new web3.eth.Contract(crowdsaleAbi, crowdsaleAddress)

    try {
      let result = await instance.methods.crowdsales(dao.address).call()

      if (result[0] == 0) {
        setEligibleBuyer(true)
      } else {
        checkEligibility(result[0])
      }
    } catch (e) {
      // value.toast(e)
      console.log("access list not accessible")
    }
  }

  const checkEligibility = async (listId) => {
    const instance = new web3.eth.Contract(accessListAbi, accessListAddress)

    try {
      let result = await instance.methods.isListed(listId, account).call()
      setEligibleBuyer(result)
    } catch (e) {
      // value.toast(e)
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
    let terms;

    try {
      hash = await fetchCrowdsaleTermsHash(dao.name, dao["members"][0].member);
      if (hash == "none") {
        setPurchaseTerms(null)

        if (!approveButton) {
          setCanPurchase(true)
        } else {
          setCanPurchase(false)
        }
      } else {
        terms = "https://ipfs.io/ipfs/" + hash.hash
        setPurchaseTerms(terms)
      }
    } catch (e) {
      console.log("Error retrieving crowdsale terms.")
    }
  }

  useEffect(() => {
    if (purchaseToken != ether) {
      getPurchaseTokenInfo()
      getPurchaseTokenBalance()
      checkPurchaseTokenAllowance()
    } else {
      setPurchaseTokenSymbol("Ether")
      setPurchaseTokenDecimals("18")
      getEthBalance()
    }
    getPurchaseList()
    getPurchasedAmount()
    getAccessListId()
  }, [account])

  useEffect(() => {
    getPurchaseTerms()
  }, [approveButton])

  useEffect(() => {
    const timer = setTimeout(() => {
      const remain = calculateTimeLeft(remainingTime)
      setTimeLeft(remain)
    }, 1000);

    return () => clearTimeout(timer);
  })

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

      if (!purchaseTerms) {
        setCanPurchase(true)
      }
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
    console.log(purchaseAmount_, address, instance, account)

    console.log('purchaseToken', purchaseToken);

    try {

      if (purchaseToken.toLowerCase() != ether) {
        try {
          let result = await instance.methods
            .callExtension(address, purchaseAmount_)
            .send({ from: account });
        } catch (e) {
          console.log("purchaseToken tx didn't go through")
          value.toast(e);
          value.setLoading(false);
        }
      } else {
        try {
          let result = await instance.methods
            .callExtension(address, purchaseAmount_)
            .send({ from: account, value: purchaseAmount_ });
        } catch (e) {
          console.log("ether tx didn't go through")
          value.toast(e);
          value.setLoading(false);
        }

      }


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

    console.log(purchasedAmount + " - " + purchaseAmount_)
    
    const purchaseLimit_ = parseInt(purchasedAmount) + parseInt(purchaseAmount_);
    console.log(purchaseLimit_, purchaseLimit)
    
    if (purchaseLimit_ > fromDecimals(purchaseLimit, 18)) {
      setError(`⛔️ Purchase amount of ${purchaseAmount_} exceeds amount available for sale, ${fromDecimals(purchaseLimit, 18)} ⛔️`)
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
        <Stack w="100%" spacing="40px">
          <Text><i>
            {dao.name.substring(0, 1).toUpperCase() + dao.name.substring(1)}
          </i> is currently running a sale of its token with the following details:</Text>
          <VStack align="flex-start">
            {/* <CrowdsaleDetail
              name={"DAO Token: "}
              input={dao.token["symbol"].toUpperCase()}
            /> */}
            {/* <CrowdsaleDetail
              name={"DAO Token Contract Address: "}
              input={dao.address.slice(0, 4) + "..." + dao.address.slice(-4)}
              link={getExplorerLink("address", dao.address)}
            /> */}
            <CrowdsaleDetail
              name={(purchaseToken != ether) ? "Purchase Token Contract Address: " : "Purchase Token: "}
              input={(purchaseToken != ether) ? purchaseToken.slice(0, 4) + "..." + purchaseToken.slice(-4) : "Ether"}
              link={(purchaseToken != ether) ? getExplorerLink("token", purchaseToken) : null}
            />
            <CrowdsaleDetail
              name={"Price of 1 DAO Token: "}
              input={`~${purchaseMultiplierRatio.toFixed(4)} ${(purchaseToken != ether) ? purchaseTokenSymbol : "Ether"} (${purchaseMultiplier} ${dao.token["symbol"].toUpperCase()} per ${(purchaseToken != ether) ? purchaseTokenSymbol : "Ether"})`}
            />
            <CrowdsaleDetail
              name={"Eligibility: "}
              input={purchaseList}
            />
            <CrowdsaleDetail
              name={"Sale Progress: "}
              input={`ending in ${timeLeft}`}
            />
            <br />
            <Progress w="100%" value={(purchasedAmount / fromDecimals(purchaseLimit, 18)) * 100} colorScheme={"green"} size={"sm"} />
            <VStack align={"flex-end"} w="100%">
              <Text>{purchasedAmount} / {fromDecimals(purchaseLimit, 18)} DAO Tokens</Text>

            </VStack>
          </VStack>
          <>
            {(eligibleBuyer) ? (
              <VStack w="100%">
                <HStack w="100%" justify={"center"}>
                  <Text pr="5px">
                    <b>I'd like to purchase</b>
                  </Text>
                  <Input w="15%" value={purchaseAmount} disabled />
                  <Text>
                    <b>DAO Token with</b>
                  </Text>
                  <NumInputField
                    name="amount_"
                    defaultValue={1}
                    min=".000000000000000001"
                    max={purchaseLimit / purchaseMultiplier}
                    onChange={handleChange}
                  />
                  <Text><b>Purchase Token</b></Text>
                </HStack>
                <br />
                <Center>
                  <VStack>
                    {purchaseTerms && (
                      <Checkbox onChange={() => handleDisclaimer()}>
                        I agree to the {" "}
                        <Text as="u">
                          <Link href={purchaseTerms} isExternal>
                            terms
                          </Link>
                        </Text>
                        {" "} of crowdsale
                      </Checkbox>
                    )}
                    <Box h="5px" />
                    {approveButton ? (
                      <Button w="100%" className="solid-btn" onClick={approveSpend}>
                        Allow KALI to use your {purchaseTokenSymbol}
                      </Button>
                    ) :
                      null
                    }
                    {canPurchase ? (
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
              </VStack>
            ) : (
              <Center>
                <Text><b>🚫 You are not eligible to participate in this crowdsale 🚫</b></Text>
              </Center>)}
          </>
          <Crowdsales sales={dao["extensions"]["crowdsale"]["details"]["purchase"]} symbol={dao.token["symbol"].toUpperCase()} />
        </Stack>
      </form>
      
    </>
  );
}
