import { WrapItem, Text } from "@chakra-ui/react";
import { truncateAddress, fromDecimals } from "../../utils/formatters";

export default function Sale({ purchaser, purchased, key }) {

    return (
        <WrapItem
        bg="hsl(0, 92%, 6%, 20%)"
        color="kali.900"
        p="2"
        mb="4"
        borderRadius="3xl"
        key={key}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >    
        <Text>{truncateAddress(purchaser)} bought <b>{fromDecimals(purchased, 18)}</b></Text>
      </WrapItem>
    );
}
