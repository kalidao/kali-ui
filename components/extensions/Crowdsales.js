import { Heading, Box } from "@chakra-ui/react";
import Sale from "./Sale";

export default function Crowdsales({ sales, symbol }) {

  console.log("sales", sales)
  return (
    <Box maxWidth="100%" >
        <Heading>Sales</Heading>
        {sales.length > 0 ? sales.map((sale, index) => <Sale purchaser={sale["purchaser"]} purchased={sale["purchased"]} key={index} symbol={symbol} />) : "No sales yet!"}
    </Box>
  )
}