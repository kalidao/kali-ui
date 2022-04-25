import { styled } from './stitches.config'

export const NetworkBox = styled('div', {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.5rem",
  borderRadius: "2rem",
  margin: "0px 6px",  
  padding: "6px 14px",
  
  fontWeight: "700",
  fontSize: "16px",
  lineHeight: "19px",

  
  variants: {
    color: {
      "green": {
        color: "$green",
        border: "1px solid $green",
      },
      "yellow": {
        color: "$yellow",
        border: "1px solid $yellow",
      },
      "red": {
        color: "$red",
        border: "1px solid $red",
      }
    }
}
});

export const Dot = styled('div', {
  width: "8px",
  height: "8px",
  borderRadius: "2rem",
  variants: {
    color: {
      "green": {
        background: "$green",
      },
      "yellow": {
        background: "$yellow",
      },
      "red": {
        background: "$red",
      }
    }
  }
  
});

export const ConnectBox = styled('div', {
    border: "none",
    borderRadius: "35px",
    background: "$white",
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    fontWeight: "700",
    fontSize: "16px",
    lineHeight: "19px",
    padding: "6px 14px",
})