import { Text, VStack, HStack, Box } from "@chakra-ui/react";
import KaliButton from "../elements/KaliButton";
import landing from "../../public/img/landing.png";

export default function HomeTile(props) {
  return (
    <HStack alignItems="center" id="landing-tile">
      <Box
        id="landing-tile-left"
        display={{sm: 'none', md: 'block', lg: 'block', xl: 'lg', '2xl': 'block'}}
      >
        <img src={landing.src} height={landing.height * .8} width={landing.width * .8} alt="Kali" />
      </Box>
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
