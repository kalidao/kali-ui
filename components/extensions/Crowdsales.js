import { Heading } from "@chakra-ui/react";
import Sale from "./Sale";

export default function Crowdsales({ sales }) {

  console.log("sales", sales)
  return (
    <div>
        <Heading>Sales</Heading>
        {sales.length > 0 ? sales.map((sale, index) => <Sale purchaser={sale["purchaser"]} purchased={sale["purchased"]} key={index} />) : "No sales yet!"}
    </div>
  )
}