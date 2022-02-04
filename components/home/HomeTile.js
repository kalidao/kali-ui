import { Text, VStack, HStack, Box } from "@chakra-ui/react";
import KaliButton from "../elements/KaliButton";
import landing from "../../public/img/landing.png";
import ContactForm from "../elements/ContactForm";
import Image from "next/image";

export default function HomeTile(props) {
  return (
    <HStack alignItems="center" id="landing-tile">
      <Box
        id="landing-tile-left"
        display={{
          sm: "none",
          md: "block",
          lg: "block",
          xl: "lg",
          "2xl": "block",
        }}
      >
        <Image
          src={landing.src}
          height={landing.height * 0.8}
          width={landing.width * 0.8}
          alt="Kali"
        />
      </Box>
      <VStack id="landing-tile-right">
        <Text fontSize="xl">
          <b>Simplify your Business</b> with Smart Agreements
        </Text>
        <br></br>
        <HStack>
          <KaliButton onClick={props.setDeployerVisible}>
            Get Started
          </KaliButton>
          <ContactForm />
        </HStack>
      </VStack>
    </HStack>
  );
}
