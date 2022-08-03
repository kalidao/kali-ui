import { createStitches } from '@stitches/react'
import {
  grayDark,
  mauveDark,
  violetDark,
  redDark,
  greenDark,
  sageDark,
  amberDark,
  yellowDark,
  cyanDark,
} from '@radix-ui/colors'

export const { styled, keyframes, getCssText, css } = createStitches({
  theme: {
    colors: {
      ...grayDark,
      ...mauveDark,
      ...violetDark,
      ...redDark,
      ...sageDark,
      ...greenDark,
      ...amberDark,
      ...yellowDark,
      ...cyanDark,
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
