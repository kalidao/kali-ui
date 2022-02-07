import { Box } from "@chakra-ui/react";
import { routeHome } from "../../utils/router";
import logo from "../../public/img/logo-minimal.png";
import Image from "next/image";

export default function Kali() {
  const home = () => {
    routeHome();
    console.log("click");
  };
  return (
    <Box
      display={{
        sm: "none",
        md: "block",
        lg: "block",
        xl: "block",
        "2xl": "block",
      }}
    >
      <Image
        id="logo"
        src={logo.src}
        width="62"
        height="100"
        alt="Kali"
        onClick={home}
      />
    </Box>
  );
}
