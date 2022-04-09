import React, { useContext, useState } from "react";
import Router from "next/router";
import AppContext from "../../context/AppContext";
import {
  Text,
  List,
  ListItem,
  Stack,
  HStack,
  Spacer,
  Checkbox,
  Link,
  useToast,
} from "@chakra-ui/react";
import {
  getNetworkName,
  convertVotingPeriod,
  fromDecimals,
} from "../../utils/formatters";
import { addresses } from "../../constants/addresses";
import { factoryInstance } from "../../eth/factory";
import { presets } from "../../constants/presets";
import DashedDivider from "../elements/DashedDivider";
import KaliButton from "../elements/KaliButton";
import ContactForm from "../elements/ContactForm";
import ToS from "../elements/ToS";
import { fetchTokens } from "../../utils/fetchTokens";
import { pdf, BlobProvider } from "@react-pdf/renderer";
import fleek from "@fleekhq/fleek-storage-js";
import RicardianTemplate from "../legal/RicardianTemplate";
import DelawareOAtemplate from "../legal/DelawareOAtemplate";
import DelawareInvestmentClubTemplate from "../legal/DelawareInvestmentClubTemplate";
import DelawareUNAtemplate from "../legal/DelawareUNAtemplate";
import WyomingOAtemplate from "../legal/WyomingOAtemplate";
import SwissVerein from "../legal/SwissVerein";
import { supportedChains } from "../../constants/supportedChains";
import { calculateVotingPeriod } from "../../utils/helpers";
import { init, send } from "emailjs-com";

init(process.env.NEXT_PUBLIC_EMAIL_ID);

