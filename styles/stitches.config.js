import { createStitches } from "@stitches/react";
import { globalStyles } from "./globalStyles";

export const { styled, keyframes } = createStitches({
  ...globalStyles,
  theme: {
    colors: {
      purple100: "hsl(273, 100%, 45%)",
      purple200: "#7000FF",
      purple300: "#7000FF",
      purple400: "#7000FF",

      red100: 'hsl(0, 100%, 48%)',

      gold: 'hsl(43.95, 88%, 55.29%)',

      gray100: 'hsl(273, 20%, 8%)',
      gray200: 'hsl(273, 30%, 2%)',
      gray300: 'hsl(273, 100%, 16%)',
      gray400: 'hsl(273, 50%, 5%)',
      gray800: 'hsl(273, 100%, 95%)',

      // token aliases
      background: '$gray100',
      foreground: '$gray800',
      border: "$gray300",
      text: 'white',
      accent: '$purple100',
      highlight: '$red100'
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