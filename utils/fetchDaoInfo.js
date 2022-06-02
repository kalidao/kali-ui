import DAO_ABI from '../abi/KaliDAO.json'
import { useContractRead } from 'wagmi'
import { getDaoChain } from './getDaoChain'

// functions to retrieve data from blockchain

// export async function fetchStaticInfo(
//   instance,
//   address,
//   daoChain,
// ) {
//   let dao_;
//   try {
//     const result = await fetch(graph[daoChain], {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         query: `query {
//           daos(where: {
//             id: "${address.toLowerCase()}"
//           }) {
//             id
//             token {
//               id
//               name
//               symbol
//               paused
//               totalSupply
//             }
//             docs
//             votingPeriod
//             gracePeriod
//             quorum
//             supermajority
//             members {
//               address
//               shares
//             }
//             proposals
//             tribute {
//               active
//             }
//             crowdsale {
//               active
//               amountPurchased
//               details
//               listId
//               purchaseLimit
//               purchaseMultiplier
//               purchaseToken
//               saleEnds
//             }
//             redemption {
//               active
//               starts
//               redeemables
//             }
//           }
//         }`,
//       }),
//     }).then((res) => res.json());
//     console.log("RESULT", result);
//     const data = result["data"]["daos"][0];
//     console.log("DAO DATA", data);

//     const name = data["token"]["name"];

//     const symbol = data["token"]["symbol"];

//     const decimals = 18;

//     const paused = data["token"]["paused"];

//     const votingPeriod = parseInt(data["votingPeriod"]);

//     const quorum = parseInt(data["quorum"]);

//     const supermajority = parseInt(data["supermajority"]);

//     const docs = data["docs"];

//     const proposalVoteTypes = await fetchProposalVoteTypes(instance);

//     const members = await validateMembers(data);

//     let extensions = {
//       tribute: {
//         address: addresses[daoChain]["extensions"]["tribute"]
//       }
//     }

//     // console.log('data crowdsale', data["crowdsale"])
//     console.log('data redemption', data["crowdsale"])
//     if (data["crowdsale"] != null) {
//       const crowdsaleObject = {
//         crowdsale: {
//           address: addresses[daoChain]["extensions"]["crowdsale"],
//           details: {
//             listId: data["crowdsale"]["listId"],
//             purchaseToken: data["crowdsale"]["purchaseToken"],
//             purchaseMultiplier: data["crowdsale"]["purchaseMultiplier"],
//             purchaseLimit: data["crowdsale"]["purchaseLimit"],
//             amountPurchased: data["crowdsale"]["amountPurchased"],
//             saleEnds: data["crowdsale"]["saleEnds"],
//             details: data["crowdsale"]["details"],
//           }
//         }
//       }
//       extensions = Object.assign(extensions, crowdsaleObject)
//       console.log('extensions crowdsale', extensions)
//     }
//     console.log('data redemption', data["redemption"])
//     if (data["redemption"] != null) {
//       const redemption = {
//         redemption: {
//           address: addresses[daoChain]["extensions"]["redemption"],
//           details: {
//             redeemables: data["redemption"]["redeemables"],
//             redemptionStarts: data["redemption"]["starts"],
//           }
//         }
//       }
//       extensions = Object.assign(extensions, redemption)
//       console.log('extensions redemption', extensions)
//     }

//     dao_ = {
//       address,
//       name,
//       token: {
//         symbol,
//         decimals,
//         totalSupply,
//         paused,
//       },
//       gov: {
//         votingPeriod,
//         quorum,
//         supermajority,
//         proposalVoteTypes,
//       },
//       docs,
//       members,
//       extensions
//     };
//   } catch (e) {}

//   return { dao_ };
// }

// async function fetchProposalVoteTypes(instance) {
//   const proposalVoteTypes_ = [];
//   for (const [key, value] of Object.entries(proposalTypes)) {
//     const voteType = await instance.methods.proposalVoteTypes(key).call();
//     proposalVoteTypes_.push(voteType);
//   }
//   return proposalVoteTypes_;
// }

