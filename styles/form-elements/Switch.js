import { styled } from "../stitches.config";
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { Controller } from "react-hook-form";

const StyledSwitch = styled(SwitchPrimitive.Root, {
    all: 'unset',
    width: 42,
    height: 25,
    backgroundColor: '$foreground',
    borderRadius: '9999px',
    position: 'relative',
    boxShadow: `inset 3px 0px 42px 1px #fff`,
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    '&:focus': { boxShadow: `0 0 0 2px $border` },
    '&[data-state="checked"]': { backgroundColor: '$highlight2' },
});
  
const StyledThumb = styled(SwitchPrimitive.Thumb, {
    display: 'block',
    width: 21,
    height: 21,
    backgroundColor: '$background',
    borderRadius: '9999px',
    boxShadow: '0 2px 2px $accent',
    transition: 'transform 50ms',
    transform: 'translateX(2px)',
    willChange: 'transform',
    '&[data-state="checked"]': { transform: 'translateX(19px)', backgroundColor: '$background' },
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