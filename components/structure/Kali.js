import { Link, Heading } from "@chakra-ui/react";
import { routeHome } from "../../utils/router";

export default function Kali() {
  const home = () => {
    routeHome();
    console.log("click");
  };
  return (
    <>
      <Heading id="kali-logo" letterSpacing="wide" fontWeight="extrabold">
        <Link onClick={home}>KaliDAO</Link>
      </Heading>
    </>
  );
}