// export async function fetchBalances(address, web3, daoChain) {
//   const abi = require("../abi/ERC20.json");
//   const tokenBalances = [];
//   let tokenArray = tokens[daoChain];
//   console.log("tokenArray", tokenArray);
//   for (const [key, value] of Object.entries(tokenArray)) {
//     let token = tokenArray[key];
//     const contract = new web3.eth.Contract(abi, token["address"]);
//     const balance = await contract.methods.balanceOf(address).call();
//     tokenBalances.push({
//       token: key,
//       address: token["address"],
//       decimals: token["decimals"],
//       balance: balance,
//     });
//   }
//   const ethBalance = await web3.eth.getBalance(address);
//   tokenBalances.push({
//     token: "ETH",
//     address: "0x0000000000000000000000000000000000000000",
//     decimals: 18,
//     balance: ethBalance,
//   });
//   return tokenBalances;
// }

// export function validateMembers(data) {
//   const membersArray = [];
//   for (let i = 0; i < data["members"].length; i++) {
//     membersArray.push({
//       member: data["members"][i]["address"],
//       shares: data["members"][i]["shares"],
//     });
//   }
//   return membersArray;
// }

// export async function fetchExtensions(
//   instance,
//   daoChain,
//   web3,
//   address,
//   balances
// ) {
//   let result;
//   var extensionsCount = 0;
//   const extensionArray = [];
//   let ext = addresses[daoChain]["extensions"];
//   for (const [key, value] of Object.entries(ext)) {
//     let bool = await instance.methods.extensions(value).call();
//     console.log("bool", bool, key);
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
//   console.log("extensionArray", extensionArray);
//   if (extensionsCount > 0) {
//     result = extensionArray;
//   } else {
//     result = null;
//   }
//   console.log("result", result);
//   return result;
// }

// // helper functions for main getter function

// async function fetchCrowdsale(web3, address, extAddress, balances) {
//   const extAbi = require("../abi/KaliDAOcrowdsale.json");

//   let details;

//   const crowdsale = new web3.eth.Contract(extAbi, extAddress);

//   details = await crowdsale.methods.crowdsales(address).call();

//   for (var i = 0; i < balances.length; i++) {
//     if (
//       web3.utils.toChecksumAddress(balances[i]["address"]) ==
//       web3.utils.toChecksumAddress(details["purchaseToken"])
//     ) {
//       details["tokenName"] = balances[i]["token"];
//       details["decimals"] = balances[i]["decimals"];
//     }
//   }

//   return details;
// }

// async function fetchRedemption(web3, address, extAddress, balances) {
//   const extAbi = require("../abi/KaliDAOredemption.json");

//   let details;

//   const redemption = new web3.eth.Contract(extAbi, extAddress);

//   let redeemables = await redemption.methods.getRedeemables(address).call();

//   let redemptionStarts = await redemption.methods
//     .redemptionStarts(address)
//     .call();

//   details = {
//     redeemables: redeemables,
//     redemptionStarts: redemptionStarts,
//   };

//   return details;
// }

// export async function fetchRicardian(
//   address,
//   web3,
//   factory,
//   daoChain,
//   ricardianBlock
// ) {
//   let eventName = "Transfer";

//   const abi_ = require("../abi/RicardianLLC.json");
//   const address_ = addresses[daoChain]["ricardian"];
//   const contract_ = new web3.eth.Contract(abi_, address_);

//   let events = await fetchEvents(
//     contract_,
//     web3,
//     ricardianBlock,
//     eventName,
//     daoChain
//   );

//   var ricardian = null;

//   let series;

//   for (var i = 0; i < events.length; i++) {
//     let to = events[i]["to"];
//     if (
//       web3.utils.toChecksumAddress(to) == web3.utils.toChecksumAddress(address)
//     ) {
//       series = events[i]["tokenId"];
//       const commonURI = await contract_.methods.commonURI().call();
//       const masterOperatingAgreement = await contract_.methods
//         .masterOperatingAgreement()
//         .call();
//       const name = await contract_.methods.name().call();
//       ricardian = { series, commonURI, masterOperatingAgreement, name };
//     }
//   }

//   return ricardian;
// }

export const getVotingPeriod = async ({ address }) => {
  if (!address) return
  const chainId = getDaoChain(address)
  const { data, isError, isLoading } = useContractRead(
    {
      addressOrName: address,
      contractInterface: DAO_ABI,
    },
    'votingPeriod',
    {
      chainId: chainId,
    },
    {
      onSettled(data, error) {
        return { data, error }
      },
    },
  )
}
