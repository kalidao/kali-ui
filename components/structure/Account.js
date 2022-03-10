import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Button, Image, Text } from "@chakra-ui/react";
import { truncateAddress } from "../../utils/formatters";
import useENS from "../hooks/useENS";

export default function Account(props) {
  const value = useContext(AppContext);
  const { account } = value.state;
  const { ensName, ensAvatar } = useENS(account);

  const copy = async () => {
    await navigator.clipboard.writeText(account);
    alert("Text copied");
  };

  return (
    <Button variant="link" onClick={value.connect} border="none">
      {ensAvatar && (
        <Image
          src={ensAvatar}
          alt={account}
          rounded="full"
          height={25}
          width={25}
          marginRight={2}
        />
      )}
      {account == null ? "connect" : ensName || truncateAddress(account)}
    </Button>
  );
}
