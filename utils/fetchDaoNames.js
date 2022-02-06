import { addresses } from "../constants/addresses";
import { blocks } from "../constants/blocks";
import { fetchEvents } from "./fetchEvents";

export async function fetchDaoNames(factory, web3, daoChain) {
  let eventName = "DAOdeployed";

  const factoryBlock = blocks["factory"][daoChain];

  let events = await fetchEvents(
    factory,
    web3,
    factoryBlock,
    eventName,
    daoChain
  );

  const names = [];
  for(let i=0; i < events.length; i++) {
    names.push(events[i]["name"]);
  }

  return names;
}
