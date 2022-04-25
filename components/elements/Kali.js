import React from "react";
import Image from "next/image";
import { styled } from "../../styles/stitches.config";
import logo from "../../public/img/kali-logo.svg";
import { routeHome } from "../../utils/router";

const LogoContainer = styled("div", {
  padding: "8.11px 7.9px 8.6px 0.92px",
});

export default function Kali() {
  const home = () => {
    routeHome();
    console.log("click");
  };

  return (
    <LogoContainer>
      <Image src={logo.src} alt="Kali" width="59.79px" height="59.79px" onClick={home}/>
    </LogoContainer>
  );
}
