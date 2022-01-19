import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Button, Text, Icon, Divider } from "@chakra-ui/react";
import { getNetworkName } from "../../utils/formatters";
import { IoIosGitNetwork } from "react-icons/io";

export default function Chain() {
  const value = useContext(AppContext);
  const { account, chainId, daoChain } = value.state;
  console.log(daoChain);
  console.log(chainId);

  return (
    <>
      {chainId == null ? null : (
        <Button variant="link" border="none" pl={1}>
          <Icon as={IoIosGitNetwork} />
          {getNetworkName(chainId)}
          {/* <Divider orientation="vertical" border="2px solid" /> */}
        </Button>
      )}
    </>
  );
}
