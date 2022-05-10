import { createStitches } from "@stitches/react";
import { globalStyles } from "./globalStyles";

export const { styled, keyframes } = createStitches({
  theme: {
    colors: {
      purple100: "hsl(273, 100%, 45%)",
      purple200: "#7000FF",
      purple300: "#7000FF",
      purple400: "#7000FF",

      red100: '#FF3131',


      gray100: '#D5D1D1',
      gray200: '#87878c',
      gray400: '#141414',

      yellow300: '#ffa00a',
      yellow400: '#C28813',
      yellow500: 'rgba(172, 108, 7)',
      yellow600: 'rgba(51, 32, 2)',
      
      green100: '#08FF08',

      black: '#000000',
      white: '#ffffff',

      // token aliases
      background: '$black',
      foreground: '$gray100',
      accent: '$yellow400',
      highlight: '$red100',
      highlight2: '$green100',
      sublight: '$gray100',

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