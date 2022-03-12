import { Text, VStack, HStack, Box } from "@chakra-ui/react";
import KaliButton from "../elements/KaliButton";

export default function HomeTile(props) {
  return (
    <HStack id="landing-tile">
      <VStack>
        <Text fontSize="xl">
          <b>Launch DAOs</b> with Legal Benefits in Seconds
        </Text>
        <br></br>
        <HStack>
          <KaliButton onClick={props.setDeployerVisible}>
            Get Started
          </KaliButton>
        </HStack>
      </VStack>
    </HStack>
  );
}
