import {
  Text,
  HStack,
  Stack,
  Button,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiTwitter, FiGithub } from "react-icons/fi";

const SocialButton = (props) => {
  return (
    <Button
      border="none"
      variant="none"
      bg="none"
      rounded={"full"}
      as={"a"}
      href={props.href}
      target="_blank"
    >
      {props.children}
    </Button>
  );
};

export default function Footer() {
  return (
    <HStack minH="10vh" minW="auto" spacing={4} id="footer">
      <Text fontSize="xs">
        Summoned with{" "}
        <a href="https://twitter.com/lex_DAO" target="_blank" rel="noreferrer">
          <i>LexDAO</i>
        </a>
      </Text>
      <Spacer />
      <Stack direction={"row"} spacing={4} border="1px solid" borderRadius="xl">
        <SocialButton href={"https://github.com/lexDAO/Kali"}>
          <FiGithub />
        </SocialButton>
        <SocialButton href={"https://twitter.com/_KaliDAO"}>
          <FiTwitter />
        </SocialButton>
      </Stack>
    </HStack>
  );
}
