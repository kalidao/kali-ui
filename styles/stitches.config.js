import { createStitches } from "@stitches/react";
import { globalStyles } from "./globalStyles";

export const { styled, keyframes } = createStitches({
  theme: {
    colors: {
      purple100: "hsl(273, 100%, 45%)",
      purple200: "#7000FF",
      purple300: "#7000FF",
      purple400: "#7000FF",

      red100: '#660000',

      gold: '#D4AF37',
      // token aliases
      background: '#0B0A0A',
      foreground: '#D5D1D1',
      accent: '#C28813',
      highlight: '#FF3131',
      highlight2: '#08FF08'
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