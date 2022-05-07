import { styled } from "../stitches.config";
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { Controller } from "react-hook-form";

const StyledSwitch = styled(SwitchPrimitive.Root, {
    all: 'unset',
    width: 42,
    height: 25,
    backgroundColor: '$red',
    borderRadius: '9999px',
    position: 'relative',
    boxShadow: `0 2px 10px $blackAlpha`,
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    '&:focus': { boxShadow: `0 0 0 2px $border` },
    '&[data-state="checked"]': { backgroundColor: '$green' },
});
  
const StyledThumb = styled(SwitchPrimitive.Thumb, {
    display: 'block',
    width: 21,
    height: 21,
    backgroundColor: 'white',
    borderRadius: '9999px',
    boxShadow: `0 2px 2px '$blackAlpha'`,
    transition: 'transform 100ms',
    transform: 'translateX(2px)',
    willChange: 'transform',
    '&[data-state="checked"]': { transform: 'translateX(19px)' },
});
  
export const Switch = (props) => (
    <Controller
        {...props}
        render={({ field }) => (
        <StyledSwitch
            {...field}
            value={undefined}
            checked={field.value}
            onCheckedChange={field.onChange}
        >
            <StyledThumb />
        </StyledSwitch>
        )}
    />
);

export default Switch