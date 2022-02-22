import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

export default function WelcomeAlert() {
  return (
    <Alert
      status="success"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="300px"
      borderRadius="2xl"
      bg="kali.400"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="xl">
        DAO Summoned!
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        Thanks for creating a DAO with KALI! Your DAO has been successfully
        created. We are fetching it from the blockchain. This process may take a
        while, make yourself a cup of coffee ☕
      </AlertDescription>
    </Alert>
  );
}
