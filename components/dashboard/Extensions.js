import { useState, useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import { Text, UnorderedList, ListItem } from "@chakra-ui/react";

export default function Extensions() {
  const value = useContext(AppContext);
  const { dao } = value.state;

  return(
    <>
    {dao['extensions'] == null ? "No extensions installed" :
    <>
    <UnorderedList>
      {Object.entries(dao["extensions"]).map(([k, v]) =>
        <ListItem key={k}>{k}</ListItem>
      )}
    </UnorderedList>
    </>
    }
    </>
  );
}
