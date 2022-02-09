import { Text, VStack, HStack, Box } from "@chakra-ui/react";
import KaliButton from "../elements/KaliButton";
import landing from "../../public/img/landing.png";
import ContactForm from "../elements/ContactForm";
import Image from "next/image";

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
