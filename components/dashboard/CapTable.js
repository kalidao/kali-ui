import { useState, useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import {
  Text,
  UnorderedList,
  ListItem,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { fromDecimals } from "../../utils/formatters";

export default function CapTable() {
  const value = useContext(AppContext);
  const { dao } = value.state;

  return (
    <>
      <Table variant="simple" colorScheme="blackAlpha">
        <Thead>
          <Tr>
            <Th color="#fff">Member</Th>
            <Th color="#fff">Shares</Th>
          </Tr>
        </Thead>
        <Tbody background="blackAlpha.300">
          {dao["members"].map((m, index) => (
            <Tr key={index}>
              <Td color="#fff">{m["member"]}</Td>
              <Td color="#fff">{fromDecimals(m["shares"], 18)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}
