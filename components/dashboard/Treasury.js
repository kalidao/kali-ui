import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Text, HStack, Spacer, Spinner } from "@chakra-ui/react";
import { fromDecimals } from "../../utils/formatters";
import DashedDivider from "../elements/DashedDivider";

const TreasuryCard = ({ key, token, balance }) => {
  return (
    <>
      <HStack color="kali.900">
        <Text>{token}</Text>
        <Spacer />
        <Text>{balance}</Text>
      </HStack>
      <DashedDivider />
    </>
  );
};

export default function Treasury() {
  const value = useContext(AppContext);
  const { dao } = value.state;

  return (
    <>
      {dao["balances"] != null ?
        dao["balances"].map((b, index) => (
        <TreasuryCard
          key={index}
          token={b["token"]}
          balance={
            b["token"] === "USDC" || b["token"] === "USDT"
              ? fromDecimals(b["balance"], 6)
              : fromDecimals(b["balance"], 18)
          }
        />
      )) : <Spinner />}
    </>
  );
}
