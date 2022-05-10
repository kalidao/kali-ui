import { styled } from "../stitches.config";

const Input = styled('input', {
    all: 'unset',
    width: 200,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    padding: '0 10px',
    height: 35,
    fontSize: 15,
    lineHeight: 1,
    color: '$foreground',
    backgroundColor: '$background',
    border: '1px solid $foreground',
    boxShadow: `4px 6px 10px -7px $highlight2`,
    '&:focus': { boxShadow: `0 0 0 2px $purple` },

    variants: {
      variant: {
        voting: {
          width: '3rem',
          border: 'none'
        }
      }
    }
  });

export default Input