import { Button, Box, Text, VStack, HStack, Image, Divider } from "@chakra-ui/react";
import ContactForm from "../elements/ContactForm";
import FlexGradient from "../elements/FlexGradient";
import KaliButton from "../elements/KaliButton";

export default function HomeTile(props) {
  return (
 
      <HStack spacing={250} p={250} alignItems="center">

        <VStack>
          <Text fontSize="xl">
            <b>Simplify your business with smart contracts</b>
          </Text>
          <br></br>
          <KaliButton onClick={props.setDeployerVisible}>Get Started</KaliButton>
          {/* <ContactForm /> */}
        </VStack>
      </HStack>
    
  );
}
