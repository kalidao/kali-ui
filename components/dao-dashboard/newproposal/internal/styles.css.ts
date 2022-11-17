import { vars } from "@kalidao/reality";
import { style } from "@vanilla-extract/css";

export const govItem = style({
    all: 'unset',
    display: 'flex',
    gap: vars.space[1],
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: vars.space[3],
    width: '100%',

    ":hover": {
        backgroundColor: vars.colors.accentSecondaryHover,
    }
})