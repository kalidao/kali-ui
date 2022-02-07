import { proposalTypes } from "../constants/params";
import { addresses } from "../constants/addresses";
import { tokens } from "../constants/tokens";
import { blocks } from "../constants/blocks";
import { fetchEvents } from "./fetchEvents";

// functions to retrieve data from blockchain

export async function fetchDaoInfo(
  instance,
  factory,
  address,
  web3,
  daoChain,
  account
) {

  const factoryBlock = blocks["factory"][daoChain];

  const ricardianBlock = blocks["ricardian"][daoChain];

  const name = await instance.methods.name().call();

  const symbol = await instance.methods.symbol().call();

  const decimals = parseInt(await instance.methods.decimals().call());

  const totalSupply = parseInt(await instance.methods.totalSupply().call());

  const paused = await instance.methods.paused().call();

  const votingPeriod = parseInt(await instance.methods.votingPeriod().call());

  const quorum = parseInt(await instance.methods.quorum().call());

  const supermajority = parseInt(await instance.methods.supermajority().call());

  const docs = await fetchDocs(factory, address, web3, factoryBlock, daoChain);

  const proposalVoteTypes = await fetchProposalVoteTypes(instance);

  const balances = await fetchBalances(address, web3, daoChain);

  const ricardian = await fetchRicardian(address, web3, factory, daoChain, ricardianBlock);

  const extensions = await fetchExtensions(
    instance,
    daoChain,
    web3,
    address,
    balances
  );

  const members = await fetchMembers(instance, web3, daoChain, factoryBlock);

  const dao_ = {
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
    balances,
    extensions,
    ricardian,
    members,
  };

  return { dao_ };
}

// helper functions for main getter function
async function fetchDocs(factory, address, web3, factoryBlock, daoChain) {

  let eventName = "DAOdeployed";

  let events = await fetchEvents(
    factory,
    web3,
    factoryBlock,
    eventName,
    daoChain
  );

  let docs;

  for (let i = 0; i < events.length; i++) {
    try {
      const dao = events[i]["kaliDAO"];

      if (dao.toLowerCase() == address.toLowerCase()) {
        docs = events[i]["docs"];
      }
    } catch(e) {
      console.log(e);
    }
  }

  return docs;
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
  console.log("tokenArray", tokenArray)
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

export async function fetchMembers(instance, web3, daoChain, factoryBlock) {

  let eventName = "Transfer";

  let events = await fetchEvents(
    instance,
    web3,
    factoryBlock,
    eventName,
    daoChain
  );

  const holdersArray_ = [];

  const dupes = [];

  for (let k = 0; k < events.length; k++) {
    let holder = events[k]["to"];

    dupes[k] = holder;
  }


  // unique list of addresses
  const uniques = dupes.filter((v, i, a) => a.indexOf(v) === i);

  for (let k = 0; k < uniques.length; k++) {
    let holder = uniques[k];

    let shares = await instance.methods.balanceOf(holder).call();

    if (shares > 0) {
      holdersArray_.push({ member: holder, shares: shares });
    }
  }

  return holdersArray_;
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

async function fetchRicardian(address, web3, factory, daoChain, ricardianBlock) {

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
