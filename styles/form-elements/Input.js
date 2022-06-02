import { styled } from "../stitches.config";

const Input = styled('input', {
    all: 'unset',
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
    
    '&:hover': { 
      boxShadow: '-2px 0px 20px 3px #ffa00a' 
    },

    '&:focus': { 
    
      boxShadow: `-2px 0px 20px 3px #ffa00a` 
    },

    variants: {
      variant: {
        textarea: {
          padding: '0.5rem', 
          width: '97%', 
          minHeight: '10vh'
        },
        voting: {
          width: '3rem',
          border: 'none'
        },
        calendar: {
          '&::-webkit-calendar-picker-indicator': {
            filter: 'invert(100%)'
          },
          '&::-webkit-datetime-edit-fields-wrapper': {
            color: '$foreground'
          }
        }
      }
    }
  });

export default Input