import { addresses } from "../constants/addresses";
import { blocks } from "../constants/blocks";

export async function fetchDaoNames(factory, web3, daoChain) {
  const names = [];

  const factoryBlock = blocks["factory"][daoChain];

  let currentBlock = await web3.eth.getBlockNumber();

  var intervalSize = 20000;

  let blocksToQuery = currentBlock - factoryBlock;

  let intervals;

  if(blocksToQuery <= intervalSize) {
    intervals = blocksToQuery;
    intervalSize = blocksToQuery;
  } else {
    intervals = parseInt(blocksToQuery / intervalSize);
  }

  for(let i=0; i < intervals; i++) {

    const events = await factory.getPastEvents("DAOdeployed", {
      fromBlock: factoryBlock + (intervalSize * i),
      toBlock: factoryBlock + (intervalSize * (i+1)),
    });

    for(let i=0; i < events.length; i++) {
      names.push(events[i]["returnValues"]["name"]);
    }
  }
  return names;
}
