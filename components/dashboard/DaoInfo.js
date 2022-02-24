import { useState, useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import { Text, HStack, Link, Icon, Spacer } from "@chakra-ui/react";
import { BsFillArrowUpRightSquareFill } from "react-icons/bs";
import { fromDecimals, truncateAddress } from "../../utils/formatters";
import DashedDivider from "../elements/DashedDivider";
import CapTableModal from "./CapTableModal";
import { addresses } from "../../constants/addresses";

export default function DaoInfo() {
  const value = useContext(AppContext);
  const { dao, chainId } = value.state;
  const [info, setInfo] = useState([])
  const blockExplorer = addresses[chainId]['blockExplorer'];

  const notRicardianDao = [
    {
      name: "Name",
      info: dao["name"],
      link: null,
    },
    {
      name: "Address",
      info: truncateAddress(dao["address"]),
      link: `${blockExplorer}/address/${dao["address"]}`,
    },
    {
      name: "Symbol",
      info: dao["token"]["symbol"],
      link: null,
    },
    {
      name: "Shares",
      info: fromDecimals(dao["token"]["totalSupply"], 18),
      link: null,
    },
    {
      name: "Docs",
      info: "",
      link: `https://ipfs.io/ipfs/${dao["docs"]}`,
    },
    {
      name: "Members",
      info: dao["members"].length,
      link: null,
    },
  ];

  const ricardianDao = [
    {
      name: "Name",
      info: dao["name"],
      link: null,
    },
    {
      name: "Address",
      info: truncateAddress(dao["address"]),
      link: `${blockExplorer}/address/${dao["address"]}`,
    },
    {
      name: "Symbol",
      info: dao["token"]["symbol"],
      link: null,
    },
    {
      name: "Shares",
      info: fromDecimals(dao["token"]["totalSupply"], 18),
      link: null,
    },
    {
      name: "Members",
      info: dao["members"].length,
      link: null,
    },
  ];

  useEffect(() => {
    dao["docs"] == "" ? setInfo(ricardianDao) : setInfo(notRicardianDao)
  })

  return (
    <div>
      {info.map((item, index) => (
        <>
          {item.info != undefined ? (
            <>
              <HStack>
                <Text isTruncated>{item.name}</Text>
                <Spacer />
                <Text>{item.info}</Text>
                {item.link != null ? (
                  <Link passHref isExternal href={item.link}>
                    <Icon as={BsFillArrowUpRightSquareFill} />
                  </Link>
                ) : null}
              </HStack>
              <DashedDivider />
            </>
          ) : null}
        </>
      ))}
      <CapTableModal />
    </div>
  );
}
