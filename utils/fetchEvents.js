import { supportedChains } from "../constants/supportedChains";

export async function fetchEvents(
    instance,
    web3,
    firstBlock,
    eventName,
    chain
  ) {

  const eventArray = [];

  var intervalSize = getIntervalSize(chain);

  let currentBlock = await web3.eth.getBlockNumber();

  let blocksToQuery = currentBlock - firstBlock;

  let intervals;

  if(blocksToQuery <= intervalSize || intervalSize == null) {
    intervals = 1;
    intervalSize = blocksToQuery;
  } else {
    intervals = parseInt(blocksToQuery / intervalSize);
  }

  for(let i=0; i < intervals; i++) {
    const events = await instance.getPastEvents(eventName, {
      fromBlock: firstBlock + (intervalSize * i),
      toBlock: firstBlock + (intervalSize * (i+1)),
    });
    for(let j=0; j < events.length; j++) {
      eventArray.push(events[j]["returnValues"]);
    }
  }

  return eventArray;
}

function getIntervalSize(chain) {
  let intervalSize;
  for(let i=0; i < supportedChains.length; i++) {
    if(supportedChains[i].chainId == chain) {
      intervalSize = supportedChains[i].maxBlocks;
    }
  }
  return intervalSize;
}
