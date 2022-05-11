import { useState, useContext } from "react"
import { Box } from "../../styles/elements";
import { Header } from "../../components/layout";
import Tools from "../../components/tools";
import globalStyles from "../../styles/globalStyles";

export default function ToolsPage() {
  globalStyles();

  return (
    <Box css={{
      fontFamily: 'Display'
    }}>
        <Header heading="Tools" />
        <Tools />
    </Box>  
  );
}
