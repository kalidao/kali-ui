import { Text, VStack, HStack } from "@chakra-ui/react";
import ContactForm from "../elements/ContactForm";
import KaliButton from "../elements/KaliButton";
import landing from "../../public/img/landing.png";

export default function HomeTile(props) {
  return (
    <HStack alignItems="center" id="landing-tile">
      <div id="landing-tile-left">
        <img src={landing.src} height={landing.height * .8} width={landing.width * .8} alt="Kali" />
      </div>
      <VStack id="landing-tile-right">
        <Text fontSize="xl">
          <b>Simplify your Business</b> with Smart Agreements
        </Text>
        <br></br>
        <KaliButton onClick={props.setDeployerVisible}>Get Started</KaliButton>
        {/* <ContactForm /> */}
      </VStack>
    </HStack>
  );
}
