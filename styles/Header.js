import { styled } from "./stitches.config";

export const HeaderLayout = styled('div', {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid $border"
})

export const Heading = styled('h1', {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "24px",
    lineHeight: "28px"
})

