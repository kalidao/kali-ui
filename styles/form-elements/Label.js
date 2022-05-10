import { styled } from "../stitches.config";
import * as LabelPrimitive from "@radix-ui/react-label";

export const Label = styled(LabelPrimitive.Root, {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '18.51px',
    color: '$foreground',
    userSelect: 'none',
});;

export default Label