import { proposalTypes } from "../constants/params";
import { addresses } from "../constants/addresses";
import { tokens } from "../constants/tokens";
import { blocks } from "../constants/blocks";
import { fetchEvents } from "./fetchEvents";
import { graph } from "../constants/graph";

// functions to retrieve data from blockchain

export async function fetchStaticInfo(
  instance,
  factory,
  address,
  web3,
  daoChain,
  account
) {
  let dao_;
  try {
    const result = await fetch(graph[daoChain], {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query {
          daos(where: {
            id: "${address.toLowerCase()}"
          }) {
            id
            token {
              id
              name
              symbol
              paused
            }
            docs
            votingPeriod
            gracePeriod
            quorum
            supermajority
            members {
              address
              shares
            }
            proposals
            extensions
          }
        }`,
      }),
    }).then((res) => res.json());
    console.log("RESULT", result);
    const data = result["data"]["daos"][0];
    console.log("DAO", data);

    const name = data["token"]["name"];

    const symbol = data["token"]["symbol"];

    const decimals = 18;

    const totalSupply = parseInt(await instance.methods.totalSupply().call());

    const paused = data["token"]["paused"];

    const votingPeriod = parseInt(data["votingPeriod"]);

    const quorum = parseInt(data["quorum"]);

    const supermajority = parseInt(data["supermajority"]);

    const docs = data["docs"];

    const factoryBlock = blocks["factory"][daoChain];

    const ricardianBlock = blocks["ricardian"][daoChain];

    const proposalVoteTypes = await fetchProposalVoteTypes(instance);

    const members = await fetchMembers(data);

    // const extArray = data["extensions"];
    // console.log("Extensions", extArray);
    // const extensions = validateExtensions(extArray);

    dao_ = {
      address,
      name,
      token: {
        symbol,
        decimals,
        totalSupply,
        paused,
      },
      gov: {
        votingPeriod,
        quorum,
        supermajority,
        proposalVoteTypes,
      },
      docs,
      members,
    };
  } catch (e) {}

  return { dao_ };
}

export async function fetchMoreInfo(
  instance,
  factory,
  address,
  web3,
  daoChain,
  account
) {
  const factoryBlock = blocks["factory"][daoChain];

  const ricardianBlock = blocks["ricardian"][daoChain];

  const balances = await fetchBalances(address, web3, daoChain);

  const ricardian = await fetchRicardian(
    address,
    web3,
    factory,
    daoChain,
    ricardianBlock
  );

  const extensions = await fetchExtensions(
    instance,
    daoChain,
    web3,
    address,
    balances
  );

  return { balances, ricardian, extensions };
}

async function fetchProposalVoteTypes(instance) {
  const proposalVoteTypes_ = [];
  for (const [key, value] of Object.entries(proposalTypes)) {
    const voteType = await instance.methods.proposalVoteTypes(key).call();
    proposalVoteTypes_.push(voteType);
  }
  return proposalVoteTypes_;
}

async function fetchBalances(address, web3, daoChain) {
  const abi = require("../abi/ERC20.json");
  const tokenBalances = [];
  let tokenArray = tokens[daoChain];
  console.log("tokenArray", tokenArray);
  for (const [key, value] of Object.entries(tokenArray)) {
    let token = tokenArray[key];
    const contract = new web3.eth.Contract(abi, token["address"]);
    const balance = await contract.methods.balanceOf(address).call();
    tokenBalances.push({
      token: key,
      address: token["address"],
      decimals: token["decimals"],
      balance: balance,
    });
  }
  const ethBalance = await web3.eth.getBalance(address);
  tokenBalances.push({
    token: "eth",
    address: "0x0000000000000000000000000000000000000000",
    decimals: 18,
    balance: ethBalance,
  });
  return tokenBalances;
}

export async function fetchMembers(data) {
  const membersArray = [];
  for (let i = 0; i < data["members"].length; i++) {
    membersArray.push({
      member: data["members"][i]["address"],
      shares: data["members"][i]["shares"],
    });
  }
  return membersArray;
}

async function fetchExtensions(instance, daoChain, web3, address, balances) {
  let result;
  var extensionsCount = 0;
  const extensionArray = [];
  let ext = addresses[daoChain]["extensions"];
  for (const [key, value] of Object.entries(ext)) {
    let bool = await instance.methods.extensions(value).call();
    console.log("bool", bool, key);
    if (bool == true) {
      extensionsCount++;
      let extAddress = value;
      let extDetails;
      if (key == "crowdsale") {
        extDetails = await fetchCrowdsale(web3, address, extAddress, balances);
      }
      if (key == "redemption") {
        extDetails = await fetchRedemption(web3, address, extAddress, balances);
      }
      extensionArray[key] = { address: extAddress, details: extDetails };
    }
  }
  console.log("extensionArray", extensionArray);
  if (extensionsCount > 0) {
    result = extensionArray;
  } else {
    result = null;
  }
  console.log("result", result);
  return result;
}

// helper functions for main getter function

async function fetchCrowdsale(web3, address, extAddress, balances) {
  const extAbi = require("../abi/KaliDAOcrowdsale.json");

  let details;

  const crowdsale = new web3.eth.Contract(extAbi, extAddress);

  details = await crowdsale.methods.crowdsales(address).call();

  for (var i = 0; i < balances.length; i++) {
    if (
      web3.utils.toChecksumAddress(balances[i]["address"]) ==
      web3.utils.toChecksumAddress(details["purchaseToken"])
    ) {
      details["tokenName"] = balances[i]["token"];
      details["decimals"] = balances[i]["decimals"];
    }
  }

  return details;
}

async function fetchRedemption(web3, address, extAddress, balances) {
  const extAbi = require("../abi/KaliDAOredemption.json");

  let details;

  const redemption = new web3.eth.Contract(extAbi, extAddress);

  let redeemables = await redemption.methods.getRedeemables(address).call();

  let redemptionStarts = await redemption.methods
    .redemptionStarts(address)
    .call();

  details = {
    redeemables: redeemables,
    redemptionStarts: redemptionStarts,
  };

  return details;
}

async function fetchRicardian(
  address,
  web3,
  factory,
  daoChain,
  ricardianBlock
) {
  let eventName = "Transfer";

  const abi_ = require("../abi/RicardianLLC.json");
  const address_ = addresses[daoChain]["ricardian"];
  const contract_ = new web3.eth.Contract(abi_, address_);

  let events = await fetchEvents(
    contract_,
    web3,
    ricardianBlock,
    eventName,
    daoChain
  );

  var ricardian = null;

  let series;

  for (var i = 0; i < events.length; i++) {
    let to = events[i]["to"];
    if (
      web3.utils.toChecksumAddress(to) == web3.utils.toChecksumAddress(address)
    ) {
      series = events[i]["tokenId"];
      const commonURI = await contract_.methods.commonURI().call();
      const masterOperatingAgreement = await contract_.methods
        .masterOperatingAgreement()
        .call();
      const name = await contract_.methods.name().call();
      ricardian = { series, commonURI, masterOperatingAgreement, name };
    }
  }

  return ricardian;
}

// async function validateExtensions(ext) {
//   let extensions = [];
//   let availableExt = addresses[daoChain]["extensions"];
//   for (const [key, value] of Object.entries(availableExt)) {
//     let bool = await instance.methods.extensions(value).call();
//     if (ext[i]) console.log("bool", bool, key);
//     if (bool == true) {
//       extensionsCount++;
//       let extAddress = value;
//       let extDetails;
//       if (key == "crowdsale") {
//         extDetails = await fetchCrowdsale(web3, address, extAddress, balances);
//       }
//       if (key == "redemption") {
//         extDetails = await fetchRedemption(web3, address, extAddress, balances);
//       }
//       extensionArray[key] = { address: extAddress, details: extDetails };
//     }
//   }
//   return { extensions };
// }
