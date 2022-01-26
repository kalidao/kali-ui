import { Text, VStack, HStack } from "@chakra-ui/react";
import KaliButton from "../elements/KaliButton";
import landing from "../../public/img/landing.png";

export default function HomeTile(props) {
  return (
    <HStack spacing={250} p={250} alignItems="center" id="landing-tile">
      <VStack id="landing-tile-right">
        <Text fontSize="xl">
          <b>Simplify your Business</b> with Smart Agreements
        </Text>
        <br></br>
        <KaliButton onClick={props.setDeployerVisible}>Get Started</KaliButton>
      </VStack>
    </HStack>
  );
}
