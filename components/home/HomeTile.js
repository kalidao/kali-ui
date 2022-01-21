import { Text, VStack, HStack } from "@chakra-ui/react";
import ContactForm from "../elements/ContactForm";
import KaliButton from "../elements/KaliButton";
import landing from "../../public/img/landing.png";

export default function HomeTile(props) {
  return (
    <HStack alignItems="center">
      <img id="logo" src={landing.src} height={landing.height * .8} width={landing.width * .8} alt="Kali" />
      <VStack>
        <Text fontSize="xl">
          <b>Simplify your Business with Smart Agreements</b>
        </Text>
        <br></br>
        <KaliButton onClick={props.setDeployerVisible}>Get Started</KaliButton>
        {/* <ContactForm /> */}
      </VStack>
    </HStack>
  );
}
