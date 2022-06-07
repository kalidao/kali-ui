import { createStitches } from '@stitches/react'

export const { styled, keyframes, getCssText } = createStitches({
  theme: {
    colors: {
      purple100: 'hsl(273, 100%, 90%)',
      purple200: 'hsl(273, 100%, 80%)',
      purple300: 'hsl(273, 100%, 70%)',
      purple400: 'hsl(273, 100%, 60%)',
      purple500: 'hsl(273, 100%, 50%)',
      purple600: 'hsl(273, 100%, 40%)',
      purple700: 'hsl(273, 100%, 30%)',
      purple800: 'hsl(273, 100%, 20%)',
      purple900: 'hsl(273, 100%, 10%)',

      yellow100: 'hsl(37, 100%, 90%)',
      yellow200: 'hsl(37, 100%, 80%)',
      yellow300: 'hsl(37, 100%, 70%)',
      yellow400: 'hsl(37, 100%, 60%)',
      yellow500: 'hsl(37, 100%, 50%)',
      yellow600: 'hsl(37, 100%, 40%)',
      yellow700: 'hsl(37, 100%, 30%)',
      yellow800: 'hsl(37, 100%, 20%)',
      yellow900: 'hsl(37, 100%, 10%)',

      green100: 'hsl(120, 100%, 90%)',
      green200: 'hsl(120, 100%, 80%)',
      green300: 'hsl(120, 100%, 70%)',
      green400: 'hsl(120, 100%, 60%)',
      green500: 'hsl(120, 100%, 50%)',
      green600: 'hsl(120, 100%, 40%)',
      green700: 'hsl(120, 100%, 30%)',
      green800: 'hsl(120, 100%, 20%)',
      green900: 'hsl(120, 100%, 10%)',

      red100: 'hsl(6, 87%, 90%)',
      red200: 'hsl(6, 87%, 80%)',
      red300: 'hsl(6, 87%, 70%)',
      red400: 'hsl(6, 87%, 60%)',
      red500: 'hsl(6, 87%, 50%)',
      red600: 'hsl(6, 87%, 40%)',
      red700: 'hsl(6, 87%, 30%)',
      red800: 'hsl(6, 87%, 20%)',
      red900: 'hsl(6, 87%, 10%)',

      gray100: 'hsl(0, 0%, 90%)',
      gray200: 'hsl(0, 0%, 80%)',
      gray300: 'hsl(0, 0%, 70%)',
      gray400: 'hsl(0, 0%, 60%)',
      gray500: 'hsl(0, 0%, 50%)',
      gray600: 'hsl(0, 0%, 40%)',
      gray700: 'hsl(0, 0%, 30%)',
      gray800: 'hsl(0, 0%, 20%)',
      gray900: 'hsl(0, 0%, 10%)',
      gray950: 'hsl(0, 0%, 5%)',

      black: 'hsl(0, 0%, 0%)',
      white: '#ffffff',

      // token aliases
      background: '$gray950',
      foreground: '$gray100',
      accent: '$yellow300',
      highlight: '$purple100',
      highlight2: '$green700',
      sublight: '$gray100',
    },
    media: {
      bp1: '(min-width: 640px)',
      bp2: '(min-width: 768px)',
      bp3: '(min-width: 1024px)',
    },
    utils: {
      paddingX: (value) => ({
        paddingRight: value,
        paddingLeft: value,
      }),
      paddingY: (value) => ({
        paddingTop: value,
        paddingBottom: value,
      }),
    },
  },
})
