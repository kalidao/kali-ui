import { style } from '@vanilla-extract/css';
import { vars } from '@kalidao/reality';

export const arrow = style({
    fill: vars.colors.backgroundSecondary
});

export const content = style({
    minWidth: 220,
    backgroundColor: vars.colors.backgroundSecondary,
    borderRadius: 6,
    padding: 5,
    boxShadow:
        '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
})

export const item = style({
    all: 'unset',
    fontSize: 13,
    lineHeight: 1,
    color: vars.colors.foreground,
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
    height: 25,
    padding: '0 5px',
    position: 'relative',
    paddingLeft: 25,
    userSelect: 'none',

    ':hover': {
        background: vars.colors.foregroundTertiary,
    },

    ':focus': {
        background: vars.colors.foregroundSecondary,
    }

})

export const separator = style({
    backgroundColor: vars.colors.accent,
    height: 1,
    margin: 5
})
