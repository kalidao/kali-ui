import { createStitches } from "@stitches/react";

export const { styled, keyframes } = createStitches({
  theme: {
    colors: {
      black: "#000000",
      white: "#FFFFFF",
      lightgray: "#F2F2F2",
      darkgray: "#BDBDBD",
      red: "#FD2323",
      redAlpha: "#FD232370",
      green: "#2EC616",
      yellow: "#FDCC6E",
      purple: "#7000FF",
      border: "#DDDDDD",
      blackAlpha: "rgba(19, 19, 21, 0.98)",
    },
    media: {
      bp1: "(min-width: 575px)",
      bp2: "(min-width: 750px)",
    },
    utils: {
      paddingX: (value) => ({
        paddingRight: value,
        paddingLeft: value
      }),
      paddingY: (value) => ({
        paddingTop: value,
        paddingBottom: value
      }),
    }
  },
});