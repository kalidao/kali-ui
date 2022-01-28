import { Link, Heading } from "@chakra-ui/react";
import { routeHome } from "../../utils/router";
import logo from "../../public/img/logo.png";

export default function Kali() {
  const home = () => {
    routeHome();
    console.log("click");
  };
  return (
    <img id="logo" src={logo.src} width="200" height="66" alt="Kali" onClick={home} />
  );
}
