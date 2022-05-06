import { styled } from "./stitches.config";

export const Navigation = styled('div', {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    justifyContent: 'flex-end'
});

export const PreviousButton = styled('button', {
    color: '$darkgray'
});

export const NextButton = styled('button', {
    background: '$purple',
    color: '$white',
    borderRadius: '22.81px',
    padding: '0.2rem 0.5rem'
});

