import {
  Text,
  HStack,
  Stack,
  Button,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiTwitter, FiGithub, FiUsers } from "react-icons/fi";
import ToS from "../elements/ToS";

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
    <HStack minH="10vh" minW="auto" id="footer">
      <Text fontSize="xs">
        Summoned with{" "}
        <a href="https://twitter.com/lex_DAO" target="_blank" rel="noreferrer">
          <i>LexDAO</i>
        </a>
      </Text>
      <ToS label="ToS" id="tos-button" />
      <Spacer />
      <Stack
        direction={"row"}
        spacing={-1}
        border="1px solid"
        borderRadius="xl"
      >
        <SocialButton href={"https://github.com/kalidao"}>
          <FiGithub />
        </SocialButton>
        <SocialButton href={"https://twitter.com/_KaliDAO"}>
          <FiTwitter />
        </SocialButton>
        <SocialButton href={"https://discord.com/invite/UKCS9ghzUE"}>
          <FiUsers />
        </SocialButton>
      </Stack>
    </HStack>
  );
}
