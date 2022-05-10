import { styled, keyframes } from './stitches.config';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from '@radix-ui/react-icons';

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backdropFilter: 'blur(100px) contrast(0.9)',
  position: 'fixed',
  inset: 0,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
});

const StyledContent = styled(DialogPrimitive.Content, {
  background: '$background',
  color: 'white',
  borderRadius: 6,
  boxShadow: '4px 6px 43px -2px rgba(8,255,8,1)',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '600px',
  maxHeight: '90vh',
  padding: 25,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
  // '&:focus': { outline: 'none' },
});

function Content({ children, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay  />
      <StyledContent {...props}>{children}</StyledContent>
    </DialogPrimitive.Portal>
  );
}

const StyledTitle = styled(DialogPrimitive.Title, {
  margin: 0,
  fontWeight: 600,
  color: '$foreground',
  fontSize: 22,
});

const StyledDescription = styled(DialogPrimitive.Description, {
  margin: '10px 0 20px',
  color: '$black',
  background: "$lightgray",
  padding: "6px 14px",
  borderRadius: "1rem",
  fontSize: 15,
  lineHeight: 1.5,
});

export const StyledTrigger = styled(DialogPrimitive.Trigger, {
  border: "none", 
  background: '$background'
})

export const IconButton = styled('button', {
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '100%',
  height: 25,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$red',
  position: 'absolute',
  top: 10,
  right: 10,

  '&:hover': { backgroundColor: '$redAlpha' },
  '&:focus': { boxShadow: `0 0 0 2px $redAlpha` },
});

// Exports
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = StyledTrigger;
export const DialogContent = Content;
export const DialogTitle = StyledTitle;
export const DialogDescription = StyledDescription;

export const DialogClose = () => {
  return (<DialogPrimitive.Close>
    <IconButton>
      <Cross2Icon />
    </IconButton>
  </DialogPrimitive.Close>);
} 