export default function Checkout({ details, daoNames }) {
  const value = useContext(AppContext);
  const { web3, chainId, loading, account } = value.state;
  const [disclaimers, setDisclaimers] = useState([false, false]);
  const [deployable, setDeployable] = useState(false);

  const toast = useToast();
  const handleEmail = (dao) => {
    // send email here!
    const network = getChain(chainId);
    console.log("network", network);
    const params = {
      dao: dao,
      network: network,
      email: details["email"],
      entity_type: details["legal"]["docType"],
    };

    send("default_service", "template_c37vmuw", params).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
        toast({
          title: "Success",
          description: "Email sent successfully!",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      },
      function (error) {
        console.log("FAILED!", error);
        toast({
          title: "Failed",
          description:
            "We were not able to send this email. Please contact us on our discord or at kalidao@protonmail.com.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    );
  };

  const isNameUnique = (name) => {
    if (daoNames != null) {
      if (name != null && daoNames.includes(name) === true) {
        value.toast("Name not unique. Choose another.");
        return false;
      }
    }
  };

  const handleDisclaimer = (num) => {
    console.log(num);
    let disclaimers_ = disclaimers;
    disclaimers_[num] = !disclaimers_[num];
    setDisclaimers(disclaimers_);
    let deployable_ = true;
    if (details["legal"]["docType"] == "Delaware Ricardian LLC") {
      for (let i = 0; i < disclaimers_.length; i++) {
        if (disclaimers_[i] == false) {
          deployable_ = false;
        }
      }
    } else {
      if (disclaimers_[num] === false) {
        deployable_ = false;
      }
    }
    console.log(disclaimers[num]);
    console.log(deployable_);
    setDeployable(deployable_);
  };

  // for use at the end
  let paused;
  if (details["governance"]["paused"] == 1) {
    paused = "restricted";
  } else {
    paused = "unrestricted";
  }

  let daoType;
  if (details["daoType"] == null) {
    daoType = "Custom";
  } else {
    daoType = presets[details["daoType"]]["type"];
  }

  const getChain = () => {
    for (var i = 0; i < supportedChains.length; i++) {
      if (supportedChains[i]["chainId"] == chainId) {
        return supportedChains[i]["name"];
      }
    }
  };

  const construct = async () => {
    let _blob;
    console.log("this is doctype at construct - ", details["legal"]["docType"])
    switch (details["legal"]["docType"]) {
      case "none":
        break;
      case "Delaware Series LLC (instant)":
        _blob = await pdf(
          RicardianTemplate({
            ricardianId: "[Token ID]",
          })
        ).toBlob();
        break;
      case "Delaware LLC (pending)":
        _blob = await pdf(
          DelawareOAtemplate({
            name: details["identity"]["daoName"],
            chain: getChain(),
          })
        ).toBlob();
        break;
      case "Delaware Investment Club":
        _blob = await pdf(
          DelawareInvestmentClubTemplate({
            name: details["identity"]["daoName"],
            chain: getChain(),
          })
        ).toBlob();
        break;
      case "Wyoming LLC (pending)":
        _blob = await pdf(
          WyomingOAtemplate({
            name: details["identity"]["daoName"],
            chain: getChain(),
          })
        ).toBlob();
        break;
      case "Delaware UNA (instant)":
        _blob = await pdf(
          DelawareUNAtemplate({
            name: details["identity"]["daoName"],
            chain: getChain(),
            mission: details["misc"]["mission"],
          })
        ).toBlob();
        break;
      case "Swiss Verein (pending)":
        _blob = await pdf(
          SwissVerein({
            name: details["identity"]["daoName"],
            city: details["misc"]["city"],
            project: details["misc"]["project"],
            mission: details["misc"]["mission"],
          })
        ).toBlob();
        break;
      case "Custom Entity Type (est. TBD)":
        break;
    }

    const input = {
      apiKey: process.env.NEXT_PUBLIC_FLEEK_API_KEY,
      apiSecret: process.env.NEXT_PUBLIC_FLEEK_API_SECRET,
      bucket: "f4a2a9f1-7442-4cf2-8b0e-106f14be163b-bucket",
      key: "Summoner of " + details["identity"]["daoName"] + " - " + account,
      data: _blob,
      httpUploadProgressCallback: (event) => {
        console.log(Math.round((event.loaded / event.total) * 100) + "% done");
      },
    };

    try {
      const result = await fleek.upload(input);
      console.log("Document hash from Fleek: " + result.hash);
      return result.hash;
    } catch (e) {
      console.log(e);
    }
  };

  const deploy = async () => {
    const docHash = await construct();

    if (!web3 || web3 == null) {
      value.toast(errorMessages["connect"]);
      return;
    }

    value.setLoading(true);

    let factory;
    try {
      factory = factoryInstance(addresses[chainId]["factory"], web3);
    } catch (e) {
      value.toast(e);
    }

    const { daoName, symbol } = details["identity"];

    if (isNameUnique(daoName) == false) {
      value.setLoading(false);
      return;
    }

    const { votingPeriod, votingPeriodUnit, paused, quorum, supermajority } =
      details["governance"];

    const docs = docHash;
    console.log("docs to before push", docs, details["legal"]["docType"], docHash);
    const { members, shares } = details["founders"];
    const { network, daoType } = details;
    const { tribute, redemption, crowdsale } = details["extensions"];
    console.log("tribute", tribute);

    const voting = calculateVotingPeriod(votingPeriod, votingPeriodUnit);
    console.log(voting);

    const govSettings = Array(
      voting,
      0,
      quorum,
      supermajority,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1
    );

    let extensionsArray = new Array();
    let extensionsData = new Array();

    // tribute
    extensionsArray.push(addresses[chainId]["extensions"]["tribute"]);
    extensionsData.push("0x");

    // Set up Encoded Params for Access List and Supply appropriate listId to Crowdsale
    // Encoded Params is pushed to extensionArray and extensionData at end of deploy()
    const listManager = require("../../abi/KaliAccessManager.json");
    const listManagerAddress = addresses[chainId]["access"];
    const listManagerContract = new web3.eth.Contract(
      listManager,
      listManagerAddress
    );
    let listManagerPayload;

    if (crowdsale["active"]) {
      extensionsArray.push(addresses[chainId]["extensions"]["crowdsale"]);

      var {
        listId,
        list,
        purchaseToken,
        purchaseMultiplier,
        purchaseLimit,
        saleEnds,
        documentation,
      } = crowdsale;

      if (listId == 333) {
        const listCount = await listManagerContract.methods.listCount().call();
        listId = parseInt(listCount) + 1;
        listManagerPayload = listManagerContract.methods
        .createList(list, "0x0")
        .encodeABI();
      }

      // console.log("purchaseLimit", purchaseLimit);
      purchaseLimit = purchaseLimit + "000000000000000000";
      if (saleEnds == 30) {
        let date = new Date();
        saleEnds = date.setDate(date.getDate() + 30);
      }

      saleEnds = parseInt(new Date(saleEnds).getTime() / 1000);

      if (purchaseToken === null) {
        purchaseToken = "0x000000000000000000000000000000000000dead";
      }

      if (purchaseLimit === null) {
        purchaseLimit = "10000000000000000000";
      }

      console.log(
        "crowdsale param",
        listId,
        list,
        purchaseToken,
        purchaseMultiplier,
        purchaseLimit,
        saleEnds,
        documentation
      );

      const sale = require("../../abi/KaliDAOcrowdsale.json");

      const saleAddress = addresses[chainId]["extensions"]["crowdsale"];

      const saleContract = new web3.eth.Contract(sale, saleAddress);

      const encodedParams = web3.eth.abi.encodeParameters(
        ["uint256", "address", "uint8", "uint96", "uint32", "string"],
        [
          listId,
          purchaseToken,
          purchaseMultiplier,
          purchaseLimit,
          saleEnds,
          documentation,
        ]
      );

      let payload = saleContract.methods
        .setExtension(encodedParams)
        .encodeABI();

      extensionsData.push(payload);
    }

    if (redemption["active"]) {
      extensionsArray.push(addresses[chainId]["extensions"]["redemption"]);
      // console.log(redemption);
      let { redemptionStart } = redemption;

      // getting token array
      let tokenArray = fetchTokens(chainId);
      // console.log(tokenArray);

      // let now = parseInt(new Date().getTime() / 1000);
      redemptionStart = parseInt(new Date(redemptionStart).getTime() / 1000);
      // console.log("redemption param", redemptionStart, tokenArray);

      const redemptionABI = require("../../abi/KaliDAOredemption.json");

      const redemptionAddress = addresses[chainId]["extensions"]["redemption"];

      const redemptionContract = new web3.eth.Contract(
        redemptionABI,
        redemptionAddress
      );

      const encodedParams = web3.eth.abi.encodeParameters(
        ["address[]", "uint256"],
        [tokenArray, redemptionStart]
      );

      let payload = redemptionContract.methods
        .setExtension(encodedParams)
        .encodeABI();

      extensionsData.push(payload);

      // loading token approval calls for redemptions
      const token = require("../../abi/ERC20.json");

      const amount = web3.utils.toWei("10000000", "ether");

      for (let i = 0; i < tokenArray.length; i++) {
        const tokenContract = new web3.eth.Contract(token, tokenArray[i]);
        let approvalPayload = tokenContract.methods
          .approve(redemptionAddress, amount)
          .encodeABI();

        extensionsArray.push(tokenArray[i]);
        extensionsData.push(approvalPayload);
      }
    }

    if (crowdsale["active"] && crowdsale["listId"] === 333) {
      extensionsArray.push(listManagerAddress)
      extensionsData.push(listManagerPayload)
    } 

    // console.log("extensionsArray", extensionsArray);
    // console.log("extensionsData", extensionsData);

    console.log(
      "deployment param",
      daoName,
      symbol,
      docs,
      paused,
      extensionsArray,
      extensionsData,
      members,
      shares,
      govSettings
    );

    var gasPrice_ = await web3.eth.getGasPrice();
    var BN = web3.utils.BN;
    let gasPrice = new BN(gasPrice_).toString();

    try {
      let result = await factory.methods
        .deployKaliDAO(
          daoName,
          symbol,
          docs,
          paused,
          extensionsArray,
          extensionsData,
          members,
          shares,
          govSettings
        )
        .send({ from: account, gasPrice: gasPrice });

      let dao = result["events"]["DAOdeployed"]["returnValues"]["kaliDAO"];
      console.log(dao);
      console.log(result);

      Router.push({
        pathname: "/daos/[dao]",
        query: { dao: dao },
      });

      if (details["email"] != null) {
        handleEmail(dao);
      }
    } catch (e) {
      value.toast(e);
      console.log(e);
    }

    value.setLoading(false);
  };

  const checkoutDetails = [
    {
      name: "Chain",
      details: getNetworkName(details["network"]).replace(/^\w/, (s) =>
        s.toUpperCase()
      ),
    },
    {
      name: "Name",
      details: details["identity"]["daoName"],
    },
    {
      name: "Symbol",
      details: details["identity"]["symbol"],
    },
    {
      name: "Type",
      details: daoType,
    },
    {
      name: "Members",
      details: details["founders"]["members"],
    },
    {
      name: "Voting period",
      details: convertVotingPeriod(
        calculateVotingPeriod(
          details["governance"]["votingPeriod"],
          details["governance"]["votingPeriodUnit"]
        )
      ),
    },
    {
      name: "Share transferability",
      details: paused,
    },
    {
      name: "Quorum",
      details: details["governance"]["quorum"] + "%",
    },
    {
      name: "Supermajority",
      details: details["governance"]["supermajority"] + "%",
    },
    {
      name: "Legal Entity",
      details: details["legal"]["docType"],
    },
  ];

  return (
    <>
      <Stack id="checkout">
        {checkoutDetails.map((item, index) => (
          <>
            {Array.isArray(item.details) ? ( // members array
              <>
                <Text>{item.name}</Text>
                <List>
                  {item.details.map((member, i) => (
                    <ListItem key={i}>
                      {member} (
                      {fromDecimals(details["founders"].shares[i], 18)} shares)
                    </ListItem>
                  ))}
                </List>
              </>
            ) : (
              <HStack>
                <Text>{item.name}</Text>
                <Spacer />
                <Text>{item.details}</Text>
              </HStack>
            )}
            <DashedDivider />
          </>
        ))}
      </Stack>
      <br></br>
      <Checkbox onChange={() => handleDisclaimer(0)}>
        I agree to the <ToS label="Terms of Service" id="tos" />
      </Checkbox>
      {details["legal"]["docType"] == "Delaware Ricardian LLC" ? (
        <Checkbox onChange={() => handleDisclaimer(1)}>
          I agree to the{" "}
          <Link href="https://gateway.pinata.cloud/ipfs/QmdHFNxtecmCNcTscWJqnA4AiASyk3SHCgKamugLHqR23i">
            <i>Series LLC terms</i>
          </Link>
          .
        </Checkbox>
      ) : null}
      <br></br>

      <KaliButton id="deploy-btn" disabled={!deployable} onClick={deploy}>
        Deploy Your DAO!
      </KaliButton>
      <br></br>
      <HStack>
        <Text fontWeight={400}>
          {" "}
          <Link href="https://kalico.typeform.com/to/FNsxHBKX">
            <i>Need LLC Filing Help?</i>
          </Link>
        </Text>
      </HStack>
      <br></br>
      <HStack>
        <Text fontWeight={400}>Have questions?</Text>
        <ContactForm />
      </HStack>
    </>
  );
}
