import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Text, HStack, Spacer, Link, Icon } from "@chakra-ui/react";
import { convertVotingPeriod } from "../../utils/formatters";
import DashedDivider from "../elements/DashedDivider";

export default function GovSettings() {
  const value = useContext(AppContext);
  const { dao } = value.state;
  const array = [
    {
      name: "Shares Transferable",
      info: dao["token"]["paused"]
        .toString()
        .replace(/^\w/, (s) => s.toUpperCase()),
    },
    {
      name: "Voting Period",
      info: convertVotingPeriod(dao["gov"]["votingPeriod"]),
    },
    {
      name: "Quorum",
      info: dao["gov"]["quorum"] + "%",
    },
    {
      name: "Approval Needed",
      info: dao["gov"]["supermajority"] + "%",
    },
  ];

  return (
    <>
      {array.map((item, index) => (
        <>
          <HStack>
            <Text>{item.name}</Text>
            <Spacer />
            <Text>{item.info}</Text>
            {item.link != null ? (
              <Link passHref href={item.link}>
                <Icon as={BsFillArrowUpRightSquareFill} />
              </Link>
            ) : null}
          </HStack>
          <DashedDivider />
        </>
      ))}
    </>
  );
}
