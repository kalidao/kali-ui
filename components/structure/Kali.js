import { Link, Heading } from "@chakra-ui/react";
import { routeHome } from "../../utils/router";
import logo from "../../public/img/logo.png";

export default function Kali() {
  const home = () => {
    routeHome();
    console.log("click");
  };
  return (
    <img id="logo" src={logo.src} height="65" width="199" alt="Kali" onClick={home} />
  );
}
