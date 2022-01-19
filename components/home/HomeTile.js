import { Text, VStack, HStack } from "@chakra-ui/react";
import ContactForm from "../elements/ContactForm";
import KaliButton from "../elements/KaliButton";

export default function HomeTile(props) {
  return (
    <HStack spacing={250} p={250} alignItems="center">
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
