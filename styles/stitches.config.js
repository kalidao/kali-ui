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


      gray100: 'hsl(0, 0%, 90%)',
      gray200: 'hsl(0, 0%, 80%)',
      gray300: 'hsl(0, 0%, 70%)',
      gray400: 'hsl(0, 0%, 60%)',
      gray500: 'hsl(0, 0%, 50%)',
      gray600: 'hsl(0, 0%, 40%)',
      gray700: 'hsl(0, 0%, 30%)',
      gray800: 'hsl(0, 0%, 20%)',
      gray900: 'hsl(0, 0%, 10%)',

      yellow300: '#ffa00a',
      yellow400: '#C28813',
      yellow500: 'rgba(172, 108, 7)',
      yellow600: 'rgba(51, 32, 2)',
      
      green100: '#08FF08',

      black: 'hsl(0, 0%, 0%)',
      white: '#ffffff',

      // token aliases
      background: 'black',
      foreground: '$gray100',
      accent: '$yellow400',
      highlight: '$red100',
      highlight2: '$green100',
      sublight: '$gray100',

    },
    media: {
      bp1: "(min-width: 640px)",
      bp2: "(min-width: 768px)",
      bp3: "(min-width: 1024px)"
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