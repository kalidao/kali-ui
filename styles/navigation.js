import { styled } from "./stitches.config";

export const Navigation = styled('div', {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    justifyContent: 'flex-end'
});

export const PreviousButton = styled('button', {
    color: '$foreground',
    border: 'none',
    background: 'none'
});

export const NextButton = styled('button', {
    background: '$accent',
    border: 'none',
    color: '$foreground',
    borderRadius: '22.81px',
    padding: '0.3rem 0.8rem'
});




